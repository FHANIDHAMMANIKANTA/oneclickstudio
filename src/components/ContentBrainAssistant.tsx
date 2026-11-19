import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  ChevronRight, 
  TrendingUp, 
  Lightbulb, 
  Flame, 
  Send, 
  Check, 
  HelpCircle,
  BrainCircuit,
  MessageSquareQuote
} from 'lucide-react';
import { ActiveTab } from './NavigationTabs';

interface ContentBrainAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: ActiveTab;
  onApplySuggestion: (suggestion: string) => void;
}

export const ContentBrainAssistant: React.FC<ContentBrainAssistantProps> = ({
  isOpen,
  onClose,
  currentTab,
  onApplySuggestion,
}) => {
  const [userPrompt, setUserPrompt] = useState('');
  const [appliedIndex, setAppliedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  // Contextual tips tailored to what the creator is currently looking at
  const getInsightsForTab = () => {
    switch (currentTab) {
      case 'composer':
        return [
          {
            title: 'Hook Formula Recommendation',
            text: 'Your Instagram saves are 3.2x higher on posts starting with a contrarian question (e.g. "Why are 90% of devs still using...").',
            actionText: 'Use Question Hook',
            value: 'Why are 90% of creators still losing 70% of viewers in the first 3 seconds?',
          },
          {
            title: 'Post Doctor Alert',
            text: 'Adding a 2-word uppercase CTA ("Comment PDF") increases DM automation trigger rate from 4.1% to 22.8%.',
            actionText: 'Insert CTA',
            value: 'Comment "PDF" and my bot will DM you the exact master file right now 👇',
          },
        ];
      case 'ai_studio':
        return [
          {
            title: 'Audience Language Preference',
            text: 'Your tech reels tested in Hinglish achieved +44% retention in Bangalore & Hyderabad tech clusters. Try toggling Hinglish mode.',
            actionText: 'Switch to Hinglish',
            value: 'Switch language to Hinglish mode',
          },
          {
            title: 'Optimal Script Length',
            text: 'Your 30-second scripts generate 2.1x more re-shares than 60-second long forms on TikTok & Instagram.',
            actionText: 'Set 30s Duration',
            value: 'Set target duration to 30s',
          },
        ];
      case 'automations':
        return [
          {
            title: 'Keyword Performance Data',
            text: 'Across 1,284 triggers, the keyword "PDF" outperformed "GUIDE" by 38% in comment conversion rate.',
            actionText: 'Use "PDF" Trigger',
            value: 'PDF',
          },
          {
            title: 'Health Score Protection',
            text: 'Meta Graph API rate limit is safe (42/50 msg/hr). Randomizing delay between 5s to 9s protects against shadowbans.',
            actionText: 'Set 5-9s Delay',
            value: '5',
          },
        ];
      case 'scheduler':
        return [
          {
            title: 'Golden Window Today',
            text: '184.2K followers active spike predicted between 7:15 PM and 8:30 PM IST. Scheduling node currently queued at 7:30 PM.',
            actionText: 'Lock 7:30 PM Slot',
            value: '7:30 PM',
          },
        ];
      default:
        return [
          {
            title: 'Weekly Performance Diagnosis',
            text: 'Carousels on Wednesday + Reels on Monday & Friday generated 84% of your total new follower growth this month.',
            actionText: 'View Pattern',
            value: 'Open Analytics',
          },
          {
            title: 'Revenue Attribution Highlight',
            text: 'Your "AI Growth Blueprint 2026 PDF" automation has converted 198 leads into ₹2,96,800 in digital store sales.',
            actionText: 'View Funnel',
            value: 'Open Creator Hub',
          },
        ];
    }
  };

  const insights = getInsightsForTab();

  const handleApply = (value: string, idx: number) => {
    onApplySuggestion(value);
    setAppliedIndex(idx);
    setTimeout(() => setAppliedIndex(null), 2500);
  };

  return (
    <aside className="fixed right-4 bottom-4 top-20 w-88 sm:w-96 rounded-2xl bg-[#121522]/95 border border-indigo-500/30 shadow-2xl backdrop-blur-xl flex flex-col z-40 animate-in slide-in-from-right duration-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-transparent">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-[1px]">
            <div className="w-full h-full bg-[#0e101a] rounded-[11px] flex items-center justify-center">
              <BrainCircuit className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Content Brain</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[10px] text-slate-400">Account Learning Engine v1.1</div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Model Context Card */}
      <div className="p-3.5 bg-indigo-500/10 border-b border-indigo-500/20 text-xs text-indigo-300 flex items-center gap-2.5">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
        <p className="text-[11px] leading-relaxed">
          Trained on <span className="font-semibold text-white">418 past posts</span> and <span className="font-semibold text-white">840K engagements</span> from your connected channels.
        </p>
      </div>

      {/* Insights Content List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>Real-Time Advice for Current Screen</span>
        </div>

        {insights.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-all group"
          >
            <div className="flex items-center justify-between text-xs font-bold text-white mb-1.5">
              <span className="flex items-center gap-1.5 text-slate-200">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                {item.title}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              {item.text}
            </p>
            <button
              onClick={() => handleApply(item.value, idx)}
              className={`w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                appliedIndex === idx
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/30'
              }`}
            >
              {appliedIndex === idx ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Applied to Editor!</span>
                </>
              ) : (
                <>
                  <span>{item.actionText}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        ))}

        {/* Audience Sentiment Radar preview */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-semibold flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              Audience Appetite Today
            </span>
            <span className="text-emerald-400 font-mono text-[11px]">High Demand</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Top requested topics in your Instagram comments:
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-slate-300 border border-white/5">
              # AI Video Workflows (82 mentions)
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-slate-300 border border-white/5">
              # Comment DM Setup (64 mentions)
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-slate-300 border border-white/5">
              # Pricing in INR (41 mentions)
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Ask Box */}
      <div className="p-3 border-t border-white/10 bg-black/40">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!userPrompt.trim()) return;
            onApplySuggestion(userPrompt);
            setUserPrompt('');
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Ask Content Brain (e.g. 'Give me 3 hook ideas')..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </aside>
  );
};
