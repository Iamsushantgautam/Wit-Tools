import React, { useState, useMemo } from 'react';
import { CHATGPT_CATEGORIES, CHATGPT_CODES } from './chatgptData';
import ChatGPTCodeCard from './ChatGPTCodeCard';
import './ChatGPTTools.css';

const ChatGPTTools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2800);
  };

  const filteredCodes = useMemo(() => {
    return CHATGPT_CODES.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch = !q ||
        item.code.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.shortDesc.toLowerCase().includes(q) ||
        item.fullDesc?.toLowerCase().includes(q) ||
        (item.bestFor && item.bestFor.some(tag => tag.toLowerCase().includes(q)));
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="gpt-page-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="gpt-toast-notification">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <header className="tool-header-card">
        <h2>ChatGPT Secret Codes</h2>
        <p>Master collection of battle-tested ChatGPT slash commands and prompt shortcuts for instant productivity.</p>
      </header>

      {/* Search Bar & Category Filters */}
      <div className="gpt-filter-section">
        <div className="gpt-search-wrapper">
          <svg className="gpt-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="input-field gpt-search-input"
            placeholder="Search slash commands (e.g. /pointingthumbnail, carousel, marketing)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="gpt-search-clear" onClick={() => setSearchTerm('')} title="Clear search">
              ✕
            </button>
          )}
        </div>

        <div className="gpt-category-pills">
          {CHATGPT_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`gpt-cat-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
              <span className="gpt-pill-count">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="gpt-main-content">
        {filteredCodes.length === 0 ? (
          <div className="gpt-no-results">
            <div className="gpt-no-results-icon">🤖</div>
            <h3>No ChatGPT secret codes found matching "{searchTerm}"</h3>
            <p>Try searching for keywords like "carousel", "thumbnail", "marketing", or "ideas".</p>
            <button className="btn-primary" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="gpt-codes-grid">
            {filteredCodes.map(item => (
              <ChatGPTCodeCard
                key={item.id}
                item={item}
                onSelect={() => {
                  navigator.clipboard.writeText(item.promptTemplate);
                  showToast(`✓ Master prompt for ${item.code} copied!`);
                }}
                onCopyPrompt={(msg) => showToast(msg)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatGPTTools;
