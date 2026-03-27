import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import './ImgCompressor.css';

const ImgCompressor = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [originalFile, setOriginalFile] = useState(null);
    const [compressedImage, setCompressedImage] = useState(null);
    const [compressedFile, setCompressedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [targetKB, setTargetKB] = useState(500);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setOriginalFile(file);
            setOriginalImage(URL.createObjectURL(file));
            setCompressedImage(null);
        }
    };

    const processCompression = async () => {
        if (!originalFile) return;
        setLoading(true);

        const options = {
            maxSizeMB: targetKB / 1024,
            maxWidthOrHeight: 4096, // Keep original resolution as much as possible
            useWebWorker: true,
            initialQuality: 0.9,
        };

        try {
            const blob = await imageCompression(originalFile, options);
            setCompressedFile(blob);
            setCompressedImage(URL.createObjectURL(blob));
        } catch (error) {
            console.error("Compression failed:", error);
            alert("Compression failed. Try another format or image.");
        } finally {
            setLoading(false);
        }
    };

    const formatSize = (bytes) => {
        if (!bytes) return '0 KB';
        return (bytes / 1024).toFixed(2) + ' KB';
    };

    const getReduction = () => {
        if (!originalFile || !compressedFile) return 0;
        const diff = originalFile.size - compressedFile.size;
        return ((diff / originalFile.size) * 100).toFixed(1);
    };

    return (
        <div className="tool-container">
            <div className="tool-header-card">
                <h2>Image Compressor</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Reduce image file size without losing much quality</p>
            </div>

            <div className="tool-card">
                {!originalImage ? (
                    <label htmlFor="compressor-input" className="drop-zone">
                        <span>Click to Upload Image</span>
                        <input id="compressor-input" type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
                    </label>
                ) : (
                    <div className="workspace" style={{ width: '100%' }}>
                        <div className="file-info-header" style={{ marginBottom: '1.5rem' }}>
                            <h3 className="file-name">{originalFile.name}</h3>
                            <span className="file-meta">Original Size: {formatSize(originalFile.size)}</span>
                        </div>

                        {!compressedImage ? (
                            <div className="controls-box" style={{ maxWidth: '400px', margin: '0 auto' }}>
                                <div className="input-row" style={{ marginBottom: '2rem' }}>
                                    <label className="control-label">Target File Size (KB)</label>
                                    <input
                                        type="number"
                                        className="input-field"
                                        value={targetKB}
                                        onChange={(e) => setTargetKB(Number(e.target.value))}
                                        min="1"
                                    />
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Desired maximum file size</p>
                                </div>

                                <button className="btn-primary" onClick={processCompression} disabled={loading} style={{ width: '100%' }}>
                                    {loading ? 'Processing...' : 'Compress Image'}
                                </button>
                                <button className="btn-secondary" onClick={() => setOriginalImage(null)} style={{ width: '100%', marginTop: '0.5rem' }}>Change Image</button>
                            </div>
                        ) : (
                            <div className="result-view" style={{ textAlign: 'center' }}>
                                <div className="result-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                                    <div style={{ padding: '1rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
                                        <span className="control-label" style={{ display: 'block' }}>New Size</span>
                                        <span style={{ fontWeight: '700', fontSize: '1.2rem', color: 'var(--secondary)' }}>{formatSize(compressedFile.size)}</span>
                                    </div>
                                    <div style={{ padding: '1rem', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
                                        <span className="control-label" style={{ display: 'block' }}>Reduction</span>
                                        <span style={{ fontWeight: '700', fontSize: '1.2rem', color: '#ef4444' }}>-{getReduction()}%</span>
                                    </div>
                                </div>

                                <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
                                    <img src={compressedImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: 'var(--radius-sm)' }} />
                                </div>

                                <div className="action-buttons-group" style={{ display: 'flex', gap: '1rem' }}>
                                    <a href={compressedImage} download={`compressed_${originalFile.name}`} className="btn-primary" style={{ flex: 1, textDecoration: 'none' }}>Download</a>
                                    <button className="btn-secondary" onClick={() => setCompressedImage(null)} style={{ flex: 1 }}>Reset</button>
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
