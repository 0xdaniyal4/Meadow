import React from 'react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 36, showText = true, className = '' }) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div 
        className="relative flex items-center justify-center rounded-xl overflow-hidden shrink-0 transition-transform duration-300 hover:scale-105 shadow-md"
        style={{ width: size, height: size, backgroundColor: '#7D99AA' }}
      >
        <svg 
          viewBox="0 0 512 512" 
          className="w-full h-full p-1.5"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Document/Badge Silhouette */}
          <path 
            d="M156 120h200c11.046 0 20 8.954 20 20v232c0 11.046-8.954 20-20 20H156c-11.046 0-20-8.954-20-20V140c0-11.046 8.954-20 20-20z" 
            fill="#66C4FF" 
            opacity="0.2"
          />
          {/* Stylized Meadow/Field */}
          <path 
            d="M136 340c60-20 120-20 180 0s120 20 160 0v52c-40 20-100 20-160 0s-120-20-180 0v-52z" 
            fill="#66C4FF"
          />
          {/* Growth Accent - Sprout */}
          <path 
            d="M256 360c0-80 20-120 60-140-10 40-10 100 0 140h-60z" 
            fill="#66F4FF"
          />
          {/* Highlight/Sun - Growth symbol */}
          <circle cx="360" cy="180" r="30" fill="#FFC067" />
          {/* Document lines */}
          <rect x="176" y="160" width="100" height="8" rx="4" fill="#66F4FF" opacity="0.8" />
          <rect x="176" y="184" width="60" height="8" rx="4" fill="#66F4FF" opacity="0.5" />
        </svg>
      </div>

      {showText && (
        <span className="font-bold text-2xl tracking-tight text-[#66C4FF] font-sans">
          Meadow
        </span>
      )}
    </div>
  );
};
