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
    <header className="sticky top-0 z-20 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-3.5 flex items-center justify-between gap-4 shadow-xs">
      {/* Page Title */}
      <div className="flex items-center gap-3">
        <h1 className="font-display text-xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-[11px] font-semibold tracking-wide">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
          8 Networks Live
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Credits Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-full text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>{creditsRemaining} / 300 Credits</span>
        </div>

        {/* Primary New Post Royal Blue Button */}
        <button
          onClick={onNewPost}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>New Post</span>
        </button>
      </div>
    </header>
  );
};
