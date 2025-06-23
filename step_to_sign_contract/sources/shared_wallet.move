// Contenido para: sui_contract/sources/shared_wallet.move

module step_to_sign::shared_wallet {
    // --- Imports ---
    // Hemos eliminado los 'use' redundantes. El compilador los provee por defecto.
    use sui::object::{ID, UID};
    use sui::transfer;
    use sui::event;
    use sui::ed25519;
    use sui::bcs;

    // --- Errores Personalizados ---
    const EOwnerSignatureInvalid: u64 = 1;
    const EShoeSignatureInvalid: u64 = 2;

    // --- Structs ---
    public struct SharedWallet has key, store {
        id: UID,
        owner_pubkey: vector<u8>,
        shoe_signer_pubkey: vector<u8>,
        nonce: u64,
    }
    
    public struct WalletCreated has copy, drop {
        wallet_id: ID,
        owner_address: address,
    }

    public struct TransactionExecuted has copy, drop {
        wallet_id: ID,
        new_nonce: u64,
    }

    // --- Funciones Públicas ---
    public entry fun create_wallet(
        owner_pubkey: vector<u8>,
        shoe_signer_pubkey: vector<u8>,
        ctx: &mut TxContext
    ) {
        let wallet = SharedWallet {
            id: object::new(ctx),
            owner_pubkey: owner_pubkey,
            shoe_signer_pubkey: shoe_signer_pubkey,
            nonce: 0,
        };
        
        event::emit(WalletCreated {
            wallet_id: object::id(&wallet),
            owner_address: tx_context::sender(ctx),
        });

        transfer::transfer(wallet, tx_context::sender(ctx));
    }

    public entry fun execute_co_signed_transfer<T: key + store>(
        wallet: &mut SharedWallet,
        object_to_transfer: T,
        recipient: address,
        owner_signature: vector<u8>,
        shoe_signature: vector<u8>
        // El parámetro 'ctx' sin usar fue eliminado.
    ) {
        let mut message_to_verify = bcs::to_bytes(&recipient);
        vector::append(&mut message_to_verify, bcs::to_bytes(&wallet.nonce));

        let owner_verified = ed25519::ed25519_verify(
            &wallet.owner_pubkey, &owner_signature, &message_to_verify
        );
        assert!(owner_verified, EOwnerSignatureInvalid);

        let shoe_verified = ed25519::ed25519_verify(
            &wallet.shoe_signer_pubkey, &shoe_signature, &message_to_verify
        );
        assert!(shoe_verified, EShoeSignatureInvalid);
        
        wallet.nonce = wallet.nonce + 1;

        event::emit(TransactionExecuted {
            wallet_id: object::id(wallet),
            new_nonce: wallet.nonce,
        });

        // CORRECCIÓN: Usamos 'public_transfer' para objetos genéricos.
        transfer::public_transfer(object_to_transfer, recipient);
    }
}