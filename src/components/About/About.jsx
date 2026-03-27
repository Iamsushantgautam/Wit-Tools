import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="tool-container about-container">
            <div className="tool-header-card">
                <h2>About Wit Tools</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Simplified tools for your digital productivity</p>
            </div>

            <div className="tool-card about-card">
                <div className="about-content">
                    <section className="about-section">
                        <h3>Our Mission</h3>
                        <p>
                            Wit Tools was created with a single goal: to provide high-quality, 
                            fast, and secure digital tools for everyone, absolutely free. 
                            We believe that everyday tasks like converting PDFs, resizing images, 
                            or generating QR codes shouldn't require complex software or paid subscriptions.
                        </p>
                    </section>

                    <section className="about-section">
                        <h3>Privacy First</h3>
                        <p>
                            Your privacy is our top priority. Most of our tools process files 
                            directly in your browser (client-side), meaning your sensitive 
                            data never even leaves your computer. For tools that require 
                            processing, we ensure secure handling and never store your files.
                        </p>
                    </section>

                    <section className="about-section">
                        <h3>What We Offer</h3>
                        <div className="features-grid">
                            <div className="feature-item">
                                <strong>🚀 Fast Performance</strong>
                                <span>Optimization for speed across all devices.</span>
                            </div>
                            <div className="feature-item">
                                <strong>🎨 Premium Design</strong>
                                <span>Clean and intuitive interface for a seamless experience.</span>
                            </div>
                            <div className="feature-item">
                                <strong>🔒 Secure & Private</strong>
                                <span>Safe processing for all your documents and images.</span>
                            </div>
                            <div className="feature-item">
                                <strong>💎 100% Free</strong>
                                <span>All tools are completely free with no hidden costs.</span>
                            </div>
                        </div>
                    </section>

                    <div className="about-footer">
                        <p>Created with ❤️ for the community.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
