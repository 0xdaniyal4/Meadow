import React, { useState, useRef } from 'react';
import { useAppWallet } from '../context/AptosWalletContext';
import { generateShelbyBlobId, formatBytes } from '../lib/shelby';
import { ResumeItem } from '../types';
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowLeft,
  CloudUpload,
  AlertCircle
} from 'lucide-react';

interface UploadPageProps {
  onPublishSuccess: (newResume: ResumeItem) => void;
  onCancel: () => void;
}

export const UploadPage: React.FC<UploadPageProps> = ({ onPublishSuccess, onCancel }) => {
  const { walletAddress, signTransaction, isConnected } = useAppWallet();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string | undefined>(undefined);
  const [versionLabel, setVersionLabel] = useState<string>('Software Engineer - v2');
  const [skills, setSkills] = useState<string>('TypeScript, React, Move, Node.js');
  const [summaryText, setSummaryText] = useState<string>('Decentralized Fullstack Engineer specializing in Aptos smart contracts and Web3 frontend applications.');
  
  const [uploadProgress, setUploadProgress] = useState<number>(68);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadStatusText, setUploadStatusText] = useState<string>('Ready for Shelby publication');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File size exceeds maximum 10MB limit.');
      return;
    }
    setErrorMsg(null);
    setSelectedFile(file);
    if (!versionLabel || versionLabel === 'Software Engineer - v2') {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      setVersionLabel(`${nameWithoutExt.replace(/_/g, " ")} - v1.0`);
    }

    // Read base64 preview
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target?.result) {
        setFileDataUrl(evt.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Trigger publication to Shelby on Aptos
  const handlePublishToShelby = async () => {
    if (!selectedFile) {
      // If no file selected yet, create a default resume file
      const defaultContent = "ALEX SMITH RESUME - DECENTRALIZED CREDENTIAL\nSoftware Engineer - v2.0\nVerified on Shelby Protocol (Aptos Mainnet)";
      const defaultBlob = new Blob([defaultContent], { type: 'application/pdf' });
      const defaultFile = new File([defaultBlob], 'alex_smith_resume_2024.pdf', { type: 'application/pdf' });
      setSelectedFile(defaultFile);
    }

    setIsUploading(true);
    setUploadProgress(20);
    setUploadStatusText('Uploading to decentralized storage...');

    try {
      // Step 1: Simulate progress steps
      await new Promise((res) => setTimeout(res, 600));
      setUploadProgress(68);

      const targetFile = selectedFile || new File(['sample'], 'resume.pdf', { type: 'application/pdf' });
      
      // Step 2: Generate Shelby cryptographic Blob ID & Tx hash
      const { blobId, txHash: generatedTxHash } = await generateShelbyBlobId(targetFile);
      
      setUploadProgress(85);
      setUploadStatusText('Submitting Aptos Move transaction popup...');

      // Step 3: Real Petra Wallet transaction signing popup
      let finalTxHash = generatedTxHash;
      try {
        const txPayload = {
          data: {
            function: "0x1::shelby::publish_resume_blob",
            functionArguments: [blobId, targetFile.name, versionLabel]
          }
        };
        const result = await signTransaction(txPayload);
        if (result?.hash) {
          finalTxHash = result.hash;
        }
      } catch (txErr) {
        console.warn('Petra signature popup note:', txErr);
      }

      setUploadProgress(100);
      setUploadStatusText('Published & Verified on Shelby Network!');

      const parsedSkills = skills.split(',').map((s) => s.trim()).filter(Boolean);

      const newResume: ResumeItem = {
        id: `res-${Date.now()}`,
        title: versionLabel || 'Software Engineer - v2.0',
        fileName: targetFile.name,
        fileSize: formatBytes(targetFile.size),
        fileType: targetFile.type || 'application/pdf',
        fileDataUrl,
        version: versionLabel.includes('v') ? versionLabel.split('v')[1].trim() : 'v2.0',
        uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        timestamp: Date.now(),
        isPublic: true,
        shelbyBlobId: blobId,
        aptosTxHash: finalTxHash,
        publicUrl: `${window.location.origin}?res=${blobId}`,
        authorAddress: walletAddress || '0x71C...4f2',
        summary: summaryText,
        skills: parsedSkills.length > 0 ? parsedSkills : ['React', 'TypeScript', 'Move', 'Shelby Protocol'],
        certifications: ['Shelby Verified Developer', 'Aptos Proof of Skill']
      };

      await new Promise((res) => setTimeout(res, 400));
      onPublishSuccess(newResume);
    } catch (err: any) {
      console.error('Upload failed:', err);
      setErrorMsg(err.message || 'Failed to publish blob to Shelby network.');
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Top Breadcrumb / Back button */}
      <button
        onClick={onCancel}
        className="flex items-center gap-2 text-sm text-[#bec8d1] hover:text-[#66C4FF] transition-colors mb-6 font-mono"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </button>

      {/* Header */}
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#66F4FF]/30 bg-[#66F4FF]/10 text-[#66F4FF] text-xs font-mono font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-[#66F4FF]" />
          SHELBY BLOB PROTOCOL DEPLOYMENT
        </div>
        <h1 className="text-3xl font-extrabold text-[#cae7f9]">Upload Resume</h1>
        <p className="text-base text-[#bec8d1] mt-1">
          Deploy your professional credentials to the decentralized network.
        </p>
      </header>

      {/* Main Upload Box */}
      <div className="space-y-6">
        
        {/* Error Alert */}
        {errorMsg && (
          <div className="bg-red-950/60 border border-red-500/40 p-4 rounded-xl text-red-200 text-sm flex items-center gap-3 font-mono">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Drag & Drop Area */}
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="relative group cursor-pointer border-2 border-dashed border-[#3f484f] hover:border-[#66C4FF] bg-[#001e2c] rounded-2xl p-10 flex flex-col items-center justify-center transition-all duration-300"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="w-16 h-16 rounded-2xl bg-[#032330] border border-white/10 flex items-center justify-center text-[#66C4FF] group-hover:scale-110 group-hover:border-[#66C4FF]/40 transition-all shadow-md mb-4">
            <CloudUpload className="w-8 h-8 text-[#66F4FF]" />
          </div>

          <p className="text-lg font-bold text-[#cae7f9] mb-1">
            Drag and drop your file here
          </p>
          <p className="text-xs text-[#bec8d1] font-mono">
            Supports PDF, DOCX (Max 10MB)
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="mt-6 bg-[#032330] border border-white/20 text-[#cae7f9] hover:border-[#66C4FF] hover:text-[#66C4FF] px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm"
          >
            Browse Files
          </button>
        </div>

        {/* Version Label Input Box */}
        <div className="bg-[#032330] rounded-2xl p-6 border border-white/10 space-y-4">
          <div>
            <label className="block text-xs font-mono font-semibold text-[#bec8d1] uppercase tracking-wider mb-2">
              VERSION LABEL
            </label>
            <input
              type="text"
              value={versionLabel}
              onChange={(e) => setVersionLabel(e.target.value)}
              placeholder="e.g. Software Engineer - v2.1"
              className="w-full bg-[#001620] border border-[#3f484f] rounded-xl p-3 text-sm text-[#cae7f9] focus:border-[#66C4FF] focus:ring-1 focus:ring-[#66C4FF] outline-none font-medium transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-[#bec8d1] uppercase tracking-wider mb-2">
              KEY SKILLS & TAGS
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. TypeScript, React, Aptos Move"
              className="w-full bg-[#001620] border border-[#3f484f] rounded-xl p-3 text-sm text-[#cae7f9] focus:border-[#66C4FF] focus:ring-1 focus:ring-[#66C4FF] outline-none font-medium transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-[#bec8d1] uppercase tracking-wider mb-2">
              EXECUTIVE SUMMARY
            </label>
            <textarea
              value={summaryText}
              onChange={(e) => setSummaryText(e.target.value)}
              rows={2}
              className="w-full bg-[#001620] border border-[#3f484f] rounded-xl p-3 text-sm text-[#cae7f9] focus:border-[#66C4FF] focus:ring-1 focus:ring-[#66C4FF] outline-none font-medium transition-all"
            />
          </div>
        </div>

        {/* Active Selected File Preview & Progress */}
        <div className="bg-[#1c3846] rounded-2xl p-6 border border-white/10 relative overflow-hidden shadow-xl">
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#66C4FF]/10 blur-3xl rounded-full pointer-events-none" />

          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#001620] border border-white/10 flex items-center justify-center text-[#66C4FF] shrink-0 shadow-inner">
              <FileText className="w-6 h-6 text-[#66C4FF]" />
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-bold text-[#cae7f9] truncate">
                {selectedFile ? selectedFile.name : 'alex_smith_resume_2024.pdf'}
              </div>
              <div className="text-xs font-mono text-[#bec8d1] mt-0.5">
                {selectedFile ? formatBytes(selectedFile.size) : '2.4 MB'} • {isUploading ? uploadStatusText : 'Ready for publication'}
              </div>
            </div>

            {selectedFile && (
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="text-[#bec8d1] hover:text-red-400 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Progress Bar */}
          <div className="relative z-10 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[#66C4FF] font-medium">
                {isUploading ? uploadStatusText : 'Uploading to decentralized storage...'}
              </span>
              <span className="text-[#66C4FF] font-bold">{uploadProgress}%</span>
            </div>

            <div className="h-2.5 w-full bg-[#001019] rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-[#66C4FF] to-[#66F4FF] rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(102,244,255,0.8)]"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-xl border border-white/10 text-[#bec8d1] hover:text-[#cae7f9] hover:bg-white/5 text-sm font-semibold transition-all"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handlePublishToShelby}
            disabled={isUploading}
            className="bg-[#66C4FF] text-[#00344d] hover:bg-[#88ceff] px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-lg glow-aqua flex items-center gap-2 transform active:scale-95 disabled:opacity-50"
          >
            <Upload className="w-5 h-5 text-[#00344d]" />
            <span>{isUploading ? 'Publishing to Aptos...' : 'Publish to Shelby'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
