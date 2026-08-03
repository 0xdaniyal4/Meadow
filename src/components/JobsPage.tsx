import React, { useState } from 'react';
import { Briefcase, Search, MapPin, DollarSign, ArrowRight, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { ResumeItem } from '../types';
import { useAppWallet } from '../context/AptosWalletContext';

interface JobsPageProps {
  resumes: ResumeItem[];
  onOpenUpload: () => void;
}

export const JobsPage: React.FC<JobsPageProps> = ({ resumes, onOpenUpload }) => {
  const { isConnected } = useAppWallet();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [selectedResumeId, setSelectedResumeId] = useState<string>('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({});

  const jobsList = [
    {
      id: 'job-1',
      title: 'Senior Aptos Move Smart Contract Engineer',
      company: 'Shelby Ecosystem Labs',
      location: 'Remote (Global)',
      salary: '$140k - $190k + Token Equity',
      type: 'Full-time',
      tags: ['Aptos', 'Move', 'Rust', 'Shelby Protocol'],
      description: 'Architect high-throughput decentralized storage modules and smart contract vaults on Aptos mainnet.'
    },
    {
      id: 'job-2',
      title: 'Lead Web3 Frontend Engineer (React / TypeScript)',
      company: 'Meadow Protocol',
      location: 'Remote (US / EU)',
      salary: '$130k - $170k',
      type: 'Full-time',
      tags: ['React', 'TypeScript', 'Tailwind', 'Petra Adapter'],
      description: 'Build elegant, high-performance decentralized identity and cryptographic resume management interfaces.'
    },
    {
      id: 'job-3',
      title: 'Decentralized Storage Infrastructure Lead',
      company: 'Aptos Storage Alliance',
      location: 'Remote / San Francisco',
      salary: '$160k - $210k',
      type: 'Full-time',
      tags: ['Go', 'Rust', 'Storage Nodes', 'P2P'],
      description: 'Maintain and scale geo-distributed storage clusters with sub-50ms global retrieval latencies.'
    },
    {
      id: 'job-4',
      title: 'Web3 UX/UI Product Designer',
      company: 'Petra Labs',
      location: 'Remote',
      salary: '$110k - $150k',
      type: 'Full-time',
      tags: ['Figma', 'UI/UX', 'Design Systems', 'Web3 Onboarding'],
      description: 'Craft intuitive crypto wallet and credential verification experiences for millions of Aptos users.'
    }
  ];

  const filteredJobs = jobsList.filter(j =>
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleApplyClick = (job: any) => {
    setSelectedJob(job);
    if (resumes.length > 0) {
      setSelectedResumeId(resumes[0].id);
    }
  };

  const handleConfirmApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    setAppliedJobs(prev => ({ ...prev, [selectedJob.id]: true }));
    setToastMsg(`Application submitted to ${selectedJob.company} with verified resume!`);
    setSelectedJob(null);
    setTimeout(() => setToastMsg(null), 3500);
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

      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#66F4FF]/30 bg-[#66F4FF]/10 text-[#66F4FF] text-xs font-mono font-semibold mb-3">
          <Briefcase className="w-3.5 h-3.5 text-[#66F4FF]" />
          WEB3 & APTOS ECOSYSTEM CAREERS
        </div>
        <h1 className="text-3xl font-extrabold text-[#cae7f9]">Verified Career Opportunities</h1>
        <p className="text-base text-[#bec8d1] mt-1">
          Apply to premier Aptos and Web3 tech positions with your tamper-proof Shelby verified resume.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="glass-panel rounded-2xl p-4 border border-white/10 bg-[#032330] flex items-center gap-3">
        <Search className="w-5 h-5 text-[#66F4FF] shrink-0 ml-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Web3 jobs by title, company, or technology (e.g. Move, React, Aptos)..."
          className="w-full bg-transparent border-none text-sm text-[#cae7f9] outline-none font-medium placeholder-[#bec8d1]/60"
        />
      </div>

      {/* Job Cards List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="glass-panel rounded-2xl p-6 border border-white/10 bg-[#032330] hover:border-[#66C4FF]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-3 flex-1">
              <div>
                <span className="text-xs font-mono text-[#66F4FF] font-semibold">{job.company}</span>
                <h3 className="text-xl font-bold text-[#cae7f9] mt-0.5">{job.title}</h3>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#bec8d1]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#66F4FF]" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <DollarSign className="w-3.5 h-3.5" />
                  {job.salary}
                </span>
                <span className="bg-[#001620] px-2.5 py-0.5 rounded border border-white/10">
                  {job.type}
                </span>
              </div>

              <p className="text-xs text-[#bec8d1] leading-relaxed">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {job.tags.map((tag, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 rounded-full bg-[#001620] text-[#66C4FF] text-[11px] font-mono border border-[#66C4FF]/20">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0">
              {appliedJobs[job.id] ? (
                <button
                  disabled
                  className="bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 cursor-default"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Application Submitted</span>
                </button>
              ) : (
                <button
                  onClick={() => handleApplyClick(job)}
                  className="bg-[#66C4FF] text-[#00344d] hover:bg-[#88ceff] px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md glow-aqua flex items-center gap-2"
                >
                  <span>Apply with Shelby</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Application Confirmation */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#032330] border border-[#66F4FF]/40 rounded-2xl max-w-lg w-full p-6 space-y-6 glow-aqua relative">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-[#bec8d1] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#66F4FF]/10 text-[#66F4FF] text-xs font-mono font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#66F4FF]" />
                ONE-CLICK VERIFIED APPLICATION
              </div>
              <h3 className="text-xl font-extrabold text-[#cae7f9]">
                Apply for {selectedJob.title}
              </h3>
              <p className="text-xs text-[#bec8d1] mt-1">
                Company: <span className="text-[#66F4FF] font-bold">{selectedJob.company}</span>
              </p>
            </div>

            <form onSubmit={handleConfirmApplication} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-semibold text-[#bec8d1] uppercase mb-2">
                  SELECT YOUR SHELBY VERIFIED RESUME
                </label>
                {resumes.length > 0 ? (
                  <select
                    value={selectedResumeId}
                    onChange={(e) => setSelectedResumeId(e.target.value)}
                    className="w-full bg-[#001620] border border-[#3f484f] rounded-xl p-3 text-sm text-[#cae7f9] outline-none focus:border-[#66C4FF] font-mono"
                  >
                    {resumes.map((res) => (
                      <option key={res.id} value={res.id}>
                        {res.title} ({res.version}) • {res.shelbyBlobId.slice(0, 16)}...
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="p-4 rounded-xl bg-[#001620] border border-amber-500/30 text-amber-200 text-xs font-mono space-y-2">
                    <div>No resumes uploaded yet to your connected wallet.</div>
                    <button
                      type="button"
                      onClick={() => { setSelectedJob(null); onOpenUpload(); }}
                      className="text-[#66F4FF] underline font-bold"
                    >
                      + Upload a resume first
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-[#bec8d1] text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={resumes.length === 0}
                  className="bg-[#66C4FF] text-[#00344d] hover:bg-[#88ceff] px-6 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
