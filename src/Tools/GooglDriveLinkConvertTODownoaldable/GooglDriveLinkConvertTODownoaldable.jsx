import React, { useState } from 'react';
import './GooglDriveLinkConvertTODownoaldable.css';

const GooglDriveLinkConvertTODownoaldable = () => {
    const [inputText, setInputText] = useState('');
    const [results, setResults] = useState([]);
    const [copySuccessMap, setCopySuccessMap] = useState({});
    const [copyAllSuccess, setCopyAllSuccess] = useState(false);

    const pasteFromClipboard = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setInputText(text);
        } catch (err) {
            console.error('Failed to read clipboard: ', err);
        }
    };

    const parseLinks = () => {
        const lines = inputText.split('\n').map(line => line.trim()).filter(line => line);
        const parsedResults = lines.map((link, idx) => {
            // Check for Google Drive File Links
            // Matches:
            // https://drive.google.com/file/d/FILE_ID/view?usp=sharing
            // https://drive.google.com/open?id=FILE_ID
            // https://drive.google.com/uc?id=FILE_ID
            const driveFileMatch = link.match(/(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=download&)?id=))([a-zA-Z0-9_-]+)/);
            
            // Check for Google Docs
            const docsMatch = link.match(/docs\.google\.com\/document\/d\/([a-zA-Z0-9_-]+)/);
            
            // Check for Google Sheets
            const sheetsMatch = link.match(/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
            
            // Check for Google Slides
            const slidesMatch = link.match(/docs\.google\.com\/presentation\/d\/([a-zA-Z0-9_-]+)/);

            if (driveFileMatch) {
                const fileId = driveFileMatch[1];
                return {
                    id: idx,
                    original: link,
                    type: 'file',
                    typeName: 'Google Drive File',
                    downloads: [
                        { label: 'Direct Download', url: `https://drive.google.com/uc?export=download&id=${fileId}` }
                    ]
                };
            } else if (docsMatch) {
                const docId = docsMatch[1];
                return {
                    id: idx,
                    original: link,
                    type: 'doc',
                    typeName: 'Google Document',
                    downloads: [
                        { label: 'Download PDF', url: `https://docs.google.com/document/d/${docId}/export?format=pdf` },
                        { label: 'Download Word (DOCX)', url: `https://docs.google.com/document/d/${docId}/export?format=docx` }
                    ]
                };
            } else if (sheetsMatch) {
                const sheetId = sheetsMatch[1];
                return {
                    id: idx,
                    original: link,
                    type: 'sheet',
                    typeName: 'Google Spreadsheet',
                    downloads: [
                        { label: 'Download PDF', url: `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=pdf` },
                        { label: 'Download Excel (XLSX)', url: `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx` }
                    ]
                };
            } else if (slidesMatch) {
                const slideId = slidesMatch[1];
                return {
                    id: idx,
                    original: link,
                    type: 'slide',
                    typeName: 'Google Presentation',
                    downloads: [
                        { label: 'Download PDF', url: `https://docs.google.com/presentation/d/${slideId}/export?format=pdf` },
                        { label: 'Download PowerPoint (PPTX)', url: `https://docs.google.com/presentation/d/${slideId}/export?format=pptx` }
                    ]
                };
            } else {
                return {
                    id: idx,
                    original: link,
                    type: 'invalid',
                    typeName: 'Invalid Link',
                    downloads: []
                };
            }
        });

        setResults(parsedResults);
    };

    const copyToClipboard = (text, key) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopySuccessMap(prev => ({ ...prev, [key]: true }));
            setTimeout(() => {
                setCopySuccessMap(prev => ({ ...prev, [key]: false }));
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    const copyAllLinks = () => {
        const allUrls = results
            .filter(r => r.type !== 'invalid')
            .flatMap(r => r.downloads.map(d => d.url))
            .join('\n');
            
        if (!allUrls) return;
        
        navigator.clipboard.writeText(allUrls).then(() => {
            setCopyAllSuccess(true);
            setTimeout(() => setCopyAllSuccess(false), 2000);
        });
    };

    const resetForm = () => {
        setInputText('');
        setResults([]);
    };

    return (
        <div className="tool-container gdrive-downloader-container">
            <div className="tool-header-card">
                <h2>Google Drive Direct Link Generator</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Convert standard Google Drive sharing links (Files, Docs, Sheets, and Slides) into instant direct download links.
                </p>
            </div>

            <div className="tool-card">
                <div className="converter-workspace">
                    <div className="input-section">
                        <label className="input-label">Paste Google Drive/Docs Links (One per line)</label>
                        <textarea
                            className="input-field textarea-field"
                            rows="6"
                            placeholder="Example: https://drive.google.com/file/d/1A2B3C4D5E6F/view?usp=sharing"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                        <div className="btn-group">
                            <button className="btn-secondary" onClick={pasteFromClipboard}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 2h6v4H9z"/></svg>
                                Paste Clipboard
                            </button>
                            <button className="btn-primary" onClick={parseLinks} disabled={!inputText.trim()}>
                                Generate Links
                            </button>
                            <button className="btn-secondary reset-btn" onClick={resetForm}>
                                Reset
                            </button>
                        </div>
                    </div>

                    {results.length > 0 && (
                        <div className="results-section">
                            <div className="results-header">
                                <h3>Generated Direct Links</h3>
                                <button 
                                    className="btn-success btn-sm-bulk" 
                                    onClick={copyAllLinks} 
                                    disabled={!results.some(r => r.type !== 'invalid')}
                                >
                                    {copyAllSuccess ? 'Copied All!' : 'Copy All Links'}
                                </button>
                            </div>
                            
                            <div className="results-list">
                                {results.map((item) => (
                                    <div key={item.id} className={`result-item ${item.type}`}>
                                        <div className="result-item-header">
                                            <span className={`gdrive-badge gdrive-badge-${item.type}`}>{item.typeName}</span>
                                            <span className="original-url-truncated" title={item.original}>
                                                {item.original}
                                            </span>
                                        </div>
                                        {item.type === 'invalid' ? (
                                            <div className="error-message">
                                                Unable to extract Google Drive file ID from this URL.
                                            </div>
                                        ) : (
                                            <div className="download-actions-grid">
                                                {item.downloads.map((dl, dlIdx) => {
                                                    const key = `${item.id}-${dlIdx}`;
                                                    return (
                                                        <div key={dlIdx} className="download-row">
                                                            <span className="dl-label">{dl.label}</span>
                                                            <div className="dl-buttons">
                                                                <a href={dl.url} target="_blank" rel="noopener noreferrer" className="btn-link">
                                                                    Open
                                                                </a>
                                                                <button 
                                                                    className="btn-copy" 
                                                                    onClick={() => copyToClipboard(dl.url, key)}
                                                                >
                                                                    {copySuccessMap[key] ? 'Copied!' : 'Copy'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GooglDriveLinkConvertTODownoaldable;
