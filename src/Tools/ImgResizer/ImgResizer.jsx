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

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

            const blob = await new Promise((resolve) => {
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
        <div className="tool-container img-resizer-container">
            <div className="tool-header-card">
                <h2>High-Quality Image Resizer</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Change image dimensions without losing quality</p>
            </div>

            <div className="tool-card">
                {!originalImage ? (
                    <label htmlFor="resizer-upload" className="drop-zone">
                        <span>Click to Resize Image</span>
                        <input
                            type="file"
                            id="resizer-upload"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                    </label>
                ) : (
                    <div className="workspace">
                        <div className="file-info-header">
                            <h3 className="file-name">{originalFile.name}</h3>
                            <span className="file-meta">{originalWidth} x {originalHeight} px • {formatSize(originalFile.size)}</span>
                        </div>

                        {!resizedImage ? (
                            <div className="resizer-controls">
                                <div className="control-group">
                                    <label className="control-label">Target Dimensions (px)</label>
                                    <div className="dim-inputs">
                                        <div className="input-box">
                                            <input type="number" className="input-field" value={targetWidth} onChange={handleWidthChange} />
                                            <span className="small-label">Width</span>
                                        </div>
                                        <div className="sep">×</div>
                                        <div className="input-box">
                                            <input type="number" className="input-field" value={targetHeight} onChange={handleHeightChange} />
                                            <span className="small-label">Height</span>
                                        </div>
                                    </div>
                                    <label className="checkbox-label" style={{ marginTop: '0.5rem' }}>
                                        <input
                                            type="checkbox"
                                            checked={maintainAspectRatio}
                                            onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                                        />
                                        Maintain Aspect Ratio
                                    </label>
                                </div>

                                <div className="action-row" style={{ marginTop: '1.5rem' }}>
                                    <button className="btn-primary" onClick={handleResize} disabled={loading} style={{ width: '100%' }}>
                                        {loading ? 'Processing...' : 'Resize Now'}
                                    </button>
                                    <button className="btn-secondary" onClick={() => {
                                        setOriginalImage(null);
                                        setOriginalFile(null);
                                    }} style={{ width: '100%', marginTop: '0.8rem' }}>Change Image</button>
                                </div>
                            </div>
                        ) : (
                            <div className="result-section">
                                <div className="result-stats">
                                    <div className="stat-item">
                                        <span className="stat-label">New Dimensions</span>
                                        <span className="stat-value">{targetWidth} × {targetHeight} px</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label">New Size</span>
                                        <span className="stat-value green">{formatSize(resizedBlob.size)}</span>
                                    </div>
                                </div>

                                <div className="result-preview-container">
                                    <img src={resizedImage} alt="Resized Result" className="final-preview" />
                                </div>

                                <div className="action-buttons-group">
                                    <a href={resizedImage} download={`resized_${originalFile.name}`} className="btn-primary" style={{ textDecoration: 'none' }}>
                                        Download Image
                                    </a>
                                    <button className="btn-secondary" onClick={() => {
                                        setOriginalImage(null);
                                        setResizedImage(null);
                                    }}>Resize Another</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImgResizer;
