import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import './ImgConverter.css';

const ImgConverter = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [originalFile, setOriginalFile] = useState(null);
    const [convertedImage, setConvertedImage] = useState(null);
    const [convertedBlob, setConvertedBlob] = useState(null);
    const [targetFormat, setTargetFormat] = useState('image/jpeg'); // Default to JPG
    const [loading, setLoading] = useState(false);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setOriginalFile(file);
            setOriginalImage(URL.createObjectURL(file));
            setConvertedImage(null);
        }
    };

    const processConversion = async () => {
        if (!originalFile) return;
        setLoading(true);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = originalImage;

        await new Promise(r => img.onload = r);

        canvas.width = img.width;
        canvas.height = img.height;

        // For JPG conversion, handle transparency by filling with white background
        if (targetFormat === 'image/jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        if (targetFormat === 'application/pdf') {
            const pdf = new jsPDF({
                orientation: img.width > img.height ? 'l' : 'p',
                unit: 'px',
                format: [img.width, img.height]
            });
            pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, img.width, img.height);
            const pdfBlob = pdf.output('blob');
            setConvertedBlob(pdfBlob);
            setConvertedImage(URL.createObjectURL(pdfBlob));
            setLoading(false);
        } else if (targetFormat === 'image/svg+xml') {
            const svgData = `<svg xmlns="http://www.w3.org/2000/svg" width="${img.width}" height="${img.height}">
                <image href="${canvas.toDataURL('image/png')}" width="100%" height="100%" />
            </svg>`;
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
            setConvertedBlob(svgBlob);
            setConvertedImage(URL.createObjectURL(svgBlob));
            setLoading(false);
        } else {
            canvas.toBlob((blob) => {
                setConvertedBlob(blob);
                setConvertedImage(URL.createObjectURL(blob));
                setLoading(false);
            }, targetFormat, 1.0);
        }
    };

    const getExtension = (mime) => {
        switch (mime) {
            case 'image/jpeg': return 'jpg';
            case 'image/png': return 'png';
            case 'image/webp': return 'webp';
            case 'image/gif': return 'gif';
            case 'image/bmp': return 'bmp';
            case 'image/svg+xml': return 'svg';
            case 'application/pdf': return 'pdf';
            default: return 'bin';
        }
    };

    return (
        <div className="tool-container">
            <div className="tool-header-card">
                <h2>Image Format Converter</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Switch between JPG, PNG, and WebP instantly</p>
            </div>

            <div className="tool-card">
                {!originalImage ? (
                    <label htmlFor="converter-input" className="drop-zone">
                        <span>Click to Upload Image</span>
                        <input id="converter-input" type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
                    </label>
                ) : (
                    <div className="workspace" style={{ width: '100%' }}>
                        <div className="file-info-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
                            <h3 className="file-name">{originalFile.name}</h3>
                            <span className="file-meta">Current Format: {originalFile.type.split('/')[1].toUpperCase()}</span>
                        </div>

                        {!convertedImage ? (
                            <div className="controls-box" style={{ maxWidth: '400px', margin: '0 auto' }}>
                                <div className="input-row" style={{ marginBottom: '2rem' }}>
                                    <label className="control-label">Target Format</label>
                                    <select 
                                        className="input-field" 
                                        value={targetFormat} 
                                        onChange={(e) => setTargetFormat(e.target.value)}
                                        style={{ height: '52px' }}
                                    >
                                        <option value="image/jpeg">JPG (Photography)</option>
                                        <option value="image/png">PNG (Transparency)</option>
                                        <option value="image/webp">WebP (Efficient)</option>
                                        <option value="image/gif">GIF (Animation/Graphics)</option>
                                        <option value="image/bmp">BMP (Bitmap)</option>
                                        <option value="image/svg+xml">SVG (Vector Container)</option>
                                        <option value="application/pdf">PDF (Document)</option>
                                    </select>
                                </div>

                                <button className="btn-primary" onClick={processConversion} disabled={loading} style={{ width: '100%' }}>
                                    {loading ? 'Converting...' : `Convert to ${getExtension(targetFormat).toUpperCase()}`}
                                </button>
                                <button className="btn-secondary" onClick={() => setOriginalImage(null)} style={{ width: '100%', marginTop: '0.5rem' }}>Change Image</button>
                            </div>
                        ) : (
                            <div className="result-view" style={{ textAlign: 'center' }}>
                                <div className="result-badge" style={{ display: 'inline-block', padding: '0.5rem 1.5rem', background: 'var(--secondary)', color: 'white', borderRadius: '50px', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                                    READY: .{getExtension(targetFormat).toUpperCase()}
                                </div>

                                <div style={{ background: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
                                    <img src={convertedImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: 'var(--radius-sm)' }} />
                                </div>

                                <div className="action-buttons-group" style={{ display: 'flex', gap: '1rem' }}>
                                    <a 
                                        href={convertedImage} 
                                        download={`converted_${originalFile.name.split('.')[0]}.${getExtension(targetFormat)}`} 
                                        className="btn-primary" 
                                        style={{ flex: 1, textDecoration: 'none' }}
                                    >
                                        Download File
                                    </a>
                                    <button className="btn-secondary" onClick={() => setConvertedImage(null)} style={{ flex: 1 }}>Transform Again</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImgConverter;
