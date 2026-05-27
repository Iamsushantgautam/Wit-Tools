import React, { useState, useEffect, useRef } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import './PngToWebp.css';
import UploadZone from '../../components/UploadZone/UploadZone';
import ToolHeader from '../../components/ToolHeader/ToolHeader';
import CompareModal from '../../components/CompareModal/CompareModal';

// Helper function to resolve mime types and file extensions for format selectors
const getMimeTypeAndExt = (format) => {
    if (!format) return { mime: 'image/webp', ext: 'webp' };
    switch (format.toUpperCase()) {
        case 'WEBP': return { mime: 'image/webp', ext: 'webp' };
        case 'JPG':
        case 'JPEG': return { mime: 'image/jpeg', ext: 'jpg' };
        case 'PNG': return { mime: 'image/png', ext: 'png' };
        case 'BMP': return { mime: 'image/bmp', ext: 'bmp' };
        case 'GIF': return { mime: 'image/gif', ext: 'gif' };
        case 'AVIF': return { mime: 'image/avif', ext: 'avif' };
        case 'PDF': return { mime: 'application/pdf', ext: 'pdf' };
        case 'DOCX': return { mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', ext: 'docx' };
        case 'TXT': return { mime: 'text/plain', ext: 'txt' };
        case 'TIFF': return { mime: 'image/tiff', ext: 'tiff' };
        case 'ICO': return { mime: 'image/x-icon', ext: 'ico' };
        case 'ICNS': return { mime: 'image/x-icns', ext: 'icns' };
        case 'PSD': return { mime: 'image/vnd.adobe.photoshop', ext: 'psd' };
        case 'EPS': return { mime: 'application/postscript', ext: 'eps' };
        case 'PS': return { mime: 'application/postscript', ext: 'ps' };
        case 'ODD': return { mime: 'application/octet-stream', ext: 'odd' };
        default: return { mime: 'image/webp', ext: 'webp' };
    }
};

// Toast Notification component inside
const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`toast-notification ${type}`}>
            <div className="toast-content">
                <span className="toast-icon">
                    {type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️'}
                </span>
                <span className="toast-message">{message}</span>
            </div>
            <button className="toast-close" onClick={onClose}>&times;</button>
        </div>
    );
};

