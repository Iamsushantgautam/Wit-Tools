import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Simple Icon Components (SVG)
const PdfIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

const QrIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5A2.25 2.25 0 006 10.5h4.5a2.25 2.25 0 002.25-2.25v-4.5A2.25 2.25 0 0010.5 1.5H6a2.25 2.25 0 00-2.25 2.25zM13.5 3.75v4.5A2.25 2.25 0 0015.75 10.5h4.5a2.25 2.25 0 002.25-2.25v-4.5A2.25 2.25 0 0020.25 1.5h-4.5A2.25 2.25 0 0013.5 3.75zM3.75 15.75v4.5A2.25 2.25 0 006 22.5h4.5A2.25 2.25 0 0012.75 20.25v-4.5A2.25 2.25 0 0010.5 13.5H6A2.25 2.25 0 003.75 15.75zM16.5 15.75v3m0 3v.75m3-.75v.75m0-3.75v3m0-.75h-3m3 0h.75" />
    </svg>
);

const BgIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M5.636 5.636l3.536 3.536m0 5.656l-3.536 3.536M8 4h8M4 8v8m16-8v8M8 20h8" opacity="0.4" />
    </svg>
);
const SvgIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18c3.5-6 6.5-6 10 0s6.5 6 9.75 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c3.5-6 6.5-6 10 0s6.5 6 9.75 0" opacity="0.6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6c3.5-6 6.5-6 10 0s6.5 6 9.75 0" opacity="0.3" />
    </svg>
);

const ImageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
);

const CompressIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" />
    </svg>
);

const WatermarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
);

const VideoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-12-3h12m-12-3h12m-12-3h12m-12-3h12m-12-3h12M15 3v18M9 3v18m3-18v18M3 3.75h18c.621 0 1.125.504 1.125 1.125v14.25c0 .621-.504 1.125-1.125 1.125H3a1.125 1.125 0 01-1.125-1.125V4.875C1.875 4.254 2.379 3.75 3 3.75z" />
    </svg>
);

const SecurityIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
);

const WitcetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9s-2.015-9-4.5-9m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 18c-5.922 0-9-7-9-9s3.078-9 9-9 9 7 9 9-3.078 9-9 9z" />
    </svg>
);

const ScreelyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316A2.192 2.192 0 0014.502 4h-5c-.75 0-1.42.424-1.785 1.077l-.89 1.098zM12 15.75a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
);

const ShopifyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="28" height="28">
        <path fill="#7cb342" d="M37.216,11.78c-0.023-0.211-0.211-0.305-0.351-0.305s-3.21-0.234-3.21-0.234s-2.132-2.132-2.39-2.343c-0.234-0.234-0.68-0.164-0.867-0.117c-0.023,0-0.469,0.141-1.195,0.375c-0.726-2.086-1.968-3.984-4.194-3.984h-0.211C24.187,4.375,23.391,4,22.735,4c-5.155,0-7.639,6.444-8.412,9.725c-2.015,0.633-3.445,1.054-3.609,1.125c-1.125,0.351-1.148,0.375-1.289,1.429c-0.117,0.797-3.046,23.456-3.046,23.456L29.179,44l12.373-2.671C41.575,41.282,37.24,11.991,37.216,11.78z M27.937,9.483c-0.562,0.164-1.242,0.375-1.921,0.609V9.671c0-1.265-0.164-2.296-0.469-3.117C26.718,6.695,27.445,7.984,27.937,9.483L27.937,9.483z M24.117,6.812c0.305,0.797,0.516,1.922,0.516,3.468v0.234c-1.265,0.398-2.601,0.797-3.984,1.242C21.422,8.804,22.899,7.351,24.117,6.812L24.117,6.812z M22.617,5.359c0.234,0,0.469,0.094,0.656,0.234c-1.664,0.773-3.421,2.718-4.148,6.655	c-1.101,0.351-2.156,0.656-3.163,0.984C16.806,10.233,18.915,5.359,22.617,5.359z"></path>
        <path fill="#558b2f" d="M36.865,11.428c-0.141,0-3.21-0.234-3.21-0.234s-2.132-2.132-2.39-2.343C31.17,8.757,31.053,8.71,30.96,8.71L29.249,44l12.373-2.671c0,0-4.335-29.338-4.359-29.549C37.169,11.569,37.005,11.475,36.865,11.428z"></path>
        <path fill="#fff" d="M24.792,18.593l-1.475,4.449c0,0-1.337-0.715-2.927-0.715c-2.374,0-2.489,1.498-2.489,1.867c0,2.028,5.301,2.812,5.301,7.583c0,3.757-2.374,6.177-5.578,6.177c-3.872,0-5.808-2.397-5.808-2.397l1.037-3.411c0,0,2.028,1.752,3.734,1.752c1.129,0,1.59-0.876,1.59-1.521c0-2.651-4.333-2.766-4.333-7.145c0-3.665,2.628-7.214,7.952-7.214C23.777,17.994,24.792,18.593,24.792,18.593z"></path>
    </svg>
);

const ChromeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 8c2.2 0 4 1.8 4 4" />
        <path d="M12 2v6" />
        <path d="M12 16v6" />
        <path d="M2 12h6" />
        <path d="M16 12h6" />
    </svg>
);

// --- Global Home Configuration (Change Category Order Here) ---
const HOME_CATEGORY_ORDER = [
    'Image Tools',
    'PDF Tools',
    'Utility Tools',
    'Shopify Tools',
    'Chrome Extension',
    'Design & Icon Websites',
    'AI & Research Websites',
    'Developer & Cloud Websites'
];

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    // Simulate initial loading
    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

    const tools = [
        { id: 'img-to-pdf', title: 'Image to PDF', desc: 'Convert images to high-quality PDF docs.', icon: <PdfIcon />, category: 'Image Tools', color: 'icon-blue', tags: ['PDF', 'Convert', 'Image'], isVisible: true },
        { id: 'img-resizer', title: 'Image Resizer', desc: 'Change dimensions with high precision.', icon: <CompressIcon />, category: 'Image Tools', color: 'icon-blue', tags: ['Resize', 'Dimension', 'Image'], isVisible: true },
        { id: 'img-optimizer', title: 'Image Optimizer', desc: 'Resize and compress file size in one go.', icon: <BgIcon />, category: 'Image Tools', color: 'icon-green', tags: ['Compress', 'Resize', 'Image'], isVisible: true },
        { id: 'img-converter', title: 'Image Converter', desc: 'Change format to JPG, PNG, WebP, etc.', icon: <QrIcon />, category: 'Image Tools', color: 'icon-orange', tags: ['Convert', 'Format', 'Image'], isVisible: true },
        { id: 'png-to-webp', title: 'PNG to WEBP Converter', desc: 'Convert PNG to WEBP in bulk, with premium folder structure support and side-by-side before/after comparison.', icon: <ImageIcon />, category: 'Image Tools', color: 'icon-purple', tags: ['WEBP', 'PNG', 'Convert', 'Bulk'], isVisible: true },
        { id: 'img-compressor', title: 'Image Compressor', desc: 'Reduce file size while keeping quality.', icon: <CompressIcon />, category: 'Image Tools', color: 'icon-green', tags: ['Compress', 'Optimize', 'Image'], isVisible: true },
        { id: 'bg-remover', title: 'Remove BG', desc: 'AI-powered automatic background removal.', icon: <BgIcon />, category: 'Image Tools', color: 'icon-purple', tags: ['AI', 'Background', 'Image'], isVisible: true },
        { id: 'profile-maker', title: 'Profile Maker', desc: 'Create professional avatars with AI.', icon: <UserIcon />, category: 'Utility Tools', color: 'icon-orange', tags: ['AI', 'Avatar', 'Image'], isVisible: true },
        { id: 'pdf-compressor', title: 'Compress PDF', desc: 'Reduce PDF file size significantly.', icon: <PdfIcon />, category: 'PDF Tools', color: 'icon-red', tags: ['PDF', 'Compress', 'Optimize'], isVisible: true },
        { id: 'pdf-merge', title: 'Merge PDF', desc: 'Combine multiple PDFs into one.', icon: <PdfIcon />, category: 'PDF Tools', color: 'icon-blue', tags: ['PDF', 'Merge', 'Combine'], isVisible: true },
        { id: 'pdf-split', title: 'Split PDF', desc: 'Extract pages or split into parts.', icon: <PdfIcon />, category: 'PDF Tools', color: 'icon-red', tags: ['PDF', 'Split', 'Extract'], isVisible: true },
        { id: 'pdf-page-number', title: 'Page Number', desc: 'Add visible page numbers to PDFs.', icon: <PdfIcon />, category: 'PDF Tools', color: 'icon-blue', tags: ['PDF', 'Page Numbers'], isVisible: true },
        { id: 'pdf-security', title: 'PDF Password', desc: 'Lock or Unlock your PDF documents.', icon: <SecurityIcon />, category: 'PDF Tools', color: 'icon-purple', tags: ['PDF', 'Security', 'Password'], isVisible: false },
        { id: 'pdf-to-img', title: 'PDF to Image', desc: 'Convert PDF pages to individual images.', icon: <PdfIcon />, category: 'PDF Tools', color: 'icon-red', tags: ['PDF', 'Convert', 'Image'], isVisible: true },
        { id: 'watermark', title: 'Watermark', desc: 'Add stamps to your Photos & PDFs.', icon: <WatermarkIcon />, category: 'Utility Tools', color: 'icon-blue', tags: ['Watermark', 'Security', 'Branding'], isVisible: true },
        { id: 'qr-generator', title: 'QR Generator', desc: 'Generate custom QR codes instantly.', icon: <QrIcon />, category: 'Utility Tools', color: 'icon-orange', tags: ['QR', 'Generator', 'Utility'], isVisible: true },
        { id: 'yt-screenshot', title: 'Video Screenshot', desc: 'Capture frames from videos every X seconds.', icon: <VideoIcon />, category: 'Utility Tools', color: 'icon-red', tags: ['Video', 'Screenshot', 'Frame'], isVisible: true },
        { id: 'svg-generator', title: 'SVG Wave & Pattern Studio', desc: 'Design layered vector waves and seamless repeating patterns.', icon: <SvgIcon />, category: 'Utility Tools', color: 'icon-purple', tags: ['SVG', 'Vector', 'Pattern', 'Wave'], isVisible: true },

        { id: 'shopify-dev', title: 'Shopify Ai Prompts for sections', desc: 'Expert AI prompts for Shopify section developers.', icon: <ShopifyIcon />, category: 'Shopify Tools', color: 'icon-green', tags: ['AI', 'Shopify', 'Prompts', 'Dev'], isVisible: true },
        { id: 'shopify-apps', title: 'Best Shopify Apps Directory', desc: 'A curated directory of the absolute best Shopify apps to boost conversions, design, and sales.', icon: <ShopifyIcon />, category: 'Shopify Tools', color: 'icon-green', tags: ['Shopify', 'Apps', 'Marketing', 'Ecom'], isVisible: true },
        { id: 'shopify-scraper', title: 'Shopify Product Scraper', desc: 'Powerful Chrome extension for bulk extracting Shopify product data.', icon: <ShopifyIcon />, category: 'Chrome Extension', color: 'icon-green', isExternal: true, url: 'https://github.com/Iamsushantgautam/Chrome-extension/tree/main/shopify%20product%20scraper', useFavicon: false, tags: ['Shopify', 'Chrome', 'Scraper', 'Extension'], isVisible: true },
        { id: 'coming-soon', title: 'Media Downloader', desc: 'Download media from various sources.', icon: <VideoIcon />, category: 'Chrome Extension', color: 'icon-blue', tags: ['Chrome', 'Downloader', 'Media'], isVisible: true },
        { id: 'coming-soon', title: 'Browser Text Copier', desc: 'Copy text from websites that restrict selection and copy functionality.', icon: <ChromeIcon />, category: 'Chrome Extension', color: 'icon-purple', tags: ['Chrome', 'Copy', 'Utility'], isVisible: true },
        { id: 'icons8', title: 'Icons8', desc: 'Premium library for professional icons, photos, and creative assets.', icon: <QrIcon />, category: 'Design & Icon Websites', color: 'icon-green', isExternal: true, url: 'https://icons8.com/', tags: ['Icons', 'Design', 'Stock'], isVisible: true },
        { id: 'colorhunt', title: 'Color Hunt', desc: 'Curated color palettes for designers and artists. Find the perfect scheme.', icon: <QrIcon />, category: 'Design & Icon Websites', color: 'icon-purple', isExternal: true, url: 'https://colorhunt.co/', tags: ['Color', 'Palette', 'Design'], isVisible: true },
        { id: 'witcet', title: 'Witcet.online', desc: 'Visit our partner site for advanced AI resources, creative assets, and more digital utilities.', icon: <WitcetIcon />, category: 'AI & Research Websites', color: 'icon-purple', isExternal: true, url: 'https://witcet.online', tags: ['AI', 'Resources', 'Utilities'], isVisible: false },
        { id: 'portfolio', title: 'Sushant\'s Portfolio', desc: 'Explore the full creative development portfolio of the developer.', icon: <UserIcon />, category: 'Developer & Cloud Websites', color: 'icon-blue', isExternal: true, url: 'https://sushant.online', tags: ['Portfolio', 'Developer', 'Showcase'], isVisible: false },
        { id: 'stitch', title: 'Stitch', desc: 'Professional UI and screen creation platform designed for creative developers.', icon: <QrIcon />, category: 'Design & Icon Websites', color: 'icon-blue', isExternal: true, url: 'https://stitch.withgoogle.com/', tags: ['UI', 'Screen', 'Design', 'Google'], isVisible: true },
        { id: 'mokkify', title: 'Mokkify', desc: 'Mokkify.com is a free Shopify mockups generator for creating realistic product photos and videos.', icon: <QrIcon />, category: 'Design & Icon Websites', color: 'icon-blue', isExternal: true, url: 'https://mokkify.com/', tags: ['Shopify', 'Mockup', 'Product', 'Video'], isVisible: true },
        { id: 'notebooklm', title: 'NotebookLM', desc: 'Next-generation AI research and writing environment powered by Google Gemini.', icon: <QrIcon />, category: 'AI & Research Websites', color: 'icon-purple', isExternal: true, url: 'https://notebooklm.google/', tags: ['AI', 'Research', 'Notes', 'Google'], isVisible: true },
        { id: 'aiven', title: 'Aiven', desc: 'Fully managed cloud database services and high-performance MySQL hosting.', icon: <QrIcon />, category: 'Developer & Cloud Websites', color: 'icon-blue', isExternal: true, url: 'https://aiven.io/', tags: ['Database', 'MySQL', 'Cloud', 'Hosting'], isVisible: true },
        { id: 'brevo', title: 'Brevo', desc: 'High-performance transactional email API, SMTP relay, and email marketing services.', icon: <QrIcon />, category: 'Developer & Cloud Websites', color: 'icon-green', isExternal: true, url: 'https://www.brevo.com/', tags: ['Email', 'SMTP', 'API', 'Marketing'], isVisible: true },
        { id: 'svgrepo', title: 'SVG Repo', desc: 'Free SVG vectors and icons library with 500,000+ ready-to-use SVGs.', icon: <SvgIcon />, category: 'Design & Icon Websites', color: 'icon-orange', isExternal: true, url: 'https://www.svgrepo.com/', tags: ['SVG', 'Icons', 'Vector', 'Free'], isVisible: true },
        { id: 'websitemockup', title: 'Website Mockup Generator', desc: 'Generate beautiful, premium device mockups of any website instantly.', icon: <ScreelyIcon />, category: 'Design & Icon Websites', color: 'icon-blue', isExternal: true, url: 'https://websitemockupgenerator.com/', tags: ['Mockup', 'Design', 'Website', 'Preview'], isVisible: true },
        { id: 'pomelli', title: 'Google Pomelli', desc: 'Experimental AI creative lab by Google for generative design and creative writing.', icon: <QrIcon />, category: 'AI & Research Websites', color: 'icon-purple', isExternal: true, url: 'https://labs.google.com/u/0/pomelli/', tags: ['AI', 'Google', 'Creative', 'Art'], isVisible: true },
        { id: 'cronjob', title: 'Cron-job.org', desc: 'Free online cron job scheduler to automate HTTP requests, cron jobs, and webhooks.', icon: <QrIcon />, category: 'Developer & Cloud Websites', color: 'icon-green', isExternal: true, url: 'https://console.cron-job.org/login', tags: ['Cron', 'Automation', 'DevOps', 'Schedule'], isVisible: true },
        { id: 'twilio', title: 'Twilio', desc: 'Build and manage SMS, voice, WhatsApp, and email communication APIs from the Twilio developer console.', icon: <QrIcon />, category: 'Developer & Cloud Websites', color: 'icon-red', isExternal: true, url: 'https://console.twilio.com/', tags: ['SMS', 'API', 'Voice', 'Communication', 'Cloud'], isVisible: true },
    ];

    const filteredTools = tools.filter(tool => {
        if (tool.isVisible === false) return false;
        const matchCategory = activeCategory === 'All' || tool.category === activeCategory;
        const q = searchTerm.toLowerCase();
        const matchSearch = !q ||
            tool.title.toLowerCase().includes(q) ||
            tool.desc.toLowerCase().includes(q) ||
            tool.category.toLowerCase().includes(q) ||
            (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(q)));
        return matchCategory && matchSearch;
    });

    const ToolCardSkeleton = () => (
        <div className="tool-card skeleton">
            <div className="tool-card-top">
                <div className="tool-icon-wrapper skeleton-box" style={{ width: '60px', height: '60px' }}></div>
                <div className="tool-title-wrapper">
                    <div className="skeleton-box" style={{ width: '120px', height: '20px', marginBottom: '8px' }}></div>
                    <div className="skeleton-box" style={{ width: '60px', height: '14px' }}></div>
                </div>
            </div>
            <div className="tool-card-body">
                <div className="skeleton-box" style={{ width: '100%', height: '16px', marginBottom: '8px' }}></div>
                <div className="skeleton-box" style={{ width: '80%', height: '16px' }}></div>
            </div>
            <div className="tool-card-footer">
                <div className="skeleton-box" style={{ width: '100%', height: '48px', borderRadius: '14px' }}></div>
            </div>
        </div>
    );

    const categories = ['Image Tools', 'Utility Tools', 'PDF Tools', 'Shopify Tools', 'Chrome Extension', 'Design & Icon Websites', 'AI & Research Websites', 'Developer & Cloud Websites'];

    return (
        <div className="home-container">
            <header className="hero-section">
                <h1 className="home-title">The Master Hub for <span style={{ color: 'var(--primary)' }}>Tools</span></h1>
                <p className="home-subtitle">
                    Effortless processing. Instant results. 100% Secure.
                </p>

                <div className="search-container">
                    <div className={`search-bar ${searchTerm ? 'has-value' : ''}`}>
                        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search tools, tags, or categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button className="search-clear-btn" onClick={() => setSearchTerm('')} title="Clear">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Category Filter Pills */}
                    {/* <div className="home-cat-pills">
                        {['All', ...HOME_CATEGORY_ORDER].map(cat => (
                            <button
                                key={cat}
                                className={`home-cat-pill ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div> */}

                    {/* Results Count */}
                    {(searchTerm || activeCategory !== 'All') && (
                        <div className="home-search-meta">
                            <span className="home-result-count"><strong>{filteredTools.length}</strong> result{filteredTools.length !== 1 ? 's' : ''}</span>
                            <button className="home-clear-all" onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}>
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <div className="tools-sections-wrapper">
                {HOME_CATEGORY_ORDER.map(cat => {
                    const sectionTools = filteredTools.filter(t => t.category === cat);
                    if (sectionTools.length === 0) return null;

                    return (
                        <section key={cat} className="tool-category-section">
                            <div className="section-header">
                                <h2 className="section-title">{cat}</h2>
                                <div className="section-line"></div>
                            </div>
                            <div className="tool-grid">
                                {isLoading ? (
                                    Array(3).fill(0).map((_, i) => <ToolCardSkeleton key={i} />)
                                ) : (
                                    sectionTools.map(tool => {
                                        const cardProps = {
                                            key: tool.id,
                                            className: "tool-card"
                                        };

                                        const cardContent = (
                                            <>
                                                <div className="tool-card-top">
                                                    <div className={`tool-icon-wrapper ${tool.color}`}>
                                                        {tool.isExternal && tool.url && tool.useFavicon !== false ? (
                                                            <img
                                                                src={`https://www.google.com/s2/favicons?domain=${new URL(tool.url).hostname}&sz=64`}
                                                                alt={tool.title}
                                                                className="tool-favicon"
                                                                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                                                            />
                                                        ) : null}
                                                        <div style={{ display: (tool.isExternal && tool.url && tool.useFavicon !== false) ? 'none' : 'block' }}>
                                                            {tool.icon}
                                                        </div>
                                                    </div>
                                                    <div className="tool-title-wrapper">
                                                        <h3>{tool.title}</h3>
                                                        <span className="tool-badge">{tool.category.replace(' Tools', '').replace(' Websites', '')}</span>
                                                    </div>
                                                </div>

                                                <div className="tool-card-body">
                                                    <p>{tool.desc}</p>
                                                    {tool.tags && tool.tags.length > 0 && (
                                                        <div className="tool-tags">
                                                            {tool.tags.map(tag => (
                                                                <span key={tag} className="tool-tag">{tag}</span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* <div className="tool-card-footer">
                                                <div className="tool-action-btn">
                                                    <span>{tool.isExternal ? 'Visit Website' : 'Open Tool'}</span>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                                                </div>
                                            </div> */}
                                            </>
                                        );

                                        if (tool.isExternal) {
                                            return (
                                                <a {...cardProps} href={tool.url} target="_blank" rel="noopener noreferrer">
                                                    {cardContent}
                                                </a>
                                            );
                                        }

                                        const toPath = tool.id === 'coming-soon'
                                            ? `/coming-soon?tool=${encodeURIComponent(tool.title)}`
                                            : `/${tool.id}`;

                                        return (
                                            <Link {...cardProps} to={toPath}>
                                                {cardContent}
                                            </Link>
                                        );
                                    })
                                )}
                            </div>
                        </section>
                    );
                })}

                {filteredTools.length === 0 && (
                    <div className="no-results">
                        <div className="no-results-icon">🔍</div>
                        <h3>No tools found matching "{searchTerm}"</h3>
                        <p>Try searching for broader terms like "Image" or "PDF".</p>
                        <button className="btn-secondary" onClick={() => setSearchTerm('')}>Clear Search</button>
                    </div>
                )}
            </div>



            {/* <section className="featured-partner-section">
                <div className="section-header">
                    <h2 className="section-title">Explore More</h2>
                    <div className="section-line"></div>
                </div>
                <a href="https://witcet.online" target="_blank" rel="noopener noreferrer" className="partner-banner-card">
                    <div className="partner-content">
                        <div className="partner-badge">Partner Platform</div>
                        <h3>Witcet.online</h3>
                        <p>Visit our partner site for advanced AI resources, creative assets, and more digital utilities.</p>
                    </div>
                    <div className="partner-action">
                        <span>Visit Website</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                    </div>
                </a>
            </section> */}
        </div>
    );
};

export default Home;
