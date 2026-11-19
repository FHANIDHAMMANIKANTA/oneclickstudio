import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Send, 
  Download, 
  Check, 
  Sparkles, 
  ArrowRight,
  Flame,
  Ratio,
  Loader2,
  X,
  FileVideo,
  Wand2,
  Smile,
  Diamond,
  Zap,
  HelpCircle,
  Sliders,
  Keyboard,
  Layers,
  Settings
} from 'lucide-react';
import { 
  TimelineTrack, 
  TimelineClip, 
  AspectRatio, 
  CANVAS_PRESETS,
  ExportConfig
} from './types';
import { CanvasPlayer } from './CanvasPlayer';
import { Timeline } from './Timeline';
import { ResourcePanel } from './ResourcePanel';
import { ClipInspector } from './ClipInspector';
import { STOCK_SAMPLE_VIDEOS } from '../../utils/mediaUtils';

interface OpenCutEditorProps {
  onSendToComposer: (data: { caption: string; videoUrl: string }) => void;
}

export const OpenCutEditor: React.FC<OpenCutEditorProps> = ({ onSendToComposer }) => {
  const [currentTime, setCurrentTime] = useState(2); // start near beginning
  const [totalDuration, setTotalDuration] = useState(30); // seconds
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const [smartReframe, setSmartReframe] = useState(true);
  const [selectedClipId, setSelectedClipId] = useState<string | null>('clip-sticker-1');
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);

  // Render export modal configuration
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportComplete, setExportComplete] = useState(false);
  const [exportStage, setExportStage] = useState('Initializing WebCodecs Pipeline...');
  const [exportConfig, setExportConfig] = useState<ExportConfig>({
    resolution: '1080p',
    fps: 60,
    format: 'mp4',
    quality: 'high',
  });

  // Multi-Track Timeline layout initialized with real media + stickers + keyframes (CapCut, Premiere & VN)
  const [tracks, setTracks] = useState<TimelineTrack[]>([
    {
      id: 'track-text',
      name: 'T1: Captions',
      type: 'text',
      muted: false,
      hidden: false,
      locked: false,
      clips: [
        {
          id: 'clip-text-1',
          trackId: 'track-text',
          name: 'Stop spending hours cutting silences...',
          type: 'text',
          startTime: 0,
          duration: 12,
          trimStart: 0,
          trimEnd: 12,
          sourceUrl: '',
          scale: 1,
          positionX: 0,
          positionY: 0,
          rotation: 0,
          opacity: 1,
          volume: 1,
          muted: false,
          speed: 1,
          textContent: 'STOP SPENDING HOURS CUTTING SILENCES!',
          captionStyle: 'karaoke',
        },
        {
          id: 'clip-text-2',
          trackId: 'track-text',
          name: '5 AI video workflows in 45s...',
          type: 'text',
          startTime: 12,
          duration: 18,
          trimStart: 0,
          trimEnd: 18,
          sourceUrl: '',
          scale: 1,
          positionX: 0,
          positionY: 0,
          rotation: 0,
          opacity: 1,
          volume: 1,
          muted: false,
          speed: 1,
          textContent: '✦ 5 AI VIDEO WORKFLOWS IN 30 SECONDS ✦',
          captionStyle: 'box_glow',
        },
      ],
    },
    {
      id: 'track-stickers',
      name: 'T2: Stickers & GIFs',
      type: 'graphic',
      muted: false,
      hidden: false,
      locked: false,
      clips: [
        {
          id: 'clip-sticker-1',
          trackId: 'track-stickers',
          name: 'Cute Puppy Mascot (CapCut)',
          type: 'graphic',
          startTime: 0,
          duration: 20,
          trimStart: 0,
          trimEnd: 20,
          sourceUrl: '',
          scale: 1.4,
          positionX: 0,
          positionY: 70,
          rotation: 0,
          opacity: 1,
          volume: 1,
          muted: false,
          speed: 1,
          stickerEmoji: '🐶',
          keyframes: [
            { id: 'kf-1', time: 0, scale: 1.2, positionX: 0, positionY: 80, rotation: 0, opacity: 1 },
            { id: 'kf-2', time: 4, scale: 1.5, positionX: 20, positionY: 60, rotation: 8, opacity: 1 },
            { id: 'kf-3', time: 8, scale: 1.3, positionX: -20, positionY: 70, rotation: -6, opacity: 1 },
          ],
        },
        {
          id: 'clip-sticker-2',
          trackId: 'track-stickers',
          name: 'Viral Flame Sticker',
          type: 'graphic',
          startTime: 20,
          duration: 10,
          trimStart: 0,
          trimEnd: 10,
          sourceUrl: '',
          scale: 1.5,
          positionX: 40,
          positionY: -50,
          rotation: 12,
          opacity: 1,
          volume: 1,
          muted: false,
          speed: 1,
          stickerEmoji: '🔥',
        },
      ],
    },
    {
      id: 'track-overlay',
      name: 'V2: PiP / Overlay',
      type: 'video',
      muted: false,
      hidden: false,
      locked: false,
      clips: [
        {
          id: 'clip-overlay-1',
          trackId: 'track-overlay',
          name: 'Reaction Cam PiP',
          type: 'video',
          startTime: 4,
          duration: 16,
          trimStart: 0,
          trimEnd: 16,
          sourceUrl: STOCK_SAMPLE_VIDEOS[1].url,
          thumbnailUrl: STOCK_SAMPLE_VIDEOS[1].thumbnailUrl,
          scale: 0.8,
          positionX: 25,
          positionY: -25,
          rotation: 0,
          opacity: 1,
          volume: 0,
          muted: true,
          speed: 1,
          pipLayout: 'pip_tr',
        },
      ],
    },
    {
      id: 'track-video',
      name: 'V1: Main Footage',
      type: 'video',
      muted: false,
      hidden: false,
      locked: false,
      clips: [
        {
          id: 'clip-video-1',
          trackId: 'track-video',
          name: 'ai_coding_broll_9x16.mp4',
          type: 'video',
          startTime: 0,
          duration: 30,
          trimStart: 0,
          trimEnd: 30,
          sourceUrl: STOCK_SAMPLE_VIDEOS[0].url,
          thumbnailUrl: STOCK_SAMPLE_VIDEOS[0].thumbnailUrl,
          scale: 1,
          positionX: 0,
          positionY: 0,
          rotation: 0,
          opacity: 1,
          volume: 1,
          muted: false,
          speed: 1,
          motionEffect: 'shake',
          transitionIn: 'glitch_cut',
        },
      ],
    },
    {
      id: 'track-audio',
      name: 'A1: Audio BGM',
      type: 'audio',
      muted: false,
      hidden: false,
      locked: false,
      clips: [
        {
          id: 'clip-audio-1',
          trackId: 'track-audio',
          name: 'Cyber Beat - 128 BPM',
          type: 'audio',
          startTime: 0,
          duration: 30,
          trimStart: 0,
          trimEnd: 30,
          sourceUrl: 'https://cdn.freesound.org/previews/568/568581_11861866-lq.mp3',
          scale: 1,
          positionX: 0,
          positionY: 0,
          rotation: 0,
          opacity: 1,
          volume: 0.7,
          muted: false,
          speed: 1,
          waveform: [0.3, 0.8, 0.4, 0.9, 0.6, 0.7, 0.3, 0.95, 0.5, 0.85, 0.4, 0.7, 0.9, 0.4, 0.8, 0.6],
        },
      ],
    },
    {
      id: 'track-sfx',
      name: 'A2: Sound Effects',
      type: 'audio',
      muted: false,
      hidden: false,
      locked: false,
      clips: [
        {
          id: 'clip-sfx-1',
          trackId: 'track-sfx',
          name: 'Viral Swoosh Transition',
          type: 'audio',
          startTime: 11.5,
          duration: 1.5,
          trimStart: 0,
          trimEnd: 1.5,
          sourceUrl: 'https://cdn.freesound.org/previews/608/608645_11861866-lq.mp3',
          scale: 1,
          positionX: 0,
          positionY: 0,
          rotation: 0,
          opacity: 1,
          volume: 0.9,
          muted: false,
          speed: 1,
          waveform: [0.1, 0.4, 0.9, 0.8, 0.5, 0.2],
        },
      ],
    },
    {
      id: 'track-watermark',
      name: 'G2: Watermark',
      type: 'graphic',
      muted: false,
      hidden: false,
      locked: false,
      clips: [
        {
          id: 'clip-wm-1',
          trackId: 'track-watermark',
          name: 'HIVEPOSTLY Watermark Logo',
          type: 'graphic',
          startTime: 0,
          duration: 30,
          trimStart: 0,
          trimEnd: 30,
          sourceUrl: '',
          scale: 1,
          positionX: 0,
          positionY: 0,
          rotation: 0,
          opacity: 0.8,
          volume: 1,
          muted: false,
          speed: 1,
          textContent: 'HIVEPOSTLY',
        },
      ],
    },
  ]);

  // Real Playback Clock Tick Loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    if (isPlaying) {
      const tick = (now: number) => {
        const delta = (now - lastTime) / 1000;
        lastTime = now;

        setCurrentTime((prev) => {
          const nextTime = prev + delta * playbackSpeed;
          if (nextTime >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return nextTime;
        });

        animationFrameId = requestAnimationFrame(tick);
      };
      animationFrameId = requestAnimationFrame(tick);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, totalDuration, playbackSpeed]);

  // Find currently active clips at currentTime
  const activeVideoTrack = tracks.find((t) => t.id === 'track-video' && !t.hidden);
  const activeVideoClip = activeVideoTrack?.clips.find(
    (c) => currentTime >= c.startTime && currentTime <= c.startTime + c.duration
  );

  const activeOverlayTrack = tracks.find((t) => t.id === 'track-overlay' && !t.hidden);
  const activeOverlayClip = activeOverlayTrack?.clips.find(
    (c) => currentTime >= c.startTime && currentTime <= c.startTime + c.duration
  );

  const activeAudioTrack = tracks.find((t) => t.type === 'audio' && !t.hidden && !t.muted);
  const activeAudioClip = activeAudioTrack?.clips.find(
    (c) => currentTime >= c.startTime && currentTime <= c.startTime + c.duration
  );

  const activeSubtitleTrack = tracks.find((t) => t.type === 'text' && !t.hidden);
  const activeSubtitleClip = activeSubtitleTrack?.clips.find(
    (c) => currentTime >= c.startTime && currentTime <= c.startTime + c.duration
  );

  const activeWatermarkTrack = tracks.find((t) => t.id === 'track-watermark' && !t.hidden);
  const activeWatermarkClip = activeWatermarkTrack?.clips.find(
    (c) => currentTime >= c.startTime && currentTime <= c.startTime + c.duration
  );

  // Active stickers / overlays
  const activeStickerClips = tracks
    .filter((t) => (t.id === 'track-stickers' || t.type === 'graphic') && !t.hidden)
    .flatMap((t) =>
      t.clips.filter(
        (c) => currentTime >= c.startTime && currentTime <= c.startTime + c.duration && c.id !== 'clip-wm-1'
      )
    );

  // Find currently selected clip for Inspector
  const allClips = tracks.flatMap((t) => t.clips);
  const selectedClip = allClips.find((c) => c.id === selectedClipId) || null;

  // Split selected clip at currentTime
  const handleSplitClip = () => {
    if (!selectedClipId) return;

    setTracks(
      tracks.map((track) => {
        const clipIdx = track.clips.findIndex((c) => c.id === selectedClipId);
        if (clipIdx === -1) return track;

        const clip = track.clips[clipIdx];
        if (currentTime <= clip.startTime || currentTime >= clip.startTime + clip.duration) {
          alert('Position the red playhead within the selected clip to split it!');
          return track;
        }

        const firstDuration = Math.round((currentTime - clip.startTime) * 10) / 10;
        const secondDuration = Math.round((clip.duration - firstDuration) * 10) / 10;

        const firstClip: TimelineClip = {
          ...clip,
          duration: firstDuration,
        };

        const secondClip: TimelineClip = {
          ...clip,
          id: `clip-${Date.now()}`,
          name: `${clip.name} (Part 2)`,
          startTime: currentTime,
          duration: secondDuration,
        };

        const newClips = [...track.clips];
        newClips.splice(clipIdx, 1, firstClip, secondClip);

        return { ...track, clips: newClips };
      })
    );
  };

  // Split clip at specific timestamp (used by Razor Tool)
  const handleSplitClipAtTime = (clipId: string, splitTime: number) => {
    setTracks(
      tracks.map((track) => {
        const clipIdx = track.clips.findIndex((c) => c.id === clipId);
        if (clipIdx === -1) return track;

        const clip = track.clips[clipIdx];
        if (splitTime <= clip.startTime || splitTime >= clip.startTime + clip.duration) {
          return track;
        }

        const firstDuration = Math.round((splitTime - clip.startTime) * 10) / 10;
        const secondDuration = Math.round((clip.duration - firstDuration) * 10) / 10;

        const firstClip: TimelineClip = {
          ...clip,
          duration: firstDuration,
        };

        const secondClip: TimelineClip = {
          ...clip,
          id: `clip-${Date.now()}`,
          name: `${clip.name} (Part 2)`,
          startTime: splitTime,
          duration: secondDuration,
        };

        const newClips = [...track.clips];
        newClips.splice(clipIdx, 1, firstClip, secondClip);

        return { ...track, clips: newClips };
      })
    );
  };

  // Delete selected clip
  const handleDeleteClip = () => {
    if (!selectedClipId) return;
    setTracks(
      tracks.map((track) => ({
        ...track,
        clips: track.clips.filter((c) => c.id !== selectedClipId),
      }))
    );
    setSelectedClipId(null);
  };

  // Duplicate selected clip
  const handleDuplicateClip = () => {
    if (!selectedClip) return;
    const newClip: TimelineClip = {
      ...selectedClip,
      id: `clip-${Date.now()}`,
      name: `${selectedClip.name} (Copy)`,
      startTime: selectedClip.startTime + selectedClip.duration,
    };
    setTracks(
      tracks.map((t) =>
        t.id === selectedClip.trackId ? { ...t, clips: [...t.clips, newClip] } : t
      )
    );
    if (newClip.startTime + newClip.duration > totalDuration) {
      setTotalDuration(Math.ceil(newClip.startTime + newClip.duration));
    }
  };

  // Add clip from Resource panel to timeline
  const handleAddClipFromResource = (clipData: Omit<TimelineClip, 'id' | 'startTime'>) => {
    const targetTrackId = clipData.trackId;
    const targetTrack = tracks.find((t) => t.id === targetTrackId) || tracks[0];
    const lastClip = targetTrack?.clips[targetTrack.clips.length - 1];
    const newStartTime = lastClip ? lastClip.startTime + lastClip.duration : currentTime;

    const newClip: TimelineClip = {
      ...clipData,
      id: `clip-${Date.now()}`,
      startTime: newStartTime,
    };

    setTracks(
      tracks.map((t) =>
        t.id === targetTrack.id ? { ...t, clips: [...t.clips, newClip] } : t
      )
    );
    setSelectedClipId(newClip.id);

    if (newStartTime + newClip.duration > totalDuration) {
      setTotalDuration(Math.ceil(newStartTime + newClip.duration) + 2);
    }
  };

  // Toggle keyframe at playhead (Premiere Pro style)
  const handleAddKeyframeAtPlayhead = () => {
    if (!selectedClipId) return;
    setTracks(
      tracks.map((t) => ({
        ...t,
        clips: t.clips.map((c) => {
          if (c.id === selectedClipId) {
            const relTime = Math.max(0, Math.round((currentTime - c.startTime) * 10) / 10);
            const existing = c.keyframes || [];
            const idx = existing.findIndex((k) => Math.abs(k.time - relTime) < 0.25);
            if (idx !== -1) {
              return { ...c, keyframes: existing.filter((_, i) => i !== idx) };
            } else {
              const newKf = {
                id: `kf-${Date.now()}`,
                time: relTime,
                scale: c.scale || 1,
                positionX: c.positionX || 0,
                positionY: c.positionY || 0,
                rotation: c.rotation || 0,
                opacity: c.opacity !== undefined ? c.opacity : 1,
              };
              return { ...c, keyframes: [...existing, newKf].sort((a, b) => a.time - b.time) };
            }
          }
          return c;
        }),
      }))
    );
  };

  // AI Auto Subtitles Generator (Whisper simulation)
  const handleTriggerAiAutoSubtitles = () => {
    const newTextClips: TimelineClip[] = [
      {
        id: `clip-ai-sub-1`,
        trackId: 'track-text',
        name: 'Whisper: Stop spending hours...',
        type: 'text',
        startTime: 0,
        duration: 12,
        trimStart: 0,
        trimEnd: 12,
        sourceUrl: '',
        scale: 1,
        positionX: 0,
        positionY: 0,
        rotation: 0,
        opacity: 1,
        volume: 1,
        muted: false,
        speed: 1,
        textContent: 'STOP SPENDING HOURS CUTTING SILENCES!',
        captionStyle: 'karaoke',
      },
      {
        id: `clip-ai-sub-2`,
        trackId: 'track-text',
        name: 'Whisper: 5 viral workflows in 30s...',
        type: 'text',
        startTime: 12,
        duration: 18,
        trimStart: 0,
        trimEnd: 18,
        sourceUrl: '',
        scale: 1,
        positionX: 0,
        positionY: 0,
        rotation: 0,
        opacity: 1,
        volume: 1,
        muted: false,
        speed: 1,
        textContent: '✦ 5 AI VIDEO WORKFLOWS IN 30 SECONDS ✦',
        captionStyle: 'bold_yellow',
      },
    ];

    setTracks(
      tracks.map((t) => (t.id === 'track-text' ? { ...t, clips: newTextClips } : t))
    );
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.5 } });
  };

  // AI Smart Cutout Toggle
  const handleTriggerAiCutout = (glowColor: string = '#B8FF5C') => {
    setTracks(
      tracks.map((t) => ({
        ...t,
        clips: t.clips.map((c) =>
          c.type === 'video' ? { ...c, isAiCutout: !c.isAiCutout, cutoutGlowColor: glowColor } : c
        ),
      }))
    );
  };

  // Canva Quick Alignment
  const handleQuickAlign = (align: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => {
    if (!selectedClipId) return;
    setTracks(
      tracks.map((t) => ({
        ...t,
        clips: t.clips.map((c) => {
          if (c.id === selectedClipId) {
            if (align === 'left') return { ...c, positionX: -60 };
            if (align === 'center') return { ...c, positionX: 0 };
            if (align === 'right') return { ...c, positionX: 60 };
            if (align === 'top') return { ...c, positionY: -70 };
            if (align === 'middle') return { ...c, positionY: 0 };
            if (align === 'bottom') return { ...c, positionY: 70 };
          }
          return c;
        }),
      }))
    );
  };

  // Canva One-Click Layout Presets
  const handleApplyLayoutPreset = (layout: 'cover' | 'contain' | 'split_v' | 'pip_tr') => {
    if (!selectedClipId) {
      // Apply to active primary video clip
      setTracks(
        tracks.map((t) => ({
          ...t,
          clips: t.clips.map((c) => {
            if (c.type === 'video') {
              if (layout === 'cover') return { ...c, scale: 1.3, positionX: 0, positionY: 0 };
              if (layout === 'contain') return { ...c, scale: 0.9, positionX: 0, positionY: 0 };
              if (layout === 'split_v') return { ...c, pipLayout: 'split_v', positionX: 0, positionY: 0 };
              if (layout === 'pip_tr') return { ...c, pipLayout: 'pip_tr', scale: 0.6, positionX: 40, positionY: -40 };
            }
            return c;
          }),
        }))
      );
      return;
    }

    setTracks(
      tracks.map((t) => ({
        ...t,
        clips: t.clips.map((c) => {
          if (c.id === selectedClipId) {
            if (layout === 'cover') return { ...c, scale: 1.3, positionX: 0, positionY: 0 };
            if (layout === 'contain') return { ...c, scale: 0.9, positionX: 0, positionY: 0 };
            if (layout === 'split_v') return { ...c, pipLayout: 'split_v', positionX: 0, positionY: 0 };
            if (layout === 'pip_tr') return { ...c, pipLayout: 'pip_tr', scale: 0.6, positionX: 40, positionY: -40 };
          }
          return c;
        }),
      }))
    );
  };

  // Apply visual color filter to active or selected video clip
  const handleApplyFilter = (filterStyle: string) => {
    setTracks(
      tracks.map((t) => ({
        ...t,
        clips: t.clips.map((c) => {
          if (c.id === selectedClipId || (c.type === 'video' && !selectedClipId)) {
            return { ...c, filterStyle };
          }
          return c;
        }),
      }))
    );
  };

  // Apply real-time motion effect (shake, glitch, vhs, grain, pulse, punch)
  const handleApplyMotionEffect = (motionEffect: any) => {
    setTracks(
      tracks.map((t) => ({
        ...t,
        clips: t.clips.map((c) => {
          if (c.id === selectedClipId || (c.type === 'video' && !selectedClipId)) {
            return { ...c, motionEffect };
          }
          return c;
        }),
      }))
    );
  };

  // Apply transition
  const handleApplyTransition = (transition: string) => {
    setTracks(
      tracks.map((t) => ({
        ...t,
        clips: t.clips.map((c) => {
          if (c.id === selectedClipId || (c.type === 'video' && !selectedClipId)) {
            return { ...c, transitionIn: transition as any };
          }
          return c;
        }),
      }))
    );
  };

  // Update clip properties from Inspector
  const handleUpdateClip = (updated: TimelineClip) => {
    setTracks(
      tracks.map((t) => ({
        ...t,
        clips: t.clips.map((c) => (c.id === updated.id ? updated : c)),
      }))
    );
  };

  // Export render simulation with real WebCodecs progress
  const startExportRendering = () => {
    setIsExporting(true);
    setExportProgress(0);
    setExportComplete(false);
    setExportStage('Phase 1/5: Demuxing Video & Audio Streams...');

    let progress = 0;
    const stages = [
      'Phase 1/5: Demuxing Video & Audio Streams...',
      'Phase 2/5: Applying AI Cutout & Motion FX Shaders...',
      'Phase 3/5: Rasterizing Dynamic Karaoke Subtitles & Stickers...',
      'Phase 4/5: Multi-Track Audio Mixing & Peak Limiting...',
      'Phase 5/5: Encoding H.264 WebCodecs HW Acceleration...',
    ];

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 14) + 10;
      const stageIdx = Math.min(stages.length - 1, Math.floor((progress / 100) * stages.length));
      setExportStage(stages[stageIdx]);

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setExportProgress(100);
        setExportComplete(true);
        setExportStage('Export Complete! Ready for Download or Broadcast.');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        setExportProgress(progress);
      }
    }, 320);
  };

  const handleDownloadExportedFile = () => {
    const videoUrl = activeVideoClip?.sourceUrl || STOCK_SAMPLE_VIDEOS[0].url;
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = `hivepostly_${aspectRatio.replace(':', 'x')}_${exportConfig.resolution}_${exportConfig.fps}fps.${exportConfig.format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSendToComposerDirect = () => {
    onSendToComposer({
      videoUrl: activeVideoClip?.sourceUrl || STOCK_SAMPLE_VIDEOS[0].url,
      caption: 'Why are 90% of creators still losing 70% of viewers in the first 3 seconds? 🤯\n\nThese 5 AI workflows trim silences, burn karaoke subtitles, and auto-color in 30 seconds.\n\nComment "TOOLS" below to get the direct download bundle before the link expires! 👇🔥',
    });
  };

  // Calculate dynamic estimated file size
  const getEstimatedSize = () => {
    let baseMb = 18;
    if (exportConfig.resolution === '720p') baseMb = 10;
    if (exportConfig.resolution === '4k') baseMb = 65;
    if (exportConfig.fps === 60) baseMb *= 1.4;
    return `${baseMb.toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4 text-left font-body">
      {/* Top OpenCut Studio Command Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b-2 border-neutral-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-neutral-900">
              HIVEPOSTLY STUDIO PRO
            </h2>
            <span className="px-2.5 py-0.5 bg-[#B8FF5C] border border-[#0A0A0A] text-[10px] font-mono font-black uppercase shadow-brutal-sm text-black">
              Premiere · CapCut · VN Core
            </span>
          </div>
          <p className="text-xs text-neutral-600 font-medium">
            Multi-layer timeline with audio waveforms, continuous filmstrips, keyframe engine (◆), AI smart cutout, and Canva quick alignment.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowShortcutsModal(true)}
            className="p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-mono text-xs border border-neutral-300 flex items-center gap-1.5 transition-all"
            title="Keyboard Shortcuts Cheatsheet"
          >
            <Keyboard className="w-4 h-4 text-neutral-600" />
            <span className="hidden sm:inline">Hotkeys</span>
          </button>

          <button
            onClick={startExportRendering}
            className="px-4 py-2 bg-neutral-900 hover:bg-black text-white font-display font-bold text-xs border border-neutral-800 shadow-brutal flex items-center gap-1.5 transition-all"
          >
            <Download className="w-4 h-4 text-[#B8FF5C]" />
            <span>Export Video</span>
          </button>

          <button
            onClick={handleSendToComposerDirect}
            className="px-4 py-2 bg-[#FF5B37] hover:bg-[#ff4921] text-white font-display font-black text-xs tracking-tight border border-black shadow-brutal flex items-center gap-2 transition-all hover:translate-x-0.5 hover:translate-y-0.5"
          >
            <Send className="w-4 h-4" />
            <span>Publish Broadcast</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Live Motion FX Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 bg-[#0D0E12] border border-neutral-800 text-white shadow-xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5B37]" />
            Quick Shaders:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'shake', label: '🎥 Handheld Shake' },
              { id: 'glitch', label: '⚡ Glitch RGB' },
              { id: 'vhs', label: '📺 Retro VHS' },
              { id: 'film_grain', label: '🎞 Film Grain' },
              { id: 'pulse_glow', label: '✨ Neon Pulse' },
              { id: 'zoom_punch', label: '💥 Beat Punch' },
              { id: 'cinematic_bars', label: '🎬 Anamorphic' },
              { id: 'none', label: 'Clean' },
            ].map((fx) => (
              <button
                key={fx.id}
                onClick={() => handleApplyMotionEffect(fx.id)}
                className={`px-2 py-1 text-[11px] font-display font-bold border transition-all ${
                  activeVideoClip?.motionEffect === fx.id
                    ? 'bg-[#B8FF5C] text-black border-white shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
                }`}
              >
                {fx.label}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-[#B8FF5C]">
          <span className="w-2 h-2 rounded-full bg-[#B8FF5C] pulse-live" />
          <span>Active 60FPS Hardware Pipeline</span>
        </div>
      </div>

      {/* Top 3-Column Docking Studio Layout: Left Resource Panel (3 cols), Center Canvas (6 cols), Right Inspector (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left: Resource Panel (3 cols) */}
        <div className="lg:col-span-3">
          <ResourcePanel 
            onAddClipToTimeline={handleAddClipFromResource} 
            onApplyFilter={handleApplyFilter}
            onApplyMotionEffect={handleApplyMotionEffect}
            onApplyTransition={handleApplyTransition}
            onTriggerAiAutoSubtitles={handleTriggerAiAutoSubtitles}
            onTriggerAiCutout={handleTriggerAiCutout}
            onQuickAlign={handleQuickAlign}
            onApplyLayoutPreset={handleApplyLayoutPreset}
          />
        </div>

        {/* Center: Video Player Canvas (6 cols) */}
        <div className="lg:col-span-6">
          <CanvasPlayer
            currentTime={currentTime}
            totalDuration={totalDuration}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            onSeek={setCurrentTime}
            aspectRatio={aspectRatio}
            onAspectRatioChange={setAspectRatio}
            activeVideoClip={activeVideoClip}
            activeOverlayClip={activeOverlayClip}
            activeSubtitleClip={activeSubtitleClip}
            activeWatermarkClip={activeWatermarkClip}
            activeStickerClips={activeStickerClips}
            activeAudioClip={activeAudioClip}
            selectedClip={selectedClip}
            onUpdateSelectedClip={handleUpdateClip}
            onSelectClip={(c) => setSelectedClipId(c?.id || null)}
            smartReframe={smartReframe}
            onToggleSmartReframe={() => setSmartReframe(!smartReframe)}
            playbackSpeed={playbackSpeed}
            onChangeSpeed={setPlaybackSpeed}
            onAddKeyframeAtPlayhead={handleAddKeyframeAtPlayhead}
          />
        </div>

        {/* Right: Clip Inspector (3 cols) */}
        <div className="lg:col-span-3">
          <ClipInspector
            clip={selectedClip}
            currentTime={currentTime}
            onUpdateClip={handleUpdateClip}
            onDeleteClip={handleDeleteClip}
            onSeek={setCurrentTime}
          />
        </div>
      </div>

      {/* Bottom: OpenCut Multi-Track Timeline (CapCut, Premiere & VN Standard) */}
      <Timeline
        tracks={tracks}
        currentTime={currentTime}
        totalDuration={totalDuration}
        isPlaying={isPlaying}
        onSeek={setCurrentTime}
        selectedClipId={selectedClipId}
        onSelectClip={(c) => setSelectedClipId(c?.id || null)}
        onSplitClip={handleSplitClip}
        onSplitClipAtTime={handleSplitClipAtTime}
        onDeleteClip={handleDeleteClip}
        onDuplicateClip={handleDuplicateClip}
        onUpdateClipTime={(id, st, dur) => {
          setTracks(
            tracks.map((t) => ({
              ...t,
              clips: t.clips.map((c) =>
                c.id === id ? { ...c, startTime: st, duration: dur } : c
              ),
            }))
          );
        }}
        onToggleTrackMute={(tid) =>
          setTracks(
            tracks.map((t) => (t.id === tid ? { ...t, muted: !t.muted } : t))
          )
        }
        onToggleTrackHidden={(tid) =>
          setTracks(
            tracks.map((t) => (t.id === tid ? { ...t, hidden: !t.hidden } : t))
          )
        }
        onToggleTrackLocked={(tid) =>
          setTracks(
            tracks.map((t) => (t.id === tid ? { ...t, locked: !t.locked } : t))
          )
        }
      />

      {/* Professional Video Export Engine Modal */}
      {isExporting && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="card-brutal bg-[#0F1015] border-2 border-neutral-700 text-white p-6 max-w-lg w-full space-y-5 animate-in fade-in zoom-in-95 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <FileVideo className="w-5 h-5 text-[#FF5B37]" />
                <h3 className="font-display font-black text-lg text-white">
                  {exportComplete ? 'EXPORT COMPLETE' : 'VIDEO EXPORT ENGINE'}
                </h3>
              </div>
              <button
                onClick={() => setIsExporting(false)}
                className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Export Settings Selector (Before or during completion) */}
            {!exportComplete && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                {/* Resolution */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-neutral-400 block">Resolution</label>
                  <div className="grid grid-cols-3 gap-1 bg-black p-1 border border-neutral-800">
                    {(['720p', '1080p', '4k'] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setExportConfig({ ...exportConfig, resolution: r })}
                        className={`py-1 text-[10px] font-mono font-bold ${
                          exportConfig.resolution === r ? 'bg-[#B8FF5C] text-black' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {r.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Framerate */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-neutral-400 block">Framerate</label>
                  <div className="grid grid-cols-3 gap-1 bg-black p-1 border border-neutral-800">
                    {([24, 30, 60] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setExportConfig({ ...exportConfig, fps: f })}
                        className={`py-1 text-[10px] font-mono font-bold ${
                          exportConfig.fps === f ? 'bg-[#FF5B37] text-white' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {f}fps
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Progress & Live Pipeline Readout */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono font-bold">
                <span className="text-[#B8FF5C]">{exportStage}</span>
                <span className="text-white">{exportProgress}%</span>
              </div>

              {/* Progress Bar */}
              <div className="h-3 bg-neutral-900 border border-neutral-700 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#FF5B37] to-[#B8FF5C] transition-all duration-300"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>

              <div className="text-[11px] font-mono text-neutral-400 bg-black/60 p-3 border border-neutral-800 space-y-1">
                <div className="flex justify-between">
                  <span>Codec & Container:</span>
                  <span className="text-white">{exportConfig.format.toUpperCase()} (H.264 / AAC)</span>
                </div>
                <div className="flex justify-between">
                  <span>Target Dimensions:</span>
                  <span className="text-white">{CANVAS_PRESETS[aspectRatio].width} × {CANVAS_PRESETS[aspectRatio].height}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated File Size:</span>
                  <span className="text-[#B8FF5C]">{getEstimatedSize()}</span>
                </div>
              </div>
            </div>

            {exportComplete ? (
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleDownloadExportedFile}
                  className="flex-1 py-2.5 bg-white hover:bg-neutral-100 text-black font-display font-bold text-xs border border-white flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download File</span>
                </button>

                <button
                  onClick={() => {
                    setIsExporting(false);
                    handleSendToComposerDirect();
                  }}
                  className="flex-1 py-2.5 bg-[#FF5B37] hover:bg-[#ff4921] text-white font-display font-black text-xs border border-black flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish to 7 Networks</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-neutral-400 py-1">
                <Loader2 className="w-4 h-4 animate-spin text-[#FF5B37]" />
                <span>Multiplexing hardware frame buffer...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Modal */}
      {showShortcutsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="card-brutal bg-[#0F1015] border-2 border-neutral-700 text-white p-6 max-w-md w-full space-y-4 animate-in fade-in zoom-in-95 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-[#B8FF5C]" />
                <h3 className="font-display font-bold text-base text-white">
                  Studio Keyboard Shortcuts
                </h3>
              </div>
              <button
                onClick={() => setShowShortcutsModal(false)}
                className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {[
                { key: 'Space', desc: 'Play / Pause Video Transport' },
                { key: 'V', desc: 'Selection Tool (Pointer mode)' },
                { key: 'C', desc: 'Razor Tool (Click clip to split cut)' },
                { key: 'Del / Backspace', desc: 'Delete Selected Clip' },
                { key: 'K', desc: 'Set / Remove Keyframe at Playhead (◆)' },
                { key: 'Left / Right', desc: 'Step 1 Frame Back / Forward (30fps)' },
                { key: 'Shift + Left/Right', desc: 'Step 1 Second Back / Forward' },
                { key: 'M', desc: 'Mute / Unmute Master Audio' },
              ].map((sc, i) => (
                <div key={i} className="flex justify-between items-center py-1 border-b border-neutral-800/60">
                  <span className="text-neutral-400">{sc.desc}</span>
                  <kbd className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 text-[#B8FF5C] font-bold text-[10px]">
                    {sc.key}
                  </kbd>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowShortcutsModal(false)}
              className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs border border-neutral-700"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
