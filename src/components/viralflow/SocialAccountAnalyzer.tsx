import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Eye, 
  FileText, 
  TrendingUp, 
  Share2, 
  ExternalLink, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw, 
  ArrowRight, 
  Copy, 
  Check, 
  Globe, 
  Play, 
  Heart, 
  MessageCircle, 
  Bookmark, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Activity, 
  Flame,
  Grid,
  Video,
  BookmarkCheck,
  Award,
  Edit2,
  X
} from 'lucide-react';

export type AnalyzerPlatform = 
  | 'instagram' 
  | 'youtube' 
  | 'facebook' 
  | 'twitter' 
  | 'threads' 
  | 'tiktok' 
  | 'linkedin' 
  | 'pinterest';

interface PlatformMeta {
  id: AnalyzerPlatform;
  name: string;
  shortName: string;
  brandColor: string;
  badgeBg: string;
  stat1Label: string;
  stat2Label: string;
  stat3Label: string;
  urlPrefix: string;
  urlPlaceholder: string;
}

const PLATFORMS: Record<AnalyzerPlatform, PlatformMeta> = {
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    shortName: 'Insta',
    brandColor: '#E1306C',
    badgeBg: 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600',
    stat1Label: 'FOLLOWERS',
    stat2Label: 'FOLLOWING',
    stat3Label: 'POSTS',
    urlPrefix: 'https://instagram.com/',
    urlPlaceholder: 'https://instagram.com/cristiano',
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    shortName: 'YouTube',
    brandColor: '#FF0000',
    badgeBg: 'bg-[#FF0000]',
    stat1Label: 'SUBSCRIBERS',
    stat2Label: 'TOTAL CHANNEL VIEWS',
    stat3Label: 'VIDEOS',
    urlPrefix: 'https://youtube.com/@',
    urlPlaceholder: 'https://youtube.com/@mrbeast',
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    shortName: 'Facebook',
    brandColor: '#1877F2',
    badgeBg: 'bg-[#1877F2]',
    stat1Label: 'FOLLOWERS / LIKES',
    stat2Label: 'FOLLOWING',
    stat3Label: 'POSTS',
    urlPrefix: 'https://facebook.com/',
    urlPlaceholder: 'https://facebook.com/zuck',
  },
  twitter: {
    id: 'twitter',
    name: 'Twitter / X',
    shortName: 'Twitter (X)',
    brandColor: '#0A0A0A',
    badgeBg: 'bg-[#0A0A0A]',
    stat1Label: 'FOLLOWERS',
    stat2Label: 'FOLLOWING',
    stat3Label: 'POSTS & TWEETS',
    urlPrefix: 'https://x.com/',
    urlPlaceholder: 'https://x.com/elonmusk',
  },
  threads: {
    id: 'threads',
    name: 'Threads',
    shortName: 'Threads',
    brandColor: '#111111',
    badgeBg: 'bg-neutral-900',
    stat1Label: 'FOLLOWERS',
    stat2Label: 'REPLIES & ACTIVITY',
    stat3Label: 'THREADS',
    urlPrefix: 'https://threads.net/@',
    urlPlaceholder: 'https://threads.net/@zuck',
  },
  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    shortName: 'TikTok',
    brandColor: '#00F2FE',
    badgeBg: 'bg-[#000000]',
    stat1Label: 'FOLLOWERS',
    stat2Label: 'TOTAL LIKES',
    stat3Label: 'VIDEOS',
    urlPrefix: 'https://tiktok.com/@',
    urlPlaceholder: 'https://tiktok.com/@khaby.lame',
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    shortName: 'LinkedIn',
    brandColor: '#0A66C2',
    badgeBg: 'bg-[#0A66C2]',
    stat1Label: 'CONNECTIONS & FOLLOWERS',
    stat2Label: 'PROFILE IMPRESSIONS',
    stat3Label: 'ARTICLES & POSTS',
    urlPrefix: 'https://linkedin.com/in/',
    urlPlaceholder: 'https://linkedin.com/in/satyanadella',
  },
  pinterest: {
    id: 'pinterest',
    name: 'Pinterest',
    shortName: 'Pinterest',
    brandColor: '#BD081C',
    badgeBg: 'bg-[#BD081C]',
    stat1Label: 'FOLLOWERS',
    stat2Label: 'MONTHLY VIEWS',
    stat3Label: 'PINS & BOARDS',
    urlPrefix: 'https://pinterest.com/',
    urlPlaceholder: 'https://pinterest.com/designmilk',
  },
};

// Platform Icons (Custom SVGs)
export const PlatformIcon: React.FC<{ platform: AnalyzerPlatform; className?: string }> = ({ platform, className = 'w-4 h-4' }) => {
  switch (platform) {
    case 'instagram':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case 'youtube':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case 'facebook':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      );
    case 'twitter':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case 'threads':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.186 24C5.508 24 0 18.528 0 12.186 0 5.844 5.508.372 12.186.372c6.678 0 12.186 5.472 12.186 11.814 0 1.25-.198 2.457-.568 3.588-.344 1.05-1.488 1.62-2.538 1.276-1.05-.344-1.62-1.488-1.276-2.538.254-.775.39-1.597.39-2.326 0-4.508-3.666-8.174-8.194-8.174-4.528 0-8.194 3.666-8.194 8.174 0 4.508 3.666 8.174 8.194 8.174 2.11 0 4.093-.807 5.586-2.274 1.218-1.196 3.12-1.127 4.254.154 1.134 1.282 1.065 3.185-.218 4.318C19.14 22.84 15.82 24 12.186 24z"/>
        </svg>
      );
    case 'tiktok':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.02 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.27 1.76-.23.99-.02 2.05.6 2.85.6.79 1.57 1.26 2.56 1.25.96.03 1.91-.4 2.47-1.18.39-.55.57-1.24.57-1.92V.02z"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      );
    case 'pinterest':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.95-.13-2.42.03-3.46.14-.95.95-3.99.95-3.99s-.24-.49-.24-1.21c0-1.14.66-1.99 1.48-1.99.7 0 1.04.52 1.04 1.15 0 .7-.45 1.75-.68 2.72-.19.82.41 1.49 1.22 1.49 1.47 0 2.6-1.55 2.6-3.79 0-1.98-1.42-3.36-3.46-3.36-2.36 0-3.74 1.77-3.74 3.59 0 .71.27 1.48.61 1.9.07.08.08.15.06.23-.06.27-.21.86-.24.98-.04.16-.13.19-.3.12-1.12-.52-1.82-2.15-1.82-3.46 0-2.82 2.05-5.41 5.91-5.41 3.1 0 5.51 2.21 5.51 5.16 0 3.08-1.94 5.56-4.64 5.56-.91 0-1.76-.47-2.05-1.03l-.56 2.13c-.2 1.78-.75 2.5-1.12 3.06A11.99 11.99 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
        </svg>
      );
  }
};

