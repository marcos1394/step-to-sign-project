// =================================================================
//  KINETIS KEY - FIRMWARE v3.0 (Nivel Producción)
// =================================================================
// - Arquitectura de 5 sensores para mapa de presión plantar.
// - Gestos de alta seguridad basados en combinaciones.
// - Estructura modular y preparada para futuras expansiones.
// =================================================================

// --- 1. LIBRERÍAS ---
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <Preferences.h>
#include <uECC.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>



// --- 2. CONFIGURACIÓN DEL HARDWARE Y GESTOS ---
#define NUM_SENSORS 5
const int fsr_pins[NUM_SENSORS] = {4, 5, 6, 7, 8}; // Talón, Arco Ext, Arco Int, Bola, Dedo Gordo

#define VIBRATION_MOTOR_PIN 10

// UUIDs del Servicio BLE
#define SERVICE_UUID           "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define HASH_RX_CHAR_UUID      "beb5483e-36e1-4688-b7f5-ea07361b26a8"
#define SIGNATURE_TX_CHAR_UUID "8c973529-548c-452f-831e-451368936990"

// Constantes de Detección
const int PRESS_THRESHOLD = 2000;         // Sensibilidad de presión
const int LONG_PRESS_MIN_DURATION = 750;  // Gesto de firma requiere > 0.75 seg
const int SHORT_TAP_MAX_DURATION = 300;   // Un tap corto dura menos de 0.3 seg
const int PANIC_TAP_INTERVAL = 400;       // Intervalo máximo para el gesto de pánico

// --- 3. VARIABLES GLOBALES ---
Preferences preferences;
BLEServer* pServer = NULL;
BLECharacteristic* pSignatureCharacteristic = NULL;
bool deviceConnected = false;
Adafruit_MPU6050 mpu; // Objeto para el sensor IMU


// Estado para cada sensor
bool fsr_isPressed[NUM_SENSORS] = {false};
unsigned long fsr_pressStartTime[NUM_SENSORS] = {0};
unsigned long step_count = 0;
const float STEP_THRESHOLD = 1.5; // Umbral de aceleración para detectar un paso (ajustable)
bool step_is_possible = true;

// Estado para el flujo de firma y pánico
uint8_t hash_to_sign[32];
bool hash_is_ready_to_sign = false;
int panic_tap_counter = 0;
unsigned long last_panic_tap_time = 0;

// Claves Criptográficas
uint8_t private_key[32];
uint8_t public_key[64];


// =======================   LA CORRECCIÓN CLAVE   ========================
// --- 4. FUNCIÓN DE ALEATORIEDAD PARA uECC ---
// Esta función actúa como un reemplazo del generador de números aleatorios
// de hardware, que no existe en el simulador.
int custom_rng_for_uecc(uint8_t *dest, unsigned size) {
  while (size) {
    uint8_t val = 0;
    for (unsigned i = 0; i < 8; ++i) {
      val = (val << 1) | (random(0, 2));
    }
    *dest = val;
    ++dest;
    --size;
  }
  return 1;
}
// =======================================================================


// --- 5. CLASES DE CALLBACKS PARA BLUETOOTH ---
class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) { deviceConnected = true; Serial.println("✅ Dispositivo conectado"); }
    void onDisconnect(BLEServer* pServer) { deviceConnected = false; Serial.println("❌ Dispositivo desconectado"); }
};

class HashCallback: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pCharacteristic) {
        String rxValue = pCharacteristic->getValue().c_str();
        if (rxValue.length() == 32) {
            memcpy(hash_to_sign, rxValue.c_str(), 32);
            hash_is_ready_to_sign = true;
            Serial.println("✍️ Hash de 32 bytes recibido. Esperando gesto del usuario...");
        } else {
            Serial.println("Error: Se recibió un payload que no es de 32 bytes.");
        }
    }
};

// --- 6. FUNCIONES AUXILIARES ---

void init_imu() {
  Serial.println("-> Inicializando sensor IMU (MPU-6050)...");
  if (!mpu.begin()) {
    Serial.println("🔥 Error: No se encontró el sensor MPU-6050. Verifica las conexiones.");
    while (1) {
      delay(10);
    }
  }
  mpu.setAccelerometerRange(MPU6050_RANGE_8_G);
  mpu.setGyroRange(MPU6050_RANGE_500_DEG);
  mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);
  Serial.println("   - Sensor IMU listo.");
}

