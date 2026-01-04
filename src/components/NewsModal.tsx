import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

export interface NewsItem {
  id: number;
  title: string;
  author: string;
  date: string;
  preview: string;
  content: string;
  image: string;
  link?: string;
}

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsItem: NewsItem | null;
}

const NewsModal: React.FC<NewsModalProps> = ({ isOpen, onClose, newsItem }) => {
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
      {isOpen && newsItem && (
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
            className="fixed inset-0 z-[101] flex items-center justify-center px-[48px] py-[48px]"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="news-modal-title"
          >
            {/* Modal Card - Full screen minus 48px margins */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full h-full rounded-2xl shadow-2xl overflow-hidden flex flex-col relative border border-white/20"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/5 bg-[#EFF4F9] shrink-0">
                <div className="flex items-center gap-2 text-[#105CB3] font-bold uppercase tracking-widest">
                  <span className="material-symbols-outlined text-[24px]">newspaper</span>
                  <span id="news-modal-title">News Article</span>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#105CB3]"
                  aria-label="Close News Modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content Area - Scrollable */}
              <div className="flex-1 overflow-y-auto bg-white">
                <div className="max-w-4xl mx-auto p-6 md:p-10">
                    
                    {/* Hero Image */}
                    <div className="w-full aspect-video rounded-xl overflow-hidden mb-8 border border-zinc-100 shadow-sm">
                        <img 
                            src={newsItem.image} 
                            alt={newsItem.title} 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-zinc-500 mb-4 uppercase tracking-wider">
                        <span className="text-[#105CB3] bg-blue-50 px-3 py-1 rounded-full">{newsItem.date}</span>
                        <span>•</span>
                        <span>By {newsItem.author}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight mb-8 leading-tight">
                        {newsItem.title}
                    </h2>

                    {/* Content Body */}
                    <div className="prose prose-lg max-w-none text-zinc-700 leading-relaxed whitespace-pre-line mb-10">
                        {newsItem.content}
                    </div>

                    {/* External Link */}
                    {newsItem.link && (
                        <div className="border-t border-zinc-100 pt-8">
                             <a 
                                href={newsItem.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-[#105CB3] text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-[#0c4a91] transition-colors"
                             >
                                Visit Website <ExternalLink size={18} />
                             </a>
                        </div>
                    )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewsModal;