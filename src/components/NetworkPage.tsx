import React, { useState } from 'react';
import { Network, Server, ShieldCheck, Activity, Cpu, Database, CheckCircle2, Search, ExternalLink } from 'lucide-react';

export const NetworkPage: React.FC = () => {
  const [searchHash, setSearchHash] = useState('');
  const [searchResult, setSearchResult] = useState<any | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchHash) return;
    setSearchResult({
      blobId: searchHash.startsWith('0x') ? searchHash : `0xshelby_${searchHash.slice(0, 16)}`,
      status: 'Active & Replicated',
      nodes: 12,
      redundancy: '3x Geo-Distributed',
      size: '2.4 MB',
      createdAt: 'Aptos Block #184,920,411',
      consensus: 'Aptos BFT Proof of Stake'
    });
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#66F4FF]/30 bg-[#66F4FF]/10 text-[#66F4FF] text-xs font-mono font-semibold mb-3">
          <Activity className="w-3.5 h-3.5 text-[#66F4FF]" />
          SHELBY NETWORK INFRASTRUCTURE
        </div>
        <h1 className="text-3xl font-extrabold text-[#cae7f9]">Shelby Protocol Network</h1>
        <p className="text-base text-[#bec8d1] mt-1">
          Real-time decentralized storage node status and Aptos network state.
        </p>
      </div>

      {/* Network Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-panel rounded-2xl p-5 border border-white/10 bg-[#032330]">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-mono text-[#bec8d1] uppercase font-semibold">Network Health</span>
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </span>
          </div>
          <div className="text-2xl font-black text-[#cae7f9]">99.98%</div>
          <div className="text-xs text-emerald-400 font-mono mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            All 48 Nodes Operational
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/10 bg-[#032330]">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-mono text-[#bec8d1] uppercase font-semibold">Total Blobs Stored</span>
            <span className="p-2 rounded-lg bg-[#66C4FF]/10 text-[#66C4FF]">
              <Database className="w-5 h-5" />
            </span>
          </div>
          <div className="text-2xl font-black text-[#cae7f9]">1,429,800+</div>
          <div className="text-xs text-[#66F4FF] font-mono mt-1">+12.4% this month</div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/10 bg-[#032330]">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-mono text-[#bec8d1] uppercase font-semibold">Avg Retrieval Latency</span>
            <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Cpu className="w-5 h-5" />
            </span>
          </div>
          <div className="text-2xl font-black text-[#cae7f9]">48 ms</div>
          <div className="text-xs text-[#bec8d1] font-mono mt-1">Global Edge CDN active</div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/10 bg-[#032330]">
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-mono text-[#bec8d1] uppercase font-semibold">Consensus Engine</span>
            <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Server className="w-5 h-5" />
            </span>
          </div>
          <div className="text-2xl font-black text-[#cae7f9]">Aptos Mainnet</div>
          <div className="text-xs text-[#bec8d1] font-mono mt-1">Block height #184.9M</div>
        </div>
      </div>

      {/* Blob Lookup Tool */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-[#032330] space-y-4">
        <h2 className="text-xl font-bold text-[#cae7f9] flex items-center gap-2">
          <Search className="w-5 h-5 text-[#66F4FF]" />
          <span>Shelby Blob Explorer</span>
        </h2>
        <p className="text-sm text-[#bec8d1]">
          Query any Shelby Blob ID or Aptos Transaction Hash across the network to inspect replication parameters.
        </p>

        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            value={searchHash}
            onChange={(e) => setSearchHash(e.target.value)}
            placeholder="Enter Shelby Blob ID (e.g. 0xshelby_71c89f2a4) or Tx Hash..."
            className="flex-1 bg-[#001620] border border-[#3f484f] rounded-xl px-4 py-3 text-sm text-[#cae7f9] outline-none focus:border-[#66C4FF] font-mono"
          />
          <button
            type="submit"
            className="bg-[#66C4FF] text-[#00344d] hover:bg-[#88ceff] px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md"
          >
            Inspect Blob
          </button>
        </form>

        {searchResult && (
          <div className="mt-4 p-5 rounded-xl bg-[#001620] border border-[#66F4FF]/30 font-mono text-xs space-y-2 text-[#cae7f9]">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-[#bec8d1]">BLOB ID:</span>
              <span className="text-[#66F4FF] font-bold">{searchResult.blobId}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-[#bec8d1]">REPLICATION STATUS:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {searchResult.status}
              </span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-[#bec8d1]">ACTIVE STORAGE NODES:</span>
              <span>{searchResult.nodes} Nodes</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-[#bec8d1]">GEOGRAPHIC REDUNDANCY:</span>
              <span>{searchResult.redundancy}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#bec8d1]">APTOS PROOF:</span>
              <span>{searchResult.createdAt}</span>
            </div>
          </div>
        )}
      </div>

      {/* Storage Node Providers List */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-[#032330] space-y-4">
        <h2 className="text-xl font-bold text-[#cae7f9]">Active Shelby Node Clusters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { region: 'US-East (Virginia)', nodes: 16, uptime: '100%', latency: '22ms' },
            { region: 'EU-Central (Frankfurt)', nodes: 18, uptime: '99.99%', latency: '34ms' },
            { region: 'AP-Southeast (Singapore)', nodes: 14, uptime: '99.96%', latency: '58ms' },
          ].map((cluster, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#001620] border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-[#cae7f9]">{cluster.region}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="text-xs font-mono text-[#bec8d1] space-y-1">
                <div>Cluster Nodes: {cluster.nodes}</div>
                <div>Uptime: {cluster.uptime}</div>
                <div>Avg Ping: {cluster.latency}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
