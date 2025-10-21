"use client";

import * as bip39 from "bip39";
import { BIP32Factory } from "bip32";
import * as ecc from 'tiny-secp256k1';
import { ethers } from "ethers";
import * as bitcoin from 'bitcoinjs-lib';
import { Keypair } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import bs58 from 'bs58';

const bip32 = BIP32Factory(ecc);

export const generateMnemonics = () => {
    return bip39.generateMnemonic();
}

export async function createWalletFromMnemonic(mnemonic: string) {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const ethereumWallet = deriveEthereumWallet(seed);
    const bitcoinWallet = deriveBitcoinWallet(seed);
    const solanaWallet = deriveSolanaWallet(seed);
    return {
        mnemonic,
        ethereum: ethereumWallet,
        bitcoin: bitcoinWallet,
        solana: solanaWallet,
    };
}

function deriveEthereumWallet(seed: Buffer) {
    const ethPath = "m/44'/60'/0'/0/0";
    const rootNode = ethers.HDNodeWallet.fromSeed(seed);
    const ethNode = rootNode.derivePath(ethPath);
    return {
        path: ethPath,
        privateKey: ethNode.privateKey,
        publicKey: ethNode.publicKey,
        address: ethNode.address,
    };
}

function deriveBitcoinWallet(seed: Buffer) {
    const btcPath = "m/44'/0'/0'/0/0";
    const network = bitcoin.networks.bitcoin;
    const rootNode = bip32.fromSeed(seed, network);
    const btcNode = rootNode.derivePath(btcPath);
    const { address: btcAddress } = bitcoin.payments.p2pkh({
        pubkey: btcNode.publicKey,
        network,
    });

    return {
        path: btcPath,
        privateKey: btcNode.toWIF(),
        publicKey: Buffer.from(btcNode.publicKey).toString('hex'),
        address: btcAddress,
    };
}

function deriveSolanaWallet(seed: Buffer) {
    const solanaPath = "m/44'/501'/0'/0'";
    const solanaDerivedSeed = derivePath(solanaPath, seed as unknown as string).key;
    const solanaKeypair = Keypair.fromSeed(solanaDerivedSeed);
    const solanaAddress = solanaKeypair.publicKey.toBase58();
    const solanaPrivateKey = bs58.encode(solanaKeypair.secretKey);
    return {
        path: solanaPath,
        privateKey: solanaPrivateKey,
        publicKey: solanaAddress,
        address: solanaAddress,
    };
}

export function loginToWallet(mnemonic: string) {
    return createWalletFromMnemonic(mnemonic);
}