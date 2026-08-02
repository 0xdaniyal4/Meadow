import React from 'react';
import { useAppWallet } from '../context/AptosWalletContext';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  FileCheck, 
  Layers, 
  Lock, 
  Cpu, 
  Share2, 
  Award,
  Globe,
  ExternalLink
} from 'lucide-react';

interface LandingPageProps {
  onConnectWallet: () => void;
  onViewDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onConnectWallet, onViewDemo }) => {
  const { isConnected } = useAppWallet();

  return (
    <div className="w-full min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-20">
      
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[70vh]">
        {/* Left Column: Text & CTA */}
        <div className="flex-1 flex flex-col items-start gap-6">
          {/* Powered by Shelby Protocol Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#66F4FF]/30 bg-[#66F4FF]/10 text-[#66F4FF] shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-[#66F4FF]" />
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">
              POWERED BY SHELBY PROTOCOL
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#cae7f9] leading-tight tracking-tight">
            Your Professional Legacy, <br />
            <span className="text-[#66C4FF] relative">
              Secured Forever.
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#66C4FF] to-[#66F4FF] rounded-full opacity-70"></span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-[#bec8d1] max-w-xl leading-relaxed">
            Host your resume on the Shelby Protocol. Own your data, share your success with a permanent, cryptographically-secured public link.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 w-full sm:w-auto">
            <button
              onClick={onConnectWallet}
              className="bg-[#66C4FF] text-[#00344d] hover:bg-[#88ceff] font-bold text-base px-8 py-3.5 rounded-xl transition-all duration-300 glow-aqua flex items-center justify-center gap-2 shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{isConnected ? 'Go to Dashboard' : 'Connect Wallet'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onViewDemo}
              className="bg-transparent border border-[#66C4FF] text-[#66C4FF] hover:bg-[#66C4FF]/10 font-bold text-base px-8 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>View Demo</span>
              <Sparkles className="w-4 h-4 text-[#FFC067]" />
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Profile Mockup Card */}
        <div className="flex-1 w-full relative">
          <div className="absolute inset-0 bg-[#66C4FF]/20 blur-[110px] rounded-full -z-10" />
          
          <div className="glass-panel p-4 sm:p-6 rounded-2xl shadow-2xl relative border border-[#66F4FF]/20 group hover:border-[#66F4FF]/40 transition-all duration-500">
            {/* Header Mockup Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7D99AA] border border-[#66F4FF]/40 flex items-center justify-center font-bold text-[#001620]">
                  AD
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#cae7f9]">Alexandre Dubois</h4>
                  <p className="text-xs font-mono text-[#66F4FF]">Web3 Architect & Blockchain Engineer</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#66F4FF]/10 border border-[#66F4FF]/30">
                <ShieldCheck className="w-3.5 h-3.5 text-[#66F4FF]" />
                <span className="text-[11px] font-mono font-semibold text-[#66F4FF]">SHELBY VERIFIED</span>
              </div>
            </div>

            {/* Content Stats Mockup */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#001620]/80 p-3 rounded-xl border border-white/5">
                <div className="text-[11px] font-mono text-[#bec8d1]">REPUTATION SCORE</div>
                <div className="text-2xl font-bold text-[#FFC067] mt-0.5 flex items-baseline gap-1">
                  892 <span className="text-xs text-[#66F4FF] font-normal">High Trust</span>
                </div>
              </div>

              <div className="bg-[#001620]/80 p-3 rounded-xl border border-white/5">
                <div className="text-[11px] font-mono text-[#bec8d1]">ON-CHAIN PROOFS</div>
                <div className="text-2xl font-bold text-[#66C4FF] mt-0.5">
                  14 <span className="text-xs text-[#bec8d1] font-normal">Verified Roles</span>
                </div>
              </div>
            </div>

            {/* Active Projects Snapshot */}
            <div className="bg-[#001620]/60 p-3.5 rounded-xl border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-[#bec8d1]">
                <span>PUBLIC CV VERSION</span>
                <span className="text-[#66F4FF]">v2.1 (Active)</span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold bg-[#0f2d3b] p-2.5 rounded-lg border border-[#66C4FF]/20">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#66C4FF]" />
                  <span>Senior_Product_Designer_Shelby.pdf</span>
                </div>
                <span className="text-[11px] font-mono text-[#FFC067]">Permanent Hash</span>
              </div>
            </div>

            {/* Glass shine visual overlay */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#bec8d1] font-mono">
              <span className="flex items-center gap-1 text-[#66F4FF]">
                <Globe className="w-3.5 h-3.5" /> shelby.xyz/blob/0x71C...4f2
              </span>
              <span className="text-[#FFC067]">0 Platform Lock-in</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid Section */}
      <section className="py-10 flex flex-col gap-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold text-[#cae7f9]">Unbreakable Credentials</h2>
          <p className="text-base text-[#bec8d1]">
            The next generation of professional networking, built on the permanence of Web3.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Cryptographic Proof */}
          <div className="glass-panel p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden group hover:border-[#66F4FF]/40 transition-all">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#66F4FF]/10 rounded-full blur-3xl group-hover:bg-[#66F4FF]/20 transition-all duration-500" />
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#66F4FF]/10 border border-[#66F4FF]/30 flex items-center justify-center text-[#66F4FF]">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#cae7f9]">Cryptographic Proof</h3>
              <p className="text-sm text-[#bec8d1] leading-relaxed">
                Every certification, role, and achievement is verified on-chain, eliminating resume fraud forever.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
              <span className="text-[#bec8d1]">STATUS</span>
              <span className="text-[#66F4FF] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#66F4FF] animate-ping" />
                VERIFIED ON APTOS
              </span>
            </div>
          </div>

          {/* Card 2: Flawless Presentation (Spans 2 columns) */}
          <div className="glass-panel p-8 rounded-2xl flex flex-col md:flex-row gap-6 md:col-span-2 relative overflow-hidden group hover:border-[#66C4FF]/40 transition-all">
            <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-[#66C4FF]/10 rounded-full blur-3xl group-hover:bg-[#66C4FF]/20 transition-all duration-500" />
            
            <div className="flex-1 flex flex-col justify-between space-y-4 z-10">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#66C4FF]/10 border border-[#66C4FF]/30 flex items-center justify-center text-[#66C4FF]">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#cae7f9]">Flawless Presentation</h3>
                <p className="text-sm text-[#bec8d1] leading-relaxed">
                  Choose from a library of meticulously designed templates that adapt to your career history automatically.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-full bg-[#66F4FF]/10 border border-[#66F4FF]/40 font-mono text-xs font-semibold text-[#66F4FF]">
                  MINIMAL
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0f2d3b] border border-white/10 font-mono text-xs text-[#bec8d1]">
                  CREATIVE
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0f2d3b] border border-white/10 font-mono text-xs text-[#bec8d1]">
                  EXECUTIVE
                </span>
              </div>
            </div>

            <div className="flex-1 relative min-h-[160px] hidden md:block z-10">
              <div className="absolute inset-0 bg-[#001620] rounded-xl border border-white/10 p-3 space-y-2 opacity-90 shadow-inner">
                <div className="w-full h-4 bg-[#66C4FF]/20 rounded w-1/3" />
                <div className="w-full h-2 bg-white/10 rounded w-3/4" />
                <div className="w-full h-2 bg-white/10 rounded w-1/2" />
                <div className="pt-2 flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#FFC067]/20 border border-[#FFC067]/40" />
                  <div className="flex-1 space-y-1">
                    <div className="h-2 bg-[#66F4FF]/30 rounded w-1/4" />
                    <div className="h-1 bg-white/10 rounded w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Total Data Sovereignty (Spans 3 columns) */}
          <div className="glass-panel p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 md:col-span-3 relative overflow-hidden border border-[#FFC067]/20">
            <div className="flex flex-col gap-2 max-w-xl">
              <div className="inline-flex items-center gap-2 text-[#FFC067] font-mono text-xs font-bold uppercase">
                <Cpu className="w-4 h-4" /> PERMANENT BLOB STORAGE
              </div>
              <h3 className="text-2xl font-bold text-[#cae7f9]">Total Data Sovereignty</h3>
              <p className="text-sm text-[#bec8d1] leading-relaxed">
                Your resume is stored on decentralized networks. No platforms can arbitrarily delete your history, and recruiters can instantly trust the source data.
              </p>
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              <div className="flex-1 md:flex-none text-center p-5 bg-[#001620] rounded-xl border border-white/10 min-w-[130px]">
                <div className="text-3xl font-extrabold text-[#66C4FF]">0</div>
                <div className="text-[11px] font-mono text-[#bec8d1] uppercase mt-1">PLATFORM FEES</div>
              </div>

              <div className="flex-1 md:flex-none text-center p-5 bg-[#001620] rounded-xl border border-white/10 min-w-[130px]">
                <div className="text-3xl font-extrabold text-[#66F4FF]">
                  100<span className="text-lg">%</span>
                </div>
                <div className="text-[11px] font-mono text-[#bec8d1] uppercase mt-1">OWNERSHIP</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
