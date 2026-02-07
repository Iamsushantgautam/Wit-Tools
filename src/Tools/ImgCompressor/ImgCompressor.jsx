import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import './ImgCompressor.css';

const ImgCompressor = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [compressedImage, setCompressedImage] = useState(null);
    const [originalFile, setOriginalFile] = useState(null);
    const [compressedFile, setCompressedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [targetSizeKB, setTargetSizeKB] = useState(500); // Default 500KB

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setOriginalFile(file);
            setOriginalImage(URL.createObjectURL(file));
            setCompressedImage(null); // Reset previous result
            setCompressedFile(null);
        }
    };

    const handleCompress = async () => {
        if (!originalFile) return;

        setLoading(true);

        // Options for browser-image-compression
        // maxSizeMB: needs MB, user inputs KB. 500KB = 0.5MB
        const maxSizeMB = targetSizeKB / 1024;

        console.log(`Compressing to target: ${maxSizeMB.toFixed(2)} MB`);

        const options = {
            maxSizeMB: maxSizeMB,
            maxWidthOrHeight: 1920, // Limit dimensions for better compression if needed
            useWebWorker: true,
            initialQuality: 1.0, // Start with high quality, let lib reduce it
            alwaysKeepResolution: true // Try not to resize unless necessary? Actually false is better for strict size targets usually. Let's keep resolution if possible but the lib might resize to hit target.
        };

        try {
            const compressedBlob = await imageCompression(originalFile, options);

            // If the library returns a file larger than target, we might need to be more aggressive? 
            // browser-image-compression is usually good.

            setCompressedFile(compressedBlob);
            setCompressedImage(URL.createObjectURL(compressedBlob));

        } catch (error) {
            console.error("Compression failed:", error);
            alert("Compression failed. Please try another image.");
        } finally {
            setLoading(false);
        }
    };

    const formatSize = (sizeInBytes) => {
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
                <h2>Image Compressor</h2>
                <p>Reduce image file size while maintaining quality.</p>
            </div>

            <div className="compressor-card">

                {/* Upload Area */}
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
                            <span>Click to Upload Image</span>
                            <p>Supports JPG, PNG, WEBP</p>
                        </div>
                    </div>
                ) : (
                    <div className="settings-section">
                        <div className="item-preview">
                            <img src={originalImage} alt="Original" style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '8px' }} />
                            <p>{originalFile.name}</p>
                        </div>

                        <div className="settings-row">
                            <label>Target Size (Max):</label>
                            <div className="target-size-input">
                                <input
                                    type="number"
                                    value={targetSizeKB}
                                    onChange={(e) => setTargetSizeKB(Number(e.target.value))}
                                    min="10"
                                />
                                <span>KB</span>
                            </div>
                        </div>

                        <button
                            className="compress-btn"
                            onClick={handleCompress}
                            disabled={loading}
                        >
                            {loading ? 'Compressing...' : 'Compress Image'}
                        </button>

                        <button
                            className="reset-btn"
                            onClick={() => {
                                setOriginalImage(null);
                                setOriginalFile(null);
                                setCompressedImage(null);
                                setCompressedFile(null);
                            }}
                            style={{ border: 'none', background: 'none', textDecoration: 'underline', cursor: 'pointer', color: '#666' }}
                        >
                            Start Over
                        </button>
                    </div>
                )}

                {/* Results Area */}
                {compressedImage && (
                    <div className="comparison-section">

                        {/* Original Card */}
                        <div className="comparison-card">
                            <h3>Original</h3>
                            <div className="size-badge">{formatSize(originalFile.size)}</div>
                            <img src={originalImage} alt="Original" className="preview-img" />
                        </div>

                        {/* Compressed Card */}
                        <div className="comparison-card" style={{ borderColor: '#10b981', background: '#f0fdf4' }}>
                            <h3 style={{ color: '#059669' }}>Compressed</h3>
                            <div className="size-badge" style={{ background: '#d1fae5', color: '#065f46' }}>
                                {formatSize(compressedFile.size)}
                            </div>
                            <img src={compressedImage} alt="Compressed" className="preview-img" />

                            <div className="download-action">
                                <span className="reduction-badge">Saved {calculateReduction()}%</span>
                                <a
                                    href={compressedImage}
                                    download={`compressed_${originalFile.name}`}
                                    className="download-btn"
                                >
                                    Download
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
