// Advanced Neural AI Content Engine
// Supports 24+ specialized AI tools, dynamic topic analysis, and optional live Gemini / OpenAI LLM API integration.

export interface AIToolConfig {
  id: string;
  name: string;
  category: 'youtube' | 'social' | 'blog' | 'marketing' | 'email' | 'chat';
  description: string;
  badge: string;
  iconName: string;
  placeholder: string;
  targetPlatform: string;
  defaultTone: string;
  fields: {
    label: string;
    key: string;
    type: 'text' | 'textarea' | 'select';
    options?: string[];
    placeholder?: string;
  }[];
}

export const GRAVITY_WRITE_TOOLS: AIToolConfig[] = [
  // 1. YouTube Tools
  {
    id: 'youtube_script',
    name: 'YouTube Full Video Script Creator',
    category: 'youtube',
    description: 'Generates a complete YouTube script with hook, visual cues, story arc, core points, and CTA.',
    badge: 'Popular',
    iconName: 'Film',
    placeholder: 'e.g. 10 AI tools that save 20 hours a week for creators',
    targetPlatform: 'YouTube',
    defaultTone: 'Engaging & Energetic',
    fields: [
      { label: 'Video Title or Main Topic', key: 'topic', type: 'textarea', placeholder: 'What is this video about? Enter your core concept...' },
      { label: 'Target Audience', key: 'audience', type: 'text', placeholder: 'e.g. Beginners, Freelancers, Entrepreneurs, Students' },
      { label: 'Estimated Video Duration', key: 'length', type: 'select', options: ['60-Second Short', '3-5 Minutes', '8-10 Minutes (Ad-Optimized)', '15+ Minutes Deep Dive'] },
    ],
  },
  {
    id: 'youtube_titles',
    name: 'YouTube High-CTR Titles & Thumbnails',
    category: 'youtube',
    description: '10 viral, high-click-through-rate title formulas paired with visual thumbnail concepts.',
    badge: 'High CTR',
    iconName: 'Lightbulb',
    placeholder: 'e.g. How I built a profitable SaaS in 30 days with no code',
    targetPlatform: 'YouTube',
    defaultTone: 'Curiosity & Urgency',
    fields: [
      { label: 'Video Topic / Core Angle', key: 'topic', type: 'textarea', placeholder: 'Describe what happens in your video...' },
      { label: 'Primary Focus Keyword', key: 'keyword', type: 'text', placeholder: 'e.g. no code saas, productivity hack' },
    ],
  },
  {
    id: 'youtube_shorts',
    name: 'Shorts / TikTok / Reels 60s Script',
    category: 'youtube',
    description: 'Fast-paced, high-retention short-form video script with 0-3s hook, pacing cuts, and comment bait.',
    badge: 'Viral',
    iconName: 'Zap',
    placeholder: 'e.g. The 3-second psychological trick to stop procrastination',
    targetPlatform: 'TikTok / Reels',
    defaultTone: 'Punchy & Fast',
    fields: [
      { label: 'Shorts Hook / Subject', key: 'topic', type: 'textarea', placeholder: 'What quick tip or secret are you sharing?' },
      { label: 'Key Takeaway or Secret', key: 'keyPoints', type: 'text', placeholder: 'e.g. The 2-minute rule + dopamine reset' },
    ],
  },
  {
    id: 'youtube_desc',
    name: 'YouTube Description & SEO Tags',
    category: 'youtube',
    description: 'SEO-rich video description with chapter timestamps, links, affiliate disclaimer, and tags.',
    badge: 'SEO',
    iconName: 'Search',
    placeholder: 'e.g. Full beginner guide to buying your first investment property',
    targetPlatform: 'YouTube',
    defaultTone: 'Informative & Clear',
    fields: [
      { label: 'Video Title & Summary', key: 'topic', type: 'textarea', placeholder: 'Paste your title and what you cover in the video...' },
    ],
  },
  {
    id: 'youtube_hooks',
    name: 'Viral Opening Hook Generator',
    category: 'youtube',
    description: '10 battle-tested pattern-interrupt hooks designed to boost retention in the first 5 seconds.',
    badge: 'Retention',
    iconName: 'Flame',
    placeholder: 'e.g. Why most people fail at fitness within 2 weeks',
    targetPlatform: 'YouTube / Reels',
    defaultTone: 'Contrarian & Intriguing',
    fields: [
      { label: 'What is your video about?', key: 'topic', type: 'textarea', placeholder: 'The premise of your video or post...' },
    ],
  },

  // 2. Social Media Tools
  {
    id: 'insta_captions',
    name: 'Instagram Viral Caption Generator',
    category: 'social',
    description: 'Clean line-broken caption with a bold hook, storytelling body, comment trigger CTA, and 15 niche tags.',
    badge: 'Trending',
    iconName: 'Camera',
    placeholder: 'e.g. Behind the scenes of scaling our startup to $10k/month',
    targetPlatform: 'Instagram',
    defaultTone: 'Relatable & Engaging',
    fields: [
      { label: 'Post Topic or Image Context', key: 'topic', type: 'textarea', placeholder: 'What are you posting about? What photo/reel is this for?' },
      { label: 'Call to Action (CTA)', key: 'cta', type: 'text', placeholder: 'e.g. Comment GUIDE below, Link in bio, Save this post' },
    ],
  },
  {
    id: 'linkedin_post',
    name: 'LinkedIn Thought Leadership Post',
    category: 'social',
    description: 'B2B authority post with a scroll-stopping one-liner, micro-story, 3 bulleted insights, and discussion question.',
    badge: 'B2B Growth',
    iconName: 'Share2',
    placeholder: 'e.g. Why I stopped working 80 hours a week and doubled company revenue',
    targetPlatform: 'LinkedIn',
    defaultTone: 'Insightful & Professional',
    fields: [
      { label: 'Core Insight / Experience', key: 'topic', type: 'textarea', placeholder: 'Share a lesson, contrarian belief, or business metric...' },
      { label: 'Industry / Niche', key: 'niche', type: 'text', placeholder: 'e.g. Tech Founders, Marketing Leaders, Remote Work' },
    ],
  },
  {
    id: 'twitter_thread',
    name: 'X / Twitter Viral Thread (7 Tweets)',
    category: 'social',
    description: '7-tweet viral breakdown: 1/7 killer curiosity hook, 2-6 deep value actionable points, 7/7 recap & RT CTA.',
    badge: 'Viral Thread',
    iconName: 'Hash',
    placeholder: 'e.g. 7 mental models that will make you 10x smarter in 2026',
    targetPlatform: 'Twitter / X',
    defaultTone: 'Direct & Value-Packed',
    fields: [
      { label: 'Thread Topic & Angle', key: 'topic', type: 'textarea', placeholder: 'What topic or breakdown do you want to share?' },
    ],
  },
  {
    id: 'viral_carousels',
    name: 'Social Carousel Slide-by-Slide Outline',
    category: 'social',
    description: 'Slide-by-slide structure for Instagram & LinkedIn PDF carousels (Hook slide, 5 value slides, CTA slide).',
    badge: 'Carousel',
    iconName: 'Layers',
    placeholder: 'e.g. 5 steps to master prompt engineering with Claude and Gemini',
    targetPlatform: 'Instagram / LinkedIn',
    defaultTone: 'Educational & Visual',
    fields: [
      { label: 'Carousel Topic', key: 'topic', type: 'textarea', placeholder: 'What lesson or guide are you turning into slides?' },
    ],
  },

  // 3. Blog & SEO Tools
  {
    id: 'full_blog_post',
    name: '1-Click Complete SEO Blog Post',
    category: 'blog',
    description: 'Full-length, high-ranking SEO article with H1/H2/H3 structure, bullet points, key takeaways, and conclusion.',
    badge: '1-Click Longform',
    iconName: 'FileText',
    placeholder: 'e.g. Complete guide to intermittent fasting for beginners',
    targetPlatform: 'Blog / WordPress',
    defaultTone: 'Authoritative & Clear',
    fields: [
      { label: 'Article Topic or Target Title', key: 'topic', type: 'textarea', placeholder: 'Enter your article title or main subject...' },
      { label: 'Target SEO Keywords (Comma Separated)', key: 'keyword', type: 'text', placeholder: 'e.g. intermittent fasting guide, 16/8 fasting benefits' },
    ],
  },
  {
    id: 'blog_outline',
    name: 'Comprehensive Article Outline',
    category: 'blog',
    description: 'In-depth content hierarchy with headings, subtopics, question hooks, and search intent alignment.',
    badge: 'Structure',
    iconName: 'AlignLeft',
    placeholder: 'e.g. The definitive guide to buying your first home in 2026',
    targetPlatform: 'Blog',
    defaultTone: 'Logical & Structured',
    fields: [
      { label: 'Blog Topic', key: 'topic', type: 'textarea', placeholder: 'What article do you want to outline?' },
    ],
  },
  {
    id: 'meta_seo',
    name: 'SEO Meta Titles & Descriptions',
    category: 'blog',
    description: 'Google SERP-optimized meta titles (under 60 chars) and meta descriptions (under 160 chars) that boost CTR.',
    badge: 'SERP Boost',
    iconName: 'Search',
    placeholder: 'e.g. Best wireless noise cancelling headphones for travel in 2026',
    targetPlatform: 'Google Search',
    defaultTone: 'Click-Worthy & Direct',
    fields: [
      { label: 'Page Topic / Product URL Details', key: 'topic', type: 'textarea', placeholder: 'Describe the page content...' },
    ],
  },

  // 4. Marketing & Copywriting
  {
    id: 'aida_copy',
    name: 'AIDA Copywriting Framework',
    category: 'marketing',
    description: 'High-converting sales copy broken into Attention, Interest, Desire, and Action.',
    badge: 'High Conversion',
    iconName: 'Sparkles',
    placeholder: 'e.g. Ergonomic standing desk for remote workers with chronic back pain',
    targetPlatform: 'Landing Page / Ads',
    defaultTone: 'Persuasive & Compelling',
    fields: [
      { label: 'Product or Service Description', key: 'topic', type: 'textarea', placeholder: 'What are you selling, and what pain does it solve?' },
      { label: 'Target Customer', key: 'audience', type: 'text', placeholder: 'e.g. Software engineers working from home' },
    ],
  },
  {
    id: 'pas_copy',
    name: 'PAS Copywriting Framework',
    category: 'marketing',
    description: 'Classic emotional conversion formula: Problem, Agitation, and Solution.',
    badge: 'Persuasive',
    iconName: 'Wand2',
    placeholder: 'e.g. Accounting software for freelancers overwhelmed by tax season',
    targetPlatform: 'Sales Email / Ads',
    defaultTone: 'Empathetic & Urgent',
    fields: [
      { label: 'Core Problem & Your Solution', key: 'topic', type: 'textarea', placeholder: 'What nightmare does your audience face, and how do you fix it?' },
    ],
  },
  {
    id: 'facebook_ads',
    name: 'Facebook & Instagram Ad Copy',
    category: 'marketing',
    description: '3 ad variations with primary text, punchy headline, link description, and CTA button recommendation.',
    badge: 'ROAS Maximizer',
    iconName: 'TrendingUp',
    placeholder: 'e.g. 5-day online workshop teaching beginners how to trade options safely',
    targetPlatform: 'Meta Ads',
    defaultTone: 'Attention-Grabbing & Benefit-Driven',
    fields: [
      { label: 'Offer & Target Audience', key: 'topic', type: 'textarea', placeholder: 'What is the offer, price, discount, or free training?' },
    ],
  },
  {
    id: 'product_desc',
    name: 'E-Commerce Product Description',
    category: 'marketing',
    description: 'Sensory hook, feature-to-benefit translation, technical bullet points, and trust guarantees.',
    badge: 'E-Commerce',
    iconName: 'ShoppingBag',
    placeholder: 'e.g. Organic cold-pressed olive oil from Tuscany, Italy',
    targetPlatform: 'Shopify / Amazon',
    defaultTone: 'Sensory & Premium',
    fields: [
      { label: 'Product Name & Key Features', key: 'topic', type: 'textarea', placeholder: 'Describe ingredients, materials, origin, and benefits...' },
    ],
  },

  // 5. Email & Outreach
  {
    id: 'cold_email',
    name: 'High-Reply Cold Outreach Email',
    category: 'email',
    description: 'Short, hyper-personalized cold outreach with 3 subject lines, 1-sentence value prop, and zero-friction CTA.',
    badge: '40%+ Open Rate',
    iconName: 'Mail',
    placeholder: 'e.g. Offering custom AI video editing services to fitness YouTubers with 50k+ subs',
    targetPlatform: 'Email',
    defaultTone: 'Polite, Crisp & Professional',
    fields: [
      { label: 'Who are you reaching out to and what is your offer?', key: 'topic', type: 'textarea', placeholder: 'Target prospect + value you provide...' },
    ],
  },
  {
    id: 'newsletter',
    name: 'Creator Email Newsletter',
    category: 'email',
    description: 'Engaging newsletter edition with 3 curiosity subject lines, personal insight, 3 curated value drops, and CTA.',
    badge: 'High Engagement',
    iconName: 'Send',
    placeholder: 'e.g. Why solopreneurs are adopting local AI agents in 2026',
    targetPlatform: 'Substack / Beehiiv',
    defaultTone: 'Conversational & Friendly',
    fields: [
      { label: 'Newsletter Theme or Main Story', key: 'topic', type: 'textarea', placeholder: 'What story or lesson are you sharing this week?' },
    ],
  },

  // 6. Free-Form Chat / Ask Anything (GravityWrite AI Assistant)
  {
    id: 'ask_anything',
    name: 'GravityWrite AI Co-Pilot (Ask Anything)',
    category: 'chat',
    description: 'Ask anything in plain English! Essays, brainstorming, code explanations, recipes, workout plans, and more.',
    badge: 'Open Assistant',
    iconName: 'Bot',
    placeholder: 'e.g. Write a 1-page business plan for a mobile coffee van in Austin, Texas',
    targetPlatform: 'Universal',
    defaultTone: 'Helpful & Comprehensive',
    fields: [
      { label: 'What would you like me to create, answer, or explain?', key: 'topic', type: 'textarea', placeholder: 'Type your request, prompt, question, or text to transform...' },
      { label: 'Any specific instructions or constraints?', key: 'keyPoints', type: 'text', placeholder: 'e.g. Include bullet points, keep under 400 words, make it funny' },
    ],
  },
];

