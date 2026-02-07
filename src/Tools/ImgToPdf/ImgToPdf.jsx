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
        
        // Center image vertically if it's smaller, or just fit width
        // For standard "img to pdf" usually fit width is best, or fit within margins
        // Let's just fit to width for simplicity
        
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
    <div className="img-to-pdf-container">
      <div className="tool-header">
        <h2>Image to PDF Converter</h2>
      </div>
      
      <div className="upload-section">
        <label htmlFor="file-upload" className="custom-file-upload">
          Click to Upload Images (JPG, PNG)
        </label>
        <input 
          id="file-upload" 
          type="file" 
          accept="image/*" 
          multiple 
          onChange={handleImageUpload}
        />
        
        <div className="preview-grid">
          {images.map((img, index) => (
            <div key={index} className="img-preview-card">
              <img src={img.preview} alt={`preview ${index}`} />
              <button className="remove-btn" onClick={() => removeImage(index)}>&times;</button>
            </div>
          ))}
        </div>
        
        {images.length > 0 && (
          <div className="action-buttons">
            <button 
              className="convert-btn" 
              onClick={convertToPdf}
              disabled={loading}
            >
              {loading ? 'Converting...' : 'Convert to PDF'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImgToPdf;
