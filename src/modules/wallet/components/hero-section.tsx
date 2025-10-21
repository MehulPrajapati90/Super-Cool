"use client";

import { Button } from '@/components/ui/button';
import React from 'react'
import { useWalletStore } from '../store';

function HeroSection() {
    const { clearWallet } = useWalletStore();
    return (
        // Show the wallet details!
        <div>
            Hero-Section
            <Button onClick={clearWallet}>
                Logout
            </Button>
        </div>
    )
}

export default HeroSection;