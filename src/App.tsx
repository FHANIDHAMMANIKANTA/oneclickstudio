import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/viralflow/LandingPage';
import { Sidebar, ViralFlowTab } from './components/viralflow/Sidebar';
import { TopHeader } from './components/viralflow/TopHeader';
import { AuthModal } from './components/viralflow/AuthModal';

// Views
import { DashboardView } from './components/viralflow/views/DashboardView';
import { ComposerView } from './components/viralflow/views/ComposerView';
import { VideoEditorLauncher } from './components/viralflow/views/VideoEditorLauncher';
import { AIStudioView } from './components/viralflow/views/AIStudioView';
import { SchedulerView } from './components/viralflow/views/SchedulerView';
import { AnalyticsView } from './components/viralflow/views/AnalyticsView';
import { MediaView } from './components/viralflow/views/MediaView';
import { SettingsView } from './components/viralflow/views/SettingsView';
import { getPendingPost } from './utils/composerStorage';

export function App() {
  // View mode: 'landing' for the public marketing site, 'app' for the creator dashboard
  const [viewMode, setViewMode] = useState<'app' | 'landing'>('app');
  const [activeTab, setActiveTab] = useState<ViralFlowTab>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam && ['composer', 'video_editor', 'dashboard', 'ai_studio', 'scheduler', 'analytics', 'media', 'settings'].includes(tabParam)) {
        return tabParam as ViralFlowTab;
      }
      if (window.location.hash === '#composer') return 'composer';
    }
    return 'video_editor';
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('admin@hivepostly.ai');
  const [creditsRemaining, setCreditsRemaining] = useState(245);
  const [composerInitialCaption, setComposerInitialCaption] = useState<string | undefined>(undefined);
  const [composerInitialMedia, setComposerInitialMedia] = useState<{ url: string; type: 'video' | 'image'; name: string } | undefined>(undefined);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    try {
      return localStorage.getItem('sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem('sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  };

  // Tab Titles
  const getTabTitle = (tab: ViralFlowTab) => {
    switch (tab) {
      case 'dashboard': return 'Command Room';
      case 'composer': return 'Composer & Publisher';
      case 'video_editor': return 'Video & Reel Editor (Hivepostly Studio)';
      case 'ai_studio': return 'AI Content Studio';
      case 'scheduler': return 'Bento Scheduler';
      case 'analytics': return 'Telemetry & Receipts';
      case 'media': return 'Media Vault';
      case 'settings': return 'Platform Integrations';
      default: return 'Command Room';
    }
  };

  const handleSendToComposer = (caption: string) => {
    setComposerInitialCaption(caption);
    setActiveTab('composer');
  };

  const handleSendFromEditorToComposer = (data: { caption: string; videoUrl: string }) => {
    setComposerInitialCaption(data.caption);
    setComposerInitialMedia({
      url: data.videoUrl,
      type: 'video',
      name: 'opencut_export_1080p.mp4',
    });
    setActiveTab('composer');
  };

  const handleUseMediaInComposer = (asset: { url: string; type: 'video' | 'image'; title: string }) => {
    setComposerInitialMedia({
      url: asset.url,
      type: asset.type,
      name: asset.title,
    });
    setComposerInitialCaption((prev) => prev || 'New viral broadcast ready across 7 networks! 🔥');
    setActiveTab('composer');
  };

  // Cross-tab direct bridge: listen to exports from Hivepostly Studio (/editor.html)
  useEffect(() => {
    const handleStudioImport = (media: { url: string; type: 'video' | 'image'; name: string }, caption?: string) => {
      setComposerInitialMedia(media);
      if (caption) {
        setComposerInitialCaption(caption);
      }
      setActiveTab('composer');
    };

    // 1. window.opener.postMessage listener
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'HIVEPOSTLY_IMPORT_MEDIA' && event.data?.media?.url) {
        handleStudioImport(event.data.media, event.data.caption);
      }
    };
    window.addEventListener('message', handleMessage);

    // 2. BroadcastChannel
    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel('hivepostly_channel');
      bc.onmessage = (event) => {
        if (event.data?.type === 'HIVEPOSTLY_IMPORT_MEDIA' && event.data?.media?.url) {
          handleStudioImport(event.data.media, event.data.caption);
        }
      };
    } catch (e) {
      console.warn('BroadcastChannel not supported', e);
    }

    // 3. Storage event listener (across browser tabs)
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'hivepostly_pending_post' && event.newValue) {
        try {
          const data = JSON.parse(event.newValue);
          if (data?.type === 'HIVEPOSTLY_IMPORT_MEDIA' && data?.media?.url) {
            handleStudioImport(data.media, data.caption);
            localStorage.removeItem('hivepostly_pending_post');
          }
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorage);

    // 4. Tab focus & IndexedDB check
    const checkPending = async () => {
      try {
        const item = localStorage.getItem('hivepostly_pending_post');
        if (item) {
          const data = JSON.parse(item);
          if (data?.type === 'HIVEPOSTLY_IMPORT_MEDIA' && data?.media?.url) {
            handleStudioImport(data.media, data.caption);
            localStorage.removeItem('hivepostly_pending_post');
          }
        }
      } catch (err) {}

      // Check persistent IndexedDB for video blobs
      try {
        const post = await getPendingPost();
        if (post && post.mediaBlob) {
          const fileUrl = URL.createObjectURL(post.mediaBlob);
          handleStudioImport({
            url: fileUrl,
            type: post.mediaType || 'video',
            name: post.name || 'hivepostly_studio_edit.mp4'
          }, post.caption);
        }
      } catch (err) {}
    };
    window.addEventListener('focus', checkPending);
    checkPending();

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', checkPending);
      if (bc) bc.close();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#0A0A0A] font-body selection:bg-[#B8FF5C] selection:text-[#0A0A0A]">
      {/* 1. Public Landing Page View */}
      {viewMode === 'landing' ? (
        <LandingPage
          onEnterApp={() => setViewMode('app')}
          onOpenLogin={() => setIsAuthModalOpen(true)}
        />
      ) : (
        /* 2. In-App Command Room View */
        <div className="flex h-screen overflow-hidden">
          {/* Collapsible Left Sidebar */}
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            userEmail={userEmail}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={toggleSidebar}
            onLogout={() => {
              setIsAuthModalOpen(true);
            }}
            onViewLanding={() => setViewMode('landing')}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col h-screen overflow-y-auto bg-[#FFFDF8]">
            {/* Top Header */}
            <TopHeader
              title={getTabTitle(activeTab)}
              isSidebarCollapsed={isSidebarCollapsed}
              onToggleSidebar={toggleSidebar}
              onNewPost={() => {
                setComposerInitialCaption(undefined);
                setActiveTab('composer');
              }}
              onOpenAI={() => setActiveTab('ai_studio')}
              creditsRemaining={creditsRemaining}
            />

            {/* Inner Module View Container */}
            <main className={`flex-1 w-full ${activeTab === 'video_editor' ? 'p-3 sm:p-4 max-w-none' : 'p-6 sm:p-8 max-w-7xl mx-auto'}`}>
              {activeTab === 'dashboard' && (
                <DashboardView
                  onNavigate={setActiveTab}
                  onNewPost={() => setActiveTab('composer')}
                />
              )}

              {activeTab === 'composer' && (
                <ComposerView
                  initialCaption={composerInitialCaption}
                  initialMedia={composerInitialMedia}
                  onPostPublished={(post) => {
                    console.log('Post published:', post);
                  }}
                />
              )}

              {activeTab === 'video_editor' && (
                <VideoEditorLauncher
                  onOpenComposer={() => setActiveTab('composer')}
                  recentMedia={composerInitialMedia}
                />
              )}

              {activeTab === 'ai_studio' && (
                <AIStudioView
                  onSendToComposer={handleSendToComposer}
                  onSendToEditor={(_scriptText) => {
                    setActiveTab('video_editor');
                  }}
                  onUseCredit={() => setCreditsRemaining((prev) => Math.max(0, prev - 1))}
                  creditsRemaining={creditsRemaining}
                />
              )}

              {activeTab === 'scheduler' && (
                <SchedulerView onNewPost={() => setActiveTab('composer')} />
              )}

              {activeTab === 'analytics' && <AnalyticsView />}

              {activeTab === 'media' && (
                <MediaView 
                  onUseMediaInComposer={handleUseMediaInComposer}
                  onOpenInEditor={(videoUrl) => {
                    setActiveTab('video_editor');
                  }}
                />
              )}

              {activeTab === 'settings' && <SettingsView />}
            </main>
          </div>
        </div>
      )}

      {/* Auth Modal for Sign in / Sign up */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(email) => {
          setUserEmail(email);
          setViewMode('app');
        }}
      />
    </div>
  );
}

export default App;
