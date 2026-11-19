import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Flame, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Bot, 
  HelpCircle,
  FileSpreadsheet,
  ArrowUpRight,
  TrendingUp,
  Layers
} from 'lucide-react';
import { Platform, PulseNode } from '../../types';
import { getPlatformHeatmap, getTopSlotsForPlatform, DayHeatmap } from '../../data/heatmapData';
import { platformConfigs } from '../../utils/platformTheme';

interface SchedulerBestTimeProps {
  scheduledPosts: PulseNode[];
  onScheduleNewPost: (timeSlot: string) => void;
}

export const SchedulerBestTime: React.FC<SchedulerBestTimeProps> = ({
  scheduledPosts,
  onScheduleNewPost,
}) => {
  const [activeView, setActiveView] = useState<'heatmap' | 'calendar' | 'queue'>('heatmap');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('instagram');
  const [hoveredCell, setHoveredCell] = useState<{ day: string; hour: number; score: number; pct: number } | null>(null);

  const heatmapData = getPlatformHeatmap(selectedPlatform);
  const topSlots = getTopSlotsForPlatform(selectedPlatform);

  const getHeatmapColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] text-black font-bold';
    if (score >= 75) return 'bg-emerald-600/80 text-white';
    if (score >= 60) return 'bg-emerald-700/60 text-slate-200';
    if (score >= 40) return 'bg-indigo-900/40 text-slate-400';
    if (score >= 20) return 'bg-white/[0.04] text-slate-600';
    return 'bg-white/[0.02] text-slate-700';
  };

  const handleExportCSV = () => {
    alert(`Exported 7x24 Best Time Heatmap for ${selectedPlatform.toUpperCase()} as CSV!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Header */}
      <div className="p-5 rounded-2xl bg-[#131724] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Clock className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              SCHEDULER & BEST-TIME ENGINE
            </h2>
            <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/20">
              Per-Platform 7×24 Matrix
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Learned from your account's follower online activity and historical viral reach spikes.
          </p>
        </div>

        {/* View Switcher: Heatmap, Calendar, Queue */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10">
            {[
              { id: 'heatmap', label: '7×24 Timing Heatmap', icon: Flame },
              { id: 'calendar', label: 'Calendar View', icon: CalendarIcon },
              { id: 'queue', label: 'Queue Stream', icon: Layers },
            ].map((v) => {
              const Icon = v.icon;
              return (
                <button
                  key={v.id}
                  onClick={() => setActiveView(v.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeView === v.id
                      ? 'bg-amber-500 text-black shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{v.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* If Heatmap View: Show Platform Switcher + 7x24 Matrix + Top 3 Golden Slots */}
      {activeView === 'heatmap' && (
        <div className="space-y-6">
          {/* Platform Tab Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {(['instagram', 'youtube', 'linkedin', 'x', 'tiktok', 'facebook', 'threads'] as Platform[]).map((p) => {
              const isSelected = selectedPlatform === p;
              const cfg = platformConfigs[p];
              return (
                <button
                  key={p}
                  onClick={() => setSelectedPlatform(p)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all border flex items-center gap-2 shrink-0 ${
                    isSelected
                      ? `${cfg.badgeBg} border-transparent shadow-lg scale-100`
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{p} Timing Sheet</span>
                </button>
              );
            })}
          </div>

          {/* Top 3 Golden Slots Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topSlots.map((slot, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#131724] border border-emerald-500/30 space-y-2 relative group hover:border-emerald-400 transition-all"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-white flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-emerald-400" />
                    Slot #{idx + 1}: {slot.time}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    {slot.score}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {slot.rationale}
                </p>
                <button
                  onClick={() => onScheduleNewPost(slot.time)}
                  className="w-full py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Lock In This Slot</span>
                </button>
              </div>
            ))}
          </div>

          {/* 7x24 Interactive Heatmap Grid */}
          <div className="p-6 rounded-2xl bg-[#131724] border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>7×24 FOLLOWER ONLINE & ENGAGEMENT MATRIX</span>
                  <span className="text-[10px] font-mono text-slate-400 font-normal">
                    (Timezone: Asia/Kolkata IST)
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Green glowing cells indicate peak algorithmic virality where 80%+ audience is actively browsing.
                </p>
              </div>

              {/* Heatmap Legend */}
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <span>Low</span>
                <div className="flex items-center gap-1">
                  <div className="w-3.5 h-3.5 rounded bg-white/[0.04]" />
                  <div className="w-3.5 h-3.5 rounded bg-indigo-900/40" />
                  <div className="w-3.5 h-3.5 rounded bg-emerald-700/60" />
                  <div className="w-3.5 h-3.5 rounded bg-emerald-500" />
                </div>
                <span>Peak (90%+)</span>
              </div>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[820px]">
                {/* Hour Header (00 to 23) */}
                <div className="grid grid-cols-[80px_repeat(24,_1fr)] gap-1 mb-1 text-[10px] font-mono text-slate-400 text-center">
                  <div className="text-left pl-1">Day / Hr</div>
                  {Array.from({ length: 24 }).map((_, h) => (
                    <div key={h} className="truncate">
                      {h}:00
                    </div>
                  ))}
                </div>

                {/* Day Rows */}
                {heatmapData.map((d) => (
                  <div
                    key={d.dayName}
                    className="grid grid-cols-[80px_repeat(24,_1fr)] gap-1 mb-1 items-center"
                  >
                    <div className="text-xs font-bold text-slate-300 pl-1">{d.shortDay}</div>
                    {d.hours.map((hr) => (
                      <div
                        key={hr.hour}
                        onMouseEnter={() =>
                          setHoveredCell({
                            day: d.dayName,
                            hour: hr.hour,
                            score: hr.score,
                            pct: hr.activeFollowersPct,
                          })
                        }
                        onMouseLeave={() => setHoveredCell(null)}
                        onClick={() => onScheduleNewPost(`${d.dayName} ${hr.hour}:00 IST`)}
                        className={`h-7 rounded cursor-pointer transition-all hover:scale-110 flex items-center justify-center text-[10px] ${getHeatmapColor(
                          hr.score
                        )}`}
                        title={`${d.dayName} ${hr.hour}:00 - Virality Probability: ${hr.score}%`}
                      >
                        {hr.isTopSlot ? '★' : ''}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Hovered cell info badge */}
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs">
              {hoveredCell ? (
                <div className="flex items-center gap-3">
                  <span className="font-bold text-white">
                    {hoveredCell.day} at {hoveredCell.hour}:00 IST
                  </span>
                  <span className="text-emerald-400 font-mono">
                    Virality Probability: {hoveredCell.score}%
                  </span>
                  <span className="text-slate-400 font-mono">
                    ~{hoveredCell.pct}% followers online
                  </span>
                </div>
              ) : (
                <span className="text-slate-500">
                  Hover over any hour cell to inspect algorithm virality score. Click to schedule.
                </span>
              )}
              <span className="text-[11px] text-indigo-400 font-mono">
                Content-Type Rec: <strong className="text-white">Reel (9:16) at Peak</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Calendar View */}
      {activeView === 'calendar' && (
        <div className="p-6 rounded-2xl bg-[#131724] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-amber-400" />
              NOVEMBER 2026 CONTENT CALENDAR
            </h3>
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-white px-2">Week 3 (Nov 16 - Nov 22)</span>
              <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-3 pt-2">
            {['Mon 16', 'Tue 17', 'Wed 18', 'Thu 19', 'Fri 20', 'Sat 21', 'Sun 22'].map((col, i) => (
              <div key={col} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 min-h-[220px]">
                <div className="text-xs font-bold text-slate-200 mb-2 pb-1 border-b border-white/5">
                  {col}
                </div>
                {scheduledPosts
                  .filter((p) => p.dayIndex === i)
                  .map((post) => (
                    <div
                      key={post.id}
                      className="p-2 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs mb-2 space-y-1"
                    >
                      <div className="flex justify-between text-[10px]">
                        <span className="font-bold text-indigo-400 capitalize">{post.platform}</span>
                        <span className="text-slate-400 font-mono">{post.scheduledTime.split('•')[1] || post.scheduledTime}</span>
                      </div>
                      <div className="text-slate-200 font-medium line-clamp-2 text-[11px]">
                        {post.title}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Queue View */}
      {activeView === 'queue' && (
        <div className="p-6 rounded-2xl bg-[#131724] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">UPCOMING SCHEDULED QUEUE</h3>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {scheduledPosts.length} Items Queued
            </span>
          </div>

          <div className="space-y-3">
            {scheduledPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={post.mediaUrl}
                    alt={post.title}
                    className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold capitalize text-white">{post.platform}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-emerald-400 font-mono">{post.scheduledTime}</span>
                    </div>
                    <div className="font-semibold text-slate-200 mt-0.5">{post.title}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-amber-400 text-[11px]">
                    Virality: {post.viralityScore}%
                  </span>
                  <button
                    onClick={() => alert(`Rescheduled ${post.title}`)}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200"
                  >
                    Reschedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
