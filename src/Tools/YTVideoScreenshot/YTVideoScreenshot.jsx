import React, { useState, useRef, useEffect } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Upload from '../../components/Common/Upload/Upload';
import './YTVideoScreenshot.css';

const YTVideoScreenshot = () => {
    const [videoFile, setVideoFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [interval, setIntervalTime] = useState(5);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [screenshots, setScreenshots] = useState([]);
    const [videoPreview, setVideoPreview] = useState(null);
    const [youtubeId, setYoutubeId] = useState(null);

    const videoRef = useRef(null);
    const canvasRef = useRef(document.createElement('canvas'));

    const extractYoutubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleFileUpload = (file) => {
        if (file) {
            const url = URL.createObjectURL(file);
            setVideoFile(file);
            setVideoPreview(url);
            setYoutubeId(null);
            setScreenshots([]);
        }
    };

    const handleUrlSubmit = (e) => {
        e.preventDefault();
        if (videoUrl) {
            const ytId = extractYoutubeId(videoUrl);
            if (ytId) {
                setYoutubeId(ytId);
                setVideoPreview(null);
                setVideoFile({ name: `youtube_${ytId}` });
            } else {
                setVideoPreview(videoUrl);
                setYoutubeId(null);
                setVideoFile({ name: 'video_from_url' });
            }
            setScreenshots([]);
        }
    };

    const captureScreenshots = async () => {
        if (!videoRef.current) return;
        
        setIsProcessing(true);
        setProgress(0);
        setScreenshots([]);
        
        const video = videoRef.current;
        const duration = video.duration;
        const captured = [];
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        for (let time = 0; time <= duration; time += interval) {
            video.currentTime = time;
            
            // Wait for the video to seek
            await new Promise((resolve) => {
                const onSeeked = () => {
                    video.removeEventListener('seeked', onSeeked);
                    resolve();
                };
                video.addEventListener('seeked', onSeeked);
            });

            // Draw current frame to canvas
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Convert to blob or dataUrl
            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            captured.push({
                time: time.toFixed(1),
                data: dataUrl
            });
            
            setProgress(Math.round((time / duration) * 100));
            setScreenshots([...captured]);
        }
        
        setIsProcessing(false);
        setProgress(100);
    };

    const downloadZip = async () => {
        if (screenshots.length === 0) return;
        
        const zip = new JSZip();
        const imgFolder = zip.folder("screenshots");
        
        screenshots.forEach((s, index) => {
            const base64Data = s.data.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
            imgFolder.file(`screenshot_${s.time}s.jpg`, base64Data, { base64: true });
        });
        
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, `${videoFile.name}_screenshots.zip`);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="tool-container yt-screenshot-container">
            <div className="tool-header-card">
                <h2>Video Screenshotter</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Capture frames from any video every X seconds and download as a ZIP.
                </p>
            </div>

            <div className="tool-card">
                {(!videoPreview && !youtubeId) ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <Upload
                            id="video-upload"
                            accept="video/*"
                            onUpload={handleFileUpload}
                            title="Upload Video File"
                            subtitle="Supports MP4, WebM, etc."
                            limitText="Client-side processing. No video is uploaded to servers."
                        />
                        
                        <div className="url-input-section" style={{ textAlign: 'center' }}>
                            <p style={{ marginBottom: '1rem', fontWeight: '600' }}>OR Paste Video URL</p>
                            <form onSubmit={handleUrlSubmit} className="input-group">
                                <input 
                                    type="text" 
                                    className="input-field" 
                                    placeholder="Paste YouTube link or direct MP4 URL"
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                />
                                <button type="submit" className="btn-primary">Load</button>
                            </form>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                For YouTube: We'll show the video, but screenshots require an uploaded file.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="video-workspace">
                        <div className="video-main-area">
                            <div className="video-preview-section">
                                {youtubeId ? (
                                    <iframe 
                                        width="100%" 
                                        height="100%" 
                                        src={`https://www.youtube.com/embed/${youtubeId}`} 
                                        title="YouTube video player" 
                                        frameBorder="0" 
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <video 
                                        ref={videoRef} 
                                        src={videoPreview} 
                                        controls 
                                        crossOrigin="anonymous"
                                    />
                                )}
                                {isProcessing && (
                                    <div className="processing-overlay">
                                        <div className="spinner"></div>
                                        <p>Capturing frames... {progress}%</p>
                                        <div className="progress-bar-container">
                                            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {screenshots.length > 0 && (
                                <div className="screenshot-grid">
                                    {screenshots.map((s, idx) => (
                                        <div key={idx} className="screenshot-item">
                                            <img src={s.data} alt={`Frame at ${s.time}s`} />
                                            <div className="screenshot-time">{formatTime(s.time)}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="controls-panel">
                            <div className="control-item">
                                <label>Interval (Seconds)</label>
                                <input 
                                    type="number" 
                                    className="input-field" 
                                    value={interval} 
                                    min="1"
                                    max="3600"
                                    onChange={(e) => setIntervalTime(parseInt(e.target.value) || 1)}
                                />
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    Capture a frame every {interval} seconds.
                                </p>
                            </div>

                            <button 
                                className="btn-primary" 
                                onClick={captureScreenshots}
                                disabled={isProcessing || youtubeId}
                            >
                                {isProcessing ? 'Capturing...' : 'Start Capturing'}
                            </button>

                            {youtubeId && (
                                <p style={{ fontSize: '0.75rem', color: '#ef4444', textAlign: 'center' }}>
                                    Automated screenshots are disabled for YouTube embeds due to security restrictions. Please upload the video file to use this feature.
                                </p>
                            )}

                            {screenshots.length > 0 && (
                                <button 
                                    className="btn-success" 
                                    onClick={downloadZip}
                                    style={{ background: '#10b981', color: '#fff' }}
                                >
                                    Download ZIP ({screenshots.length} images)
                                </button>
                            )}

                            <button 
                                className="btn-secondary" 
                                onClick={() => {
                                    setVideoPreview(null);
                                    setYoutubeId(null);
                                    setVideoFile(null);
                                    setScreenshots([]);
                                }}
                            >
                                Change Video
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default YTVideoScreenshot;
