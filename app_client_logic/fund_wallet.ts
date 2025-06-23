// Contenido para: app_client_logic/fund_wallet.ts

import { getFaucetHost, requestSuiFromFaucetV2 } from '@mysten/sui/faucet';

// IMPORTANTE: Hemos puesto aquí la dirección de tu BILLETERA DE TERMINAL.
const ADDRESS_TO_FUND = '0xd02d51c08c102187b5ca3d90a0ca6da2ba26099d7d3c38e40a51e68d35463071';

async function fundWallet() {
  console.log(`💧 Intentando fondear la billetera de la terminal: ${ADDRESS_TO_FUND}...`);

  try {
    await requestSuiFromFaucetV2({
      host: getFaucetHost('devnet'), // Apuntando a devnet
      recipient: ADDRESS_TO_FUND,
    });
    console.log('✅ ¡Éxito! El faucet ha enviado SUI de prueba. Puede tardar un momento en reflejarse.');
  } catch (e) {
    console.error('❌ Error al solicitar fondos del faucet. Posibles razones: límite de solicitudes o la billetera ya tiene fondos.');
  }
}

fundWallet();