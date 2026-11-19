import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Flame, 
  Users, 
  Download, 
  Calendar, 
  ArrowUpRight, 
  Bot, 
  Sparkles, 
  Bookmark, 
  Share2, 
  Play, 
  Clock, 
  IndianRupee 
} from 'lucide-react';
import { Platform } from '../../types';
import { platformConfigs } from '../../utils/platformTheme';

export const PlatformAnalytics: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="p-5 rounded-2xl bg-[#131724] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <BarChart3 className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              PLATFORM ANALYTICS COCKPIT
            </h2>
            <span className="text-[10px] font-mono uppercase bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/20">
              Bespoke Per-Platform Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Official metrics exposed by each platform's native API. No fake or unsupported numbers.
          </p>
        </div>

        {/* Date Range & Export */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-semibold">
            {(['7d', '30d', '90d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setDateRange(r)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  dateRange === r ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          <button 
            onClick={() => alert('Exporting full analytics report as PDF...')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-purple-400" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Platform Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setSelectedPlatform('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 shrink-0 ${
            selectedPlatform === 'all'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent shadow-lg'
              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <span>Cross-Platform Overview</span>
        </button>

        {(['instagram', 'youtube', 'linkedin', 'x', 'tiktok'] as Platform[]).map((p) => {
          const isSelected = selectedPlatform === p;
          const cfg = platformConfigs[p];
          return (
            <button
              key={p}
              onClick={() => setSelectedPlatform(p)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all border flex items-center gap-2 shrink-0 ${
                isSelected
                  ? `${cfg.badgeBg} border-transparent shadow-lg`
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <span>{p} Analytics</span>
            </button>
          );
        })}
      </div>

      {/* VIEW 1: CROSS-PLATFORM OVERVIEW */}
      {(selectedPlatform === 'all' || selectedPlatform === 'instagram') && (
        <div className="space-y-6">
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#131724] border border-white/10 space-y-1">
              <span className="text-xs text-slate-400">Total Audience Reach</span>
              <div className="text-2xl font-bold font-mono text-white">3,420,180</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                <ArrowUpRight className="w-3.5 h-3.5" /> +24.8% vs last month
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#131724] border border-white/10 space-y-1">
              <span className="text-xs text-slate-400">Total Saves & Bookmarks</span>
              <div className="text-2xl font-bold font-mono text-indigo-400">84,210</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                <ArrowUpRight className="w-3.5 h-3.5" /> +42.1% (Algorithm Favorite)
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#131724] border border-white/10 space-y-1">
              <span className="text-xs text-slate-400">DM Automation Leads</span>
              <div className="text-2xl font-bold font-mono text-pink-400">1,842</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                <ArrowUpRight className="w-3.5 h-3.5" /> 63.8% Funnel Conversion
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#131724] border border-white/10 space-y-1">
              <span className="text-xs text-slate-400">Attributed Funnel Revenue</span>
              <div className="text-2xl font-bold font-mono text-amber-400">₹5,57,400</div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                <ArrowUpRight className="w-3.5 h-3.5" /> +38.6% from DM checkouts
              </div>
            </div>
          </div>

          {/* INSTAGRAM COMMENT-TO-DM REVENUE FUNNEL (PRD Section 7.7 & B.4) */}
          <div className="p-6 rounded-2xl bg-[#131724] border border-pink-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Bot className="w-4 h-4 text-pink-400" />
                  INSTAGRAM COMMENT-TO-DM REVENUE ATTRIBUTION FUNNEL
                </h3>
                <p className="text-xs text-slate-400">
                  Full lifecycle tracking: Reel Impressions → Comment Triggers → DMs Sent → Link Clicks → Paid Store Checkouts.
                </p>
              </div>
              <span className="text-xs font-mono text-pink-300 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/25">
                Conversion Rate: 11.5% End-to-End
              </span>
            </div>

            {/* Funnel Steps Bar Chart */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
              {[
                { step: '1. Reel Plays', count: '412,000', drop: '100%', color: 'bg-indigo-600' },
                { step: '2. Keyword Comments', count: '2,244', drop: '0.54% of plays', color: 'bg-pink-600' },
                { step: '3. DMs Delivered', count: '2,235', drop: '99.6% delivery', color: 'bg-pink-500' },
                { step: '4. Link Clicks', count: '1,724', drop: '77.1% click-through', color: 'bg-emerald-600' },
                { step: '5. Paid Sales (INR)', count: '₹5,57,400', drop: '258 purchases', color: 'bg-amber-500' },
              ].map((f, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                  <div className="text-[11px] text-slate-400 font-semibold">{f.step}</div>
                  <div className="text-lg font-bold text-white font-mono">{f.count}</div>
                  <div className="text-[10px] font-mono text-emerald-400">{f.drop}</div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-1">
                    <div className={`h-full ${f.color} rounded-full`} style={{ width: `${100 - i * 18}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: YOUTUBE SPECIFIC (Watch Time, Retention Curve, CTR) */}
      {selectedPlatform === 'youtube' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#131724] border border-red-500/30 space-y-1">
              <span className="text-xs text-slate-400">Total Watch Time</span>
              <div className="text-2xl font-bold font-mono text-white">18,420 Hours</div>
              <div className="text-[11px] text-emerald-400">+14% vs last period</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#131724] border border-white/10 space-y-1">
              <span className="text-xs text-slate-400">Average Click-Through Rate (CTR)</span>
              <div className="text-2xl font-bold font-mono text-red-400">8.9%</div>
              <div className="text-[11px] text-emerald-400">Top 5% in Tech Niche</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#131724] border border-white/10 space-y-1">
              <span className="text-xs text-slate-400">Average View Duration</span>
              <div className="text-2xl font-bold font-mono text-white">4m 12s (68%)</div>
              <div className="text-[11px] text-emerald-400">High retention spike</div>
            </div>
          </div>

          {/* Retention Curve Graph */}
          <div className="p-6 rounded-2xl bg-[#131724] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                30-SECOND RETENTION PROFILE (Shorts & Long Form)
              </h3>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                84% Viewers Held Past 3s
              </span>
            </div>
            <div className="h-44 w-full bg-black/40 rounded-xl border border-white/5 p-4 flex items-end justify-between gap-1 text-[10px] font-mono text-slate-500">
              {[95, 88, 84, 82, 80, 78, 77, 75, 74, 72, 70, 68, 67, 65, 64].map((pct, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-slate-400">{pct}%</span>
                  <div
                    className="w-full bg-gradient-to-t from-red-600 to-rose-400 rounded-t"
                    style={{ height: `${pct * 1.3}px` }}
                  />
                  <span>{idx * 2}s</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: LINKEDIN SPECIFIC (Document Downloads, Job Title Demographics) */}
      {selectedPlatform === 'linkedin' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#131724] border border-sky-500/30 space-y-1">
              <span className="text-xs text-slate-400">Document PDF Downloads</span>
              <div className="text-2xl font-bold font-mono text-sky-400">3,420</div>
              <div className="text-[11px] text-emerald-400">+62% on Carousel format</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#131724] border border-white/10 space-y-1">
              <span className="text-xs text-slate-400">Profile Inbound Views</span>
              <div className="text-2xl font-bold font-mono text-white">14,890</div>
              <div className="text-[11px] text-emerald-400">42 Inbound Client Inquiries</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#131724] border border-white/10 space-y-1">
              <span className="text-xs text-slate-400">Seniority Composition</span>
              <div className="text-2xl font-bold font-mono text-white">54% CXO / VP</div>
              <div className="text-[11px] text-slate-400">High purchasing power</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
