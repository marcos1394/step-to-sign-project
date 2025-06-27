import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  // Añadimos Alert para una mejor comunicación con el usuario
  Alert,
} from "react-native";
import useBLE from "../hooks/useBLE"; // ¡Importamos nuestro nuevo y potente hook!
import { Link, CheckCircle, XCircle, Bluetooth } from 'lucide-react-native';
import { Device } from "react-native-ble-plx";

const DeviceConnectionScreen = () => {
  // =======================   NUEVOS ESTADOS DEL HOOK   ========================
  // Obtenemos las nuevas funciones y variables de estado de nuestro hook actualizado
  const {
    requestPermissions,
    stopDeviceScan, // <-- La nueva función

    scanForDevices,
    allDevices,
    connectToDevice,
    connectedDevice,
    // El nuevo estado que nos dice si se está intentando una conexión
    isConnecting,
  } = useBLE();
  // ===========================================================================

  const [isScanning, setIsScanning] = useState(false);

  const startScan = async () => {
    const permissionsGranted = await requestPermissions();
    if (permissionsGranted) {
      setIsScanning(true);
      scanForDevices();
      // Detenemos el escaneo después de 10 segundos para ahorrar batería
      setTimeout(() => {
        stopDeviceScan(); // <-- Usamos la función del hook
          setIsScanning(false);
      }, 10000);
    } else {
        Alert.alert("Permisos Requeridos", "Los permisos de Bluetooth son necesarios para escanear dispositivos.");
    }
  };

  // Envolvemos connectToDevice para manejar el estado de 'isConnecting'
  const handleConnect = (device: Device) => {
    if (isConnecting) return; // No hacer nada si ya nos estamos conectando
    connectToDevice(device);
  }

  // --- COMPONENTES DE RENDERIZADO (para una UI más limpia) ---

  const renderStatus = () => {
    if (isConnecting) {
        return <Text style={styles.subtitle}>Conectando...</Text>;
    }
    if (connectedDevice) {
        return (
            <View style={styles.statusContainer}>
                <CheckCircle color="#22c55e" size={20} />
                <Text style={styles.connectedText}>Conectado a: {connectedDevice.name}</Text>
            </View>
        );
    }
    return <Text style={styles.subtitle}>Buscando Step-to-Sign Shoe...</Text>;
  }

  const renderDeviceItem = ({ item }: { item: Device }) => (
    <TouchableOpacity 
        onPress={() => handleConnect(item)} 
        style={styles.deviceItem}
        // Deshabilitamos el item si nos estamos conectando a CUALQUIER dispositivo
        disabled={isConnecting}
    >
        <Link color="#94a3b8" size={24} />
        <Text style={styles.deviceText}>{item.name}</Text>
        {/* Mostramos un spinner solo en el item al que nos estamos conectando */}
        {isConnecting && connectedDevice?.id === item.id && <ActivityIndicator color="#fff" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Bluetooth color="#2563eb" size={40} />
        <Text style={styles.title}>Conexión del Dispositivo</Text>
        {renderStatus()}
      </View>
      
      {/* Botón para escanear (solo visible si no estamos conectados) */}
      {!connectedDevice && (
        <TouchableOpacity
          onPress={startScan}
          // Deshabilitamos si se está escaneando O conectando
          style={[styles.button, (isScanning || isConnecting) && styles.buttonDisabled]}
          disabled={isScanning || isConnecting}
        >
          {isScanning ? (
              <ActivityIndicator color="#fff" />
          ) : (
              <Text style={styles.buttonText}>Escanear Dispositivos</Text>
          )}
        </TouchableOpacity>
      )}

      {/* Lista de dispositivos encontrados */}
      <FlatList
        style={styles.deviceList}
        data={allDevices}
        keyExtractor={(item) => item.id}
        renderItem={renderDeviceItem}
        // Añadimos un texto si la lista está vacía
        ListEmptyComponent={<Text style={styles.emptyListText}>No se han encontrado dispositivos. Asegúrate de que tu zapato esté encendido y presiona "Escanear".</Text>}
      />
    </SafeAreaView>
  );
};


// --- ESTILOS MEJORADOS ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', paddingTop: 20 },
  header: { padding: 20, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginTop: 10 },
  subtitle: { fontSize: 16, color: '#94a3b8', marginTop: 8 },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  connectedText: {
    fontSize: 16,
    color: '#22c55e', // Verde para éxito
    marginLeft: 8,
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: { backgroundColor: '#1e40af' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  deviceList: { flex: 1 },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  deviceText: { color: '#fff', fontSize: 18, marginLeft: 15, flex: 1 },
  emptyListText: {
      textAlign: 'center',
      color: '#64748b',
      marginTop: 50,
      paddingHorizontal: 30,
      fontSize: 16,
      lineHeight: 24,
  }
});

export default DeviceConnectionScreen;