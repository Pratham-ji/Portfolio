import React, { useState, useEffect } from 'react';
import { DownloadIcon, PrinterIcon, FileTextIcon, AlertCircleIcon } from 'lucide-react';

export const ResumeApp: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const RESUME_URL = '/resume.pdf'; // Path to the PDF in public folder

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = RESUME_URL;
    link.download = 'pratham_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    if (isMobile) {
      alert("Printing is not supported on mobile devices. Please download the PDF instead.");
      return;
    }
    
    // Create an invisible iframe for printing
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = RESUME_URL;
    document.body.appendChild(iframe);
    
    iframe.onload = () => {
      setTimeout(() => {
        iframe.contentWindow?.print();
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      }, 500);
    };
  };

  return (
    <div className="w-full h-full bg-[#323639] flex flex-col">
      {/* PDF Viewer Toolbar */}
      <div className="h-14 bg-[#323639] border-b border-black/30 flex items-center justify-between px-4 shadow-sm z-10 flex-shrink-0">
        <div className="flex items-center gap-4 text-white/90">
          <FileTextIcon size={20} />
          <span className="text-sm font-medium">pratham_resume.pdf</span>
        </div>
        
        <div className="flex items-center gap-2">
          {!isMobile && (
            <button 
              onClick={handlePrint}
              className="p-2 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-colors"
              title="Print"
              aria-label="Print Resume"
            >
              <PrinterIcon size={20} />
            </button>
          )}
          <button 
            onClick={handleDownload}
            className="p-2 hover:bg-white/10 rounded-full text-white/80 hover:text-white transition-colors"
            title="Download"
            aria-label="Download Resume"
          >
            <DownloadIcon size={20} />
          </button>
        </div>
      </div>

      {/* PDF Document Container */}
      <div className="flex-1 overflow-hidden flex flex-col items-center justify-center bg-[#525659]">
        {isMobile ? (
          <div className="flex flex-col items-center justify-center p-8 text-center max-w-sm">
            <div className="w-20 h-20 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mb-6">
              <FileTextIcon size={40} />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Resume Ready</h2>
            <p className="text-white/60 text-sm mb-8">
              For the best reading experience on mobile devices, please download the PDF directly.
            </p>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-[#0a84ff] hover:bg-blue-500 text-white rounded-full font-medium transition-colors"
            >
              <DownloadIcon size={18} />
              Download PDF
            </button>
          </div>
        ) : (
          <div className="w-full h-full p-0 relative">
            <object 
              data={RESUME_URL} 
              type="application/pdf" 
              className="w-full h-full"
              aria-label="Resume PDF Viewer"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#323639] p-8 text-center">
                <AlertCircleIcon size={48} className="text-white/20 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Unable to display PDF</h3>
                <p className="text-white/50 text-sm max-w-md mb-6">
                  It appears your browser doesn't support embedded PDFs or a plugin is blocking it.
                </p>
                <button 
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors border border-white/10"
                >
                  <DownloadIcon size={18} />
                  Download Instead
                </button>
              </div>
            </object>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeApp;
