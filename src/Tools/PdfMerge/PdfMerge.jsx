import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import './PdfMerge.css';

const PdfMerge = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mergedPdfUrl, setMergedPdfUrl] = useState(null);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files).filter(f => f.type === 'application/pdf');
        if (selectedFiles.length === 0) return;
        setFiles(prev => [...prev, ...selectedFiles]);
        setMergedPdfUrl(null);
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setMergedPdfUrl(null);
    };

    const mergePdfs = async () => {
        if (files.length < 2) {
            alert("Please select at least 2 PDF files to merge.");
            return;
        }

        setLoading(true);
        try {
            const mergedPdf = await PDFDocument.create();
            
            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            setMergedPdfUrl(URL.createObjectURL(blob));
        } catch (error) {
            console.error("Merging failed:", error);
            alert("An error occurred during merging. Make sure files are not corrupted.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tool-container">
            <div className="tool-header-card">
                <h2>PDF Merge</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Combine multiple PDF files into one document</p>
            </div>

            <div className="tool-card merge-content-card">
                <div className="merge-workspace">
                    <label htmlFor="merge-upload" className="drop-zone">
                        <div className="drop-zone-content">
                            <span className="plus-icon">+</span>
                            <span>Click to Add PDFs</span>
                            <span className="hint-text">Supported format: PDF</span>
                        </div>
                        <input id="merge-upload" type="file" multiple accept=".pdf" onChange={handleFileChange} style={{ display: 'none' }} />
                    </label>

                    {files.length > 0 && (
                        <div className="merge-list">
                            <h3 className="list-title">Selected Documents ({files.length})</h3>
                            <div className="files-stack">
                                {files.map((file, idx) => (
                                    <div key={idx} className="file-row">
                                        <div className="file-main">
                                            <span className="file-idx">{idx + 1}</span>
                                            <span className="file-name-text">{file.name}</span>
                                        </div>
                                        <button className="remove-btn" onClick={() => removeFile(idx)} title="Remove file">✕</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!mergedPdfUrl ? (
                        <div className="action-area">
                            <button className="btn-primary merge-btn" onClick={mergePdfs} disabled={loading || files.length < 2}>
                                {loading ? 'Merging PDFs...' : 'Merge All Files'}
                            </button>
                            {files.length > 0 && (
                                <button className="btn-secondary clear-btn" onClick={() => setFiles([])}>Clear All</button>
                            )}
                        </div>
                    ) : (
                        <div className="result-view">
                            <div className="success-badge">
                                <span className="check">✓</span>
                                PDF Merged Successfully!
                            </div>
                            <div className="result-actions">
                                <a href={mergedPdfUrl} download="merged_wit_tools.pdf" className="btn-primary download-merged">Download PDF</a>
                                <button className="btn-secondary" onClick={() => { setFiles([]); setMergedPdfUrl(null); }}>Start New Merge</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PdfMerge;
