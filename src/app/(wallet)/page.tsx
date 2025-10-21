"use client";

import HeroSection from '@/modules/wallet/components/hero-section';
import LoginAccount from '@/modules/wallet/components/login-account';
import { useWalletStore } from '@/modules/wallet/store';
import React from 'react'

const Wallet = () => {
    const { mnemonic } = useWalletStore();
    return (
        <div className='w-full min-h-screen flex justify-center items-center'>
            {mnemonic ? (
                <HeroSection />
            ) : (
                <LoginAccount />
            )}
        </div>
    )
}

export default Wallet;