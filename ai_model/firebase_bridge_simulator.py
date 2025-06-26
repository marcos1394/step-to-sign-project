# Contenido final para: ai_model/firebase_bridge_simulator.py

import firebase_admin
from firebase_admin import credentials, db
import time
import base64
import numpy as np
import tensorflow as tf
from pysui.sui.sui_crypto import SuiKeystore,SuiKeyPair # Necesitaremos una librería de cripto

# --- 1. CONFIGURACIÓN ---
# La clave secreta del zapato (debe coincidir con la usada en la app)
SHOE_SECRET_KEY_B64 = "xY+HWAwzztWjYp00T8y+G0sEwT+P3N+c1eY4j8lVpjs=" # suiprivkey1qq2... en Base64

cred = credentials.Certificate('firebase-credentials.json')
try:
    firebase_admin.get_app()
except ValueError:
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://step-to-sign-hackathon-default-rtdb.firebaseio.com/' # USA TU URL REAL
    })

# Cargamos el Keypair del zapato para poder firmar
shoe_keypair = SuiKeyPair.from_b64(SHOE_SECRET_KEY_B64)

# Cargamos el modelo de IA optimizado
interpreter = tf.lite.Interpreter(model_path="trained_model/model_v2.tflite")
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()
CLASS_NAMES = ['DOBLE_TAP', 'PRESION_TALON', 'REPOSO', 'TAP_CORTO', 'TAP_LARGO']


print("✅ Simulador de Zapato v2 Conectado a Firebase y con IA cargada.")
print(f"   - Firmando como: {shoe_keypair.to_sui_address()}")

# --- 2. LÓGICA DE FIRMA ---
def process_gesture_and_sign(tx_bytes: bytes) -> str:
    """Simula la detección de gestos y firma la transacción si es válida."""
    
    # En un escenario real, aquí leeríamos los datos de los sensores.
    # Por ahora, simulamos un gesto de DOBLE_TAP exitoso.
    print("🤖 Analizando gesto simulado (DOBLE_TAP)...")
    time.sleep(1) # Simula el tiempo de análisis
    
    # Aquí iría la lógica del modelo TFLite. Como es una simulación, asumimos que el gesto es correcto.
    detected_gesture = "DOBLE_TAP"
    print(f"👍 Gesto validado como: {detected_gesture}")

    # Ahora, firmamos los bytes de la transacción con la clave del zapato.
    signature = shoe_keypair.sign(tx_bytes)
    print("✍️  Firma del zapato generada.")
    return signature


# --- 3. EL ESCUCHA DE FIREBASE ---
def signing_request_listener(event):
    if event.path == "/" or not event.data:
        return

    request_id = event.path.strip("/")
    request_data = event.data

    # Decodificamos la transacción de Base64 a bytes crudos
    tx_bytes_b64 = request_data.get("transactionPayload")
    tx_bytes = base64.b64decode(tx_bytes_b64)
    
    print(f"\n👟 Zapato ha recibido una petición de firma [ID: {request_id}]")
    
    # 1. Ejecutamos nuestra lógica.
    shoe_signature_b64 = process_gesture_and_sign(tx_bytes)

    # 2. Preparamos la respuesta para la app.
    response_ref = db.reference(f'signing_responses/{request_id}')
    response_ref.set({
        'signature': shoe_signature_b64,
        'status': 'completed',
        'timestamp': time.time()
    })
    print(f"📬 Respuesta con firma enviada a Firebase.")
    db.reference(f'signing_requests/{request_id}').delete()


# --- 4. INICIAR EL PROCESO ---
# Limpiamos peticiones antiguas al iniciar
db.reference('signing_requests').delete()
db.reference('signing_responses').delete()
print("🎧 Escucha inicializado. Esperando peticiones de firma de la app...")
db.reference('signing_requests').listen(signing_request_listener)

try:
    while True: time.sleep(1)
except KeyboardInterrupt:
    print("\n🛑 Simulador detenido.")