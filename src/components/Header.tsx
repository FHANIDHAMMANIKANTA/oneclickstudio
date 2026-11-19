import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  Bell, 
  Plus, 
  ChevronDown, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Layers,
  Radio
} from 'lucide-react';
import { SocialAccount } from '../types';

interface HeaderProps {
  accounts: SocialAccount[];
  creditsRemaining: number;
  maxCredits: number;
  onOpenCommand: () => void;
  onNewPost: () => void;
  onOpenNotifications: () => void;
  notificationCount: number;
  activeWorkspace: string;
  onSelectWorkspace: (workspace: string) => void;
  onToggleAiSidekick: () => void;
  isAiSidekickOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  accounts,
  creditsRemaining,
  maxCredits,
  onOpenCommand,
  onNewPost,
  onOpenNotifications,
  notificationCount,
  activeWorkspace,
  onSelectWorkspace,
  onToggleAiSidekick,
  isAiSidekickOpen,
}) => {
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
  const workspaces = [
    { name: 'Fhanidham Agency', role: 'Owner', accounts: '7 Connected' },
    { name: 'Personal Brand (Growth)', role: 'Admin', accounts: '4 Connected' },
    { name: 'Client: SaaSify Growth', role: 'Approver', accounts: '3 Connected' },
  ];

  const creditPercentage = Math.round((creditsRemaining / maxCredits) * 100);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0c0e15]/90 backdrop-blur-xl">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand & Workspace Switcher */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-[#0d0f17] rounded-[11px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  PULSE STUDIO
                </span>
                <span className="text-[10px] font-mono tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live v1.1
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="truncate max-w-[130px] sm:max-w-none">Creator Cockpit</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 flex items-center gap-1 font-mono text-[11px]">
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" /> API 99.8%
                </span>
              </div>
            </div>
          </div>

          {/* Workspace dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span className="truncate max-w-[140px]">{activeWorkspace}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {workspaceMenuOpen && (
              <div className="absolute left-0 mt-2 w-64 rounded-xl bg-[#141722] border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Workspace
                </div>
                {workspaces.map((ws) => (
                  <button
                    key={ws.name}
                    onClick={() => {
                      onSelectWorkspace(ws.name);
                      setWorkspaceMenuOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      activeWorkspace === ws.name
                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white">{ws.name}</div>
                      <div className="text-[10px] text-slate-400">{ws.role} • {ws.accounts}</div>
                    </div>
                    {activeWorkspace === ws.name && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Command Palette Trigger */}
        <div className="flex-1 max-w-md hidden lg:block mx-4">
          <button
            onClick={onOpenCommand}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-400 text-xs transition-all group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
              <span>Search tools, automations, or press to run AI actions...</span>
            </div>
            <kbd className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300 border border-white/10 group-hover:border-indigo-400/40">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Credits, AI Coach, Notifications & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Account Health Meter */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-medium">Account Health: 99% (Safe)</span>
          </div>

          {/* AI Credits Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-semibold text-slate-200">
                  {creditsRemaining}
                </span>
                <span className="text-[10px] text-slate-400">/ {maxCredits} AI credits</span>
              </div>
              <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden mt-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full" 
                  style={{ width: `${creditPercentage}%` }} 
                />
              </div>
            </div>
          </div>

          {/* AI Content Brain Assistant Toggle */}
          <button
            onClick={onToggleAiSidekick}
            className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
              isAiSidekickOpen
                ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
            }`}
            title="Toggle Content Brain AI Coach"
          >
            <Sparkles className="w-4 h-4 text-indigo-400 animate-spin-slow" />
            <span className="hidden md:inline">Content Brain</span>
          </button>

          {/* Notifications Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center animate-bounce">
                {notificationCount}
              </span>
            )}
          </button>

          {/* Primary Action: New Post */}
          <button
            onClick={onNewPost}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 hover:from-indigo-400 hover:to-emerald-400 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>New Post</span>
          </button>
        </div>
      </div>

      {/* Connected Accounts Live Ticker strip */}
      <div className="w-full bg-black/40 border-t border-white/5 px-4 sm:px-6 py-1.5 flex items-center justify-between text-[11px] overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-4 text-slate-400 shrink-0">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Active Channels (7/7):
          </span>
          {accounts.map((acc) => (
            <div key={acc.id} className="flex items-center gap-1.5 bg-white/[0.03] px-2 py-0.5 rounded border border-white/5">
              <span className="capitalize font-medium text-slate-200">{acc.platform}:</span>
              <span className="text-slate-400 font-mono">{acc.followers}</span>
              <span className="text-emerald-400 text-[10px]">{acc.growth}</span>
            </div>
          ))}
        </div>
        <div className="hidden sm:flex items-center gap-2 text-indigo-400 hover:text-indigo-300 cursor-pointer font-medium text-[11px] shrink-0 ml-4">
          <span>Best Posting Slot Today: Instagram 7:30 PM IST (98% Virality Score)</span>
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </header>
  );
};
