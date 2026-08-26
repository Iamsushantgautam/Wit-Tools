import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { tools, HOME_CATEGORY_ORDER } from '../../data/toolsData';
import './Home.css';

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

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    // Simulate initial loading
    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

    const filteredTools = tools.filter(tool => {
        if (tool.isVisible === false) return false;
        const matchCategory = activeCategory === 'All' || tool.category === activeCategory;
        const q = searchTerm.toLowerCase();
        const matchSearch = !q ||
            tool.title.toLowerCase().includes(q) ||
            tool.desc.toLowerCase().includes(q) ||
            tool.category.toLowerCase().includes(q) ||
            (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(q)));
        return matchCategory && matchSearch;
    });

    const ToolCardSkeleton = () => (
        <div className="tool-card skeleton">
            <div className="tool-card-top">
                <div className="tool-icon-wrapper skeleton-box" style={{ width: '60px', height: '60px' }}></div>
                <div className="tool-title-wrapper">
                    <div className="skeleton-box" style={{ width: '120px', height: '20px', marginBottom: '8px' }}></div>
                    <div className="skeleton-box" style={{ width: '60px', height: '14px' }}></div>
                </div>
            </div>
            <div className="tool-card-body">
                <div className="skeleton-box" style={{ width: '100%', height: '16px', marginBottom: '8px' }}></div>
                <div className="skeleton-box" style={{ width: '80%', height: '16px' }}></div>
            </div>
            <div className="tool-card-footer">
                <div className="skeleton-box" style={{ width: '100%', height: '48px', borderRadius: '14px' }}></div>
            </div>
        </div>
    );

    return (
        <div className="home-container">
            <header className="hero-section">
                <h1 className="home-title">The Master Hub for <span style={{ color: 'var(--primary)' }}>Tools</span></h1>
                <p className="home-subtitle">
                    Effortless processing. Instant results. 100% Secure.
                </p>

                <div className="search-container">
                    <div className={`search-bar ${searchTerm ? 'has-value' : ''}`}>
                        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search tools, tags, or categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button className="search-clear-btn" onClick={() => setSearchTerm('')} title="Clear">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {(searchTerm || activeCategory !== 'All') && (
                        <div className="home-search-meta">
                            <span className="home-result-count"><strong>{filteredTools.length}</strong> result{filteredTools.length !== 1 ? 's' : ''}</span>
                            <button className="home-clear-all" onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}>
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </header>

            <div className="tools-sections-wrapper">
                {HOME_CATEGORY_ORDER.map(cat => {
                    const sectionTools = filteredTools.filter(t => t.category === cat);
                    if (sectionTools.length === 0) return null;

                    return (
                        <section key={cat} className="tool-category-section">
                            <div className="section-header">
                                <h2 className="section-title">{cat}</h2>
                                <div className="section-line"></div>
                            </div>
                            <div className="tool-grid">
                                {isLoading ? (
                                    Array(3).fill(0).map((_, i) => <ToolCardSkeleton key={i} />)
                                ) : (
                                    sectionTools.map(tool => {
                                        const cardProps = {
                                            key: tool.id,
                                            className: "tool-card"
                                        };

                                        const faviconSrc = getFaviconUrl(tool);

                                        const cardContent = (
                                            <>
                                                <div className={`tool-icon-wrapper ${tool.color}`}>
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
                                                                <a
                                                                    key={idx}
                                                                    href={btn.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className={`tool-btn ${btn.primary ? 'tool-btn-primary' : 'tool-btn-outline'}`}
                                                                >
                                                                    {btn.icon === 'github' && (
                                                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '5px' }}>
                                                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                                                        </svg>
                                                                    )}
                                                                    {btn.primary && (
                                                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '5px' }}>
                                                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                                            <polyline points="15 3 21 3 21 9" />
                                                                            <line x1="10" y1="14" x2="21" y2="3" />
                                                                        </svg>
                                                                    )}
                                                                    {btn.label}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        );

                                        if (tool.isExternal && tool.buttons && tool.buttons.length > 0) {
                                            return (
                                                <div {...cardProps}>
                                                    {cardContent}
                                                </div>
                                            );
                                        }

                                        if (tool.isExternal) {
                                            return (
                                                <a {...cardProps} href={tool.url} target="_blank" rel="noopener noreferrer">
                                                    {cardContent}
                                                </a>
                                            );
                                        }

                                        const toPath = tool.id === 'coming-soon'
                                            ? `/coming-soon?tool=${encodeURIComponent(tool.title)}`
                                            : `/${tool.id}`;

                                        return (
                                            <Link {...cardProps} to={toPath}>
                                                {cardContent}
                                            </Link>
                                        );
                                    })
                                )}
                            </div>
                        </section>
                    );
                })}

                {filteredTools.length === 0 && (
                    <div className="no-results">
                        <div className="no-results-icon">🔍</div>
                        <h3>No tools found matching "{searchTerm}"</h3>
                        <p>Try searching for broader terms like "Image" or "PDF".</p>
                        <button className="btn-secondary" onClick={() => setSearchTerm('')}>Clear Search</button>
                    </div>
                )}
            </div>




        </div>
    );
};

export default Home;
