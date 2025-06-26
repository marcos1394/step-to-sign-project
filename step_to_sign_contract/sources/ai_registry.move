// Contenido para: sui_contract/sources/ai_registry.move

/// Este módulo gestiona un registro on-chain para las versiones
/// de los modelos de IA utilizados en el proyecto Step-to-Sign.
/// Permite una verificación transparente y segura del software que se ejecuta en el hardware.
module step_to_sign::ai_registry {
    use sui::object::{Self, ID, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event;
    use std::string::{Self, String};

    // --- Structs ---

    /// El objeto principal del registro. Es un objeto compartido para que
    /// cualquiera pueda leer la información del modelo actual.
    public struct AIModelRegistry has key {
        id: UID,
        /// La versión del modelo (ej. "v1.0.0").
        version: String,
        /// El hash SHA256 del archivo del modelo (ej. model_v1.h5).
        /// Esto actúa como una huella digital única e incorruptible.
        model_hash: vector<u8>,
        /// El hash SHA256 del dataset con el que fue entrenado el modelo.
        /// Proporciona una procedencia de datos verificable.
        dataset_hash: vector<u8>,
        /// La dirección del administrador que tiene permiso para actualizar el registro.
        admin: address,
    }

    /// La capacidad de administrador, un objeto que solo el creador posee y que
    /// es necesario para realizar cambios en el registro.
    public struct AdminCap has key, store {
        id: UID
    }

    // --- Eventos ---
    
    public struct RegistryCreated has copy, drop {
        registry_id: ID
    }

    public struct ModelUpdated has copy, drop {
        registry_id: ID,
        new_version: String,
        new_model_hash: vector<u8>
    }

    // --- Funciones ---

    /// Se ejecuta una sola vez para crear el registro y la capacidad de administrador.
    fun init(ctx: &mut TxContext) {
        // Creamos el objeto de registro y lo hacemos compartido para que sea público.
        let registry = AIModelRegistry {
            id: object::new(ctx),
            version: string::utf8(b"v0.0.0"),
            model_hash: vector[],
            dataset_hash: vector[],
            admin: tx_context::sender(ctx)
        };
        transfer::share_object(registry);
        
        // Creamos la capacidad de administrador y la transferimos al creador del módulo.
        let admin_cap = AdminCap { id: object::new(ctx) };
        transfer::transfer(admin_cap, tx_context::sender(ctx));
    }

    /// Función pública para actualizar la información del modelo en el registro.
    /// Requiere la capacidad de administrador para poder ser ejecutada.
    public entry fun update_model(
        registry: &mut AIModelRegistry,
        _admin_cap: &AdminCap, // La capacidad prueba que tenemos permiso.
        new_version: vector<u8>,
        new_model_hash: vector<u8>,
        new_dataset_hash: vector<u8>,
        ctx: &mut TxContext
    ) {
        registry.version = string::utf8(new_version);
        registry.model_hash = new_model_hash;
        registry.dataset_hash = new_dataset_hash;

        event::emit(ModelUpdated {
            registry_id: object::id(registry),
            new_version: registry.version,
            new_model_hash: registry.model_hash
        });
    }
}