import React, { useState, useEffect } from 'react';
import './ShopifyApps.css';

const SappsDropdown = ({ label, value, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentOption = options.find(o => o.value === value) || options[0];

    useEffect(() => {
        if (!isOpen) return;
        const handleOutsideClick = () => setIsOpen(false);
        window.addEventListener('click', handleOutsideClick);
        return () => window.removeEventListener('click', handleOutsideClick);
    }, [isOpen]);

    return (
        <div className="sapps-dropdown-wrapper" onClick={e => e.stopPropagation()}>
            <label className="sapps-filter-label">{label}</label>
            <div className={`sapps-dropdown-trigger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                <span>{currentOption.label}</span>
                <svg className={`sapps-dropdown-arrow ${isOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            {isOpen && (
                <ul className="sapps-dropdown-menu">
                    {options.map(opt => {
                        const isSelected = opt.value === value;
                        return (
                            <li 
                                key={opt.value}
                                className={`sapps-dropdown-item ${isSelected ? 'selected' : ''}`}
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                            >
                                <span>{opt.label}</span>
                                {isSelected && (
                                    <svg className="sapps-dropdown-check" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

const APP_CATEGORIES_META = {
    'All': { icon: '🛍️', color: '#008060' },
    'Page Builders': { icon: '🎨', color: '#3b82f6' },
    'Marketing': { icon: '📣', color: '#f59e0b' },
    'Social Proof': { icon: '⭐', color: '#ec4899' },
    'SEO & Speed': { icon: '⚡', color: '#8b5cf6' },
    'Subscriptions & Upsell': { icon: '🚀', color: '#06b6d4' },
    'Customer Support': { icon: '💬', color: '#10b981' },
    'Shipping & Delivery': { icon: '📦', color: '#f43f5e' },
    'Inventory & Wholesale': { icon: '🏭', color: '#047857' },
    'Data & Operations': { icon: '📊', color: '#6366f1' }
};

const ShopifyApps = () => {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [toast, setToast] = useState({ show: false, message: '' });
    
    // Advanced Filters State
    const [showFilters, setShowFilters] = useState(false);
    const [priceFilter, setPriceFilter] = useState('All');
    const [ratingFilter, setRatingFilter] = useState('All');
    const [sortBy, setSortBy] = useState('Reviews');

    // Custom Dropdown Option Sets
    const priceOptions = [
        { value: 'All', label: 'All Pricing Types' },
        { value: 'Free', label: 'Forever Free / Free Install' },
        { value: 'Plan', label: 'Free Plan Available' },
        { value: 'Trial', label: 'Free Trial Included' }
    ];

    const ratingOptions = [
        { value: 'All', label: 'All Ratings' },
        { value: '4.8', label: '4.8+ Stars' },
        { value: '4.9', label: '4.9+ Stars' },
        { value: '5.0', label: '5.0 Stars (Perfect)' }
    ];

    const sortOptions = [
        { value: 'Reviews', label: 'Popularity (Most Reviews)' },
        { value: 'Rating', label: 'Highest Rating' }
    ];

    const apps = [
        {
            id: 'pagefly',
            name: 'PageFly Landing Page Builder',
            category: 'Page Builders',
            rating: '4.9',
            reviews: '9,000+',
            price: 'Free plan available',
            desc: 'Create highly responsive, stunning landing pages, product page templates, and homepages with an intuitive zero-code drag-and-drop builder.',
            link: 'https://apps.shopify.com/pagefly',
            benefit: 'Drag & Drop Builder',
            whyBest: 'Provides the most extensive free tier and customizable elements of any Shopify builder.',
            color: 'icon-blue'
        },
        {
            id: 'shogun',
            name: 'Shogun Page Builder',
            category: 'Page Builders',
            rating: '4.7',
            reviews: '3,200+',
            price: '10-day free trial',
            desc: 'Advanced page editor featuring built-in A/B testing, conversion analytics, global site speed optimization, and custom developer elements.',
            link: 'https://apps.shopify.com/shogun',
            benefit: 'A/B Testing & Speed',
            whyBest: 'Best for enterprise stores looking to split test landing pages and optimize loading speed.',
            color: 'icon-blue'
        },
        {
            id: 'gempages',
            name: 'GemPages Powerful Page Builder',
            category: 'Page Builders',
            rating: '4.9',
            reviews: '3,800+',
            price: 'Free plan available',
            desc: 'Design high-converting landing pages, custom homepages, and visual sales funnels using a premium drag-and-drop page editor.',
            link: 'https://apps.shopify.com/gempages',
            benefit: 'Visual Sales Funnels',
            whyBest: 'Unbelievably rich template library designed specifically for quick product drops and drop-shipping funnels.',
            color: 'icon-blue'
        },
        {
            id: 'klaviyo',
            name: 'Klaviyo: Email & SMS',
            category: 'Marketing',
            rating: '4.6',
            reviews: '1,800+',
            price: 'Free to install',
            desc: 'The gold standard e-commerce email marketing suite. Set up advanced customer segmentation, automated email/SMS flows, and rich data campaigns.',
            link: 'https://apps.shopify.com/klaviyo',
            benefit: 'Automated Ecom Flows',
            whyBest: 'Unmatched store data integration allows highly personalized automation and precise revenue tracking.',
            color: 'icon-orange'
        },
        {
            id: 'privy',
            name: 'Privy - Pop Ups, Email & SMS',
            category: 'Marketing',
            rating: '4.6',
            reviews: '24,000+',
            price: 'Free plan available',
            desc: 'Grow your email list rapidly using exit-intent popups, spin-to-win discount wheels, banner alerts, and cart abandonment SMS triggers.',
            link: 'https://apps.shopify.com/privy',
            benefit: 'List Growth Popups',
            whyBest: 'The absolute king of lead capturing widgets, widely trusted with over 24k positive reviews.',
            color: 'icon-orange'
        },
        {
            id: 'omnisend',
            name: 'Omnisend Email & SMS Marketing',
            category: 'Marketing',
            rating: '4.8',
            reviews: '5,000+',
            price: 'Free plan available',
            desc: 'Omnichannel marketing automation specifically built for e-commerce. Send beautiful emails, popups, and automated SMS campaigns.',
            link: 'https://apps.shopify.com/omnisend',
            benefit: 'Omnichannel Automation',
            whyBest: 'Incredibly easy drag-and-drop editor with pre-built automation workflows that save hours of setup.',
            color: 'icon-orange'
        },
        {
            id: 'smile',
            name: 'Smile: Loyalty & Rewards',
            category: 'Marketing',
            rating: '4.8',
            reviews: '5,700+',
            price: 'Free plan available',
            desc: 'Boost customer retention with high-converting loyalty points programs, referral systems, and customized VIP tiered rewards.',
            link: 'https://apps.shopify.com/smile-io',
            benefit: 'Customer Retention Points',
            whyBest: 'The most reliable loyalty points system on Shopify, featuring frictionless cart checkout point redemption.',
            color: 'icon-orange'
        },
        {
            id: 'freeshippingbar',
            name: 'Hextom: Free Shipping Bar',
            category: 'Marketing',
            rating: '4.9',
            reviews: '11,000+',
            price: 'Free plan available',
            desc: 'Drive higher average order value (AOV) by showing a fully customizable, responsive bar at the top of your page with progressive free shipping goals.',
            link: 'https://apps.shopify.com/free-shipping-bar',
            benefit: 'AOV-boosting goal bar',
            whyBest: 'The undisputed king of announcement bars. Simple, highly responsive, and proven to raise conversion rates.',
            color: 'icon-orange'
        },
        {
            id: 'pushowl',
            name: 'PushOwl Web Push Notifications',
            category: 'Marketing',
            rating: '4.8',
            reviews: '2,800+',
            price: 'Free plan available',
            desc: 'Send immediate web push notifications directly to screens. Recover abandoned carts, promote campaigns, and alert back-in-stock items instantly.',
            link: 'https://apps.shopify.com/pushowl',
            benefit: 'High-conversion push ads',
            whyBest: 'Best alternative to emails with up to 5x higher opt-in and click-through rates for instant marketing outreach.',
            color: 'icon-orange'
        },
        {
            id: 'judgeme',
            name: 'Judge.me Product Reviews',
            category: 'Social Proof',
            rating: '5.0',
            reviews: '23,000+',
            price: 'Forever free plan',
            desc: 'Lightning-fast product reviews app supporting photo/video reviews, custom Q&A grids, email review collection, and Google Search rich snippets.',
            link: 'https://apps.shopify.com/judgeme',
            benefit: 'Forever Free Plan',
            whyBest: 'Offers premium features (like photo reviews and Google SEO integration) completely free without limits.',
            color: 'icon-purple'
        },
        {
            id: 'loox',
            name: 'Loox Product Reviews & Photos',
            category: 'Social Proof',
            rating: '4.9',
            reviews: '16,000+',
            price: '14-day free trial',
            desc: 'Visually striking product reviews featuring beautiful grid collages, homepage reviews sliders, popups, and automatic review discount incentives.',
            link: 'https://apps.shopify.com/loox',
            benefit: 'Elegant Photo Grids',
            whyBest: 'Outstanding design and aesthetic that transforms customer photos into stunning, premium social proof widgets.',
            color: 'icon-purple'
        },
        {
            id: 'yotpo',
            name: 'Yotpo Reviews & Photos',
            category: 'Social Proof',
            rating: '4.6',
            reviews: '6,700+',
            price: 'Free plan available',
            desc: 'Collect high-converting product reviews, ratings, customer photos, and custom Q&A grids to build buyer trust and increase conversions.',
            link: 'https://apps.shopify.com/yotpo-social-reviews',
            benefit: 'Google SEO Syndication',
            whyBest: 'Best enterprise reviews suite with direct search results syndication and native integration with Google Shopping ads.',
            color: 'icon-purple'
        },
        {
            id: 'avada',
            name: 'Avada Trust Badges & Icons',
            category: 'Social Proof',
            rating: '4.9',
            reviews: '5,200+',
            price: 'Forever free plan',
            desc: 'Boost buyer trust and conversion rates with highly customizable security badges, shipping trust icons, and payment trust badges.',
            link: 'https://apps.shopify.com/avada-trust-badges',
            benefit: 'Custom security badges',
            whyBest: 'Has a massive library of 500+ premium vector icons to build absolute trust instantly on cart pages.',
            color: 'icon-purple'
        },
        {
            id: 'alireviews',
            name: 'Ali Reviews ‑ Product Reviews',
            category: 'Social Proof',
            rating: '4.9',
            reviews: '13,000+',
            price: '7-day free trial',
            desc: 'Import thousands of customer reviews with photos from AliExpress and Amazon in one click. Display stunning custom review widgets, badges, and grids.',
            link: 'https://apps.shopify.com/ali-reviews-product-reviews',
            benefit: 'One-click AliExpress importer',
            whyBest: 'Essential tool for e-commerce dropshippers to establish instant social proof and credibility overnight.',
            color: 'icon-purple'
        },
        {
            id: 'tinyimg',
            name: 'TinyIMG SEO & Image Optimizer',
            category: 'SEO & Speed',
            rating: '4.9',
            reviews: '1,500+',
            price: 'Free plan available',
            desc: 'Automatically compresses heavy store images, auto-generates SEO-friendly Alt tags, checks meta tags, and fixes site speed bottlenecks.',
            link: 'https://apps.shopify.com/tinyimg-seo-image-optimizer',
            benefit: 'Automatic Speed Boost',
            whyBest: 'Set-it-and-forget-it automated optimization keeps store loading times fast and improves organic ranking.',
            color: 'icon-green'
        },
        {
            id: 'pluginseo',
            name: 'Plug in SEO',
            category: 'SEO & Speed',
            rating: '4.7',
            reviews: '2,500+',
            price: '14-day free trial',
            desc: 'Comprehensive all-in-one SEO dashboard to monitor, edit, and optimize your store\'s search engine visibility, schema data, and broken redirects.',
            link: 'https://apps.shopify.com/plug-in-seo',
            benefit: 'SEO Ranking Checker',
            whyBest: 'Excellent diagnostics tool that provides step-by-step instructions to fix rank-damaging store errors.',
            color: 'icon-green'
        },
        {
            id: 'booster',
            name: 'Booster SEO & Image Optimizer',
            category: 'SEO & Speed',
            rating: '4.9',
            reviews: '6,100+',
            price: 'Free plan available',
            desc: 'All-in-one automated SEO optimization. Auto-fixes meta tags, image Alt text, broken links, and compresses image sizes instantly.',
            link: 'https://apps.shopify.com/booster-seo-image-optimizer',
            benefit: 'Automated Meta Tags',
            whyBest: 'Continuously monitors Google search ranking rules and adjusts store metadata dynamically to stay compliant.',
            color: 'icon-green'
        },
        {
            id: 'recharge',
            name: 'Recharge Subscriptions',
            category: 'Subscriptions & Upsell',
            rating: '4.8',
            reviews: '2,000+',
            price: 'Free to install',
            desc: 'Convert one-time shoppers into lifetime subscribers. Build highly customizable subscriber portals, subscription boxes, and automated recurring billing.',
            link: 'https://apps.shopify.com/recharge-recurring-billing',
            benefit: 'Recurring Revenue Engine',
            whyBest: 'The industry-standard subscription system with fully developer-customizable billing APIs and portals.',
            color: 'icon-orange'
        },
        {
            id: 'fbt',
            name: 'Frequently Bought Together',
            category: 'Subscriptions & Upsell',
            rating: '4.9',
            reviews: '5,800+',
            price: '30-day free trial',
            desc: 'Replicates Amazon\'s intelligent bundle recommendations. Increases Average Order Value (AOV) through automatic single-click bundle upsells.',
            link: 'https://apps.shopify.com/frequently-bought-together',
            benefit: 'AOV Bundle Booster',
            whyBest: 'Highly lightweight widget with powerful AI recommendation algorithms that immediately raise checkouts size.',
            color: 'icon-orange'
        },
        {
            id: 'bold',
            name: 'Bold Subscriptions',
            category: 'Subscriptions & Upsell',
            rating: '4.5',
            reviews: '2,800+',
            price: '60-day free trial',
            desc: 'Create powerful subscription flows, custom interval rules, build-a-box features, and robust customer dashboard management.',
            link: 'https://apps.shopify.com/bold-subscriptions',
            benefit: 'Custom intervals & boxes',
            whyBest: 'Native checkout integration makes customer sub-payments seamless and increases subscriber longevity.',
            color: 'icon-orange'
        },
        {
            id: 'reconvert',
            name: 'ReConvert Post Purchase Upsell',
            category: 'Subscriptions & Upsell',
            rating: '4.9',
            reviews: '4,300+',
            price: 'Free plan available',
            desc: 'Increase store revenues with post-purchase upsells, checkout upsells, dynamic product recommendations, and custom Thank You page drag-and-drop elements.',
            link: 'https://apps.shopify.com/reconvert-upsell-cross-sell',
            benefit: 'One-click upsell conversion',
            whyBest: 'Consistently rated the highest ROI upsell app that captures buyers at their peak moment of purchase.',
            color: 'icon-orange'
        },
        {
            id: 'gorgias',
            name: 'Gorgias ‑ Helpdesk & Live Chat',
            category: 'Customer Support',
            rating: '4.6',
            reviews: '600+',
            price: '7-day free trial',
            desc: 'Centralized helpdesk that combines customer queries from Live Chat, Email, Instagram, Facebook, and Phone into a single organized agent panel.',
            link: 'https://apps.shopify.com/gorgias',
            benefit: 'Unified Ticket Hub',
            whyBest: 'Integrates natively with Shopify order panels, enabling agents to refund, cancel, or edit orders directly inside support chats.',
            color: 'icon-green'
        },
        {
            id: 'tidio',
            name: 'Tidio ‑ Live Chat & Chatbots',
            category: 'Customer Support',
            rating: '4.7',
            reviews: '1,700+',
            price: 'Free plan available',
            desc: 'Convert visitors into buyers with instant Live Chat support, AI-powered chatbots, and centralized customer ticket tracking.',
            link: 'https://apps.shopify.com/tidio-chat',
            benefit: 'AI-Powered Support Bots',
            whyBest: 'Simplest pre-built support chatbots that automatically handle cart rescue and shipping queries 24/7.',
            color: 'icon-green'
        },
        {
            id: 'helpcenter',
            name: 'HelpCenter: FAQ Page & Helpdesk',
            category: 'Customer Support',
            rating: '4.7',
            reviews: '1,300+',
            price: 'Free plan available',
            desc: 'Build beautiful, searchable FAQ pages that answer customer questions instantly. Includes an intuitive customer helpdesk and email ticketing system.',
            link: 'https://apps.shopify.com/helpcenter',
            benefit: 'Searchable FAQ Builder',
            whyBest: 'Creates the most professional, clean FAQ portals that dramatically reduce incoming support inquiry load.',
            color: 'icon-green'
        },
        {
            id: 'shipstation',
            name: 'ShipStation',
            category: 'Shipping & Delivery',
            rating: '4.6',
            reviews: '1,200+',
            price: '30-day free trial',
            desc: 'Import, manage, and ship orders easily. Print discounted shipping labels for USPS, UPS, FedEx, DHL, and more in seconds.',
            link: 'https://apps.shopify.com/shipstation',
            benefit: 'Multi-carrier shipping',
            whyBest: 'The industry-leading shipping tool that automates label printing, tracking updates, and return portals for high-volume stores.',
            color: 'icon-red'
        },
        {
            id: 'easyship',
            name: 'Easyship ‑ All‑in‑One Shipping',
            category: 'Shipping & Delivery',
            rating: '4.5',
            reviews: '380+',
            price: 'Free to install',
            desc: 'Access 250+ couriers and pre-negotiated shipping rates with up to 89% off. Display dynamic taxes, duties, and delivery rates at checkout.',
            link: 'https://apps.shopify.com/easyship',
            benefit: 'Discounted carrier rates',
            whyBest: 'Provides the best automated duties and taxes calculator for international customer checkouts.',
            color: 'icon-red'
        },
        {
            id: 'wholesalegorilla',
            name: 'Wholesale Gorilla B2B & Wholesale',
            category: 'Inventory & Wholesale',
            rating: '4.7',
            reviews: '300+',
            price: '30-day free trial',
            desc: 'Supercharge your B2B commerce. Set custom wholesale price lists, net terms (Net 15/30/60), minimum order limits, and custom wholesale registration forms.',
            link: 'https://apps.shopify.com/wholesale-gorilla',
            benefit: 'Seamless B2B portal',
            whyBest: 'The most reliable and customizable Wholesale/B2B portal builder that integrates perfectly without split-store setups.',
            color: 'icon-green'
        },
        {
            id: 'katana',
            name: 'Katana Cloud Manufacturing ERP',
            category: 'Inventory & Wholesale',
            rating: '4.8',
            reviews: '150+',
            price: '14-day free trial',
            desc: 'Keep track of inventory, raw materials, manufacturing schedules, and multi-channel sales orders in real time with a powerful modern ERP.',
            link: 'https://apps.shopify.com/katana',
            benefit: 'Production & ERP tracking',
            whyBest: 'Outstanding visual interface designed specifically for maker-manufacturers and D2C brands who build their own goods.',
            color: 'icon-green'
        },
        {
            id: 'matrixify',
            name: 'Matrixify (Excelify)',
            category: 'Data & Operations',
            rating: '4.9',
            reviews: '400+',
            price: 'Free plan available',
            desc: 'Bulk import, export, update, and migrate massive e-commerce store data (products, orders, collections, customers) using Excel or Google Sheets.',
            link: 'https://apps.shopify.com/excelify',
            benefit: 'Bulk Sheets Migration',
            whyBest: 'The ultimate developer tool for handling complex data migrations and bulk product updates without API timeouts.',
            color: 'icon-blue'
        },
        {
            id: 'orderprinter',
            name: 'Order Printer: PDF Invoice',
            category: 'Data & Operations',
            rating: '4.8',
            reviews: '12,000+',
            price: 'Forever free',
            desc: 'Easily print high-quality invoices, receipts, packing slips, and order sheets directly from your Shopify admin.',
            link: 'https://apps.shopify.com/order-printer',
            benefit: 'PDF packing invoices',
            whyBest: 'Official free utility from Shopify to generate standard, custom-branded PDF packing invoices instantly.',
            color: 'icon-blue'
        },
        {
            id: 'rewind',
            name: 'Rewind Backups & Disaster Recovery',
            category: 'Data & Operations',
            rating: '4.8',
            reviews: '1,000+',
            price: '7-day free trial',
            desc: 'Automatic daily backups for your Shopify store. Securely back up products, images, themes, metadata, orders, and customer lists to prevent data loss.',
            link: 'https://apps.shopify.com/rewind-backups',
            benefit: 'Continuous automated backups',
            whyBest: 'The gold standard for e-commerce store safety. Sleep peacefully knowing you can undo any mistakes or code crashes instantly.',
            color: 'icon-blue'
        }
    ];

    // Automatically generate unique category list dynamically from the actual apps array
    const categories = ['All', ...new Set(apps.map(app => app.category))];

    const filteredApps = apps
        .filter(app => {
            const matchCategory = activeCategory === 'All' || app.category === activeCategory;
            
            const q = search.toLowerCase();
            const matchSearch = !q || 
                app.name.toLowerCase().includes(q) || 
                app.desc.toLowerCase().includes(q) || 
                app.benefit.toLowerCase().includes(q);
            
            // Price Filter Matching
            let matchPrice = true;
            if (priceFilter === 'Free') {
                const lowerPrice = app.price.toLowerCase();
                matchPrice = lowerPrice.includes('forever free') || lowerPrice.includes('free to install');
            } else if (priceFilter === 'Plan') {
                matchPrice = app.price.toLowerCase().includes('plan');
            } else if (priceFilter === 'Trial') {
                matchPrice = app.price.toLowerCase().includes('trial');
            }

            // Rating Filter Matching
            let matchRating = true;
            if (ratingFilter !== 'All') {
                const appRatingNum = parseFloat(app.rating);
                const filterRatingNum = parseFloat(ratingFilter);
                if (ratingFilter === '5.0') {
                    matchRating = appRatingNum === 5.0;
                } else {
                    matchRating = appRatingNum >= filterRatingNum;
                }
            }

            return matchCategory && matchSearch && matchPrice && matchRating;
        })
        .sort((a, b) => {
            if (sortBy === 'Rating') {
                return parseFloat(b.rating) - parseFloat(a.rating);
            } else {
                // Parse Reviews (e.g. "24,000+" -> 24000)
                const getReviewCount = (reviewStr) => {
                    const cleanStr = reviewStr.replace(/,/g, '').replace(/\+/g, '');
                    return parseInt(cleanStr, 10) || 0;
                };
                return getReviewCount(b.reviews) - getReviewCount(a.reviews);
            }
        });

    const triggerToast = (appName) => {
        setToast({ show: true, message: `Copied "${appName}" to clipboard!` });
        navigator.clipboard.writeText(appName);
        setTimeout(() => setToast({ show: false, message: '' }), 2500);
    };

    return (
        <div className="sapps-container">
            {/* ── Notification Toast ── */}
            <div className={`sapps-toast ${toast.show ? 'show' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {toast.message}
            </div>

            {/* ── Hero section ── */}
            <div className="sapps-hero">
                <div className="sapps-hero-inner">
                    <div className="sapps-hero-top">
                        <div className="sapps-hero-left">
                            <div className="sapps-hero-badges">
                                <span className="sapps-badge-green">
                                    <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="5" /></svg>
                                    Shopify App Hub
                                </span>
                                <span className="sapps-badge-count">{filteredApps.length} app{filteredApps.length !== 1 ? 's' : ''}</span>
                            </div>
                            <h1 className="sapps-hero-title">
                                Best Apps for <span className="sapps-title-glow">Shopify Builders</span>
                            </h1>
                            <p className="sapps-hero-subtitle">
                                Handpicked, high-conversion apps designed to supercharge your design, automation, speed, and revenues.
                            </p>
                        </div>
                        
                        <div className="sapps-search-row">
                            <div className="sapps-search-wrap">
                                <svg className="sapps-search-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                                <input
                                    className="sapps-search"
                                    placeholder="Search apps…"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                                {search && (
                                    <button className="sapps-clear" onClick={() => setSearch('')}>
                                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                    </button>
                                )}
                            </div>
                            <button 
                                className={`sapps-filter-toggle ${showFilters ? 'active' : ''}`}
                                onClick={() => setShowFilters(!showFilters)}
                                title="Toggle advanced filters"
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 12h6" />
                                </svg>
                                Filters
                            </button>
                        </div>
                    </div>

                    {/* ── Advanced Filters Drawer ── */}
                    {showFilters && (
                        <div className="sapps-filters-drawer">
                            <SappsDropdown 
                                label="Pricing Structure"
                                value={priceFilter}
                                options={priceOptions}
                                onChange={setPriceFilter}
                            />
                            <SappsDropdown 
                                label="Rating Requirement"
                                value={ratingFilter}
                                options={ratingOptions}
                                onChange={setRatingFilter}
                            />
                            <SappsDropdown 
                                label="Sort Directory"
                                value={sortBy}
                                options={sortOptions}
                                onChange={setSortBy}
                            />
                        </div>
                    )}

                    <div className="sapps-tags">
                        {categories.map(cat => {
                            const info = APP_CATEGORIES_META[cat] || { icon: '🛍️', color: '#008060' };
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    className={`sapps-tag ${isActive ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat)}
                                    style={isActive ? {
                                        background: info.color,
                                        borderColor: info.color,
                                        color: '#fff',
                                        boxShadow: `0 2px 8px ${info.color}33`
                                    } : {}}
                                >
                                    {info.icon} {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Main Apps Grid ── */}
            <main className="sapps-grid-wrapper">
                <div className="sapps-results-count">
                    Found <strong>{filteredApps.length}</strong> top-performing Shopify app{filteredApps.length !== 1 ? 's' : ''}
                </div>

                {filteredApps.length === 0 ? (
                    <div className="sapps-empty-state">
                        <span className="sapps-empty-icon">🔍</span>
                        <h3>No Apps Match Your Query</h3>
                        <p>Try searching for a different category or clearing your current text search filter.</p>
                        <button className="btn-primary" onClick={() => { 
                            setSearch(''); 
                            setActiveCategory('All'); 
                            setPriceFilter('All');
                            setRatingFilter('All');
                            setSortBy('Reviews');
                        }}>
                            Clear All Filters
                        </button>
                    </div>
                ) : (
                    <div className="sapps-grid">
                        {filteredApps.map(app => (
                            <article key={app.id} className="sapps-card">
                                <div className="sapps-card-header">
                                    <div className={`sapps-icon-box ${app.color}`}>
                                        <img
                                            src={`https://www.google.com/s2/favicons?domain=${new URL(app.link).hostname}&sz=64`}
                                            alt={app.name}
                                            className="sapps-favicon"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    </div>
                                    <div className="sapps-title-area">
                                        <div className="sapps-meta-row">
                                            <span className="sapps-tag sapps-category-badge">{app.category}</span>
                                            <span className="sapps-rating-badge">★ {app.rating} <small>({app.reviews})</small></span>
                                        </div>
                                        <h3 className="sapps-app-name" onClick={() => triggerToast(app.name)} title="Click to copy name">
                                            {app.name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="sapps-card-body">
                                    <p className="sapps-app-desc">{app.desc}</p>
                                    
                                    <div className="sapps-highlight-box">
                                        <strong>⭐ Why it's the best:</strong>
                                        <p>{app.whyBest}</p>
                                    </div>

                                    <div className="sapps-badges-row">
                                        <span className="sapps-badge-benefit">✓ {app.benefit}</span>
                                        <span className="sapps-badge-price">💰 {app.price}</span>
                                    </div>
                                </div>

                                <footer className="sapps-card-footer">
                                    <button className="sapps-copy-name-btn" onClick={() => triggerToast(app.name)}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <rect x="9" y="9" width="13" height="13" rx="2" />
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                        </svg>
                                        Copy Name
                                    </button>
                                    <a href={app.link} target="_blank" rel="noopener noreferrer" className="sapps-visit-btn">
                                        Visit App Store
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                        </svg>
                                    </a>
                                </footer>
                            </article>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default ShopifyApps;
