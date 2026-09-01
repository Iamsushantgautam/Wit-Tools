import pointingImg from './preview-chatgpt-images/pointing_thumbnail.webp';
import bigfaceImg from './preview-chatgpt-images/bigface_thumbnail.webp';
import conceptImg from './preview-chatgpt-images/concept_thumbnail.webp';
import variationsImg from './preview-chatgpt-images/variations_thumbnail.webp';
import pptImg from './preview-chatgpt-images/ppt_thumbnail.png';
import marketingImg from './preview-chatgpt-images/marketing_thumbnail.png';
import carouselImg from './preview-chatgpt-images/carousel_thumbnail.png';

export const CHATGPT_CATEGORIES = [
  {
    id: 'all',
    name: 'All Secret Codes',
    icon: 'Sparkles',
    count: 21,
    color: '#6366f1',
    bgGradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    description: 'Master collection of 21 battle-tested ChatGPT slash commands.'
  },
  {
    id: 'content',
    name: 'Content Creation',
    icon: 'FileText',
    count: 4,
    color: '#06b6d4',
    bgGradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    description: 'Generate high-intent ideas, hooks, humanized text, and multi-platform content.',
    previewImage: carouselImg
  },
  {
    id: 'carousel',
    name: 'Carousel Creation',
    icon: 'Layers',
    count: 4,
    color: '#8b5cf6',
    bgGradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    description: 'Design slide-by-slide copy, story arcs, 4:5 visual layouts, and clean slop-free design.',
    previewImage: carouselImg
  },
  {
    id: 'marketing',
    name: 'Marketing Strategy',
    icon: 'Megaphone',
    count: 5,
    color: '#10b981',
    bgGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    description: 'Build complete campaign plans, growth strategy, customer personas, and funnels.',
    previewImage: marketingImg
  },
  {
    id: 'ppt',
    name: 'PPT & Slides',
    icon: 'Presentation',
    count: 4,
    color: '#3b82f6',
    bgGradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
    description: 'Turn text into 16:9 slide decks, executive summaries, data visuals, and outlines.',
    previewImage: pptImg
  },
  {
    id: 'thumbnail',
    name: 'Thumbnail Creation',
    icon: 'Image',
    count: 4,
    color: '#f59e0b',
    bgGradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    description: 'Craft high-CTR YouTube thumbnail prompts for pointing, face-led, concept & A/B testing.',
    previewImage: pointingImg
  }
];

