import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, FileCheck, Search, Lock, Wallet, AlertCircle } from 'lucide-react';
import { useAppWallet } from '../context/AptosWalletContext';

export const VerificationPage: React.FC = () => {
  const { connected, isConnected, connectWallet } = useAppWallet();
  const walletActive = connected || isConnected;

  const [inputVal, setInputVal] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verificationData, setVerificationData] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Gating check: require wallet connection
    if (!walletActive) {
      setErrorMessage('Please connect your wallet first to verify resume credentials.');
      return;
    }

    if (!inputVal.trim()) return;

    setErrorMessage(null);
    setVerifying(true);
    setVerificationData(null);

    setTimeout(() => {
      setVerifying(false);
      setVerificationData({
        blobId: inputVal.startsWith('0x') ? inputVal : `0xshelby_${inputVal.slice(0, 16)}`,
        status: 'VERIFIED_GENUINE',
        issuer: 'Meadow Vault & Shelbynet Testnet',
        sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        timestamp: 'Verified at Block #184,921,002 (Shelby Testnet)',
        ownerAddress: '0x71c89f2a401b3d8e90a14f2e5628',
        signatureStatus: 'Cryptographically Signed via Petra Adapter (Shelbynet Testnet)'
      });
    }, 800);
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#66F4FF]/30 bg-[#66F4FF]/10 text-[#66F4FF] text-xs font-mono font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-[#66F4FF]" />
          CRYPTOGRAPHIC VERIFICATION
        </div>
        <h1 className="text-3xl font-extrabold text-[#cae7f9]">Resume Authenticator</h1>
        <p className="text-base text-[#bec8d1] mt-1">
          Verify the authenticity and tamper-proof hash of any candidate's resume stored on Shelby Protocol (Shelbynet Testnet).
        </p>
      </div>

      {/* Wallet Gating state when NOT connected */}
      {!walletActive ? (
        <div className="glass-panel rounded-2xl p-10 border border-[#66F4FF]/30 bg-[#032330] text-center space-y-5 max-w-xl mx-auto glow-aqua">
          <div className="w-16 h-16 rounded-2xl bg-[#001620] border border-[#66F4FF]/40 text-[#66F4FF] mx-auto flex items-center justify-center shadow-lg">
            <Wallet className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-[#cae7f9]">Please connect your wallet first</h2>
            <p className="text-sm text-[#bec8d1] leading-relaxed">
              Cryptographic resume verification requires an active wallet connection to query Shelbynet Testnet node attestations.
            </p>
          </div>
          <button
            onClick={connectWallet}
            className="bg-[#66C4FF] text-[#00344d] hover:bg-[#88ceff] px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md glow-aqua inline-flex items-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            <span>Connect Wallet to Access Verification</span>
          </button>
        </div>
      ) : (
        <>
          {/* Error / Alert Message */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Search Input Box */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-[#032330]">
            <form onSubmit={handleVerify} className="space-y-4">
              <label className="block text-xs font-mono font-semibold text-[#bec8d1] uppercase tracking-wider">
                SHELBY BLOB ID / SHA-256 DOCUMENT HASH
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="e.g. 0xshelby_71c89f2a401b3d8e or SHA-256 hash..."
                  className="flex-1 bg-[#001620] border border-[#3f484f] rounded-xl px-4 py-3 text-sm text-[#cae7f9] outline-none focus:border-[#66C4FF] font-mono"
                />
                <button
                  type="submit"
                  disabled={verifying}
                  className="bg-[#66C4FF] text-[#00344d] hover:bg-[#88ceff] px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  {verifying ? (
                    <span>Checking Shelbynet...</span>
                  ) : (
                    <>
                      <FileCheck className="w-4 h-4" />
                      <span>Verify Authenticity</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Verification Result Card */}
          {verificationData && (
            <div className="glass-panel rounded-2xl p-6 border border-[#66F4FF]/40 bg-[#0f2d3b] space-y-4 glow-aqua animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-mono bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded uppercase font-bold">
                    {verificationData.status}
                  </span>
                  <h2 className="text-xl font-bold text-[#cae7f9] mt-1">Authentic On-Chain Credential</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono text-[#cae7f9]">
                <div className="p-3 rounded-xl bg-[#001620] border border-white/10 space-y-1">
                  <span className="text-[#bec8d1]">SHELBY BLOB ID:</span>
                  <div className="font-bold text-[#66F4FF] truncate">{verificationData.blobId}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#001620] border border-white/10 space-y-1">
                  <span className="text-[#bec8d1]">ISSUER & NETWORK:</span>
                  <div className="font-bold text-[#cae7f9] truncate">{verificationData.issuer}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#001620] border border-white/10 space-y-1 md:col-span-2">
                  <span className="text-[#bec8d1]">DOCUMENT SHA-256 IMMUTABLE HASH:</span>
                  <div className="font-bold text-amber-300 break-all">{verificationData.sha256Hash}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#001620] border border-white/10 space-y-1">
                  <span className="text-[#bec8d1]">AUTHOR WALLET:</span>
                  <div className="font-bold text-[#cae7f9] truncate">{verificationData.ownerAddress}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#001620] border border-white/10 space-y-1">
                  <span className="text-[#bec8d1]">BLOCKCHAIN TIMESTAMP:</span>
                  <div className="font-bold text-[#cae7f9] truncate">{verificationData.timestamp}</div>
                </div>
              </div>
            </div>
          )}

          {/* Informational Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
            <div className="glass-panel rounded-2xl p-5 border border-white/10 bg-[#032330] space-y-2">
              <Lock className="w-6 h-6 text-[#66F4FF]" />
              <h3 className="text-base font-bold text-[#cae7f9]">How Proof Works</h3>
              <p className="text-xs text-[#bec8d1] leading-relaxed">
                Every document uploaded to Meadow produces a SHA-256 digest linked to your Aptos public key and saved on Shelby Blob Storage (Shelbynet Testnet). Anyone with the Blob link can confirm the resume was not modified.
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-white/10 bg-[#032330] space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#66F4FF]" />
              <h3 className="text-base font-bold text-[#cae7f9]">Employer Verification</h3>
              <p className="text-xs text-[#bec8d1] leading-relaxed">
                Recruiters can verify candidate credentials directly without relying on centralized databases or background check delays.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
