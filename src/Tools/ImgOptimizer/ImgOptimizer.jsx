import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import './ImgOptimizer.css';

const ImgOptimizer = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [originalFile, setOriginalFile] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);
    const [processedFile, setProcessedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    // Settings
    const [targetKB, setTargetKB] = useState(500);
    const [originalDim, setOriginalDim] = useState({ w: 0, h: 0 });
    const [targetDim, setTargetDim] = useState({ w: 0, h: 0 });
    const [maintainRatio, setMaintainRatio] = useState(true);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setOriginalFile(file);
        setOriginalImage(URL.createObjectURL(file));
        setProcessedImage(null);

        const img = new Image();
        img.onload = () => {
            setOriginalDim({ w: img.width, h: img.height });
            setTargetDim({ w: img.width, h: img.height });
        };
        img.src = URL.createObjectURL(file);
    };

    const changeWidth = (val) => {
        const w = parseInt(val) || 0;
        setTargetDim(prev => ({
            w,
            h: maintainRatio ? Math.round((w / originalDim.w) * originalDim.h) : prev.h
        }));
    };

    const changeHeight = (val) => {
        const h = parseInt(val) || 0;
        setTargetDim(prev => ({
            h,
            w: maintainRatio ? Math.round((h / originalDim.h) * originalDim.w) : prev.w
        }));
    };

    const processOptimize = async () => {
        if (!originalFile) return;
        setLoading(true);

        try {
            // Options for compression and resizing (browser-image-compression does both)
            const options = {
                maxSizeMB: targetKB / 1024,
                maxWidthOrHeight: Math.max(targetDim.w, targetDim.h),
                useWebWorker: true,
                initialQuality: 0.9,
            };

            const blob = await imageCompression(originalFile, options);
            setProcessedFile(blob);
            setProcessedImage(URL.createObjectURL(blob));
        } catch (error) {
            console.error("Optimization failed:", error);
            alert("Optimization failed. Try another image.");
        } finally {
            setLoading(false);
        }
    };

    const formatSize = (bytes) => {
        if (!bytes) return '0 KB';
        return (bytes / 1024).toFixed(2) + ' KB';
    };

    return (
        <div className="tool-container">
            <div className="tool-header-card">
                <h2>All-in-One Image Optimizer</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Resize dimensions AND compress file size in one go</p>
            </div>

            <div className="tool-card">
                {!originalImage ? (
                    <label htmlFor="optimize-input" className="drop-zone">
                        <span>Click to Upload Image</span>
                        <input id="optimize-input" type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
                    </label>
                ) : (
                    <div className="workspace" style={{ width: '100%' }}>
                        <div className="file-info-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 className="file-name">{originalFile.name}</h3>
                                <span className="file-meta">{originalDim.w} x {originalDim.h} px • {formatSize(originalFile.size)}</span>
                            </div>
                        </div>

                        {!processedImage ? (
                            <div className="optimizer-grid">
                                <div className="settings-section">
                                    <label className="control-label">Step 1: Resize Dimensions</label>
                                    <div className="dim-row" style={{ display: 'flex', gap: '1rem', alignItems: 'center', margin: '0.75rem 0' }}>
                                        <div style={{ flex: 1 }}>
                                            <input type="number" className="input-field" value={targetDim.w} onChange={(e) => changeWidth(e.target.value)} />
                                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Width</span>
                                        </div>
                                        <div style={{ fontWeight: 'bold' }}>×</div>
                                        <div style={{ flex: 1 }}>
                                            <input type="number" className="input-field" value={targetDim.h} onChange={(e) => changeHeight(e.target.value)} />
                                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Height</span>
                                        </div>
                                    </div>
                                    <label className="checkbox-label" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer', marginBottom: '1.5rem' }}>
                                        <input type="checkbox" checked={maintainRatio} onChange={(e) => setMaintainRatio(e.target.checked)} />
                                        <span style={{ fontSize: '0.85rem' }}>Maintain Aspect Ratio</span>
                                    </label>
                                </div>

                                <div className="settings-section">
                                    <label className="control-label">Step 2: Compress File Size</label>
                                    <div style={{ marginTop: '0.75rem' }}>
                                        <input
                                            type="number"
                                            className="input-field"
                                            value={targetKB}
                                            onChange={(e) => setTargetKB(Number(e.target.value))}
                                            min="1"
                                        />
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Target Max (KB)</span>
                                    </div>
                                </div>

                                <div className="actions-section" style={{ gridColumn: 'span 2', marginTop: '1.5rem' }}>
                                    <button className="btn-primary" onClick={processOptimize} disabled={loading} style={{ width: '100%' }}>
                                        {loading ? 'Optimizing...' : 'Optimize Now'}
                                    </button>
                                    <button className="btn-secondary" onClick={() => setOriginalImage(null)} style={{ width: '100%', marginTop: '0.5rem' }}>Change Image</button>
                                </div>
                            </div>
                        ) : (
                            <div className="result-view" style={{ textAlign: 'center' }}>
                                <div className="result-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                                    <div style={{ padding: '1rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
                                        <span className="control-label" style={{ display: 'block' }}>New Output</span>
                                        <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{targetDim.w} x {targetDim.h} px</span>
                                    </div>
                                    <div style={{ padding: '1rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
                                        <span className="control-label" style={{ display: 'block' }}>Final Weight</span>
                                        <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--secondary)' }}>{formatSize(processedFile.size)}</span>
                                    </div>
                                </div>

                                <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
                                    <img src={processedImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: 'var(--radius-sm)' }} />
                                </div>

                                <div className="action-buttons-group" style={{ display: 'flex', gap: '1rem' }}>
                                    <a href={processedImage} download={`optimized_${originalFile.name}`} className="btn-primary" style={{ flex: 1, textDecoration: 'none' }}>Download Optimized</a>
                                    <button className="btn-secondary" onClick={() => setProcessedImage(null)} style={{ flex: 1 }}>Reset Settings</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImgOptimizer;
