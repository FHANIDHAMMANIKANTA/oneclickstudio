import React, { useState, useRef } from 'react';
import { 
  FolderOpen, 
  Music, 
  Type, 
  Sparkles, 
  Upload, 
  Plus, 
  Play, 
  Pause,
  Check, 
  Film, 
  Smile, 
  Layers, 
  Flame,
  Loader2,
  Trash2,
  Activity,
  Zap,
  Sliders,
  Tv,
  Camera,
  Wand2,
  Heart,
  Star,
  Bell,
  Share2,
  Scan,
  MessageSquare,
  Search,
  Grid,
  Volume2,
  VolumeX,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ArrowUp,
  ArrowDown,
  Crosshair,
  SplitSquareVertical,
  Maximize,
  Layout,
  Tag
} from 'lucide-react';
import { MediaResource, TimelineClip, StickerItem } from './types';
import { 
  extractVideoMetadata, 
  extractAudioMetadata, 
  generateSyntheticWaveform,
  STOCK_SAMPLE_VIDEOS 
} from '../../utils/mediaUtils';

interface ResourcePanelProps {
  onAddClipToTimeline: (clip: Omit<TimelineClip, 'id' | 'startTime'>) => void;
  onApplyFilter?: (filterStyle: string) => void;
  onApplyMotionEffect?: (effect: 'none' | 'glitch' | 'shake' | 'vhs' | 'film_grain' | 'pulse_glow' | 'zoom_punch' | 'cinematic_bars') => void;
  onApplyTransition?: (transition: string) => void;
  onTriggerAiAutoSubtitles?: () => void;
  onTriggerAiCutout?: (glowColor?: string) => void;
  onQuickAlign?: (align: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => void;
  onApplyLayoutPreset?: (layout: 'cover' | 'contain' | 'split_v' | 'pip_tr') => void;
}

export const ResourcePanel: React.FC<ResourcePanelProps> = ({ 
  onAddClipToTimeline,
  onApplyFilter,
  onApplyMotionEffect,
  onApplyTransition,
  onTriggerAiAutoSubtitles,
  onTriggerAiCutout,
  onQuickAlign,
  onApplyLayoutPreset,
}) => {
  const [activeTab, setActiveTab] = useState<'media' | 'stickers' | 'canva' | 'motion' | 'transitions' | 'ai' | 'text' | 'audio' | 'effects'>('stickers');
  const [stickerCategory, setStickerCategory] = useState<'Trending' | 'GIFs & Memes' | 'Mascots' | 'Social' | 'Cyber' | 'Badges'>('Trending');
  const [stickerSearch, setStickerSearch] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [activeMotionFx, setActiveMotionFx] = useState<string>('none');
  const [previewAudioUrl, setPreviewAudioUrl] = useState<string | null>(null);
  const [aiCutoutGlow, setAiCutoutGlow] = useState('#B8FF5C');
  const [isDragOver, setIsDragOver] = useState(false);

  const audioPreviewRef = useRef<HTMLAudioElement | null>(null);

  // Store user-uploaded media items
  const [userUploadedMedia, setUserUploadedMedia] = useState<MediaResource[]>([]);

  // Stock Media Library
  const stockClips: MediaResource[] = STOCK_SAMPLE_VIDEOS;

  // Rich Sticker Catalog with GIFs, Memes, Emojis, and Badges (CapCut & Canva)
  const stickerCatalog: Record<string, { id: string; name: string; emoji?: string; desc: string; isGif?: boolean }[]> = {
    Trending: [
      { id: 'stk-flame', name: 'Viral Flame', emoji: '🔥', desc: 'Trending fire badge' },
      { id: 'stk-star', name: 'Gold Sparkle Star', emoji: '🌟', desc: 'Glowing reward star' },
      { id: 'stk-heart', name: 'Pulse Heart', emoji: '❤️', desc: 'Animated love reaction' },
      { id: 'stk-100', name: '100% Score', emoji: '💯', desc: 'Retention milestone' },
      { id: 'stk-rocket', name: 'Viral Rocket', emoji: '🚀', desc: 'Exponential growth' },
      { id: 'stk-mindblown', name: 'Mind Blown', emoji: '🤯', desc: 'Hook reaction' },
    ],
    'GIFs & Memes': [
      { id: 'gif-deal-with-it', name: 'Pixel Shades (Thug)', emoji: '🕶️', desc: 'Deal With It sunglasses' },
      { id: 'gif-pop-cat', name: 'Pop Cat (Meme)', emoji: '🐱', desc: 'Fast popping mouth cat' },
      { id: 'gif-party', name: 'Confetti Cannon', emoji: '🎉', desc: 'Celebration burst' },
      { id: 'gif-money', name: 'Money Rain', emoji: '💸', desc: 'Raining cash bills' },
      { id: 'gif-eyes', name: 'Laser Eyes', emoji: '👀', desc: 'Glowing focus beam' },
      { id: 'gif-clapping', name: 'Standing Ovation', emoji: '👏', desc: 'Cheering applause' },
    ],
    Mascots: [
      { id: 'stk-puppy', name: 'Cute Golden Puppy', emoji: '🐶', desc: 'Playful pup mascot (CapCut style)' },
      { id: 'stk-kitty', name: 'Mischievous Cat', emoji: '🐱', desc: 'Cute feline friend' },
      { id: 'stk-duck', name: 'Cyber Duck', emoji: '🦆', desc: 'Yellow happy duck' },
      { id: 'stk-bear', name: 'Brown Bear', emoji: '🐻', desc: 'Chubby bear' },
      { id: 'stk-panda', name: 'Panda Hug', emoji: '🐼', desc: 'Sweet panda' },
      { id: 'stk-lion', name: 'Roaring Lion', emoji: '🦁', desc: 'King energy' },
    ],
    Social: [
      { id: 'stk-sub', name: 'Subscribe Bell', emoji: '🔔', desc: 'Channel subscribe CTA' },
      { id: 'stk-like', name: 'Thumb Like', emoji: '👍', desc: 'Engagement callout' },
      { id: 'stk-share', name: 'Share Arrow', emoji: '↗️', desc: 'Viral share prompt' },
      { id: 'stk-comment', name: 'Comment Chat', emoji: '💬', desc: 'Comment-to-DM trigger' },
      { id: 'stk-pin', name: 'Bookmark Pin', emoji: '📌', desc: 'Save for later' },
      { id: 'stk-bio', name: 'Link in Bio', emoji: '🔗', desc: 'Bio landing link' },
    ],
    Cyber: [
      { id: 'stk-zap', name: 'Neon Lightning', emoji: '⚡', desc: 'Cyber electric strike' },
      { id: 'stk-check', name: 'Verified Badge', emoji: '✔️', desc: 'Authority badge' },
      { id: 'stk-skull', name: 'Glitch Skull', emoji: '💀', desc: 'Cyberpunk attitude' },
      { id: 'stk-target', name: 'Crosshair Reticle', emoji: '🎯', desc: 'Bullseye accuracy' },
      { id: 'stk-spark', name: 'Neon Glint', emoji: '✨', desc: 'Luxury sparkle' },
      { id: 'stk-gem', name: 'Diamond Gem', emoji: '💎', desc: 'Premium value' },
    ],
    Badges: [
      { id: 'bdg-hook', name: 'VIRAL HOOK', emoji: '🪝', desc: '3s Attention grabber' },
      { id: 'bdg-part1', name: 'PART 1', emoji: '🎬', desc: 'Multi-part series badge' },
      { id: 'bdg-new', name: 'NEW VIDEO', emoji: '🆕', desc: 'Fresh broadcast tag' },
      { id: 'bdg-secret', name: 'SECRET TIP', emoji: '🤫', desc: 'Value-add callout' },
    ],
  };

  // Stock Audio Tracks
  const stockAudio = [
    { 
      name: 'Cyber Beat - 128 BPM', 
      duration: 30, 
      type: 'bgm', 
      bpm: 128,
      url: 'https://cdn.freesound.org/previews/568/568581_11861866-lq.mp3' 
    },
    { 
      name: 'Upbeat Lofi Chill - 95 BPM', 
      duration: 25, 
      type: 'bgm', 
      bpm: 95,
      url: 'https://cdn.freesound.org/previews/612/612089_11861866-lq.mp3' 
    },
    { 
      name: 'Cinematic Ambient Tech', 
      duration: 40, 
      type: 'bgm', 
      bpm: 110,
      url: 'https://cdn.freesound.org/previews/612/612088_11861866-lq.mp3' 
    },
    { 
      name: 'Viral Swoosh Transition SFX', 
      duration: 1.5, 
      type: 'sfx', 
      bpm: 0,
      url: 'https://cdn.freesound.org/previews/608/608645_11861866-lq.mp3' 
    },
    { 
      name: 'Clean Ding / Success Bell SFX', 
      duration: 1.2, 
      type: 'sfx', 
      bpm: 0,
      url: 'https://cdn.freesound.org/previews/536/536108_11861866-lq.mp3' 
    },
    { 
      name: 'Sub Bass Impact Drop SFX', 
      duration: 2.0, 
      type: 'sfx', 
      bpm: 0,
      url: 'https://cdn.freesound.org/previews/608/608645_11861866-lq.mp3' 
    },
  ];

  // Text presets
  const textPresets = [
    { title: 'Karaoke Auto-Captions (Word Sync)', style: 'karaoke', text: 'Stop spending hours cutting silences manually.' },
    { title: 'TikTok Bold Yellow Hook', style: 'bold_yellow', text: 'STOP SPENDING HOURS CUTTING! 🔥' },
    { title: 'Flame Header Glow Box', style: 'box_glow', text: '✦ 5 AI VIDEO WORKFLOWS ✦' },
    { title: 'Clean Minimalist Title', style: 'clean_white', text: 'The 2026 Creator Stack' },
  ];

  // Motion Effects Presets
  const motionEffects = [
    { id: 'shake', name: 'Handheld Camera Shake', icon: Camera, desc: 'Natural organic camera tremor for high energy' },
    { id: 'glitch', name: 'RGB Glitch Aberration', icon: Zap, desc: 'Cyberpunk chromatic split & jitter pulses' },
    { id: 'vhs', name: 'Retro VHS CRT Scanlines', icon: Tv, desc: 'Analog television scanlines with CRT flicker' },
    { id: 'film_grain', name: '35mm Film Grain & Noise', icon: Film, desc: 'Organic vintage silver halide film texture' },
    { id: 'pulse_glow', name: 'Neon Pulse Glow', icon: Sparkles, desc: 'Pulsing lime green backlight glow aura' },
    { id: 'zoom_punch', name: 'Beat Punch Zoom', icon: Activity, desc: 'Rhythmic bass drop punch zoom' },
    { id: 'cinematic_bars', name: '2.39:1 Widescreen Letterbox', icon: Layers, desc: 'Anamorphic Hollywood black cinematic borders' },
    { id: 'none', name: 'Clean (Disable Motion FX)', icon: Check, desc: 'Original unaltered footage without FX' },
  ];

  // Transition Presets
  const transitionsList = [
    { id: 'glitch_cut', name: 'Glitch Strike Cut', desc: 'Fast RGB split burst between shots' },
    { id: 'whip_pan', name: 'Whip Pan Right', desc: 'High-speed directional motion blur' },
    { id: 'zoom_burst', name: 'Cross Zoom Burst', desc: 'Punch in through next cut' },
    { id: 'flash_white', name: 'Flash White Dissolve', desc: 'High-key exposure flash transition' },
    { id: 'cross_dissolve', name: 'Smooth Crossfade', desc: 'Linear opacity cross-dissolve' },
  ];

  // Color Grading LUTs
  const effectPresets = [
    { name: 'Normal / None', filter: 'none', desc: 'Raw camera output' },
    { name: 'Cyberpunk Neon', filter: 'contrast(1.3) saturate(1.4) hue-rotate(-15deg)', desc: 'Punchy magenta & cyan grading' },
    { name: 'Vintage 35mm Film', filter: 'sepia(0.35) contrast(1.15) brightness(0.95)', desc: 'Warm nostalgic tones with film aesthetic' },
    { name: 'High Contrast Viral', filter: 'contrast(1.45) saturate(1.25) brightness(1.02)', desc: 'Punchy blacks and razor-sharp clarity' },
    { name: 'Golden Hour Warmth', filter: 'sepia(0.2) saturate(1.35) brightness(1.05)', desc: 'Sun-drenched golden afternoon look' },
    { name: 'Noir Monochrome', filter: 'grayscale(1) contrast(1.4) brightness(0.95)', desc: 'Classic dramatic black & white grading' },
  ];

  // Real File Upload Handler with browser metadata extraction
  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setProcessingStatus(`Inspecting ${file.name} (reading duration & frames)...`);

      try {
        const isVideo = file.type.startsWith('video');
        const isAudio = file.type.startsWith('audio');
        const isImage = file.type.startsWith('image');
        const fileUrl = URL.createObjectURL(file);

        if (isVideo) {
          const meta = await extractVideoMetadata(file);
          const newMedia: MediaResource = {
            id: `usr-${Date.now()}-${i}`,
            title: file.name,
            type: 'video',
            duration: meta.duration,
            url: fileUrl,
            thumbnailUrl: meta.thumbnailUrl,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          };

          setUserUploadedMedia((prev) => [newMedia, ...prev]);

          onAddClipToTimeline({
            trackId: 'track-video',
            name: file.name,
            type: 'video',
            duration: meta.duration,
            trimStart: 0,
            trimEnd: meta.duration,
            sourceUrl: fileUrl,
            thumbnailUrl: meta.thumbnailUrl,
            scale: 1,
            positionX: 0,
            positionY: 0,
            rotation: 0,
            opacity: 1,
            volume: 1,
            muted: false,
            speed: 1,
            motionEffect: 'none',
          });
        } else if (isAudio) {
          const meta = await extractAudioMetadata(file);
          const newMedia: MediaResource = {
            id: `usr-${Date.now()}-${i}`,
            title: file.name,
            type: 'audio',
            duration: meta.duration,
            url: fileUrl,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          };

          setUserUploadedMedia((prev) => [newMedia, ...prev]);

          onAddClipToTimeline({
            trackId: 'track-audio',
            name: file.name,
            type: 'audio',
            duration: meta.duration,
            trimStart: 0,
            trimEnd: meta.duration,
            sourceUrl: fileUrl,
            scale: 1,
            positionX: 0,
            positionY: 0,
            rotation: 0,
            opacity: 1,
            volume: 1,
            muted: false,
            speed: 1,
            waveform: meta.waveform,
          });
        } else if (isImage) {
          const newMedia: MediaResource = {
            id: `usr-${Date.now()}-${i}`,
            title: file.name,
            type: 'image',
            duration: 10,
            url: fileUrl,
            thumbnailUrl: fileUrl,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          };

          setUserUploadedMedia((prev) => [newMedia, ...prev]);

          onAddClipToTimeline({
            trackId: 'track-video',
            name: file.name,
            type: 'video',
            duration: 10,
            trimStart: 0,
            trimEnd: 10,
            sourceUrl: fileUrl,
            thumbnailUrl: fileUrl,
            scale: 1,
            positionX: 0,
            positionY: 0,
            rotation: 0,
            opacity: 1,
            volume: 1,
            muted: false,
            speed: 1,
          });
        }
      } catch (err) {
        console.error('File ingest error:', err);
      }
    }

