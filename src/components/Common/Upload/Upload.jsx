import React, { useState } from 'react';
import './Upload.css';

const Upload = ({ 
    id = "file-upload-input", 
    accept, 
    onUpload, 
    title = "Select files", 
    subtitle,
    limitText = "",
    multiple = false
}) => {
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
            onUpload(multiple ? Array.from(e.dataTransfer.files) : e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            onUpload(multiple ? Array.from(e.target.files) : e.target.files[0]);
        }
    };

    // Format button text based on title / accept prop
    const getButtonText = () => {
        if (!title || title === "Click to Upload File") {
            if (accept?.includes("pdf")) return "Select PDF files";
            if (accept?.includes("image")) return "Select Image files";
            return "Select files";
        }
        if (title.toLowerCase().startsWith("click to upload")) {
            const topic = title.replace(/click to upload/i, "").trim();
            return `Select ${topic || "files"}`;
        }
        return title;
    };

    const buttonText = getButtonText();

    // Determine drop hint text based on file types
    const dropText = accept?.includes("pdf") ? "or drop PDFs here" : accept?.includes("image") ? "or drop images here" : "or drop files here";

    return (
        <div 
            className={`ilovepdf-upload-container ${isDragActive ? 'drag-active' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="upload-action-wrapper">
                <label htmlFor={id} className="btn-select-main">
                    {buttonText}
                    <input 
                        id={id} 
                        type="file" 
                        accept={accept} 
                        multiple={multiple}
                        onChange={handleFileChange} 
                        style={{ display: 'none' }} 
                    />
                </label>
            </div>

            <div className="upload-drop-hint">
                {dropText}
            </div>

            {limitText && (
                <div className="upload-limit-info">
                    {limitText}
                </div>
            )}
        </div>
    );
};

export default Upload;

