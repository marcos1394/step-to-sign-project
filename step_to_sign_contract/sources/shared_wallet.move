// Contenido definitivo y completo para: sui_contract/sources/shared_wallet.move

module step_to_sign::shared_wallet {
    use sui::object::{ID, UID};
    use sui::transfer;
    use sui::event;
    use sui::tx_context::{Self, TxContext};
    use sui::balance::{Self, Balance};
    use sui::sui::SUI;
    use sui::coin::{Self, Coin}; // Necesario para el nuevo patrón

    // --- Errores Personalizados ---
    /// Se intentó una acción en una billetera que está congelada.
    const EWalletFrozen: u64 = 1;
    /// El llamador no es el creador y no puede descongelar la billetera.
    const ENotCreator: u64 = 2;
    /// El llamador no es el oracle autorizado para esta función.
    const ENotOracle: u64 = 3;
    /// Se debe proporcionar al menos una moneda para el retiro de emergencia.
    const ENoCoinsProvided: u64 = 4;


    // --- Estructura Principal ---
    public struct SharedWallet has key, store {
        id: UID,
        version: u64,
        is_frozen: bool,
        creator: address,
        oracle_address: address,
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

    public struct WalletFrozen has copy, drop {
        wallet_id: ID,
    }

    public struct WalletThawed has copy, drop {
        wallet_id: ID,
    }


    // --- Funciones ---
    public fun create_wallet(ctx: &mut TxContext): SharedWallet {
        let creator_address = tx_context::sender(ctx);
        let wallet = SharedWallet {
            id: object::new(ctx),
            version: 1,
            is_frozen: false,
            creator: creator_address,
            oracle_address: creator_address,
        };
        
        event::emit(WalletCreated {
            wallet_id: object::id(&wallet),
            owner: creator_address,
        });

        wallet
    }

    public entry fun execute_transfer<T: key + store>(
        wallet: &mut SharedWallet,
        object_to_transfer: T,
        recipient: address
    ) {
        assert!(!wallet.is_frozen, EWalletFrozen);

        wallet.version = wallet.version + 1;
        event::emit(TransactionExecuted {
            wallet_id: object::id(wallet),
            new_version: wallet.version
        });
        transfer::public_transfer(object_to_transfer, recipient);
    }

    public entry fun freeze_wallet(wallet: &mut SharedWallet) {
        wallet.is_frozen = true;
        event::emit(WalletFrozen { wallet_id: object::id(wallet) });
    }

    public entry fun thaw_wallet(wallet: &mut SharedWallet, ctx: &mut TxContext) {
        assert!(tx_context::sender(ctx) == wallet.creator, ENotCreator);
        wallet.is_frozen = false;
        event::emit(WalletThawed { wallet_id: object::id(wallet) });
    }

    /// ¡FUNCIÓN DE EMERGENCIA PARA ORACLE!
    /// Ejecuta una transferencia de todos los SUI de la billetera a una dirección segura.
    /// Acepta un vector de monedas, las une y las transfiere.
    public entry fun emergency_withdraw(
        wallet: &mut SharedWallet,
        // CORRECCIÓN 1: La variable 'coins' debe ser mutable para poder modificarla.
        mut coins: vector<Coin<SUI>>, 
        safe_address: address,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == wallet.oracle_address, ENotOracle);
        assert!(!vector::is_empty(&coins), ENoCoinsProvided);

        // CORRECCIÓN 2: 'main_coin' debe ser mutable para que otras monedas puedan unirse a ella.
        let mut main_coin = vector::pop_back(&mut coins);
        
        // Unimos todas las demás monedas a la principal
        while (!vector::is_empty(&coins)) {
            coin::join(&mut main_coin, vector::pop_back(&mut coins));
        };
        
        wallet.version = wallet.version + 1;

        transfer::public_transfer(main_coin, safe_address);

        // CORRECCIÓN 3: El vector 'coins' ahora está vacío, pero el contenedor 'vector' en sí
        // debe ser destruido explícitamente porque no tiene la habilidad 'drop'.
        vector::destroy_empty(coins);
    }
}
