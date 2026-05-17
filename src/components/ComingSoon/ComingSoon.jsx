import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './ComingSoon.css';

const ComingSoon = () => {
    const [searchParams] = useSearchParams();
    const toolName = searchParams.get('tool') || '';

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
            setEmail('');
        }
    };

    return (
        <div className="tool-container coming-soon-page-container">
            <div className="tool-card coming-soon-card">
                {/* Visual Glass Orb Background */}
                <div className="cs-glow-orb"></div>
                <div className="cs-dots-pattern"></div>

                <div className="coming-soon-content">
                    <span className="cs-badge">🚀 LAUNCHING SOON</span>
                    <h2 className="cs-title">
                        {toolName ? (
                            <>
                                <span className="cs-highlight">{toolName}</span> is Coming Soon
                            </>
                        ) : (
                            <>
                                Something Big is <span className="cs-highlight">Baking</span>
                            </>
                        )}
                    </h2>
                    <p className="cs-desc">
                        {toolName ? (
                            `We are currently architecting the high-performance client-side code for ${toolName}. It will be completely secure, fast, and 100% free.`
                        ) : (
                            "We are currently architecting the next suite of high-performance, client-side productivity tools. Safe, secure, and 100% free."
                        )}
                    </p>


                    {/* Interactive Notification Form */}
                    <div className="cs-notify-box">
                        {submitted ? (
                            <div className="cs-success-message">
                                <span>🎉</span>
                                <p>Awesome! You'll be the first to know when the new tools deploy.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="cs-form">
                                <input
                                    type="email"
                                    placeholder="Enter your email to get early access..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="cs-input"
                                />
                                <button type="submit" className="btn-primary cs-btn">
                                    Notify Me
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Return Action */}
                    <div className="cs-actions">
                        <Link to="/" className="btn-secondary cs-back-btn">
                            ← Return to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;
