import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="main-nav">
            <Link to="/" style={{ textDecoration: 'none' }}>
                <h1 className="nav-logo">
                    <span style={{ color: 'var(--primary)' }}>Wit</span> Tools
                </h1>
            </Link>
            <div className="nav-right">
                <div className="nav-links desktop-only">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/img-to-pdf" className="nav-link">Images to PDF</Link>
                    <Link to="/img-resizer" className="nav-link">Resizer</Link>
                    <Link to="/img-compressor" className="nav-link">Compress</Link>
                    <Link to="/watermark" className="nav-link">Watermark</Link>
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

            {/* Mobile Dropdown Menu */}
            <div className={`mobile-dropdown ${isMenuOpen ? 'show' : ''}`}>
                <Link to="/" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/img-to-pdf" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Image Tools</Link>
                <Link to="/pdf-compressor" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>PDF Tools</Link>
                <Link to="/qr-generator" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>QR Code</Link>
                <Link to="/bg-remover" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>AI Tools</Link>
            </div>
        </nav>
    );
};

export default Navbar;
