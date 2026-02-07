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
    const previewCanvasRef = useRef(null);

    const colors = [
        '#ffffff', // White
        '#f5f5f5', // Light Grey
        '#F44336', // Red
        '#E91E63', // Pink
        '#9C27B0', // Purple
        '#673AB7', // Deep Purple
        '#3F51B5', // Indigo
        '#2196F3', // Blue
        '#03A9F4', // Light Blue
        '#00BCD4', // Cyan
        '#009688', // Teal
        '#4CAF50', // Green
        '#8BC34A', // Light Green
        '#CDDC39', // Lime
        '#FFEB3B', // Yellow
        '#FFC107', // Amber
        '#FF9800', // Orange
        '#FF5722', // Deep Orange
        '#795548', // Brown
        '#9E9E9E', // Grey
        '#607D8B', // Blue Grey
        '#000000', // Black
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
                1, // Aspect Ratio - Square for profiles
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
                // After cropping, proceed to remove BG
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

        // If no API key, just proceed with the cropped image
        if (!apiKey) {
            console.warn("No API Key found. Skipping BG removal.");
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

            // Fallback: Use original cropped image if API fails
            const url = URL.createObjectURL(imageBlob);
            setResultImage(url);
            setStep(3);

            if (error.response?.status === 402) {
                alert("API Limit Reached. Using original image.");
            } else if (error.response?.status === 401 || error.response?.status === 403) {
                alert("Invalid or Missing API Key. Using original image. Please restart server.");
            } else {
                console.log("Using original cropped image as fallback.");
            }
        } finally {
            setLoading(false);
        }
    };

    const downloadFinalImage = () => {
        if (!resultImage) return;

        // We need to composite the BG color and the transparent image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = resultImage;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw BG Color
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Image
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
        <div className="profile-maker-container">
            <div className="tool-header">
                <h2>Profile Picture Maker</h2>
                <p>Create professional profile photos in seconds.</p>
            </div>

            <div className="profile-maker-card">
                {step === 1 && (
                    <div className="upload-section" style={{ textAlign: 'center', padding: '3rem', border: '2px dashed #ddd', borderRadius: '12px', cursor: 'pointer' }} onClick={() => document.getElementById('pm-upload').click()}>
                        <input type="file" id="pm-upload" accept="image/*" onChange={onSelectFile} hidden />
                        <div style={{ fontSize: '3rem' }}>📷</div>
                        <p style={{ marginTop: '1rem', fontWeight: 600 }}>Click to Upload Photo</p>
                    </div>
                )}

                {step === 2 && (
                    <div className="crop-section">
                        <p className="step-indicator">Step 1: Crop Your Photo</p>
                        <div className="crop-canvas-wrapper">
                            <ReactCrop
                                crop={crop}
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={1}
                                circularCrop
                            >
                                <img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} style={{ maxHeight: '60vh' }} />
                            </ReactCrop>
                        </div>
                        <div className="tool-actions">
                            <button className="secondary-btn" onClick={() => { setStep(1); setImgSrc(null); }}>Cancel</button>
                            <button className="primary-btn" onClick={handleCropConfirm} disabled={loading}>
                                {loading ? 'Processing...' : 'Remove Background & Edit'}
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && resultImage && (
                    <div className="edit-section">
                        <p className="step-indicator">Step 2: Customize Background</p>
                        <div className="result-preview-area">
                            {/* Preview Profile Pic */}
                            <div
                                className="final-preview"
                                style={{
                                    backgroundImage: `url(${resultImage})`,
                                    backgroundColor: bgColor,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '50%'
                                }}
                            >
                                {/* Just using background image logic for preview divs */}
                            </div>

                            {/* Color Picker */}
                            <div className="color-picker-row">
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

                            <div className="tool-actions">
                                <button className="secondary-btn" onClick={() => document.getElementById('pm-upload').click()}>Start Over</button>
                                <button className="primary-btn" onClick={downloadFinalImage}>Download Profile Pic</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePhotoMaker;
