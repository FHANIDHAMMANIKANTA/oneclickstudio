import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  ThumbsUp, 
  Share2, 
  ExternalLink, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Globe, 
  Search, 
  Bell, 
  Tv, 
  ArrowLeft,
  Sparkles,
  Wifi,
  Battery,
  Sliders,
  Check,
  Music,
  Download
} from 'lucide-react';

export type MobilePlatform = 'instagram' | 'facebook' | 'youtube' | 'tiktok' | 'twitter';

interface MobilePhoneSimulatorProps {
  initialUsername?: string;
  initialCaption?: string;
  initialMediaUrl?: string;
}

export const MobilePhoneSimulator: React.FC<MobilePhoneSimulatorProps> = ({
  initialUsername = 'hivepostly_creator',
  initialCaption = 'Stop spending 8 hours cutting footage manually! 🤯 These 5 AI workflows trim silences, burn karaoke captions, and auto-color in 30 seconds. Drop "TOOLS" in the comments to get our full cheatsheet! 👇🔥',
  initialMediaUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
}) => {
  // Mobile platform switch
  const [platform, setPlatform] = useState<MobilePlatform>('instagram');

  // User ID / Username input (synced with localStorage)
  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem('hivepostly_custom_username') || localStorage.getItem('viralflow_custom_username') || initialUsername;
  });
  const [caption, setCaption] = useState(initialCaption);
  const [mediaUrl, setMediaUrl] = useState(initialMediaUrl);

  const handleUsernameChange = (newVal: string) => {
    setUsername(newVal);
    const clean = newVal.replace(/^@/, '').trim();
    if (clean) {
      localStorage.setItem('hivepostly_custom_username', clean);
      localStorage.setItem('viralflow_custom_username', clean);
    }
  };

  // Likes & interaction states
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(14820);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Clean username for URLs (remove leading @ and spaces)
  const cleanUsername = username.replace(/^@/, '').trim() || 'hivepostly_creator';

  // Direct External Profile URL generator
  const getDirectProfileUrl = (plat: MobilePlatform, user: string) => {
    switch (plat) {
      case 'instagram':
        return `https://instagram.com/${user}`;
      case 'facebook':
        return `https://facebook.com/${user}`;
      case 'youtube':
        return `https://youtube.com/@${user}`;
      case 'tiktok':
        return `https://tiktok.com/@${user}`;
      case 'twitter':
        return `https://x.com/${user}`;
      default:
        return `https://instagram.com/${user}`;
    }
  };

  const directProfileUrl = getDirectProfileUrl(platform, cleanUsername);

  const handleOpenAccount = () => {
    window.open(directProfileUrl, '_blank', 'noopener,noreferrer');
  };

  const handleToggleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  // Avatar generator using DiceBear API based on username
  const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanUsername}`;

  return (
    <div className="card-brutal p-6 bg-white space-y-6 text-left border-2 border-[#0A0A0A] shadow-brutal">
      {/* 1. Header with Controls & Direct User ID Linking */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-[#0A0A0A]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#FF5B37] text-white border border-[#0A0A0A] text-[10px] font-mono font-black uppercase shadow-brutal-sm">
              MOBILE STUDIO
            </span>
            <span className="text-xs font-mono font-bold text-neutral-500">
              Interactive Smartphone Device Simulator
            </span>
          </div>
          <h2 className="font-display text-2xl font-black text-[#0A0A0A] tracking-tight mt-1">
            Live Mobile App Previewer
          </h2>
          <p className="text-xs text-neutral-600 font-medium">
            Test and preview your content directly inside native Instagram, Facebook, YouTube, TikTok, and X mobile interfaces.
          </p>
        </div>

        {/* Direct Account Link Button */}
        <button
          onClick={handleOpenAccount}
          className="px-4 py-2.5 bg-[#0A0A0A] hover:bg-[#FF5B37] text-white font-display font-black text-xs border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center gap-2 transition-all hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer shrink-0"
          title={`Open ${cleanUsername}'s account directly on ${platform}`}
        >
          <span>Open @{cleanUsername} on {platform.toUpperCase()}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Top Bar: Username Input + Platform Switcher */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Username / User ID Input (5 cols) */}
        <div className="lg:col-span-5 space-y-1">
          <label className="text-[11px] font-bold text-neutral-700 uppercase font-mono block">
            Enter User ID / Username (e.g. cristiano, mrbeast, your_handle):
          </label>
          <div className="flex items-center">
            <span className="px-3 py-2 bg-neutral-100 border-2 border-r-0 border-[#0A0A0A] text-xs font-mono font-bold text-neutral-600">
              @
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              placeholder="username"
              className="flex-1 bg-[#FFFDF8] border-2 border-[#0A0A0A] px-3 py-2 text-xs font-mono font-bold text-[#0A0A0A] focus:outline-none"
            />
          </div>
        </div>

        {/* Platform Selector Buttons (7 cols) */}
        <div className="lg:col-span-7 space-y-1">
          <label className="text-[11px] font-bold text-neutral-700 uppercase font-mono block">
            Select Mobile OS Application:
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'instagram' as MobilePlatform, label: 'Instagram Mobile', color: 'bg-[#E1306C]', activeBorder: 'border-[#E1306C]' },
              { id: 'facebook' as MobilePlatform, label: 'Facebook Mobile', color: 'bg-[#1877F2]', activeBorder: 'border-[#1877F2]' },
              { id: 'youtube' as MobilePlatform, label: 'YouTube Mobile', color: 'bg-[#FF0000]', activeBorder: 'border-[#FF0000]' },
              { id: 'tiktok' as MobilePlatform, label: 'TikTok Mobile', color: 'bg-[#000000]', activeBorder: 'border-[#00F2FE]' },
              { id: 'twitter' as MobilePlatform, label: 'X / Twitter Mobile', color: 'bg-[#0A0A0A]', activeBorder: 'border-[#0A0A0A]' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id)}
                className={`px-3 py-1.5 text-xs font-display font-bold border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  platform === p.id
                    ? `${p.color} text-white border-[#0A0A0A] shadow-brutal-sm`
                    : 'bg-white text-[#0A0A0A] border-[#0A0A0A] hover:bg-neutral-50'
                }`}
              >
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Main Split View: Left Controls / Caption (5 cols), Right Realistic Smartphone Mockup (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
        {/* Left Column: Post Settings & Direct Account Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Profile Info Box */}
          <div className="p-4 bg-[#FFFDF8] border-2 border-[#0A0A0A] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-300">
              <div className="flex items-center gap-2.5">
                <img
                  src={avatarUrl}
                  alt={cleanUsername}
                  className="w-10 h-10 rounded-full border-2 border-[#0A0A0A] bg-white shadow-sm"
                />
                <div>
                  <div className="font-display font-black text-sm text-[#0A0A0A] flex items-center gap-1">
                    <span>@{cleanUsername}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2F80ED] fill-[#2F80ED] text-white" />
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500">
                    Linked to: {platform.toUpperCase()}
                  </div>
                </div>
              </div>

              <button
                onClick={handleOpenAccount}
                className="px-2.5 py-1 bg-white hover:bg-neutral-100 border border-[#0A0A0A] text-[11px] font-mono font-bold flex items-center gap-1"
              >
                <span>Open Link</span>
                <ExternalLink className="w-3 h-3 text-[#FF5B37]" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-2 bg-white border border-[#0A0A0A]">
                <div className="font-black text-sm text-[#0A0A0A]">142</div>
                <div className="text-[9px] text-neutral-500 uppercase">Posts</div>
              </div>
              <div className="p-2 bg-white border border-[#0A0A0A]">
                <div className="font-black text-sm text-[#0A0A0A]">148.2K</div>
                <div className="text-[9px] text-neutral-500 uppercase">Followers</div>
              </div>
              <div className="p-2 bg-white border border-[#0A0A0A]">
                <div className="font-black text-sm text-[#0A0A0A]">389</div>
                <div className="text-[9px] text-neutral-500 uppercase">Following</div>
              </div>
            </div>

            <div className="text-[11px] font-mono text-neutral-600 bg-white p-2 border border-neutral-300 truncate">
              🔗 <span className="text-blue-600 underline cursor-pointer" onClick={handleOpenAccount}>
                {directProfileUrl}
              </span>
            </div>
          </div>

          {/* Edit Post Caption */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-neutral-700 uppercase font-mono block">
                Post Caption / Script:
              </label>
              <button
                onClick={() =>
                  setCaption(
                    'Stop spending 8 hours cutting footage manually! 🤯 These 5 AI workflows trim silences, burn karaoke captions, and auto-color in 30 seconds. Drop "TOOLS" in the comments to get our full cheatsheet! 👇🔥'
                  )
                }
                className="text-[10px] font-mono text-[#FF5B37] hover:underline font-bold"
              >
                Reset Preset
              </button>
            </div>
            <textarea
              rows={4}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full bg-[#FFFDF8] border-2 border-[#0A0A0A] p-3 text-xs font-medium text-[#0A0A0A] focus:outline-none leading-relaxed"
            />
          </div>

          {/* Media URL Picker */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-neutral-700 uppercase font-mono block">
              Sample Video / Media Reel URL:
            </label>
            <input
              type="text"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              className="w-full bg-[#FFFDF8] border-2 border-[#0A0A0A] px-3 py-2 text-xs font-mono font-medium text-[#0A0A0A] focus:outline-none"
            />
          </div>

          {/* Quick Creator Account Examples */}
          <div className="space-y-1 pt-1">
            <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase">
              1-Click Demo User Profiles:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { name: 'Cristiano', handle: 'cristiano' },
                { name: 'MrBeast', handle: 'mrbeast' },
                { name: 'Hivepostly Studio', handle: 'hivepostly.ai' },
                { name: 'Mark Zuckerberg', handle: 'zuck' },
                { name: 'Elon Musk', handle: 'elonmusk' },
              ].map((demo) => (
                <button
                  key={demo.handle}
                  onClick={() => handleUsernameChange(demo.handle)}
                  className="px-2 py-1 bg-white hover:bg-neutral-100 border border-neutral-400 text-[10px] font-mono font-bold"
                >
                  @{demo.handle}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Ultra-Realistic Smartphone Device Mockup (7 cols) */}
        <div className="lg:col-span-7 flex justify-center items-center py-2">
          {/* SMARTPHONE HARDWARE CHASSIS */}
          <div className="w-[340px] sm:w-[360px] bg-[#0A0A0A] rounded-[44px] p-3 shadow-2xl border-4 border-neutral-800 relative select-none">
            {/* Dynamic Island pill at top */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#000000] rounded-full z-40 flex items-center justify-end px-2">
              <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full border border-neutral-700" />
            </div>

            {/* INNER MOBILE SCREEN */}
            <div className="w-full bg-white rounded-[34px] overflow-hidden flex flex-col h-[650px] relative text-[#0A0A0A] font-sans">
              {/* OS Status Bar (9:41, 5G, Battery) */}
              <div className="h-10 bg-inherit flex items-center justify-between px-6 text-[11px] font-bold z-30 shrink-0">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono">5G</span>
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* A. INSTAGRAM MOBILE APP INTERFACE */}
              {/* ------------------------------------------------------------- */}
              {platform === 'instagram' && (
                <div className="flex-1 flex flex-col overflow-y-auto bg-white text-xs">
                  {/* Top Instagram App Bar */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-100 shrink-0">
                    <span className="font-serif italic font-bold text-lg tracking-tight">
                      Instagram
                    </span>
                    <div className="flex items-center gap-4">
                      <Heart className="w-5 h-5 text-neutral-800" />
                      <div className="relative">
                        <MessageCircle className="w-5 h-5 text-neutral-800" />
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#FF5B37] text-white rounded-full text-[8px] flex items-center justify-center font-bold">
                          3
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stories Bubble Strip */}
                  <div className="flex items-center gap-3 px-3 py-2 border-b border-neutral-100 overflow-x-hidden shrink-0">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
                        <img src={avatarUrl} alt="" className="w-full h-full rounded-full bg-white object-cover" />
                      </div>
                      <span className="text-[9px] font-medium truncate max-w-[48px]">Your Story</span>
                    </div>
                    {['sarah.v', 'alex_ai', 'techguy', 'creator'].map((u) => (
                      <div key={u} className="flex flex-col items-center gap-1">
                        <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
                          <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${u}`} alt="" className="w-full h-full rounded-full bg-white object-cover" />
                        </div>
                        <span className="text-[9px] font-medium truncate max-w-[48px]">{u}</span>
                      </div>
                    ))}
                  </div>

                  {/* Instagram Post Header */}
                  <div className="flex items-center justify-between px-3 py-2 shrink-0">
                    <div 
                      onClick={handleOpenAccount}
                      className="flex items-center gap-2 cursor-pointer group"
                      title="Click to visit profile"
                    >
                      <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 to-rose-500">
                        <img src={avatarUrl} alt="" className="w-full h-full rounded-full bg-white object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-[11px] flex items-center gap-1 text-[#0A0A0A] group-hover:underline">
                          <span>{cleanUsername}</span>
                          <CheckCircle2 className="w-3 h-3 text-[#2F80ED] fill-[#2F80ED] text-white" />
                        </div>
                        <div className="text-[9px] text-neutral-500">Original audio</div>
                      </div>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-neutral-600" />
                  </div>

                  {/* Media Reel / Video Container */}
                  <div className="w-full bg-black relative aspect-[4/5] max-h-[260px] overflow-hidden flex items-center justify-center">
                    <video
                      src={mediaUrl}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="absolute bottom-2 right-2 p-1.5 bg-black/60 rounded-full text-white"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Post Actions (Heart, Comment, Share, Bookmark) */}
                  <div className="flex items-center justify-between px-3 py-2 shrink-0">
                    <div className="flex items-center gap-3.5">
                      <button onClick={handleToggleLike} className="transition-transform active:scale-125">
                        <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-neutral-800'}`} />
                      </button>
                      <MessageCircle className="w-5 h-5 text-neutral-800" />
                      <Send className="w-5 h-5 text-neutral-800" />
                    </div>
                    <button onClick={() => setIsBookmarked(!isBookmarked)}>
                      <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-neutral-900 text-neutral-900' : 'text-neutral-800'}`} />
                    </button>
                  </div>

                  {/* Likes Count */}
                  <div className="px-3 text-[11px] font-bold text-neutral-900 shrink-0">
                    {likesCount.toLocaleString()} likes
                  </div>

                  {/* Caption & User ID */}
                  <div className="px-3 py-1 text-[11px] leading-relaxed text-neutral-900">
                    <strong 
                      onClick={handleOpenAccount} 
                      className="mr-1.5 hover:underline cursor-pointer"
                    >
                      {cleanUsername}
                    </strong>
                    <span className="whitespace-pre-line">{caption}</span>
                  </div>

                  <div className="px-3 text-[10px] text-neutral-400 pt-1 pb-3">
                    View all 1,284 comments • 2 hours ago
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* B. FACEBOOK MOBILE APP INTERFACE */}
              {/* ------------------------------------------------------------- */}
              {platform === 'facebook' && (
                <div className="flex-1 flex flex-col overflow-y-auto bg-neutral-100 text-xs">
                  {/* Top Facebook Header */}
                  <div className="bg-white flex items-center justify-between px-4 py-2 border-b border-neutral-200 shrink-0">
                    <span className="font-black text-[#1877F2] text-xl tracking-tight">
                      facebook
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-neutral-100 rounded-full flex items-center justify-center">
                        <Search className="w-4 h-4 text-neutral-700" />
                      </div>
                      <div className="w-7 h-7 bg-neutral-100 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-neutral-700" />
                      </div>
                    </div>
                  </div>

                  {/* Facebook Post Card */}
                  <div className="bg-white my-2 border-y border-neutral-200 p-3 space-y-2">
                    {/* Author row */}
                    <div className="flex items-center justify-between">
                      <div 
                        onClick={handleOpenAccount} 
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <img src={avatarUrl} alt="" className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <div className="font-bold text-xs flex items-center gap-1 group-hover:underline">
                            <span>{cleanUsername}</span>
                            <CheckCircle2 className="w-3 h-3 text-[#1877F2] fill-[#1877F2] text-white" />
                          </div>
                          <div className="text-[10px] text-neutral-500 flex items-center gap-1">
                            <span>Just now</span>
                            <span>•</span>
                            <Globe className="w-2.5 h-2.5" />
                          </div>
                        </div>
                      </div>
                      <MoreHorizontal className="w-4 h-4 text-neutral-500" />
                    </div>

                    {/* Post text */}
                    <p className="text-xs leading-relaxed text-neutral-900 whitespace-pre-line">
                      {caption}
                    </p>

                    {/* Video Embed */}
                    <div className="w-full bg-black aspect-video max-h-[190px] overflow-hidden flex items-center justify-center relative">
                      <video
                        src={mediaUrl}
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Reactions counter */}
                    <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1 border-b border-neutral-200 pb-2">
                      <div className="flex items-center gap-1">
                        <span className="flex items-center">
                          <span className="w-4 h-4 rounded-full bg-[#1877F2] flex items-center justify-center text-[9px] text-white">👍</span>
                          <span className="w-4 h-4 rounded-full bg-red-500 -ml-1 flex items-center justify-center text-[9px] text-white">❤️</span>
                        </span>
                        <span className="ml-1 font-bold">1.4K</span>
                      </div>
                      <div>428 comments • 182 shares</div>
                    </div>

                    {/* Like, Comment, Share buttons */}
                    <div className="grid grid-cols-3 gap-1 pt-1 text-neutral-600 font-bold text-[11px]">
                      <button 
                        onClick={handleToggleLike}
                        className={`flex items-center justify-center gap-1 py-1 rounded hover:bg-neutral-100 ${isLiked ? 'text-[#1877F2]' : ''}`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Like</span>
                      </button>
                      <button className="flex items-center justify-center gap-1 py-1 rounded hover:bg-neutral-100">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Comment</span>
                      </button>
                      <button className="flex items-center justify-center gap-1 py-1 rounded hover:bg-neutral-100">
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* C. YOUTUBE MOBILE APP INTERFACE */}
              {/* ------------------------------------------------------------- */}
              {platform === 'youtube' && (
                <div className="flex-1 flex flex-col overflow-y-auto bg-white text-xs">
                  {/* Top YouTube Header */}
                  <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-100 shrink-0">
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-4 bg-[#FF0000] rounded-sm flex items-center justify-center text-white">
                        <Play className="w-2.5 h-2.5 fill-white" />
                      </div>
                      <span className="font-display font-black text-sm tracking-tighter">YouTube</span>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-700">
                      <Tv className="w-4 h-4" />
                      <Bell className="w-4 h-4" />
                      <Search className="w-4 h-4" />
                      <img src={avatarUrl} alt="" className="w-5 h-5 rounded-full object-cover" />
                    </div>
                  </div>

                  {/* YouTube Video Player View */}
                  <div className="w-full bg-black aspect-video max-h-[200px] overflow-hidden flex items-center justify-center relative shrink-0">
                    <video
                      src={mediaUrl}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 left-2 right-2 h-1 bg-neutral-600 rounded">
                      <div className="w-1/3 h-full bg-[#FF0000]" />
                    </div>
                  </div>

                  {/* Title & Stats */}
                  <div className="p-3 space-y-2">
                    <h3 className="font-bold text-xs text-neutral-900 leading-snug line-clamp-2">
                      {caption.slice(0, 80)}...
                    </h3>
                    <div className="text-[10px] text-neutral-500 font-mono">
                      148K views • 2 hours ago • #viral #creator
                    </div>

                    {/* Channel attribution row */}
                    <div className="flex items-center justify-between py-1 border-y border-neutral-100">
                      <div 
                        onClick={handleOpenAccount} 
                        className="flex items-center gap-2 cursor-pointer group"
                      >
                        <img src={avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <div className="font-bold text-xs text-neutral-900 group-hover:underline">
                            @{cleanUsername}
                          </div>
                          <div className="text-[9px] text-neutral-500">1.2M subscribers</div>
                        </div>
                      </div>

                      <button className="px-3 py-1 bg-[#0A0A0A] text-white text-[10px] font-bold rounded-full">
                        Subscribe
                      </button>
                    </div>

                    {/* YouTube Actions bar */}
                    <div className="flex items-center gap-2 overflow-x-hidden pt-1 text-[10px] font-bold">
                      <button 
                        onClick={handleToggleLike}
                        className="px-3 py-1 bg-neutral-100 rounded-full flex items-center gap-1 shrink-0"
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'text-[#FF0000]' : ''}`} />
                        <span>14K</span>
                      </button>
                      <button className="px-3 py-1 bg-neutral-100 rounded-full flex items-center gap-1 shrink-0">
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </button>
                      <button className="px-3 py-1 bg-neutral-100 rounded-full flex items-center gap-1 shrink-0">
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* D. TIKTOK MOBILE APP INTERFACE */}
              {/* ------------------------------------------------------------- */}
              {platform === 'tiktok' && (
                <div className="flex-1 bg-black text-white relative overflow-hidden flex flex-col justify-between">
                  {/* Video Background */}
                  <video
                    src={mediaUrl}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Top Following / For You Switcher */}
                  <div className="relative z-20 flex items-center justify-center gap-4 pt-2 text-xs font-bold">
                    <span className="text-white/60">Following</span>
                    <span className="text-white border-b-2 border-white pb-0.5">For You</span>
                  </div>

                  {/* Right Action Icons Column */}
                  <div className="absolute right-2 bottom-16 z-20 flex flex-col items-center gap-4 text-center">
                    {/* Avatar with follow plus */}
                    <div 
                      onClick={handleOpenAccount} 
                      className="relative cursor-pointer"
                    >
                      <img src={avatarUrl} alt="" className="w-10 h-10 rounded-full border border-white object-cover" />
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FF5B37] rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                        +
                      </div>
                    </div>

                    {/* Heart */}
                    <button onClick={handleToggleLike} className="flex flex-col items-center">
                      <Heart className={`w-7 h-7 drop-shadow ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
                      <span className="text-[10px] font-bold drop-shadow">84.2K</span>
                    </button>

                    {/* Comments */}
                    <div className="flex flex-col items-center">
                      <MessageCircle className="w-7 h-7 text-white drop-shadow" />
                      <span className="text-[10px] font-bold drop-shadow">1,489</span>
                    </div>

                    {/* Bookmark */}
                    <button onClick={() => setIsBookmarked(!isBookmarked)} className="flex flex-col items-center">
                      <Bookmark className={`w-7 h-7 drop-shadow ${isBookmarked ? 'text-yellow-400 fill-yellow-400' : 'text-white'}`} />
                      <span className="text-[10px] font-bold drop-shadow">12.1K</span>
                    </button>

                    {/* Share */}
                    <div className="flex flex-col items-center">
                      <Share2 className="w-7 h-7 text-white drop-shadow" />
                      <span className="text-[10px] font-bold drop-shadow">5,201</span>
                    </div>

                    {/* Spinning vinyl disc */}
                    <div className="w-8 h-8 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center animate-spin">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                  </div>

                  {/* Bottom Creator Info & Caption */}
                  <div className="relative z-20 p-3 pr-16 space-y-1 bg-gradient-to-t from-black/80 to-transparent">
                    <div 
                      onClick={handleOpenAccount}
                      className="font-bold text-xs flex items-center gap-1 cursor-pointer hover:underline"
                    >
                      <span>@{cleanUsername}</span>
                      <CheckCircle2 className="w-3 h-3 text-[#00F2FE] fill-[#00F2FE] text-black" />
                    </div>
                    <p className="text-[11px] line-clamp-2 text-white/90">
                      {caption}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-white/80 font-mono">
                      <Music className="w-3 h-3" />
                      <span>original sound - @{cleanUsername}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* E. X / TWITTER MOBILE APP INTERFACE */}
              {/* ------------------------------------------------------------- */}
              {platform === 'twitter' && (
                <div className="flex-1 flex flex-col overflow-y-auto bg-white text-xs">
                  {/* Top X Header */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-100 shrink-0">
                    <img src={avatarUrl} alt="" className="w-6 h-6 rounded-full object-cover" />
                    <span className="font-display font-black text-base text-[#0A0A0A]">𝕏</span>
                    <Sparkles className="w-4 h-4 text-neutral-600" />
                  </div>

                  {/* Tweet Card */}
                  <div className="p-3 border-b border-neutral-100 space-y-2">
                    <div className="flex items-start gap-2.5">
                      <img 
                        src={avatarUrl} 
                        alt="" 
                        onClick={handleOpenAccount}
                        className="w-10 h-10 rounded-full object-cover cursor-pointer shrink-0" 
                      />
                      <div className="flex-1 space-y-1">
                        <div 
                          onClick={handleOpenAccount} 
                          className="flex items-center gap-1 cursor-pointer group"
                        >
                          <span className="font-bold text-xs text-[#0A0A0A] group-hover:underline">
                            {cleanUsername}
                          </span>
                          <CheckCircle2 className="w-3 h-3 text-[#2F80ED] fill-[#2F80ED] text-white" />
                          <span className="text-[10px] text-neutral-500 font-mono">
                            @{cleanUsername} · 2h
                          </span>
                        </div>

                        <p className="text-xs text-neutral-900 leading-relaxed whitespace-pre-line">
                          {caption}
                        </p>

                        {/* Media Attachment */}
                        <div className="w-full bg-black rounded-xl overflow-hidden aspect-video max-h-[170px] relative mt-2">
                          <video
                            src={mediaUrl}
                            autoPlay
                            loop
                            muted={isMuted}
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Tweet Action Icons */}
                        <div className="flex items-center justify-between text-neutral-500 text-[10px] font-mono pt-2">
                          <button className="flex items-center gap-1 hover:text-blue-500">
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>42</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-emerald-500">
                            <Share2 className="w-3.5 h-3.5" />
                            <span>189</span>
                          </button>
                          <button onClick={handleToggleLike} className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : 'hover:text-red-500'}`}>
                            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500' : ''}`} />
                            <span>1.4K</span>
                          </button>
                          <button onClick={() => setIsBookmarked(!isBookmarked)} className="flex items-center gap-1 hover:text-blue-500">
                            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-neutral-900 text-neutral-900' : ''}`} />
                            <span>380</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* BOTTOM HOME INDICATOR GESTURE BAR */}
              <div className="h-4 bg-inherit flex items-center justify-center shrink-0">
                <div className="w-28 h-1 bg-neutral-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
