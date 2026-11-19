import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Maximize2, 
  Scissors, 
  Type, 
  Music, 
  Sparkles, 
  Send, 
  Download, 
  Check, 
  Layers, 
  Image as ImageIcon, 
  Sliders, 
  FastForward,
  Ratio,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface EditingStudioProps {
  onSendToPost: (videoData: {
    videoUrl: string;
    caption: string;
    duration: string;
    aspectRatio: string;
  }) => void;
}

export const EditingStudio: React.FC<EditingStudioProps> = ({ onSendToPost }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(14); // seconds
  const totalDuration = 45; // seconds
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '1:1' | '16:9' | '4:5'>('9:16');
  const [captionStyle, setCaptionStyle] = useState<'karaoke' | 'bold_yellow' | 'clean_white' | 'box_glow'>('karaoke');
  const [watermarkEnabled, setWatermarkEnabled] = useState(true);
  const [watermarkOpacity, setWatermarkOpacity] = useState(70);
  const [smartReframeActive, setSmartReframeActive] = useState(true);
  const [selectedMusic, setSelectedMusic] = useState('Cyber Beat - 128 BPM (Royalty Free)');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  // Playhead toggle
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
    }, 1200);
  };

  const handleSendToPostDirect = () => {
    onSendToPost({
      videoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      caption: 'These 5 AI workflows trim silences, burn karaoke subtitles, and auto-color in 45 seconds. Comment "TOOLS" to get the presets! 👇🔥',
      duration: '00:45',
      aspectRatio,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Studio Control Bar */}
      <div className="p-5 rounded-2xl bg-[#131724] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-extrabold text-white tracking-tight">VIDEO & ASSET STUDIO</h2>
            <span className="text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/20">
              Hivepostly Studio Engine
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Multi-track timeline, AI karaoke auto-captions, smart 9:16 reframe, and 1-click "Send to Post" publisher pipeline.
          </p>
        </div>

        {/* Aspect Ratio Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
            <Ratio className="w-3.5 h-3.5 text-cyan-400" /> Canvas:
          </span>
          <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
            {(['9:16', '1:1', '16:9', '4:5'] as const).map((ratio) => (
              <button
                key={ratio}
                onClick={() => setAspectRatio(ratio)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  aspectRatio === ratio
                    ? 'bg-cyan-500 text-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/10 transition-colors"
          >
            {isExporting ? (
              <span>Rendering 1080p...</span>
            ) : exportComplete ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Exported (1080p)</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Render</span>
              </>
            )}
          </button>

          {/* Key unique PRD feature: Send to Post! */}
          <button
            onClick={handleSendToPostDirect}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
          >
            <Send className="w-4 h-4" />
            <span>Send to Post (Composer)</span>
          </button>
        </div>
      </div>

      {/* Main Studio Viewport (Left: Canvas Preview, Right: Audio, Captions, Brand Kit) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Video Player Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-[#0d0f17] rounded-2xl border border-white/10 p-4 flex flex-col items-center justify-between min-h-[460px] relative overflow-hidden">
          {/* Top Canvas Bar */}
          <div className="w-full flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-white/5">
            <span className="font-mono text-[11px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              1080 × 1920 • 60 FPS • Rec.709
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSmartReframeActive(!smartReframeActive)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-colors ${
                  smartReframeActive
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-white/5 text-slate-400 border-white/5'
                }`}
              >
                AI Smart Reframe: {smartReframeActive ? 'ON' : 'OFF'}
              </button>
              <Maximize2 className="w-3.5 h-3.5 text-slate-500 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Interactive Screen Preview Container */}
          <div 
            className="relative my-auto flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black"
            style={{
              width: aspectRatio === '9:16' ? '250px' : aspectRatio === '1:1' ? '320px' : aspectRatio === '4:5' ? '280px' : '440px',
              height: aspectRatio === '9:16' ? '440px' : aspectRatio === '1:1' ? '320px' : aspectRatio === '4:5' ? '350px' : '250px',
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80" 
              alt="Video Preview"
              className="w-full h-full object-cover" 
            />

            {/* Karaoke Subtitles Overlay */}
            <div className="absolute bottom-16 left-3 right-3 text-center pointer-events-none">
              {captionStyle === 'karaoke' && (
                <div className="inline-block px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md">
                  <span className="text-white font-extrabold text-sm drop-shadow-md">
                    Stop spending{' '}
                  </span>
                  <span className="text-emerald-400 font-extrabold text-sm uppercase tracking-wide drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]">
                    HOURS CUTTING
                  </span>
                  <span className="text-white font-extrabold text-sm drop-shadow-md">
                    {' '}silences!
                  </span>
                </div>
              )}
              {captionStyle === 'bold_yellow' && (
                <div className="inline-block px-3 py-1.5 rounded-lg bg-black/75">
                  <span className="text-yellow-300 font-black text-sm uppercase tracking-wider drop-shadow-md">
                    STOP SPENDING HOURS CUTTING!
                  </span>
                </div>
              )}
              {captionStyle === 'box_glow' && (
                <div className="inline-block px-3 py-1.5 rounded-lg bg-indigo-600/80 text-white font-bold text-xs uppercase tracking-wide border border-indigo-400">
                  ⚡ 5 AI VIDEO WORKFLOWS ⚡
                </div>
              )}
            </div>

            {/* Watermark brand overlay */}
            {watermarkEnabled && (
              <div 
                className="absolute top-4 right-4 pointer-events-none flex items-center gap-1 bg-black/40 px-2 py-1 rounded backdrop-blur text-[10px] font-bold text-white border border-white/10"
                style={{ opacity: watermarkOpacity / 100 }}
              >
                <Zap className="w-3 h-3 text-emerald-400" />
                <span>PULSE.STUDIO</span>
              </div>
            )}

            {/* Play/Pause center overlay button */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all hover:scale-110"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
          </div>

          {/* Bottom Player Controls */}
          <div className="w-full flex items-center justify-between pt-3 border-t border-white/5 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <button onClick={togglePlay} className="text-white hover:text-cyan-400">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button onClick={() => setCurrentTime(0)} className="hover:text-white">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-slate-200">
                00:{currentTime.toString().padStart(2, '0')} / 00:{totalDuration}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono text-[11px]">BGM: -14dB</span>
              </div>
              <span className="text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                WebCodecs Active
              </span>
            </div>
          </div>
        </div>

        {/* Right: Audio, Captions, Brand Kit Tools (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* 1. Auto-Captions with Karaoke Styles */}
          <div className="p-4 rounded-2xl bg-[#131724] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Auto-Captions & Karaoke Style
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                99.2% Accuracy
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              Captions burned into the video guarantee silent-watch viewers don't scroll away.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                { id: 'karaoke', label: 'Karaoke Neon Glow', desc: 'Word-by-word green glow' },
                { id: 'bold_yellow', label: 'Bold TikTok Yellow', desc: 'High-contrast black outline' },
                { id: 'box_glow', label: 'Indigo Pill Box', desc: 'Subtle clean badge' },
                { id: 'clean_white', label: 'Minimalist White', desc: 'Elegant Apple-style' },
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setCaptionStyle(style.id as any)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    captionStyle === style.id
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-white shadow-md'
                      : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5 text-slate-400'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-200">{style.label}</div>
                  <div className="text-[10px] text-slate-500">{style.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Royalty-Free Audio & Voiceover Library */}
          <div className="p-4 rounded-2xl bg-[#131724] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-indigo-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Music & Voiceover Track
                </h3>
              </div>
              <span className="text-[10px] text-slate-400">Licensed 100%</span>
            </div>

            <div className="space-y-1.5">
              {[
                'Cyber Beat - 128 BPM (Royalty Free)',
                'Upbeat Lofi Groove - 95 BPM',
                'Tech Minimal Drone - Cinematic',
              ].map((song) => (
                <div
                  key={song}
                  onClick={() => setSelectedMusic(song)}
                  className={`p-2 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-colors ${
                    selectedMusic === song
                      ? 'bg-indigo-600/25 border border-indigo-500/40 text-indigo-200'
                      : 'bg-white/[0.02] hover:bg-white/[0.05] text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Music className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="truncate">{song}</span>
                  </div>
                  {selectedMusic === song && <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          {/* 3. Brand Kit & Watermark Settings (PRD Section 7.4) */}
          <div className="p-4 rounded-2xl bg-[#131724] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Brand Kit & Watermark
                </h3>
              </div>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={watermarkEnabled}
                  onChange={(e) => setWatermarkEnabled(e.target.checked)}
                  className="rounded border-white/10 text-emerald-500 focus:ring-emerald-500 bg-white/5"
                />
                <span>Overlay Active</span>
              </label>
            </div>

            {watermarkEnabled && (
              <div className="space-y-2 pt-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Logo Opacity</span>
                  <span className="font-mono text-white">{watermarkOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={watermarkOpacity}
                  onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Multi-Track Timeline (Bottom Section) */}
      <div className="p-5 rounded-2xl bg-[#10131f] border border-white/10 space-y-3">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-white/5">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white flex items-center gap-1.5 uppercase font-mono text-[11px]">
              <Layers className="w-4 h-4 text-indigo-400" />
              Timeline Multi-Track
            </span>
            <div className="flex items-center gap-1 text-slate-400">
              <button className="p-1 rounded hover:bg-white/5 text-slate-300" title="Split clip">
                <Scissors className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 rounded hover:bg-white/5 text-slate-300" title="Trim speed">
                <FastForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="text-[11px] font-mono text-slate-400">
            Zoom: 100% • 4 Tracks Active
          </div>
        </div>

        {/* Tracks List */}
        <div className="space-y-2 relative">
          {/* Red Playhead line */}
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-red-500 z-20 pointer-events-none shadow-[0_0_8px_rgba(239,68,68,0.8)]"
            style={{ left: `${(currentTime / totalDuration) * 100}%` }}
          >
            <div className="w-3 h-3 bg-red-500 -ml-1.5 rounded-sm transform rotate-45 -mt-1" />
          </div>

          {/* Track 1: Subtitles / Karaoke */}
          <div className="flex items-center gap-3 text-xs">
            <span className="w-20 text-[11px] font-mono text-cyan-400 font-semibold shrink-0">
              T1: Captions
            </span>
            <div className="flex-1 h-8 rounded-lg bg-cyan-950/40 border border-cyan-500/30 relative flex items-center px-3 overflow-hidden">
              <div className="w-1/3 h-5 rounded bg-cyan-500/30 border border-cyan-400/40 text-[10px] text-cyan-200 px-2 flex items-center">
                Stop spending hours...
              </div>
              <div className="w-1/3 h-5 rounded bg-cyan-500/30 border border-cyan-400/40 text-[10px] text-cyan-200 px-2 flex items-center ml-2">
                5 AI workflows...
              </div>
            </div>
          </div>

          {/* Track 2: Video Main */}
          <div className="flex items-center gap-3 text-xs">
            <span className="w-20 text-[11px] font-mono text-indigo-400 font-semibold shrink-0">
              T2: Video
            </span>
            <div className="flex-1 h-10 rounded-lg bg-indigo-950/40 border border-indigo-500/30 relative flex items-center px-2 overflow-hidden">
              <div className="w-full h-7 rounded bg-indigo-600/30 border border-indigo-400/40 flex items-center px-2 text-[10px] text-indigo-200 font-mono">
                main_footage_9x16_master.mp4 (45s)
              </div>
            </div>
          </div>

          {/* Track 3: BGM Audio */}
          <div className="flex items-center gap-3 text-xs">
            <span className="w-20 text-[11px] font-mono text-emerald-400 font-semibold shrink-0">
              T3: Audio BGM
            </span>
            <div className="flex-1 h-8 rounded-lg bg-emerald-950/30 border border-emerald-500/25 relative flex items-center px-2 overflow-hidden">
              <div className="w-full h-5 rounded bg-emerald-500/20 border border-emerald-500/30 flex items-center px-2 text-[10px] text-emerald-300 font-mono">
                ♪ {selectedMusic}
              </div>
            </div>
          </div>

          {/* Track 4: Logo Brand Overlay */}
          <div className="flex items-center gap-3 text-xs">
            <span className="w-20 text-[11px] font-mono text-amber-400 font-semibold shrink-0">
              T4: Watermark
            </span>
            <div className="flex-1 h-7 rounded-lg bg-amber-950/20 border border-amber-500/20 relative flex items-center px-2 overflow-hidden">
              <div className="w-full h-4 rounded bg-amber-500/15 border border-amber-500/25 flex items-center px-2 text-[10px] text-amber-300 font-mono">
                PULSE STUDIO Logo Overlay (Corner)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
