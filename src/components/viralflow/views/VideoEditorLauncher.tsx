import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ExternalLink, Play, Film, Sparkles } from 'lucide-react';
import { getEditorUrl } from '../../../utils/editorUrl';

interface VideoEditorLauncherProps {
  onOpenComposer?: () => void;
  recentMedia?: { url: string; type: 'video' | 'image'; name: string } | null;
}

export const VideoEditorLauncher: React.FC<VideoEditorLauncherProps> = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleOpenEditor = () => {
    // Satisfying celebratory burst
    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.52 },
        colors: ['#B8FF5C', '#FF5B37', '#0A0A0A', '#3B82F6', '#FFE600'],
      });
    } catch {
      // safe fallback
    }

    // Open standalone editor in a separate browser tab (bulletproof across localhost and GitHub Pages subpaths)
    const editorUrl = getEditorUrl();
    const editorWin = window.open(editorUrl, '_blank');
    if (editorWin) {
      editorWin.focus();
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-140px)] min-h-[500px] flex flex-col items-center justify-center select-none overflow-hidden bg-[#FFFDF8]">
      {/* Custom Styles for Unique Button Animation */}
      <style>{`
        @keyframes floatButton {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        @keyframes laserSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes lightShimmer {
          0% { transform: translateX(-160%) skewX(-20deg); opacity: 0; }
          25% { opacity: 0.75; }
          65% { opacity: 0.75; }
          100% { transform: translateX(260%) skewX(-20deg); opacity: 0; }
        }

        @keyframes radarRipple1 {
          0% { transform: scale(0.92); opacity: 0.7; }
          60% { transform: scale(1.18); opacity: 0.25; }
          100% { transform: scale(1.38); opacity: 0; }
        }

        @keyframes radarRipple2 {
          0% { transform: scale(0.92); opacity: 0.6; }
          60% { transform: scale(1.32); opacity: 0.18; }
          100% { transform: scale(1.58); opacity: 0; }
        }

        @keyframes eqWave {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }

        .animate-float-btn {
          animation: floatButton 3.6s ease-in-out infinite;
        }

        .animate-laser-spin {
          animation: laserSpin 3.5s linear infinite;
        }

        .animate-shimmer-sweep {
          animation: lightShimmer 2.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .animate-radar-1 {
          animation: radarRipple1 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }

        .animate-radar-2 {
          animation: radarRipple2 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite 0.7s;
        }
      `}</style>

      {/* Subtle Minimalist Background Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#0A0A0A 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* CENTERPIECE: Unique Animated Open Editor Button */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* Radar Pulse Wave 1 */}
        <div 
          className="absolute w-[360px] h-[130px] rounded-2xl bg-[#B8FF5C]/35 border-2 border-[#B8FF5C] pointer-events-none animate-radar-1"
        />

        {/* Radar Pulse Wave 2 */}
        <div 
          className="absolute w-[380px] h-[140px] rounded-2xl bg-[#FF5B37]/20 border-2 border-[#FF5B37] pointer-events-none animate-radar-2"
        />

        {/* Ambient Glow Aura */}
        <div 
          className={`absolute -inset-4 rounded-3xl blur-2xl transition-opacity duration-500 pointer-events-none ${
            isHovered 
              ? 'opacity-60 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500' 
              : 'opacity-25 bg-gradient-to-r from-blue-400 to-indigo-500'
          }`}
        />

        {/* Floating Button Container with Kinetic Border */}
        <div className="animate-float-btn relative p-[2px] rounded-2xl overflow-hidden group">
          
          {/* Animated 360° Laser Conic Border */}
          <div className="absolute inset-[-150%] animate-laser-spin bg-[conic-gradient(from_0deg,#2563EB_0%,#6366F1_30%,#EC4899_55%,#06B6D4_80%,#2563EB_100%)] pointer-events-none" />

          {/* Main Action Button */}
          <button
            id="btn-open-editor"
            onClick={handleOpenEditor}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            className={`
              relative z-10 flex items-center gap-5 px-10 py-6 sm:px-14 sm:py-7
              bg-white hover:bg-slate-50
              border border-slate-200 rounded-2xl
              cursor-pointer select-none
              transition-all duration-200 ease-out
              ${isPressed 
                ? 'scale-[0.98] shadow-sm' 
                : isHovered 
                  ? '-translate-y-1 shadow-xl border-blue-300' 
                  : 'shadow-lg'
              }
            `}
            title="Open Hiveposters Video & Poster Editor in a new tab"
          >
            {/* Shimmer Light Reflection Sweep */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
              <div 
                className="w-24 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent animate-shimmer-sweep"
              />
            </div>

            {/* Unique Animated Studio Icon */}
            <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl shadow-md overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-200">
              {/* Rotating film reel / Play icon */}
              <Play 
                className={`w-7 h-7 sm:w-8 sm:h-8 fill-current transition-transform duration-300 ${
                  isHovered ? 'scale-115 rotate-90' : 'scale-100 rotate-0'
                }`} 
              />
              
              {/* Corner Sparkle */}
              <Sparkles className="absolute top-1 right-1 w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            </div>

            {/* Typography */}
            <div className="text-left space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-slate-900 font-display">
                  Open Editor
                </span>
                
                {/* External Link Arrow */}
                <ExternalLink 
                  className={`w-6 h-6 sm:w-7 sm:h-7 text-blue-600 transition-transform duration-200 ${
                    isHovered ? 'translate-x-1 -translate-y-1 scale-110' : ''
                  }`} 
                />
              </div>

              {/* Animated Studio Status Bar */}
              <div className="flex items-center gap-2.5 pt-0.5">
                {/* Animated Equalizer Waves */}
                <div className="flex items-end gap-1 h-3.5">
                  <div className="w-1 bg-blue-600 rounded-full" style={{ animation: 'eqWave 0.8s ease-in-out infinite' }} />
                  <div className="w-1 bg-indigo-500 rounded-full" style={{ animation: 'eqWave 0.8s ease-in-out infinite 0.2s' }} />
                  <div className="w-1 bg-violet-500 rounded-full" style={{ animation: 'eqWave 0.8s ease-in-out infinite 0.4s' }} />
                  <div className="w-1 bg-cyan-500 rounded-full" style={{ animation: 'eqWave 0.8s ease-in-out infinite 0.1s' }} />
                </div>

                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Hiveposters Studio · Opens in New Tab
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Subtle Minimalist Direct Post Info Pill */}
        <div className="mt-8 flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full shadow-xs text-xs font-medium text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Direct Post Connected · Exports auto-sync to Composer</span>
        </div>
      </div>
    </div>
  );
};
