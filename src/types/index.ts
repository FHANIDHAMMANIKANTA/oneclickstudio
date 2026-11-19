export type Platform = 'instagram' | 'youtube' | 'x' | 'linkedin' | 'tiktok' | 'facebook' | 'threads';

export interface SocialAccount {
  id: string;
  platform: Platform;
  name: string;
  handle: string;
  avatar: string;
  followers: string;
  growth: string;
  connected: boolean;
  healthScore: number;
  tokenExpiresIn: string;
}

export interface PulseNode {
  id: string;
  platform: Platform;
  title: string;
  scheduledTime: string;
  dayIndex: number; // 0 to 6 (Mon to Sun)
  hour: number; // 0 to 23
  mediaUrl: string;
  mediaType: 'video' | 'image' | 'carousel' | 'pdf';
  caption: string;
  status: 'scheduled' | 'published' | 'draft';
  viralityScore: number;
  automationAttached?: boolean;
}

export type GeneratorToolId = 
  | 'caption'
  | 'hashtag'
  | 'script'
  | 'hook'
  | 'seo'
  | 'calendar'
  | 'repurpose'
  | 'carousel'
  | 'reply';

export interface GeneratedContent {
  id: string;
  toolId: GeneratorToolId;
  title: string;
  content: string;
  metadata?: Record<string, any>;
  score?: number;
  timestamp: string;
}

export interface CommentAutomation {
  id: string;
  name: string;
  scope: 'single_post' | 'all_future_posts';
  postId?: string;
  postTitle?: string;
  postThumbnail?: string;
  keywords: string[];
  matchType: 'contains' | 'exact';
  publicReplies: string[];
  dmMessage: {
    text: string;
    assetName?: string;
    assetUrl?: string;
    buttonLabel?: string;
    buttonUrl?: string;
  };
  followGate: boolean;
  oncePerUser: boolean;
  delaySeconds: number;
  dailyCap: number;
  active: boolean;
  stats: {
    triggers: number;
    dmsSent: number;
    linkClicks: number;
    leadsCaptured: number;
    revenueGenerated: number;
  };
}

export interface LeadContact {
  id: string;
  username: string;
  avatar: string;
  platform: 'instagram';
  keyword: string;
  automationName: string;
  status: 'dm_sent' | 'link_clicked' | 'converted';
  email?: string;
  timestamp: string;
}

export interface PostDoctorReport {
  score: number;
  hookStrength: { score: number; status: 'good' | 'warning' | 'bad'; feedback: string };
  captionLength: { score: number; status: 'good' | 'warning' | 'bad'; count: number; recommended: string };
  hashtagMix: { score: number; status: 'good' | 'warning' | 'bad'; feedback: string };
  silentWatch: { score: number; status: 'good' | 'warning' | 'bad'; feedback: string };
  ctaPresence: { score: number; status: 'good' | 'warning' | 'bad'; feedback: string };
  safetyScore: { score: number; status: 'good' | 'warning' | 'bad'; feedback: string };
  estimatedReachMultiplier: string;
}

export interface AssetVaultItem {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'image' | 'template';
  size: string;
  downloads: number;
  views: number;
  expiringLinksActive: number;
  leadCaptureEnabled: boolean;
  url: string;
  uploadDate: string;
}

export interface StoreProduct {
  id: string;
  title: string;
  description: string;
  priceINR: number;
  originalPriceINR?: number;
  coverImage: string;
  type: 'pdf' | 'template' | 'course' | 'call';
  salesCount: number;
  revenueINR: number;
  active: boolean;
}
