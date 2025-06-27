import { useState, useMemo } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import {
  BleManager,
  Device,
  Service,
  Characteristic,
  BleError,
} from "react-native-ble-plx";
import { Buffer } from "buffer";

// Instancia única del BleManager para toda la app.
const bleManager = new BleManager();

// =======================   NUEVA CONFIGURACIÓN BLE   ========================
// UUIDs de nuestro firmware criptográfico v2.2 en Wokwi
const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
// Característica para ENVIAR el hash al zapato (la app escribe aquí)
const HASH_RX_CHAR_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
// Característica para RECIBIR la firma del zapato (la app escucha aquí)
const SIGNATURE_TX_CHAR_UUID = "8c973529-548c-452f-831e-451368936990";
// ===========================================================================


// --- Hook Personalizado useBLE ---
function useBLE() {
  // --- ESTADOS (State) ---
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  
  // Estados para las características específicas de nuestra app
  const [hashCharacteristic, setHashCharacteristic] = useState<Characteristic | null>(null);
  
  // Este es el estado clave para manejar la firma asíncrona.
  // Guardará las funciones 'resolve' y 'reject' de la promesa que crearemos.
  const [signaturePromise, setSignaturePromise] = useState<{
    resolve: (signature: string) => void;
    reject: (reason?: any) => void;
  } | null>(null);


  // --- LÓGICA DE PERMISOS Y ESCANEO (Sin cambios) ---
  const requestPermissions = async (): Promise<boolean> => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);
      return (
        granted["android.permission.BLUETOOTH_CONNECT"] === PermissionsAndroid.RESULTS.GRANTED &&
        granted["android.permission.BLUETOOTH_SCAN"] === PermissionsAndroid.RESULTS.GRANTED
      );
    }
    return true;
  };

  const scanForDevices = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log("Error escaneando:", error);
        return;
      }
      if (device && device.name?.includes("Step-to-Sign Shoe")) {
        setAllDevices((prevState) => {
          if (!prevState.find((d) => d.id === device.id)) {
            console.log("Encontrado:", device.name, device.id);
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });
  };

    // =======================   NUEVA FUNCIÓN   ========================
  // Nueva función para detener el escaneo, que sí conoce a bleManager
  const stopDeviceScan = () => {
    console.log("Deteniendo escaneo...");
    bleManager.stopDeviceScan();
  }
 

  // --- LÓGICA DE CONEXIÓN (ACTUALIZADA) ---
  const connectToDevice = async (device: Device) => {
    try {
      setIsConnecting(true);
      console.log("Deteniendo escaneo y conectando a", device.name);
      bleManager.stopDeviceScan();
      await device.connect(); // Nos conectamos al dispositivo
      setConnectedDevice(device);
      
      console.log("Conexión exitosa. Descubriendo servicios y características...");
      await device.discoverAllServicesAndCharacteristics();
      
      // Buscamos nuestro servicio específico
      const service = (await device.services()).find(s => s.uuid === SERVICE_UUID);
      if (!service) throw new Error("Servicio Step-to-Sign no encontrado.");

      // Buscamos nuestras dos características
      const characteristics = await service.characteristics();
      const hashChar = characteristics.find(c => c.uuid === HASH_RX_CHAR_UUID);
      const sigChar = characteristics.find(c => c.uuid === SIGNATURE_TX_CHAR_UUID);

      if (!hashChar || !sigChar) throw new Error("Características de Hash/Firma no encontradas.");

      console.log("✅ Características de Hash y Firma encontradas.");
      setHashCharacteristic(hashChar);

      // Nos suscribimos a la característica de FIRMA para recibir la respuesta del zapato
      sigChar.monitor((error, characteristic) => {
        if (error) {
          console.error("Error monitoreando firma:", error);
          // Si hay un error, rechazamos la promesa pendiente
          if (signaturePromise) signaturePromise.reject(error);
          return;
        }
        if (characteristic?.value) {
          // El valor es la firma en Base64.
          const signatureBase64 = characteristic.value;
          console.log(`👟 ¡Firma recibida del zapato! -> ${signatureBase64.slice(0,10)}...`);
          
          // Si hay una promesa esperando, la resolvemos con la firma.
          if (signaturePromise) {
            signaturePromise.resolve(signatureBase64);
            setSignaturePromise(null); // Limpiamos la promesa
          }
        }
      });

    } catch (e) {
      console.log("Fallo al conectar o descubrir:", e);
    } finally {
        setIsConnecting(false);
    }
  };

  // --- NUEVAS FUNCIONES CRIPTOGRÁFICAS ---

  /**
   * Envía un hash de 32 bytes al dispositivo conectado.
   * @param hash El buffer de 32 bytes de la transacción.
   */
  const sendTxHash = async (hash: Uint8Array) => {
    if (!hashCharacteristic) {
      throw new Error("Característica de Hash no está disponible o conectada.");
    }
    if (hash.length !== 32) {
      throw new Error("El hash debe ser de 32 bytes.");
    }
    // La librería espera un string en Base64 para escribirlo.
    const base64Hash = Buffer.from(hash).toString('base64');
    await hashCharacteristic.writeWithResponse(base64Hash);
    console.log("✅ Hash enviado al zapato. Esperando gesto...");
  };

  /**
   * Devuelve una promesa que se resuelve con la firma (en base64) del zapato.
   * Incluye un timeout de 30 segundos.
   */
  const waitForShoeSignature = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Configuramos un timeout para no esperar indefinidamente
      const timeout = setTimeout(() => {
        setSignaturePromise(null); // Limpiamos la promesa en caso de timeout
        reject(new Error("Timeout: No se recibió firma del zapato en 30 segundos."));
      }, 30000);

      // Guardamos las funciones 'resolve' y 'reject' en el estado.
      // El monitor BLE las usará cuando reciba la firma.
      setSignaturePromise({ 
        resolve: (signature) => {
            clearTimeout(timeout);
            resolve(signature);
        }, 
        reject 
      });
    });
  };


  // --- EXPORTAMOS TODO LO QUE LA APP NECESITA ---
  return {
    scanForDevices,
    stopDeviceScan,
    connectToDevice,
    requestPermissions,
    sendTxHash,
    waitForShoeSignature,
    allDevices,
    connectedDevice,
    isConnecting,
  };
}

export default useBLE;