import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use mailto to open default email client with pre-filled fields
    const subject = encodeURIComponent(`[Website Inquiry] ${formData.subject}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:littlegiantsociety@gmail.com?subject=${subject}&body=${body}`;
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
            aria-labelledby="contact-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#EFF4F9] w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative border border-white/20"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/5 bg-white shrink-0">
                <div className="flex items-center gap-2 text-[#105CB3] font-bold uppercase tracking-widest">
                  <Mail className="stroke-current" size={20} />
                  <span id="contact-modal-title">Contact Us</span>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#105CB3]"
                  aria-label="Close Contact Modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 overflow-y-auto">
                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-zinc-500">Name</label>
                            <input 
                                required
                                type="text" 
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#105CB3] bg-white transition-shadow"
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-zinc-500">Email</label>
                            <input 
                                required
                                type="email" 
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#105CB3] bg-white transition-shadow"
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-bold uppercase tracking-wider text-zinc-500">Subject</label>
                        <input 
                            required
                            type="text" 
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#105CB3] bg-white transition-shadow"
                            placeholder="How can we help?"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-bold uppercase tracking-wider text-zinc-500">Message</label>
                        <textarea 
                            required
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className="w-full px-4 py-3 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#105CB3] bg-white transition-shadow resize-none"
                            placeholder="Write your message here..."
                        />
                    </div>

                    <div className="pt-2">
                        <button 
                            type="submit" 
                            className="w-full bg-[#105CB3] text-white font-bold uppercase tracking-wider py-4 rounded-lg hover:bg-[#0c4a91] transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            Send Message <Send size={18} />
                        </button>
                        <p className="text-center text-xs text-zinc-400 mt-4">
                            This will open your default email client.
                        </p>
                    </div>
                 </form>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;