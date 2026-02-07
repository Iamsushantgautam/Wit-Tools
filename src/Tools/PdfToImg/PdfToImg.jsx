import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
// Use worker from public folder to avoid bundler issues
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

import './PdfToImg.css';

const PdfToImg = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setPdfFile(file);
            setImages([]); // Clear previous
        } else {
            alert("Please select a valid PDF file.");
        }
    };

    const convertToImages = async () => {
        if (!pdfFile) return;

        setLoading(true);
        setImages([]);

        try {
            const arrayBuffer = await pdfFile.arrayBuffer();
            const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

            const totalPages = pdf.numPages;
            const newImages = [];

            for (let i = 1; i <= totalPages; i++) {
                const page = await pdf.getPage(i);

                // Adjust scale for better quality (e.g. 1.5 or 2)
                const viewport = page.getViewport({ scale: 2.0 });

                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({
                    canvasContext: context,
                    viewport: viewport
                }).promise;

                // Convert canvas to image URL
                const imgUrl = canvas.toDataURL('image/png');
                newImages.push({
                    page: i,
                    url: imgUrl
                });
            }

            setImages(newImages);

        } catch (error) {
            console.error("Error converting PDF:", error);
            alert("Failed to convert PDF. Ensure the file is not corrupted.");
        } finally {
            setLoading(false);
        }
    };

    const downloadImage = (url, pageNum) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = `page-${pageNum}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="pdf-to-img-container">
            <div className="tool-header">
                <h2>PDF to Image Converter</h2>
            </div>

            <div className="upload-section">
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="custom-file-upload"
                />

                {pdfFile && (
                    <div style={{ marginTop: '1rem' }}>
                        <p>Selected File: {pdfFile.name}</p>
                        <button
                            className="convert-btn"
                            onClick={convertToImages}
                            disabled={loading}
                        >
                            {loading ? 'Converting...' : 'Convert Pages to Images'}
                        </button>
                    </div>
                )}

                <div className="preview-grid" style={{ display: 'flex', flexDirection: 'column' }}>
                    {images.map((img) => (
                        <div key={img.page} className="page-preview">
                            <img src={img.url} alt={`Page ${img.page}`} />
                            <br />
                            <button
                                className="download-btn"
                                onClick={() => downloadImage(img.url, img.page)}
                            >
                                Download Page {img.page}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PdfToImg;
