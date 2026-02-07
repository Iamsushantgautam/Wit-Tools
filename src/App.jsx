import { Routes, Route, Link } from 'react-router-dom';
import ImgToPdf from './Tools/ImgToPdf/ImgToPdf';
// import PdfToImg from './Tools/PdfToImg/PdfToImg';
import QrGenerator from './Tools/QrGenerator/QrGenerator';
import BgRemover from './Tools/BgRemover/BgRemover';
import ImgCompressor from './Tools/ImgCompressor/ImgCompressor'; // Import new tool
import PdfCompressor from './Tools/PdfCompressor/PdfCompressor'; // New Tool
import Watermark from './Tools/Watermark/Watermark'; // New Tool
import PdfSecurity from './Tools/PdfSecurity/PdfSecurity'; // New Tool
import ProfilePhotoMaker from './Tools/ProfilePhotoMaker/ProfilePhotoMaker'; // New Tool
import './App.css';

// Simple Icon Components (SVG)
const PdfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const QrIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5A2.25 2.25 0 006 10.5h4.5a2.25 2.25 0 002.25-2.25v-4.5A2.25 2.25 0 0010.5 1.5H6a2.25 2.25 0 00-2.25 2.25zM13.5 3.75v4.5A2.25 2.25 0 0015.75 10.5h4.5a2.25 2.25 0 002.25-2.25v-4.5A2.25 2.25 0 0020.25 1.5h-4.5A2.25 2.25 0 0013.5 3.75zM3.75 15.75v4.5A2.25 2.25 0 006 22.5h4.5A2.25 2.25 0 0012.75 20.25v-4.5A2.25 2.25 0 0010.5 13.5H6A2.25 2.25 0 003.75 15.75zM16.5 15.75v3m0 3v.75m3-.75v.75m0-3.75v3m0-.75h-3m3 0h.75" />
  </svg>
);

const BgIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M5.636 5.636l3.536 3.536m0 5.656l-3.536 3.536M8 4h8M4 8v8m16-8v8M8 20h8" opacity="0.4" />
  </svg>
);

const ImgIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

const CompressIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" />
  </svg>
);

const WatermarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
  </svg>
);

const SecurityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);


function App() {
  return (
    <div className="app-container">
      <nav className="main-nav">
        <h1>
          <span style={{ color: '#0b72e6' }}>Wit</span> Tools
        </h1>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/img-to-pdf" className="nav-link">Img to PDF</Link>
          {/* <Link to="/pdf-to-img" className="nav-link">PDF to Img</Link> */}
          <Link to="/img-compressor" className="nav-link">Compress</Link>
          <Link to="/watermark" className="nav-link">Watermark</Link>
          <Link to="/profile-maker" className="nav-link">Profile Maker</Link>
          <Link to="/qr-generator" className="nav-link">QR</Link>
          <Link to="/bg-remover" className="nav-link">BG Remover</Link>
        </div>
      </nav>

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/img-to-pdf" element={<ImgToPdf />} />
          <Route path="/img-compressor" element={<ImgCompressor />} />
          <Route path="/pdf-compressor" element={<PdfCompressor />} />
          <Route path="/watermark" element={<Watermark />} />
          <Route path="/pdf-security" element={<PdfSecurity />} />
          <Route path="/profile-maker" element={<ProfilePhotoMaker />} />
          {/* <Route path="/pdf-to-img" element={<PdfToImg />} /> */}
          <Route path="/qr-generator" element={<QrGenerator />} />
          <Route path="/bg-remover" element={<BgRemover />} />
        </Routes>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Every tool you need to work with Images & PDFs</h1>
      <p className="home-subtitle">
        Every tool you need to manage your files, at your fingertips. All are 100% FREE and easy to use!
        Convert, Generate, and Edit your files with just a few clicks.
      </p>

      <div className="tool-grid">

        {/* Img to PDF */}
        <Link to="/img-to-pdf" className="tool-card">
          <div className="tool-icon-wrapper icon-blue">
            <PdfIcon />
          </div>
          <div className="tool-content">
            <h3>Image to PDF</h3>
            <p>Quickly convert images to PDFs for easy sharing.</p>
          </div>
        </Link>

        {/* Profile Photo Maker (New) */}
        <Link to="/profile-maker" className="tool-card">
          <div className="tool-icon-wrapper icon-orange">
            <UserIcon />
          </div>
          <div className="tool-content">
            <h3>Profile Pic Maker</h3>
            <p>Create pro profile photos with custom backgrounds.</p>
          </div>
        </Link>

        {/* PDF Compressor */}
        <Link to="/pdf-compressor" className="tool-card">
          <div className="tool-icon-wrapper icon-red">
            <PdfIcon />
          </div>
          <div className="tool-content">
            <h3>Compress PDF</h3>
            <p>Reduce PDF size significantly by optimizing pages.</p>
          </div>
        </Link>

        {/* Image Compressor */}
        <Link to="/img-compressor" className="tool-card">
          <div className="tool-icon-wrapper icon-green">
            <CompressIcon />
          </div>
          <div className="tool-content">
            <h3>Compress Image</h3>
            <p>Reduce image size while maintaining quality.</p>
          </div>
        </Link>

        {/* Watermark Tool */}
        <Link to="/watermark" className="tool-card">
          <div className="tool-icon-wrapper icon-blue">
            <WatermarkIcon />
          </div>
          <div className="tool-content">
            <h3>Watermark</h3>
            <p>Add text or image watermarks to Photos & PDFs.</p>
          </div>
        </Link>

        {/* PDF Security Tool */}
        <Link to="/pdf-security" className="tool-card">
          <div className="tool-icon-wrapper icon-purple">
            <SecurityIcon />
          </div>
          <div className="tool-content">
            <h3>PDF Password</h3>
            <p>Add or remove passwords from your PDF files.</p>
          </div>
        </Link>

        {/* QR Generator */}
        <Link to="/qr-generator" className="tool-card">
          <div className="tool-icon-wrapper icon-orange">
            <QrIcon />
          </div>
          <div className="tool-content">
            <h3>QR Generator</h3>
            <p>Create Custom QR codes instantly.</p>
          </div>
        </Link>

        {/* Background Remover */}
        <Link to="/bg-remover" className="tool-card">
          <div className="tool-icon-wrapper icon-purple">
            <BgIcon />
          </div>
          <div className="tool-content">
            <h3>Remove Background</h3>
            <p>Automatically remove image backgrounds with AI.</p>
          </div>
        </Link>

        {/* Coming Soon / Disabled: PDF to Img */}
        {/*
        <Link to="/pdf-to-img" className="tool-card" style={{ opacity: 0.6, pointerEvents: 'none' }}>
            <div className="tool-icon-wrapper icon-green">
                <ImgIcon />
            </div>
            <div className="tool-content">
                <h3>PDF to Image</h3>
                <p>Extract high-quality images from PDF pages. (Coming Soon)</p>
            </div>
        </Link>
        */}

      </div>
    </div>
  );
}

export default App;
