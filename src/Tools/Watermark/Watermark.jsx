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

    const getCanvasFont = () => {
        switch (font) {
            case 'Times Roman': return `bold ${fontSize}px "Times New Roman", Times, serif`;
            case 'Courier': return `bold ${fontSize}px "Courier New", Courier, monospace`;
            case 'Helvetica':
            default: return `bold ${fontSize}px Helvetica, Arial, sans-serif`;
        }
    };

    useEffect(() => {
        drawPreview();
    }, [file, previewUrl, pdfPagePreview, wmType, wmText, wmImage, layout, x, y, opacity, scale, rotation, color, fontSize, gapX, gapY, font]);

    const drawPreview = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const bgImage = new Image();
        if (activeTab === 'image' && previewUrl) {
            bgImage.src = previewUrl;
        } else if (activeTab === 'pdf' && pdfPagePreview) {
            bgImage.src = pdfPagePreview;
        } else {
            return;
        }

        bgImage.onload = () => {
            canvas.width = bgImage.width;
            canvas.height = bgImage.height;
            ctx.drawImage(bgImage, 0, 0);

            let itemWidth = 0;
            let itemHeight = 0;

            ctx.save();
            ctx.font = getCanvasFont();
            if (wmType === 'text') {
                const metrics = ctx.measureText(wmText);
                itemWidth = metrics.width * scale;
                itemHeight = fontSize * scale;
            } else if (wmType === 'image' && wmImage) {
                itemWidth = wmImage.width * scale;
                itemHeight = wmImage.height * scale;
            }

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
                const stepX = itemWidth + gapX;
                const stepY = itemHeight + gapY;

                for (let currX = -stepX; currX < canvas.width + stepX; currX += stepX) {
                    for (let currY = -stepY; currY < canvas.height + stepY; currY += stepY) {
                        let drawX = currX;
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

    const handleDownload = async () => {
        if (!file) return;
        setIsProcessing(true);

        try {
            if (activeTab === 'image') {
                const canvas = canvasRef.current;
                const url = canvas.toDataURL('image/png');
                downloadUrl(url, `watermarked_${file.name}`);
            } else {
                const pdfDocLoaded = await PDFDocument.load(pdfDoc);
                const pages = pdfDocLoaded.getPages();

                let wmObj;
                let dims = { width: 0, height: 0 };

                if (wmType === 'text') {
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

                for (const page of pages) {
                    const { width, height } = page.getSize();
                    let itemWidth = 0;
                    let itemHeight = 0;

                    if (wmType === 'text') {
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
                                font: wmObj,
                                color: rgb(r, g, b),
                                opacity: opacity,
                                rotate: degrees(rotation),
                            });
                        } else if (wmType === 'image' && wmObj) {
                            page.drawImage(wmObj, {
                                x: posX - (dims.width / 2),
                                y: pdfPosY - (dims.height / 2),
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
                        const stepX = itemWidth + gapX;
                        const stepY = itemHeight + gapY;

                        for (let currX = -stepX; currX < width + stepX; currX += stepX) {
                            for (let currY = -stepY; currY < height + stepY; currY += stepY) {
                                let drawX = currX;
                                if (Math.floor(currY / stepY) % 2 !== 0) {
                                    drawX += stepX / 2;
                                }
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
            alert("Export failed.");
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
        <div className="tool-container watermark-tool-container">
            <div className="tool-header-card">
                <h2>Watermark Tool</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Protect Images & PDFs with custom watermarks</p>
            </div>

            <div className="tool-card">
                <div className="tabs">
                    <button
                        className={`tab-link ${activeTab === 'image' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('image'); setFile(null); setPreviewUrl(null); }}
                    >
                        Image Watermark
                    </button>
                    <button
                        className={`tab-link ${activeTab === 'pdf' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('pdf'); setFile(null); setPdfPagePreview(null); }}
                    >
                        PDF Watermark
                    </button>
                </div>

                {!file ? (
                    <label htmlFor="wm-upload" className="drop-zone">
                        <span>Click to Upload {activeTab === 'image' ? 'Image' : 'PDF'}</span>
                        <input
                            type="file"
                            id="wm-upload"
                            accept={activeTab === 'image' ? "image/*" : "application/pdf"}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </label>
                ) : (
                    <div className="workspace-flex">
                        <div className="preview-section">
                            <div className="canvas-wrapper">
                                <canvas ref={canvasRef} className="preview-canvas" />
                            </div>
                        </div>

                        <div className="controls-grid">
                            <div className="control-group">
                                <label className="control-label">Watermark Type</label>
                                <div className="button-group">
                                    <button 
                                        className={`btn-toggle ${wmType === 'text' ? 'active' : ''}`}
                                        onClick={() => setWmType('text')}
                                    >Text</button>
                                    <button 
                                        className={`btn-toggle ${wmType === 'image' ? 'active' : ''}`}
                                        onClick={() => setWmType('image')}
                                    >Logo</button>
                                </div>
                            </div>

                            {wmType === 'text' ? (
                                <div className="control-group">
                                    <label className="control-label">Watermark Text</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={wmText}
                                        onChange={(e) => setWmText(e.target.value)}
                                    />
                                </div>
                            ) : (
                                <div className="control-group">
                                    <label className="control-label">Logo Image</label>
                                    <label htmlFor="logo-upload" className="btn-secondary" style={{ display: 'block', textAlign: 'center' }}>
                                        {wmImage ? "Change Logo" : "Upload Logo"}
                                    </label>
                                    <input
                                        id="logo-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleWmImageChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            )}

                            <div className="control-group">
                                <label className="control-label">Layout</label>
                                <div className="button-group">
                                    <button 
                                        className={`btn-toggle ${layout === 'single' ? 'active' : ''}`}
                                        onClick={() => setLayout('single')}
                                    >Single</button>
                                    <button 
                                        className={`btn-toggle ${layout === 'tile' ? 'active' : ''}`}
                                        onClick={() => setLayout('tile')}
                                    >Tile</button>
                                </div>
                            </div>

                            <div className="props-grid">
                                {layout === 'single' ? (
                                    <>
                                        <div className="control-group">
                                            <label className="control-label">Position X %</label>
                                            <input type="number" className="input-field" value={x} onChange={(e) => setX(parseInt(e.target.value) || 0)} />
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label">Position Y %</label>
                                            <input type="number" className="input-field" value={y} onChange={(e) => setY(parseInt(e.target.value) || 0)} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="control-group">
                                            <label className="control-label">Gap X (px)</label>
                                            <input type="number" className="input-field" value={gapX} onChange={(e) => setGapX(parseInt(e.target.value) || 0)} />
                                        </div>
                                        <div className="control-group">
                                            <label className="control-label">Gap Y (px)</label>
                                            <input type="number" className="input-field" value={gapY} onChange={(e) => setGapY(parseInt(e.target.value) || 0)} />
                                        </div>
                                    </>
                                )}
                                <div className="control-group">
                                    <label className="control-label">Scale</label>
                                    <input type="number" step="0.1" className="input-field" value={scale} onChange={(e) => setScale(parseFloat(e.target.value) || 1)} />
                                </div>
                                <div className="control-group">
                                    <label className="control-label">Rotate</label>
                                    <input type="number" className="input-field" value={rotation} onChange={(e) => setRotation(parseInt(e.target.value) || 0)} />
                                </div>
                            </div>

                            <div className="control-group">
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <label className="control-label">Opacity</label>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{Math.round(opacity * 100)}%</span>
                                </div>
                                <input type="range" min="0" max="100" value={opacity * 100} onChange={(e) => setOpacity(e.target.value / 100)} style={{ width: '100%' }} />
                            </div>

                            {wmType === 'text' && (
                                <div className="props-grid">
                                    <div className="control-group">
                                        <label className="control-label">Color</label>
                                        <input type="color" className="input-field" style={{ height: '42px', padding: '4px' }} value={color} onChange={(e) => setColor(e.target.value)} />
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label">Size</label>
                                        <input type="number" className="input-field" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} />
                                    </div>
                                    <div className="control-group" style={{ gridColumn: 'span 2' }}>
                                        <label className="control-label">Font</label>
                                        <select className="input-field" value={font} onChange={(e) => setFont(e.target.value)}>
                                            <option value="Helvetica">Helvetica</option>
                                            <option value="Times Roman">Times Roman</option>
                                            <option value="Courier">Courier</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            <div className="action-buttons-group" style={{ marginTop: 'auto', paddingBottom: '1rem' }}>
                                <button className="btn-primary" style={{ width: '100%' }} onClick={handleDownload} disabled={isProcessing}>
                                    {isProcessing ? 'Processing...' : 'Download File'}
                                </button>
                                <button className="btn-secondary" style={{ width: '100%', marginTop: '0.5rem' }} onClick={() => setFile(null)}>Change File</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Watermark;
