import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Film, 
  Send, 
  CalendarClock, 
  Bot, 
  BarChart3, 
  FolderLock, 
  Building2 
} from 'lucide-react';

export type ActiveTab = 
  | 'dashboard'
  | 'ai_studio'
  | 'editing_studio'
  | 'composer'
  | 'scheduler'
  | 'automations'
  | 'analytics'
  | 'creator_hub'
  | 'settings';

interface NavigationTabsProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  pendingApprovalsCount?: number;
  activeAutomationsCount?: number;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onTabChange,
  pendingApprovalsCount = 2,
  activeAutomationsCount = 3,
}) => {
  const tabs = [
    {
      id: 'dashboard' as ActiveTab,
      label: 'Cockpit Home',
      icon: LayoutDashboard,
      badge: undefined,
    },
    {
      id: 'ai_studio' as ActiveTab,
      label: 'AI Content Studio',
      icon: Sparkles,
      badge: '9 Tools',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    },
    {
      id: 'editing_studio' as ActiveTab,
      label: 'Video & Asset Editor',
      icon: Film,
      badge: 'Studio',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    },
    {
      id: 'composer' as ActiveTab,
      label: 'Composer & Post Doctor',
      icon: Send,
      badge: 'One-Click',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 'scheduler' as ActiveTab,
      label: 'Scheduler & Heatmap',
      icon: CalendarClock,
      badge: '7x24 Timing',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 'automations' as ActiveTab,
      label: 'Comment-to-DM Hub',
      icon: Bot,
      badge: `${activeAutomationsCount} Live`,
      badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    },
    {
      id: 'analytics' as ActiveTab,
      label: 'Platform Analytics',
      icon: BarChart3,
      badge: '7 Platforms',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    },
    {
      id: 'creator_hub' as ActiveTab,
      label: 'Creator Hub & Vault',
      icon: FolderLock,
      badge: 'Storefront',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    },
    {
      id: 'settings' as ActiveTab,
      label: 'Workspaces & Plans',
      icon: Building2,
      badge: pendingApprovalsCount ? `${pendingApprovalsCount} Approvals` : undefined,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
  ];

  return (
    <nav className="w-full border-b border-white/10 bg-[#0d0f17]/95 px-4 sm:px-6 overflow-x-auto scrollbar-none sticky top-16 z-30">
      <div className="max-w-[1720px] mx-auto flex items-center gap-1 sm:gap-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 relative ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600/30 via-indigo-500/20 to-emerald-500/20 text-white border border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] font-mono font-medium px-1.5 py-0.2 rounded-full border ${tab.badgeColor || 'bg-white/10 text-slate-300'}`}>
                  {tab.badge}
                </span>
              )}
              {isActive && (
                <div className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
