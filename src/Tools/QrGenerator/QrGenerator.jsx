import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './QrGenerator.css';

const QrGenerator = () => {
    const [text, setText] = useState('');
    const [qrCodeData, setQrCodeData] = useState('');
    const canvasRef = useRef(null);

    const handleGenerate = () => {
        if (!text) {
            alert('Please enter some text or a URL.');
            return;
        }
        setQrCodeData(text);
    };

    const handleDownload = () => {
        const canvas = canvasRef.current.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = url;
            link.download = 'qrcode.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="tool-container qr-generator-container">
            <div className="tool-header-card">
                <h2>QR Code Generator</h2>
            </div>

            <div className="tool-card">
                <input
                    type="text"
                    placeholder="Enter text or URL..."
                    className="input-field"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className="btn-primary" onClick={handleGenerate}>
                    Generate QR Code
                </button>

                {qrCodeData && (
                    <div className="qr-code-display" ref={canvasRef}>
                        <QRCodeCanvas
                            value={qrCodeData}
                            size={256}
                            level={"H"} // High error correction level
                            includeMargin={true}
                        />
                        <div style={{ marginTop: '20px' }}>
                            <button className="btn-primary" onClick={handleDownload}>
                                Download QR Code
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QrGenerator;