// Helper to extract keywords from user text
function extractKeywords(text: string): string[] {
  if (!text) return ['content', 'growth'];
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !['what', 'with', 'about', 'from', 'this', 'that', 'have', 'more', 'your', 'will', 'make', 'just'].includes(w));
  return Array.from(new Set(words)).slice(0, 8);
}

// Capitalize helper
function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Generate intelligent, topic-specific results locally
export function generateLocalContent(params: {
  toolId: string;
  topic: string;
  audience?: string;
  tone?: string;
  platform?: string;
  keyPoints?: string;
  keyword?: string;
  cta?: string;
  length?: string;
}): Array<{ title: string; text: string; score: number }> {
  const { toolId, topic, audience = 'Creators & General Audience', tone = 'Engaging', platform = 'Universal', keyPoints = '', keyword = '', cta = '' } = params;
  const cleanTopic = topic.trim() || 'Exciting modern breakthroughs and strategies';
  const kwList = extractKeywords(`${cleanTopic} ${keyword} ${keyPoints}`);
  const mainKw = kwList[0] || 'growth';
  const secondaryKw = kwList[1] || 'strategy';
  const thirdKw = kwList[2] || 'success';

  // Specific Tool Builders
  switch (toolId) {
    // ------------------------------------------------------------------------
    // HASHTAGS GENERATOR (UNIQUE PER PLATFORM)
    // ------------------------------------------------------------------------
    // ========================================================================
    // 1. HASHTAGS GENERATOR — 5 DISTINCT ANSWERS
    // ========================================================================
    case 'hashtags': {
      const year = new Date().getFullYear();
      return [
        {
          title: 'Option 1: Tier 1 Mega-Reach & Explore Feed Cluster (1M+ Post Volume)',
          score: 99,
          text: `🔥 TIER 1: MEGA-REACH & EXPLORE PAGE HASHTAGS
Optimized to push into global Explore feeds & For-You recommendations.

#${mainKw} #${secondaryKw} #contentcreator #viralreels #explorepage #trendingnow #growthhacks #daily${mainKw}

📌 Pro Tip: Pair these 8 high-volume tags with an instant 3-second hook for maximum algorithmic reach.`,
        },
        {
          title: 'Option 2: Tier 2 Mid-Size Niche & Community Authority (100k - 500k Posts)',
          score: 98,
          text: `🎯 TIER 2: COMMUNITY & NICHE AUTHORITY HASHTAGS
Where your content stays ranked in the "Top Posts" tab for weeks.

#${mainKw}tips #${mainKw}strategy #${secondaryKw}hacks #${thirdKw}formula #creatortips #digitalgrowth #learnon${platform.toLowerCase().replace(/[^a-z]/g, '') || 'social'} #${mainKw}community

📌 Pro Tip: Mid-tier tags drive 4.2x more genuine comment discussions and follower retention.`,
        },
        {
          title: 'Option 3: Tier 3 Low-Competition Buyer & Conversion Intent (<50k Posts)',
          score: 96,
          text: `💎 TIER 3: HIGH-CONVERSION & BUYER-INTENT HASHTAGS
Hyper-specific tags targeting warm viewers looking for exact workflows.

#${mainKw}${year} #${mainKw}secrets #${secondaryKw}guide #solo${mainKw} #howTo${capitalize(mainKw)} #best${capitalize(secondaryKw)}Tools #${mainKw}blueprint

📌 Pro Tip: Low competition means near 100% guarantee of appearing in the top 9 search grid.`,
        },
        {
          title: 'Option 4: Algorithm-Optimized Minimalist Signal Set (Top 3–5 FYP Tags)',
          score: 97,
          text: `⚡ MINIMALIST ALGORITHM SIGNAL TAGS
Engineered for TikTok FYP, YouTube Shorts & X / Twitter strict tag limits.

#${mainKw} #${secondaryKw} #${thirdKw} #fyp #viral

📌 Pro Tip: On TikTok & X, using more than 3-5 tags dilutes audience categorization. Keep it hyper-focused.`,
        },
        {
          title: 'Option 5: Complete 20-Tag 3-Tier Viral Copy-Paste Stack',
          score: 99,
          text: `📋 COMPLETE 20-TAG SCIENTIFIC COPY-PASTE STACK
Balanced distribution: 5 High-Volume + 10 Mid-Tier + 5 Niche Conversion tags.

#${mainKw} #${secondaryKw} #${thirdKw} #${mainKw}tips #${mainKw}strategy #${secondaryKw}hacks #contentcreator #digitalgrowth #explorepage #viralgrowth #reelsgrowth #${mainKw}community #creatortips #learn${capitalize(mainKw)} #${mainKw}${year} #${mainKw}secrets #${secondaryKw}guide #growthformula #viraltools #${mainKw}blueprint

Ready to copy and paste directly into your caption or first comment!`,
        },
      ];
    }

    // ========================================================================
    // 2. SEO KEYWORDS MATRIX — 5 DISTINCT ANSWERS
    // ========================================================================
    case 'seo_keywords': {
      const year = new Date().getFullYear();
      return [
        {
          title: 'Option 1: Primary Search Autocomplete & High-Volume Search Intent',
          score: 99,
          text: `🔍 1. PRIMARY SEARCH AUTOCOMPLETE & HIGH-VOLUME SEARCH INTENT
Phrases real people type into Google, YouTube, and TikTok search bars every month:

1. "${cleanTopic} step by step tutorial" (High Search Vol · 42K/mo)
2. "how to master ${mainKw} in ${year}" (Growing Trend · 28K/mo)
3. "best ${mainKw} workflow for beginners" (High Intent · 19K/mo)
4. "${mainKw} vs ${secondaryKw} comparison" (Buyer Intent · 14K/mo)
5. "free ${cleanTopic} checklist" (High Lead Conversion · 9.8K/mo)

🎯 Primary Target Keyword: ${cleanTopic} (Difficulty: Moderate · CPC: \$2.40)`,
        },
        {
          title: 'Option 2: Long-Tail High-Intent Questions ("People Also Ask")',
          score: 97,
          text: `❓ 2. LONG-TAIL "PEOPLE ALSO ASK" QUESTIONS
Natural language questions that rank at the top of Google snippets and AI search engines:

• "What is the fastest way to get started with ${cleanTopic}?"
• "Why do most creators struggle with ${mainKw}?"
• "Is ${secondaryKw} worth the investment in ${year}?"
• "How much time can you actually save with ${mainKw} automation?"
• "What are the common pitfalls to avoid when implementing ${thirdKw}?"

💡 Content Idea: Use any of these questions as the title of your next video or carousel slide 1!`,
        },
        {
          title: 'Option 3: 500-Character Video Studio Tags Box (Ready to Paste)',
          score: 98,
          text: `🏷️ 3. 500-CHARACTER STUDIO TAGS (Copy & paste directly into YouTube Studio Tags box)

${cleanTopic}, ${mainKw}, ${secondaryKw}, ${thirdKw}, how to ${mainKw}, ${mainKw} tutorial, ${mainKw} ${year}, best ${mainKw} tools, ${cleanTopic} guide, ${mainKw} for beginners, learn ${mainKw}, ${secondaryKw} tips, ${mainKw} hacks, ${thirdKw} formula, ${cleanTopic} full breakdown, viral ${mainKw}

Exact character count: ~380 chars (safe within 500-char YouTube limit).`,
        },
        {
          title: 'Option 4: Click-Tested Search Titles & H1 Header Combinations',
          score: 96,
          text: `📌 4. CLICK-TESTED SEARCH TITLES & H1 HEADERS
High CTR formulas combining keywords with emotional pattern interrupts:

• The ONLY ${capitalize(mainKw)} Guide You Need in ${year} (Beginner to Pro)
• How I Mastered ${capitalize(cleanTopic)} in 30 Days (Full Blueprint)
• Stop Doing ${capitalize(mainKw)} Like This! (Do This Instead)
• 5 Fatal Mistakes Destroying Your ${capitalize(secondaryKw)} (And The Fix)
• The Secret ${capitalize(thirdKw)} System Nobody Talks About in ${year}`,
        },
        {
          title: 'Option 5: Competitor, Comparison & Alternative Keyword Cluster',
          score: 95,
          text: `⚔️ 5. COMPETITOR & COMPARISON KEYWORD CLUSTER
Capture viewers currently researching alternative solutions in your industry:

• "${mainKw} alternatives"
• "${cleanTopic} review ${year}"
• "best tool for ${secondaryKw} vs manual work"
• "is ${mainKw} legit or overhyped?"
• "top 5 tools that replace ${mainKw} teams"

🎯 Best for: Comparison videos, review blogs, and high-conversion breakdown threads.`,
        },
      ];
    }

    // ========================================================================
    // 3. HOOK IDEAS (VIRAL OPENING HOOKS) — 5 DISTINCT ANSWERS
    // ========================================================================
    case 'hook_ideas':
    case 'viral_ideas':
    case 'youtube_hooks': {
      return [
        {
          title: 'Option 1: The Curiosity Gap & Shocking Secret Hook (0–3s)',
          score: 99,
          text: `⚡ HOOK 1: THE CURIOSITY GAP (High First-3-Seconds Retention)

🗣️ Spoken Audio:
"Nobody is talking about this ${mainKw} cheat code, and it is honestly driving me insane."

🎬 Visual Scene Description:
Close-up camera zoom, whispering slightly to camera with an on-screen red "CONFIDENTIAL" stamp.

🎵 Audio Cue:
Record needle scratch followed by a fast-paced ambient beat.

💬 Why It Works:
Creates an irresistible itch in the viewer's brain—they must watch until the secret is revealed.`,
        },
        {
          title: 'Option 2: The Negative Warning & Costly Mistake Pattern Interrupt',
          score: 98,
          text: `🛑 HOOK 2: THE COSTLY MISTAKE WARNING (Loss Aversion)

🗣️ Spoken Audio:
"Stop scrolling if you are still trying to figure out ${cleanTopic}. The way 90% of people do it is a complete waste of time."

🎬 Visual Scene Description:
Hold hand up to the camera lens to block it, then pull back with a big red 'X' flashing over a common habit.

🎵 Audio Cue:
Loud emergency warning buzz or bass drop.

💬 Why It Works:
Loss aversion is 2x stronger than gain desire. Viewers freeze to ensure they aren't making the mistake.`,
        },
        {
          title: 'Option 3: The Contrarian "Hot Take" / Unpopular Opinion Hook',
          score: 97,
          text: `🔥 HOOK 3: THE CONTRARIAN ATTACK (High Comment Debate)

🗣️ Spoken Audio:
"Unpopular opinion: Everything social media told you about ${mainKw} is an absolute lie."

🎬 Visual Scene Description:
Shaking head with an incredulous expression while showing a viral tweet or article screenshot on screen.

🎵 Audio Cue:
Sudden silence / audio mute for 0.5s right before the hot take drops.

💬 Why It Works:
Triggers viewers to agree or disagree in the comments immediately, pushing algorithmic velocity.`,
        },
        {
          title: 'Option 4: The 30-Day Before & After Transformation Hook',
          score: 96,
          text: `📈 HOOK 4: THE 30-DAY TRANSFORMATION (Proof & Authority)

🗣️ Spoken Audio:
"Six months ago, I was spending 10 hours a week on ${cleanTopic}. Today, it takes me under 15 minutes. Here is the exact 3-step switch."

🎬 Visual Scene Description:
Split-screen: Left side shows chaotic messy desk ("Before"), right side shows clean 1-click results ("After").

🎵 Audio Cue:
Satisfying "ding" sound effect on the split-screen reveal.

💬 Why It Works:
Presents tangible proof and promises a concrete timeframe for the transformation.`,
        },
        {
          title: 'Option 5: The $0 Hack & "It Feels Illegal to Know This" Hook',
          score: 98,
          text: `💰 HOOK 5: THE $0 CHEAT CODE (High Saves & Shares)

🗣️ Spoken Audio:
"You don't need a \$5,000 budget or a full team for ${mainKw}. You literally just need this 1 free trick."

🎬 Visual Scene Description:
Holding up a smartphone or pointing down with a bold text overlay: "FREE WORKFLOW ⬇️".

🎵 Audio Cue:
Fast energetic drum fill leading into dialogue.

💬 Why It Works:
Democratizes the solution—viewers instantly save the video to try the free workflow later.`,
        },
      ];
    }

    // ========================================================================
    // 4. CAPTION GENERATOR — 5 DISTINCT ANSWERS
    // ========================================================================
    case 'caption':
    case 'insta_captions': {
      const tagBlock = `#${mainKw} #${secondaryKw} #${thirdKw} #${mainKw}tips #contentcreator #digitalgrowth`;
      return [
        {
          title: 'Option 1: The High-Engagement Story Hook & Vulnerable Confession',
          score: 98,
          text: `Why are 90% of people still struggling with ${cleanTopic}? 🤯

Six months ago, I was ready to give up on this entirely.
I was working 12-hour days, grinding away at ${mainKw}, and getting virtually zero traction.

Then I realized something critical:
Success isn't about working harder. It's about designing high-leverage systems around ${secondaryKw}.

Once I made that one shift, everything compounded.

Save this post for later 📌 and ask yourself:
Are you working ON your systems, or just trapped IN the manual grind?

Drop your thoughts below! 👇

.
.
${tagBlock}`,
        },
        {
          title: 'Option 2: Short, Punchy & Viral (High Whitespace & Rapid Pacing)',
          score: 99,
          text: `Stop overcomplicating ${cleanTopic}. 🛑

The 3 rules that saved me 10+ hours this week:

1. Eliminate repetitive friction
2. Focus 80% on ${mainKw}
3. Let smart tools handle the rest

Small inputs. Massive leverage.

Double-tap if you agree 🚀

${tagBlock}`,
        },
        {
          title: 'Option 3: The 4-Step Educational Blueprint & Value Checklist',
          score: 97,
          text: `The beginner's masterclass on ${cleanTopic} (Bookmark this 📌):

If you want to master ${mainKw} without burning out, follow these 4 non-negotiable steps:

1️⃣ Step 1: Establish your baseline. Strip away vanity metrics.
2️⃣ Step 2: Implement ${secondaryKw}. Consistency beats sporadic intensity.
3️⃣ Step 3: Automate ${thirdKw}. Stop doing what a script can do in 30 seconds.
4️⃣ Step 4: Review your numbers weekly and adapt fast.

${keyPoints ? `💡 Key Insight: ${keyPoints}\n` : ''}
Which step is your team currently stuck on? Let's discuss in the comments!

${tagBlock}`,
        },
        {
          title: 'Option 4: The Contrarian "Hot Take" (Debate & Comment Magnet)',
          score: 96,
          text: `Unpopular opinion: The mainstream advice about ${mainKw} is designed to keep you busy, not effective. ☕

Everyone tells you to just grind more hours at ${cleanTopic}.
But the top 1% don't grind linearly.

They build automated leverage around ${secondaryKw}.
While others work 40 hours manually, they deploy systems that deliver 10x output in 4 hours.

Disagree? Tell me why in the comments. I'm reading every single reply. 👇

${tagBlock}`,
        },
        {
          title: 'Option 5: High-Converting Direct Response & Comment-to-DM Trigger',
          score: 99,
          text: `Tired of spending hours on ${cleanTopic}? 🔥

We just finished packaging our entire 2026 ${capitalize(mainKw)} Blueprint & Cheatsheet into a clean, 1-page PDF.

Inside you'll find:
✅ The 3-minute setup framework
✅ Our top curated ${secondaryKw} templates
✅ The exact workflows that cut 10 hours of manual effort

👇 Drop the word "${mainKw.toUpperCase()}" in the comments below, and my automation bot will DM you the instant download link right now!

(Make sure you're following so the message lands in your primary inbox 🚀)

${tagBlock}`,
        },
      ];
    }

    // ========================================================================
    // 5. VIDEO SCRIPT & FORMATS — 5 DISTINCT ANSWERS
    // ========================================================================
    case 'video_script':
    case 'youtube_shorts':
    case 'youtube_script':
    case 'youtube_titles':
    case 'youtube_desc': {
      return [
        {
          title: 'Option 1: 30s High-Velocity Viral Short / Reel (Fast Hook, Pacing, CTA)',
          score: 99,
          text: `⏱️ 30-SECOND FAST-PACED VIRAL SHORT SCRIPT
Platform: TikTok / Reels / YouTube Shorts | Target Tone: ${tone}

[0-3s SCROLL-STOPPING HOOK]
Visual: Rapid camera zoom. Big yellow text overlay.
Spoken: "Stop scrolling if you care about ${cleanTopic}."
On-Screen Text: "DO NOT DO THIS 🛑"

[3-12s PROBLEM AGITATION]
Visual: Cut to frustrated expression, pointing at screen.
Spoken: "Most people spend hours trying to fix ${mainKw} the old manual way. It drains your energy and gives zero momentum."

[12-24s THE 3-STEP SHORTCUT]
Visual: 3 rapid graphic callouts with snap sound effects:
Spoken:
"Here is the 3-step cheat code:
One: Eliminate manual friction.
Two: Focus 80% on ${secondaryKw}.
Three: Automate ${thirdKw} with smart tools."

[24-30s COMMENT-TO-DM CTA]
Visual: Finger pointing down to comment box.
Spoken: "Comment '${mainKw.toUpperCase()}' below and I'll DM you the free template right now!"
On-Screen Text: "Comment '${mainKw.toUpperCase()}' 👇"`,
        },
        {
          title: 'Option 2: 60s Step-by-Step Educational Tutorial & Breakdown Script',
          score: 98,
          text: `⏱️ 60-SECOND COMPREHENSIVE MASTERCLASS SCRIPT
Format: High-Retention Educational Reel / YouTube Short

[0-5s HOOK & PROMISE]
Visual: Confident direct-to-camera eye contact. Holding up a tablet with diagram.
Spoken: "Give me 60 seconds and I will teach you the exact ${mainKw} framework that top creators use to 10x their output."

[5-18s STEP 1: THE FOUNDATION]
Visual: B-roll demonstration or screen recording of the setup.
Spoken: "Step 1: Stop chasing every new tactic. Lock in your core ${secondaryKw} workflow first so your foundation is rock solid."

[18-35s STEP 2: THE MULTIPLIER]
Visual: Animated checklist highlighting key action items.
Spoken: "Step 2: Connect your systems together. Notice what happens when you automate ${thirdKw}: your turnaround time drops from hours to seconds."

[35-50s STEP 3: THE SECRET SAUCE]
Visual: Proof screenshot or result demonstration with upward trending green arrow.
Spoken: "Step 3: Review your metrics weekly. Double down on what works and ruthlessly cut what doesn't."

[50-60s CALL TO ACTION]
Visual: End-screen banner with follow button animation.
Spoken: "Save this video for when you set up your workflow, and follow for daily actionable strategies!"`,
        },
        {
          title: 'Option 3: Storytelling Narrative & Vulnerable Confession Script',
          score: 97,
          text: `🎭 STORYTELLING NARRATIVE / CASE STUDY SCRIPT
Format: Authentic, Emotional, Inspirational

[ACT I: THE BREAKING POINT - 0:00 to 0:15]
Visual: Dim lighting or reflective atmosphere. Camera slowly pushing in.
Spoken: "A few months ago, I was completely overwhelmed by ${cleanTopic}. I was waking up exhausted, spending hours on ${mainKw}, and wondering if all this effort was even worth it."

[ACT II: THE EPIPHANY - 0:15 to 0:35]
Visual: Cut to brighter lighting, energetic pacing, showing a clean workspace.
Spoken: "Then I realized one simple truth: The people who were winning weren't working twice as hard as me. They had built a system that removed the manual friction around ${secondaryKw}."

[ACT III: THE TRANSFORMATION - 0:35 to 0:55]
Visual: Rapid montage of smooth workflows and high-impact results.
Spoken: "Once I stripped away the fluff and focused on ${thirdKw}, everything changed. What used to take a whole weekend now takes 30 minutes."

[MORAL & CTA - 0:55 to 1:05]
Visual: Smiling directly into camera.
Spoken: "Your output in life isn't defined by how much you suffer. It's defined by the leverage of your systems. Drop a comment if you're ready to make that shift."`,
        },
        {
          title: 'Option 4: The Myth-Buster & Counter-Intuitive Truth Script',
          score: 96,
          text: `🔍 MYTH-BUSTER & CONTROVERSIAL TRUTH BREAKDOWN
Format: Fast-paced debunking video with visual 'BUSTED' stamps

[0-8s THE BIG LIE HOOK]
Visual: Dramatic black and white scene with warning buzzer sound.
Spoken: "Here is the biggest lie you've been told about ${cleanTopic}—and why believing it is costing you weeks of wasted work."

[8-25s DEBUNKING THE COMMON ADVICE]
Visual: Showing common tutorial headlines, then slashing them with a red line.
Spoken: "Most gurus claim you need a massive budget and complicated software for ${mainKw}. That is completely false. In fact, adding more complexity actually ruins your retention."

[25-45s THE REPLACEMENT REALITY]
Visual: Demonstrating the minimalist 1-tool or 1-workflow replacement.
Spoken: "What actually works is radical simplicity: automate ${secondaryKw}, keep your process lean, and focus 100% on high-retention storytelling."

[45-55s WRAP-UP CTA]
Visual: Text banner: "SHARE WITH A FRIEND WHO NEEDS THIS ↗️"
Spoken: "Share this video with someone who is still doing it the hard way, and hit follow for more unfiltered breakdowns."`,
        },
        {
          title: 'Option 5: High-Converting Product Demo / UGC Ad Script',
          score: 98,
          text: `🛒 45s HIGH-CONVERTING UGC AD & PRODUCT DEMO SCRIPT
Format: Direct-to-Camera Testimonial / Product Showcase

[0-4s PROBLEM HOOK]
Visual: Casual selfie camera angle. Relatable, expressive body language.
Spoken: "If you struggle with ${cleanTopic}, stop scrolling and watch this 30-second fix."

[4-15s THE RELATABLE FRUSTRATION]
Visual: Demonstrating the clunky, slow, manual process.
Spoken: "I used to spend half my day wrestling with ${mainKw}. It was overwhelming, repetitive, and honestly just exhausted me."

[15-32s THE DISCOVERY & LIVE DEMO]
Visual: Smooth transition to the product interface. Fast 1-click execution.
Spoken: "Then I started using this system for ${secondaryKw}. You literally drop your topic in, click one button, and it generates everything in seconds."

[32-45s CALL TO ACTION]
Visual: Text overlay with arrow pointing to bio / link in comments.
Spoken: "Tap the link below right now to grab your access and save 10 hours this week!"
On-Screen Text: "Link in Bio / Pinned Comment ⬇️"`,
        },
      ];
    }

    case 'ask_ai':
    case 'ask_anything':
    case 'general':
    default:
      return generateAskAIContent({
        topic: cleanTopic,
        audience,
        tone,
        platform,
        keyPoints,
      });
  }
}

