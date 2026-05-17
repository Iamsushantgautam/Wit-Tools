import React from 'react';
import './Founder.css';

const Founder = () => {
    return (
        <div className="tool-container founder-page-container">
            {/* Header / Intro */}
            <div className="tool-header-card founder-header-card">
                <span className="founder-badge">MEET THE ARCHITECT</span>
                <h2>Sushant Gautam</h2>
                <p className="founder-title">Founder, Creator & Full-Stack Architect of Wit Tools</p>
            </div>

            {/* Main Bio / Content */}
            <div className="tool-card founder-card">
                <div className="founder-grid">
                    {/* Left Column: Avatar & Quick Stats */}
                    <div className="founder-sidebar">
                        <div className="founder-avatar-wrap">
                            <div className="founder-avatar-placeholder">
                                <span>SG</span>
                            </div>
                        </div>
                        <div className="founder-stats">
                            <div className="f-stat-item">
                                <span className="f-stat-num">15+</span>
                                <span className="f-stat-label">Micro-Tools Built</span>
                            </div>
                            <div className="f-stat-item">
                                <span className="f-stat-num">100%</span>
                                <span className="f-stat-label">Privacy First</span>
                            </div>
                            <div className="f-stat-item">
                                <span className="f-stat-num">0ms</span>
                                <span className="f-stat-label">Server Delay</span>
                            </div>
                        </div>
                        <div className="founder-socials-grid">
                            <a href="https://sushant.online" target="_blank" rel="noopener noreferrer" className="f-social-card portfolio">
                                <div className="f-social-icon-box">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                                </div>
                                <div className="f-social-info">
                                    <span className="f-social-name">Portfolio</span>
                                    <span className="f-social-handle">sushant.online</span>
                                </div>
                            </a>

                            <a href="https://github.com/Iamsushantgautam" target="_blank" rel="noopener noreferrer" className="f-social-card github">
                                <div className="f-social-icon-box">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                </div>
                                <div className="f-social-info">
                                    <span className="f-social-name">GitHub</span>
                                    <span className="f-social-handle">@Iamsushantgautam</span>
                                </div>
                            </a>

                            <a href="https://linkedin.com/in/iamsushantgautam" target="_blank" rel="noopener noreferrer" className="f-social-card linkedin">
                                <div className="f-social-icon-box">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                </div>
                                <div className="f-social-info">
                                    <span className="f-social-name">LinkedIn</span>
                                    <span className="f-social-handle">@iamsushantgautam</span>
                                </div>
                            </a>

                            <a href="https://www.instagram.com/its_sushant01" target="_blank" rel="noopener noreferrer" className="f-social-card instagram">
                                <div className="f-social-icon-box">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </div>
                                <div className="f-social-info">
                                    <span className="f-social-name">Instagram</span>
                                    <span className="f-social-handle">@its_sushant01</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Bio / Values / Vision */}
                    <div className="founder-main">
                        <section className="founder-section">
                            <h3>The Story Behind Wit Tools</h3>
                            <p>
                                Hi, I'm <strong>Sushant Gautam</strong>. I designed and built Wit Tools to resolve
                                a personal frustration: the daily digital utilities I needed—converting images,
                                optimizing PDFs, generating clean QR codes, or building Shopify Liquid configurations—were
                                either locked behind expensive subscription paywalls, loaded with bloated ads, or insecure.
                            </p>
                            <p>
                                Wit Tools is my solution. It's a premium, high-density, and 100% secure developer-focused
                                workspace that enables you to perform these operations instantaneously, right inside your web browser.
                            </p>
                        </section>

                        <section className="founder-section">
                            <h3>Our Core Product Architecture</h3>
                            <div className="pillars-grid">
                                <div className="pillar-card">
                                    <span className="pillar-icon">🔒</span>
                                    <h4>Client-Side Processing</h4>
                                    <p>Your documents, images, and files never touch an external server. Everything compiles and renders natively inside your sandbox.</p>
                                </div>
                                <div className="pillar-card">
                                    <span className="pillar-icon">⚡</span>
                                    <h4>Ultra-Optimized Performance</h4>
                                    <p>Crafted using vanilla JS execution cycles and strict memory optimization for smooth performance, even under heavy processing workloads.</p>
                                </div>
                                <div className="pillar-card">
                                    <span className="pillar-icon">🎨</span>
                                    <h4>Dynamic, Aesthetic UI/UX</h4>
                                    <p>Designed with micro-animations, glassmorphism, and responsive CSS variables that bring a professional dashboard layout to utility web apps.</p>
                                </div>
                            </div>
                        </section>

                        <section className="founder-section founder-closing">
                            <h3>Building For The Community</h3>
                            <p>
                                Wit Tools will always remain free, transparent, and completely free of distracting ads.
                                If you have feedback, feature requests, or custom tool requirements, please feel free
                                to get in touch. Let's build the future of productivity together!
                            </p>
                            <div className="founder-signature">
                                <p className="sig-text">Sushant Gautam</p>
                                <span className="sig-sub">Creator, Wit Tools</span>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Founder;
