import React, { useState } from 'react';
import { Award, ShieldCheck, CheckCircle2, Sparkles, Plus, ExternalLink } from 'lucide-react';
import { useAppWallet } from '../context/AptosWalletContext';

export const CertificationsPage: React.FC = () => {
  const { isConnected, shortAddress } = useAppWallet();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [certificates, setCertificates] = useState([
    {
      id: 'cert-1',
      title: 'Shelby Storage Pioneer',
      issuer: 'Shelby Protocol Alliance',
      issueDate: 'Aug 2024',
      badgeColor: 'from-[#66C4FF] to-[#66F4FF]',
      description: 'Awarded for publishing verified immutable professional resume blobs on the Aptos network via Shelby Protocol.',
      txHash: '0x94f812e987ac2b6f103984d7201a3512bce987f'
    },
    {
      id: 'cert-2',
      title: 'Aptos Move Certified Developer',
      issuer: 'Aptos Foundation',
      issueDate: 'Jun 2024',
      badgeColor: 'from-amber-400 to-amber-200',
      description: 'Verified competence in developing, testing, and auditing Move smart contracts on Aptos mainnet.',
      txHash: '0x321a56bc890de1234567890abcdef1234567890a'
    },
    {
      id: 'cert-3',
      title: 'Decentralized Professional Identity',
      issuer: 'Meadow Protocol Vault',
      issueDate: 'May 2024',
      badgeColor: 'from-purple-500 to-indigo-400',
      description: 'Zero-knowledge verification proof confirming valid professional credentials without third-party intermediaries.',
      txHash: '0x789012abcdef3456789012abcdef3456789012ab'
    }
  ]);

  const handleMintProof = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      title: 'On-Chain Skill Proof Badge',
      issuer: 'Aptos Ecosystem Verification',
      issueDate: 'Current Block',
      badgeColor: 'from-emerald-400 to-teal-300',
      description: 'Cryptographically verified on-chain proof of skill, freshly minted to connected Aptos account.',
      txHash: '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('')
    };
    setCertificates(prev => [newCert, ...prev]);
    setToastMsg('Minted new On-Chain Skill Proof Badge!');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0f2d3b] border border-[#66F4FF] text-[#66F4FF] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-mono text-xs animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#66F4FF]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#66F4FF]/30 bg-[#66F4FF]/10 text-[#66F4FF] text-xs font-mono font-semibold mb-3">
            <Award className="w-3.5 h-3.5 text-[#66F4FF]" />
            ON-CHAIN BADGES & CREDENTIALS
          </div>
          <h1 className="text-3xl font-extrabold text-[#cae7f9]">Certifications & Badges</h1>
          <p className="text-base text-[#bec8d1] mt-1">
            Verifiable Web3 badges cryptographically linked to your Aptos wallet address ({shortAddress || '0x71C...4f2'}).
          </p>
        </div>

        <button
          onClick={handleMintProof}
          className="bg-[#66C4FF] text-[#00344d] hover:bg-[#88ceff] px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md glow-aqua flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Mint Credential Proof</span>
        </button>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="glass-panel rounded-2xl p-6 border border-white/10 bg-[#032330] flex flex-col justify-between hover:border-[#66C4FF]/40 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cert.badgeColor} p-0.5 shadow-md`}>
                  <div className="w-full h-full bg-[#001620] rounded-[14px] flex items-center justify-center text-[#cae7f9]">
                    <Award className="w-6 h-6 text-[#66F4FF]" />
                  </div>
                </div>

                <span className="text-[10px] font-mono bg-[#001620] text-[#66F4FF] border border-[#66F4FF]/30 px-2.5 py-1 rounded-full font-bold uppercase">
                  VERIFIED
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#cae7f9] leading-snug group-hover:text-[#66C4FF] transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs font-mono text-[#bec8d1] mt-1">
                  Issued by {cert.issuer} • {cert.issueDate}
                </p>
              </div>

              <p className="text-xs text-[#bec8d1]/90 leading-relaxed">
                {cert.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#bec8d1]">
              <span className="truncate max-w-[180px] text-[#66F4FF]/80">
                Tx: {cert.txHash.slice(0, 14)}...
              </span>
              <a
                href={`https://explorer.aptoslabs.com/txn/${cert.txHash}?network=mainnet`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#66C4FF] flex items-center gap-1"
              >
                <span>Proof</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
