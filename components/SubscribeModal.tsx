import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export type SubscribeStatus = 'loading' | 'success' | 'error';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: SubscribeStatus;
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ isOpen, onClose, status }) => {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Auto-close on success after 3 seconds
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOpen && status === 'success') {
      timer = setTimeout(() => {
        onClose();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, status, onClose]);

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
            aria-labelledby="subscribe-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#EFF4F9] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col relative border border-white/20"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/5 bg-white shrink-0">
                <div className="flex items-center gap-2 text-[#105CB3] font-bold uppercase tracking-widest">
                  <Mail className="stroke-current" size={20} />
                  <span id="subscribe-modal-title">Newsletter</span>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#105CB3]"
                  aria-label="Close Modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content Area */}
              <div className="p-10 flex flex-col items-center justify-center text-center min-h-[300px]">
                {status === 'loading' && (
                  <div className="flex flex-col items-center animate-in fade-in duration-300">
                    <Loader2 size={48} className="text-[#105CB3] animate-spin mb-6" />
                    <h3 className="text-2xl font-bold mb-2">Subscribing...</h3>
                    <p className="text-zinc-500">Please wait while we add you to the list.</p>
                  </div>
                )}
                
                {status === 'success' && (
                  <div className="flex flex-col items-center animate-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Welcome Aboard!</h3>
                    <p className="text-zinc-600 mb-8 max-w-xs mx-auto leading-relaxed">
                      Thank you for subscribing. You've successfully joined the Little Giant Society newsletter.
                    </p>
                    <button 
                      onClick={onClose}
                      className="bg-[#105CB3] text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-[#0c4a91] transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                      Close
                    </button>
                    <p className="text-zinc-400 text-xs mt-4 animate-pulse">
                      Closing automatically in a moment...
                    </p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex flex-col items-center animate-in zoom-in-95 duration-300">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-600">
                      <XCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Something went wrong</h3>
                    <p className="text-zinc-600 mb-8 max-w-xs mx-auto leading-relaxed">
                      We couldn't subscribe you at this time. Please try again later or contact us directly.
                    </p>
                    <button 
                      onClick={onClose}
                      className="bg-zinc-900 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-black transition-colors focus:outline-none focus:ring-4 focus:ring-zinc-500"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SubscribeModal;