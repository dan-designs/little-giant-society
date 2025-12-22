import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';

interface EventItem {
  date: string;
  title: string;
  description: string;
}

interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: EventItem[];
}

const EventsModal: React.FC<EventsModalProps> = ({ isOpen, onClose, events }) => {
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
            className="fixed inset-0 z-[101] flex items-center justify-center px-4 md:px-6 pointer-events-none"
            role="dialog"
            aria-modal="true"
            aria-labelledby="events-modal-title"
          >
            {/* Modal Card - Fixed height to leave 72px top/bottom margins */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="bg-[#EFF4F9] w-full max-w-4xl h-[calc(100vh-144px)] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative border border-white/20 pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/5 bg-white shrink-0">
                <div className="flex items-center gap-2 text-[#105CB3] font-bold uppercase tracking-widest">
                  <Calendar className="stroke-current" size={20} />
                  <span id="events-modal-title">Full Schedule</span>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#105CB3]"
                  aria-label="Close Events Modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content Area - Scrollable List */}
              <div className="flex-1 overflow-y-auto p-0 min-h-[200px]">
                {events.length > 0 ? (
                    <ul className="divide-y divide-black/5">
                        {events.map((event, index) => (
                            <li key={index} className="group bg-white/50 hover:bg-white transition-colors p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                                {/* Image Column with Badge Overlay */}
                                <div className="shrink-0 relative w-full md:w-48 aspect-video md:aspect-[4/3] rounded-xl overflow-hidden bg-zinc-200 border border-black/5">
                                    <img 
                                        src={`https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=400&auto=format&fit=crop`} 
                                        alt="Event Placeholder" 
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-black uppercase tracking-wider shadow-sm border border-black/5">
                                            {event.date}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Content Column */}
                                <div className="grow py-1">
                                    <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-[#105CB3] transition-colors">
                                        {event.title}
                                    </h3>
                                    <p className="text-zinc-500 leading-relaxed max-w-xl">
                                        {event.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full py-20 text-zinc-400 gap-2">
                          <Calendar size={32} className="opacity-20" />
                          <p>No events scheduled at this time.</p>
                    </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 bg-white border-t border-black/5 text-center text-zinc-400 text-sm shrink-0">
                Dates are subject to change. Subscribe to our newsletter for updates.
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EventsModal;