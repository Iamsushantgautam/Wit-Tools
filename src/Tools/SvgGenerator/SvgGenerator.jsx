import React, { useState, useEffect, useRef } from 'react';
import './SvgGenerator.css';

const SvgGenerator = () => {
    // Tab State
    const [activeTab, setActiveTab] = useState('waves'); // 'waves' or 'patterns'

    // Toast Notification
    const [toastMessage, setToastMessage] = useState('');
    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 2500);
    };

    // ----------------------------------------------------
    // WAVES GENERATOR STATES & ARCHITECTURE
    // ----------------------------------------------------
    const [waveLayers, setWaveLayers] = useState(3);
    const [wavePoints, setWavePoints] = useState(5); // Complexity
    const [waveAmplitude, setWaveAmplitude] = useState(80); // Height
    const [waveOpacity, setWaveOpacity] = useState(0.85); // Master Opacity
    const [isTopWave, setIsTopWave] = useState(false); // Flip Axis
    const [waveType, setWaveType] = useState('smooth'); // smooth, simple, peaks, steps, scallops
    const [smoothness, setSmoothness] = useState(75); // Smoothness percentage
    const [layerSpacing, setLayerSpacing] = useState(15); // Layer Spacing
    const [direction, setDirection] = useState('vertical'); // vertical, horizontal, diagonal
    const [randomSeed, setRandomSeed] = useState(1);
    
    // Animation tick state
    const [animate, setAnimate] = useState(false);

    // Color & Fill states
    const [fillType, setFillType] = useState('gradient'); // solid, gradient, rainbow
    const [color1, setColor1] = useState('#4f46e5'); // var(--primary) Indigo
    const [color2, setColor2] = useState('#10b981'); // var(--secondary) Emerald
    const [canvasWidth, setCanvasWidth] = useState(1440); // 800px, 1200px, 1440px, 1920px

    // Animation Effect Loop (60fps requestAnimationFrame)
    useEffect(() => {
        if (!animate) return;
        let animId;
        const tick = () => {
            setRandomSeed(prev => (prev + 0.006) % 100);
            animId = requestAnimationFrame(tick);
        };
        animId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animId);
    }, [animate]);

    // Wave Presets Configuration
    const presets = [
        { id: 'SMOOT', name: 'Smooth', layers: 3, points: 5, amplitude: 60, smoothness: 80, spacing: 15, type: 'smooth', desc: 'Classic flowing curves' },
        { id: 'GENTL', name: 'Gentle', layers: 2, points: 4, amplitude: 35, smoothness: 90, spacing: 10, type: 'simple', desc: 'Light symmetrical waves' },
        { id: 'FLOWI', name: 'Flowing', layers: 4, points: 6, amplitude: 80, smoothness: 75, spacing: 18, type: 'smooth', desc: 'Deep fluid layers' },
        { id: 'SUBTL', name: 'Subtle', layers: 2, points: 3, amplitude: 20, smoothness: 95, spacing: 8, type: 'simple', desc: 'Very soft flat waves' },
        { id: 'LAYER', name: 'Layered', layers: 5, points: 5, amplitude: 70, smoothness: 65, spacing: 20, type: 'smooth', desc: 'Dense stacked curves' },
        { id: 'CURVE', name: 'Curved', layers: 3, points: 7, amplitude: 90, smoothness: 80, spacing: 15, type: 'scallops', desc: 'Bubbly scalloped arches' },
        { id: 'STRIP', name: 'Striped', layers: 3, points: 5, amplitude: 55, smoothness: 80, spacing: 12, type: 'smooth', fillType: 'striped', color1: '#a5b4fc', color2: '#2563eb', desc: 'Vertical striped color gradient' },
        { id: 'SOFT', name: 'Soft', layers: 3, points: 5, amplitude: 50, smoothness: 85, spacing: 12, type: 'smooth', desc: 'Soft blended transitions' }
    ];

    const applyPreset = (preset) => {
        setWaveLayers(preset.layers);
        setWavePoints(preset.points);
        setWaveAmplitude(preset.amplitude);
        setSmoothness(preset.smoothness);
        setLayerSpacing(preset.spacing);
        setWaveType(preset.type);
        if (preset.fillType) {
            setFillType(preset.fillType);
        } else {
            setFillType('gradient');
        }
        if (preset.color1) {
            setColor1(preset.color1);
        }
        if (preset.color2) {
            setColor2(preset.color2);
        }
        showToast(`✨ Preset "${preset.name}" applied!`);
    };

    // Calculate wave path
    const generateWavePath = (layerIndex) => {
        const width = 900;
        const height = 300;
        const points = [];
        const step = width / (wavePoints - 1);
        
        // Add random variance using sine/cosine equations and layer shift seed
        const layerSeed = randomSeed + (layerIndex * 15.7);
        
        for (let i = 0; i < wavePoints; i++) {
            const x = i * step;
            // Generate deterministic curves based on layerSeed (simple sine vs organic waves)
            const waveFactor = waveType === 'simple' 
                ? Math.sin(i + layerSeed) 
                : Math.sin(i * 1.2 + layerSeed) * 0.4 + Math.cos(i * 0.8 - layerSeed) * 0.6;
            
            // Base height adjusted by flip axis and spacing vertical stacking offsets
            const baseHeight = isTopWave ? (height * 0.25) : (height * 0.75);
            // Dynamic vertical shift per layer
            const spacingOffset = (layerIndex * layerSpacing) - (waveLayers * layerSpacing * 0.5);
            const y = baseHeight + (waveFactor * waveAmplitude) + spacingOffset;
            const constrainedY = Math.max(0, Math.min(height, y));
            points.push({ x, y: constrainedY });
        }
        
        // Build path instructions
        let d = `M 0,${isTopWave ? 0 : height} L ${points[0].x},${points[0].y}`;
        
        if (waveType === 'smooth' || waveType === 'simple') {
            for (let i = 0; i < points.length - 1; i++) {
                const p0 = points[i];
                const p1 = points[i + 1];
                // Smoothness factor handles bezier controls spacing
                const sFactor = smoothness / 100;
                const cp1x = p0.x + (step * sFactor) / 2;
                const cp1y = p0.y;
                const cp2x = p1.x - (step * sFactor) / 2;
                const cp2y = p1.y;
                d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
            }
        } else if (waveType === 'peaks') {
            for (let i = 1; i < points.length; i++) {
                d += ` L ${points[i].x},${points[i].y}`;
            }
        } else if (waveType === 'steps') {
            for (let i = 0; i < points.length - 1; i++) {
                const p0 = points[i];
                const p1 = points[i + 1];
                const midX = (p0.x + p1.x) / 2;
                d += ` L ${midX},${p0.y} L ${midX},${p1.y} L ${p1.x},${p1.y}`;
            }
        } else if (waveType === 'scallops') {
            for (let i = 0; i < points.length - 1; i++) {
                const p0 = points[i];
                const p1 = points[i + 1];
                const midX = (p0.x + p1.x) / 2;
                const cpY = isTopWave ? Math.max(0, Math.min(height, Math.min(p0.y, p1.y) - waveAmplitude * 0.5)) 
                                      : Math.max(0, Math.min(height, Math.max(p0.y, p1.y) + waveAmplitude * 0.5));
                d += ` Q ${midX},${cpY} ${p1.x},${p1.y}`;
            }
        }
        
        d += ` L ${width},${isTopWave ? 0 : height} Z`;
        return d;
    };

    // Helper to interpolate between two hex colors for segmented / striped waves
    const interpolateColor = (colorStart, colorEnd, factor) => {
        const cS = colorStart.startsWith('#') ? colorStart : '#4f46e5';
        const cE = colorEnd.startsWith('#') ? colorEnd : '#10b981';
        
        const r1 = parseInt(cS.substring(1, 3), 16);
        const g1 = parseInt(cS.substring(3, 5), 16);
        const b1 = parseInt(cS.substring(5, 7), 16);
        
        const r2 = parseInt(cE.substring(1, 3), 16);
        const g2 = parseInt(cE.substring(3, 5), 16);
        const b2 = parseInt(cE.substring(5, 7), 16);
        
        const r = Math.round(r1 + factor * (r2 - r1));
        const g = Math.round(g1 + factor * (g2 - g1));
        const b = Math.round(b1 + factor * (b2 - b1));
        
        const toHex = (val) => val.toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    // Helper to get fill colors per layer
    const getLayerFill = (index) => {
        if (fillType === 'solid') {
            return color1;
        } else if (fillType === 'gradient') {
            return `url(#wave-grad-${index})`;
        } else if (fillType === 'rainbow') {
            const hue = (index * (360 / waveLayers)) % 360;
            return `hsl(${hue}, 85%, 55%)`;
        }
        return color1;
    };

    // Defs generation for gradients & striped clip-paths
    const getDefsMarkup = () => {
        let defs = '';
        if (fillType === 'gradient') {
            for (let i = 0; i < waveLayers; i++) {
                defs += `    <linearGradient id="wave-grad-${i}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>\n`;
            }
        } else if (fillType === 'striped') {
            for (let i = 0; i < waveLayers; i++) {
                const path = generateWavePath(i);
                defs += `    <clipPath id="wave-clip-${i}">
      <path d="${path}" />
    </clipPath>\n`;
            }
        }
        return defs ? `  <defs>\n${defs}  </defs>\n` : '';
    };

    // Calculate transformation groups for horizontal/diagonal rotation
    const getTransformGroup = () => {
        if (direction === 'horizontal') return 'transform="rotate(90 450 150) scale(0.66 1.5)"';
        if (direction === 'diagonal') return 'transform="rotate(30 450 150) scale(1.3)"';
        return '';
    };

    // Generate Full Waves SVG Code
    const getWavesSvgCode = () => {
        const width = 900;
        const height = 300;
        const defs = getDefsMarkup();
        const transform = getTransformGroup();
        
        let layersMarkup = '';
        for (let i = 0; i < waveLayers; i++) {
            const path = generateWavePath(i);
            const fill = getLayerFill(i);
            const opacityVal = waveOpacity - (i * (waveOpacity / (waveLayers + 1)));
            const finalOpacity = Math.max(0.15, opacityVal);
            
            if (fillType === 'striped') {
                layersMarkup += `    <g clip-path="url(#wave-clip-${i})" opacity="${finalOpacity.toFixed(2)}">\n`;
                // Render 75 vertical color bands / stripes
                const numBars = 75;
                const barWidth = 900 / numBars;
                for (let j = 0; j < numBars; j++) {
                    const factor = j / (numBars - 1);
                    // Create subtle 3D layered offsets
                    const shiftedColor1 = interpolateColor(color1, '#ffffff', i * 0.05);
                    const shiftedColor2 = interpolateColor(color2, '#000000', i * 0.05);
                    const col = interpolateColor(shiftedColor1, shiftedColor2, factor);
                    layersMarkup += `      <rect x="${j * barWidth}" y="0" width="${barWidth + 0.5}" height="300" fill="${col}" />\n`;
                }
                layersMarkup += `    </g>\n`;
            } else {
                layersMarkup += `    <path d="${path}" fill="${fill}" opacity="${finalOpacity.toFixed(2)}" />\n`;
            }
        }

        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">
${defs}  <g ${transform}>
${layersMarkup}  </g>
</svg>`;
    };

    // ----------------------------------------------------
    // SEAMLESS PATTERNS STATES & GENERATION
    // ----------------------------------------------------
    const [patternType, setPatternType] = useState('polka-dots');
    const [patternSize, setPatternSize] = useState(40);
    const [patternStroke, setPatternStroke] = useState(1.5);
    const [patternDotRadius, setPatternDotRadius] = useState(4);
    const [bgColor, setBgColor] = useState('#f8fafc');
    const [patternColor, setPatternColor] = useState('#4f46e5');

    const getPatternMarkup = () => {
        const size = patternSize;
        const strokeWidth = patternStroke;
        const radius = patternDotRadius;
        
        switch (patternType) {
            case 'polka-dots':
                return `<pattern id="p-dot" width="${size}" height="${size}" patternUnits="userSpaceOnUse">
      <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="${patternColor}" />
    </pattern>`;
            case 'graph-grid':
                return `<pattern id="p-grid" width="${size}" height="${size}" patternUnits="userSpaceOnUse">
      <path d="M ${size} 0 L 0 0 0 ${size}" fill="none" stroke="${patternColor}" stroke-width="${strokeWidth}" />
    </pattern>`;
            case 'isometric-3d':
                const isoHeight = parseFloat((size * 1.732).toFixed(2));
                const midX = size / 2;
                const quarterHeight = parseFloat((isoHeight / 4).toFixed(2));
                const threeQuarterHeight = parseFloat((isoHeight * 0.75).toFixed(2));
                return `<pattern id="p-iso" width="${size}" height="${isoHeight}" patternUnits="userSpaceOnUse">
      <path d="M 0 0 L ${midX} ${quarterHeight} L ${size} 0 M ${midX} ${quarterHeight} L ${midX} ${threeQuarterHeight} M 0 ${isoHeight / 2} L ${midX} ${threeQuarterHeight} L ${size} ${isoHeight / 2} M 0 ${isoHeight / 2} L 0 0 M ${size} ${isoHeight / 2} L ${size} 0" fill="none" stroke="${patternColor}" stroke-width="${strokeWidth}" />
    </pattern>`;
            case 'waves-stripe':
                const half = size / 2;
                return `<pattern id="p-stripe" width="${size}" height="${size}" patternUnits="userSpaceOnUse">
      <path d="M 0 ${half} Q ${size / 4} ${half - 10}, ${half} ${half} T ${size} ${half}" fill="none" stroke="${patternColor}" stroke-width="${strokeWidth}" />
    </pattern>`;
            default:
                return '';
        }
    };

    const getPatternId = () => {
        switch (patternType) {
            case 'polka-dots': return 'p-dot';
            case 'graph-grid': return 'p-grid';
            case 'isometric-3d': return 'p-iso';
            case 'waves-stripe': return 'p-stripe';
            default: return 'pattern';
        }
    };

    const getPatternSvgCode = () => {
        const markup = getPatternMarkup();
        const patId = getPatternId();
        return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <defs>
    ${markup}
  </defs>
  <rect width="100%" height="100%" fill="${bgColor}" />
  <rect width="100%" height="100%" fill="url(#${patId})" />
</svg>`;
    };

    const getPatternCssCode = () => {
        const svgCode = getPatternSvgCode();
        const base64Svg = btoa(svgCode);
        return `background-color: ${bgColor};\nbackground-image: url("data:image/svg+xml;base64,${base64Svg}");`;
    };

    // ----------------------------------------------------
    // ACTIONS & EXPORTS (SVG, PNG, CSS)
    // ----------------------------------------------------
    const handleCopySvg = () => {
        const code = activeTab === 'waves' ? getWavesSvgCode() : getPatternSvgCode();
        navigator.clipboard.writeText(code);
        showToast('📋 SVG Code copied to clipboard!');
    };

    const handleCopyCss = () => {
        if (activeTab === 'waves') return;
        const code = getPatternCssCode();
        navigator.clipboard.writeText(code);
        showToast('🎨 CSS Background properties copied!');
    };

    const handleDownloadSvg = () => {
        const code = activeTab === 'waves' ? getWavesSvgCode() : getPatternSvgCode();
        const blob = new Blob([code], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = activeTab === 'waves' ? 'vector-waves.svg' : 'vector-pattern.svg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showToast('💾 SVG downloaded successfully!');
    };

    // PNG Client-Side Render & Export
    const handleDownloadPng = () => {
        if (activeTab !== 'waves') return;
        
        const svgElement = document.querySelector('.waves-canvas-box svg');
        if (!svgElement) {
            showToast('⚠️ Preview not found!');
            return;
        }

        const svgString = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const URL = window.URL || window.webkitURL || window;
        const blobURL = URL.createObjectURL(svgBlob);
        
        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement('canvas');
            // Scale according to user chosen Canvas Export Width
            canvas.width = canvasWidth;
            canvas.height = canvasWidth * (300 / 900); // preserve 3:1 aspect ratio
            
            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            
            const png = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = png;
            link.download = 'organic-waves.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobURL);
            showToast('📸 High-resolution PNG downloaded!');
        };
        image.src = blobURL;
    };

    return (
        <div className="tool-container svg-generator-page studio-brand-theme">
            <div className="tool-header-card">
                <h2>SVG Wave & Pattern Studio</h2>
                <p>Design layered brand vectors, mathematical waves, and seamless background patterns.</p>
            </div>

            {/* Notification Toast */}
            {toastMessage && (
                <div className="svg-studio-toast glow-brand-toast">
                    {toastMessage}
                </div>
            )}

            {/* Studio Navigation Tabs */}
            <div className="studio-tabs">
                <button 
                    className={`studio-tab-btn ${activeTab === 'waves' ? 'active' : ''}`}
                    onClick={() => setActiveTab('waves')}
                >
                    🌊 Organic Wave Studio
                </button>
                <button 
                    className={`studio-tab-btn ${activeTab === 'patterns' ? 'active' : ''}`}
                    onClick={() => setActiveTab('patterns')}
                >
                    🎨 Seamless Pattern Builder
                </button>
            </div>

            <div className="studio-workspace">
                {/* Left Side: Controls Sidebar */}
                <div className="studio-sidebar tool-card">
                    {activeTab === 'waves' ? (
                        /* WAVES CONTROLS GRID */
                        <div className="controls-group animate-fade">
                            
                            {/* Shape Presets Grid */}
                            <div className="control-item">
                                <label className="glow-title">WAVE PRESETS</label>
                                <div className="presets-layout-grid">
                                    {presets.map((preset) => (
                                        <button 
                                            key={preset.id}
                                            className="preset-card-capsule"
                                            onClick={() => applyPreset(preset)}
                                        >
                                            {/* Mini Wave Vector Thumbnail */}
                                            <svg viewBox="0 0 80 25" className="preset-thumbnail">
                                                {preset.type === 'smooth' && preset.id !== 'STRIP' && <path d="M 0,15 C 20,5 30,20 50,10 C 65,5 70,12 80,8" fill="none" stroke="currentColor" strokeWidth="2" />}
                                                {preset.type === 'simple' && <path d="M 0,12 C 20,2 40,22 60,2 C 70,12 80,12 80,12" fill="none" stroke="currentColor" strokeWidth="2" />}
                                                {preset.type === 'peaks' && <path d="M 0,15 L 20,5 L 40,20 L 60,5 L 80,15" fill="none" stroke="currentColor" strokeWidth="2" />}
                                                {preset.type === 'steps' && <path d="M 0,20 L 20,20 L 20,8 L 40,8 L 40,20 L 60,20 L 60,8 L 80,8" fill="none" stroke="currentColor" strokeWidth="2" />}
                                                {preset.type === 'scallops' && <path d="M 0,15 Q 15,2 30,15 Q 45,2 60,15 Q 70,5 80,12" fill="none" stroke="currentColor" strokeWidth="2" />}
                                                {preset.id === 'STRIP' && (
                                                    <g>
                                                        <clipPath id={`thumb-clip-${preset.id}`}>
                                                            <path d="M 0,15 C 20,5 30,20 50,10 C 65,5 70,12 80,8 L 80,25 L 0,25 Z" />
                                                        </clipPath>
                                                        <g clipPath={`url(#thumb-clip-${preset.id})`}>
                                                            <rect x="0" y="0" width="10" height="25" fill="#a5b4fc" />
                                                            <rect x="10" y="0" width="10" height="25" fill="#93c5fd" />
                                                            <rect x="20" y="0" width="10" height="25" fill="#60a5fa" />
                                                            <rect x="30" y="0" width="10" height="25" fill="#3b82f6" />
                                                            <rect x="40" y="0" width="10" height="25" fill="#2563eb" />
                                                            <rect x="50" y="0" width="10" height="25" fill="#1d4ed8" />
                                                            <rect x="60" y="0" width="10" height="25" fill="#1e40af" />
                                                            <rect x="70" y="0" width="10" height="25" fill="#1e3a8a" />
                                                        </g>
                                                        <path d="M 0,15 C 20,5 30,20 50,10 C 65,5 70,12 80,8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                                    </g>
                                                )}
                                            </svg>
                                            <span className="preset-code">{preset.id}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Wave Direction toggle */}
                            <div className="control-item">
                                <label>DIRECTION</label>
                                <div className="toggle-container layout-three">
                                    <button 
                                        className={`toggle-btn ${direction === 'vertical' ? 'active' : ''}`}
                                        onClick={() => setDirection('vertical')}
                                    >
                                        VERTICAL
                                    </button>
                                    <button 
                                        className={`toggle-btn ${direction === 'horizontal' ? 'active' : ''}`}
                                        onClick={() => setDirection('horizontal')}
                                    >
                                        HORIZONTAL
                                    </button>
                                    <button 
                                        className={`toggle-btn ${direction === 'diagonal' ? 'active' : ''}`}
                                        onClick={() => setDirection('diagonal')}
                                    >
                                        DIAGONAL
                                    </button>
                                </div>
                            </div>

                            {/* Complexity Slider */}
                            <div className="control-item">
                                <div className="label-row">
                                    <label>COMPLEXITY</label>
                                    <span className="green-bubble">{wavePoints - 1}</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="3" 
                                    max="12" 
                                    value={wavePoints} 
                                    onChange={(e) => setWavePoints(parseInt(e.target.value))}
                                    className="custom-range"
                                />
                            </div>

                            {/* Height Slider */}
                            <div className="control-item">
                                <div className="label-row">
                                    <label>HEIGHT</label>
                                    <span className="green-bubble">{waveAmplitude}</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="10" 
                                    max="180" 
                                    value={waveAmplitude} 
                                    onChange={(e) => setWaveAmplitude(parseInt(e.target.value))}
                                    className="custom-range"
                                />
                            </div>

                            {/* Layers Slider */}
                            <div className="control-item">
                                <div className="label-row">
                                    <label>LAYERS</label>
                                    <span className="green-bubble">{waveLayers}</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="1" 
                                    max="6" 
                                    value={waveLayers} 
                                    onChange={(e) => setWaveLayers(parseInt(e.target.value))}
                                    className="custom-range"
                                />
                            </div>

                            {/* Smoothness Slider */}
                            <div className="control-item">
                                <div className="label-row">
                                    <label>SMOOTHNESS</label>
                                    <span className="green-bubble">{smoothness}%</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    value={smoothness} 
                                    onChange={(e) => setSmoothness(parseInt(e.target.value))}
                                    className="custom-range"
                                />
                            </div>

                            {/* Layer Spacing Slider */}
                            <div className="control-item">
                                <div className="label-row">
                                    <label>LAYER SPACING</label>
                                    <span className="green-bubble">{layerSpacing}</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="50" 
                                    value={layerSpacing} 
                                    onChange={(e) => setLayerSpacing(parseInt(e.target.value))}
                                    className="custom-range"
                                />
                            </div>

                            {/* Color & Fill */}
                            <div className="control-item border-top-divider">
                                <label className="spacing-top">COLOR & FILL</label>
                                <div className="toggle-container layout-four">
                                    <button 
                                        className={`toggle-btn ${fillType === 'solid' ? 'active' : ''}`}
                                        onClick={() => setFillType('solid')}
                                    >
                                        SOLID
                                    </button>
                                    <button 
                                        className={`toggle-btn ${fillType === 'gradient' ? 'active' : ''}`}
                                        onClick={() => setFillType('gradient')}
                                    >
                                        GRADIENT
                                    </button>
                                    <button 
                                        className={`toggle-btn ${fillType === 'striped' ? 'active' : ''}`}
                                        onClick={() => setFillType('striped')}
                                    >
                                        STRIPED
                                    </button>
                                    <button 
                                        className={`toggle-btn ${fillType === 'rainbow' ? 'active' : ''}`}
                                        onClick={() => setFillType('rainbow')}
                                    >
                                        RAINBOW
                                    </button>
                                </div>
                            </div>

                            {fillType !== 'rainbow' && (
                                <div className="color-pickers-split animate-fade">
                                    <div className="control-item">
                                        <label>COLOR 1</label>
                                        <div className="color-field-capsule">
                                            <input 
                                                type="color" 
                                                value={color1} 
                                                onChange={(e) => setColor1(e.target.value)}
                                            />
                                            <span className="hex-indicator">{color1.toUpperCase()}</span>
                                        </div>
                                    </div>
                                    {fillType === 'gradient' && (
                                        <div className="control-item">
                                            <label>COLOR 2</label>
                                            <div className="color-field-capsule">
                                                <input 
                                                    type="color" 
                                                    value={color2} 
                                                    onChange={(e) => setColor2(e.target.value)}
                                                />
                                                <span className="hex-indicator">{color2.toUpperCase()}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Extra Option Toggles */}
                            <div className="options-checkbox-row">
                                <label className="checkbox-capsule">
                                    <input 
                                        type="checkbox" 
                                        checked={isTopWave} 
                                        onChange={(e) => setIsTopWave(e.target.checked)}
                                    />
                                    <span className="checkbox-custom"></span>
                                    FLIP AXIS
                                </label>
                                <label className="checkbox-capsule">
                                    <input 
                                        type="checkbox" 
                                        checked={animate} 
                                        onChange={(e) => setAnimate(e.target.checked)}
                                    />
                                    <span className="checkbox-custom"></span>
                                    ANIMATE
                                </label>
                            </div>

                            {/* Master Opacity Slider */}
                            <div className="control-item">
                                <div className="label-row">
                                    <label>MASTER OPACITY</label>
                                    <span className="green-bubble">{Math.round(waveOpacity * 100)}%</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="0.1" 
                                    max="1.0" 
                                    step="0.05"
                                    value={waveOpacity} 
                                    onChange={(e) => setWaveOpacity(parseFloat(e.target.value))}
                                    className="custom-range"
                                />
                            </div>

                            {/* Canvas Width Export options */}
                            <div className="control-item">
                                <label>CANVAS WIDTH (EXPORT)</label>
                                <div className="toggle-container size-options-grid">
                                    {[800, 1200, 1440, 1920].map((width) => (
                                        <button 
                                            key={width}
                                            className={`toggle-btn ${canvasWidth === width ? 'active' : ''}`}
                                            onClick={() => setCanvasWidth(width)}
                                        >
                                            {width}px
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* PATTERN CONTROLS */
                        <div className="controls-group animate-fade">
                            <h3>Pattern Configurations</h3>

                            <div className="control-item">
                                <label>Grid Style</label>
                                <select 
                                    value={patternType}
                                    onChange={(e) => setPatternType(e.target.value)}
                                    className="studio-select"
                                >
                                    <option value="polka-dots">⚫ Polka Dots</option>
                                    <option value="graph-grid">📐 Engineering Graph Grid</option>
                                    <option value="isometric-3d">📦 3D Isometric Grid</option>
                                    <option value="waves-stripe">〰️ Minimal Wave Stripe</option>
                                </select>
                            </div>

                            <div className="control-item">
                                <div className="label-row">
                                    <label>Grid Size / Spacing</label>
                                    <span className="green-bubble">{patternSize}px</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="20" 
                                    max="120" 
                                    value={patternSize} 
                                    onChange={(e) => setPatternSize(parseInt(e.target.value))}
                                    className="custom-range"
                                />
                            </div>

                            {patternType === 'polka-dots' ? (
                                <div className="control-item">
                                    <div className="label-row">
                                        <label>Dot Radius</label>
                                        <span className="green-bubble">{patternDotRadius}px</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="1" 
                                        max="15" 
                                        value={patternDotRadius} 
                                        onChange={(e) => setPatternDotRadius(parseInt(e.target.value))}
                                        className="custom-range"
                                    />
                                </div>
                            ) : (
                                <div className="control-item">
                                    <div className="label-row">
                                        <label>Stroke Thickness</label>
                                        <span className="green-bubble">{patternStroke}px</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0.5" 
                                        max="6" 
                                        step="0.5"
                                        value={patternStroke} 
                                        onChange={(e) => setPatternStroke(parseFloat(e.target.value))}
                                        className="custom-range"
                                    />
                                </div>
                            )}

                            <div className="control-item">
                                <label>Background Color</label>
                                <div className="color-field-capsule">
                                    <input 
                                        type="color" 
                                        value={bgColor} 
                                        onChange={(e) => setBgColor(e.target.value)}
                                    />
                                    <span className="hex-indicator">{bgColor.toUpperCase()}</span>
                                </div>
                            </div>

                            <div className="control-item">
                                <label>Pattern Color</label>
                                <div className="color-field-capsule">
                                    <input 
                                        type="color" 
                                        value={patternColor} 
                                        onChange={(e) => setPatternColor(e.target.value)}
                                    />
                                    <span className="hex-indicator">{patternColor.toUpperCase()}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Exporters buttons */}
                    <div className="studio-exporters">
                        {activeTab === 'waves' ? (
                            <div className="dual-exporters-row">
                                <button className="btn-primary exporter-btn download-svg-neon" onClick={handleDownloadSvg}>
                                    📥 SVG
                                </button>
                                <button className="btn-primary exporter-btn download-png-neon" onClick={handleDownloadPng}>
                                    📸 PNG
                                </button>
                            </div>
                        ) : (
                            <button className="btn-primary exporter-btn download-svg-neon" onClick={handleDownloadSvg}>
                                📥 Download SVG
                            </button>
                        )}
                        <button className="btn-secondary exporter-btn" onClick={handleCopySvg}>
                            📋 Copy SVG Source
                        </button>
                        {activeTab === 'patterns' && (
                            <button className="btn-secondary exporter-btn css-export-btn" onClick={handleCopyCss}>
                                🎨 Copy Inline CSS Code
                            </button>
                        )}
                    </div>
                </div>

                {/* Right Side: Live Canvas Area */}
                <div className="studio-preview-area">
                    <div className="preview-container tool-card">
                        <div className="preview-header">
                            <span className="preview-badge">LIVE VECTOR CANVAS</span>
                            <span className="dimensions-indicator">
                                {activeTab === 'waves' ? '900px × 300px' : 'Infinite Pattern Scaling'}
                            </span>
                        </div>
                        
                        <div className="preview-canvas-wrapper dark-canvas">
                            {activeTab === 'waves' ? (
                                <div className="waves-canvas-box" dangerouslySetInnerHTML={{ __html: getWavesSvgCode() }} />
                            ) : (
                                <div className="patterns-canvas-box" dangerouslySetInnerHTML={{ __html: getPatternSvgCode() }} />
                            )}
                        </div>
                    </div>

                    {/* SVG Code Output Preview Window */}
                    <div className="code-output-window tool-card">
                        <div className="code-header">
                            <h4>Generated SVG XML Nodes</h4>
                        </div>
                        <pre className="code-box">
                            <code>
                                {activeTab === 'waves' ? getWavesSvgCode() : getPatternSvgCode()}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SvgGenerator;