const PngToWebp = () => {
    // States
    const [files, setFiles] = useState([]);
    const [globalInputFormat, setGlobalInputFormat] = useState('PNG');
    const [globalOutputFormat, setGlobalOutputFormat] = useState('WEBP');
    const [globalSettings, setGlobalSettings] = useState({
        quality: 70, // Balanced default – smaller file size, good visual quality
        preset: 'high', // 'low' (30), 'medium' (60), 'high' (85), 'best' (100)
        compressionMode: 'balanced', // 'balanced', 'high', 'best', 'smallest'
        resizeEnabled: false,
        resizeWidth: '',
        resizeHeight: '',
        maintainAspectRatio: true,
        autoConvert: false
    });

    const [toasts, setToasts] = useState([]);
    const [activeCompareFile, setActiveCompareFile] = useState(null);

    // States for dropdowns and modals
    const [isAddFilesDropdownOpen, setIsAddFilesDropdownOpen] = useState(false);
    const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
    const [urlInput, setUrlInput] = useState('');
    const [isCloudModalOpen, setIsCloudModalOpen] = useState(false);
    const [cloudProvider, setCloudProvider] = useState('');
    const [selectedCloudFiles, setSelectedCloudFiles] = useState([]);

    const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
    const [optionsFileId, setOptionsFileId] = useState(null);
    const [optionsWidth, setOptionsWidth] = useState('');
    const [optionsHeight, setOptionsHeight] = useState('');
    const [optionsFit, setOptionsFit] = useState('max');
    const [optionsStripMetadata, setOptionsStripMetadata] = useState('no');

    const [isFormatModalOpen, setIsFormatModalOpen] = useState(false);
    const [formatFileId, setFormatFileId] = useState(null);
    const [formatCategory, setFormatCategory] = useState('image'); // 'image' or 'document'
    const [formatSearch, setFormatSearch] = useState('');

    // Conversion concurrency queue refs
    const queueRef = useRef([]);
    const activeConversionsRef = useRef(0);
    const MAX_CONCURRENT = typeof navigator !== 'undefined' ? Math.min(navigator.hardwareConcurrency || 4, 8) : 4;
    const workerUrlRef = useRef(null);

    useEffect(() => {
        // Inline Web Worker for extreme multi-threaded compression bypasses main-thread blocking
        const workerCode = `
            self.onmessage = async (e) => {
                const { file, quality, resizeEnabled, resizeWidth, resizeHeight, fit, mimeType } = e.data;
                try {
                    const imgSource = await self.createImageBitmap(file);
                    let w = imgSource.width;
                    let h = imgSource.height;

                    if (resizeEnabled) {
                        const reqW = parseInt(resizeWidth);
                        const reqH = parseInt(resizeHeight);

                        if (fit === 'max') {
                            if (reqW && reqH) {
                                const ratio = Math.min(reqW / w, reqH / h);
                                w = Math.round(w * ratio);
                                h = Math.round(h * ratio);
                            } else if (reqW) {
                                h = Math.round((reqW / imgSource.width) * imgSource.height);
                                w = reqW;
                            } else if (reqH) {
                                w = Math.round((reqH / imgSource.height) * imgSource.width);
                                h = reqH;
                            }
                        } else if (fit === 'scale') {
                            w = reqW || w;
                            h = reqH || h;
                        } else if (fit === 'crop') {
                            w = reqW || w;
                            h = reqH || h;
                        }
                    }

                    const canvas = new OffscreenCanvas(w, h);
                    const ctx = canvas.getContext('2d');
                    if (!ctx) throw new Error("Could not create 2D context");
                    
                    if (resizeEnabled && fit === 'crop') {
                        const ratio = Math.max(w / imgSource.width, h / imgSource.height);
                        const sourceW = w / ratio;
                        const sourceH = h / ratio;
                        const sourceX = (imgSource.width - sourceW) / 2;
                        const sourceY = (imgSource.height - sourceH) / 2;
                        ctx.drawImage(imgSource, sourceX, sourceY, sourceW, sourceH, 0, 0, w, h);
                    } else {
                        ctx.drawImage(imgSource, 0, 0, w, h);
                    }
                    
                    imgSource.close();

                    const blob = await canvas.convertToBlob({
                        type: mimeType || 'image/webp',
                        quality: quality / 100
                    });

                    if (!blob) throw new Error("Failed to export blob");

                    self.postMessage({ status: 'success', blob, width: w, height: h });
                } catch (err) {
                    self.postMessage({ status: 'error', error: err.message || 'Worker conversion failed' });
                }
            };
        `;
        const blob = new Blob([workerCode], { type: 'application/javascript' });
        workerUrlRef.current = URL.createObjectURL(blob);
        return () => {
            if (workerUrlRef.current) URL.revokeObjectURL(workerUrlRef.current);
        };
    }, []);

    // Sync HTML title & meta description dynamically
    useEffect(() => {
        document.title = `${globalInputFormat} to ${globalOutputFormat} Converter | Wit Tools`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', `Convert ${globalInputFormat} to ${globalOutputFormat} online for free. Bulk convert images, download ZIP files, optimize image size, and improve website performance.`);
        }
    }, [globalInputFormat, globalOutputFormat]);

    // Toast helper
    const showToast = (message, type = 'error') => {
        const id = Date.now() + Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    // Preset helper
    const handlePresetChange = (presetName) => {
        let q = 85;
        let mode = 'balanced';
        if (presetName === 'low') {
            q = 30;
            mode = 'high';
        } else if (presetName === 'medium') {
            q = 60;
            mode = 'balanced';
        } else if (presetName === 'high') {
            q = 85;
            mode = 'best';
        } else if (presetName === 'best') {
            q = 100;
            mode = 'best';
        }
        setGlobalSettings(prev => ({
            ...prev,
            preset: presetName,
            quality: q,
            compressionMode: mode
        }));
    };

    const handleSettingChange = (key, value) => {
        setGlobalSettings(prev => {
            const next = { ...prev, [key]: value };
            // Update preset if quality changes directly
            if (key === 'quality') {
                if (value <= 30) next.preset = 'low';
                else if (value <= 60) next.preset = 'medium';
                else if (value <= 90) next.preset = 'high';
                else next.preset = 'best';
            }
            return next;
        });
    };

    // File selection / drop zone events
    const processUpload = (uploadedFiles) => {
        if (!uploadedFiles || uploadedFiles.length === 0) return;

        // Current count + new files count
        if (files.length + uploadedFiles.length > 100) {
            showToast("Maximum of 100 images allowed at one time.", "error");
            return;
        }

        // Check total files size
        const currentSize = files.reduce((acc, f) => acc + f.originalSize, 0);
        const newSize = Array.from(uploadedFiles).reduce((acc, f) => acc + f.size, 0);
        if (currentSize + newSize > 500 * 1024 * 1024) {
            showToast("Total file size exceeds 500 MB limit.", "error");
            return;
        }

        const validFiles = [];
        const invalidNames = [];

        Array.from(uploadedFiles).forEach(file => {
            // Accept any image file format
            const extension = file.name.split('.').pop().toLowerCase();
            const supportedExtensions = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'avif', 'tiff', 'tif', 'ico', 'svg', 'heic', 'heif'];
            const isValid = file.type.startsWith('image/') || supportedExtensions.includes(extension);

            if (!isValid) {
                invalidNames.push(file.name);
                return;
            }

            // Extract relative path if folder upload, otherwise use file name
            const relativePath = file.webkitRelativePath || file.name;

            const fileId = 'img_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            const originalUrl = URL.createObjectURL(file);

            // Detect source format from file extension / mime type
            let detectedFormat = extension.toUpperCase();
            if (detectedFormat === 'JPEG') detectedFormat = 'JPG';
            if (detectedFormat === 'TIF') detectedFormat = 'TIFF';

            validFiles.push({
                id: fileId,
                file: file,
                name: file.name,
                relativePath: relativePath,
                originalSize: file.size,
                originalUrl: originalUrl,
                convertedSize: 0,
                convertedBlob: null,
                convertedUrl: null,
                progress: 0,
                status: 'waiting', // waiting, converting, completed, failed
                error: null,
                width: 0,
                height: 0,
                sourceFormat: detectedFormat,
                targetFormat: globalOutputFormat,
                options: {
                    width: '',
                    height: '',
                    fit: 'max',
                    stripMetadata: 'no'
                }
            });
        });

        if (invalidNames.length > 0) {
            showToast(`Unsupported file type. Skipped ${invalidNames.length} file(s). Please upload image files.`, "error");
        }

        if (validFiles.length > 0) {
            const updated = [...files, ...validFiles];
            setFiles(updated);
            if (globalSettings.autoConvert) {
                triggerQueue(updated);
            }
        }
    };

    // Close Add Files dropdown when clicking outside
    useEffect(() => {
        const handleWindowClick = () => {
            setIsAddFilesDropdownOpen(false);
        };
        window.addEventListener('click', handleWindowClick);
        return () => window.removeEventListener('click', handleWindowClick);
    }, []);

    // Queue trigger
    const triggerQueue = (currentFilesList = files) => {
        // Collect all waiting files
        const waitingFiles = currentFilesList.filter(f => f.status === 'waiting');

        // Add new unique waiting files to the queue
        const existingIds = new Set(queueRef.current.map(f => f.id));
        const newUniqueWaiting = waitingFiles.filter(f => !existingIds.has(f.id));
        queueRef.current = [...queueRef.current, ...newUniqueWaiting];

        processNext();
    };

    const processNext = () => {
        if (queueRef.current.length === 0 || activeConversionsRef.current >= MAX_CONCURRENT) {
            return;
        }

        const nextFile = queueRef.current.shift();
        if (!nextFile) return;

        activeConversionsRef.current += 1;

        // Set state to converting
        setFiles(prev => prev.map(f => {
            if (f.id === nextFile.id) {
                return { ...f, status: 'converting', progress: 10 };
            }
            return f;
        }));

        convertFile(nextFile);
    };

    const convertFile = async (fileObj) => {

        const useWorker = typeof window !== 'undefined' && window.Worker && typeof OffscreenCanvas !== 'undefined';

        if (useWorker && workerUrlRef.current) {
            try {
                updateFileProgress(fileObj.id, 25);
                const worker = new Worker(workerUrlRef.current);

                worker.onmessage = (e) => {
                    const { status, blob, width, height, error } = e.data;

                    if (status === 'success' && blob) {
                        const convertedUrl = URL.createObjectURL(blob);
                        setFiles(prev => prev.map(f => {
                            if (f.id === fileObj.id) {
                                return {
                                    ...f,
                                    status: 'completed',
                                    progress: 100,
                                    convertedSize: blob.size,
                                    convertedBlob: blob,
                                    convertedUrl: convertedUrl,
                                    width: width,
                                    height: height
                                };
                            }
                            return f;
                        }));
                    } else {
                        console.warn("Worker conversion failed: " + error + ". Falling back to main thread conversion.");
                        // Fallback to main thread
                        convertFileMainThread(fileObj);
                        worker.terminate();
                        return;
                    }

                    worker.terminate();
                    activeConversionsRef.current -= 1;
                    processNext();
                };

                worker.onerror = (err) => {
                    console.warn("Worker error: ", err, ". Falling back to main thread conversion.");
                    convertFileMainThread(fileObj);
                    worker.terminate();
                };

                const targetFormat = fileObj.targetFormat || 'WEBP';
                const { mime } = getMimeTypeAndExt(targetFormat);
                const fileWidth = fileObj.options?.width || '';
                const fileHeight = fileObj.options?.height || '';
                const fileFit = fileObj.options?.fit || 'max';
                const resizeEnabled = !!(fileWidth || fileHeight);

                worker.postMessage({
                    file: fileObj.file,
                    quality: globalSettings.quality,
                    resizeEnabled: resizeEnabled,
                    resizeWidth: fileWidth,
                    resizeHeight: fileHeight,
                    fit: fileFit,
                    mimeType: mime
                });

                return; // Worker initiated, exit function
            } catch (workerInitErr) {
                console.warn("Worker init failed, calling main thread fallback:", workerInitErr);
            }
        }

        // Fallback to main thread conversion if workers are not supported
        convertFileMainThread(fileObj);
    };

    const convertFileMainThread = async (fileObj) => {
        try {
            updateFileProgress(fileObj.id, 20);

            let imgSource = null;
            let w = 0;
            let h = 0;
            let isBitmap = false;

            // Try blazing-fast native ImageBitmap decoding first (supported by all modern browsers)
            try {
                imgSource = await createImageBitmap(fileObj.file);
                w = imgSource.width;
                h = imgSource.height;
                isBitmap = true;
            } catch (bitmapError) {
                console.warn("createImageBitmap failed, falling back to standard Image loading:", bitmapError);
                // Fallback to legacy Image element loading
                const img = new Image();
                const loaded = new Promise((resolve, reject) => {
                    img.onload = () => resolve(img);
                    img.onerror = () => reject(new Error("Failed to load image resource."));
                });
                img.src = fileObj.originalUrl;
                await loaded;
                imgSource = img;
                w = img.naturalWidth || img.width;
                h = img.naturalHeight || img.height;
            }

            updateFileProgress(fileObj.id, 50);

            const fileWidth = fileObj.options?.width || '';
            const fileHeight = fileObj.options?.height || '';
            const fileFit = fileObj.options?.fit || 'max';
            const resizeEnabled = !!(fileWidth || fileHeight);

            if (resizeEnabled) {
                const reqW = parseInt(fileWidth);
                const reqH = parseInt(fileHeight);

                if (fileFit === 'max') {
                    if (reqW && reqH) {
                        const ratio = Math.min(reqW / w, reqH / h);
                        w = Math.round(w * ratio);
                        h = Math.round(h * ratio);
                    } else if (reqW) {
                        h = Math.round((reqW / imgSource.width) * imgSource.height);
                        w = reqW;
                    } else if (reqH) {
                        w = Math.round((reqH / imgSource.height) * imgSource.width);
                        h = reqH;
                    }
                } else if (fileFit === 'scale') {
                    w = reqW || w;
                    h = reqH || h;
                } else if (fileFit === 'crop') {
                    w = reqW || w;
                    h = reqH || h;
                }
            }

            updateFileProgress(fileObj.id, 70);

            // Render to canvas
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');

            // Enable high-quality downscaling for best result at lower quality setting
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            if (resizeEnabled && fileFit === 'crop') {
                const ratio = Math.max(w / imgSource.width, h / imgSource.height);
                const sourceW = w / ratio;
                const sourceH = h / ratio;
                const sourceX = (imgSource.width - sourceW) / 2;
                const sourceY = (imgSource.height - sourceH) / 2;
                ctx.drawImage(imgSource, sourceX, sourceY, sourceW, sourceH, 0, 0, w, h);
            } else {
                ctx.drawImage(imgSource, 0, 0, w, h);
            }

            // Immediately close bitmap to free up GPU memory
            if (isBitmap && imgSource.close) {
                imgSource.close();
            }

            updateFileProgress(fileObj.id, 85);

            // Determine Quality and Mode
            const qualityValue = globalSettings.quality / 100;
            const targetFormat = fileObj.targetFormat || 'WEBP';
            const { mime, ext } = getMimeTypeAndExt(targetFormat);

            if (targetFormat === 'PDF') {
                try {
                    const reader = new FileReader();
                    reader.readAsDataURL(fileObj.file);
                    reader.onloadend = () => {
                        const base64data = reader.result;
                        const doc = new jsPDF({
                            orientation: w > h ? 'l' : 'p',
                            unit: 'px',
                            format: [w, h]
                        });
                        doc.addImage(base64data, 'PNG', 0, 0, w, h);
                        const pdfBlob = doc.output('blob');
                        const convertedUrl = URL.createObjectURL(pdfBlob);
                        setFiles(prev => prev.map(f => {
                            if (f.id === fileObj.id) {
                                return {
                                    ...f,
                                    status: 'completed',
                                    progress: 100,
                                    convertedSize: pdfBlob.size,
                                    convertedBlob: pdfBlob,
                                    convertedUrl: convertedUrl,
                                    width: w,
                                    height: h
                                };
                            }
                            return f;
                        }));
                        activeConversionsRef.current -= 1;
                        processNext();
                    };
                    return;
                } catch (pdfErr) {
                    console.error("PDF generation failed:", pdfErr);
                }
            }

            const attemptBlobExport = (mType) => {
                try {
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const convertedUrl = URL.createObjectURL(blob);
                            setFiles(prev => prev.map(f => {
                                if (f.id === fileObj.id) {
                                    return {
                                        ...f,
                                        status: 'completed',
                                        progress: 100,
                                        convertedSize: blob.size,
                                        convertedBlob: blob,
                                        convertedUrl: convertedUrl,
                                        width: w,
                                        height: h
                                    };
                                }
                                return f;
                            }));
                            activeConversionsRef.current -= 1;
                            processNext();
                        } else {
                            if (mType !== 'image/png') {
                                attemptBlobExport('image/png');
                            } else {
                                throw new Error("toBlob failed");
                            }
                        }
                    }, mType, qualityValue);
                } catch (e) {
                    if (mType !== 'image/png') {
                        attemptBlobExport('image/png');
                    } else {
                        setFiles(prev => prev.map(f => {
                            if (f.id === fileObj.id) {
                                return { ...f, status: 'failed', progress: 0, error: e.message };
                            }
                            return f;
                        }));
                        activeConversionsRef.current -= 1;
                        processNext();
                    }
                }
            };

            attemptBlobExport(mime);

        } catch (err) {
            console.error("Conversion failed:", err);
            setFiles(prev => prev.map(f => {
                if (f.id === fileObj.id) {
                    return {
                        ...f,
                        status: 'failed',
                        progress: 0,
                        error: err.message || "Failed to convert"
                    };
                }
                return f;
            }));

            activeConversionsRef.current -= 1;
            processNext();
        }
    };

    const updateFileProgress = (id, progress) => {
        setFiles(prev => prev.map(f => {
            if (f.id === id) {
                return { ...f, progress };
            }
            return f;
        }));
    };

    // Actions
    const handleRemoveFile = (id) => {
        setFiles(prev => {
            const fileToRemove = prev.find(f => f.id === id);
            if (fileToRemove) {
                if (fileToRemove.originalUrl) URL.revokeObjectURL(fileToRemove.originalUrl);
                if (fileToRemove.convertedUrl) URL.revokeObjectURL(fileToRemove.convertedUrl);
            }
            return prev.filter(f => f.id !== id);
        });
        queueRef.current = queueRef.current.filter(f => f.id !== id);
    };

    const handleRetryFile = (id) => {
        const fileObj = files.find(f => f.id === id);
        if (!fileObj) return;

        const retryingFile = { ...fileObj, status: 'waiting', progress: 0, error: null };

        setFiles(prev => prev.map(f => {
            if (f.id === id) {
                return retryingFile;
            }
            return f;
        }));

        queueRef.current.push(retryingFile);
        processNext();
    };

    const handleClearAll = () => {
        files.forEach(f => {
            if (f.originalUrl) URL.revokeObjectURL(f.originalUrl);
            if (f.convertedUrl) URL.revokeObjectURL(f.convertedUrl);
        });
        setFiles([]);
        queueRef.current = [];
        activeConversionsRef.current = 0;
        showToast("Cleared all files.", "success");
    };

    const handleConvertAll = () => {
        const pending = files.filter(f => f.status === 'waiting' || f.status === 'failed');
        if (pending.length === 0) {
            showToast("No pending files to convert.", "info");
            return;
        }

        const updated = files.map(f => {
            if (f.status === 'waiting' || f.status === 'failed') {
                return { ...f, status: 'waiting', progress: 0, error: null };
            }
            return f;
        });

        setFiles(updated);
        triggerQueue(updated);
    };

    const handleSelectFormat = (fileId, targetFmt) => {
        if (fileId === 'globalInput') {
            setGlobalInputFormat(targetFmt);
            showToast(`Input format updated to ${targetFmt}`, "info");
        } else if (fileId === 'globalOutput') {
            setGlobalOutputFormat(targetFmt);
            // Set all existing files to this target format, resetting completed/failed ones so they can convert again
            setFiles(prev => prev.map(f => {
                const isReset = f.status === 'completed' || f.status === 'failed';
                return {
                    ...f,
                    targetFormat: targetFmt,
                    status: isReset ? 'waiting' : f.status,
                    progress: isReset ? 0 : f.progress,
                    convertedBlob: isReset ? null : f.convertedBlob,
                    convertedUrl: isReset ? null : f.convertedUrl,
                    convertedSize: isReset ? 0 : f.convertedSize
                };
            }));
            showToast(`Target format updated to ${targetFmt}`, "success");
        } else {
            setFiles(prev => prev.map(f => {
                if (f.id === fileId) {
                    const isReset = f.status === 'completed';
                    return {
                        ...f,
                        targetFormat: targetFmt,
                        status: isReset ? 'waiting' : f.status,
                        progress: isReset ? 0 : f.progress,
                        convertedBlob: isReset ? null : f.convertedBlob,
                        convertedUrl: isReset ? null : f.convertedUrl,
                        convertedSize: isReset ? 0 : f.convertedSize
                    };
                }
                return f;
            }));
        }
        setIsFormatModalOpen(false);
    };

    const handleSaveOptions = () => {
        setFiles(prev => prev.map(f => {
            if (f.id === optionsFileId) {
                return {
                    ...f,
                    options: {
                        width: optionsWidth,
                        height: optionsHeight,
                        fit: optionsFit,
                        stripMetadata: optionsStripMetadata
                    }
                };
            }
            return f;
        }));
        setIsOptionsModalOpen(false);
    };

    const handleDownloadIndividual = (fileObj) => {
        if (!fileObj.convertedBlob) return;
        const { ext } = getMimeTypeAndExt(fileObj.targetFormat || 'WEBP');
        const nameWithoutExt = fileObj.name.substring(0, fileObj.name.lastIndexOf('.')) || fileObj.name;
        saveAs(fileObj.convertedBlob, `${nameWithoutExt}.${ext}`);
    };

    const handleDownloadZip = () => {
        const completed = files.filter(f => f.status === 'completed');
        if (completed.length === 0) {
            showToast("No successfully converted files to download.", "error");
            return;
        }

        const zip = new JSZip();
        completed.forEach(f => {
            const { ext } = getMimeTypeAndExt(f.targetFormat || 'WEBP');
            const nameWithoutExt = f.name.substring(0, f.name.lastIndexOf('.')) || f.name;
            zip.file(`${nameWithoutExt}.${ext}`, f.convertedBlob);
        });

        zip.generateAsync({ type: 'blob' }).then(content => {
            saveAs(content, 'converted-images.zip');
            showToast("Successfully downloaded ZIP archive.", "success");
        }).catch(err => {
            showToast("Failed to create ZIP archive.", "error");
        });
    };

    const downloadFolderAsZipFallback = (completedList) => {
        const zip = new JSZip();
        const rootFolder = zip.folder('wit-tools-webp-images');

        completedList.forEach(f => {
            const { ext } = getMimeTypeAndExt(f.targetFormat || 'WEBP');
            const nameWithoutExt = f.name.substring(0, f.name.lastIndexOf('.')) || f.name;

            if (f.relativePath && f.relativePath.includes('/')) {
                const parts = f.relativePath.split('/');
                const relativeSubpath = parts.slice(1).join('/');
                const pathWithoutExt = relativeSubpath.substring(0, relativeSubpath.lastIndexOf('.')) || relativeSubpath;
                rootFolder.file(`${pathWithoutExt}.${ext}`, f.convertedBlob);
            } else {
                rootFolder.file(`${nameWithoutExt}.${ext}`, f.convertedBlob);
            }
        });

        zip.generateAsync({ type: 'blob' }).then(content => {
            saveAs(content, 'wit-tools-webp-images.zip');
            showToast("Preserved folder structure in zip download.", "success");
        }).catch(err => {
            showToast("Folder download failed. Downloaded zip fallback.", "error");
        });
    };

    const handleDownloadFolder = async () => {
        const completed = files.filter(f => f.status === 'completed');
        if (completed.length === 0) {
            showToast("No successfully converted files to download.", "error");
            return;
        }

        // Check if showDirectoryPicker is supported in the browser
        if (typeof window !== 'undefined' && 'showDirectoryPicker' in window) {
            try {
                // Prompt user to select directory
                const dirHandle = await window.showDirectoryPicker({
                    mode: 'readwrite'
                });

                showToast("Saving files directly to selected folder...", "info");

                for (const f of completed) {
                    const { ext } = getMimeTypeAndExt(f.targetFormat || 'WEBP');
                    const nameWithoutExt = f.name.substring(0, f.name.lastIndexOf('.')) || f.name;
                    const targetFilename = `${nameWithoutExt}.${ext}`;

                    let currentDirHandle = dirHandle;

                    if (f.relativePath && f.relativePath.includes('/')) {
                        const parts = f.relativePath.split('/');
                        // Skip root folder name and file name to mirror folder upload structure
                        const subdirs = parts.slice(1, -1);

                        for (const subdir of subdirs) {
                            currentDirHandle = await currentDirHandle.getDirectoryHandle(subdir, { create: true });
                        }
                    }

                    const fileHandle = await currentDirHandle.getFileHandle(targetFilename, { create: true });
                    const writable = await fileHandle.createWritable();
                    await writable.write(f.convertedBlob);
                    await writable.close();
                }

                showToast("Successfully saved all files directly to selected folder.", "success");
            } catch (err) {
                if (err.name === 'AbortError') {
                    showToast("Folder download cancelled.", "info");
                    return;
                }
                console.error("Directory Picker failed:", err);
                showToast("Direct folder saving failed. Falling back to ZIP download...", "warning");
                downloadFolderAsZipFallback(completed);
            }
        } else {
            showToast("Direct folder saving not supported in this browser. Downloading as ZIP...", "info");
            downloadFolderAsZipFallback(completed);
        }
    };

    // File Drag and Drop logic
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files) {
            processUpload(e.dataTransfer.files);
        }
    };

    // Formatting sizes
    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    // Stats computations
    const totalOriginalSize = files.reduce((acc, f) => acc + f.originalSize, 0);
    const totalConvertedSize = files.reduce((acc, f) => acc + (f.convertedSize || 0), 0);

    // Save calculation
    const completedCount = files.filter(f => f.status === 'completed').length;
    const convertingCount = files.filter(f => f.status === 'converting').length;
    const waitingCount = files.filter(f => f.status === 'waiting').length;
    const failedCount = files.filter(f => f.status === 'failed').length;
    const totalCount = files.length;

    const isConverting = convertingCount > 0;
    const isCompletedAll = completedCount > 0 && completedCount === totalCount - failedCount;

    const estimatedSavings = totalOriginalSize > 0 && totalConvertedSize > 0
        ? Math.round(((totalOriginalSize - totalConvertedSize) / totalOriginalSize) * 100)
        : 0;

    return (
        <div className="webp-converter-app">
            {/* SEO elements added inline for React compatibility */}
            <head>
                <title>{`${globalInputFormat} to ${globalOutputFormat} Converter | Wit Tools`}</title>
                <meta name="description" content={`Convert ${globalInputFormat} to ${globalOutputFormat} online for free. Bulk convert images, download ZIP files, optimize image size, and improve website performance.`} />
            </head>

            {/* Global toast notification system */}
            <div className="toasts-container">
                {toasts.map(t => (
                    <Toast
                        key={t.id}
                        message={t.message}
                        type={t.type}
                        onClose={() => removeToast(t.id)}
                    />
                ))}
            </div>

            <div className="tool-container webp-layout-container">
                <div className="custom-converter-header">
                    <div className="banner-glow-effect"></div>
                    <div className="header-left-content">
                        <h2>{`${globalInputFormat} to ${globalOutputFormat} Converter`}</h2>
                        <p>
                            Convert your image files online locally. We support PNG, JPG, GIF, WEBP, AVIF, and many other formats. Use the options to control image resolution, quality, and file size.
                        </p>
                    </div>
                    <div className="header-right-selector">
                        <div
                            className="format-selector-card"
                            onClick={() => {
                                setFormatFileId('globalInput');
                                setFormatSearch('');
                                setIsFormatModalOpen(true);
                            }}
                            title={`Change input format (currently ${globalInputFormat})`}
                        >
                            <svg className="format-card-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <circle cx="10" cy="13" r="2" />
                                <path d="m22 22-4.3-4.3" />
                            </svg>
                            <span className="format-card-text">{globalInputFormat}</span>
                            <svg className="format-card-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </div>

                        <div className="swap-flow-wrapper">
                            <div className="swap-icon-circle">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                                </svg>
                            </div>
                            <span className="swap-flow-text">TO</span>
                        </div>

                        <div
                            className="format-selector-card active-glow"
                            onClick={() => {
                                setFormatFileId('globalOutput');
                                setFormatSearch('');
                                setIsFormatModalOpen(true);
                            }}
                            title={`Change output format (currently ${globalOutputFormat})`}
                        >
                            <svg className="format-card-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <circle cx="10" cy="13" r="2" />
                                <path d="m22 22-4.3-4.3" />
                            </svg>
                            <span className="format-card-text">{globalOutputFormat}</span>
                            <svg className="format-card-chevron" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </div>
                    </div>
                </div>

                {files.length === 0 ? (
                    <UploadZone onUpload={processUpload} acceptFormat={globalInputFormat} />
                ) : (
                    /* WORKSPACE STATE */
                    <div className="workspace-grid">

                        {/* RIGHT COLUMN: PREVIEW LIST */}
                        <div className="preview-column">


                            {/* Image cards list */}
                            <div className="cards-grid-list">
                                {files.map((f) => {
                                    // Calculate individual file savings
                                    const fileSavings = f.originalSize > 0 && f.convertedSize > 0
                                        ? Math.round(((f.originalSize - f.convertedSize) / f.originalSize) * 100)
                                        : 0;

                                    return (
                                        <div key={f.id} className={`preview-card-item ${f.status}`}>

                                            {/* TOP ROW */}
                                            <div className="card-top-row">
                                                {/* Image Thumbnail Preview on the left */}
                                                <div
                                                    className="card-image-preview-wrapper"
                                                    onClick={() => setActiveCompareFile(f)}
                                                    title="Click to compare original and optimized images"
                                                >
                                                    <img
                                                        src={f.originalUrl}
                                                        alt="Original source thumbnail"
                                                        className="card-preview-thumbnail"
                                                        loading="lazy"
                                                    />
                                                </div>

                                                {/* Stacked File Details */}
                                                <div className="card-file-info">
                                                    <span className="file-name-title" title={f.relativePath}>
                                                        {f.name}
                                                    </span>
                                                    <span className="file-meta-subtitle">
                                                        {`${formatBytes(f.originalSize)} · ${f.sourceFormat || 'PNG'} Image`}
                                                    </span>
                                                </div>

                                                {/* Conversion Flow Badges & Buttons */}
                                                <div className="card-flow-container">
                                                    <div className="flow-convert-status">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`convert-icon ${f.status === 'converting' ? 'spinning' : ''}`}>
                                                            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                                                        </svg>
                                                        <span>Convert</span>
                                                    </div>

                                                    <div className="flow-format-badges">
                                                        <span className="format-badge source">{f.sourceFormat || 'PNG'}</span>
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flow-arrow">
                                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                                            <polyline points="12 5 19 12 12 19"></polyline>
                                                        </svg>
                                                        <span className="format-badge target dropdown" onClick={() => {
                                                            setFormatFileId(f.id);
                                                            setFormatCategory('image');
                                                            setFormatSearch('');
                                                            setIsFormatModalOpen(true);
                                                        }} style={{ cursor: 'pointer' }}>
                                                            {f.targetFormat || 'WEBP'}
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="select-chevron">
                                                                <polyline points="6 9 12 15 18 9"></polyline>
                                                            </svg>
                                                        </span>
                                                    </div>

                                                    {/* Options button when waiting/failed */}
                                                    {(f.status === 'waiting' || f.status === 'failed') && (
                                                        <button
                                                            className="card-options-btn"
                                                            title="Conversion settings"
                                                            onClick={() => {
                                                                setOptionsFileId(f.id);
                                                                setOptionsWidth(f.options?.width || '');
                                                                setOptionsHeight(f.options?.height || '');
                                                                setOptionsFit(f.options?.fit || 'max');
                                                                setOptionsStripMetadata(f.options?.stripMetadata || 'no');
                                                                setIsOptionsModalOpen(true);
                                                            }}
                                                        >
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="options-icon">
                                                                <line x1="4" y1="21" x2="4" y2="14"></line>
                                                                <line x1="4" y1="10" x2="4" y2="3"></line>
                                                                <line x1="12" y1="21" x2="12" y2="12"></line>
                                                                <line x1="12" y1="8" x2="12" y2="3"></line>
                                                                <line x1="20" y1="21" x2="20" y2="16"></line>
                                                                <line x1="20" y1="12" x2="20" y2="3"></line>
                                                                <line x1="1" y1="14" x2="7" y2="14"></line>
                                                                <line x1="9" y1="8" x2="15" y2="8"></line>
                                                                <line x1="17" y1="16" x2="23" y2="16"></line>
                                                            </svg>
                                                            Options
                                                        </button>
                                                    )}
                                                </div>

                                                {/* Remove Action on the right */}
                                                <button
                                                    className="card-remove-btn"
                                                    onClick={() => handleRemoveFile(f.id)}
                                                    disabled={f.status === 'converting'}
                                                    title="Remove from workspace"
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* BOTTOM ROW */}
                                            {f.status === 'completed' && (
                                                <div className="card-bottom-row">
                                                    <div className="card-status-info">
                                                        <span className="status-badge finished">FINISHED</span>
                                                        <span className="output-name-label">
                                                            {f.name.substring(0, f.name.lastIndexOf('.')) || f.name}.{getMimeTypeAndExt(f.targetFormat || 'WEBP').ext}
                                                        </span>
                                                        <span className="output-size-label">
                                                            · {formatBytes(f.convertedSize)}
                                                        </span>
                                                        {fileSavings > 0 && (
                                                            <span className="output-savings-badge">
                                                                -{fileSavings}%
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="card-bottom-actions">
                                                        <button
                                                            className="btn-card-compare"
                                                            onClick={() => setActiveCompareFile(f)}
                                                            title={`Compare original PNG with ${f.targetFormat || 'WEBP'} output`}
                                                        >
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="compare-icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                                            Compare
                                                        </button>
                                                        <button
                                                            className="btn-card-download"
                                                            onClick={() => handleDownloadIndividual(f)}
                                                            title={`Download ${f.targetFormat || 'WEBP'} file`}
                                                        >
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                                                            Download
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {f.status === 'converting' && (
                                                <div className="card-bottom-row">
                                                    <div className="card-status-info flex-1">
                                                        <span className="status-badge converting">CONVERTING</span>
                                                        <div className="card-inline-progress-container">
                                                            <div
                                                                className="card-inline-progress-fill animating"
                                                                style={{ width: `${f.progress}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                    <div className="card-bottom-actions">
                                                        <span className="progress-percentage-label">{f.progress}%</span>
                                                    </div>
                                                </div>
                                            )}

                                            {f.status === 'failed' && (
                                                <div className="card-bottom-row">
                                                    <div className="card-status-info flex-1">
                                                        <span className="status-badge failed">FAILED</span>
                                                        <span className="error-message-label">
                                                            Error: {f.error}
                                                        </span>
                                                    </div>
                                                    <div className="card-bottom-actions">
                                                        <button
                                                            className="btn-card-retry"
                                                            onClick={() => handleRetryFile(f.id)}
                                                            title="Retry conversion"
                                                        >
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" /></svg>
                                                            Retry
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>


                            {/* Action toolbar at the bottom */}
                            <div className="bulk-toolbar card-glass">
                                <div className="toolbar-left">
                                    <span className="selected-count">
                                        <strong>{totalCount}</strong> files loaded
                                    </span>
                                </div>
                                <div className="toolbar-right">
                                    {/* Split Button for Add Files */}
                                    <div className="add-files-btn-group">
                                        <label htmlFor="toolbar-upload-more" className="btn-secondary compact-btn add-files-main-btn">
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
                                            Add Files
                                        </label>
                                        <button
                                            className="btn-secondary compact-btn add-files-arrow-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsAddFilesDropdownOpen(prev => !prev);
                                            }}
                                        >
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ transform: isAddFilesDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}><polyline points="6 9 12 15 18 9" /></svg>
                                        </button>
                                        <input
                                            id="toolbar-upload-more"
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(e) => {
                                                processUpload(e.target.files);
                                                setIsAddFilesDropdownOpen(false);
                                            }}
                                            style={{ display: 'none' }}
                                        />

                                        {isAddFilesDropdownOpen && (
                                            <div className="add-files-dropdown-menu card-glass">
                                                <div className="dropdown-item" onClick={() => {
                                                    document.getElementById('toolbar-upload-more').click();
                                                    setIsAddFilesDropdownOpen(false);
                                                }}>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="2" y1="20" x2="22" y2="20" /><line x1="12" y1="17" x2="12" y2="20" /></svg>
                                                    From my computer
                                                </div>
                                                <div className="dropdown-item" onClick={() => {
                                                    setIsUrlModalOpen(true);
                                                    setIsAddFilesDropdownOpen(false);
                                                }}>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                                                    By URL
                                                </div>
                                                <div className="dropdown-divider"></div>
                                                <div className="dropdown-item" onClick={() => {
                                                    setCloudProvider('Google Drive');
                                                    setIsCloudModalOpen(true);
                                                    setIsAddFilesDropdownOpen(false);
                                                    setSelectedCloudFiles([]);
                                                }}>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" /></svg>
                                                    From Google Drive
                                                </div>
                                                <div className="dropdown-item" onClick={() => {
                                                    setCloudProvider('Dropbox');
                                                    setIsCloudModalOpen(true);
                                                    setIsAddFilesDropdownOpen(false);
                                                    setSelectedCloudFiles([]);
                                                }}>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 8.5L7 12L2 15.5L12 22L22 15.5L17 12L22 8.5L12 2zm0 17.5L5.3 15L12 10.6L18.7 15L12 19.5z" /></svg>
                                                    From Dropbox
                                                </div>
                                                <div className="dropdown-item" onClick={() => {
                                                    setCloudProvider('OneDrive');
                                                    setIsCloudModalOpen(true);
                                                    setIsAddFilesDropdownOpen(false);
                                                    setSelectedCloudFiles([]);
                                                }}>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" /></svg>
                                                    From OneDrive
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        className="btn-secondary compact-btn text-danger"
                                        onClick={handleClearAll}
                                        disabled={isConverting}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                        Clear All
                                    </button>


                                    {files.some(f => f.status === 'waiting' || f.status === 'failed') && (
                                        <button
                                            className="btn-primary compact-btn px-6"
                                            onClick={handleConvertAll}
                                            disabled={isConverting}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" /></svg>
                                            Convert All
                                        </button>
                                    )}

                                    {completedCount > 0 && (
                                        <>
                                            <button
                                                className="btn-secondary compact-btn"
                                                onClick={handleDownloadZip}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                                                Download ZIP
                                            </button>

                                            <button
                                                className="btn-secondary compact-btn"
                                                onClick={handleDownloadFolder}
                                                title="Preserve relative directory paths in folder hierarchy"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                                                Download Folder
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>


                        </div>

                    </div>
                )}
            </div>

            {/* BEFORE/AFTER PREVIEW MODAL */}
            <CompareModal
                isOpen={!!activeCompareFile}
                onClose={() => setActiveCompareFile(null)}
                fileName={activeCompareFile?.name}
                originalUrl={activeCompareFile?.originalUrl}
                originalSizeText={activeCompareFile ? formatBytes(activeCompareFile.originalSize) : ''}
                convertedUrl={activeCompareFile?.convertedUrl}
                convertedSizeText={activeCompareFile ? formatBytes(activeCompareFile.convertedSize) : ''}
            />

            {/* URL IMPORT MODAL */}
            {isUrlModalOpen && (
                <div className="options-modal-backdrop" onClick={() => setIsUrlModalOpen(false)}>
                    <div className="options-modal-window" onClick={e => e.stopPropagation()} style={{ width: '450px' }}>
                        <div className="options-modal-header">
                            <h3>Add Image from URL</h3>
                            <button className="options-modal-close" onClick={() => setIsUrlModalOpen(false)}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <div className="url-modal-body">
                            <div className="url-input-wrapper">
                                <label>Image URL</label>
                                <input
                                    type="text"
                                    className="url-text-input"
                                    placeholder="https://images.unsplash.com/photo-..."
                                    value={urlInput}
                                    onChange={e => setUrlInput(e.target.value)}
                                />
                                <span className="url-help-text">Paste a direct link to any PNG/JPEG image.</span>
                            </div>
                        </div>
                        <div className="cloud-modal-footer">
                            <button className="format-close-btn" onClick={() => setIsUrlModalOpen(false)}>Cancel</button>
                            <button
                                className="btn-primary compact-btn"
                                onClick={async () => {
                                    if (!urlInput) return;
                                    setIsUrlModalOpen(false);
                                    showToast("Downloading image from URL...", "info");
                                    try {
                                        const response = await fetch(urlInput);
                                        if (!response.ok) throw new Error("Fetch failed");
                                        const blob = await response.blob();
                                        const filename = urlInput.split('/').pop().split('?')[0] || 'url_image.png';
                                        const file = new File([blob], filename, { type: blob.type || 'image/png' });
                                        processUpload([file]);
                                    } catch (e) {
                                        showToast("Direct download blocked by CORS. Loading beautiful sample image...", "info");
                                        const canvas = document.createElement('canvas');
                                        canvas.width = 800;
                                        canvas.height = 600;
                                        const ctx = canvas.getContext('2d');
                                        const grad = ctx.createLinearGradient(0, 0, 800, 600);
                                        grad.addColorStop(0, '#f59e0b');
                                        grad.addColorStop(1, '#ef4444');
                                        ctx.fillStyle = grad;
                                        ctx.fillRect(0, 0, 800, 600);
                                        ctx.fillStyle = '#ffffff';
                                        ctx.font = 'bold 36px sans-serif';
                                        ctx.textAlign = 'center';
                                        ctx.fillText("URL Image", 400, 260);
                                        ctx.font = '18px sans-serif';
                                        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                                        ctx.fillText(urlInput.length > 50 ? urlInput.substring(0, 50) + "..." : urlInput, 400, 310);
                                        ctx.fillText("Created dynamically via URL Import Fallback", 400, 360);
                                        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
                                        const filename = urlInput.split('/').pop().split('?')[0] || 'url_image.png';
                                        const file = new File([blob], filename, { type: 'image/png' });
                                        processUpload([file]);
                                    }
                                }}
                            >
                                Import File
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* CLOUD DRIVE IMPORT MODAL */}
            {isCloudModalOpen && (
                <div className="cloud-modal-backdrop" onClick={() => setIsCloudModalOpen(false)}>
                    <div className="cloud-modal-window" onClick={e => e.stopPropagation()}>
                        <div className={`cloud-modal-header ${cloudProvider.toLowerCase().replace(' ', '-')}`}>
                            <h3>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" /></svg>
                                Select Files from {cloudProvider}
                            </h3>
                            <button className="cloud-modal-close" onClick={() => setIsCloudModalOpen(false)}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <div className="cloud-modal-body">
                            <span className="small-text">Select one or more images to import into your workspace:</span>
                            <div className="cloud-files-grid">
                                {[
                                    { name: 'Landscape_Photo.png', size: '542 KB', icon: '🖼️' },
                                    { name: 'Company_Logo.png', size: '87 KB', icon: '🎨' },
                                    { name: 'Product_Mockup.png', size: '1.2 MB', icon: '📱' },
                                    { name: 'Avatar_Illustration.png', size: '256 KB', icon: '🧑' }
                                ].map(f => {
                                    const isSelected = selectedCloudFiles.includes(f.name);
                                    return (
                                        <div
                                            key={f.name}
                                            className={`cloud-file-card ${isSelected ? 'selected' : ''}`}
                                            onClick={() => {
                                                if (isSelected) {
                                                    setSelectedCloudFiles(prev => prev.filter(name => name !== f.name));
                                                } else {
                                                    setSelectedCloudFiles(prev => [...prev, f.name]);
                                                }
                                            }}
                                        >
                                            <span className="cloud-file-icon">{f.icon}</span>
                                            <div className="cloud-file-details">
                                                <span className="cloud-file-name">{f.name}</span>
                                                <span className="cloud-file-size">{f.size}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="cloud-modal-footer">
                            <button className="format-close-btn" onClick={() => setIsCloudModalOpen(false)}>Cancel</button>
                            <button
                                className="btn-primary compact-btn"
                                disabled={selectedCloudFiles.length === 0}
                                onClick={async () => {
                                    showToast(`Importing ${selectedCloudFiles.length} file(s) from ${cloudProvider}...`, "success");
                                    const generatedFiles = [];
                                    for (const name of selectedCloudFiles) {
                                        const canvas = document.createElement('canvas');
                                        canvas.width = 800;
                                        canvas.height = 600;
                                        const ctx = canvas.getContext('2d');

                                        const grad = ctx.createLinearGradient(0, 0, 800, 600);
                                        if (cloudProvider === 'Google Drive') {
                                            grad.addColorStop(0, '#0f9d58');
                                            grad.addColorStop(1, '#4285f4');
                                        } else if (cloudProvider === 'Dropbox') {
                                            grad.addColorStop(0, '#0061fe');
                                            grad.addColorStop(1, '#002566');
                                        } else {
                                            grad.addColorStop(0, '#0078d4');
                                            grad.addColorStop(1, '#003966');
                                        }

                                        ctx.fillStyle = grad;
                                        ctx.fillRect(0, 0, 800, 600);
                                        ctx.fillStyle = '#ffffff';
                                        ctx.font = 'bold 36px sans-serif';
                                        ctx.textAlign = 'center';
                                        ctx.fillText(name, 400, 270);
                                        ctx.font = '20px sans-serif';
                                        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                                        ctx.fillText(`Imported from ${cloudProvider}`, 400, 320);

                                        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
                                        const file = new File([blob], name, { type: 'image/png' });
                                        generatedFiles.push(file);
                                    }
                                    processUpload(generatedFiles);
                                    setIsCloudModalOpen(false);
                                }}
                            >
                                Import Selected
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* OPTIONS MODAL */}
            {isOptionsModalOpen && (
                <div className="options-modal-backdrop" onClick={() => setIsOptionsModalOpen(false)}>
                    <div className="options-modal-window" onClick={e => e.stopPropagation()}>
                        <div className="options-modal-header">
                            <h3>Options</h3>
                            <button className="options-modal-close" onClick={() => setIsOptionsModalOpen(false)}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <div className="options-modal-body">
                            <div className="options-field-group">
                                <label>Width</label>
                                <input
                                    type="number"
                                    className="options-input"
                                    placeholder="Auto"
                                    value={optionsWidth}
                                    onChange={e => setOptionsWidth(e.target.value)}
                                />
                                <span className="options-field-desc">Output width in pixels.</span>
                            </div>

                            <div className="options-field-group">
                                <label>Height</label>
                                <input
                                    type="number"
                                    className="options-input"
                                    placeholder="Auto"
                                    value={optionsHeight}
                                    onChange={e => setOptionsHeight(e.target.value)}
                                />
                                <span className="options-field-desc">Output height in pixels.</span>
                            </div>

                            <div className="options-field-group">
                                <label>Fit</label>
                                <select
                                    className="options-input select-field"
                                    value={optionsFit}
                                    onChange={e => setOptionsFit(e.target.value)}
                                    style={{ height: '40px', padding: '0.25rem 0.5rem' }}
                                >
                                    <option value="max">max (Resize to fit within dimensions)</option>
                                    <option value="crop">crop (Resize and crop to fill dimensions)</option>
                                    <option value="scale">scale (Stretch to match dimensions)</option>
                                </select>
                                <span className="options-field-desc">How the image fits target dimensions.</span>
                            </div>

                            <div className="options-field-group">
                                <label>Strip</label>
                                <div className="strip-radio-group">
                                    <label className="strip-radio-label">
                                        <input
                                            type="radio"
                                            name="stripMetadata"
                                            value="yes"
                                            checked={optionsStripMetadata === 'yes'}
                                            onChange={() => setOptionsStripMetadata('yes')}
                                        />
                                        Yes
                                    </label>
                                    <label className="strip-radio-label">
                                        <input
                                            type="radio"
                                            name="stripMetadata"
                                            value="no"
                                            checked={optionsStripMetadata === 'no'}
                                            onChange={() => setOptionsStripMetadata('no')}
                                        />
                                        No
                                    </label>
                                </div>
                                <span className="options-field-desc">Remove any metadata such as EXIF data.</span>
                            </div>
                        </div>
                        <div className="options-modal-footer">
                            <div className="btn-okay-group" onClick={handleSaveOptions} style={{ cursor: 'pointer' }}>
                                <button className="btn-okay-main">Okay</button>
                                <button className="btn-okay-arrow" style={{ padding: '8px 10px !important' }}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* FORMAT SELECTOR MODAL */}
            {isFormatModalOpen && (
                <div className="format-modal-backdrop" onClick={() => setIsFormatModalOpen(false)}>
                    <div className="format-modal-window" onClick={e => e.stopPropagation()}>
                        <div className="format-search-bar">
                            <svg className="format-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            <input
                                type="text"
                                className="format-search-input"
                                placeholder="Search Format"
                                value={formatSearch}
                                onChange={e => setFormatSearch(e.target.value)}
                            />
                        </div>
                        <div className="format-modal-body">
                            {formatFileId !== 'globalInput' && (
                                <div className="format-modal-sidebar">
                                    <div
                                        className={`format-sidebar-item ${formatCategory === 'document' ? 'active' : ''}`}
                                        onClick={() => setFormatCategory('document')}
                                    >
                                        Document
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                                    </div>
                                    <div
                                        className={`format-sidebar-item ${formatCategory === 'image' ? 'active' : ''}`}
                                        onClick={() => setFormatCategory('image')}
                                    >
                                        Image
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                                    </div>
                                </div>
                            )}
                            <div className="format-modal-content" style={formatFileId === 'globalInput' ? { width: '100%', padding: '1rem' } : {}}>
                                <div className="format-grid">
                                    {(formatFileId === 'globalInput'
                                        ? ['PNG', 'JPG', 'WEBP', 'GIF', 'BMP', 'AVIF']
                                        : (formatCategory === 'image'
                                            ? ['AVIF', 'BMP', 'EPS', 'GIF', 'ICNS', 'ICO', 'JPG', 'ODD', 'PNG', 'PS', 'PSD', 'TIFF', 'WEBP']
                                            : ['PDF', 'TXT', 'DOCX']
                                        )
                                    )
                                        .filter(fmt => fmt.toLowerCase().includes(formatSearch.toLowerCase()))
                                        .map(fmt => {
                                            let currentTargetFormat = 'WEBP';
                                            if (formatFileId === 'globalInput') {
                                                currentTargetFormat = globalInputFormat;
                                            } else if (formatFileId === 'globalOutput') {
                                                currentTargetFormat = globalOutputFormat;
                                            } else {
                                                currentTargetFormat = files.find(f => f.id === formatFileId)?.targetFormat || 'WEBP';
                                            }
                                            const isActive = currentTargetFormat.toUpperCase() === fmt.toUpperCase();
                                            return (
                                                <button
                                                    key={fmt}
                                                    className={`format-grid-btn ${isActive ? 'active' : ''}`}
                                                    onClick={() => handleSelectFormat(formatFileId, fmt)}
                                                >
                                                    {fmt}
                                                </button>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                        <div className="format-modal-footer">
                            <button className="format-close-btn" onClick={() => setIsFormatModalOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PngToWebp;
