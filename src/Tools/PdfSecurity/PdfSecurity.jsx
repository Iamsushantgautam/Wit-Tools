import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { jsPDF } from 'jspdf/dist/jspdf.umd.min.js';
import Upload from '../../components/Common/Upload/Upload';
import './PdfSecurity.css';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

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

    const handleFileChange = (selected) => {
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
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            const numPages = pdf.numPages;
            
            // Get first page viewport to determine document size
            const firstPage = await pdf.getPage(1);
            const originalViewport = firstPage.getViewport({ scale: 1 });
            const { width, height } = originalViewport;
            const orientation = width > height ? 'l' : 'p';
            
            // Create a new jsPDF document
            const pdfOutput = new jsPDF({
                orientation: orientation,
                unit: 'px',
                format: [width, height],
                hotfixes: ['px_runtime_resolution']
            });

            // CRITICAL CHECK: Ensure encryption module is loaded
            if (typeof pdfOutput.setEncryption !== 'function') {
                throw new Error("ENCRYPTION_MODULE_MISSING");
            }

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 2.0 }); // High quality render
                
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({
                    canvasContext: context,
                    viewport: viewport,
                }).promise;

                if (i > 1) {
                    const pageViewport = page.getViewport({ scale: 1 });
                    pdfOutput.addPage([pageViewport.width, pageViewport.height], pageViewport.width > pageViewport.height ? 'l' : 'p');
                }
                
                const imgData = canvas.toDataURL('image/jpeg', 0.95);
                pdfOutput.addImage(imgData, 'JPEG', 0, 0, pdfOutput.internal.pageSize.getWidth(), pdfOutput.internal.pageSize.getHeight());
            }

            // Set encryption
            pdfOutput.setEncryption({
                userPassword: password,
                ownerPassword: password,
                userPermissions: ['print', 'modify', 'copy', 'annot-fill']
            });

            const pdfBlob = pdfOutput.output('blob');
            const blobUrl = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `protected_${fileName}`;
            link.click();
            
            setStatusMessage('PDF Protected Successfully!');
        } catch (error) {
            console.error('Detailed Protection Error:', error);
            if (error.message === "ENCRYPTION_MODULE_MISSING") {
                setStatusMessage('System Error: Encryption plugin not found in this environment. Please contact support or use a different browser.');
            } else if (error.name === 'PasswordException') {
                setStatusMessage('The PDF is already password protected.');
            } else {
                setStatusMessage(`Error: ${error.message || 'The file could not be processed'}. If it's a large PDF, it might be exceeding memory limits.`);
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const handleUnlock = async () => {
        if (!file || !currentPassword) {
            setStatusMessage('Enter the current password to unlock.');
            return;
        }

        setIsProcessing(true);
        setStatusMessage('');

        try {
            const arrayBuffer = await file.arrayBuffer();
            
            // Try to load the protected PDF
            let pdf;
            try {
                pdf = await pdfjsLib.getDocument({ 
                    data: arrayBuffer, 
                    password: currentPassword 
                }).promise;
            } catch (e) {
                setStatusMessage('Invalid password. Could not open PDF.');
                setIsProcessing(false);
                return;
            }

            const numPages = pdf.numPages;
            const firstPage = await pdf.getPage(1);
            const originalViewport = firstPage.getViewport({ scale: 1 });
            const { width, height } = originalViewport;
            const orientation = width > height ? 'l' : 'p';
            
            const pdfOutput = new jsPDF({
                orientation: orientation,
                unit: 'px',
                format: [width, height],
                hotfixes: ['px_runtime_resolution']
            });

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 2.0 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({
                    canvasContext: context,
                    viewport: viewport,
                }).promise;

                if (i > 1) {
                    const pageViewport = page.getViewport({ scale: 1 });
                    pdfOutput.addPage([pageViewport.width, pageViewport.height], pageViewport.width > pageViewport.height ? 'l' : 'p');
                }
                
                const imgData = canvas.toDataURL('image/jpeg', 0.95);
                pdfOutput.addImage(imgData, 'JPEG', 0, 0, pdfOutput.internal.pageSize.getWidth(), pdfOutput.internal.pageSize.getHeight());
            }

            pdfOutput.save(`unlocked_${fileName}`);
            setStatusMessage('PDF Unlocked Successfully!');
        } catch (error) {
            console.error('Unlock failed:', error);
            setStatusMessage('An error occurred. Ensure the password is correct.');
        } finally {
            setIsProcessing(false);
        }
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

            <div className={`tool-card ${!file ? 'no-hover-arrow' : ''}`}>
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
                        <Upload
                            id="pdf-sec-upload"
                            accept="application/pdf"
                            onUpload={handleFileChange}
                            title="Click to Upload PDF"
                            subtitle="Secure password protection for your documents"
                            limitText="Format: PDF only"
                        />
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