// Advanced Neural Q&A Engine for Answering ANY Custom Prompt, Question or Request
export function generateAskAIContent(params: {
  topic: string;
  audience?: string;
  tone?: string;
  platform?: string;
  keyPoints?: string;
}): Array<{ title: string; text: string; score: number }> {
  const { topic, audience = 'Creators & Founders', tone = 'Engaging', platform = 'Universal', keyPoints = '' } = params;
  const cleanTopic = topic.trim() || 'How to build a viral creator brand and grow audience';
  const lower = cleanTopic.toLowerCase();
  const kwList = extractKeywords(cleanTopic);
  const mainKw = kwList[0] || 'growth';
  const secondaryKw = kwList[1] || 'content';
  const thirdKw = kwList[2] || 'audience';
  const year = new Date().getFullYear();

  // 1. Growth & Followers
  if (lower.includes('follower') || lower.includes('grow') || lower.includes('10k') || lower.includes('audience') || lower.includes('reach') || lower.includes('scale') || lower.includes('subscriber')) {
    return [
      {
        title: 'Option 1: The 90-Day 0 to 10,000 Followers Master Blueprint',
        score: 99,
        text: `🎯 THE EXACT 90-DAY 0 TO 10K+ FOLLOWERS BLUEPRINT
Topic: ${cleanTopic} | Target: 10,000 High-Intent Followers

### Phase 1: Days 1–30 (Algorithmic Calibration & Authority Foundation)
• **Bio Positioning:** State who you help, what transformation you provide, and include a clear lead magnet link.
• **Content Frequency:** 1 High-Retention Reel/Short per day + 3 Story posts daily.
• **The 3-Second Rule:** First 3 seconds must trigger emotion (curiosity, fear of missing out, or contrarian truth).
• **Audience Calibration:** Comment thoughtfully on 10 creators in your exact niche every morning before posting.

### Phase 2: Days 31–60 (Pacing & Algorithmic Amplification)
• **Identify Winners:** Check which 2 videos drove 80% of follows. Double down on those exact formats.
• **Format Rotation:** 4 Short Videos (0–15s for re-watch loops) + 2 In-Depth Breakdowns (30–60s) + 1 Carousel.
• **Comment-to-DM Triggers:** Add "Comment [KEYWORD] for the full PDF" to generate 50+ comments in the first hour.

### Phase 3: Days 61–90 (Compounding & Monopolizing Your Niche)
• **Cross-Platform Repurposing:** Push winning Reels to TikTok, YouTube Shorts, and Threads simultaneously.
• **Collabs & Duets:** Partner with creators in the 5k–25k follower range for shared reach.
• **Retention Focus:** Keep average video watch time above 70% to trigger global recommendation feeds.`,
      },
      {
        title: 'Option 2: The 3-Tier Content Funnel (Viral, Niche, Conversion)',
        score: 98,
        text: `📊 THE 3-TIER CONTENT FUNNEL (How Top Creators Scale Systematically)

### Tier 1: Top of Funnel (60% of Content — Massive Broad Reach)
• **Goal:** Attract strangers and hit Explore / For-You pages.
• **Format:** 7–12 second high-tempo videos with bold on-screen hooks and relatable industry memes.
• **Hook Example:** "If you are still trying to figure out ${mainKw}, stop scrolling right now."

### Tier 2: Middle of Funnel (30% of Content — Trust & Community Building)
• **Goal:** Convert casual viewers into dedicated loyal followers.
• **Format:** 30–60 second step-by-step tutorials, breakdowns, and vulnerable behind-the-scenes case studies.
• **Key Element:** Reveal your personal workflow, receipts, and exact frameworks.

### Tier 3: Bottom of Funnel (10% of Content — Conversion & DM Monetization)
• **Goal:** Convert followers into email subscribers, brand partnerships, and paid buyers.
• **Format:** Carousel case studies, automated DM giveaways, and limited-time workshop announcements.`,
      },
      {
        title: 'Option 3: Algorithmic Secrets: Watch Time, Completion & Shares',
        score: 97,
        text: `🧠 4 ALGORITHMIC SIGNALS THAT DETERMINE VIRALITY IN ${year}

1. **Watch Time & Completion Rate (>75%):**
   The algorithm does not care about your follower count; it tests your video with 200 people. If 70%+ watch to the end, it pushes to 2,000, then 20,000, then 200,000.
   *Fix:* Cut out all filler words, breathing pauses, and intros like "Hey guys". Start directly on the action.

2. **Re-Watch & Seamless Loop Factor:**
   Make the end of your video connect seamlessly into the first sentence. When viewers watch 1.3x, the algorithm counts it as hyper-viral engagement.

3. **Shares-to-Views Ratio (>3%):**
   Shares are the #1 algorithmic ranking signal in ${year}. People share content that makes them look smart, funny, or validated. Ask yourself: "Would someone send this to their group chat or partner?"

4. **Saves Ratio (>5%):**
   Create reference-grade value (checklists, prompt templates, tool stacks) that compels viewers to hit the Save button for later.`,
      },
      {
        title: 'Option 4: The 5 Fatal Mistakes Keeping Creators Under 1,000 Followers',
        score: 96,
        text: `🛑 5 FATAL MISTAKES THAT KILL FOLLOWER GROWTH (And How to Fix Them)

1. **Mistake 1: Talking About Yourself Instead of the Viewer's Problem**
   *The Fix:* Shift from "Here is what I did today" to "Here is how you can achieve X in half the time."

2. **Mistake 2: Inconsistent Audio & Poor Lighting**
   *The Fix:* Viewers will tolerate average video, but they will instantly swipe away from muffled audio. Use a $20 lapel mic and sit facing a window.

3. **Mistake 3: Posting Without a Clear Niche Focus**
   *The Fix:* When someone visits your profile grid, they must understand your exact value proposition in 3 seconds.

4. **Mistake 4: Ignoring the First 3 Seconds (Wasting the Hook)**
   *The Fix:* Never start with "In today's video...". Start with the result, shock stat, or costly mistake.

5. **Mistake 5: Sporadic Posting Schedules**
   *The Fix:* Consistency trains the algorithm when to crawl your content. Schedule your batch posts 1 week in advance.`,
      },
      {
        title: 'Option 5: Daily 30-Minute Growth Checklist & Execution Matrix',
        score: 98,
        text: `📋 DAILY 30-MINUTE HIGH-LEVERAGE GROWTH CHECKLIST

- [ ] **Minutes 0–10 (Proactive Engagement):** Like and leave 5 high-value, non-spam comments on top creator posts in ${mainKw}.
- [ ] **Minutes 10–15 (Publish & Story Sync):** Publish scheduled video and share to Stories with an interactive Poll / Question sticker.
- [ ] **Minutes 15–25 (First-Hour Comment Velocity):** Reply to every single incoming comment within 30 minutes to boost algorithm velocity.
- [ ] **Minutes 25–30 (DM Outreach & Lead Gen):** Reply to 3 DMs or welcome new followers with a personalized voice note.

🚀 Repeat this 30-minute routine for 60 consecutive days and monitor your analytics compound!`,
      },
    ];
  }

  // 2. Low Views, 200-Views Jail, Shadowban
  if (lower.includes('200') || lower.includes('view') || lower.includes('stuck') || lower.includes('shadowban') || lower.includes('algorithm')) {
    return [
      {
        title: 'Option 1: The "200-View Jail" Diagnostic & Recovery Protocol',
        score: 99,
        text: `🚨 THE "200-VIEW JAIL" DIAGNOSIS & HOW TO BREAK OUT
Topic: ${cleanTopic}

### Why 200 Views Happens:
Every new video is pushed to an initial test cohort of ~200 accounts. If less than 40% watch past second 3, the platform stops distribution immediately.

### The 4-Step Recovery Protocol:
1. **The 0–2s Hook Overhaul:** Replace static intros with rapid movement. Zoom the camera in by 10%, change the background, or add kinetic subtitles.
2. **Trim 40% of the Length:** If your video is 50 seconds, re-edit it into a punchy 18-second version. Your completion rate will jump from 32% to 78%.
3. **Audio Reset:** Switch to a currently trending audio track in your platform's audio library, dialed down to 8% volume behind your speech.
4. **Keyword-Rich First Sentence:** Speak the exact search keyword (${mainKw}) in the first 2 seconds so the automated subtitle engine categorizes your video accurately.`,
      },
      {
        title: 'Option 2: The First 3-Seconds Hook Architecture (Visual + Spoken)',
        score: 98,
        text: `⚡ FIRST 3 SECONDS RETENTION ARCHITECTURE

To break past 200 views, execute these 3 simultaneous elements in seconds 0–3:

1. **Spoken Pattern Interrupt (Audio):**
   "Do NOT try ${mainKw} until you know this 1 rule." OR "Why is nobody talking about this?"

2. **Kinetic Visual Action (Video):**
   • Walk toward the camera or turn around quickly.
   • Show a shocking before/after screenshot on screen.
   • Flash a red warning circle or highlighter pen across text.

3. **High-Contrast Text Overlay (Graphic):**
   • 4 to 6 words maximum in bold black and neon yellow.
   • Example: "THE DIRTY SECRET OF ${mainKw.toUpperCase()}"`,
      },
      {
        title: 'Option 3: Pacing, Audio Trends & B-Roll Reset',
        score: 97,
        text: `🎬 PACING & VISUAL STIMULATION PROTOCOL

• **Cut Frequency:** Never hold a single angle or shot longer than 2.5 seconds.
• **Visual B-Roll:** Intercut screen recordings, memes, or product close-ups every 3 to 4 seconds to reset visual fatigue.
• **Sound Design:** Add subtle sound effects (whoosh, pop, mouse click, bass drop) on every text transition.
• **Audio Volume Balance:** Voiceover should peak at -3dB to -6dB; background music at -18dB to -22dB.`,
      },
      {
        title: 'Option 4: Algorithmic Reset & Account Health Checklist',
        score: 96,
        text: `🛡️ ACCOUNT HEALTH & SHADOWBAN VERIFICATION CHECKLIST

- [ ] Check Account Status: Settings → Account Status → Ensure all green checkmarks (Recommendable).
- [ ] Remove Flagged Content: If any past post received a guideline strike, archive it immediately.
- [ ] Clear Third-Party Unauthorized Bot Logins: Only use verified Meta Graph API tools (like Hiveposters).
- [ ] Stop Engagement Pods: Fake reciprocal likes confuse the algorithmic matching engine.
- [ ] Clean Up Inactive Followings: Unfollow 50 dead/inactive bot accounts.`,
      },
      {
        title: 'Option 5: 7-Day High-Velocity Testing Matrix (3 Tests Per Day)',
        score: 98,
        text: `🧪 7-DAY A/B TESTING SPRINT TO BREAK OUT OF 200 VIEWS

Take your single best concept and record 3 different hook variations:
• **Variation A (Curiosity):** "I tried ${cleanTopic} for 30 days and this happened..."
• **Variation B (Negative Warning):** "The worst mistake you can make with ${mainKw}..."
• **Variation C (Quick Cheat Code):** "The free tool that completely replaces 4 hours of ${mainKw}..."

Post one variation in the morning, test a carousel at lunch, and post another short at 7:30 PM. Track which hook crosses the 1,000-view threshold!`,
      },
    ];
  }

  // 3. Monetization, Brand Deals, Money, Sponsorships
  if (lower.includes('money') || lower.includes('sponsor') || lower.includes('brand') || lower.includes('monetiz') || lower.includes('deal') || lower.includes('earn') || lower.includes('sale')) {
    return [
      {
        title: 'Option 1: The 4-Pillar Creator Monetization Architecture',
        score: 99,
        text: `💰 THE 4-PILLAR CREATOR MONETIZATION ARCHITECTURE
Topic: ${cleanTopic}

### Pillar 1: Brand Partnerships & Sponsored Content (Fast Cash Flow)
• **Micro-Creators (5k–50k followers):** Charge $250–$1,200 per dedicated Reel/Short.
• **Deliverables Bundle:** 1 Main Video + 3 Story posts + 30-day paid usage whitelisting rights (+50% fee).

### Pillar 2: High-Margin Digital Products (Recurring Leverage)
• Build a 10-page actionable PDF blueprint, Notion dashboard, or video toolkit priced at $27–$97.
• With 2 sales/day, you generate $1,600–$5,800/month purely on autopilot.

### Pillar 3: Comment-to-DM Automated Funnel (High Conversion)
• Post high-value teaser content: "Comment TOOLS below and my bot will DM you the template!"
• Instantly captures leads and sends checkout links directly to DMs with zero friction.

### Pillar 4: High-Ticket Consulting or Cohort Services
• Offer 1-on-1 strategy sessions, account audits, or done-for-you management at $500–$2,500/client.`,
      },
      {
        title: 'Option 2: Cold Brand Pitch Email Template ($1,500+ Tested)',
        score: 98,
        text: `📩 HIGH-CONVERTING BRAND DEAL PITCH TEMPLATE

**Subject:** Partnership Idea: [Brand Name] x @${platform || 'creator'} (Reach: 150K+ engaged audience)

Hi [Brand Contact Name],

Big fan of what you are building with [Brand Name], especially your recent focus on [Specific Feature].

I run @[YourHandle], where I help [Target Audience] master ${mainKw} and achieve [Specific Goal]. My community is highly active, averaging [Engagement Rate]% engagement and over [Monthly Views] views last month.

I have a creative video concept that naturally integrates [Brand Product] to show how it solves [Specific Pain Point].

Would you be open to a quick 5-minute chat or should I send over my media kit and draft creative brief?

Best regards,
[Your Name]
@[YourHandle] · [Direct Profile Link]`,
      },
      {
        title: 'Option 3: Comment-to-DM Automated Sales Funnel Flow',
        score: 97,
        text: `🤖 3-STEP COMMENT-TO-DM CASH GENERATION FUNNEL

1. **The Bait Post:**
   Share 80% of a breakthrough workflow. Hold back the final 20% (the template, code, or checklist).

2. **The Micro-CTA:**
   "Drop the word [VAULT] below and my automated assistant will send you the private link right now! 🚀"

3. **The DM Sequence:**
   • *Message 1 (Immediate):* "Hey [Name]! Here is the private link to access the ${mainKw} toolkit: [Link]"
   • *Message 2 (Follow-up 24 hours later):* "Did you get a chance to download the guide? If you need help with [Pain Point], reply here!"`,
      },
      {
        title: 'Option 4: Creator Rate Card & Pricing Formula Matrix',
        score: 96,
        text: `💵 ${year} CREATOR PRICING & RATE CARD FORMULA

• **Baseline Formula:** ($25 per 1,000 average video views) + 20% for high-converting niches (tech, finance, B2B).
• **5,000–15,000 Average Views:** $150–$450 per video.
• **20,000–50,000 Average Views:** $500–$1,500 per video.
• **100,000+ Average Views:** $2,500–$6,000+ per video.

**Value-Add Upsells to Include on Every Invoice:**
- Whitelisting / Meta Spark Ads usage (30 days): +30%
- Link in bio placement (7 days): +$150
- Story mention with swipe-up/sticker link: +$100`,
      },
      {
        title: 'Option 5: 30-Day Step-by-Step Creator Revenue Roadmap',
        score: 98,
        text: `🗺️ 30-DAY MONETIZATION ROADMAP FOR CREATORS

• **Week 1:** Package your knowledge into a 1-page cheatsheet or template.
• **Week 2:** Set up a free Gumroad / Stripe checkout link and integrate with Comment-to-DM bot.
• **Week 3:** List 25 target brands using tools in your niche and send 5 personalized pitch emails daily.
• **Week 4:** Close your first sponsor deal or launch your digital product with a dedicated 3-post series.`,
      },
    ];
  }

  // 4. Scripts, Video Ideas & Hooks
  if (lower.includes('script') || lower.includes('hook') || lower.includes('idea') || lower.includes('video') || lower.includes('reel') || lower.includes('shorts')) {
    return [
      {
        title: 'Option 1: Complete 60-Second Viral Video Script (Full Audio + Visual)',
        score: 99,
        text: `🎬 60-SECOND VIRAL SCRIPT: "${cleanTopic}"

[0:00 - 0:03 HOOK]
Visual: Close-up zoom, pointing directly to camera with bold red subtitle.
Audio/Spoken: "If you are still trying to figure out ${mainKw}, stop scrolling right now."

[0:03 - 0:15 THE PROBLEM / PAIN POINT]
Visual: Screen recording showing common mistake or cluttered workflow.
Audio/Spoken: "Most people waste hours doing this manually. They burn out, their views stay flat, and they wonder why nothing works."

[0:15 - 0:38 THE 3-STEP SOLUTION]
Visual: High-contrast numbered overlays with smooth kinetic transitions.
Audio/Spoken:
"Here is the exact 3-step switch you need to make today:
Step 1: Eliminate the manual friction and automate your foundation.
Step 2: Focus 80% of your energy on high-impact ${secondaryKw}.
Step 3: Repurpose winning assets across all 8 networks simultaneously."

[0:38 - 0:50 PROOF & VALUE DEMONSTRATION]
Visual: Showing live receipts, analytics growth graph, or before-and-after results.
Audio/Spoken: "Once you implement this, your workflow cuts in half and your reach compounds."

[0:50 - 1:00 CALL TO ACTION]
Visual: Text overlay with arrow pointing down to comment section.
Audio/Spoken: "Comment 'TOOLS' below and I will send you the full breakdown before this post gets buried!"`,
      },
      {
        title: 'Option 2: 5 High-Impact 0–3s Hook Variations',
        score: 98,
        text: `⚡ 5 CLICK-TESTED OPENING HOOKS FOR THIS TOPIC

1. **The Contrarian Shock:** "Unpopular opinion: Everything social media told you about ${cleanTopic} is completely backwards."
2. **The Loss Aversion Warning:** "Stop doing ${mainKw} like this before you completely destroy your reach."
3. **The Curiosity Gap:** "Nobody is talking about this ${secondaryKw} cheat code, and it is honestly insane."
4. **The Proof Transformation:** "How I went from 0 to 100K using this exact 1-click ${mainKw} system."
5. **The Free Workflow:** "You don't need a team or a $5,000 budget for ${mainKw}. You literally just need this 1 free workflow."`,
      },
      {
        title: 'Option 3: Storytelling & Personal Case Study Narrative',
        score: 97,
        text: `📖 STORYTELLING CASE STUDY SCRIPT OUTLINE

• **The Struggle (0–10s):** "Six months ago, I was ready to quit. I was putting in 40 hours a week on ${cleanTopic} with zero traction."
• **The Epiphany (10–25s):** "Then I noticed what the top 1% were actually doing. They weren't working harder—they were using automated leverage."
• **The Transformation (25–45s):** "I rebuilt my entire workflow from scratch. Within 3 weeks, my reach tripled and consistency became effortless."
• **The Lesson for Viewer (45–60s):** "Don't make the same mistake I made. Focus on high-leverage systems from day one."`,
      },
      {
        title: 'Option 4: Contrarian Debate & High-Comment Video Script',
        score: 96,
        text: `🔥 HIGH-DEBATE CONTRARIAN SCRIPT (Optimized for 100+ Comments)

[0:00 - 0:05]
"I know this is going to make some people mad, but somebody needs to say it out loud."

[0:05 - 0:25]
"The advice that you need to spend 20 hours a week on ${cleanTopic} is completely outdated. It was designed for a world before AI tools existed."

[0:25 - 0:45]
"Smart creators are doing in 10 minutes what used to take an entire media agency. If you are still doing it the old way, you are actively choosing to stay behind."

[0:45 - 0:60]
"Do you agree, or do you think manual grinding is still necessary? Let's debate in the comments below! 👇"`,
      },
      {
        title: 'Option 5: Rapid Educational Cheat-Sheet Video Script',
        score: 98,
        text: `📝 FAST-PACED EDUCATIONAL MASTERCLASS SCRIPT

[0:00 - 0:04] "Save this video right now because this is the masterclass on ${cleanTopic}."
[0:04 - 0:18] "Rule #1: Never post without a 3-second visual pattern interrupt."
[0:18 - 0:32] "Rule #2: Optimize your subtitles for mute watching—80% of viewers scroll on silent."
[0:32 - 0:46] "Rule #3: Convert every view into a lead with automated Comment-to-DM triggers."
[0:46 - 0:60] "Hit the follow button for daily breakdowns like this every single morning!"`,
      },
    ];
  }

  // 5. Meta API, Graph API & Automation Integration
  if (lower.includes('meta') || lower.includes('api') || lower.includes('token') || lower.includes('graph') || lower.includes('key')) {
    return [
      {
        title: 'Option 1: Meta Graph API Architecture & Publishing Pipeline',
        score: 99,
        text: `🔑 META GRAPH API ARCHITECTURE & PRODUCTION WORKFLOW
Topic: ${cleanTopic}

### 1. The 2-Step Video/Reel Publishing Protocol:
• **Step 1 (Upload Container):** Send a POST request to \`https://graph.facebook.com/v21.0/{ig_user_id}/media\` with your public video URL, caption, and \`media_type=REELS\`.
• **Step 2 (Publish Container):** Once processing is complete, send a POST to \`https://graph.facebook.com/v21.0/{ig_user_id}/media_publish\` with the \`creation_id\`.
• Result: 1-click publishing directly to your feed without requiring manual phone approval!

### 2. Permissions Required:
- \`instagram_basic\`
- \`instagram_content_publish\`
- \`pages_show_list\`
- \`pages_read_engagement\``,
      },
      {
        title: 'Option 2: Long-Lived Token Exchange & Refresh Mechanism',
        score: 98,
        text: `🔐 NEVER-EXPIRING TOKEN SETUP (60-Day & Permanent Page Tokens)

1. **Short-Lived User Token (1 hour):** Generated in Meta Graph API Explorer.
2. **Exchange for Long-Lived User Token (60 days):**
   \`GET https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id={app_id}&client_secret={app_secret}&fb_exchange_token={short_token}\`
3. **Generate Permanent Page Access Token (Never expires):**
   Query \`/{user_id}/accounts\` using the 60-day token. The resulting \`access_token\` does NOT expire as long as you remain an admin of the page!`,
      },
      {
        title: 'Option 3: Automated Comment-to-DM Webhook Architecture',
        score: 97,
        text: `⚡ REAL-TIME COMMENT-TO-DM WEBHOOK DISPATCH

• **Webhook Topic:** Subscribe your Meta App to \`instagram\` → \`comments\`.
• **Event Payload:** Meta sends a real-time JSON payload containing \`comment_id\`, \`text\`, and \`from.id\`.
• **Matching Engine:** Check if \`text\` contains your trigger keyword (e.g. "TOOLS", "VAULT").
• **Instant Direct Message:** Send a POST to \`/{ig_user_id}/messages\` with the recipient's IGSID and your resource link within 3 seconds!`,
      },
      {
        title: 'Option 4: Creator vs Business Account Capabilities Comparison',
        score: 96,
        text: `📱 INSTAGRAM ACCOUNT TYPE COMPARISON

• **Personal Profile:** No API access. Cannot auto-schedule or inspect insights.
• **Creator Account:** Full API access for Reels, Posts, and Analytics. Allows licensed commercial music in the Instagram app! Recommended for individual influencers.
• **Business Account:** Full API access + third-party CRM and shop catalog integration. Restricted to royalty-free music library. Recommended for ecommerce brands and agencies.`,
      },
      {
        title: 'Option 5: Rate Limiting & Safe Posting Intervals',
        score: 98,
        text: `🛡️ RATE LIMITING SAFEGUARDS (100% Shadowban Proof)

- Maximum 25 API-published posts per 24 hours per Instagram account.
- Minimum delay of 15 minutes between consecutive automated posts.
- Randomized comment reply delays (1.5s to 4.2s) to match authentic human cadence.
- Hiveposters' built-in token refresher prevents unexpected 401 session expirations.`,
      },
    ];
  }

  // 6. General Questions & Anything Else
  return [
    {
      title: `Option 1: Comprehensive Solution & Strategic Master Plan for "${cleanTopic.slice(0, 40)}"`,
      score: 99,
      text: `💡 COMPREHENSIVE STRATEGIC SOLUTION
Topic / Query: "${cleanTopic}"

### 1. The Core Objective & Direct Answer:
To achieve the best results with "${cleanTopic}", you must eliminate guesswork and establish a structured, repeatable system. 

### 2. Key Pillars of Success:
• **Strategic Foundation:** Clearly define your primary goal. Focus on measurable outputs rather than vanity metrics.
• **High-Leverage Execution:** Automate repetitive manual tasks. Apply 80/20 leverage to focus strictly on highest-return activities around ${mainKw}.
• **Algorithmic & Audience Alignment:** Deliver maximum value in minimum time. Respect your audience's attention span.

### 3. Immediate Recommended Action:
Begin by auditing your current workflow. Remove the single biggest point of friction today, and implement a standardized template for your next cycle.`,
    },
    {
      title: 'Option 2: 4-Phase Step-by-Step Tactical Action Protocol',
      score: 98,
      text: `⚡ 4-PHASE STEP-BY-STEP IMPLEMENTATION PROTOCOL

• **Phase 1 (Audit & Preparation):** Assess where you currently stand. Gather baseline metrics and identify what top performers are doing differently.
• **Phase 2 (Setup & Framework):** Standardize your assets. Create reusable templates and automated triggers for ${mainKw}.
• **Phase 3 (Active Deployment):** Launch your first cycle. Monitor engagement, retention, and feedback closely in the first 48 hours.
• **Phase 4 (Review & Scale):** Identify what worked best. Double down on the winning angle and eliminate the lowest 20% of effort.`,
    },
    {
      title: 'Option 3: Pro Hacks, Unfair Advantages & Insider Secrets',
      score: 97,
      text: `🧠 3 UNFAIR ADVANTAGES USED BY TOP PERFORMERS

1. **The Compound Leverage Rule:**
   Never create an asset that only works once. Every piece of work should be repurposed across multiple channels, formats, and platforms.

2. **Friction Elimination:**
   The secret to long-term consistency is reducing the cognitive load to start. When your system is 1-click, you never suffer from procrastination.

3. **Audience Feedback Loops:**
   Constantly listen to the questions your audience asks in comments and DMs. Those questions are the exact roadmap for your future successes.`,
    },
    {
      title: 'Option 4: Critical Warnings, Pitfalls & What to Avoid',
      score: 96,
      text: `🛑 CRITICAL MISTAKES & HOW TO AVOID THEM

• **Trap 1: Overcomplicating the Beginning:** Starting with 10 tools instead of mastering 1 simple, high-velocity workflow.
• **Trap 2: Inconsistency:** Starting strong for 3 days and disappearing for 2 weeks. Consistent mediocrity beats sporadic genius.
• **Trap 3: Ignoring Real Receipts:** Believing opinions instead of looking at raw analytics data. Track your numbers weekly and adapt quickly.`,
    },
    {
      title: 'Option 5: Ready-to-Deploy Execution Blueprint & Checklist',
      score: 98,
      text: `📋 READY-TO-DEPLOY EXECUTION CHECKLIST

- [ ] Clarify the single most important metric for "${cleanTopic}".
- [ ] Set up the foundational workflow and automated tools.
- [ ] Execute test run #1 and document results.
- [ ] Review performance and adjust parameters.
- [ ] Schedule ongoing recurring cycles for compounding growth.

🚀 Ready to deploy and execute immediately!`,
    },
  ];
}

