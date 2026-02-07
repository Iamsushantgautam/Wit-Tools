import React, { useState, useRef, useEffect } from 'react';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';

// Use worker from public folder
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

import './Watermark.css';

const Watermark = () => {
    const [activeTab, setActiveTab] = useState('image'); // 'image' or 'pdf'

    // File State
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null); // For Image mode
    const [pdfDoc, setPdfDoc] = useState(null); // Loaded PDF Document (pdf-lib)
    const [pdfPagePreview, setPdfPagePreview] = useState(null); // Canvas data URL for PDF preview

    // Watermark State
    const [wmType, setWmType] = useState('text'); // 'text' or 'image'
    const [wmText, setWmText] = useState('Confidential');
    const [wmImage, setWmImage] = useState(null);

    // Layout State
    const [layout, setLayout] = useState('single'); // 'single' or 'tile'

    // Properties
    const [x, setX] = useState(50); // Percentage 0-100 (Single only)
    const [y, setY] = useState(50); // Percentage 0-100 (Single only)
    const [opacity, setOpacity] = useState(0.5);
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(-45); // Default to diagonal for tile appeal
    const [color, setColor] = useState('#000000');
    const [fontSize, setFontSize] = useState(48);
    const [gapX, setGapX] = useState(200); // Spacing X for tile mode
    const [gapY, setGapY] = useState(200); // Spacing Y for tile mode
    const [font, setFont] = useState('Helvetica'); // Font Family

    const canvasRef = useRef(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // --- File Handling ---
    const handleFileChange = async (e) => {
        const selected = e.target.files[0];
        if (!selected) return;

        setFile(selected);

        if (activeTab === 'image') {
            const url = URL.createObjectURL(selected);
            setPreviewUrl(url);
        } else {
            // PDF Handling
            const arrayBuffer = await selected.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

            // Render first page for preview
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({ scale: 1.0 });

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport }).promise;
            setPdfPagePreview(canvas.toDataURL());
            setPdfDoc(arrayBuffer); // Store raw buffer for later processing
        }
    };

    const handleWmImageChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            const url = URL.createObjectURL(selected);
            const img = new Image();
            img.src = url;
            img.onload = () => {
                setWmImage(img);
            }
        }
    };

    // --- Helper: Get Canvas Font String ---
    const getCanvasFont = () => {
        switch (font) {
            case 'Times Roman': return `bold ${fontSize}px "Times New Roman", Times, serif`;
            case 'Courier': return `bold ${fontSize}px "Courier New", Courier, monospace`;
            case 'Helvetica':
            default: return `bold ${fontSize}px Helvetica, Arial, sans-serif`;
        }
    };

    // --- Drawing Logic (Preview) ---
    useEffect(() => {
        drawPreview();
    }, [file, previewUrl, pdfPagePreview, wmType, wmText, wmImage, layout, x, y, opacity, scale, rotation, color, fontSize, gapX, gapY, font]);

    const drawPreview = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const bgImage = new Image();
        // Determine background source
        if (activeTab === 'image' && previewUrl) {
            bgImage.src = previewUrl;
        } else if (activeTab === 'pdf' && pdfPagePreview) {
            bgImage.src = pdfPagePreview;
        } else {
            return; // Nothing to draw
        }

        bgImage.onload = () => {
            // Set canvas size to match image
            canvas.width = bgImage.width;
            canvas.height = bgImage.height;

            // Draw Background
            ctx.drawImage(bgImage, 0, 0);

            // Determine Item Size for Tiling Calculation
            let itemWidth = 0;
            let itemHeight = 0;

            ctx.save();
            ctx.font = getCanvasFont(); // Set font to measure
            if (wmType === 'text') {
                const metrics = ctx.measureText(wmText);
                itemWidth = metrics.width * scale;
                itemHeight = fontSize * scale; // Approx
            } else if (wmType === 'image' && wmImage) {
                itemWidth = wmImage.width * scale;
                itemHeight = wmImage.height * scale;
            }

            // Draw content function
            const drawContent = (posX, posY) => {
                ctx.save();
                ctx.translate(posX, posY);
                ctx.rotate((rotation * Math.PI) / 180);
                ctx.globalAlpha = opacity;
                ctx.scale(scale, scale);

                if (wmType === 'text') {
                    ctx.font = getCanvasFont();
                    ctx.fillStyle = color;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(wmText, 0, 0);
                } else if (wmType === 'image' && wmImage) {
                    ctx.drawImage(wmImage, -wmImage.width / 2, -wmImage.height / 2);
                }
                ctx.restore();
            };

            if (layout === 'single') {
                const posX = (canvas.width * x) / 100;
                const posY = (canvas.height * y) / 100;
                drawContent(posX, posY);
            } else {
                // Tiling Logic
                // We rotate the CANVAS for the individual item, not the whole grid.
                // Simple grid tiling.
                const stepX = itemWidth + gapX;
                const stepY = itemHeight + gapY;

                // Start from negative to cover rotation edges
                for (let currX = -stepX; currX < canvas.width + stepX; currX += stepX) {
                    for (let currY = -stepY; currY < canvas.height + stepY; currY += stepY) {
                        // Add offset to every other row for brick pattern?
                        // Let's settle for simple grid for now, maybe offset by half stepX
                        let drawX = currX;
                        // Stagger rows
                        if (Math.floor(currY / stepY) % 2 !== 0) {
                            drawX += stepX / 2;
                        }
                        drawContent(drawX, currY);
                    }
                }
            }

            ctx.restore();
        };
    };

    // --- Export Logic ---
    const handleDownload = async () => {
        if (!file) return;
        setIsProcessing(true);

        try {
            if (activeTab === 'image') {
                // Image Export: Just use the canvas
                const canvas = canvasRef.current;
                const url = canvas.toDataURL('image/png');
                downloadUrl(url, `watermarked_${file.name}`);
            } else {
                // PDF Export: Use pdf-lib
                const pdfDocLoaded = await PDFDocument.load(pdfDoc);
                const pages = pdfDocLoaded.getPages();

                // Embed Font/Image
                let wmObj;
                let dims = { width: 0, height: 0 };

                if (wmType === 'text') {
                    // Embed Font (StandardFonts)
                    let standardFont;
                    switch (font) {
                        case 'Times Roman': standardFont = StandardFonts.TimesRoman; break;
                        case 'Courier': standardFont = StandardFonts.Courier; break;
                        case 'Helvetica':
                        default: standardFont = StandardFonts.Helvetica; break;
                    }
                    wmObj = await pdfDocLoaded.embedFont(standardFont);
                } else if (wmType === 'image' && wmImage) {
                    const imgBytes = await fetch(wmImage.src).then(res => res.arrayBuffer());
                    try {
                        wmObj = await pdfDocLoaded.embedPng(imgBytes);
                    } catch (e) {
                        wmObj = await pdfDocLoaded.embedJpg(imgBytes);
                    }
                    dims = wmObj.scale(scale);
                }

                // Apply to ALL pages
                for (const page of pages) {
                    const { width, height } = page.getSize();
                    let itemWidth = 0;
                    let itemHeight = 0;

                    // Calculate Dimensions for Tiling
                    if (wmType === 'text') {
                        // PDF Font Width Calculation (More accurate with embedded font)
                        const textWidth = wmObj.widthOfTextAtSize(wmText, fontSize * scale);
                        const textHeight = wmObj.heightAtSize(fontSize * scale);
                        itemWidth = textWidth;
                        itemHeight = textHeight;
                    } else {
                        itemWidth = dims.width;
                        itemHeight = dims.height;
                    }

                    const drawPdfItem = (posX, pdfPosY) => {
                        if (wmType === 'text') {
                            const r = parseInt(color.slice(1, 3), 16) / 255;
                            const g = parseInt(color.slice(3, 5), 16) / 255;
                            const b = parseInt(color.slice(5, 7), 16) / 255;

                            page.drawText(wmText, {
                                x: posX,
                                y: pdfPosY,
                                size: fontSize * scale,
                                font: wmObj, // Use embedded font
                                color: rgb(r, g, b),
                                opacity: opacity,
                                rotate: degrees(rotation),
                            });
                        } else if (wmType === 'image' && wmObj) {
                            page.drawImage(wmObj, {
                                x: posX - (dims.width / 2),
                                y: pdfPosY - (dims.height / 2), // Center origin approximation
                                width: dims.width,
                                height: dims.height,
                                opacity: opacity,
                                rotate: degrees(rotation),
                            });
                        }
                    };

                    if (layout === 'single') {
                        const posX = (width * x) / 100;
                        const posY = height - ((height * y) / 100);
                        drawPdfItem(posX, posY);
                    } else {
                        // Tile Logic for PDF
                        const stepX = itemWidth + gapX;
                        const stepY = itemHeight + gapY;

                        for (let currX = -stepX; currX < width + stepX; currX += stepX) {
                            for (let currY = -stepY; currY < height + stepY; currY += stepY) {
                                let drawX = currX;
                                // Stagger
                                if (Math.floor(currY / stepY) % 2 !== 0) {
                                    drawX += stepX / 2;
                                }

                                // Invert Y for PDF
                                const pdfY = height - currY;
                                drawPdfItem(drawX, pdfY);
                            }
                        }
                    }
                }

                const pdfBytes = await pdfDocLoaded.save();
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                downloadUrl(url, `watermarked_${file.name}`);
            }
        } catch (error) {
            console.error("Export failed:", error);
            alert("Export failed. See console for details.");
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadUrl = (url, filename) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="watermark-tool-container">
            <div className="tool-header">
                <h2>Photo & PDF Watermark</h2>
                <p>Protect your content with professional custom text or image watermarks instantly.</p>
            </div>

            <div className="watermark-card">
                <div className="tabs">
                    <button
                        className={`tab-btn ${activeTab === 'image' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('image'); setFile(null); setPreviewUrl(null); }}
                    >
                        Image Watermark
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'pdf' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('pdf'); setFile(null); setPdfPagePreview(null); }}
                    >
                        PDF Watermark
                    </button>
                </div>

                <div className="workspace">
                    <div className="preview-area">
                        {!file ? (
                            <div className="upload-placeholder" onClick={() => document.getElementById('wm-upload').click()}>
                                <input
                                    type="file"
                                    id="wm-upload"
                                    accept={activeTab === 'image' ? "image/*" : "application/pdf"}
                                    onChange={handleFileChange}
                                    hidden
                                />
                                <div className="placeholder-content">
                                    <div className="icon-wrapper">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                            <polyline points="21 15 16 10 5 21"></polyline>
                                        </svg>
                                    </div>
                                    <h3>Click or drag to upload {activeTab === 'image' ? 'Image' : 'PDF'}</h3>
                                    <p>Supports {activeTab === 'image' ? 'JPG, PNG, WEBP' : 'PDF'} up to 20MB</p>
                                </div>
                            </div>
                        ) : (
                            <div className="canvas-wrapper">
                                <canvas ref={canvasRef} className="preview-canvas" />
                            </div>
                        )}
                    </div>

                    <div className="controls-area">
                        {/* Watermark Type Toggle */}
                        <div className="control-group">
                            <label className="control-label">TYPE</label>
                            <div className="toggle-switch">
                                <div
                                    className={`toggle-option ${wmType === 'text' ? 'active' : ''}`}
                                    onClick={() => setWmType('text')}
                                >
                                    Text
                                </div>
                                <div
                                    className={`toggle-option ${wmType === 'image' ? 'active' : ''}`}
                                    onClick={() => setWmType('image')}
                                >
                                    Image Logo
                                </div>
                            </div>
                        </div>

                        {/* Content Inputs */}
                        <div className="control-group">
                            <label className="control-label">
                                {wmType === 'text' ? 'WATERMARK TEXT' : 'UPLOAD LOGO IMAGE'}
                            </label>
                            {wmType === 'text' ? (
                                <input
                                    type="text"
                                    className="control-input"
                                    value={wmText}
                                    onChange={(e) => setWmText(e.target.value)}
                                    placeholder="e.g. Confidential"
                                />
                            ) : (
                                <div className="custom-file-input-wrapper">
                                    <label htmlFor="logo-upload" className="secondary-btn" style={{ textAlign: 'center', display: 'block', cursor: 'pointer', background: '#f8fafc' }}>
                                        {wmImage ? "Change Logo" : "Choose Logo File"}
                                    </label>
                                    <input
                                        id="logo-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleWmImageChange}
                                        style={{ display: 'none' }}
                                    />
                                    {wmImage && <span style={{ fontSize: '0.8rem', color: 'green', marginTop: '5px', display: 'block' }}>Logo Loaded ✓</span>}
                                </div>
                            )}
                        </div>

                        {/* Layout Toggle - Re-adding based on state */}
                        <div className="control-group">
                            <label className="control-label">LAYOUT</label>
                            <div className="toggle-switch">
                                <div
                                    className={`toggle-option ${layout === 'single' ? 'active' : ''}`}
                                    onClick={() => setLayout('single')}
                                >
                                    Single
                                </div>
                                <div
                                    className={`toggle-option ${layout === 'tile' ? 'active' : ''}`}
                                    onClick={() => setLayout('tile')}
                                >
                                    Tile (Repeated)
                                </div>
                            </div>
                        </div>

                        {/* Position Inputs (Only for Single) */}
                        {layout === 'single' && (
                            <div className="control-group">
                                <div className="control-row">
                                    <div style={{ flex: 1 }}>
                                        <label className="control-label">POSITION X (%)</label>
                                        <input
                                            type="number"
                                            className="control-input"
                                            style={{ width: '100%' }}
                                            min="0"
                                            max="100"
                                            value={x}
                                            onChange={(e) => setX(parseInt(e.target.value) || 0)}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label className="control-label">POSITION Y (%)</label>
                                        <input
                                            type="number"
                                            className="control-input"
                                            style={{ width: '100%' }}
                                            min="0"
                                            max="100"
                                            value={y}
                                            onChange={(e) => setY(parseInt(e.target.value) || 0)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Gap Input (Only for Tile) */}
                        {layout === 'tile' && (
                            <div className="control-group">
                                <div className="control-row">
                                    <div style={{ flex: 1 }}>
                                        <label className="control-label">Spacing X (px)</label>
                                        <input
                                            type="number"
                                            className="control-input"
                                            style={{ width: '100%' }}
                                            min="0"
                                            max="1000"
                                            value={gapX}
                                            onChange={(e) => setGapX(parseInt(e.target.value) || 0)}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label className="control-label">Spacing Y (px)</label>
                                        <input
                                            type="number"
                                            className="control-input"
                                            style={{ width: '100%' }}
                                            min="0"
                                            max="1000"
                                            value={gapY}
                                            onChange={(e) => setGapY(parseInt(e.target.value) || 0)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="control-group">
                            <div className="control-row">
                                <div style={{ flex: 1 }}>
                                    <label className="control-label">SCALE</label>
                                    <input
                                        type="number"
                                        className="control-input"
                                        style={{ width: '100%' }}
                                        min="0.1"
                                        max="10"
                                        step="0.1"
                                        value={scale}
                                        onChange={(e) => setScale(parseFloat(e.target.value) || 0.1)}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label className="control-label">ROTATION (DEG)</label>
                                    <input
                                        type="number"
                                        className="control-input"
                                        style={{ width: '100%' }}
                                        min="-360"
                                        max="360"
                                        value={rotation}
                                        onChange={(e) => setRotation(parseInt(e.target.value) || 0)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="control-group">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <label className="control-label">OPACITY (%)</label>
                                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{Math.round(opacity * 100)}%</span>
                            </div>
                            <input
                                type="range"
                                className="slider-input"
                                min="0"
                                max="100"
                                value={Math.round(opacity * 100)}
                                onChange={(e) => setOpacity((parseFloat(e.target.value) || 0) / 100)}
                                style={{ width: '100%' }}
                            />
                        </div>

                        {wmType === 'text' && (
                            <div className="control-group">
                                <div className="control-row">
                                    <div style={{ flex: 1 }}>
                                        <label className="control-label">COLOR</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <input
                                                type="color"
                                                value={color}
                                                onChange={(e) => setColor(e.target.value)}
                                                className="color-picker-input"
                                                style={{ width: '40px', height: '40px', padding: '0', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer' }}
                                            />
                                            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>{color}</span>
                                        </div>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label className="control-label">FONT SIZE</label>
                                        <input
                                            type="number"
                                            value={fontSize}
                                            onChange={(e) => setFontSize(parseInt(e.target.value))}
                                            className="control-input"
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                </div>

                                <label className="control-label" style={{ marginTop: '0.8rem' }}>FONT FAMILY</label>
                                <select
                                    className="control-input"
                                    value={font}
                                    onChange={(e) => setFont(e.target.value)}
                                >
                                    <option value="Helvetica">Helvetica (Sans-Serif)</option>
                                    <option value="Times Roman">Times Roman (Serif)</option>
                                    <option value="Courier">Courier (Monospace)</option>
                                </select>
                            </div>
                        )}

                        <div className="action-buttons">
                            <button className="primary-btn" onClick={handleDownload} disabled={!file || (wmType === 'text' && !wmText) || (wmType === 'image' && !wmImage)}>
                                <span style={{ marginRight: '8px' }}>📥</span>
                                {isProcessing ? 'Processing...' : 'Download Watermarked File'}
                            </button>
                            <button className="secondary-btn" onClick={() => {
                                setFile(null);
                                setWmText('Confidential');
                                setX(50);
                                setY(50);
                                setScale(1);
                                setRotation(-45);
                                setOpacity(0.5);
                                setColor('#000000');
                                setFontSize(48);
                                setWmType('text');
                            }}>
                                Reset All Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tool-footer">
                <span>Safe & Secure</span> • <span>Fast Processing</span> • <span>Privacy Policy</span>
            </div>
        </div>
    );
};

export default Watermark;
