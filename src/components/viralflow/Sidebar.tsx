import React from 'react';
import { 
  LayoutDashboard, 
  Send, 
  Sparkles, 
  Calendar, 
  BarChart3, 
  FolderOpen, 
  FileText, 
  Settings, 
  Zap, 
  LogOut,
  ExternalLink,
  Film
} from 'lucide-react';
import { HivepostlyLogo } from './HivepostlyLogo';

export type ViralFlowTab = 
  | 'dashboard'
  | 'composer'
  | 'video_editor'
  | 'ai_studio'
  | 'scheduler'
  | 'analytics'
  | 'media'
  | 'settings';

interface SidebarProps {
  activeTab: ViralFlowTab;
  onTabChange: (tab: ViralFlowTab) => void;
  onLogout: () => void;
  userEmail?: string;
  onViewLanding: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  onLogout,
  userEmail = 'admin@hivepostly.ai',
  onViewLanding,
}) => {
  const navItems = [
    { id: 'dashboard' as ViralFlowTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'composer' as ViralFlowTab, label: 'Composer', icon: Send },
    { id: 'video_editor' as ViralFlowTab, label: 'Video Editor', icon: Film, badge: 'Hivepostly Studio' },
    { id: 'ai_studio' as ViralFlowTab, label: 'AI Studio', icon: Sparkles },
    { id: 'scheduler' as ViralFlowTab, label: 'Scheduler', icon: Calendar },
    { id: 'analytics' as ViralFlowTab, label: 'Analytics', icon: BarChart3 },
    { id: 'media' as ViralFlowTab, label: 'Media', icon: FolderOpen },
    { id: 'settings' as ViralFlowTab, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 shrink-0 bg-[#FFFDF8] border-r-2 border-[#0A0A0A] flex flex-col justify-between h-screen sticky top-0 z-30 select-none">
      {/* Top: Logo & Nav items */}
      <div className="p-4 space-y-5">
        {/* Brand Header */}
        <div 
          onClick={onViewLanding}
          className="flex items-center gap-2.5 p-2 cursor-pointer group hover:bg-[#0A0A0A]/5 border border-transparent hover:border-[#0A0A0A] transition-all"
          title="Back to Landing Page"
        >
          <HivepostlyLogo size="md" />
        </div>

        {/* Navigation list */}
        <nav className="space-y-1 pt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold tracking-tight border-2 transition-all text-left ${
                  isActive
                    ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-brutal-sm'
                    : 'bg-transparent border-transparent text-[#0A0A0A] hover:bg-neutral-100 hover:border-[#0A0A0A]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF5B37]' : 'text-[#0A0A0A]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-1.5 py-0.2 text-[9px] font-mono font-black uppercase border ${
                    isActive 
                      ? 'bg-[#B8FF5C] text-[#0A0A0A] border-white' 
                      : 'bg-neutral-100 text-[#0A0A0A] border-[#0A0A0A]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom: User Profile & Landing link */}
      <div className="p-4 border-t-2 border-[#0A0A0A] space-y-3 bg-[#FFFDF8]">
        <div className="text-[11px] font-medium text-neutral-600 truncate">
          Signed in as · <strong className="text-[#0A0A0A]">{userEmail}</strong>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onViewLanding}
            className="flex-1 py-1.5 px-2 bg-white hover:bg-neutral-100 text-[#0A0A0A] border-2 border-[#0A0A0A] text-[11px] font-bold flex items-center justify-center gap-1 transition-all"
            title="Public Homepage"
          >
            <span>Landing</span>
            <ExternalLink className="w-3 h-3 text-neutral-500" />
          </button>

          <button
            onClick={onLogout}
            className="py-1.5 px-3 bg-[#FF5B37] hover:bg-[#ff4921] text-white border-2 border-[#0A0A0A] text-[11px] font-bold flex items-center justify-center gap-1 transition-all"
            title="Log out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
