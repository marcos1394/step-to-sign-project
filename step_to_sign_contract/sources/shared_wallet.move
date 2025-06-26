// Contenido definitivo para: sui_contract/sources/shared_wallet.move

module step_to_sign::shared_wallet {
    use sui::object::{ID, UID};
    use sui::transfer;
    use sui::event;
    use sui::tx_context::{Self, TxContext};

    // --- Errores Personalizados ---
    /// Se intentó una acción en una billetera que está congelada.
    const EWalletFrozen: u64 = 1;
    /// El llamador no es el creador y no puede descongelar la billetera.
    const ENotCreator: u64 = 2;


    // --- Estructura Principal ---
    /// Un contenedor simple para nuestros activos. La seguridad la provee el
    /// modelo de propiedad de Sui, al ser propiedad de una dirección Multi-Firma.
    public struct SharedWallet has key, store {
        id: UID,
        version: u64,
        /// Campo booleano para la funcionalidad de congelamiento por coacción.
        is_frozen: bool,
        /// Guardamos la dirección del creador original. Solo él puede descongelar.
        creator: address,
    }
    
    // --- Eventos ---
    public struct WalletCreated has copy, drop {
        wallet_id: ID,
        owner: address,
    }

    public struct TransactionExecuted has copy, drop {
        wallet_id: ID,
        new_version: u64,
    }

    /// Evento emitido cuando la billetera es congelada por coacción.
    public struct WalletFrozen has copy, drop {
        wallet_id: ID,
    }

    /// Evento emitido cuando la billetera es descongelada por el creador.
    public struct WalletThawed has copy, drop {
        wallet_id: ID,
    }


    // --- Funciones ---

    /// Crea un nuevo objeto SharedWallet. No es 'entry' porque será llamada
    /// dentro de un Bloque de Transacción Programable.
    public fun create_wallet(ctx: &mut TxContext): SharedWallet {
        let creator_address = tx_context::sender(ctx);
        let wallet = SharedWallet {
            id: object::new(ctx),
            version: 1,
            is_frozen: false, // Las billeteras nacen sin congelar.
            creator: creator_address,
        };
        
        event::emit(WalletCreated {
            wallet_id: object::id(&wallet),
            creator: creator_address,
        });

        wallet
    }

    /// Ejecuta una transferencia. Ahora verifica si la billetera está congelada.
    public entry fun execute_transfer<T: key + store>(
        wallet: &mut SharedWallet,
        object_to_transfer: T,
        recipient: address
    ) {
        // ¡VERIFICACIÓN DE SEGURIDAD! Aborta si la billetera está congelada.
        assert!(!wallet.is_frozen, EWalletFrozen);

        wallet.version = wallet.version + 1;
        event::emit(TransactionExecuted {
            wallet_id: object::id(wallet),
            new_version: wallet.version
        });
        transfer::public_transfer(object_to_transfer, recipient);
    }

    /// ¡FUNCIÓN DE PÁNICO! Congela la billetera. Puede ser llamada por la dirección
    /// Multi-Firma si se detecta el gesto de coacción.
    public entry fun freeze_wallet(wallet: &mut SharedWallet) {
        wallet.is_frozen = true;
        event::emit(WalletFrozen { wallet_id: object::id(wallet) });
    }

    /// FUNCIÓN DE RECUPERACIÓN. Descongela la billetera.
    /// Solo el creador original de la billetera puede llamar a esta función.
    public entry fun thaw_wallet(wallet: &mut SharedWallet, ctx: &mut TxContext) {
        // Aseguramos que solo el creador pueda descongelar.
        assert!(tx_context::sender(ctx) == wallet.creator, ENotCreator);
        wallet.is_frozen = false;
        event::emit(WalletThawed { wallet_id: object::id(wallet) });
    }
}
