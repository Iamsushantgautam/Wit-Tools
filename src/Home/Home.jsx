import React, { useState } from 'react';
import { tools, HOME_CATEGORY_ORDER } from '../data/toolsData';
import ToolCard from '../components/Common/ToolCard/ToolCard';
import Button from '../components/Common/Button/Button';
import './Home.css';

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
            <div className="tool-icon-wrapper skeleton-box" style={{ width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0 }}></div>
            <div className="tool-card-content">
                <div className="skeleton-box" style={{ width: '65%', height: '18px', borderRadius: '6px', marginBottom: '8px' }}></div>
                <div className="skeleton-box" style={{ width: '95%', height: '14px', borderRadius: '4px', marginBottom: '6px' }}></div>
                <div className="skeleton-box" style={{ width: '75%', height: '14px', borderRadius: '4px' }}></div>
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
                                    sectionTools.map(tool => (
                                        <ToolCard key={tool.id} tool={tool} />
                                    ))
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
                        <Button variant="secondary" size="md" onClick={() => setSearchTerm('')}>
                            Clear Search
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
