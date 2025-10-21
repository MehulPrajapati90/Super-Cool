"use client";

import React, { useEffect, useState } from 'react'
import { createWalletFromMnemonic, generateMnemonics } from '../utils';
import { useWalletStore } from '../store';
import { Button } from '@/components/ui/button';
import { WalletAccount, WalletState } from '../types';

const CreateAccount = () => {
    const { setMnemonic, setBitcoin, setSolana, setEthereum } = useWalletStore();
    const [wallet, setWallet] = useState<WalletState | null>(null);
    const HandleCreateWallet = async () => {
        const mnemonics = generateMnemonics();
        const wallet = await createWalletFromMnemonic(mnemonics);
        setWallet(wallet as WalletState);
    }

    const HandleSaveWallet = () => {
        if (wallet) {
            setMnemonic(wallet.mnemonic as string);
            setBitcoin(wallet.bitcoin as unknown as WalletAccount);
            setEthereum(wallet.ethereum as unknown as WalletAccount);
            setSolana(wallet.solana as unknown as WalletAccount);
        }
    }

    useEffect(() => {
        HandleCreateWallet();
    }, []);

    return (
        <div>
            Create
            <Button onClick={HandleSaveWallet}>
                Save Wallet
            </Button>
        </div>
    )
}

export default CreateAccount;