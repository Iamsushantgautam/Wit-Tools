import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import * as pdfjs from 'pdfjs-dist';
import './PdfSplit.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const PdfSplit = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [splitOptions, setSplitOptions] = useState('all'); // 'all' or 'range'
    const [range, setRange] = useState({ start: 1, end: 1 });
    const [thumbnails, setThumbnails] = useState([]);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setLoading(true);
            setThumbnails([]);
            
            try {
                const arrayBuffer = await selectedFile.arrayBuffer();
                const pdfLibDoc = await PDFDocument.load(arrayBuffer);
                const count = pdfLibDoc.getPageCount();
                setPageCount(count);
                setRange({ start: 1, end: count });

                // Generate Thumbnails
                const loadingTask = pdfjs.getDocument(arrayBuffer);
                const pdf = await loadingTask.promise;
                const thumbs = [];

                for (let i = 1; i <= Math.min(count, 12); i++) { // Limit 12 thumbs for performance
                    const page = await pdf.getPage(i);
                    const viewport = page.getViewport({ scale: 0.3 });
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    await page.render({ canvasContext: context, viewport }).promise;
                    thumbs.push(canvas.toDataURL());
                }
                setThumbnails(thumbs);
            } catch (err) {
                console.error("Load failed:", err);
                alert("Could not load PDF. It might be protected or corrupted.");
            } finally {
                setLoading(false);
            }
        }
    };

    const processSplit = async () => {
        if (!file) return;
        setLoading(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(arrayBuffer);
            const total = pdf.getPageCount();

            if (splitOptions === 'all') {
                const zip = new JSZip();
                for (let i = 0; i < total; i++) {
                    const newPdf = await PDFDocument.create();
                    const [page] = await newPdf.copyPages(pdf, [i]);
                    newPdf.addPage(page);
                    const pdfBytes = await newPdf.save();
                    zip.file(`page_${i + 1}.pdf`, pdfBytes);
                }
                const content = await zip.generateAsync({ type: "blob" });
                saveAs(content, `split_${file.name.replace('.pdf', '')}.zip`);
            } else {
                const s = Math.max(1, range.start);
                const e = Math.min(total, range.end);
                if (s > e) {
                    alert("Start must be <= end.");
                    setLoading(false);
                    return;
                }
                const newPdf = await PDFDocument.create();
                const indices = Array.from({ length: e - s + 1 }, (_, i) => s - 1 + i);
                const copiedPages = await newPdf.copyPages(pdf, indices);
                copiedPages.forEach(p => newPdf.addPage(p));
                const pdfBytes = await newPdf.save();
                saveAs(new Blob([pdfBytes], { type: 'application/pdf' }), `range_${s}-${e}_${file.name}`);
            }
        } catch (error) {
            console.error("Split failed:", error);
            alert("An error occurred during splitting.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tool-container">
            <div className="tool-header-card">
                <h2>PDF Splitter</h2>
                <p style={{ color: 'var(--text-muted)' }}>Visual page extraction and splitting</p>
            </div>

            <div className="tool-card split-main-card">
                {!file ? (
                    <label htmlFor="split-upload" className="drop-zone">
                        <span>Click to Upload PDF</span>
                        <input id="split-upload" type="file" accept=".pdf" onChange={handleFileChange} style={{ display: 'none' }} />
                    </label>
                ) : (
                    <div className="split-workspace">
                        <header className="file-summary">
                            <div>
                                <h3 className="file-name">{file.name}</h3>
                                <p className="file-meta">{pageCount} Pages Detected</p>
                            </div>
                            <button className="btn-secondary" onClick={() => setFile(null)}>New File</button>
                        </header>

                        <div className="thumbnails-container">
                            <h4 className="section-title">Preview (Internal Pages)</h4>
                            <div className="thumbs-grid">
                                {thumbnails.map((src, i) => (
                                    <div key={i} className="thumb-item">
                                        <img src={src} alt={`Page ${i + 1}`} />
                                        <span>Page {i + 1}</span>
                                    </div>
                                ))}
                                {pageCount > thumbnails.length && (
                                    <div className="thumb-more">
                                        <span>+{pageCount - thumbnails.length} more...</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="split-config-area">
                            <h4 className="section-title">Split Configuration</h4>
                            <div className="mode-selector">
                                <button className={splitOptions === 'all' ? 'active' : ''} onClick={() => setSplitOptions('all')}>All Pages</button>
                                <button className={splitOptions === 'range' ? 'active' : ''} onClick={() => setSplitOptions('range')}>Custom Range</button>
                            </div>

                            {splitOptions === 'range' && (
                                <div className="range-rows">
                                    <div className="range-box">
                                        <label>Extract From Page</label>
                                        <input type="number" className="input-field" value={range.start} onChange={e => setRange(p => ({ ...p, start: Number(e.target.value) }))} />
                                    </div>
                                    <div className="range-box">
                                        <label>To Page</label>
                                        <input type="number" className="input-field" value={range.end} onChange={e => setRange(p => ({ ...p, end: Number(e.target.value) }))} />
                                    </div>
                                </div>
                            )}

                            <button className="btn-primary" onClick={processSplit} disabled={loading} style={{ width: '100%', marginTop: '1.5rem', height: '56px' }}>
                                {loading ? 'Processing...' : splitOptions === 'all' ? 'Split & Download ZIP' : 'Extract & Download PDF'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PdfSplit;
