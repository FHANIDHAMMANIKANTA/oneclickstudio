import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Building2, 
  ShieldCheck, 
  Check, 
  Users, 
  Sparkles, 
  Plus, 
  FileText, 
  IndianRupee, 
  QrCode, 
  CheckCircle2, 
  Clock, 
  Lock,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface WorkspacesPricingProps {
  currentWorkspace: string;
  onSelectWorkspace: (name: string) => void;
}

export const WorkspacesPricing: React.FC<WorkspacesPricingProps> = ({
  currentWorkspace,
  onSelectWorkspace,
}) => {
  const [activeTab, setActiveTab] = useState<'workspaces' | 'pricing' | 'approvals'>('pricing');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // Workspaces list
  const [workspaces, setWorkspaces] = useState([
    {
      id: 'ws-1',
      name: 'Fhanidham Agency',
      tier: 'Pro',
      role: 'Owner',
      accountsCount: 7,
      teamMembers: 4,
      pendingApprovals: 2,
    },
    {
      id: 'ws-2',
      name: 'Personal Brand (Growth)',
      tier: 'Creator',
      role: 'Admin',
      accountsCount: 4,
      teamMembers: 1,
      pendingApprovals: 0,
    },
    {
      id: 'ws-3',
      name: 'Client: SaaSify Growth',
      tier: 'Agency Client Portal',
      role: 'Approver',
      accountsCount: 3,
      teamMembers: 6,
      pendingApprovals: 1,
    },
  ]);

  // Approval queue posts
  const [pendingPosts, setPendingPosts] = useState([
    {
      id: 'app-1',
      author: 'Aakash (Video Editor)',
      title: 'Top 5 AI tools that replaced my $10k editing team',
      platforms: ['Instagram', 'YouTube Shorts', 'TikTok'],
      status: 'pending',
      scheduledFor: 'Today • 7:30 PM IST',
    },
    {
      id: 'app-2',
      author: 'Sneha (Copywriter)',
      title: 'LinkedIn B2B Founder Teardown: Organic Inbound Flywheel',
      platforms: ['LinkedIn'],
      status: 'pending',
      scheduledFor: 'Tomorrow • 9:30 AM IST',
    },
  ]);

  // India-first pricing plans (PRD Section 13 & B.10)
  const plans = [
    {
      id: 'free',
      name: 'Free',
      priceMonthly: 0,
      priceAnnual: 0,
      description: 'Test out the creator cockpit for solo projects',
      features: [
        '2 Social Accounts (IG, YT)',
        '10 Scheduled Posts / mo',
        '20 AI Studio Credits / mo',
        'Basic Per-Platform Analytics',
        'Community Support',
      ],
      ctaText: 'Current Free Tier',
      popular: false,
    },
    {
      id: 'creator',
      name: 'Creator',
      priceMonthly: 499,
      priceAnnual: 399,
      description: 'Ideal for active solo creators growing on Reels & Shorts',
      features: [
        '5 Connected Social Accounts',
        'Unlimited Post Scheduling',
        '300 AI Credits / month',
        '1 Live Comment-to-DM Bot',
        '7x24 Best-Time Heatmap',
        'HD 1080p Video Studio Exports',
        'Email & Chat Support',
      ],
      ctaText: 'Upgrade to Creator',
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro (Most Popular)',
      priceMonthly: 1499,
      priceAnnual: 1199,
      description: 'Full automation power & revenue attribution for scaling creators',
      features: [
        '10 Connected Social Accounts (All 7 Platforms)',
        'Unlimited Post Scheduling',
        '1,200 AI Studio Credits / month',
        '10 Live Comment-to-DM Automations',
        'Post Doctor Virality Health Score',
        'Lead Magnet Vault + Expiring Links',
        'Attributed Revenue & Sales Funnel',
        'Team Collaboration (3 seats)',
      ],
      ctaText: 'Current Active Plan (Pro)',
      popular: true,
    },
    {
      id: 'agency',
      name: 'Agency & Studio',
      priceMonthly: 4999,
      priceAnnual: 3999,
      description: 'Manage multiple clients with approval queues & white-labeling',
      features: [
        'Unlimited Social Accounts',
        'Unlimited Workspaces & Clients',
        '5,000 AI Credits / month',
        'Unlimited Comment-to-DM Bots',
        'Client Approval Workflow Portals',
        'White-Label Bio & Storefront',
        'GST Invoices + UPI Autopay',
        'Dedicated WhatsApp Account Manager',
      ],
      ctaText: 'Upgrade to Agency',
      popular: false,
    },
  ];

  const handleApprovePost = (id: string) => {
    setPendingPosts(pendingPosts.filter((p) => p.id !== id));
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
    alert('Post approved and queued for broadcast!');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-[#131724] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Building2 className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              WORKSPACES, TEAM & RUPEE PRICING
            </h2>
            <span className="text-[10px] font-mono uppercase bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/20">
              India-First Billing (UPI + GST)
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Manage brands, approval workflows, and choose transparent pricing in Indian Rupees.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'pricing' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Rupee Pricing Plans
          </button>
          <button
            onClick={() => setActiveTab('workspaces')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'workspaces' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Workspaces ({workspaces.length})
          </button>
          <button
            onClick={() => setActiveTab('approvals')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'approvals' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Approval Queue</span>
            {pendingPosts.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[10px] font-bold">
                {pendingPosts.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* TAB 1: PRICING PLANS */}
      {activeTab === 'pricing' && (
        <div className="space-y-6">
          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="relative w-12 h-6 bg-white/10 rounded-full p-1 transition-colors border border-white/10"
            >
              <div
                className={`w-4 h-4 rounded-full bg-indigo-500 transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-6 bg-emerald-400' : ''
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-semibold ${billingCycle === 'annual' ? 'text-white' : 'text-slate-400'}`}>
                Annual Billing
              </span>
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Save 20%
              </span>
            </div>
          </div>

          {/* 4 Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((p) => {
              const price = billingCycle === 'monthly' ? p.priceMonthly : p.priceAnnual;
              return (
                <div
                  key={p.id}
                  className={`p-6 rounded-2xl border flex flex-col justify-between transition-all relative ${
                    p.popular
                      ? 'bg-gradient-to-b from-indigo-950/50 to-[#101320] border-indigo-500/50 shadow-2xl shadow-indigo-500/10 scale-[1.02]'
                      : 'bg-[#131724] border-white/10'
                  }`}
                >
                  {p.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 text-black font-extrabold text-[10px] uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-white">{p.name}</h3>
                      <p className="text-xs text-slate-400 mt-1">{p.description}</p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-white font-mono">
                        ₹{price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400">/ month</span>
                    </div>

                    <div className="pt-2 border-t border-white/5 space-y-2.5 text-xs text-slate-300">
                      {p.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => alert(`Selected ${p.name} plan!`)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                        p.popular
                          ? 'bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-400 hover:to-emerald-400 text-white shadow-lg shadow-indigo-500/25'
                          : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                      }`}
                    >
                      {p.ctaText}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* India Payment Features info */}
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <QrCode className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-white">Seamless India Checkout:</span> Razorpay, UPI autopay, Rupay cards, NetBanking & automatic GST Tax Invoices.
              </div>
            </div>
            <span className="font-mono text-emerald-400 text-[11px] font-semibold">
              GST compliant 18% input credit
            </span>
          </div>
        </div>
      )}

      {/* TAB 2: WORKSPACES LIST */}
      {activeTab === 'workspaces' && (
        <div className="p-6 rounded-2xl bg-[#131724] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Connected Brand Workspaces
            </h3>
            <button
              onClick={() => alert('New Brand Workspace modal')}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200"
            >
              + Create Workspace
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workspaces.map((ws) => (
              <div
                key={ws.id}
                className={`p-4 rounded-xl border space-y-3 transition-all ${
                  currentWorkspace === ws.name
                    ? 'bg-indigo-600/20 border-indigo-500/40 text-white'
                    : 'bg-white/[0.02] border-white/5 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{ws.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                    {ws.tier}
                  </span>
                </div>

                <div className="text-xs text-slate-400 space-y-1">
                  <div>Role: <strong className="text-slate-200">{ws.role}</strong></div>
                  <div>Accounts: <strong className="text-slate-200">{ws.accountsCount} active</strong></div>
                  <div>Team: <strong className="text-slate-200">{ws.teamMembers} members</strong></div>
                </div>

                <button
                  onClick={() => onSelectWorkspace(ws.name)}
                  className="w-full py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
                >
                  {currentWorkspace === ws.name ? 'Active Workspace' : 'Switch to this Workspace'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: APPROVAL QUEUE */}
      {activeTab === 'approvals' && (
        <div className="p-6 rounded-2xl bg-[#131724] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                AGENCY POST APPROVAL QUEUE
              </h3>
              <p className="text-xs text-slate-400">
                Posts created by editors require approval before broadcasting to client channels.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {pendingPosts.length > 0 ? (
              pendingPosts.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{p.author}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-amber-400 font-mono">{p.scheduledFor}</span>
                    </div>
                    <div className="font-bold text-slate-100 text-sm">{p.title}</div>
                    <div className="text-[11px] text-slate-400">
                      Target Platforms: {p.platforms.join(', ')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert('Viewing detailed post draft')}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                    >
                      Review Draft
                    </button>
                    <button
                      onClick={() => handleApprovePost(p.id)}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow-md shadow-emerald-600/30"
                    >
                      Approve & Queue ✅
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-slate-500">
                All posts have been reviewed and approved! 🎉
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
