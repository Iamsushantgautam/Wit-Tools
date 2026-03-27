import React, { useState } from 'react';
import axios from 'axios';
import './BgRemover.css';

const BgRemover = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [resultImage, setResultImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const apiKey = import.meta.env.VITE_REMOVE_BG_API_KEY;

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setOriginalImage(URL.createObjectURL(selectedFile));
            setResultImage(null); // Reset previous result
            // Auto remove bg when file selected
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
            } else if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                alert("Invalid or Missing API Key. Please check your .env file or restart the server.");
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
        <div className="tool-container bg-remover-container">
            <div className="tool-header-card">
                <h2>Background Remover</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>100% Automatically and Free</p>
            </div>

            <div className="tool-card">
                {!loading && !resultImage ? (
                    <div className="upload-wrapper">
                        <label htmlFor="bg-remover-upload" className="btn-primary">
                            Upload Image
                        </label>
                        <input
                            id="bg-remover-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        <p className="drop-text">or drop a file, paste image or URL</p>

                        <div className="sample-section">
                            <p>No image? Try one of these:</p>
                            <div className="sample-thumbnails">
                                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=50&h=50&q=80" className="sample-thumb" alt="Sample 1" onClick={() => {/* Mock selection would go here */}} />
                                <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=50&h=50&q=80" className="sample-thumb" alt="Sample 2" />
                                <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=50&h=50&q=80" className="sample-thumb" alt="Sample 3" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="result-container">
                        {loading && (
                            <div className="loading-state">
                                <div className="spinner"></div>
                                <p>Removing Background...</p>
                            </div>
                        )}
                        {resultImage && (
                            <>
                                <div className="comparison-view">
                                    <div className="comparison-item">
                                        <span className="comparison-label">Original</span>
                                        <div className="result-image-wrapper">
                                            <img src={originalImage} alt="Original" />
                                        </div>
                                    </div>
                                    <div className="comparison-item">
                                        <span className="comparison-label">Removed BG</span>
                                        <div className="result-image-wrapper">
                                            <img src={resultImage} alt="Result" />
                                        </div>
                                    </div>
                                </div>

                                <div className="action-buttons-group">
                                    <button className="btn-primary" onClick={downloadResult}>
                                        Download HD
                                    </button>
                                    <button
                                        className="btn-secondary"
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
    );
};

export default BgRemover;
