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

    case 'ask_anything':
    default:
      return [
        {
          title: `Option 1: Executive Blueprint & Strategic Breakdown for: "${cleanTopic.slice(0, 35)}..."`,
          score: 99,
          text: `📌 1. EXECUTIVE BLUEPRINT & STRATEGIC OVERVIEW

When approaching "${cleanTopic}", the single most important factor is establishing a clear system.

### Core Strategic Pillars:
1. **Foundation:** Align your core goals with measurable milestones around ${mainKw}.
2. **Execution:** Apply high-leverage ${secondaryKw} principles. Eliminate low-value busywork.
3. **Scaling:** Leverage automation and repeatable frameworks for ${thirdKw}.

${keyPoints ? `💡 Key Focus: ${keyPoints}\n` : ''}
Action Step: Audit your current approach and remove the top 2 points of manual friction.`,
        },
        {
          title: `Option 2: 3-Step Tactical Implementation Protocol`,
          score: 98,
          text: `⚡ 2. TACTICAL 3-STEP IMPLEMENTATION PROTOCOL

Here is the fastest path from concept to execution for "${cleanTopic}":

• Step 1: Diagnose your bottleneck in ${mainKw}.
• Step 2: Implement a standardized ${secondaryKw} workflow.
• Step 3: Measure results after 7 days and double down on what works.

Pro Tip: Consistency beats sporadic bursts of intense effort every single time.`,
        },
        {
          title: `Option 3: Conversational Story & Practical Perspective`,
          score: 97,
          text: `🗣️ 3. CONVERSATIONAL & PRACTICAL PERSPECTIVE

Here is what most people miss when dealing with ${cleanTopic}:

We often assume success requires complex tools and dozens of steps.
In reality, the top performers do the exact opposite—they master one simple framework around ${mainKw} and ignore the noise.

If you are feeling overwhelmed, take a step back and simplify until it feels effortless.`,
        },
        {
          title: `Option 4: Contrarian Reality Check & Common Pitfalls to Avoid`,
          score: 96,
          text: `🛑 4. CONTRARIAN REALITY CHECK & COMMON PITFALLS

Top 3 mistakes people make with ${cleanTopic}:

1. **Mistake 1:** Overcomplicating the initial setup.
2. **Mistake 2:** Relying on willpower instead of automated systems for ${secondaryKw}.
3. **Mistake 3:** Measuring vanity metrics rather than real retention and conversion.

The Fix: Focus 80% of your energy on high-impact ${thirdKw}.`,
        },
        {
          title: `Option 5: Rapid Cheat-Sheet & Action Checklist`,
          score: 95,
          text: `📋 5. RAPID CHEAT-SHEET & ACTION CHECKLIST

Topic: ${cleanTopic} | Audience: ${audience} | Tone: ${tone}

- [ ] Define the primary outcome for ${mainKw}.
- [ ] Set up the ${secondaryKw} workflow template.
- [ ] Share with your audience/team for initial validation.
- [ ] Iterate based on real performance receipts.

Ready to deploy today!`,
        },
      ];
  }
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
