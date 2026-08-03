# Meadow — Decentralized Resume Vault

Meadow is a decentralized professional identity platform built on **Shelby Protocol (Shelbynet Testnet)** on top of Aptos.

> ⚠️ **IMPORTANT NETWORK NOTE**: This application is built specifically on **Shelby Protocol (Shelbynet Testnet)** — NOT Aptos mainnet. All resume blob storage, cryptographic hashes, and verification attestations run on the **Shelbynet Testnet**.

---

## 🚀 Key Features

- **Wallet-Gated Access**: Verify credentials and inspect network blob infrastructure with active Petra or Web3 Aptos wallet authentication.
- **Shelby Storage Integration**: Save immutable resume versions securely to Shelby Protocol's decentralized blob storage clusters.
- **Cryptographic Verification**: Generate and authenticate SHA-256 document proofs on Shelbynet Testnet.
- **Public & Private Share Links**: Generate shareable links for recruiters with instant verification badges.
- **Shelbynet Testnet Explorer**: Track storage node status, retrieval latency, and replication parameters.

---

## 🛠️ Tech Stack

- **Framework**: React 18, Vite, TypeScript, Tailwind CSS
- **Blockchain**: Aptos (Shelbynet Testnet)
- **Protocol**: Shelby Protocol Decentralized Blob Storage
- **Wallet Integration**: `@aptos-labs/wallet-adapter-react`, Petra Wallet Plugin
- **Icons**: Lucide React

---

## 🔐 Wallet Connect Gating

The **Verify** and **Network** sections of Meadow require an active wallet connection (`connected === true` via `@aptos-labs/wallet-adapter-react` / `useAppWallet`). Unauthenticated users are presented with a wallet connection prompt before any data or verification query can be executed.
