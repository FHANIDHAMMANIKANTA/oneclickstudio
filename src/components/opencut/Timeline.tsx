import React, { useRef, useState, useEffect } from 'react';
import { 
  Scissors, 
  Trash2, 
  Copy, 
  Magnet, 
  ZoomIn, 
  ZoomOut, 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  Lock, 
  Unlock,
  Plus,
  Layers,
  Music,
  Video,
  Type,
  Flame,
  AudioWaveform,
  Diamond,
  Smile,
  Zap,
  Sparkles,
  MousePointer,
  Crosshair,
  Maximize2
} from 'lucide-react';
import { TimelineTrack, TimelineClip } from './types';

interface TimelineProps {
  tracks: TimelineTrack[];
  currentTime: number;
  totalDuration: number;
  isPlaying?: boolean;
  onSeek: (time: number) => void;
  selectedClipId: string | null;
  onSelectClip: (clip: TimelineClip | null) => void;
  onSplitClip: () => void;
  onSplitClipAtTime?: (clipId: string, splitTime: number) => void;
  onDeleteClip: () => void;
  onDuplicateClip: () => void;
  onUpdateClipTime: (clipId: string, newStartTime: number, newDuration: number) => void;
  onToggleTrackMute: (trackId: string) => void;
  onToggleTrackHidden: (trackId: string) => void;
  onToggleTrackLocked: (trackId: string) => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  tracks,
  currentTime,
  totalDuration,
  isPlaying = false,
  onSeek,
  selectedClipId,
  onSelectClip,
  onSplitClip,
  onSplitClipAtTime,
  onDeleteClip,
  onDuplicateClip,
  onUpdateClipTime,
  onToggleTrackMute,
  onToggleTrackHidden,
  onToggleTrackLocked,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTool, setActiveTool] = useState<'pointer' | 'razor'>('pointer');
  const [isSnapping, setIsSnapping] = useState(true);
  const [isRippleEdit, setIsRippleEdit] = useState(true);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [meterL, setMeterL] = useState(0.4);
  const [meterR, setMeterR] = useState(0.35);
  const timelineTracksRef = useRef<HTMLDivElement>(null);

  // Premiere Master VU Meter animation loop
  useEffect(() => {
    if (!isPlaying) {
      setMeterL(0.12);
      setMeterR(0.10);
      return;
    }
    const interval = setInterval(() => {
      setMeterL(0.35 + Math.random() * 0.55);
      setMeterR(0.30 + Math.random() * 0.60);
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Keyboard shortcut for tools: V for pointer, C for razor, Del for delete
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'KeyV') {
        setActiveTool('pointer');
      } else if (e.code === 'KeyC') {
        setActiveTool('razor');
      } else if (e.code === 'Delete' || e.code === 'Backspace') {
        if (selectedClipId) {
          e.preventDefault();
          onDeleteClip();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedClipId, onDeleteClip]);

  // Time ruler ticks (every 5 seconds)
  const ticksCount = Math.max(6, Math.ceil(totalDuration / 5));
  const ticks = Array.from({ length: ticksCount + 1 }, (_, i) => i * 5);

  const calculateSeekTime = (clientX: number) => {
    if (!timelineTracksRef.current) return 0;
    const rect = timelineTracksRef.current.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    return Math.round(ratio * totalDuration * 10) / 10;
  };

  const handleMouseDownScrub = (e: React.MouseEvent) => {
    setIsScrubbing(true);
    const newTime = calculateSeekTime(e.clientX);
    onSeek(newTime);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isScrubbing) {
        const newTime = calculateSeekTime(e.clientX);
        onSeek(newTime);
      }
    };
    const handleMouseUp = () => {
      if (isScrubbing) setIsScrubbing(false);
    };

    if (isScrubbing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isScrubbing, totalDuration, onSeek]);

  const getTrackIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'audio': return Music;
      case 'text': return Type;
      case 'graphic': return Smile;
      default: return Flame;
    }
  };

  // Handle clip click with Razor tool
  const handleClipClick = (e: React.MouseEvent, clip: TimelineClip) => {
    e.stopPropagation();
    if (activeTool === 'razor') {
      const clickTime = calculateSeekTime(e.clientX);
      if (onSplitClipAtTime) {
        onSplitClipAtTime(clip.id, clickTime);
      } else {
        onSeek(clickTime);
        onSelectClip(clip);
        onSplitClip();
      }
    } else {
      onSelectClip(clip);
    }
  };

  return (
    <div className="card-brutal bg-[#0D0E12] p-3 sm:p-4 text-white space-y-3 select-none border-2 border-neutral-800 shadow-2xl">
      {/* 1. Timeline Toolbar (CapCut, Premiere & VN Standard) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-neutral-800 text-xs">
        {/* Left Editing Tools: Selection (V), Razor (C), Split, Delete, Duplicate */}
        <div className="flex items-center gap-1.5">
          {/* Pointer Tool (V) */}
          <button
            onClick={() => setActiveTool('pointer')}
            className={`px-2.5 py-1 border text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeTool === 'pointer'
                ? 'bg-[#B8FF5C] text-black border-white font-bold'
                : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:text-white'
            }`}
            title="Selection Tool (V)"
          >
            <MousePointer className="w-3.5 h-3.5" />
            <span>Select (V)</span>
          </button>

          {/* Razor Tool (C) */}
          <button
            onClick={() => setActiveTool('razor')}
            className={`px-2.5 py-1 border text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeTool === 'razor'
                ? 'bg-[#FF5B37] text-white border-white font-bold'
                : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:text-white'
            }`}
            title="Razor Cut Tool (C) - Click anywhere on a clip to split"
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>Razor (C)</span>
          </button>

          <div className="h-4 w-[1px] bg-neutral-800 mx-1" />

          {/* Split at Playhead */}
          <button
            onClick={onSplitClip}
            className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-mono flex items-center gap-1.5 transition-colors"
            title="Split selected clip at playhead position"
          >
            <Scissors className="w-3.5 h-3.5 text-[#FF5B37]" />
            <span>Split Cut</span>
          </button>

          {/* Delete Clip */}
          <button
            onClick={onDeleteClip}
            className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-red-400 font-mono flex items-center gap-1.5 transition-colors"
            title="Delete selected clip (Del)"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>

          {/* Duplicate Clip */}
          <button
            onClick={onDuplicateClip}
            className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 font-mono flex items-center gap-1.5 transition-colors"
            title="Duplicate clip (Ctrl+D)"
          >
            <Copy className="w-3.5 h-3.5 text-[#4D9FFF]" />
            <span>Duplicate</span>
          </button>

          <div className="h-4 w-[1px] bg-neutral-800 mx-1" />

          {/* Magnet Snapping Toggle */}
          <button
            onClick={() => setIsSnapping(!isSnapping)}
            className={`px-2 py-1 border text-[11px] font-mono flex items-center gap-1 transition-colors ${
              isSnapping
                ? 'bg-[#B8FF5C] text-[#0A0A0A] border-white font-bold'
                : 'bg-neutral-900 text-neutral-400 border-neutral-700'
            }`}
            title="Snap playhead to clip cuts"
          >
            <Magnet className="w-3 h-3" />
            <span>Snap {isSnapping ? 'ON' : 'OFF'}</span>
          </button>

          {/* Ripple Edit Toggle */}
          <button
            onClick={() => setIsRippleEdit(!isRippleEdit)}
            className={`px-2 py-1 border text-[11px] font-mono flex items-center gap-1 transition-colors ${
              isRippleEdit
                ? 'bg-[#FF5B37] text-white border-white font-bold'
                : 'bg-neutral-900 text-neutral-400 border-neutral-700'
            }`}
            title="Ripple Edit (Shift clips when deleting or trimming)"
          >
            <span>Ripple {isRippleEdit ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {/* Right Zoom & View Controls */}
        <div className="flex items-center gap-3 font-mono text-[11px] text-neutral-400">
          <span className="text-[#B8FF5C] hidden sm:flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF5C] animate-pulse" />
            Multi-Layer Core Active
          </span>

          <div className="flex items-center gap-1.5 border border-neutral-800 px-2 py-0.5 bg-neutral-900">
            <span>Zoom:</span>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))}
              className="p-0.5 hover:bg-neutral-800 text-neutral-400 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-white font-bold">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(2.0, z + 0.2))}
              className="p-0.5 hover:bg-neutral-800 text-neutral-400 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="px-1 text-[9px] text-[#B8FF5C] hover:underline"
              title="Reset Zoom"
            >
              Fit
            </button>
          </div>
        </div>
      </div>

      {/* 2. Timeline Grid: Track Headers Left (140px), Tracks Area Right (Fluid), Premiere VU Meter Far Right (48px) */}
      <div className="grid grid-cols-[140px_1fr_48px] gap-2 items-start relative">
        {/* Left Track Headers Column */}
        <div className="space-y-2 pt-6">
          {tracks.map((track) => {
            const Icon = getTrackIcon(track.type);
            return (
              <div
                key={track.id}
                className="h-11 bg-neutral-900/90 border border-neutral-800 px-2 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Icon className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span className="font-mono text-[11px] font-bold text-neutral-200 truncate">
                    {track.name}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onToggleTrackHidden(track.id)}
                    className="p-1 text-neutral-500 hover:text-white"
                    title={track.hidden ? 'Show Track' : 'Hide Track'}
                  >
                    {track.hidden ? <EyeOff className="w-3 h-3 text-red-400" /> : <Eye className="w-3 h-3" />}
                  </button>
                  <button
                    onClick={() => onToggleTrackMute(track.id)}
                    className="p-1 text-neutral-500 hover:text-white"
                    title={track.muted ? 'Unmute Track' : 'Mute Track'}
                  >
                    {track.muted ? <VolumeX className="w-3 h-3 text-red-400" /> : <Volume2 className="w-3 h-3" />}
                  </button>
                  <button
                    onClick={() => onToggleTrackLocked(track.id)}
                    className="p-1 text-neutral-500 hover:text-white"
                    title={track.locked ? 'Unlock Track' : 'Lock Track'}
                  >
                    {track.locked ? <Lock className="w-3 h-3 text-amber-400" /> : <Unlock className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Timeline Canvas Column with Ruler & Tracks */}
        <div 
          ref={timelineTracksRef}
          onMouseDown={handleMouseDownScrub}
          className={`relative overflow-x-auto pb-2 select-none ${activeTool === 'razor' ? 'cursor-crosshair' : 'cursor-ew-resize'}`}
        >
          {/* Time Ruler (Seconds and Tick marks) */}
          <div className="h-6 flex items-end justify-between border-b border-neutral-800 text-[10px] font-mono text-neutral-400 relative px-1 mb-2 select-none">
            {ticks.map((t) => (
              <div key={t} className="flex flex-col items-center">
                <span>00:{t.toString().padStart(2, '0')}</span>
                <div className="w-[1px] h-2 bg-neutral-600 mt-0.5" />
              </div>
            ))}
          </div>

          {/* Draggable Red Playhead Line across all tracks */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-[#FF5B37] z-30 pointer-events-none shadow-[0_0_12px_rgba(255,91,55,1)]"
            style={{
              left: `${Math.min(100, Math.max(0, (currentTime / totalDuration) * 100))}%`,
            }}
          >
            <div className="w-4 h-4 bg-[#FF5B37] -ml-[7px] transform rotate-45 -mt-1.5 border border-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
          </div>

          {/* Track Rows */}
          <div className="space-y-2 relative">
            {tracks.map((track) => {
              return (
                <div
                  key={track.id}
                  className={`h-11 bg-neutral-900/60 border border-neutral-800 relative flex items-center overflow-hidden transition-colors ${
                    track.hidden ? 'opacity-30' : ''
                  }`}
                >
                  {track.clips.map((clip) => {
                    const isSelected = selectedClipId === clip.id;
                    const leftPct = (clip.startTime / totalDuration) * 100;
                    const widthPct = (clip.duration / totalDuration) * 100;

                    // Color scheme per clip type (CapCut / Premiere standard)
                    let clipBg = 'bg-neutral-800 border-neutral-700 text-white';
                    if (clip.trackId === 'track-overlay') clipBg = 'bg-purple-900/40 border-purple-500 text-purple-200';
                    else if (clip.type === 'video') clipBg = 'bg-[#FF5B37]/35 border-[#FF5B37] text-white';
                    else if (clip.type === 'audio') clipBg = 'bg-[#4D9FFF]/35 border-[#4D9FFF] text-[#4D9FFF]';
                    else if (clip.type === 'text') clipBg = 'bg-[#B8FF5C]/35 border-[#B8FF5C] text-[#B8FF5C]';
                    else if (clip.type === 'graphic') clipBg = 'bg-[#FFAA00]/40 border-[#FFAA00] text-amber-200';

                    return (
                      <div
                        key={clip.id}
                        onClick={(e) => handleClipClick(e, clip)}
                        style={{
                          left: `${leftPct}%`,
                          width: `${Math.max(2, widthPct)}%`,
                        }}
                        className={`absolute top-1 bottom-1 rounded-none border-2 flex items-center justify-between px-2 cursor-pointer transition-all overflow-hidden ${clipBg} ${
                          isSelected ? 'ring-2 ring-white shadow-xl z-20 brightness-110' : 'hover:brightness-105'
                        }`}
                      >
                        {/* CONTINUOUS VIDEO FILMSTRIP FRAMES */}
                        {clip.type === 'video' && clip.thumbnailUrl && (
                          <div 
                            className="absolute inset-0 opacity-30 pointer-events-none"
                            style={{
                              backgroundImage: `url(${clip.thumbnailUrl})`,
                              backgroundRepeat: 'repeat-x',
                              backgroundSize: '46px 100%',
                            }}
                          />
                        )}

                        {/* KEYFRAME DIAMOND MARKERS */}
                        {clip.keyframes && clip.keyframes.map((kf) => {
                          const kfLeft = (kf.time / Math.max(1, clip.duration)) * 100;
                          return (
                            <div
                              key={kf.id}
                              style={{ left: `${Math.min(96, Math.max(4, kfLeft))}%` }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onSeek(clip.startTime + kf.time);
                              }}
                              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#FF5B37] rotate-45 border border-white z-20 shadow-md cursor-pointer hover:scale-125"
                              title={`Jump to Keyframe at ${kf.time}s`}
                            />
                          );
                        })}

                        {/* Transition Connector Flag */}
                        {clip.transitionIn && clip.transitionIn !== 'none' && (
                          <div 
                            className="absolute left-1 top-1 px-1 bg-yellow-400 text-black font-mono font-black text-[8px] z-20 border border-black shadow-sm"
                            title={`Transition: ${clip.transitionIn}`}
                          >
                            ⧗ {clip.transitionIn.replace('_', ' ')}
                          </div>
                        )}

                        {/* Left Trim Handle */}
                        <div 
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            const startX = e.clientX;
                            const origStart = clip.startTime;
                            const origDuration = clip.duration;
                            const onMove = (me: MouseEvent) => {
                              const dx = me.clientX - startX;
                              const dt = (dx / (timelineTracksRef.current?.clientWidth || 800)) * totalDuration;
                              const newStart = Math.max(0, origStart + dt);
                              const newDur = Math.max(1, origDuration - dt);
                              onUpdateClipTime(clip.id, Math.round(newStart * 10) / 10, Math.round(newDur * 10) / 10);
                            };
                            const onUp = () => {
                              window.removeEventListener('mousemove', onMove);
                              window.removeEventListener('mouseup', onUp);
                            };
                            window.addEventListener('mousemove', onMove);
                            window.addEventListener('mouseup', onUp);
                          }}
                          className="w-2 h-full bg-white/50 hover:bg-white cursor-ew-resize -ml-2 mr-1 transition-colors z-20"
                          title="Drag to trim start"
                        />

                        {/* Clip Content Preview */}
                        <div className="flex-1 truncate text-[11px] font-mono font-bold flex items-center gap-1.5 overflow-hidden z-10">
                          {clip.stickerEmoji && (
                            <span className="text-sm shrink-0 drop-shadow">{clip.stickerEmoji}</span>
                          )}

                          {clip.thumbnailUrl && clip.type !== 'video' && (
                            <img
                              src={clip.thumbnailUrl}
                              alt=""
                              className="w-5 h-5 object-cover border border-neutral-700 shrink-0"
                            />
                          )}

                          {/* Real Audio Waveform bars on audio clips */}
                          {clip.type === 'audio' && (
                            <div className="flex items-center gap-0.5 h-4 px-1 shrink-0 overflow-hidden opacity-90">
                              {(clip.waveform || [0.4, 0.8, 0.3, 0.9, 0.6, 0.7, 0.4, 0.9, 0.5, 0.8, 0.3, 0.7]).map((peak, idx) => (
                                <div
                                  key={idx}
                                  className="w-[2px] bg-[#4D9FFF] rounded-none"
                                  style={{ height: `${Math.round(peak * 100)}%` }}
                                />
                              ))}
                            </div>
                          )}

                          <span className="truncate text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{clip.name}</span>
                          <span className="text-[9px] text-neutral-300 font-mono shrink-0">({clip.duration}s)</span>

                          {/* Motion FX indicator tag */}
                          {clip.motionEffect && clip.motionEffect !== 'none' && (
                            <span className="px-1.5 py-0.2 bg-[#FF5B37] text-white text-[9px] font-mono font-black uppercase shrink-0 border border-white">
                              ⚡ {clip.motionEffect}
                            </span>
                          )}
                        </div>

                        {/* Right Trim Handle */}
                        <div 
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            const startX = e.clientX;
                            const origDuration = clip.duration;
                            const onMove = (me: MouseEvent) => {
                              const dx = me.clientX - startX;
                              const dt = (dx / (timelineTracksRef.current?.clientWidth || 800)) * totalDuration;
                              const newDur = Math.max(1, origDuration + dt);
                              onUpdateClipTime(clip.id, clip.startTime, Math.round(newDur * 10) / 10);
                            };
                            const onUp = () => {
                              window.removeEventListener('mousemove', onMove);
                              window.removeEventListener('mouseup', onUp);
                            };
                            window.addEventListener('mousemove', onMove);
                            window.addEventListener('mouseup', onUp);
                          }}
                          className="w-2 h-full bg-white/50 hover:bg-white cursor-ew-resize -mr-2 ml-1 transition-colors z-20"
                          title="Drag to trim end"
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Premiere Pro Master VU dB Meter */}
        <div className="flex flex-col items-center justify-between h-[300px] pt-6 pb-2 bg-neutral-950 border border-neutral-800 px-1 select-none">
          <span className="text-[8px] font-mono font-bold text-neutral-400 uppercase tracking-tighter">
            VU dB
          </span>

          <div className="flex-1 w-full flex items-center justify-center gap-1 py-1">
            {/* Left Channel Bar */}
            <div className="w-2 h-full bg-neutral-900 border border-neutral-800 relative flex flex-col justify-end p-0.5">
              <div 
                className="w-full bg-gradient-to-t from-emerald-500 via-amber-400 to-red-500 transition-all duration-75"
                style={{ height: `${isPlaying ? Math.round(meterL * 100) : 12}%` }}
              />
            </div>

            {/* Right Channel Bar */}
            <div className="w-2 h-full bg-neutral-900 border border-neutral-800 relative flex flex-col justify-end p-0.5">
              <div 
                className="w-full bg-gradient-to-t from-emerald-500 via-amber-400 to-red-500 transition-all duration-75"
                style={{ height: `${isPlaying ? Math.round(meterR * 100) : 10}%` }}
              />
            </div>

            {/* dB Scale Labels */}
            <div className="flex flex-col justify-between text-[7px] font-mono text-neutral-500 py-1 leading-none">
              <span className="text-red-400">0</span>
              <span>-6</span>
              <span>-12</span>
              <span>-24</span>
              <span>-∞</span>
            </div>
          </div>

          <span className="text-[8px] font-mono text-[#B8FF5C] font-bold">
            {isPlaying ? '-3dB' : 'IDLE'}
          </span>
        </div>
      </div>
    </div>
  );
};
