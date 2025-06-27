# Contenido FINAL y DEFINITIVO, construido con la arquitectura GraphQL de la v0.86.0

import time
import random
import sys
import os

# =======================   IMPORTACIONES PARA LA ARQUITECTURA MODERNA (GraphQL)   ========================
# 1. La nueva configuración para GraphQL
from pysui.sui.sui_pgql.config.pysui_config import PysuiConfiguration
# 2. El NUEVO cliente para GraphQL
from pysui.sui.sui_pgql.pgql_clients import SuiGQLClient
# 3. El "QueryNode" para pedir las monedas, como dice tu tabla
from pysui.sui.sui_pgql.pgql_query import GetCoins
# 4. El constructor de transacciones para el mundo GraphQL
from pysui.sui.sui_pgql.pgql_sync_txn import SuiTransaction
# 5. Los tipos para ser explícitos, que ya conocemos
from pysui.sui.sui_types.address import SuiAddress
from pysui.sui.sui_types.scalars import ObjectID
# =======================================================================================================

# --- CONFIGURACIÓN ---
PACKAGE_ID = "0x89c1a5bce85ddb05a72c79f0335392194efb6620fab79ddf34bb2178af715cf9" 
PRICE_THRESHOLD = 1.80

def get_sui_price_from_deepbook() -> float:
    """Simula una consulta a DeepBook para obtener el precio actual de SUI/USDC."""
    simulated_price = 1.78 + random.random() * 0.04
    print(f"🪙  Precio SUI/USDC (simulado): ${simulated_price:.4f}")
    return simulated_price

def main(shared_wallet_id: str, safe_address: str):
    # 1. Configuración del Cliente para GraphQL
    try:
        print("INFO: Cargando configuración en modo GraphQL con PysuiConfiguration...")
        pysui_config = PysuiConfiguration.from_sui_config()
        # Usamos el cliente GraphQL
        client = SuiGQLClient(pysui_config)
        oracle_address = str(pysui_config.active_address)
    except Exception as e:
        print(f"❌ Error fatal al configurar el cliente de Sui: {e}")
        return
    
    print("🤖 Oracle de DeepBook iniciado. Monitoreando precios...")
    print(f"   - Billetera a proteger: {shared_wallet_id}")
    print(f"   - Dirección del Oracle: {oracle_address}")
    print(f"   - Dirección segura de respaldo: {safe_address}")
    print(f"   - Umbral de activación: < ${PRICE_THRESHOLD}")
    print("------------------------------------------------------------------")

    # 2. Bucle de monitoreo
    while True:
        try:
            current_price = get_sui_price_from_deepbook()
            
            if current_price < PRICE_THRESHOLD:
                print(f"🚨 ¡ALERTA! El precio cruzó el umbral. Iniciando retiro de emergencia...")
                
                # PASO A: OBTENER MONEDAS CON EL MÉTODO MODERNO
                print(f"   - Buscando monedas SUI en la billetera compartida (modo GraphQL)...")
                # Creamos el "QueryNode" como indica tu tabla
                query_node = GetCoins(owner=shared_wallet_id)
                # Ejecutamos el nodo con el cliente GraphQL
                coins_in_wallet = client.execute_query_node(with_node=query_node)

                if coins_in_wallet.is_err() or not coins_in_wallet.result_data.data:
                    print("   - ✅ No se encontraron monedas SUI en la billetera para retirar. Terminando demo.")
                    break
                
                coin_ids = [c.coin_object_id for c in coins_in_wallet.result_data.data]
                print(f"   - {len(coin_ids)} monedas SUI encontradas. Preparando para retirar.")

                # PASO B: CONSTRUIR Y EJECUTAR LA TRANSACCIÓN CON EL MÉTODO MODERNO
                # Usamos el constructor de transacciones de GraphQL
                txer = SuiTransaction(client=client)
                
                # El resto de la lógica es la que ya habíamos descubierto
                move_vec = txer.make_move_vector(items=coin_ids, item_type="0x2::coin::Coin<0x2::sui::SUI>")

                txer.move_call(
                    target=f"{PACKAGE_ID}::shared_wallet::emergency_withdraw",
                    arguments=[
                        ObjectID(shared_wallet_id),
                        move_vec,
                        SuiAddress(safe_address)
                    ],
                )
                
                print("   - Firmando y ejecutando la transacción...")
                tx_response = txer.execute(gas_budget="50000000")

                if tx_response.is_ok():
                    print("✅ ¡VICTORIA FINAL! Transacción de retiro de emergencia ejecutada con éxito.")
                    digest = tx_response.result_data.digest
                    print(f"   - Digest: {digest}")
                    print(f"🔍 Explora la transacción en: https://suiscan.xyz/testnet/tx/{digest}")
                else:
                    print(f"❌ Fallo al ejecutar la transacción: {tx_response.result_string}")

                print("--- Fin del ciclo de demo ---")
                break 

            time.sleep(10)
        except Exception as e:
            print(f"❌ Error durante el monitoreo: {e}")
            time.sleep(30)

if __name__ == "__main__":
    if len(sys.argv) == 3:
        main(sys.argv[1], sys.argv[2])
    else:
        print("\nUso incorrecto. Debes proporcionar el ID de la SharedWallet y la Dirección Segura.")
        print(f"Ejemplo: python {sys.argv[0]} <SHARED_WALLET_ID> <SAFE_ADDRESS>")