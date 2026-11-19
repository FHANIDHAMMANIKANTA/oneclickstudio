import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  Flame, 
  TrendingUp, 
  Sparkles, 
  Check, 
  Copy, 
  Globe, 
  ArrowRight, 
  Share2, 
  Activity, 
  Zap, 
  CheckCircle2, 
  Info 
} from 'lucide-react';
import { AnalyzerPlatform, PlatformIcon } from './SocialAccountAnalyzer';

interface BestTimeToPostWeeklyProps {
  selectedPlatform: AnalyzerPlatform;
  onSelectPlatform?: (platform: AnalyzerPlatform) => void;
  onSchedulePost?: (day: string, time: string, platform: AnalyzerPlatform) => void;
}

interface DayTiming {
  dayName: string;
  dayShort: string;
  isPeakDay?: boolean;
  score: number; // 0 - 100
  peakWindows: string[];
  bestFormat: string;
  audienceBehavior: string;
}

interface PlatformTimingData {
  platformName: string;
  badgeColor: string;
  accentColor: string;
  bestOverallDays: string;
  goldenHours: string;
  optimalFormats: string;
  generalProTip: string;
  weekdays: DayTiming[];
  hourlyHeatmap: number[]; // 24 values representing hours 0-23 (intensity 1-5)
}

