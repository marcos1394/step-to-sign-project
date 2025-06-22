// Contenido para: fund_wallet.ts

import { getFaucetHost, requestSuiFromFaucetV2 } from '@mysten/sui/faucet';

// IMPORTANTE: Esta es la dirección de nuestro SCRIPT, la que queremos fondear.
const SCRIPT_WALLET_ADDRESS = '0x279f5ab206d6b15756b8b0d0fc99e802b114334bc36556e50d66ac3c65cc0f17';

async function fundWallet() {
  console.log(`💧 Intentando fondear la billetera de la app: ${SCRIPT_WALLET_ADDRESS}...`);

  try {
    await requestSuiFromFaucetV2({
      host: getFaucetHost('testnet'),
      recipient: SCRIPT_WALLET_ADDRESS,
    });
    console.log('✅ ¡Éxito! El faucet ha enviado SUI de prueba. Puede tardar un momento en reflejarse en la red.');
  } catch (e) {
    console.error('❌ Error al solicitar fondos del faucet.');
    console.error('Posibles razones:');
    console.error('  1. Límite de solicitudes alcanzado. El faucet de Testnet es sensible. Intenta de nuevo más tarde.');
    console.error('  2. La billetera ya tiene suficientes fondos.');
    console.error('\nSi este error persiste, la alternativa es usar el faucet de Discord.');
  }
}

fundWallet();