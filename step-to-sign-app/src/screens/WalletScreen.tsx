// Contenido final y completo para: mobile-app/src/screens/WalletScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
// CORRECCIÓN: Importamos la dirección MULTISIG_ADDRESS directamente desde nuestro servicio.
import { getFormattedBalance, resolveSuiNsAddress, executeMultiSigTransfer, MULTISIG_ADDRESS } from '../lib/sui'; 

export default function WalletScreen() {
  const [balance, setBalance] = useState('...');
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [resolvedAddress, setResolvedAddress] = useState<string | null>(null);
  const [isResolving, setIsResolving] = useState(false);

  const fetchBalance = async () => {
    setIsLoadingBalance(true);
    const fetchedBalance = await getFormattedBalance(MULTISIG_ADDRESS);
    setBalance(fetchedBalance);
    setIsLoadingBalance(false);
  };

  useEffect(() => {
    fetchBalance();
  }, []);
  
  const handleResolveName = async () => {
    if (!recipient.endsWith('.sui')) {
      Alert.alert("Nombre Inválido", "Por favor, introduce un nombre que termine en .sui");
      return;
    }
    setIsResolving(true);
    const address = await resolveSuiNsAddress(recipient);
    setIsResolving(false);
    if (address) {
      setResolvedAddress(address);
      Alert.alert("Éxito", `El nombre '${recipient}' resuelve a:\n\n${address}`);
    } else {
      setResolvedAddress(null);
      Alert.alert("Error", `No se pudo resolver el nombre '${recipient}'.`);
    }
  };

  const handleTransfer = async () => {
    const finalRecipient = resolvedAddress || recipient;
    const amountMIST = parseFloat(amount) * 1_000_000_000;

    if (!finalRecipient || isNaN(amountMIST) || amountMIST <= 0) {
      Alert.alert("Datos Inválidos", "Por favor, introduce una dirección y un monto válidos.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const digest = await executeMultiSigTransfer(finalRecipient, amountMIST);
      Alert.alert("¡Transferencia Exitosa!", `La transacción se completó.\n\nDigest: ${digest.slice(0, 10)}...`);
      setRecipient('');
      setAmount('');
      setResolvedAddress(null);
      await fetchBalance();
    } catch (error: any) {
      console.error(error);
      Alert.alert("Error en la Transacción", `Ocurrió un error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}/>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Step-to-Sign Wallet</Text>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.balanceLabel}>Saldo de la Bóveda</Text>
            {isLoadingBalance ? <ActivityIndicator size="large" color="#fff" style={styles.balanceContainer} /> : <Text style={styles.balanceAmount}>{balance}</Text>}
            <Text style={styles.addressLabel}>Dirección Multi-Firma:</Text>
            <Text style={styles.addressText}>{MULTISIG_ADDRESS}</Text>

            <View style={styles.formContainer}>
              <Text style={styles.inputLabel}>Enviar a (dirección o nombre.sui)</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="ej. demo.sui o 0x..."
                  placeholderTextColor="#475569"
                  value={recipient}
                  onChangeText={(text) => {
                    setRecipient(text);
                    setResolvedAddress(null);
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {recipient.endsWith('.sui') && (
                  <TouchableOpacity onPress={handleResolveName} style={styles.resolveButton} disabled={isResolving}>
                    {isResolving ? <ActivityIndicator color="#fff" size="small"/> : <Text style={styles.buttonText}>Resolver</Text>}
                  </TouchableOpacity>
                )}
              </View>
              {resolvedAddress && <Text style={styles.resolvedText}>Resuelto a: {resolvedAddress.slice(0, 10)}...{resolvedAddress.slice(-8)}</Text>}
              
              <Text style={styles.inputLabel}>Monto (SUI)</Text>
              <TextInput
                style={styles.input}
                placeholder="ej. 0.01"
                placeholderTextColor="#475569"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
              
              <TouchableOpacity style={[styles.button, isSubmitting && styles.buttonDisabled]} onPress={handleTransfer} disabled={isSubmitting}>
                {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Firmar y Enviar</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    scrollContent: { flexGrow: 1 },
    header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
    content: { flex: 1, alignItems: 'center', padding: 20 },
    balanceLabel: { fontSize: 18, color: '#94a3b8', marginTop: 20 },
    balanceContainer: { height: 60, marginVertical: 10, justifyContent: 'center' },
    balanceAmount: { fontSize: 48, fontWeight: 'bold', color: '#fff', marginVertical: 10, height: 60 },
    addressLabel: { fontSize: 16, color: '#94a3b8' },
    addressText: { fontSize: 12, color: '#64748b', fontFamily: 'monospace', marginTop: 8, marginBottom: 20, paddingHorizontal: 10 },
    formContainer: { width: '100%', marginTop: 20, paddingTop: 20, borderTopColor: '#1e293b', borderTopWidth: 1 },
    inputLabel: { color: '#cbd5e1', marginBottom: 8, marginLeft: 5 },
    inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    input: {
        flex: 1,
        backgroundColor: '#1e293b',
        color: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        fontSize: 16,
    },
    resolveButton: {
        marginLeft: 10,
        backgroundColor: '#1e40af',
        paddingHorizontal: 15,
        height: 54,
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    resolvedText: { color: '#22c55e', fontSize: 12, marginTop: -10, marginBottom: 15, marginLeft: 5, fontFamily: 'monospace' },
    button: {
        marginTop: 20,
        backgroundColor: '#2563eb',
        paddingVertical: 15,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
    },
    buttonDisabled: { backgroundColor: '#1e40af' },
});