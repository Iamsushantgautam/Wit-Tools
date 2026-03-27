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
        <div className="tool-container img-compressor-container">
            <div className="tool-header-card">
                <h2>Image Compressor</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Resize and optimize images without losing quality</p>
            </div>

            <div className="tool-card">
                {!originalImage ? (
                    <label htmlFor="img-upload" className="drop-zone">
                        <span>Click to Upload Image</span>
                        <input
                            type="file"
                            id="img-upload"
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

                        {!compressedImage ? (
                            <div className="settings-grid">
                                <div className="settings-group">
                                    <label className="control-label">Target Dimensions (px)</label>
                                    <div className="dimensions-input">
                                        <div className="input-with-label">
                                            <input
                                                type="number"
                                                className="input-field"
                                                value={targetWidth}
                                                onChange={handleWidthChange}
                                                placeholder="Width"
                                            />
                                            <span className="small-label">Width</span>
                                        </div>
                                        <div className="dimension-separator">×</div>
                                        <div className="input-with-label">
                                            <input
                                                type="number"
                                                className="input-field"
                                                value={targetHeight}
                                                onChange={handleHeightChange}
                                                placeholder="Height"
                                            />
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

                                <div className="settings-group">
                                    <label className="control-label">Target File Size (KB)</label>
                                    <input
                                        type="number"
                                        className="input-field"
                                        value={targetSizeKB}
                                        onChange={(e) => setTargetSizeKB(Number(e.target.value))}
                                        min="1"
                                    />
                                    <p className="hint">Desired maximum file size</p>
                                </div>

                                <div className="actions" style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                                    <button
                                        className="btn-primary"
                                        onClick={handleCompress}
                                        disabled={loading}
                                        style={{ width: '100%' }}
                                    >
                                        {loading ? 'Processing...' : 'Resize & Compress Now'}
                                    </button>
                                    
                                    <button
                                        className="btn-secondary"
                                        onClick={() => {
                                            setOriginalImage(null);
                                            setOriginalFile(null);
                                        }}
                                        style={{ width: '100%', marginTop: '0.8rem' }}
                                    >
                                        Change Image
                                    </button>
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
                                        <span className="stat-value green">{formatSize(compressedFile.size)}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label">Reduction</span>
                                        <span className="stat-value red">-{calculateReduction()}%</span>
                                    </div>
                                </div>

                                <div className="action-buttons-group">
                                    <a
                                        href={compressedImage}
                                        download={`processed_${originalFile.name}`}
                                        className="btn-primary"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Download Image
                                    </a>

                                    <button
                                        className="btn-secondary"
                                        onClick={() => {
                                            setOriginalImage(null);
                                            setCompressedImage(null);
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

export default ImgCompressor;
