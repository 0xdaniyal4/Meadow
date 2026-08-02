import React from 'react';
import { Logo } from './Logo';
import { useAppWallet } from '../context/AptosWalletContext';
import { Wallet, LogOut, Upload, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: any) => void;
  onOpenUpload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate, onOpenUpload }) => {
  const { isConnected, shortAddress, connectWallet, disconnectWallet, isConnecting, demoMode } = useAppWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#001620]/85 backdrop-blur-xl border-b border-white/10">
      <div className="flex justify-between items-center px-4 md:px-8 py-3 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 text-left focus:outline-none group"
          >
            <Logo size={36} showText={true} />
          </button>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {!isConnected ? (
              <>
                <button 
                  onClick={() => onNavigate('landing')}
                  className={`text-sm font-medium transition-colors hover:text-[#66C4FF] ${currentTab === 'landing' ? 'text-[#66C4FF]' : 'text-[#bec8d1]'}`}
                >
                  Explore
                </button>
                <a 
                  href="https://docs.shelby.xyz" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-sm font-medium text-[#bec8d1] hover:text-[#66C4FF] transition-colors"
                >
                  Verify
                </a>
                <a 
                  href="https://shelby.xyz" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-sm font-medium text-[#bec8d1] hover:text-[#66C4FF] transition-colors"
                >
                  Network
                </a>
                <a 
                  href="https://docs.shelby.xyz" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-sm font-medium text-[#bec8d1] hover:text-[#66C4FF] transition-colors"
                >
                  Docs
                </a>
              </>
            ) : (
              <>
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className={`text-sm font-medium transition-colors hover:text-[#66C4FF] ${currentTab === 'dashboard' ? 'text-[#66C4FF] border-b-2 border-[#66C4FF] pb-0.5' : 'text-[#bec8d1]'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => onNavigate('upload')}
                  className={`text-sm font-medium transition-colors hover:text-[#66C4FF] ${currentTab === 'upload' ? 'text-[#66C4FF] border-b-2 border-[#66C4FF] pb-0.5' : 'text-[#bec8d1]'}`}
                >
                  Resumes
                </button>
                <a 
                  href="https://shelby.xyz" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-sm font-medium text-[#bec8d1] hover:text-[#66C4FF] transition-colors"
                >
                  Network
                </a>
                <a 
                  href="https://docs.shelby.xyz" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-sm font-medium text-[#bec8d1] hover:text-[#66C4FF] transition-colors"
                >
                  Verification
                </a>
              </>
            )}
          </div>
        </div>

        {/* Right Actions / Wallet Button */}
        <div className="flex items-center gap-3">
          {isConnected ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenUpload}
                className="hidden sm:flex items-center gap-1.5 bg-[#66C4FF] text-[#00344d] hover:bg-[#88ceff] px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-sm glow-sky active:scale-95"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Resume</span>
              </button>

              <div className="flex items-center gap-2 bg-[#032330] border border-[#66F4FF]/30 px-3 py-1.5 rounded-lg">
                <div className="w-2.5 h-2.5 rounded-full bg-[#66F4FF] animate-pulse" />
                <span className="font-mono text-xs font-semibold text-[#cae7f9]">
                  {shortAddress}
                </span>
                {demoMode && (
                  <span className="text-[10px] bg-[#FFC067]/20 text-[#FFC067] px-1.5 py-0.5 rounded font-mono">
                    DEMO
                  </span>
                )}
                <button 
                  onClick={disconnectWallet}
                  className="text-[#bec8d1] hover:text-red-400 p-1 transition-colors ml-1"
                  title="Disconnect Wallet"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="bg-[#66C4FF] text-[#00344d] hover:bg-[#88ceff] font-bold text-sm px-5 py-2.5 rounded-lg transition-all transform hover:scale-95 glow-aqua flex items-center gap-2 shadow-md"
            >
              <Wallet className="w-4 h-4" />
              <span>{isConnecting ? 'Connecting Petra...' : 'Connect Wallet'}</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline-block" />
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#bec8d1] hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#001620] border-b border-white/10 px-6 py-4 space-y-3">
          <button 
            onClick={() => { onNavigate('landing'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 text-[#bec8d1] hover:text-[#66C4FF]"
          >
            Explore & Home
          </button>
          {isConnected && (
            <>
              <button 
                onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 text-[#66C4FF] font-semibold"
              >
                My Dashboard
              </button>
              <button 
                onClick={() => { onOpenUpload(); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 text-[#66F4FF] font-semibold"
              >
                + Upload New Resume
              </button>
            </>
          )}
          <a 
            href="https://docs.shelby.xyz" 
            target="_blank" 
            rel="noreferrer"
            className="block py-2 text-[#bec8d1] hover:text-[#66C4FF]"
          >
            Shelby Docs
          </a>
        </div>
      )}
    </nav>
  );
};
