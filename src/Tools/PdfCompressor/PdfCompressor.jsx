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

            // Create a new PDF with jsPDF
            // Initialize with the first page format, will adjust per page
            const newPdf = new jsPDF({
                orientation: 'p',
                unit: 'px',
                format: 'a4',
                compress: true // Enable internal compression
            });

            // Iterate through each page
            for (let i = 1; i <= numPages; i++) {
                setProgress(Math.round(((i - 1) / numPages) * 100));

                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 }); // Scale 1.5 is a good balance for readability vs size

                // Create a canvas to render the page
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({
                    canvasContext: context,
                    viewport: viewport
                }).promise;

                // Convert canvas to compressed JPEG
                // The magic happens here: rendering the page as an image with reduced quality
                const imgData = canvas.toDataURL('image/jpeg', compressionLevel);

                // Add image to new PDF
                if (i > 1) {
                    newPdf.addPage([viewport.width, viewport.height]);
                } else {
                    // Resize first page if needed, or just set page size
                    // Actually setPage is better or creating doc with correct size
                    newPdf.deletePage(1); // Remove default page
                    newPdf.addPage([viewport.width, viewport.height]);
                }

                // Add the image to the current page (which is the last added page)
                const width = newPdf.internal.pageSize.getWidth();
                const height = newPdf.internal.pageSize.getHeight();

                newPdf.addImage(imgData, 'JPEG', 0, 0, width, height, undefined, 'FAST');
            }

            setProgress(100);

            // Generate the Blob
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
        <div className="pdf-compressor-container">
            <div className="tool-header">
                <h2>PDF Compressor</h2>
                <p>Reduce PDF file size by optimizing pages (Rasterize & Compress)</p>
            </div>

            <div className="compressor-card">
                {!file ? (
                    <div className="drop-zone" onClick={() => document.getElementById('pdf-upload').click()}>
                        <input
                            type="file"
                            id="pdf-upload"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            hidden
                        />
                        <div className="drop-content">
                            <span>Click to Upload PDF</span>
                            <p>Supports .PDF files</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="file-info-header">
                            <h3>{file.name}</h3>
                            <span className="file-size-tag">Original: {formatSize(originalSize)}</span>
                        </div>

                        {!compressedPdf ? (
                            <div className="pdf-controls">
                                <div className="control-group">
                                    <label className="control-label">Compression Level (Image Quality)</label>
                                    <input
                                        type="range"
                                        min="0.1"
                                        max="1.0"
                                        step="0.1"
                                        value={compressionLevel}
                                        onChange={(e) => setCompressionLevel(parseFloat(e.target.value))}
                                        className="quality-range"
                                    />
                                    <div className="quality-value-display">
                                        <span>Current: {Math.round(compressionLevel * 100)}% Quality</span>
                                        <span style={{ fontSize: '0.8rem', color: '#666' }}>
                                            (Lower = Smaller Size, Higher = Better Quality)
                                        </span>
                                    </div>
                                </div>

                                <button
                                    className="compress-btn"
                                    onClick={compressPdf}
                                    disabled={isCompressing}
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
                                <h3>Compression Complete!</h3>

                                <div className="result-stats">
                                    <div className="stat-item">
                                        <span className="stat-label">Original</span>
                                        <span className="stat-value">{formatSize(originalSize)}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label">Compressed</span>
                                        <span className="stat-value" style={{ color: '#10b981' }}>{formatSize(compressedSize)}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label">Reduction</span>
                                        <span className="stat-value" style={{ color: '#dc2626' }}>
                                            {Math.round(((originalSize - compressedSize) / originalSize) * 100)}%
                                        </span>
                                    </div>
                                </div>

                                <a
                                    href={compressedPdf}
                                    download={`compressed_${file.name}`}
                                    className="download-btn"
                                >
                                    Download Compressed PDF
                                </a>

                                <button
                                    className="reset-btn"
                                    onClick={() => {
                                        setFile(null);
                                        setCompressedPdf(null);
                                        setCompressedSize(0);
                                    }}
                                >
                                    Compress Another PDF
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default PdfCompressor;
