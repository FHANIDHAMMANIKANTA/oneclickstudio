import React, { useState } from 'react';
import { 
  Sliders, 
  RotateCw, 
  RotateCcw,
  Volume2, 
  Type, 
  Trash2, 
  Sparkles, 
  Flame, 
  Zap, 
  Activity, 
  Camera, 
  Tv, 
  Film, 
  Diamond, 
  Scan, 
  FlipHorizontal, 
  FlipVertical, 
  Scissors, 
  Layers, 
  Wand2, 
  Clock, 
  AudioWaveform, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  ArrowUp, 
  ArrowDown, 
  Crosshair,
  Sun,
  Eye,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Palette
} from 'lucide-react';
import { TimelineClip, Keyframe } from './types';

interface ClipInspectorProps {
  clip: TimelineClip | null;
  currentTime?: number;
  onUpdateClip: (updated: TimelineClip) => void;
  onDeleteClip: (id: string) => void;
  onSeek?: (time: number) => void;
}

export const ClipInspector: React.FC<ClipInspectorProps> = ({
  clip,
  currentTime = 0,
  onUpdateClip,
  onDeleteClip,
  onSeek,
}) => {
  const [inspectorTab, setInspectorTab] = useState<'transform' | 'keyframes' | 'color' | 'speed' | 'audio' | 'ai'>('transform');

  if (!clip) {
    return (
      <div className="card-brutal bg-[#0F1015] p-5 text-center text-xs text-neutral-400 font-mono space-y-2 select-none border-2 border-neutral-800 min-h-[420px] flex flex-col items-center justify-center shadow-xl">
        <Sliders className="w-8 h-8 mx-auto text-neutral-600 mb-2" />
        <div className="font-display font-bold text-sm text-white">
          No Clip Selected
        </div>
        <p className="text-[11px] text-neutral-400 font-body max-w-xs">
          Click any video footage, sticker, subtitle, or audio layer on the timeline to inspect keyframes, AI cutout, transform, and speed ramping.
        </p>
      </div>
    );
  }

  const handleChange = (field: keyof TimelineClip, val: any) => {
    onUpdateClip({ ...clip, [field]: val });
  };

  // Check if a keyframe exists at current time
  const clipRelTime = Math.max(0, Math.round((currentTime - clip.startTime) * 10) / 10);
  const currentKeyframeIdx = clip.keyframes?.findIndex(
    (k) => Math.abs(k.time - clipRelTime) < 0.25
  );
  const hasKeyframe = currentKeyframeIdx !== undefined && currentKeyframeIdx !== -1;

  // Toggle keyframe at current time (Premiere Pro style ◆)
  const toggleKeyframeAtCurrent = () => {
    const existing = clip.keyframes || [];
    if (hasKeyframe) {
      // Remove keyframe
      const updated = existing.filter((_, idx) => idx !== currentKeyframeIdx);
      handleChange('keyframes', updated);
    } else {
      // Add keyframe with current clip values
      const newKf: Keyframe = {
        id: `kf-${Date.now()}`,
        time: clipRelTime,
        scale: clip.scale || 1,
        positionX: clip.positionX || 0,
        positionY: clip.positionY || 0,
        rotation: clip.rotation || 0,
        opacity: clip.opacity !== undefined ? clip.opacity : 1,
      };
      const updated = [...existing, newKf].sort((a, b) => a.time - b.time);
      handleChange('keyframes', updated);
    }
  };

  // Jump to previous/next keyframe
  const jumpPrevKeyframe = () => {
    if (!clip.keyframes || clip.keyframes.length === 0 || !onSeek) return;
    const sorted = [...clip.keyframes].sort((a, b) => a.time - b.time);
    const prev = [...sorted].reverse().find((k) => k.time < clipRelTime - 0.1);
    if (prev) {
      onSeek(clip.startTime + prev.time);
    }
  };

  const jumpNextKeyframe = () => {
    if (!clip.keyframes || clip.keyframes.length === 0 || !onSeek) return;
    const sorted = [...clip.keyframes].sort((a, b) => a.time - b.time);
    const next = sorted.find((k) => k.time > clipRelTime + 0.1);
    if (next) {
      onSeek(clip.startTime + next.time);
    }
  };

  return (
    <div className="card-brutal bg-[#0F1015] p-3 sm:p-4 space-y-3.5 text-left select-none max-h-[820px] overflow-y-auto font-body text-white border-2 border-neutral-800 shadow-xl">
      {/* Header with Title & Delete */}
      <div className="flex items-center justify-between pb-2.5 border-b border-neutral-800">
        <div>
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <span>INSPECTOR</span>
            <span>·</span>
            <span className="text-[#FF5B37] font-black">{clip.type.toUpperCase()}</span>
          </div>
          <div className="font-display font-bold text-sm text-white truncate max-w-[170px]">
            {clip.name}
          </div>
        </div>

        <button
          onClick={() => onDeleteClip(clip.id)}
          className="p-1.5 hover:bg-red-950 text-neutral-400 hover:text-red-400 transition-colors border border-transparent hover:border-red-800"
          title="Delete Clip (Del)"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Sub-tab navigation */}
      <div className="grid grid-cols-3 gap-1 bg-neutral-900 p-1 border border-neutral-800 text-[10px] font-display font-bold">
        <button
          onClick={() => setInspectorTab('transform')}
          className={`py-1 text-center transition-all ${
            inspectorTab === 'transform' ? 'bg-[#FF5B37] text-white shadow-sm' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Transform
        </button>
        <button
          onClick={() => setInspectorTab('keyframes')}
          className={`py-1 text-center transition-all ${
            inspectorTab === 'keyframes' ? 'bg-[#FF5B37] text-white shadow-sm' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Keyframes
        </button>
        <button
          onClick={() => setInspectorTab('speed')}
          className={`py-1 text-center transition-all ${
            inspectorTab === 'speed' ? 'bg-[#FF5B37] text-white shadow-sm' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Speed & FX
        </button>
        <button
          onClick={() => setInspectorTab('color')}
          className={`py-1 text-center transition-all ${
            inspectorTab === 'color' ? 'bg-[#FF5B37] text-white shadow-sm' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Color LUTs
        </button>
        <button
          onClick={() => setInspectorTab('ai')}
          className={`py-1 text-center transition-all ${
            inspectorTab === 'ai' ? 'bg-[#FF5B37] text-white shadow-sm' : 'text-neutral-400 hover:text-white'
          }`}
        >
          AI Cutout
        </button>
        <button
          onClick={() => setInspectorTab('audio')}
          className={`py-1 text-center transition-all ${
            inspectorTab === 'audio' ? 'bg-[#FF5B37] text-white shadow-sm' : 'text-neutral-400 hover:text-white'
          }`}
        >
          {clip.type === 'text' ? 'Captions' : 'Audio'}
        </button>
      </div>

      {/* 1. TRANSFORM TAB */}
      {inspectorTab === 'transform' && (
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-xs text-white uppercase tracking-wider">
              Scale & Position
            </span>
            <button
              onClick={() => {
                onUpdateClip({
                  ...clip,
                  scale: 1,
                  positionX: 0,
                  positionY: 0,
                  rotation: 0,
                  flipHorizontal: false,
                  flipVertical: false,
                });
              }}
              className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center gap-1 text-[10px] font-mono"
              title="Reset Transform"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Scale Slider */}
          <div className="space-y-1">
            <div className="flex justify-between font-mono font-bold text-[11px] text-neutral-400">
              <span>Scale (Zoom)</span>
              <span className="text-white">{Math.round((clip.scale || 1) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="2.5"
              step="0.05"
              value={clip.scale || 1}
              onChange={(e) => handleChange('scale', Number(e.target.value))}
              className="w-full accent-[#FF5B37] cursor-pointer"
            />
          </div>

          {/* Position X & Position Y */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10px] font-mono text-neutral-400 block mb-0.5">Position X</label>
              <input
                type="number"
                value={clip.positionX || 0}
                onChange={(e) => handleChange('positionX', Number(e.target.value))}
                className="w-full bg-neutral-900 border border-neutral-700 px-2 py-1 text-xs font-mono font-bold text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-neutral-400 block mb-0.5">Position Y</label>
              <input
                type="number"
                value={clip.positionY || 0}
                onChange={(e) => handleChange('positionY', Number(e.target.value))}
                className="w-full bg-neutral-900 border border-neutral-700 px-2 py-1 text-xs font-mono font-bold text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Canva Precision Alignment Grid */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-neutral-400">Canva Quick Align</div>
            <div className="grid grid-cols-6 gap-1 bg-neutral-900 p-1 border border-neutral-800">
              <button
                onClick={() => handleChange('positionX', -50)}
                className="py-1 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center"
                title="Align Left"
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleChange('positionX', 0)}
                className="py-1 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center"
                title="Align Center Horizontally"
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleChange('positionX', 50)}
                className="py-1 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center"
                title="Align Right"
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleChange('positionY', -70)}
                className="py-1 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center"
                title="Align Top"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleChange('positionY', 0)}
                className="py-1 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center"
                title="Align Middle Vertically"
              >
                <Crosshair className="w-3.5 h-3.5 text-[#FF5B37]" />
              </button>
              <button
                onClick={() => handleChange('positionY', 70)}
                className="py-1 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center"
                title="Align Bottom"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Rotation & Flip */}
          <div className="space-y-1">
            <div className="flex justify-between font-mono font-bold text-[11px] text-neutral-400">
              <span>Rotation Angle</span>
              <span className="text-white">{clip.rotation || 0}°</span>
            </div>
            <input
              type="range"
              min="-180"
              max="180"
              step="5"
              value={clip.rotation || 0}
              onChange={(e) => handleChange('rotation', Number(e.target.value))}
              className="w-full accent-[#FF5B37] cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => handleChange('flipHorizontal', !clip.flipHorizontal)}
              className={`py-1.5 px-2 border text-[10px] font-display font-bold flex items-center justify-center gap-1.5 transition-all ${
                clip.flipHorizontal ? 'bg-[#B8FF5C] text-black border-white' : 'bg-neutral-900 text-white border-neutral-700'
              }`}
            >
              <FlipHorizontal className="w-3.5 h-3.5" />
              <span>Flip Horizontal</span>
            </button>
            <button
              onClick={() => handleChange('flipVertical', !clip.flipVertical)}
              className={`py-1.5 px-2 border text-[10px] font-display font-bold flex items-center justify-center gap-1.5 transition-all ${
                clip.flipVertical ? 'bg-[#B8FF5C] text-black border-white' : 'bg-neutral-900 text-white border-neutral-700'
              }`}
            >
              <FlipVertical className="w-3.5 h-3.5" />
              <span>Flip Vertical</span>
            </button>
          </div>

          {/* Opacity */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between font-mono font-bold text-[11px] text-neutral-400">
              <span>Opacity</span>
              <span className="text-white">{Math.round((clip.opacity !== undefined ? clip.opacity : 1) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={clip.opacity !== undefined ? clip.opacity : 1}
              onChange={(e) => handleChange('opacity', Number(e.target.value))}
              className="w-full accent-[#FF5B37] cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* 2. KEYFRAMES TAB (Premiere Pro & VN Style) */}
      {inspectorTab === 'keyframes' && (
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-neutral-900 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-xs text-white flex items-center gap-1.5">
                <Diamond className="w-3.5 h-3.5 text-[#FF5B37] fill-[#FF5B37]" />
                KEYFRAME ENGINE (◆)
              </span>
              <button
                onClick={toggleKeyframeAtCurrent}
                className={`px-2.5 py-1 text-[10px] font-mono font-black border flex items-center gap-1 transition-all ${
                  hasKeyframe
                    ? 'bg-[#FF5B37] text-white border-white'
                    : 'bg-black text-[#B8FF5C] border-[#B8FF5C] hover:bg-[#B8FF5C] hover:text-black'
                }`}
                title="Toggle Keyframe at current playhead position"
              >
                <span>{hasKeyframe ? '◆ Keyframe Active' : '+ Add Keyframe (K)'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span>Playhead Rel: {clipRelTime}s</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={jumpPrevKeyframe}
                  className="px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-white flex items-center gap-0.5"
                  title="Jump to previous keyframe"
                >
                  <ChevronLeft className="w-3 h-3" /> Prev
                </button>
                <button
                  onClick={jumpNextKeyframe}
                  className="px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-white flex items-center gap-0.5"
                  title="Jump to next keyframe"
                >
                  Next <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Keyframe List Strip */}
            {clip.keyframes && clip.keyframes.length > 0 ? (
              <div className="space-y-1.5 pt-2 max-h-48 overflow-y-auto">
                {clip.keyframes.map((kf, i) => (
                  <div
                    key={kf.id}
                    onClick={() => onSeek && onSeek(clip.startTime + kf.time)}
                    className="p-1.5 bg-black border border-neutral-800 flex items-center justify-between cursor-pointer hover:border-[#FF5B37]"
                  >
                    <span className="font-mono text-[10px] text-[#B8FF5C] flex items-center gap-1">
                      <Diamond className="w-3 h-3 fill-current" />
                      Keyframe {i + 1} @ {kf.time}s
                    </span>
                    <span className="text-[9px] font-mono text-neutral-400">
                      S:{kf.scale} · X:{kf.positionX} · Y:{kf.positionY}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[10px] text-neutral-500 font-mono py-2 text-center">
                No keyframes added yet. Move playhead and click "+ Add Keyframe" to animate scale, position, and rotation over time!
              </p>
            )}
          </div>
        </div>
      )}

      {/* 3. SPEED & FX TAB */}
      {inspectorTab === 'speed' && (
        <div className="space-y-3 text-xs">
          {/* Speed Presets */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-xs text-white flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF5B37]" />
                Speed Multiplier
              </span>
              <span className="font-mono text-[10px] text-[#B8FF5C] font-bold">{clip.speed}x</span>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {[0.5, 1.0, 1.5, 2.0].map((s) => (
                <button
                  key={s}
                  onClick={() => handleChange('speed', s)}
                  className={`py-1 text-[10px] font-mono font-bold border transition-all ${
                    clip.speed === s
                      ? 'bg-[#B8FF5C] text-black border-white'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-700'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Reverse Playback */}
          <button
            onClick={() => handleChange('isReversed', !clip.isReversed)}
            className={`w-full py-1.5 border text-[10px] font-display font-bold transition-all flex items-center justify-center gap-1.5 ${
              clip.isReversed
                ? 'bg-[#FF5B37] text-white border-white'
                : 'bg-neutral-900 text-white border-neutral-700'
            }`}
          >
            <span>Reverse Footage: {clip.isReversed ? 'ENABLED (←)' : 'OFF'}</span>
          </button>

          {/* Motion FX Shaders */}
          <div className="space-y-2 pt-2 border-t border-neutral-800">
            <span className="font-display font-bold text-xs text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5B37]" />
              Motion FX Preset
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'none', label: 'Clean' },
                { id: 'shake', label: 'Handheld Shake' },
                { id: 'glitch', label: 'Glitch RGB' },
                { id: 'vhs', label: 'VHS Scanlines' },
                { id: 'film_grain', label: 'Film Grain' },
                { id: 'pulse_glow', label: 'Neon Pulse' },
                { id: 'zoom_punch', label: 'Beat Zoom' },
                { id: 'cinematic_bars', label: '2.39:1 Bars' },
              ].map((fx) => (
                <button
                  key={fx.id}
                  onClick={() => handleChange('motionEffect', fx.id)}
                  className={`px-2 py-1.5 text-[10px] font-display font-bold border text-left transition-all truncate ${
                    clip.motionEffect === fx.id
                      ? 'bg-[#FF5B37] text-white border-white'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  {fx.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. COLOR LUTS TAB */}
      {inspectorTab === 'color' && (
        <div className="space-y-3 text-xs">
          <span className="font-display font-bold text-xs text-white flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-cyan-400" />
            Color Tuning & Grading
          </span>

          {/* Brightness */}
          <div className="space-y-1">
            <div className="flex justify-between font-mono font-bold text-[10px] text-neutral-400">
              <span>Brightness</span>
              <span className="text-white">{Math.round((clip.brightness ?? 1) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={clip.brightness ?? 1}
              onChange={(e) => handleChange('brightness', Number(e.target.value))}
              className="w-full accent-[#B8FF5C] cursor-pointer"
            />
          </div>

          {/* Contrast */}
          <div className="space-y-1">
            <div className="flex justify-between font-mono font-bold text-[10px] text-neutral-400">
              <span>Contrast</span>
              <span className="text-white">{Math.round((clip.contrast ?? 1) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={clip.contrast ?? 1}
              onChange={(e) => handleChange('contrast', Number(e.target.value))}
              className="w-full accent-[#B8FF5C] cursor-pointer"
            />
          </div>

          {/* Saturation */}
          <div className="space-y-1">
            <div className="flex justify-between font-mono font-bold text-[10px] text-neutral-400">
              <span>Saturation</span>
              <span className="text-white">{Math.round((clip.saturate ?? 1) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.05"
              value={clip.saturate ?? 1}
              onChange={(e) => handleChange('saturate', Number(e.target.value))}
              className="w-full accent-[#B8FF5C] cursor-pointer"
            />
          </div>

          {/* Color LUT Presets */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-mono text-neutral-400">Color Presets:</span>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { name: 'Raw / None', filter: 'none' },
                { name: 'Cyberpunk Neon', filter: 'contrast(1.3) saturate(1.4) hue-rotate(-15deg)' },
                { name: '35mm Film', filter: 'sepia(0.35) contrast(1.15) brightness(0.95)' },
                { name: 'Punchy Viral', filter: 'contrast(1.45) saturate(1.25) brightness(1.02)' },
              ].map((lut, i) => (
                <button
                  key={i}
                  onClick={() => handleChange('filterStyle', lut.filter)}
                  className={`p-1.5 text-[10px] font-mono border text-left truncate ${
                    clip.filterStyle === lut.filter
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-800'
                  }`}
                >
                  {lut.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. AI CUTOUT TAB */}
      {inspectorTab === 'ai' && (
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-neutral-900 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-xs text-white flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-purple-400" />
                Smart Cutout (Remove BG)
              </span>
              <button
                onClick={() => handleChange('isAiCutout', !clip.isAiCutout)}
                className={`px-2 py-0.5 text-[10px] font-mono font-bold border ${
                  clip.isAiCutout ? 'bg-emerald-500 text-black border-white' : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                }`}
              >
                {clip.isAiCutout ? 'ON' : 'OFF'}
              </button>
            </div>
            <p className="text-[10px] text-neutral-400 font-mono">
              Isolates the human speaker or foreground subject without requiring a green screen.
            </p>

            {/* Edge Glow Aura Color */}
            <div className="space-y-1 pt-1">
              <span className="text-[10px] font-mono text-neutral-400">Edge Glow Aura:</span>
              <div className="flex items-center gap-2">
                {['#B8FF5C', '#FF5B37', '#00F0FF', '#A855F7', '#FFFFFF'].map((col) => (
                  <button
                    key={col}
                    onClick={() => handleChange('cutoutGlowColor', col)}
                    className={`w-5 h-5 rounded-full border ${clip.cutoutGlowColor === col ? 'ring-2 ring-white scale-110' : 'border-neutral-700'}`}
                    style={{ backgroundColor: col }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* AI Face Tracking */}
          <div className="p-3 bg-neutral-900 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-xs text-white flex items-center gap-1.5">
                <Scan className="w-3.5 h-3.5 text-[#4D9FFF]" />
                MediaPipe Face Lock
              </span>
              <button
                onClick={() => handleChange('aiTrackingTarget', clip.aiTrackingTarget === 'face' ? 'none' : 'face')}
                className={`px-2 py-0.5 text-[10px] font-mono font-bold border ${
                  clip.aiTrackingTarget === 'face' ? 'bg-[#4D9FFF] text-black border-white' : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                }`}
              >
                {clip.aiTrackingTarget === 'face' ? 'LOCKED' : 'OFF'}
              </button>
            </div>
            <p className="text-[10px] text-neutral-400 font-mono">
              Tracks head movements at 60 FPS and keeps overlays centered to the speaker.
            </p>
          </div>
        </div>
      )}

      {/* 6. AUDIO / CAPTIONS TAB */}
      {inspectorTab === 'audio' && (
        <div className="space-y-3 text-xs">
          {clip.type === 'text' ? (
            <div className="space-y-2.5">
              <label className="font-display font-bold text-xs text-white block">
                Subtitle Content
              </label>
              <textarea
                rows={3}
                value={clip.textContent || ''}
                onChange={(e) => handleChange('textContent', e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 p-2 text-xs font-mono text-white focus:outline-none"
              />

              <div className="space-y-1">
                <span className="text-[11px] font-bold text-neutral-400 block">Preset Caption Styles</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'karaoke', label: 'Karaoke Neon' },
                    { id: 'bold_yellow', label: 'TikTok Yellow' },
                    { id: 'box_glow', label: 'Flame Box' },
                    { id: 'clean_white', label: 'Clean White' },
                  ].map((st) => (
                    <button
                      key={st.id}
                      onClick={() => handleChange('captionStyle', st.id)}
                      className={`px-2 py-1 text-[10px] font-display font-bold border ${
                        clip.captionStyle === st.id
                          ? 'bg-[#FF5B37] text-white border-white'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-700'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between font-mono font-bold text-[11px] text-neutral-400">
                <span>Audio Gain / Volume</span>
                <span className="text-white">{Math.round((clip.volume !== undefined ? clip.volume : 1) * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                step="0.05"
                value={clip.volume !== undefined ? clip.volume : 1}
                onChange={(e) => handleChange('volume', Number(e.target.value))}
                className="w-full accent-[#4D9FFF] cursor-pointer"
              />

              <button
                onClick={() => handleChange('voiceEnhanced', !clip.voiceEnhanced)}
                className={`w-full py-1.5 border text-[10px] font-display font-bold flex items-center justify-center gap-1.5 transition-all ${
                  clip.voiceEnhanced
                    ? 'bg-[#4D9FFF] text-black border-white'
                    : 'bg-neutral-900 text-white border-neutral-700'
                }`}
              >
                <AudioWaveform className="w-3.5 h-3.5" />
                <span>AI Voice Isolation & Denoise: {clip.voiceEnhanced ? 'ACTIVE' : 'OFF'}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
