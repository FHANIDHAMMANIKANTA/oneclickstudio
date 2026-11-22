import React from 'react';
import { 
  Plus, 
  Sparkles, 
  Radio, 
  Search, 
  Zap,
  Globe
} from 'lucide-react';

interface TopHeaderProps {
  title: string;
  onNewPost: () => void;
  onOpenAI?: () => void;
  creditsRemaining?: number;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  title,
  onNewPost,
  onOpenAI,
  creditsRemaining = 245,
}) => {
  return (
    <header className="sticky top-0 z-20 w-full bg-[#FFFDF8] border-b-2 border-[#0A0A0A] px-6 py-4 flex items-center justify-between gap-4">
      {/* Page Title */}
      <div className="flex items-center gap-3">
        <h1 className="font-display text-2xl font-black tracking-tight text-[#0A0A0A] uppercase">
          {title}
        </h1>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#B8FF5C] border-2 border-[#0A0A0A] text-[10px] font-black tracking-widest uppercase">
          <span className="w-1.5 h-1.5 bg-[#0A0A0A] rounded-full animate-ping" />
          8 Networks Live
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Credits Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-[#0A0A0A] text-xs font-bold font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#FF5B37]" />
          <span>{creditsRemaining} / 300 Credits</span>
        </div>

        {/* Primary New Post Flame Button */}
        <button
          onClick={onNewPost}
          className="px-4 py-2 bg-[#FF5B37] hover:bg-[#ff4921] text-white font-display font-bold text-xs tracking-tight border-2 border-[#0A0A0A] shadow-brutal flex items-center gap-1.5 transition-all hover:translate-x-0.5 hover:translate-y-0.5"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>New Post</span>
        </button>
      </div>
    </header>
  );
};
