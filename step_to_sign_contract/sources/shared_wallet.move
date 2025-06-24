// Contenido definitivo y corregido para: sui_contract/sources/shared_wallet.move

module step_to_sign::shared_wallet {
    use sui::object::{ID, UID};
    use sui::transfer;
    use sui::event;
    use sui::tx_context::TxContext;

    public struct SharedWallet has key, store {
        id: UID,
        version: u64,
    }
    
    public struct WalletCreated has copy, drop {
        wallet_id: ID,
        creator: address,
    }

    public struct TransactionExecuted has copy, drop {
        wallet_id: ID,
        new_version: u64,
    }

    public fun create_wallet(ctx: &mut TxContext): SharedWallet {
        let wallet = SharedWallet {
            id: object::new(ctx),
            version: 1,
        };
        
        event::emit(WalletCreated {
            wallet_id: object::id(&wallet),
            creator: tx_context::sender(ctx),
        });

        wallet
    }

    public entry fun execute_transfer<T: key + store>(
        wallet: &mut SharedWallet,
        object_to_transfer: T,
        recipient: address
    ) {
        wallet.version = wallet.version + 1;
        
        // CORRECCIÓN FINAL: Usamos el nombre de campo correcto 'new_version'.
        event::emit(TransactionExecuted {
            wallet_id: object::id(wallet),
            new_version: wallet.version
        });

        transfer::public_transfer(object_to_transfer, recipient);
    }
}