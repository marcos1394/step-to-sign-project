// Contenido definitivo y simplificado para: sui_contract/sources/shared_wallet.move

module step_to_sign::shared_wallet {
    use sui::object::{ID, UID};
    use sui::transfer;
    use sui::event;
    use sui::tx_context::TxContext;

    // Ya no necesitamos lógica de firmas ni errores de criptografía aquí.

    /// Un contenedor simple para nuestros activos. La seguridad la provee el
    /// modelo de propiedad de Sui, al ser propiedad de una dirección Multi-Firma.
    public struct SharedWallet has key, store {
        id: UID,
        version: u64, // Un simple contador para registrar actividad.
    }
    
    public struct WalletCreated has copy, drop {
        wallet_id: ID,
        owner: address,
    }

    public struct TransactionExecuted has copy, drop {
        wallet_id: ID,
        version: u64,
    }

    /// Crea un nuevo objeto SharedWallet. No es 'entry' porque será llamada
    /// dentro de un Bloque de Transacción Programable.
    public fun create_wallet(ctx: &mut TxContext): SharedWallet {
        event::emit(WalletCreated {
            wallet_id: object::new_uid(ctx),
            owner: tx_context::sender(ctx),
        });
        SharedWallet {
            id: object::new(ctx),
            version: 1,
        }
    }

    /// Ejecuta una transferencia. No necesita verificar firmas porque
    /// la red de Sui ya habrá verificado que el llamador es el dueño
    /// (la dirección Multi-Firma) antes de ejecutar esta función.
    public entry fun execute_transfer<T: key + store>(
        wallet: &mut SharedWallet,
        object_to_transfer: T,
        recipient: address
    ) {
        wallet.version = wallet.version + 1;
        event::emit(TransactionExecuted {
            wallet_id: object::id(wallet),
            version: wallet.version
        });
        transfer::public_transfer(object_to_transfer, recipient);
    }
}