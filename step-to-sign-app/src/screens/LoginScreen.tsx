// Contenido corregido para: mobile-app/src/screens/LoginScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext'; // Importamos nuestro hook
import { LogIn } from 'lucide-react-native';

export default function LoginScreen() {
  // CORRECCIÓN: Usamos 'isLoggingIn' que es el nombre correcto que exporta nuestro contexto.
  const { login, isLoggingIn } = useAuth(); 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Step-to-Sign</Text>
        <Text style={styles.subtitle}>Tu Billetera Biométrica en Sui</Text>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={login}
          disabled={isLoggingIn} // Usamos la variable correcta aquí
        >
          {isLoggingIn ? ( // Y también aquí
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <LogIn color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.buttonText}>Iniciar Sesión con Google</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 48, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 18, color: '#94a3b8', marginTop: 8, marginBottom: 60 },
  button: {
    flexDirection: 'row',
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
