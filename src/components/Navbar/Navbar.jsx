import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// SVG Badge Icons for Real Tools
const IconMerge = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 6h8M8 12h8M8 18h8M3 6l3 3-3 3M3 15l3 3-3 3" />
    </svg>
);

const IconSplit = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6" />
    </svg>
);

const IconCompress = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14h6v6M20 10h-6V4M10 14L3 21M14 10l7-7" />
    </svg>
);

const IconDoc = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
);

const IconImage = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
    </svg>
);

const IconPageNum = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="9" x2="20" y2="9" />
        <line x1="4" y1="15" x2="20" y2="15" />
        <line x1="10" y1="3" x2="8" y2="21" />
        <line x1="16" y1="3" x2="14" y2="21" />
    </svg>
);

const IconWatermark = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
);

const IconLock = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const IconCrop = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2v14a2 2 0 0 0 2 2h14M18 22V8a2 2 0 0 0-2-2H2" />
    </svg>
);

const IconQr = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
    </svg>
);

const IconCloud = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
);

const IconVideo = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M10 9l5 3-5 3V9z" />
    </svg>
);

const IconShopify = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
);

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null); // 'convert' | 'all' | null
    const [expanded, setExpanded] = useState('pdf');

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleExpand = (cat) => setExpanded(expanded === cat ? null : cat);
    const closeAll = () => {
        setIsMenuOpen(false);
        setActiveDropdown(null);
        setExpanded(null);
    };

    return (
        <nav className="main-nav">
            <Link to="/" style={{ textDecoration: 'none' }} onClick={closeAll}>
                <h1 className="nav-logo">
                    <img src="/favicon.svg" alt="Wit Tools Logo" className="nav-logo-icon" />
                    <span style={{ color: '#e5322d', fontWeight: 800 }}>WIT</span>
                    <span style={{ color: '#1e1e24', fontWeight: 800 }}>TOOLS</span>
                </h1>
            </Link>

            <div className="nav-right">
                <div className="nav-links desktop-only">
                    {/* MERGE PDF */}
                    <Link to="/pdf-merge" className="nav-link-top" onClick={closeAll}>
                        MERGE PDF
                    </Link>

                    {/* SPLIT PDF */}
                    <Link to="/pdf-split" className="nav-link-top" onClick={closeAll}>
                        SPLIT PDF
                    </Link>

                    {/* COMPRESS PDF */}
                    <Link to="/pdf-compressor" className="nav-link-top highlight-red" onClick={closeAll}>
                        COMPRESS PDF
                    </Link>

                    {/* CONVERT PDF DROPDOWN */}
                    <div 
                        className={`nav-dropdown-wrapper ${activeDropdown === 'convert' ? 'active' : ''}`}
                        onMouseEnter={() => setActiveDropdown('convert')}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button className="nav-link-top dropdown-trigger-btn">
                            CONVERT PDF
                            <svg className="chevron-icon" width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                            </svg>
                        </button>

                        <div className="mega-dropdown-menu convert-dropdown">
                            <div className="mega-column">
                                <span className="mega-column-title title-yellow">CONVERT TO PDF</span>
                                <Link to="/img-to-pdf" className="mega-item" onClick={closeAll}>
                                    <div className="mega-icon-badge badge-yellow"><IconImage /></div>
                                    <span className="mega-item-title">Image to PDF</span>
                                </Link>
                            </div>

                            <div className="mega-column">
                                <span className="mega-column-title title-yellow">CONVERT FROM PDF</span>
                                <Link to="/pdf-to-img" className="mega-item" onClick={closeAll}>
                                    <div className="mega-icon-badge badge-yellow"><IconImage /></div>
                                    <span className="mega-item-title">PDF to Image</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* ALL TOOLS MEGA DROPDOWN */}
                    <div 
                        className={`nav-dropdown-wrapper ${activeDropdown === 'all' ? 'active' : ''}`}
                        onMouseEnter={() => setActiveDropdown('all')}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button className="nav-link-top dropdown-trigger-btn highlight-red">
                            ALL TOOLS
                            <svg className="chevron-icon" width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                            </svg>
                        </button>

                        <div className="mega-dropdown-menu all-tools-dropdown">
                            <div className="mega-grid-4">
                                {/* 1. PDF TOOLS */}
                                <div className="mega-column">
                                    <span className="mega-column-title title-red">PDF TOOLS</span>
                                    <Link to="/pdf-merge" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-red"><IconMerge /></div>
                                        <span className="mega-item-title">Merge PDF</span>
                                    </Link>
                                    <Link to="/pdf-split" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-red"><IconSplit /></div>
                                        <span className="mega-item-title">Split PDF</span>
                                    </Link>
                                    <Link to="/pdf-compressor" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-red"><IconCompress /></div>
                                        <span className="mega-item-title">Compress PDF</span>
                                    </Link>
                                    <Link to="/img-to-pdf" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-red"><IconImage /></div>
                                        <span className="mega-item-title">Image to PDF</span>
                                    </Link>
                                    <Link to="/pdf-to-img" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-red"><IconImage /></div>
                                        <span className="mega-item-title">PDF to Image</span>
                                    </Link>
                                    <Link to="/pdf-page-number" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-red"><IconPageNum /></div>
                                        <span className="mega-item-title">Add Page Numbers</span>
                                    </Link>
                                    <Link to="/pdf-security" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-red"><IconLock /></div>
                                        <span className="mega-item-title">PDF Lock & Security</span>
                                    </Link>
                                </div>

                                {/* 2. IMAGE TOOLS */}
                                <div className="mega-column">
                                    <span className="mega-column-title title-cyan">IMAGE TOOLS</span>
                                    <Link to="/img-compressor" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-cyan"><IconCompress /></div>
                                        <span className="mega-item-title">Image Compressor</span>
                                    </Link>
                                    <Link to="/img-resizer" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-cyan"><IconCrop /></div>
                                        <span className="mega-item-title">Image Resizer</span>
                                    </Link>
                                    <Link to="/img-optimizer" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-cyan"><IconImage /></div>
                                        <span className="mega-item-title">Image Optimizer</span>
                                    </Link>
                                    <Link to="/img-converter" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-cyan"><IconImage /></div>
                                        <span className="mega-item-title">Format Converter</span>
                                    </Link>
                                    <Link to="/png-to-webp" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-cyan"><IconImage /></div>
                                        <span className="mega-item-title">PNG to WEBP</span>
                                    </Link>
                                    <Link to="/bg-remover" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-cyan"><IconCrop /></div>
                                        <span className="mega-item-title">Remove Background</span>
                                    </Link>
                                    <Link to="/profile-maker" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-cyan"><IconImage /></div>
                                        <span className="mega-item-title">Passport Photo Maker</span>
                                    </Link>
                                </div>

                                {/* 3. UTILITIES & MEDIA */}
                                <div className="mega-column">
                                    <span className="mega-column-title title-purple">UTILITIES & MEDIA</span>
                                    <Link to="/watermark" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-purple"><IconWatermark /></div>
                                        <span className="mega-item-title">Add Watermark</span>
                                    </Link>
                                    <Link to="/qr-generator" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-purple"><IconQr /></div>
                                        <span className="mega-item-title">QR Generator</span>
                                    </Link>
                                    <Link to="/svg-generator" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-purple"><IconDoc /></div>
                                        <span className="mega-item-title">SVG Wave & Pattern</span>
                                    </Link>
                                    <Link to="/yt-screenshot" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-purple"><IconVideo /></div>
                                        <span className="mega-item-title">Video Screenshot</span>
                                    </Link>
                                    <Link to="/google-drive-downloader" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-purple"><IconCloud /></div>
                                        <span className="mega-item-title">Drive Direct Link</span>
                                    </Link>
                                </div>

                                {/* 4. SHOPIFY & DEV */}
                                <div className="mega-column">
                                    <span className="mega-column-title title-green">SHOPIFY & DEV</span>
                                    <Link to="/shopify-dev" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-green"><IconShopify /></div>
                                        <span className="mega-item-title">Shopify Dev Hub</span>
                                    </Link>
                                    <Link to="/shopify-apps" className="mega-item" onClick={closeAll}>
                                        <div className="mega-icon-badge badge-green"><IconShopify /></div>
                                        <span className="mega-item-title">Shopify Apps Directory</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="nav-actions">

                    <div className="avatar-wrapper">
                        <img src="man.png" alt="Profile" className="user-avatar" />
                    </div>

                    <button className="hamburger-btn" onClick={toggleMenu} aria-label="Toggle Menu">
                        <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}>
                            <span style={isMenuOpen ? { transform: 'translateY(7px) rotate(45deg)' } : {}}></span>
                            <span style={isMenuOpen ? { opacity: 0 } : {}}></span>
                            <span style={isMenuOpen ? { transform: 'translateY(-7px) rotate(-45deg)' } : {}}></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu (Accordion Style) */}
            <div className={`mobile-dropdown ${isMenuOpen ? 'show' : ''}`}>
                <Link to="/" className="dropdown-item mobile-main-link" onClick={closeAll}>Home Overview</Link>

                {/* PDF Tools Accordion */}
                <div className={`mobile-accordion-section ${expanded === 'pdf' ? 'active' : ''}`}>
                    <div className="accordion-header" onClick={() => toggleExpand('pdf')}>
                        <span>PDF Tools</span>
                        <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 9l-7 7-7-7" /></svg>
                    </div>
                    <div className="accordion-content">
                        <Link to="/pdf-compressor" onClick={closeAll}>Compress PDF</Link>
                        <Link to="/pdf-merge" onClick={closeAll}>Merge PDF</Link>
                        <Link to="/pdf-split" onClick={closeAll}>Split PDF</Link>
                        <Link to="/pdf-page-number" onClick={closeAll}>Page Numbering</Link>
                        <Link to="/pdf-security" onClick={closeAll}>Lock/Unlock PDF</Link>
                        <Link to="/pdf-to-img" onClick={closeAll}>PDF to Image</Link>
                        <Link to="/img-to-pdf" onClick={closeAll}>Image to PDF</Link>
                    </div>
                </div>

                {/* Image Tools Accordion */}
                <div className={`mobile-accordion-section ${expanded === 'img' ? 'active' : ''}`}>
                    <div className="accordion-header" onClick={() => toggleExpand('img')}>
                        <span>Image Tools</span>
                        <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 9l-7 7-7-7" /></svg>
                    </div>
                    <div className="accordion-content">
                        <Link to="/img-resizer" onClick={closeAll}>Image Resizer</Link>
                        <Link to="/img-optimizer" onClick={closeAll}>Image Optimizer</Link>
                        <Link to="/img-converter" onClick={closeAll}>Format Converter</Link>
                        <Link to="/img-compressor" onClick={closeAll}>Image Compressor</Link>
                        <Link to="/png-to-webp" onClick={closeAll}>PNG to WEBP</Link>
                        <Link to="/bg-remover" onClick={closeAll}>Remove Background</Link>
                        <Link to="/profile-maker" onClick={closeAll}>Passport Photo Maker</Link>
                    </div>
                </div>

                {/* Utility Tools Accordion */}
                <div className={`mobile-accordion-section ${expanded === 'util' ? 'active' : ''}`}>
                    <div className="accordion-header" onClick={() => toggleExpand('util')}>
                        <span>Utility Tools</span>
                        <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 9l-7 7-7-7" /></svg>
                    </div>
                    <div className="accordion-content">
                        <Link to="/watermark" onClick={closeAll}>Add Watermark</Link>
                        <Link to="/qr-generator" onClick={closeAll}>QR Generator</Link>
                        <Link to="/svg-generator" onClick={closeAll}>SVG Wave & Pattern</Link>
                        <Link to="/yt-screenshot" onClick={closeAll}>Video Screenshot</Link>
                        <Link to="/google-drive-downloader" onClick={closeAll}>Google Drive Downloader</Link>
                        <Link to="/shopify-dev" onClick={closeAll}>Shopify Dev Hub</Link>
                        <Link to="/shopify-apps" onClick={closeAll}>Shopify Apps Directory</Link>
                    </div>
                </div>

                <div className="mobile-footer-links">
                    <Link to="/about" onClick={closeAll}>About Platform</Link>
                    <Link to="/contact" onClick={closeAll}>Get in Touch</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;