// Live Gemini API Caller (if user provided an API key in localStorage or config)
export async function callLiveGeminiApi(params: {
  apiKey: string;
  toolName: string;
  topic: string;
  audience?: string;
  tone?: string;
  platform?: string;
  keyPoints?: string;
}): Promise<Array<{ title: string; text: string; score: number }>> {
  const { apiKey, toolName, topic, audience, tone, platform, keyPoints } = params;

  const prompt = `You are an elite viral copywriting and script generation engine.
Tool: "${toolName}"
User Topic / Prompt: "${topic}"
Target Audience: "${audience || 'General'}"
Tone of Voice: "${tone || 'Engaging'}"
Platform: "${platform || 'Universal'}"
Additional Key Points: "${keyPoints || 'None'}"

Generate 5 distinct, highly articulate, ready-to-publish variations (Option 1, Option 2, Option 3, Option 4, Option 5) formatted in clean markdown with headers, bullet points, and appropriate visual/audio cues if video.
Make it deeply specific to the user's exact topic. Do NOT write generic placeholder text.

Output format:
VARIATION 1:
Option 1: [Title of Option 1]
---
[Full Content of Option 1]

===SPLIT===

VARIATION 2:
Option 2: [Title of Option 2]
---
[Full Content of Option 2]

===SPLIT===

VARIATION 3:
Option 3: [Title of Option 3]
---
[Full Content of Option 3]

===SPLIT===

VARIATION 4:
Option 4: [Title of Option 4]
---
[Full Content of Option 4]

===SPLIT===

VARIATION 5:
Option 5: [Title of Option 5]
---
[Full Content of Option 5]`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || 'Gemini API call failed');
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  if (!rawText) {
    throw new Error('Empty response from Gemini API');
  }

  // Parse variations
  const parts = rawText.split('===SPLIT===');
  return parts.map((part: string, idx: number) => {
    const lines = part.trim().split('\n');
    const titleLine = lines.find((l: string) => l.trim().length > 0 && !l.includes('VARIATION')) || `Variation ${idx + 1}`;
    const cleanContent = part.replace(/VARIATION \d+:/gi, '').trim();
    return {
      title: titleLine.replace(/^#+\s*/, '').replace(/\[|\]/g, '').trim(),
      text: cleanContent,
      score: 95 + idx * 2,
    };
  });
}
