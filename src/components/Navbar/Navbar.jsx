import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {
    TOP_NAV_LINKS,
    CONVERT_PDF_DROPDOWN,
    NAV_TOOL_CATEGORIES,
    MOBILE_ACCORDIONS
} from './navData';

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
                    {/* Top Direct Navigation Links */}
                    {TOP_NAV_LINKS.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link-top ${link.highlight ? 'highlight-red' : ''}`}
                            onClick={closeAll}
                        >
                            {link.title}
                        </Link>
                    ))}

                    {/* CONVERT PDF DROPDOWN */}
                    <div
                        className={`nav-dropdown-wrapper ${activeDropdown === 'convert' ? 'active' : ''}`}
                        onMouseEnter={() => setActiveDropdown('convert')}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button className="nav-link-top dropdown-trigger-btn">
                            CONVERT PDF
                            <svg className="chevron-icon" width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg>
                        </button>

                        <div className="mega-dropdown-menu convert-dropdown">
                            {CONVERT_PDF_DROPDOWN.map((section, idx) => (
                                <div key={idx} className="mega-column">
                                    <span className={`mega-column-title ${section.titleClass}`}>{section.title}</span>
                                    {section.items.map((item) => (
                                        <Link key={item.path} to={item.path} className="mega-item" onClick={closeAll}>
                                            <div className={`mega-icon-badge ${section.badgeClass}`}>{item.icon}</div>
                                            <span className="mega-item-title">{item.title}</span>
                                        </Link>
                                    ))}
                                </div>
                            ))}
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
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg>
                        </button>

                        <div className="mega-dropdown-menu all-tools-dropdown">
                            <div className="mega-grid-4">
                                {NAV_TOOL_CATEGORIES.map((cat) => (
                                    <div key={cat.id} className="mega-column">
                                        <span className={`mega-column-title ${cat.titleClass}`}>{cat.categoryTitle}</span>
                                        {cat.items.map((item) => (
                                            <Link key={item.path + item.title} to={item.path} className="mega-item" onClick={closeAll}>
                                                <div className={`mega-icon-badge ${item.iconBadgeClass}`}>{item.icon}</div>
                                                <span className="mega-item-title">{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="nav-actions">
                    <Link to="/founder" className="nav-profile-btn" onClick={closeAll} title="Meet Founder">
                        <img src="/man.png" alt="Founder Profile" className="nav-profile-avatar" />
                    </Link>

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
                <Link to="/" className="dropdown-item mobile-main-link" onClick={closeAll}>Home</Link>

                {MOBILE_ACCORDIONS.map((acc) => (
                    <div key={acc.id} className={`mobile-accordion-section ${expanded === acc.id ? 'active' : ''}`}>
                        <div className="accordion-header" onClick={() => toggleExpand(acc.id)}>
                            <span>{acc.title}</span>
                            <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 9l-7 7-7-7" /></svg>
                        </div>
                        <div className="accordion-content">
                            {acc.items.map((item) => (
                                <Link key={item.path + item.title} to={item.path} onClick={closeAll}>
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
                <Link to="/chatgpt-tools" className="dropdown-item mobile-main-link" onClick={closeAll}>ChatGPT Tools</Link>

                <div className="mobile-footer-links">
                    <Link to="/about" onClick={closeAll}>About Platform</Link>
                    <Link to="/contact" onClick={closeAll}>Get in Touch</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
