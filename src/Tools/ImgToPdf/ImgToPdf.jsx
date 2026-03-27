import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import './ImgToPdf.css';

const ImgToPdf = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Sort files alphabetically to maintain order if selected together
    files.sort((a, b) => a.name.localeCompare(b.name));

    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const convertToPdf = async () => {
    if (images.length === 0) return;
    
    setLoading(true);
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      
      for (let i = 0; i < images.length; i++) {
        // Read image file
        const imgData = await getBase64(images[i].file);
        
        // Add image to PDF page
        if (i > 0) {
          pdf.addPage();
        }
        
        // Scale image to fit page
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = width;
        const pdfHeight = (imgProps.height * width) / imgProps.width;
        
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      }
      
      pdf.save("converted_images.pdf");
      
    } catch (err) {
      console.error("Error converting to PDF:", err);
      alert("Failed to convert images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to read file as Base64
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <div className="tool-container img-to-pdf-container">
      <div className="tool-header-card">
        <h2>Image to PDF Converter</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Fast and reliable conversion</p>
      </div>
      
      <div className="tool-card">
        <label htmlFor="file-upload" className="drop-zone">
          <span>Click to Upload Images (JPG, PNG)</span>
          <input 
            id="file-upload" 
            type="file" 
            accept="image/*" 
            multiple 
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </label>
        
        {images.length > 0 && (
          <div className="preview-grid">
            {images.map((img, index) => (
              <div key={index} className="img-preview-card">
                <img src={img.preview} alt={`preview ${index}`} />
                <button className="remove-btn" onClick={() => removeImage(index)}>&times;</button>
              </div>
            ))}
          </div>
        )}
        
        {images.length > 0 && (
          <div className="action-buttons">
            <button 
              className="btn-primary" 
              onClick={convertToPdf}
              disabled={loading}
              style={{ padding: '14px 40px' }}
            >
              {loading ? 'Converting...' : 'Convert to PDF Now'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImgToPdf;
