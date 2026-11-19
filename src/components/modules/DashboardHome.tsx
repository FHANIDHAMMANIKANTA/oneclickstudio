import React from 'react';
import { 
  PulseTimeline 
} from '../PulseTimeline';
import { 
  PulseNode, 
  SocialAccount, 
  CommentAutomation, 
  LeadContact 
} from '../../types';
import { 
  Users, 
  TrendingUp, 
  Eye, 
  Bot, 
  IndianRupee, 
  Sparkles, 
  ArrowUpRight, 
  Flame, 
  CheckCircle2, 
  Clock, 
  Share2, 
  ChevronRight,
  ShieldAlert,
  Zap,
  Play
} from 'lucide-react';

interface DashboardHomeProps {
  pulseNodes: PulseNode[];
  onSelectNode: (node: PulseNode) => void;
  accounts: SocialAccount[];
  automations: CommentAutomation[];
  leads: LeadContact[];
  onNavigateToComposer: () => void;
  onNavigateToAutomations: () => void;
  onNavigateToAIStudio: () => void;
  onNavigateToEditor: () => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  pulseNodes,
  onSelectNode,
  accounts,
  automations,
  leads,
  onNavigateToComposer,
  onNavigateToAutomations,
  onNavigateToAIStudio,
  onNavigateToEditor,
}) => {
  const totalLeads = automations.reduce((acc, curr) => acc + curr.stats.leadsCaptured, 0);
  const totalRevenue = automations.reduce((acc, curr) => acc + curr.stats.revenueGenerated, 0);
  const totalTriggers = automations.reduce((acc, curr) => acc + curr.stats.triggers, 0);

  return (
    <div className="space-y-6">
      {/* 1. Hero Signature Element: Pulse Timeline */}
      <PulseTimeline 
        nodes={pulseNodes} 
        onSelectNode={onSelectNode}
        onNewPostAtTime={() => onNavigateToComposer()}
      />

      {/* 2. Cockpit KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Reach */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#141824] to-[#0f111a] border border-white/10 relative overflow-hidden group hover:border-indigo-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Total Cross-Platform Reach</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">3.42M</span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +24.8%
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Across 7 channels (Last 30 days)</div>
        </div>

        {/* KPI 2: Followers Growth */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#141824] to-[#0f111a] border border-white/10 relative overflow-hidden group hover:border-pink-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Net Follower Growth</span>
            <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">+38.4K</span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +14.2%
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">852K Total Audience Network</div>
        </div>

        {/* KPI 3: Comment-to-DM Leads */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#141824] to-[#0f111a] border border-white/10 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">DM Automation Leads</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {totalLeads.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> 63.8% conv
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {totalTriggers.toLocaleString()} comments processed automatically
          </div>
        </div>

        {/* KPI 4: Attributed Revenue */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#141824] to-[#0f111a] border border-white/10 relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400">Attributed Funnel Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
              ₹{(totalRevenue).toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-semibold text-emerald-400 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +41.5%
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">From automated DM link checkouts</div>
        </div>
      </div>

      {/* 3. Middle Section: Weekly AI Coach Insight + Quick Launch Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Brain Weekly Coach Summary (Section 7.7 & B.1) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#131724] border border-white/10 space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 p-[1px]">
                <div className="w-full h-full bg-[#0e1019] rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  CONTENT BRAIN WEEKLY AI COACH
                  <span className="text-[10px] font-mono uppercase bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                    Live Learning
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Data-backed playbook based on your last 28 posts and audience comments
                </p>
              </div>
            </div>

            <button
              onClick={onNavigateToAIStudio}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-indigo-300 border border-indigo-500/30 transition-colors"
            >
              <span>Launch Content Studio</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>What Worked Best</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Posts starting with <span className="text-white font-semibold">"Stop doing [X]..."</span> generated 3.4x more saves and 2.8x higher DM triggers than standard listicles.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4" />
                <span>What To Improve</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                YouTube Shorts uploaded without burned-in karaoke captions lost <span className="text-white font-semibold">48% of viewers</span> in seconds 3–6. Use Auto-Caption Karaoke in the editor.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
              <div className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>What To Post Next</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Audience is asking for <span className="text-white font-semibold">"AI Workflow Prompt Guide"</span>. We generated 5 ready captions & scripts for your 7:30 PM slot.
              </p>
            </div>
          </div>

          {/* Quick 1-click execution bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
            <span className="text-xs text-slate-400 font-medium">
              Suggested next post: <span className="text-slate-200">"5 AI Tools That Replaced My $10k Team"</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={onNavigateToEditor}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 border border-white/10 transition-colors flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 text-cyan-400" />
                Open In Editor
              </button>
              <button
                onClick={onNavigateToComposer}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30 transition-colors flex items-center gap-1.5"
              >
                <span>Compose & Post Doctor</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Live Active Automations Monitor */}
        <div className="p-6 rounded-2xl bg-[#131724] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-pink-400" />
              <h3 className="text-sm font-bold text-white">ACTIVE DM BOTS</h3>
            </div>
            <button
              onClick={onNavigateToAutomations}
              className="text-xs text-pink-400 hover:text-pink-300 font-semibold"
            >
              Manage
            </button>
          </div>

          <div className="space-y-3">
            {automations.map((auto) => (
              <div 
                key={auto.id}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-pink-500/30 transition-all cursor-pointer"
                onClick={onNavigateToAutomations}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white truncate max-w-[170px]">
                    {auto.name}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Active
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mb-2">
                  Keyword: <span className="font-mono text-pink-300 font-bold">"{auto.keywords[0]}"</span> • {auto.stats.triggers} triggers
                </div>
                {/* Conversion bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Funnel Conversion</span>
                    <span className="font-mono text-emerald-400">
                      {Math.round((auto.stats.leadsCaptured / auto.stats.triggers) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-pink-500 to-emerald-400 rounded-full"
                      style={{ width: `${Math.round((auto.stats.leadsCaptured / auto.stats.triggers) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onNavigateToAutomations}
            className="w-full py-2 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-xs font-semibold text-pink-300 transition-colors flex items-center justify-center gap-1.5"
          >
            <Bot className="w-4 h-4" />
            <span>Test DM Simulator</span>
          </button>
        </div>
      </div>

      {/* 4. Bottom Row: Recent Inbound Leads Ticker & Platform Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Inbound Leads Ticker */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#131724] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                REAL-TIME INBOUND LEAD STREAM
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </h3>
              <p className="text-xs text-slate-400">Followers commenting keywords & unlocking lead magnet PDFs</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              100% Delivery Rate
            </span>
          </div>

          <div className="divide-y divide-white/5">
            {leads.map((lead) => (
              <div key={lead.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <img 
                    src={lead.avatar} 
                    alt={lead.username} 
                    className="w-8 h-8 rounded-full object-cover border border-white/10" 
                  />
                  <div>
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <span>{lead.username}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-pink-500/10 text-pink-400">
                        "{lead.keyword}"
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Campaign: {lead.automationName}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div>
                    <div className="font-mono text-[11px] text-emerald-400 font-medium capitalize">
                      {lead.status === 'converted' ? 'PDF Downloaded + Email' : lead.status.replace('_', ' ')}
                    </div>
                    <div className="text-[10px] text-slate-500">{lead.timestamp}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Account Token & Health Matrix */}
        <div className="p-6 rounded-2xl bg-[#131724] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            API & ACCOUNT HEALTH
          </h3>
          <p className="text-xs text-slate-400">Official OAuth connections with proactive token refresh monitoring</p>

          <div className="space-y-2.5 pt-1">
            {accounts.slice(0, 5).map((acc) => (
              <div key={acc.id} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <div>
                    <div className="font-semibold text-white capitalize">{acc.platform}</div>
                    <div className="text-[10px] text-slate-400">{acc.handle}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-mono font-medium text-emerald-400">
                    Health: {acc.healthScore}%
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Token: {acc.tokenExpiresIn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