void update_step_count() {
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);

  // Calculamos la magnitud del vector de aceleración
  float total_accel = sqrt(pow(a.acceleration.x, 2) + pow(a.acceleration.y, 2) + pow(a.acceleration.z, 2));
  // Restamos la gravedad para obtener la aceleración dinámica del movimiento
  float dynamic_accel = abs(total_accel - 9.8);

  if (dynamic_accel > STEP_THRESHOLD && step_is_possible) {
    step_count++;
    step_is_possible = false; // Evita contar el mismo paso varias veces
    Serial.printf("👟 ¡Paso detectado! Pasos totales: %lu\n", step_count);
  } else if (dynamic_accel < 1.0) {
    step_is_possible = true; // El pie está en reposo, listo para el siguiente paso
  }
}

void print_hex(uint8_t* data, int len) {
  for(int i=0; i<len; i++){ Serial.printf("%02x", data[i]); }
  Serial.println();
}

void init_crypto_keys() {
    // Le decimos a uECC que use nuestra función de aleatoriedad personalizada.
    uECC_set_rng(&custom_rng_for_uecc);

    preferences.begin("crypto", false);
    size_t bytes_read = preferences.getBytes("private_key", private_key, 32);

    if (bytes_read == 0) {
        Serial.println("🔑 No se encontró clave privada. Generando una nueva...");
        if (uECC_make_key(public_key, private_key, uECC_secp256k1())) {
            preferences.putBytes("private_key", private_key, 32);
            Serial.println("✅ Nueva clave privada generada y guardada en NVS.");
        } else {
            Serial.println("🔥 Error crítico al generar la clave.");
        }
    } else {
        Serial.println("🔑 Clave privada cargada desde NVS.");
        uECC_compute_public_key(private_key, public_key, uECC_secp256k1());
    }

    Serial.print("🔑 Clave Pública del Zapato: ");
    print_hex(public_key, 64);
    preferences.end();
}

void sign_hash_and_notify() {
    uint8_t signature[64];
    Serial.println("🖋️  Firmando el hash con la clave del zapato...");
    if (uECC_sign(private_key, hash_to_sign, sizeof(hash_to_sign), signature, uECC_secp256k1())) {
        Serial.print("✅ Firma generada: ");
        print_hex(signature, 64);
        if (deviceConnected) {
            pSignatureCharacteristic->setValue(signature, sizeof(signature));
            pSignatureCharacteristic->notify();
            Serial.println("🚀 ¡Firma enviada a la App vía BLE!");
        }
    } else {
        Serial.println("🔥 Error crítico al firmar el hash.");
    }
}

/**
 * Activa el motor de vibración por una duración específica.
 * @param duration_ms El tiempo en milisegundos que el motor debe vibrar.
 */
void trigger_vibration(int duration_ms) {
    digitalWrite(VIBRATION_MOTOR_PIN, HIGH);
    delay(duration_ms);
    digitalWrite(VIBRATION_MOTOR_PIN, LOW);
}

// --- 6. FUNCIÓN SETUP ---
void setup() {
    Serial.begin(115200);
    Serial.println("\n✅ Iniciando Kinetis Key v3.1 (con IMU)...");
    
    pinMode(VIBRATION_MOTOR_PIN, OUTPUT);
    init_crypto_keys();
    init_imu(); // <-- AÑADIR ESTA LÍNEA
    
    Serial.println("📡 Configurando BLE...");
    BLEDevice::init("Kinetis Key"); // Nuevo nombre de dispositivo
    pServer = BLEDevice::createServer();
    pServer->setCallbacks(new MyServerCallbacks());
    BLEService *pService = pServer->createService(SERVICE_UUID);

    BLECharacteristic* pHashCharacteristic = pService->createCharacteristic(HASH_RX_CHAR_UUID, BLECharacteristic::PROPERTY_WRITE);
    pHashCharacteristic->setCallbacks(new HashCallback());

    pSignatureCharacteristic = pService->createCharacteristic(SIGNATURE_TX_CHAR_UUID, BLECharacteristic::PROPERTY_NOTIFY);
    pSignatureCharacteristic->addDescriptor(new BLE2902());
    
    pService->start();
    BLEDevice::startAdvertising();
    Serial.println("👟 Dispositivo listo y anunciándose. Esperando interacción...");
}

