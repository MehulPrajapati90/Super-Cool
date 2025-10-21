import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WalletState } from "../types";

export const useWalletStore = create<WalletState>()(
    persist(
        (set) => ({
            bitcoin: undefined,
            ethereum: undefined,
            solana: undefined,
            mnemonic: undefined,

            setBitcoin: (data) => set({ bitcoin: data }),
            setEthereum: (data) => set({ ethereum: data }),
            setSolana: (data) => set({ solana: data }),
            setMnemonic: (mnemonic) => set({ mnemonic }),
            clearWallet: () =>
                set({
                    bitcoin: undefined,
                    ethereum: undefined,
                    solana: undefined,
                    mnemonic: undefined,
                }),
        }),
        {
            name: "wallet-store",
        }
    )
);