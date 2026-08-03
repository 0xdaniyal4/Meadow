

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


# 🌾 Meadow

### A Decentralized Resume Vault — Built on Shelby Testnet

Own your resume forever. Meadow gives you a permanent, shareable public link to your CV — stored on decentralized infrastructure, not on someone else's server that can disappear.

---

## 🔗 Links

- Live app: *(add your deployed link here)*
- GitHub: *(add your repo link here)*
- Network: Shelby Testnet (Aptos)

---

## 📖 Overview

Most resumes live in one of two places: a Google Drive link that can be deleted, or a job board account you'll eventually lose access to. Neither is really *yours*.

**Meadow** solves this by letting you upload your resume to Shelby's decentralized storage network on Aptos. Once uploaded, your resume gets a permanent public link you control — no platform lock-in, no expiring links, no centralized point of failure.

---

## ❓ Why Shelby Testnet?

Meadow is built on Shelby Testnet because it offers exactly what a "resume vault" needs:

### Permanence
Files on Shelby are backed by cryptographic commitments registered on-chain, so your resume's existence and integrity are verifiable, not just "trust us."

### Erasure-Coded Resilience
Your resume isn't sitting on a single server; it's split into chunks and distributed across storage providers, so no single point of failure can take it down.

### Wallet-Native Ownership
Your resume is tied to your Aptos wallet, not an email/password account that can be locked or lost.

### Aptos-Native Performance
Fast, low-latency access when someone opens your shared link, backed by Aptos's high-throughput blockchain architecture.

---

## ✨ Features

### 🔐 Wallet Connect
Connect with Petra Wallet via the official Aptos Wallet Adapter.

### 📤 Resume Upload
Upload your resume (PDF) directly to Shelby's decentralized storage network.

### 🔄 Version Control
Upload multiple versions of your resume and mark one as "Active/Public."

### 🔗 Permanent Public Link
Every resume gets a shareable link that stays live, generated after an on-chain commitment is registered.

### 📋 Dashboard
View all your uploaded versions, upload dates, and manage which one is public.

### ⬇️ Copy Link & Download
One-click copy of your public link, or download any version directly.

---

## 🎨 Design — "California Beaches" Palette

Bright, airy, and premium rather than the typical dark Web3 aesthetic, reflecting a clean, professional, personal space.

| Color | Hex | Use |
|---|---|---|
| Slate Blue-Grey | `#7D99AA` | Background |
| Sky Blue | `#66C4FF` | Primary actions |
| Aqua | `#66F4FF` | Accents & glow |
| Peach | `#FFC067` | Highlights |

Design and visual direction by **Daniyal**.

---

## 🧩 How It Works

### 1. Connect Wallet
Connect your Aptos wallet (Petra) via the official Aptos Wallet Adapter.

### 2. Upload Resume
Drag and drop your resume PDF, and label the version.

### 3. Publish to Shelby
Your file is erasure-coded and uploaded to Shelby's decentralized storage network, with an on-chain commitment signed via your connected wallet.

### 4. Get Your Link
Receive a permanent, shareable public link to your resume.

### 5. Manage Versions
Upload new versions anytime, and switch which one is marked "Active/Public" without losing your older versions.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript |
| Styling | Tailwind CSS |
| Blockchain | Aptos |
| Storage Protocol | Shelby (Testnet) |
| Wallet | Petra Wallet via `@aptos-labs/wallet-adapter-react` |
| SDK | `@shelby-protocol/sdk`, `@shelby-protocol/react` |
| Deployment | Vercel |

---

## 🗺️ Roadmap

- [x] Wallet connect integration (Petra / Aptos Wallet Adapter)
- [x] Landing page and dashboard UI (California Beaches theme)
- [x] Resume upload flow with version labeling
- [x] Wallet-adapter signer integration for live Shelby Testnet uploads
- [ ] Public resume viewer page (view without connecting a wallet)
- [ ] Custom shareable slugs (e.g. meadow.app/daniyal)
- [ ] Analytics — see when your resume link was viewed
- [ ] Mainnet deployment support

---

## 📦 Installation

```bash
git clone [your-repo-link]
cd meadow
npm install --legacy-peer-deps
```

Create a `.npmrc` file in the root with:

```
legacy-peer-deps=true
```

Run locally:

```bash
npm run dev
```

---

## 🔑 Requirements

- [Petra Wallet](https://petra.app) browser extension
- Aptos Labs API key (from [developers.aptoslabs.com](https://developers.aptoslabs.com)) for Shelby Testnet access
- Node.js 18+

---

## 🙏 Credits

**Design & Concept by Daniyal**
🔗 GitHub: https://github.com/0xdaniyal4
🔗 X: https://x.com/0xdaniyal4

**Built on Shelby Testnet**
- 🌐 [Website](https://shelby.xyz)
- 📚 [Docs](https://docs.shelby.xyz)
- 💻 [GitHub](https://github.com/shelby)
- 💬 [Discord](https://discord.gg/shelbyserves)
- 🐦 [X](https://x.com/shelbyserves)

---

## 📄 License

© 2026 Meadow. All Rights Reserved.
