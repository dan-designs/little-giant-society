import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Shield, Cookie, Download, Calendar } from 'lucide-react';

export type PolicyType = 'privacy' | 'terms' | 'cookie';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: PolicyType;
}

const POLICY_CONTENT: Record<PolicyType, { title: string; date: string; icon: React.ElementType; content: React.ReactNode }> = {
  privacy: {
    title: "Privacy Policy",
    date: "October 24, 2024",
    icon: Shield,
    content: (
      <div className="space-y-6 text-zinc-600 leading-relaxed">
        <p><strong>1. Introduction</strong><br/>
        Little Giant Society ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
        
        <p><strong>2. Data We Collect</strong><br/>
        We may collect, use, store and transfer different kinds of personal data about you including:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data:</strong> includes email address and telephone number.</li>
          <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
        </ul>
        </p>

        <p><strong>3. How We Use Your Data</strong><br/>
        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
          <li>Where we need to comply with a legal obligation.</li>
        </ul>
        </p>

        <p><strong>4. Data Security</strong><br/>
        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>

        <p><strong>5. Contact Details</strong><br/>
        If you have any questions about this privacy policy or our privacy practices, please contact us at littlegiantsociety@gmail.com.</p>
      </div>
    )
  },
  terms: {
    title: "Terms of Service",
    date: "January 15, 2024",
    icon: FileText,
    content: (
      <div className="space-y-6 text-zinc-600 leading-relaxed">
        <p><strong>1. Agreement to Terms</strong><br/>
        By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>

        <p><strong>2. Intellectual Property Rights</strong><br/>
        Other than the content you own, under these Terms, Little Giant Society and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.</p>

        <p><strong>3. Restrictions</strong><br/>
        You are specifically restricted from all of the following:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Publishing any Website material in any other media without prior consent;</li>
          <li>Selling, sublicensing and/or otherwise commercializing any Website material;</li>
          <li>Publicly performing and/or showing any Website material;</li>
          <li>Using this Website in any way that is or may be damaging to this Website;</li>
          <li>Using this Website in any way that impacts user access to this Website;</li>
        </ul>
        </p>

        <p><strong>4. Disclaimer</strong><br/>
        The materials on Little Giant Society's website are provided on an 'as is' basis. Little Giant Society makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

        <p><strong>5. Governing Law</strong><br/>
        These terms and conditions are governed by and construed in accordance with the laws of the Commonwealth of Virginia and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
      </div>
    )
  },
  cookie: {
    title: "Cookie Policy",
    date: "August 10, 2024",
    icon: Cookie,
    content: (
      <div className="space-y-6 text-zinc-600 leading-relaxed">
        <p><strong>1. What Are Cookies?</strong><br/>
        Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>

        <p><strong>2. How We Use Cookies</strong><br/>
        We use cookies for the following purposes:
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Necessary Cookies:</strong> These are essential for our website to function properly.</li>
          <li><strong>Analytics Cookies:</strong> These help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
          <li><strong>Functional Cookies:</strong> These allow the website to remember choices you make (such as your user name, language or the region you are in) and provide enhanced, more personal features.</li>
        </ul>
        </p>

        <p><strong>3. Managing Cookies</strong><br/>
        Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit www.aboutcookies.org or www.allaboutcookies.org.</p>

        <p><strong>4. Changes to This Policy</strong><br/>
        We may update our Cookie Policy from time to time. We encourage you to review this policy periodically for any changes.</p>
      </div>
    )
  }
};

const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, type }) => {
  const data = POLICY_CONTENT[type];
  const Icon = data.icon;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleDownload = () => {
    // Dynamically create a text file from the content logic for demonstration
    // In a real app, this would point to a static PDF URL like "/assets/docs/privacy.pdf"
    
    // Extract text content safely from the React Node structure for the blob
    // This is a simplified extraction for the demo "download" feature
    const element = document.getElementById('policy-content-body');
    const text = element ? element.innerText : '';
    const fullText = `${data.title}\nLast Updated: ${data.date}\n\n${text}\n\n© 2024 Little Giant Society.`;
    
    const blob = new Blob([fullText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${type}-policy.txt`; // Using .txt for demo, typically .pdf
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
            aria-labelledby="policy-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#EFF4F9] w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col relative border border-white/20"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-black/5 bg-white shrink-0">
                <div className="flex items-center gap-3 text-[#105CB3] font-bold uppercase tracking-widest">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="stroke-current" size={20} />
                  </div>
                  <div>
                    <span id="policy-modal-title" className="block text-lg leading-none mb-1">{data.title}</span>
                    <span className="flex items-center gap-1 text-[10px] text-zinc-400 font-medium">
                        <Calendar size={10} /> Last Updated: {data.date}
                    </span>
                  </div>
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
              <div id="policy-content-body" className="p-8 overflow-y-auto">
                 {data.content}
              </div>

              {/* Footer */}
              <div className="p-6 bg-white border-t border-black/5 flex items-center justify-between shrink-0">
                <span className="text-xs text-zinc-400">
                    © 2024 Little Giant Society.
                </span>
                <button 
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg text-sm font-bold uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-[#105CB3]"
                >
                    <Download size={16} />
                    Download Policy
                </button>
              </div>

            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PolicyModal;