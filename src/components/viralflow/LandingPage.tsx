import React, { useState } from 'react';
import { 
  Zap, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Share2, 
  Calendar, 
  BarChart3, 
  Bot, 
  ShieldCheck, 
  Play,
  Layers,
  Flame,
  Star,
  Film,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Clock,
  HelpCircle,
  TrendingUp,
  ExternalLink,
  Shield,
  FileText
} from 'lucide-react';
import { HivepostlyLogo } from './HivepostlyLogo';
import { LegalModal, LegalModalType } from './LegalModal';

interface LandingPageProps {
  onEnterApp: () => void;
  onOpenLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, onOpenLogin }) => {
  // Accordion state for the 7 FAQ questions
  const [openFaq, setOpenFaq] = useState<number | null>(0); // First question open by default

  // Legal modal state
  const [legalModalType, setLegalModalType] = useState<LegalModalType>(null);

  const marqueeItems = [
    'VIRAL HOOKS',
    'AUTOPUBLISH',
    'HIVEPOSTLY STUDIO FX',
    'KARAOKE SUBTITLES',
    'COMMENT-TO-DM BOT',
    '8 NETWORKS SYNC',
    'ANALYTICS',
    'PINTEREST BOARDS',
    'NATIVE PREVIEWS',
  ];

  // 7 Bottom FAQ Questions
  const faqList = [
    {
      q: 'How do I connect my Instagram, YouTube, and other accounts?',
      a: 'Hivepostly connects seamlessly using official OAuth 2.0 developer APIs (Meta Graph API for Instagram & Facebook, YouTube Data API v3, TikTok for Developers, X API v2, LinkedIn v2, and Pinterest Business API). Simply click Connect under Platform Integrations to authorize in one click—we never store or ask for your account passwords.',
    },
    {
      q: 'Can I broadcast and schedule to all 8 platforms at once?',
      a: 'Yes! The Master Composer lets you write once, and our AI automatically formats captions, tags, and media aspect ratios for all 8 networks simultaneously (e.g. 280 characters for X, engagement tags for Instagram Reels, rich SEO descriptions for YouTube, and Idea Pin boards for Pinterest).',
    },
    {
      q: 'How does the Comment-to-DM Automation Bot work without triggering spam flags?',
      a: 'Our Comment-to-DM bot strictly operates within official Meta & Instagram webhook rate limits. It utilizes randomized response jitter (15–45 seconds delay) and dynamic synonym variation so every DM is unique, ensuring 100% account safety while automatically delivering your download links or lead magnets.',
    },
    {
      q: 'What is Hivepostly Studio (Video Editor) and does it generate auto-karaoke subtitles?',
      a: 'Hivepostly Studio is a browser-native multi-track video editor powered by WebCodecs. It automatically transcribes your spoken audio, burns in word-by-word animated karaoke subtitles, clips footage to 9:16 vertical reels, applies GPU motion effects, and adds custom watermarks with zero external software needed.',
    },
    {
      q: 'How does the AI Studio generate 5 answer variants for hooks, scripts, and captions?',
      a: 'AI Studio is powered by dual Gemini 3 and GPT-5 engines trained on over 100 million viral social broadcasts. Whenever you request Captions, Hashtags, SEO Keywords, Hook Ideas, or Video Scripts, it generates 5 distinct, high-converting options with predicted virality scores and one-click copy buttons.',
    },
    {
      q: 'How does Pinterest integration work for pins, idea pins, and carousels?',
      a: 'You can connect your Pinterest Business account, schedule high-converting vertical visual pins or multi-slide carousels, configure direct destination backlinks, and assign posts to specific boards to drive compound evergreen search traffic to your store or content.',
    },
    {
      q: 'Is there a free trial, and how do monthly credits work?',
      a: 'Yes! You get 300 free credits upon signup with no credit card required. Credits are only deducted when using AI text generation (1 credit) or automatic video karaoke subtitle rendering (5 credits). Post composing, scheduling, and previewing across all 8 networks are always 100% unlimited.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#0A0A0A] font-body selection:bg-[#B8FF5C] selection:text-[#0A0A0A] flex flex-col">
      {/* Legal Modal (Privacy Policy & Terms) */}
      <LegalModal 
        type={legalModalType} 
        onClose={() => setLegalModalType(null)} 
      />

      {/* 1. Sticky Top Navigation */}
      <nav className="sticky top-0 z-40 w-full bg-[#FFFDF8] border-b-2 border-[#0A0A0A] px-6 sm:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div 
            onClick={onEnterApp}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <HivepostlyLogo size="md" />
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-bold tracking-tight">
            <a href="#services" className="hover:text-[#FF5B37] transition-colors">Services</a>
            <a href="#how-it-works" className="hover:text-[#FF5B37] transition-colors">How It Works</a>
            <a href="#platforms" className="hover:text-[#FF5B37] transition-colors">Platforms</a>
            <a href="#pricing" className="hover:text-[#FF5B37] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[#FF5B37] transition-colors">FAQ</a>
          </div>
        </div>

        {/* Right CTA buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLogin}
            className="px-4 py-2 text-sm font-bold tracking-tight hover:text-[#FF5B37] transition-colors cursor-pointer"
          >
            Log in
          </button>
          <button
            onClick={onEnterApp}
            className="px-5 py-2.5 bg-[#0A0A0A] hover:bg-[#FF5B37] text-white hover:text-[#0A0A0A] font-display font-bold text-sm tracking-tight border-2 border-[#0A0A0A] shadow-brutal transition-all hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 cursor-pointer"
          >
            Start free
          </button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="px-6 sm:px-12 pt-16 pb-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Headline & CTAs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#B8FF5C] border-2 border-[#0A0A0A] shadow-brutal-sm text-xs font-black tracking-widest uppercase">
            <span>✨ AI-native social OS</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.98] text-[#0A0A0A]">
            Upload once. Go viral{' '}
            <span className="bg-[#FF5B37] text-white px-3 inline-block transform -rotate-1 border-2 border-[#0A0A0A] shadow-brutal">
              everywhere
            </span>
            .
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-neutral-700 font-medium leading-relaxed max-w-xl">
            Hivepostly AI is the all-in-one command center for creators, agencies and brands to generate, polish, schedule and auto-engage across eight networks without breaking workflow.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onEnterApp}
              className="px-7 py-4 bg-[#FF5B37] hover:bg-[#ff4921] text-white font-display font-black text-base tracking-tight border-2 border-[#0A0A0A] shadow-brutal flex items-center gap-2 transition-all hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
            >
              <span>Get started free</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onEnterApp}
              className="px-6 py-4 bg-white hover:bg-neutral-50 text-[#0A0A0A] font-display font-bold text-base tracking-tight border-2 border-[#0A0A0A] shadow-brutal transition-all hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
            >
              See it live
            </button>
          </div>

          {/* Social Platforms Row (Matches Image 2 with Colorful Square Icons + Pinterest) */}
          <div className="pt-6 border-t-2 border-[#0A0A0A]/10 flex flex-wrap items-center gap-2.5">
            {/* Twitter / X */}
            <div 
              title="Twitter / X" 
              className="w-10 h-10 bg-[#1DA1F2] border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center text-white transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>

            {/* Instagram */}
            <div 
              title="Instagram" 
              className="w-10 h-10 bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#F77737] border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center text-white transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>

            {/* Facebook */}
            <div 
              title="Facebook" 
              className="w-10 h-10 bg-[#1877F2] border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center text-white transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>

            {/* LinkedIn */}
            <div 
              title="LinkedIn" 
              className="w-10 h-10 bg-[#B8FF5C] border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center text-[#0A0A0A] transition-transform hover:-translate-y-0.5 font-bold font-mono text-base cursor-pointer"
            >
              in
            </div>

            {/* YouTube */}
            <div 
              title="YouTube" 
              className="w-10 h-10 bg-[#FF0000] border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center text-white transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>

            {/* Threads */}
            <div 
              title="Threads" 
              className="w-10 h-10 bg-[#B8FF5C] border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center text-[#0A0A0A] transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.186 24C5.467 24 .012 18.571 0 11.905.012 5.239 5.467-.19 12.186-.19c3.708 0 7.02 1.545 9.336 4.093l-2.457 2.383c-1.748-1.928-4.223-3.08-6.879-3.08-5.008 0-9.083 4.04-9.092 9.022.009 4.981 4.084 9.022 9.092 9.022 4.12 0 7.23-2.613 7.822-6.577H12.186v-3.388h11.233c.092.656.138 1.341.138 2.053C23.557 18.558 18.47 24 12.186 24z"/>
              </svg>
            </div>

            {/* TikTok */}
            <div 
              title="TikTok" 
              className="w-10 h-10 bg-[#0A0A0A] border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center text-white transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.68c-.01 2.39-1.07 4.74-2.9 6.27-1.83 1.53-4.35 2.12-6.69 1.57-2.34-.55-4.32-2.17-5.26-4.34-.94-2.17-.79-4.74.4-6.79 1.19-2.05 3.39-3.37 5.76-3.46.36-.01.72 0 1.07.05v4.12c-.34-.1-.7-.14-1.06-.11-1.1.08-2.12.72-2.66 1.68-.54.96-.51 2.17.08 3.1.59.93 1.67 1.48 2.77 1.42 1.1-.06 2.09-.72 2.53-1.73.19-.45.28-.93.28-1.42V.02z"/>
              </svg>
            </div>

            {/* Pinterest (Added as requested) */}
            <div 
              title="Pinterest" 
              className="w-10 h-10 bg-[#E60023] border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center text-white transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
              </svg>
            </div>

            <span className="text-[#0A0A0A] font-bold text-xs ml-1 font-mono tracking-tight">+ more</span>
          </div>
        </div>

        {/* Right Visual (5 Cols): Framed Creator Card with hard shadows and badges */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="relative w-full max-w-md transform rotate-1 hover:rotate-0 transition-transform duration-300">
            {/* Main Brutalist Photo Card */}
            <div className="card-brutal p-3 bg-white">
              <div className="relative aspect-[4/3] overflow-hidden border-2 border-[#0A0A0A]">
                <img
                  src="/images/hivepostly-creator.jpg"
                  alt="Creator using Hivepostly Studio"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-3 left-3 bg-[#0A0A0A] text-white px-3 py-1 font-display font-bold text-xs tracking-wider uppercase border border-white">
                  ● LIVE BROADCAST
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-sm text-[#0A0A0A]">
                    Aanya · Hivepostly Creator Studio
                  </span>
                  <span className="px-2 py-0.5 bg-[#B8FF5C] border border-[#0A0A0A] text-[10px] font-black uppercase font-mono">
                    8 Channels Sync
                  </span>
                </div>
                <div className="text-xs text-neutral-600 font-medium">
                  "One click sent this Reel to Instagram, YouTube Shorts, TikTok and Pinterest with auto-caption karaoke burned in."
                </div>
              </div>
            </div>

            {/* Overlapping Floating Badge */}
            <div className="absolute -bottom-5 -left-5 bg-[#B8FF5C] border-2 border-[#0A0A0A] shadow-brutal p-3 transform -rotate-3">
              <div className="font-display font-black text-xl text-[#0A0A0A]">
                +327%
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#0A0A0A]">
                Avg Engagement Lift
              </div>
            </div>

            {/* Overlapping Floating Star Pill */}
            <div className="absolute -top-4 -right-4 bg-[#FF5B37] text-white border-2 border-[#0A0A0A] shadow-brutal px-3.5 py-1.5 font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transform rotate-3">
              <span>✦ GEMINI 3 & GPT-5</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Marquee Ticker Banner (Full-Width Black Ribbon) */}
      <div className="w-full bg-[#0A0A0A] border-y-2 border-[#0A0A0A] py-3.5 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-white font-display font-black text-sm tracking-widest uppercase">
          {marqueeItems.concat(marqueeItems).map((item, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span>{item}</span>
              <span className="text-[#FF5B37] text-base">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. "The Stack" / Complete Services (Matches Image 3 + Missing OpenCut Video Editor & Comment-to-DM Bot) */}
      <section id="services" className="px-6 sm:px-12 py-20 max-w-7xl mx-auto w-full text-left space-y-12">
        <div className="max-w-2xl">
          <div className="text-xs font-black tracking-widest text-[#FF5B37] uppercase mb-2">
            THE STACK · COMPLETE CREATOR SUITE
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tighter text-[#0A0A0A]">
            Everything you need. Nothing you don't.
          </h2>
          <p className="text-sm font-semibold text-neutral-700 mt-2">
            Six high-octane modules built to replace 5 separate SaaS subscriptions in one unified dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Publish Anywhere',
              subtitle: 'Master composer targeting 8 networks simultaneously with native device previews, Post Doctor audits, and media uploads.',
              icon: Share2,
              color: 'bg-[#FF5B37]',
              badge: '8 Networks',
            },
            {
              title: 'Hivepostly Studio',
              subtitle: 'WebCodecs multi-track video timeline, word-by-word animated karaoke captions, GPU motion effects, 9:16 reels, and watermark branding.',
              icon: Film,
              color: 'bg-[#B8FF5C]',
              badge: 'Pro Video FX',
            },
            {
              title: 'Comment-to-DM Trigger Bot',
              subtitle: 'Auto-reply to reel comments and deliver download bundles, PDFs or store links into DMs safely within Meta limits.',
              icon: Bot,
              color: 'bg-[#FF5B37]',
              badge: 'Live Safe',
            },
            {
              title: 'AI Content Studio',
              subtitle: 'Gemini 3 & GPT-5.2 powered generators for 5-variant hooks, captions, viral scripts, SEO tags, and tiered hashtags.',
              icon: Sparkles,
              color: 'bg-[#4D9FFF]',
              badge: '5 Variants',
            },
            {
              title: 'Smart Bento Scheduler',
              subtitle: 'Visual calendar view with 7×24 follower active hours heatmaps to deploy posts at the exact minute of peak virality.',
              icon: Calendar,
              color: 'bg-[#B8FF5C]',
              badge: 'Virality Heatmap',
            },
            {
              title: 'Telemetry & Receipts',
              subtitle: 'Deep cross-platform analytics, reach velocity tracking, save-to-reach ratios, retention curves, and DM conversion revenue.',
              icon: BarChart3,
              color: 'bg-[#0A0A0A]',
              badge: 'Real-Time',
            },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="card-brutal p-6 flex flex-col justify-between hover:translate-x-0.5 hover:translate-y-0.5 transition-all group relative bg-white"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 ${f.color} border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${f.color === 'bg-[#0A0A0A]' ? 'text-white' : 'text-[#0A0A0A]'}`} />
                    </div>
                    <span className="px-2 py-0.5 bg-[#FFFDF8] border border-[#0A0A0A] text-[10px] font-mono font-bold uppercase shadow-brutal-sm">
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold tracking-tight text-[#0A0A0A]">
                    {f.title}
                  </h3>
                  <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                    {f.subtitle}
                  </p>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={onEnterApp}
                    className="text-xs font-bold font-display uppercase tracking-wider text-[#0A0A0A] group-hover:text-[#FF5B37] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Explore module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. "How It Works" Section (Requested by User) */}
      <section id="how-it-works" className="w-full bg-white border-y-2 border-[#0A0A0A] px-6 sm:px-12 py-20">
        <div className="max-w-7xl mx-auto space-y-12 text-left">
          <div className="max-w-2xl">
            <div className="text-xs font-black tracking-widest text-[#FF5B37] uppercase mb-2">
              THE WORKFLOW
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tighter text-[#0A0A0A]">
              How it works. In 4 brutal steps.
            </h2>
            <p className="text-sm font-semibold text-neutral-700 mt-2">
              From raw concept or video footage to thousands of impressions and automated DM sales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Drop Media or Hook',
                desc: 'Upload your raw video or ask AI Studio to generate 5 high-converting hook angles and scripts.',
                color: 'bg-[#FF5B37]',
              },
              {
                step: '02',
                title: 'Burn Subtitles in Hivepostly Studio',
                desc: 'Auto-transcribe speech, burn in animated karaoke highlights, and crop cleanly to 9:16 mobile feeds.',
                color: 'bg-[#B8FF5C]',
              },
              {
                step: '03',
                title: '1-Click Multi-Sync',
                desc: 'Inspect real-device mockups across 8 platforms and dispatch instantly or queue for peak virality hours.',
                color: 'bg-[#4D9FFF]',
              },
              {
                step: '04',
                title: 'Auto-Convert in DMs',
                desc: 'Your bot auto-replies to comments and shoots free cheatsheets or links directly into viewer DMs.',
                color: 'bg-[#0A0A0A]',
              },
            ].map((step, idx) => (
              <div 
                key={idx} 
                className="card-brutal p-6 bg-[#FFFDF8] flex flex-col justify-between space-y-4 hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <div>
                  <div className={`w-10 h-10 ${step.color} border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center font-display font-black text-sm ${step.color === 'bg-[#0A0A0A]' ? 'text-white' : 'text-[#0A0A0A]'}`}>
                    {step.step}
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#0A0A0A] mt-4">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-600 font-medium leading-relaxed mt-2">
                    {step.desc}
                  </p>
                </div>
                <div className="pt-2 text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                  Step {step.step} of 04
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. "Native Previews" Section (Matches Image 4 with 8 Platforms including Pinterest) */}
      <section id="platforms" className="w-full bg-[#B8FF5C] border-b-2 border-[#0A0A0A] px-6 sm:px-12 py-20">
        <div className="max-w-7xl mx-auto space-y-10 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column Text (Image 4 Left) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-black tracking-widest text-[#0A0A0A] uppercase">
                ONE EDITOR
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-[#0A0A0A] leading-tight">
                Eight networks. Native previews.
              </h2>
              <p className="text-sm font-bold text-neutral-800 leading-relaxed max-w-md">
                Write once and see exactly how your post will land on every network — before you hit publish.
              </p>
              <div className="pt-2">
                <button
                  onClick={onEnterApp}
                  className="px-6 py-3 bg-[#0A0A0A] hover:bg-white text-white hover:text-[#0A0A0A] font-display font-bold text-xs uppercase tracking-wider border-2 border-[#0A0A0A] shadow-brutal transition-all cursor-pointer"
                >
                  Test Native Previews →
                </button>
              </div>
            </div>

            {/* Right Column Grid (Matches Image 4 Right + Pinterest) */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { 
                  name: 'Twitter/X', 
                  color: 'bg-[#1DA1F2]', 
                  textColor: 'text-white',
                  icon: (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )
                },
                { 
                  name: 'Instagram', 
                  color: 'bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#F77737]', 
                  textColor: 'text-white',
                  icon: (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  )
                },
                { 
                  name: 'Facebook', 
                  color: 'bg-[#1877F2]', 
                  textColor: 'text-white',
                  icon: (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )
                },
                { 
                  name: 'LinkedIn', 
                  color: 'bg-[#B8FF5C]', 
                  textColor: 'text-[#0A0A0A]',
                  icon: <span className="font-mono font-black text-sm">in</span>
                },
                { 
                  name: 'YouTube', 
                  color: 'bg-[#FF0000]', 
                  textColor: 'text-white',
                  icon: (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  )
                },
                { 
                  name: 'Threads', 
                  color: 'bg-[#B8FF5C]', 
                  textColor: 'text-[#0A0A0A]',
                  icon: (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.186 24C5.467 24 .012 18.571 0 11.905.012 5.239 5.467-.19 12.186-.19c3.708 0 7.02 1.545 9.336 4.093l-2.457 2.383c-1.748-1.928-4.223-3.08-6.879-3.08-5.008 0-9.083 4.04-9.092 9.022.009 4.981 4.084 9.022 9.092 9.022 4.12 0 7.23-2.613 7.822-6.577H12.186v-3.388h11.233c.092.656.138 1.341.138 2.053C23.557 18.558 18.47 24 12.186 24z"/>
                    </svg>
                  )
                },
                { 
                  name: 'TikTok', 
                  color: 'bg-[#010101]', 
                  textColor: 'text-white',
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.68c-.01 2.39-1.07 4.74-2.9 6.27-1.83 1.53-4.35 2.12-6.69 1.57-2.34-.55-4.32-2.17-5.26-4.34-.94-2.17-.79-4.74.4-6.79 1.19-2.05 3.39-3.37 5.76-3.46.36-.01.72 0 1.07.05v4.12c-.34-.1-.7-.14-1.06-.11-1.1.08-2.12.72-2.66 1.68-.54.96-.51 2.17.08 3.1.59.93 1.67 1.48 2.77 1.42 1.1-.06 2.09-.72 2.53-1.73.19-.45.28-.93.28-1.42V.02z"/>
                    </svg>
                  )
                },
                { 
                  name: 'Pinterest', 
                  color: 'bg-[#E60023]', 
                  textColor: 'text-white',
                  icon: (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                    </svg>
                  )
                },
              ].map((p, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border-2 border-[#0A0A0A] shadow-brutal p-4 flex flex-col items-center justify-center gap-3 text-center min-h-[120px] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  <div className={`w-10 h-10 ${p.color} ${p.textColor} border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center`}>
                    {p.icon}
                  </div>
                  <div className="font-display font-bold text-xs text-[#0A0A0A]">
                    {p.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Pricing Section (India-First & Global) */}
      <section id="pricing" className="px-6 sm:px-12 py-20 max-w-7xl mx-auto w-full text-left space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="text-xs font-black tracking-widest text-[#FF5B37] uppercase">
            PRICING PLANS
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tighter text-[#0A0A0A]">
            Transparent pricing. Cancel anytime.
          </h2>
          <p className="text-xs text-neutral-600 font-medium">
            Rupee pricing with automatic UPI & GST tax invoices for Indian creators & global teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Creator */}
          <div className="card-brutal p-6 flex flex-col justify-between space-y-6 bg-white">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-display font-bold text-lg text-[#0A0A0A]">Creator</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-100 border border-[#0A0A0A]">Solo</span>
              </div>
              <div className="flex items-baseline gap-1 font-display">
                <span className="text-4xl font-black">₹499</span>
                <span className="text-xs text-neutral-600">/ mo</span>
              </div>
              <p className="text-xs text-neutral-600 font-medium">For rising creators growing their social footprint across networks.</p>
              <div className="space-y-2 text-xs font-semibold pt-4 border-t-2 border-[#0A0A0A]/10">
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FF5B37]" /> 5 Social Accounts</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FF5B37]" /> Unlimited Post Scheduling</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FF5B37]" /> 300 AI Credits / mo</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FF5B37]" /> 1 Live Comment-to-DM Bot</div>
              </div>
            </div>
            <button
              onClick={onEnterApp}
              className="w-full py-3 bg-white hover:bg-neutral-50 text-[#0A0A0A] font-display font-bold text-xs border-2 border-[#0A0A0A] shadow-brutal transition-all cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Pro (Highlighted in Flame & Hard Shadow) */}
          <div className="card-brutal p-6 bg-[#FF5B37] text-white flex flex-col justify-between space-y-6 relative transform -translate-y-2 shadow-brutal-lg">
            <div className="absolute -top-3 right-6 bg-[#B8FF5C] text-[#0A0A0A] border-2 border-[#0A0A0A] px-3 py-0.5 font-display font-black text-[10px] uppercase tracking-wider">
              MOST POPULAR
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-display font-bold text-lg text-white">Pro Studio</span>
              </div>
              <div className="flex items-baseline gap-1 font-display">
                <span className="text-4xl font-black text-white">₹1,499</span>
                <span className="text-xs text-white/80">/ mo</span>
              </div>
              <p className="text-xs text-white/90 font-medium">For full automation power, Hivepostly Studio and DM bot scaling.</p>
              <div className="space-y-2 text-xs font-bold pt-4 border-t-2 border-white/20">
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#B8FF5C]" /> All 8 Connected Accounts (Includes Pinterest)</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#B8FF5C]" /> 1,200 AI Studio Credits</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#B8FF5C]" /> Hivepostly Studio & Auto-Karaoke Subtitles</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#B8FF5C]" /> 10 Live Comment-to-DM Bots</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#B8FF5C]" /> Post Doctor Virality Audit</div>
              </div>
            </div>
            <button
              onClick={onEnterApp}
              className="w-full py-3.5 bg-[#0A0A0A] hover:bg-white text-white hover:text-[#0A0A0A] font-display font-black text-sm border-2 border-[#0A0A0A] shadow-brutal transition-all cursor-pointer"
            >
              Launch Pro Studio
            </button>
          </div>

          {/* Agency */}
          <div className="card-brutal p-6 flex flex-col justify-between space-y-6 bg-white">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-display font-bold text-lg text-[#0A0A0A]">Agency</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-100 border border-[#0A0A0A]">Multi-Brand</span>
              </div>
              <div className="flex items-baseline gap-1 font-display">
                <span className="text-4xl font-black">₹4,999</span>
                <span className="text-xs text-neutral-600">/ mo</span>
              </div>
              <p className="text-xs text-neutral-600 font-medium">Manage multiple creator and brand portfolios with approval queues.</p>
              <div className="space-y-2 text-xs font-semibold pt-4 border-t-2 border-[#0A0A0A]/10">
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FF5B37]" /> Unlimited Accounts & Client Workspaces</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FF5B37]" /> 5,000 AI Credits</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FF5B37]" /> Unlimited Comment-to-DM Bots</div>
                <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FF5B37]" /> Client Approval Portal & GST Invoicing</div>
              </div>
            </div>
            <button
              onClick={onEnterApp}
              className="w-full py-3 bg-white hover:bg-neutral-50 text-[#0A0A0A] font-display font-bold text-xs border-2 border-[#0A0A0A] shadow-brutal transition-all cursor-pointer"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* 8. Bottom FAQ Section (Exactly 7 Questions as Requested by User) */}
      <section id="faq" className="w-full bg-[#FFFDF8] border-t-2 border-[#0A0A0A] px-6 sm:px-12 py-20">
        <div className="max-w-4xl mx-auto space-y-10 text-left">
          <div className="text-center space-y-3">
            <div className="text-xs font-black tracking-widest text-[#FF5B37] uppercase">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tighter text-[#0A0A0A]">
              Got questions? We've got receipts.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-medium max-w-lg mx-auto">
              Everything you need to know about Hivepostly, API compliance, Comment-to-DM bots, and billing.
            </p>
          </div>

          <div className="space-y-4">
            {faqList.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="card-brutal bg-white transition-all overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 bg-[#FFFDF8] border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center font-mono font-bold text-xs shrink-0">
                        0{idx + 1}
                      </span>
                      <span className="font-display font-bold text-base sm:text-lg text-[#0A0A0A] tracking-tight">
                        {faq.q}
                      </span>
                    </div>

                    <div className="w-8 h-8 bg-[#B8FF5C] border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center justify-center shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#0A0A0A]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#0A0A0A]" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t-2 border-[#0A0A0A]/10 text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium bg-[#FFFDF8]/40 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Bottom CTA & Neo-Brutalist Footer */}
      <section className="bg-[#0A0A0A] text-white py-16 px-6 sm:px-12 border-t-2 border-[#0A0A0A]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B8FF5C] text-[#0A0A0A] font-mono text-[11px] font-black uppercase tracking-wider border border-white">
              <span className="w-2 h-2 bg-[#0A0A0A] rounded-full animate-pulse" />
              14,000+ Creators Scaling Daily
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black tracking-tight">
              Ready to break the algorithm?
            </h2>
            <p className="text-neutral-400 text-sm max-w-lg mx-auto leading-relaxed">
              Start free. No credit card required. Cancel any time. Connect all 8 networks and publish your first viral post in 60 seconds.
            </p>
          </div>

          <div>
            <button
              onClick={onEnterApp}
              className="px-8 py-4 bg-[#FF5B37] hover:bg-[#ff4921] text-white font-display font-black text-base tracking-tight border-2 border-white shadow-brutal-lime transition-all hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
            >
              Get started free →
            </button>
          </div>

          {/* Quick Links & Legal Links */}
          <div className="pt-8 border-t border-neutral-800 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 font-bold">
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#platforms" className="hover:text-white transition-colors">8 Platforms</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <span className="text-neutral-700">|</span>
            <button
              onClick={() => setLegalModalType('privacy')}
              className="hover:text-[#B8FF5C] transition-colors underline underline-offset-4 cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setLegalModalType('terms')}
              className="hover:text-[#FF5B37] transition-colors underline underline-offset-4 cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>

          {/* Copyright & Mascot */}
          <div className="pt-6 text-xs text-neutral-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-900">
            <HivepostlyLogo size="sm" theme="dark" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B8FF5C] inline-block" />
              <span>All 8 APIs Operational · © 2026 Hivepostly</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
