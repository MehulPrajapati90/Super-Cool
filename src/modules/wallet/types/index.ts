export interface WalletAccount {
    path: string;
    privateKey: string;
    publicKey: string;
    address: string;
}

export interface WalletState {
    bitcoin?: WalletAccount;
    ethereum?: WalletAccount;
    solana?: WalletAccount;
    mnemonic?: string;

    setBitcoin: (data: WalletAccount) => void;
    setEthereum: (data: WalletAccount) => void;
    setSolana: (data: WalletAccount) => void;
    setMnemonic: (mnemonic: string) => void;
    clearWallet: () => void;
}