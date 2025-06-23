// mobile-app/src/screens/WalletScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
// Importamos nuestra nueva función de transferencia
import { getFormattedBalance, executeCoSignedTransfer } from '../lib/sui'; 

const USER_ADDRESS = '0x279f5ab206d6b15756b8b0d0fc99e802b114334bc36556e50d66ac3c65cc0f17';

export default function WalletScreen() {
  const [balance, setBalance] = useState('...');
  const [isLoading, setIsLoading] = useState(true);
  // Nuevo estado para controlar el envío de la transacción
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      setIsLoading(true);
      const fetchedBalance = await getFormattedBalance(USER_ADDRESS);
      setBalance(fetchedBalance);
      setIsLoading(false);
    };

    fetchBalance();
  }, []);

  // Nueva función para manejar el clic del botón
  const handleTransfer = async () => {
    setIsSubmitting(true); // Desactivamos el botón y mostramos "Enviando..."
    try {
      const digest = await executeCoSignedTransfer();
      Alert.alert("¡Éxito!", `Transacción completada con éxito.\nDigest: ${digest}`);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al enviar la transacción.");
    } finally {
      setIsSubmitting(false); // Volvemos a activar el botón
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Step-to-Sign Wallet</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.balanceLabel}>Saldo Actual</Text>
        
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" style={styles.balanceContainer} />
        ) : (
          <Text style={styles.balanceAmount}>{balance}</Text>
        )}

        <Text style={styles.addressLabel}>Tu Dirección:</Text>
        <Text style={styles.addressText}>{USER_ADDRESS}</Text>

        {/* Nuestro nuevo botón de acción */}
        <TouchableOpacity 
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleTransfer}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Ejecutar Transferencia de Prueba</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... (otros estilos sin cambios) ...
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  balanceLabel: { fontSize: 18, color: '#94a3b8' },
  balanceContainer: { height: 60, marginVertical: 10, justifyContent: 'center' },
  balanceAmount: { fontSize: 48, fontWeight: 'bold', color: '#fff', marginVertical: 10, height: 60 },
  addressLabel: { fontSize: 16, color: '#94a3b8', marginTop: 40 },
  addressText: { fontSize: 12, color: '#64748b', fontFamily: 'monospace', marginTop: 8 },
  // Nuevos estilos para nuestro botón
  button: {
    marginTop: 50,
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '90%',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#1e40af',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});