// --- 7. FUNCIÓN LOOP (MOTOR DE GESTOS Y MOVIMIENTO DE PRODUCCIÓN) ---
void loop() {
  // Reseteamos el contador de pánico si el usuario tarda mucho entre taps
  if (panic_tap_counter > 0 && millis() - last_panic_tap_time > PANIC_TAP_INTERVAL) {
    panic_tap_counter = 0;
    Serial.println("-> Contador de pánico reseteado por timeout.");
  }
  
  // --- PROCESAMIENTO DE MOVIMIENTO (IMU) ---
  // En cada ciclo, leemos el acelerómetro y actualizamos el conteo de pasos.
  update_step_count();

  // --- PROCESAMIENTO DE PRESIÓN (FSRs) ---
  // Leemos los 5 sensores para tener un mapa de presión actualizado.
  for (int i = 0; i < NUM_SENSORS; i++) {
    int fsr_value = analogRead(fsr_pins[i]);

    // Lógica de PRESIÓN (inicio del gesto) para el sensor 'i'
    if (!fsr_isPressed[i] && fsr_value > PRESS_THRESHOLD) {
      fsr_isPressed[i] = true;
      fsr_pressStartTime[i] = millis();
    } 
    // Lógica de LIBERACIÓN (fin del gesto) para el sensor 'i'
    else if (fsr_isPressed[i] && fsr_value < PRESS_THRESHOLD) {
      unsigned long pressDuration = millis() - fsr_pressStartTime[i];
      fsr_isPressed[i] = false;

      // GESTO DE PÁNICO: Se evalúa aquí porque es un gesto de "taps" (presionar y soltar)
      // Lo hemos asignado al sensor de la BOLA DEL PIE (índice 3)
      if (i == 3 && pressDuration >= 10 && pressDuration <= SHORT_TAP_MAX_DURATION) {
        panic_tap_counter++;
        last_panic_tap_time = millis();
        Serial.printf("-> Tap de pánico detectado en la bola del pie (%d/3)\n", panic_tap_counter);

        if (panic_tap_counter >= 3) {
            Serial.println("🚨>>> Gesto de PÁNICO (TRIPLE_TAP) detectado!");
            trigger_vibration(500); // Vibración larga y urgente
            if (deviceConnected) {
                pSignatureCharacteristic->setValue("PANIC_GESTURE");
                pSignatureCharacteristic->notify();
                Serial.println("🚀 ¡Señal de PÁNICO enviada a la App!");
            }
            panic_tap_counter = 0; // Reseteamos el contador
        }
      }
    }
  }

  // --- LÓGICA DE DETECCIÓN DE GESTOS COMBINADOS ---
  // Se evalúa fuera del bucle 'for' para comprobar el estado simultáneo de los sensores.

  // GESTO DE FIRMA: Requiere presión larga y SIMULTÁNEA en TALÓN (0) y DEDO GORDO (4)
  bool heel_is_held = fsr_isPressed[0] && (millis() - fsr_pressStartTime[0] > LONG_PRESS_MIN_DURATION);
  bool toe_is_held = fsr_isPressed[4] && (millis() - fsr_pressStartTime[4] > LONG_PRESS_MIN_DURATION);

  if (heel_is_held && toe_is_held) {
    Serial.println("✅>>> Gesto de FIRMA de alta seguridad detectado!");
    
    // Reseteamos los tiempos para que la firma se ejecute solo una vez por gesto
    fsr_pressStartTime[0] = millis();
    fsr_pressStartTime[4] = millis();
    
    // Un gesto de firma siempre resetea el contador de pánico para evitar activaciones accidentales
    panic_tap_counter = 0; 
    
    if (hash_is_ready_to_sign) {
      trigger_vibration(150); // Vibración corta de confirmación
      sign_hash_and_notify();
      hash_is_ready_to_sign = false; 
    } else {
      Serial.println("   (Gesto de firma ignorado, no hay hash pendiente)");
    }
  }

  delay(20); // Delay corto para una alta frecuencia de muestreo
}