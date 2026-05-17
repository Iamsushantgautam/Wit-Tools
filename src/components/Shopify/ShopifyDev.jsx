import React, { useState } from 'react';
import './ShopifyDev.css';

const TAG_META = {
    'Homepage': { color: '#95bf47', light: '#f0f9e4', icon: '🏠' },
    'Hero': { color: '#3b82f6', light: '#eff6ff', icon: '⚡' },
    'Marketing': { color: '#f59e0b', light: '#fffbeb', icon: '📣' },
    'Content': { color: '#8b5cf6', light: '#f5f3ff', icon: '📝' },
    'Product': { color: '#06b6d4', light: '#ecfeff', icon: '🛍️' },
    'Social Proof': { color: '#ec4899', light: '#fdf2f8', icon: '⭐' },
};

const ShopifyDev = () => {
    const [toast, setToast] = useState({ show: false, message: '' });
    const [search, setSearch] = useState('');
    const [activeTag, setActiveTag] = useState('All');

    const prompts = [
        {
            id: 'luxury-dual-collection-cards',
            title: 'Luxury Dual Collection Cards',
            tag: 'Homepage',
            desc: 'Premium homepage section with two side-by-side fragrance collection cards — full-cover imagery, gradient overlays, bold headings, and styled CTA buttons.',
            prompt: 'Create a custom Shopify homepage section with a premium luxury layout featuring two side by side collection cards.\n\nSection layout requirements:\nThe section should be full width with generous padding and rounded corners. Inside the section, display two equal width cards aligned horizontally on desktop and stacked vertically on mobile.\n\nEach card must include:\n- A full background image covering the entire card using object fit cover\n- A soft dark gradient overlay for text readability\n- Large bold uppercase heading aligned to the top left\n- A smaller subtitle text below the heading\n- A rounded pill shaped button positioned near the bottom left\n- A circular arrow icon button on the bottom right for navigation\n- Smooth hover animation with slight zoom on background image\n- Clean luxury aesthetic similar to premium fragrance brands\n\nLeft card content:\n- Heading text: IMPRESSIONS\n- Subtitle text: Designer inspired perfumes\n- Button text: SHOP IMPRESSIONS\n- Link to: /collections/impressions\n\nRight card content:\n- Heading text: ORIGINALS\n- Subtitle text: Exclusive Dossier perfumes\n- Button text: SHOP ORIGINALS\n- Link to: /collections/originals\n\nTechnical requirements:\n- Build this as a Shopify section using Liquid, HTML, and CSS\n- Allow background images, headings, subtitles, and links to be editable from the Shopify theme customizer\n- Ensure accessibility with proper contrast and semantic markup',
            img: '/previews/luxury-collection-cards.png'
        },
        {
            id: 'pet-subscription-block',
            title: 'Subscription Promotion Block',
            tag: 'Marketing',
            desc: 'Two-column pet food subscription section — lifestyle dog image left, benefit checklist with green check icons and CTA button right. Fully customizable from theme settings.',
            prompt: `Act as a senior Shopify theme developer and conversion focused UI designer.

Create a custom Shopify section that displays a two column subscription promotion block for a premium pet food brand.

Layout and structure:
- Two column layout on desktop
- Left column shows a large lifestyle image of a dog eating from a bowl
- Right column contains subscription text content and benefits
- Content vertically centered relative to the image
- Background white and clean
- Maximum width aligned to Shopify theme container

Left column image:
- Single image upload from Shopify settings
- Image displays full height, object-fit contain or cover depending on screen size
- No text overlay on image
- Responsive scaling for mobile

Right column content:
- Small eyebrow text at top: "PureTail Delivered"
- Large bold headline: "Subscribe and Save 5%"
- Supporting paragraph explaining automatic delivery convenience
- Checklist style benefits list with SVG check icons (brand accent green)
- Primary CTA button at the bottom (rounded, solid dark color, hover state included)

Default PureTail content:
- Eyebrow: PureTail Delivered
- Headline: Subscribe and Save 5%
- Body text: What is better than PureTail food, treats, and supplements? Enjoy automatic delivery to your door along with exclusive benefits designed to make feeding your pet effortless.
- Benefits list:
  • Easy to manage delivery schedules
  • Priority shipping
  • Guaranteed in-stock availability
  • 5% savings on all products
  • Free bonus items for subscribers
  • A reason to get excited when the doorbell rings
- CTA button text: Learn More

Styling:
- Modern sans-serif typography with strong headline hierarchy
- Comfortable spacing between list items
- Check icons built with SVG
- Brand colors configurable in section settings

Mobile behavior:
- Stack columns vertically
- Image appears above content
- Text remains left aligned
- CTA button full width on mobile

Technical requirements:
- Build as a Shopify section using Liquid, HTML, and CSS
- All text, image, button text, and button link editable from Shopify theme customizer
- Ensure accessibility with proper contrast and semantic markup`,
            img: '/previews/pet-subscription-block.png'
        },
        {
            id: 'testimonials-carousel',
            title: 'Testimonials Carousel',
            tag: 'Social Proof',
            desc: 'Autoplay carousel showcasing customer reviews with star ratings and navigation controls.',
            prompt: "Create a testimonials carousel. Each slide should display a customer's quote, their name, and a 5-star rating icon. Include navigation arrows and pagination dots at the bottom. The carousel should autoplay and have options to set the autoplay speed and number of testimonials shown.",
            img: null
        },
        {
            id: 'two-column-hero',
            title: 'Two-Column Hero Banner',
            tag: 'Hero',
            desc: 'Split hero with full image on the left and headline, subheadline, and CTA on the right.',
            prompt: 'Create a two-column hero banner. The left column features a large, eye-catching image, and the right column contains a prominent headline, a concise subheadline, and a CTA button. Allow customization of image, text, button text, and button link. Ensure images adapt well on mobile.',
            img: null
        },
        {
            id: 'countdown-timer',
            title: 'Countdown Timer Section',
            tag: 'Marketing',
            desc: 'Flash sale countdown showing days, hours, minutes, and seconds until a configurable end date.',
            prompt: 'Design a countdown timer block for a flash sale section. The timer should display days, hours, minutes, and seconds, clearly indicating the time remaining until a specified date. Include a message above the timer like "Sale Ends In:" and allow the customization of the date and time.',
            img: null
        },
        {
            id: 'process-block',
            title: 'Process Steps Section',
            tag: 'Content',
            desc: 'Numbered three-step horizontal layout explaining a process or service flow.',
            prompt: 'Create a process section with three steps. Each step should include a numerical indicator (1, 2, 3), a bold title for the step, and a short description explaining the process. Use a horizontal layout for desktop and stack vertically on mobile. Easy to customize step titles and descriptions.',
            img: null
        },
        {
            id: 'faq-accordion',
            title: 'FAQ Accordion Section',
            tag: 'Content',
            desc: 'Expandable FAQ items with clickable questions that reveal answers on toggle.',
            prompt: 'Build an FAQ section with an accordion layout. Each FAQ item should have a clickable question that expands to reveal the answer. Start with at least three example FAQ items. Ensure the section allows adding or removing FAQ items if needed and modifying questions and answers.',
            img: null
        },
        {
            id: 'why-choose-us',
            title: 'Why Choose Us Section',
            tag: 'Content',
            desc: 'Four-benefit card grid with icons, titles, and descriptions in a responsive 2×2 layout.',
            prompt: 'Develop a "Why Choose Us" section with four distinct benefit cards. Each card should feature a custom icon (allow icon selection or upload), a bold benefit title, and a brief supporting description. Arrange these cards in a two-by-two grid on the desktop and stack vertically on mobile.',
            img: null
        },
        {
            id: 'newsletter-signup',
            title: 'Newsletter Signup Block',
            tag: 'Marketing',
            desc: 'Email capture block with headline, body copy, inline input field, and subscribe button.',
            prompt: 'Create a newsletter signup block. It includes an enticing headline like "Join Our Community & Get 10% Off Your First Order," a short body text, an email input field, and a "Subscribe" button. Position the input field and button horizontally. Allow customization of the text and button color.',
            img: null
        },
        {
            id: 'info-card',
            title: 'Vertical Info Card',
            tag: 'Content',
            desc: 'Stacked card with circular image, bold title, description paragraph, and optional CTA.',
            prompt: 'Create a vertical info card block. This card features a small circular image at the top, followed by a bold title, and a descriptive paragraph about a product feature. Include an optional "Learn More" button at the bottom. Allow customization of the image, title, description, and button link.',
            img: null
        },
        {
            id: 'comparison-table',
            title: 'Product Comparison Table',
            tag: 'Product',
            desc: 'Side-by-side feature comparison table with checkmark or Yes/No indicators per attribute.',
            prompt: 'Design a product comparison table. This table allows you to compare two products side-by-side across at least five customizable features. Include a column for features and separate columns for each product to list whether they have that feature (e.g., checkmark/cross icon or "Yes"/"No").',
            img: null
        },
        {
            id: 'featured-collection',
            title: 'Featured Collection Grid',
            tag: 'Product',
            desc: 'Three-per-row product grid with image, title, and price. Supports collection selection and basic filters.',
            prompt: 'Generate a featured collection grid that displays products from a selected collection. The grid should show three products per row on desktop and one on mobile. Include basic filtering options (e.g., by price range, availability). Each product thumbnail should display the product image, title, and price with easy-to-read content. Enable the selection of the featured collection.',
            img: null
        },
        {
            id: 'hero-banner-advanced',
            title: '2-Column Hero (Advanced)',
            tag: 'Hero',
            desc: 'Edge-to-edge hero with a full-bleed image column and complementary colored text column.',
            prompt: 'Create a hero banner with a two-column layout. The Left column (1/2 width) has a full-width image that spans edge-to-edge with no padding or margin. The right column (1/2 width) contains a headline, supporting paragraph, and a call-to-action button. The background of this column should use a soft solid color that complements the image. On mobile devices, stack the image on top and the text below.',
            img: null
        },
        {
            id: 'icon-feature-3col',
            title: '3-Column Icon Feature Section',
            tag: 'Content',
            desc: 'Full-width three-column layout with centered icons, headings, text, and vertical dividers.',
            prompt: 'Create a full-width section with three equally spaced vertical columns, each displaying a center-aligned icon, a bold heading, and a short descriptive text beneath. Include vertical dividers between columns. The section should be edge-to-edge with customizable background color and icon upload support.',
            img: null
        },
        {
            id: 'feature-checklist',
            title: 'Product Feature Checklist',
            tag: 'Product',
            desc: 'Compact horizontal highlight bar containing 3 icon checklist items on a single line — fits perfectly under the product title.',
            prompt: 'Create a small horizontal feature highlight section placed just below the product title. The section should have a soft-colored background with rounded corners, and the color should be customizable. Inside the block, display three feature items fully in one line with even spacing. Each item should include a small green checkmark icon enclosed in a circle on the left, followed by a short, bold text label on the right. Make sure the icons and text are visually balanced on one line, and the entire section aligns with the margins of the product heading and surrounding content.',
            img: '/previews/feature-checklist.png'
        },
        {
            id: 'bakery-custom-collage',
            title: 'Bakery Service Collage',
            tag: 'Content',
            desc: 'Premium bakery "Made Just For You" block — text & check benefits on the left, elegant 5-image masonry collage on the right. Soft cream background.',
            prompt: 'Act as a senior Shopify theme developer. Generate a custom Shopify section matching a premium bakery \'Made Just For You\' service section.\n\nLanguages: Liquid, HTML, CSS (No JavaScript)\n\nLayout:\n- Two column layout (vertically centered alignment, large premium spacing).\n- Left column: Content.\n- Right column: Image collage (Masonry / collage grid with 5 images, large rounded corners, object-fit cover).\n\nLeft Column Content:\n- Badge: "Personalized Just For You" (pill badge with soft background).\n- Heading: Line 1: "Made Just", Line 2: "For You" (with "For You" in an accent highlight color).\n- Description: "Celebrate life\'s special moments with personalized cakes and dessert boxes. From birthdays to anniversaries, we create custom treats that make your celebrations unforgettable."\n- Feature list (checklist style with outline icons):\n  * Custom cake designs for any occasion\n  * Personalized message on cakes\n  * Curated dessert boxes\n  * Corporate gifting options\n- CTA Button: "Request Custom Order" (primary button with rounded corners).\n\nDesign Guidelines:\n- Background color: Soft pastel cream / off-white.\n- Brand style: Elegant premium bakery.\n- Typography: Elegant serif heading, clean readable body text.\n- Hover effects: Subtle image zoom or elevation on the collage images.\n\nSchema settings:\n- Section settings: badge_text, heading_line_1, heading_line_2, description, button_label, button_link.\n- Blocks settings: image_picker (Collage Image, limit to 5 blocks).\n\nOutput: sections/made-just-for-you.liquid code with full schema.',
            img: '/previews/made-just-for-you.png'
        }
    ];

    const allTags = ['All', ...Object.keys(TAG_META)];

    const filtered = prompts.filter(p => {
        const matchTag = activeTag === 'All' || p.tag === activeTag;
        const q = search.toLowerCase();
        const matchSearch = !q || p.title.toLowerCase().includes(q) || p.prompt.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
        return matchTag && matchSearch;
    });

    const featuredCards = filtered.filter(p => p.img);
    const regularCards = filtered.filter(p => !p.img);

    const copyToClipboard = (e, text) => {
        e.stopPropagation();
        navigator.clipboard.writeText(text);
        setToast({ show: true, message: 'Prompt copied — paste into your AI tool!' });
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
    };



    return (
        <div className="sdv-page">

            {/* ── Toast ── */}
            <div className={`sdv-toast ${toast.show ? 'show' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                {toast.message}
            </div>

            {/* ── Hero Header ── */}
            <div className="sdv-hero">
                <div className="sdv-hero-inner">
                    <div className="sdv-hero-top">
                        <div className="sdv-hero-left">
                            <div className="sdv-hero-badges">
                                <span className="sdv-badge-green">
                                    <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="5" /></svg>
                                    Shopify Dev Hub
                                </span>
                                <span className="sdv-badge-count">{prompts.length} prompts</span>
                            </div>
                            <h1 className="sdv-hero-title">
                                AI Prompts for <span className="sdv-title-glow">Shopify Builders</span>
                            </h1>
                        </div>
                        <div className="sdv-search-wrap">
                            <svg className="sdv-search-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                            <input
                                className="sdv-search"
                                placeholder="Search prompts…"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            {search && (
                                <button className="sdv-clear" onClick={() => setSearch('')}>
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="sdv-tags">
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                className={`sdv-tag ${activeTag === tag ? 'active' : ''}`}
                                style={activeTag === tag && TAG_META[tag] ? {
                                    background: TAG_META[tag].color,
                                    borderColor: TAG_META[tag].color,
                                    color: '#fff'
                                } : {}}
                                onClick={() => setActiveTag(tag)}
                            >
                                {TAG_META[tag] ? `${TAG_META[tag].icon} ${tag}` : tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>


            {/* ── Content ── */}
            <div className="sdv-content">

                {/* Results label */}
                <div className="sdv-results-bar">
                    <span>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
                    {(search || activeTag !== 'All') && (
                        <button className="sdv-clear-all" onClick={() => { setSearch(''); setActiveTag('All'); }}>
                            Clear filters
                        </button>
                    )}
                </div>

                {filtered.length === 0 && (
                    <div className="sdv-empty">
                        <div className="sdv-empty-icon">🔍</div>
                        <p>No prompts match your search.</p>
                        <button onClick={() => { setSearch(''); setActiveTag('All'); }}>Reset filters</button>
                    </div>
                )}

                {/* ── Featured Cards (with image) ── */}
                {featuredCards.length > 0 && (
                    <div className="sdv-featured-grid">
                        {featuredCards.map(p => {
                            const meta = TAG_META[p.tag] || {};
                            return (
                                <div key={p.id} className="sdv-featured-card">
                                    <div className="sdv-feat-img">
                                        <img src={p.img} alt={p.title} />
                                        <div className="sdv-feat-img-overlay" />
                                        <span className="sdv-feat-badge">✦ Featured</span>
                                    </div>
                                    <div className="sdv-feat-body">
                                        <div className="sdv-feat-top">
                                            <span className="sdv-card-tag" style={{ background: meta.light, color: meta.color, borderColor: meta.color + '40' }}>
                                                {meta.icon} {p.tag}
                                            </span>
                                        </div>
                                        <h2 className="sdv-feat-title">{p.title}</h2>
                                        <p className="sdv-feat-desc">{p.desc}</p>
                                        <div className="sdv-prompt-box">
                                            <p className="sdv-prompt-text">{p.prompt}</p>
                                        </div>
                                        <button className="sdv-copy-btn primary" onClick={e => copyToClipboard(e, p.prompt)}>
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                                            Copy Prompt
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* ── Regular Cards Grid ── */}
                {regularCards.length > 0 && (
                    <div className="sdv-grid">
                        {regularCards.map((p, idx) => {
                            const meta = TAG_META[p.tag] || { color: '#64748b', light: '#f1f5f9', icon: '📄' };
                            return (
                                <div key={p.id} className="sdv-card" style={{ '--accent': meta.color }}>
                                    <div className="sdv-card-accent-bar" style={{ background: `linear-gradient(90deg, ${meta.color}, ${meta.color}88)` }} />
                                    <div className="sdv-card-inner">
                                        <div className="sdv-card-head">
                                            <span className="sdv-card-tag" style={{ background: meta.light, color: meta.color, borderColor: meta.color + '33' }}>
                                                {meta.icon} {p.tag}
                                            </span>
                                            <span className="sdv-card-num">#{String(idx + 1).padStart(2, '0')}</span>
                                        </div>
                                        <h3 className="sdv-card-title">{p.title}</h3>
                                        <p className="sdv-card-desc">{p.desc}</p>
                                        <div className="sdv-prompt-box compact">
                                            <p className="sdv-prompt-text">{p.prompt}</p>
                                        </div>
                                        <button className="sdv-copy-btn" onClick={e => copyToClipboard(e, p.prompt)}>
                                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                                            Copy
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopifyDev;