const WEEKLY_TIMING_DATABASE: Record<AnalyzerPlatform, PlatformTimingData> = {
  instagram: {
    platformName: 'Instagram',
    badgeColor: 'bg-[#E1306C]',
    accentColor: '#E1306C',
    bestOverallDays: 'Tuesday, Wednesday & Thursday',
    goldenHours: '11:00 AM – 1:00 PM & 7:00 PM – 9:00 PM',
    optimalFormats: 'Reels (15–30s), Value Carousels, Interactive Stories',
    generalProTip: 'Post 30 minutes before lunch (11:30 AM) and after dinner (7:30 PM) when algorithmic swipe velocity is highest.',
    hourlyHeatmap: [1, 1, 1, 1, 1, 2, 3, 3, 4, 4, 4, 5, 5, 4, 3, 3, 4, 4, 5, 5, 4, 3, 2, 1],
    weekdays: [
      {
        dayName: 'Monday',
        dayShort: 'MON',
        score: 92,
        peakWindows: ['11:00 AM – 1:00 PM', '7:00 PM – 9:00 PM'],
        bestFormat: 'High-Hook Reel or Carousel',
        audienceBehavior: 'Lunchtime catch-up and evening unwinding after the first work day.',
      },
      {
        dayName: 'Tuesday',
        dayShort: 'TUE',
        isPeakDay: true,
        score: 98,
        peakWindows: ['9:00 AM', '1:15 PM', '8:00 PM'],
        bestFormat: 'Multi-Slide Value Carousel',
        audienceBehavior: 'Highest organic save and bookmark rates of the week across work/home desks.',
      },
      {
        dayName: 'Wednesday',
        dayShort: 'WED',
        isPeakDay: true,
        score: 97,
        peakWindows: ['11:00 AM – 2:00 PM', '7:30 PM – 9:30 PM'],
        bestFormat: 'Trending Audio Reel / Short POV',
        audienceBehavior: 'Peak midweek active session durations. Great for audience comment polls.',
      },
      {
        dayName: 'Thursday',
        dayShort: 'THU',
        isPeakDay: true,
        score: 96,
        peakWindows: ['12:00 PM', '4:00 PM', '8:30 PM'],
        bestFormat: 'Educational Reel or Collab Post',
        audienceBehavior: 'Very high share-to-DM velocity as creators prep weekend conversations.',
      },
      {
        dayName: 'Friday',
        dayShort: 'FRI',
        score: 94,
        peakWindows: ['10:00 AM', '2:00 PM', '6:30 PM'],
        bestFormat: 'Entertainment, Memes & Lifestyle',
        audienceBehavior: 'Audiences look for lighthearted, weekend-friendly entertainment before heading out.',
      },
      {
        dayName: 'Saturday',
        dayShort: 'SAT',
        score: 88,
        peakWindows: ['9:30 AM – 11:30 AM', '7:00 PM – 9:00 PM'],
        bestFormat: 'Behind-the-scenes & Story AMA',
        audienceBehavior: 'Morning leisure coffee scrolling; daytime dips due to outdoor activities.',
      },
      {
        dayName: 'Sunday',
        dayShort: 'SUN',
        score: 93,
        peakWindows: ['10:00 AM – 1:00 PM', '7:00 PM – 10:00 PM'],
        bestFormat: 'Weekly Reset, Inspiring Quote, Reel',
        audienceBehavior: 'Massive evening wind-down traffic as creators and audiences prepare for the week.',
      },
    ],
  },

  youtube: {
    platformName: 'YouTube',
    badgeColor: 'bg-[#FF0000]',
    accentColor: '#FF0000',
    bestOverallDays: 'Thursday, Friday & Saturday',
    goldenHours: '2:00 PM – 5:00 PM (Weekdays), 9:00 AM – 11:00 AM (Weekends)',
    optimalFormats: '60s Shorts (Hook in first 2s), 8–14 Min High-CTR Videos',
    generalProTip: 'Publish videos 2 hours before the viewer peak so YouTube has time to encode 1080p/4K resolutions and index metadata.',
    hourlyHeatmap: [1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 5, 5, 4, 3, 2, 1],
    weekdays: [
      {
        dayName: 'Monday',
        dayShort: 'MON',
        score: 88,
        peakWindows: ['2:00 PM – 4:00 PM', '7:00 PM – 9:00 PM'],
        bestFormat: 'Shorts & Productivity Videos',
        audienceBehavior: 'Indexes early afternoon; evening views surge as users wind down.',
      },
      {
        dayName: 'Tuesday',
        dayShort: 'TUE',
        score: 91,
        peakWindows: ['2:00 PM – 5:00 PM', '8:00 PM'],
        bestFormat: 'Deep Dive Tutorial / Essay',
        audienceBehavior: 'Midweek desktop viewer sessions and high watch time completion.',
      },
      {
        dayName: 'Wednesday',
        dayShort: 'WED',
        score: 93,
        peakWindows: ['1:00 PM – 4:00 PM', '7:30 PM'],
        bestFormat: 'Trending Topic 60s Short',
        audienceBehavior: 'Strong algorithm recommendations for shorts in mobile feeds.',
      },
      {
        dayName: 'Thursday',
        dayShort: 'THU',
        isPeakDay: true,
        score: 98,
        peakWindows: ['12:00 PM – 3:00 PM', '7:00 PM – 10:00 PM'],
        bestFormat: 'Main Channel Long-Form Video',
        audienceBehavior: 'One of the best days for pre-weekend binge viewers seeking weekend entertainment.',
      },
      {
        dayName: 'Friday',
        dayShort: 'FRI',
        isPeakDay: true,
        score: 99,
        peakWindows: ['12:00 PM – 4:00 PM', '6:00 PM – 11:00 PM'],
        bestFormat: 'High-Production Video + Shorts Teaser',
        audienceBehavior: 'Peak YouTube watch time of the entire week. Highest total session lengths.',
      },
      {
        dayName: 'Saturday',
        dayShort: 'SAT',
        isPeakDay: true,
        score: 96,
        peakWindows: ['9:00 AM – 11:00 AM', '3:00 PM – 6:00 PM'],
        bestFormat: 'Shorts & Saturday Morning Content',
        audienceBehavior: 'Audiences wake up and stream content on TV screens and iPads.',
      },
      {
        dayName: 'Sunday',
        dayShort: 'SUN',
        score: 94,
        peakWindows: ['9:00 AM – 12:00 PM', '6:00 PM – 9:30 PM'],
        bestFormat: 'Storytelling, Podcasts & Recaps',
        audienceBehavior: 'Relaxed binge-watching before the work week begins.',
      },
    ],
  },

  facebook: {
    platformName: 'Facebook',
    badgeColor: 'bg-[#1877F2]',
    accentColor: '#1877F2',
    bestOverallDays: 'Monday, Wednesday & Friday',
    goldenHours: '8:30 AM – 10:00 AM & 1:00 PM – 3:00 PM',
    optimalFormats: 'Facebook Reels, Video with Open Question, Community Groups Post',
    generalProTip: 'Facebook users check the app during work breaks and morning news checks. Video posts with subtitles get 3.2x more comments.',
    hourlyHeatmap: [1, 1, 1, 1, 1, 2, 3, 4, 5, 5, 4, 4, 5, 5, 4, 3, 3, 3, 4, 4, 3, 2, 1, 1],
    weekdays: [
      {
        dayName: 'Monday',
        dayShort: 'MON',
        score: 93,
        peakWindows: ['8:30 AM – 10:00 AM', '1:00 PM – 3:00 PM'],
        bestFormat: 'Community News & Inspiring Reel',
        audienceBehavior: 'Morning check-ins and lunchtime group conversations.',
      },
      {
        dayName: 'Tuesday',
        dayShort: 'TUE',
        score: 94,
        peakWindows: ['9:00 AM', '1:30 PM', '6:00 PM'],
        bestFormat: 'Educational Video with captions',
        audienceBehavior: 'High comment thread debates and share velocity.',
      },
      {
        dayName: 'Wednesday',
        dayShort: 'WED',
        isPeakDay: true,
        score: 97,
        peakWindows: ['8:00 AM – 10:30 AM', '1:00 PM – 3:00 PM'],
        bestFormat: 'Viral Facebook Reel / Clip',
        audienceBehavior: 'Midweek peak Facebook user volume globally.',
      },
      {
        dayName: 'Thursday',
        dayShort: 'THU',
        score: 93,
        peakWindows: ['9:00 AM', '1:00 PM', '5:00 PM'],
        bestFormat: 'Story Post with Link in Comments',
        audienceBehavior: 'Steady daytime engagement across local and business groups.',
      },
      {
        dayName: 'Friday',
        dayShort: 'FRI',
        isPeakDay: true,
        score: 96,
        peakWindows: ['8:30 AM', '11:00 AM', '2:00 PM'],
        bestFormat: 'Event announcements & Funny Clips',
        audienceBehavior: 'High share volume into Messenger and group chats.',
      },
      {
        dayName: 'Saturday',
        dayShort: 'SAT',
        score: 86,
        peakWindows: ['10:00 AM – 12:00 PM', '4:00 PM'],
        bestFormat: 'Family, Events & Travel Photos',
        audienceBehavior: 'Slower daytime feed pace; higher mobile photo views.',
      },
      {
        dayName: 'Sunday',
        dayShort: 'SUN',
        score: 89,
        peakWindows: ['9:00 AM – 11:30 AM', '6:00 PM – 8:00 PM'],
        bestFormat: 'Weekly Recap Video',
        audienceBehavior: 'Evening engagement picks up as people prepare for the upcoming week.',
      },
    ],
  },

  twitter: {
    platformName: 'Twitter / X',
    badgeColor: 'bg-[#0A0A0A]',
    accentColor: '#0A0A0A',
    bestOverallDays: 'Monday, Tuesday & Wednesday',
    goldenHours: '8:00 AM – 10:00 AM & 12:00 PM – 2:00 PM',
    optimalFormats: 'Punchy 280-char hooks, 5–7 tweet Threads, 30s Video clips',
    generalProTip: 'Post breaking thoughts between 8:00 AM and 9:30 AM. Reply to top accounts in your niche within 10 minutes of their post.',
    hourlyHeatmap: [1, 1, 1, 1, 1, 2, 3, 4, 5, 5, 4, 5, 5, 4, 3, 3, 3, 4, 4, 3, 2, 2, 1, 1],
    weekdays: [
      {
        dayName: 'Monday',
        dayShort: 'MON',
        isPeakDay: true,
        score: 97,
        peakWindows: ['8:00 AM – 10:00 AM', '1:00 PM'],
        bestFormat: 'Market & Tech Insight Thread',
        audienceBehavior: 'Massive rush of news scanning, business announcements, and trending topics.',
      },
      {
        dayName: 'Tuesday',
        dayShort: 'TUE',
        isPeakDay: true,
        score: 99,
        peakWindows: ['9:00 AM', '12:00 PM – 2:00 PM', '5:00 PM'],
        bestFormat: 'Step-by-step Framework Thread',
        audienceBehavior: 'The highest single retweet and bookmark day for educational creators on X.',
      },
      {
        dayName: 'Wednesday',
        dayShort: 'WED',
        isPeakDay: true,
        score: 96,
        peakWindows: ['9:00 AM', '1:00 PM', '6:30 PM'],
        bestFormat: 'Hot Take / Counter-Intuitive Truth',
        audienceBehavior: 'Active midday debate threads with high comment quote velocity.',
      },
      {
        dayName: 'Thursday',
        dayShort: 'THU',
        score: 94,
        peakWindows: ['8:30 AM', '12:00 PM', '7:00 PM'],
        bestFormat: 'Tool List / Resource Stack',
        audienceBehavior: 'High bookmark-to-impression ratio as creators save useful tools.',
      },
      {
        dayName: 'Friday',
        dayShort: 'FRI',
        score: 91,
        peakWindows: ['9:00 AM', '11:30 AM', '3:00 PM'],
        bestFormat: 'Weekly Wins, Memes & Reflections',
        audienceBehavior: 'Attention wanes after 3 PM as weekend approaches.',
      },
      {
        dayName: 'Saturday',
        dayShort: 'SAT',
        score: 83,
        peakWindows: ['10:00 AM', '2:00 PM', '8:00 PM'],
        bestFormat: 'Casual Polls & Culture discussions',
        audienceBehavior: 'Casual browsing, sports live-tweeting, and pop culture trends.',
      },
      {
        dayName: 'Sunday',
        dayShort: 'SUN',
        score: 90,
        peakWindows: ['11:00 AM', '5:00 PM – 8:30 PM'],
        bestFormat: 'Sunday Evening Thinkpiece Thread',
        audienceBehavior: 'Audience reads long-form threads and prepares for Monday morning.',
      },
    ],
  },

  tiktok: {
    platformName: 'TikTok',
    badgeColor: 'bg-[#000000]',
    accentColor: '#00F2FE',
    bestOverallDays: 'Tuesday, Thursday & Friday',
    goldenHours: '6:00 AM – 9:00 AM & 7:00 PM – 11:00 PM',
    optimalFormats: '15–45s Vertical Video with Trending Sound & Instant Hook',
    generalProTip: 'The first 1.5 seconds make or break the video. Use an on-screen text question and jump straight into action with zero intro fluff.',
    hourlyHeatmap: [2, 1, 1, 1, 1, 3, 4, 4, 3, 3, 3, 4, 4, 3, 3, 3, 4, 4, 5, 5, 5, 5, 4, 3],
    weekdays: [
      {
        dayName: 'Monday',
        dayShort: 'MON',
        score: 93,
        peakWindows: ['6:00 AM – 8:00 AM', '8:00 PM – 10:00 PM'],
        bestFormat: 'Relatable Morning Hook / Challenge',
        audienceBehavior: 'Early morning bed-scrolling before work, and late-night binge watching.',
      },
      {
        dayName: 'Tuesday',
        dayShort: 'TUE',
        isPeakDay: true,
        score: 99,
        peakWindows: ['9:00 AM', '2:00 PM', '9:00 PM – 11:00 PM'],
        bestFormat: 'Trending Format / Transformation',
        audienceBehavior: 'Optimal global For You Page (FYP) algorithm momentum.',
      },
      {
        dayName: 'Wednesday',
        dayShort: 'WED',
        score: 94,
        peakWindows: ['7:00 AM', '12:00 PM', '8:00 PM'],
        bestFormat: 'Fast-Paced Tutorial / Behind Scenes',
        audienceBehavior: 'High share-to-WhatsApp and Instagram DM button clicks.',
      },
      {
        dayName: 'Thursday',
        dayShort: 'THU',
        isPeakDay: true,
        score: 98,
        peakWindows: ['9:00 AM', '12:00 PM', '7:00 PM – 10:30 PM'],
        bestFormat: 'Storytime with Visual Teaser',
        audienceBehavior: 'Peak video completion rate and audio bookmarking.',
      },
      {
        dayName: 'Friday',
        dayShort: 'FRI',
        isPeakDay: true,
        score: 97,
        peakWindows: ['5:00 AM', '1:00 PM', '8:00 PM – 11:30 PM'],
        bestFormat: 'Entertainment, Dance & Trending Audio',
        audienceBehavior: 'Huge evening party and wind-down scroll volume.',
      },
      {
        dayName: 'Saturday',
        dayShort: 'SAT',
        score: 91,
        peakWindows: ['11:00 AM', '7:00 PM – 11:00 PM'],
        bestFormat: 'Vlog & Weekend Lifestyle',
        audienceBehavior: 'Leisurely weekend viewing with high sound-sync popularity.',
      },
      {
        dayName: 'Sunday',
        dayShort: 'SUN',
        score: 93,
        peakWindows: ['7:00 AM – 9:00 AM', '4:00 PM', '8:00 PM'],
        bestFormat: 'Inspiring Clip & Week Ahead Prep',
        audienceBehavior: 'Sunday evening scroll sessions consistently drive million-view spikes.',
      },
    ],
  },

  threads: {
    platformName: 'Threads',
    badgeColor: 'bg-neutral-900',
    accentColor: '#101010',
    bestOverallDays: 'Wednesday, Thursday & Sunday',
    goldenHours: '7:30 AM – 9:00 AM & 6:00 PM – 9:00 PM',
    optimalFormats: 'Conversational Open Question, Raw Text Takes, Single Photo Hooks',
    generalProTip: 'Threads rewards authentic conversations. Posts that end with an easy question to answer get 4x more replies.',
    hourlyHeatmap: [1, 1, 1, 1, 1, 2, 3, 4, 4, 3, 3, 4, 4, 3, 3, 3, 4, 4, 5, 5, 4, 3, 2, 1],
    weekdays: [
      {
        dayName: 'Monday',
        dayShort: 'MON',
        score: 92,
        peakWindows: ['7:30 AM', '12:00 PM', '8:00 PM'],
        bestFormat: 'Open Question for your niche',
        audienceBehavior: 'Creators checking in and sharing what they are building this week.',
      },
      {
        dayName: 'Tuesday',
        dayShort: 'TUE',
        score: 93,
        peakWindows: ['8:00 AM', '1:00 PM', '7:30 PM'],
        bestFormat: 'Short Lesson / Honest Experience',
        audienceBehavior: 'High reply engagement and thread reposts.',
      },
      {
        dayName: 'Wednesday',
        dayShort: 'WED',
        isPeakDay: true,
        score: 98,
        peakWindows: ['7:00 AM – 9:30 AM', '8:00 PM – 10:00 PM'],
        bestFormat: 'Hot Take / Discussion Topic',
        audienceBehavior: 'Peak conversational traffic across Instagram connected graph.',
      },
      {
        dayName: 'Thursday',
        dayShort: 'THU',
        isPeakDay: true,
        score: 96,
        peakWindows: ['8:00 AM', '12:30 PM', '8:30 PM'],
        bestFormat: 'Behind the Scenes + Photo',
        audienceBehavior: 'Strong image and text post interactions.',
      },
      {
        dayName: 'Friday',
        dayShort: 'FRI',
        score: 90,
        peakWindows: ['8:00 AM', '2:00 PM', '6:00 PM'],
        bestFormat: 'Casual Weekend Plans',
        audienceBehavior: 'Playful, casual posts perform best as the week concludes.',
      },
      {
        dayName: 'Saturday',
        dayShort: 'SAT',
        score: 87,
        peakWindows: ['10:00 AM – 1:00 PM', '7:00 PM'],
        bestFormat: 'Lifestyle Photo & Thought',
        audienceBehavior: 'Slower, relaxed reading pace.',
      },
      {
        dayName: 'Sunday',
        dayShort: 'SUN',
        isPeakDay: true,
        score: 95,
        peakWindows: ['9:30 AM', '3:00 PM', '8:00 PM – 10:00 PM'],
        bestFormat: 'Reflective Thought / Monday Goal',
        audienceBehavior: 'High evening community reflection as creators prepare for the next week.',
      },
    ],
  },

  linkedin: {
    platformName: 'LinkedIn',
    badgeColor: 'bg-[#0A66C2]',
    accentColor: '#0A66C2',
    bestOverallDays: 'Tuesday, Wednesday & Thursday',
    goldenHours: '8:00 AM – 10:00 AM & 12:00 PM – 1:30 PM',
    optimalFormats: 'PDF Document Carousels (10–14 pages), Founder Story with Takeaway',
    generalProTip: 'Always post during standard business hours (8 AM - 1 PM). The algorithm prioritizes posts that generate meaningful comments from senior profiles.',
    hourlyHeatmap: [1, 1, 1, 1, 1, 2, 3, 5, 5, 5, 4, 4, 5, 5, 4, 3, 3, 2, 2, 2, 1, 1, 1, 1],
    weekdays: [
      {
        dayName: 'Monday',
        dayShort: 'MON',
        score: 92,
        peakWindows: ['8:00 AM – 10:00 AM', '1:00 PM'],
        bestFormat: 'Weekly Goals & Strategy Framework',
        audienceBehavior: 'Professionals organizing their calendars and reading business insights.',
      },
      {
        dayName: 'Tuesday',
        dayShort: 'TUE',
        isPeakDay: true,
        score: 99,
        peakWindows: ['8:00 AM – 10:30 AM', '12:00 PM'],
        bestFormat: 'PDF Document Carousel (High Dwell Time)',
        audienceBehavior: 'The #1 day of the week for B2B viral reach and profile views.',
      },
      {
        dayName: 'Wednesday',
        dayShort: 'WED',
        isPeakDay: true,
        score: 98,
        peakWindows: ['8:30 AM', '11:00 AM – 1:30 PM'],
        bestFormat: 'Industry Case Study & Data Breakdown',
        audienceBehavior: 'Peak comment discussions and executive shares across LinkedIn feeds.',
      },
      {
        dayName: 'Thursday',
        dayShort: 'THU',
        isPeakDay: true,
        score: 97,
        peakWindows: ['8:00 AM – 10:00 AM', '2:00 PM'],
        bestFormat: 'Career Lessons / Hiring & Culture',
        audienceBehavior: 'Strong retention rates before the Friday slow-down.',
      },
      {
        dayName: 'Friday',
        dayShort: 'FRI',
        score: 87,
        peakWindows: ['8:00 AM – 11:00 AM', '1:00 PM'],
        bestFormat: 'Celebratory Post / Project Launch',
        audienceBehavior: 'Activity drops sharply after 2:00 PM as offices wind down.',
      },
      {
        dayName: 'Saturday',
        dayShort: 'SAT',
        score: 72,
        peakWindows: ['10:00 AM – 12:00 PM'],
        bestFormat: 'Personal Growth / Book Recommendation',
        audienceBehavior: 'Lowest business activity of the week; strictly personal stories.',
      },
      {
        dayName: 'Sunday',
        dayShort: 'SUN',
        score: 82,
        peakWindows: ['11:00 AM', '6:00 PM – 9:00 PM'],
        bestFormat: 'Preparing for the Week / Career Mindset',
        audienceBehavior: 'Evening prep for corporate workers scanning jobs and news.',
      },
    ],
  },

  pinterest: {
    platformName: 'Pinterest',
    badgeColor: 'bg-[#BD081C]',
    accentColor: '#BD081C',
    bestOverallDays: 'Friday, Saturday & Sunday',
    goldenHours: '8:00 PM – 11:00 PM (Late Evening Leisure)',
    optimalFormats: '1000x1500 (2:3) Vertical Rich Pins, Step-by-Step Guides',
    generalProTip: 'Unlike other social platforms, Pinterest activity peaks late in the evening and over the weekend when users plan home, design, and fashion projects.',
    hourlyHeatmap: [1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 4, 2],
    weekdays: [
      {
        dayName: 'Monday',
        dayShort: 'MON',
        score: 88,
        peakWindows: ['8:00 PM – 11:00 PM'],
        bestFormat: 'Quick Recipe & Daily Planner Pin',
        audienceBehavior: 'Evening wind-down search queries for dinner and work outfits.',
      },
      {
        dayName: 'Tuesday',
        dayShort: 'TUE',
        score: 90,
        peakWindows: ['8:30 PM – 11:00 PM'],
        bestFormat: 'Home Decor & Workspace Ideas',
        audienceBehavior: 'Organizing boards for home renovations and creative projects.',
      },
      {
        dayName: 'Wednesday',
        dayShort: 'WED',
        score: 91,
        peakWindows: ['8:00 PM – 11:00 PM'],
        bestFormat: 'DIY Guide / Infographic Pin',
        audienceBehavior: 'Midweek board bookmarking with strong outbound click-throughs.',
      },
      {
        dayName: 'Thursday',
        dayShort: 'THU',
        score: 93,
        peakWindows: ['8:00 PM – 11:30 PM'],
        bestFormat: 'Weekend Prep & Outfit Inspiration',
        audienceBehavior: 'Audiences plan their upcoming weekend activities and shopping.',
      },
      {
        dayName: 'Friday',
        dayShort: 'FRI',
        isPeakDay: true,
        score: 98,
        peakWindows: ['3:00 PM', '8:30 PM – 1:00 AM'],
        bestFormat: 'Party, Cocktail & Weekend Fun Pin',
        audienceBehavior: 'Late-night visual searches with high impulse save rates.',
      },
      {
        dayName: 'Saturday',
        dayShort: 'SAT',
        isPeakDay: true,
        score: 99,
        peakWindows: ['8:00 PM – 11:30 PM'],
        bestFormat: 'High-Resolution 2:3 Vertical Graphic',
        audienceBehavior: 'The highest single pin creation and repin day on the entire network.',
      },
      {
        dayName: 'Sunday',
        dayShort: 'SUN',
        isPeakDay: true,
        score: 97,
        peakWindows: ['8:00 PM – 11:00 PM'],
        bestFormat: 'Weekly Meal Prep & Habit Tracker',
        audienceBehavior: 'Sunday evening moodboarding is the prime search window for Pinterest.',
      },
    ],
  },
};

