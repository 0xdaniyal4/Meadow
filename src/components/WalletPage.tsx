import React, { useState } from 'react';
import { useAppWallet } from '../context/AptosWalletContext';
import { Wallet, Copy, Check, LogOut, Shield, Database, ExternalLink, RefreshCw, ArrowUpRight } from 'lucide-react';

export const WalletPage: React.FC = () => {
  const { isConnected, walletAddress, shortAddress, connectWallet, disconnectWallet, demoMode } = useAppWallet();
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleCopy = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  if (!isConnected) {
    return (
      <div className="w-full min-h-screen pt-28 pb-16 px-4 text-center max-w-xl mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#032330] border border-[#66F4FF]/30 text-[#66F4FF] mx-auto flex items-center justify-center">
          <Wallet className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#cae7f9]">Wallet Not Connected</h1>
        <p className="text-sm text-[#bec8d1]">
          Connect your Aptos Petra or compatible Web3 wallet to manage your Shelby Blob Storage, tokens, and account keys.
        </p>
        <button
          onClick={connectWallet}
          className="bg-[#66C4FF] text-[#00344d] hover:bg-[#88ceff] px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md glow-aqua"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#66F4FF]/30 bg-[#66F4FF]/10 text-[#66F4FF] text-xs font-mono font-semibold mb-3">
            <Shield className="w-3.5 h-3.5 text-[#66F4FF]" />
            APTOS ACCOUNT & STORAGE PROTOCOL
          </div>
          <h1 className="text-3xl font-extrabold text-[#cae7f9]">Wallet Account</h1>
          <p className="text-base text-[#bec8d1] mt-1">
            Manage your connected Aptos wallet address and Shelby decentralized storage.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 bg-[#032330] border border-white/10 hover:border-[#66C4FF] text-[#bec8d1] hover:text-[#66C4FF] px-4 py-2 rounded-xl text-xs font-mono transition-all self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Balance</span>
        </button>
      </div>

      {/* Primary Account Card */}
      <div className="glass-panel rounded-2xl p-6 border border-[#66F4FF]/40 bg-[#0f2d3b] space-y-6 glow-aqua relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#001620] border border-[#66F4FF]/40 flex items-center justify-center text-[#66F4FF] shrink-0">
              <Wallet className="w-6 h-6" />
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-[#66F4FF] font-bold">Petra Wallet</span>
                {demoMode && (
                  <span className="text-[10px] bg-[#FFC067]/20 text-[#FFC067] px-2 py-0.5 rounded font-mono font-bold">
                    DEMO MODE
                  </span>
                )}
              </div>
              <div className="text-lg font-mono font-bold text-[#cae7f9] truncate">
                {shortAddress}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 bg-[#001620] border border-white/10 hover:border-[#66C4FF] text-[#bec8d1] hover:text-[#66C4FF] px-3 py-2 rounded-xl text-xs font-mono transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Full Address'}</span>
            </button>

            <button
              onClick={disconnectWallet}
              className="flex items-center gap-1.5 bg-red-950/40 border border-red-500/30 hover:bg-red-900/50 text-red-300 px-3 py-2 rounded-xl text-xs font-mono transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Disconnect</span>
            </button>
          </div>
        </div>

        {/* Full Address Display */}
        <div className="bg-[#001620] rounded-xl p-3 border border-white/10 font-mono text-xs text-[#bec8d1] break-all select-all">
          <span className="text-[#66F4FF] font-bold mr-2">Address:</span>
          {walletAddress}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-[#001620] border border-white/10 space-y-1">
            <span className="text-xs font-mono text-[#bec8d1] uppercase">Aptos Balance</span>
            <div className="text-2xl font-black text-[#cae7f9]">14.85 APT</div>
            <div className="text-[11px] text-emerald-400 font-mono">Shelbynet Testnet</div>
          </div>

          <div className="p-4 rounded-xl bg-[#001620] border border-white/10 space-y-1">
            <span className="text-xs font-mono text-[#bec8d1] uppercase">Shelby Blob Quota</span>
            <div className="text-2xl font-black text-[#66F4FF]">2.4 MB / 100 MB</div>
            <div className="text-[11px] text-[#bec8d1] font-mono">Free Tier Active</div>
          </div>

          <div className="p-4 rounded-xl bg-[#001620] border border-white/10 space-y-1">
            <span className="text-xs font-mono text-[#bec8d1] uppercase">Verified Resumes</span>
            <div className="text-2xl font-black text-[#cae7f9]">On-Chain</div>
            <div className="text-[11px] text-[#66F4FF] font-mono flex items-center gap-1">
              <Database className="w-3 h-3" /> Encrypted & Public
            </div>
          </div>
        </div>
      </div>

      {/* Explorer Link */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-[#032330] flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#cae7f9]">View on Aptos Explorer</h3>
          <p className="text-xs text-[#bec8d1] mt-0.5">Inspect account transactions and Move module execution history.</p>
        </div>

        <a
          href={`https://explorer.aptoslabs.com/account/${walletAddress}?network=testnet`}
          target="_blank"
          rel="noreferrer"
          className="bg-[#001620] border border-white/10 hover:border-[#66C4FF] text-[#66C4FF] px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 shrink-0"
        >
          <span>Open Explorer</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
