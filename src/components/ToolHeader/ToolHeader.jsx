import React from 'react';
import './ToolHeader.css';

const ToolHeader = ({ title, subtitle, theme = 'light' }) => {
    const isDarkTheme = theme !== 'light';
    
    return (
        <div className={`tool-header-card ${isDarkTheme ? `tool-hero-banner ${theme}` : ''}`}>
            {isDarkTheme && <div className="banner-glow-effect"></div>}
            <h2>{title}</h2>
            {subtitle && (
                <p 
                    className={isDarkTheme ? 'banner-subtitle' : 'subtitle'}
                    style={!isDarkTheme ? { color: 'var(--text-muted)', marginTop: '0.5rem' } : {}}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default ToolHeader;
