"use client";

import React, { useState } from 'react'
import { useWalletStore } from '../store';
import { Button } from '@/components/ui/button';
import { loginToWallet } from '../utils';
import { WalletAccount } from '../types';
import { toast } from 'sonner';
import CreateAccount from './create-accout';

const LoginAccount = () => {
    const { setMnemonic, setBitcoin, setSolana, setEthereum } = useWalletStore();
    const HandleLogin = async () => {
        const wallet = await loginToWallet(newMnemonic.trim());
        setMnemonic(wallet.mnemonic);
        setBitcoin(wallet.bitcoin as unknown as WalletAccount);
        setEthereum(wallet.ethereum as unknown as WalletAccount);
        setSolana(wallet.solana as unknown as WalletAccount);
    }

    const [newMnemonic, setNewMnemonic] = useState('');
    const [create, setCreate] = useState<boolean>(false);

    const handleImport = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newMnemonic.trim() || newMnemonic.trim().split(' ').length !== 12) {
            toast.error('Please enter a valid 12-word mnemonic phrase.');
            return;
        }
        try {
            console.log(newMnemonic.trim())
            await HandleLogin();
            toast.success('Loggined successfully')
        } catch (err) {
            toast.error('Invalid mnemonic phrase. Please check and try again.');
        }
    };

    const HandleCreate = () => {
        setCreate(true);
    }

    if (create) {
        return (
            <CreateAccount />
        )
    }

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h1 className="text-4xl font-bold text-center mb-4">Simple Crypto Wallet</h1>
            <div className="bg-base-200 p-8 rounded-xl shadow-lg mb-6">
                <h2 className="text-2xl font-semibold mb-4">Import Existing Wallet</h2>
                <form onSubmit={handleImport}>
                    <textarea
                        value={newMnemonic}
                        onChange={(e) => setNewMnemonic(e.target.value)}
                        placeholder="Enter your 12-word mnemonic phrase..."
                        className="w-full p-3 border border-gray-600 rounded-lg bg-base-100 focus:ring-2 focus:ring-blue-500 transition"
                    // rows="3"
                    />
                    <Button disabled={!newMnemonic} type="submit" className="mt-4 w-full btn btn-primary">
                        Import Wallet
                    </Button>
                </form>
            </div>

            <div className="bg-base-200 p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-2">Create a New Wallet</h2>
                <p className="text-gray-400 mb-4">No wallet yet? Create one now.</p>
                <Button onClick={HandleCreate} className="w-full btn btn-neutral">
                    Create New Wallet
                </Button>
            </div>
        </div>
    )
}

export default LoginAccount