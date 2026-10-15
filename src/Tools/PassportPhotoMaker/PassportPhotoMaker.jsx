import React, { useState, useRef, useCallback } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';
import Upload from '../../components/Common/Upload/Upload';
import './PassportPhotoMaker.css';

const STEPS = { UPLOAD: 1, CROP: 2, BACKGROUND: 3 };

const ASPECT_PRESETS = [
    { key: 'free', label: 'Free', icon: '⤡', aspect: null },
    { key: '1:1', label: '1 : 1', icon: '□', aspect: 1 },
    { key: '4:5', label: '4 : 5', icon: '▭', aspect: 4 / 5 },
    { key: '16:9', label: '16 : 9', icon: '▬', aspect: 16 / 9 },
    { key: '9:16', label: '9 : 16', icon: '▮', aspect: 9 / 16 },
    { key: 'passport', label: 'Passport', icon: '🪪', aspect: 3.5 / 4.5 },
];

const BG_PRESETS = [
    { color: '#FFFFFF', label: 'White' },
    { color: '#E3F2FD', label: 'Light Blue' },
    { color: '#F0F4F8', label: 'Off White' },
    { color: '#607D8B', label: 'Steel' },
    { color: '#1565C0', label: 'Royal Blue' },
    { color: '#1E293B', label: 'Dark Slate' },
    { color: '#F5F5F5', label: 'Silver' },
    { color: '#E8F5E9', label: 'Mint' },
];

