import React, { useState, useEffect } from 'react';
import { DownloadIcon, PrinterIcon, FileTextIcon, AlertCircleIcon } from 'lucide-react';
import { motion } from 'motion/react';

export const ResumeApp: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const RESUME_URL = '/resume.pdf';

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
    <div className="ds-app-container flex-col">
      {/* PDF Viewer Toolbar */}
      <div className="h-16 bg-[var(--theme-surface)] border-b border-[var(--theme-border)] flex items-center justify-between px-6 shadow-sm z-10 flex-shrink-0">
        <div className="flex items-center gap-4 text-[var(--theme-text)]">
          <div className="p-2 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] rounded-lg">
            <FileTextIcon size={20} strokeWidth={2.5} />
          </div>
          <span className="text-sm font-bold">pratham_resume.pdf</span>
        </div>
        
        <div className="flex items-center gap-3">
          {!isMobile && (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrint}
              className="ds-btn ds-btn-ghost"
              title="Print"
              aria-label="Print Resume"
            >
              <PrinterIcon size={18} />
            </motion.button>
          )}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="ds-btn ds-btn-primary shadow-md shadow-blue-500/20"
            title="Download"
            aria-label="Download Resume"
          >
            <DownloadIcon size={18} strokeWidth={2.5} />
            <span className="text-sm">Download</span>
          </motion.button>
        </div>
      </div>

      {/* PDF Document Container */}
      <div className="flex-1 overflow-hidden flex flex-col items-center justify-center bg-transparent/50 relative">
        {isMobile ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="ds-card flex flex-col items-center justify-center p-8 text-center max-w-sm m-6"
          >
            <div className="w-24 h-24 bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] rounded-full flex items-center justify-center mb-6 shadow-inner">
              <FileTextIcon size={48} strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-extrabold text-[var(--theme-text)] mb-3">Resume Ready</h2>
            <p className="text-[var(--theme-text-muted)] text-[15px] font-medium mb-8 leading-relaxed">
              For the best reading experience on mobile devices, please download the PDF directly.
            </p>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="ds-btn ds-btn-primary w-full py-4 shadow-lg shadow-blue-500/30"
            >
              <DownloadIcon size={20} strokeWidth={2.5} />
              Download PDF
            </motion.button>
          </motion.div>
        ) : (
          <div className="w-full h-full p-0 relative">
            <object 
              data={RESUME_URL} 
              type="application/pdf" 
              className="w-full h-full"
              aria-label="Resume PDF Viewer"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent p-8 text-center">
                <AlertCircleIcon size={64} className="text-[var(--theme-text-muted)] opacity-30 mb-6" strokeWidth={1} />
                <h3 className="text-2xl font-bold text-[var(--theme-text)] mb-3">Unable to display PDF</h3>
                <p className="text-[var(--theme-text-muted)] text-base font-medium max-w-md mb-8">
                  It appears your browser doesn't support embedded PDFs or a plugin is blocking it.
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="ds-btn ds-btn-primary px-8 py-4 shadow-lg shadow-blue-500/20"
                >
                  <DownloadIcon size={20} strokeWidth={2.5} />
                  Download Instead
                </motion.button>
              </div>
            </object>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeApp;
