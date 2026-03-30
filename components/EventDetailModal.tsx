import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, Music, Utensils, Mic2 } from 'lucide-react';

export interface EventDetail {
  id: string;
  date: string;
  time?: string;
  title: string;
  tagLine?: string;
  description: string;
  fullDescription?: string[];
  image?: string;
  imageAlt?: string;
  foodTrucks?: string[];
  music?: string[];
  audio?: string;
}

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventDetail | null;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({ isOpen, onClose, event }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!event) return null;

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
            aria-labelledby="event-detail-title"
          >
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="bg-[#EFF4F9] w-full max-w-4xl max-h-[calc(100vh-64px)] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative border border-white/20 pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/5 bg-white shrink-0">
                <div className="flex items-center gap-2 text-[#105CB3] font-bold uppercase tracking-widest">
                  <Calendar className="stroke-current" size={20} />
                  <span>Event Details</span>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#105CB3]"
                  aria-label="Close Event Modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-0 bg-white">
                {event.image && (
                  <div className="w-full h-64 md:h-96 relative bg-zinc-900">
                    <img 
                      src={event.image} 
                      alt={event.imageAlt || event.title} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                
                <div className="p-6 md:p-10">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 rounded-full text-sm font-bold text-zinc-600 uppercase tracking-wider">
                      <Calendar size={14} />
                      {event.date}
                    </span>
                    {event.time && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 rounded-full text-sm font-bold text-zinc-600 uppercase tracking-wider">
                        <Clock size={14} />
                        {event.time}
                      </span>
                    )}
                  </div>

                  <h2 id="event-detail-title" className="text-3xl md:text-5xl font-bold mb-4 text-black">
                    {event.title}
                  </h2>
                  
                  {event.tagLine && (
                    <p className="text-xl md:text-2xl text-[#105CB3] font-medium mb-8 leading-snug">
                      {event.tagLine}
                    </p>
                  )}

                  <div className="space-y-6 text-lg text-zinc-600 leading-relaxed mb-10">
                    {event.fullDescription ? (
                      event.fullDescription.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))
                    ) : (
                      <p>{event.description}</p>
                    )}
                  </div>

                  {/* Details Grid */}
                  {(event.foodTrucks || event.music || event.audio) && (
                    <div className="grid md:grid-cols-3 gap-6 p-6 bg-zinc-50 rounded-xl border border-black/5">
                      {event.foodTrucks && (
                        <div>
                          <h4 className="flex items-center gap-2 font-bold text-black uppercase tracking-wider mb-2">
                            <Utensils size={18} className="text-[#105CB3]" />
                            Food Trucks
                          </h4>
                          <ul className="text-zinc-600 space-y-1">
                            {event.foodTrucks.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {event.music && (
                        <div>
                          <h4 className="flex items-center gap-2 font-bold text-black uppercase tracking-wider mb-2">
                            <Music size={18} className="text-[#105CB3]" />
                            DJ / Music
                          </h4>
                          <ul className="text-zinc-600 space-y-1">
                            {event.music.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {event.audio && (
                        <div>
                          <h4 className="flex items-center gap-2 font-bold text-black uppercase tracking-wider mb-2">
                            <Mic2 size={18} className="text-[#105CB3]" />
                            Audio & Engineering
                          </h4>
                          <p className="text-zinc-600">{event.audio}</p>
                        </div>
                      )}
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

export default EventDetailModal;
