import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Flame, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Send,
  Video
} from 'lucide-react';

interface SchedulerViewProps {
  onNewPost: () => void;
}

export const SchedulerView: React.FC<SchedulerViewProps> = ({ onNewPost }) => {
  const days = [
    { day: 'Mon', date: 'Nov 16', isToday: true, count: 2 },
    { day: 'Tue', date: 'Nov 17', isToday: false, count: 1 },
    { day: 'Wed', date: 'Nov 18', isToday: false, count: 1 },
    { day: 'Thu', date: 'Nov 19', isToday: false, count: 1 },
    { day: 'Fri', date: 'Nov 20', isToday: false, count: 2 },
    { day: 'Sat', date: 'Nov 21', isToday: false, count: 1 },
    { day: 'Sun', date: 'Nov 22', isToday: false, count: 1 },
  ];

  const scheduledList = [
    {
      id: 'sc-1',
      title: 'Top 5 AI tools that replaced my $10k video editing team',
      platforms: ['Twitter / X', 'Instagram', 'YouTube Shorts'],
      time: 'Today · 7:30 PM IST',
      dayIndex: 0,
      virality: '98% peak slot',
    },
    {
      id: 'sc-2',
      title: 'Weekend Masterclass: Automating inbound leads with DM bots',
      platforms: ['Instagram', 'LinkedIn'],
      time: 'Today · 11:00 PM IST',
      dayIndex: 0,
      virality: '91% window',
    },
    {
      id: 'sc-3',
      title: 'How I scaled from 0 to 100K Followers in 90 Days (Full Blueprint)',
      platforms: ['YouTube', 'TikTok'],
      time: 'Tue Nov 17 · 6:00 PM IST',
      dayIndex: 1,
      virality: '96% peak slot',
    },
    {
      id: 'sc-4',
      title: 'Why 90% of SaaS founder content fails on LinkedIn',
      platforms: ['LinkedIn'],
      time: 'Wed Nov 18 · 9:30 AM IST',
      dayIndex: 2,
      virality: '94% B2B reach',
    },
    {
      id: 'sc-5',
      title: 'The exact DM sequence that generated ₹1,48,000 while I slept 🧵',
      platforms: ['Twitter / X'],
      time: 'Thu Nov 19 · 2:15 PM IST',
      dayIndex: 3,
      virality: '89% window',
    },
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#0A0A0A]">
        <div>
          <h2 className="font-display text-3xl font-black tracking-tight text-[#0A0A0A]">
            SCHEDULER & BENTO CALENDAR
          </h2>
          <p className="text-xs text-neutral-600 font-medium">
            Queue posts across global time zones with algorithm-optimized posting windows.
          </p>
        </div>

        <button
          onClick={onNewPost}
          className="px-4 py-2.5 bg-[#FF5B37] hover:bg-[#ff4921] text-white font-display font-bold text-xs tracking-tight border-2 border-[#0A0A0A] shadow-brutal flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Post</span>
        </button>
      </div>

      {/* Bento Weekly Calendar Row */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono font-bold">
          <span className="text-neutral-500 uppercase tracking-widest">
            BENTO WEEKLY TIMELINE (NOV 16 – 22)
          </span>
          <span className="text-[#0A0A0A] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#FF5B37]" />
            Asia/Kolkata (IST)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-3">
          {days.map((d, idx) => {
            const dayPosts = scheduledList.filter((p) => p.dayIndex === idx);
            return (
              <div
                key={d.day}
                className={`card-brutal p-3 flex flex-col justify-between min-h-[170px] ${
                  d.isToday ? 'bg-[#FFFDF8] border-2 border-[#FF5B37] shadow-brutal-flame' : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b-2 border-[#0A0A0A]/10">
                  <div>
                    <span className="font-display font-black text-sm text-[#0A0A0A]">{d.day}</span>
                    <span className="text-[10px] text-neutral-500 font-mono block">{d.date}</span>
                  </div>
                  {d.isToday && (
                    <span className="px-1.5 py-0.2 bg-[#FF5B37] text-white text-[9px] font-bold font-mono">
                      TODAY
                    </span>
                  )}
                </div>

                {/* Day posts */}
                <div className="py-2 space-y-2 flex-1">
                  {dayPosts.length > 0 ? (
                    dayPosts.map((post) => (
                      <div
                        key={post.id}
                        onClick={onNewPost}
                        className="p-2 bg-[#FFFDF8] border border-[#0A0A0A] hover:bg-neutral-50 cursor-pointer space-y-1 transition-all"
                      >
                        <div className="text-[9px] font-mono font-bold text-[#FF5B37]">
                          {post.time.split('·')[1]?.trim() || post.time}
                        </div>
                        <div className="text-[11px] font-bold text-[#0A0A0A] line-clamp-2 leading-tight">
                          {post.title}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div 
                      onClick={onNewPost}
                      className="h-full border border-dashed border-neutral-300 hover:border-[#0A0A0A] flex flex-col items-center justify-center p-2 text-center cursor-pointer group"
                    >
                      <Plus className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#FF5B37]" />
                      <span className="text-[10px] font-bold text-neutral-400 group-hover:text-[#0A0A0A]">
                        + Slot
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-neutral-500 font-mono text-center pt-1 border-t border-neutral-100">
                  {dayPosts.length} post{dayPosts.length === 1 ? '' : 's'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scheduled Queue List */}
      <div className="card-brutal p-6 bg-white space-y-4">
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#0A0A0A]">
          <h3 className="font-display font-bold text-lg text-[#0A0A0A]">
            All Scheduled Broadcasts ({scheduledList.length})
          </h3>
          <span className="text-xs font-mono text-emerald-600 font-bold">
            All APIs connected & synced
          </span>
        </div>

        <div className="divide-y-2 divide-[#0A0A0A]/10">
          {scheduledList.map((post) => (
            <div key={post.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#FF5B37]">{post.time}</span>
                  <span className="text-neutral-400">•</span>
                  <span className="px-2 py-0.5 bg-[#B8FF5C] border border-[#0A0A0A] text-[10px] font-bold font-mono">
                    {post.virality}
                  </span>
                </div>
                <div className="font-display font-bold text-sm text-[#0A0A0A]">{post.title}</div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                  {post.platforms.map((p) => (
                    <span key={p} className="px-1.5 py-0.5 bg-neutral-100 border border-[#0A0A0A] text-[10px] font-bold">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Rescheduling ${post.title}`)}
                  className="px-3 py-1.5 bg-white hover:bg-neutral-100 text-[#0A0A0A] border border-[#0A0A0A] text-xs font-bold font-display"
                >
                  Reschedule
                </button>
                <button
                  onClick={() => alert(`Post pushed to live broadcast now!`)}
                  className="px-3 py-1.5 bg-[#0A0A0A] hover:bg-[#FF5B37] text-white hover:text-[#0A0A0A] border-2 border-[#0A0A0A] text-xs font-bold font-display transition-colors"
                >
                  Publish Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
