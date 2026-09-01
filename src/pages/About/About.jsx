import React from 'react';
import ToolHeader from '../../components/ToolHeader/ToolHeader';
import './About.css';

const About = () => {
    return (
        <div className="about-page-wrapper">
            <ToolHeader
                title="About Wit Tools"
                subtitle="The zero-latency, privacy-first developer & web utility suite"
            />

            <div className="about-card">
                <div className="about-content">
                    <section className="about-section">
                        <h2>1. Platform Mission & Vision</h2>
                        <p>
                            Wit Tools was engineered to solve a common developer and creator workflow bottleneck: 
                            essential daily utilities—such as compressing high-resolution PDFs, removing image backgrounds, 
                            converting heavy assets to modern WebP formats, or generating clean QR codes—are frequently locked 
                            behind expensive monthly subscriptions, slow cloud processing queues, or intrusive ad networks.
                        </p>
                        <p>
                            We built Wit Tools as a high-density, browser-native utility workspace that runs operations 
                            locally on your device with 0ms server latency, complete privacy, and zero fees.
                        </p>
                    </section>

                    <section className="about-section">
                        <h2>2. Architectural Pillars</h2>
                        <div className="features-grid">
                            <div className="feature-item">
                                <strong>⚡ Client-Side Processing</strong>
                                <span>Heavy computations compile natively inside your web browser. Your data remains in your local sandbox memory.</span>
                            </div>
                            <div className="feature-item">
                                <strong>🔒 100% Zero-Data Retention</strong>
                                <span>No cloud uploads, no persistent database storage, and no tracking of your confidential files or documents.</span>
                            </div>
                            <div className="feature-item">
                                <strong>📱 PWA & Offline Support</strong>
                                <span>Install Wit Tools directly to your desktop or mobile device for lightning-fast offline utility access anytime.</span>
                            </div>
                            <div className="feature-item">
                                <strong>🎨 Modern Glassmorphism UI</strong>
                                <span>Crafted with fluid responsive layouts, micro-animations, and clean typography designed for long sessions.</span>
                            </div>
                        </div>
                    </section>

                    <section className="about-section">
                        <h2>3. Comprehensive Utility Toolsets</h2>
                        <p>
                            Wit Tools powers dozens of production-ready micro-applications categorized into targeted functional suites:
                        </p>
                        <ul>
                            <li><strong>PDF Suite:</strong> Compress PDF file sizes, merge multiple PDFs, split documents into custom page ranges, convert images to PDF, and extract high-resolution pages instantly.</li>
                            <li><strong>Image & Media Utilities:</strong> AI-powered background removal, lossless image compression, profile photo maker, format converters (PNG, JPG, WebP, GIF), and precision image resizing.</li>
                            <li><strong>Developer & Shopify Ecosystem:</strong> Liquid code generators, theme configuration tools, JSON tools, SVG optimizers, and copy-paste code snippets for web developers.</li>
                            <li><strong>Web & Productivity Tools:</strong> High-resolution QR code generator with custom logos, password generators, word counters, and markdown utilities.</li>
                        </ul>
                    </section>

                    <section className="about-section">
                        <h2>4. Why Creators & Developers Choose Wit Tools</h2>
                        <p>
                            Traditional web utility sites clutter your screen with popups, countdown timers, and strict daily conversion limits. 
                            Wit Tools operates under a strict community-first philosophy:
                        </p>
                        <ul className="about-bullets">
                            <li><strong>Zero Account Barrier:</strong> No signups, passwords, or credit card requirements to unlock full features.</li>
                            <li><strong>Unrestricted Processing:</strong> Process unlimited files without artificial daily caps or file size paywalls.</li>
                            <li><strong>Clean & Ad-Free Experience:</strong> High-density UI engineered for maximum focus and rapid workflow execution.</li>
                        </ul>
                    </section>

                    <div className="about-footer">
                        <p>Designed & Engineered with ❤️ by <strong>Sushant Gautam</strong> for the global creator community.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
