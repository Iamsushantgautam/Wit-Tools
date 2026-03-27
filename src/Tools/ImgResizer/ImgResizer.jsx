import React, { useState } from 'react';
import './ImgResizer.css';

const ImgResizer = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [resizedImage, setResizedImage] = useState(null);
    const [originalFile, setOriginalFile] = useState(null);
    const [resizedBlob, setResizedBlob] = useState(null);
    const [loading, setLoading] = useState(false);

    const [originalDim, setOriginalDim] = useState({ w: 0, h: 0 });
    const [targetDim, setTargetDim] = useState({ w: 0, h: 0 });
    const [maintainRatio, setMaintainRatio] = useState(true);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setOriginalFile(file);
        const url = URL.createObjectURL(file);
        setOriginalImage(url);
        setResizedImage(null);

        const img = new Image();
        img.onload = () => {
            setOriginalDim({ w: img.width, h: img.height });
            setTargetDim({ w: img.width, h: img.height });
        };
        img.src = url;
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

    const processResize = async () => {
        if (!originalFile || !targetDim.w || !targetDim.h) return;
        setLoading(true);

        const canvas = document.createElement('canvas');
        canvas.width = targetDim.w;
        canvas.height = targetDim.h;
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.src = originalImage;
        await new Promise(r => img.onload = r);

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, targetDim.w, targetDim.h);

        canvas.toBlob((blob) => {
            setResizedBlob(blob);
            setResizedImage(URL.createObjectURL(blob));
            setLoading(false);
        }, originalFile.type, 1.0);
    };

    return (
        <div className="tool-container">
            <div className="tool-header-card">
                <h2>Image Resizer</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Change dimensions with high precision</p>
            </div>

            <div className="tool-card">
                {!originalImage ? (
                    <label htmlFor="resizer-input" className="drop-zone">
                        <span>Click to Upload Image</span>
                        <input id="resizer-input" type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
                    </label>
                ) : (
                    <div className="workspace" style={{ width: '100%' }}>
                        <div className="file-info-header" style={{ marginBottom: '1.5rem' }}>
                            <h3 className="file-name">{originalFile.name}</h3>
                            <span className="file-meta">{originalDim.w} x {originalDim.h} px</span>
                        </div>

                        {!resizedImage ? (
                            <div className="controls-box" style={{ maxWidth: '400px', margin: '0 auto' }}>
                                <div className="input-row" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <label className="control-label">Width (px)</label>
                                        <input type="number" className="input-field" value={targetDim.w} onChange={(e) => changeWidth(e.target.value)} />
                                    </div>
                                    <div style={{ paddingTop: '1rem', fontWeight: 'bold' }}>×</div>
                                    <div style={{ flex: 1 }}>
                                        <label className="control-label">Height (px)</label>
                                        <input type="number" className="input-field" value={targetDim.h} onChange={(e) => changeHeight(e.target.value)} />
                                    </div>
                                </div>

                                <label className="checkbox-label" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer', marginBottom: '2rem' }}>
                                    <input type="checkbox" checked={maintainRatio} onChange={(e) => setMaintainRatio(e.target.checked)} />
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Maintain Aspect Ratio</span>
                                </label>

                                <button className="btn-primary" onClick={processResize} disabled={loading} style={{ width: '100%' }}>
                                    {loading ? 'Processing...' : 'Resize Image'}
                                </button>
                                <button className="btn-secondary" onClick={() => setOriginalImage(null)} style={{ width: '100%', marginTop: '0.5rem' }}>Change Image</button>
                            </div>
                        ) : (
                            <div className="result-view" style={{ textAlign: 'center' }}>
                                <div className="result-stats" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
                                    <div>
                                        <span className="control-label" style={{ display: 'block' }}>New Dimensions</span>
                                        <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>{targetDim.w} × {targetDim.h}</span>
                                    </div>
                                </div>
                                <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
                                    <img src={resizedImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: 'var(--radius-sm)' }} />
                                </div>
                                <div className="action-buttons-group" style={{ display: 'flex', gap: '1rem' }}>
                                    <a href={resizedImage} download={`resized_${originalFile.name}`} className="btn-primary" style={{ flex: 1, textDecoration: 'none' }}>Download</a>
                                    <button className="btn-secondary" onClick={() => setResizedImage(null)} style={{ flex: 1 }}>Reset</button>
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
