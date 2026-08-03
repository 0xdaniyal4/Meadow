import React, { useState } from 'react';
import { Settings, Shield, Bell, CheckCircle2, Server, User, Save } from 'lucide-react';
import { useAppWallet } from '../context/AptosWalletContext';

export const SettingsPage: React.FC = () => {
  const { walletAddress, shortAddress } = useAppWallet();
  const [displayName, setDisplayName] = useState('Alex Smith');
  const [bio, setBio] = useState('Web3 Fullstack Engineer specializing in Aptos smart contracts.');
  const [defaultVisibility, setDefaultVisibility] = useState<'public' | 'private'>('public');
  const [rpcNode, setRpcNode] = useState('https://fullnode.mainnet.aptoslabs.com/v1');
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMsg('Settings and protocol preferences updated successfully!');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0f2d3b] border border-[#66F4FF] text-[#66F4FF] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 font-mono text-xs animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#66F4FF]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#66F4FF]/30 bg-[#66F4FF]/10 text-[#66F4FF] text-xs font-mono font-semibold mb-3">
          <Settings className="w-3.5 h-3.5 text-[#66F4FF]" />
          USER & PROTOCOL PREFERENCES
        </div>
        <h1 className="text-3xl font-extrabold text-[#cae7f9]">Settings</h1>
        <p className="text-base text-[#bec8d1] mt-1">
          Customize your profile info, default privacy modes, and Shelby RPC connection parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-[#032330] space-y-4">
          <h2 className="text-lg font-bold text-[#cae7f9] flex items-center gap-2">
            <User className="w-5 h-5 text-[#66F4FF]" />
            <span>Profile Identity</span>
          </h2>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-[#bec8d1] uppercase mb-2">
                DISPLAY NAME
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your Display Name"
                className="w-full bg-[#001620] border border-[#3f484f] rounded-xl p-3 text-sm text-[#cae7f9] outline-none focus:border-[#66C4FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-[#bec8d1] uppercase mb-2">
                CONNECTED APTOS ADDRESS
              </label>
              <input
                type="text"
                value={walletAddress || '0x71C...4f2'}
                readOnly
                className="w-full bg-[#001620]/60 border border-white/10 rounded-xl p-3 text-sm text-[#bec8d1] font-mono cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-[#bec8d1] uppercase mb-2">
                PROFESSIONAL BIO / HEADING
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={2}
                className="w-full bg-[#001620] border border-[#3f484f] rounded-xl p-3 text-sm text-[#cae7f9] outline-none focus:border-[#66C4FF]"
              />
            </div>
          </div>
        </div>

        {/* Privacy & Protocol Preferences */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-[#032330] space-y-4">
          <h2 className="text-lg font-bold text-[#cae7f9] flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#66F4FF]" />
            <span>Privacy & Storage Settings</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-semibold text-[#bec8d1] uppercase mb-2">
                DEFAULT RESUME VISIBILITY FOR NEW UPLOADS
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-[#cae7f9]">
                  <input
                    type="radio"
                    name="visibility"
                    checked={defaultVisibility === 'public'}
                    onChange={() => setDefaultVisibility('public')}
                    className="accent-[#66C4FF]"
                  />
                  <span>Public Link Enabled (Default)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-[#cae7f9]">
                  <input
                    type="radio"
                    name="visibility"
                    checked={defaultVisibility === 'private'}
                    onChange={() => setDefaultVisibility('private')}
                    className="accent-[#66C4FF]"
                  />
                  <span>Private (Encrypted Link)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold text-[#bec8d1] uppercase mb-2">
                APTOS RPC NODE ENDPOINT
              </label>
              <select
                value={rpcNode}
                onChange={(e) => setRpcNode(e.target.value)}
                className="w-full bg-[#001620] border border-[#3f484f] rounded-xl p-3 text-sm text-[#cae7f9] outline-none focus:border-[#66C4FF] font-mono"
              >
                <option value="https://fullnode.mainnet.aptoslabs.com/v1">Aptos Official Mainnet RPC</option>
                <option value="https://fullnode.testnet.aptoslabs.com/v1">Aptos Official Testnet RPC</option>
                <option value="https://aptos-mainnet.nodereal.io/v1">NodeReal High-Speed RPC</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-sm font-bold text-[#cae7f9]">Verification Notifications</span>
                <p className="text-xs text-[#bec8d1]">Receive alerts when recruiters or employers inspect your resume proof.</p>
              </div>
              <button
                type="button"
                onClick={() => setEnableNotifications(!enableNotifications)}
                className={`w-11 h-6 rounded-full relative p-1 transition-colors border ${
                  enableNotifications ? 'bg-[#66F4FF]/20 border-[#66F4FF]' : 'bg-[#1c3846] border-white/10'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full transition-transform ${
                    enableNotifications ? 'bg-[#66F4FF] translate-x-5' : 'bg-[#bec8d1] translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#66C4FF] text-[#00344d] hover:bg-[#88ceff] px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-md glow-aqua flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
