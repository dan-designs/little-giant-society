import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Loader2, FileText } from 'lucide-react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      
      // Givebutter Widget Script
      const SCRIPT_URL = "https://widgets.givebutter.com/latest.umd.cjs?acct=G2P0FLxkUnCzTU4u";
      const existingScript = document.querySelector(`script[src="${SCRIPT_URL}"]`);
      
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = SCRIPT_URL;
        script.async = true;
        
        script.onload = () => {
          setIsLoading(false);
        };
        
        document.body.appendChild(script);
      } else {
        setTimeout(() => setIsLoading(false), 500);
      }
    }
  }, [isOpen]);

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            aria-hidden="true"
            onClick={onClose}
          />

          {/* Centered Wrapper */}
          <div 
            className="fixed inset-0 z-[101] flex items-center justify-center px-4 md:px-6"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="donate-modal-title"
          >
            {/* Modal Card - Fixed height to leave 72px top/bottom margins */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#EFF4F9] w-full max-w-6xl h-[calc(100vh-144px)] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative border border-white/20"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/5 bg-white shrink-0">
                <div className="flex items-center gap-2 text-[#105CB3] font-bold uppercase tracking-widest">
                  <Heart className="fill-current" size={20} />
                  <span id="donate-modal-title">Support The Project</span>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#105CB3]"
                  aria-label="Close Donation Modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content Area - Scrollable */}
              <div className="p-6 md:p-10 flex-1 overflow-y-auto">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
                  
                  {/* Text Column - Order 2 on Mobile, Order 1 on Desktop */}
                  <div className="space-y-6 text-zinc-600 leading-relaxed text-lg order-2 lg:order-1">
                     <h3 className="text-3xl font-bold text-black mb-4 tracking-tight">Build the Giant.</h3>
                     <p>
                       Hello! If you don't know who we are yet, we are <span className="font-bold text-black">Little Giant Society</span> and our goal is to actively cultivate a thriving arts community in Richmond by providing essential support, resources, and training for emerging talent and established artists.
                     </p>
                     <p>
                       We are currently working on 2 major initiatives in support of our first major project, which is a project that aims to bring Richmond, VA its first public art park!
                     </p>
                     <p>
                       Along the journey we have many sub goals and events that all are in service of our greater mission and the first project.
                     </p>
                     <p>
                       Thanks so much for visiting our donation page, we would be unable to achieve our goals if it was not for the support from the beautiful people in our city so thank you so much for anything you can contribute! We will be providing a series of tiered gifts in response to your support!
                     </p>
                     <p className="font-medium text-black">
                       We thank you in advance for your contribution!
                     </p>

                     {/* Tax Info Block */}
                     <div className="bg-white p-6 rounded-xl border border-blue-900/10 shadow-sm mt-8">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-50 rounded-lg text-[#105CB3] shrink-0">
                                <FileText size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-black text-sm uppercase tracking-wide mb-2">Tax-Deductible Information</h4>
                                <p className="text-base text-zinc-800 mb-2">
                                  Please note our EIN: <span className="font-mono font-bold select-all bg-[#105CB3]/10 text-[#105CB3] px-2 py-1 rounded border border-[#105CB3]/20">99‑0441095</span>
                                </p>
                                <p className="text-xs text-zinc-400 leading-normal">
                                  You’ll need this number when filing for deductions. Keeping this EIN on hand makes it easier to track and substantiate donations on year-end tax filings.
                                </p>
                            </div>
                        </div>
                     </div>
                  </div>

                  {/* Widget Column - Order 1 on Mobile, Order 2 on Desktop */}
                  <div className="relative min-h-[500px] bg-white rounded-xl shadow-sm border border-zinc-200 p-2 md:p-4 flex flex-col order-1 lg:order-2">
                    {isLoading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-zinc-400 z-10 bg-white/90 backdrop-blur-sm rounded-xl">
                        <Loader2 size={40} className="animate-spin text-[#105CB3]" />
                        <span className="font-mono text-xs uppercase tracking-widest">Loading Secure Payment...</span>
                      </div>
                    )}

                    {/* Givebutter Custom Element */}
                    <div className="w-full flex-1 flex justify-center overflow-hidden rounded-lg">
                        {/* @ts-ignore */}
                        <givebutter-widget id="g6zOlg"></givebutter-widget>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DonateModal;