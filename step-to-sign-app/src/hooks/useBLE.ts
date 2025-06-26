// Contenido completo para: mobile-app/src/hooks/useBLE.ts

import { useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import {
  BleManager,
  Device,
  Service,
  Characteristic,
  Subscription,
} from "react-native-ble-plx";
import { Buffer } from "buffer";

// Creamos una nueva instancia del BleManager.
const bleManager = new BleManager();

// UUIDs de nuestro firmware en Wokwi
const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const GESTURE_CHAR_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

// Este es nuestro hook personalizado
function useBLE() {
  // Estados para guardar la información que usará la UI
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [lastGesture, setLastGesture] = useState<string>("");

  // Función para solicitar permisos al usuario
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

  // Función para escanear dispositivos
  const scanForDevices = () => {
    console.log("Iniciando escaneo...");
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log("Error escaneando:", error);
        return;
      }
      // Buscamos nuestro zapato por su nombre
      if (device && device.name?.includes("Step-to-Sign Shoe")) {
        setAllDevices((prevState) => {
          // Evitamos duplicados en la lista de dispositivos
          if (!prevState.find((d) => d.id === device.id)) {
            console.log("Encontrado:", device.name, device.id);
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });
  };

  // Función para conectarse a un dispositivo
  const connectToDevice = async (device: Device) => {
    try {
      console.log("Deteniendo escaneo y conectando a", device.name);
      bleManager.stopDeviceScan(); // Detenemos el escaneo
      await bleManager.connectToDevice(device.id);
      setConnectedDevice(device);
      console.log("Conexión exitosa. Descubriendo servicios...");
      
      // Descubrimos los servicios y características
      await bleManager.discoverAllServicesAndCharacteristicsForDevice(device.id);
      
      // Nos suscribimos a la característica de gestos para recibir notificaciones
      bleManager.monitorCharacteristicForDevice(
        device.id,
        SERVICE_UUID,
        GESTURE_CHAR_UUID,
        (error, characteristic) => {
          if (error) {
            console.log("Error monitoreando:", error);
            return;
          }
          if (characteristic?.value) {
            // El valor viene en Base64, lo decodificamos a un string.
            const gesture = Buffer.from(characteristic.value, 'base64').toString('ascii');
            console.log("¡Gesto recibido desde el zapato! ->", gesture);
            // Actualizamos el estado para que la UI lo muestre
            setLastGesture(gesture);
          }
        }
      );
    } catch (e) {
      console.log("Fallo al conectar:", e);
    }
  };

  // Exponemos las funciones y variables que nuestra UI necesitará
  return {
    scanForDevices,
    connectToDevice,
    requestPermissions,
    allDevices,
    connectedDevice,
    lastGesture,
  };
}

export default useBLE;