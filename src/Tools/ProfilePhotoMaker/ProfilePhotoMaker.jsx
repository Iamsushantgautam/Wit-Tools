import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';
import './ProfilePhotoMaker.css';

const ProfilePhotoMaker = () => {
    const [file, setFile] = useState(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState(null);
    const [croppedImageBlob, setCroppedImageBlob] = useState(null);
    const [step, setStep] = useState(1); // 1: Upload, 2: Crop, 3: Edit BG
    const [loading, setLoading] = useState(false);
    const [resultImage, setResultImage] = useState(null);
    const [bgColor, setBgColor] = useState('#FFFFFF'); // Default white
    const imgRef = useRef(null);

    // Standard Passport Backgrounds
    const colors = [
        '#FFFFFF', // Pure White (Standard)
        '#E3F2FD', // Light Blue (Standard)
        '#F1F5F9', // Off White
        '#607D8B', // Grayish
        '#3B82F6', // Royal Blue
        '#1E293B', // Dark Slate
    ];

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            const reader = new FileReader();
            reader.addEventListener('load', () => setImgSrc(reader.result.toString() || ''));
            reader.readAsDataURL(e.target.files[0]);
            setStep(2);
        }
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const crop = centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 70,
                },
                3.5 / 4.5, // Passport Aspect Ratio
                width,
                height,
            ),
            width,
            height,
        );
        setCrop(crop);
    };

    const getCroppedImg = async (image, crop, fileName) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        
        // Output dimensions for a high quality passport photo
        canvas.width = 600;
        canvas.height = 771; // Maintains 3.5:4.5 ratio roughly
        
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            canvas.width,
            canvas.height,
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Canvas is empty'));
                    return;
                }
                blob.name = fileName;
                resolve(blob);
            }, 'image/png');
        });
    };

    const handleCropConfirm = async () => {
        if (completedCrop && imgRef.current) {
            setLoading(true);
            try {
                const blob = await getCroppedImg(imgRef.current, completedCrop, 'cropped.png');
                setCroppedImageBlob(blob);
                await removeBackground(blob);
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        }
    };

    const removeBackground = async (imageBlob) => {
        const apiKey = import.meta.env.VITE_REMOVE_BG_API_KEY;

        if (!apiKey) {
            const url = URL.createObjectURL(imageBlob);
            setResultImage(url);
            setStep(3);
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('image_file', imageBlob);
        formData.append('size', 'auto');

        try {
            const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
                headers: {
                    'X-Api-Key': apiKey,
                },
                responseType: 'blob',
            });

            const url = URL.createObjectURL(response.data);
            setResultImage(url);
            setStep(3);
        } catch (error) {
            console.error("BG Removal failed, using cropped only:", error);
            const url = URL.createObjectURL(imageBlob);
            setResultImage(url);
            setStep(3);
        } finally {
            setLoading(false);
        }
    };

    const downloadFinalImage = () => {
        if (!resultImage) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = resultImage;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = url;
            link.download = 'passport_photo.png';
            link.click();
        };
    };

    return (
        <div className="tool-container profile-maker-container">
            <div className="tool-header-card">
                <h2>Passport Photo Maker</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Create official size photos with uniform backgrounds</p>
            </div>

            <div className="tool-card">
                {step === 1 && (
                    <label htmlFor="pm-upload" className="drop-zone">
                        <span>Click to Upload Photo</span>
                        <input type="file" id="pm-upload" accept="image/*" onChange={onSelectFile} style={{ display: 'none' }} />
                    </label>
                )}

                {step === 2 && (
                    <div className="crop-section" style={{ width: '100%', textAlign: 'center' }}>
                        <div className="section-header-compact">
                            <span className="badge">1</span>
                            <h3>Crop to Passport Size</h3>
                        </div>
                        <div className="crop-canvas-wrapper">
                            <ReactCrop
                                crop={crop}
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={3.5 / 4.5}
                            >
                                <img ref={imgRef} alt="Crop" src={imgSrc} onLoad={onImageLoad} className="crop-img-source" />
                            </ReactCrop>
                        </div>
                        <div className="action-buttons-group">
                            <button className="btn-secondary" onClick={() => { setStep(1); setImgSrc(null); }}>Cancel</button>
                            <button className="btn-primary" onClick={handleCropConfirm} disabled={loading}>
                                {loading ? 'Removing Background...' : 'Next: Set Background'}
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && resultImage && (
                    <div className="edit-section" style={{ width: '100%', textAlign: 'center' }}>
                        <div className="section-header-compact">
                            <span className="badge">2</span>
                            <h3>Pick Photo Background</h3>
                        </div>
                        
                        <div className="passport-preview-container">
                            <div className="passport-frame" style={{ backgroundColor: bgColor }}>
                                <img src={resultImage} alt="Result" className="passport-img" />
                            </div>

                            <div className="color-control-box">
                                <label className="control-label">Official Colors</label>
                                <div className="color-picker-grid">
                                    {colors.map(c => (
                                        <div
                                            key={c}
                                            className={`color-swatch ring ${bgColor === c ? 'active' : ''}`}
                                            style={{ backgroundColor: c }}
                                            onClick={() => setBgColor(c)}
                                        />
                                    ))}
                                    <input type="color" className="custom-color-swatch" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className="action-buttons-group" style={{ marginTop: '3rem' }}>
                            <button className="btn-secondary" onClick={() => setStep(1)}>Start Over</button>
                            <button className="btn-primary" onClick={downloadFinalImage}>Download Passport Photo</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePhotoMaker;
