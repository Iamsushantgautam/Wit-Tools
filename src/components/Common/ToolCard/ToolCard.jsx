import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './ToolCard.css';

const getFaviconUrl = (tool) => {
    if (tool.iconUrl) return tool.iconUrl;
    if (tool.isExternal && tool.url && tool.useFavicon !== false) {
        try {
            const domain = tool.faviconDomain || new URL(tool.url).hostname;
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
        } catch (e) {
            return '/favicon.svg';
        }
    }
    return null;
};

const ToolCard = ({ tool, className = '' }) => {
    if (!tool) return null;

    const faviconSrc = getFaviconUrl(tool);
    const cardClassName = `tool-card ${className}`.trim();

    const cardContent = (
        <>
            <div className={`tool-icon-wrapper ${tool.color || ''}`}>
                {faviconSrc ? (
                    <>
                        <img
                            src={faviconSrc}
                            alt={tool.title}
                            className="tool-favicon"
                            onLoad={(e) => {
                                if (e.target.src.includes('google.com/s2/favicons') && e.target.naturalWidth <= 16) {
                                    const domain = tool.faviconDomain || (tool.url ? new URL(tool.url).hostname : '');
                                    if (domain) {
                                        e.target.src = `https://${domain}/favicon.ico`;
                                        return;
                                    }
                                }
                                if (e.target.naturalWidth > 0) {
                                    e.target.style.display = 'block';
                                    if (e.target.nextElementSibling) {
                                        e.target.nextElementSibling.style.display = 'none';
                                    }
                                }
                            }}
                            onError={(e) => {
                                const domain = tool.faviconDomain || (tool.url ? new URL(tool.url).hostname : '');
                                if (e.target.src.includes('google.com/s2/favicons') && domain) {
                                    e.target.src = `https://${domain}/favicon.ico`;
                                    return;
                                } else if (!e.target.src.includes('duckduckgo.com') && domain) {
                                    e.target.src = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
                                    return;
                                }
                                e.target.style.display = 'none';
                                if (e.target.nextElementSibling) {
                                    e.target.nextElementSibling.style.display = 'flex';
                                }
                            }}
                        />
                        <div style={{ display: 'none', alignItems: 'center', justifyContent: 'center' }}>
                            {tool.icon || <img src="/favicon.svg" alt="Wit Tools" className="tool-favicon" />}
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {tool.icon || <img src="/favicon.svg" alt="Wit Tools" className="tool-favicon" />}
                    </div>
                )}
            </div>

            <div className="tool-card-content">
                <h3>{tool.title}</h3>
                <p>{tool.desc}</p>
                {tool.buttons && tool.buttons.length > 0 && (
                    <div className="tool-card-buttons" onClick={(e) => e.stopPropagation()}>
                        {tool.buttons.map((btn, idx) => (
                            <Button
                                key={idx}
                                href={btn.url}
                                variant={btn.primary ? 'primary' : 'outline'}
                                size="sm"
                                icon={
                                    btn.icon === 'github' ? (
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                        </svg>
                                    ) : btn.primary ? (
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                            <polyline points="15 3 21 3 21 9" />
                                            <line x1="10" y1="14" x2="21" y2="3" />
                                        </svg>
                                    ) : null
                                }
                            >
                                {btn.label}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );

    if (tool.isExternal && tool.buttons && tool.buttons.length > 0) {
        return (
            <div className={cardClassName}>
                {cardContent}
            </div>
        );
    }

    if (tool.isExternal) {
        return (
            <a className={cardClassName} href={tool.url} target="_blank" rel="noopener noreferrer">
                {cardContent}
            </a>
        );
    }

    const toPath = tool.id === 'coming-soon'
        ? `/coming-soon?tool=${encodeURIComponent(tool.title)}`
        : `/${tool.id}`;

    return (
        <Link className={cardClassName} to={toPath}>
            {cardContent}
        </Link>
    );
};

export default ToolCard;
