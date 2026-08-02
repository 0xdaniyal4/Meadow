import React, { useState } from 'react';
import { ResumeItem } from '../types';
import { useAppWallet } from '../context/AptosWalletContext';
import { 
  FileText, 
  Plus, 
  Wallet, 
  Award, 
  Briefcase, 
  Settings, 
  HelpCircle, 
  BookOpen, 
  Link, 
  Download, 
  Bell, 
  CheckCircle2, 
  Eye, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Globe
} from 'lucide-react';

interface DashboardPageProps {
  resumes: ResumeItem[];
  onToggleActive: (id: string) => void;
  onOpenUpload: () => void;
  onViewResume: (resume: ResumeItem) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  resumes,
  onToggleActive,
  onOpenUpload,
  onViewResume
}) => {
  const { shortAddress, walletAddress } = useAppWallet();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyToClipboard = (url: string, title: string) => {
    navigator.clipboard.writeText(url);
    showToast(`Copied public link for "${title}" to clipboard!`);
  };

  const handleDownload = (resume: ResumeItem) => {
    showToast(`Downloading resume document: ${resume.fileName}`);
    // Simulate download file blob
    const element = document.createElement("a");
    const file = new Blob([
      `MEADOW DECENTRALIZED RESUME\n---------------------------\nTitle: ${resume.title}\nVersion: ${resume.version}\nAuthor Address: ${resume.authorAddress}\nShelby Blob ID: ${resume.shelbyBlobId}\nAptos Transaction Hash: ${resume.aptosTxHash}\nPublic Link: ${resume.publicUrl}\nUploaded: ${resume.uploadedAt}\n\nSummary:\n${resume.summary || 'Professional resume verified on Aptos network via Shelby protocol.'}`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = resume.fileName.replace('.pdf', '.txt');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex min-h-screen pt-16 w-full">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0f2d3b] border border-[#66F4FF] text-[#66F4FF] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-mono text-xs animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#66F4FF]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Side Navigation Bar (Hidden on mobile) */}
      <aside className="hidden md:flex flex-col w-64 fixed left-0 top-16 bottom-0 border-r border-white/10 bg-[#032330] py-6 px-4 z-40">
        
        {/* Wallet User Info Block */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1c3846] border border-[#66F4FF]/30 flex items-center justify-center text-[#66F4FF] shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <h2 className="text-sm font-bold text-[#cae7f9] truncate font-mono">
                {shortAddress || '0x71C...4f2'}
              </h2>
              <p className="text-xs text-[#66F4FF] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#66F4FF]" />
                Verified Professional
              </p>
            </div>
          </div>

          <button
            onClick={onOpenUpload}
            className="w-full bg-[#66C4FF] hover:bg-[#88ceff] text-[#00344d] py-2.5 px-4 rounded-xl font-bold text-sm transition-all shadow-md glow-aqua flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Mint New Resume</span>
          </button>
        </div>

        {/* Sidebar Nav Links */}
        <div className="flex-1 overflow-y-auto space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#66C4FF]/10 text-[#66C4FF] font-medium text-sm border-r-4 border-[#66C4FF]">
            <FileText className="w-4 h-4 text-[#66C4FF]" />
            <span>My Resumes</span>
          </button>

          <a href="https://shelby.xyz" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#bec8d1] hover:bg-[#1c3846]/50 hover:text-[#cae7f9] text-sm transition-colors">
            <Wallet className="w-4 h-4" />
            <span>Wallet</span>
          </a>

          <a href="https://docs.shelby.xyz" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#bec8d1] hover:bg-[#1c3846]/50 hover:text-[#cae7f9] text-sm transition-colors">
            <Award className="w-4 h-4" />
            <span>Certifications</span>
          </a>

          <a href="https://shelby.xyz" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#bec8d1] hover:bg-[#1c3846]/50 hover:text-[#cae7f9] text-sm transition-colors">
            <Briefcase className="w-4 h-4" />
            <span>Jobs</span>
          </a>

          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#bec8d1] hover:bg-[#1c3846]/50 hover:text-[#cae7f9] text-sm transition-colors">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </a>
        </div>

        {/* Bottom Support Section */}
        <div className="pt-4 border-t border-white/10 space-y-1">
          <a href="https://discord.gg/shelbyserves" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-[#bec8d1] hover:text-[#cae7f9]">
            <HelpCircle className="w-4 h-4" />
            <span>Support</span>
          </a>
          <a href="https://docs.shelby.xyz" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-[#bec8d1] hover:text-[#cae7f9]">
            <BookOpen className="w-4 h-4" />
            <span>Documentation</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-6 lg:p-10 max-w-7xl mx-auto w-full">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#cae7f9]">My Resumes</h1>
            <p className="text-sm text-[#bec8d1] mt-1">Manage your decentralized professional identity.</p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onOpenUpload}
              className="bg-[#66C4FF] text-[#00344d] hover:bg-[#88ceff] px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md glow-aqua flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Resume</span>
            </button>
          </div>
        </div>

        {/* Resume Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className={`glass-panel rounded-2xl p-6 flex flex-col justify-between relative transition-all duration-300 ${
                resume.isPublic ? 'glow-aqua border-[#66F4FF]/40 bg-[#0f2d3b]/90' : 'hover:border-white/20'
              }`}
            >
              {/* Card Top */}
              <div>
                <div className="flex justify-between items-start gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#cae7f9] leading-snug cursor-pointer hover:text-[#66C4FF]" onClick={() => onViewResume(resume)}>
                      {resume.title}
                    </h3>
                    <p className="font-mono text-xs text-[#bec8d1] mt-1">
                      Uploaded on {resume.uploadedAt}
                    </p>
                  </div>

                  {/* Public Active Toggle */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`font-mono text-xs font-semibold ${resume.isPublic ? 'text-[#66F4FF]' : 'text-[#bec8d1]'}`}>
                      {resume.isPublic ? 'Public' : 'Private'}
                    </span>
                    <button
                      onClick={() => onToggleActive(resume.id)}
                      className={`w-11 h-6 rounded-full relative p-1 transition-colors border ${
                        resume.isPublic 
                          ? 'bg-[#66F4FF]/20 border-[#66F4FF]' 
                          : 'bg-[#1c3846] border-white/10'
                      }`}
                      title={resume.isPublic ? 'Click to make private' : 'Click to make active/public'}
                    >
                      <div
                        className={`w-4 h-4 rounded-full transition-transform shadow-md ${
                          resume.isPublic
                            ? 'bg-[#66F4FF] translate-x-5 glow-aqua'
                            : 'bg-[#bec8d1] translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Metadata badges */}
                <div className="flex flex-wrap gap-2 my-4">
                  <span className="px-2.5 py-1 rounded bg-[#001620] border border-white/10 text-[11px] font-mono text-[#bec8d1]">
                    {resume.version}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#001620] border border-white/10 text-[11px] font-mono text-[#bec8d1]">
                    {resume.fileSize}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#66C4FF]/10 border border-[#66C4FF]/30 text-[11px] font-mono text-[#66C4FF]">
                    Shelby Hash
                  </span>
                </div>
              </div>

              {/* Card Actions Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(resume.publicUrl, resume.title)}
                  className={`flex-1 flex items-center justify-center gap-1.5 font-medium text-xs rounded-xl py-2.5 px-2 transition-all border ${
                    resume.isPublic
                      ? 'text-[#66F4FF] border-[#66F4FF]/40 hover:bg-[#66F4FF]/10'
                      : 'text-[#bec8d1] border-white/10 hover:bg-white/5'
                  }`}
                >
                  <Link className="w-3.5 h-3.5" />
                  <span>{resume.isPublic ? 'Copy Public Link' : 'Copy Link'}</span>
                </button>

                <button
                  onClick={() => onViewResume(resume)}
                  className="flex items-center justify-center p-2.5 rounded-xl border border-white/10 text-[#bec8d1] hover:text-[#66C4FF] hover:bg-white/5 transition-all"
                  title="Preview Verified Resume"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDownload(resume)}
                  className={`flex-1 flex items-center justify-center gap-1.5 font-medium text-xs rounded-xl py-2.5 px-2 transition-all border ${
                    resume.isPublic
                      ? 'text-[#66F4FF] border-[#66F4FF]/40 hover:bg-[#66F4FF]/10'
                      : 'text-[#bec8d1] border-white/10 hover:bg-white/5'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}

          {/* Add New Version Card Button */}
          <button
            onClick={onOpenUpload}
            className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center border-2 border-dashed border-white/10 hover:border-[#66F4FF]/50 hover:bg-[#66F4FF]/5 transition-all group min-h-[220px]"
          >
            <div className="w-12 h-12 rounded-full bg-[#1c3846] border border-white/10 flex items-center justify-center mb-3 group-hover:bg-[#66F4FF]/20 group-hover:border-[#66F4FF]/40 transition-colors">
              <Plus className="w-6 h-6 text-[#bec8d1] group-hover:text-[#66F4FF]" />
            </div>
            <span className="font-bold text-sm text-[#bec8d1] group-hover:text-[#cae7f9]">
              Create New Version
            </span>
            <span className="text-xs text-[#bec8d1]/70 mt-1 font-mono">
              Upload PDF to Shelby
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};
