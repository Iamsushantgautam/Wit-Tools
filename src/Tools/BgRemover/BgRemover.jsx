import React, { useState } from 'react';
import axios from 'axios';
import './BgRemover.css';

const BgRemover = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [resultImage, setResultImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const apiKey = 'TMwFe8334uSD3raKKhnF4DSv';

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setOriginalImage(URL.createObjectURL(selectedFile));
            setResultImage(null); // Reset previous result
            // Auto remove bg when file selected, similar to the reference site behavior
            removeBackground(selectedFile);
        }
    };

    const removeBackground = async (selectedFile) => {
        if (!selectedFile) {
            alert("No file selected!");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('image_file', selectedFile);
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

        } catch (error) {
            console.error("Error removing background:", error);
            if (error.response && error.response.status === 402) {
                alert("API credits exhausted or payment required.");
            } else if (error.response && error.response.status === 401) {
                alert("Invalid API Key.");
            } else {
                alert("Failed to remove background. " + (error.message || ""));
            }
        } finally {
            setLoading(false);
        }
    };

    const downloadResult = () => {
        if (resultImage) {
            const link = document.createElement('a');
            link.href = resultImage;
            link.download = 'no-bg.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="bg-remover-container">
            <div className="bg-hero-section">

                {/* Left Side: Hero Text and Placeholder */}
                <div className="left-content">
                    {/* Placeholder for the hero image */}
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Example" className="hero-image-placeholder" />

                    <h1 className="hero-title">Remove Image <br /> Background</h1>
                    <div className="hero-subtitle">
                        <span>100% Automatically and</span>
                        <span className="free-badge">Free</span>
                    </div>
                </div>

                {/* Right Side: Upload Card */}
                <div className="right-content">
                    <div className="upload-card">

                        {!loading && !resultImage ? (
                            <>
                                <label htmlFor="bg-remover-upload" className="upload-btn-label">
                                    Upload Image
                                </label>
                                <input
                                    id="bg-remover-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />

                                <p className="drop-text">or drop a file,</p>
                                <span className="paste-text">paste image or URL</span>

                                <p className="sample-section">No image? Try one of these:</p>
                                <div className="sample-thumbnails">
                                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=50&h=50&q=80" className="sample-thumb" alt="Sample 1" />
                                    <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=50&h=50&q=80" className="sample-thumb" alt="Sample 2" />
                                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=50&h=50&q=80" className="sample-thumb" alt="Sample 3" />
                                    <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=50&h=50&q=80" className="sample-thumb" alt="Sample 4" />
                                </div>
                            </>
                        ) : (
                            <div className="result-container">
                                {loading && <p>Removing Background...</p>}
                                {resultImage && (
                                    <>
                                        {/* Comparison View */}
                                        <div className="comparison-view">
                                            <div className="comparison-item">
                                                <span className="comparison-label">Original</span>
                                                <div className="result-image-wrapper">
                                                    <img src={originalImage} alt="Original" />
                                                </div>
                                            </div>
                                            <div className="comparison-item">
                                                <span className="comparison-label">Removed Background</span>
                                                <div className="result-image-wrapper">
                                                    <img src={resultImage} alt="Result" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="action-buttons-group">
                                            <button className="download-btn" onClick={downloadResult}>
                                                Download HD
                                            </button>
                                            <button
                                                className="reset-btn"
                                                onClick={() => { setResultImage(null); setFile(null); setOriginalImage(null); }}
                                            >
                                                Upload Another
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default BgRemover;
