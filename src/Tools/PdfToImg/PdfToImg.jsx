import React, { useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import './PdfToImg.css';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const PdfToImg = () => {
    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);
    const [selectedPages, setSelectedPages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFile = (selectedFile) => {
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setImages([]);
            setSelectedPages([]);
            setProgress(0);
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

    const onFileChange = (e) => {
        handleFile(e.target.files[0]);
    };

    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = () => {
        setIsDragging(false);
    };

    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files[0]);
    };

    const convertPdfToImages = async () => {
        if (!file) return;

        setLoading(true);
        setProgress(0);
        setImages([]);
        setSelectedPages([]);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            const numPages = pdf.numPages;
            const convertedImages = [];

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);

                // Scale 2.0 provides good quality without too much memory overhead
                const viewport = page.getViewport({ scale: 2.0 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({
                    canvasContext: context,
                    viewport: viewport,
                }).promise;

                const dataUrl = canvas.toDataURL('image/png');
                convertedImages.push({
                    id: i,
                    url: dataUrl,
                    pageNumber: i
                });

                setProgress(Math.round((i / numPages) * 100));
            }

            setImages(convertedImages);
            // Default select all after conversion
            setSelectedPages(convertedImages.map(img => img.pageNumber));
        } catch (error) {
            console.error('Error converting PDF:', error);
            alert('Failed to convert PDF. Please try a different file.');
        } finally {
            setLoading(false);
        }
    };

    const downloadZip = async () => {
        if (images.length === 0) return;

        const imagesToDownload = selectedPages.length > 0
            ? images.filter(img => selectedPages.includes(img.pageNumber))
            : images;

        if (imagesToDownload.length === 0) {
            alert('Please select at least one page to download.');
            return;
        }

        const zip = new JSZip();
        imagesToDownload.forEach((img) => {
            const base64Data = img.url.replace(/^data:image\/(png|jpg);base64,/, "");
            zip.file(`page-${img.pageNumber}.png`, base64Data, { base64: true });
        });

        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, `${file.name.replace('.pdf', '')}_selected_pages.zip`);
    };

    const togglePageSelection = (pageNumber) => {
        setSelectedPages(prev =>
            prev.includes(pageNumber)
                ? prev.filter(p => p !== pageNumber)
                : [...prev, pageNumber]
        );
    };

    const toggleSelectAll = () => {
        if (selectedPages.length === images.length) {
            setSelectedPages([]);
        } else {
            setSelectedPages(images.map(img => img.pageNumber));
        }
    };

    const downloadSingleImage = (url, pageNum) => {
        saveAs(url, `page-${pageNum}.png`);
    };

    const clearFile = () => {
        setFile(null);
        setImages([]);
        setSelectedPages([]);
        setProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="pdf-to-img-container">
            <div className="tool-header">
                <h2>PDF to Image Converter</h2>
                <p>Convert your PDF pages into high-quality PNG images instantly. Perfect for presentations, social media, or extracting specific pages.</p>
            </div>

            <div className="main-content">
                <div className={`upload-card ${isDragging ? 'dragging' : ''}`}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}>

                    {!file ? (
                        <div className="drop-zone" onClick={() => fileInputRef.current.click()}>
                            <svg className="upload-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <h3>Select PDF File</h3>
                            <p>or drag and drop your file here</p>
                            <button className="browse-btn">Browse File</button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={onFileChange}
                                accept="application/pdf"
                                style={{ display: 'none' }}
                            />
                        </div>
                    ) : (
                        <>
                            <div className="file-info">
                                <div className="file-details">
                                    <svg className="pdf-icon-mini" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                                    </svg>
                                    <span className="file-name">{file.name}</span>
                                </div>
                                <button className="clear-btn" onClick={clearFile} disabled={loading}>Change</button>
                            </div>

                            <div className="action-buttons">
                                <button
                                    className="convert-btn"
                                    onClick={convertPdfToImages}
                                    disabled={loading || images.length > 0}
                                >
                                    {loading ? (
                                        <>
                                            <span className="loader-dots"></span>
                                            Converting...
                                        </>
                                    ) : images.length > 0 ? 'Conversion Complete' : 'Convert to Images'}
                                </button>
                            </div>

                            {loading && (
                                <div className="status-tracker">
                                    <div className="progress-header">
                                        <span>Processing pages...</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="progress-bar-container">
                                        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {images.length > 0 && (
                    <div className="results-section">
                        <div className="results-header">
                            <div className="header-left">
                                <h3>Converted Pages ({images.length})</h3>
                                <button className="select-all-btn" onClick={toggleSelectAll}>
                                    {selectedPages.length === images.length ? 'Deselect All' : 'Select All'}
                                </button>
                            </div>
                            <button className="download-all-btn" onClick={downloadZip} disabled={selectedPages.length === 0}>
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 4v12m0 0l-4-4m4 4l4-4" />
                                </svg>
                                Download {selectedPages.length === images.length ? 'All' : `Selected (${selectedPages.length})`} (ZIP)
                            </button>
                        </div>

                        <div className="images-grid">
                            {images.map((img) => (
                                <div
                                    key={img.id}
                                    className={`image-card ${selectedPages.includes(img.pageNumber) ? 'selected' : ''}`}
                                    onClick={() => togglePageSelection(img.pageNumber)}
                                >
                                    <div className="selection-overlay">
                                        <div className="checkbox">
                                            {selectedPages.includes(img.pageNumber) && (
                                                <svg viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <div className="image-preview-wrapper">
                                        <img src={img.url} alt={`Page ${img.pageNumber}`} />
                                    </div>
                                    <div className="card-footer" onClick={(e) => e.stopPropagation()}>
                                        <span className="page-number">Page {img.pageNumber}</span>
                                        <button
                                            className="card-download-btn"
                                            onClick={() => downloadSingleImage(img.url, img.pageNumber)}
                                            title="Download Page"
                                        >
                                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                            </svg>
                                            <span>Download</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PdfToImg;
