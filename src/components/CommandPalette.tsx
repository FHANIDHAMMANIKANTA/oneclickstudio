import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  Send, 
  Bot, 
  Film, 
  Calendar, 
  BarChart, 
  ShieldCheck, 
  ArrowRight,
  Zap,
  FolderLock
} from 'lucide-react';
import { ActiveTab } from './NavigationTabs';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: ActiveTab) => void;
  onTriggerAction: (actionName: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onTriggerAction,
}) => {
  const [query, setQuery] = useState('');

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'act-script',
      title: 'Generate Viral Reel Script (Hook-Story-CTA)',
      category: 'AI Content Studio',
      icon: Sparkles,
      tab: 'ai_studio' as ActiveTab,
      shortcut: 'S',
    },
    {
      id: 'act-post-doctor',
      title: 'Run "Post Doctor" Virality Health Check',
      category: 'Composer',
      icon: ShieldCheck,
      tab: 'composer' as ActiveTab,
      shortcut: 'P',
    },
    {
      id: 'act-ig-bot',
      title: 'Create Comment-to-DM Keyword Automation',
      category: 'Automation Hub',
      icon: Bot,
      tab: 'automations' as ActiveTab,
      shortcut: 'D',
    },
    {
      id: 'act-best-time',
      title: 'View 7x24 Best Time Heatmap for Instagram',
      category: 'Scheduler',
      icon: Calendar,
      tab: 'scheduler' as ActiveTab,
      shortcut: 'T',
    },
    {
      id: 'act-video-edit',
      title: 'Open Video Editor & Auto-Caption Karaoke',
      category: 'Editing Studio',
      icon: Film,
      tab: 'editing_studio' as ActiveTab,
      shortcut: 'V',
    },
    {
      id: 'act-publish-all',
      title: 'One-Click Publish Master Post to 7 Platforms',
      category: 'Publisher',
      icon: Send,
      tab: 'composer' as ActiveTab,
      shortcut: '↵',
    },
    {
      id: 'act-storefront',
      title: 'Manage Lead Magnet Vault & Storefront Links',
      category: 'Creator Hub',
      icon: FolderLock,
      tab: 'creator_hub' as ActiveTab,
      shortcut: 'H',
    },
    {
      id: 'act-analytics-ig',
      title: 'Inspect Instagram Saves & Lead Conversion Funnel',
      category: 'Analytics',
      icon: BarChart,
      tab: 'analytics' as ActiveTab,
      shortcut: 'A',
    },
  ];

  const filtered = actions.filter((act) =>
    act.title.toLowerCase().includes(query.toLowerCase()) ||
    act.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl rounded-2xl bg-[#141724] border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3 bg-white/[0.02]">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search tools (e.g. 'script', 'DM', 'heatmap', 'doctor')..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <kbd className="font-mono text-[10px] px-2 py-1 rounded bg-white/10 text-slate-400 border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/5">
          {filtered.length > 0 ? (
            filtered.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => {
                    onNavigate(action.tab);
                    onTriggerAction(action.title);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-indigo-600/15 group transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-indigo-500/20 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {action.title}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        {action.category}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5 group-hover:border-indigo-500/30">
                      {action.shortcut}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                  </div>
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">
              No matching commands found for "{query}"
            </div>
          )}
        </div>

        {/* Footer tip */}
        <div className="px-4 py-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Pulse Cockpit Engine
          </span>
          <span>Use ⇅ arrows to navigate</span>
        </div>
      </div>
    </div>
  );
};
