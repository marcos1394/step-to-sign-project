# Contenido corregido para: ai_model/train_model.py

import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.utils import to_categorical
import os

print("🧠 Iniciando el script de entrenamiento del modelo de IA...")

# --- CONFIGURACIÓN ---
# CORRECCIÓN: Añadimos la constante que faltaba. Nuestro modelo necesita saber que hay 5 sensores.
NUM_SENSORS = 5
DATASET_PATH = 'generated_data/csv/full_gesture_dataset.csv'
# --- FIN DE LA CORRECCIÓN ---

df = pd.read_csv(DATASET_PATH)
print(f"Dataset cargado con {len(df)} filas.")

# 2. Pre-procesamiento de los Datos
features = df[['fsr1', 'fsr2', 'fsr3', 'fsr4', 'fsr5']].values
labels = df['gesture_label'].values

encoder = LabelEncoder()
labels_encoded = encoder.fit_transform(labels)
labels_categorical = to_categorical(labels_encoded)
num_classes = labels_categorical.shape[1]
print(f"Clases de gestos encontradas: {num_classes} ({', '.join(encoder.classes_)})")

# 3. Dividir los datos en conjuntos de entrenamiento y de prueba
X_train, X_test, y_train, y_test = train_test_split(
    features, labels_categorical, test_size=0.2, random_state=42, stratify=labels_categorical
)
print(f"Datos divididos: {len(X_train)} para entrenamiento, {len(X_test)} para prueba.")

# 4. Definir la Arquitectura de nuestra Red Neuronal
model = Sequential([
    Dense(128, activation='relu', input_shape=(NUM_SENSORS,)),
    Dropout(0.5),
    Dense(64, activation='relu'),
    Dropout(0.5),
    Dense(num_classes, activation='softmax')
])

model.summary()

# 5. Compilar el Modelo
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# 6. Entrenar el Modelo
print("\n🔥 ¡Iniciando entrenamiento! Esto puede tardar un momento...")
history = model.fit(
    X_train,
    y_train,
    epochs=50,
    batch_size=32,
    validation_split=0.1,
    verbose=0
)
print("✅ Entrenamiento completado.")

# 7. Evaluar el Modelo
loss, accuracy = model.evaluate(X_test, y_test, verbose=0)
print(f"\n📈 Resultados de la evaluación:")
print(f"   - Pérdida (Loss) en el conjunto de prueba: {loss:.4f}")
print(f"   - Precisión (Accuracy) en el conjunto de prueba: {accuracy*100:.2f}%")

# 8. Guardar el Modelo Entrenado
MODEL_SAVE_PATH = 'trained_model/model_v1.h5'
os.makedirs('trained_model', exist_ok=True)
model.save(MODEL_SAVE_PATH)
print(f"\n💾 Modelo guardado exitosamente en: {MODEL_SAVE_PATH}")