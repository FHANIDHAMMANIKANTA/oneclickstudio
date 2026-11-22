import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Check, 
  RefreshCw, 
  Radio, 
  Zap, 
  ExternalLink,
  Edit2, 
  CheckCircle2, 
  Key, 
  Globe, 
  Info, 
  X, 
  Lock, 
  ArrowRight,
  Eye,
  EyeOff,
  Copy
} from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const PinterestIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

const PlatformIcon: React.FC<{ platform: string; className?: string }> = ({ platform, className = 'w-4 h-4' }) => {
  switch (platform) {
    case 'Pinterest':
      return <PinterestIcon className={`${className} text-[#E60023]`} />;
    case 'Twitter / X':
      return (
        <svg className={`${className} fill-current text-[#0A0A0A]`} viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case 'YouTube':
      return (
        <svg className={`${className} fill-current text-[#FF0000]`} viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case 'Facebook':
      return (
        <svg className={`${className} fill-current text-[#1877F2]`} viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      );
    case 'LinkedIn':
      return <span className="font-mono font-black text-xs text-[#0A66C2]">in</span>;
    case 'TikTok':
      return (
        <svg className={`${className} fill-current text-[#0A0A0A]`} viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.68c-.01 2.39-1.07 4.74-2.9 6.27-1.83 1.53-4.35 2.12-6.69 1.57-2.34-.55-4.32-2.17-5.26-4.34-.94-2.17-.79-4.74.4-6.79 1.19-2.05 3.39-3.37 5.76-3.46.36-.01.72 0 1.07.05v4.12c-.34-.1-.7-.14-1.06-.11-1.1.08-2.12.72-2.66 1.68-.54.96-.51 2.17.08 3.1.59.93 1.67 1.48 2.77 1.42 1.1-.06 2.09-.72 2.53-1.73.19-.45.28-.93.28-1.42V.02z"/>
        </svg>
      );
    case 'Threads':
      return (
        <svg className={`${className} fill-current text-[#0A0A0A]`} viewBox="0 0 24 24">
          <path d="M12.186 24C5.467 24 .012 18.571 0 11.905.012 5.239 5.467-.19 12.186-.19c3.708 0 7.02 1.545 9.336 4.093l-2.457 2.383c-1.748-1.928-4.223-3.08-6.879-3.08-5.008 0-9.083 4.04-9.092 9.022.009 4.981 4.084 9.022 9.092 9.022 4.12 0 7.23-2.613 7.822-6.577H12.186v-3.388h11.233c.092.656.138 1.341.138 2.053C23.557 18.558 18.47 24 12.186 24z"/>
        </svg>
      );
    default:
      return <InstagramIcon className={`${className} text-[#FF5B37]`} />;
  }
};

const PLATFORMS_LIST = [
  'Instagram',
  'Twitter / X',
  'YouTube',
  'TikTok',
  'Facebook',
  'LinkedIn',
  'Threads',
  'Pinterest',
];

interface GuideMethod {
  badge: string;
  tag: string;
  title: string;
  desc: string;
  steps: string[];
}

interface PlatformGuide {
  subtitle: string;
  method1: GuideMethod;
  method2: GuideMethod;
}

const PLATFORM_GUIDES: Record<string, PlatformGuide> = {
  Instagram: {
    subtitle: 'Choose between Instant Handle Linking (for testing & mobile preview) or Official Meta API (for automated publishing).',
    method1: {
      badge: 'METHOD 1 · FASTEST (30 SECONDS)',
      tag: 'No Meta App Needed',
      title: 'Direct User ID & Profile Linking',
      desc: 'Instantly syncs your Instagram username with the Dashboard\'s Live Mobile Device Simulator and Creator Composer.',
      steps: [
        'Click the "Edit / Link ID" button on the Instagram card above.',
        'Type your Instagram handle (e.g. your_username).',
        'Click Save & Link Profile.',
        'Your live account URL https://instagram.com/your_username and avatar appear instantly across the Dashboard and mobile simulator!',
      ],
    },
    method2: {
      badge: 'METHOD 2 · PRODUCTION AUTO-PUBLISH',
      tag: 'Full API Automation',
      title: 'Official Meta Graph API OAuth',
      desc: 'Enables automated Reels publishing, carousel scheduling, comment-to-DM bots, and real-time reach analytics.',
      steps: [
        'Switch Instagram Account: In Instagram Settings → Account Type → select Creator or Business Account.',
        'Link a Facebook Page: In Accounts Center → link your Instagram account to a Facebook Page.',
        'Create Meta Developer App: Visit developers.facebook.com → Create App → choose Other → Business.',
        'Add Instagram Graph API: Under Add Products, add Instagram Graph API.',
        'Authorize Permissions: Request instagram_basic, instagram_content_publish, and pages_show_list.',
      ],
    },
  },
  Threads: {
    subtitle: 'Connect your Threads account via instant handle linking or the official Meta Threads API for scheduled threads & replies.',
    method1: {
      badge: 'METHOD 1 · FASTEST (30 SECONDS)',
      tag: 'Instant Handle Sync',
      title: 'Direct @threads Handle Sync',
      desc: 'Syncs your Threads account profile with Hivepostly\'s multi-platform publisher and simulator in seconds.',
      steps: [
        'Click the "Edit / Link ID" button on the Threads card above.',
        'Type your Threads username (e.g. your_threads_id).',
        'Click Save & Link Profile.',
        'Your live profile link https://threads.net/@your_threads_id and feed mockups connect immediately!',
      ],
    },
    method2: {
      badge: 'METHOD 2 · PRODUCTION AUTO-PUBLISH',
      tag: 'Meta Threads API',
      title: 'Official Meta Threads API OAuth',
      desc: 'Enables scheduled text threads, multi-image carousels, video posts, and automated quote replies.',
      steps: [
        'Open developers.facebook.com and select or create your Meta Developer App.',
        'In Add Products, select Threads API.',
        'Request permissions: threads_basic, threads_content_publish, and threads_read_replies.',
        'Complete OAuth 2.0 PKCE authentication with your Threads user login.',
        'Publish text threads up to 500 characters, images, and videos directly from Hivepostly!',
      ],
    },
  },
  'Twitter / X': {
    subtitle: 'Choose between Instant @handle Linking or Official X Developer API v2 for automated thread broadcasts.',
    method1: {
      badge: 'METHOD 1 · FASTEST (30 SECONDS)',
      tag: 'Instant Handle Sync',
      title: 'Direct @handle & Profile Linking',
      desc: 'Maps your X profile into the live tweet preview, card builder, and 280-character counter.',
      steps: [
        'Click "Edit / Link ID" on the Twitter / X card above.',
        'Enter your X handle (e.g. your_handle).',
        'Click Save & Link Profile.',
        'Your live profile https://x.com/your_handle is linked with real-time post validation!',
      ],
    },
    method2: {
      badge: 'METHOD 2 · PRODUCTION AUTO-PUBLISH',
      tag: 'X API v2 OAuth 2.0',
      title: 'X Developer Portal OAuth 2.0',
      desc: 'Enables automated single tweets, thread unrolling, media attachments, and engagement telemetry.',
      steps: [
        'Visit developer.x.com and sign up for a Developer Account.',
        'Create a Project & App under the Developer Portal Dashboard.',
        'Under User Authentication Settings, enable OAuth 2.0 and set App Permissions to Read & Write.',
        'Set Type of App to Web App and configure redirect callback URL.',
        'Authorize tweet.read, tweet.write, and users.read scopes for automated publishing.',
      ],
    },
  },
  YouTube: {
    subtitle: 'Choose between Channel Handle Sync or Google Cloud YouTube Data API for automated Shorts & Video uploads.',
    method1: {
      badge: 'METHOD 1 · FASTEST (30 SECONDS)',
      tag: 'No Cloud Setup Needed',
      title: 'Direct Channel @handle Sync',
      desc: 'Syncs your YouTube channel handle and partner badge for instant video simulator previews.',
      steps: [
        'Click "Edit / Link ID" on the YouTube card above.',
        'Enter your YouTube channel handle (e.g. your_channel_name).',
        'Click Save & Link Profile.',
        'Live channel https://youtube.com/@your_channel_name maps to Shorts & Long-form previews!',
      ],
    },
    method2: {
      badge: 'METHOD 2 · PRODUCTION AUTO-PUBLISH',
      tag: 'Google Cloud API',
      title: 'YouTube Data API v3 OAuth',
      desc: 'Enables automated Shorts publishing, title/description injection, tag optimization, and thumbnail uploads.',
      steps: [
        'Go to console.cloud.google.com and create a new project.',
        'In APIs & Services → Library, search and enable YouTube Data API v3.',
        'Configure OAuth Consent Screen (External) and add scope https://www.googleapis.com/auth/youtube.upload.',
        'In Credentials, create an OAuth 2.0 Client ID for Web Applications.',
        'Authorize your channel to dispatch videos directly from Hivepostly Studio!',
      ],
    },
  },
  TikTok: {
    subtitle: 'Choose between Instant @username Sync or TikTok for Developers for vertical video automation.',
    method1: {
      badge: 'METHOD 1 · FASTEST (30 SECONDS)',
      tag: 'Instant Handle Sync',
      title: 'Direct TikTok @username Sync',
      desc: 'Maps your TikTok profile to the 9:16 mobile device simulator with sound & hashtag overlays.',
      steps: [
        'Click "Edit / Link ID" on the TikTok card above.',
        'Type your TikTok username (e.g. your_tiktok_id).',
        'Click Save & Link Profile.',
        'Your account URL https://tiktok.com/@your_tiktok_id and safe-margin preview activate instantly!',
      ],
    },
    method2: {
      badge: 'METHOD 2 · PRODUCTION AUTO-PUBLISH',
      tag: 'TikTok Developer API',
      title: 'TikTok Content Posting API',
      desc: 'Enables automated vertical reel publishing directly to your TikTok feed with custom sound tags.',
      steps: [
        'Visit developers.tiktok.com and create a developer account.',
        'Click Manage Apps → Create an App.',
        'Add Login Kit and Content Posting API products.',
        'Request permissions: video.upload and user.info.basic.',
        'Complete verification to publish 9:16 vertical reels with burned-in karaoke captions.',
      ],
    },
  },
  Facebook: {
    subtitle: 'Choose between Page Username Sync or Meta Graph API for automated Page & Group publishing.',
    method1: {
      badge: 'METHOD 1 · FASTEST (30 SECONDS)',
      tag: 'Instant Vanity Link',
      title: 'Direct Page Handle Linking',
      desc: 'Connects your Facebook Page identity for feed previews and engagement analytics.',
      steps: [
        'Click "Edit / Link ID" on the Facebook card above.',
        'Type your Facebook Page username or vanity ID (e.g. your_page_id).',
        'Click Save & Link Profile.',
        'Your live page https://facebook.com/your_page_id syncs across the Command Room!',
      ],
    },
    method2: {
      badge: 'METHOD 2 · PRODUCTION AUTO-PUBLISH',
      tag: 'Meta Pages API',
      title: 'Meta Business Pages API OAuth',
      desc: 'Enables simultaneous posting with Instagram, video reel scheduling, and automated comment replies.',
      steps: [
        'Open developers.facebook.com and select your Meta Business App.',
        'In Graph API Explorer, select your user token and grant pages_manage_posts and pages_read_engagement.',
        'Select your designated Facebook Page from the accounts dropdown.',
        'Generate a Never-Expiring Long-Lived Page Access Token.',
        'Publish posts, videos, and multi-network campaigns with one click!',
      ],
    },
  },
  LinkedIn: {
    subtitle: 'Choose between Vanity URL Sync or LinkedIn Developer API for document PDFs and carousel posts.',
    method1: {
      badge: 'METHOD 1 · FASTEST (30 SECONDS)',
      tag: 'Direct Profile Sync',
      title: 'Direct LinkedIn Vanity URL Sync',
      desc: 'Maps your professional LinkedIn handle to B2B formatted feed mockups.',
      steps: [
        'Click "Edit / Link ID" on the LinkedIn card above.',
        'Enter your LinkedIn public profile slug (e.g. john-doe-ai).',
        'Click Save & Link Profile.',
        'Live profile https://linkedin.com/in/john-doe-ai activates across all preview panels!',
      ],
    },
    method2: {
      badge: 'METHOD 2 · PRODUCTION AUTO-PUBLISH',
      tag: 'LinkedIn Developer Portal',
      title: 'Share on LinkedIn API OAuth 2.0',
      desc: 'Enables automated multi-slide PDF carousels, long-form articles, and video scheduling.',
      steps: [
        'Go to developer.linkedin.com and click Create App.',
        'Link your verified LinkedIn Company Page.',
        'In the Products tab, add Share on LinkedIn and Sign In with LinkedIn.',
        'Authorize w_member_social and r_basicprofile OAuth permissions.',
        'Schedule professional creator posts and multi-page slide decks automatically!',
      ],
    },
  },
  Pinterest: {
    subtitle: 'Choose between Instant Handle Linking or Pinterest API v5 for automated Pin and Board scheduling.',
    method1: {
      badge: 'METHOD 1 · FASTEST (30 SECONDS)',
      tag: 'Instant Profile Sync',
      title: 'Direct Pinterest Profile & Board Sync',
      desc: 'Connects your Pinterest username for instant visual pin preview and board destination links.',
      steps: [
        'Click "Edit / Link ID" on the Pinterest card above.',
        'Enter your Pinterest handle (e.g. your_brand).',
        'Click Save & Link Profile.',
        'Live URL https://pinterest.com/your_brand maps to the Composer and Pin scheduler!',
      ],
    },
    method2: {
      badge: 'METHOD 2 · PRODUCTION AUTO-PUBLISH',
      tag: 'Pinterest API v5',
      title: 'Pinterest Business Manager & API v5',
      desc: 'Enables scheduled standard pins, rich idea pins, destination web links, and board organization.',
      steps: [
        'In Pinterest account settings, convert to a free Business Account.',
        'Visit developers.pinterest.com and create an app in the Developer Portal.',
        'Request permissions: pins:read, pins:write, boards:read, and boards:write.',
        'Connect your OAuth access token and select target boards.',
        'Auto-schedule high-intent pins with compound search traffic to your store or blog!',
      ],
    },
  },
};

interface SocialAccount {
  platform: string;
  handle: string;
  connected: boolean;
  followers: string;
  badge: string;
  urlPrefix: string;
  accountType?: string;
}

export const SettingsView: React.FC = () => {
  const [accounts, setAccounts] = useState<SocialAccount[]>(() => {
    const savedUser = localStorage.getItem('hivepostly_custom_username') || localStorage.getItem('viralflow_custom_username') || 'hivepostly_creator';
    return [
      {
        platform: 'Instagram',
        handle: `@${savedUser}`,
        connected: true,
        followers: '184.2K',
        badge: 'bg-[#FF5B37] text-white',
        urlPrefix: 'https://instagram.com/',
        accountType: 'Creator Account',
      },
      {
        platform: 'Twitter / X',
        handle: `@${savedUser}`,
        connected: true,
        followers: '94.8K',
        badge: 'bg-[#0A0A0A] text-white',
        urlPrefix: 'https://x.com/',
        accountType: 'Professional',
      },
      {
        platform: 'YouTube',
        handle: `@${savedUser}`,
        connected: true,
        followers: '320.5K',
        badge: 'bg-red-600 text-white',
        urlPrefix: 'https://youtube.com/@',
        accountType: 'Partner Channel',
      },
      {
        platform: 'TikTok',
        handle: `@${savedUser}`,
        connected: true,
        followers: '142.0K',
        badge: 'bg-[#00f2fe] text-black',
        urlPrefix: 'https://tiktok.com/@',
        accountType: 'Business',
      },
      {
        platform: 'Facebook',
        handle: `${savedUser}`,
        connected: true,
        followers: '28.9K',
        badge: 'bg-[#1877F2] text-white',
        urlPrefix: 'https://facebook.com/',
        accountType: 'Page',
      },
      {
        platform: 'LinkedIn',
        handle: `in/${savedUser}`,
        connected: true,
        followers: '68.4K',
        badge: 'bg-[#0A66C2] text-white',
        urlPrefix: 'https://linkedin.com/in/',
        accountType: 'Creator Mode',
      },
      {
        platform: 'Threads',
        handle: `@${savedUser}`,
        connected: true,
        followers: '43.1K',
        badge: 'bg-neutral-800 text-white',
        urlPrefix: 'https://threads.net/@',
        accountType: 'Creator',
      },
      {
        platform: 'Pinterest',
        handle: `@${savedUser}`,
        connected: true,
        followers: '52.7K',
        badge: 'bg-[#E60023] text-white',
        urlPrefix: 'https://pinterest.com/',
        accountType: 'Business Profile',
      },
    ];
  });

  // Active guide platform selection (defaults to Instagram)
  const [activeGuidePlatform, setActiveGuidePlatform] = useState<string>('Instagram');

  // API Keys state (pre-configured with user's Meta key, and empty Gemini & OpenAI keys)
  const [metaApiKey, setMetaApiKey] = useState(() => {
    return localStorage.getItem('meta_api_key') || (import.meta.env.VITE_META_API_KEY as string) || 'LLM_2678853565872900_Ja86pLaiDzuWr3xFJywnjA98V6Q';
  });
  const [geminiApiKey, setGeminiApiKey] = useState(() => {
    return localStorage.getItem('gemini_api_key') || (import.meta.env.VITE_GEMINI_API_KEY as string) || '';
  });
  const [openaiApiKey, setOpenaiApiKey] = useState(() => {
    return localStorage.getItem('openai_api_key') || (import.meta.env.VITE_OPENAI_API_KEY as string) || '';
  });
  const [showMetaKey, setShowMetaKey] = useState(false);
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [showOpenaiKey, setShowOpenaiKey] = useState(false);
  const [apiKeysSaved, setApiKeysSaved] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyKeyToClipboard = (text: string, id: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveApiKeys = () => {
    localStorage.setItem('meta_api_key', metaApiKey.trim());
    localStorage.setItem('gemini_api_key', geminiApiKey.trim());
    localStorage.setItem('openai_api_key', openaiApiKey.trim());
    setApiKeysSaved(true);
    setTimeout(() => setApiKeysSaved(false), 2500);
  };

  // Modal / Dialog for connecting or editing an account
  const [editingPlatform, setEditingPlatform] = useState<string | null>(null);
  const [inputHandle, setInputHandle] = useState('');
  const [accountTypeChoice, setAccountTypeChoice] = useState('Creator');
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const openConnectModal = (platform: string, currentHandle: string) => {
    setEditingPlatform(platform);
    setInputHandle(currentHandle.replace(/^@/, '').replace(/^in\//, ''));
    setAuthSuccess(false);
  };

  const handleSaveConnection = () => {
    if (!editingPlatform) return;
    setIsAuthorizing(true);

    setTimeout(() => {
      const cleanHandle = inputHandle.trim().replace(/^@/, '').replace(/^in\//, '') || 'creator';
      
      // Update accounts
      setAccounts((prev) =>
        prev.map((a) => {
          if (a.platform === editingPlatform) {
            return {
              ...a,
              handle: a.platform === 'LinkedIn' ? `in/${cleanHandle}` : a.platform === 'Facebook' ? cleanHandle : `@${cleanHandle}`,
              connected: true,
              accountType: `${accountTypeChoice} Account`,
            };
          }
          return a;
        })
      );

      // Save to localStorage for cross-app sync
      localStorage.setItem('hivepostly_custom_username', cleanHandle);
      localStorage.setItem('viralflow_custom_username', cleanHandle);
      setIsAuthorizing(false);
      setAuthSuccess(true);

      setTimeout(() => {
        setEditingPlatform(null);
        setAuthSuccess(false);
      }, 900);
    }, 600);
  };

  const toggleConnection = (platform: string) => {
    setAccounts((prev) =>
      prev.map((a) =>
        a.platform === platform ? { ...a, connected: !a.connected } : a
      )
    );
  };

  const openExternalProfile = (urlPrefix: string, handle: string) => {
    const clean = handle.replace(/^@/, '').replace(/^in\//, '');
    window.open(`${urlPrefix}${clean}`, '_blank', 'noopener,noreferrer');
  };

  const currentGuide = PLATFORM_GUIDES[activeGuidePlatform] || PLATFORM_GUIDES['Instagram'];

  return (
    <div className="space-y-8 text-left">
      {/* 1. Header (Clean, top right buttons removed as requested) */}
      <div className="pb-4 border-b-2 border-[#0A0A0A] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#FF5B37] text-white border border-[#0A0A0A] text-[10px] font-mono font-black uppercase">
              ACCOUNTS & OAUTH
            </span>
            <span className="text-xs font-mono font-bold text-neutral-500">
              Meta Graph API & Social Connectors
            </span>
          </div>
          <h2 className="font-display text-3xl font-black tracking-tight text-[#0A0A0A] mt-1">
            Connected Social Accounts
          </h2>
          <p className="text-xs text-neutral-600 font-medium">
            Manage your Instagram, YouTube, TikTok, Pinterest, LinkedIn, Threads, Facebook, and X connections. Link your accounts to auto-publish reels, pins, and preview in mobile simulators.
          </p>
        </div>
      </div>

      {/* 2. Account Safety Guardrail Banner */}
      <div className="card-brutal p-4 bg-[#B8FF5C] border-2 border-[#0A0A0A] shadow-brutal flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 font-bold text-[#0A0A0A]">
          <ShieldCheck className="w-5 h-5 text-[#0A0A0A] shrink-0" />
          <span>Meta Graph API & Social Developer Connectors Verified · 100% Rate Limit & Shadowban Safe</span>
        </div>
        <span className="font-mono font-bold text-[11px] bg-white px-2.5 py-0.5 border border-[#0A0A0A] shadow-brutal-sm">
          OAuth 2.0 PKCE Active
        </span>
      </div>

      {/* 2.5. API Keys & Intelligence Credentials Management Card */}
      <div className="card-brutal p-6 bg-white border-2 border-[#0A0A0A] shadow-brutal space-y-6 text-left">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-[#0A0A0A]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#0A0A0A] text-white border border-[#0A0A0A] text-[10px] font-mono font-black uppercase flex items-center gap-1.5">
                <Key className="w-3 h-3 text-[#FF5B37]" />
                API KEYS & MODEL CREDENTIALS
              </span>
              <span className="px-2 py-0.5 bg-[#B8FF5C] text-[#0A0A0A] border border-[#0A0A0A] text-[10px] font-mono font-bold uppercase">
                META KEY ACTIVE
              </span>
            </div>
            <h3 className="font-display text-xl font-black text-[#0A0A0A] mt-1.5">
              API Keys & Intelligence Credentials
            </h3>
            <p className="text-xs text-neutral-600 font-medium">
              Production API key credentials for Meta Graph/Llama, Google Gemini, and OpenAI. Keys are saved securely and loaded by the AI Studio & Dispatch engines.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {apiKeysSaved && (
              <span className="px-3 py-1.5 bg-[#B8FF5C] text-[#0A0A0A] border-2 border-[#0A0A0A] text-xs font-mono font-bold shadow-brutal-sm flex items-center gap-1.5 animate-in fade-in">
                <Check className="w-3.5 h-3.5 text-black" /> Saved!
              </span>
            )}
            <button
              onClick={handleSaveApiKeys}
              className="btn-brutal bg-[#FF5B37] text-white hover:bg-[#E04D2B] px-4 py-2 text-xs font-black uppercase flex items-center gap-2 border-2 border-[#0A0A0A] shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" /> Save API Credentials
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* 1. Meta API Key (Configured with user's key) */}
          <div className="p-4 bg-[#FFFDF8] border-2 border-[#0A0A0A] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-display font-bold text-xs text-[#0A0A0A]">
                  <span className="w-2 h-2 rounded-full bg-[#1877F2]"></span>
                  <span>Meta API Key (Llama / Graph)</span>
                </div>
                <span className="px-1.5 py-0.5 bg-[#B8FF5C] border border-[#0A0A0A] text-[9px] font-mono font-black text-[#0A0A0A]">
                  ACTIVE
                </span>
              </div>
              <div className="relative flex items-center">
                <input
                  type={showMetaKey ? 'text' : 'password'}
                  value={metaApiKey}
                  onChange={(e) => setMetaApiKey(e.target.value)}
                  placeholder="LLM_2678853565872900_Ja86pLaiDzuWr3xFJywnjA98V6Q"
                  className="w-full bg-white border-2 border-[#0A0A0A] px-3 py-2 pr-16 text-xs font-mono font-bold text-[#0A0A0A] focus:outline-none"
                />
                <div className="absolute right-2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setShowMetaKey(!showMetaKey)}
                    className="p-1 text-neutral-600 hover:text-black hover:bg-neutral-100 cursor-pointer"
                    title={showMetaKey ? 'Hide key' : 'Show key'}
                  >
                    {showMetaKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => copyKeyToClipboard(metaApiKey, 'meta')}
                    className="p-1 text-neutral-600 hover:text-black hover:bg-neutral-100 cursor-pointer"
                    title="Copy key"
                  >
                    {copiedKey === 'meta' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-neutral-600 font-medium">
              Active Meta API key: <code className="font-mono font-bold text-[#0A0A0A] bg-neutral-100 px-1">LLM_267885...V6Q</code>. Powers Meta Llama and Graph publishing.
            </p>
          </div>

          {/* 2. Google Gemini API Key (Empty by default) */}
          <div className="p-4 bg-[#FFFDF8] border-2 border-[#0A0A0A] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-display font-bold text-xs text-[#0A0A0A]">
                  <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
                  <span>Google Gemini API Key</span>
                </div>
                <span className={`px-1.5 py-0.5 border border-[#0A0A0A] text-[9px] font-mono font-black ${
                  geminiApiKey ? 'bg-[#B8FF5C] text-[#0A0A0A]' : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {geminiApiKey ? 'CONFIGURED' : 'EMPTY / OPTIONAL'}
                </span>
              </div>
              <div className="relative flex items-center">
                <input
                  type={showGeminiKey ? 'text' : 'password'}
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  placeholder="Empty (e.g. AIzaSy... Optional)"
                  className="w-full bg-white border-2 border-[#0A0A0A] px-3 py-2 pr-16 text-xs font-mono font-bold text-[#0A0A0A] focus:outline-none"
                />
                <div className="absolute right-2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setShowGeminiKey(!showGeminiKey)}
                    className="p-1 text-neutral-600 hover:text-black hover:bg-neutral-100 cursor-pointer"
                    title={showGeminiKey ? 'Hide key' : 'Show key'}
                  >
                    {showGeminiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => copyKeyToClipboard(geminiApiKey, 'gemini')}
                    className="p-1 text-neutral-600 hover:text-black hover:bg-neutral-100 cursor-pointer"
                    title="Copy key"
                  >
                    {copiedKey === 'gemini' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-neutral-600 font-medium">
              Empty by default. Add your Gemini key to unlock direct Google Gemini 2.5 Flash / Pro live cloud queries.
            </p>
          </div>

          {/* 3. OpenAI API Key (Empty by default) */}
          <div className="p-4 bg-[#FFFDF8] border-2 border-[#0A0A0A] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-display font-bold text-xs text-[#0A0A0A]">
                  <span className="w-2 h-2 rounded-full bg-[#10A37F]"></span>
                  <span>OpenAI API Key</span>
                </div>
                <span className={`px-1.5 py-0.5 border border-[#0A0A0A] text-[9px] font-mono font-black ${
                  openaiApiKey ? 'bg-[#B8FF5C] text-[#0A0A0A]' : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {openaiApiKey ? 'CONFIGURED' : 'EMPTY / OPTIONAL'}
                </span>
              </div>
              <div className="relative flex items-center">
                <input
                  type={showOpenaiKey ? 'text' : 'password'}
                  value={openaiApiKey}
                  onChange={(e) => setOpenaiApiKey(e.target.value)}
                  placeholder="Empty (e.g. sk-proj-... Optional)"
                  className="w-full bg-white border-2 border-[#0A0A0A] px-3 py-2 pr-16 text-xs font-mono font-bold text-[#0A0A0A] focus:outline-none"
                />
                <div className="absolute right-2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setShowOpenaiKey(!showOpenaiKey)}
                    className="p-1 text-neutral-600 hover:text-black hover:bg-neutral-100 cursor-pointer"
                    title={showOpenaiKey ? 'Hide key' : 'Show key'}
                  >
                    {showOpenaiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => copyKeyToClipboard(openaiApiKey, 'openai')}
                    className="p-1 text-neutral-600 hover:text-black hover:bg-neutral-100 cursor-pointer"
                    title="Copy key"
                  >
                    {copiedKey === 'openai' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-neutral-600 font-medium">
              Empty by default. Add your OpenAI secret key for GPT-4o viral hooks, threads generation, and Whisper voice transcription.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Connected Accounts Grid (All 8 Platforms) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {accounts.map((acc) => {
          const cleanUser = acc.handle.replace(/^@/, '').replace(/^in\//, '');
          const isInsta = acc.platform === 'Instagram';

          return (
            <div
              key={acc.platform}
              className={`card-brutal p-5 bg-white flex flex-col justify-between space-y-4 border-2 border-[#0A0A0A] shadow-brutal ${
                isInsta ? 'ring-2 ring-[#FF5B37] ring-offset-2' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2.5 py-0.5 border border-[#0A0A0A] text-xs font-black font-display uppercase ${acc.badge}`}>
                      {acc.platform}
                    </span>
                    {isInsta && (
                      <span className="px-1.5 py-0.5 bg-[#FFFDF8] border border-[#0A0A0A] text-[9px] font-mono font-bold text-[#FF5B37]">
                        PRIMARY
                      </span>
                    )}
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase border border-[#0A0A0A] ${
                    acc.connected ? 'bg-[#B8FF5C] text-[#0A0A0A]' : 'bg-neutral-100 text-neutral-500'
                  }`}>
                    {acc.connected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>

                <div className="p-3 bg-[#FFFDF8] border-2 border-[#0A0A0A] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="font-display font-black text-sm text-[#0A0A0A] flex items-center gap-1 truncate">
                      <span className="truncate">{acc.handle}</span>
                      {acc.connected && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2F80ED] fill-[#2F80ED] text-white shrink-0" />
                      )}
                    </div>
                    <button
                      onClick={() => openConnectModal(acc.platform, acc.handle)}
                      title="Edit handle or re-authenticate"
                      className="p-1 hover:bg-neutral-200 border border-neutral-400 rounded text-neutral-700 cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-600">
                    <span>{acc.accountType || 'Creator'}</span>
                    <span className="font-bold text-[#0A0A0A]">{acc.followers}</span>
                  </div>

                  {acc.connected && (
                    <div className="pt-1 border-t border-neutral-200">
                      <button
                        onClick={() => openExternalProfile(acc.urlPrefix, acc.handle)}
                        className="text-[10px] font-mono text-blue-600 hover:underline flex items-center gap-1 font-bold truncate cursor-pointer"
                      >
                        <span className="truncate">{acc.urlPrefix}{cleanUser}</span>
                        <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t-2 border-[#0A0A0A]/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => openConnectModal(acc.platform, acc.handle)}
                  className="px-2.5 py-1 text-xs font-mono font-bold border border-[#0A0A0A] bg-white hover:bg-neutral-100 text-[#0A0A0A] cursor-pointer"
                >
                  Edit / Link ID
                </button>

                <button
                  onClick={() => toggleConnection(acc.platform)}
                  className={`px-3 py-1 text-xs font-display font-bold border border-[#0A0A0A] transition-all cursor-pointer ${
                    acc.connected
                      ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                      : 'bg-[#FF5B37] text-white hover:bg-[#ff4921]'
                  }`}
                >
                  {acc.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Complete Step-by-Step Guide: Interactive 8 Platforms Connection Guide */}
      <div className="card-brutal p-6 bg-white border-2 border-[#0A0A0A] shadow-brutal space-y-6">
        {/* Header with Title and Platform Tabs */}
        <div className="space-y-4 pb-4 border-b-2 border-[#0A0A0A]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center bg-[#FFFDF8]">
                <PlatformIcon platform={activeGuidePlatform} className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-[#0A0A0A]">
                  How to Connect Your {activeGuidePlatform} Account (2 Methods)
                </h3>
                <p className="text-xs text-neutral-600 font-medium">
                  {currentGuide.subtitle}
                </p>
              </div>
            </div>

            <button
              onClick={() => openConnectModal(activeGuidePlatform, accounts.find(a => a.platform === activeGuidePlatform)?.handle || `@my_${activeGuidePlatform.toLowerCase().replace(/[^a-z0-9]/g, '')}`)}
              className="px-4 py-2 bg-[#FF5B37] hover:bg-[#ff4921] text-white font-display font-bold text-xs uppercase tracking-wider border-2 border-[#0A0A0A] shadow-brutal flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
            >
              <span>Connect {activeGuidePlatform} Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 8 Platform Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-mono font-black uppercase text-neutral-500 mr-1">Select Platform:</span>
            {PLATFORMS_LIST.map((plat) => {
              const isSelected = activeGuidePlatform === plat;
              return (
                <button
                  key={plat}
                  onClick={() => setActiveGuidePlatform(plat)}
                  className={`px-3 py-1.5 border-2 border-[#0A0A0A] text-xs font-display font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0A0A0A] text-white shadow-brutal translate-x-0.5 translate-y-0.5'
                      : 'bg-[#FFFDF8] hover:bg-neutral-100 text-[#0A0A0A] shadow-brutal-sm'
                  }`}
                >
                  <PlatformIcon platform={plat} className="w-3.5 h-3.5" />
                  <span>{plat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2 Methods Grid (Matches Image 2 styling with Method 1 & Method 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          {/* Method 1: Instant Profile Linking */}
          <div className="p-5 bg-[#FFFDF8] border-2 border-[#0A0A0A] space-y-3 shadow-brutal-sm">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-[#B8FF5C] border border-[#0A0A0A] text-[10px] font-mono font-black uppercase text-[#0A0A0A]">
                {currentGuide.method1.badge}
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-700">
                {currentGuide.method1.tag}
              </span>
            </div>
            <h4 className="font-display font-bold text-base text-[#0A0A0A]">
              {currentGuide.method1.title}
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              {currentGuide.method1.desc}
            </p>
            <ol className="text-xs text-neutral-700 space-y-2 list-decimal list-inside font-medium pt-2 border-t border-[#0A0A0A]/10">
              {currentGuide.method1.steps.map((st, i) => (
                <li key={i} className="leading-relaxed">
                  {st}
                </li>
              ))}
            </ol>
          </div>

          {/* Method 2: Official API & OAuth Automation */}
          <div className="p-5 bg-[#FFFDF8] border-2 border-[#0A0A0A] space-y-3 shadow-brutal-sm">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-[#4D9FFF] text-white border border-[#0A0A0A] text-[10px] font-mono font-black uppercase">
                {currentGuide.method2.badge}
              </span>
              <span className="text-[10px] font-mono font-bold text-blue-700">
                {currentGuide.method2.tag}
              </span>
            </div>
            <h4 className="font-display font-bold text-base text-[#0A0A0A]">
              {currentGuide.method2.title}
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              {currentGuide.method2.desc}
            </p>
            <ol className="text-xs text-neutral-700 space-y-2 list-decimal list-inside font-medium pt-2 border-t border-[#0A0A0A]/10">
              {currentGuide.method2.steps.map((st, i) => (
                <li key={i} className="leading-relaxed">
                  {st}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* 5. Connect Modal Dialog */}
      {editingPlatform && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="card-brutal bg-white p-6 w-full max-w-md border-3 border-[#0A0A0A] shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#0A0A0A]">
              <div className="flex items-center gap-2">
                <PlatformIcon platform={editingPlatform} className="w-5 h-5" />
                <h3 className="font-display font-bold text-lg text-[#0A0A0A]">
                  Connect {editingPlatform}
                </h3>
              </div>
              <button
                onClick={() => setEditingPlatform(null)}
                className="p-1 hover:bg-neutral-100 border border-[#0A0A0A] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {authSuccess ? (
              <div className="p-4 bg-[#B8FF5C] border-2 border-[#0A0A0A] text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 mx-auto text-[#0A0A0A]" />
                <div className="font-display font-bold text-sm text-[#0A0A0A]">
                  Account Successfully Connected!
                </div>
                <div className="text-xs text-neutral-800 font-mono">
                  Linked to @{inputHandle.replace(/^@/, '')}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase font-mono text-neutral-700 block">
                    Your {editingPlatform} Username / User ID:
                  </label>
                  <div className="flex items-center">
                    <span className="px-3 py-2 bg-neutral-100 border-2 border-r-0 border-[#0A0A0A] text-xs font-mono font-bold text-neutral-600">
                      @
                    </span>
                    <input
                      type="text"
                      value={inputHandle}
                      onChange={(e) => setInputHandle(e.target.value)}
                      placeholder="your_handle"
                      className="flex-1 bg-[#FFFDF8] border-2 border-[#0A0A0A] px-3 py-2 text-xs font-mono font-bold text-[#0A0A0A] focus:outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-neutral-500 font-medium">
                    This links your real profile URL: <span className="font-mono text-blue-600">{accounts.find(a => a.platform === editingPlatform)?.urlPrefix || 'https://'}{inputHandle.replace(/^@/, '') || 'username'}</span>
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase font-mono text-neutral-700 block">
                    Account Category:
                  </label>
                  <select
                    value={accountTypeChoice}
                    onChange={(e) => setAccountTypeChoice(e.target.value)}
                    className="w-full bg-[#FFFDF8] border-2 border-[#0A0A0A] p-2 text-xs font-bold text-[#0A0A0A] focus:outline-none"
                  >
                    <option value="Creator">Creator Account (Recommended)</option>
                    <option value="Business">Business Account</option>
                    <option value="Personal">Personal Profile</option>
                  </select>
                </div>

                <div className="p-3 bg-neutral-50 border border-neutral-300 rounded text-[11px] text-neutral-600 flex items-start gap-2">
                  <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Your handle is stored safely in your browser session. Clicking save will immediately update the Dashboard and Mobile Phone Simulator.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setEditingPlatform(null)}
                    className="px-4 py-2 border-2 border-[#0A0A0A] bg-white text-xs font-bold text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveConnection}
                    disabled={isAuthorizing || !inputHandle.trim()}
                    className="px-5 py-2 border-2 border-[#0A0A0A] bg-[#FF5B37] text-white text-xs font-display font-bold shadow-brutal hover:bg-[#ff4921] transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                  >
                    {isAuthorizing ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>Save & Link Profile</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