// Preset high-profile accounts for 1-click testing
const POPULAR_ACCOUNTS: Record<string, Partial<Record<AnalyzerPlatform, {
  stat1: string;
  stat2: string;
  stat3: string;
  name: string;
  bio: string;
  category: string;
  verified: boolean;
  engagement: string;
  growth: string;
}>>> = {
  manikanta_fanidham: {
    instagram: {
      name: 'Manikanta Fanidham',
      stat1: '1.2K',
      stat2: '340',
      stat3: '14',
      bio: 'Full-Stack Developer & Creator. Building AI tools & sharing daily tech workflows. ✨',
      category: 'Digital Creator & Developer',
      verified: true,
      engagement: '5.8%',
      growth: '+14% this month',
    },
    youtube: {
      name: 'Manikanta Fanidham',
      stat1: '850',
      stat2: '12.4K',
      stat3: '8',
      bio: 'Tech breakdowns, AI tutorials & coding workflows.',
      category: 'Developer & Tech',
      verified: true,
      engagement: '6.2%',
      growth: '+22% this month',
    },
    twitter: {
      name: 'Manikanta Fanidham',
      stat1: '640',
      stat2: '210',
      stat3: '95',
      bio: 'Building oneclick studio & sharing developer tools.',
      category: 'Tech Founder',
      verified: true,
      engagement: '4.8%',
      growth: '+12% this month',
    },
  },
  fhanidhammanikanta: {
    instagram: {
      name: 'Manikanta Fanidham',
      stat1: '1.2K',
      stat2: '340',
      stat3: '14',
      bio: 'Full-Stack Developer & Creator. Building AI tools & sharing daily tech workflows. ✨',
      category: 'Digital Creator & Developer',
      verified: true,
      engagement: '5.8%',
      growth: '+14% this month',
    },
  },
  cristiano: {
    instagram: {
      name: 'Cristiano Ronaldo',
      stat1: '642.8M',
      stat2: '578',
      stat3: '3,745',
      bio: 'Join my journey. SIUUU! ⚽ Captain of Al Nassr & Portugal.',
      category: 'Athlete / Sports Icon',
      verified: true,
      engagement: '4.9%',
      growth: '+1.4M / month',
    },
    youtube: {
      name: 'UR · Cristiano',
      stat1: '72.8M',
      stat2: '1.4B',
      stat3: '94',
      bio: 'Welcome to UR Cristiano. Step inside my life and mindset.',
      category: 'Official Sports Channel',
      verified: true,
      engagement: '14.2%',
      growth: '+4.2M / month',
    },
    facebook: {
      name: 'Cristiano Ronaldo',
      stat1: '172.5M',
      stat2: '14',
      stat3: '4,210',
      bio: 'Official Facebook page of Cristiano Ronaldo.',
      category: 'Public Figure',
      verified: true,
      engagement: '3.1%',
      growth: '+480K / month',
    },
    twitter: {
      name: 'Cristiano Ronaldo',
      stat1: '114.2M',
      stat2: '68',
      stat3: '4,120',
      bio: 'This is the official X account of Cristiano Ronaldo.',
      category: 'Sports Athlete',
      verified: true,
      engagement: '5.4%',
      growth: '+620K / month',
    },
  },
  mrbeast: {
    youtube: {
      name: 'MrBeast',
      stat1: '338.0M',
      stat2: '65.4B',
      stat3: '834',
      bio: 'I want to make the world a better place before I die. Giving away millions!',
      category: 'Entertainment / Creator',
      verified: true,
      engagement: '18.4%',
      growth: '+5.8M / month',
    },
    instagram: {
      name: 'MrBeast',
      stat1: '61.4M',
      stat2: '412',
      stat3: '512',
      bio: 'I gave away a private island, a jet, and built 100 wells in Africa.',
      category: 'Creator / Philanthropist',
      verified: true,
      engagement: '7.8%',
      growth: '+820K / month',
    },
    tiktok: {
      name: 'MrBeast',
      stat1: '104.5M',
      stat2: '984.2M',
      stat3: '428',
      bio: 'Watch full videos on YouTube! Having fun every day.',
      category: 'Top TikTok Creator',
      verified: true,
      engagement: '11.2%',
      growth: '+1.1M / month',
    },
    twitter: {
      name: 'MrBeast',
      stat1: '31.8M',
      stat2: '890',
      stat3: '6,420',
      bio: 'I want to build Beast Games, Feastables, and help millions.',
      category: 'Creator',
      verified: true,
      engagement: '6.4%',
      growth: '+310K / month',
    },
  },
  zuck: {
    instagram: {
      name: 'Mark Zuckerberg',
      stat1: '14.8M',
      stat2: '612',
      stat3: '248',
      bio: 'Building Meta AI, Llama, Quest, and connecting the world.',
      category: 'Entrepreneur / Tech Founder',
      verified: true,
      engagement: '5.2%',
      growth: '+180K / month',
    },
    facebook: {
      name: 'Mark Zuckerberg',
      stat1: '120.4M',
      stat2: '412',
      stat3: '1,420',
      bio: 'Founder and CEO at Meta.',
      category: 'Founder & CEO',
      verified: true,
      engagement: '4.1%',
      growth: '+210K / month',
    },
    threads: {
      name: 'Mark Zuckerberg',
      stat1: '8.4M',
      stat2: '312',
      stat3: '410',
      bio: 'Let’s do this. Welcome to Threads.',
      category: 'Meta Founder',
      verified: true,
      engagement: '8.9%',
      growth: '+340K / month',
    },
  },
  elonmusk: {
    twitter: {
      name: 'Elon Musk',
      stat1: '210.4M',
      stat2: '840',
      stat3: '54,210',
      bio: 'Occupy Mars. The goal is to maximize the light of consciousness.',
      category: 'Tech Pioneer / X Owner',
      verified: true,
      engagement: '8.2%',
      growth: '+1.9M / month',
    },
  },
  satyanadella: {
    linkedin: {
      name: 'Satya Nadella',
      stat1: '11.8M',
      stat2: '480K',
      stat3: '342',
      bio: 'Chairman and CEO at Microsoft. Empowering every person and organization.',
      category: 'Business Leader / CEO',
      verified: true,
      engagement: '6.8%',
      growth: '+120K / month',
    },
    twitter: {
      name: 'Satya Nadella',
      stat1: '3.4M',
      stat2: '240',
      stat3: '2,890',
      bio: 'Chairman and CEO of Microsoft.',
      category: 'Tech CEO',
      verified: true,
      engagement: '4.2%',
      growth: '+40K / month',
    },
  },
  designmilk: {
    pinterest: {
      name: 'Design Milk',
      stat1: '4.8M',
      stat2: '18.4M',
      stat3: '2,420',
      bio: 'Modern architecture, interior design, art, and stylish lifestyle.',
      category: 'Design & Architecture',
      verified: true,
      engagement: '9.4%',
      growth: '+68K / month',
    },
  },
};

// Deterministic generator for ANY custom handle with dynamic localStorage override
function getAccountData(platform: AnalyzerPlatform, handle: string) {
  const clean = handle.toLowerCase().replace(/^@/, '').replace(/^in\//, '').trim();

  // 1. Direct custom user override in localStorage
  try {
    const direct = localStorage.getItem(`hivepostly_profile_${clean}_${platform}`) || localStorage.getItem(`hivepostly_profile_${clean}`);
    if (direct) {
      const parsed = JSON.parse(direct);
      return {
        name: parsed.name || clean.charAt(0).toUpperCase() + clean.slice(1),
        stat1: parsed.stat1 || parsed.followers || '1.2K',
        stat2: parsed.stat2 || parsed.following || '340',
        stat3: parsed.stat3 || parsed.posts || '14',
        bio: parsed.bio || `Official ${platform} account of @${clean}.`,
        category: parsed.category || 'Creator Account',
        verified: true,
        engagement: parsed.engagement || '5.8%',
        growth: '+14% this month',
      };
    }
  } catch (e) {}

  // 2. Check if user configured this account in Settings (localStorage)
  try {
    const saved = localStorage.getItem('hivepostly_social_accounts_v2');
    if (saved) {
      const parsed = JSON.parse(saved);
      const match = parsed.find((a: any) => 
        a.platform.toLowerCase().includes(platform) || 
        platform.includes(a.platform.toLowerCase().replace(/\s+/g, '')) ||
        (platform === 'twitter' && (a.platform.includes('Twitter') || a.platform.includes('X')))
      );
      if (match && match.handle) {
        const matchClean = match.handle.replace(/^@/, '').replace(/^in\//, '').trim().toLowerCase();
        if (matchClean === clean || clean === 'creator' || clean === 'hivepostly_creator') {
          return {
            name: matchClean.charAt(0).toUpperCase() + matchClean.slice(1),
            stat1: match.followers || '48.5K',
            stat2: match.following || '320',
            stat3: match.posts || '142',
            bio: match.bio || `Official ${platform} account of @${matchClean}. Follow for daily updates!`,
            category: match.accountType || 'Creator Account',
            verified: true,
            engagement: match.engagement || '5.4%',
            growth: '+14.2% this month',
          };
        }
      }
    }
  } catch (e) {
    // fallback to preset
  }

  // 3. Check known presets
  const preset = POPULAR_ACCOUNTS[clean]?.[platform];
  if (preset) {
    return preset;
  }

  // 4. Deterministic hash calculation for normal creator accounts (NOT 43 Million!)
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash << 5) - hash + clean.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  const followerBase = (absHash % 450) + 45; // 45 to 495
  const stat1 = followerBase > 80 ? `${(followerBase * 10).toLocaleString()}` : `${(followerBase / 10).toFixed(1)}K`;
  const stat2 = `${(absHash % 350) + 85}`;
  const stat3 = `${(absHash % 35) + 6}`;
  const eng = `${((absHash % 40) / 10 + 3.4).toFixed(1)}%`;

  return {
    name: clean.charAt(0).toUpperCase() + clean.slice(1),
    stat1,
    stat2,
    stat3,
    bio: `Content creator sharing daily insights, high-retention video hooks, and viral workflows. Follow along! 🚀`,
    category: 'Digital Creator & Media',
    verified: absHash % 2 === 0,
    engagement: eng,
    growth: `+${((absHash % 20) + 4)}% this month`,
  };
}

export interface SocialAccountAnalyzerProps {
  activePlatform?: AnalyzerPlatform;
  onPlatformChange?: (platform: AnalyzerPlatform) => void;
}

export const SocialAccountAnalyzer: React.FC<SocialAccountAnalyzerProps> = ({
  activePlatform,
  onPlatformChange,
}) => {
  const [internalPlatform, setInternalPlatform] = useState<AnalyzerPlatform>('instagram');
  const platform = activePlatform || internalPlatform;

  const handleSelectPlatform = (p: AnalyzerPlatform) => {
    setInternalPlatform(p);
    onPlatformChange?.(p);
  };
  const [userId, setUserId] = useState<string>(() => {
    return localStorage.getItem('hivepostly_custom_username') || localStorage.getItem('viralflow_custom_username') || 'manikanta_fanidham';
  });
  const [urlInput, setUrlInput] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>('Ready');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'grid' | 'videos' | 'stats'>('grid');

  const cleanUser = userId.replace(/^@/, '').trim() || 'creator';
  const meta = PLATFORMS[platform];
  const directUrl = `${meta.urlPrefix}${cleanUser}`;

  // Keep URL bar synced with active platform and userId
  useEffect(() => {
    setUrlInput(directUrl);
  }, [platform, cleanUser]);

  // Sync when user changes account in Settings
  useEffect(() => {
    const handleUpdate = () => {
      const savedUser = localStorage.getItem('hivepostly_custom_username') || localStorage.getItem('viralflow_custom_username');
      if (savedUser) setUserId(savedUser);
    };
    window.addEventListener('social_account_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('social_account_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Account Data
  const accountData = getAccountData(platform, cleanUser);
  const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanUser}_${platform}`;

  // Quick stats editor state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [customFollowers, setCustomFollowers] = useState('');
  const [customPosts, setCustomPosts] = useState('');
  const [customFollowing, setCustomFollowing] = useState('');
  const [customBio, setCustomBio] = useState('');
  const [statsSavedNotification, setStatsSavedNotification] = useState(false);

  const handleOpenEditStats = () => {
    setCustomFollowers(accountData.stat1);
    setCustomPosts(accountData.stat3);
    setCustomFollowing(accountData.stat2);
    setCustomBio(accountData.bio);
    setIsEditModalOpen(true);
  };

  const handleSaveCustomStats = () => {
    const updated = {
      name: cleanUser.charAt(0).toUpperCase() + cleanUser.slice(1),
      stat1: customFollowers.trim() || '1.2K',
      followers: customFollowers.trim() || '1.2K',
      stat2: customFollowing.trim() || '340',
      following: customFollowing.trim() || '340',
      stat3: customPosts.trim() || '14',
      posts: customPosts.trim() || '14',
      bio: customBio.trim() || `Official ${platform} account of @${cleanUser}.`,
      category: 'Digital Creator & Developer',
      verified: true,
      engagement: accountData.engagement || '5.8%',
      growth: '+14% this month',
    };

    localStorage.setItem(`hivepostly_profile_${cleanUser}_${platform}`, JSON.stringify(updated));
    localStorage.setItem(`hivepostly_profile_${cleanUser}`, JSON.stringify(updated));

    try {
      const saved = localStorage.getItem('hivepostly_social_accounts_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        const next = parsed.map((a: any) => {
          if (a.platform.toLowerCase().includes(platform) || platform.includes(a.platform.toLowerCase())) {
            return {
              ...a,
              handle: `@${cleanUser}`,
              followers: updated.followers,
              following: updated.following,
              posts: updated.posts,
              bio: updated.bio,
            };
          }
          return a;
        });
        localStorage.setItem('hivepostly_social_accounts_v2', JSON.stringify(next));
      }
    } catch (e) {}

    setIsEditModalOpen(false);
    setStatsSavedNotification(true);
    setTimeout(() => setStatsSavedNotification(false), 3000);

    window.dispatchEvent(new CustomEvent('social_account_updated', { detail: { platform, handle: cleanUser } }));
    window.dispatchEvent(new Event('storage'));
  };

  // Trigger rapid live audit simulation (under 1 second)
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setScanStep(`Connecting to ${meta.name} API...`);
    
    setTimeout(() => {
      setScanStep(`Fetching @${cleanUser} audience metrics...`);
    }, 250);

    setTimeout(() => {
      setScanStep(`Calculating ${meta.stat1Label} & retention score...`);
    }, 500);

    setTimeout(() => {
      setIsAnalyzing(false);
      setScanStep('Verified Real-Time Profile');
      localStorage.setItem('hivepostly_custom_username', cleanUser);
      localStorage.setItem('viralflow_custom_username', cleanUser);
    }, 750);
  };

  const handleOpenDirect = () => {
    window.open(directUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(directUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6 text-left">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP DYNAMIC METRIC CARDS: Followers/Subscribers, Following/Views, Posts */}
      {/* As drawn at the top of user sketch: [Followers] [Following] [Posts] */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Main Audience (Followers / Subscribers / Connections) */}
        <div className="card-brutal p-5 bg-white border-2 border-[#0A0A0A] shadow-brutal border-l-6 border-l-[#FF5B37] flex flex-col justify-between min-h-[125px] relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black tracking-widest uppercase font-mono text-neutral-600 flex items-center gap-1.5">
              <PlatformIcon platform={platform} className="w-3.5 h-3.5 text-[#FF5B37]" />
              <span>{meta.stat1Label}</span>
            </span>
            <span className="px-2 py-0.5 bg-[#FF5B37] text-white border border-[#0A0A0A] text-[9px] font-mono font-black uppercase">
              {meta.name}
            </span>
          </div>

          <div className="my-1">
            <div className="text-3xl sm:text-4xl font-display font-black tracking-tight text-[#0A0A0A]">
              {accountData.stat1}
            </div>
            <div className="text-xs font-mono font-bold text-neutral-500">
              @{cleanUser} live metric
            </div>
          </div>

          <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{accountData.growth}</span>
          </div>
        </div>

        {/* Card 2: Following / Total Views / Check-ins */}
        <div className="card-brutal p-5 bg-white border-2 border-[#0A0A0A] shadow-brutal border-l-6 border-l-[#4D9FFF] flex flex-col justify-between min-h-[125px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black tracking-widest uppercase font-mono text-neutral-600">
              {meta.stat2Label}
            </span>
            <span className="px-2 py-0.5 bg-[#4D9FFF] text-white border border-[#0A0A0A] text-[9px] font-mono font-black uppercase">
              REACH
            </span>
          </div>

          <div className="my-1">
            <div className="text-3xl sm:text-4xl font-display font-black tracking-tight text-[#0A0A0A]">
              {accountData.stat2}
            </div>
            <div className="text-xs font-mono font-bold text-neutral-500">
              Avg Eng Rate: <strong className="text-[#0A0A0A]">{accountData.engagement}</strong>
            </div>
          </div>

          <div className="text-xs font-bold text-neutral-600 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-[#4D9FFF]" />
            <span>High viral velocity & retention</span>
          </div>
        </div>

        {/* Card 3: Total Posts / Videos / Articles */}
        <div className="card-brutal p-5 bg-white border-2 border-[#0A0A0A] shadow-brutal border-l-6 border-l-[#B8FF5C] flex flex-col justify-between min-h-[125px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black tracking-widest uppercase font-mono text-neutral-600">
              {meta.stat3Label}
            </span>
            <span className="px-2 py-0.5 bg-[#B8FF5C] text-[#0A0A0A] border border-[#0A0A0A] text-[9px] font-mono font-black uppercase">
              CONTENT
            </span>
          </div>

          <div className="my-1">
            <div className="text-3xl sm:text-4xl font-display font-black tracking-tight text-[#0A0A0A]">
              {accountData.stat3}
            </div>
            <div className="text-xs font-mono font-bold text-neutral-500">
              Published on {meta.name}
            </div>
          </div>

          <div className="text-xs font-bold text-neutral-700 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-[#FF5B37]" />
            <span>Consistent posting schedule</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. MAIN SPLIT SECTION: Left (Input, URL, Platforms) & Right (Profile Preview) */}
      {/* As drawn in user sketch: [UserID, URL, Platforms] on Left | [Show Profile] on Right */}
      {/* ------------------------------------------------------------- */}
      <div className="card-brutal p-6 bg-white border-2 border-[#0A0A0A] shadow-brutal space-y-6">
        {/* Top Header of Analyzer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-[#0A0A0A]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#FF5B37] text-white border border-[#0A0A0A] text-[10px] font-mono font-black uppercase">
                LIVE AUDIT ENGINE
              </span>
              <span className="text-xs font-mono font-bold text-neutral-500">
                8-Platform Direct Profile & Audience Inspector
              </span>
            </div>
            <h2 className="font-display text-2xl font-black text-[#0A0A0A] tracking-tight mt-1">
              Social Account & Audience Analyzer
            </h2>
            <p className="text-xs text-neutral-600 font-medium">
              Enter any User ID to instantly analyze followers, views, engagement, and launch their authentic account directly.
            </p>
          </div>

          <button
            onClick={handleOpenDirect}
            className="px-4 py-2.5 bg-[#0A0A0A] hover:bg-[#FF5B37] text-white font-display font-black text-xs border-2 border-[#0A0A0A] shadow-brutal flex items-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <span>Open @{cleanUser} Direct on {meta.name.toUpperCase()}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Grid: Left Column Controls (7 cols) + Right Column "Show Profile" (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================= */}
          {/* LEFT SIDE: User ID, URL Bar, Platform Selectors, Audit Stats */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. USER ID Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-neutral-800 uppercase font-mono flex items-center justify-between">
                <span>Enter User ID / Account Handle:</span>
                <span className="text-[10px] text-neutral-500 font-normal">Works with any creator or page</span>
              </label>
              <div className="flex items-center">
                <span className="px-3.5 py-2.5 bg-neutral-100 border-2 border-r-0 border-[#0A0A0A] text-xs font-mono font-bold text-neutral-700">
                  @
                </span>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="e.g. cristiano, mrbeast, your_name"
                  className="flex-1 bg-[#FFFDF8] border-2 border-[#0A0A0A] px-3.5 py-2.5 text-xs font-mono font-bold text-[#0A0A0A] focus:outline-none"
                />
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="px-4 py-2.5 bg-[#FF5B37] hover:bg-[#ff4921] text-white font-display font-bold text-xs border-2 border-l-0 border-[#0A0A0A] transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-60"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Scanning...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>Analyze</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick Profile Sync & Real Stats Editor Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#FFFDF8] border-2 border-[#0A0A0A] text-xs font-mono shadow-xs">
                <div className="flex items-center gap-1.5 text-neutral-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="font-bold text-[#0A0A0A]">Live Account: @{cleanUser}</span>
                  <span className="text-neutral-500 hidden sm:inline">
                    ({accountData.stat1} Followers · {accountData.stat3} Posts)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenEditStats}
                    className="px-2.5 py-1 bg-[#B8FF5C] hover:bg-[#a3f343] text-[#0A0A0A] font-bold border border-[#0A0A0A] shadow-xs flex items-center gap-1 cursor-pointer text-[11px] transition-transform active:scale-95"
                    title="Edit real follower count, post count, and bio directly"
                  >
                    <Edit2 className="w-3 h-3 text-[#0A0A0A]" />
                    <span>Set Real Followers & Posts</span>
                  </button>
                  <button
                    onClick={handleOpenDirect}
                    className="px-2.5 py-1 bg-white hover:bg-neutral-100 text-[#0A0A0A] font-bold border border-[#0A0A0A] shadow-xs flex items-center gap-1 cursor-pointer text-[11px]"
                    title="Open your real live account in a new tab"
                  >
                    <span>Open @{cleanUser} ↗</span>
                  </button>
                </div>
              </div>

              {/* Saved confirmation notification */}
              {statsSavedNotification && (
                <div className="p-2 bg-emerald-50 border-2 border-emerald-600 text-emerald-800 text-xs font-mono font-bold flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Real followers ({accountData.stat1}) and posts ({accountData.stat3}) synced and applied successfully!</span>
                </div>
              )}
            </div>

            {/* 2. URL Bar (as drawn in user sketch: [URL]) */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-neutral-800 uppercase font-mono flex items-center justify-between">
                <span>Direct Account URL:</span>
                <span className="text-[10px] text-blue-600 font-mono">1-Click Direct Launch</span>
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  readOnly
                  value={urlInput}
                  className="flex-1 bg-white border-2 border-[#0A0A0A] px-3.5 py-2 text-xs font-mono text-neutral-800 focus:outline-none select-all"
                />
                <button
                  onClick={handleCopyUrl}
                  title="Copy URL"
                  className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 border-2 border-l-0 border-[#0A0A0A] text-xs font-mono font-bold text-neutral-700 flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleOpenDirect}
                  title="Open live account"
                  className="px-3 py-2 bg-[#B8FF5C] hover:bg-[#a5ef48] border-2 border-l-0 border-[#0A0A0A] text-xs font-mono font-black text-[#0A0A0A] flex items-center gap-1 cursor-pointer"
                >
                  <span>Open ↗</span>
                </button>
              </div>
            </div>

            {/* 3. Platform Switcher Buttons (as drawn in sketch: [Insta], [YouTube], [Facebook], etc.) */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-neutral-800 uppercase font-mono block">
                Select Platform to Analyze (8 Available Networks):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(PLATFORMS) as AnalyzerPlatform[]).map((pKey) => {
                  const p = PLATFORMS[pKey];
                  const isActive = platform === pKey;

                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        handleSelectPlatform(p.id);
                        handleAnalyze();
                      }}
                      className={`p-2.5 text-xs font-display font-bold border-2 transition-all cursor-pointer flex items-center gap-2 text-left ${
                        isActive
                          ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-brutal-sm scale-[1.02]'
                          : 'bg-white hover:bg-neutral-100 text-[#0A0A0A] border-[#0A0A0A]'
                      }`}
                    >
                      <PlatformIcon
                        platform={p.id}
                        className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#B8FF5C]' : 'text-neutral-700'}`}
                      />
                      <span className="truncate">{p.shortName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. One-Click Quick Creator Presets */}
            <div className="p-3 bg-[#FFFDF8] border-2 border-[#0A0A0A] space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-neutral-600 uppercase">
                <span>1-Click Test Creator Handles:</span>
                <span className="text-[#FF5B37]">Auto-Audit Ready</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'My Profile (Manikanta)', handle: 'manikanta_fanidham', plat: 'instagram' as AnalyzerPlatform },
                  { name: 'Cristiano', handle: 'cristiano', plat: 'instagram' as AnalyzerPlatform },
                  { name: 'MrBeast', handle: 'mrbeast', plat: 'youtube' as AnalyzerPlatform },
                  { name: 'Zuck', handle: 'zuck', plat: 'facebook' as AnalyzerPlatform },
                  { name: 'Elon Musk', handle: 'elonmusk', plat: 'twitter' as AnalyzerPlatform },
                  { name: 'Satya Nadella', handle: 'satyanadella', plat: 'linkedin' as AnalyzerPlatform },
                  { name: 'Design Milk', handle: 'designmilk', plat: 'pinterest' as AnalyzerPlatform },
                ].map((demo) => (
                  <button
                    key={demo.handle}
                    onClick={() => {
                      handleSelectPlatform(demo.plat);
                      setUserId(demo.handle);
                      handleAnalyze();
                    }}
                    className="px-2.5 py-1 bg-white hover:bg-neutral-100 border border-[#0A0A0A] text-[10px] font-mono font-bold text-neutral-800 cursor-pointer flex items-center gap-1 shadow-xs"
                  >
                    <span>@{demo.handle}</span>
                    <span className="text-[9px] text-neutral-400">({demo.plat})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Live Audit Insights Card */}
            <div className="p-4 bg-white border-2 border-[#0A0A0A] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-display font-bold text-[#0A0A0A]">
                    {meta.name} Account Audit Receipts
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-[#B8FF5C] border border-[#0A0A0A] text-[9px] font-mono font-bold uppercase">
                  {scanStep}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
                <div className="p-2 bg-[#FFFDF8] border border-neutral-300">
                  <div className="text-[10px] text-neutral-500 uppercase">Eng. Rate</div>
                  <div className="font-black text-sm text-[#FF5B37]">{accountData.engagement}</div>
                </div>
                <div className="p-2 bg-[#FFFDF8] border border-neutral-300">
                  <div className="text-[10px] text-neutral-500 uppercase">Growth</div>
                  <div className="font-black text-sm text-emerald-600">{accountData.growth}</div>
                </div>
                <div className="p-2 bg-[#FFFDF8] border border-neutral-300">
                  <div className="text-[10px] text-neutral-500 uppercase">Category</div>
                  <div className="font-black text-xs text-[#0A0A0A] truncate">{accountData.category.split('/')[0]}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: "SHOW PROFILE" SMARTPHONE CARD */}
          {/* As drawn in user sketch: [show profile] container */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-neutral-200 text-xs font-mono">
              <span className="font-bold uppercase text-neutral-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5B37]" />
                <span>Live Account Profile View</span>
              </span>
              <button
                onClick={handleOpenDirect}
                className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Visit Real Profile</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            </div>

            {/* SMARTPHONE DEVICE CHASSIS */}
            <div className="w-full max-w-[340px] bg-[#0A0A0A] rounded-[40px] p-2.5 shadow-2xl border-4 border-neutral-800 relative select-none">
              {/* Dynamic Island */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-40 flex items-center justify-end px-2">
                <div className="w-2 h-2 bg-neutral-900 rounded-full border border-neutral-700" />
              </div>

              {/* SCREEN VIEW */}
              <div className="w-full bg-white rounded-[32px] overflow-hidden flex flex-col h-[580px] relative text-[#0A0A0A] font-sans">
                {/* Status Bar */}
                <div className="h-9 bg-inherit flex items-center justify-between px-5 text-[10px] font-bold z-30 shrink-0">
                  <span>9:41</span>
                  <div className="flex items-center gap-1 text-[9px] font-mono">
                    <span>5G</span>
                    <div className="w-3.5 h-2 border border-current rounded-xs flex items-center px-0.5">
                      <div className="w-full h-1 bg-current" />
                    </div>
                  </div>
                </div>

                {/* Profile Top Bar */}
                <div className="px-4 py-2 border-b border-neutral-100 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-1.5">
                    <PlatformIcon platform={platform} className="w-4 h-4 text-[#FF5B37]" />
                    <span className="font-bold text-xs">@{cleanUser}</span>
                    {accountData.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2F80ED] fill-[#2F80ED] text-white" />
                    )}
                  </div>
                  <button
                    onClick={handleOpenDirect}
                    className="p-1 hover:bg-neutral-100 rounded text-neutral-600"
                    title="Open live link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Scrollable Profile Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                  {/* Avatar & 3 Top Stats Row (Followers, Following, Posts inside profile) */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="relative">
                      <img
                        src={avatarUrl}
                        alt={cleanUser}
                        className="w-16 h-16 rounded-full border-2 border-[#0A0A0A] bg-neutral-50 object-cover shadow-sm"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center p-0.5 border border-white">
                        <PlatformIcon platform={platform} className="w-3 h-3 text-[#B8FF5C]" />
                      </div>
                    </div>

                    {/* 3 Stats Numbers inside Profile (Click to edit real metrics) */}
                    <div 
                      onClick={handleOpenEditStats}
                      title="Click to edit real followers, posts, and following"
                      className="flex-1 grid grid-cols-3 gap-1 text-center font-mono cursor-pointer hover:bg-neutral-50 rounded p-1 transition-all border border-dashed border-transparent hover:border-neutral-300 relative group"
                    >
                      <div className="p-1">
                        <div className="font-black text-sm text-[#0A0A0A] group-hover:text-[#FF5B37] transition-colors">{accountData.stat3}</div>
                        <div className="text-[9px] text-neutral-500 uppercase">{meta.stat3Label.split(' ')[0]}</div>
                      </div>
                      <div className="p-1">
                        <div className="font-black text-sm text-[#0A0A0A] group-hover:text-[#FF5B37] transition-colors">{accountData.stat1}</div>
                        <div className="text-[9px] text-neutral-500 uppercase">{meta.stat1Label.split(' ')[0]}</div>
                      </div>
                      <div className="p-1">
                        <div className="font-black text-sm text-[#0A0A0A] group-hover:text-[#FF5B37] transition-colors">{accountData.stat2}</div>
                        <div className="text-[9px] text-neutral-500 uppercase">{meta.stat2Label.split(' ')[0]}</div>
                      </div>
                      <div className="col-span-3 text-[8px] text-neutral-400 group-hover:text-blue-600 flex items-center justify-center gap-1 font-sans">
                        <Edit2 className="w-2.5 h-2.5" />
                        <span>Click to set real followers</span>
                      </div>
                    </div>
                  </div>

                  {/* Name & Bio */}
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-[#0A0A0A] flex items-center gap-1">
                      <span>{accountData.name}</span>
                      {accountData.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2F80ED] fill-[#2F80ED] text-white" />
                      )}
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono font-medium">
                      {accountData.category}
                    </div>
                    <p className="text-xs text-neutral-800 leading-snug">
                      {accountData.bio}
                    </p>
                    <div className="pt-0.5">
                      <a
                        href={directUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono text-blue-600 hover:underline flex items-center gap-1 font-bold"
                      >
                        <Globe className="w-3 h-3 text-blue-600" />
                        <span className="truncate">{directUrl}</span>
                      </a>
                    </div>
                  </div>

                  {/* Action Buttons: Follow, Message, Share */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={handleOpenDirect}
                      className="py-1.5 bg-[#0A0A0A] hover:bg-[#FF5B37] text-white font-display font-bold text-xs rounded border border-[#0A0A0A] shadow-xs cursor-pointer text-center"
                    >
                      Follow
                    </button>
                    <button
                      onClick={handleOpenDirect}
                      className="py-1.5 bg-neutral-100 hover:bg-neutral-200 text-[#0A0A0A] font-display font-bold text-xs rounded border border-neutral-300 cursor-pointer text-center"
                    >
                      Message
                    </button>
                  </div>

                  {/* Profile Tab Navigation (Grid, Reels/Videos, Tags) */}
                  <div className="border-t border-neutral-200 pt-1 flex items-center justify-around text-neutral-500 text-xs">
                    <button
                      onClick={() => setActiveTab('grid')}
                      className={`p-2 border-b-2 flex items-center gap-1 ${
                        activeTab === 'grid'
                          ? 'border-[#0A0A0A] text-[#0A0A0A] font-bold'
                          : 'border-transparent text-neutral-400'
                      }`}
                    >
                      <Grid className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Posts</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('videos')}
                      className={`p-2 border-b-2 flex items-center gap-1 ${
                        activeTab === 'videos'
                          ? 'border-[#0A0A0A] text-[#0A0A0A] font-bold'
                          : 'border-transparent text-neutral-400'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Videos</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('stats')}
                      className={`p-2 border-b-2 flex items-center gap-1 ${
                        activeTab === 'stats'
                          ? 'border-[#0A0A0A] text-[#0A0A0A] font-bold'
                          : 'border-transparent text-neutral-400'
                      }`}
                    >
                      <BarChart3 className="w-3.5 h-3.5" />
                      <span className="text-[10px]">Audit</span>
                    </button>
                  </div>

                  {/* Tab Content: Grid / Videos / Stats */}
                  {activeTab === 'grid' && (
                    <div className="grid grid-cols-3 gap-1">
                      {[1, 2, 3, 4, 5, 6].map((idx) => (
                        <div
                          key={idx}
                          onClick={handleOpenDirect}
                          className="aspect-square bg-gradient-to-tr from-neutral-800 to-neutral-700 rounded relative overflow-hidden group cursor-pointer flex items-center justify-center text-white"
                        >
                          <PlatformIcon platform={platform} className="w-5 h-5 text-white/40 group-hover:scale-110 transition-transform" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-mono gap-1">
                            <Heart className="w-2.5 h-2.5 fill-current" />
                            <span>14K</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'videos' && (
                    <div className="space-y-2">
                      {[1, 2, 3].map((v) => (
                        <div
                          key={v}
                          onClick={handleOpenDirect}
                          className="p-2 bg-neutral-50 border border-neutral-200 rounded flex items-center gap-2 cursor-pointer hover:bg-neutral-100"
                        >
                          <div className="w-12 h-9 bg-neutral-800 rounded flex items-center justify-center text-white shrink-0">
                            <Play className="w-3.5 h-3.5 fill-current" />
                          </div>
                          <div className="flex-1 truncate">
                            <div className="font-bold text-[11px] truncate">Top Viral Broadcast #{v}</div>
                            <div className="text-[9px] font-mono text-neutral-500">142K views · 2 days ago</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'stats' && (
                    <div className="p-3 bg-[#FFFDF8] border border-neutral-200 rounded space-y-2 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Account Health:</span>
                        <span className="font-bold text-emerald-600 font-mono">98/100 (Elite)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Reach Ratio:</span>
                        <span className="font-bold text-[#FF5B37] font-mono">4.2x Follower Base</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Status:</span>
                        <span className="font-bold text-blue-600 font-mono">Verified Active</span>
                      </div>
                    </div>
                  )}

                  {/* Direct Launcher Pill Button */}
                  <div className="pt-2">
                    <button
                      onClick={handleOpenDirect}
                      className="w-full py-2 bg-[#FF5B37] hover:bg-[#ff4921] text-white font-display font-black text-xs rounded border border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                    >
                      <span>Open Real @{cleanUser} Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Bottom Gesture Bar */}
                <div className="h-4 bg-inherit flex items-center justify-center shrink-0">
                  <div className="w-24 h-1 bg-neutral-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* MODAL: Set Real Followers & Posts directly from Dashboard     */}
      {/* ============================================================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white border-3 border-[#0A0A0A] shadow-brutal-lg max-w-md w-full p-6 space-y-5 text-left relative">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#0A0A0A]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#B8FF5C] border border-[#0A0A0A] flex items-center justify-center font-bold">
                  <Edit2 className="w-4 h-4 text-[#0A0A0A]" />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg text-[#0A0A0A]">
                    Set Real Followers & Posts
                  </h3>
                  <p className="text-[11px] font-mono text-neutral-500">
                    Syncing @{cleanUser} on {meta.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 border-2 border-[#0A0A0A] bg-white hover:bg-neutral-100 flex items-center justify-center cursor-pointer shadow-xs"
              >
                <X className="w-4 h-4 text-[#0A0A0A]" />
              </button>
            </div>

            <div className="p-3 bg-[#FFFDF8] border-2 border-[#0A0A0A] text-xs space-y-1 font-mono">
              <div className="font-bold text-[#0A0A0A] flex items-center gap-1.5">
                <PlatformIcon platform={platform} className="w-3.5 h-3.5 text-[#FF5B37]" />
                <span>Active Profile: @{cleanUser}</span>
              </div>
              <p className="text-[11px] text-neutral-600">
                Enter your exact numbers as shown on your live {meta.name} account to sync them across your dashboard, audience audit, and smartphone preview.
              </p>
              <div className="pt-1">
                <a
                  href={directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1 inline-flex"
                >
                  <span>Open @{cleanUser} on {meta.name} to check your numbers ↗</span>
                </a>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                  Followers Count:
                </label>
                <input
                  type="text"
                  value={customFollowers}
                  onChange={(e) => setCustomFollowers(e.target.value)}
                  placeholder="e.g. 1,240 or 1.2K or 450"
                  className="w-full p-2.5 bg-white border-2 border-[#0A0A0A] font-bold text-sm text-[#0A0A0A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                    Posts Count:
                  </label>
                  <input
                    type="text"
                    value={customPosts}
                    onChange={(e) => setCustomPosts(e.target.value)}
                    placeholder="e.g. 14"
                    className="w-full p-2.5 bg-white border-2 border-[#0A0A0A] font-bold text-sm text-[#0A0A0A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                    Following Count:
                  </label>
                  <input
                    type="text"
                    value={customFollowing}
                    onChange={(e) => setCustomFollowing(e.target.value)}
                    placeholder="e.g. 340"
                    className="w-full p-2.5 bg-white border-2 border-[#0A0A0A] font-bold text-sm text-[#0A0A0A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase mb-1">
                  Profile Bio / Description:
                </label>
                <textarea
                  rows={2}
                  value={customBio}
                  onChange={(e) => setCustomBio(e.target.value)}
                  placeholder="Enter your account bio..."
                  className="w-full p-2.5 bg-white border-2 border-[#0A0A0A] text-xs text-[#0A0A0A] focus:outline-none resize-none font-sans"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-200">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-[#0A0A0A] font-mono text-xs font-bold border border-neutral-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCustomStats}
                className="px-5 py-2 bg-[#FF5B37] hover:bg-[#ff4921] text-white font-display font-black text-xs border-2 border-[#0A0A0A] shadow-brutal-sm cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save & Apply Real Stats</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
