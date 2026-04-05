import React from 'react';
import './Upload.css';

const Upload = ({ 
    id, 
    accept, 
    onUpload, 
    title = "Click to Upload File", 
    subtitle = "Safe and secure file processing",
    limitText = "",
    multiple = false
}) => {
    return (
        <label htmlFor={id} className="drop-zone premium-upload">
            <div className="upload-icon-wrapper">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                </svg>
            </div>
            <div className="upload-text">
                <span className="upload-title">{title}</span>
                {subtitle && <p className="upload-subtitle">{subtitle}</p>}
                {limitText && <span className="upload-limit">{limitText}</span>}
            </div>
            <input 
                id={id} 
                type="file" 
                accept={accept} 
                multiple={multiple}
                onChange={(e) => onUpload(multiple ? Array.from(e.target.files) : e.target.files[0])} 
                style={{ display: 'none' }} 
            />
        </label>
    );
};

export default Upload;
