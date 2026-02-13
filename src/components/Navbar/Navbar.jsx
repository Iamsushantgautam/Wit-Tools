import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="main-nav">
            <Link to="/" style={{ textDecoration: 'none' }}>
                <h1>
                    <span style={{ color: '#0b72e6' }}>Wit</span> Tools
                </h1>
            </Link>
            <div className="nav-right">
                <div className="nav-links desktop-only">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/img-to-pdf" className="nav-link">Img to PDF</Link>
                    <Link to="/img-resizer" className="nav-link">Resizer</Link>
                    <Link to="/img-compressor" className="nav-link">Compress</Link>
                    <Link to="/watermark" className="nav-link">Watermark</Link>
                    <Link to="/profile-maker" className="nav-link">Profile Maker</Link>
                </div>

                <div className="nav-actions">
                    <div className="avatar-wrapper">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User Avatar" className="user-avatar" />
                    </div>
                    <button className="hamburger-btn" onClick={toggleMenu} aria-label="Toggle Menu">
                        <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div className={`mobile-dropdown ${isMenuOpen ? 'show' : ''}`}>
                <Link to="/" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <a href="#" className="dropdown-item">About</a>
                <a href="#" className="dropdown-item">Policy</a>
                <a href="#" className="dropdown-item">Contact</a>
                <a href="#" className="dropdown-item">Feedback</a>
                <Link to="/img-to-pdf" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Image Tools</Link>
                <Link to="/pdf-compressor" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>PDF Tools</Link>
            </div>
        </nav>
    );
};

export default Navbar;
