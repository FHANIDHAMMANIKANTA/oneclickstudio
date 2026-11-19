import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Send, 
  Calendar, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Bot, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Layers, 
  Check, 
  Flame, 
  RefreshCw, 
  ExternalLink,
  Sliders,
  ChevronRight,
  Info
} from 'lucide-react';
import { Platform, PostDoctorReport } from '../../types';
import { platformConfigs } from '../../utils/platformTheme';

interface ComposerPublisherProps {
  initialContent?: {
    caption: string;
    hashtags?: string[];
    title?: string;
  };
  onPostPublished: (postData: any) => void;
}

export const ComposerPublisher: React.FC<ComposerPublisherProps> = ({
  initialContent,
  onPostPublished,
}) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([
    'instagram',
    'youtube',
    'linkedin',
    'x',
    'tiktok',
  ]);

  const [activePreviewPlatform, setActivePreviewPlatform] = useState<Platform>('instagram');

  // Master Post Fields
  const [title, setTitle] = useState(initialContent?.title || '5 AI Tools That Replaced My $10k Video Team');
  const [masterCaption, setMasterCaption] = useState(
    initialContent?.caption ||
    'Why are 90% of creators still spending 8 hours cutting footage manually? 🤯\n\nThese 5 AI workflows trim silences, burn karaoke subtitles, and auto-color in 45 seconds.\n\nComment "TOOLS" below and my bot will DM you the direct download bundle before the link expires! 👇'
  );
  const [hashtags, setHashtags] = useState<string[]>(
    initialContent?.hashtags || ['#creatorhack', '#videoediting', '#aicontent', '#productivitytips']
  );
  const [mediaType, setMediaType] = useState<'video' | 'image' | 'carousel' | 'pdf'>('video');
  const [mediaUrl, setMediaUrl] = useState(
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
  );

  // Platform specific customization toggles
  const [igReelType, setIgReelType] = useState<'reel' | 'post' | 'story'>('reel');
  const [ytIsShort, setYtIsShort] = useState(true);
  const [ytTags, setYtTags] = useState('ai tools, video editor, creator tips');
  const [liDocTitle, setLiDocTitle] = useState('2026 AI Creator Playbook');

  // Automation trigger attachment (PRD Section 7.6 & 7.3)
  const [attachAutomation, setAttachAutomation] = useState(true);
  const [triggerKeyword, setTriggerKeyword] = useState('TOOLS');
  const [dmAsset, setDmAsset] = useState('AI_Creator_Blueprint_2026.pdf');

  // Publishing simulation state
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishProgress, setPublishProgress] = useState<Record<Platform, 'idle' | 'uploading' | 'published'>>({
    instagram: 'idle',
    youtube: 'idle',
    linkedin: 'idle',
    x: 'idle',
    tiktok: 'idle',
    facebook: 'idle',
    threads: 'idle',
  });
  const [isPublishedSuccess, setIsPublishedSuccess] = useState(false);

  // Post Doctor Virality Health Score calculation
  const getPostDoctorReport = (): PostDoctorReport => {
    const hasHook = masterCaption.toLowerCase().includes('?') || masterCaption.toLowerCase().includes('why') || masterCaption.toLowerCase().includes('stop');
    const hasCTA = masterCaption.toLowerCase().includes('comment') || masterCaption.toLowerCase().includes('dm') || masterCaption.toLowerCase().includes('below');
    const hasTools = masterCaption.length > 50;

    let score = 70;
    if (hasHook) score += 12;
    if (hasCTA) score += 12;
    if (attachAutomation) score += 6;

    return {
      score: Math.min(99, score),
      hookStrength: {
        score: hasHook ? 95 : 62,
        status: hasHook ? 'good' : 'warning',
        feedback: hasHook ? 'Strong contrarian question in line 1 (+3.2x saves)' : 'Opening line lacks curiosity gap. Add a question or surprising stat.',
      },
      captionLength: {
        score: 94,
        status: 'good',
        count: masterCaption.length,
        recommended: '120-250 characters for peak short-form readability',
      },
      hashtagMix: {
        score: hashtags.length >= 3 && hashtags.length <= 8 ? 96 : 75,
        status: 'good',
        feedback: `${hashtags.length} hashtags selected (Optimal: 4–6 high/mid reach tags)`,
      },
      silentWatch: {
        score: 95,
        status: 'good',
        feedback: 'Karaoke subtitle track detected from Video Studio',
      },
      ctaPresence: {
        score: hasCTA ? 98 : 45,
        status: hasCTA ? 'good' : 'bad',
        feedback: hasCTA ? `Keyword trigger CTA detected ("${triggerKeyword}")` : 'Missing CTA! Add "Comment [KEYWORD]" to capture leads.',
      },
      safetyScore: {
        score: 100,
        status: 'good',
        feedback: 'No platform banned words, compliant with Meta & YouTube terms',
      },
      estimatedReachMultiplier: '2.8x vs account median',
    };
  };

  const doctorReport = getPostDoctorReport();

  const togglePlatform = (p: Platform) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((x) => x !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  // 1-Click Apply AI Fixes from Post Doctor
  const handleApplyDoctorFixes = () => {
    if (!masterCaption.includes('Comment "TOOLS"')) {
      setMasterCaption(
        `Why are 90% of creators still wasting hours editing manually? 🤯\n\nThese 5 AI workflows trim silences, burn karaoke subtitles, and auto-color in 45 seconds.\n\nComment "TOOLS" below and my bot will DM you the direct download bundle before the link expires! 👇`
      );
    }
    setAttachAutomation(true);
  };

  // Live Publishing Action
  const handlePublishAll = () => {
    setIsPublishing(true);
    const newProgress: Record<Platform, any> = { ...publishProgress };

    // Simulate multi-platform publishing progression
    selectedPlatforms.forEach((p) => {
      newProgress[p] = 'uploading';
    });
    setPublishProgress({ ...newProgress });

    setTimeout(() => {
      selectedPlatforms.forEach((p) => {
        newProgress[p] = 'published';
      });
      setPublishProgress({ ...newProgress });
      setIsPublishing(false);
      setIsPublishedSuccess(true);

      // Trigger celebration confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      onPostPublished({
        title,
        caption: masterCaption,
        platforms: selectedPlatforms,
        timestamp: new Date().toLocaleTimeString(),
      });
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-[#131724] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Send className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              COMPOSER & ONE-CLICK MULTI-PUBLISHER
            </h2>
            <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Multi-Variant Engine
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Customize captions and formats per platform, run the "Post Doctor" virality check, and broadcast simultaneously.
          </p>
        </div>

        {/* Selected platforms pill badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(['instagram', 'youtube', 'linkedin', 'x', 'tiktok', 'facebook', 'threads'] as Platform[]).map((p) => {
            const isSelected = selectedPlatforms.includes(p);
            const cfg = platformConfigs[p];
            return (
              <button
                key={p}
                onClick={() => togglePlatform(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all border flex items-center gap-1.5 ${
                  isSelected
                    ? `${cfg.badgeBg} border-transparent shadow-md scale-100`
                    : 'bg-white/5 border-white/10 text-slate-500 opacity-60 hover:opacity-100'
                }`}
              >
                {isSelected && <Check className="w-3 h-3" />}
                <span>{p}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Master Editor & Post Doctor (Left 7 Cols), Live Device Preview (Right 5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Master Editor & Post Doctor (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. Master Content Editor */}
          <div className="p-5 rounded-2xl bg-[#131724] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                Master Post Content
              </h3>
              <div className="flex items-center gap-2">
                {(['video', 'image', 'carousel', 'pdf'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setMediaType(type)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                      mediaType === type
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Post Title */}
            <div>
              <label className="text-[11px] text-slate-400 font-medium mb-1 block">
                Post Title / Internal Headline
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Caption */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] text-slate-400 font-medium">
                  Primary Caption (Markdown & Emojis supported)
                </label>
                <span className="text-[10px] font-mono text-slate-500">
                  {masterCaption.length} chars
                </span>
              </div>
              <textarea
                rows={5}
                value={masterCaption}
                onChange={(e) => setMasterCaption(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
              />
            </div>

            {/* Hashtag tags */}
            <div>
              <label className="text-[11px] text-slate-400 font-medium mb-1.5 block">
                Attached Hashtags
              </label>
              <div className="flex flex-wrap items-center gap-1.5">
                {hashtags.map((h, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-indigo-300 flex items-center gap-1"
                  >
                    {h}
                  </span>
                ))}
                <button
                  onClick={() => setHashtags([...hashtags, '#automation'])}
                  className="px-2 py-0.5 rounded-md bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-[11px]"
                >
                  + Add Tag
                </button>
              </div>
            </div>

            {/* Attachment: Comment-to-DM Bot integration */}
            <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/25 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-pink-400" />
                  <span className="text-xs font-bold text-pink-200">
                    Attach Instagram Comment-to-DM Trigger
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={attachAutomation}
                    onChange={(e) => setAttachAutomation(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-pink-500"></div>
                </label>
              </div>

              {attachAutomation && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Trigger Keyword</label>
                    <input
                      type="text"
                      value={triggerKeyword}
                      onChange={(e) => setTriggerKeyword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Deliverable Asset</label>
                    <select
                      value={dmAsset}
                      onChange={(e) => setDmAsset(e.target.value)}
                      className="w-full bg-[#181c2b] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    >
                      <option value="AI_Creator_Blueprint_2026.pdf">AI_Creator_Blueprint_2026.pdf</option>
                      <option value="100_Viral_Hooks_Vault.pdf">100_Viral_Hooks_Vault.pdf</option>
                      <option value="Notion_Creator_OS_Link">Notion Creator OS (Store Link)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. Pre-Publish Virality Check: "Post Doctor" (PRD Section B.2) */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#141827] to-[#0f121d] border border-indigo-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center font-bold font-mono">
                  {doctorReport.score}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    POST DOCTOR • VIRALITY AUDIT
                  </h3>
                  <div className="text-[10px] text-slate-400">
                    Predicted Reach: <span className="text-emerald-400 font-semibold">{doctorReport.estimatedReachMultiplier}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleApplyDoctorFixes}
                className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>1-Click Apply AI Fixes</span>
              </button>
            </div>

            {/* Checklist items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">First-Line Hook Strength</div>
                  <div className="text-[11px] text-slate-400">{doctorReport.hookStrength.feedback}</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Silent-Watch Readiness</div>
                  <div className="text-[11px] text-slate-400">{doctorReport.silentWatch.feedback}</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">DM Funnel CTA</div>
                  <div className="text-[11px] text-slate-400">{doctorReport.ctaPresence.feedback}</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Platform Safety & Compliance</div>
                  <div className="text-[11px] text-slate-400">{doctorReport.safetyScore.feedback}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Publishing Action Footer */}
          <div className="p-5 rounded-2xl bg-[#131724] border border-white/10 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-white">Broadcast Ready</div>
                <div className="text-[11px] text-slate-400">
                  Publishing to {selectedPlatforms.length} platform{selectedPlatforms.length > 1 ? 's' : ''} simultaneously
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('Post scheduled for today at 7:30 PM IST (Top Golden Slot)!')}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/10 transition-colors flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Use Best Time (7:30 PM)</span>
                </button>

                <button
                  onClick={handlePublishAll}
                  disabled={isPublishing}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02] flex items-center gap-2 disabled:opacity-50"
                >
                  {isPublishing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Broadcasting across APIs...</span>
                    </>
                  ) : isPublishedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Published to All! ✅</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Publish Now ({selectedPlatforms.length})</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Live Multi-Platform Publishing Progress Status */}
            {isPublishing && (
              <div className="pt-2 space-y-1.5 animate-in fade-in">
                <div className="text-[11px] font-mono text-slate-400">API Gateway Delivery:</div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[10px] font-mono">
                  {selectedPlatforms.map((p) => (
                    <div key={p} className="p-1.5 rounded bg-white/5 border border-white/5 flex items-center justify-between">
                      <span className="capitalize text-slate-300">{p}</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin" /> Uploading
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Live Platform Device Preview Mockup (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Live Channel Preview
            </h3>

            {/* Platform preview switcher */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
              {(['instagram', 'youtube', 'linkedin', 'x', 'tiktok'] as Platform[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePreviewPlatform(p)}
                  className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-all ${
                    activePreviewPlatform === p
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Mobile Device Mockup */}
          <div className="w-full max-w-sm mx-auto rounded-3xl bg-black border-4 border-slate-800 shadow-2xl p-3 relative overflow-hidden aspect-[9/18]">
            {/* Phone Speaker Notch */}
            <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-3" />

            {/* Inside Phone Screen */}
            <div className="h-full rounded-2xl bg-zinc-950 flex flex-col justify-between overflow-hidden relative border border-white/10 text-white">
              {/* Instagram Reel Mockup */}
              {activePreviewPlatform === 'instagram' && (
                <div className="relative h-full flex flex-col justify-between">
                  <img
                    src={mediaUrl}
                    alt="Reel Media"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

                  {/* Top IG bar */}
                  <div className="relative p-3 flex items-center justify-between text-xs z-10">
                    <span className="font-bold tracking-tight">Reels</span>
                    <span className="font-mono text-[10px] bg-black/50 px-2 py-0.5 rounded backdrop-blur">
                      @fhanidham.ai
                    </span>
                  </div>

                  {/* Right Action Rail (Heart, Comment, Share) */}
                  <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 z-10 text-white">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-rose-500">
                        ♥
                      </div>
                      <span className="text-[10px] font-mono mt-0.5">24.8K</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white">
                        💬
                      </div>
                      <span className="text-[10px] font-mono mt-0.5">1,284</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-white">
                        ↗
                      </div>
                      <span className="text-[10px] font-mono mt-0.5">4.2K</span>
                    </div>
                  </div>

                  {/* Bottom IG Caption & Audio */}
                  <div className="relative p-3 space-y-2 z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-amber-500 p-[1px]">
                        <div className="w-full h-full rounded-full bg-black" />
                      </div>
                      <span className="text-xs font-bold">fhanidham.ai</span>
                      <button className="px-2 py-0.5 rounded-full border border-white/30 text-[10px] font-semibold">
                        Follow
                      </button>
                    </div>

                    <p className="text-xs line-clamp-3 leading-snug font-sans text-slate-100">
                      {masterCaption}
                    </p>

                    <div className="flex items-center gap-2 text-[10px] text-slate-300 font-mono">
                      <span>♪ Original Audio • Cyber Beat</span>
                    </div>
                  </div>
                </div>
              )}

              {/* YouTube Shorts Mockup */}
              {activePreviewPlatform === 'youtube' && (
                <div className="relative h-full flex flex-col justify-between">
                  <img src={mediaUrl} alt="Shorts" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
                  <div className="relative p-3 flex justify-between text-xs z-10">
                    <span className="font-bold text-red-500">Shorts</span>
                    <span className="text-[10px] font-mono bg-black/40 px-2 py-0.5 rounded">#Shorts</span>
                  </div>
                  <div className="relative p-3 space-y-2 z-10">
                    <h4 className="text-xs font-bold leading-tight">{title}</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-red-600" />
                      <span className="text-[11px] font-semibold">Fhanidham Tech</span>
                      <button className="px-2 py-0.5 rounded-full bg-red-600 text-[10px] font-bold text-white">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* LinkedIn Post Mockup */}
              {activePreviewPlatform === 'linkedin' && (
                <div className="p-4 bg-[#1b1f2b] h-full flex flex-col justify-between text-slate-100 text-xs">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-sky-600 font-bold flex items-center justify-center text-xs">
                        F
                      </div>
                      <div>
                        <div className="font-bold text-white">Fhanidham • AI Founder</div>
                        <div className="text-[10px] text-slate-400">68K followers • Just now</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-200 line-clamp-4 leading-relaxed mb-3">
                      {masterCaption}
                    </p>
                    <div className="rounded-xl overflow-hidden border border-white/10 aspect-video mb-2">
                      <img src={mediaUrl} alt="Media" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-slate-400">
                    <span>👍 428 Likes</span>
                    <span>💬 84 Comments</span>
                  </div>
                </div>
              )}

              {/* X Mockup */}
              {activePreviewPlatform === 'x' && (
                <div className="p-4 bg-black h-full flex flex-col justify-between text-slate-100 text-xs">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-zinc-800" />
                      <div>
                        <div className="font-bold text-white">Fhanidham ⚡</div>
                        <div className="text-[10px] text-zinc-500">@fhanidham_builds</div>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-200 leading-relaxed mb-3">
                      {masterCaption}
                    </p>
                    <div className="rounded-xl overflow-hidden border border-zinc-800 aspect-video">
                      <img src={mediaUrl} alt="X media" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-zinc-900">
                    <span>💬 64</span>
                    <span>🔁 128</span>
                    <span>♥ 942</span>
                    <span>🔖 412</span>
                  </div>
                </div>
              )}

              {/* TikTok Mockup */}
              {activePreviewPlatform === 'tiktok' && (
                <div className="relative h-full flex flex-col justify-between">
                  <img src={mediaUrl} alt="TikTok" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
                  <div className="relative p-3 flex justify-center text-xs font-bold z-10">
                    <span>Following | For You</span>
                  </div>
                  <div className="relative p-3 space-y-1.5 z-10 text-white">
                    <div className="font-bold text-xs">@fhanidham_clips</div>
                    <p className="text-xs line-clamp-2">{masterCaption}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
