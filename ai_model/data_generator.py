# Contenido para: ai_model/data_generator.py

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os
import time

# --- CONFIGURACIÓN DE LA SIMULACIÓN ---
NUM_SENSORS = 5
SAMPLING_RATE = 100  # Hz (100 lecturas por segundo)
GESTURE_DURATION = 2  # segundos por cada muestra de gesto
SAMPLES_PER_GESTURE = 50  # Cuántos ejemplos de cada gesto queremos generar
NOISE_LEVEL = 0.03  # Nivel de ruido de fondo
TAP_PRESSURE = 0.8  # Presión máxima para un tap

# Crear directorios para guardar los datos y gráficos
os.makedirs('generated_data/csv', exist_ok=True)
os.makedirs('generated_data/plots', exist_ok=True)

def generate_base_noise(duration, rate):
    """Genera el ruido de fondo para una duración dada."""
    points = int(duration * rate)
    timestamps = np.linspace(0, duration, points)
    noise = np.random.normal(0, NOISE_LEVEL, (points, NUM_SENSORS))
    # Aseguramos que la presión nunca sea negativa
    return timestamps, np.maximum(0, noise)

def generate_tap_profile(duration, rate, start_time, peak_time, tap_duration):
    """Genera el perfil de presión de un solo tap."""
    points = int(duration * rate)
    t = np.linspace(0, duration, points)
    # Usamos una función de Gauss para simular un perfil de presión suave
    profile = TAP_PRESSURE * np.exp(-((t - peak_time)**2) / (2 * (tap_duration/4)**2))
    return profile

def generate_short_tap(duration, rate):
    """Simula un tap corto, principalmente en la bola y los dedos."""
    timestamps, data = generate_base_noise(duration, rate)
    tap_profile = generate_tap_profile(duration, rate, 0.5, 0.6, 0.2)
    data[:, 1] += tap_profile  # FSR2: Bola del pie
    data[:, 2] += tap_profile * 0.8 # FSR3: Dedo gordo
    data[:, 3] += tap_profile * 0.6 # FSR4: Dedos medios
    return timestamps, np.maximum(0, data)

def generate_long_tap(duration, rate):
    """Simula un tap largo y sostenido."""
    timestamps, data = generate_base_noise(duration, rate)
    tap_profile = generate_tap_profile(duration, rate, 0.5, 0.8, 0.8)
    data[:, 1] += tap_profile
    data[:, 2] += tap_profile
    data[:, 3] += tap_profile
    return timestamps, np.maximum(0, data)

def generate_double_tap(duration, rate):
    """Simula dos taps cortos."""
    timestamps, data = generate_base_noise(duration, rate)
    tap1 = generate_tap_profile(duration, rate, 0.5, 0.6, 0.2)
    tap2 = generate_tap_profile(duration, rate, 1.0, 1.1, 0.2)
    data[:, 1] += tap1 + tap2
    data[:, 2] += (tap1 + tap2) * 0.8
    return timestamps, np.maximum(0, data)

def generate_heel_press(duration, rate):
    """Simula una presión deliberada con el talón."""
    timestamps, data = generate_base_noise(duration, rate)
    tap_profile = generate_tap_profile(duration, rate, 0.5, 1.0, 1.0)
    data[:, 0] += tap_profile # FSR1: Talón
    return timestamps, np.maximum(0, data)

def plot_gesture(timestamps, data, gesture_name, sample_num):
    """Crea y guarda un gráfico de una muestra de gesto."""
    plt.figure(figsize=(12, 6))
    for i in range(NUM_SENSORS):
        plt.plot(timestamps, data[:, i], label=f'FSR {i+1}')
    plt.title(f'Simulación de Gesto: {gesture_name} (Muestra #{sample_num})')
    plt.xlabel('Tiempo (s)')
    plt.ylabel('Presión (Normalizada)')
    plt.ylim(0, 1.2)
    plt.legend()
    plt.grid(True)
    plt.savefig(f'generated_data/plots/{gesture_name}_sample_{sample_num}.png')
    plt.close()

# --- SCRIPT PRINCIPAL ---
if __name__ == "__main__":
    print("🤖 Iniciando generación de dataset de gestos simulados...")
    
    # Mapeo de nombres de gestos a funciones generadoras
    gesture_generators = {
        "TAP_CORTO": generate_short_tap,
        "TAP_LARGO": generate_long_tap,
        "DOBLE_TAP": generate_double_tap,
        "PRESION_TALON": generate_heel_press,
        "REPOSO": generate_base_noise,
    }

    all_data = []

    for gesture_name, generator_func in gesture_generators.items():
        print(f"   - Generando {SAMPLES_PER_GESTURE} muestras para '{gesture_name}'...")
        for i in range(SAMPLES_PER_GESTURE):
            timestamps, data = generator_func(GESTURE_DURATION, SAMPLING_RATE)
            
            # Guardamos un gráfico de la primera muestra de cada gesto
            if i == 0:
                plot_gesture(timestamps, data, gesture_name, i+1)

            # Creamos un DataFrame y lo añadimos a nuestra lista
            df = pd.DataFrame(data, columns=[f'fsr{j+1}' for j in range(NUM_SENSORS)])
            df['timestamp'] = timestamps
            df['gesture_label'] = gesture_name
            # Añadimos un ID de muestra para agrupar las lecturas
            df['sample_id'] = f'{gesture_name}_{i}'
            all_data.append(df)

    # Combinamos todos los dataframes en uno solo
    final_dataset = pd.concat(all_data, ignore_index=True)
    
    # Reordenamos las columnas para mayor claridad
    final_dataset = final_dataset[['sample_id', 'timestamp', 'fsr1', 'fsr2', 'fsr3', 'fsr4', 'fsr5', 'gesture_label']]
    
    # Guardamos el dataset completo
    output_path = 'generated_data/csv/full_gesture_dataset.csv'
    final_dataset.to_csv(output_path, index=False)
    
    print(f"\n✅ ¡Dataset completo generado con éxito!")
    print(f"   - Total de muestras: {len(all_data)}")
    print(f"   - Total de lecturas: {len(final_dataset)}")
    print(f"   - Dataset guardado en: {output_path}")
    print(f"   - Gráficos de ejemplo guardados en: generated_data/plots/")