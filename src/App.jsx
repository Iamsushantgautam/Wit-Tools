import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';

// Tools
import ImgToPdf from './Tools/ImgToPdf/ImgToPdf';
import QrGenerator from './Tools/QrGenerator/QrGenerator';
import BgRemover from './Tools/BgRemover/BgRemover';
import ImgCompressor from './Tools/ImgCompressor/ImgCompressor';
import PdfCompressor from './Tools/PdfCompressor/PdfCompressor';
import Watermark from './Tools/Watermark/Watermark';
import PdfSecurity from './Tools/PdfSecurity/PdfSecurity';
import ProfilePhotoMaker from './Tools/ProfilePhotoMaker/ProfilePhotoMaker';
import ImgResizer from './Tools/ImgResizer/ImgResizer';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/img-to-pdf" element={<ImgToPdf />} />
          <Route path="/img-resizer" element={<ImgResizer />} />
          <Route path="/img-compressor" element={<ImgCompressor />} />
          <Route path="/pdf-compressor" element={<PdfCompressor />} />
          <Route path="/watermark" element={<Watermark />} />
          <Route path="/pdf-security" element={<PdfSecurity />} />
          <Route path="/profile-maker" element={<ProfilePhotoMaker />} />
          <Route path="/qr-generator" element={<QrGenerator />} />
          <Route path="/bg-remover" element={<BgRemover />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
