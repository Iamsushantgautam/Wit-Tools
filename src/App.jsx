import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

// Core layout components (loaded synchronously for fast initial shell)
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './Home/Home';

import './App.css';

// Lazy-loaded pages & tools (code-split into separate lightweight chunks)
const About = lazy(() => import('./pages/About/About'));
const Founder = lazy(() => import('./pages/Founder/Founder'));
const Faq = lazy(() => import('./pages/FAQ/Faq'));
const ComingSoon = lazy(() => import('./components/ComingSoon/ComingSoon'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const Feedback = lazy(() => import('./pages/Feedback/Feedback'));

const ImgToPdf = lazy(() => import('./Tools/ImgToPdf/ImgToPdf'));
const QrGenerator = lazy(() => import('./Tools/QrGenerator/QrGenerator'));
const BgRemover = lazy(() => import('./Tools/BgRemover/BgRemover'));
const ImgCompressor = lazy(() => import('./Tools/ImgCompressor/ImgCompressor'));
const PdfCompressor = lazy(() => import('./Tools/PdfCompressor/PdfCompressor'));
const PdfMerge = lazy(() => import('./Tools/PdfMerge/PdfMerge'));
const PdfSplit = lazy(() => import('./Tools/PdfSplit/PdfSplit'));
const Watermark = lazy(() => import('./Tools/Watermark/Watermark'));
const ImgConverter = lazy(() => import('./Tools/ImgConverter/ImgConverter'));
const PdfSecurity = lazy(() => import('./Tools/PdfSecurity/PdfSecurity'));
const ProfilePhotoMaker = lazy(() => import('./Tools/ProfilePhotoMaker/ProfilePhotoMaker'));
const ImgResizer = lazy(() => import('./Tools/ImgResizer/ImgResizer'));
const ImgOptimizer = lazy(() => import('./Tools/ImgOptimizer/ImgOptimizer'));
const PdfToImg = lazy(() => import('./Tools/PdfToImg/PdfToImg'));
const PdfPageNumber = lazy(() => import('./Tools/PdfPageNumber/PdfPageNumber'));
const YTVideoScreenshot = lazy(() => import('./Tools/YTVideoScreenshot/YTVideoScreenshot'));
const SvgGenerator = lazy(() => import('./Tools/SvgGenerator/SvgGenerator'));
const PngToWebp = lazy(() => import('./Tools/PngToWebp/PngToWebp'));
const GooglDriveLinkConvertTODownoaldable = lazy(() => import('./Tools/GooglDriveLinkConvertTODownoaldable/GooglDriveLinkConvertTODownoaldable'));

const PrivacyPolicy = lazy(() => import('./pages/Legal/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Legal/Terms'));
const ShopifyDev = lazy(() => import('./Shopify/ShopifyDev'));
const ShopifyApps = lazy(() => import('./Shopify/ShopifyApps'));
const ChatGPTTools = lazy(() => import('./chatgpt-tools/ChatGPTTools'));
const NotFound = lazy(() => import('./components/NotFound/NotFound'));

const PageFallback = () => (
  <div className="page-fallback">
    <div className="app-spinner" />
  </div>
);

function App() {
  return (
    <div className="app-container">
      <Analytics />
      <ScrollToTop />
      <Navbar />
      <div className="content">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/founder" element={<Founder />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
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
            <Route path="/yt-screenshot" element={<YTVideoScreenshot />} />
            <Route path="/svg-generator" element={<SvgGenerator />} />
            <Route path="/png-to-webp" element={<PngToWebp />} />
            <Route path="/google-drive-downloader" element={<GooglDriveLinkConvertTODownoaldable />} />

            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/shopify-dev" element={<ShopifyDev />} />
            <Route path="/shopify-apps" element={<ShopifyApps />} />
            <Route path="/chatgpt-tools" element={<ChatGPTTools />} />
            <Route path="/chatgpt-secret-codes" element={<ChatGPTTools />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export default App;
