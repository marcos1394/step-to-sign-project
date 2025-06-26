# Contenido completo para: ai_model/deepbook_oracle.py

import time
import os
import random
import sys
from pysui import SuiConfig, SuiRpcResult
from pysui.sui.sui_clients.sync_client import SuiClient
from pysui.sui.sui_tx_builder import SyncTransactionBuilder

# --- CONFIGURACIÓN ---
# El Package ID de tu último despliegue que incluye la función de emergencia.
PACKAGE_ID = "0x03acad74d33f82171f281de40b1b060bdfb2cfcb76b66134e3e89c309b2d86f1" 
# El umbral de precio que activará la transferencia
PRICE_THRESHOLD = 1.80 

def get_sui_price_from_deepbook() -> float:
    """
    Simula una consulta a DeepBook para obtener el precio actual de SUI/USDC.
    En un prototipo real, aquí se llamaría a la API de DeepBook.
    Para nuestra demo, simularemos un precio que a veces cae por debajo del umbral.
    """
    # Precio base + una pequeña fluctuación aleatoria
    simulated_price = 1.78 + random.random() * 0.05 
    print(f"Precio actual de SUI/USDC (simulado): ${simulated_price:.4f}")
    return simulated_price

def main(shared_wallet_id: str, safe_address: str):
    # 1. Configurar el cliente de Sui
    # Asegúrate de que tu `sui client` esté apuntando a testnet y tenga fondos
    try:
        sui_config = SuiConfig.default()
        client = SuiClient(sui_config)
        tx_builder = SyncTransactionBuilder(client)
        oracle_address = str(sui_config.active_address)
    except Exception as e:
        print(f"❌ Error al configurar el cliente de Sui: {e}")
        print("Asegúrate de haber configurado tu cliente con 'sui client new-env' o 'sui client switch'")
        return
    
    print(f"🤖 Oracle iniciado. Monitoreando el precio de SUI...")
    print(f"   - Billetera a proteger: {shared_wallet_id}")
    print(f"   - Dirección del Oracle: {oracle_address}")
    print(f"   - Dirección segura de respaldo: {safe_address}")
    print(f"   - Umbral de precio: < ${PRICE_THRESHOLD}")
    print("----------------------------------------------------")

    # 2. Bucle de monitoreo infinito
    while True:
        try:
            current_price = get_sui_price_from_deepbook()
            
            if current_price < PRICE_THRESHOLD:
                print(f"🚨 ¡ALERTA! El precio ha caído. Iniciando retiro de emergencia...")
                
                # Encontrar todas las monedas SUI propiedad de la SharedWallet
                wallet_contents = client.get_objects(shared_wallet_id)
                if wallet_contents.is_err():
                     print(f"Error al obtener los contenidos de la billetera: {wallet_contents.result_string}")
                     time.sleep(10)
                     continue

                sui_coins = [obj.result_data.object_id for obj in wallet_contents.result_data if "0x2::coin::Coin<0x2::sui::SUI>" in obj.result_data.type]

                if not sui_coins:
                    print("✅ No hay monedas SUI en la billetera para retirar. La billetera ya está segura. Terminando demo.")
                    break

                print(f"   - Monedas SUI encontradas en la billetera: {len(sui_coins)}")
                
                # Construir la transacción para llamar a emergency_withdraw
                print("   - Construyendo la transacción de retiro...")
                tx_result = tx_builder.move_call(
                    target=f"{PACKAGE_ID}::shared_wallet::emergency_withdraw",
                    arguments=[shared_wallet_id, sui_coins, safe_address],
                )
                
                # Firmar y ejecutar la transacción
                tx_result.signer_block.gas_budget = 50000000
                tx_result.signer_block.sender = oracle_address
                
                print("   - Firmando y ejecutando...")
                tx_response = client.execute(tx_result)

                if tx_response.is_ok():
                    print("✅ Transacción de retiro de emergencia ejecutada con éxito.")
                    print(f"   - Digest: {tx_response.result_data.digest}")
                    print(f"🔍 Explora la transacción en: https://suiscan.xyz/testnet/tx/{tx_response.result_data.digest}")
                else:
                    print(f"❌ Fallo al ejecutar la transacción: {tx_response.result_string}")

                print("--- Fin del ciclo de demo ---")
                break 

            time.sleep(10) # Esperamos 10 segundos entre cada verificación
        except Exception as e:
            print(f"Error durante el monitoreo: {e}")
            time.sleep(30) # Esperamos más tiempo si hay un error


if __name__ == "__main__":
    # El script ahora espera los IDs como argumentos desde la línea de comandos
    if len(sys.argv) == 3:
        wallet_id_from_arg = sys.argv[1]
        safe_address_from_arg = sys.argv[2]
        main(wallet_id_from_arg, safe_address_from_arg)
    else:
        print("\nUso incorrecto. Debes proporcionar el ID de la SharedWallet y la Dirección Segura.")
        print("Ejemplo: python ai_model/deepbook_oracle.py <SHARED_WALLET_ID> <SAFE_ADDRESS>")
