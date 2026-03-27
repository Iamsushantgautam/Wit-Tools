import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import './PdfSecurity.css';

const PdfSecurity = () => {
    const [activeTab, setActiveTab] = useState('protect'); // 'protect' or 'unlock'

    // File State
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');

    // Password State
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Unlock Password State
    const [currentPassword, setCurrentPassword] = useState('');

    const [isProcessing, setIsProcessing] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected && selected.type === 'application/pdf') {
            setFile(selected);
            setFileName(selected.name);
            setStatusMessage('');
        } else {
            setStatusMessage('Please select a valid PDF file.');
        }
    };

    const handleProtect = async () => {
        if (!file || !password) return;
        if (password !== confirmPassword) {
            setStatusMessage('Passwords do not match.');
            return;
        }
        setIsProcessing(true);
        setStatusMessage('');

        try {
            const arrayBuffer = await file.arrayBuffer();
            let pdfDoc;
            try {
                pdfDoc = await PDFDocument.load(arrayBuffer);
            } catch (e) {
                setStatusMessage('Failed to load PDF. It might be corrupted or already password protected.');
                setIsProcessing(false);
                return;
            }

            pdfDoc.encrypt({
                userPassword: password,
                ownerPassword: password,
                permissions: {
                    printing: 'highResolution',
                    modifying: false,
                    copying: false,
                    annotating: false,
                    fillingForms: false,
                    contentAccessibility: false,
                    documentAssembly: false,
                }
            });

            const pdfBytes = await pdfDoc.save();
            downloadPdf(pdfBytes, `protected_${fileName}`);
            setStatusMessage('PDF Protected Successfully!');

        } catch (error) {
            console.error('Protection failed:', error);
            setStatusMessage('An error occurred while protecting the PDF.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleUnlock = async () => {
        if (!file) return;

        if (!currentPassword) {
            setStatusMessage('Enter the current password to unlock.');
            return;
        }

        setIsProcessing(true);
        setStatusMessage('');

        try {
            const arrayBuffer = await file.arrayBuffer();

            let pdfDoc;
            try {
                pdfDoc = await PDFDocument.load(arrayBuffer, { password: currentPassword });
            } catch (e) {
                setStatusMessage('Invalid password. Could not open PDF.');
                setIsProcessing(false);
                return;
            }

            const pdfBytes = await pdfDoc.save();
            downloadPdf(pdfBytes, `unlocked_${fileName}`);
            setStatusMessage('PDF Unlocked Successfully!');

        } catch (error) {
            console.error('Unlock failed:', error);
            setStatusMessage('An error occurred. Ensure the password is correct.');
        } finally {
            setIsProcessing(false);
        }
    };

    const downloadPdf = (bytes, name) => {
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const reset = () => {
        setFile(null);
        setFileName('');
        setPassword('');
        setConfirmPassword('');
        setCurrentPassword('');
        setStatusMessage('');
    };

    return (
        <div className="tool-container pdf-security-container">
            <div className="tool-header-card">
                <h2>PDF Security</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Protect with password or unlock encrypted PDFs</p>
            </div>

            <div className="tool-card">
                <div className="tabs">
                    <button
                        className={`tab-link ${activeTab === 'protect' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('protect'); reset(); }}
                    >
                        Protect PDF
                    </button>
                    <button
                        className={`tab-link ${activeTab === 'unlock' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('unlock'); reset(); }}
                    >
                        Unlock PDF
                    </button>
                </div>

                <div className="workspace" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                    {!file ? (
                        <label htmlFor="pdf-sec-upload" className="drop-zone">
                            <span>Click to Upload PDF</span>
                            <input
                                type="file"
                                id="pdf-sec-upload"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </label>
                    ) : (
                        <div className="file-info-header">
                            <h3 className="file-name">{fileName}</h3>
                            <button className="btn-secondary" onClick={reset} style={{ marginTop: '0.5rem' }}>Change File</button>
                        </div>
                    )}

                    {file && activeTab === 'protect' && (
                        <div className="form-container" style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="form-group">
                                <label className="control-label">New Password</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter strong password"
                                />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Confirm Password</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter password"
                                />
                            </div>
                            <button
                                className="btn-primary"
                                onClick={handleProtect}
                                disabled={isProcessing || !password || !confirmPassword}
                                style={{ marginTop: '0.5rem' }}
                            >
                                {isProcessing ? 'Encrypting...' : 'Protect PDF Now'}
                            </button>
                        </div>
                    )}

                    {file && activeTab === 'unlock' && (
                        <div className="form-container" style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="form-group">
                                <label className="control-label">Current Password</label>
                                <input
                                    type="password"
                                    className="input-field"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Enter password to unlock"
                                />
                            </div>
                            <button
                                className="btn-primary"
                                onClick={handleUnlock}
                                disabled={isProcessing || !currentPassword}
                                style={{ marginTop: '0.5rem' }}
                            >
                                {isProcessing ? 'Decrypting...' : 'Unlock PDF Now'}
                            </button>
                        </div>
                    )}

                    {statusMessage && (
                        <div className={`status-message ${statusMessage.includes('Successfully') ? 'success' : 'error'}`}>
                            {statusMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PdfSecurity;
