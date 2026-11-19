import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  RefreshCw, 
  Hash, 
  FileText, 
  Flame, 
  Search, 
  Calendar, 
  Repeat, 
  Layers, 
  MessageSquare, 
  Globe, 
  Sliders, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { GeneratorToolId, Platform } from '../../types';

interface AIContentStudioProps {
  onSendToComposer: (content: { caption: string; hashtags?: string[]; title?: string }) => void;
  creditsRemaining: number;
  onUseCredit: () => void;
}

export const AIContentStudio: React.FC<AIContentStudioProps> = ({
  onSendToComposer,
  creditsRemaining,
  onUseCredit,
}) => {
  const [selectedTool, setSelectedTool] = useState<GeneratorToolId>('caption');
  const [targetPlatform, setTargetPlatform] = useState<Platform>('instagram');
  const [topic, setTopic] = useState('5 AI tools that automate video editing in 2026');
  const [tone, setTone] = useState<'high_energy' | 'storytelling' | 'contrarian' | 'educational'>('contrarian');
  const [language, setLanguage] = useState<'en' | 'hi' | 'te' | 'hinglish'>('en');
  const [duration, setDuration] = useState<'15s' | '30s' | '60s'>('30s');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Tools Directory
  const tools = [
    { id: 'caption' as GeneratorToolId, name: 'Caption Generator', icon: FileText, desc: '5 distinct hook-driven captions + CTAs' },
    { id: 'hashtag' as GeneratorToolId, name: 'Hashtag Matrix', icon: Hash, desc: 'High / Mid / Niche reach tiers' },
    { id: 'hook' as GeneratorToolId, name: 'Hook Lab (Retention)', icon: Flame, desc: '10 hooks ranked by 3-second retention %' },
    { id: 'script' as GeneratorToolId, name: 'Viral Script + Shot List', icon: Sparkles, desc: 'Hook-Story-CTA with visual directions' },
    { id: 'repurpose' as GeneratorToolId, name: 'Autopilot Repurposer', icon: Repeat, desc: '1 input -> Reel, X Thread & LinkedIn' },
    { id: 'seo' as GeneratorToolId, name: 'SEO & Keyword Ranker', icon: Search, desc: 'YouTube & TikTok search keywords & tags' },
    { id: 'carousel' as GeneratorToolId, name: 'Carousel Slide Writer', icon: Layers, desc: 'Card-by-card swipeable slides' },
    { id: 'calendar' as GeneratorToolId, name: '30-Day Content Planner', icon: Calendar, desc: 'Month-long topical roadmap' },
    { id: 'reply' as GeneratorToolId, name: 'Smart Comment Reply', icon: MessageSquare, desc: 'Brand-voice AI engagement answers' },
  ];

  // Mock output generator data based on selected tool & language
  const [results, setResults] = useState<any[]>([
    {
      id: 'res-1',
      type: 'Contrarian Question',
      score: 96,
      text: `Why are 90% of creators still spending 8 hours cutting footage manually? 🤯\n\nThese 5 AI workflows trim silences, burn karaoke subtitles, and auto-color in 45 seconds.\n\nComment "TOOLS" below and my bot will DM you the direct download bundle before the link expires! 👇`,
      hashtags: ['#creatorhack', '#videoediting', '#aicontent', '#productivitytips', '#reelsgrowth'],
    },
    {
      id: 'res-2',
      type: 'Direct Value Hook',
      score: 93,
      text: `Save this post before Instagram deletes it. 📌\n\nHere are 5 underground AI video editors that will save you 20+ hours this week:\n1. Hivepostly Studio (Browser timeline)\n2. AutoCaption Karaoke v4\n3. Whisper Voiceover\n4. Smart Reframe 9:16\n5. Viral Hook Doctor\n\nDrop "PDF" in comments to get our full cheatsheet in your inbox! 🚀`,
      hashtags: ['#aitools2026', '#contentcreator', '#videoeditors', '#instagramtips'],
    },
    {
      id: 'res-3',
      type: 'Story / Transformation',
      score: 91,
      text: `Last year I paid a video editor ₹45,000/month. Last month I produced 40 Reels myself using 5 AI web apps.\n\nThe algorithm rewards consistency and retention. Not complicated 12-track timelines.\n\nWant the exact stack? Comment "TOOLS" and check your DM! 🔥`,
      hashtags: ['#solopreneur', '#growthhacking', '#creatoreconomy', '#videoautomation'],
    },
  ]);

  const handleGenerate = () => {
    setIsGenerating(true);
    onUseCredit();

    setTimeout(() => {
      setIsGenerating(false);
      // Realistic simulation for chosen tool
      if (selectedTool === 'hook') {
        setResults([
          { id: 'h-1', score: 98, type: 'Curiosity Gap', text: `If you are editing Reels in Premiere Pro in 2026, stop. Look at this:` },
          { id: 'h-2', score: 95, type: 'Direct Threat', text: `You are losing 70% of viewers in the first 3 seconds because of this one audio mistake.` },
          { id: 'h-3', score: 92, type: 'Contrarian Stance', text: `Unpopular opinion: High production quality is actually killing your engagement.` },
          { id: 'h-4', score: 89, type: 'Insider Secret', text: `Top agencies charge ₹1,00,000 for this exact 3-step automation workflow:` },
        ]);
      } else if (selectedTool === 'script') {
        setResults([
          {
            id: 's-1',
            score: 97,
            type: '30s Hook-Story-CTA Format',
            text: `[HOOK - 0-3s]\n(Visual: Fast cut pointing at screen with timer running)\nSpoken: "This single tool just made my $10,000 editing team obsolete in 15 seconds."\n\n[STORY / DEMO - 3-22s]\n(Visual: Screen recording showing audio waveforms auto-snapping and text subtitles glowing in neon karaoke style)\nSpoken: "Watch: I upload a raw 10-minute ramble. It cuts every silence, removes background noise, and formats it for 9:16 vertical automatically."\n\n[CALL TO ACTION - 22-30s]\n(Visual: Creator pointing down with big 'Comment TOOLS' graphic overlay)\nSpoken: "Comment 'TOOLS' below and I will shoot you the direct link + full preset file in your DMs!"`,
          }
        ]);
      } else if (selectedTool === 'repurpose') {
        setResults([
          {
            id: 'rep-1',
            type: 'Instagram Reel (9:16)',
            score: 95,
            text: `Stop wasting time on manual subtitles. 1-click Karaoke glow is here. Comment "PRESET" to grab it!`,
          },
          {
            id: 'rep-2',
            type: 'X (Twitter) Thread (5 tweets)',
            score: 94,
            text: `1/5 How to turn 1 raw video into 10 viral assets using zero expensive software:\n\nA step-by-step breakdown 🧵👇`,
          },
          {
            id: 'rep-3',
            type: 'LinkedIn Document Post',
            score: 92,
            text: `The Modern Creator Stack (2026 Edition):\n\nWhy asynchronous video automation will define B2B inbound pipeline this year. Swipe through the 6 slides below 📊`,
          }
        ]);
      } else if (selectedTool === 'hashtag') {
        setResults([
          {
            id: 'ht-1',
            type: 'Tiered Hashtag Formula (15 Tags)',
            score: 94,
            text: `HIGH REACH (>1M):\n#contentcreator #videoediting #digitalmarketing\n\nMID REACH (100K-1M):\n#aicontent #reelsgrowth #videotips #creatorautomation\n\nNICHE TARGET (<100K):\n#solocreators #indiacreators #reelshack2026 #shortformvideo`,
          }
        ]);
      } else {
        // Captions generator refresh
        setResults([
          {
            id: 'res-new-1',
            type: 'High-Retention Question',
            score: 97,
            text: language === 'hi'
              ? `क्या आप अभी भी 5 अलग-अलग ऐप्स में वीडियो एडिट कर रहे हैं? 🤯\n\nइस नए AI वर्कफ़्लो से आप सिर्फ 1 क्लिक में कैप्शन, म्यूजिक और कट लगा सकते हैं।\n\nनीचे "TOOLS" कमेंट करें और मैं आपको सीधे DM में लिंक भेजूंगा! 👇`
              : language === 'te'
              ? `మీరు ఇప్పటికీ రీల్స్ కోసం 4 గంటలు ఎడిట్ చేస్తున్నారా? 🚀\n\nఈ 5 AI టూల్స్ మీ సమయాన్ని 90% ఆదా చేస్తాయి.\n\n"TOOLS" అని కామెంట్ చేయండి, పూర్తి గైడ్ మీ ఇన్బాక్స్ కి వస్తుంది! 👇`
              : `The algorithm changed again in 2026. If you're not using comment-to-DM funnels, you're leaving 80% of your leads on the table.\n\nHere are the 5 tools we use to automate everything.\n\nComment "BLUEPRINT" to receive the Notion operating system! ⚡`,
            hashtags: ['#creatoreconomy', '#videoediting', '#growthhack'],
          }
        ]);
      }
    }, 600);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Tool Navigation */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#141727] via-[#10131f] to-[#0c0e16] border border-white/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-xl font-extrabold text-white tracking-tight">AI CONTENT STUDIO</h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Tuned per Platform
              </span>
            </div>
            <p className="text-xs text-slate-400">
              GravityWrite-style studio that conditions output on your past top performers and platform rules.
            </p>
          </div>

          {/* Language selector & Brand Voice */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <select
                value={language}
                onChange={(e: any) => setLanguage(e.target.value)}
                className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
              >
                <option value="en" className="bg-[#141724]">English</option>
                <option value="hinglish" className="bg-[#141724]">Hinglish (India Tech)</option>
                <option value="hi" className="bg-[#141724]">Hindi (हिंदी)</option>
                <option value="te" className="bg-[#141724]">Telugu (తెలుగు)</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={tone}
                onChange={(e: any) => setTone(e.target.value)}
                className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
              >
                <option value="contrarian" className="bg-[#141724]">Contrarian / Disruptor</option>
                <option value="high_energy" className="bg-[#141724]">High Energy / Viral</option>
                <option value="storytelling" className="bg-[#141724]">Founder Storytelling</option>
                <option value="educational" className="bg-[#141724]">Tactical / Educational</option>
              </select>
            </div>
          </div>
        </div>

        {/* 9 Tools Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2">
          {tools.map((t) => {
            const Icon = t.icon;
            const isSelected = selectedTool === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedTool(t.id);
                  handleGenerate();
                }}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[92px] ${
                  isSelected
                    ? 'bg-indigo-600/25 border-indigo-500/60 shadow-lg shadow-indigo-500/15'
                    : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/5 text-slate-400'
                }`}
              >
                <Icon className={`w-4 h-4 mb-2 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                <div>
                  <div className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {t.name}
                  </div>
                  <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                    {t.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Studio Workspace: Inputs & Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Prompt & Controls (4 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-[#131724] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>GENERATOR CONTROLS</span>
              <span className="text-[11px] font-mono text-amber-400">1 Credit / Run</span>
            </h3>

            {/* Target Platform Selector */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Target Platform</label>
              <div className="grid grid-cols-4 gap-1.5 text-xs">
                {(['instagram', 'youtube', 'linkedin', 'x'] as Platform[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setTargetPlatform(p)}
                    className={`py-1.5 rounded-lg font-medium capitalize text-center transition-all ${
                      targetPlatform === p
                        ? 'bg-indigo-600 text-white font-semibold shadow-md'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Topic Input */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">Topic or Core Idea</label>
              <textarea
                rows={3}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. 5 AI tools that replaced my $10k video editing team..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Duration Selector for Video/Script tools */}
            {(selectedTool === 'script' || selectedTool === 'hook') && (
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-medium">Target Video Duration</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['15s', '30s', '60s'] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`py-1.5 rounded-lg text-xs font-semibold ${
                        duration === d
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      {d} format
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trend context helper */}
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-300">
              <span className="font-semibold text-white">Trend Context Applied:</span> Ingesting audio velocity and search volume for "#aicontent" in India & US.
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || creditsRemaining <= 0}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500 hover:from-indigo-400 hover:to-emerald-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Viral Variations...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate Variations (1 Credit)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Col: Output Options with "Send to Composer" (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Generated Outputs ({results.length})
              </h3>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                P90 &lt; 0.8s
              </span>
            </div>

            <button
              onClick={handleGenerate}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>
          </div>

          <div className="space-y-4">
            {results.map((res) => (
              <div
                key={res.id}
                className="p-5 rounded-2xl bg-[#131724] border border-white/10 space-y-3 relative group hover:border-indigo-500/40 transition-all"
              >
                {/* Output Card Header */}
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-400">{res.type}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-400" />
                      {res.score}% Virality Rating
                    </span>
                  </div>

                  <button
                    onClick={() => copyToClipboard(res.text, res.id)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
                  >
                    {copiedId === res.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[11px] text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Text Content */}
                <div className="text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-line bg-black/30 p-3.5 rounded-xl border border-white/5">
                  {res.text}
                </div>

                {/* Hashtag tags if present */}
                {res.hashtags && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {res.hashtags.map((h: string, i: number) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                {/* Card Action Footer: Send to Composer in 1 click! */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-[11px] text-slate-500">
                    Character Count: {res.text.length} • Formatted for {targetPlatform}
                  </span>

                  <button
                    onClick={() => {
                      onSendToComposer({
                        caption: res.text,
                        hashtags: res.hashtags,
                        title: topic,
                      });
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send to Composer</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
