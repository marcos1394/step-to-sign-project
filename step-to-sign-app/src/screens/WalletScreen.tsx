import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  Vibration,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
// --- Hooks y Contextos ---
import { useAuth } from '../context/AuthContext';
import useBLE from '../hooks/useBLE';
// --- Iconos y Navegación ---
import { useNavigation } from '@react-navigation/native';
import { Wallet, Send, CheckCircle, XCircle, ScanLine } from 'lucide-react-native';
// --- Lógica de Sui ---
import {
  getFormattedBalance,
  resolveSuiNsAddress,
  executeCoSignedTransaction,
  findUserWallet,
  createUserWallet,
  AuthData, // Importamos el tipo para claridad
  executeEmergencyWithdrawal
} from '../lib/sui';

// Para la demo, la clave pública del zapato es una constante.
// En un producto real, se obtendría durante el emparejamiento BLE.
const SHOE_PUBLIC_KEY_B64 = "uH6ZLvQdoYibgJ/RyecoLltHI/B1/ljHSHzF8zqu5bi9x5ffzOqrTjSP+sAC7Lse+QV6EnTQsXLX2qQzKo5uRQ==";


const WalletScreen = () => {
  const navigation = useNavigation<any>();
const { userData } = useAuth(); // Le decimos: "Toma 'userData' y llámalo 'authData'"
const { connectedDevice, sendTxHash, waitForShoeSignature, onPanic } = useBLE();
  // --- ESTADOS DE LA PANTALLA ---
  const [userBalance, setUserBalance] = useState('0.00 SUI');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [sharedWalletId, setSharedWalletId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingTx, setIsProcessingTx] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // --- LÓGICA DE INICIALIZACIÓN Y ACTUALIZACIÓN ---

  // Usamos useCallback para memorizar la función y evitar re-renders innecesarios
  const setupUserWallet = useCallback(async () => {
    if (!userData) return;

    setIsLoading(true);
    setStatusMessage('Buscando tu bóveda personal...');
    try {
        const existingWalletId = await findUserWallet(userData.address);
        if (existingWalletId) {
            setSharedWalletId(existingWalletId);
            setStatusMessage('Bóveda personal encontrada.');
        } else {
            setStatusMessage('No tienes una bóveda. Creando una nueva para ti...');
            Vibration.vibrate();
            // CORRECCIÓN: Pasamos los argumentos necesarios a createUserWallet
            const newWalletId = await createUserWallet(userData, SHOE_PUBLIC_KEY_B64);
            setSharedWalletId(newWalletId);
            Alert.alert('¡Bóveda Creada!', `Se ha creado y vinculado tu nueva bóveda personal a tu zapato.`);
            setStatusMessage('¡Bóveda lista!');
        }
    } catch (error: any) {
        Alert.alert('Error de Configuración', 'No se pudo crear o encontrar tu bóveda personal: ' + error.message);
        setStatusMessage('Error al configurar la bóveda.');
    } finally {
        setIsLoading(false);
    }
  }, [userData]);

  // Efecto para inicializar todo cuando el usuario se autentica
  useEffect(() => {
    if (userData?.address) {
        getFormattedBalance(userData.address).then(setUserBalance);
        setupUserWallet();
    }
  }, [userData, setupUserWallet]);

  // ... después del primer useEffect

 
  // --- LÓGICA DE TRANSFERENCIA (EL CORAZÓN DE LA APP) ---

  const handleTransfer = async () => {
    if (!userData || !connectedDevice || !sharedWalletId) {
      Alert.alert('Requisitos no cumplidos', 'Asegúrate de haber iniciado sesión y de que tu zapato esté conectado.');
      return;
    }

    setIsProcessingTx(true);
    Vibration.vibrate();

    try {
      let finalRecipient = recipient;
      if (recipient.endsWith('.sui')) {
        setStatusMessage('Resolviendo dirección .sui...');
        const resolved = await resolveSuiNsAddress(recipient);
        if (!resolved) throw new Error('No se pudo resolver el nombre .sui');
        finalRecipient = resolved;
      }
      
      const amountMIST = BigInt(parseFloat(amount) * 1_000_000_000);
      if (isNaN(Number(amountMIST)) || amountMIST <= 0) {
        throw new Error("El monto introducido no es válido.");
      }
      
      // Llamamos a la función cerebral pasándole todo lo que necesita
      // ... dentro de handleTransfer
    const digest = await executeCoSignedTransaction({
        // CORRECCIÓN: Le asignamos el valor de nuestra constante 'userData' a la propiedad 'authData'.
        authData: userData, 
        ble: { sendTxHash, waitForShoeSignature },
        recipientAddress: finalRecipient,
        amountMIST,
        sharedWalletId,
    });

      setStatusMessage('');
      Alert.alert('¡Transacción Exitosa!', `Tu transferencia se ha completado.\n\nDigest: ${digest.slice(0, 20)}...`);
      Vibration.vibrate([0, 100, 100, 100]); 
      // Limpiamos el formulario
      setRecipient('');
      setAmount('');

    } catch (error: any) {
      console.error("Error durante la transferencia:", error);
      Alert.alert('Error en la Transacción', error.message);
    } finally {
      setIsProcessingTx(false);
      // Actualizamos el saldo
      if (userData?.address) {
          getFormattedBalance(userData.address).then(setUserBalance);
      }
    }
  };

  // --- LÓGICA DE PÁNICO Y RETIRO DE EMERGENCIA ---

  const handlePanicGesture = useCallback(async () => {
    // Nos aseguramos de tener todo lo necesario para actuar
    if (!userData || !sharedWalletId) {
      Alert.alert("Error", "No se puede procesar el gesto de pánico sin datos de usuario o billetera.");
      return;
    }

    // Usamos el mismo estado para mostrar un indicador de carga
    setIsProcessingTx(true);
    setStatusMessage("¡Gesto de pánico detectado! Activando retiro de emergencia...");
    Vibration.vibrate(500); // Una vibración larga para alertar al usuario

    try {
      // La dirección segura será la propia dirección del usuario
      const safeAddress = userData.address;
      
      const digest = await executeEmergencyWithdrawal(sharedWalletId, safeAddress);
      
      Alert.alert(
        "¡Retiro de Emergencia Exitoso!",
        `Todos los fondos han sido transferidos a tu dirección principal.\n\nDigest: ${digest.slice(0, 20)}...`
      );
      // Actualizamos el saldo para que se refleje el cambio
      getFormattedBalance(userData.address).then(setUserBalance);

    } catch (error: any) {
      console.error("Error durante el retiro de emergencia:", error);
      Alert.alert("Error en Retiro de Emergencia", error.message);
    } finally {
      setIsProcessingTx(false);
      setStatusMessage('');
    }
  }, [userData, sharedWalletId]); // Dependencias de la función

   // Efecto para suscribirse al evento de pánico del hook BLE
  useEffect(() => {
    // La función onPanic registra nuestro 'manejador'
    // useCallback en el paso anterior previene que esto se ejecute innecesariamente
    onPanic(handlePanicGesture);
  }, [onPanic, handlePanicGesture]);


  // --- RENDERIZADO DE LA UI ---
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Wallet color="#3b82f6" size={40} />
            <Text style={styles.title}>Mi Bóveda Step-to-Sign</Text>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceLabel}>Saldo (para Gas)</Text>
              <Text style={styles.balanceText}>{userBalance}</Text>
            </View>
          </View>

          <TouchableOpacity 
              style={[styles.connectionBanner, connectedDevice ? styles.connected : styles.disconnected]}
              onPress={() => navigation.navigate('Calibración IA')} // Cambiado para ir a la pantalla de conexión
          >
              {connectedDevice ? <CheckCircle color="#22c55e" size={20}/> : <XCircle color="#dc2626" size={20}/>}
              <Text style={styles.connectionText}>
                  {connectedDevice ? `Zapato Conectado: ${connectedDevice.name}` : 'Zapato Desconectado - Toca para conectar'}
              </Text>
          </TouchableOpacity>

          {isLoading ? (
            <View style={styles.statusBox}><ActivityIndicator /><Text style={styles.statusMessage}>{statusMessage}</Text></View>
          ) : (
            <View style={styles.form}>
              <Text style={styles.label}>Enviar a (dirección o .sui)</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="0x... o nombre.sui"
                  placeholderTextColor="#475569"
                  value={recipient}
                  onChangeText={setRecipient}
                />
              </View>

              <Text style={styles.label}>Monto (SUI)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.0"
                placeholderTextColor="#475569"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
          )}

          <View style={styles.actionContainer}>
              {isProcessingTx ? (
                  <View style={styles.statusBox}>
                      <ActivityIndicator color="#3b82f6" size="large"/>
                      <Text style={styles.statusMessage}>{statusMessage}</Text>
                  </View>
              ) : (
                  <TouchableOpacity
                      style={[styles.button, (!connectedDevice || !recipient || !amount || isLoading) && styles.buttonDisabled]}
                      onPress={handleTransfer}
                      disabled={!connectedDevice || !recipient || !amount || isLoading}
                  >
                      <Send color="#fff" style={styles.buttonIcon} />
                      <Text style={styles.buttonText}>Firmar y Enviar</Text>
                  </TouchableOpacity>
              )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Estilos
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0f172a' },
    scrollContainer: { flexGrow: 1, padding: 20 },
    header: { alignItems: 'center', marginBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginTop: 10 },
    balanceContainer: { marginTop: 15, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#1e293b', borderRadius: 10 },
    balanceLabel: { color: '#94a3b8', fontSize: 12, textAlign: 'center' },
    balanceText: { fontSize: 22, color: '#e2e8f0', fontWeight: '600' },
    connectionBanner: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 10, marginBottom: 20, borderWidth: 1 },
    connected: { backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: '#22c55e' },
    disconnected: { backgroundColor: 'rgba(220, 38, 38, 0.1)', borderColor: '#dc2626' },
    connectionText: { color: '#e2e8f0', marginLeft: 10, fontSize: 16 },
    form: { marginBottom: 20 },
    label: { color: '#94a3b8', fontSize: 16, marginBottom: 10 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', borderRadius: 10, marginBottom: 20 },
    input: { flex: 1, padding: 15, color: '#fff', fontSize: 16 },
    actionContainer: { height: 100, justifyContent: 'center', alignItems: 'center' },
    statusBox: { alignItems: 'center', padding: 20 },
    statusMessage: { color: '#cbd5e1', marginTop: 15, fontSize: 16, textAlign: 'center' },
    button: { flexDirection: 'row', backgroundColor: '#2563eb', padding: 18, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
    buttonDisabled: { backgroundColor: '#1e40af', opacity: 0.7 },
    buttonIcon: { marginRight: 10 },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default WalletScreen;