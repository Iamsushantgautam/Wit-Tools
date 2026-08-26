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
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onUpload(e.dataTransfer.files);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            onUpload(e.target.files);
        }
    };

    const formatName = acceptFormat || "IMAGE";
    const buttonText = `Select ${formatName} images`;

    return (
        <div 
            className={`ilovepdf-upload-container ${isDragActive ? 'drag-active' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="upload-action-wrapper">
                <label htmlFor="upload-files-input" className="btn-select-main">
                    {buttonText}
                    <input 
                        id="upload-files-input" 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handleFileChange} 
                        style={{ display: 'none' }} 
                    />
                </label>
            </div>

            <div className="upload-drop-hint">
                or drop {formatName} images here
            </div>

            {limitText && (
                <div className="upload-limit-info">
                    {limitText}
                </div>
            )}
        </div>
    );
};

export default UploadZone;

