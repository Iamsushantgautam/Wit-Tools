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

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const tools = [
        { id: 'img-to-pdf', title: 'Image to PDF', desc: 'Convert images to high-quality PDF docs.', icon: <PdfIcon />, category: 'Image Tools', color: 'icon-blue', isVisible: true },
        { id: 'img-resizer', title: 'Image Resizer', desc: 'Change dimensions with high precision.', icon: <CompressIcon />, category: 'Image Tools', color: 'icon-blue', isVisible: true },
        { id: 'img-optimizer', title: 'Image Optimizer', desc: 'Resize and compress file size in one go.', icon: <BgIcon />, category: 'Image Tools', color: 'icon-green', isVisible: true },
        { id: 'img-converter', title: 'Image Converter', desc: 'Change format to JPG, PNG, WebP, etc.', icon: <QrIcon />, category: 'Image Tools', color: 'icon-orange', isVisible: true },
        { id: 'img-compressor', title: 'Image Compressor', desc: 'Reduce file size while keeping quality.', icon: <CompressIcon />, category: 'Image Tools', color: 'icon-green', isVisible: true },
        { id: 'bg-remover', title: 'Remove BG', desc: 'AI-powered automatic background removal.', icon: <BgIcon />, category: 'Image Tools', color: 'icon-purple', isVisible: true },
        { id: 'profile-maker', title: 'Profile Maker', desc: 'Create professional avatars with AI.', icon: <UserIcon />, category: 'Utility Tools', color: 'icon-orange', isVisible: true },
        { id: 'pdf-compressor', title: 'Compress PDF', desc: 'Reduce PDF file size significantly.', icon: <PdfIcon />, category: 'PDF Tools', color: 'icon-red', isVisible: true },
        { id: 'pdf-merge', title: 'Merge PDF', desc: 'Combine multiple PDFs into one.', icon: <PdfIcon />, category: 'PDF Tools', color: 'icon-blue', isVisible: true },
        { id: 'pdf-split', title: 'Split PDF', desc: 'Extract pages or split into parts.', icon: <PdfIcon />, category: 'PDF Tools', color: 'icon-red', isVisible: true },
        { id: 'pdf-page-number', title: 'Page Number', desc: 'Add visible page numbers to PDFs.', icon: <PdfIcon />, category: 'PDF Tools', color: 'icon-blue', isVisible: true },
        { id: 'pdf-security', title: 'PDF Password', desc: 'Lock or Unlock your PDF documents.', icon: <SecurityIcon />, category: 'PDF Tools', color: 'icon-purple', isVisible: true },
        { id: 'pdf-to-img', title: 'PDF to Image', desc: 'Convert PDF pages to individual images.', icon: <PdfIcon />, category: 'PDF Tools', color: 'icon-red', isVisible: true },
        { id: 'watermark', title: 'Watermark', desc: 'Add stamps to your Photos & PDFs.', icon: <WatermarkIcon />, category: 'Utility Tools', color: 'icon-blue', isVisible: true },
        { id: 'qr-generator', title: 'QR Generator', desc: 'Generate custom QR codes instantly.', icon: <QrIcon />, category: 'Utility Tools', color: 'icon-orange', isVisible: true },
        { id: 'qr-generator', title: 'QR Generator', desc: 'Generate custom QR codes instantly.', icon: <QrIcon />, category: 'Utility Tools', color: 'icon-orange', isVisible: true },
        { id: 'shopify-dev', title: 'Shopify Dev Hub', desc: 'Expert AI prompts for Shopify section developers.', icon: <ShopifyIcon />, category: 'Shopify Tools', color: 'icon-green', isVisible: true },
        { id: 'shopify-scraper', title: 'Shopify Product Scraper', desc: 'Powerful Chrome extension for bulk extracting Shopify product data.', icon: <ShopifyIcon />, category: 'Chrome Extension', color: 'icon-green', isExternal: true, url: 'https://github.com/Iamsushantgautam/Chrome-extension/tree/main/shopify%20product%20scraper', useFavicon: false, isVisible: true },
        { id: 'icons8', title: 'Icons8', desc: 'Premium library for professional icons, photos, and creative assets.', icon: <QrIcon />, category: 'Useful Websites', color: 'icon-green', isExternal: true, url: 'https://icons8.com/', isVisible: true },
        { id: 'witcet', title: 'Witcet.online', desc: 'Visit our partner site for advanced AI resources, creative assets, and more digital utilities.', icon: <WitcetIcon />, category: 'Useful Websites', color: 'icon-purple', isExternal: true, url: 'https://witcet.online', isVisible: false },
        { id: 'portfolio', title: 'Sushant\'s Portfolio', desc: 'Explore the full creative development portfolio of the developer.', icon: <UserIcon />, category: 'Useful Websites', color: 'icon-blue', isExternal: true, url: 'https://sushant.online', isVisible: false },

    ];

    const filteredTools = tools.filter(tool =>
        tool.isVisible !== false && (
            tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tool.desc.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const categories = ['Image Tools', 'Utility Tools', 'PDF Tools', 'Shopify Tools', 'Chrome Extension', 'Useful Websites'];

    return (
        <div className="home-container">
            <header className="hero-section">
                <h1 className="home-title">The Master Hub for <span style={{ color: 'var(--primary)' }}>Images & PDFs</span></h1>
                <p className="home-subtitle">
                    Effortless processing. Instant results. 100% Secure.
                </p>

                <div className="search-container">
                    <div className="search-bar">
                        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search for tools (e.g., 'merge', 'compress')..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </header>

            <div className="tools-sections-wrapper">
                {categories.map(cat => {
                    const sectionTools = filteredTools.filter(t => t.category === cat);
                    if (sectionTools.length === 0) return null;

                    return (
                        <section key={cat} className="tool-category-section">
                            <div className="section-header">
                                <h2 className="section-title">{cat}</h2>
                                <div className="section-line"></div>
                            </div>
                            <div className="tool-grid">
                                {sectionTools.map(tool => {
                                    const cardProps = {
                                        key: tool.id,
                                        className: "tool-card"
                                    };

                                    const cardContent = (
                                        <>
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
                                            <div className="tool-content">
                                                <h3>{tool.title}</h3>
                                                <p>{tool.desc}</p>
                                            </div>
                                        </>
                                    );

                                    if (tool.isExternal) {
                                        return (
                                            <a {...cardProps} href={tool.url} target="_blank" rel="noopener noreferrer">
                                                {cardContent}
                                            </a>
                                        );
                                    }

                                    return (
                                        <Link {...cardProps} to={`/${tool.id}`}>
                                            {cardContent}
                                        </Link>
                                    );
                                })}
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
