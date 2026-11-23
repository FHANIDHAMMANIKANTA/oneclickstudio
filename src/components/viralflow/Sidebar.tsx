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
  userEmail = 'admin@hiveposters.ai',
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
    { id: 'video_editor' as ViralFlowTab, label: 'Video Editor', icon: Film, badge: 'Hiveposters Studio' },
    { id: 'ai_studio' as ViralFlowTab, label: 'AI Studio', icon: Sparkles },
    { id: 'scheduler' as ViralFlowTab, label: 'Scheduler', icon: Calendar },
    { id: 'analytics' as ViralFlowTab, label: 'Analytics', icon: BarChart3 },
    { id: 'media' as ViralFlowTab, label: 'Media', icon: FolderOpen },
    { id: 'settings' as ViralFlowTab, label: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`shrink-0 bg-white border-r border-slate-200 flex flex-col justify-between h-screen sticky top-0 z-30 select-none transition-all duration-200 shadow-sm ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Section */}
      <div className={`space-y-4 ${isCollapsed ? 'p-2' : 'p-4'}`}>
        {/* Header: Logo & Close / Open Toggle Button */}
        {isCollapsed ? (
          <div className="flex flex-col items-center space-y-3 pt-1">
            {/* Open Button */}
            <button
              onClick={handleToggle}
              className="w-full py-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 rounded-lg flex items-center justify-center gap-1 font-semibold text-xs transition-all cursor-pointer shadow-sm"
              title="Open Sidebar"
            >
              <ChevronRight className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase font-bold">Open</span>
            </button>

            {/* Mini Logo Icon */}
            <div 
              onClick={onViewLanding}
              className="w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-105 transition-all p-1"
              title="Hiveposters (Click for Landing Page)"
            >
              <img src="./favicon.svg" alt="Hiveposters" className="w-8 h-8" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
            {/* Brand Logo */}
            <div 
              onClick={onViewLanding}
              className="flex items-center gap-2 cursor-pointer group hover:opacity-90 transition-all truncate"
              title="Back to Landing Page"
            >
              <HivepostlyLogo size="md" />
            </div>

            {/* Close Button */}
            <button
              onClick={handleToggle}
              className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg text-xs font-medium flex items-center gap-1 transition-all cursor-pointer shrink-0 shadow-xs"
              title="Close Sidebar"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono uppercase">Close</span>
            </button>
          </div>
        )}

        {/* Navigation list */}
        <nav className="space-y-1 pt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            if (isCollapsed) {
              return (
                <div key={item.id} className="relative group flex justify-center">
                  <button
                    onClick={() => onTabChange(item.id)}
                    className={`w-11 h-11 flex items-center justify-center rounded-lg transition-all relative cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                    title={item.label}
                  >
                    <Icon className="w-5 h-5" />
                    {item.badge && (
                      <span className="w-2 h-2 rounded-full bg-blue-400 absolute top-1.5 right-1.5" />
                    )}
                  </button>

                  {/* Floating tooltip on hover */}
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 flex items-center gap-1.5">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-mono text-blue-300">● {item.badge}</span>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-lg transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                    isActive 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-slate-100 text-slate-600'
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
        <div className="p-2 border-t border-slate-200 space-y-2 flex flex-col items-center bg-white">
          <button
            onClick={onViewLanding}
            className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg flex items-center justify-center transition-all cursor-pointer relative group shadow-xs"
            title="Landing Page"
          >
            <ExternalLink className="w-4 h-4 text-slate-500" />
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-900 text-white text-[10px] font-mono rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Landing Page ↗
            </div>
          </button>

          <button
            onClick={onLogout}
            className="w-10 h-10 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg flex items-center justify-center transition-all cursor-pointer relative group shadow-xs"
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-900 text-white text-[10px] font-mono rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Log out
            </div>
          </button>
        </div>
      ) : (
        <div className="p-4 border-t border-slate-200 space-y-3 bg-white">
          <div className="text-[11px] font-medium text-slate-500 truncate">
            Signed in as · <strong className="text-slate-800">{userEmail}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onViewLanding}
              className="flex-1 py-1.5 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
              title="Public Homepage"
            >
              <span>Landing</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              onClick={onLogout}
              className="py-1.5 px-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
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
