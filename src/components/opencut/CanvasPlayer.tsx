import React, { useRef, useEffect, useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Volume2, 
  VolumeX, 
  FastForward, 
  Rewind, 
  Flame, 
  Sparkles, 
  Move, 
  RotateCw, 
  Diamond, 
  Trash2, 
  Copy, 
  Scan, 
  ShieldCheck, 
  Check,
  Grid,
  Layers,
  ChevronLeft,
  ChevronRight,
  FlipHorizontal,
  FlipVertical,
  Crosshair,
  Sliders
} from 'lucide-react';
import { AspectRatio, TimelineClip, CANVAS_PRESETS } from './types';

interface CanvasPlayerProps {
  currentTime: number;
  totalDuration: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  aspectRatio: AspectRatio;
  onAspectRatioChange: (ratio: AspectRatio) => void;
  activeVideoClip?: TimelineClip;
  activeOverlayClip?: TimelineClip;
  activeSubtitleClip?: TimelineClip;
  activeWatermarkClip?: TimelineClip;
  activeStickerClips?: TimelineClip[];
  activeAudioClip?: TimelineClip;
  selectedClip?: TimelineClip | null;
  onUpdateSelectedClip?: (updated: TimelineClip) => void;
  onSelectClip?: (clip: TimelineClip | null) => void;
  smartReframe: boolean;
  onToggleSmartReframe: () => void;
  playbackSpeed?: number;
  onChangeSpeed?: (speed: number) => void;
  onAddKeyframeAtPlayhead?: () => void;
}

