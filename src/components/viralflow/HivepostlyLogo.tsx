import React from 'react';

interface HivepostlyLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  theme?: 'dark' | 'light';
  className?: string;
  onClick?: () => void;
}

/**
 * Native Vector Mascot matching Image 3:
 * - Rounded gradient hexagon (cyan -> indigo -> magenta)
 * - Robot head with smiling eyes and glowing antennae
 * - Flying paper airplane and chevron speed marks
 * - Orbiting ring with 6 social icons: YouTube, Instagram, LinkedIn, TikTok, Facebook, X
 */
export const HivepostlyMascot: React.FC<{ size?: number; className?: string }> = ({ 
  size = 40,
  className = '' 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-md select-none ${className}`}
      aria-label="Hivepostly Mascot"
    >
      <defs>
        {/* Hexagon Body 3D Gradient */}
        <linearGradient id="hpHexGrad" x1="20" y1="20" x2="100" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00B2FE" />
          <stop offset="35%" stopColor="#2563EB" />
          <stop offset="70%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>

        {/* Outer Orbit Ring Glow */}
        <linearGradient id="hpOrbitGrad" x1="10" y1="45" x2="110" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.9" />
        </linearGradient>

        {/* Robot Visor Screen Gradient */}
        <linearGradient id="hpScreenGrad" x1="42" y1="36" x2="78" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>

        {/* Instagram Icon Gradient */}
        <linearGradient id="hpIgGrad" x1="90" y1="22" x2="106" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="40%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>

        {/* Soft Drop Shadow Filter */}
        <filter id="hpGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#7C3AED" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Orbit Ring (Back Arc) */}
      <ellipse
        cx="60"
        cy="62"
        rx="48"
        ry="24"
        transform="rotate(-20 60 62)"
        stroke="url(#hpOrbitGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="95 180"
        className="opacity-90"
      />

      {/* Main Hexagonal Shield Base */}
      <g filter="url(#hpGlow)">
        {/* Hexagon Path */}
        <path
          d="M60 18
             L92 36
             Q96 38 96 43
             L96 77
             Q96 82 92 84
             L60 102
             Q57 103 54 102
             L28 84
             Q24 82 24 77
             L24 43
             Q24 38 28 36
             L54 18
             Q57 17 60 18 Z"
          fill="url(#hpHexGrad)"
          stroke="#FFFFFF"
          strokeWidth="2.5"
        />

        {/* Subtle Highlight Border along top facet */}
        <path
          d="M32 38 L57 23 Q60 21 63 23 L88 38"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />
      </g>

      {/* Antenna & Radiating Sparks */}
      <g>
        {/* Small center antenna */}
        <line x1="60" y1="27" x2="60" y2="20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="60" cy="18" r="2.5" fill="#FACC15" stroke="#FFFFFF" strokeWidth="1" />
        
        {/* Energy spark rays */}
        <line x1="69" y1="18" x2="74" y2="14" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
        <line x1="74" y1="24" x2="80" y2="22" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
        <line x1="66" y1="12" x2="68" y2="7" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Friendly Robot Head (Visor & Smiling Eyes) */}
      <g>
        {/* Robot outer face pill */}
        <rect
          x="39"
          y="31"
          width="42"
          height="30"
          rx="12"
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="1.5"
        />

        {/* Ear nubs */}
        <rect x="35.5" y="38" width="4" height="14" rx="2" fill="#E2E8F0" />
        <rect x="80.5" y="38" width="4" height="14" rx="2" fill="#E2E8F0" />

        {/* Dark Visor Screen */}
        <rect
          x="43"
          y="35"
          width="34"
          height="22"
          rx="8"
          fill="url(#hpScreenGrad)"
        />

        {/* Happy Smiling Eyes (^   ^) in bright cyan */}
        <path
          d="M48 48 Q52 41 56 48"
          stroke="#38BDF8"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M64 48 Q68 41 72 48"
          stroke="#38BDF8"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Orbit Ring (Front Sweeping Arc) */}
      <ellipse
        cx="60"
        cy="62"
        rx="48"
        ry="24"
        transform="rotate(-20 60 62)"
        stroke="url(#hpOrbitGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="160 120"
        strokeDashoffset="-90"
      />

      {/* Origami Paper Airplane inside bottom half */}
      <g transform="translate(68, 67) rotate(-15) scale(0.9)">
        <polygon
          points="0,-16 16,10 0,6"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="0.8"
        />
        <polygon
          points="0,-16 0,6 -12,9"
          fill="#F1F5F9"
          stroke="#CBD5E1"
          strokeWidth="0.8"
        />
        <polygon
          points="0,-16 3,6 0,6"
          fill="#94A3B8"
        />
      </g>

      {/* Double Chevrons (>> Down/Forward Flight Markings) */}
      <g stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M47 77 L57 84 L67 77" />
        <path d="M47 84 L57 91 L67 84" />
      </g>

      {/* 6 Orbiting Social Media Badges */}
      {/* 1. YouTube (Top) */}
      <g transform="translate(52, 2)">
        <rect x="0" y="0" width="16" height="14" rx="4" fill="#FF0000" stroke="#FFFFFF" strokeWidth="1.2" />
        <polygon points="6,3.5 12,7 6,10.5" fill="#FFFFFF" />
      </g>

      {/* 2. Instagram (Top Right) */}
      <g transform="translate(90, 20)">
        <rect x="0" y="0" width="15" height="15" rx="4.5" fill="url(#hpIgGrad)" stroke="#FFFFFF" strokeWidth="1.2" />
        <rect x="3.5" y="3.5" width="8" height="8" rx="2.5" stroke="#FFFFFF" strokeWidth="1.1" fill="none" />
        <circle cx="7.5" cy="7.5" r="2" stroke="#FFFFFF" strokeWidth="1" fill="none" />
        <circle cx="10" cy="5" r="0.6" fill="#FFFFFF" />
      </g>

      {/* 3. LinkedIn (Right) */}
      <g transform="translate(100, 52)">
        <rect x="0" y="0" width="15" height="15" rx="3.5" fill="#0A66C2" stroke="#FFFFFF" strokeWidth="1.2" />
        <text x="3.5" y="11" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="sans-serif">in</text>
      </g>

      {/* 4. TikTok (Bottom Left) */}
      <g transform="translate(5, 74)">
        <rect x="0" y="0" width="15" height="15" rx="3.5" fill="#010101" stroke="#FFFFFF" strokeWidth="1.2" />
        <path
          d="M9 4 C9.5 5 10.5 5.5 12 5.5 L12 7 C11 7 10 6.5 9.5 6 L9.5 10 C9.5 11.5 8.2 12.5 6.8 12 C5.8 11.6 5.2 10.6 5.5 9.6 C5.8 8.6 7 8 8 8.2 L8 9.8 C7.5 9.7 7 10 6.9 10.5 C6.8 10.9 7.1 11.3 7.6 11.3 C8.2 11.3 8.6 10.8 8.6 10.2 L8.6 4 Z"
          fill="#00F2FE"
        />
        <path
          d="M8.5 4 C9 5 10 5.5 11.5 5.5 L11.5 6.8 C10.5 6.8 9.5 6.3 9 5.8 L9 9.8 C9 11.3 7.8 12.3 6.4 11.8 C5.4 11.4 4.8 10.4 5.1 9.4 C5.4 8.4 6.5 7.8 7.5 8 L7.5 9.5 C7.1 9.4 6.7 9.7 6.6 10.1 C6.5 10.5 6.8 10.9 7.3 10.9 C7.8 10.9 8.2 10.5 8.2 10 L8.2 4 Z"
          fill="#FE2C55"
        />
      </g>

      {/* 5. Facebook (Left) */}
      <g transform="translate(4, 42)">
        <rect x="0" y="0" width="15" height="15" rx="4" fill="#1877F2" stroke="#FFFFFF" strokeWidth="1.2" />
        <path
          d="M9.5 14 L9.5 9.2 L11 9.2 L11.3 7.4 L9.5 7.4 L9.5 6.3 C9.5 5.8 9.7 5.4 10.5 5.4 L11.4 5.4 L11.4 3.8 C11 3.7 10.4 3.7 9.8 3.7 C8.2 3.7 7.2 4.7 7.2 6.5 L7.2 7.4 L5.6 7.4 L5.6 9.2 L7.2 9.2 L7.2 14 Z"
          fill="#FFFFFF"
        />
      </g>

      {/* 6. X / Twitter (Top Left) */}
      <g transform="translate(18, 14)">
        <rect x="0" y="0" width="15" height="15" rx="3.5" fill="#0A0A0A" stroke="#FFFFFF" strokeWidth="1.2" />
        <path
          d="M4 3.5 L7.2 7.8 L4 11.5 L5 11.5 L7.7 8.4 L9.8 11.5 L12 11.5 L8.6 6.9 L11.6 3.5 L10.6 3.5 L8.1 6.3 L6.2 3.5 Z M5.2 4.3 L6.3 4.3 L10.8 10.7 L9.7 10.7 Z"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  );
};

/**
 * Full Brand Logo:
 * - Includes Mascot
 * - Includes stylized "Hivepostly" typography with gradient and dual sparkle stars
 * - Includes cyan-to-magenta dynamic underline swoosh
 */
export const HivepostlyLogo: React.FC<HivepostlyLogoProps> = ({
  size = 'md',
  showWordmark = true,
  theme = 'light',
  className = '',
  onClick,
}) => {
  const sizeConfig = {
    sm: { iconSize: 28, textSize: 'text-lg', dot: 'w-1.5 h-1.5', swooshH: 'h-1' },
    md: { iconSize: 36, textSize: 'text-2xl', dot: 'w-2 h-2', swooshH: 'h-1.5' },
    lg: { iconSize: 46, textSize: 'text-3xl', dot: 'w-2.5 h-2.5', swooshH: 'h-2' },
    xl: { iconSize: 58, textSize: 'text-4xl', dot: 'w-3 h-3', swooshH: 'h-2.5' },
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* 3D Mascot Icon */}
      <div className="relative flex items-center justify-center">
        <HivepostlyMascot size={sizeConfig.iconSize} />
      </div>

      {/* Styled Hivepostly Wordmark */}
      {showWordmark && (
        <div className="flex flex-col relative leading-none">
          {/* Sparkles above the H */}
          <div className="absolute -top-2.5 left-0 flex items-center gap-0.5 pointer-events-none">
            <span className="text-[#8B5CF6] text-[10px] leading-none animate-pulse">✦</span>
            <span className="text-[#00B2FE] text-[8px] leading-none -mt-1">✦</span>
          </div>

          {/* Typography */}
          <div className="flex items-baseline tracking-tight font-display font-black">
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r ${
                theme === 'light'
                  ? 'from-[#0A0A0A] via-[#312E81] via-[#7C3AED] to-[#EC4899]'
                  : 'from-[#FFFFFF] via-[#818CF8] via-[#C084FC] to-[#F472B6]'
              } ${sizeConfig.textSize}`}
              style={{
                fontFamily: 'Cabinet Grotesk, Space Grotesk, Plus Jakarta Sans, sans-serif',
                letterSpacing: '-0.03em',
              }}
            >
              Hivepostly
            </span>
            <span className="text-[#EC4899] font-black text-xl leading-none">.</span>
          </div>

          {/* Dynamic Underline Swoosh from cyan to magenta */}
          <div
            className={`w-full mt-0.5 rounded-full bg-gradient-to-r from-[#00E5FF] via-[#7C3AED] to-[#EC4899] ${sizeConfig.swooshH}`}
            style={{
              clipPath: 'polygon(0% 0%, 100% 20%, 95% 100%, 5% 80%)',
            }}
          />
        </div>
      )}
    </div>
  );
};
