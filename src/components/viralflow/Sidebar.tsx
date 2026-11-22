import React, { useState } from 'react';
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
  Film,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen
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
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  onLogout,
  userEmail = 'admin@hivepostly.ai',
  onViewLanding,
  isCollapsed: controlledCollapsed,
  onToggleCollapse,
}) => {
  // Support both controlled and uncontrolled collapsed state
  const [internalCollapsed, setInternalCollapsed] = useState(() => {
    return localStorage.getItem('sidebar_collapsed') === 'true';
  });

  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const handleToggle = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      const next = !internalCollapsed;
      setInternalCollapsed(next);
      localStorage.setItem('sidebar_collapsed', String(next));
    }
  };

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
    <aside
      className={`shrink-0 bg-[#FFFDF8] border-r-2 border-[#0A0A0A] flex flex-col justify-between h-screen sticky top-0 z-30 select-none transition-all duration-200 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Section */}
      <div className={`space-y-4 ${isCollapsed ? 'p-2' : 'p-4'}`}>
        {/* Header: Logo & Close / Open Toggle Button */}
        {isCollapsed ? (
          <div className="flex flex-col items-center space-y-3 pt-1">
            {/* Open Button (Full visible action) */}
            <button
              onClick={handleToggle}
              className="w-full py-2 bg-[#B8FF5C] hover:bg-[#a6f543] border-2 border-[#0A0A0A] shadow-brutal-xs text-[#0A0A0A] flex items-center justify-center gap-1 font-display font-black text-xs transition-all cursor-pointer hover:translate-x-0.5"
              title="Open Sidebar"
            >
              <ChevronRight className="w-4 h-4 stroke-[3]" />
              <span className="text-[10px] font-mono font-black uppercase">Open</span>
            </button>

            {/* Mini Logo Icon */}
            <div 
              onClick={onViewLanding}
              className="w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-105 transition-all p-1"
              title="Hivepostly (Click for Landing Page)"
            >
              <img src="./favicon.svg" alt="Hivepostly" className="w-8 h-8" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 pb-2 border-b-2 border-neutral-100">
            {/* Brand Logo */}
            <div 
              onClick={onViewLanding}
              className="flex items-center gap-2 cursor-pointer group hover:opacity-90 transition-all truncate"
              title="Back to Landing Page"
            >
              <HivepostlyLogo size="md" />
            </div>

            {/* Close Button (Prominent & Clear) */}
            <button
              onClick={handleToggle}
              className="px-2 py-1.5 bg-white hover:bg-[#FF5B37] text-[#0A0A0A] hover:text-white border-2 border-[#0A0A0A] shadow-brutal-xs font-display font-black text-xs flex items-center gap-1 transition-all cursor-pointer shrink-0 hover:translate-x-0.5 hover:translate-y-0.5"
              title="Close Sidebar"
            >
              <ChevronLeft className="w-4 h-4 stroke-[3]" />
              <span className="text-[10px] font-mono uppercase">Close</span>
            </button>
          </div>
        )}

        {/* Navigation list */}
        <nav className="space-y-1.5 pt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            if (isCollapsed) {
              return (
                <div key={item.id} className="relative group flex justify-center">
                  <button
                    onClick={() => onTabChange(item.id)}
                    className={`w-12 h-12 flex items-center justify-center border-2 transition-all relative cursor-pointer ${
                      isActive
                        ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-brutal-xs'
                        : 'bg-transparent border-transparent text-[#0A0A0A] hover:bg-neutral-100 hover:border-[#0A0A0A]'
                    }`}
                    title={item.label}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#FF5B37]' : 'text-[#0A0A0A]'}`} />
                    {item.badge && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#B8FF5C] border border-[#0A0A0A] absolute top-1 right-1" />
                    )}
                  </button>

                  {/* Floating tooltip on hover */}
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#0A0A0A] text-white text-xs font-display font-bold border-2 border-[#0A0A0A] shadow-brutal-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 flex items-center gap-1.5">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-mono text-[#B8FF5C]">● {item.badge}</span>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold tracking-tight border-2 transition-all text-left cursor-pointer ${
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

      {/* Bottom Section */}
      {isCollapsed ? (
        <div className="p-2 border-t-2 border-[#0A0A0A] space-y-2 flex flex-col items-center bg-[#FFFDF8]">
          <button
            onClick={onViewLanding}
            className="w-10 h-10 bg-white hover:bg-neutral-100 text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-brutal-xs flex items-center justify-center transition-all cursor-pointer relative group"
            title="Landing Page"
          >
            <ExternalLink className="w-4 h-4 text-neutral-600" />
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-[#0A0A0A] text-white text-[10px] font-mono opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Landing Page ↗
            </div>
          </button>

          <button
            onClick={onLogout}
            className="w-10 h-10 bg-[#FF5B37] hover:bg-[#ff4921] text-white border-2 border-[#0A0A0A] shadow-brutal-xs flex items-center justify-center transition-all cursor-pointer relative group"
            title="Log out"
          >
            <LogOut className="w-4 h-4 text-white" />
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-[#0A0A0A] text-white text-[10px] font-mono opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Log out
            </div>
          </button>
        </div>
      ) : (
        <div className="p-4 border-t-2 border-[#0A0A0A] space-y-3 bg-[#FFFDF8]">
          <div className="text-[11px] font-medium text-neutral-600 truncate">
            Signed in as · <strong className="text-[#0A0A0A]">{userEmail}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onViewLanding}
              className="flex-1 py-1.5 px-2 bg-white hover:bg-neutral-100 text-[#0A0A0A] border-2 border-[#0A0A0A] text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
              title="Public Homepage"
            >
              <span>Landing</span>
              <ExternalLink className="w-3 h-3 text-neutral-500" />
            </button>

            <button
              onClick={onLogout}
              className="py-1.5 px-3 bg-[#FF5B37] hover:bg-[#ff4921] text-white border-2 border-[#0A0A0A] text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
              title="Log out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
