import { Platform } from '../types';

export interface PlatformConfig {
  name: string;
  badgeBg: string;
  borderColor: string;
  textColor: string;
  gradient: string;
  glowColor: string;
  iconName: string;
}

export const platformConfigs: Record<Platform, PlatformConfig> = {
  instagram: {
    name: 'Instagram',
    badgeBg: 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white',
    borderColor: 'border-pink-500/40',
    textColor: 'text-pink-400',
    gradient: 'from-[#833ab4] via-[#fd1d1d] to-[#fcb045]',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    iconName: 'Instagram',
  },
  youtube: {
    name: 'YouTube',
    badgeBg: 'bg-red-600 text-white',
    borderColor: 'border-red-500/40',
    textColor: 'text-red-400',
    gradient: 'from-red-600 to-rose-700',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    iconName: 'Youtube',
  },
  linkedin: {
    name: 'LinkedIn',
    badgeBg: 'bg-[#0A66C2] text-white',
    borderColor: 'border-sky-500/40',
    textColor: 'text-sky-400',
    gradient: 'from-[#0A66C2] to-blue-700',
    glowColor: 'rgba(14, 165, 233, 0.4)',
    iconName: 'Linkedin',
  },
  x: {
    name: 'X (Twitter)',
    badgeBg: 'bg-zinc-800 text-white border border-zinc-700',
    borderColor: 'border-zinc-500/40',
    textColor: 'text-zinc-200',
    gradient: 'from-zinc-800 to-slate-900',
    glowColor: 'rgba(255, 255, 255, 0.25)',
    iconName: 'Twitter',
  },
  tiktok: {
    name: 'TikTok',
    badgeBg: 'bg-gradient-to-r from-cyan-400 to-rose-500 text-black font-semibold',
    borderColor: 'border-cyan-500/40',
    textColor: 'text-cyan-400',
    gradient: 'from-[#00f2fe] to-[#4facfe]',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    iconName: 'Video',
  },
  threads: {
    name: 'Threads',
    badgeBg: 'bg-zinc-900 text-white border border-zinc-700',
    borderColor: 'border-zinc-600/40',
    textColor: 'text-slate-200',
    gradient: 'from-zinc-900 to-neutral-900',
    glowColor: 'rgba(255, 255, 255, 0.2)',
    iconName: 'MessageSquare',
  },
  facebook: {
    name: 'Facebook',
    badgeBg: 'bg-[#1877F2] text-white',
    borderColor: 'border-blue-500/40',
    textColor: 'text-blue-400',
    gradient: 'from-[#1877F2] to-blue-800',
    glowColor: 'rgba(37, 99, 235, 0.4)',
    iconName: 'Facebook',
  },
};
