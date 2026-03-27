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
            setSelectedPages(convertedImages.map(img => img.pageNumber));
        } catch (error) {
            console.error('Error converting PDF:', error);
            alert('Failed to convert PDF.');
        } finally {
            setLoading(false);
        }
    };

    const downloadZip = async () => {
        if (images.length === 0) return;
        const imagesToDownload = images.filter(img => selectedPages.includes(img.pageNumber));
        
        if (imagesToDownload.length === 0) {
            alert('Please select at least one page.');
            return;
        }

        const zip = new JSZip();
        imagesToDownload.forEach((img) => {
            const base64Data = img.url.replace(/^data:image\/(png|jpg);base64,/, "");
            zip.file(`page-${img.pageNumber}.png`, base64Data, { base64: true });
        });

        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, `${file.name.replace('.pdf', '')}_images.zip`);
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

    const clearFile = () => {
        setFile(null);
        setImages([]);
        setSelectedPages([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="tool-container pdf-to-img-container">
            <div className="tool-header-card">
                <h2>PDF to Image</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Convert PDF pages to high-quality images</p>
            </div>

            <div className="tool-card">
                {!file ? (
                    <label htmlFor="pdf-upload-img" className="drop-zone" onClick={() => fileInputRef.current.click()}>
                        <span>Click to Upload PDF</span>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => handleFile(e.target.files[0])}
                            accept="application/pdf"
                            style={{ display: 'none' }}
                            id="pdf-upload-img"
                        />
                    </label>
                ) : (
                    <div className="workspace" style={{ width: '100%' }}>
                        <div className="file-info-header">
                            <h3 className="file-name">{file.name}</h3>
                            <div className="action-buttons-group" style={{ marginTop: '1rem' }}>
                                <button className="btn-primary" onClick={convertPdfToImages} disabled={loading || images.length > 0}>
                                    {loading ? `Converting ${progress}%` : images.length > 0 ? 'Converted' : 'Convert to Images'}
                                </button>
                                <button className="btn-secondary" onClick={clearFile} disabled={loading}>Change File</button>
                            </div>
                        </div>

                        {loading && (
                            <div className="progress-bar-container" style={{ marginTop: '1.5rem' }}>
                                <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                        )}

                        {images.length > 0 && (
                            <div className="results-wrapper" style={{ marginTop: '2rem' }}>
                                <div className="results-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <button className="btn-secondary" onClick={toggleSelectAll}>
                                        {selectedPages.length === images.length ? 'Deselect All' : 'Select All'}
                                    </button>
                                    <button className="btn-primary" onClick={downloadZip} disabled={selectedPages.length === 0}>
                                        Download ZIP ({selectedPages.length})
                                    </button>
                                </div>

                                <div className="images-grid">
                                    {images.map((img) => (
                                        <div
                                            key={img.id}
                                            className={`img-card ${selectedPages.includes(img.pageNumber) ? 'selected' : ''}`}
                                            onClick={() => togglePageSelection(img.pageNumber)}
                                        >
                                            <div className="selection-badge">
                                                {selectedPages.includes(img.pageNumber) && <span>✓</span>}
                                            </div>
                                            <div className="img-preview">
                                                <img src={img.url} alt={`Page ${img.pageNumber}`} />
                                            </div>
                                            <div className="img-footer">
                                                <span>Page {img.pageNumber}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PdfToImg;
