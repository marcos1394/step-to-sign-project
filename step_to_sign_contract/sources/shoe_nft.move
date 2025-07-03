// =================================================================
//  STEP-TO-SIGN: CONTRATO DE NFT v2.1 (Kiosk Corregido)
// =================================================================
// - Corregida la interacción con el Sui Kiosk Standard.
// - Las funciones que modifican el Kiosk ahora requieren KioskOwnerCap.
// =================================================================

module step_to_sign::shoe_nft {
    use sui::object::{Self, ID, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event;
    use std::string::{Self, String};
    use sui::url::{Self, Url};
    use sui::kiosk::{Self, Kiosk, KioskOwnerCap};

    // --- Errores ---
    const ENotStatsOracle: u64 = 1;

    // --- Estructuras ---
    public struct ShoeAdminCap has key, store { id: UID }
      // ¡CAMBIO CLAVE! La capacidad del oráculo ahora solo tiene 'key' para poder ser compartida.
    public struct StatsOracleCap has key { id: UID }

    public struct ShoeNFT has key, store {
        id: UID,
        name: String,
        description: String,
        url: Url,
        serial_number: u64,
        level: u64,
        steps_total: u64,
        model_version: String,
        model_cid: String
    }

    // --- Eventos ---
    public struct ShoeMinted has copy, drop { nft_id: ID, kiosk_id: ID, serial_number: u64 }
    public struct StatsUpdated has copy, drop { nft_id: ID, new_level: u64, new_total_steps: u64 }
    public struct ModelUpdatedOnNFT has copy, drop { nft_id: ID, new_model_version: String, new_model_cid: String }

    // --- Funciones ---

    fun init(ctx: &mut TxContext) {
        let sender = tx_context::sender(ctx);
        transfer::transfer(ShoeAdminCap { id: object::new(ctx) }, sender);
        transfer::share_object(StatsOracleCap { id: object::new(ctx) });
    }

    public entry fun mint_and_place_in_kiosk(
        _admin_cap: &ShoeAdminCap,
        kiosk: &mut Kiosk,
        kiosk_cap: &KioskOwnerCap, // Se necesita la CAP del dueño del Kiosk para autorizar.
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        serial_number: u64,
        ctx: &mut TxContext
    ) {
        let nft = ShoeNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(url),
            serial_number,
            level: 1,
            steps_total: 0,
            model_version: string::utf8(b"v1.0-base"),
            model_cid: string::utf8(b"")
        };

        event::emit(ShoeMinted {
            nft_id: object::id(&nft),
            kiosk_id: object::id(kiosk),
            serial_number
        });
        
        // CORRECCIÓN: La función place necesita 3 argumentos.
        kiosk::place(kiosk, kiosk_cap, nft);
    }
    
   // Ahora el USUARIO llama a esta función, pasando el KioskCap y el StatsOracleCap compartido.
    public entry fun update_stats(
        kiosk: &mut Kiosk,
        kiosk_cap: &KioskOwnerCap,
        nft_id: ID, // CORRECCIÓN: Pasamos el ID, no el objeto NFT directamente.
        oracle_cap: &StatsOracleCap,
        new_steps_session: u64,
        _ctx: &mut TxContext // _ctx para marcarlo como no utilizado explícitamente
    ){
       // La autorización del oráculo es implícita al requerir el tipo 'StatsOracleCap'.
        
        // CORRECCIÓN: Obtenemos una referencia mutable al NFT de forma segura DESDE el Kiosk.
        let nft: &mut ShoeNFT = kiosk::borrow_mut(kiosk, kiosk_cap, nft_id);
        nft.steps_total = nft.steps_total + new_steps_session;
        let new_level = 1 + (nft.steps_total / 10000);
        if (new_level > nft.level) {
            nft.level = new_level;
        };
        event::emit(StatsUpdated {
            nft_id: object::id(nft),
            new_level: nft.level,
            new_total_steps: nft.steps_total,
        });
    }

    // FUNCIÓN CORREGIDA para seguir el mismo patrón seguro de Kiosk.
    public entry fun update_model_on_nft(
        kiosk: &mut Kiosk,
        kiosk_cap: &KioskOwnerCap, // El dueño del Kiosk autoriza la modificación.
        nft_id: ID,
        new_model_version: vector<u8>,
        new_model_cid: vector<u8>
    ) {
        let nft: &mut ShoeNFT = kiosk::borrow_mut(kiosk, kiosk_cap, nft_id);
        
        nft.model_version = string::utf8(new_model_version);
        nft.model_cid = string::utf8(new_model_cid);

        event::emit(ModelUpdatedOnNFT {
            nft_id: object::id(nft),
            new_model_version: nft.model_version,
            new_model_cid: nft.model_cid
        });
    }
}