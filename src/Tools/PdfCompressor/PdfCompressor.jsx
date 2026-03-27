import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
// Use worker from public folder to avoid bundler issues (same as PdfToImg)
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

import jsPDF from 'jspdf';
import './PdfCompressor.css';

const PdfCompressor = () => {
    const [file, setFile] = useState(null);
    const [compressedPdf, setCompressedPdf] = useState(null); // Blob URL
    const [originalSize, setOriginalSize] = useState(0);
    const [compressedSize, setCompressedSize] = useState(0);
    const [isCompressing, setIsCompressing] = useState(false);
    const [compressionLevel, setCompressionLevel] = useState(0.7); // 0.1 to 1.0 (Quality)
    const [progress, setProgress] = useState(0);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setOriginalSize(selectedFile.size);
            setCompressedPdf(null);
            setCompressedSize(0);
            setProgress(0);
        } else {
            alert('Please select a valid PDF file.');
        }
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const compressPdf = async () => {
        if (!file) return;

        setIsCompressing(true);
        setProgress(0);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            const numPages = pdf.numPages;

            const newPdf = new jsPDF({
                orientation: 'p',
                unit: 'px',
                format: 'a4',
                compress: true 
            });

            for (let i = 1; i <= numPages; i++) {
                setProgress(Math.round(((i - 1) / numPages) * 100));

                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 }); 

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({
                    canvasContext: context,
                    viewport: viewport
                }).promise;

                const imgData = canvas.toDataURL('image/jpeg', compressionLevel);

                if (i > 1) {
                    newPdf.addPage([viewport.width, viewport.height]);
                } else {
                    newPdf.deletePage(1); 
                    newPdf.addPage([viewport.width, viewport.height]);
                }

                const width = newPdf.internal.pageSize.getWidth();
                const height = newPdf.internal.pageSize.getHeight();

                newPdf.addImage(imgData, 'JPEG', 0, 0, width, height, undefined, 'FAST');
            }

            setProgress(100);

            const compressedBlob = newPdf.output('blob');
            const compressedUrl = URL.createObjectURL(compressedBlob);

            setCompressedPdf(compressedUrl);
            setCompressedSize(compressedBlob.size);

        } catch (error) {
            console.error("Error compressing PDF:", error);
            alert("An error occurred during compression.");
        } finally {
            setIsCompressing(false);
        }
    };

    return (
        <div className="tool-container pdf-compressor-container">
            <div className="tool-header-card">
                <h2>PDF Compressor</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Reduce PDF size with smart compression</p>
            </div>

            <div className="tool-card">
                {!file ? (
                    <label htmlFor="pdf-upload" className="drop-zone">
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
                    <div className="workspace">
                        <div className="file-info-header">
                            <h3 className="file-name">{file.name}</h3>
                            <span className="file-size-tag">Original: {formatSize(originalSize)}</span>
                        </div>

                        {!compressedPdf ? (
                            <div className="pdf-controls">
                                <div className="control-group">
                                    <label className="control-label">Compression Level: {Math.round(compressionLevel * 100)}%</label>
                                    <input
                                        type="range"
                                        min="0.1"
                                        max="1.0"
                                        step="0.1"
                                        value={compressionLevel}
                                        onChange={(e) => setCompressionLevel(parseFloat(e.target.value))}
                                        className="quality-range"
                                    />
                                </div>

                                <button
                                    className="btn-primary"
                                    onClick={compressPdf}
                                    disabled={isCompressing}
                                    style={{ width: '100%' }}
                                >
                                    {isCompressing ? `Processing... ${progress}%` : 'Compress PDF'}
                                </button>

                                {isCompressing && (
                                    <div className="progress-bar-container">
                                        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="result-section">
                                <div className="result-stats">
                                    <div className="stat-item">
                                        <span className="stat-label">Original</span>
                                        <span className="stat-value">{formatSize(originalSize)}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label">Compressed</span>
                                        <span className="stat-value green">{formatSize(compressedSize)}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label">Reduction</span>
                                        <span className="stat-value red">
                                            {Math.round(((originalSize - compressedSize) / originalSize) * 100)}%
                                        </span>
                                    </div>
                                </div>

                                <div className="action-buttons-group">
                                    <a
                                        href={compressedPdf}
                                        download={`compressed_${file.name}`}
                                        className="btn-primary"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Download PDF
                                    </a>

                                    <button
                                        className="btn-secondary"
                                        onClick={() => {
                                            setFile(null);
                                            setCompressedPdf(null);
                                            setCompressedSize(0);
                                        }}
                                    >
                                        Compress Another
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PdfCompressor;
