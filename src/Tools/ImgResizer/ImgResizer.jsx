import React, { useState, useEffect } from 'react';
import './ImgResizer.css';

const ImgResizer = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [resizedImage, setResizedImage] = useState(null);
    const [originalFile, setOriginalFile] = useState(null);
    const [resizedBlob, setResizedBlob] = useState(null);
    const [loading, setLoading] = useState(false);

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
            setResizedImage(null);
            setResizedBlob(null);

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

    const handleResize = async () => {
        if (!originalFile || !targetWidth || !targetHeight) return;
        setLoading(true);

        try {
            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext('2d');

            const img = new Image();
            img.src = originalImage;
            await new Promise((resolve) => {
                img.onload = resolve;
            });

            // Use better scaling if possible
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

            const blob = await new Promise((resolve) => {
                // Quality 1.0 = No compression loss (for supported formats)
                canvas.toBlob(resolve, originalFile.type, 1.0);
            });

            setResizedBlob(blob);
            setResizedImage(URL.createObjectURL(blob));
        } catch (error) {
            console.error("Resize failed:", error);
            alert("Resizing failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const formatSize = (sizeInBytes) => {
        if (!sizeInBytes) return '0 KB';
        return (sizeInBytes / 1024).toFixed(2) + ' KB';
    };

    return (
        <div className="img-resizer-container">
            <div className="tool-header">
                <h2>High-Quality Image Resizer</h2>
                <p>Change image dimensions without losing quality.</p>
            </div>

            <div className="resizer-card">
                {!originalImage ? (
                    <div className="drop-zone" onClick={() => document.getElementById('resizer-upload').click()}>
                        <input
                            type="file"
                            id="resizer-upload"
                            accept="image/*"
                            onChange={handleImageUpload}
                            hidden
                        />
                        <div className="drop-content">
                            <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Click to High-Quality Resize</span>
                            <p>Lossless Resize for JPG, PNG, WEBP</p>
                        </div>
                    </div>
                ) : (
                    <div className="settings-section">
                        <div className="preview-mini-header">
                            <img src={originalImage} alt="Original" />
                            <div className="meta-info">
                                <strong>{originalFile.name}</strong>
                                <span>{originalWidth} x {originalHeight} px • {formatSize(originalFile.size)}</span>
                            </div>
                        </div>

                        <div className="resizer-controls">
                            <div className="control-group">
                                <label>Target Dimensions</label>
                                <div className="dim-inputs">
                                    <div className="input-box">
                                        <input type="number" value={targetWidth} onChange={handleWidthChange} />
                                        <span>Width (px)</span>
                                    </div>
                                    <div className="sep">×</div>
                                    <div className="input-box">
                                        <input type="number" value={targetHeight} onChange={handleHeightChange} />
                                        <span>Height (px)</span>
                                    </div>
                                </div>
                            </div>

                            <label className="toggle-label">
                                <input
                                    type="checkbox"
                                    checked={maintainAspectRatio}
                                    onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                                />
                                <span>Maintain Aspect Ratio</span>
                            </label>
                        </div>

                        <div className="action-row">
                            <button className="resize-btn" onClick={handleResize} disabled={loading}>
                                {loading ? 'Processing...' : 'Resize Now'}
                            </button>
                            <button className="reset-btn" onClick={() => {
                                setOriginalImage(null);
                                setResizedImage(null);
                            }}>Start Over</button>
                        </div>
                    </div>
                )}

                {resizedImage && (
                    <div className="result-section">
                        <div className="result-banner">
                            <div className="success-icon">✓</div>
                            <div className="banner-text">
                                <h3>Image Resized Successfully!</h3>
                                <p>New Dimensions: {targetWidth} × {targetHeight} px</p>
                            </div>
                        </div>

                        <div className="result-preview-container">
                            <img src={resizedImage} alt="Resized Result" className="final-preview" />
                        </div>

                        <div className="download-footer">
                            <div className="file-stats">
                                <span>New File Size:</span>
                                <strong>{formatSize(resizedBlob.size)}</strong>
                            </div>
                            <a href={resizedImage} download={`resized_${originalFile.name}`} className="download-btn">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download High Quality
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImgResizer;