export const CHATGPT_CODES = [
  // --- CONTENT CREATION (10-13 in prompt numbering) ---
  {
    id: 'contentideas',
    code: '/contentideas',
    number: 10,
    title: 'Content Topics Generator',
    category: 'content',
    categoryName: 'Content Creation',
    color: '#06b6d4',
    imageUrl: carouselImg,
    shortDesc: 'Use this when you need relevant content topics for your niche based on persona, pain points, and search intent.',
    fullDesc: 'Instead of generic suggestions, ChatGPT generates laser-focused topic matrices based on audience type, pain points, goals, platform, search intent, and format.',
    bestFor: ['Creators', 'Marketers', 'Founders', 'Educators', 'Consultants'],
    parameters: [
      { key: 'niche', label: 'Your Niche / Industry', placeholder: 'e.g. B2B SaaS Growth' },
      { key: 'audience', label: 'Target Audience', placeholder: 'e.g. Bootstrapped Founders' },
      { key: 'platform', label: 'Target Platform', placeholder: 'e.g. LinkedIn / YouTube' },
      { key: 'goal', label: 'Primary Goal', placeholder: 'e.g. Lead Generation & Authority' }
    ],
    promptTemplate: `Act as a master content strategist. Generate 10 high-performing content ideas for the [niche] niche, specifically targeted at [audience]. The main goal is [goal] on [platform].

For each idea, provide:
1. Catchy Working Title
2. Primary Search Intent & Audience Pain Point addressed
3. Best Content Format (e.g. How-to Guide, Step-by-step Framework, Case Study)
4. Key Takeaway & Reader Outcome`,
    sampleOutput: `1. Title: "5 Silent Onboarding Mistakes Killing Your SaaS Trial Conversions"
- Search Intent: Troubleshooting low trial-to-paid conversion rates.
- Format: Step-by-Step Diagnostic Framework.
- Reader Outcome: Actionable checklist to fix churn points within 24 hours.`
  },

  {
    id: 'viralangles',
    code: '/viralangles',
    number: 11,
    title: 'Hook & Angle Switcher',
    category: 'content',
    categoryName: 'Content Creation',
    color: '#06b6d4',
    imageUrl: carouselImg,
    shortDesc: 'Package one core topic into multiple psychological angles to improve reach and prevent repetitive posts.',
    fullDesc: 'One topic can be packaged in many different ways. This command helps you find stronger hooks and fresh angles around the same subject.',
    bestFor: ['Improving reach', 'Making content less repetitive', 'Strengthening hooks'],
    parameters: [
      { key: 'topic', label: 'Core Subject / Topic', placeholder: 'e.g. Cold Email Outreach' },
      { key: 'platform', label: 'Target Platform', placeholder: 'e.g. X / Twitter, LinkedIn' }
    ],
    promptTemplate: `I have a core topic: "[topic]". Transform this single topic into 7 distinct psychological angles for [platform]:

1. Myth vs. Reality Angle
2. Top 3 Costly Mistakes People Make
3. Beginner-Friendly 5-Step Framework
4. Unpopular / Contrarian Opinion Angle
5. Real-World Case Study Angle
6. Side-by-Side Comparison Angle
7. Cautionary Story / Before & After Angle

For each angle, write a compelling, high-scroll-stop hook line.`,
    sampleOutput: `• Myth vs Reality Hook: "Stop spending 4 hours writing personalized cold emails. Here is what prospect CEOs actually read in 2026."
• Unpopular Opinion Hook: "Most cold email templates fail because you are asking for a 30-min call on message #1. Do this instead."`
  },

  {
    id: 'humanise',
    code: '/humanise',
    number: 12,
    title: 'AI-to-Human Tone Rewriter',
    category: 'content',
    categoryName: 'Content Creation',
    color: '#06b6d4',
    imageUrl: carouselImg,
    shortDesc: 'Rewrite generic or robotic AI output into natural, conversational, and authentic human language.',
    fullDesc: 'A lot of AI-generated content sounds too polished, robotic, or generic. This command helps rewrite the output into language that feels warm, punchy, and human.',
    bestFor: ['Captions', 'Scripts', 'Social Posts', 'Emails', 'Website Copy'],
    parameters: [
      { key: 'text', label: 'Robotic Text to Humanize', placeholder: 'Paste your raw AI generated draft here...' },
      { key: 'tone', label: 'Target Tone', placeholder: 'e.g. Conversational, Punchy, Casual Expert' }
    ],
    promptTemplate: `Rewrite the following text so it sounds completely human, conversational, and authentic.

Rules:
- Remove generic AI buzzwords (e.g. "delve", "game-changer", "unleash", "in today's digital landscape", "testament").
- Use varied sentence lengths and natural conversational cadence.
- Adopt a [tone] voice.
- Keep the core value points intact, but write like a seasoned human creator talking to a colleague.

Text to rewrite:
"[text]"`,
    sampleOutput: `Original: "In today's fast-paced world, it is vital to leverage automation to unleash productivity."
Humanized: "If you're still doing manual data entry in 2026, you're burning time you could spend closing deals. Here's a quick fix."`
  },

  {
    id: 'repurpose',
    code: '/repurpose',
    number: 13,
    title: 'Multi-Format Content Repurposer',
    category: 'content',
    categoryName: 'Content Creation',
    color: '#06b6d4',
    imageUrl: carouselImg,
    shortDesc: 'Turn one idea or article into multiple ready-to-publish formats like carousels, reels, posts, and threads.',
    fullDesc: 'This is a big time saver. Turn one core idea or long document into Instagram carousels, reel scripts, LinkedIn posts, X threads, blog posts, and newsletter snippets.',
    bestFor: ['Multi-channel strategy', 'Saving time', 'Content distribution'],
    parameters: [
      { key: 'source', label: 'Source Content / Core Idea', placeholder: 'Paste transcript, article outline, or key points...' }
    ],
    promptTemplate: `Take this core content piece: "[source]" and repurpose it into the following 7 ready-to-publish formats:

1. 5-Slide Instagram Carousel Outline (Headline + 1 core point per slide)
2. 30-Second Short/Reel Script (Audio hook + visual cues)
3. LinkedIn Long-Form Post (Spaced paragraphs + strong call to action)
4. X / Twitter Thread (5 punchy tweets)
5. SEO Blog Sub-Section (Header + structured bullet points)
6. Newsletter Highlight Snippet (Subject line + body hook)
7. YouTube Video Outline (Timestamps + slide beats)`,
    sampleOutput: `[Carousel Slide 1] Hook: "How to 10x your writing speed with AI (Without looking like a bot)"
[Reel Script] Visual: Fast cut of laptop screen. Voiceover: "If you spend more than 2 hours writing a blog..."`
  },

  // --- CAROUSEL CREATION (18-21 in prompt numbering) ---
  {
    id: 'carousel',
    code: '/carousel',
    number: 18,
    title: 'Slide-by-Slide Carousel Script',
    category: 'carousel',
    categoryName: 'Carousel Creation',
    color: '#8b5cf6',
    imageUrl: carouselImg,
    shortDesc: 'Turn an article, rough notes, or transcript into clear, digestible slide-by-slide carousel copy.',
    fullDesc: 'Use this when you want to turn an article, rough notes, transcript, or topic into a slide-by-slide carousel. It helps break information into bite-sized, high-retention chunks.',
    bestFor: ['Educational posts', 'Actionable tips', 'Frameworks', 'Process breakdowns'],
    parameters: [
      { key: 'notes', label: 'Raw Notes / Topic', placeholder: 'Enter your raw notes or main topic...' },
      { key: 'slideCount', label: 'Desired Slide Count', placeholder: 'e.g. 7 slides' },
      { key: 'cta', label: 'Final Slide Call-to-Action', placeholder: 'e.g. Save this post & Follow @user' }
    ],
    promptTemplate: `Turn the following content into a high-converting [slideCount]-slide carousel script about "[notes]".

Formatting rules:
- Slide 1 (Hook): Eye-catching main title + curiosity sub-headline + "Swipe Left ➔" tag.
- Slides 2 to [slideCount-1]: Single focused point per slide. Max 25 words per slide. Bold key actionable words.
- Final Slide: Summary key takeaway + CTA: "[cta]".`,
    sampleOutput: `Slide 1: "The 5-Step Pitch Deck Framework That Raised $2M"
Slide 2: "1. The Problem Slide: Keep it to 1 sentence. Make the pain undeniable."
Final Slide: "Found this helpful? Bookmark this carousel and share with a founder."`
  },

  {
    id: 'storycarousel',
    code: '/storycarousel',
    number: 19,
    title: 'Narrative Story Carousel',
    category: 'carousel',
    categoryName: 'Carousel Creation',
    color: '#8b5cf6',
    imageUrl: carouselImg,
    shortDesc: 'Structure your carousel post in a compelling story arc: Hook ➔ Problem ➔ Tension ➔ Insight ➔ Solution ➔ CTA.',
    fullDesc: 'Not every carousel should feel like a simple list. This command helps structure your post in a narrative story flow that builds tension and drives high swipe completion.',
    bestFor: ['Narrative content', 'Founder stories', 'Personal lessons', 'Persuasive carousels'],
    parameters: [
      { key: 'story', label: 'Lesson / Story Summary', placeholder: 'e.g. How I lost my first 3 clients and fixed my onboarding' }
    ],
    promptTemplate: `Structure a story-led carousel script based on this story/lesson: "[story]".

Follow this exact narrative arc across the slides:
Slide 1: Hook (High emotion / dramatic stakes)
Slide 2: The Problem (What went wrong)
Slide 3: The Tension (Why standard advice failed)
Slide 4: The Epiphany Insight (The turning point)
Slide 5: The Step-by-Step Solution Framework
Slide 6: Key Takeaway Lesson
Slide 7: CTA (Engage / Comment / Share)`,
    sampleOutput: `Slide 1: "I lost $15,000 in monthly revenue in 48 hours. Here is what nobody tells you about agency client retention..."`
  },

  {
    id: 'designcarousel',
    code: '/designcarousel',
    number: 20,
    title: 'Visual Carousel Layout Specs',
    category: 'carousel',
    categoryName: 'Carousel Creation',
    color: '#8b5cf6',
    imageUrl: carouselImg,
    shortDesc: 'Turn carousel copy into visual design directions for 4:5 canvas layouts, font hierarchy, and slide consistency.',
    fullDesc: 'Once the copy is ready, this helps turn content into precise visual carousel slide directions including layout style, visual hierarchy, spacing, typography, and slide continuity.',
    bestFor: ['Instagram carousels', 'LinkedIn carousels', 'Figma/Canva design workflows'],
    parameters: [
      { key: 'copy', label: 'Carousel Copy Draft', placeholder: 'Paste your slide text here...' },
      { key: 'theme', label: 'Brand Color Vibe', placeholder: 'e.g. Dark mode neon, Clean minimal white, Modern pastel' }
    ],
    promptTemplate: `Acts as a senior visual designer. Take this carousel text copy and output visual slide directions for a 4:5 vertical design canvas ([theme] theme):

Provide for each slide:
1. Visual Hierarchy: Heading size, body size, accent element placement.
2. Layout Arrangement: Text alignment, margin padding, card box containers.
3. Visual Anchor / Graphics: Icons, numbers, connecting lines, or slide-spanning background elements.
4. Continuous Swipe Prompt: Placement of subtle arrows or continuous graphics connecting adjacent slides.

Carousel Text Copy:
"[copy]"`,
    sampleOutput: `Slide 1 Specs:
• Canvas: Deep Navy #0F172A with a subtle top-right radial glow.
• Headline: 72pt Extra Bold Sans, White.
• Visual Anchor: Floating 3D frosted glass card holding the sub-headline.`
  },

  {
    id: 'noslop',
    code: '/noslop',
    number: 21,
    title: 'Clean AI Visual & Copy Sanitizer',
    category: 'carousel',
    categoryName: 'Carousel Creation',
    color: '#8b5cf6',
    imageUrl: carouselImg,
    shortDesc: 'Cleanup command to remove generic AI aesthetics, random gradients, filler copy, and design noise.',
    fullDesc: 'This is a cleanup command. It tells ChatGPT to avoid generic AI aesthetics like random gradients, cluttered layouts, filler copy, repeated icons, fake UI cards, and unnecessary design noise.',
    bestFor: ['Polished design output', 'High-signal copy', 'Clean minimalist UI'],
    parameters: [
      { key: 'draft', label: 'Draft Copy or Design Spec', placeholder: 'Paste your draft copy or visual description to clean up...' }
    ],
    promptTemplate: `Audit and sanitize the following copy/design draft to eliminate all generic "AI slop":

Strict Rules:
1. Strip away fluffy filler text, vague buzzwords, and redundant intro/outro sentences.
2. Remove generic design noise: random floating gradients, excessive decorative icons, fake UI boxes, and cluttered badges.
3. Enforce high visual contrast, generous whitespace, clear typography scales, and high-density actionable advice.
4. Ensure every element serves a direct functional or narrative purpose.

Draft to sanitize:
"[draft]"`,
    sampleOutput: `Sanitized Version: Replaced vague "Revolutionize your workflow with state-of-the-art AI" with "Cut blog production time from 4 hours to 35 minutes using 3 prompt templates."`
  },

  // --- MARKETING STRATEGY (1-5 in marketing category) ---
  {
    id: 'campaignplan',
    code: '/campaignplan',
    number: 1,
    title: 'Complete Marketing Campaign Builder',
    category: 'marketing',
    categoryName: 'Marketing Strategy',
    color: '#10b981',
    imageUrl: marketingImg,
    shortDesc: 'Architect a full marketing campaign from core message pillars to execution timelines and conversion metrics.',
    fullDesc: 'Build a complete, structured marketing campaign plan covering messaging pillars, pre-launch teasers, launch assets, retargeting tactics, and target KPIs.',
    bestFor: ['Product launches', 'Seasonal promotions', 'Brand awareness campaigns'],
    parameters: [
      { key: 'product', label: 'Product / Service', placeholder: 'e.g. AI Content Repurposing Tool' },
      { key: 'duration', label: 'Campaign Duration', placeholder: 'e.g. 30-Day Launch Campaign' },
      { key: 'budget', label: 'Scale / Budget', placeholder: 'e.g. Organic + $2,000 Ad Budget' }
    ],
    promptTemplate: `Build a complete end-to-end marketing campaign strategy for "[product]" over a [duration] period ([budget]).

Include:
1. Campaign Objective & Core Unique Value Proposition (UVP)
2. 3 Core Campaign Messaging Pillars
3. Pre-Launch Teaser Phase Strategy (Social teasers, lead magnets)
4. Official Launch Day Blast (Email sequence, ad hooks, social posts)
5. Post-Launch Retargeting & Nurture Strategy
6. KPI Tracking Matrix (CTR, CAC, Conversion Rate targets)`,
    sampleOutput: `Campaign Pillar 1: "Save 15 hours/week on content creation"
Pre-Launch: Free PDF guide "The 2026 Content Multiplication Playbook" to build email waiting list.`
  },

  {
    id: 'marketingstrategy',
    code: '/marketingstrategy',
    number: 2,
    title: 'Practical Growth Strategy',
    category: 'marketing',
    categoryName: 'Marketing Strategy',
    color: '#10b981',
    imageUrl: marketingImg,
    shortDesc: 'Create an actionable growth plan with acquisition channels, retention loops, and key metrics.',
    fullDesc: 'Develop a practical, metric-driven growth strategy tailored to your business model, scale, and customer acquisition channels.',
    bestFor: ['Founders', 'Growth marketers', 'Business consultants'],
    parameters: [
      { key: 'business', label: 'Business Model / Niche', placeholder: 'e.g. B2B E-commerce Analytics' },
      { key: 'stage', label: 'Current Stage / Revenue', placeholder: 'e.g. $10k MRR looking to hit $50k' }
    ],
    promptTemplate: `Develop a high-impact, practical 90-day growth strategy for a [business] business currently at [stage].

Focus areas:
- Top 2 High-ROI Customer Acquisition Channels
- Low-Hanging Fruit Conversion Rate Optimization (CRO) improvements
- Customer Retention & Referral Loops to reduce churn
- Weekly Operational Execution Plan`,
    sampleOutput: `Channel 1: LinkedIn Executive Thought Leadership targeting VP of Marketing.
Retention Loop: Automated post-purchase 14-day onboarding check-in sequence with video loom breakdown.`
  },

  {
    id: 'audiencepersona',
    code: '/audiencepersona',
    number: 3,
    title: 'Ideal Customer Persona (ICP) Map',
    category: 'marketing',
    categoryName: 'Marketing Strategy',
    color: '#10b981',
    imageUrl: marketingImg,
    shortDesc: 'Define your target customer profile with deep psychographics, core pain points, and buying triggers.',
    fullDesc: 'Map out your ideal customer persona in detail, uncovering their emotional frustrations, buying triggers, objections, and exact language.',
    bestFor: ['Ad copy targeting', 'Landing page copy', 'Product positioning'],
    parameters: [
      { key: 'offer', label: 'Your Offer / Product', placeholder: 'e.g. High-Ticket Executive Coaching' },
      { key: 'target', label: 'Target Market', placeholder: 'e.g. Mid-stage Startup Founders' }
    ],
    promptTemplate: `Build a comprehensive Ideal Customer Persona (ICP) profile for [offer] targeting [target].

Detail:
1. Demographic & Professional Overview
2. Top 3 Pain Points (Their biggest daily headaches)
3. 3 Core Desired Outcomes & Dreams
4. Key Buying Objections & Objections Counter-Arguments
5. Specific Search Phrases & Keywords they use when seeking solutions`,
    sampleOutput: `Pain Point: "I'm working 70 hours a week and my team still relies on me for every minor decision."
Buying Trigger: "Failed a key launch due to operational bottlenecks."`
  },

  {
    id: 'contentfunnel',
    code: '/contentfunnel',
    number: 4,
    title: 'Full-Funnel Content Mapping',
    category: 'marketing',
    categoryName: 'Marketing Strategy',
    color: '#10b981',
    imageUrl: marketingImg,
    shortDesc: 'Map content pieces across TOFU (Awareness), MOFU (Consideration), and BOFU (Conversion) stages.',
    fullDesc: 'Map content across the full buyer journey from top-of-funnel viral reach to bottom-of-funnel high-intent conversion content.',
    bestFor: ['Inbound marketing', 'Sales funnels', 'Lead generation'],
    parameters: [
      { key: 'niche', label: 'Product Niche', placeholder: 'e.g. Personal Finance App' }
    ],
    promptTemplate: `Map out a 3-tier content funnel for [niche]:

1. TOFU (Top of Funnel - Awareness): 3 viral broad-appeal educational topic angles to capture traffic.
2. MOFU (Middle of Funnel - Consideration): 3 problem-aware solution frameworks that introduce our product as the logical tool.
3. BOFU (Bottom of Funnel - Conversion): 3 high-intent comparison & case study angles that close prospective buyers.`,
    sampleOutput: `TOFU: "Why 80% of budget spreadsheets fail within 30 days"
MOFU: "Manual tracking vs Automated sync: How Sarah saved 4 hours every month"
BOFU: "[App Name] vs Mint: Why 10,000 users switched this year"`
  },

  {
    id: 'competitoraudit',
    code: '/competitoraudit',
    number: 5,
    title: 'Competitor Gap & Opportunity Audit',
    category: 'marketing',
    categoryName: 'Marketing Strategy',
    color: '#10b981',
    imageUrl: marketingImg,
    shortDesc: 'Analyze competitor positioning to find messaging gaps, unmet audience needs, and growth opportunities.',
    fullDesc: 'Examine competitor messaging, value propositions, and customer complaints to discover untapped market opportunities.',
    bestFor: ['Market positioning', 'Differentiation strategy', 'Ad copy angles'],
    parameters: [
      { key: 'myProduct', label: 'Your Brand / Product', placeholder: 'e.g. Wit Tools' },
      { key: 'competitors', label: 'Top Competitors', placeholder: 'e.g. Canva, Smallpdf, TinyWow' }
    ],
    promptTemplate: `Perform a strategic competitor positioning audit comparing [myProduct] against top competitors ([competitors]).

Identify:
1. Competitor Messaging Weaknesses & Overused Cliches
2. Common Customer Complaints & Unmet Needs
3. 3 Unclaimed Positioning White-Spaces in the market
4. Actionable positioning statements to out-differentiate competitors`,
    sampleOutput: `White-Space Identified: Competitors require paid accounts for high-res PDF compression. Positioning: "100% Free local browser compression with zero file uploads."`
  },

  // --- PPT & SLIDES (14-17 in PPT category) ---
  {
    id: 'presentation',
    code: '/presentation',
    number: 14,
    title: 'Slide-by-Slide PPT Outline & Script',
    category: 'ppt',
    categoryName: 'PPT & Slides',
    color: '#3b82f6',
    imageUrl: pptImg,
    shortDesc: 'Turn articles, documents, or raw outlines into a structured slide-by-slide presentation deck.',
    fullDesc: 'Turn raw text, articles, project briefs, or meeting notes into a complete slide-by-slide presentation outline with speaker notes and visual cues.',
    bestFor: ['Pitch decks', 'Client presentations', 'Lectures', 'Team updates'],
    parameters: [
      { key: 'topic', label: 'Presentation Subject', placeholder: 'e.g. Q3 Sales Performance Review' },
      { key: 'slides', label: 'Slide Count', placeholder: 'e.g. 8 slides' },
      { key: 'audience', label: 'Target Audience', placeholder: 'e.g. Board Members & Stakeholders' }
    ],
    promptTemplate: `Convert the following info into a [slides]-slide presentation deck for [audience] on "[topic]":

For each slide, provide:
- Slide Title
- 3 Concise Bullet Points (Max 12 words per bullet)
- Speaker Talking Points Script
- Visual Layout & Graphic Recommendation`,
    sampleOutput: `Slide 1: "Q3 Financial Growth Snapshot"
Bullets:
- Revenue up 34% YoY to $1.2M.
- Net Churn decreased from 4.1% to 1.8%.
- Customer Acquisition Cost (CAC) down 15%.`
  },

  {
    id: 'designslides',
    code: '/designslides',
    number: 15,
    title: '16:9 Visual Slide Design Direction',
    category: 'ppt',
    categoryName: 'PPT & Slides',
    color: '#3b82f6',
    imageUrl: pptImg,
    shortDesc: 'Design polished 16:9 slide visual layouts, color palettes, card grids, and font hierarchy.',
    fullDesc: 'Turn presentation text into visual slide layout directions for high-impact 16:9 decks, specifying color schemes, grid systems, and data callout styling.',
    bestFor: ['High-stakes presentations', 'Investor pitch decks', 'Design agency decks'],
    parameters: [
      { key: 'deckContent', label: 'Slide Copy / Topic', placeholder: 'Paste slide copy or deck outline...' },
      { key: 'vibe', label: 'Visual Style Vibe', placeholder: 'e.g. Minimalist Apple Style, Corporate Dark Mode, Modern Fintech' }
    ],
    promptTemplate: `Act as a senior presentation designer. Create 16:9 visual design specs for this deck ([vibe] theme):

Specify:
1. Color Palette: Background, Card Containers, Accent Highlight, Text.
2. Grid Layout & Card Alignment per slide (2-column split, 4-card matrix, timeline stack).
3. Font Scaling Rules (Header vs Metric Big Numbers vs Subtext).
4. Custom Visual Elements (Glassmorphic cards, data callout pills, sleek dividers).

Slide Copy:
"[deckContent]"`,
    sampleOutput: `Slide 2 Layout: 2x2 Matrix Grid with light grey border strokes (#E2E8F0). Top left box highlights the main metric in 80pt bold blue (#2563EB).`
  },

  {
    id: 'visualise',
    code: '/visualise',
    number: 16,
    title: 'Data & Concept Chart Visualizer',
    category: 'ppt',
    categoryName: 'PPT & Slides',
    color: '#3b82f6',
    imageUrl: pptImg,
    shortDesc: 'Turn complex numbers, stats, or abstract ideas into clear charts, diagrams, and visual graphics.',
    fullDesc: 'Transform text data, revenue statistics, or complex multi-step processes into visual chart recommendations, infographic layouts, and clear comparison tables.',
    bestFor: ['Data storytelling', 'Executive reports', 'Infographics'],
    parameters: [
      { key: 'rawInfo', label: 'Raw Data / Complex Concept', placeholder: 'Paste stats, process steps, or comparison points...' }
    ],
    promptTemplate: `Translate this complex information into visual diagrams, charts, and infographics: "[rawInfo]"

Output:
1. Best Diagram Format (e.g. Donut Chart, Flowchart Diagram, 2x2 Feature Matrix, Funnel Diagram).
2. Data Labels & Color Coding scheme for quick readability.
3. ASCII / Structured visual draft of how to present this on a slide.`,
    sampleOutput: `Recommended Format: 3-Stage Horizontal Process Arrow Flow with icon badges above each step.`
  },

  {
    id: 'executivedeck',
    code: '/executivedeck',
    number: 17,
    title: 'Executive Leadership Deck Specialist',
    category: 'ppt',
    categoryName: 'PPT & Slides',
    color: '#3b82f6',
    imageUrl: pptImg,
    shortDesc: 'Create a concise, high-impact leadership deck focusing on executive summary, KPIs, ROI, and next steps.',
    fullDesc: 'Build high-signal executive decks tailored for C-suite decision makers, focusing on high-level strategic wins, financial metrics, and clear actionable takeaways.',
    bestFor: ['Executive updates', 'Board meetings', 'Stakeholder reports'],
    parameters: [
      { key: 'project', label: 'Project Name / Topic', placeholder: 'e.g. Infrastructure Cloud Migration' },
      { key: 'metrics', label: 'Key Metrics / Results', placeholder: 'e.g. Saved $120k annually, 99.99% uptime' },
      { key: 'ask', label: 'Executive Ask / Next Step', placeholder: 'e.g. Budget approval for Phase 2' }
    ],
    promptTemplate: `Create a concise 5-slide Executive Leadership Deck for senior management regarding "[project]":

Slide 1: Executive Summary & Strategic Context
Slide 2: Performance Snapshot & Metrics ([metrics])
Slide 3: Strategic ROI & Financial Business Case
Slide 4: Key Risks, Mitigations & Timeline
Slide 5: Executive Recommendation & Immediate Next Steps ([ask])

Keep all text ultra-concise, high-impact, and metric-first.`,
    sampleOutput: `Slide 1 Headline: "Phase 1 Migration Complete: Annual Server Cost Reduced by 42%"`
  },

  // --- THUMBNAIL CREATION (18-21 in thumbnail category) ---
  {
    id: 'pointingthumbnail',
    code: '/pointingthumbnail',
    number: 18,
    title: 'Pointing Pose YouTube Thumbnail Prompt',
    category: 'thumbnail',
    categoryName: 'Thumbnail Creation',
    color: '#f59e0b',
    imageUrl: pointingImg,
    shortDesc: 'Create a pointing-style high-CTR YouTube thumbnail direction with bold text, subject framing, and lighting.',
    fullDesc: 'Generate a detailed visual direction and AI image prompt for a classic pointing-style YouTube thumbnail that grabs immediate viewer attention in feeds.',
    bestFor: ['YouTube tutorials', 'Product reveals', 'High CTR covers'],
    parameters: [
      { key: 'title', label: 'Video Title / Topic', placeholder: 'e.g. 21 ChatGPT Secret Codes You Never Knew' },
      { key: 'emotion', label: 'Facial Expression', placeholder: 'e.g. Excited, Shocked, Smiling' }
    ],
    promptTemplate: `Create a detailed visual composition and AI image generation prompt for a high-CTR YouTube thumbnail for a video titled "[title]":

- Subject: Cutout of a person with an [emotion] facial expression on the left side, pointing right toward a glowing 3D card/box.
- Text Overlay: 3 words max ("SECRET CODES!"), bold neon font with thick outer drop shadow.
- Background: Dark textured tech backdrop with blue/cyan radial light glow behind subject.
- Lighting: High contrast rim lighting highlighting subject outline.`,
    sampleOutput: `Prompt: "Hyper-realistic portrait of an excited young professional pointing right at a glowing neon green 3D ChatGPT icon floating on the right side. Cinematic lighting, studio depth of field."`
  },

  {
    id: 'bigfacethumbnail',
    code: '/bigfacethumbnail',
    number: 19,
    title: 'Bold Face-Led Thumbnail Design',
    category: 'thumbnail',
    categoryName: 'Thumbnail Creation',
    color: '#f59e0b',
    imageUrl: bigfaceImg,
    shortDesc: 'Create a bold, face-focused thumbnail prompt with expressive emotion and high visual impact.',
    fullDesc: 'Craft a high-click-through face-led thumbnail layout focusing on strong facial emotion, clean subject cutout, and punchy high-contrast typography.',
    bestFor: ['Reaction videos', 'Personal branding', 'Vlogs', 'High engagement covers'],
    parameters: [
      { key: 'topic', label: 'Video Topic', placeholder: 'e.g. I Tested 50 AI Tools For 30 Days' },
      { key: 'expression', label: 'Emotion / Expression', placeholder: 'e.g. Shocked eyes wide open, Mind blown' }
    ],
    promptTemplate: `Design a bold face-led YouTube thumbnail concept for "[topic]":

- Subject Framing: Close-up cutout of a face with [expression] expression filling 50% of the right frame.
- Visual Element: Left side features a dramatic split-screen or floating glowing badge.
- Text Overlay: 2 words maximum ("AI SECRET!"), ultra-bold yellow/white font.
- Color Scheme: Electric purple background gradient with high contrast subject lighting.`,
    sampleOutput: `Text: "STOP THIS!" in bright yellow bold lettering next to a shocked face with wide eyes looking directly at the viewer.`
  },

  {
    id: 'conceptthumbnail',
    code: '/conceptthumbnail',
    number: 20,
    title: 'High-Concept Visual Thumbnail Prompt',
    category: 'thumbnail',
    categoryName: 'Thumbnail Creation',
    color: '#f59e0b',
    imageUrl: conceptImg,
    shortDesc: 'Visualise one strong high-concept thumbnail idea using glowing objects, mystery boxes, or symbols.',
    fullDesc: 'Formulate a mysterious, high-concept thumbnail concept featuring floating 3D objects, glowing treasure chests, or high-end visual metaphors that spark intense curiosity.',
    bestFor: ['Tech deep dives', 'Secret reveals', 'Educational explainers'],
    parameters: [
      { key: 'secretTopic', label: 'Secret / Subject', placeholder: 'e.g. Unlock ChatGPT Hidden Power' },
      { key: 'symbol', label: 'Core Visual Symbol', placeholder: 'e.g. Glowing cyber box opening up' }
    ],
    promptTemplate: `Develop a high-concept visual thumbnail composition for "[secretTopic]":

- Centerpiece: A glowing 3D [symbol] floating in the center, casting bright cyan light beams into a dark room.
- Text Overlay: "UNLOCK THIS" in bold metallic 3D font.
- Atmosphere: Cinematic volumetric fog, dark contrast background, neon rim highlights.
- Goal: Create maximum intrigue and curiosity without feeling cluttered.`,
    sampleOutput: `Visual: A matte black mystery box sitting slightly open on a reflective dark desk, emitting blinding neon green light rays.`
  },

  {
    id: 'thumbnailvariations',
    code: '/thumbnailvariations',
    number: 21,
    title: 'A/B Testing Thumbnail Suite',
    category: 'thumbnail',
    categoryName: 'Thumbnail Creation',
    color: '#f59e0b',
    imageUrl: variationsImg,
    shortDesc: 'Generate multiple distinct thumbnail creative concepts for split-testing video covers to maximize CTR.',
    fullDesc: 'Create 4 distinct thumbnail variations (Face-focused, Minimalist symbol, Before/After split, Curiosity warning) to run A/B split tests on YouTube.',
    bestFor: ['YouTube channel growth', 'A/B testing covers', 'Optimizing CTR'],
    parameters: [
      { key: 'concept', label: 'Video Concept / Title', placeholder: 'e.g. How To Build A $10k/mo Agency With AI' }
    ],
    promptTemplate: `Generate 4 distinct thumbnail creative concepts for A/B testing a video titled "[concept]":

Variant A (Face-Led): Expressive face close-up + 2-word hook text.
Variant B (Minimal Symbol): Floating 3D icon centerpiece with neon backlight and zero text.
Variant C (Before vs After): Split screen showing failure vs massive success.
Variant D (Curiosity Warning): Red warning banner + mysterious glowing box.

For each variant, provide the image prompt and exact text overlay.`,
    sampleOutput: `Variant C Prompt: Left side dark blurred screen with red text "0 VIEWS". Right side bright glowing screen with green text "1M VIEWS".`
  }
];
