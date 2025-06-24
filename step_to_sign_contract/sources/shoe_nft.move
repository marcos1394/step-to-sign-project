// Contenido para: sui_contract/sources/shoe_nft.move

/// Este módulo define el 'ShoeNFT', que actúa como un certificado de propiedad
/// y un pasaporte digital para cada dispositivo Step-to-Sign.
module step_to_sign::shoe_nft {
    use sui::object::{Self, ID, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event;
    use std::string::{Self, String};
    use sui::url::{Self, Url};

    /// La capacidad de Administrador, necesaria para mintear nuevos NFTs.
    /// Se crea una sola vez cuando se publica el módulo.
    public struct ShoeAdminCap has key {
        id: UID
    }

    /// Nuestro NFT principal. Representa un par de zapatos físico y digital.
    public struct ShoeNFT has key, store {
        id: UID,
        name: String,
        description: String,
        url: Url,
        serial_number: u64,
        model_version: String,
        model_cid: String
    }

    /// Evento que se emite cuando se mintea un nuevo zapato.
    public struct ShoeMinted has copy, drop {
        object_id: ID,
        owner: address,
        serial_number: u64
    }
    
    /// Evento para la actualización del modelo de IA.
    public struct ModelUpdatedOnNFT has copy, drop {
        object_id: ID,
        new_model_version: String,
        new_model_cid: String
    }

    /// Se ejecuta una sola vez al publicar el paquete. Crea la capacidad de Admin.
    fun init(ctx: &mut TxContext) {
        transfer::transfer(ShoeAdminCap { id: object::new(ctx) }, tx_context::sender(ctx));
    }

    /// Mintea un nuevo ShoeNFT y lo transfiere a un propietario.
    /// Solo puede ser llamado por quien posea la ShoeAdminCap.
    public entry fun mint(
        _admin_cap: &ShoeAdminCap, // Prueba de que somos el admin
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        serial_number: u64,
        recipient: address,
        ctx: &mut TxContext
    ) {
        let nft = ShoeNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(url),
            serial_number: serial_number,
            // Se inicia con valores vacíos, para ser actualizados después.
            model_version: string::utf8(b""),
            model_cid: string::utf8(b"")
        };

        event::emit(ShoeMinted {
            object_id: object::id(&nft),
            owner: recipient,
            serial_number: serial_number
        });

        transfer::transfer(nft, recipient);
    }
    
    /// Permite al DUEÑO del NFT actualizar la información del modelo de IA.
    /// Esto se llamaría después de un ciclo de fine-tuning.
    public entry fun update_model_on_nft(
        nft: &mut ShoeNFT,
        new_model_version: vector<u8>,
        new_model_cid: vector<u8>
    ) {
        let version = string::utf8(new_model_version);
        let cid = string::utf8(new_model_cid);
        
        nft.model_version = version;
        nft.model_cid = cid;

        event::emit(ModelUpdatedOnNFT {
            object_id: object::id(nft),
            new_model_version: nft.model_version,
            new_model_cid: nft.model_cid
        });
    }
}