export const CanvasPlayer: React.FC<CanvasPlayerProps> = ({
  currentTime,
  totalDuration,
  isPlaying,
  onTogglePlay,
  onSeek,
  aspectRatio,
  onAspectRatioChange,
  activeVideoClip,
  activeOverlayClip,
  activeSubtitleClip,
  activeWatermarkClip,
  activeStickerClips = [],
  activeAudioClip,
  selectedClip,
  onUpdateSelectedClip,
  onSelectClip,
  smartReframe,
  onToggleSmartReframe,
  playbackSpeed = 1,
  onChangeSpeed,
  onAddKeyframeAtPlayhead,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayVideoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showSafeMargins, setShowSafeMargins] = useState(false);
  const [canvasZoom, setCanvasZoom] = useState<'fit' | '100%' | '125%'>('fit');

  // Audio dB Meters animation state
  const [meterL, setMeterL] = useState(0.4);
  const [meterR, setMeterR] = useState(0.35);

  // Dragging state for Canvas Bounding Box
  const [isDraggingElement, setIsDraggingElement] = useState(false);
  const [dragMode, setDragMode] = useState<'move' | 'scale' | 'rotate' | null>(null);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [initialClipProps, setInitialClipProps] = useState({ posX: 0, posY: 0, scale: 1, rot: 0 });
  const [snapGuideX, setSnapGuideX] = useState(false);
  const [snapGuideY, setSnapGuideY] = useState(false);

  const preset = CANVAS_PRESETS[aspectRatio];

  // Helper to format time as SMPTE timecode 00:00:00:00
  const formatTimecode = (seconds: number) => {
    const s = Math.max(0, seconds);
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    const frames = Math.floor((s % 1) * 30);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
  };

  // Canvas viewport sizing based on aspect ratio
  const getViewportDimensions = () => {
    const zoomMultiplier = canvasZoom === '125%' ? 1.25 : 1;
    switch (aspectRatio) {
      case '9:16':
        return { width: Math.round(270 * zoomMultiplier), height: Math.round(480 * zoomMultiplier) };
      case '16:9':
        return { width: Math.round(480 * zoomMultiplier), height: Math.round(270 * zoomMultiplier) };
      case '1:1':
        return { width: Math.round(360 * zoomMultiplier), height: Math.round(360 * zoomMultiplier) };
      case '4:5':
        return { width: Math.round(300 * zoomMultiplier), height: Math.round(375 * zoomMultiplier) };
      default:
        return { width: Math.round(270 * zoomMultiplier), height: Math.round(480 * zoomMultiplier) };
    }
  };

  const viewportDims = getViewportDimensions();

  // Determine if active clip is a video vs image
  const isVideoSource = activeVideoClip?.sourceUrl?.match(/\.(mp4|webm|ogg|mov)($|\?)/i) || 
    activeVideoClip?.sourceUrl?.startsWith('blob:') || 
    activeVideoClip?.type === 'video';

  // Keyframe Interpolation Engine (Premiere / CapCut)
  const interpolateTransform = (clip?: TimelineClip) => {
    if (!clip) return { scale: 1, positionX: 0, positionY: 0, rotation: 0, opacity: 1 };
    
    const base = {
      scale: clip.scale ?? 1,
      positionX: clip.positionX ?? 0,
      positionY: clip.positionY ?? 0,
      rotation: clip.rotation ?? 0,
      opacity: clip.opacity ?? 1,
    };

    if (!clip.keyframes || clip.keyframes.length === 0) return base;

    const kfs = [...clip.keyframes].sort((a, b) => a.time - b.time);
    const relTime = currentTime - clip.startTime;

    if (relTime <= kfs[0].time) {
      return {
        scale: kfs[0].scale ?? base.scale,
        positionX: kfs[0].positionX ?? base.positionX,
        positionY: kfs[0].positionY ?? base.positionY,
        rotation: kfs[0].rotation ?? base.rotation,
        opacity: kfs[0].opacity ?? base.opacity,
      };
    }

    if (relTime >= kfs[kfs.length - 1].time) {
      const last = kfs[kfs.length - 1];
      return {
        scale: last.scale ?? base.scale,
        positionX: last.positionX ?? base.positionX,
        positionY: last.positionY ?? base.positionY,
        rotation: last.rotation ?? base.rotation,
        opacity: last.opacity ?? base.opacity,
      };
    }

    for (let i = 0; i < kfs.length - 1; i++) {
      const k1 = kfs[i];
      const k2 = kfs[i + 1];
      if (relTime >= k1.time && relTime <= k2.time) {
        const span = k2.time - k1.time;
        const progress = span > 0 ? (relTime - k1.time) / span : 0;
        const smooth = progress * progress * (3 - 2 * progress); // smooth cubic curve
        return {
          scale: (k1.scale ?? base.scale) + ((k2.scale ?? base.scale) - (k1.scale ?? base.scale)) * smooth,
          positionX: (k1.positionX ?? base.positionX) + ((k2.positionX ?? base.positionX) - (k1.positionX ?? base.positionX)) * smooth,
          positionY: (k1.positionY ?? base.positionY) + ((k2.positionY ?? base.positionY) - (k1.positionY ?? base.positionY)) * smooth,
          rotation: (k1.rotation ?? base.rotation) + ((k2.rotation ?? base.rotation) - (k1.rotation ?? base.rotation)) * smooth,
          opacity: (k1.opacity ?? base.opacity) + ((k2.opacity ?? base.opacity) - (k1.opacity ?? base.opacity)) * smooth,
        };
      }
    }
    return base;
  };

  const videoTransform = interpolateTransform(activeVideoClip);
  const overlayTransform = interpolateTransform(activeOverlayClip);

  // Synchronize HTML5 Video element playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch((err) => console.log('Video play deferred:', err));
        });
      }
    } else {
      video.pause();
    }
  }, [isPlaying, activeVideoClip?.sourceUrl]);

  // Synchronize overlay video element
  useEffect(() => {
    const ov = overlayVideoRef.current;
    if (!ov) return;
    if (isPlaying) {
      ov.play().catch(() => {});
    } else {
      ov.pause();
    }
  }, [isPlaying, activeOverlayClip?.sourceUrl]);

  // Synchronize HTML5 Video seeking
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeVideoClip) return;

    const clipLocalTime = Math.max(0, (currentTime - activeVideoClip.startTime) + (activeVideoClip.trimStart || 0));
    if (Math.abs(video.currentTime - clipLocalTime) > 0.2) {
      video.currentTime = clipLocalTime;
    }
  }, [currentTime, activeVideoClip]);

  // Stereo dB meter simulation when audio is playing
  useEffect(() => {
    if (!isPlaying) {
      setMeterL(0.08);
      setMeterR(0.06);
      return;
    }
    const interval = setInterval(() => {
      setMeterL(0.35 + Math.random() * 0.55);
      setMeterR(0.3 + Math.random() * 0.6);
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Volume & Speed settings
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume * (activeVideoClip?.volume ?? 1);
      videoRef.current.playbackRate = (activeVideoClip?.speed || 1) * playbackSpeed;
    }
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume * (activeAudioClip?.volume ?? 0.8);
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [volume, isMuted, activeVideoClip, activeAudioClip, playbackSpeed]);

  // Interactive Bounding Box Dragging Logic with Canva Snapping Guidelines
  const handleBoxMouseDown = (e: React.MouseEvent, mode: 'move' | 'scale' | 'rotate') => {
    e.stopPropagation();
    if (!selectedClip || !onUpdateSelectedClip) return;

    setIsDraggingElement(true);
    setDragMode(mode);
    setDragStartPos({ x: e.clientX, y: e.clientY });
    setInitialClipProps({
      posX: selectedClip.positionX || 0,
      posY: selectedClip.positionY || 0,
      scale: selectedClip.scale || 1,
      rot: selectedClip.rotation || 0,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingElement || !selectedClip || !onUpdateSelectedClip || !dragMode) return;

      const dx = e.clientX - dragStartPos.x;
      const dy = e.clientY - dragStartPos.y;

      if (dragMode === 'move') {
        let newX = Math.round(initialClipProps.posX + dx);
        let newY = Math.round(initialClipProps.posY + dy);

        // Canva Smart Snapping to Center (within 12px threshold)
        if (Math.abs(newX) < 12) {
          newX = 0;
          setSnapGuideX(true);
        } else {
          setSnapGuideX(false);
        }

        if (Math.abs(newY) < 12) {
          newY = 0;
          setSnapGuideY(true);
        } else {
          setSnapGuideY(false);
        }

        onUpdateSelectedClip({
          ...selectedClip,
          positionX: newX,
          positionY: newY,
        });
      } else if (dragMode === 'scale') {
        const factor = 1 + (dx + dy) / 180;
        const newScale = Math.max(0.2, Math.min(3.0, Math.round(initialClipProps.scale * factor * 100) / 100));
        onUpdateSelectedClip({
          ...selectedClip,
          scale: newScale,
        });
      } else if (dragMode === 'rotate') {
        const newRot = Math.round((initialClipProps.rot + dx * 0.8) % 360);
        onUpdateSelectedClip({
          ...selectedClip,
          rotation: newRot,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDraggingElement(false);
      setDragMode(null);
      setSnapGuideX(false);
      setSnapGuideY(false);
    };

    if (isDraggingElement) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingElement, dragMode, dragStartPos, initialClipProps, selectedClip, onUpdateSelectedClip]);

  // Keyboard shortcut for spacebar play/pause & arrow frame seeking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        onTogglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        onSeek(Math.max(0, currentTime - (e.shiftKey ? 1 : 0.033))); // frame step
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        onSeek(Math.min(totalDuration, currentTime + (e.shiftKey ? 1 : 0.033))); // frame step
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        setIsMuted((prev) => !prev);
      } else if (e.code === 'KeyK' && onAddKeyframeAtPlayhead) {
        e.preventDefault();
        onAddKeyframeAtPlayhead();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onTogglePlay, currentTime, totalDuration, onSeek, onAddKeyframeAtPlayhead]);

  // Calculate karaoke highlighted word index
  const getKaraokeWords = () => {
    if (!activeSubtitleClip || !activeSubtitleClip.textContent) return null;
    const words = activeSubtitleClip.textContent.split(' ');
    const clipProgress = Math.max(0, Math.min(1, (currentTime - activeSubtitleClip.startTime) / Math.max(1, activeSubtitleClip.duration)));
    const activeWordIndex = Math.min(words.length - 1, Math.floor(clipProgress * words.length));
    return { words, activeWordIndex };
  };

  const karaokeData = getKaraokeWords();

  // Motion effect class resolver
  const getMotionEffectClass = () => {
    switch (activeVideoClip?.motionEffect) {
      case 'glitch': return 'fx-glitch';
      case 'shake': return 'fx-shake';
      case 'vhs': return 'fx-vhs';
      case 'film_grain': return 'fx-film-grain';
      case 'pulse_glow': return 'fx-pulse-glow';
      case 'zoom_punch': return 'fx-zoom-punch';
      case 'cinematic_bars': return 'fx-cinematic-bars';
      default: return '';
    }
  };

  const getLoopAnimClass = () => {
    switch (activeVideoClip?.loopAnimation) {
      case 'breathe': return 'anim-breathe';
      case 'float': return 'anim-float';
      case 'handheld': return 'fx-shake';
      case 'subtle_shake': return 'fx-shake';
      default: return '';
    }
  };

  // Check if selected clip has a keyframe at current time
  const hasKeyframeAtCurrent = selectedClip?.keyframes?.some(
    (k) => Math.abs(k.time - (currentTime - (selectedClip?.startTime || 0))) < 0.25
  );

  // Compute composite CSS filter for main video
  const computeVideoFilters = () => {
    const filters = [];
    if (activeVideoClip?.filterStyle && activeVideoClip.filterStyle !== 'none') {
      filters.push(activeVideoClip.filterStyle);
    }
    if (activeVideoClip?.brightness !== undefined && activeVideoClip.brightness !== 1) {
      filters.push(`brightness(${activeVideoClip.brightness})`);
    }
    if (activeVideoClip?.contrast !== undefined && activeVideoClip.contrast !== 1) {
      filters.push(`contrast(${activeVideoClip.contrast})`);
    }
    if (activeVideoClip?.saturate !== undefined && activeVideoClip.saturate !== 1) {
      filters.push(`saturate(${activeVideoClip.saturate})`);
    }
    return filters.length > 0 ? filters.join(' ') : 'none';
  };

  return (
    <div className="card-brutal bg-[#0D0E12] p-3 sm:p-4 flex flex-col justify-between h-full min-h-[540px] relative overflow-hidden text-white select-none border-2 border-neutral-800 shadow-2xl">
      {/* 1. Top HUD Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-neutral-300 flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-[#B8FF5C] pulse-live' : 'bg-neutral-500'}`} />
            {preset.width} × {preset.height} ({aspectRatio}) • 60 FPS
          </span>

          <span className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 text-[10px] font-mono text-[#B8FF5C] uppercase font-bold">
            WebCodecs HW
          </span>

          {/* AI Cutout Status Badge */}
          {activeVideoClip?.isAiCutout && (
            <span 
              className="px-2 py-0.5 text-[#0A0A0A] border border-white text-[10px] font-mono font-black uppercase flex items-center gap-1"
              style={{ backgroundColor: activeVideoClip.cutoutGlowColor || '#B8FF5C' }}
            >
              <ShieldCheck className="w-3 h-3" />
              AI CUTOUT
            </span>
          )}

          {/* Active Motion Effect Badge */}
          {activeVideoClip?.motionEffect && activeVideoClip.motionEffect !== 'none' && (
            <span className="px-2 py-0.5 bg-[#FF5B37] text-white border border-white text-[10px] font-mono font-black uppercase flex items-center gap-1 shadow-brutal-sm">
              <Sparkles className="w-3 h-3" />
              FX: {activeVideoClip.motionEffect.replace('_', ' ')}
            </span>
          )}
        </div>

        {/* Floating Contextual Keyframe, Safe Zones & Aspect Ratio Bar */}
        <div className="flex items-center gap-2">
          {/* Safe Margins Toggle (Canva / TikTok / Reels Overlay) */}
          <button
            onClick={() => setShowSafeMargins(!showSafeMargins)}
            className={`px-2 py-0.5 border text-[10px] font-mono font-bold uppercase transition-all flex items-center gap-1 ${
              showSafeMargins
                ? 'bg-[#FF5B37] text-white border-white shadow-brutal-sm'
                : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:text-white'
            }`}
            title="Toggle TikTok / Reels Safe Margins Overlay"
          >
            <Grid className="w-3 h-3" />
            <span>Safe Zones {showSafeMargins ? 'ON' : 'OFF'}</span>
          </button>

          {/* Keyframe Diamond Button */}
          {selectedClip && onAddKeyframeAtPlayhead && (
            <button
              onClick={onAddKeyframeAtPlayhead}
              className={`px-2 py-0.5 text-[10px] font-mono font-black border flex items-center gap-1 transition-all ${
                hasKeyframeAtCurrent
                  ? 'bg-[#B8FF5C] text-[#0A0A0A] border-white font-bold'
                  : 'bg-neutral-900 text-neutral-300 border-neutral-700 hover:text-white hover:border-white'
              }`}
              title="Add / Remove Keyframe at Playhead (Premiere ◆ / Press K)"
            >
              <Diamond className="w-3 h-3 fill-current" />
              <span>Keyframe (K)</span>
            </button>
          )}

          <button
            onClick={onToggleSmartReframe}
            className={`px-2 py-0.5 border text-[10px] font-mono font-bold uppercase transition-colors ${
              smartReframe
                ? 'bg-[#B8FF5C] text-[#0A0A0A] border-white font-bold'
                : 'bg-neutral-800 text-neutral-400 border-neutral-700'
            }`}
            title="Auto-centers subject when aspect ratio changes"
          >
            AI Reframe: {smartReframe ? 'ON' : 'OFF'}
          </button>

          {/* Aspect Ratio Switcher */}
          <div className="flex items-center border border-neutral-700 bg-neutral-900">
            {(['9:16', '1:1', '16:9', '4:5'] as AspectRatio[]).map((r) => (
              <button
                key={r}
                onClick={() => onAspectRatioChange(r)}
                className={`px-2 py-0.5 text-[10px] font-mono font-bold transition-all ${
                  aspectRatio === r
                    ? 'bg-white text-[#0A0A0A]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (containerRef.current) {
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                } else {
                  containerRef.current.requestFullscreen();
                }
              }
            }}
            className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors border border-neutral-800"
            title="Toggle Fullscreen Canvas"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Main Canvas Viewport Area */}
      <div 
        ref={containerRef}
        onClick={() => onSelectClip && onSelectClip(null)}
        className="my-auto py-3 flex flex-col items-center justify-center relative overflow-hidden"
      >
        {/* Floating Context Toolbar (Canva Style Quick Actions) */}
        {selectedClip && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="mb-2 bg-[#121318] border border-neutral-700 px-3 py-1 flex items-center gap-2 shadow-2xl text-xs select-none z-30 animate-in fade-in"
          >
            <span className="text-[10px] font-mono font-bold text-[#B8FF5C] uppercase pr-2 border-r border-neutral-700">
              {selectedClip.type}
            </span>

            {/* Center Canvas */}
            <button
              onClick={() => {
                if (onUpdateSelectedClip) {
                  onUpdateSelectedClip({ ...selectedClip, positionX: 0, positionY: 0 });
                }
              }}
              className="px-1.5 py-0.5 hover:bg-neutral-800 text-neutral-300 hover:text-white font-mono text-[10px] flex items-center gap-1 transition-colors"
              title="Center on Canvas"
            >
              <Crosshair className="w-3 h-3 text-[#4D9FFF]" />
              <span>Center</span>
            </button>

            {/* Rotate 90 deg */}
            <button
              onClick={() => {
                if (onUpdateSelectedClip) {
                  const newRot = ((selectedClip.rotation || 0) + 90) % 360;
                  onUpdateSelectedClip({ ...selectedClip, rotation: newRot });
                }
              }}
              className="px-1.5 py-0.5 hover:bg-neutral-800 text-neutral-300 hover:text-white font-mono text-[10px] flex items-center gap-1 transition-colors"
              title="Rotate 90°"
            >
              <RotateCw className="w-3 h-3 text-[#FFAA00]" />
              <span>90°</span>
            </button>

            {/* Flip Horizontal */}
            <button
              onClick={() => {
                if (onUpdateSelectedClip) {
                  onUpdateSelectedClip({ ...selectedClip, flipHorizontal: !selectedClip.flipHorizontal });
                }
              }}
              className="px-1.5 py-0.5 hover:bg-neutral-800 text-neutral-300 hover:text-white font-mono text-[10px] flex items-center gap-1 transition-colors"
              title="Flip Horizontal"
            >
              <FlipHorizontal className="w-3 h-3 text-cyan-400" />
              <span>Flip H</span>
            </button>

            {/* Scale Toggle */}
            <button
              onClick={() => {
                if (onUpdateSelectedClip) {
                  const currentScale = selectedClip.scale || 1;
                  onUpdateSelectedClip({
                    ...selectedClip,
                    scale: currentScale >= 1.4 ? 1 : 1.4,
                  });
                }
              }}
              className="px-1.5 py-0.5 hover:bg-neutral-800 text-neutral-300 hover:text-white font-mono text-[10px] flex items-center gap-1 transition-colors"
              title="Toggle Zoom / Scale"
            >
              <Sparkles className="w-3 h-3 text-[#B8FF5C]" />
              <span>Zoom</span>
            </button>

            {/* Keyframe toggle */}
            {onAddKeyframeAtPlayhead && (
              <button
                onClick={onAddKeyframeAtPlayhead}
                className="px-1.5 py-0.5 hover:bg-neutral-800 text-neutral-300 hover:text-[#FF5B37] font-mono text-[10px] flex items-center gap-1 transition-colors border-l border-neutral-700 pl-2"
                title="Add / Remove Keyframe at Playhead (Premiere ◆)"
              >
                <Diamond className="w-3 h-3 text-[#FF5B37] fill-[#FF5B37]" />
                <span>◆ Keyframe</span>
              </button>
            )}
          </div>
        )}

        {/* Viewport Box */}
        <div
          className={`relative overflow-hidden border-2 border-neutral-700 shadow-2xl bg-black flex items-center justify-center transition-all duration-200 ${getMotionEffectClass()} ${getLoopAnimClass()}`}
          style={{
            width: `${viewportDims.width}px`,
            height: `${viewportDims.height}px`,
          }}
        >
          {/* Canva Smart Snapping Guidelines */}
          {snapGuideX && (
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-[#FF007F] z-40 pointer-events-none shadow-[0_0_8px_#FF007F] flex items-center justify-center">
              <span className="bg-[#FF007F] text-white text-[8px] font-mono font-bold px-1 py-0.5">X: CENTER</span>
            </div>
          )}
          {snapGuideY && (
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#FF007F] z-40 pointer-events-none shadow-[0_0_8px_#FF007F] flex items-center justify-center">
              <span className="bg-[#FF007F] text-white text-[8px] font-mono font-bold px-1 py-0.5">Y: MIDDLE</span>
            </div>
          )}

          {/* Main Video Layer */}
          {isVideoSource ? (
            <video
              ref={videoRef}
              src={activeVideoClip?.sourceUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
              crossOrigin="anonymous"
              playsInline
              muted={isMuted}
              loop
              className="w-full h-full object-cover transition-transform duration-75"
              style={{
                transform: `scale(${videoTransform.scale}) rotate(${videoTransform.rotation}deg) translate(${videoTransform.positionX}px, ${videoTransform.positionY}px) scaleX(${activeVideoClip?.flipHorizontal ? -1 : 1}) scaleY(${activeVideoClip?.flipVertical ? -1 : 1})`,
                opacity: videoTransform.opacity,
                filter: computeVideoFilters(),
                boxShadow: activeVideoClip?.isAiCutout ? `0 0 24px ${activeVideoClip.cutoutGlowColor || '#B8FF5C'}` : 'none',
              }}
            />
          ) : (
            <img
              src={activeVideoClip?.sourceUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'}
              alt="OpenCut Canvas Playback"
              className="w-full h-full object-cover transition-transform duration-75"
              style={{
                transform: `scale(${videoTransform.scale}) rotate(${videoTransform.rotation}deg) translate(${videoTransform.positionX}px, ${videoTransform.positionY}px) scaleX(${activeVideoClip?.flipHorizontal ? -1 : 1}) scaleY(${activeVideoClip?.flipVertical ? -1 : 1})`,
                opacity: videoTransform.opacity,
                filter: computeVideoFilters(),
              }}
            />
          )}

          {/* V2: Secondary Video Overlay / Picture-in-Picture Layer */}
          {activeOverlayClip && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                onSelectClip && onSelectClip(activeOverlayClip);
              }}
              className={`absolute z-20 cursor-move border-2 transition-transform shadow-2xl overflow-hidden ${
                selectedClip?.id === activeOverlayClip.id ? 'border-[#B8FF5C] ring-2 ring-white' : 'border-white/80'
              }`}
              style={{
                width: activeOverlayClip.pipLayout === 'split_v' ? '100%' : '110px',
                height: activeOverlayClip.pipLayout === 'split_v' ? '50%' : '110px',
                top: activeOverlayClip.pipLayout === 'split_v' ? '0px' : '16px',
                right: activeOverlayClip.pipLayout === 'split_v' ? '0px' : '16px',
                transform: `translate(${overlayTransform.positionX}px, ${overlayTransform.positionY}px) scale(${overlayTransform.scale}) rotate(${overlayTransform.rotation}deg)`,
                borderRadius: activeOverlayClip.pipLayout === 'split_v' ? '0px' : '12px',
              }}
            >
              <video
                ref={overlayVideoRef}
                src={activeOverlayClip.sourceUrl}
                crossOrigin="anonymous"
                playsInline
                muted
                loop
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1 left-1 bg-black/75 px-1 py-0.2 text-[7px] font-mono font-bold text-white uppercase">
                PIP: V2
              </div>
            </div>
          )}

          {/* AI Face & Object Tracking Reticle (MediaPipe simulation) */}
          {activeVideoClip?.aiTrackingTarget === 'face' && (
            <div className="absolute top-[28%] left-[34%] w-24 h-24 border-2 border-dashed border-[#B8FF5C] pointer-events-none z-20 animate-pulse flex flex-col justify-between p-1">
              <span className="text-[8px] font-mono font-bold bg-[#0A0A0A] text-[#B8FF5C] px-1 self-start">
                [•] AI FACE LOCK 60FPS
              </span>
              <div className="w-1.5 h-1.5 bg-[#B8FF5C] self-end" />
            </div>
          )}

          {/* Background Audio Player */}
          {activeAudioClip?.sourceUrl && (
            <audio
              ref={audioRef}
              src={activeAudioClip.sourceUrl}
              loop
            />
          )}

          {/* STICKERS & ANIMATED GRAPHICS OVERLAYS (CapCut & Canva Style) */}
          {activeStickerClips.map((stk) => {
            const isSelected = selectedClip?.id === stk.id;
            const stkTransform = interpolateTransform(stk);

            return (
              <div
                key={stk.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectClip && onSelectClip(stk);
                }}
                className={`absolute cursor-move select-none z-30 transition-transform ${
                  isSelected ? 'ring-2 ring-[#B8FF5C] ring-offset-2 ring-offset-black' : ''
                }`}
                style={{
                  transform: `translate(${stkTransform.positionX}px, ${stkTransform.positionY}px) scale(${stkTransform.scale}) rotate(${stkTransform.rotation}deg) scaleX(${stk.flipHorizontal ? -1 : 1})`,
                  opacity: stkTransform.opacity,
                }}
              >
                {/* Visual Sticker Content */}
                {stk.stickerEmoji ? (
                  <span className="text-4xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] filter">
                    {stk.stickerEmoji}
                  </span>
                ) : stk.sourceUrl ? (
                  <img
                    src={stk.sourceUrl}
                    alt={stk.name}
                    className="w-16 h-16 object-contain pointer-events-none drop-shadow-xl"
                  />
                ) : (
                  <div className="px-3 py-1 bg-[#FF5B37] text-white border-2 border-white font-display font-black text-xs uppercase shadow-brutal-sm">
                    {stk.textContent || stk.name}
                  </div>
                )}

                {/* Interactive CapCut Bounding Box & Handles when Selected */}
                {isSelected && (
                  <div className="absolute -inset-3 border-2 border-white border-dashed pointer-events-none">
                    {/* Top Rotation Handle */}
                    <div
                      onMouseDown={(e) => handleBoxMouseDown(e, 'rotate')}
                      className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FF5B37] border-2 border-white rounded-full cursor-grab pointer-events-auto flex items-center justify-center shadow-brutal-sm"
                      title="Drag to Rotate"
                    >
                      <RotateCw className="w-2.5 h-2.5 text-white" />
                    </div>

                    {/* Corner Resize Handles */}
                    <div
                      onMouseDown={(e) => handleBoxMouseDown(e, 'scale')}
                      className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-[#0A0A0A] cursor-nwse-resize pointer-events-auto"
                    />
                    <div
                      onMouseDown={(e) => handleBoxMouseDown(e, 'scale')}
                      className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-[#0A0A0A] cursor-nesw-resize pointer-events-auto"
                    />
                    <div
                      onMouseDown={(e) => handleBoxMouseDown(e, 'scale')}
                      className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-[#0A0A0A] cursor-nesw-resize pointer-events-auto"
                    />
                    <div
                      onMouseDown={(e) => handleBoxMouseDown(e, 'scale')}
                      className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-[#0A0A0A] cursor-nwse-resize pointer-events-auto"
                    />
                  </div>
                )}
              </div>
            );
          })}

          {/* Subtitles / Dynamic Karaoke Animated Overlay */}
          {activeSubtitleClip && (
            <div 
              onClick={(e) => {
                e.stopPropagation();
                onSelectClip && onSelectClip(activeSubtitleClip);
              }}
              className="absolute bottom-12 left-3 right-3 text-center z-20 select-none animate-in fade-in cursor-pointer"
            >
              {activeSubtitleClip.captionStyle === 'karaoke' && karaokeData && (
                <div className="inline-block px-3 py-1.5 bg-[#0A0A0A]/90 border border-white max-w-full">
                  <div className="flex flex-wrap items-center justify-center gap-1 font-display font-black text-xs uppercase tracking-wide">
                    {karaokeData.words.map((w, idx) => {
                      const isPast = idx < karaokeData.activeWordIndex;
                      const isCurrent = idx === karaokeData.activeWordIndex;
                      return (
                        <span
                          key={idx}
                          className={`transition-all duration-150 ${
                            isCurrent
                              ? 'text-[#B8FF5C] scale-110 drop-shadow-[0_0_10px_rgba(184,255,92,1)] underline'
                              : isPast
                              ? 'text-white'
                              : 'text-neutral-400'
                          }`}
                        >
                          {w}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeSubtitleClip.captionStyle === 'bold_yellow' && (
                <div className="inline-block px-3 py-1.5 bg-[#0A0A0A] border-2 border-yellow-400 anim-pop-in">
                  <span className="text-yellow-300 font-display font-black text-xs uppercase tracking-wider">
                    {activeSubtitleClip.textContent || 'STOP SPENDING HOURS CUTTING! 🔥'}
                  </span>
                </div>
              )}

              {activeSubtitleClip.captionStyle === 'box_glow' && (
                <div className="inline-block px-3 py-1 bg-[#FF5B37] text-white font-display font-black text-[11px] uppercase tracking-wider border border-white shadow-brutal-sm anim-slide-up">
                  ✦ {activeSubtitleClip.textContent || '5 AI VIDEO WORKFLOWS'} ✦
                </div>
              )}

              {activeSubtitleClip.captionStyle === 'clean_white' && (
                <div className="inline-block px-3 py-1 bg-black/75 text-white font-medium text-xs border border-neutral-700">
                  {activeSubtitleClip.textContent || 'Stop spending hours cutting footage manually.'}
                </div>
              )}
            </div>
          )}

          {/* Watermark / Brand Logo Overlay */}
          {activeWatermarkClip && (
            <div
              className="absolute top-3 right-3 pointer-events-none flex items-center gap-1 bg-[#0A0A0A] text-white px-2 py-0.5 border border-white font-display font-black text-[9px] uppercase tracking-widest z-10 shadow-brutal-sm"
              style={{
                opacity: activeWatermarkClip.opacity !== undefined ? activeWatermarkClip.opacity : 0.8,
              }}
            >
              <Flame className="w-3 h-3 text-[#FF5B37] fill-[#FF5B37]" />
              <span>{activeWatermarkClip.textContent || 'HIVEPOSTLY'}</span>
            </div>
          )}

          {/* TikTok & Reels Safe Margins Overlay */}
          {showSafeMargins && (
            <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-2 select-none">
              {/* Top Bar Safe Zone */}
              <div className="flex justify-between items-center text-[8px] font-mono text-neutral-400 bg-black/40 px-2 py-1 border-b border-dashed border-yellow-400/50">
                <span>[LIVE / SEARCH]</span>
                <span className="text-yellow-300 font-bold">TikTok / Reels Safe Margin</span>
                <span>[CLOSE]</span>
              </div>

              {/* Right Column Icons Simulation */}
              <div className="self-end flex flex-col items-center gap-3 pr-2 opacity-75">
                <div className="w-6 h-6 rounded-full bg-neutral-700 border border-white text-[7px] flex items-center justify-center font-bold">AV</div>
                <div className="w-5 h-5 rounded-full bg-red-600/80 flex items-center justify-center text-[7px]">❤️</div>
                <div className="w-5 h-5 rounded-full bg-neutral-800/80 flex items-center justify-center text-[7px]">💬</div>
                <div className="w-5 h-5 rounded-full bg-neutral-800/80 flex items-center justify-center text-[7px]">↗️</div>
                <div className="w-5 h-5 rounded-full bg-neutral-900 border border-white animate-spin">💿</div>
              </div>

              {/* Bottom Caption Safe Zone */}
              <div className="bg-black/60 p-1.5 border-t border-dashed border-yellow-400/50 text-[8px] font-mono text-neutral-300">
                <div className="font-bold text-white">@hivepostly.ai • ♫ Original Audio</div>
                <div className="text-[7px] text-yellow-300">⚠️ KEEP CRITICAL TITLES ABOVE THIS LINE</div>
              </div>
            </div>
          )}

          {/* Center Play Button Overlay on hover / paused */}
          <button
            onClick={onTogglePlay}
            className={`absolute inset-0 m-auto w-12 h-12 rounded-none bg-white text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-brutal flex items-center justify-center transition-all hover:scale-110 cursor-pointer ${
              isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-95'
            }`}
            title="Click to Play/Pause"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-[#0A0A0A]" />
            ) : (
              <Play className="w-5 h-5 fill-[#0A0A0A] ml-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* 3. Bottom Player Transport Controls Bar with CapCut Stereo Audio Meters */}
      <div className="pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Playhead Timecode & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onTogglePlay}
            className="p-1.5 hover:bg-neutral-800 text-white transition-colors border border-neutral-700 bg-neutral-900"
            title="Play / Pause (Space)"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </button>

          {/* 1 Frame Step Back (Premiere Pro style) */}
          <button
            onClick={() => onSeek(Math.max(0, currentTime - 0.033))}
            className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white"
            title="Step Back 1 Frame (30fps)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSeek(Math.max(0, currentTime - 1))}
            className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white"
            title="Step Back 1s"
          >
            <Rewind className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onSeek(Math.min(totalDuration, currentTime + 1))}
            className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white"
            title="Step Forward 1s"
          >
            <FastForward className="w-3.5 h-3.5" />
          </button>

          {/* 1 Frame Step Forward */}
          <button
            onClick={() => onSeek(Math.min(totalDuration, currentTime + 0.033))}
            className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white"
            title="Step Forward 1 Frame (30fps)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSeek(0)}
            className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white"
            title="Reset to 00:00"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* SMPTE Timecode Display */}
          <div className="font-mono text-xs text-neutral-300 font-bold ml-1">
            <span className="text-[#B8FF5C]">{formatTimecode(currentTime)}</span>
            <span className="text-neutral-500"> / {formatTimecode(totalDuration)}</span>
          </div>

          {/* DUAL STEREO AUDIO LEVEL METERS (L / R) */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-neutral-900 border border-neutral-800" title="Stereo Master Audio dB Level">
            <div className="flex flex-col gap-0.5 text-[8px] font-mono text-neutral-500 leading-none">
              <span>L</span>
              <span>R</span>
            </div>
            <div className="flex flex-col gap-1 w-12">
              <div className="h-1.5 bg-neutral-800 overflow-hidden flex">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-red-500 transition-all duration-75"
                  style={{ width: `${Math.round(meterL * 100)}%` }}
                />
              </div>
              <div className="h-1.5 bg-neutral-800 overflow-hidden flex">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-red-500 transition-all duration-75"
                  style={{ width: `${Math.round(meterR * 100)}%` }}
                />
              </div>
            </div>
            <span className="text-[9px] font-mono text-neutral-400">
              {isMuted ? '-∞' : `${Math.round((meterL - 1) * 36)}dB`}
            </span>
          </div>
        </div>

        {/* Audio Volume & Speed Controls */}
        <div className="flex items-center gap-2 sm:gap-3 text-neutral-400 font-mono text-[11px]">
          {/* Mute / Unmute Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-1 text-white hover:text-[#FF5B37] transition-colors"
            title="Mute / Unmute (M)"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#FF5B37]" />}
            <span>{isMuted ? 'Muted' : `${Math.round(volume * 100)}%`}</span>
          </button>

          {/* Volume Slider */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-14 sm:w-16 h-1.5 bg-neutral-800 accent-[#FF5B37] cursor-pointer"
            title="Master Volume"
          />

          {/* Speed Presets Switcher */}
          <div className="flex items-center border border-neutral-700 bg-neutral-900">
            {[0.5, 1, 1.5, 2].map((s) => (
              <button
                key={s}
                onClick={() => onChangeSpeed && onChangeSpeed(s)}
                className={`px-1.5 py-0.5 text-[10px] font-mono transition-colors ${
                  playbackSpeed === s
                    ? 'bg-neutral-700 text-[#B8FF5C] font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