export const BestTimeToPostWeekly: React.FC<BestTimeToPostWeeklyProps> = ({
  selectedPlatform = 'instagram',
  onSelectPlatform,
  onSchedulePost,
}) => {
  const [activeDayIndex, setActiveDayIndex] = useState<number>(() => {
    // Current day of week: Sunday is 0, Monday is 1, etc.
    const day = new Date().getDay();
    return day === 0 ? 6 : day - 1; // 0 for Mon, 6 for Sun
  });

  const [timezone, setTimezone] = useState<'LOCAL' | 'EST' | 'GMT' | 'IST'>('LOCAL');
  const [copiedSchedule, setCopiedSchedule] = useState(false);

  const data = WEEKLY_TIMING_DATABASE[selectedPlatform] || WEEKLY_TIMING_DATABASE.instagram;
  const activeDay = data.weekdays[activeDayIndex] || data.weekdays[0];

  const handleCopySchedule = () => {
    const text = `BEST TIME TO POST ON ${data.platformName.toUpperCase()} (ALL WEEK):\n\n` +
      data.weekdays.map(d => `• ${d.dayName}: ${d.peakWindows.join(' & ')} (${d.score}% Viral Score) - ${d.bestFormat}`).join('\n') +
      `\n\nGolden Hours: ${data.goldenHours}\nBest Days: ${data.bestOverallDays}`;

    navigator.clipboard.writeText(text);
    setCopiedSchedule(true);
    setTimeout(() => setCopiedSchedule(false), 2000);
  };

  const platformsList: AnalyzerPlatform[] = [
    'instagram',
    'youtube',
    'facebook',
    'twitter',
    'tiktok',
    'threads',
    'linkedin',
    'pinterest',
  ];

  return (
    <div className="card-brutal p-6 bg-white border-2 border-[#0A0A0A] shadow-brutal space-y-6 text-left">
      {/* 1. Header with Platform Branding & Platform Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-[#0A0A0A]">
        <div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 text-white border border-[#0A0A0A] text-[10px] font-mono font-black uppercase shadow-brutal-sm ${data.badgeColor}`}>
              WEEKLY POST TIMING ENGINE
            </span>
            <span className="text-xs font-mono font-bold text-neutral-500">
              Synced with {data.platformName} Algorithm
            </span>
          </div>

          <h2 className="font-display text-2xl font-black text-[#0A0A0A] tracking-tight mt-1 flex items-center gap-2">
            <PlatformIcon platform={selectedPlatform} className="w-6 h-6 text-[#FF5B37]" />
            <span>Best Time to Post on {data.platformName} (All Week)</span>
          </h2>
          <p className="text-xs text-neutral-600 font-medium">
            Optimal engagement heatmaps, peak viral retention slots, and content formats for all 7 days of the week.
          </p>
        </div>

        {/* Action Controls: Copy & Timezone */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center border border-[#0A0A0A] bg-neutral-50 text-[11px] font-mono font-bold">
            <span className="px-2 py-1 text-neutral-500 border-r border-[#0A0A0A]">TZ:</span>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value as any)}
              className="bg-transparent px-2 py-1 focus:outline-none cursor-pointer"
            >
              <option value="LOCAL">Local Time (Auto)</option>
              <option value="EST">EST (New York)</option>
              <option value="GMT">GMT (London)</option>
              <option value="IST">IST (India)</option>
            </select>
          </div>

          <button
            onClick={handleCopySchedule}
            className="px-3 py-1.5 bg-[#FFFDF8] hover:bg-neutral-100 border border-[#0A0A0A] text-xs font-mono font-bold flex items-center gap-1 shadow-xs cursor-pointer"
          >
            {copiedSchedule ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSchedule ? 'Copied Schedule' : 'Copy Schedule'}</span>
          </button>
        </div>
      </div>

      {/* 2. Platform Switcher Strip (Switch right here or via top analyzer) */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-mono font-bold uppercase text-neutral-500 block">
          Switch Social Media Platform Timing:
        </label>
        <div className="flex flex-wrap gap-1.5">
          {platformsList.map((pKey) => {
            const isActive = selectedPlatform === pKey;
            const pData = WEEKLY_TIMING_DATABASE[pKey];

            return (
              <button
                key={pKey}
                onClick={() => onSelectPlatform?.(pKey)}
                className={`px-3 py-1.5 text-xs font-display font-bold border-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-brutal-sm scale-102'
                    : 'bg-white hover:bg-neutral-100 text-[#0A0A0A] border-[#0A0A0A]'
                }`}
              >
                <PlatformIcon platform={pKey} className={`w-3.5 h-3.5 ${isActive ? 'text-[#B8FF5C]' : 'text-neutral-700'}`} />
                <span>{pData.platformName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Golden Hours & Pro Tip Highlight Box */}
      <div className="p-4 bg-[#FFFDF8] border-2 border-[#0A0A0A] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-[#FF5B37]" />
            <span>Golden Peak Windows</span>
          </div>
          <div className="font-display font-black text-sm text-[#0A0A0A]">
            {data.goldenHours}
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#4D9FFF]" />
            <span>Top Performing Days</span>
          </div>
          <div className="font-display font-bold text-sm text-[#0A0A0A]">
            {data.bestOverallDays}
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-[10px] font-bold text-neutral-500 uppercase flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Optimal Formats</span>
          </div>
          <div className="font-display font-medium text-xs text-[#0A0A0A] truncate">
            {data.optimalFormats}
          </div>
        </div>
      </div>

      {/* 4. 7-Day Week Interactive Cards Grid (Monday through Sunday) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-700">
          <span>7-DAY POSTING SCHEDULE · CLICK ANY DAY TO INSPECT:</span>
          <span className="text-[11px] text-neutral-500 font-normal">All times calibrated for {data.platformName}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {data.weekdays.map((day, idx) => {
            const isSelected = activeDayIndex === idx;

            return (
              <div
                key={day.dayName}
                onClick={() => setActiveDayIndex(idx)}
                className={`card-brutal p-3 border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[160px] text-left relative ${
                  isSelected
                    ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-brutal translate-y-[-2px]'
                    : 'bg-white hover:bg-neutral-50 text-[#0A0A0A] border-[#0A0A0A]'
                }`}
              >
                {/* Day Header */}
                <div className="flex items-center justify-between pb-1.5 border-b border-current/20">
                  <div className="font-display font-black text-sm">
                    {day.dayShort}
                  </div>
                  {day.isPeakDay && (
                    <span className="px-1.5 py-0.2 bg-[#B8FF5C] text-[#0A0A0A] border border-[#0A0A0A] text-[8px] font-mono font-black uppercase">
                      PEAK
                    </span>
                  )}
                </div>

                {/* Viral Score Meter */}
                <div className="my-2 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="opacity-70">Viral Score</span>
                    <strong className={day.score >= 95 ? 'text-[#B8FF5C]' : ''}>{day.score}%</strong>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${day.score >= 95 ? 'bg-[#FF5B37]' : 'bg-[#4D9FFF]'}`}
                      style={{ width: `${day.score}%` }}
                    />
                  </div>
                </div>

                {/* Best Times List */}
                <div className="space-y-1 text-[11px] font-mono">
                  <div className="opacity-70 text-[9px] uppercase font-bold">Best Slot:</div>
                  <div className="font-bold leading-tight line-clamp-2">
                    {day.peakWindows[0]}
                  </div>
                  {day.peakWindows[1] && (
                    <div className="text-[10px] opacity-80 leading-tight">
                      + {day.peakWindows[1].split('–')[0]}
                    </div>
                  )}
                </div>

                {/* Bottom Format Tag */}
                <div className="pt-2 text-[9px] font-mono font-bold truncate opacity-80 border-t border-current/10">
                  {day.bestFormat.split('/')[0]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Deep Inspection of the Selected Day */}
      <div className="p-5 bg-white border-2 border-[#0A0A0A] shadow-brutal space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#0A0A0A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF5B37] text-white border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center font-display font-black text-sm">
              {activeDay.dayShort}
            </div>
            <div>
              <div className="font-display font-black text-base text-[#0A0A0A] flex items-center gap-2">
                <span>{activeDay.dayName} Optimal Strategy for {data.platformName}</span>
                {activeDay.isPeakDay && (
                  <span className="px-2 py-0.5 bg-[#B8FF5C] border border-[#0A0A0A] text-[9px] font-mono font-black uppercase">
                    ⭐ Highest Weekly Reach Slot
                  </span>
                )}
              </div>
              <div className="text-xs text-neutral-600 font-medium">
                {activeDay.audienceBehavior}
              </div>
            </div>
          </div>

          <button
            onClick={() => onSchedulePost?.(activeDay.dayName, activeDay.peakWindows[0], selectedPlatform)}
            className="px-4 py-2 bg-[#0A0A0A] hover:bg-[#FF5B37] text-white font-display font-bold text-xs border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
          >
            <span>Schedule for {activeDay.dayName} Peak ↗</span>
          </button>
        </div>

        {/* Detailed Times Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-[#FFFDF8] border border-[#0A0A0A] space-y-1">
            <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#FF5B37]" />
              <span>Primary Peak Slot</span>
            </div>
            <div className="font-display font-black text-base text-[#0A0A0A]">
              {activeDay.peakWindows[0]}
            </div>
            <div className="text-[10px] text-neutral-500 font-mono">
              Maximum active follower concurrency
            </div>
          </div>

          <div className="p-3 bg-[#FFFDF8] border border-[#0A0A0A] space-y-1">
            <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#4D9FFF]" />
              <span>Secondary Wind-Down Slot</span>
            </div>
            <div className="font-display font-black text-base text-[#0A0A0A]">
              {activeDay.peakWindows[1] || 'Evening 8:00 PM'}
            </div>
            <div className="text-[10px] text-neutral-500 font-mono">
              High comment and share discussion rate
            </div>
          </div>

          <div className="p-3 bg-[#FFFDF8] border border-[#0A0A0A] space-y-1">
            <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Recommended Format</span>
            </div>
            <div className="font-display font-black text-sm text-[#0A0A0A] truncate">
              {activeDay.bestFormat}
            </div>
            <div className="text-[10px] text-neutral-500 font-mono">
              Favored by {data.platformName} algorithm today
            </div>
          </div>
        </div>

        {/* 24-Hour Visual Hourly Heatmap Bar */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-600">
            <span>24-Hour Concurrency Heatmap ({data.platformName} audience):</span>
            <span className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-neutral-200 border border-neutral-400" /> Low
              <span className="inline-block w-2.5 h-2.5 bg-[#4D9FFF]" /> Medium
              <span className="inline-block w-2.5 h-2.5 bg-[#FF5B37]" /> High
              <span className="inline-block w-2.5 h-2.5 bg-[#B8FF5C] border border-[#0A0A0A]" /> Peak Viral
            </span>
          </div>

          <div className="grid grid-cols-24 gap-0.5 h-7 bg-neutral-100 p-1 border border-[#0A0A0A]">
            {data.hourlyHeatmap.map((intensity, hour) => {
              const colorClass =
                intensity === 5
                  ? 'bg-[#B8FF5C] border border-[#0A0A0A]'
                  : intensity === 4
                  ? 'bg-[#FF5B37]'
                  : intensity === 3
                  ? 'bg-[#4D9FFF]'
                  : intensity === 2
                  ? 'bg-neutral-300'
                  : 'bg-neutral-200';

              const hourLabel = hour === 0 ? '12 AM' : hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`;

              return (
                <div
                  key={hour}
                  title={`${hourLabel}: Intensity Level ${intensity}/5`}
                  className={`h-full rounded-xs transition-transform hover:scale-115 ${colorClass}`}
                />
              );
            })}
          </div>
          <div className="flex justify-between text-[9px] font-mono text-neutral-400">
            <span>12 AM</span>
            <span>6 AM</span>
            <span>12 PM (Noon)</span>
            <span>6 PM</span>
            <span>11 PM</span>
          </div>
        </div>

        {/* Pro Tip Callout */}
        <div className="p-3 bg-amber-50 border border-amber-300 rounded text-xs text-amber-900 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Creator Secret for {data.platformName}:</strong> {data.generalProTip}
          </div>
        </div>
      </div>
    </div>
  );
};
