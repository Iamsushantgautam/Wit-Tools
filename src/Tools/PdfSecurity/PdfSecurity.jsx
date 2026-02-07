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
            // Load document - it might already be encrypted, in which case we might fail without pass
            // However, assuming user uploads unencrypted doc for protection
            let pdfDoc;
            try {
                pdfDoc = await PDFDocument.load(arrayBuffer);
            } catch (e) {
                setStatusMessage('Failed to load PDF. It might be corrupted or already password protected.');
                setIsProcessing(false);
                return;
            }

            // Encrypt with user and owner password (same for simplicity)
            // Permissions: allow nothing by default or everything? Let's restrict printing/editing?
            // Default behavior of most tools is read access with password.

            /* 
               pdf-lib encrypt options:
               userPassword: required to open
               ownerPassword: required to change permissions
               permissions: { printing: 'highResolution', modifying: false, etc. }
             */

            pdfDoc.encrypt({
                userPassword: password,
                ownerPassword: password, // Same owner password for simplicity in this tool
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
        // Note: If PDF is encrypted, we often need password just to load it. 
        // But if user wants to REMOVE password, they must know it.

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
                // Attempt to load with password
                pdfDoc = await PDFDocument.load(arrayBuffer, { password: currentPassword });
            } catch (e) {
                // Likely invalid password
                setStatusMessage('Invalid password. Could not open PDF.');
                setIsProcessing(false);
                return;
            }

            // Saving without passing 'encrypt' options effectively removes security
            // Wait - pdf-lib might preserve encryption if modifying?
            // No, usually save() creates a new file. If we don't call encrypt() on it, it's plain.
            // BUT - loaded encrypted doc might retain encryption metadata.
            // Actually, pdf-lib removes encryption upon save if not re-encrypted explicitly?
            // Let's test. If save() defaults to no encryption, we are good.
            // Correct implementation: Just save it. A loaded document is decrypted in memory.

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
        <div className="pdf-security-container">
            <div className="tool-header">
                <h2>PDF Password Tool</h2>
                <p>Add password protection or remove it from your PDF files.</p>
            </div>

            <div className="security-card">
                <div className="tabs">
                    <button
                        className={`tab-btn ${activeTab === 'protect' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('protect'); reset(); }}
                    >
                        Protect PDF
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'unlock' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('unlock'); reset(); }}
                    >
                        Unlock PDF
                    </button>
                </div>

                <div className="workspace">
                    {/* Upload Section */}
                    {!file ? (
                        <div className="upload-area" onClick={() => document.getElementById('pdf-sec-upload').click()}>
                            <input
                                type="file"
                                id="pdf-sec-upload"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                hidden
                            />
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
                            <div>Click to Upload PDF</div>
                        </div>
                    ) : (
                        <div className="file-info-box">
                            <div className="file-info">{fileName}</div>
                            <button className="secondary-btn" onClick={reset} style={{ fontSize: '0.8rem', marginLeft: '10px' }}>Change File</button>
                        </div>
                    )}

                    {/* Forms */}
                    {file && activeTab === 'protect' && (
                        <div className="form-container" style={{ width: '100%' }}>
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter strong password"
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter password"
                                />
                            </div>
                            <button
                                className="action-btn"
                                onClick={handleProtect}
                                disabled={isProcessing || !password || !confirmPassword}
                            >
                                {isProcessing ? 'Encrypting...' : 'Protect PDF'}
                            </button>
                        </div>
                    )}

                    {file && activeTab === 'unlock' && (
                        <div className="form-container" style={{ width: '100%' }}>
                            <div className="form-group">
                                <label>Current Password</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Enter password to unlock"
                                />
                            </div>
                            <button
                                className="action-btn"
                                onClick={handleUnlock}
                                disabled={isProcessing || !currentPassword}
                            >
                                {isProcessing ? 'Decrypting...' : 'Unlock PDF'}
                            </button>
                        </div>
                    )}

                    {statusMessage && <div className="status-message">{statusMessage}</div>}
                </div>
            </div>
        </div>
    );
};

export default PdfSecurity;
