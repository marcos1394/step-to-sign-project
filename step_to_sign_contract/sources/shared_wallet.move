// Contenido FINAL y ARQUITECTÓNICAMENTE CORRECTO del contrato

module step_to_sign::shared_wallet {
    use sui::object::{ID, UID};
    use sui::transfer;
    use sui::event;
    use sui::tx_context::{Self, TxContext};
    // ¡Nuevos imports necesarios para manejar el balance interno!
    use sui::balance::{Self, Balance};
    use sui::sui::SUI;
    use sui::coin::{Self, Coin};

    // --- Errores Personalizados ---
    const EWalletFrozen: u64 = 1;
    const ENotCreator: u64 = 2;
    const ENotOracle: u64 = 3;
    // ENoCoinsProvided ya no es necesario

    // --- Estructura Principal Mejorada ---
    public struct SharedWallet has key, store {
        id: UID,
        version: u64,
        is_frozen: bool,
        creator: address,
        oracle_address: address,
        // ¡CAMBIO CLAVE! El "monedero" interno de nuestra billetera.
        balance: Balance<SUI>,
    }
    
    // --- Eventos Mejorados ---
    public struct WalletCreated has copy, drop { wallet_id: ID, creator: address }
    public struct DepositMade has copy, drop { wallet_id: ID, amount: u64 }
    public struct EmergencyWithdrawal has copy, drop { wallet_id: ID, amount: u64 }
    public struct WalletFrozen has copy, drop { wallet_id: ID }
    public struct WalletThawed has copy, drop { wallet_id: ID }

    // --- LÓGICA INTERNA ---
    fun create_wallet_internal(ctx: &mut TxContext): SharedWallet {
        let creator_address = tx_context::sender(ctx);
        SharedWallet {
            id: object::new(ctx),
            version: 1,
            is_frozen: false,
            creator: creator_address,
            oracle_address: creator_address,
            // Inicializamos el monedero interno con cero SUI.
            balance: balance::zero<SUI>(),
        }
    }

    // --- PUNTOS DE ENTRADA PÚBLICOS ---

    public entry fun create_and_share(ctx: &mut TxContext) {
        let wallet = create_wallet_internal(ctx);
        event::emit(WalletCreated {
            wallet_id: object::id(&wallet),
            creator: tx_context::sender(ctx)
        });
        transfer::public_share_object(wallet);
    }

    // ¡NUEVA FUNCIÓN! Para depositar SUI en el monedero interno de la billetera.
    public entry fun deposit(wallet: &mut SharedWallet, coin: Coin<SUI>) {
        let amount = coin::value(&coin);
        // Unimos el balance de la moneda depositada con el balance de la billetera.
        balance::join(&mut wallet.balance, coin::into_balance(coin));
        event::emit(DepositMade { wallet_id: object::id(wallet), amount });
    }

    // ¡FUNCIÓN DE RETIRO DE EMERGENCIA MEJORADA!
    // Ya no recibe un vector de monedas, ahora es más simple y segura.
   public entry fun emergency_withdraw(wallet: &mut SharedWallet, safe_address: address, ctx: &mut TxContext) {
        assert!(tx_context::sender(ctx) == wallet.oracle_address, ENotOracle);
        assert!(!wallet.is_frozen, EWalletFrozen);
        
        // =======================   LA CORRECCIÓN LÓGICA   ========================
        // 1. Obtenemos el valor total del balance actual.
        let whole_balance_value = balance::value(&wallet.balance);
        
        // 2. Usamos `coin::take` para extraer de forma segura todo el valor del balance
        //    y convertirlo en un nuevo objeto Coin. Esto modifica `wallet.balance` a 0.
        let coin_to_withdraw = coin::take(&mut wallet.balance, whole_balance_value, ctx);
        // =======================================================================
        
        // 3. Transferimos la moneda recién creada a la dirección segura.
        transfer::public_transfer(coin_to_withdraw, safe_address);
        
        wallet.version = wallet.version + 1;
        event::emit(EmergencyWithdrawal { wallet_id: object::id(wallet), amount: whole_balance_value });
    }

    // --- Otras Funciones de Gestión ---

    public entry fun freeze_wallet(wallet: &mut SharedWallet) {
        wallet.is_frozen = true;
        event::emit(WalletFrozen { wallet_id: object::id(wallet) });
    }

    public entry fun thaw_wallet(wallet: &mut SharedWallet, ctx: &mut TxContext) {
        assert!(tx_context::sender(ctx) == wallet.creator, ENotCreator);
        wallet.is_frozen = false;
        event::emit(WalletThawed { wallet_id: object::id(wallet) });
    }

    // Esta función ya no es necesaria con el nuevo diseño, pero la dejamos por si se usa en otras partes.
    // En un futuro la podríamos eliminar.
    public entry fun execute_transfer<T: key + store>(wallet: &mut SharedWallet, object_to_transfer: T, recipient: address) {
        assert!(!wallet.is_frozen, EWalletFrozen);
        wallet.version = wallet.version + 1;
        // TransactionExecuted no es el evento más descriptivo aquí, pero lo mantenemos por ahora.
        // event::emit(TransactionExecuted { wallet_id: object::id(wallet), new_version: wallet.version });
        transfer::public_transfer(object_to_transfer, recipient);
    }
}