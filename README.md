# Wit Tools

Wit Tools is a comprehensive collection of versatile, browser-based utilities offering a range of functions designed to simplify your digital workflow. From manipulating PDFs to processing images and generating utility assets, it provides a fast and secure experience since most processing occurs locally in the browser!

## 🚀 Features

Wit Tools currently includes the following tools:

- **Image to PDF**: Convert your images into a single, downloadable PDF document.
- **Image Resizer**: Resize images to custom dimensions quickly and efficiently.
- **Image Compressor**: Reduce the file size of your images while maintaining quality.
- **PDF Compressor**: Optimize and compress heavy PDF files.
- **Watermark Tool**: Apply custom watermarks to protect your images and documents.
- **PDF Security**: Add or manage password protection for your sensitive PDFs.
- **Profile Photo Maker**: Create beautiful, well-cropped profile photos easily.
- **QR Code Generator**: Generate custom QR codes for URLs, text, and other data.
- **Background Remover**: Automatically strip backgrounds from subject images (requires API key).
- **PDF to Image**: Extract pages from a PDF document and save them as individual images.

## 🛠️ Tech Stack

This project is built with a modern and robust tech stack:

- **Frontend Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Image Processing/Manipulation**: `browser-image-compression`, `react-image-crop`, `gif.js`, `gifenc`
- **PDF Processing**: `jspdf`, `pdf-lib`, `pdfjs-dist`
- **Other Utilities**: `axios`, `file-saver`, `jszip`, `qrcode.react`

## ⚙️ Setup and Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd wit-tools
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   For certain features (like the Background Remover), you need to set up environment variables. Create a `.env` file in the root directory (this is already ignored by `.gitignore`) and add the following:

   ```env
   VITE_REMOVE_BG_API_KEY=your_remove_bg_api_key_here
   ```
   *Note: You can obtain your API key from [remove.bg](https://www.remove.bg/api).*

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173` (or depending on the Vite output).

5. **Build for production:**
   To create an optimized production build, run:
   ```bash
   npm run build
   ```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 

Whether you're proposing a new tool, fixing a bug, or improving existing functionality:
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

This project is created for personal/educational use. Please respect licenses of the respective third-party dependencies used in this project.
