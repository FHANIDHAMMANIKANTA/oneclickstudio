export type TrackType = 'video' | 'audio' | 'text' | 'graphic';

export type AspectRatio = '9:16' | '16:9' | '1:1' | '4:5';

export interface Keyframe {
  id: string;
  time: number; // in seconds relative to timeline or clip start
  scale?: number;
  positionX?: number;
  positionY?: number;
  rotation?: number;
  opacity?: number;
}

export interface TimelineClip {
  id: string;
  trackId: string;
  name: string;
  type: 'video' | 'audio' | 'text' | 'graphic';
  startTime: number; // in seconds
  duration: number; // in seconds
  trimStart: number;
  trimEnd: number;
  sourceUrl: string;
  thumbnailUrl?: string;
  
  // Visual / Audio properties
  scale: number; // 1 = 100%
  positionX: number;
  positionY: number;
  rotation: number;
  opacity: number; // 0 to 1
  volume: number; // 0 to 2
  muted: boolean;
  speed: number; // 0.5 to 2
  isReversed?: boolean;
  speedRamp?: 'linear' | 'ease_in' | 'flash_in_out' | 'hero';
  waveform?: number[];
  filterStyle?: string;
  
  // Color Grading Sliders
  brightness?: number; // 0.5 to 1.5, default 1
  contrast?: number;   // 0.5 to 1.5, default 1
  saturate?: number;   // 0 to 2, default 1
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  blendMode?: 'normal' | 'screen' | 'multiply' | 'overlay' | 'lighten';
  fadeIn?: number;     // seconds
  fadeOut?: number;    // seconds
  isFrozen?: boolean;
  pipLayout?: 'full' | 'contain' | 'split_v' | 'pip_tr' | 'pip_br';

  // Keyframe Animation System (Premiere / CapCut)
  keyframes?: Keyframe[];
  
  // AI Tools
  isAiCutout?: boolean;
  cutoutGlowColor?: string; // e.g. '#B8FF5C', '#FF5B37', '#00F0FF'
  aiTrackingTarget?: 'face' | 'object' | 'none';
  voiceEnhanced?: boolean;

  // Motion & Animation properties
  motionEffect?: 'none' | 'glitch' | 'shake' | 'vhs' | 'film_grain' | 'pulse_glow' | 'zoom_punch' | 'cinematic_bars';
  introAnimation?: 'none' | 'pop_in' | 'slide_up' | 'glitch_strike' | 'zoom_in' | 'bouncy_drop';
  outroAnimation?: 'none' | 'fade_out' | 'shrink_out' | 'slide_down';
  loopAnimation?: 'none' | 'breathe' | 'handheld' | 'subtle_shake' | 'float';
  transitionIn?: 'none' | 'cross_dissolve' | 'glitch_cut' | 'whip_pan' | 'zoom_burst' | 'flash_white';
  transitionDuration?: number;

  // Stickers / Graphics
  stickerEmoji?: string;
  stickerUrl?: string;
  stickerCategory?: string;
  isAnimatedSticker?: boolean;

  // Text specific
  textContent?: string;
  textColor?: string;
  fontSize?: number;
  captionStyle?: 'karaoke' | 'bold_yellow' | 'box_glow' | 'clean_white';
}

export interface TimelineTrack {
  id: string;
  name: string;
  type: TrackType;
  clips: TimelineClip[];
  muted: boolean;
  hidden: boolean;
  locked: boolean;
}

export interface MediaResource {
  id: string;
  title: string;
  type: 'video' | 'audio' | 'image';
  duration: number;
  url: string;
  thumbnailUrl?: string;
  size?: string;
}

export interface StickerItem {
  id: string;
  name: string;
  category: 'Trending' | 'GIFs & Memes' | 'Mascots' | 'Social' | 'Cyber' | 'Badges';
  emoji?: string;
  url?: string;
  isAnimated?: boolean;
}

export interface SoundEffectItem {
  id: string;
  title: string;
  category: 'Whoosh' | 'Impact' | 'UI' | 'Fun';
  duration: number;
  url: string;
  bpm?: number;
}

export interface ExportConfig {
  resolution: '720p' | '1080p' | '4k';
  fps: 24 | 30 | 60;
  format: 'mp4' | 'webm' | 'gif' | 'mp3';
  quality: 'standard' | 'high' | 'prores';
}

export interface CanvasPreset {
  id: AspectRatio;
  label: string;
  width: number;
  height: number;
  ratioStr: string;
}

export const CANVAS_PRESETS: Record<AspectRatio, CanvasPreset> = {
  '9:16': { id: '9:16', label: 'Vertical (Reels/Shorts/TikTok)', width: 1080, height: 1920, ratioStr: '9:16' },
  '16:9': { id: '16:9', label: 'Widescreen (YouTube)', width: 1920, height: 1080, ratioStr: '16:9' },
  '1:1': { id: '1:1', label: 'Square (Instagram)', width: 1080, height: 1080, ratioStr: '1:1' },
  '4:5': { id: '4:5', label: 'Portrait (Social Feed)', width: 1080, height: 1350, ratioStr: '4:5' },
};
