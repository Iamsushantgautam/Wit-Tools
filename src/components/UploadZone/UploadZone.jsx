import React, { useState } from 'react';
import './UploadZone.css';

const UploadZone = ({ onUpload, limitText = "Maximum 100 files • 500 MB total limit", acceptFormat = "PNG" }) => {
    const [isDragActive, setIsDragActive] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        if (e.dataTransfer.files) {
            onUpload(e.dataTransfer.files);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            onUpload(e.target.files);
        }
    };


    return (
        <div 
            className={`premium-upload-card ${isDragActive ? 'drag-active' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="decor-glow"></div>
            
            <div className="upload-main-content">
                <div className="upload-circle-icon">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                </div>
                
                <div className="upload-headlines">
                    <span className="main-title">Drop any image file here</span>
                    <span className="description-subtitle">Drag & Drop single, multiple files, or an entire folder</span>
                </div>

                <div className="limit-info-badge">
                    {limitText}
                </div>

                <div className="upload-buttons-container">
                    <label htmlFor="upload-files-input" className="action-button-primary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        Upload Images
                    </label>
                    <input 
                        id="upload-files-input" 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handleFileChange} 
                        style={{ display: 'none' }} 
                    />

                    <label htmlFor="upload-folder-input" className="action-button-secondary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                        </svg>
                        Upload Complete Folder
                    </label>
                    <input 
                        id="upload-folder-input" 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        webkitdirectory="" 
                        directory=""
                        onChange={handleFileChange} 
                        style={{ display: 'none' }} 
                    />
                </div>
            </div>
        </div>
    );
};

export default UploadZone;
