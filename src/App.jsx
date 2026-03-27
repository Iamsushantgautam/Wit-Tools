import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import ScrollToTop from './components/ScrollToTop';
import Home from './components/Home/Home';

// Tools
import ImgToPdf from './Tools/ImgToPdf/ImgToPdf';
import QrGenerator from './Tools/QrGenerator/QrGenerator';
import BgRemover from './Tools/BgRemover/BgRemover';
import ImgCompressor from './Tools/ImgCompressor/ImgCompressor';
import PdfCompressor from './Tools/PdfCompressor/PdfCompressor';
import PdfMerge from './Tools/PdfMerge/PdfMerge';
import PdfSplit from './Tools/PdfSplit/PdfSplit';
import Watermark from './Tools/Watermark/Watermark';
import ImgConverter from './Tools/ImgConverter/ImgConverter';
import PdfSecurity from './Tools/PdfSecurity/PdfSecurity';
import ProfilePhotoMaker from './Tools/ProfilePhotoMaker/ProfilePhotoMaker';
import ImgResizer from './Tools/ImgResizer/ImgResizer';
import ImgOptimizer from './Tools/ImgOptimizer/ImgOptimizer';
import PdfToImg from './Tools/PdfToImg/PdfToImg';
import PdfPageNumber from './Tools/PdfPageNumber/PdfPageNumber';
import PrivacyPolicy from './components/Legal/PrivacyPolicy';
import Terms from './components/Legal/Terms';
import ShopifyDev from './components/Shopify/ShopifyDev';
import NotFound from './components/NotFound/NotFound';

import './App.css';


function App() {
  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Contact />} />
          <Route path="/img-to-pdf" element={<ImgToPdf />} />
          <Route path="/img-resizer" element={<ImgResizer />} />
          <Route path="/img-optimizer" element={<ImgOptimizer />} />
          <Route path="/img-compressor" element={<ImgCompressor />} />
          <Route path="/pdf-compressor" element={<PdfCompressor />} />
          <Route path="/pdf-merge" element={<PdfMerge />} />
          <Route path="/pdf-split" element={<PdfSplit />} />
          <Route path="/watermark" element={<Watermark />} />
          <Route path="/img-converter" element={<ImgConverter />} />
          <Route path="/pdf-security" element={<PdfSecurity />} />
          <Route path="/profile-maker" element={<ProfilePhotoMaker />} />
          <Route path="/qr-generator" element={<QrGenerator />} />
          <Route path="/bg-remover" element={<BgRemover />} />
          <Route path="/pdf-to-img" element={<PdfToImg />} />
          <Route path="/pdf-page-number" element={<PdfPageNumber />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/shopify-dev" element={<ShopifyDev />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}


export default App;
