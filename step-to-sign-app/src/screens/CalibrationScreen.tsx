// mobile-app/src/screens/CalibrationScreen.tsx (Versión Interactiva)

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Settings } from 'lucide-react-native';

const GESTURES_TO_RECORD = ['TAP_CORTO', 'TAP_LARGO', 'DOBLE_TAP', 'PRESION_TALON'];
const SAMPLES_PER_GESTURE = 5; // Requerimos 5 muestras por gesto

// Creamos un tipo para nuestro estado de progreso para más claridad.
type ProgressState = {
  [key: string]: number;
};

export default function CalibrationScreen() {
  // --- ESTADOS (State) ---
  // Guardamos el progreso de cada gesto. Ej: { TAP_CORTO: 2, TAP_LARGO: 1 }
  const [progress, setProgress] = useState<ProgressState>(
    GESTURES_TO_RECORD.reduce((acc, gesture) => ({ ...acc, [gesture]: 0 }), {})
  );

  // Guardamos qué gesto se está "grabando" actualmente para mostrar un spinner.
  const [recordingGesture, setRecordingGesture] = useState<string | null>(null);
  
  // Guardamos el estado del entrenamiento final
  const [isTraining, setIsTraining] = useState(false);

  // --- LÓGICA ---

  // Calculamos si la calibración está completa. useMemo optimiza para que no se recalcule en cada render.
  const isCalibrationComplete = useMemo(() => 
    Object.values(progress).every(p => p >= SAMPLES_PER_GESTURE),
    [progress]
  );

  // Función que se llama al presionar el botón "Grabar"
  const handleRecordGesture = (gestureName: string) => {
    if (progress[gestureName] >= SAMPLES_PER_GESTURE) return; // No grabar más si ya está completo

    setRecordingGesture(gestureName); // Mostramos el spinner

    // Simulamos una grabación de 1.5 segundos
    setTimeout(() => {
      setProgress(prevProgress => ({
        ...prevProgress,
        [gestureName]: prevProgress[gestureName] + 1,
      }));
      setRecordingGesture(null); // Ocultamos el spinner
    }, 1500);
  };

  // Función para la simulación de entrenamiento final
  const handleTrainModel = () => {
    setIsTraining(true);
    // Simulamos el flujo completo que diseñamos
    setTimeout(() => Alert.alert("Paso 1/4", "Subiendo dataset personal a Walrus..."), 1000);
    setTimeout(() => Alert.alert("Paso 2/4", "Fine-tuning del modelo base en progreso..."), 4000);
    setTimeout(() => Alert.alert("Paso 3/4", "Subiendo modelo personalizado a Walrus..."), 7000);
    setTimeout(() => {
      Alert.alert("¡Calibración Completada!", "Tu Step-to-Sign ahora responde a tu firma de gestos única.");
      setIsTraining(false);
    }, 9000);
  };

  // --- RENDERIZADO (UI) ---
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}><Settings color="#fff" size={28} /> Calibración de Gestos</Text>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.instructions}>
          Para personalizar la respuesta de tu Step-to-Sign, graba cada uno de los siguientes gestos {SAMPLES_PER_GESTURE} veces.
        </Text>
        
        {GESTURES_TO_RECORD.map((gesture) => (
          <View key={gesture} style={styles.gestureRow}>
            <Text style={styles.gestureText}>{gesture}</Text>
            <Text style={styles.progressText}>
              {progress[gesture]} / {SAMPLES_PER_GESTURE}
            </Text>
            <TouchableOpacity 
              style={[styles.recordButton, progress[gesture] >= SAMPLES_PER_GESTURE && styles.buttonDisabled]}
              onPress={() => handleRecordGesture(gesture)}
              disabled={recordingGesture !== null || progress[gesture] >= SAMPLES_PER_GESTURE}
            >
              {recordingGesture === gesture ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.buttonText}>Grabar</Text>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={[styles.trainButton, !isCalibrationComplete && styles.buttonDisabled]}
        onPress={handleTrainModel}
        disabled={!isCalibrationComplete || isTraining}
      >
        {isTraining ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrenar mi Modelo Personalizado</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Estilos actualizados para la interactividad
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center', padding: 20 },
  scrollView: { paddingHorizontal: 20 },
  instructions: { fontSize: 16, color: '#94a3b8', textAlign: 'center', marginBottom: 30 },
  gestureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#1e293b',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  gestureText: { color: '#fff', fontSize: 18, fontWeight: '500', flex: 1 },
  progressText: { color: '#94a3b8', fontSize: 16, fontWeight: 'bold', marginHorizontal: 15 },
  recordButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  trainButton: {
    backgroundColor: '#16a34a', // Verde para la acción final
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#334155',
  }
});