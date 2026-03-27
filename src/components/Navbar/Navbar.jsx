import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [expanded, setExpanded] = useState('img'); // Default or null

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleExpand = (cat) => setExpanded(expanded === cat ? null : cat);
    const closeAll = () => {
        setIsMenuOpen(false);
        setExpanded(null);
    };

    return (
        <nav className="main-nav">
            <Link to="/" style={{ textDecoration: 'none' }} onClick={closeAll}>
                <h1 className="nav-logo">
                    <span style={{ color: 'var(--primary)' }}>Wit</span> Tools
                </h1>
            </Link>

            <div className="nav-right">
                <div className="nav-links desktop-only">
                    <Link to="/" className="nav-link">Home</Link>

                    <div className="nav-dropdown-wrapper">
                        <span className="nav-link dropdown-trigger">Tools ✨</span>
                        <div className="nav-dropdown-menu">
                            <div className="dropdown-section">
                                <label>Image Tools</label>
                                <Link to="/img-to-pdf">Image to PDF</Link>
                                <Link to="/img-resizer">Resizer</Link>
                                <Link to="/img-optimizer">Optimizer</Link>
                                <Link to="/img-converter">Converter</Link>
                                <Link to="/img-compressor">Compressor</Link>
                            </div>
                            <div className="dropdown-section">
                                <label>PDF Tools</label>
                                <Link to="/pdf-compressor">PDF Compressor</Link>
                                <Link to="/pdf-merge">Merge PDF</Link>
                                <Link to="/pdf-split">Split PDF</Link>
                                <Link to="/pdf-page-number">Page Number</Link>
                                <Link to="/pdf-security">PDF Password</Link>
                                <Link to="/pdf-to-img">PDF to Image</Link>
                            </div>
                            <div className="dropdown-section">
                                <label>Utilities</label>
                                <Link to="/bg-remover">BG Remover</Link>
                                <Link to="/profile-maker">Passport Photo</Link>
                                <Link to="/watermark">Watermark</Link>
                                <Link to="/qr-generator">QR Generator</Link>
                                <Link to="/shopify-dev">Shopify Dev Hub</Link>
                                <a href="https://github.com/Iamsushantgautam/Chrome-extension/tree/main/shopify%20product%20scraper" target="_blank" rel="noopener noreferrer">Shopify Scraper (Ext)</a>
                                <a href="https://icons8.com" target="_blank" rel="noopener noreferrer">Icons8 (Assets)</a>
                            </div>
                        </div>
                    </div>

                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
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

                {/* Image Tools Accordion */}
                <div className={`mobile-accordion-section ${expanded === 'img' ? 'active' : ''}`}>
                    <div className="accordion-header" onClick={() => toggleExpand('img')}>
                        <span>Image Tools</span>
                        <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 9l-7 7-7-7" /></svg>
                    </div>
                    <div className="accordion-content">
                        <Link to="/img-to-pdf" onClick={closeAll}>Image to PDF</Link>
                        <Link to="/img-resizer" onClick={closeAll}>Image Resizer</Link>
                        <Link to="/img-optimizer" onClick={closeAll}>Image Optimizer</Link>
                        <Link to="/img-converter" onClick={closeAll}>Format Converter</Link>
                        <Link to="/img-compressor" onClick={closeAll}>Image Compressor</Link>
                    </div>
                </div>

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
                    </div>
                </div>

                {/* Utility Tools Accordion */}
                <div className={`mobile-accordion-section ${expanded === 'util' ? 'active' : ''}`}>
                    <div className="accordion-header" onClick={() => toggleExpand('util')}>
                        <span>Utility Tools</span>
                        <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 9l-7 7-7-7" /></svg>
                    </div>
                     <div className="accordion-content">
                         <Link to="/bg-remover" onClick={closeAll}>Remove Background</Link>
                         <Link to="/profile-maker" onClick={closeAll}>Passport Photo Maker</Link>
                         <Link to="/watermark" onClick={closeAll}>Add Watermark</Link>
                         <Link to="/qr-generator" onClick={closeAll}>QR Generator</Link>
                         <Link to="/shopify-dev" onClick={closeAll}>Shopify Dev Hub</Link>
                         <a href="https://github.com/Iamsushantgautam/Chrome-extension/tree/main/shopify%20product%20scraper" target="_blank" rel="noopener noreferrer" onClick={closeAll}>Shopify Scraper (Ext)</a>
                         <a href="https://icons8.com" target="_blank" rel="noopener noreferrer" onClick={closeAll}>Icons8 Creative Hub</a>
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
