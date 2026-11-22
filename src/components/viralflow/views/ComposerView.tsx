import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Send, 
  Calendar, 
  Upload, 
  Image as ImageIcon, 
  Video, 
  Check, 
  Sparkles, 
  Flame, 
  Bot, 
  Clock, 
  Layers, 
  CheckCircle2,
  Trash2,
  Play,
  Link as LinkIcon,
  ExternalLink,
  FileText,
  Plus
} from 'lucide-react';
import { extractVideoMetadata } from '../../../utils/mediaUtils';
import { getPendingPost } from '../../../utils/composerStorage';
import { getEditorUrl } from '../../../utils/editorUrl';

export interface ComposerMedia {
  url: string;
  type: 'video' | 'image';
  name: string;
}

interface ComposerViewProps {
  initialCaption?: string;
  initialMedia?: ComposerMedia;
  onPostPublished?: (post: any) => void;
}

export const ComposerView: React.FC<ComposerViewProps> = ({
  initialCaption,
  initialMedia,
  onPostPublished,
}) => {
  const [caption, setCaption] = useState(
    initialCaption ||
    'Why are 90% of creators still losing 70% of viewers in the first 3 seconds? 🤯\n\nThese 5 AI workflows trim silences, burn karaoke subtitles, and auto-color in 30 seconds.\n\nComment "TOOLS" below and my bot will DM you the direct download bundle before the link expires! 👇'
  );

  const [media, setMedia] = useState<ComposerMedia | null>(
    initialMedia || {
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      type: 'video',
      name: 'hivepostly_render_1080p.mp4',
    }
  );

  const [platforms, setPlatforms] = useState<string[]>([
    'Twitter / X',
    'Instagram',
    'YouTube',
    'LinkedIn',
    'TikTok',
  ]);

  const [scheduleTime, setScheduleTime] = useState('2026-11-16T19:30');
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [attachCommentBot, setAttachCommentBot] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Comment-to-DM Bot Asset Upload (Image, Video, or URL)
  const [dmMediaType, setDmMediaType] = useState<'image' | 'video' | 'url'>('url');
  const [dmMediaFile, setDmMediaFile] = useState<{ url: string; name: string; type: 'image' | 'video' } | null>(null);
  const [dmUrl, setDmUrl] = useState('https://hivepostly.ai/downloads/2026-creator-playbook.pdf');
  const [dmKeyword, setDmKeyword] = useState('TOOLS');
  const [dmMessage, setDmMessage] = useState('Hey creator! 🔥 Here is the exclusive 2026 AI Creator Cheatsheet & Workflow Bundle you requested:');
  const dmFileInputRef = useRef<HTMLInputElement>(null);

  const handleDmFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    const isVideo = file.type.startsWith('video');

    setDmMediaFile({
      url: fileUrl,
      name: file.name,
      type: isVideo ? 'video' : 'image',
    });
  };

  // Update caption or media if initial props change
  useEffect(() => {
    if (initialCaption) setCaption(initialCaption);
  }, [initialCaption]);

  useEffect(() => {
    if (initialMedia) setMedia(initialMedia);
  }, [initialMedia]);

  // Check IndexedDB for video directly sent from Editor
  useEffect(() => {
    getPendingPost().then((post) => {
      if (post && post.mediaBlob) {
        const fileUrl = URL.createObjectURL(post.mediaBlob);
        setMedia({
          url: fileUrl,
          type: post.mediaType || 'video',
          name: post.name || 'hivepostly_studio_edit.mp4',
        });
        if (post.caption) {
          setCaption(post.caption);
        }
      }
    });
  }, []);

  const allPlatforms = [
    'Instagram',
    'Facebook',
    'YouTube',
    'TikTok',
    'Twitter / X',
    'Threads',
    'LinkedIn',
    'Pinterest',
  ];

  const PLATFORM_ACCOUNTS = [
    { id: 'Instagram', name: 'Instagram', handle: '@creator.hivepostly', iconColor: 'bg-[#E1306C]', iconText: 'IG' },
    { id: 'Facebook', name: 'Facebook', handle: 'Hivepostly Creator Page', iconColor: 'bg-[#1877F2]', iconText: 'FB' },
    { id: 'YouTube', name: 'YouTube', handle: 'Hivepostly Studio (Shorts)', iconColor: 'bg-[#FF0000]', iconText: 'YT' },
    { id: 'TikTok', name: 'TikTok', handle: '@hivepostly.viral', iconColor: 'bg-[#000000]', iconText: 'TT' },
    { id: 'Twitter / X', name: 'Twitter / X', handle: '@HivepostlyHQ', iconColor: 'bg-[#0A0A0A]', iconText: '𝕏' },
    { id: 'Threads', name: 'Threads', handle: '@hivepostly.threads', iconColor: 'bg-[#0A0A0A]', iconText: '@' },
    { id: 'LinkedIn', name: 'LinkedIn', handle: 'Hivepostly Creator OS', iconColor: 'bg-[#0A66C2]', iconText: 'in' },
    { id: 'Pinterest', name: 'Pinterest', handle: 'Hivepostly Idea Pins', iconColor: 'bg-[#E60023]', iconText: 'P' },
  ];

  const togglePlatform = (p: string) => {
    if (platforms.includes(p)) {
      setPlatforms(platforms.filter((x) => x !== p));
    } else {
      setPlatforms([...platforms, p]);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    const isVideo = file.type.startsWith('video');

    setMedia({
      url: fileUrl,
      type: isVideo ? 'video' : 'image',
      name: file.name,
    });
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsSuccess(true);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
      if (onPostPublished) {
        onPostPublished({
          title: caption.slice(0, 40) + '...',
          caption,
          platforms,
          media,
          timestamp: 'Just now',
        });
      }
    }, 1500);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-[#0A0A0A]">
        <div>
          <h2 className="font-display text-3xl font-black tracking-tight text-[#0A0A0A]">
            COMPOSER
          </h2>
          <p className="text-xs text-neutral-600 font-medium">
            Write once. Preview natively with real video playback. Broadcast to 7 social networks in one click.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-neutral-500 font-mono">
            {platforms.length} Platforms Selected
          </span>
        </div>
      </div>

      {/* Main Composer Columns: Left Form (7 Cols), Right Native Previews (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Target Social Media Accounts (Manual Selection) */}
          <div className="card-brutal p-5 bg-white space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b-2 border-neutral-100">
              <div>
                <span className="text-xs font-black tracking-widest uppercase text-neutral-500 font-mono block">
                  TARGET SOCIAL MEDIA ACCOUNTS (8 AVAILABLE)
                </span>
                <span className="text-xs text-neutral-600 font-medium">
                  Select which accounts will receive this video:
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPlatforms([...allPlatforms])}
                  className="px-2.5 py-1 bg-[#B8FF5C] hover:bg-[#a6f543] text-[#0A0A0A] font-black text-[11px] border-2 border-[#0A0A0A] shadow-brutal-xs uppercase transition-all cursor-pointer"
                >
                  ✓ Select All 8
                </button>
                <button
                  type="button"
                  onClick={() => setPlatforms([])}
                  className="px-2.5 py-1 bg-white hover:bg-neutral-100 text-neutral-700 font-bold text-[11px] border-2 border-[#0A0A0A] shadow-brutal-xs uppercase transition-all cursor-pointer"
                >
                  ✕ Clear All
                </button>
                <span className="px-2.5 py-1 bg-[#0A0A0A] text-white font-mono font-bold text-[11px]">
                  {platforms.length} / 8 Selected
                </span>
              </div>
            </div>

            {/* 8-Platform Manual Selection Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PLATFORM_ACCOUNTS.map((account) => {
                const isSelected = platforms.includes(account.id);
                return (
                  <button
                    key={account.id}
                    type="button"
                    onClick={() => togglePlatform(account.id)}
                    className={`p-3 text-left border-2 border-[#0A0A0A] transition-all cursor-pointer flex flex-col justify-between gap-2 rounded-none ${
                      isSelected
                        ? 'bg-white shadow-brutal-sm ring-2 ring-[#B8FF5C]'
                        : 'bg-neutral-50 hover:bg-white opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`w-7 h-7 rounded flex items-center justify-center text-white text-xs font-black border border-[#0A0A0A] ${account.iconColor}`}>
                        {account.iconText}
                      </span>
                      <div className={`w-4 h-4 rounded border border-[#0A0A0A] flex items-center justify-center ${
                        isSelected ? 'bg-[#B8FF5C]' : 'bg-white'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-[#0A0A0A] stroke-[3]" />}
                      </div>
                    </div>
                    <div>
                      <div className="font-display font-black text-xs text-[#0A0A0A] leading-tight">
                        {account.name}
                      </div>
                      <div className="text-[10px] text-neutral-500 font-mono truncate">
                        {account.handle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Caption Area */}
          <div className="card-brutal p-5 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black tracking-widest uppercase text-neutral-500 font-mono">
                POST CAPTION
              </label>
              <span className="text-xs font-mono font-bold text-neutral-600">
                {caption.length} / 280 (Twitter limit)
              </span>
            </div>

            <textarea
              rows={6}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Drop the hook. Then the payoff."
              className="w-full bg-[#FFFDF8] border-2 border-[#0A0A0A] p-4 text-sm font-medium text-[#0A0A0A] placeholder-neutral-400 focus:outline-none focus:bg-white leading-relaxed resize-y font-body"
            />

            {/* Media Attachment Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t-2 border-[#0A0A0A]/10">
              <div className="flex items-center gap-2 truncate max-w-xs">
                {media?.type === 'video' ? (
                  <span className="px-2 py-1 bg-[#B8FF5C] border-2 border-[#0A0A0A] text-[10px] font-black uppercase font-mono flex items-center gap-1 shrink-0">
                    <Video className="w-3 h-3" /> VIDEO
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-[#4D9FFF] border-2 border-[#0A0A0A] text-[10px] font-black uppercase font-mono flex items-center gap-1 shrink-0 text-white">
                    <ImageIcon className="w-3 h-3" /> IMAGE
                  </span>
                )}
                <span className="text-xs font-mono text-neutral-700 font-bold truncate">
                  {media ? media.name : 'No media attached'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="video/*,image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-white hover:bg-neutral-100 border-2 border-[#0A0A0A] shadow-brutal-sm text-xs font-bold font-display uppercase tracking-wider flex items-center gap-1.5 transition-all"
                >
                  <Upload className="w-3.5 h-3.5 text-[#FF5B37]" />
                  <span>{media ? 'Change Media' : 'Upload Media'}</span>
                </button>

                {media && (
                  <button
                    onClick={() => setMedia(null)}
                    className="p-1.5 text-neutral-400 hover:text-red-500 border border-neutral-300"
                    title="Remove Media"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Comment-to-DM Bot Toggle */}
          <div className="card-brutal p-4 bg-[#FFFDF8] border-2 border-[#0A0A0A] shadow-brutal flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#FF5B37] border-2 border-[#0A0A0A] flex items-center justify-center text-white shrink-0 shadow-brutal-sm">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-[#0A0A0A] flex items-center gap-2">
                  <span>Attach Comment-to-DM Trigger</span>
                  {attachCommentBot && (
                    <span className="px-1.5 py-0.2 bg-[#B8FF5C] border border-[#0A0A0A] text-[9px] font-mono font-black uppercase">
                      ACTIVE
                    </span>
                  )}
                </div>
                <div className="text-xs text-neutral-600 font-medium">
                  {attachCommentBot
                    ? `Auto-send media or link when users comment "${dmKeyword || 'TOOLS'}"`
                    : 'Auto-send PDF download bundle when users comment "TOOLS" or "PDF"'}
                </div>
              </div>
            </div>

            <input
              type="checkbox"
              checked={attachCommentBot}
              onChange={(e) => setAttachCommentBot(e.target.checked)}
              className="w-5 h-5 accent-[#FF5B37] border-2 border-[#0A0A0A] cursor-pointer"
            />
          </div>

          {/* ONLY APPEARS WHEN CHECKBOX IS CHECKED */}
          {attachCommentBot && (
            <div className="card-brutal p-5 bg-white border-2 border-[#0A0A0A] shadow-brutal space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#0A0A0A]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#FF5B37] text-white border border-[#0A0A0A] text-[10px] font-mono font-black uppercase">
                    AUTO-DM ASSET DELIVERY
                  </span>
                  <span className="text-xs font-mono font-bold text-neutral-600">
                    What should the bot send to users?
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-600">
                  Instant DM Delivery
                </span>
              </div>

              {/* 1. Keyword Trigger Configuration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold text-neutral-700 uppercase block">
                    Comment Trigger Keyword:
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-1.5 bg-neutral-100 border-2 border-r-0 border-[#0A0A0A] text-xs font-mono font-bold text-neutral-600">
                      "
                    </span>
                    <input
                      type="text"
                      value={dmKeyword}
                      onChange={(e) => setDmKeyword(e.target.value.toUpperCase())}
                      placeholder="e.g. TOOLS, PDF, SEND"
                      className="flex-1 bg-[#FFFDF8] border-2 border-[#0A0A0A] px-2.5 py-1.5 text-xs font-mono font-bold text-[#0A0A0A] focus:outline-none"
                    />
                    <span className="px-3 py-1.5 bg-neutral-100 border-2 border-l-0 border-[#0A0A0A] text-xs font-mono font-bold text-neutral-600">
                      "
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono font-bold text-neutral-700 uppercase block">
                    Choose Delivery Media Type:
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { id: 'image' as const, label: 'Image', icon: ImageIcon },
                      { id: 'video' as const, label: 'Video', icon: Video },
                      { id: 'url' as const, label: 'Link / URL', icon: LinkIcon },
                    ].map((t) => {
                      const Icon = t.icon;
                      const isActive = dmMediaType === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setDmMediaType(t.id)}
                          className={`py-1.5 px-2 text-xs font-display font-bold border-2 transition-all flex items-center justify-center gap-1 cursor-pointer ${
                            isActive
                              ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-brutal-sm'
                              : 'bg-white hover:bg-neutral-100 text-[#0A0A0A] border-[#0A0A0A]'
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#B8FF5C]' : 'text-neutral-600'}`} />
                          <span>{t.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 2. Media Upload / URL Input Area */}
              <div className="p-4 bg-[#FFFDF8] border-2 border-[#0A0A0A] space-y-3">
                {/* A. If IMAGE or VIDEO Selected */}
                {(dmMediaType === 'image' || dmMediaType === 'video') && (
                  <div className="space-y-3">
                    <input
                      type="file"
                      ref={dmFileInputRef}
                      accept={dmMediaType === 'video' ? 'video/*' : 'image/*'}
                      onChange={handleDmFileUpload}
                      className="hidden"
                    />

                    {dmMediaFile ? (
                      <div className="flex items-center justify-between p-3 bg-white border-2 border-[#0A0A0A] gap-3">
                        <div className="flex items-center gap-3 truncate">
                          {dmMediaFile.type === 'video' ? (
                            <div className="w-14 h-14 bg-black border border-[#0A0A0A] rounded relative flex items-center justify-center overflow-hidden shrink-0">
                              <video src={dmMediaFile.url} className="w-full h-full object-cover" />
                              <Play className="w-4 h-4 text-white fill-current absolute" />
                            </div>
                          ) : (
                            <img
                              src={dmMediaFile.url}
                              alt=""
                              className="w-14 h-14 object-cover border border-[#0A0A0A] rounded shrink-0 bg-neutral-100"
                            />
                          )}
                          <div className="truncate">
                            <div className="font-display font-bold text-xs text-[#0A0A0A] truncate">
                              {dmMediaFile.name}
                            </div>
                            <div className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Attached {dmMediaFile.type.toUpperCase()} ready for auto-DM</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => dmFileInputRef.current?.click()}
                            className="px-2.5 py-1 text-xs font-mono font-bold border border-[#0A0A0A] bg-neutral-100 hover:bg-neutral-200"
                          >
                            Change
                          </button>
                          <button
                            type="button"
                            onClick={() => setDmMediaFile(null)}
                            className="p-1 text-neutral-400 hover:text-red-500 border border-neutral-300 rounded"
                            title="Remove file"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => dmFileInputRef.current?.click()}
                        className="border-2 border-dashed border-[#0A0A0A] p-6 text-center bg-white hover:bg-neutral-50 transition-colors cursor-pointer space-y-2 group"
                      >
                        <div className="w-10 h-10 mx-auto bg-[#FF5B37] border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-display font-bold text-xs text-[#0A0A0A] underline">
                            Click to Upload {dmMediaType === 'video' ? 'Video (MP4, MOV)' : 'Image (PNG, JPG)'}
                          </span>
                          <p className="text-[10px] font-mono text-neutral-500 mt-0.5">
                            Auto-delivered directly inside follower direct messages
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* B. If LINK / URL Selected */}
                {dmMediaType === 'url' && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold text-neutral-700 uppercase flex items-center justify-between">
                      <span>Resource / Download Destination URL:</span>
                      <span className="text-[10px] text-blue-600 font-mono">PDF, Google Drive, Notion, Website</span>
                    </label>
                    <div className="flex items-center">
                      <span className="px-3 py-2 bg-neutral-100 border-2 border-r-0 border-[#0A0A0A] text-xs font-mono font-bold text-neutral-600">
                        🔗
                      </span>
                      <input
                        type="url"
                        value={dmUrl}
                        onChange={(e) => setDmUrl(e.target.value)}
                        placeholder="https://yourwebsite.com/download/bundle.pdf"
                        className="flex-1 bg-white border-2 border-[#0A0A0A] px-3 py-2 text-xs font-mono text-[#0A0A0A] focus:outline-none"
                      />
                      {dmUrl && (
                        <a
                          href={dmUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 bg-[#B8FF5C] border-2 border-l-0 border-[#0A0A0A] text-xs font-mono font-black text-[#0A0A0A] flex items-center gap-1 hover:bg-[#a6f049]"
                        >
                          <span>Test ↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. Customizable Auto-DM Message text */}
                <div className="space-y-1 pt-1">
                  <label className="text-[11px] font-mono font-bold text-neutral-700 uppercase block">
                    Auto-DM Accompanying Message:
                  </label>
                  <textarea
                    rows={2}
                    value={dmMessage}
                    onChange={(e) => setDmMessage(e.target.value)}
                    className="w-full bg-white border-2 border-[#0A0A0A] p-2.5 text-xs text-[#0A0A0A] focus:outline-none font-medium leading-relaxed"
                  />
                </div>
              </div>

              {/* 4. Live Simulated DM Chat Bubble Receipt */}
              <div className="p-3 bg-neutral-50 border border-neutral-300 rounded space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 uppercase font-bold">
                  <span>Follower Direct Message Preview (Instagram / X / TikTok):</span>
                  <span className="text-emerald-600">Bot Active ⚡</span>
                </div>
                <div className="p-3 bg-white border border-neutral-200 rounded max-w-sm space-y-2 shadow-xs">
                  <div className="text-xs text-neutral-800 leading-snug">
                    {dmMessage}
                  </div>
                  {dmMediaType === 'url' ? (
                    <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs font-mono text-blue-700 flex items-center gap-1.5 truncate">
                      <LinkIcon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate underline font-bold">{dmUrl}</span>
                    </div>
                  ) : dmMediaFile ? (
                    <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-xs font-mono text-emerald-800 flex items-center gap-1.5 truncate">
                      {dmMediaFile.type === 'video' ? <Video className="w-3.5 h-3.5 shrink-0" /> : <ImageIcon className="w-3.5 h-3.5 shrink-0" />}
                      <span className="truncate font-bold">Attached {dmMediaFile.type}: {dmMediaFile.name}</span>
                    </div>
                  ) : (
                    <div className="p-2 bg-amber-50 border border-amber-200 rounded text-[11px] font-mono text-amber-800">
                      ⚠️ No {dmMediaType} uploaded yet. Click upload above to attach.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Schedule or Publish Now */}
          <div className="card-brutal p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FF5B37]" />
              <input
                type="datetime-local"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="bg-[#FFFDF8] border-2 border-[#0A0A0A] px-3 py-2 text-xs font-mono font-bold text-[#0A0A0A] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => alert(`Broadcast scheduled for ${scheduleTime}!`)}
                className="px-5 py-3 bg-white hover:bg-neutral-50 text-[#0A0A0A] font-display font-bold text-xs tracking-tight border-2 border-[#0A0A0A] shadow-brutal transition-all"
              >
                Schedule
              </button>

              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="px-6 py-3 bg-[#FF5B37] hover:bg-[#ff4921] text-white font-display font-black text-sm tracking-tight border-2 border-[#0A0A0A] shadow-brutal flex items-center gap-2 transition-all hover:translate-x-0.5 hover:translate-y-0.5 disabled:opacity-50"
              >
                {isPublishing ? (
                  <span>Broadcasting...</span>
                ) : isSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Published to {platforms.length} Networks!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Publish Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Live Video Player & 8-Network Broadcast Monitor (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="text-xs font-black tracking-widest uppercase text-neutral-500 font-mono flex items-center gap-2">
              <Video className="w-3.5 h-3.5 text-[#FF5B37]" />
              <span>LIVE VIDEO & BROADCAST MONITOR</span>
            </div>
            <span className="px-2 py-0.5 bg-[#B8FF5C] border border-[#0A0A0A] text-[10px] font-mono font-black uppercase">
              {platforms.length} OF 8 QUEUED
            </span>
          </div>

          {/* Dedicated Real Video Player Card */}
          <div className="card-brutal p-4 bg-white space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <div className="flex items-center gap-2 truncate">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-xs font-display font-bold text-[#0A0A0A] truncate">
                  {media ? media.name : 'No video attached'}
                </span>
              </div>
              <a
                href={getEditorUrl()}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-mono font-bold text-[#FF5B37] hover:underline flex items-center gap-1 shrink-0"
              >
                <span>Open in Studio</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Video / Media Display */}
            {media ? (
              <div className="border-2 border-[#0A0A0A] bg-black overflow-hidden relative group rounded-none">
                {media.type === 'video' ? (
                  <video
                    src={media.url}
                    controls
                    playsInline
                    className="w-full aspect-video object-contain bg-black"
                  />
                ) : (
                  <img
                    src={media.url}
                    alt="Composer Media"
                    className="w-full aspect-video object-contain bg-black"
                  />
                )}
                <div className="p-2 bg-[#0A0A0A] text-white text-[10px] font-mono flex items-center justify-between border-t border-neutral-800">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#B8FF5C]" />
                    {media.type === 'video' ? 'Hardware-Accelerated Stream' : 'High-Res Image Asset'}
                  </span>
                  <span className="text-neutral-400 font-bold uppercase">{media.type}</span>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#0A0A0A] p-8 text-center bg-[#FFFDF8] hover:bg-neutral-50 cursor-pointer transition-all space-y-2"
              >
                <Upload className="w-8 h-8 text-neutral-400 mx-auto" />
                <div className="text-xs font-display font-bold text-[#0A0A0A]">
                  No Video Connected Yet
                </div>
                <div className="text-[11px] text-neutral-500 font-mono">
                  Upload a video file or click "Open Editor" to create and transfer a video.
                </div>
              </div>
            )}
          </div>

          {/* Real-Time Selected Accounts Distribution Board */}
          <div className="card-brutal p-4 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-widest uppercase text-neutral-500 font-mono">
                DISPATCH QUEUE ({platforms.length} SOCIAL ACCOUNTS)
              </span>
              <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase">
                1-Click Multi-Post
              </span>
            </div>

            {platforms.length > 0 ? (
              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                {PLATFORM_ACCOUNTS.filter((acc) => platforms.includes(acc.id)).map((account) => (
                  <div
                    key={account.id}
                    className="p-2.5 bg-[#FFFDF8] border-2 border-[#0A0A0A] flex items-center justify-between gap-3 shadow-brutal-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`w-6 h-6 rounded flex items-center justify-center text-white text-[11px] font-black shrink-0 border border-[#0A0A0A] ${account.iconColor}`}>
                        {account.iconText}
                      </span>
                      <div className="min-w-0">
                        <div className="font-display font-bold text-xs text-[#0A0A0A] leading-tight truncate">
                          {account.name}
                        </div>
                        <div className="text-[10px] text-neutral-500 font-mono truncate">
                          {account.handle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {isPublishing ? (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-mono font-bold animate-pulse">
                          Broadcasting...
                        </span>
                      ) : isSuccess ? (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1">
                          <Check className="w-3 h-3 stroke-[3]" /> Live
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-[#B8FF5C]/30 text-[#0A0A0A] border border-[#0A0A0A] text-[10px] font-mono font-bold">
                          ● Armed
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 bg-amber-50 border-2 border-dashed border-amber-300 text-center text-xs font-mono text-amber-800">
                ⚠️ No social accounts selected. Check the accounts on the left to include them in this post.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
