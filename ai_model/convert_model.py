# Contenido corregido para: ai_model/convert_model.py

import tensorflow as tf
import os

print("🤖 Iniciando conversión a TensorFlow Lite...")

# Cargar el modelo H5 que entrenamos
MODEL_PATH = 'trained_model/model_v2_lstm.h5'
model = tf.keras.models.load_model(MODEL_PATH)
print("✅ Modelo H5 cargado exitosamente.")

# Inicializar el conversor de TFLite
converter = tf.lite.TFLiteConverter.from_keras_model(model)

# --- LA CORRECCIÓN CLAVE ---
# Le damos al convertidor las instrucciones que el propio error nos sugirió.
# Esto le permite manejar las operaciones complejas de la LSTM.
converter.target_spec.supported_ops = [
    tf.lite.OpsSet.TFLITE_BUILTINS, # Usa operaciones nativas de TFLite cuando sea posible
    tf.lite.OpsSet.SELECT_TF_OPS  # Y usa operaciones de TensorFlow cuando no haya un equivalente
]
converter._experimental_lower_tensor_list_ops = False
# --- FIN DE LA CORRECCIÓN ---


# Aplicar optimizaciones para hacerlo aún más pequeño y rápido
converter.optimizations = [tf.lite.Optimize.DEFAULT]

# Realizar la conversión
tflite_model = converter.convert()
print("✅ Modelo convertido a formato TFLite.")

# Guardar el nuevo modelo .tflite
TFLITE_MODEL_PATH = 'trained_model/model_v2.tflite'
with open(TFLITE_MODEL_PATH, 'wb') as f:
    f.write(tflite_model)

print(f"\n💾 ¡Éxito! Modelo TFLite guardado en: {TFLITE_MODEL_PATH}")
original_size_kb = os.path.getsize(MODEL_PATH) / 1024
tflite_size_kb = len(tflite_model) / 1024
print(f"   - Tamaño original (H5): {original_size_kb:.2f} KB")
print(f"   - Tamaño nuevo (TFLite): {tflite_size_kb:.2f} KB")
print(f"   - Reducción de tamaño: {(1 - tflite_size_kb / original_size_kb) * 100:.2f}%")