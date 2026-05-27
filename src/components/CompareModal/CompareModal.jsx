import React, { useState, useEffect } from 'react';
import './CompareModal.css';

const CompareModal = ({
    isOpen,
    onClose,
    fileName,
    originalUrl,
    originalSizeText,
    convertedUrl,
    convertedSizeText
}) => {
    // Modal states
    const [compareMode, setCompareMode] = useState('slider'); // 'slider' or 'side-by-side'
    const [sliderPosition, setSliderPosition] = useState(50); // 0-100%

    // Reset slider position on open or file change
    useEffect(() => {
        if (isOpen) {
            setSliderPosition(50);
        }
    }, [isOpen, originalUrl, convertedUrl]);

    if (!isOpen) return null;

    // Swipe Slider drag handler
    const handleSliderMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const relativeX = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));
        setSliderPosition(percentage);
    };

    // Calculate saving percentage
    const calcSavings = () => {
        if (!originalSizeText || !convertedSizeText) return '';
        const parseBytes = (txt) => {
            const num = parseFloat(txt);
            if (isNaN(num)) return 0;
            if (txt.toLowerCase().includes('mb')) return num * 1024 * 1024;
            if (txt.toLowerCase().includes('kb')) return num * 1024;
            return num;
        };
        const before = parseBytes(originalSizeText);
        const after = parseBytes(convertedSizeText);
        if (before > 0 && after > 0 && before > after) {
            return `Saved ${Math.round(((before - after) / before) * 100)}%`;
        }
        return '';
    };

    const savingsText = calcSavings();

    return (
        <div className="compare-modal-backdrop" onClick={onClose}>
            <div className="compare-modal-window" onClick={(e) => e.stopPropagation()}>
                
                {/* Header bar */}
                <div className="compare-modal-header">
                    <div className="modal-title">
                        <h3>Image Comparison</h3>
                        {fileName && <span className="modal-sub">{fileName}</span>}
                    </div>
                    <div className="modal-header-actions">
                        <div className="view-mode-toggle">
                            <button 
                                className={`toggle-mode-btn ${compareMode === 'slider' ? 'active' : ''}`}
                                onClick={() => setCompareMode('slider')}
                            >
                                Slider
                            </button>
                            <button 
                                className={`toggle-mode-btn ${compareMode === 'side-by-side' ? 'active' : ''}`}
                                onClick={() => setCompareMode('side-by-side')}
                            >
                                Side-by-Side
                            </button>
                        </div>
                        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>


                {/* Compression stats row */}
                <div className="compare-stats-row">
                    <div className="compare-stat-item before">
                        <span className="stat-lbl">Original</span>
                        <span className="stat-val">{originalSizeText || 'PNG File'}</span>
                    </div>
                    {savingsText && (
                        <div className="compare-saving-badge animate-glow">
                            <span>{savingsText}</span>
                        </div>
                    )}
                    <div className="compare-stat-item after">
                        <span className="stat-lbl">Optimized</span>
                        <span className="stat-val">{convertedSizeText || 'WEBP Output'}</span>
                    </div>
                </div>

                {/* Interactive Compare Workspace */}
                <div className="compare-workspace-container">
                    
                    {/* Viewport */}
                    <div className="compare-viewport">
                        {compareMode === 'slider' ? (
                            /* SLIDER OVERLAY COMPARE */
                            <div 
                                className="comparison-slider-wrapper"
                                onMouseMove={handleSliderMove}
                                onTouchMove={handleSliderMove}
                            >
                                {/* Original (Underneath - Left Side) */}
                                <div className="compare-img-box original">
                                    <img 
                                        src={originalUrl} 
                                        alt="Original source" 
                                        draggable="false"
                                    />
                                    <span className="image-label before-tag">Before</span>
                                </div>

                                {/* Optimized (Overlay - Controlled Width) */}
                                <div 
                                    className="compare-img-box optimized"
                                    style={{ width: `${sliderPosition}%` }}
                                >
                                    <img 
                                        src={convertedUrl} 
                                        alt="Optimized output" 
                                        draggable="false"
                                    />
                                    <span className="image-label after-tag">After</span>
                                </div>

                                {/* Slider Divider Bar */}
                                <div 
                                    className="compare-slider-divider"
                                    style={{ left: `${sliderPosition}%` }}
                                >
                                    <div className="compare-slider-handle">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M8 5l-7 7 7 7M16 5l7 7-7 7"/></svg>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* SIDE BY SIDE COMPARE */
                            <div className="comparison-side-by-side-wrapper">
                                <div className="side-box">
                                    <img 
                                        src={originalUrl} 
                                        alt="Original source" 
                                        draggable="false"
                                    />
                                    <span className="image-label before-tag floating">Before</span>
                                </div>
                                <div className="side-box">
                                    <img 
                                        src={convertedUrl} 
                                        alt="Optimized output" 
                                        draggable="false"
                                    />
                                    <span className="image-label after-tag floating">After</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer / close bar */}
                <div className="compare-modal-footer">
                    {convertedUrl && (
                        <a 
                            href={convertedUrl} 
                            download={fileName ? `optimized_${fileName.substring(0, fileName.lastIndexOf('.')) || fileName}.webp` : 'optimized.webp'}
                            className="btn-primary"
                            style={{ textDecoration: 'none' }}
                        >
                            Download WebP
                        </a>
                    )}
                    <button className="btn-secondary" onClick={onClose}>Close</button>
                </div>


            </div>
        </div>
    );
};

export default CompareModal;
