import React from 'react';
import { 
  Code, 
  Share2, 
  Globe, 
  FileText, 
  Terminal, 
  MessageSquare, 
  AtSign,
  Heart
} from 'lucide-react';
import { ViewTab } from '../types';

interface FooterProps {
  onNavigate?: (tab: ViewTab) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="w-full py-8 px-6 mt-auto text-white shadow-inner" style={{ backgroundColor: '#7D99AA' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left: Built by Daniyal */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="font-mono text-xs uppercase tracking-widest text-[#001620] font-bold flex items-center gap-1.5">
            <span>Built by Daniyal</span>
            <Heart className="w-3.5 h-3.5 text-[#FFC067] fill-[#FFC067]" />
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/0xdaniyal4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#001620]/20 hover:bg-[#001620]/40 text-[#66F4FF] transition-all transform hover:scale-110 flex items-center gap-1.5 text-xs font-mono"
              title="Daniyal's GitHub"
            >
              <Code className="w-4 h-4 text-[#66F4FF]" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a 
              href="https://x.com/0xdaniyal4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#001620]/20 hover:bg-[#001620]/40 text-[#66F4FF] transition-all transform hover:scale-110 flex items-center gap-1.5 text-xs font-mono"
              title="Daniyal's X (Twitter)"
            >
              <Share2 className="w-4 h-4 text-[#66F4FF]" />
              <span className="hidden sm:inline">@0xdaniyal4</span>
            </a>
          </div>
        </div>

        {/* Center Copyright Tag */}
        <div className="text-center font-mono text-xs text-[#001620]/90 font-medium">
          © {new Date().getFullYear()} Meadow Protocol. Your career, cryptographically secured.
        </div>

        {/* Right: Built on Shelby Network */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#001620] font-bold">
            Built on Shelby Network
          </span>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <a 
              href="https://shelby.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#001620]/20 hover:bg-[#001620]/40 text-[#66F4FF] transition-all transform hover:scale-110"
              title="Shelby Website"
            >
              <Globe className="w-4 h-4 text-[#66F4FF]" />
            </a>
            <a 
              href="https://docs.shelby.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#001620]/20 hover:bg-[#001620]/40 text-[#66F4FF] transition-all transform hover:scale-110"
              title="Shelby Documentation"
            >
              <FileText className="w-4 h-4 text-[#66F4FF]" />
            </a>
            <a 
              href="https://github.com/shelby" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#001620]/20 hover:bg-[#001620]/40 text-[#66F4FF] transition-all transform hover:scale-110"
              title="Shelby GitHub"
            >
              <Terminal className="w-4 h-4 text-[#66F4FF]" />
            </a>
            <a 
              href="https://discord.gg/shelbyserves" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#001620]/20 hover:bg-[#001620]/40 text-[#66F4FF] transition-all transform hover:scale-110"
              title="Shelby Discord"
            >
              <MessageSquare className="w-4 h-4 text-[#66F4FF]" />
            </a>
            <a 
              href="https://x.com/shelbyserves" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#001620]/20 hover:bg-[#001620]/40 text-[#66F4FF] transition-all transform hover:scale-110"
              title="Shelby X (Twitter)"
            >
              <AtSign className="w-4 h-4 text-[#66F4FF]" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
