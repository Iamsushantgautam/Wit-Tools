import React, { useState, useRef, useEffect } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import './PdfPageNumber.css';

// Set up pdf.js worker - matching Watermark.jsx approach
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const PdfPageNumber = () => {
    // --- File State ---
    const [file, setFile] = useState(null);
    const [pdfInstance, setPdfInstance] = useState(null);
    const [pdfArrayBuffer, setPdfArrayBuffer] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [previewPageNum, setPreviewPageNum] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    // --- Page Number Settings ---
    const [position, setPosition] = useState('bottom-right');
    const [offsetX, setOffsetX] = useState(25);
    const [offsetY, setOffsetY] = useState(25);
    const [customX, setCustomX] = useState(50);
    const [customY, setCustomY] = useState(90);

    const [template, setTemplate] = useState('Page {n}');
    const [startNumber, setStartNumber] = useState(1);
    const [fontSize, setFontSize] = useState(12);
    const [fontColor, setFontColor] = useState('#000000');
    const [fontFamily, setFontFamily] = useState('Helvetica');

    // --- New Features ---
    const [pageRangeMode, setPageRangeMode] = useState('all');
    const [startRange, setStartRange] = useState(1);
    const [endRange, setEndRange] = useState(1);
    const [skipFirstCount, setSkipFirstCount] = useState(1);

    const canvasRef = useRef(null);

    const fontOptions = {
        'Helvetica': StandardFonts.Helvetica,
        'Helvetica Bold': StandardFonts.HelveticaBold,
        'Helvetica Italic': StandardFonts.HelveticaOblique,
        'Times Roman': StandardFonts.TimesRoman,
        'Times Bold': StandardFonts.TimesRomanBold,
        'Times Italic': StandardFonts.TimesRomanItalic,
        'Courier': StandardFonts.Courier,
        'Courier Bold': StandardFonts.CourierBold,
        'Courier Italic': StandardFonts.CourierOblique
    };

    const templateSuggestions = [
        { label: 'Page 1', value: 'Page {n}' },
        { label: '1', value: '{n}' },
        { label: '1 / 10', value: '{n} / {total}' },
        { label: '- 1 -', value: '- {n} -' },
        { label: 'P.1', value: 'P.{n}' }
    ];

    // --- File Handling ---
    const handleFileChange = async (e) => {
        const selected = e.target.files[0];
        if (!selected || selected.type !== 'application/pdf') {
            alert("Please select a valid PDF file.");
            return;
        }

        setFile(selected);
        const arrayBuffer = await selected.arrayBuffer();
        setPdfArrayBuffer(arrayBuffer);

        try {
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            setPdfInstance(pdf);
            setPageCount(pdf.numPages);
            setEndRange(pdf.numPages);
            setPreviewPageNum(1);

            await renderPreviewPage(pdf, 1);
        } catch (error) {
            console.error("Error loading PDF preview:", error);
            alert("Failed to load PDF preview.");
        }
    };

    const renderPreviewPage = async (pdf, pageNum) => {
        if (!pdf) return;
        try {
            const page = await pdf.getPage(pageNum);
            const scale = 2.0;
            const viewport = page.getViewport({ scale });

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport }).promise;
            setPreviewImage(canvas.toDataURL());
        } catch (error) {
            console.error("Error rendering page:", error);
        }
    };

    const handlePreviewPageChange = async (pageNum) => {
        const num = Math.min(Math.max(1, pageNum), pageCount);
        setPreviewPageNum(num);
        if (pdfInstance) {
            await renderPreviewPage(pdfInstance, num);
        }
    };

    // --- Draw Preview ---
    useEffect(() => {
        if (!previewImage) return;
        drawPreview();
    }, [previewImage, position, offsetX, offsetY, customX, customY, template, fontSize, fontColor, fontFamily, startNumber, previewPageNum, pageCount, pageRangeMode, startRange, endRange, skipFirstCount]);

    const drawPreview = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const bgImage = new Image();
        bgImage.src = previewImage;
        bgImage.onload = () => {
            canvas.width = bgImage.width;
            canvas.height = bgImage.height;
            ctx.drawImage(bgImage, 0, 0);

            const { posX, posY } = calculatePosition(canvas.width, canvas.height, true);

            ctx.save();
            ctx.font = `${fontSize * 2.0}px ${fontFamily.replace('Bold', '').replace('Italic', '')}, Arial, sans-serif`;
            if (fontFamily.includes('Bold')) ctx.font = `bold ${ctx.font}`;
            if (fontFamily.includes('Italic')) ctx.font = `italic ${ctx.font}`;

            ctx.fillStyle = fontColor;

            let currentNumOnPage = startNumber;
            if (pageRangeMode === 'skip-first') {
                currentNumOnPage = startNumber + (previewPageNum - skipFirstCount - 1);
            } else if (pageRangeMode === 'range') {
                currentNumOnPage = startNumber + (previewPageNum - startRange);
            } else {
                currentNumOnPage = startNumber + (previewPageNum - 1);
            }

            let displayText = template.replace('{n}', currentNumOnPage);
            displayText = displayText.replace('{total}', pageCount);

            let shouldDisplay = true;
            if (pageRangeMode === 'range') {
                if (previewPageNum < startRange || previewPageNum > endRange) shouldDisplay = false;
            } else if (pageRangeMode === 'skip-first') {
                if (previewPageNum <= skipFirstCount) shouldDisplay = false;
            }

            if (shouldDisplay) {
                if (position.includes('center')) {
                    ctx.textAlign = 'center';
                } else if (position.includes('right')) {
                    ctx.textAlign = 'right';
                } else {
                    ctx.textAlign = 'left';
                }

                ctx.textBaseline = 'middle';
                ctx.fillText(displayText, posX, posY);
            }
            ctx.restore();
        };
    };

    const calculatePosition = (width, height, isCanvas = false) => {
        let posX, posY;
        const marginX = isCanvas ? offsetX * 2.0 : offsetX;
        const marginY = isCanvas ? offsetY * 2.0 : offsetY;

        switch (position) {
            case 'top-left':
                posX = marginX;
                posY = marginY;
                break;
            case 'top-center':
                posX = width / 2;
                posY = marginY;
                break;
            case 'top-right':
                posX = width - marginX;
                posY = marginY;
                break;
            case 'bottom-left':
                posX = marginX;
                posY = height - marginY;
                break;
            case 'bottom-center':
                posX = width / 2;
                posY = height - marginY;
                break;
            case 'bottom-right':
                posX = width - marginX;
                posY = height - marginY;
                break;
            case 'custom':
                posX = (width * customX) / 100;
                posY = (height * customY) / 100;
                break;
            default:
                posX = width - marginX;
                posY = height - marginY;
        }

        if (!isCanvas) {
            posY = height - posY;
        }

        return { posX, posY };
    };

    const handleDownload = async () => {
        if (!pdfArrayBuffer) return;
        setIsProcessing(true);

        try {
            const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
            const pages = pdfDoc.getPages();

            const font = await pdfDoc.embedFont(fontOptions[fontFamily]);
            const r = parseInt(fontColor.slice(1, 3), 16) / 255;
            const g = parseInt(fontColor.slice(3, 5), 16) / 255;
            const b = parseInt(fontColor.slice(5, 7), 16) / 255;

            pages.forEach((page, index) => {
                const pageNum = index + 1;
                let shouldAdd = true;
                if (pageRangeMode === 'range') {
                    if (pageNum < startRange || pageNum > endRange) shouldAdd = false;
                } else if (pageRangeMode === 'skip-first') {
                    if (pageNum <= skipFirstCount) shouldAdd = false;
                }

                if (shouldAdd) {
                    const { width, height } = page.getSize();
                    const { posX, posY } = calculatePosition(width, height, false);

                    let currentNum = startNumber;
                    if (pageRangeMode === 'skip-first') {
                        currentNum = startNumber + (pageNum - skipFirstCount - 1);
                    } else if (pageRangeMode === 'range') {
                        currentNum = startNumber + (pageNum - startRange);
                    } else {
                        currentNum = startNumber + index;
                    }

                    let displayText = template.replace('{n}', currentNum);
                    displayText = displayText.replace('{total}', pageCount);

                    const textWidth = font.widthOfTextAtSize(displayText, fontSize);
                    const textHeight = font.heightAtSize(fontSize);

                    let drawX = posX;
                    if (position.includes('center')) {
                        drawX -= textWidth / 2;
                    } else if (position.includes('right')) {
                        drawX -= textWidth;
                    }

                    let drawY = posY - (textHeight / 2);

                    page.drawText(displayText, {
                        x: drawX,
                        y: drawY,
                        size: fontSize,
                        font: font,
                        color: rgb(r, g, b),
                    });
                }
            });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `numbered_${file.name}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to add page numbers:", error);
            alert("Error processing PDF.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="tool-container pdf-pagenumber-container">
            <div className="tool-header-card">
                <h2>Add Page Numbers to PDF</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Personalize and organize your PDF with precision numbering.</p>
            </div>

            <div className="tool-card">
                {!file ? (
                    <label htmlFor="pdf-upload" className="drop-zone">
                        <span className="tool-icon">📄</span>
                        <span>Click to Upload PDF</span>
                        <input
                            type="file"
                            id="pdf-upload"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </label>
                ) : (
                    <div className="workspace-flex">
                        <div className="preview-section">
                            <div className="label-with-value" style={{ marginBottom: '1.25rem' }}>
                                <label className="control-label">Live Preview Navigation</label>
                                <span className="value-badge">Page {previewPageNum} / {pageCount}</span>
                            </div>

                            <div className="canvas-wrapper">
                                <canvas ref={canvasRef} className="preview-canvas" />
                            </div>

                            <div className="page-scroller">
                                <button className="btn-circle" onClick={() => handlePreviewPageChange(previewPageNum - 1)} disabled={previewPageNum <= 1}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                                </button>
                                <input
                                    type="number"
                                    className="input-field page-num-input"
                                    min="1"
                                    max={pageCount}
                                    value={previewPageNum}
                                    onChange={(e) => handlePreviewPageChange(Number(e.target.value))}
                                    style={{ width: '80px', textAlign: 'center', backgroundColor: 'var(--bg-main)' }}
                                />
                                <button className="btn-circle" onClick={() => handlePreviewPageChange(previewPageNum + 1)} disabled={previewPageNum >= pageCount}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                                </button>
                            </div>
                        </div>

                        <div className="controls-grid">
                            <div className="control-group">
                                <label className="control-label">Positioning Mode</label>
                                <div className="button-group compact">
                                    {['top-left', 'top-center', 'top-right'].map(pos => (
                                        <button key={pos} className={`btn-toggle ${position === pos ? 'active' : ''}`} onClick={() => setPosition(pos)}>
                                            {pos.split('-')[1].toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                                <div className="button-group compact" style={{ marginTop: '4px' }}>
                                    {['bottom-left', 'bottom-center', 'bottom-right'].map(pos => (
                                        <button key={pos} className={`btn-toggle ${position === pos ? 'active' : ''}`} onClick={() => setPosition(pos)}>
                                            {pos.split('-')[1].toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                                <button className={`btn-toggle ${position === 'custom' ? 'active' : ''}`} style={{ marginTop: '4px' }} onClick={() => setPosition('custom')}>Full Manual Placement</button>
                            </div>

                            {position === 'custom' ? (
                                <div className="props-grid">
                                    <div className="control-group">
                                        <label className="control-label">Horizontal (%)</label>
                                        <input type="number" className="input-field" min="0" max="100" value={customX} onChange={(e) => setCustomX(Number(e.target.value))} />
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label">Vertical (%)</label>
                                        <input type="number" className="input-field" min="0" max="100" value={customY} onChange={(e) => setCustomY(Number(e.target.value))} />
                                    </div>
                                </div>
                            ) : (
                                <div className="props-grid">
                                    <div className="control-group">
                                        <label className="control-label">Margin X (px)</label>
                                        <input type="number" className="input-field" min="0" max="500" value={offsetX} onChange={(e) => setOffsetX(Number(e.target.value))} />
                                    </div>
                                    <div className="control-group">
                                        <label className="control-label">Margin Y (px)</label>
                                        <input type="number" className="input-field" min="0" max="500" value={offsetY} onChange={(e) => setOffsetY(Number(e.target.value))} />
                                    </div>
                                </div>
                            )}

                            <div className="control-group">
                                <label className="control-label">Page Selection (Jump)</label>
                                <select className="input-field" value={pageRangeMode} onChange={(e) => setPageRangeMode(e.target.value)}>
                                    <option value="all">Every Page</option>
                                    <option value="skip-first">Skip First X Pages</option>
                                    <option value="range">Specific Range</option>
                                </select>

                                {pageRangeMode === 'skip-first' && (
                                    <div className="range-inputs" style={{ marginTop: '8px' }}>
                                        <input type="number" className="input-field" value={skipFirstCount} onChange={(e) => setSkipFirstCount(Number(e.target.value))} placeholder="Count to skip..." />
                                    </div>
                                )}
                                {pageRangeMode === 'range' && (
                                    <div className="props-grid" style={{ marginTop: '8px' }}>
                                        <input type="number" className="input-field" value={startRange} onChange={(e) => setStartRange(Number(e.target.value))} placeholder="From" />
                                        <input type="number" className="input-field" value={endRange} onChange={(e) => setEndRange(Number(e.target.value))} placeholder="To" />
                                    </div>
                                )}
                            </div>

                            <div className="control-group">
                                <label className="control-label">Style Suggestions</label>
                                <div className="suggestion-chips">
                                    {templateSuggestions.map(sug => (
                                        <button
                                            key={sug.label}
                                            className={`chip ${template === sug.value ? 'active' : ''}`}
                                            onClick={() => setTemplate(sug.value)}
                                        >
                                            {sug.label}
                                        </button>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={template}
                                    placeholder="Enter custom template..."
                                    onChange={(e) => setTemplate(e.target.value)}
                                    style={{ marginTop: '8px' }}
                                />
                            </div>

                            <div className="control-group">
                                <label className="control-label">Text Color</label>
                                <div className="color-control-wrapper">
                                    <div className="selected-color-display" style={{ backgroundColor: fontColor }}>
                                        <input
                                            type="color"
                                            className="hidden-color-input"
                                            value={fontColor}
                                            onChange={(e) => setFontColor(e.target.value)}
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={fontColor.toUpperCase()}
                                        onChange={(e) => setFontColor(e.target.value)}
                                        style={{ flex: 1 }}
                                    />
                                </div>
                            </div>

                            <div className="props-grid">
                                <div className="control-group">
                                    <label className="control-label">Font Size</label>
                                    <input type="number" className="input-field" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} />
                                </div>
                                <div className="control-group">
                                    <label className="control-label">Start Number</label>
                                    <input type="number" className="input-field" value={startNumber} onChange={(e) => setStartNumber(Number(e.target.value))} />
                                </div>
                            </div>

                            <div className="control-group">
                                <label className="control-label">Font Selection</label>
                                <select className="input-field" value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                                    {Object.keys(fontOptions).map(name => <option key={name} value={name}>{name}</option>)}
                                </select>
                            </div>

                            <div className="action-buttons-group">
                                <button className="btn-primary" onClick={handleDownload} disabled={isProcessing}>
                                    {isProcessing ? 'Processing...' : `Download Numbered PDF`}
                                </button>
                                <button className="btn-secondary" onClick={() => setFile(null)}>Choose Another File</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PdfPageNumber;
