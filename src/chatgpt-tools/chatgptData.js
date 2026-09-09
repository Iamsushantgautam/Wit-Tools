import pointingImg from './preview-chatgpt-images/pointing_thumbnail.webp';
import bigfaceImg from './preview-chatgpt-images/bigface_thumbnail.webp';
import conceptImg from './preview-chatgpt-images/concept_thumbnail.webp';
import variationsImg from './preview-chatgpt-images/variations_thumbnail.webp';

export const CHATGPT_CATEGORIES = [
  {
    id: 'all',
    name: 'All Secret Codes',
    icon: 'Sparkles',
    count: 120,
    color: '#6366f1',
    bgGradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    description: 'Master collection of 120 battle-tested ChatGPT slash commands.'
  },
  {
    id: 'tones',
    name: 'Tones & Personas',
    icon: 'Sliders',
    count: 99,
    color: '#ec4899',
    bgGradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    description: 'Quick slash commands to instantly change AI writing tone, persona, and output style.',
    previewImage: null
  },
  {
    id: 'content',
    name: 'Content Creation',
    icon: 'FileText',
    count: 4,
    color: '#06b6d4',
    bgGradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    description: 'Generate high-intent ideas, hooks, humanized text, and multi-platform content.',
    previewImage: null
  },
  {
    id: 'carousel',
    name: 'Carousel Creation',
    icon: 'Layers',
    count: 4,
    color: '#8b5cf6',
    bgGradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    description: 'Design slide-by-slide copy, story arcs, 4:5 visual layouts, and clean slop-free design.',
    previewImage: null
  },
  {
    id: 'marketing',
    name: 'Marketing Strategy',
    icon: 'Megaphone',
    count: 5,
    color: '#10b981',
    bgGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    description: 'Build complete campaign plans, growth strategy, customer personas, and funnels.',
    previewImage: null
  },
  {
    id: 'ppt',
    name: 'PPT & Slides',
    icon: 'Presentation',
    count: 4,
    color: '#3b82f6',
    bgGradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
    description: 'Turn text into 16:9 slide decks, executive summaries, data visuals, and outlines.',
    previewImage: null
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
  // --- TONES & PERSONAS (1-11 in quick shortcuts) ---
  {
    id: 'human',
    code: '/human:',
    number: 1,
    title: 'Natural Human-Like Writing',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#10b981',
    imageUrl: null,
    shortDesc: 'Rewrite generic or robotic text into natural, conversational, and authentic human language.',
    fullDesc: 'Tells ChatGPT to adopt natural conversational phrasing, vary sentence lengths, and avoid dead giveaway AI buzzwords like "delve", "testament", and "game-changer".',
    bestFor: ['Articles', 'Emails', 'Social Posts', 'Captions', 'Website Copy'],
    parameters: [
      { key: 'text', label: 'Text to Rewrite', placeholder: 'Paste your robotic AI draft here...' }
    ],
    promptTemplate: `/human: Rewrite the following text so it sounds completely natural, conversational, and human. Eliminate AI buzzwords, vary sentence structure, and use an authentic tone.

Text:
"[text]"`,
    sampleOutput: `Original: "In today's digital era, it is imperative to leverage paradigms." -> Humanized: "If you want to stay ahead today, you need simple tools that get real results."`
  },

  {
    id: 'expert',
    code: '/expert:',
    number: 2,
    title: 'Specialist-Level Answers',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#6366f1',
    imageUrl: null,
    shortDesc: 'Get deep, specialist-level answers with first-principles reasoning and technical nuance.',
    fullDesc: 'Instructs ChatGPT to skip introductory fluff and provide advanced, domain-specific insights tailored to experienced industry professionals.',
    bestFor: ['Technical Questions', 'Architecture', 'Complex Problem Solving', 'Engineering'],
    parameters: [
      { key: 'topic', label: 'Topic / Question', placeholder: 'Enter your technical question or topic...' }
    ],
    promptTemplate: `/expert: Adopt the persona of a world-class domain specialist. Provide a deep, first-principles answer on this topic with zero fluff, precise technical nuance, and key edge cases to consider.

Topic:
"[topic]"`,
    sampleOutput: `Deep technical analysis highlighting architectural trade-offs, memory boundaries, and performance benchmarks.`
  },

  {
    id: 'ceo',
    code: '/ceo:',
    number: 3,
    title: 'Founder Mindset Analysis',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#d97706',
    imageUrl: null,
    shortDesc: 'Analyze decisions, proposals, and strategy through an executive ROI and founder lens.',
    fullDesc: 'Evaluates business ideas based on unit economics, leverage, risk mitigation, scalability, and long-term strategic moats like a seasoned CEO.',
    bestFor: ['Business Strategy', 'Product Proposals', 'ROI Analysis', 'Resource Allocation'],
    parameters: [
      { key: 'proposal', label: 'Proposal / Strategy', placeholder: 'Describe the business idea or strategy...' }
    ],
    promptTemplate: `/ceo: Analyze the following business proposal from the perspective of a battle-tested startup CEO. Focus on ROI, strategic moats, key execution risks, and a clear Go/No-Go verdict.

Proposal:
"[proposal]"`,
    sampleOutput: `Verdict: Proceed with Phase 1 validation only if CAC stays under $35 and LTV exceeds $300.`
  },

  {
    id: 'viral',
    code: '/viral:',
    number: 4,
    title: 'High-Engagement Content Ideas',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#ea580c',
    imageUrl: null,
    shortDesc: 'Generate scroll-stopping hooks and psychological angles designed for high engagement.',
    fullDesc: 'Applies psychological triggers like curiosity gaps, contrarian takes, and high-value frameworks to maximize shares, comments, and saves.',
    bestFor: ['Social Media', 'X / Twitter Threads', 'LinkedIn Posts', 'Reels & Shorts'],
    parameters: [
      { key: 'subject', label: 'Core Subject', placeholder: 'Enter topic to turn into viral hooks...' }
    ],
    promptTemplate: `/viral: Transform this topic into 5 scroll-stopping, high-engagement content concepts. Include psychological hooks, high-impact opening lines, and curiosity triggers.

Topic:
"[subject]"`,
    sampleOutput: `Contrarian Hook: "90% of founders spend hours on cold emails. Here is the 2-minute voice note framework closing $10k deals."`
  },

  {
    id: 'seo',
    code: '/seo:',
    number: 5,
    title: 'Search-Optimized Content',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#059669',
    imageUrl: null,
    shortDesc: 'Structure and write content optimized for search intent, keyword semantical ranking, and snippets.',
    fullDesc: 'Optimizes content hierarchy (H1/H2/H3), semantic keyword coverage, featured snippet formatting, and meta descriptions for search visibility.',
    bestFor: ['Blog Posts', 'Landing Pages', 'Documentation', 'SEO Articles'],
    parameters: [
      { key: 'keyword', label: 'Target Keyword', placeholder: 'e.g. ChatGPT secret codes' },
      { key: 'content', label: 'Content Draft', placeholder: 'Paste content to optimize for search engines...' }
    ],
    promptTemplate: `/seo: Optimize the following draft for search engines targeting "[keyword]". Structure with clean heading tags (H1/H2/H3), semantic keyword placement, featured snippet blocks, and a catchy meta description.

Draft:
"[content]"`,
    sampleOutput: `Meta Title: 11 Must-Know ChatGPT Secret Codes (2026 Guide)`
  },

  {
    id: 'critic',
    code: '/critic:',
    number: 6,
    title: 'Find Weaknesses & Flaws',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#dc2626',
    imageUrl: null,
    shortDesc: 'Rigorously audit ideas, arguments, or copy to expose hidden flaws and logical blind spots.',
    fullDesc: 'Acts as an unvarnished critic to stress-test your proposals, copy, or strategies before launch so you can fix vulnerabilities upfront.',
    bestFor: ['Pitch Decks', 'Copy Audits', 'Argument Verification', 'Strategy Review'],
    parameters: [
      { key: 'input', label: 'Draft or Proposal', placeholder: 'Paste your draft, argument, or plan...' }
    ],
    promptTemplate: `/critic: Act as a ruthless critic. Audit the following input and identify top 3 flaws, logical gaps, potential buyer objections, and concrete recommendations to fix them.

Input:
"[input]"`,
    sampleOutput: `Flaw 1: No evidence or metric provided for the 10x ROI claim. Recommendation: Add a concrete case study.`
  },

  {
    id: 'teacher',
    code: '/teacher:',
    number: 7,
    title: 'Explain Clearly & Simply',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#ca8a04',
    imageUrl: null,
    shortDesc: 'Break down complex topics into clear, structured, step-by-step explanations with relatable analogies.',
    fullDesc: 'Ideal for learning and onboarding. Replaces dense jargon with step-by-step breakdowns, real-world analogies, and summary takeaways.',
    bestFor: ['Learning', 'Tutorials', 'Documentation', 'Explainer Posts'],
    parameters: [
      { key: 'concept', label: 'Complex Concept', placeholder: 'e.g. React Hooks, Quantum Computing...' }
    ],
    promptTemplate: `/teacher: Explain "[concept]" clearly and simply. Provide a 1-sentence definition, an intuitive real-world analogy, a step-by-step mechanics breakdown, and 3 key takeaways.

Concept:
"[concept]"`,
    sampleOutput: `Analogy: State management is like a central digital whiteboard that updates in real-time whenever anyone writes on it.`
  },

  {
    id: 'eli5',
    code: '/eli5:',
    number: 8,
    title: "Explain Like I'm 5",
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#e11d48',
    imageUrl: null,
    shortDesc: 'Explain complicated concepts using simple words, everyday comparisons, and zero technical jargon.',
    fullDesc: 'Strips away all acronyms, technical terms, and complex language so anyone—even a child—can grasp the core concept instantly.',
    bestFor: ['Beginner Summaries', 'High-Level Concepts', 'Quick Grasp of Heavy Topics'],
    parameters: [
      { key: 'topic', label: 'Topic to Explain', placeholder: 'e.g. Blockchain, Inflation, Neural Networks...' }
    ],
    promptTemplate: `/eli5: Explain "[topic]" like I am 5 years old. Use simple words, short sentences, everyday objects, and zero technical jargon. Keep it fun and super clear.

Topic:
"[topic]"`,
    sampleOutput: `Imagine a big shared toy chest where a magic lock records every toy added, so no one can take a toy without everyone knowing!`
  },

  {
    id: 'brief',
    code: '/brief:',
    number: 9,
    title: 'Shortest Possible Answer',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Deliver hyper-concise answers with zero introductory fluff, zero filler, and immediate direct value.',
    fullDesc: 'Cuts out polite intros, filler phrasing, and long paragraphs. Delivers maximum signal in minimum words.',
    bestFor: ['Quick Lookups', 'CLI Commands', 'Fast Decision Support', 'Cheat Sheets'],
    parameters: [
      { key: 'query', label: 'Question or Task', placeholder: 'Enter your query for a brief answer...' }
    ],
    promptTemplate: `/brief: Give the shortest, most direct answer possible for this query. No intro, no filler, maximum signal in minimum words.

Query:
"[query]"`,
    sampleOutput: `Use git commit --amend --no-edit to update the last commit without changing its message.`
  },

  {
    id: 'strategy',
    code: '/strategy:',
    number: 10,
    title: 'Long-Term Planning Mode',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#4f46e5',
    imageUrl: null,
    shortDesc: 'Formulate long-term strategic roadmaps with phased milestones, resource needs, and risk mitigations.',
    fullDesc: 'Shifts focus from short-term hacks to multi-phase execution roadmaps, milestone tracking, resource allocation, and sustainable growth.',
    bestFor: ['Strategic Roadmaps', 'Project Planning', 'Business Growth', 'Milestone Tracking'],
    parameters: [
      { key: 'goal', label: 'Strategic Goal', placeholder: 'e.g. Scale SaaS to $50k MRR' },
      { key: 'timeframe', label: 'Timeframe', placeholder: 'e.g. 6 Months / 1 Year' }
    ],
    promptTemplate: `/strategy: Build a long-term strategic roadmap to achieve "[goal]" over [timeframe]. Break down into Phase 1 (Foundation), Phase 2 (Growth), and Phase 3 (Scaling) with milestones, resource requirements, and risk mitigations.

Goal & Timeframe:
"[goal]"`,
    sampleOutput: `Phase 1 (Months 1-2): Establish core onboarding funnel and achieve 15% trial-to-paid conversion baseline.`
  },

  {
    id: 'copywriter',
    code: '/copywriter:',
    number: 11,
    title: 'Persuasive Marketing Copy',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#b45309',
    imageUrl: null,
    shortDesc: 'Draft high-converting sales copy, headlines, and calls-to-action using proven copywriting frameworks.',
    fullDesc: 'Applies direct-response copywriting frameworks like PAS (Problem-Agitate-Solve) or AIDA to create persuasive marketing copy that drives action.',
    bestFor: ['Landing Pages', 'Sales Emails', 'Ad Copy', 'CTA Sections'],
    parameters: [
      { key: 'product', label: 'Product / Offer', placeholder: 'Describe your product or offer...' },
      { key: 'framework', label: 'Copy Framework', placeholder: 'e.g. PAS (Problem-Agitate-Solve) or AIDA' }
    ],
    promptTemplate: `/copywriter: Act as an elite direct-response copywriter. Draft persuasive marketing copy for "[product]" using the [framework] framework. Include a captivating headline, emotional transformation body copy, and strong CTA.

Product & Framework:
"[product]"`,
    sampleOutput: `Headline: "Stop losing 15 hours a week to manual social media posting."`
  },

  {
    id: 'research',
    code: '/research:',
    number: 12,
    title: 'Deep Research Mode',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#059669',
    imageUrl: null,
    shortDesc: 'Conduct deep, comprehensive research with credible sources, academic rigour, and structured findings.',
    fullDesc: 'Instructs ChatGPT to act as a research analyst, gathering facts, statistics, historical context, and counter-arguments.',
    bestFor: ['Research Papers', 'Market Analysis', 'Fact Checking', 'Deep Dives'],
    parameters: [
      { key: 'topic', label: 'Research Topic', placeholder: 'Enter subject or question to research...' }
    ],
    promptTemplate: `/research: Conduct a deep, comprehensive analysis on "[topic]". Include key background facts, underlying mechanisms, statistics, major perspectives, and potential risks or counter-arguments.

Topic:
"[topic]"`,
    sampleOutput: `Provides a structured research brief with background, key findings, data points, and open debates.`
  },

  {
    id: 'brainstorm',
    code: '/brainstorm:',
    number: 13,
    title: 'Generate Creative Ideas',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#8b5cf6',
    imageUrl: null,
    shortDesc: 'Generate a wide variety of creative, unconventional, and high-impact ideas for any topic.',
    fullDesc: 'Uses lateral thinking and creative frameworks to generate unique angles, feature concepts, or campaign ideas.',
    bestFor: ['Ideation', 'Product Features', 'Marketing Campaigns', 'Problem Solving'],
    parameters: [
      { key: 'goal', label: 'Brainstorm Goal / Topic', placeholder: 'e.g. Unique marketing ideas for a SaaS tool...' }
    ],
    promptTemplate: `/brainstorm: Generate 10 distinct, creative, and out-of-the-box ideas for "[goal]". Include safe/proven options, bold experimental concepts, and unique angles.

Goal:
"[goal]"`,
    sampleOutput: `10 categorized ideas ranging from low-hanging fruit to high-leverage viral concepts.`
  },

  {
    id: 'promptengineer',
    code: '/promptengineer:',
    number: 14,
    title: 'Improve Any Prompt',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#d97706',
    imageUrl: null,
    shortDesc: 'Refine and optimize a weak or vague prompt into a high-performing master prompt with variables.',
    fullDesc: 'Applies prompt engineering best practices—adding persona, context, constraints, step-by-step instructions, and dynamic placeholders.',
    bestFor: ['Prompt Engineering', 'AI Workflows', 'Template Creation', 'Optimizing Prompts'],
    parameters: [
      { key: 'prompt', label: 'Original Prompt to Improve', placeholder: 'Paste your basic prompt here...' }
    ],
    promptTemplate: `/promptengineer: Rewrite and optimize the following prompt into an advanced, battle-tested master prompt. Assign a clear persona, context, step-by-step instructions, constraints, and dynamic placeholders.

Original Prompt:
"[prompt]"`,
    sampleOutput: `Optimized master prompt with role definition, explicit rules, formatted structure, and variable tags.`
  },

  {
    id: 'summarize',
    code: '/summarize:',
    number: 15,
    title: 'Summarize Key Points',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Extract key takeaways, core decisions, and essential insights into clean bullet points.',
    fullDesc: 'Condenses long articles, meeting notes, or reports into executive summaries with key decisions and actionable items.',
    bestFor: ['Meeting Notes', 'Articles', 'Reports', 'Long Documents'],
    parameters: [
      { key: 'text', label: 'Content to Summarize', placeholder: 'Paste long text or transcript...' }
    ],
    promptTemplate: `/summarize: Summarize the following text. Provide a 2-sentence high-level summary followed by 5 bullet points of core takeaways and key decisions.

Text:
"[text]"`,
    sampleOutput: `High-level overview + 5 concise bullet points highlighting key metrics and action items.`
  },

  {
    id: 'simplify',
    code: '/simplify:',
    number: 16,
    title: 'Make Complex Content Simple',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#ec4899',
    imageUrl: null,
    shortDesc: 'Remove technical jargon, dense language, and complexity to make text instantly understandable.',
    fullDesc: 'Transforms complicated explanations, academic language, or legal copy into plain, everyday language without losing key meaning.',
    bestFor: ['Documentation', 'Technical Writing', 'Legal Copy', 'Customer Explanations'],
    parameters: [
      { key: 'content', label: 'Complex Content', placeholder: 'Paste jargon-heavy or complex text...' }
    ],
    promptTemplate: `/simplify: Rewrite the following complex text so it is extremely simple, clear, and readable. Remove dense jargon, shorten long sentences, and preserve core meaning.

Content:
"[content]"`,
    sampleOutput: `Simplified version written in plain language that anyone can grasp on the first read.`
  },

  {
    id: 'detailed',
    code: '/detailed:',
    number: 17,
    title: 'Give Comprehensive Explanation',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#4f46e5',
    imageUrl: null,
    shortDesc: 'Provide an exhaustive, in-depth breakdown covering every angle, nuance, and edge case.',
    fullDesc: 'Delivers maximum depth with thorough background context, detailed sub-sections, concrete examples, and potential pitfalls.',
    bestFor: ['Deep Learning', 'Comprehensive Guides', 'System Specifications', 'Thorough Reviews'],
    parameters: [
      { key: 'topic', label: 'Topic for Detailed Breakdown', placeholder: 'Enter subject requiring deep explanation...' }
    ],
    promptTemplate: `/detailed: Provide an exhaustive, step-by-step breakdown on "[topic]". Cover foundational concepts, core mechanics, advanced techniques, edge cases, and practical examples.

Topic:
"[topic]"`,
    sampleOutput: `Multi-section breakdown covering core architecture, implementation details, edge cases, and best practices.`
  },

  {
    id: 'stepbystep',
    code: '/stepbystep:',
    number: 18,
    title: 'Explain Step by Step',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#10b981',
    imageUrl: null,
    shortDesc: 'Break down any process into sequential, easy-to-follow chronological instructions.',
    fullDesc: 'Formats complex workflows, procedures, or technical tasks into clear, numbered steps with checkpoints.',
    bestFor: ['SOPs', 'How-to Guides', 'Tutorials', 'Workflows'],
    parameters: [
      { key: 'process', label: 'Process / Goal', placeholder: 'e.g. How to set up custom domain DNS...' }
    ],
    promptTemplate: `/stepbystep: Break down "[process]" into clear, sequential, step-by-step instructions. Number each step, specify expected outcome for each stage, and highlight common missteps.

Process:
"[process]"`,
    sampleOutput: `Step 1: Navigate to settings... Step 2: Add CNAME record... Expected Result: DNS verified.`
  },

  {
    id: 'examples',
    code: '/examples:',
    number: 19,
    title: 'Provide Practical Examples',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#6366f1',
    imageUrl: null,
    shortDesc: 'Demonstrate theoretical concepts with real-world scenarios and practical examples.',
    fullDesc: 'Provides concrete, realistic examples (good vs bad, before vs after, edge cases) to clarify any topic.',
    bestFor: ['Learning Concepts', 'Team Guidelines', 'Code Snippets', 'Writing Examples'],
    parameters: [
      { key: 'concept', label: 'Concept or Rule', placeholder: 'e.g. Direct-response headline writing...' }
    ],
    promptTemplate: `/examples: Provide 5 practical, real-world examples illustrating "[concept]". Include a mix of basic scenarios, advanced applications, and common mistake vs correct approach comparisons.

Concept:
"[concept]"`,
    sampleOutput: `5 concrete before-and-after examples with commentary on why each works.`
  },

  {
    id: 'analyst',
    code: '/analyst:',
    number: 20,
    title: 'Analyze Data or Information',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#ea580c',
    imageUrl: null,
    shortDesc: 'Perform data-driven analysis to identify patterns, anomalies, trends, and strategic takeaways.',
    fullDesc: 'Adopts the persona of a senior data analyst to evaluate numbers, reports, or qualitative data for underlying insights.',
    bestFor: ['Data Reports', 'Metric Audits', 'Survey Findings', 'Performance Trends'],
    parameters: [
      { key: 'data', label: 'Data / Information to Analyze', placeholder: 'Paste statistics, table data, or report numbers...' }
    ],
    promptTemplate: `/analyst: Analyze the following data/information like a senior data analyst. Identify top 3 trends, key anomalies, potential root causes, and actionable recommendations.

Data:
"[data]"`,
    sampleOutput: `Trend 1: 25% drop in mobile conversion... Action item: Audit checkout page loading speed.`
  },

  {
    id: 'compare',
    code: '/compare:',
    number: 21,
    title: 'Compare Multiple Options',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#06b6d4',
    imageUrl: null,
    shortDesc: 'Compare multiple tools, strategies, or choices side-by-side across key evaluation criteria.',
    fullDesc: 'Creates a structured comparison table analyzing trade-offs, pricing, performance, suitability, and recommendations.',
    bestFor: ['Tool Evaluation', 'Vendor Selection', 'Architecture Choices', 'Decision Making'],
    parameters: [
      { key: 'options', label: 'Options to Compare', placeholder: 'e.g. Next.js vs Vite React, Supabase vs Firebase' }
    ],
    promptTemplate: `/compare: Compare "[options]" side-by-side. Analyze speed, cost, developer experience, scalability, and best use cases. Provide a summary verdict.

Options:
"[options]"`,
    sampleOutput: `Side-by-side breakdown comparing features, ideal team size, and final recommendation verdict.`
  },

  {
    id: 'proscons',
    code: '/proscons:',
    number: 22,
    title: 'Show Advantages and Disadvantages',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#dc2626',
    imageUrl: null,
    shortDesc: 'Evaluate an idea or option by listing pros, cons, hidden risks, and long-term implications.',
    fullDesc: 'Provides an unbiased balance sheet of benefits versus downsides for any business or technical decision.',
    bestFor: ['Decision Audit', 'Feature Proposals', 'Risk Assessment', 'Strategy Evaluation'],
    parameters: [
      { key: 'subject', label: 'Subject or Decision', placeholder: 'e.g. Switching to a 4-day work week...' }
    ],
    promptTemplate: `/proscons: Provide a thorough Pros and Cons analysis for "[subject]". Detail top 4 advantages, top 4 disadvantages, hidden risks, and overall recommendation.

Subject:
"[subject]"`,
    sampleOutput: `Pros: Higher team retention. Cons: Coverage gaps on Fridays. Risk: Client communication delay.`
  },

  {
    id: 'decision',
    code: '/decision:',
    number: 23,
    title: 'Help Make the Best Decision',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#059669',
    imageUrl: null,
    shortDesc: 'Evaluate a tough choice using decision matrices, risk weighting, and explicit trade-off criteria.',
    fullDesc: 'Guides complex choices through structured decision frameworks like weighted scoring, regret minimization, or opportunity cost.',
    bestFor: ['Tough Choices', 'Strategic Direction', 'Career Moves', 'Product Prioritization'],
    parameters: [
      { key: 'dilemma', label: 'Decision Dilemma', placeholder: 'Describe the choice and constraints...' }
    ],
    promptTemplate: `/decision: Help make the optimal decision for this dilemma: "[dilemma]". Evaluate using regret minimization, opportunity cost, and risk weighting to give a clear recommendation.

Dilemma:
"[dilemma]"`,
    sampleOutput: `Scored options matrix + clear recommendation: Option B minimizes downside risk while preserving upside.`
  },

  {
    id: 'planner',
    code: '/planner:',
    number: 24,
    title: 'Build an Actionable Plan',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#4f46e5',
    imageUrl: null,
    shortDesc: 'Turn a vision or project goal into a structured operational plan with timeline and deliverables.',
    fullDesc: 'Drafts execution plans with clear phases, responsibilities, resource estimates, and key milestones.',
    bestFor: ['Project Execution', 'Launch Plans', 'Sprint Planning', 'Event Preparation'],
    parameters: [
      { key: 'goal', label: 'Project Goal', placeholder: 'e.g. Launch a new product feature...' }
    ],
    promptTemplate: `/planner: Build a detailed, actionable project plan to achieve "[goal]". Include Phase 1-3 timelines, key deliverables, required resources, and contingency buffers.

Goal:
"[goal]"`,
    sampleOutput: `Phase 1 (Week 1-2): Discovery & Specs. Phase 2 (Week 3-5): Build. Phase 3 (Week 6): Test & Launch.`
  },

  {
    id: 'roadmap',
    code: '/roadmap:',
    number: 25,
    title: 'Create a Roadmap to a Goal',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#ca8a04',
    imageUrl: null,
    shortDesc: 'Map out a high-level strategic roadmap with quarterly or monthly milestones to achieve a goal.',
    fullDesc: 'Creates a visual or structured timeline showing progress milestones from current state to long-term target.',
    bestFor: ['Product Roadmaps', 'Personal Development', 'Quarterly Goals', 'Skill Growth'],
    parameters: [
      { key: 'target', label: 'Target Outcome', placeholder: 'e.g. Become a Senior Full-Stack Engineer in 12 Months' }
    ],
    promptTemplate: `/roadmap: Construct a step-by-step strategic roadmap to achieve "[target]". Group milestones by quarter/month with measurable exit criteria for each phase.

Target:
"[target]"`,
    sampleOutput: `Q1: Core Mastery -> Q2: Project Portfolio -> Q3: Advanced Architecture -> Q4: Senior Interviewing.`
  },

  {
    id: 'action',
    code: '/action:',
    number: 26,
    title: 'Turn Ideas into Action Steps',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#10b981',
    imageUrl: null,
    shortDesc: 'Convert abstract ideas, discussion notes, or meeting chatter into immediate action items.',
    fullDesc: 'Strips away theoretical fluff to extract clear TODO list tasks with assigned owners and deadlines.',
    bestFor: ['Post-Meeting Tasks', 'Brainstorming Follow-up', 'Execution Checklist', 'Quick Tasking'],
    parameters: [
      { key: 'ideas', label: 'Ideas or Meeting Notes', placeholder: 'Paste raw meeting notes or loose ideas...' }
    ],
    promptTemplate: `/action: Convert the following ideas/notes into immediate, concrete action steps. Format as a checkbox list with task name, urgency, and expected outcome.

Notes:
"[ideas]"`,
    sampleOutput: `[ ] Draft API spec (Urgent, High Impact)\n[ ] Setup CI/CD pipeline (Medium Urgency)`
  },

  {
    id: 'prioritize',
    code: '/prioritize:',
    number: 27,
    title: 'Rank Tasks by Importance',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Organize a cluttered task list using priority frameworks like Eisenhower Matrix or Impact/Effort.',
    fullDesc: 'Ranks tasks by business impact vs effort, highlighting quick wins, strategic projects, and items to delegate/eliminate.',
    bestFor: ['Backlog Grooming', 'Daily Task List', 'Feature Prioritization', 'Time Management'],
    parameters: [
      { key: 'tasks', label: 'List of Tasks', placeholder: 'Paste your unorganized list of tasks...' }
    ],
    promptTemplate: `/prioritize: Rank the following list of tasks using the Impact vs Effort framework. Categorize into Quick Wins, Major Projects, Fill-ins, and Tasks to Delegate/Drop.

Tasks:
"[tasks]"`,
    sampleOutput: `Quick Wins: Fix signup button alignment. Major Project: Re-architect database schema.`
  },

  {
    id: 'productivity',
    code: '/productivity:',
    number: 28,
    title: 'Improve Productivity',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#d97706',
    imageUrl: null,
    shortDesc: 'Optimize daily routines, workflow bottlenecks, and time blocks to maximize output.',
    fullDesc: 'Applies proven productivity systems (Pomodoro, Time Blocking, GTD) to solve workflow inefficiencies.',
    bestFor: ['Workflow Optimization', 'Overcoming Procrastination', 'Daily Planning', 'Time Efficiency'],
    parameters: [
      { key: 'challenge', label: 'Productivity Bottleneck', placeholder: 'e.g. Constant Slack notifications interrupting deep work...' }
    ],
    promptTemplate: `/productivity: Analyze this productivity bottleneck: "[challenge]". Provide 3 actionable strategies, a recommended daily time block schedule, and friction-reducing hacks.

Challenge:
"[challenge]"`,
    sampleOutput: `1. Implement batching for communication. 2. Reserve 9-11 AM for zero-interruption deep work.`
  },

  {
    id: 'focus',
    code: '/focus:',
    number: 29,
    title: 'Identify the Most Important Task',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#059669',
    imageUrl: null,
    shortDesc: 'Identify the single domino task (The ONE Thing) that makes all other tasks easier or unnecessary.',
    fullDesc: 'Cuts through noise and overwhelm to pinpoint the highest-leverage priority to work on right now.',
    bestFor: ['Overcoming Overwhelm', 'Daily Focus', 'Strategic Leverage', 'Morning Planning'],
    parameters: [
      { key: 'toDoList', label: 'Current To-Do List / Goals', placeholder: 'Paste your current task list...' }
    ],
    promptTemplate: `/focus: Review this task list: "[toDoList]". Identify the single most important task (The ONE Thing) to do first today, explaining why it creates the most leverage.

Task List:
"[toDoList]"`,
    sampleOutput: `The ONE Thing: Complete customer interview calls. Reason: Validates core feature before writing code.`
  },

  {
    id: 'time',
    code: '/time:',
    number: 30,
    title: 'Create a Time-Management Plan',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#3b82f6',
    imageUrl: null,
    shortDesc: 'Design a structured daily or weekly time-blocking schedule tailored to your energy levels.',
    fullDesc: 'Constructs realistic schedules allocating dedicated blocks for deep work, admin tasks, rest, and buffers.',
    bestFor: ['Time Blocking', 'Weekly Schedules', 'Work-Life Balance', 'Calendar Management'],
    parameters: [
      { key: 'workload', label: 'Workload & Priorities', placeholder: 'List main tasks and available hours per day...' }
    ],
    promptTemplate: `/time: Create an optimized daily time-management schedule based on this workload: "[workload]". Allocate time blocks for deep focus, batch admin, breaks, and buffer time.

Workload:
"[workload]"`,
    sampleOutput: `8:30-9:00 AM: Admin & Email. 9:00-11:30 AM: Deep Work Block #1. 1:00-3:00 PM: Deep Work Block #2.`
  },

  {
    id: 'learn',
    code: '/learn:',
    number: 31,
    title: 'Build a Learning Plan',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#ca8a04',
    imageUrl: null,
    shortDesc: 'Draft a structured self-study curriculum with recommended resources, projects, and milestones.',
    fullDesc: 'Breaks down complex subjects into a progressive learning syllabus from beginner basics to advanced practice.',
    bestFor: ['Learning New Skills', 'Self-Study', 'Skill Upskilling', 'Curriculum Design'],
    parameters: [
      { key: 'skill', label: 'Skill to Master', placeholder: 'e.g. TypeScript & Next.js App Router...' }
    ],
    promptTemplate: `/learn: Design a 4-week structured self-study learning plan to master "[skill]". Include weekly core topics, hands-on practice projects, and key mastery checkpoints.

Skill:
"[skill]"`,
    sampleOutput: `Week 1: Fundamentals & Syntax. Week 2: Build a CRUD app. Week 3: State Management. Week 4: Deployment.`
  },

  {
    id: 'study',
    code: '/study:',
    number: 32,
    title: 'Create an Effective Study Strategy',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#059669',
    imageUrl: null,
    shortDesc: 'Develop an active recall and spaced repetition study strategy for exam or test preparation.',
    fullDesc: 'Uses proven cognitive science methods like active recall, Feynman technique, and spaced repetition schedules.',
    bestFor: ['Exam Prep', 'Certifications', 'Interview Prep', 'Memorization'],
    parameters: [
      { key: 'exam', label: 'Exam / Subject', placeholder: 'e.g. AWS Certified Solutions Architect' }
    ],
    promptTemplate: `/study: Build an evidence-based study strategy for "[exam]". Apply active recall techniques, spaced repetition timelines, and key concept summary sheets.

Subject:
"[exam]"`,
    sampleOutput: `Day 1-3: Concept Mapping. Day 4: Active Recall Testing. Day 7 & 14: Spaced Repetition Reviews.`
  },

  {
    id: 'quiz',
    code: '/quiz:',
    number: 33,
    title: 'Test Knowledge with Questions',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Generate a interactive multi-choice or open-ended quiz to test understanding of a topic.',
    fullDesc: 'Creates custom quiz questions with answer keys, explanations, and difficulty levels to test retention.',
    bestFor: ['Self-Testing', 'Exam Review', 'Team Knowledge Check', 'Learning Verification'],
    parameters: [
      { key: 'topic', label: 'Quiz Subject', placeholder: 'e.g. React Hooks & Lifecycle...' }
    ],
    promptTemplate: `/quiz: Generate a 5-question quiz on "[topic]". Include 3 multiple-choice and 2 short-answer questions. Hide answer keys at the bottom with detailed explanations.

Topic:
"[topic]"`,
    sampleOutput: `Q1: What is the main purpose of useEffect? (A/B/C/D) ... Answer Key & Explanations provided below.`
  },

  {
    id: 'flashcards',
    code: '/flashcards:',
    number: 34,
    title: 'Create Study Flashcards',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#059669',
    imageUrl: null,
    shortDesc: 'Generate front/back Q&A flashcards optimized for Anki or Quizlet study tools.',
    fullDesc: 'Formats key terms, definitions, formulas, or concepts into concise prompt-and-answer flashcard pairs.',
    bestFor: ['Flashcard Creation', 'Anki Export', 'Vocabulary', 'Quick Memorization'],
    parameters: [
      { key: 'material', label: 'Study Material', placeholder: 'Paste lecture notes, article, or terms...' }
    ],
    promptTemplate: `/flashcards: Convert the following material into 10 high-impact study flashcards. Format as Front (Question/Concept) and Back (Concise Answer/Definition).

Material:
"[material]"`,
    sampleOutput: `Front: What is closure in JS?\nBack: A function bundled together with references to its surrounding state.`
  },

  {
    id: 'interview',
    code: '/interview:',
    number: 35,
    title: 'Prepare for Interviews',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Simulate a realistic mock interview with domain-specific questions, STAR framework answers, and feedback.',
    fullDesc: 'Acts as an interviewer asking behavioral or technical questions, offering feedback on candidate responses.',
    bestFor: ['Job Interviews', 'Mock Preparation', 'STAR Answers', 'Role-Play'],
    parameters: [
      { key: 'role', label: 'Target Job Role / Industry', placeholder: 'e.g. Senior Product Manager at Tech Company' }
    ],
    promptTemplate: `/interview: Conduct a mock interview for a "[role]" position. Ask 5 top technical/behavioral questions, provide ideal STAR framework answers, and list red flags to avoid.

Role:
"[role]"`,
    sampleOutput: `Question 1: Tell me about a time you handled a project failure. Model STAR answer & key points to emphasize.`
  },

  {
    id: 'resume',
    code: '/resume:',
    number: 36,
    title: 'Improve Resume Content',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#ca8a04',
    imageUrl: null,
    shortDesc: 'Rewrite resume bullet points to use strong action verbs and quantified impact metrics.',
    fullDesc: 'Optimizes resume copy for ATS scanning and executive appeal by highlighting measurable achievements (XYZ format).',
    bestFor: ['Resume Tuning', 'LinkedIn Profiles', 'Job Applications', 'CV Writing'],
    parameters: [
      { key: 'bullet', label: 'Current Resume Bullet Points', placeholder: 'Paste your current resume draft...' }
    ],
    promptTemplate: `/resume: Rewrite the following resume bullet points using Google's XYZ formula (Accomplished [X] as measured by [Y], by doing [Z]). Start each with strong action verbs.

Draft:
"[bullet]"`,
    sampleOutput: `Original: Worked on database speed -> Refactored database indexes, reducing query latency by 45%.`
  },

  {
    id: 'career',
    code: '/career:',
    number: 37,
    title: 'Give Career Guidance',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#059669',
    imageUrl: null,
    shortDesc: 'Receive strategic career advice on promotions, skill pivots, salary negotiations, and industry trends.',
    fullDesc: 'Provides actionable career advice for leveling up, switching industries, or navigating workplace dynamics.',
    bestFor: ['Career Growth', 'Salary Negotiation', 'Role Transition', 'Professional Guidance'],
    parameters: [
      { key: 'situation', label: 'Career Situation / Goal', placeholder: 'e.g. Transitioning from Marketing to UX Design...' }
    ],
    promptTemplate: `/career: Provide strategic career guidance for this situation: "[situation]". Outline necessary skill bridges, networking strategies, portfolio requirements, and risk factors.

Situation:
"[situation]"`,
    sampleOutput: `Step 1: Build 2 practical case studies. Step 2: Leverage internal transfer options before external application.`
  },

  {
    id: 'mentor',
    code: '/mentor:',
    number: 38,
    title: 'Respond Like a Personal Mentor',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Get empathetic, wise, and practical guidance from an experienced mentor.',
    fullDesc: 'Adopts a supportive, wise mentor persona to offer encouragement, perspective, and strategic clarity.',
    bestFor: ['Mentorship', 'Overcoming Imposter Syndrome', 'Personal Growth', 'Workplace Advice'],
    parameters: [
      { key: 'dilemma', label: 'Personal / Work Challenge', placeholder: 'e.g. Feeling overwhelmed with new leadership responsibilities...' }
    ],
    promptTemplate: `/mentor: Adopt the persona of a wise, empathetic senior mentor. Give thoughtful guidance and perspective on this challenge: "[dilemma]". Share key mindset shifts and actionable wisdom.

Challenge:
"[dilemma]"`,
    sampleOutput: `Empathetic guidance on letting go of perfectionism and trusting your team to step up.`
  },

  {
    id: 'coach',
    code: '/coach:',
    number: 39,
    title: 'Give Practical Coaching',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#ca8a04',
    imageUrl: null,
    shortDesc: 'Receive goal-oriented coaching with high-accountability questions, habits, and mindset shifts.',
    fullDesc: 'Pushes you to take accountability, establish daily habits, and break through self-imposed limits.',
    bestFor: ['Performance Coaching', 'Habit Building', 'Accountability', 'Goal Setting'],
    parameters: [
      { key: 'goal', label: 'Target Goal', placeholder: 'e.g. Building a daily writing habit...' }
    ],
    promptTemplate: `/coach: Act as a high-performance coach. Help me achieve "[goal]". Provide a habit tracking framework, accountability rules, and powerful coaching questions to keep momentum.

Goal:
"[goal]"`,
    sampleOutput: `Habit Rule: Write 150 words immediately after morning coffee. Tracking: 14-day chain visual.`
  },

  {
    id: 'consultant',
    code: '/consultant:',
    number: 40,
    title: 'Provide Professional Recommendations',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#059669',
    imageUrl: null,
    shortDesc: 'Deliver structured management consulting recommendations for business problems.',
    fullDesc: 'Applies MECE principles and consulting frameworks (McKinsey style) to diagnose root causes and recommend solutions.',
    bestFor: ['Business Problems', 'Operational Efficiency', 'Strategic Recommendations', 'Consulting Decks'],
    parameters: [
      { key: 'problem', label: 'Business Problem', placeholder: 'e.g. High customer churn rate in month 2...' }
    ],
    promptTemplate: `/consultant: Act as a senior management consultant. Diagnose this business problem: "[problem]". Provide a structured MECE analysis, top 3 recommendations, and quick wins.

Problem:
"[problem]"`,
    sampleOutput: `Diagnosis: Onboarding friction. Recommendation 1: Automated product walkthroughs.`
  },

  {
    id: 'editor',
    code: '/editor:',
    number: 41,
    title: 'Improve Clarity and Quality',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Refine writing for maximum clarity, punchiness, flow, and structural polish.',
    fullDesc: 'Acts as a copy editor, trimming fluff, improving transitions, and tightening syntax while maintaining author voice.',
    bestFor: ['Copy Editing', 'Article Review', 'Polishing Writing', 'Flow Improvement'],
    parameters: [
      { key: 'text', label: 'Draft to Edit', placeholder: 'Paste your draft here...' }
    ],
    promptTemplate: `/editor: Act as an expert copy editor. Edit the following text to improve clarity, flow, sentence rhythm, and impact while keeping the author's core voice.

Draft:
"[text]"`,
    sampleOutput: `Polished draft with tightened phrasing, smoother transitions, and zero passive voice.`
  },

  {
    id: 'proofread',
    code: '/proofread:',
    number: 42,
    title: 'Find Grammar and Spelling Errors',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#ca8a04',
    imageUrl: null,
    shortDesc: 'Catch all typos, grammatical mistakes, punctuation errors, and awkward phrasing.',
    fullDesc: 'Meticulously audits text for grammatical correctness, spelling, punctuation, and consistency.',
    bestFor: ['Proofreading', 'Final Checks', 'Emails', 'Published Articles'],
    parameters: [
      { key: 'text', label: 'Text to Proofread', placeholder: 'Paste text to check for errors...' }
    ],
    promptTemplate: `/proofread: Audit the following text for grammar, spelling, punctuation, and typos. List all corrected errors and provide the clean final version.

Text:
"[text]"`,
    sampleOutput: `List of corrected typos + clean final error-free draft.`
  },

  {
    id: 'rewrite',
    code: '/rewrite:',
    number: 43,
    title: 'Rewrite with Better Wording',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#059669',
    imageUrl: null,
    shortDesc: 'Rewrite content with elevated vocabulary, better phrasing, and enhanced engagement.',
    fullDesc: 'Provides 3 fresh variations of any text using different stylistic phrasing and word choices.',
    bestFor: ['Rewriting', 'Alternative Options', 'Improving Style', 'Caption Variations'],
    parameters: [
      { key: 'draft', label: 'Text to Rewrite', placeholder: 'Paste original sentence or paragraph...' }
    ],
    promptTemplate: `/rewrite: Rewrite the following text in 3 distinct styles: 1. Punchy & Concise, 2. Professional & Elegant, 3. Engaging & Dynamic.

Text:
"[draft]"`,
    sampleOutput: `Option 1 (Punchy): ... Option 2 (Professional): ... Option 3 (Engaging): ...`
  },

  {
    id: 'professional',
    code: '/professional:',
    number: 44,
    title: 'Make Writing Professional',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Transform casual drafts into polished, professional business communications.',
    fullDesc: 'Elevates casual or emotional text into polite, professional corporate communication suitable for emails, reports, or executive notes.',
    bestFor: ['Workplace Emails', 'Client Messages', 'Official Reports', 'Executive Communication'],
    parameters: [
      { key: 'casualText', label: 'Casual Text / Note', placeholder: 'Paste casual message or draft...' }
    ],
    promptTemplate: `/professional: Rewrite the following message into professional, polite, and executive-ready business communication.

Message:
"[casualText]"`,
    sampleOutput: `Casual: "Can't make the meeting today, too busy" -> Professional: "Regrettably, due to a scheduling conflict, I will be unable to attend today's meeting..."`
  },

  {
    id: 'casual',
    code: '/casual:',
    number: 45,
    title: 'Make Writing Conversational',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#10b981',
    imageUrl: null,
    shortDesc: 'Make stiff or formal text sound relaxed, warm, and natural.',
    fullDesc: 'Transforms formal or academic text into easygoing, everyday conversational language.',
    bestFor: ['Social Posts', 'Blog Introductions', 'Casual Emails', 'Captions'],
    parameters: [
      { key: 'text', label: 'Stiff/Formal Draft', placeholder: 'Paste text to make casual...' }
    ],
    promptTemplate: `/casual: Rewrite the following text to sound casual, relaxed, and conversational. Use friendly everyday language while keeping the core message.

Text:
"[text]"`,
    sampleOutput: `Original: "It is requested that you inform us." -> Casual: "Just drop us a line whenever you're ready!"`
  },

  {
    id: 'friendly',
    code: '/friendly:',
    number: 46,
    title: 'Make Writing Warm and Friendly',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#ec4899',
    imageUrl: null,
    shortDesc: 'Infuse cold or neutral copy with warmth, empathy, and welcoming tone.',
    fullDesc: 'Adjusts writing style to build rapport, convey appreciation, and maintain an approachable, supportive vibe.',
    bestFor: ['Customer Support', 'Onboarding Emails', 'Welcome Messages', 'Community Posts'],
    parameters: [
      { key: 'text', label: 'Text to Soften', placeholder: 'Paste draft to make warm and friendly...' }
    ],
    promptTemplate: `/friendly: Rewrite the following text with a warm, friendly, and welcoming tone. Make the reader feel appreciated and supported.

Text:
"[text]"`,
    sampleOutput: `Warm and welcoming message expressing excitement to work together.`
  },

  {
    id: 'persuasive',
    code: '/persuasive:',
    number: 47,
    title: 'Make the Message More Convincing',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#b45309',
    imageUrl: null,
    shortDesc: 'Strengthen arguments, benefit statements, and emotional hooks to drive action.',
    fullDesc: 'Applies influence principles (social proof, urgency, clear outcomes) to make text far more compelling.',
    bestFor: ['Sales Copy', 'Pitches', 'Call to Actions', 'Proposal Headlines'],
    parameters: [
      { key: 'message', label: 'Message to Persuade', placeholder: 'Paste pitch or offer message...' }
    ],
    promptTemplate: `/persuasive: Rewrite the following message to make it compelling and persuasive. Emphasize value, emotional transformation, and a strong reason to act now.

Message:
"[message]"`,
    sampleOutput: `High-converting copy highlighting immediate benefits and addressing key hesitation points.`
  },

  {
    id: 'concise',
    code: '/concise:',
    number: 48,
    title: 'Remove Unnecessary Words',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Cut wordiness and filler to deliver maximum impact in minimum words.',
    fullDesc: 'Trims fluff, passive voice, and redundant adverbs while retaining essential meaning.',
    bestFor: ['Executive Summaries', 'Character-Limited Posts', 'Emails', 'UI Labels'],
    parameters: [
      { key: 'text', label: 'Wordy Draft', placeholder: 'Paste text to tighten...' }
    ],
    promptTemplate: `/concise: Edit the following text to make it hyper-concise. Remove all filler words, redundant phrases, and fluff while preserving the core message.

Text:
"[text]"`,
    sampleOutput: `Original (30 words) -> Concise (12 words): Clear, direct, high-impact sentence.`
  },

  {
    id: 'polish',
    code: '/polish:',
    number: 49,
    title: 'Refine the Final Version',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#6366f1',
    imageUrl: null,
    shortDesc: 'Give your draft a final polish for cadence, elegance, and publishing quality.',
    fullDesc: 'Polishes phrasing, balance, and rhythm to elevate good copy into publication-ready writing.',
    bestFor: ['Final Drafts', 'Speeches', 'Featured Articles', 'Landing Page Hero Copy'],
    parameters: [
      { key: 'draft', label: 'Near-Final Draft', placeholder: 'Paste your draft for final polish...' }
    ],
    promptTemplate: `/polish: Give this draft a final polish. Smooth out sentence cadence, enhance word choice, and ensure flawless executive presentation.

Draft:
"[draft]"`,
    sampleOutput: `Publication-ready text with pristine flow and professional polish.`
  },

  {
    id: 'tone',
    code: '/tone:',
    number: 50,
    title: 'Adjust the Writing Tone',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#d97706',
    imageUrl: null,
    shortDesc: 'Flexibly shift any text into your specified custom tone or brand voice.',
    fullDesc: 'Rewrites content to align with any requested style—witty, authoritative, futuristic, empathetic, or minimalist.',
    bestFor: ['Brand Consistency', 'Custom Voice', 'Multi-Audience Adapting'],
    parameters: [
      { key: 'targetTone', label: 'Target Tone', placeholder: 'e.g. Witty & Sarcastic, Authoritative Fintech, Empathetic Coach' },
      { key: 'text', label: 'Content to Adapt', placeholder: 'Paste text to adjust...' }
    ],
    promptTemplate: `/tone: Rewrite the following text specifically adopting a [targetTone] tone. Maintain the factual content but transform the voice.

Text:
"[text]"`,
    sampleOutput: `Content rewritten exactly in the specified voice and style.`
  },

  {
    id: 'storyteller',
    code: '/storyteller:',
    number: 51,
    title: 'Turn Information into a Story',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#8b5cf6',
    imageUrl: null,
    shortDesc: 'Transform dry facts into a captivating narrative with conflict, stakes, and resolution.',
    fullDesc: 'Uses story arcs (Hook -> Struggle -> Breakthrough -> Result) to make information memorable.',
    bestFor: ['Case Studies', 'Brand Origin Stories', 'Keynotes', 'LinkedIn Posts'],
    parameters: [
      { key: 'facts', label: 'Information / Facts', placeholder: 'Paste background info or case study details...' }
    ],
    promptTemplate: `/storyteller: Transform the following information into a narrative story arc with a hook, tension/challenge, discovery moment, and inspiring conclusion.

Information:
"[facts]"`,
    sampleOutput: `Narrative story that captivates readers and delivers lessons through relatable experiences.`
  },

  {
    id: 'hook',
    code: '/hook:',
    number: 52,
    title: 'Create Attention-Grabbing Hooks',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#ea580c',
    imageUrl: null,
    shortDesc: 'Generate 5 high-impact opening lines designed to stop the scroll.',
    fullDesc: 'Creates curiosity gaps, contrarian statements, and high-value teaser hooks for social content.',
    bestFor: ['Reels/Shorts Intros', 'Twitter/X Thread Openers', 'LinkedIn First Lines', 'Video Intros'],
    parameters: [
      { key: 'topic', label: 'Core Subject', placeholder: 'Enter subject to write hooks for...' }
    ],
    promptTemplate: `/hook: Generate 5 scroll-stopping opening hooks for content about "[topic]". Include curiosity gap, contrarian take, stat callout, personal story, and bold claim angles.

Topic:
"[topic]"`,
    sampleOutput: `1. Curiosity Hook: "Most founders get this totally wrong..."\n2. Contrarian: "Stop spending money on ads until you fix this."`
  },

  {
    id: 'headline',
    code: '/headline:',
    number: 53,
    title: 'Generate Powerful Headlines',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#059669',
    imageUrl: null,
    shortDesc: 'Draft high-click-through headlines for articles, landing pages, and newsletters.',
    fullDesc: 'Applies battle-tested headline formulas (How-To, Listicle, Direct Benefit, Secret Weapon) to grab reader focus.',
    bestFor: ['Blog Titles', 'Email Subject Lines', 'Landing Page H1s', 'YouTube Titles'],
    parameters: [
      { key: 'topic', label: 'Article / Offer Topic', placeholder: 'Describe topic or article content...' }
    ],
    promptTemplate: `/headline: Write 10 high-CTR headline options for "[topic]". Provide a mix of How-To, Benefit-Led, Curiosity-Driven, and Numbered titles.

Topic:
"[topic]"`,
    sampleOutput: `10 headline variations ranked by engagement style.`
  },

  {
    id: 'caption',
    code: '/caption:',
    number: 54,
    title: 'Write Social-Media Captions',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#06b6d4',
    imageUrl: null,
    shortDesc: 'Craft engaging social media captions complete with hooks, spacing, call-to-actions, and hashtags.',
    fullDesc: 'Produces platform-ready post captions formatted for readability and high engagement.',
    bestFor: ['Instagram Captions', 'TikTok Descriptions', 'Facebook Posts'],
    parameters: [
      { key: 'postIdea', label: 'Visual / Post Concept', placeholder: 'Describe what your post or image is about...' }
    ],
    promptTemplate: `/caption: Write an engaging social media caption about "[postIdea]". Include a strong first-line hook, spaced readable paragraphs, a clear CTA, and 5 relevant hashtags.

Concept:
"[postIdea]"`,
    sampleOutput: `Hook line\n\nBody paragraph with spacing...\n\nCTA + hashtags.`
  },

  {
    id: 'linkedin',
    code: '/linkedin:',
    number: 55,
    title: 'Create LinkedIn Content',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Draft professional long-form LinkedIn posts optimized for engagement and authority.',
    fullDesc: 'Formats posts with single-line paragraph spacing, powerful text hooks, professional takeaways, and comment triggers.',
    bestFor: ['LinkedIn Personal Branding', 'Industry Thought Leadership', 'Company Updates'],
    parameters: [
      { key: 'topic', label: 'LinkedIn Post Topic', placeholder: 'Enter industry lesson, story, or insight...' }
    ],
    promptTemplate: `/linkedin: Draft a high-performing LinkedIn post about "[topic]". Format with single-line breaks, a scroll-stop opening line, strategic bolding, and a thought-provoking closing question.

Topic:
"[topic]"`,
    sampleOutput: `Formatted LinkedIn text optimized for high dwell time and comment engagement.`
  },

  {
    id: 'instagram',
    code: '/instagram:',
    number: 56,
    title: 'Create Instagram Content',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#ec4899',
    imageUrl: null,
    shortDesc: 'Design Instagram feed concepts, carousel slide outlines, and reel copy.',
    fullDesc: 'Provides visual aesthetics suggestions paired with readable, engaging Instagram caption copy.',
    bestFor: ['Instagram Carousels', 'Feed Posts', 'Story Text Ideas'],
    parameters: [
      { key: 'topic', label: 'Instagram Topic / Niche', placeholder: 'e.g. 5 Habits of Creative Directors...' }
    ],
    promptTemplate: `/instagram: Create a complete Instagram content concept for "[topic]". Include slide-by-slide visual layout text, caption copy, visual aesthetic notes, and engagement CTA.

Topic:
"[topic]"`,
    sampleOutput: `Slide text + aesthetic notes + matching caption.`
  },

  {
    id: 'youtube',
    code: '/youtube:',
    number: 57,
    title: 'Create YouTube Content',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#dc2626',
    imageUrl: null,
    shortDesc: 'Generate YouTube video concepts, titles, intro hooks, and descriptions.',
    fullDesc: 'Architects YouTube video packages optimized for high click-through rate (CTR) and average view duration (AVD).',
    bestFor: ['YouTube Videos', 'Channel Strategy', 'Video Ideas'],
    parameters: [
      { key: 'topic', label: 'Video Subject / Niche', placeholder: 'e.g. Building an AI app in 2026...' }
    ],
    promptTemplate: `/youtube: Develop a YouTube video strategy package for "[topic]". Include 3 high-CTR titles, a 30-second retention hook script, key video chapter timestamps, and description text.

Topic:
"[topic]"`,
    sampleOutput: `3 Title concepts + 30s Hook Script + Description & Chapters.`
  },

  {
    id: 'reels',
    code: '/reels:',
    number: 58,
    title: 'Generate Short-Form Video Ideas',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#ea580c',
    imageUrl: null,
    shortDesc: 'Plan 15-to-60 second short-form video concepts with visual beats and voiceovers.',
    fullDesc: 'Ideal for TikTok, YouTube Shorts, and IG Reels—combining visual action cues with fast-paced audio scripts.',
    bestFor: ['TikTok', 'YouTube Shorts', 'Instagram Reels'],
    parameters: [
      { key: 'topic', label: 'Core Video Topic', placeholder: 'e.g. 3 secret Mac keyboard shortcuts...' }
    ],
    promptTemplate: `/reels: Write a 30-second short-form video script about "[topic]". Provide visual directions on the left and voiceover/audio script on the right, starting with a 3-second hook.

Topic:
"[topic]"`,
    sampleOutput: `Two-column table: [Visual Cue] vs [Audio Voiceover] timed beat-by-beat.`
  },

  {
    id: 'script',
    code: '/script:',
    number: 59,
    title: 'Write Video or Presentation Script',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#4f46e5',
    imageUrl: null,
    shortDesc: 'Write full, natural spoken-word scripts for videos, keynotes, or demos.',
    fullDesc: 'Formats speech scripts with natural pacing pauses, visual cues, and presenter cues.',
    bestFor: ['YouTube Videos', 'Keynote Speeches', 'Product Demos', 'Webinar Scripts'],
    parameters: [
      { key: 'topic', label: 'Script Subject & Duration', placeholder: 'e.g. 3-Minute Product Launch Demo Script' }
    ],
    promptTemplate: `/script: Write a complete spoken-word script for "[topic]". Include stage directions, visual slide cues, voice emphasis notes, and clear section transitions.

Subject:
"[topic]"`,
    sampleOutput: `Full spoken script with presenter notes in brackets.`
  },

  {
    id: 'email',
    code: '/email:',
    number: 60,
    title: 'Write an Effective Email',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Draft high-response emails with compelling subject lines and clear calls-to-action.',
    fullDesc: 'Structures emails for quick scanning, high open rates, and direct responses.',
    bestFor: ['Cold Outreach', 'Client Communication', 'Newsletters', 'Follow-Ups'],
    parameters: [
      { key: 'purpose', label: 'Email Goal & Recipient', placeholder: 'e.g. Follow up with client after demo...' }
    ],
    promptTemplate: `/email: Draft a highly effective email for this purpose: "[purpose]". Provide 3 catchy subject lines, a concise body with strong value placement, and a single clear next step CTA.

Purpose:
"[purpose]"`,
    sampleOutput: `Subject: Quick follow up on our demo...\nBody copy with single CTA.`
  },

  {
    id: 'sales',
    code: '/sales:',
    number: 61,
    title: 'Create Sales-Focused Messaging',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#d97706',
    imageUrl: null,
    shortDesc: 'Craft high-converting sales copy that addresses objections and highlights ROI.',
    fullDesc: 'Focuses on customer pain, transformation, risk reversal, and direct pitch conversion.',
    bestFor: ['Landing Pages', 'Sales Pages', 'Pitch Emails', 'Ad Copy'],
    parameters: [
      { key: 'offer', label: 'Product / Service Pitch', placeholder: 'Describe product, price, and primary benefit...' }
    ],
    promptTemplate: `/sales: Draft persuasive sales copy for "[offer]". Highlight the primary pain solved, future transformation, key features, buyer objection counters, and a high-urgency pitch.

Offer:
"[offer]"`,
    sampleOutput: `Structured sales message with problem, solution, ROI proof, and strong CTA.`
  },

  {
    id: 'offer',
    code: '/offer:',
    number: 62,
    title: 'Create an Irresistible Offer',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#059669',
    imageUrl: null,
    shortDesc: 'Package core services with bonuses, risk reversal, and urgency into a high-value offer.',
    fullDesc: 'Applies offer creation strategies (Grand Slam Offer framework) to maximize perceived value and minimize friction.',
    bestFor: ['Product Bundles', 'Agency Retainers', 'Course Launches', 'High-Ticket Sales'],
    parameters: [
      { key: 'product', label: 'Core Product / Service', placeholder: 'e.g. Web Design Package...' }
    ],
    promptTemplate: `/offer: Structure an irresistible high-value offer around "[product]". Include core deliverable, 3 value-add bonuses, a risk reversal guarantee, and a clear pricing anchor.

Product:
"[product]"`,
    sampleOutput: `Core offer + 3 stacked bonuses + 100% money-back guarantee structure.`
  },

  {
    id: 'brand',
    code: '/brand:',
    number: 63,
    title: 'Develop Brand Messaging',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#6366f1',
    imageUrl: null,
    shortDesc: 'Define brand positioning, tagline, mission statement, and tone guidelines.',
    fullDesc: 'Helps articulate core brand identity, vision, unique value proposition (UVP), and messaging pillars.',
    bestFor: ['Brand Strategy', 'Rebranding', 'Mission Statements', 'Tagline Creation'],
    parameters: [
      { key: 'business', label: 'Company / Project Concept', placeholder: 'Describe your company or app...' }
    ],
    promptTemplate: `/brand: Develop a brand messaging guide for "[business]". Provide 3 tagline options, a 1-sentence UVP, brand mission statement, 3 core values, and voice guidelines.

Business:
"[business]"`,
    sampleOutput: `Brand Messaging Architecture: Tagline, UVP, Mission, and Brand Pillars.`
  },

  {
    id: 'customer',
    code: '/customer:',
    number: 64,
    title: "Think from the Customer's Perspective",
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#ca8a04',
    imageUrl: null,
    shortDesc: 'Audit copy or product UX from the eyes of a hesitant first-time customer.',
    fullDesc: 'Adopts customer mindset to reveal hidden doubts, confusion points, and buying triggers.',
    bestFor: ['UX Audits', 'Copy Audits', 'Conversion Rate Optimization', 'Customer Experience'],
    parameters: [
      { key: 'copyOrPage', label: 'Landing Page Copy / Pitch', placeholder: 'Paste copy or describe page...' }
    ],
    promptTemplate: `/customer: Audit this copy/offer from the perspective of a skeptical customer: "[copyOrPage]". List top 3 doubts, what is confusing, and what would make them buy immediately.

Copy/Offer:
"[copyOrPage]"`,
    sampleOutput: `Customer audit highlighting 3 objections and immediate fixes.`
  },

  {
    id: 'audience',
    code: '/audience:',
    number: 65,
    title: 'Analyze the Target Audience',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#059669',
    imageUrl: null,
    shortDesc: 'Deep-dive into target audience demographics, psychographics, pain points, and desires.',
    fullDesc: 'Uncovers what keeps your target customer awake at night and what phraseology resonates with them.',
    bestFor: ['Market Research', 'Persona Mapping', 'Ad Targeting', 'Copy Research'],
    parameters: [
      { key: 'niche', label: 'Target Market / Niche', placeholder: 'e.g. Freelance Graphic Designers...' }
    ],
    promptTemplate: `/audience: Provide an in-depth target audience analysis for "[niche]". Detail primary frustrations, secret goals, common objections, where they hang out, and trigger words.

Niche:
"[niche]"`,
    sampleOutput: `Comprehensive buyer persona breakdown with emotional pain points.`
  },

  {
    id: 'competitor',
    code: '/competitor:',
    number: 66,
    title: 'Analyze Competitors',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Evaluate rival brands to uncover market gaps, messaging flaws, and positioning advantages.',
    fullDesc: 'Audits competitive landscape to help you differentiate your brand and claim market white-space.',
    bestFor: ['Competitor Analysis', 'Differentiation Strategy', 'Market Positioning'],
    parameters: [
      { key: 'field', label: 'Product & Competitors', placeholder: 'e.g. My app vs Notion and Asana...' }
    ],
    promptTemplate: `/competitor: Analyze the competitive landscape for "[field]". Identify competitor weaknesses, overused industry cliches, common customer complaints, and 3 differentiation opportunities.

Field:
"[field]"`,
    sampleOutput: `Competitor gap audit with unclaimed market white-space recommendations.`
  },

  {
    id: 'market',
    code: '/market:',
    number: 67,
    title: 'Analyze Market Opportunities',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#10b981',
    imageUrl: null,
    shortDesc: 'Identify emerging industry trends, unmet consumer needs, and market gaps.',
    fullDesc: 'Conducts high-level market intelligence analysis to evaluate growth potential and expansion angles.',
    bestFor: ['New Product Ideas', 'Market Expansion', 'Startup Feasibility'],
    parameters: [
      { key: 'industry', label: 'Industry / Market', placeholder: 'e.g. AI-assisted micro-SaaS tools...' }
    ],
    promptTemplate: `/market: Analyze market opportunities in the "[industry]" sector. Detail key macro trends, underserved customer sub-segments, regulatory/tech catalysts, and top 3 entry strategies.

Industry:
"[industry]"`,
    sampleOutput: `Market research brief identifying high-growth sub-segments.`
  },

  {
    id: 'startup',
    code: '/startup:',
    number: 68,
    title: 'Think Like a Startup Strategist',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#4f46e5',
    imageUrl: null,
    shortDesc: 'Evaluate business models for speed to MVP, unit economics, and growth leverage.',
    fullDesc: 'Applies lean startup principles (Build-Measure-Learn) to test hypotheses with minimal resources.',
    bestFor: ['MVP Validation', 'Startup Growth', 'Business Model Design'],
    parameters: [
      { key: 'idea', label: 'Startup Concept', placeholder: 'Describe startup idea...' }
    ],
    promptTemplate: `/startup: Evaluate this startup concept from a lean startup perspective: "[idea]". Outline fastest path to MVP, key validation metrics, distribution unfair advantage, and biggest risk.

Idea:
"[idea]"`,
    sampleOutput: `Lean startup roadmap focusing on fast MVP validation.`
  },

  {
    id: 'business',
    code: '/business:',
    number: 69,
    title: 'Develop Business Ideas',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#d97706',
    imageUrl: null,
    shortDesc: 'Generate viable revenue models, service packages, or digital product concepts.',
    fullDesc: 'Explores monetization channels, subscription models, and product-market fit angles for any domain.',
    bestFor: ['Side Hustles', 'New Business Lines', 'Monetization Strategy'],
    parameters: [
      { key: 'skills', label: 'Skills / Assets / Niche', placeholder: 'e.g. React development & video editing...' }
    ],
    promptTemplate: `/business: Generate 5 viable business concepts based on "[skills]". For each idea, detail core value proposition, revenue model, target customer, and startup complexity.

Skills/Niche:
"[skills]"`,
    sampleOutput: `5 business concepts ranked by monetization speed and build complexity.`
  },

  {
    id: 'pricing',
    code: '/pricing:',
    number: 70,
    title: 'Develop a Pricing Strategy',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#059669',
    imageUrl: null,
    shortDesc: 'Design tiered pricing structures, value-based pricing, and upsell packages.',
    fullDesc: 'Formulates optimal pricing tiers (Good-Better-Best), decoy pricing, and billing models to maximize average revenue per user (ARPU).',
    bestFor: ['SaaS Tiers', 'Service Packages', 'Product Pricing', 'Upsell Strategy'],
    parameters: [
      { key: 'product', label: 'Product / Service', placeholder: 'Describe product and core features...' }
    ],
    promptTemplate: `/pricing: Design a multi-tier pricing strategy for "[product]". Outline Starter, Pro, and Enterprise tiers with pricing anchors, feature distribution, and decoy placement.

Product:
"[product]"`,
    sampleOutput: `Multi-tier pricing architecture with features and price points.`
  },

  {
    id: 'funnel',
    code: '/funnel:',
    number: 71,
    title: 'Build a Marketing Funnel',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Map out step-by-step buyer funnels from lead magnet to core offer upsells.',
    fullDesc: 'Architects end-to-end sales funnels (TOFU awareness -> MOFU consideration -> BOFU conversion -> Post-purchase retention).',
    bestFor: ['Sales Funnels', 'Lead Generation', 'Email Automation', 'Conversion Optimization'],
    parameters: [
      { key: 'offer', label: 'Core Offer & Product', placeholder: 'e.g. $497 Online Course...' }
    ],
    promptTemplate: `/funnel: Build a complete 4-stage marketing funnel for "[offer]". Detail free lead magnet idea, nurture email sequence outline, sales page hook, and post-purchase upsell.

Offer:
"[offer]"`,
    sampleOutput: `Full-funnel execution plan from lead magnet to backend offer.`
  },

  {
    id: 'growth',
    code: '/growth:',
    number: 72,
    title: 'Find Growth Opportunities',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#ca8a04',
    imageUrl: null,
    shortDesc: 'Identify viral loops, partnership opportunities, and channel scale tactics.',
    fullDesc: 'Applies growth hacking strategies (referral loops, SEO programmatic pages, co-marketing) to accelerate user acquisition.',
    bestFor: ['User Acquisition', 'Referral Programs', 'Channel Scaling', 'Viral Growth'],
    parameters: [
      { key: 'product', label: 'Product & Current Traction', placeholder: 'e.g. Mobile app with 1,000 active users...' }
    ],
    promptTemplate: `/growth: Identify 5 high-leverage growth opportunities for "[product]". Focus on organic referral loops, co-marketing partnerships, content flywheel, and CRO quick wins.

Product:
"[product]"`,
    sampleOutput: `5 growth tactics detailing acquisition channels and implementation steps.`
  },

  {
    id: 'content',
    code: '/content:',
    number: 73,
    title: 'Build a Content Strategy',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#059669',
    imageUrl: null,
    shortDesc: 'Design a multi-channel content engine aligned with customer intent and brand authority.',
    fullDesc: 'Structures content pillars, publishing frequency, platform distribution, and ROI tracking.',
    bestFor: ['Content Marketing', 'Brand Authority', 'Social Media Strategy'],
    parameters: [
      { key: 'niche', label: 'Niche & Goal', placeholder: 'e.g. B2B Fintech SaaS looking to build organic leads...' }
    ],
    promptTemplate: `/content: Build a complete content marketing strategy for "[niche]". Detail 4 core content pillars, platform selection rationale, posting frequency, and repurposing workflow.

Niche/Goal:
"[niche]"`,
    sampleOutput: `Content marketing blueprint with pillars and publishing cadence.`
  },

  {
    id: 'calendar',
    code: '/calendar:',
    number: 74,
    title: 'Create a Content Calendar',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Generate a 2-week or 30-day scheduled content publishing calendar across platforms.',
    fullDesc: 'Organizes posts by date, topic pillar, format, platform, and call-to-action for seamless batch creation.',
    bestFor: ['Content Planning', 'Social Media Scheduling', 'Editorial Calendars'],
    parameters: [
      { key: 'timeframe', label: 'Timeframe & Platforms', placeholder: 'e.g. 2-Week Plan for LinkedIn & X' }
    ],
    promptTemplate: `/calendar: Draft a structured content calendar for "[timeframe]". Group by Day, Content Pillar, Post Title/Hook, Format, and Primary Call-to-Action.

Timeframe/Platforms:
"[timeframe]"`,
    sampleOutput: `Day-by-day scheduled content roadmap with post hooks and CTAs.`
  },

  {
    id: 'ideas',
    code: '/ideas:',
    number: 75,
    title: 'Generate Fresh Ideas',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#d97706',
    imageUrl: null,
    shortDesc: 'Spark novel angles, creative concepts, and fresh takes on overdone subjects.',
    fullDesc: 'Overcomes creative block by generating unexpected combinations, analogies, and fresh concepts.',
    bestFor: ['Creative Block', 'Brainstorming', 'Content Topics', 'Feature Concepts'],
    parameters: [
      { key: 'topic', label: 'Topic or Challenge', placeholder: 'e.g. Fresh angles on productivity tools...' }
    ],
    promptTemplate: `/ideas: Generate 10 fresh, unexpected ideas on "[topic]". Avoid cliché advice and focus on novel angles, real-world analogies, and unique perspectives.

Topic:
"[topic]"`,
    sampleOutput: `10 creative idea angles focused on non-obvious perspectives.`
  },

  {
    id: 'creative',
    code: '/creative:',
    number: 76,
    title: 'Think Creatively and Differently',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#8b5cf6',
    imageUrl: null,
    shortDesc: 'Apply lateral thinking, SCAMPER framework, and wild metaphors to solve problems.',
    fullDesc: 'Breaks rigid thinking by applying lateral problem-solving techniques and imaginative metaphors.',
    bestFor: ['Out-of-the-Box Thinking', 'Design Innovations', 'Campaign Concepts'],
    parameters: [
      { key: 'problem', label: 'Problem or Brief', placeholder: 'Describe problem requiring creative solution...' }
    ],
    promptTemplate: `/creative: Approach this problem with lateral, highly creative thinking: "[problem]". Apply wild metaphors, SCAMPER methodology, and bold unconventional angles.

Problem:
"[problem]"`,
    sampleOutput: `Lateral solution options using creative metaphors and SCAMPER transforms.`
  },

  {
    id: 'unpopular',
    code: '/unpopular:',
    number: 77,
    title: 'Challenge Conventional Thinking',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#dc2626',
    imageUrl: null,
    shortDesc: 'Formulate contrarian takes and challenge widely accepted industry myths.',
    fullDesc: 'Exposes flaws in industry dogma to craft thought-provoking, high-engagement contrarian content.',
    bestFor: ['Thought Leadership', 'Viral Posts', 'Opinion Articles', 'Debates'],
    parameters: [
      { key: 'niche', label: 'Industry / Niche', placeholder: 'e.g. Startup fundraising advice...' }
    ],
    promptTemplate: `/unpopular: Identify 5 unpopular opinions / contrarian takes in "[niche]" that challenge standard industry advice. Explain why the status quo advice fails and what to do instead.

Niche:
"[niche]"`,
    sampleOutput: `5 contrarian industry takes exposing flaws in popular advice.`
  },

  {
    id: 'devilsadvocate',
    code: '/devilsadvocate:',
    number: 78,
    title: 'Argue the Opposing Viewpoint',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Stress-test an argument or proposal by thoroughly taking the opposing side.',
    fullDesc: 'Acts as Devil\'s Advocate to uncover hidden vulnerabilities, blind spots, and counter-arguments before competitors or critics do.',
    bestFor: ['Proposal Stress-Testing', 'Debate Prep', 'Strategy Review', 'Risk Assessment'],
    parameters: [
      { key: 'proposal', label: 'Proposal or Argument', placeholder: 'Paste proposal or plan...' }
    ],
    promptTemplate: `/devilsadvocate: Play Devil's Advocate against this proposal: "[proposal]". Rigorously argue the opposing viewpoint, highlighting hidden assumptions, potential failure points, and counter-arguments.

Proposal:
"[proposal]"`,
    sampleOutput: `Unvarnished counter-arguments and vulnerability audit.`
  },

  {
    id: 'contrarian',
    code: '/contrarian:',
    number: 79,
    title: 'Find Alternative Perspectives',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#ca8a04',
    imageUrl: null,
    shortDesc: 'Examine issues through non-obvious lenses and alternative mental models.',
    fullDesc: 'Explores scenarios using varied perspectives (e.g. buyer vs seller, short-term vs long-term, optimist vs pessimist).',
    bestFor: ['Perspective Shift', 'Strategic Analysis', 'Problem Framing'],
    parameters: [
      { key: 'issue', label: 'Issue or Subject', placeholder: 'e.g. Remote work vs office culture...' }
    ],
    promptTemplate: `/contrarian: Analyze "[issue]" from 3 completely different alternative perspectives. Reveal insights that standard mainstream discussions overlook.

Issue:
"[issue]"`,
    sampleOutput: `3 distinct alternative perspective breakdowns.`
  },

  {
    id: 'assumptions',
    code: '/assumptions:',
    number: 80,
    title: 'Identify Hidden Assumptions',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#059669',
    imageUrl: null,
    shortDesc: 'Expose unstated beliefs and implicit assumptions underlying a plan or argument.',
    fullDesc: 'Deconstructs plans to isolate unverified assumptions so they can be tested before committing capital or time.',
    bestFor: ['Risk Audit', 'Project Planning', 'Strategy Verification'],
    parameters: [
      { key: 'plan', label: 'Plan or Claim', placeholder: 'Paste project plan or business claim...' }
    ],
    promptTemplate: `/assumptions: Audit this plan/claim: "[plan]". List 5 hidden or unstated assumptions that must hold true for this to succeed, and evaluate how to validate each assumption.

Plan:
"[plan]"`,
    sampleOutput: `5 unstated assumptions with recommended validation tests.`
  },

  {
    id: 'risks',
    code: '/risks:',
    number: 81,
    title: 'Identify Potential Risks',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#059669',
    imageUrl: null,
    shortDesc: 'Conduct a pre-mortem analysis to flag execution risks and mitigation strategies.',
    fullDesc: 'Performs a pre-mortem audit assuming the project has failed 1 year out, identifying root causes and prevention steps.',
    bestFor: ['Pre-Mortem Analysis', 'Project Risk Audit', 'Security & Ops Checks'],
    parameters: [
      { key: 'project', label: 'Project / Initiative', placeholder: 'Describe planned project launch...' }
    ],
    promptTemplate: `/risks: Perform a Pre-Mortem analysis on "[project]". Assume we are 1 year in the future and this initiative failed completely. List top 5 failure causes and concrete preventive mitigations.

Project:
"[project]"`,
    sampleOutput: `Pre-mortem risk matrix highlighting top failure causes and mitigations.`
  },

  {
    id: 'factcheck',
    code: '/factcheck:',
    number: 82,
    title: 'Separate Facts from Claims',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Meticulously separate verified data from unsubstantiated claims and assumptions.',
    fullDesc: 'Audits copy or arguments to highlight verifiable facts versus opinion, marketing hyperbole, or speculative claims.',
    bestFor: ['Fact Checking', 'Article Audits', 'Legal Review', 'Research Verification'],
    parameters: [
      { key: 'text', label: 'Text to Fact-Check', placeholder: 'Paste draft or claim text...' }
    ],
    promptTemplate: `/factcheck: Audit the following text. Separate all statements into 1. Verifiable Facts, 2. Opinions/Claims requiring proof, and 3. Potential misleading statements.

Text:
"[text]"`,
    sampleOutput: `Fact audit table separating empirical facts from unverified claims.`
  },

  {
    id: 'verify',
    code: '/verify:',
    number: 83,
    title: 'Identify What Needs Verification',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#ca8a04',
    imageUrl: null,
    shortDesc: 'Flag specific statistics, quotes, and technical claims that require secondary verification.',
    fullDesc: 'Scans text to create an actionable verification checklist before publishing or presenting.',
    bestFor: ['Journalism', 'Technical Reports', 'Compliance Review'],
    parameters: [
      { key: 'report', label: 'Report or Content Draft', placeholder: 'Paste content draft...' }
    ],
    promptTemplate: `/verify: Review this draft: "[report]". Highlight every statistic, quote, technical assertion, or claim that requires external verification before final approval.

Draft:
"[report]"`,
    sampleOutput: `Verification action list with flagged quotes, numbers, and sources.`
  },

  {
    id: 'logic',
    code: '/logic:',
    number: 84,
    title: 'Check Reasoning and Logic',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#059669',
    imageUrl: null,
    shortDesc: 'Audit arguments for logical fallacies, circular reasoning, and sound structure.',
    fullDesc: 'Evaluates reasoning chains to isolate logical fallacies (strawman, false dichotomy, slippery slope) and strengthen arguments.',
    bestFor: ['Argumentative Essays', 'Debate Prep', 'Policy Review', 'Logical Audit'],
    parameters: [
      { key: 'argument', label: 'Argument / Essay Draft', placeholder: 'Paste argument text...' }
    ],
    promptTemplate: `/logic: Evaluate the logic and reasoning in this argument: "[argument]". Identify any logical fallacies, weak deductions, or broken connections, and suggest logical fixes.

Argument:
"[argument]"`,
    sampleOutput: `Logical audit identifying reasoning flaws and suggested structural fixes.`
  },

  {
    id: 'rootcause',
    code: '/rootcause:',
    number: 85,
    title: 'Find the Root Cause of a Problem',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Apply the 5 Whys framework to dig past surface symptoms to core root causes.',
    fullDesc: 'Uses 5 Whys and Fishbone diagram principles to diagnose underlying systemic failures.',
    bestFor: ['Troubleshooting', 'System Failures', 'Post-Mortems', 'Ops Debugging'],
    parameters: [
      { key: 'problem', label: 'Observed Problem / Symptom', placeholder: 'e.g. Sales dropped 20% this month...' }
    ],
    promptTemplate: `/rootcause: Apply the "5 Whys" methodology to find the root cause of this problem: "[problem]". Drill down 5 levels deep from surface symptom to fundamental systemic cause.

Problem:
"[problem]"`,
    sampleOutput: `5 Whys diagnostic trace uncovering fundamental root cause.`
  },

  {
    id: 'debug',
    code: '/debug:',
    number: 86,
    title: 'Find and Fix Problems',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#ca8a04',
    imageUrl: null,
    shortDesc: 'Systematically diagnose code errors, logic bugs, or workflow failures and provide fixes.',
    fullDesc: 'Analyzes stack traces, code snippets, or operational bottlenecks to provide root cause diagnostic and working code fix.',
    bestFor: ['Code Debugging', 'Error Logs', 'Workflow Troubleshooting'],
    parameters: [
      { key: 'errorOrCode', label: 'Code Snippet / Error Log', placeholder: 'Paste code or error stack trace...' }
    ],
    promptTemplate: `/debug: Analyze this code/error: "[errorOrCode]". Explain why the error happens, identify exact broken lines, and provide the corrected working code.

Code/Error:
"[errorOrCode]"`,
    sampleOutput: `Bug diagnosis + clean fixed code snippet.`
  },

  {
    id: 'solution',
    code: '/solution:',
    number: 87,
    title: 'Generate Practical Solutions',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#059669',
    imageUrl: null,
    shortDesc: 'Formulate 3 practical, realistic solutions for any operational or strategic problem.',
    fullDesc: 'Provides immediate quick fix, medium-term solution, and long-term systemic solution for any bottleneck.',
    bestFor: ['Problem Solving', 'Team Impediments', 'Process Bottlenecks'],
    parameters: [
      { key: 'challenge', label: 'Challenge / Problem', placeholder: 'Describe the problem faced...' }
    ],
    promptTemplate: `/solution: Provide 3 practical solutions for this challenge: "[challenge]". Categorize into 1. Immediate Quick Fix (24h), 2. Medium-Term Process Fix, and 3. Strategic Long-Term Solution.

Challenge:
"[challenge]"`,
    sampleOutput: `3-tier action plan: Quick Fix, Medium-Term Fix, and Long-Term Solution.`
  },

  {
    id: 'alternative',
    code: '/alternative:',
    number: 88,
    title: 'Suggest Better Alternatives',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Propose superior alternative tools, approaches, or solutions to your current approach.',
    fullDesc: 'Evaluates alternative tools, technologies, or strategies that achieve the same objective cheaper, faster, or easier.',
    bestFor: ['Alternative Tech Stack', 'Cost Reduction', 'Workflow Alternatives'],
    parameters: [
      { key: 'currentApproach', label: 'Current Tool / Approach', placeholder: 'Describe your current method or tool...' }
    ],
    promptTemplate: `/alternative: Suggest 3 superior alternatives to this approach: "[currentApproach]". Detail why each alternative is better (cost, speed, simplicity, or performance).

Current Approach:
"[currentApproach]"`,
    sampleOutput: `3 alternative tools/methods with pros/cons vs current approach.`
  },

  {
    id: 'optimize',
    code: '/optimize:',
    number: 89,
    title: 'Improve an Existing Approach',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#ca8a04',
    imageUrl: null,
    shortDesc: 'Audit an existing workflow, query, or process for efficiency and performance gains.',
    fullDesc: 'Refines existing execution to eliminate friction, reduce processing time, or lower costs.',
    bestFor: ['Code Optimization', 'Process Efficiency', 'Workflow Tuning'],
    parameters: [
      { key: 'process', label: 'Workflow / Code / Process', placeholder: 'Paste process or code to optimize...' }
    ],
    promptTemplate: `/optimize: Audit and optimize this process/code: "[process]". Identify inefficiencies, bottlenecks, and redundant steps, and provide an optimized, streamlined version.

Process:
"[process]"`,
    sampleOutput: `Optimized workflow with benchmarked efficiency improvements.`
  },

  {
    id: 'automate',
    code: '/automate:',
    number: 90,
    title: 'Find Ways to Automate the Task',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Identify repetitive tasks and recommend automation scripts, webhooks, or AI workflows.',
    fullDesc: 'Maps manual workflows to automation triggers using tools like Zapier, Python scripts, Make, or API webhooks.',
    bestFor: ['Workflow Automation', 'Time Saving', 'Scripting Tasks'],
    parameters: [
      { key: 'manualTask', label: 'Manual Task / Process', placeholder: 'Describe manual repetitive work...' }
    ],
    promptTemplate: `/automate: Analyze this manual task: "[manualTask]". Provide a step-by-step automation blueprint recommending zero-code tools (Zapier/Make), API webhooks, or custom scripts.

Manual Task:
"[manualTask]"`,
    sampleOutput: `Automation blueprint with triggers, actions, and recommended tools.`
  },

  {
    id: 'template',
    code: '/template:',
    number: 91,
    title: 'Create a Reusable Template',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#059669',
    imageUrl: null,
    shortDesc: 'Turn any repeated document or email into a reusable master template with dynamic variables.',
    fullDesc: 'Standardizes recurring writing into a structured template with variable bracket tags like [Name], [Date], [Key Result].',
    bestFor: ['SOP Templates', 'Email Templates', 'Document Frameworks'],
    parameters: [
      { key: 'content', label: 'Example Document / Email', placeholder: 'Paste example text to turn into template...' }
    ],
    promptTemplate: `/template: Turn the following content into a fill-in-the-blank reusable master template. Replace specific details with bracketed variables like [Variable Name] and add usage instructions.

Content:
"[content]"`,
    sampleOutput: `Reusable master template with bracketed placeholders.`
  },

  {
    id: 'checklist',
    code: '/checklist:',
    number: 92,
    title: 'Create a Practical Checklist',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#d97706',
    imageUrl: null,
    shortDesc: 'Build a step-by-step verification checklist to ensure zero missed steps during execution.',
    fullDesc: 'Drafts operational checklists (Pre-launch, QA, Onboarding) grouped by stage for flawless execution.',
    bestFor: ['Launch Checklists', 'QA Audits', 'Standard Operating Procedures'],
    parameters: [
      { key: 'task', label: 'Task / Project', placeholder: 'e.g. Website Launch Checklist...' }
    ],
    promptTemplate: `/checklist: Create a comprehensive execution checklist for "[task]". Group into Pre-Execution, Execution, and Post-Execution stages with clear checkboxes.

Task:
"[task]"`,
    sampleOutput: `Stage-by-stage operational checklist with task checkboxes.`
  },

  {
    id: 'framework',
    code: '/framework:',
    number: 93,
    title: 'Build a Structured Framework',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Organize complex concepts into a named 3-to-5 step mental framework or methodology.',
    fullDesc: 'Synthesizes domain knowledge into an easy-to-remember framework with acronyms or step-by-step principles.',
    bestFor: ['Methodology Design', 'Thought Leadership', 'Teaching Frameworks'],
    parameters: [
      { key: 'concept', label: 'Core Concept / Expertise', placeholder: 'Describe your method or process...' }
    ],
    promptTemplate: `/framework: Synthesize this concept into a memorable 4-step framework: "[concept]". Name the framework, create a catchy acronym, and explain each step clearly.

Concept:
"[concept]"`,
    sampleOutput: `4-step proprietary methodology with mnemonic acronym.`
  },

  {
    id: 'matrix',
    code: '/matrix:',
    number: 94,
    title: 'Organize Options into a Decision Matrix',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#8b5cf6',
    imageUrl: null,
    shortDesc: 'Evaluate choices in a 2x2 matrix (e.g. Impact vs Effort, Urgency vs Importance).',
    fullDesc: 'Categorizes multiple inputs into a 4-quadrant decision matrix to clarify strategic positioning.',
    bestFor: ['Decision Matrices', 'Strategy Mapping', 'Prioritization Grid'],
    parameters: [
      { key: 'items', label: 'Items to Evaluate', placeholder: 'List items to place in matrix...' }
    ],
    promptTemplate: `/matrix: Organize these items into a 2x2 Decision Matrix (High/Low Impact vs High/Low Effort): "[items]". Place each item in its quadrant and explain the strategy.

Items:
"[items]"`,
    sampleOutput: `4-quadrant decision matrix layout with quadrant advice.`
  },

  {
    id: 'table',
    code: '/table:',
    number: 95,
    title: 'Convert Information into a Table',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#ca8a04',
    imageUrl: null,
    shortDesc: 'Structure raw messy text into a clean Markdown comparison table.',
    fullDesc: 'Parses unstructured text into formatted markdown tables with aligned columns for quick readability.',
    bestFor: ['Data Structuring', 'Comparison Tables', 'Clean Notes'],
    parameters: [
      { key: 'rawText', label: 'Raw Text / Data', placeholder: 'Paste unformatted text or data...' }
    ],
    promptTemplate: `/table: Convert the following raw information into a clean Markdown table with clear column headers, proper alignment, and key takeaways summarized below.

Raw Text:
"[rawText]"`,
    sampleOutput: `Formatted Markdown table with clear column headers.`
  },

  {
    id: 'json',
    code: '/json:',
    number: 96,
    title: 'Structure the Answer as JSON',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#4f46e5',
    imageUrl: null,
    shortDesc: 'Output answer strictly as valid, formatted JSON for developer APIs or scripts.',
    fullDesc: 'Instructs ChatGPT to return clean, syntactically valid JSON with specified key schemas and zero prose markdown.',
    bestFor: ['Developer APIs', 'Data Parsing', 'JSON Output', 'Script Integration'],
    parameters: [
      { key: 'query', label: 'Task & Key Schema', placeholder: 'Describe data needed and JSON schema...' }
    ],
    promptTemplate: `/json: Output the answer to this task strictly as valid, formatted JSON with proper key types. Do not include introductory text or markdown prose outside the JSON code block.

Task:
"[query]"`,
    sampleOutput: `Syntactically valid JSON code block with structured key-value pairs.`
  },

  {
    id: 'roleplay',
    code: '/roleplay:',
    number: 97,
    title: 'Simulate a Realistic Scenario',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#8b5cf6',
    imageUrl: null,
    shortDesc: 'Simulate interactive conversations with specific personas (e.g. Angry Client, VC Investor).',
    fullDesc: 'Engages in back-and-forth roleplay to practice negotiations, customer interactions, or sales calls.',
    bestFor: ['Negotiation Practice', 'Sales Roleplay', 'Customer Service Training'],
    parameters: [
      { key: 'persona', label: 'Persona to Simulate', placeholder: 'e.g. Hesitant Enterprise Buyer concerned about security...' }
    ],
    promptTemplate: `/roleplay: Adopt the persona of "[persona]". Let's conduct a realistic interactive dialogue. Start by asking your first question or objection, and wait for my response.

Persona:
"[persona]"`,
    sampleOutput: `Interactive roleplay dialogue initial prompt.`
  },

  {
    id: 'reverse',
    code: '/reverse:',
    number: 98,
    title: 'Work Backward from the Desired Result',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#8b5cf6',
    imageUrl: null,
    shortDesc: 'Reverse-engineer end goals into necessary prerequisites and backward steps.',
    fullDesc: 'Applies backward planning starting from the final successful outcome to discover necessary preceding steps.',
    bestFor: ['Backward Planning', 'Reverse Engineering', 'Goal Decomposition'],
    parameters: [
      { key: 'desiredResult', label: 'End Result / Target State', placeholder: 'e.g. Achieving 10,000 active app users...' }
    ],
    promptTemplate: `/reverse: Work backward from this desired result: "[desiredResult]". Detail Step N (Final outcome), Step N-1 (Pre-launch trigger), Step N-2 (Beta validation), back to Step 1 (Immediate start).

Desired Result:
"[desiredResult]"`,
    sampleOutput: `Backward step breakdown from target outcome to step 1.`
  },

  {
    id: 'ultimate',
    code: '/ultimate:',
    number: 99,
    title: 'Give the Strongest Complete Answer',
    category: 'tones',
    categoryName: 'Tones & Personas',
    color: '#0284c7',
    imageUrl: null,
    shortDesc: 'Deliver the ultimate, gold-standard master answer combining depth, examples, and action steps.',
    fullDesc: 'Combines first-principles analysis, step-by-step instructions, visual layout specs, and common pitfalls into a definitive master response.',
    bestFor: ['Master Queries', 'Ultimate Guides', 'Gold-Standard Answers'],
    parameters: [
      { key: 'query', label: 'Master Topic / Task', placeholder: 'Enter your main query...' }
    ],
    promptTemplate: `/ultimate: Deliver the definitive, gold-standard answer on "[query]". Combine high-level strategic reasoning, step-by-step execution rules, concrete examples, and common pitfalls to avoid.

Query:
"[query]"`,
    sampleOutput: `Gold-standard master response covering strategy, steps, examples, and pitfalls.`
  },
  // --- CONTENT CREATION (10-13 in prompt numbering) ---
  {
    id: 'contentideas',
    code: '/contentideas',
    number: 10,
    title: 'Content Topics Generator',
    category: 'content',
    categoryName: 'Content Creation',
    color: '#06b6d4',
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
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
