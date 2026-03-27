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

    const colors = [
        '#ffffff', '#f5f5f5', '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#000000',
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
                    width: 90,
                },
                1, // Aspect Ratio
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
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
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
                alert("Failed to crop image.");
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
            console.error("Error removing background:", error);
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
            link.download = 'profile_pic.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
    };

    return (
        <div className="tool-container profile-maker-container">
            <div className="tool-header-card">
                <h2>Profile Photo Maker</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Create professional profile pictures instantly</p>
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
                        <p className="step-label">Step 1: Crop your photo</p>
                        <div className="crop-canvas-wrapper" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                            <ReactCrop
                                crop={crop}
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={1}
                                circularCrop
                            >
                                <img ref={imgRef} alt="Crop" src={imgSrc} onLoad={onImageLoad} style={{ maxHeight: '50vh', maxWidth: '100%' }} />
                            </ReactCrop>
                        </div>
                        <div className="action-buttons-group">
                            <button className="btn-secondary" onClick={() => { setStep(1); setImgSrc(null); }}>Cancel</button>
                            <button className="btn-primary" onClick={handleCropConfirm} disabled={loading}>
                                {loading ? 'Processing...' : 'Next: Edit Background'}
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && resultImage && (
                    <div className="edit-section" style={{ width: '100%', textAlign: 'center' }}>
                        <p className="step-label">Step 2: Choose background color</p>
                        <div className="result-preview-area" style={{ marginBottom: '2rem' }}>
                            <div
                                className="final-preview-circle"
                                style={{
                                    backgroundImage: `url(${resultImage})`,
                                    backgroundColor: bgColor,
                                }}
                            ></div>

                            <div className="color-picker-grid">
                                <input type="color" className="custom-color-input" value={bgColor} onChange={(e) => setBgColor(e.target.value)} title="Custom Color" />
                                {colors.map(c => (
                                    <div
                                        key={c}
                                        className={`color-swatch ${bgColor === c ? 'active' : ''}`}
                                        style={{ backgroundColor: c }}
                                        onClick={() => setBgColor(c)}
                                    />
                                ))}
                            </div>

                            <div className="action-buttons-group" style={{ marginTop: '2rem' }}>
                                <button className="btn-secondary" onClick={() => setStep(1)}>Start Over</button>
                                <button className="btn-primary" onClick={downloadFinalImage}>Download Profile Photo</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePhotoMaker;
