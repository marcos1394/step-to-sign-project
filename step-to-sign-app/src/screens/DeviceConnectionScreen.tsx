// Contenido para: mobile-app/src/screens/DeviceConnectionScreen.tsx

import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import useBLE from "../hooks/useBLE"; // ¡Importamos nuestro motor de lógica BLE!
import { Link } from 'lucide-react-native';

const DeviceConnectionScreen = () => {
  // Obtenemos todas las funciones y variables de estado de nuestro hook
  const {
    requestPermissions,
    scanForDevices,
    allDevices,
    connectToDevice,
    connectedDevice,
    lastGesture,
  } = useBLE();

  const [isScanning, setIsScanning] = useState(false);

  const startScan = async () => {
    const permissionsGranted = await requestPermissions();
    if (permissionsGranted) {
      setIsScanning(true);
      scanForDevices();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Conexión del Dispositivo</Text>
        <Text style={styles.subtitle}>
          {connectedDevice ? `Conectado a: ${connectedDevice.name}` : "Buscando Step-to-Sign Shoe..."}
        </Text>
      </View>

      {/* Área para mostrar el último gesto recibido */}
      <View style={styles.gestureContainer}>
        <Text style={styles.gestureLabel}>Último Gesto Recibido:</Text>
        <Text style={styles.gestureText}>{lastGesture || "---"}</Text>
      </View>

      {/* Botón para escanear */}
      {!connectedDevice && (
        <TouchableOpacity
          onPress={startScan}
          style={[styles.button, isScanning && styles.buttonDisabled]}
          disabled={isScanning}
        >
          {isScanning ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Escanear Dispositivos</Text>}
        </TouchableOpacity>
      )}

      {/* Lista de dispositivos encontrados */}
      <FlatList
        style={styles.deviceList}
        data={allDevices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => connectToDevice(item)} style={styles.deviceItem}>
            <Link color="#94a3b8" size={24} />
            <Text style={styles.deviceText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', paddingTop: 20 },
  header: { padding: 20, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 16, color: '#94a3b8', marginTop: 8 },
  gestureContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#1e293b',
    alignItems: 'center',
  },
  gestureLabel: { color: '#94a3b8', fontSize: 16 },
  gestureText: { color: '#3b82f6', fontSize: 48, fontWeight: 'bold', marginTop: 10 },
  button: {
    marginHorizontal: 20,
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: { backgroundColor: '#1e40af' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  deviceList: { marginTop: 20 },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  deviceText: { color: '#fff', fontSize: 18, marginLeft: 15 },
});

export default DeviceConnectionScreen;