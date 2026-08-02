import React, { useState } from 'react';
import { ResumeItem } from '../types';
import { Logo } from './Logo';
import { 
  ShieldCheck, 
  X, 
  Copy, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Globe, 
  FileText, 
  Cpu, 
  Award,
  Check
} from 'lucide-react';

interface PublicResumeModalProps {
  resume: ResumeItem;
  onClose: () => void;
}

export const PublicResumeModal: React.FC<PublicResumeModalProps> = ({ resume, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(resume.publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([
      `MEADOW VERIFIED DECENTRALIZED CV\n=================================\nCandidate Title: ${resume.title}\nVersion: ${resume.version}\nUploaded Date: ${resume.uploadedAt}\nAuthor Wallet: ${resume.authorAddress}\nShelby Blob ID: ${resume.shelbyBlobId}\nAptos Tx Hash: ${resume.aptosTxHash}\nPublic Immutable URL: ${resume.publicUrl}\n\nSummary:\n${resume.summary || 'Verified Web3 professional resume.'}\n\nVerified Skills: ${(resume.skills || []).join(', ')}`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = resume.fileName.replace('.pdf', '_verified.txt');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="glass-panel w-full max-w-3xl rounded-3xl border border-[#66F4FF]/30 shadow-2xl overflow-hidden relative my-8 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#0f2d3b] px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={28} showText={false} />
            <div>
              <span className="font-mono text-xs text-[#66F4FF] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#66F4FF]" />
                SHELBY CRYPTOGRAPHIC PROOF
              </span>
              <h3 className="text-base font-bold text-[#cae7f9]">{resume.title}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#bec8d1] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Verification Banner */}
          <div className="bg-[#001620] p-4 rounded-2xl border border-[#66F4FF]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#66F4FF]/10 border border-[#66F4FF]/40 flex items-center justify-center text-[#66F4FF] shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#66F4FF]" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#cae7f9] flex items-center gap-2">
                  <span>Verified Public Resume</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#66F4FF]/20 text-[#66F4FF] text-[10px] font-mono">
                    IMMUTABLE
                  </span>
                </div>
                <div className="font-mono text-xs text-[#bec8d1] mt-0.5">
                  Blob ID: <span className="text-[#66C4FF]">{resume.shelbyBlobId}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#66C4FF] hover:bg-[#88ceff] text-[#00344d] font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Link Copied!' : 'Copy Shareable Link'}</span>
            </button>
          </div>

          {/* Technical Proof Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-[#032330] p-3.5 rounded-xl border border-white/5 space-y-1">
              <span className="text-[#bec8d1] uppercase text-[10px] block">Aptos Tx Hash</span>
              <span className="text-[#66C4FF] truncate block" title={resume.aptosTxHash}>
                {resume.aptosTxHash}
              </span>
            </div>

            <div className="bg-[#032330] p-3.5 rounded-xl border border-white/5 space-y-1">
              <span className="text-[#bec8d1] uppercase text-[10px] block">Author Wallet</span>
              <span className="text-[#66F4FF] truncate block">
                {resume.authorAddress}
              </span>
            </div>
          </div>

          {/* Resume Summary & Skills */}
          <div className="space-y-4 pt-2 border-t border-white/10">
            <div>
              <h4 className="text-xs font-mono uppercase text-[#bec8d1] font-semibold mb-2">
                Executive Profile Summary
              </h4>
              <p className="text-sm text-[#cae7f9] bg-[#001e2c] p-4 rounded-xl border border-white/5 leading-relaxed">
                {resume.summary || 'Verified professional resume stored permanently on Shelby Protocol on Aptos.'}
              </p>
            </div>

            {resume.skills && resume.skills.length > 0 && (
              <div>
                <h4 className="text-xs font-mono uppercase text-[#bec8d1] font-semibold mb-2">
                  Verified Technical Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-[#66F4FF]/10 border border-[#66F4FF]/30 text-xs font-mono text-[#66F4FF]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#0f2d3b] px-6 py-4 border-t border-white/10 flex items-center justify-between">
          <a
            href="https://shelby.xyz"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono text-[#bec8d1] hover:text-[#66F4FF] flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Verify on Shelby Network</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#bec8d1] hover:text-white"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-[#66C4FF] hover:bg-[#88ceff] text-[#00344d] font-bold text-xs transition-all flex items-center gap-1.5 shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
