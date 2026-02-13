import React, { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import './ImgCompressor.css';

const ImgCompressor = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [compressedImage, setCompressedImage] = useState(null);
    const [originalFile, setOriginalFile] = useState(null);
    const [compressedFile, setCompressedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [targetSizeKB, setTargetSizeKB] = useState(500); // Default 500KB

    const [originalWidth, setOriginalWidth] = useState(0);
    const [originalHeight, setOriginalHeight] = useState(0);
    const [targetWidth, setTargetWidth] = useState(0);
    const [targetHeight, setTargetHeight] = useState(0);
    const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setOriginalFile(file);
            const url = URL.createObjectURL(file);
            setOriginalImage(url);
            setCompressedImage(null);
            setCompressedFile(null);

            // Get dimensions
            const img = new Image();
            img.onload = () => {
                setOriginalWidth(img.width);
                setOriginalHeight(img.height);
                setTargetWidth(img.width);
                setTargetHeight(img.height);
            };
            img.src = url;
        }
    };

    const handleWidthChange = (e) => {
        const value = parseInt(e.target.value) || 0;
        setTargetWidth(value);
        if (maintainAspectRatio && originalWidth > 0) {
            setTargetHeight(Math.round((value / originalWidth) * originalHeight));
        }
    };

    const handleHeightChange = (e) => {
        const value = parseInt(e.target.value) || 0;
        setTargetHeight(value);
        if (maintainAspectRatio && originalHeight > 0) {
            setTargetWidth(Math.round((value / originalHeight) * originalWidth));
        }
    };

    const handleCompress = async () => {
        if (!originalFile) return;

        setLoading(true);

        try {
            // First, resize the image to a canvas if dimensions changed
            let fileToCompress = originalFile;

            if (targetWidth !== originalWidth || targetHeight !== originalHeight) {
                const canvas = document.createElement('canvas');
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                const ctx = canvas.getContext('2d');

                const img = new Image();
                img.src = originalImage;
                await new Promise((resolve) => {
                    img.onload = resolve;
                });

                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

                const blob = await new Promise((resolve) => {
                    canvas.toBlob(resolve, originalFile.type);
                });
                fileToCompress = new File([blob], originalFile.name, { type: originalFile.type });
            }

            // Options for browser-image-compression
            const maxSizeMB = targetSizeKB / 1024;

            const options = {
                maxSizeMB: maxSizeMB,
                maxWidthOrHeight: Math.max(targetWidth, targetHeight),
                useWebWorker: true,
                initialQuality: 0.9,
            };

            const compressedBlob = await imageCompression(fileToCompress, options);

            setCompressedFile(compressedBlob);
            setCompressedImage(URL.createObjectURL(compressedBlob));

        } catch (error) {
            console.error("Operation failed:", error);
            alert("Processing failed. Please try another image.");
        } finally {
            setLoading(false);
        }
    };

    const formatSize = (sizeInBytes) => {
        if (!sizeInBytes) return '0 KB';
        return (sizeInBytes / 1024).toFixed(2) + ' KB';
    };

    const calculateReduction = () => {
        if (!originalFile || !compressedFile) return 0;
        const diff = originalFile.size - compressedFile.size;
        const percentage = (diff / originalFile.size) * 100;
        return percentage.toFixed(1);
    };

    return (
        <div className="img-compressor-container">
            <div className="tool-header">
                <h2>Image Resizer & Compressor</h2>
                <p>Resize dimensions and reduce file size easily.</p>
            </div>

            <div className="compressor-card">
                {!originalImage ? (
                    <div className="drop-zone" onClick={() => document.getElementById('img-upload').click()}>
                        <input
                            type="file"
                            id="img-upload"
                            accept="image/*"
                            onChange={handleImageUpload}
                            hidden
                        />
                        <div className="drop-content">
                            <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span>Click to Upload Image</span>
                            <p>Supports JPG, PNG, WEBP</p>
                        </div>
                    </div>
                ) : (
                    <div className="settings-section">
                        <div className="item-preview-header">
                            <img src={originalImage} alt="Original" className="mini-preview" />
                            <div className="file-meta">
                                <strong>{originalFile.name}</strong>
                                <span>{originalWidth} x {originalHeight} px • {formatSize(originalFile.size)}</span>
                            </div>
                        </div>

                        <div className="settings-grid">
                            <div className="settings-group">
                                <label>Target Dimensions (px)</label>
                                <div className="dimensions-input">
                                    <div className="input-with-label">
                                        <input
                                            type="number"
                                            value={targetWidth}
                                            onChange={handleWidthChange}
                                            placeholder="Width"
                                        />
                                        <span>Width</span>
                                    </div>
                                    <div className="dimension-separator">×</div>
                                    <div className="input-with-label">
                                        <input
                                            type="number"
                                            value={targetHeight}
                                            onChange={handleHeightChange}
                                            placeholder="Height"
                                        />
                                        <span>Height</span>
                                    </div>
                                </div>
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={maintainAspectRatio}
                                        onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                                    />
                                    Maintain Aspect Ratio
                                </label>
                            </div>

                            <div className="settings-group">
                                <label>Target File Size</label>
                                <div className="target-size-input">
                                    <input
                                        type="number"
                                        value={targetSizeKB}
                                        onChange={(e) => setTargetSizeKB(Number(e.target.value))}
                                        min="1"
                                    />
                                    <span className="unit">KB</span>
                                </div>
                                <p className="hint">Maximum desired file size</p>
                            </div>
                        </div>

                        <div className="actions">
                            <button
                                className="compress-btn"
                                onClick={handleCompress}
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Resize & Compress'}
                            </button>

                            <button
                                className="reset-btn"
                                onClick={() => {
                                    setOriginalImage(null);
                                    setOriginalFile(null);
                                    setCompressedImage(null);
                                    setCompressedFile(null);
                                }}
                            >
                                Start Over
                            </button>
                        </div>
                    </div>
                )}

                {compressedImage && (
                    <div className="comparison-section">
                        <div className="comparison-card result-card">
                            <div className="result-header">
                                <div className="result-title">
                                    <h3>Processed Image</h3>
                                    <span className="reduction-badge">-{calculateReduction()}%</span>
                                </div>
                                <div className="result-stats">
                                    <div className="stat-item">
                                        <span>Dimensions:</span>
                                        <strong>{targetWidth} × {targetHeight} px</strong>
                                    </div>
                                    <div className="stat-item">
                                        <span>New Size:</span>
                                        <strong className="success-text">{formatSize(compressedFile.size)}</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="result-preview">
                                <img src={compressedImage} alt="Compressed" className="preview-img" />
                            </div>

                            <div className="download-action">
                                <a
                                    href={compressedImage}
                                    download={`processed_${originalFile.name}`}
                                    className="download-btn"
                                >
                                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download Image
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImgCompressor;

