import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  Flame, 
  Bot, 
  Eye, 
  ChevronRight, 
  Play, 
  CheckCircle,
  Plus
} from 'lucide-react';
import { PulseNode, Platform } from '../types';
import { platformConfigs } from '../utils/platformTheme';

interface PulseTimelineProps {
  nodes: PulseNode[];
  onSelectNode: (node: PulseNode) => void;
  onNewPostAtTime?: (dayIndex: number, timeStr: string) => void;
}

export const PulseTimeline: React.FC<PulseTimelineProps> = ({
  nodes,
  onSelectNode,
  onNewPostAtTime,
}) => {
  const [selectedNode, setSelectedNode] = useState<PulseNode | null>(null);

  // Generate 7 days labels
  const days = [
    { name: 'Today', date: 'Nov 16', dayIdx: 0, bestTime: '7:30 PM' },
    { name: 'Tue', date: 'Nov 17', dayIdx: 1, bestTime: '6:00 PM' },
    { name: 'Wed', date: 'Nov 18', dayIdx: 2, bestTime: '9:30 AM' },
    { name: 'Thu', date: 'Nov 19', dayIdx: 3, bestTime: '2:15 PM' },
    { name: 'Fri', date: 'Nov 20', dayIdx: 4, bestTime: '8:00 PM' },
    { name: 'Sat', date: 'Nov 21', dayIdx: 5, bestTime: '11:00 AM' },
    { name: 'Sun', date: 'Nov 22', dayIdx: 6, bestTime: '5:00 PM' },
  ];

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-[#131724] to-[#0d101a] border border-white/10 p-5 shadow-2xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar of Pulse Timeline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">PULSE TIMELINE</h2>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 font-mono font-medium border border-indigo-500/25">
                Next 7 Days Engine
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive flight deck of scheduled multi-channel posts with live algorithm virality scores.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Auto Best-Time Routing Active
          </span>
          <button 
            onClick={() => onNewPostAtTime && onNewPostAtTime(0, '7:30 PM')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Add Slot</span>
          </button>
        </div>
      </div>

      {/* 7-Day Horizontal Strip */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3 relative z-10">
        {days.map((day) => {
          const dayNodes = nodes.filter((n) => n.dayIndex === day.dayIdx);
          const isToday = day.dayIdx === 0;

          return (
            <div
              key={day.dayIdx}
              className={`rounded-xl border p-3 flex flex-col justify-between min-h-[190px] transition-all relative ${
                isToday 
                  ? 'bg-indigo-950/20 border-indigo-500/40 shadow-lg shadow-indigo-500/10' 
                  : 'bg-white/[0.02] hover:bg-white/[0.04] border-white/5'
              }`}
            >
              {/* Day column top info */}
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-bold ${isToday ? 'text-indigo-400' : 'text-slate-200'}`}>
                      {day.name}
                    </span>
                    {isToday && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">{day.date}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                    {dayNodes.length} {dayNodes.length === 1 ? 'post' : 'posts'}
                  </span>
                </div>
              </div>

              {/* Day Nodes */}
              <div className="py-2 flex flex-col gap-2 flex-1 justify-center">
                {dayNodes.length > 0 ? (
                  dayNodes.map((node) => {
                    const cfg = platformConfigs[node.platform];
                    return (
                      <div
                        key={node.id}
                        onClick={() => {
                          setSelectedNode(node);
                          onSelectNode(node);
                        }}
                        style={{
                          boxShadow: `0 0 14px ${cfg.glowColor}`,
                        }}
                        className={`group relative p-2.5 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${cfg.borderColor} bg-slate-900/80 backdrop-blur-md`}
                      >
                        {/* Top node bar: platform tag and time */}
                        <div className="flex items-center justify-between text-[10px] mb-1.5">
                          <span className={`px-1.5 py-0.5 rounded font-semibold text-[10px] uppercase tracking-wider ${cfg.badgeBg}`}>
                            {node.platform}
                          </span>
                          <span className="text-slate-400 font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            {node.scheduledTime.split('•')[1]?.trim() || node.scheduledTime}
                          </span>
                        </div>

                        {/* Title preview */}
                        <p className="text-xs font-semibold text-slate-100 line-clamp-2 leading-snug group-hover:text-indigo-300 transition-colors">
                          {node.title}
                        </p>

                        {/* Node Footer: Virality Score & Automation Pill */}
                        <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/5 text-[10px]">
                          <div className="flex items-center gap-1 text-emerald-400 font-mono font-medium">
                            <Flame className="w-3 h-3 text-amber-400" />
                            <span>{node.viralityScore}% score</span>
                          </div>
                          {node.automationAttached && (
                            <span 
                              title="Instagram Comment-to-DM bot attached"
                              className="px-1.5 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center gap-1"
                            >
                              <Bot className="w-3 h-3" />
                              DM Bot
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div 
                    onClick={() => onNewPostAtTime && onNewPostAtTime(day.dayIdx, day.bestTime)}
                    className="h-full border border-dashed border-white/10 hover:border-indigo-400/50 rounded-lg p-3 flex flex-col items-center justify-center gap-1 text-center cursor-pointer transition-colors group"
                  >
                    <Plus className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                    <span className="text-[11px] text-slate-400 group-hover:text-slate-200">
                      Empty Slot
                    </span>
                    <span className="text-[10px] text-indigo-400 font-mono">
                      Best: {day.bestTime}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom hint */}
              <div className="text-[10px] text-slate-500 text-center pt-1 border-t border-white/5">
                Optimal: <span className="text-slate-300 font-mono">{day.bestTime}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Details Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl bg-[#141724] border border-white/10 p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${platformConfigs[selectedNode.platform].badgeBg}`}>
                  {selectedNode.platform}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedNode.scheduledTime}
                </span>
              </div>
              <button 
                onClick={() => setSelectedNode(null)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            {/* Media thumbnail */}
            <div className="relative rounded-xl overflow-hidden mb-4 aspect-video bg-black/60 border border-white/5">
              <img 
                src={selectedNode.mediaUrl} 
                alt={selectedNode.title}
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/70 backdrop-blur text-[10px] font-mono text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                {selectedNode.viralityScore}% Virality Probability
              </div>
            </div>

            <h3 className="text-base font-bold text-white mb-2">{selectedNode.title}</h3>
            <p className="text-xs text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5 mb-4 leading-relaxed font-sans">
              {selectedNode.caption}
            </p>

            {selectedNode.automationAttached && (
              <div className="mb-4 p-3 rounded-xl bg-pink-500/10 border border-pink-500/25 flex items-center gap-3">
                <Bot className="w-5 h-5 text-pink-400 shrink-0" />
                <div className="text-xs">
                  <div className="font-semibold text-pink-300">Instagram Comment-to-DM Active</div>
                  <div className="text-slate-400 text-[11px]">Keywords: "TOOLS", "PDF" • Auto-delivers 2026 AI Playbook</div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">Post Doctor:</span>
                <span className="text-[11px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> All Checks Passed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    alert(`Rescheduling ${selectedNode.title} to AI recommended slot!`);
                    setSelectedNode(null);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-slate-200 font-medium transition-colors"
                >
                  Shift to Peak Slot
                </button>
                <button
                  onClick={() => {
                    alert(`Post "${selectedNode.title}" pushed to live publishing queue!`);
                    setSelectedNode(null);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-semibold shadow-lg shadow-indigo-600/30 transition-colors"
                >
                  Publish Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
