module step_to_sign::shoe_nft {
    use sui::object::{Self, ID, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event;
    use std::string::{Self, String};
    use sui::url::{Self, Url};
    use sui::kiosk::{Self, Kiosk, KioskOwnerCap};
    use sui::transfer::public_transfer;

    // --- Errores ---
    const ENotStatsOracle: u64 = 1;

    // --- Estructuras ---
    public struct ShoeAdminCap has key, store { id: UID }
    public struct StatsOracleCap has key { id: UID }

    public struct ShoeNFT has key, store {
        id: UID,
        name: String,
        description: String,
        url: Url,
        // CAMBIO: Se añade la clave pública del dispositivo físico. ¡Esto es crucial!
        device_public_key: vector<u8>, 
        serial_number: u64,
        level: u64,
        steps_total: u64,
        model_version: String,
        model_cid: String
    }

    // --- Eventos ---
    // CAMBIO: El evento de minteo ya no necesita el kiosk_id.
    public struct ShoeMinted has copy, drop { nft_id: ID, owner: address, serial_number: u64 }
    public struct StatsUpdated has copy, drop { nft_id: ID, new_level: u64, new_total_steps: u64 }
    public struct ModelUpdatedOnNFT has copy, drop { nft_id: ID, new_model_version: String, new_model_cid: String }

    // --- Funciones ---

    fun init(ctx: &mut TxContext) {
        let sender = tx_context::sender(ctx);
        transfer::transfer(ShoeAdminCap { id: object::new(ctx) }, sender);
        transfer::share_object(StatsOracleCap { id: object::new(ctx) });
    }

    // =================================================================
    // CAMBIO: NUEVA FUNCIÓN DE MINTEO - ESTA ES LA PRINCIPAL AHORA
    // =================================================================
    // No sabe nada de Kiosks. Solo crea el NFT y lo transfiere al dueño.
    public entry fun mint(
        _admin_cap: &ShoeAdminCap,
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        device_public_key: vector<u8>, // Recibe la clave del zapato
        serial_number: u64,
        recipient: address, // La dirección del dueño (la cuenta Multisig)
        ctx: &mut TxContext
    ) {
        let nft = ShoeNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(url),
            device_public_key, // Se guarda en el NFT
            serial_number,
            level: 1,
            steps_total: 0,
            model_version: string::utf8(b"v1.0-base"),
            model_cid: string::utf8(b"")
        };

        event::emit(ShoeMinted {
            nft_id: object::id(&nft),
            owner: recipient,
            serial_number
        });
        
        // Transfiere el NFT directamente al dueño.
        public_transfer(nft, recipient);
    }
    
    // =================================================================
    // CAMBIO: Esta función ahora es una "ayudante" opcional.
    // =================================================================
    // Para el caso de uso donde se quiere mintear y listar para la venta en un solo paso.
    public entry fun mint_and_place_in_kiosk(
        admin_cap: &ShoeAdminCap,
        kiosk: &mut Kiosk,
        kiosk_cap: &KioskOwnerCap,
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        device_public_key: vector<u8>,
        serial_number: u64,
        ctx: &mut TxContext
    ) {
        // La lógica interna de crear el NFT es la misma...
        let nft = ShoeNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(url),
            device_public_key,
            serial_number,
            level: 1,
            steps_total: 0,
            model_version: string::utf8(b"v1.0-base"),
            model_cid: string::utf8(b"")
        };
        // ...pero en lugar de transferirlo, lo colocamos en el Kiosk.
        kiosk::place(kiosk, kiosk_cap, nft);
    }
    
    // =================================================================
    // CAMBIO: La función se estandariza para el patrón de Kiosk.
    // =================================================================
    public entry fun update_stats(
        kiosk: &mut Kiosk,
        kiosk_cap: &KioskOwnerCap,
        nft_id: ID,
        _oracle_cap: &StatsOracleCap,
        new_steps_session: u64
    ) {
        // El préstamo se hace DENTRO de la función.
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

    // Esta función ya seguía el patrón correcto, así que no necesita cambios.
    public entry fun update_model_on_nft(
        kiosk: &mut Kiosk,
        kiosk_cap: &KioskOwnerCap,
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