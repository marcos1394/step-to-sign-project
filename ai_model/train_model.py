# Contenido para: ai_model/train_model.py (Versión 2.0 con LSTM)

import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.models import Sequential
# Importamos las capas necesarias para una red neuronal recurrente (LSTM)
from tensorflow.keras.layers import LSTM, Dense, Dropout, BatchNormalization
from tensorflow.keras.utils import to_categorical
import os

print("🧠 Iniciando el script de entrenamiento del modelo v2 (LSTM)...")

# --- CONFIGURACIÓN ---
NUM_SENSORS = 5
DATASET_PATH = 'generated_data/csv/full_gesture_dataset.csv'
# Para una LSTM, necesitamos definir la longitud de la secuencia que analizará
TIME_STEPS = 100 # Analizaremos los gestos en ventanas de 100 lecturas de tiempo

# --- 1. Cargar y Pre-procesar los Datos para Secuencias ---
df = pd.read_csv(DATASET_PATH)
print(f"Dataset cargado con {len(df)} filas.")

# Codificar etiquetas a números
encoder = LabelEncoder()
df['label_encoded'] = encoder.fit_transform(df['gesture_label'])
num_classes = len(encoder.classes_)
print(f"Clases de gestos encontradas: {num_classes} ({', '.join(encoder.classes_)})")

# Agrupar por 'sample_id' para crear secuencias
sequences = []
labels = []
for _, group in df.groupby('sample_id'):
    # Tomamos solo las lecturas de los sensores
    feature_data = group[['fsr1', 'fsr2', 'fsr3', 'fsr4', 'fsr5']].values
    label = group['label_encoded'].iloc[0]
    
    # Creamos secuencias de longitud TIME_STEPS
    for i in range(len(feature_data) - TIME_STEPS + 1):
        sequences.append(feature_data[i:i+TIME_STEPS])
        labels.append(label)

X = np.array(sequences)
y = to_categorical(np.array(labels), num_classes=num_classes)

print(f"Datos convertidos a {len(X)} secuencias de forma: {X.shape}")

# 2. Dividir los datos en entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
print(f"Datos divididos: {len(X_train)} para entrenamiento, {len(X_test)} para prueba.")


# 3. Definir la Arquitectura del Modelo LSTM
# Esta arquitectura es mucho más potente para datos secuenciales.
model = Sequential([
    # La capa LSTM es el corazón, aprende de las secuencias de tiempo.
    LSTM(64, return_sequences=True, input_shape=(TIME_STEPS, NUM_SENSORS)),
    Dropout(0.5),
    LSTM(32),
    Dropout(0.5),
    Dense(32, activation='relu'),
    # La capa de salida sigue siendo la misma.
    Dense(num_classes, activation='softmax')
])

model.summary()

# 4. Compilar y Entrenar el Modelo
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

print("\n🔥 ¡Iniciando entrenamiento del modelo LSTM! Será más intensivo...")
history = model.fit(
    X_train, y_train,
    epochs=20, # Con LSTM, a menudo se necesita menos epochs para converger
    batch_size=64,
    validation_data=(X_test, y_test),
    verbose=1 # Mostramos el progreso para ver cómo mejora
)
print("✅ Entrenamiento completado.")

# 5. Evaluar y Guardar
loss, accuracy = model.evaluate(X_test, y_test, verbose=0)
print(f"\n📈 Resultados Finales del Modelo LSTM:")
print(f"   - Pérdida (Loss) en el conjunto de prueba: {loss:.4f}")
print(f"   - Precisión (Accuracy) en el conjunto de prueba: {accuracy*100:.2f}%")

MODEL_SAVE_PATH = 'trained_model/model_v2_lstm.h5'
os.makedirs('trained_model', exist_ok=True)
model.save(MODEL_SAVE_PATH)
print(f"\n💾 Modelo LSTM de alta precisión guardado en: {MODEL_SAVE_PATH}")