    setIsProcessing(false);
    setProcessingStatus('');
  };

  const handleToggleAudioPreview = (url: string) => {
    if (previewAudioUrl === url) {
      if (audioPreviewRef.current) {
        audioPreviewRef.current.pause();
      }
      setPreviewAudioUrl(null);
    } else {
      setPreviewAudioUrl(url);
      if (audioPreviewRef.current) {
        audioPreviewRef.current.src = url;
        audioPreviewRef.current.play().catch(() => {});
      }
    }
  };

  // Filter stickers by search query
  const filteredStickers = stickerCatalog[stickerCategory]?.filter(
    (s) => s.name.toLowerCase().includes(stickerSearch.toLowerCase()) || s.desc.toLowerCase().includes(stickerSearch.toLowerCase())
  ) || [];

  return (
    <div className="card-brutal bg-[#0F1015] p-3 sm:p-4 space-y-3.5 text-left select-none max-h-[820px] overflow-y-auto text-white border-2 border-neutral-800 shadow-xl font-body">
      {/* Hidden audio element for audio preview */}
      <audio ref={audioPreviewRef} onEnded={() => setPreviewAudioUrl(null)} />

      {/* Resource Tab Navigation (CapCut & Canva Style) */}
      <div className="flex items-center gap-1 border-b border-neutral-800 pb-2 text-xs font-display font-bold overflow-x-auto scrollbar-none">
        {[
          { id: 'stickers', label: 'Stickers & GIFs', icon: Smile },
          { id: 'canva', label: 'Canva Layouts', icon: Grid },
          { id: 'ai', label: 'AI Magic', icon: Wand2 },
          { id: 'media', label: 'Media & Upload', icon: FolderOpen },
          { id: 'motion', label: 'Motion FX', icon: Sparkles },
          { id: 'transitions', label: 'Transitions', icon: Zap },
          { id: 'text', label: 'Text & Titles', icon: Type },
          { id: 'audio', label: 'Music & SFX', icon: Music },
          { id: 'effects', label: 'LUTs', icon: Sliders },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-2.5 py-1.5 flex items-center gap-1.5 transition-all border-b-2 -mb-2.5 whitespace-nowrap text-[11px] ${
                isActive
                  ? 'border-[#FF5B37] text-[#FF5B37] font-black bg-neutral-900/60'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: STICKERS, GIF MEMES & BADGES (CapCut & Canva) */}
      {activeTab === 'stickers' && (
        <div className="space-y-3 text-xs">
          {/* Sticker Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search trending stickers, GIFs, memes..."
              value={stickerSearch}
              onChange={(e) => setStickerSearch(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 text-white pl-8 pr-3 py-1.5 text-xs font-mono focus:outline-none focus:border-[#FF5B37]"
            />
          </div>

          {/* Sticker Category Sub-Pills */}
          <div className="flex items-center gap-1 bg-neutral-900 p-1 border border-neutral-800 overflow-x-auto">
            {(['Trending', 'GIFs & Memes', 'Mascots', 'Social', 'Cyber', 'Badges'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setStickerCategory(cat)}
                className={`flex-1 py-1 px-2 text-[10px] font-display font-bold transition-all whitespace-nowrap ${
                  stickerCategory === cat
                    ? 'bg-[#FF5B37] text-white shadow-brutal-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 max-h-[500px] overflow-y-auto pr-1">
            {filteredStickers.map((stk) => (
              <div
                key={stk.id}
                onClick={() => {
                  onAddClipToTimeline({
                    trackId: 'track-watermark',
                    name: stk.name,
                    type: 'graphic',
                    duration: 15,
                    trimStart: 0,
                    trimEnd: 15,
                    sourceUrl: '',
                    scale: 1.2,
                    positionX: 0,
                    positionY: -20,
                    rotation: 0,
                    opacity: 1,
                    volume: 1,
                    muted: false,
                    speed: 1,
                    stickerEmoji: stk.emoji,
                  });
                }}
                className="p-3 border border-neutral-800 bg-[#16181F] hover:bg-neutral-800 cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 shadow-md group hover:border-[#B8FF5C]"
              >
                <span className="text-3xl filter drop-shadow group-hover:scale-110 transition-transform">
                  {stk.emoji}
                </span>
                <span className="font-display font-bold text-[10px] text-center text-neutral-200 truncate w-full">
                  {stk.name}
                </span>
                <span className="px-2 py-0.5 bg-neutral-900 text-[#B8FF5C] border border-neutral-700 text-[8px] font-mono uppercase group-hover:bg-[#B8FF5C] group-hover:text-black">
                  + Add to Canvas
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CANVA QUICK ACTIONS & ALIGNMENT */}
      {activeTab === 'canva' && (
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-neutral-900 border border-neutral-800 space-y-2">
            <span className="font-display font-bold text-xs text-white flex items-center gap-1.5">
              <Grid className="w-4 h-4 text-[#FF5B37]" />
              Canva Precision Alignment
            </span>
            <p className="text-[10px] text-neutral-400 font-mono">
              Align selected sticker, title, or video layer with pixel perfection.
            </p>
            <div className="grid grid-cols-6 gap-1 bg-black p-1.5 border border-neutral-800">
              <button
                onClick={() => onQuickAlign && onQuickAlign('left')}
                className="py-1.5 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                title="Align Left"
              >
                <AlignLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => onQuickAlign && onQuickAlign('center')}
                className="py-1.5 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                title="Align Center Horizontally"
              >
                <AlignCenter className="w-4 h-4" />
              </button>
              <button
                onClick={() => onQuickAlign && onQuickAlign('right')}
                className="py-1.5 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                title="Align Right"
              >
                <AlignRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onQuickAlign && onQuickAlign('top')}
                className="py-1.5 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                title="Align Top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => onQuickAlign && onQuickAlign('middle')}
                className="py-1.5 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                title="Align Middle Vertically"
              >
                <Crosshair className="w-4 h-4 text-[#FF5B37]" />
              </button>
              <button
                onClick={() => onQuickAlign && onQuickAlign('bottom')}
                className="py-1.5 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                title="Align Bottom"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Canva One-Click Layout Presets */}
          <div className="space-y-2">
            <span className="font-display font-bold text-xs text-white flex items-center gap-1.5">
              <Layout className="w-4 h-4 text-[#B8FF5C]" />
              One-Click Canvas Layouts
            </span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'cover', name: 'Full Bleed Cover', desc: 'Fills canvas completely' },
                { id: 'contain', name: 'Letterbox Fit', desc: 'Fits with safe margins' },
                { id: 'split_v', name: '2-Way Split Screen', desc: 'Top/bottom reaction reel' },
                { id: 'pip_tr', name: 'Corner PiP (Avatar)', desc: 'Talking head overlay' },
              ].map((layout) => (
                <div
                  key={layout.id}
                  onClick={() => onApplyLayoutPreset && onApplyLayoutPreset(layout.id as any)}
                  className="p-2.5 bg-[#16181F] border border-neutral-800 hover:border-[#B8FF5C] cursor-pointer transition-all space-y-1"
                >
                  <div className="font-display font-bold text-xs text-white">{layout.name}</div>
                  <div className="text-[10px] text-neutral-400 font-mono">{layout.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Viral Templates */}
          <div className="space-y-2">
            <span className="font-display font-bold text-xs text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Viral Reel Blueprints
            </span>
            <div className="space-y-2">
              {[
                { title: '3s Viral Hook Reel', badge: 'High Retention', desc: 'Punch zoom, flame badge, and kinetic karaoke opener.' },
                { title: 'Podcast Talking Head Clip', badge: 'Multi-Cam', desc: 'Auto subtitles, portrait crop, and waveform audio visualizer.' },
                { title: 'Before & After Reaction Split', badge: 'Reaction', desc: 'Dual-track video comparison with center divider.' },
              ].map((tpl, i) => (
                <div key={i} className="p-2.5 bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-bold text-xs text-white">{tpl.title}</span>
                      <span className="px-1.5 py-0.2 bg-[#B8FF5C] text-black text-[8px] font-mono font-bold uppercase">{tpl.badge}</span>
                    </div>
                    <div className="text-[10px] text-neutral-400 font-mono">{tpl.desc}</div>
                  </div>
                  <button
                    onClick={() => onTriggerAiAutoSubtitles && onTriggerAiAutoSubtitles()}
                    className="px-2 py-1 bg-[#FF5B37] text-white font-display font-bold text-[10px] shrink-0"
                  >
                    Load
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AI MAGIC TOOLS */}
      {activeTab === 'ai' && (
        <div className="space-y-3.5 text-xs">
          <div className="flex items-center justify-between pb-1 border-b border-neutral-800">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
              AI Intelligent Video Engines
            </span>
            <span className="px-1.5 py-0.5 bg-[#B8FF5C] border border-neutral-800 text-[9px] font-mono font-black uppercase text-black">
              WebCodecs AI
            </span>
          </div>

          <div className="space-y-2.5">
            {/* Auto Subtitles */}
            <div className="p-3 border border-neutral-800 bg-neutral-900 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-xs text-white flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-[#FF5B37]" />
                  Whisper Auto-Captions
                </span>
                <button
                  onClick={() => {
                    if (onTriggerAiAutoSubtitles) onTriggerAiAutoSubtitles();
                    else alert('AI Auto-Captions generated with Whisper Web Engine!');
                  }}
                  className="px-2.5 py-1 bg-[#B8FF5C] hover:bg-[#a6ee47] text-black font-display font-bold text-[10px] shadow-sm"
                >
                  ⚡ Generate
                </button>
              </div>
              <p className="text-[10px] text-neutral-400 font-mono">
                Whisper AI auto-transcription with synchronized Karaoke neon glow words.
              </p>
            </div>

            {/* Smart Background Removal with Edge Glow Color */}
            <div className="p-3 border border-neutral-800 bg-neutral-900 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-xs text-white flex items-center gap-1.5">
                  <Wand2 className="w-4 h-4 text-purple-400" />
                  AI Smart Cutout (Green Screen)
                </span>
                <button
                  onClick={() => {
                    if (onTriggerAiCutout) onTriggerAiCutout(aiCutoutGlow);
                    else alert('Smart Cutout toggled on active footage layer!');
                  }}
                  className="px-2.5 py-1 bg-[#FF5B37] hover:bg-[#ff4921] text-white font-display font-bold text-[10px]"
                >
                  Apply Cutout
                </button>
              </div>
              <p className="text-[10px] text-neutral-400 font-mono">
                Segment subject without green screen; replace background with custom aura.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] font-mono text-neutral-400">Glow Aura:</span>
                {['#B8FF5C', '#FF5B37', '#00F0FF', '#A855F7', '#FFFFFF'].map((col) => (
                  <button
                    key={col}
                    onClick={() => {
                      setAiCutoutGlow(col);
                      if (onTriggerAiCutout) onTriggerAiCutout(col);
                    }}
                    className={`w-4 h-4 rounded-full border ${aiCutoutGlow === col ? 'ring-2 ring-white scale-110' : 'border-neutral-700'}`}
                    style={{ backgroundColor: col }}
                  />
                ))}
              </div>
            </div>

            {/* MediaPipe Face Tracking */}
            <div className="p-3 border border-neutral-800 bg-neutral-900 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-xs text-white flex items-center gap-1.5">
                  <Scan className="w-4 h-4 text-[#4D9FFF]" />
                  MediaPipe Face & Object Tracking
                </span>
                <span className="px-2 py-0.5 bg-neutral-800 text-[#B8FF5C] border border-neutral-700 text-[9px] font-mono font-bold">
                  60 FPS Lock
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 font-mono">
                Attach stickers and blur circles to follow moving human faces in real time.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MEDIA POOL & UPLOAD */}
      {activeTab === 'media' && (
        <div className="space-y-4">
          <label 
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              handleFiles(e.dataTransfer.files);
            }}
            className={`w-full p-4 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer text-center space-y-1.5 transition-all ${
              isDragOver ? 'border-[#B8FF5C] bg-neutral-900' : 'border-neutral-700 hover:border-[#FF5B37] bg-neutral-950'
            }`}
          >
            <input
              type="file"
              accept="video/*,audio/*,image/*"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />
            {isProcessing ? (
              <div className="flex flex-col items-center gap-1 text-[#FF5B37]">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="font-mono text-[11px] font-bold">{processingStatus}</span>
              </div>
            ) : (
              <>
                <Upload className="w-6 h-6 text-[#FF5B37]" />
                <div className="font-display font-bold text-xs text-white">
                  Drop Files or Browse Local Media
                </div>
                <div className="text-[10px] text-neutral-500 font-mono">
                  MP4, MOV, WebM, MP3, WAV, PNG, JPG, GIF
                </div>
              </>
            )}
          </label>

          {/* User Uploaded Media Section */}
          {userUploadedMedia.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#FF5B37] flex items-center gap-1">
                <Film className="w-3 h-3" /> Your Media Vault ({userUploadedMedia.length})
              </span>
              <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                {userUploadedMedia.map((media) => (
                  <div
                    key={media.id}
                    className="p-2 border border-neutral-800 bg-neutral-900 flex items-center justify-between gap-2 text-xs"
                  >
                    {media.thumbnailUrl ? (
                      <img
                        src={media.thumbnailUrl}
                        alt=""
                        className="w-12 h-8 object-cover border border-neutral-700 shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-8 bg-black border border-neutral-700 flex items-center justify-center text-white shrink-0 font-mono text-[9px]">
                        AUD
                      </div>
                    )}
                    <div className="flex-1 truncate">
                      <div className="font-display font-bold text-xs truncate text-white">{media.title}</div>
                      <div className="text-[10px] text-neutral-400 font-mono">{media.duration}s · {media.size}</div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() =>
                          onAddClipToTimeline({
                            trackId: media.type === 'audio' ? 'track-audio' : 'track-video',
                            name: media.title,
                            type: media.type === 'audio' ? 'audio' : 'video',
                            duration: media.duration,
                            trimStart: 0,
                            trimEnd: media.duration,
                            sourceUrl: media.url,
                            thumbnailUrl: media.thumbnailUrl,
                            scale: 1,
                            positionX: 0,
                            positionY: 0,
                            rotation: 0,
                            opacity: 1,
                            volume: 1,
                            muted: false,
                            speed: 1,
                            waveform: media.type === 'audio' ? generateSyntheticWaveform(40) : undefined,
                          })
                        }
                        className="px-2 py-1 bg-[#B8FF5C] hover:bg-[#a6f047] text-black font-display font-bold text-[10px]"
                        title="Add to Track V1 / A1"
                      >
                        + V1
                      </button>
                      {media.type !== 'audio' && (
                        <button
                          onClick={() =>
                            onAddClipToTimeline({
                              trackId: 'track-overlay',
                              name: `${media.title} (Overlay)`,
                              type: 'video',
                              duration: media.duration,
                              trimStart: 0,
                              trimEnd: media.duration,
                              sourceUrl: media.url,
                              thumbnailUrl: media.thumbnailUrl,
                              scale: 0.8,
                              positionX: 40,
                              positionY: -40,
                              rotation: 0,
                              opacity: 1,
                              volume: 0,
                              muted: true,
                              speed: 1,
                              pipLayout: 'pip_tr',
                            })
                          }
                          className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-white font-display font-bold text-[10px] border border-neutral-700"
                          title="Add as Picture-in-Picture (Track V2)"
                        >
                          + PiP
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stock Clips */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
              HD Stock Video Samples (Playable)
            </span>
            <div className="space-y-2">
              {stockClips.map((clip) => (
                <div
                  key={clip.id}
                  className="p-2 border border-neutral-800 bg-neutral-900 flex items-center justify-between gap-3 text-xs"
                >
                  <img
                    src={clip.thumbnailUrl}
                    alt=""
                    className="w-12 h-8 object-cover border border-neutral-700 shrink-0"
                  />
                  <div className="flex-1 truncate">
                    <div className="font-display font-bold text-xs truncate text-white">{clip.title}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">{clip.duration}s • MP4 HD</div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() =>
                        onAddClipToTimeline({
                          trackId: 'track-video',
                          name: clip.title,
                          type: 'video',
                          duration: clip.duration,
                          trimStart: 0,
                          trimEnd: clip.duration,
                          sourceUrl: clip.url,
                          thumbnailUrl: clip.thumbnailUrl,
                          scale: 1,
                          positionX: 0,
                          positionY: 0,
                          rotation: 0,
                          opacity: 1,
                          volume: 1,
                          muted: false,
                          speed: 1,
                        })
                      }
                      className="px-2 py-1 bg-white hover:bg-[#FF5B37] text-black hover:text-white font-display font-bold text-[10px] transition-all"
                    >
                      + Add
                    </button>
                    <button
                      onClick={() =>
                        onAddClipToTimeline({
                          trackId: 'track-overlay',
                          name: `${clip.title} (PiP)`,
                          type: 'video',
                          duration: clip.duration,
                          trimStart: 0,
                          trimEnd: clip.duration,
                          sourceUrl: clip.url,
                          thumbnailUrl: clip.thumbnailUrl,
                          scale: 0.8,
                          positionX: 30,
                          positionY: -30,
                          rotation: 0,
                          opacity: 1,
                          volume: 0,
                          muted: true,
                          speed: 1,
                          pipLayout: 'pip_tr',
                        })
                      }
                      className="px-1.5 py-1 bg-neutral-800 text-neutral-300 font-mono text-[9px] border border-neutral-700"
                      title="Add as Picture-in-Picture Overlay"
                    >
                      PiP
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MOTION FX */}
      {activeTab === 'motion' && (
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between pb-1 border-b border-neutral-800">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
              Active Motion FX Engine
            </span>
            <span className="px-1.5 py-0.5 bg-[#B8FF5C] border border-neutral-800 text-[9px] font-mono font-black uppercase text-black">
              Live Preview
            </span>
          </div>

          <div className="space-y-2">
            {motionEffects.map((fx) => {
              const Icon = fx.icon;
              const isSelected = activeMotionFx === fx.id;
              return (
                <div
                  key={fx.id}
                  onClick={() => {
                    setActiveMotionFx(fx.id);
                    if (onApplyMotionEffect) {
                      onApplyMotionEffect(fx.id as any);
                    }
                  }}
                  className={`p-2.5 border cursor-pointer transition-all flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-[#B8FF5C]'
                      : 'bg-[#16181F] text-neutral-300 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <div className={`w-7 h-7 border border-neutral-700 flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#FF5B37] text-white' : 'bg-black text-neutral-300'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="font-display font-bold text-xs truncate text-white">{fx.name}</div>
                      <div className="text-[10px] truncate text-neutral-400">
                        {fx.desc}
                      </div>
                    </div>
                  </div>

                  <button
                    className={`px-2 py-1 text-[10px] font-display font-bold border shrink-0 ${
                      isSelected
                        ? 'bg-[#B8FF5C] text-black border-white'
                        : 'bg-neutral-800 text-white border-neutral-700'
                    }`}
                  >
                    {isSelected ? 'Active' : 'Apply'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 6: TRANSITIONS */}
      {activeTab === 'transitions' && (
        <div className="space-y-3 text-xs">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
            Cut Transitions (Seamless In-Between Clips)
          </span>

          <div className="space-y-2">
            {transitionsList.map((tr) => (
              <div
                key={tr.id}
                className="p-2.5 border border-neutral-800 bg-[#16181F] flex items-center justify-between gap-2"
              >
                <div>
                  <div className="font-display font-bold text-xs text-white">{tr.name}</div>
                  <div className="text-[10px] text-neutral-400">{tr.desc}</div>
                </div>

                <button
                  onClick={() => {
                    if (onApplyTransition) onApplyTransition(tr.id);
                  }}
                  className="px-2.5 py-1 bg-[#4D9FFF] hover:bg-sky-400 text-black font-display font-bold text-[10px] flex items-center gap-1 shrink-0"
                >
                  <Zap className="w-3 h-3" /> Apply
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: TEXT & TITLES */}
      {activeTab === 'text' && (
        <div className="space-y-2 text-xs">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
            Subtitle & Caption Presets
          </span>
          <div className="space-y-2">
            {textPresets.map((txt, idx) => (
              <div
                key={idx}
                className="p-3 border border-neutral-800 bg-neutral-900 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-xs text-white">{txt.title}</span>
                  <button
                    onClick={() =>
                      onAddClipToTimeline({
                        trackId: 'track-text',
                        name: txt.title,
                        type: 'text',
                        duration: 10,
                        trimStart: 0,
                        trimEnd: 10,
                        sourceUrl: '',
                        scale: 1,
                        positionX: 0,
                        positionY: 0,
                        rotation: 0,
                        opacity: 1,
                        volume: 1,
                        muted: false,
                        speed: 1,
                        textContent: txt.text,
                        captionStyle: txt.style as any,
                      })
                    }
                    className="px-2 py-0.5 bg-[#B8FF5C] text-black font-display font-bold text-[10px]"
                  >
                    + Insert
                  </button>
                </div>
                <div className="text-[11px] text-neutral-300 bg-black p-2 border border-neutral-800 font-mono">
                  "{txt.text}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: MUSIC & SOUND EFFECTS */}
      {activeTab === 'audio' && (
        <div className="space-y-3 text-xs">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
            Royalty-Free Music & Sound Effects (SFX)
          </span>
          <div className="space-y-2">
            {stockAudio.map((track, i) => (
              <div
                key={i}
                className="p-2.5 border border-neutral-800 bg-neutral-900 flex items-center justify-between text-xs font-bold"
              >
                <div className="flex items-center gap-2 truncate">
                  <button
                    onClick={() => handleToggleAudioPreview(track.url)}
                    className="w-6 h-6 rounded-full bg-black border border-neutral-700 flex items-center justify-center text-white hover:text-[#B8FF5C] shrink-0"
                    title={previewAudioUrl === track.url ? 'Pause Preview' : 'Play Preview'}
                  >
                    {previewAudioUrl === track.url ? (
                      <Pause className="w-3 h-3 fill-current" />
                    ) : (
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    )}
                  </button>
                  <div className="truncate">
                    <div className="text-white text-xs truncate">{track.name}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">{track.duration}s • {track.type.toUpperCase()}</div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    onAddClipToTimeline({
                      trackId: 'track-audio',
                      name: track.name,
                      type: 'audio',
                      duration: track.duration,
                      trimStart: 0,
                      trimEnd: track.duration,
                      sourceUrl: track.url,
                      scale: 1,
                      positionX: 0,
                      positionY: 0,
                      rotation: 0,
                      opacity: 1,
                      volume: 0.8,
                      muted: false,
                      speed: 1,
                      waveform: generateSyntheticWaveform(40),
                    })
                  }
                  className="px-2 py-1 bg-[#4D9FFF] hover:bg-sky-400 text-black font-display font-bold text-[10px] flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 9: COLOR GRADING LUTS */}
      {activeTab === 'effects' && (
        <div className="space-y-2 text-xs">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400">
            Color Grading LUTs & Filters
          </span>
          <div className="space-y-2">
            {effectPresets.map((eff, idx) => (
              <div
                key={idx}
                className="p-2.5 border border-neutral-800 bg-neutral-900 flex items-center justify-between"
              >
                <div>
                  <div className="font-display font-bold text-xs text-white">{eff.name}</div>
                  <div className="text-[10px] text-neutral-400">{eff.desc}</div>
                </div>
                <button
                  onClick={() => {
                    if (onApplyFilter) {
                      onApplyFilter(eff.filter);
                    }
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-[#FF5B37] text-black hover:text-white font-display font-bold text-[10px] transition-all"
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