/* ── Step progress bar (top strip) ── */
const StepBar = ({ current }) => (
    <div className="ppm-step-bar">
        {[
            { n: 1, label: 'Upload' },
            { n: 2, label: 'Crop' },
            { n: 3, label: 'Background' },
        ].map(({ n, label }) => (
            <React.Fragment key={n}>
                <div className={`ppm-step-item ${current >= n ? 'active' : ''} ${current > n ? 'done' : ''}`}>
                    <div className="ppm-step-circle">
                        {current > n ? (
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                <path d="M2 7l3.5 3.5L12 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : n}
                    </div>
                    <span className="ppm-step-label">{label}</span>
                </div>
                {n < 3 && <div className={`ppm-step-line ${current > n ? 'done' : ''}`} />}
            </React.Fragment>
        ))}
    </div>
);

const PassportPhotoMaker = () => {
    const [imgSrc, setImgSrc] = useState(null);
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState(null);
    const [step, setStep] = useState(STEPS.UPLOAD);
    const [loading, setLoading] = useState(false);
    const [resultImage, setResultImage] = useState(null);
    const [bgColor, setBgColor] = useState('#FFFFFF');
    const [aspectKey, setAspectKey] = useState('passport');
    const imgRef = useRef(null);

    const activePreset = ASPECT_PRESETS.find(p => p.key === aspectKey);
    const currentAspect = activePreset?.aspect ?? undefined;

    const applyCrop = useCallback((width, height, aspect) => {
        if (aspect == null) {
            setCrop({ unit: '%', x: 5, y: 5, width: 90, height: 90 });
        } else {
            setCrop(centerCrop(makeAspectCrop({ unit: '%', width: 80 }, aspect, width, height), width, height));
        }
    }, []);

    const onSelectFile = (selectedFile) => {
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.addEventListener('load', () => setImgSrc(reader.result.toString() || ''));
        reader.readAsDataURL(selectedFile);
        setStep(STEPS.CROP);
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        applyCrop(width, height, currentAspect);
    };

    const handleAspectChange = (preset) => {
        setAspectKey(preset.key);
        if (imgRef.current) {
            const { width, height } = imgRef.current;
            applyCrop(width, height, preset.aspect);
        }
        setCompletedCrop(null);
    };

    const getOutputDimensions = () => {
        const aspect = currentAspect;
        if (aspect == null) {
            if (!completedCrop?.width || !completedCrop?.height) return { w: 1200, h: 1200 };
            const ratio = completedCrop.width / completedCrop.height;
            return { w: 1200, h: Math.round(1200 / ratio) };
        }
        return { w: 1200, h: Math.round(1200 / aspect) };
    };

    const getCroppedImg = (image, crop) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const { w, h } = getOutputDimensions();
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, w, h);
        return new Promise((resolve, reject) =>
            canvas.toBlob((blob) => { if (!blob) return reject(new Error('Canvas is empty')); resolve(blob); }, 'image/png'),
        );
    };

    const handleCropConfirm = async () => {
        if (!completedCrop || !imgRef.current) return;
        setLoading(true);
        try {
            const blob = await getCroppedImg(imgRef.current, completedCrop);
            await removeBackground(blob);
        } catch (e) { console.error(e); setLoading(false); }
    };

    const removeBackground = async (imageBlob) => {
        const apiKey = import.meta.env.VITE_REMOVE_BG_API_KEY;
        if (!apiKey) {
            setResultImage(URL.createObjectURL(imageBlob));
            setStep(STEPS.BACKGROUND);
            setLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append('image_file', imageBlob);
        formData.append('size', 'auto');
        try {
            const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
                headers: { 'X-Api-Key': apiKey }, responseType: 'blob',
            });
            setResultImage(URL.createObjectURL(response.data));
        } catch { setResultImage(URL.createObjectURL(imageBlob)); }
        finally { setStep(STEPS.BACKGROUND); setLoading(false); }
    };

    const downloadFinalImage = () => {
        if (!resultImage) return;
        const { w, h } = getOutputDimensions();
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = resultImage;
        img.onload = () => {
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, w, h);
            ctx.drawImage(img, 0, 0, w, h);
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'passport_photo.png';
            link.click();
        };
    };

    const reset = () => {
        setImgSrc(null); setCrop(undefined); setCompletedCrop(null);
        setResultImage(null); setBgColor('#FFFFFF'); setAspectKey('passport');
        setStep(STEPS.UPLOAD);
    };

    const previewAspect = currentAspect ?? (
        completedCrop?.width && completedCrop?.height
            ? completedCrop.width / completedCrop.height : 1
    );
    const previewH = Math.min(Math.round(180 / previewAspect), 320);

    return (
        <div className="ppm-root">

            {/* ── Step bar ── */}
            <div className="ppm-topbar">
                <div className="ppm-topbar-inner">
                    <div className="ppm-topbar-brand">
                        <div className="ppm-brand-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="3" width="20" height="14" rx="2" />
                                <path d="M8 21h8M12 17v4" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                        </div>
                        <span className="ppm-topbar-title">Passport Photo Maker</span>
                    </div>
                    <StepBar current={step} />
                </div>
            </div>

            {/* ── Main centered content ── */}
            <main className="ppm-main">

                {/* Step 1 — Upload */}
                {step === STEPS.UPLOAD && (
                    <div className="ppm-center-section">
                        <div className="ppm-page-header">
                            <h2>Upload Your Photo</h2>
                            <p>Upload a clear, front-facing photo to get started.</p>
                        </div>

                        <Upload
                            id="pm-upload"
                            accept="image/*"
                            onUpload={onSelectFile}
                            title="Select Photo"
                            subtitle="JPG, PNG, WEBP supported"
                            limitText="Best results with a plain background"
                        />
                    </div>
                )}

                {/* Step 2 — Crop */}
                {step === STEPS.CROP && (
                    <div className="ppm-full-section">
                        <div className="ppm-page-header">
                            <h2>Crop Your Photo</h2>
                            <p>Choose an aspect ratio or crop freely.</p>
                        </div>

                        {/* Aspect ratio picker */}
                        <div className="ppm-aspect-bar">
                            {ASPECT_PRESETS.map((preset) => (
                                <button
                                    key={preset.key}
                                    className={`ppm-aspect-btn ${aspectKey === preset.key ? 'active' : ''}`}
                                    onClick={() => handleAspectChange(preset)}
                                    title={preset.label}
                                >
                                    <span className="ppm-aspect-icon">{preset.icon}</span>
                                    <span className="ppm-aspect-label">{preset.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Crop canvas */}
                        <div className="ppm-crop-canvas-wrap">
                            <ReactCrop
                                crop={crop}
                                onChange={(_, pct) => setCrop(pct)}
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={currentAspect ?? undefined}
                                style={{ maxHeight: '100%', maxWidth: '100%' }}
                            >
                                <img
                                    ref={imgRef}
                                    alt="Crop source"
                                    src={imgSrc}
                                    onLoad={onImageLoad}
                                    className="ppm-crop-img"
                                    style={{ maxHeight: 'calc(100vh - 280px)', maxWidth: '100%', objectFit: 'contain' }}
                                />
                            </ReactCrop>
                        </div>

                        <div className="ppm-action-bar">
                            <button className="ppm-btn-ghost" onClick={reset}>← Back</button>
                            <button
                                className="ppm-btn-primary"
                                onClick={handleCropConfirm}
                                disabled={loading || !completedCrop}
                            >
                                {loading
                                    ? <><span className="ppm-spinner" />Removing Background…</>
                                    : <>Continue → Set Background</>
                                }
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3 — Background */}
                {step === STEPS.BACKGROUND && resultImage && (
                    <div className="ppm-center-section ppm-bg-section">
                        <div className="ppm-page-header">
                            <h2>Choose Background</h2>
                            <p>Pick a background colour for your photo.</p>
                        </div>

                        <div className="ppm-bg-layout">
                            {/* Preview */}
                            <div className="ppm-preview-col">
                                <div className="ppm-preview-label">Preview</div>
                                <div
                                    className="ppm-passport-frame"
                                    style={{ backgroundColor: bgColor, width: '180px', height: `${previewH}px` }}
                                >
                                    <img src={resultImage} alt="Passport preview" className="ppm-passport-img" />
                                </div>
                                <div className="ppm-preview-dim">{activePreset?.label} · 1200px</div>
                            </div>

                            {/* Controls */}
                            <div className="ppm-controls-col">
                                <div className="ppm-ctrl-group">
                                    <div className="ppm-ctrl-label">Official Backgrounds</div>
                                    <div className="ppm-swatch-grid">
                                        {BG_PRESETS.map(({ color, label }) => (
                                            <button
                                                key={color}
                                                className={`ppm-swatch ${bgColor === color ? 'selected' : ''}`}
                                                style={{ backgroundColor: color }}
                                                onClick={() => setBgColor(color)}
                                                title={label}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="ppm-ctrl-group">
                                    <div className="ppm-ctrl-label">Custom Color</div>
                                    <div className="ppm-custom-color-row">
                                        <input
                                            type="color"
                                            className="ppm-color-input"
                                            value={bgColor}
                                            onChange={(e) => setBgColor(e.target.value)}
                                        />
                                        <span className="ppm-color-hex">{bgColor.toUpperCase()}</span>
                                    </div>
                                </div>

                                <div className="ppm-download-card">
                                    <div>
                                        <div className="ppm-download-title">Export · PNG</div>
                                        <div className="ppm-download-detail">1200px wide · {activePreset?.label}</div>
                                    </div>
                                    <button className="ppm-btn-primary" onClick={downloadFinalImage}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7 10 12 15 17 10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="ppm-action-bar ppm-action-bar--centered">
                            <button className="ppm-btn-ghost" onClick={reset}>← Start Over</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default PassportPhotoMaker;
