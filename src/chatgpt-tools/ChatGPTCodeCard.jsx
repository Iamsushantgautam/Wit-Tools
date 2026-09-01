import React, { useState } from 'react';

const ChatGPTCodeCard = ({ item, onSelect, onCopyPrompt }) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCommand = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.code);
    setCopiedCode(true);
    if (onCopyPrompt) {
      onCopyPrompt(`✓ Command ${item.code} copied!`);
    }
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="wpt-gpt-card" onClick={onSelect}>
      {/* Top Image Preview */}
      {item.imageUrl && (
        <div className="wpt-gpt-card-img-box">
          <img src={item.imageUrl} alt={item.title} className="wpt-gpt-card-img" loading="lazy" />
        </div>
      )}

      {/* Card Content */}
      <div className="wpt-gpt-card-content">
        <h3 className="wpt-gpt-title">{item.title}</h3>
        <span className="wpt-gpt-cat-subtext">{item.categoryName}</span>
        <p className="wpt-gpt-desc">{item.shortDesc}</p>
      </div>

      {/* Bottom Footer Line: Slash Command */}
      <div className="wpt-gpt-footer-line">
        <button
          className={`wpt-gpt-code-btn ${copiedCode ? 'copied' : ''}`}
          onClick={handleCopyCommand}
          title="Click to copy command"
        >
          <span className="wpt-gpt-code-text">{item.code}</span>
          <svg className="wpt-gpt-copy-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            {copiedCode ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            ) : (
              <>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </>
            )}
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatGPTCodeCard;
