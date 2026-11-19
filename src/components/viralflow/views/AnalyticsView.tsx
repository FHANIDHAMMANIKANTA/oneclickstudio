import React from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { 
  TrendingUp, 
  BarChart3, 
  ArrowUpRight, 
  Download, 
  Calendar 
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  // Chart 1: Reach & Engagement last 14 days
  const lineData = [
    { day: 'Nov 3', reach: 6400, eng: 620 },
    { day: 'Nov 5', reach: 9800, eng: 940 },
    { day: 'Nov 7', reach: 8200, eng: 810 },
    { day: 'Nov 9', reach: 14200, eng: 1350 },
    { day: 'Nov 11', reach: 12100, eng: 1180 },
    { day: 'Nov 13', reach: 19800, eng: 1890 },
    { day: 'Nov 15', reach: 24200, eng: 2310 },
  ];

  // Chart 2: Reach by platform
  const barData = [
    { platform: 'Twitter', reach: 48 },
    { platform: 'Instagram', reach: 84 },
    { platform: 'YouTube', reach: 62 },
    { platform: 'LinkedIn', reach: 38 },
    { platform: 'TikTok', reach: 72 },
    { platform: 'Threads', reach: 24 },
  ];

  const platformTable = [
    {
      platform: 'Instagram',
      posts: 28,
      reach: '84.2K',
      engRate: '9.4%',
      badge: 'bg-[#FF5B37] text-white',
    },
    {
      platform: 'YouTube Shorts',
      posts: 18,
      reach: '62.1K',
      engRate: '12.8%',
      badge: 'bg-red-600 text-white',
    },
    {
      platform: 'Twitter / X',
      posts: 32,
      reach: '48.9K',
      engRate: '7.2%',
      badge: 'bg-[#0A0A0A] text-white',
    },
    {
      platform: 'TikTok',
      posts: 22,
      reach: '72.4K',
      engRate: '14.1%',
      badge: 'bg-[#00f2fe] text-black',
    },
    {
      platform: 'LinkedIn',
      posts: 12,
      reach: '38.5K',
      engRate: '11.6%',
      badge: 'bg-[#0A66C2] text-white',
    },
    {
      platform: 'Threads',
      posts: 15,
      reach: '24.1K',
      engRate: '8.8%',
      badge: 'bg-neutral-800 text-white',
    },
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#0A0A0A]">
        <div>
          <h2 className="font-display text-3xl font-black tracking-tight text-[#0A0A0A]">
            ANALYTICS THAT TALK
          </h2>
          <p className="text-xs text-neutral-600 font-medium">
            Multi-platform receipts, follower velocity, and engagement ratios.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting full analytics as CSV...')}
          className="px-4 py-2 bg-white hover:bg-neutral-100 text-[#0A0A0A] font-display font-bold text-xs border-2 border-[#0A0A0A] shadow-brutal flex items-center gap-1.5 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Top 3 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-brutal p-5 bg-white space-y-1">
          <div className="text-[11px] font-black uppercase tracking-widest text-neutral-500 font-mono">
            TOTAL REACH (14 DAYS)
          </div>
          <div className="text-3xl font-display font-black text-[#0A0A0A]">
            168,900
          </div>
          <div className="text-xs font-bold text-[#FF5B37] flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% vs previous 14 days</span>
          </div>
        </div>

        <div className="card-brutal p-5 bg-white space-y-1">
          <div className="text-[11px] font-black uppercase tracking-widest text-neutral-500 font-mono">
            TOTAL ENGAGEMENTS
          </div>
          <div className="text-3xl font-display font-black text-[#4D9FFF]">
            14,200
          </div>
          <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>8.4% Average Engagement Rate</span>
          </div>
        </div>

        <div className="card-brutal p-5 bg-white space-y-1">
          <div className="text-[11px] font-black uppercase tracking-widest text-neutral-500 font-mono">
            NEW FOLLOWERS NET
          </div>
          <div className="text-3xl font-display font-black text-[#0A0A0A]">
            +3,840
          </div>
          <div className="text-xs font-bold text-neutral-600">
            Peak velocity on Instagram & YouTube
          </div>
        </div>
      </div>

      {/* Dual Recharts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Line Chart: Reach & Engagement · Last 14 days (7 cols) */}
        <div className="lg:col-span-7 card-brutal p-6 bg-white space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-base text-[#0A0A0A]">
                Reach & Engagement · Last 14 days
              </h3>
              <p className="text-xs text-neutral-500 font-medium">Daily organic impression volume</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold font-mono">
              <span className="flex items-center gap-1 text-[#FF5B37]">
                <span className="w-3 h-3 bg-[#FF5B37] border border-[#0A0A0A] inline-block" /> Reach
              </span>
              <span className="flex items-center gap-1 text-[#4D9FFF]">
                <span className="w-3 h-3 bg-[#4D9FFF] border border-[#0A0A0A] inline-block" /> Engagements
              </span>
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0A0A0A" opacity={0.1} />
                <XAxis dataKey="day" stroke="#0A0A0A" fontSize={11} fontWeight={700} />
                <YAxis stroke="#0A0A0A" fontSize={11} fontWeight={700} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFDF8',
                    border: '2px solid #0A0A0A',
                    boxShadow: '4px 4px 0px #0A0A0A',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="reach"
                  stroke="#FF5B37"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#FF5B37', stroke: '#0A0A0A', strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="eng"
                  stroke="#4D9FFF"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#4D9FFF', stroke: '#0A0A0A', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Reach by Platform (5 cols) */}
        <div className="lg:col-span-5 card-brutal p-6 bg-white space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-[#0A0A0A]">
              Reach by Platform (K)
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-[#B8FF5C] border border-[#0A0A0A] font-bold">
              Total 330K+
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0A0A0A" opacity={0.1} />
                <XAxis dataKey="platform" stroke="#0A0A0A" fontSize={10} fontWeight={700} />
                <YAxis stroke="#0A0A0A" fontSize={11} fontWeight={700} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFDF8',
                    border: '2px solid #0A0A0A',
                    boxShadow: '4px 4px 0px #0A0A0A',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                />
                <Bar
                  dataKey="reach"
                  fill="#B8FF5C"
                  stroke="#0A0A0A"
                  strokeWidth={2}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Platform Breakdown Table */}
      <div className="card-brutal p-6 bg-white space-y-4">
        <h3 className="font-display font-bold text-lg text-[#0A0A0A]">
          Platform Breakdown & Performance Receipts
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b-2 border-[#0A0A0A] text-[11px] font-black uppercase font-mono tracking-wider text-neutral-500">
              <tr>
                <th className="py-2.5">PLATFORM</th>
                <th>POSTS</th>
                <th>REACH</th>
                <th>ENG. RATE</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-[#0A0A0A]/10 text-neutral-800 font-medium">
              {platformTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-50">
                  <td className="py-3 flex items-center gap-2">
                    <span className={`px-2 py-0.5 border border-[#0A0A0A] text-[10px] font-black font-display uppercase ${row.badge}`}>
                      {row.platform[0]}
                    </span>
                    <span className="font-display font-bold text-sm text-[#0A0A0A]">
                      {row.platform}
                    </span>
                  </td>
                  <td className="font-mono font-bold text-sm">{row.posts}</td>
                  <td className="font-mono font-bold text-sm text-[#0A0A0A]">{row.reach}</td>
                  <td>
                    <span className="font-mono font-bold text-xs text-[#FF5B37] px-1.5 py-0.5 bg-neutral-100 border border-[#0A0A0A]">
                      {row.engRate}
                    </span>
                  </td>
                  <td>
                    <span className="px-2 py-0.5 bg-[#B8FF5C] border border-[#0A0A0A] text-[10px] font-mono font-bold uppercase">
                      Healthy
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
