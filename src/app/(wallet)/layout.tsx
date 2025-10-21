import React from 'react'
import { Toaster } from 'sonner';

const WalletLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Toaster richColors position='bottom-right'/>
            {children}
        </div>
    )
}

export default WalletLayout;