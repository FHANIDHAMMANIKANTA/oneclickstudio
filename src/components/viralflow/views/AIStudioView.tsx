import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Copy, 
  Check, 
  RefreshCw, 
  Hash, 
  FileText, 
  Search, 
  Lightbulb, 
  Film,
  Zap,
  ArrowRight,
  Download,
  Clock,
  Flame,
  Camera,
  Layers,
  Wand2,
  CheckCircle2,
  Mic,
  BookOpen,
  ShoppingBag
} from 'lucide-react';
import { 
  generateLocalContent, 
  callLiveGeminiApi 
} from '../../../utils/aiContentEngine';

interface AIStudioViewProps {
  onSendToComposer: (text: string) => void;
  onSendToEditor?: (text: string) => void;
  onUseCredit: () => void;
  creditsRemaining: number;
}

// 5 Core Output Modes (Renamed 'Viral Ideas' to 'Hook Ideas' as requested)
export type MainTabType = 'Caption' | 'Hashtags' | 'SEO Keywords' | 'Hook Ideas' | 'Video Script';

// Video Script Formats
export type VideoScriptSubType = 'short' | 'full' | 'podcast' | 'story' | 'ugc' | 'titles' | 'desc';

export const AIStudioView: React.FC<AIStudioViewProps> = ({
  onSendToComposer,
  onSendToEditor,
  onUseCredit,
  creditsRemaining,
}) => {
  // Main Tab selection (Image 1 layout: Caption, Hashtags, SEO Keywords, Hook Ideas, Video Script)
  const [activeTab, setActiveTab] = useState<MainTabType>('SEO Keywords');
  
  // Video Script Sub-type (Short 60s, Full 8-10m, Podcast, Story, UGC, Titles, Description)
  const [videoSubType, setVideoSubType] = useState<VideoScriptSubType>('short');

  // Dropdown Inputs (Image 1: MODEL, PLATFORM, TONE)
  const [model, setModel] = useState<'Gemini 3 Flash' | 'GPT-5.2' | 'Claude 3.7 Sonnet'>('Gemini 3 Flash');
  const [platform, setPlatform] = useState('tiktok');
  const [tone, setTone] = useState('bold');

  // Textarea Input (Image 1: WHAT'S THE CONTENT ABOUT?)
  const [topic, setTopic] = useState('Launching a productivity app that cuts 10 hours of video editing every week');

  // Generation & Results state
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copyAllCopied, setCopyAllCopied] = useState(false);
  const [selectedOptionFilter, setSelectedOptionFilter] = useState<'all' | number>('all');
  const [results, setResults] = useState<Array<{ title: string; text: string; score: number }>>([]);

  // Live API Key (optional from localStorage)
  const [apiKey] = useState<string>(() => localStorage.getItem('gemini_api_key') || '');

  // Generate on tab change or initial mount
  useEffect(() => {
    executeGeneration(activeTab, videoSubType, topic, platform, tone);
  }, []);

  // Helper to map activeTab + subType to toolId
  const getToolId = (tab: MainTabType, subType: VideoScriptSubType): string => {
    switch (tab) {
      case 'Caption': return 'caption';
      case 'Hashtags': return 'hashtags';
      case 'SEO Keywords': return 'seo_keywords';
      case 'Hook Ideas': return 'hook_ideas';
      case 'Video Script':
        if (subType === 'short') return 'youtube_shorts';
        if (subType === 'titles') return 'youtube_titles';
        if (subType === 'desc') return 'youtube_desc';
        return 'video_script';
      default: return 'seo_keywords';
    }
  };

  // Generation Core
  const executeGeneration = async (
    curTab: MainTabType,
    curSubType: VideoScriptSubType,
    curTopic: string,
    curPlatform: string,
    curTone: string
  ) => {
    if (!curTopic.trim()) return;

    setIsGenerating(true);
    onUseCredit();

    const toolId = getToolId(curTab, curSubType);

    try {
      if (apiKey.trim()) {
        try {
          const liveRes = await callLiveGeminiApi({
            apiKey: apiKey.trim(),
            toolName: `${curTab} (${curSubType})`,
            topic: curTopic,
            audience: 'Creators & Viewers',
            tone: curTone,
            platform: curPlatform,
          });
          setResults(liveRes);
          setIsGenerating(false);
          return;
        } catch (e) {
          console.warn('Live API call failed, falling back to local engine:', e);
        }
      }

      // Local Generator Fallback
      setTimeout(() => {
        const generated = generateLocalContent({
          toolId,
          topic: curTopic,
          audience: 'Creators, Founders & General Audience',
          tone: curTone,
          platform: curPlatform,
          length: curSubType,
        });
        setResults(generated);
        setIsGenerating(false);
      }, 500);
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
    }
  };

  // Copy helper
  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  // Copy All 5 Answers helper
  const handleCopyAll = () => {
    const combined = results
      .map((r, i) => `=== OPTION ${i + 1}: ${r.title.toUpperCase()} ===\n\n${r.text}`)
      .join('\n\n========================================\n\n');
    navigator.clipboard.writeText(combined);
    setCopyAllCopied(true);
    setTimeout(() => setCopyAllCopied(false), 2000);
  };

  // Download markdown
  const handleDownload = (title: string, text: string) => {
    const blob = new Blob([`# ${title}\n\n${text}`], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^\w]/g, '_').slice(0, 30)}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Selected Tab Background Color (Exact Image 1 styling with high-contrast active tabs)
  const getTabActiveClass = (tab: MainTabType) => {
    if (activeTab !== tab) {
      return 'bg-white text-[#0A0A0A] hover:bg-neutral-100 border-[#0A0A0A]';
    }
    switch (tab) {
      case 'SEO Keywords':
        return 'bg-[#2F80ED] text-white border-[#0A0A0A] shadow-brutal-sm';
      case 'Caption':
        return 'bg-[#FF5B37] text-white border-[#0A0A0A] shadow-brutal-sm';
      case 'Hashtags':
        return 'bg-[#B8FF5C] text-[#0A0A0A] border-[#0A0A0A] shadow-brutal-sm';
      case 'Hook Ideas':
        return 'bg-[#FFAA00] text-[#0A0A0A] border-[#0A0A0A] shadow-brutal-sm';
      case 'Video Script':
        return 'bg-[#FF5B37] text-white border-[#0A0A0A] shadow-brutal-sm';
      default:
        return 'bg-[#2F80ED] text-white border-[#0A0A0A] shadow-brutal-sm';
    }
  };

  return (
    <div className="space-y-6 text-left font-body max-w-5xl mx-auto">
      {/* 1. Header (Exact Match to User Image 1) */}
      <div>
        <div className="text-xs font-mono font-black tracking-wider uppercase text-[#FF5B37] mb-0.5">
          AI STUDIO
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#0A0A0A]">
          Generate the good stuff
        </h1>
      </div>

      {/* 2. Main Generator Box (Exact Match to User Image 1) */}
      <div className="bg-white border-2 border-[#0A0A0A] p-6 space-y-5 shadow-brutal text-left">
        {/* Row of Tabs: [ Caption ] [ Hashtags ] [ SEO Keywords ] [ Hook Ideas ] [ Video Script ] */}
        <div className="flex flex-wrap gap-2.5">
          {(['Caption', 'Hashtags', 'SEO Keywords', 'Hook Ideas', 'Video Script'] as MainTabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                executeGeneration(tab, videoSubType, topic, platform, tone);
              }}
              className={`px-4 py-2 font-display text-xs font-bold border-2 transition-all cursor-pointer ${getTabActiveClass(tab)}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Video Script Sub-Selector (Asks Short Video Script or Full Video Script or other formats) */}
        {activeTab === 'Video Script' && (
          <div className="p-3 bg-[#FFFDF8] border-2 border-[#0A0A0A] space-y-2 animate-in fade-in">
            <div className="text-[11px] font-mono font-bold uppercase text-neutral-600 flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-[#FF5B37]" />
              <span>Select Video Scripting Format:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'short' as VideoScriptSubType, label: '⚡ Short Video Script (60s TikTok / Reels / Shorts)' },
                { id: 'full' as VideoScriptSubType, label: '🎬 Full Video Script (8-10m YouTube Breakdown)' },
                { id: 'podcast' as VideoScriptSubType, label: '🎙️ Podcast & Interview Outline' },
                { id: 'story' as VideoScriptSubType, label: '🎭 Storytelling & Case Study Narrative' },
                { id: 'ugc' as VideoScriptSubType, label: '🛒 UGC & Product Review Ad Script' },
                { id: 'titles' as VideoScriptSubType, label: '💡 High-CTR Titles & Thumbnails' },
                { id: 'desc' as VideoScriptSubType, label: '📝 Description & SEO Tags' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    setVideoSubType(sub.id);
                    executeGeneration(activeTab, sub.id, topic, platform, tone);
                  }}
                  className={`px-3 py-1.5 text-xs font-display font-bold border-2 transition-all cursor-pointer ${
                    videoSubType === sub.id
                      ? 'bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-brutal-sm'
                      : 'bg-white text-[#0A0A0A] border-[#0A0A0A] hover:bg-neutral-100'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Inputs Row: MODEL, PLATFORM, TONE (Exact Match to User Image 1) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {/* MODEL */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-neutral-600 uppercase font-mono block">
              MODEL
            </label>
            <select
              value={model}
              onChange={(e: any) => setModel(e.target.value)}
              className="w-full bg-white border-2 border-[#0A0A0A] px-3 py-2 text-xs font-bold text-[#0A0A0A] focus:outline-none"
            >
              <option value="Gemini 3 Flash">Gemini 3 Flash</option>
              <option value="GPT-5.2">GPT-5.2</option>
              <option value="Claude 3.7 Sonnet">Claude 3.7 Sonnet</option>
            </select>
          </div>

          {/* PLATFORM (Unique Generation for all 5 platforms) */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-neutral-600 uppercase font-mono block">
              PLATFORM
            </label>
            <select
              value={platform}
              onChange={(e) => {
                setPlatform(e.target.value);
                executeGeneration(activeTab, videoSubType, topic, e.target.value, tone);
              }}
              className="w-full bg-white border-2 border-[#0A0A0A] px-3 py-2 text-xs font-bold text-[#0A0A0A] focus:outline-none lowercase"
            >
              <option value="tiktok">tiktok (short-form viral)</option>
              <option value="instagram">instagram (reels & carousels)</option>
              <option value="youtube">youtube (long & shorts)</option>
              <option value="twitter / x">twitter / x (threads & punchy)</option>
              <option value="linkedin">linkedin (b2b thought leadership)</option>
            </select>
          </div>

          {/* TONE */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-neutral-600 uppercase font-mono block">
              TONE
            </label>
            <select
              value={tone}
              onChange={(e) => {
                setTone(e.target.value);
                executeGeneration(activeTab, videoSubType, topic, platform, e.target.value);
              }}
              className="w-full bg-white border-2 border-[#0A0A0A] px-3 py-2 text-xs font-bold text-[#0A0A0A] focus:outline-none lowercase"
            >
              <option value="bold">bold</option>
              <option value="engaging">engaging</option>
              <option value="witty">witty</option>
              <option value="professional">professional</option>
              <option value="urgent">urgent</option>
              <option value="relatable">relatable</option>
              <option value="contrarian">contrarian</option>
            </select>
          </div>
        </div>

        {/* Textarea: WHAT'S THE CONTENT ABOUT? (Exact Match to User Image 1) */}
        <div className="space-y-1.5 text-left">
          <label className="text-[11px] font-bold text-neutral-700 uppercase font-mono block">
            WHAT'S THE CONTENT ABOUT?
          </label>
          <textarea
            rows={3}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Launching a productivity app that cuts 10 hours of video editing every week..."
            className="w-full bg-white border-2 border-[#0A0A0A] p-3 text-xs font-medium text-[#0A0A0A] focus:outline-none leading-relaxed placeholder-neutral-400"
          />
        </div>

        {/* Action Button: [ ⚡ Generating... ] / [ ✨ Generate ] (Exact Match to User Image 1) */}
        <div>
          <button
            onClick={() => executeGeneration(activeTab, videoSubType, topic, platform, tone)}
            disabled={isGenerating || creditsRemaining <= 0}
            className="px-6 py-2.5 bg-[#FF5B37] hover:bg-[#ff4921] text-white font-display font-black text-xs sm:text-sm border-2 border-[#0A0A0A] shadow-brutal flex items-center gap-2 transition-all hover:translate-x-0.5 hover:translate-y-0.5 disabled:opacity-60 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-white text-white" />
                <span>Generate</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4. Results Box: 5 Generated Answers (Exact Match to User Requirement) */}
      <div className="bg-white border-2 border-[#0A0A0A] p-5 space-y-4 shadow-brutal text-left">
        {/* Header: ✧ 5 Generated Results */}
        <div className="flex flex-wrap items-center justify-between pb-3 border-b-2 border-[#0A0A0A] gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base text-[#0A0A0A]">✧</span>
            <span className="font-display font-black text-sm text-[#0A0A0A]">
              5 Answers Generated
            </span>
            <span className="px-2 py-0.5 bg-[#B8FF5C] border border-[#0A0A0A] text-[10px] font-mono font-black uppercase">
              {activeTab} • {platform.toUpperCase()}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Copy All 5 Options Button */}
            {results.length > 0 && !isGenerating && (
              <button
                onClick={handleCopyAll}
                className="px-3 py-1 bg-[#0A0A0A] hover:bg-[#FF5B37] text-white border border-[#0A0A0A] text-xs font-mono font-bold flex items-center gap-1.5 shadow-brutal-sm transition-all cursor-pointer"
                title="Copy all 5 answers together"
              >
                {copyAllCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#B8FF5C]" />
                    <span className="text-[#B8FF5C]">Copied All 5!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy All 5 Answers</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={() => executeGeneration(activeTab, videoSubType, topic, platform, tone)}
              className="text-xs font-bold text-[#FF5B37] flex items-center gap-1 hover:underline font-mono cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Regenerate</span>
            </button>
          </div>
        </div>

        {/* 5-Option Filter Switcher Bar */}
        {results.length > 1 && !isGenerating && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
            <span className="text-[10px] text-neutral-500 uppercase font-bold shrink-0 mr-1">
              Filter:
            </span>
            <button
              onClick={() => setSelectedOptionFilter('all')}
              className={`px-2.5 py-1 text-[11px] font-bold border transition-all cursor-pointer ${
                selectedOptionFilter === 'all'
                  ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                  : 'bg-white hover:bg-neutral-100 text-[#0A0A0A] border-neutral-300'
              }`}
            >
              All 5 Options ({results.length})
            </button>
            {results.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOptionFilter(idx)}
                className={`px-2.5 py-1 text-[11px] font-bold border transition-all cursor-pointer shrink-0 ${
                  selectedOptionFilter === idx
                    ? 'bg-[#FF5B37] text-white border-[#0A0A0A] shadow-xs'
                    : 'bg-white hover:bg-neutral-100 text-[#0A0A0A] border-neutral-300'
                }`}
              >
                Option {idx + 1}
              </button>
            ))}
          </div>
        )}

        {/* Result Content: 5 Options Stacked */}
        {isGenerating ? (
          <div className="p-6 text-xs font-mono text-neutral-600 flex items-center justify-center gap-2 animate-pulse bg-[#FFFDF8] border-2 border-dashed border-[#0A0A0A]">
            <RefreshCw className="w-4 h-4 animate-spin text-[#FF5B37]" />
            <span>Generating 5 custom answers for {activeTab}...</span>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-6">
            {results
              .filter((_, idx) => selectedOptionFilter === 'all' || selectedOptionFilter === idx)
              .map((res, i) => {
                const actualIndex = selectedOptionFilter === 'all' ? i : (selectedOptionFilter as number);
                const borderColors = [
                  'border-l-[#FF5B37]',
                  'border-l-[#2F80ED]',
                  'border-l-[#B8FF5C]',
                  'border-l-[#FFAA00]',
                  'border-l-[#9B51E0]',
                ];
                const accentBorder = borderColors[actualIndex % borderColors.length];

                return (
                  <div
                    key={actualIndex}
                    className={`card-brutal p-4 bg-white border-2 border-[#0A0A0A] border-l-6 ${accentBorder} shadow-brutal space-y-3 text-left`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-neutral-200">
                      <div className="flex items-center gap-2 truncate">
                        <span className="px-2 py-0.5 bg-[#0A0A0A] text-white text-[10px] font-mono font-black uppercase shrink-0">
                          Option {actualIndex + 1} of {results.length}
                        </span>
                        <span className="font-display font-bold text-xs sm:text-sm text-[#0A0A0A] truncate">
                          {res.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Quality / Viral Score */}
                        <span className="px-1.5 py-0.5 bg-[#B8FF5C] border border-[#0A0A0A] text-[9px] font-mono font-bold text-[#0A0A0A]">
                          {res.score || 98}% Score
                        </span>

                        {/* Copy Button */}
                        <button
                          onClick={() => handleCopy(res.text, actualIndex)}
                          className="px-2.5 py-1 bg-white hover:bg-neutral-100 border border-[#0A0A0A] text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                        >
                          {copiedIdx === actualIndex ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Option</span>
                            </>
                          )}
                        </button>

                        {/* Download Markdown */}
                        <button
                          onClick={() => handleDownload(res.title, res.text)}
                          className="p-1 hover:bg-neutral-100 border border-[#0A0A0A] text-neutral-700 cursor-pointer"
                          title="Download Markdown (.md)"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Formatted Text Box */}
                    <div className="p-4 bg-[#FFFDF8] border-2 border-[#0A0A0A]/20 text-xs text-neutral-800 leading-relaxed whitespace-pre-line max-h-[380px] overflow-y-auto select-text selection:bg-[#B8FF5C] font-mono">
                      {res.text}
                    </div>

                    {/* Action Buttons: Send to Composer / Send to OpenCut */}
                    <div className="flex flex-wrap items-center justify-between pt-1 gap-2">
                      <span className="text-[10px] font-mono text-neutral-500">
                        Model: {model} • Platform: {platform} • Tone: {tone}
                      </span>

                      <div className="flex items-center gap-2">
                        {onSendToEditor && (activeTab === 'Video Script' || activeTab === 'Hook Ideas') && (
                          <button
                            onClick={() => onSendToEditor(res.text)}
                            className="px-3 py-1.5 bg-[#B8FF5C] hover:bg-[#a4f145] text-[#0A0A0A] font-display font-bold text-xs tracking-tight border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <Film className="w-3.5 h-3.5" />
                            <span>Send to Hivepostly Studio</span>
                          </button>
                        )}

                        <button
                          onClick={() => onSendToComposer(res.text)}
                          className="px-3.5 py-1.5 bg-[#0A0A0A] hover:bg-[#FF5B37] text-white font-display font-bold text-xs tracking-tight border-2 border-[#0A0A0A] shadow-brutal-sm flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <span>Send Option {actualIndex + 1} to Composer</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="p-4 text-xs font-mono text-neutral-500">
            Click Generate to produce 5 answers below.
          </div>
        )}
      </div>
    </div>
  );
};
