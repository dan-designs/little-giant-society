import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Users, Handshake, ChevronLeft, ChevronRight, Play, Pause, Quote } from 'lucide-react';
import Navigation from './components/Navigation';
import MiniMap from './components/MiniMap';
import MobileNavControls from './components/MobileNavControls';
import DonateModal from './components/DonateModal';
import EventsModal from './components/EventsModal';
import ContactModal from './components/ContactModal';
import PolicyModal, { PolicyType } from './components/PolicyModal';
import Model3D from './components/Model3D';
import { useScrollSpy } from './hooks/useScrollSpy';
import { MAP_SECTIONS } from './constants';

const CAROUSEL_IMAGES = [
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276535/Art-Park-Render_rgklby.png",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276531/plan-1_qyrmng.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276535/plan-3_nkstly.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276535/plan-2_rclxza.avif"
];

const BUS_IMAGES = [
  "https://res.cloudinary.com/datad8tms/image/upload/v1766450517/sticker-bus_difkyk.jpg",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766451468/TY_s8zbue.png",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766451468/Installed_q7npit.png"
];

const BUS_LABELS = [
  "Sticker Bus @ Supply",
  "Sticker Bus @ First Friday 1",
  "Sticker Bus at First Friday 2"
];

const PARTNER_LOGOS = [
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276531/FallLine_zh1gia.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276531/Gallery5_frdtns.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276531/Manchester_Alliance_kfpqog.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276531/Supply_fbkorw.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276531/Veil_w4myou.avif"
];

const SPONSOR_LOGOS = [
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276532/AndDimSum_meazig.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276532/Atlantic_Union_Bank_logoSQ_wqyvmg.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276532/Bombolini_uqkk7h.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276534/CNTR_oqgdwl.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276533/communityfoundation_rrd2rx.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276533/Dawnstar_jhh6fu.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276534/Envelope_p0tagc.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766278510/FoyerGallery_nvpbww.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276534/ILYSM_ecg3zl.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276532/LivelyHarper_b51lnh.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276535/RPAA_hvtuke.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276533/RVA_dzxgvt.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276534/ShockoeArts_un1kc5.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276534/Tarrants_cqfagk.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276533/TrialandError_hetr2z.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276533/ViragoSpirits_arrtin.avif",
  "https://res.cloudinary.com/datad8tms/image/upload/v1766276532/Waxmoon_vvidks.avif"
];

const TEAM_MEMBERS = [
  {
    name: "Ian C. Hess",
    role: "President/Director",
    modelSrc: "https://little-giant-society.sirv.com/model.glb",
    blurb: "Ian C. Hess is the business owner of SUPPLY, Richmond's only locally owned Art Supply Store. He is also the President and Director of Little Giant Society and an internationally exhibiting Fine Art painter who has shown work in Rome, Amsterdam, Philadelphia, and at Art Basel in Miami. Ian is a native Richmonder who is wholly dedicated to creating a flourishing arts community in Richmond."
  },
  {
    name: "Kathleen Cortez",
    role: "Vice President/Treasurer",
    modelSrc: "https://little-giant-society.sirv.com/Katie.glb",
    blurb: "If we have eyes to see, our spaces illustrate for us the dialog between beauty, place, and culture. Katie operates her own Architecture practice with a focus on emphasizing the power of design, space, and place. A native of Pennsylvania, Katie studied Architecture at Lehigh University, and moved to Richmond 15 years ago after earning her Master's Degree in Architecture at the University of Virginia."
  },
  {
    name: "Ben White",
    role: "Secretary/Marketing Director",
    modelSrc: "https://little-giant-society.sirv.com/Ben.glb",
    blurb: "Benjamin White, a Richmond, Virginia native, works as a commercial photographer, continually looking for new avenues to progress his vision through the lens. Utilizing digital and film mediums, Ben focuses on commercial portrait, product, and event photography."
  }
];

const EVENTS_DATA: any[] = [];

// Custom Left-Facing School Bus Profile Icon
const CustomBusProfileIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    {/* Body */}
    <path d="M1 12 L3 7 L21 7 C22.1 7 23 7.9 23 9 L23 18 L21 18 C21 19.66 19.66 21 18 21 C16.34 21 15 19.66 15 18 L10 18 C10 19.66 8.66 21 7 21 C5.34 21 4 19.66 4 18 L1 18 Z" />
    {/* Windows */}
    <path d="M4 8 L6 11 H9 V8 H4 Z" fill="white" fillOpacity="0.2"/>
    <path d="M10 8 V11 H14 V8 H10 Z" fill="white" fillOpacity="0.2"/>
    <path d="M15 8 V11 H19 V8 H15 Z" fill="white" fillOpacity="0.2"/>
  </svg>
);

const Website: React.FC = () => {
  // Define section IDs in the order they appear on the page for correct scroll spying
  const sectionIds = ['hero', 'mission', 'proposal', 'sticker-bus', 'about', 'sponsors', 'events', 'footer'];
  const activeSection = useScrollSpy(sectionIds, -200);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);

  // Carousel State for The Park
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Carousel State for Sticker Bus
  const [busImageIndex, setBusImageIndex] = useState(0);
  const [isBusPlaying, setIsBusPlaying] = useState(true);

  // Main Carousel Effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentImageIndex]);

  // Bus Carousel Effect
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isBusPlaying) {
      timer = setInterval(() => {
        setBusImageIndex((prev) => (prev + 1) % BUS_IMAGES.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isBusPlaying, busImageIndex]);

  // Main Carousel Handlers
  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
  };
  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1));
  };
  const togglePlay = () => setIsPlaying(!isPlaying);

  // Bus Carousel Handlers
  const handleBusNext = () => {
    setBusImageIndex((prev) => (prev + 1) % BUS_IMAGES.length);
  };
  const handleBusPrev = () => {
    setBusImageIndex((prev) => (prev === 0 ? BUS_IMAGES.length - 1 : prev - 1));
  };
  const toggleBusPlay = () => setIsBusPlaying(!isBusPlaying);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative selection:bg-[#105CB3] selection:text-white">
      <Navigation activeSection={activeSection} onDonateClick={() => setIsDonateModalOpen(true)} />
      
      {/* Map Widget (Desktop Only) */}
      <MiniMap activeSection={activeSection} onSectionSelect={handleScrollToSection} />

      {/* Mobile Nav Controls (Mobile Only) */}
      <MobileNavControls activeSection={activeSection} sectionIds={sectionIds} onNavigate={handleScrollToSection} />

      {/* Donate Modal */}
      <DonateModal isOpen={isDonateModalOpen} onClose={() => setIsDonateModalOpen(false)} />

      {/* Events Modal */}
      <EventsModal isOpen={isEventsModalOpen} onClose={() => setIsEventsModalOpen(false)} events={EVENTS_DATA} />

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      {/* Policy Modal */}
      <PolicyModal 
        isOpen={!!activePolicy} 
        onClose={() => setActivePolicy(null)} 
        type={activePolicy || 'privacy'} 
      />

      <main className="relative z-10">
        
        {/* 1. HERO SECTION */}
        <section id="hero" className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-8 md:pt-28 md:pb-12 relative border-b border-black scroll-mt-0">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            
            {/* TEXT CONTENT (Right on Desktop, Top on Mobile) */}
            <div className="space-y-6 md:space-y-8 lg:order-2">
              <div className="inline-flex items-center justify-center bg-black text-white px-4 py-2 text-sm font-bold uppercase tracking-widest mb-2 md:mb-4 leading-none">
                <span className="pt-[2px]">THROUGH LITTLE ACTIONS WE CREATE GIANTS.</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase">
                Richmond's<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#388AE8] to-[#105CB3]">First Public</span><br/>
                Art Park.
              </h1>
              <p className="text-lg md:text-xl text-zinc-600 max-w-lg leading-relaxed">
                At Little Giant Society, we are currently working with the City of Richmond to bring our vision for a Public Arts Park to life! This park will be installed south of the James River, underneath the Manchester Bridge, and on the Fall Line Trail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                 <button 
                   onClick={() => handleScrollToSection('proposal')}
                   className="bg-[#105CB3] text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[#0c4a91] transition-colors flex items-center justify-center leading-none focus:ring-4 focus:ring-blue-300 focus:outline-none focus-visible:ring-4"
                   aria-label="Learn more about the proposal"
                 >
                   <span className="pt-[2px]">Learn More</span>
                 </button>
                 <button 
                   onClick={() => window.open('https://www.change.org/p/it-s-time-to-build-richmond-s-1st-public-art-park?recruiter=1336850517&recruited_by_id=87f77e80-fe65-11ee-9f75-3ba1adb818af', '_blank')}
                   className="border-2 border-black px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors flex items-center justify-center leading-none focus:ring-4 focus:ring-zinc-300 focus:outline-none focus-visible:ring-4"
                   aria-label="Sign the petition on Change.org (opens in new tab)"
                 >
                   <span className="pt-[2px]">Sign Petition</span>
                 </button>
              </div>
            </div>

            {/* IMAGE BLOCK (Left on Desktop, Bottom on Mobile) */}
            <div className="lg:order-1 relative w-full h-[320px] md:h-[400px] lg:h-[600px] bg-zinc-200 rounded-3xl overflow-hidden border-2 border-black group shadow-xl">
               <img 
                 src="https://res.cloudinary.com/datad8tms/image/upload/v1766276535/Art-Park-Render_rgklby.png" 
                 alt="Art Park Render" 
                 className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
               />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500"></div>
               
               <div className="absolute bottom-6 left-6 bg-white px-4 py-2 border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <span className="font-bold text-xs uppercase tracking-widest">Art Park Render</span>
               </div>
            </div>

          </div>
        </section>

        {/* 2. MISSION SECTION */}
        <section id="mission" className="min-h-screen flex items-center px-6 py-16 md:py-24 bg-white border-b border-black scroll-mt-20">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            
            {/* Logo Placeholder - Updated to correct Logo */}
            <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-zinc-100 rounded-full mb-8 flex items-center justify-center border-2 border-zinc-200 overflow-hidden shrink-0">
               <img 
                  src="https://res.cloudinary.com/datad8tms/image/upload/v1766276532/Logo_gezcwn.png" 
                  alt="Little Giant Society Logo" 
                  className="w-full h-full object-cover"
               />
            </div>

            <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-6 md:mb-8">
              THROUGH LITTLE ACTIONS.<br/>WE CREATE GIANTS.
            </h2>
            
            <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed mb-10 md:mb-16">
              Little Giant Society's main purpose is to cultivate and scale Richmond's thriving arts community by providing essential support, resources, and training for emerging talent and established artists.
            </p>

            {/* 3 Rectangles */}
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 text-left w-full">
              <div className="p-6 bg-[#EFF4F9] rounded-xl">
                 <h3 className="text-xl font-bold mb-4 uppercase">Open the Gates</h3>
                 <p className="text-zinc-600">Created 3rd spaces that create a mutually beneficial creative community.</p>
              </div>
              <div className="p-6 bg-[#EFF4F9] rounded-xl">
                 <h3 className="text-xl font-bold mb-4 uppercase">Cultivate the Soil</h3>
                 <p className="text-zinc-600">Ensure Richmond's street art scene has a place to gather and grow.</p>
              </div>
              <div className="p-6 bg-[#EFF4F9] rounded-xl">
                 <h3 className="text-xl font-bold mb-4 uppercase">Give back</h3>
                 <p className="text-zinc-600">Provide training, lessons, and after-school programs to usher in the next generation.</p>
              </div>
            </div>

          </div>
        </section>

        {/* 3. PROPOSAL SECTION (The Art Park) */}
        <section id="proposal" className="min-h-screen flex flex-col justify-center px-6 py-16 md:py-24 bg-zinc-900 text-white relative overflow-hidden scroll-mt-20">
          
          <div className="max-w-7xl mx-auto w-full relative z-10">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
               <div className="space-y-6 md:space-y-8">
                  <div className="flex items-center gap-2 text-[#105CB3] font-bold uppercase tracking-widest">
                    <MapPin size={20} />
                    <span>The Park</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter">
                    The Art Park<br/>Project
                  </h2>
                  <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                    With support from the city government, we are well on our way to creating a free Public Arts Park under the Manchester Bridge, This hub will reduce crime, boost tourism, and retain talent by reinforcing Richmond's status as a premier Arts City.
                  </p>
               </div>

               {/* Carousel */}
               <div className="aspect-square w-full rounded-2xl overflow-hidden relative group">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentImageIndex}
                      src={CAROUSEL_IMAGES[currentImageIndex]} 
                      alt={`Render view ${currentImageIndex + 1}`} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                  </AnimatePresence>
                  
                  {/* Controls Overlay - Gradient for visibility */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

                  {/* Bottom Controls Row */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
                    
                    {/* Left: Play/Pause, Nav Buttons & Indicators */}
                    <div className="flex items-center gap-6">
                      
                      {/* Controls Group */}
                      <div className="flex items-center gap-3">
                          <button 
                            onClick={togglePlay}
                            className="text-white hover:text-[#105CB3] transition-colors focus:outline-none focus:text-[#105CB3] focus-visible:ring-2"
                            aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
                          >
                            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                          </button>

                          <button 
                            onClick={handlePrev}
                            className="text-white hover:text-[#105CB3] transition-colors focus:outline-none focus:text-[#105CB3] focus-visible:ring-2"
                            aria-label="Previous Image"
                          >
                            <ChevronLeft size={22} />
                          </button>

                          <button 
                            onClick={handleNext}
                            className="text-white hover:text-[#105CB3] transition-colors focus:outline-none focus:text-[#105CB3] focus-visible:ring-2"
                            aria-label="Next Image"
                          >
                            <ChevronRight size={22} />
                          </button>
                      </div>

                      {/* Divider */}
                      <div className="w-px h-6 bg-white/20"></div>

                      {/* Indicators */}
                      <div className="flex gap-2" role="tablist" aria-label="Slideshow indicators">
                        {CAROUSEL_IMAGES.map((_, idx) => (
                          <button
                            key={idx} 
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-300 ${idx === currentImageIndex ? 'w-8 bg-white/40' : 'w-1.5 bg-white/40 hover:bg-white/60'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                            aria-selected={idx === currentImageIndex}
                            role="tab"
                          >
                             {/* Animated Progress Bar (Only visible when active) */}
                             {idx === currentImageIndex && (
                               <motion.div 
                                 initial={{ width: "0%" }}
                                 animate={{ width: isPlaying ? "100%" : "0%" }}
                                 transition={{ duration: 5, ease: "linear" }}
                                 className="absolute top-0 left-0 h-full bg-white"
                               />
                             )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right: Label */}
                    <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                       <span className="font-mono text-xs uppercase tracking-wider text-white">
                         Reference 0{currentImageIndex + 1}
                       </span>
                    </div>
                  </div>
               </div>
            </div>

            {/* Extended Detailed Copy */}
            <div className="mt-12 md:mt-24 pt-10 md:pt-16 border-t border-zinc-800 w-full">
               <div className="text-base md:text-lg text-zinc-300 leading-relaxed md:columns-2 gap-16">
                  <p className="mb-8 break-inside-avoid">
                    <span className="text-white font-bold">Our vision with this first major initiative is to</span> create a public arts park with the goal of it becoming a cultural landmark in the city. It will be free and open to any artist who live in or are visiting Richmond and we believe that this type of project is ~35 years overdue. The city government constantly presents itself as an "Arts Forward City" and it's time to get our leaders to put their money where their mouth is.
                  </p>
                  <p className="mb-8 break-inside-avoid">
                    This project ties in perfectly with Richmond's Public Arts Master Plan and can set forth a new, more future focused Richmond. We believe that Richmond is in a position to become a defining Arts city on the East Coast. When people think of the Arts in the United States, we want them to think of Richmond.
                  </p>
                  <p className="mb-8 break-inside-avoid">
                    A park with free, interactive walls will become a place where a father takes his son on the weekend to paint something together, a Girl Scout troop can make a design together and paint in order to earn a badge, a space where teens and young adults can hang out and paint without getting into any trouble, a place where local and international artists alike can spend a weekend mingling and painting. Ultimately, we strive to create an outdoor third Place where all are welcome, where the art is constantly changing and growing in a way that it becomes not only a training ground for future muralists but also a tourist destination that reflects Richmonders and our culture.
                  </p>
                  <p className="mb-8 break-inside-avoid">
                    International and domestic trends have proven that cities where a Public Arts Park has been constructed see general reductions in crime, vandalism, destruction of local businesses and homes, while also creating a space for new artists to emerge, careers to be made, and promote a public image that welcomes new blood and talent to these cities.
                  </p>
                  <p className="mb-8 break-inside-avoid">
                    According to Mural Arts of Philadelphia's comprehensive study (muralarts.org), Richmond is #4 in the nation for Public Arts. Other cities such as New York, Los Angeles, Portland, and more all recognize this. With this recognition from other cities we humbly ask "why can't WE realize this?!" We feel that this represents a categorical failure of our city to capitalize on its reputation because currently, artists don't see Richmond as a place to prosper, but more like a stepping stone and for decades we have seen exodus of talent and it's time to do something about this.
                  </p>
                  <p className="mb-8 break-inside-avoid text-white font-medium border-l-2 border-[#105CB3] pl-6 italic">
                    This is why we are proposing a Public Arts Park (to be officially named by the public) and installed underneath the Manchester Bridge on the south side of the river, adjacent to the Flood Wall. Working alongside architect Katie Cortez, we have formally proposed this project to every single relevant department in the entire city and have gained support by the sitting Mayor, Danny Avula. NOW IS THE TIME!
                  </p>
               </div>
            </div>
          </div>
        </section>

        {/* 3.5 STICKER BUS SECTION (Duplicated from The Park) */}
        {/* Changed bg from zinc-500 to zinc-950 to be darker than art park (900) but lighter than team (black) */}
        <section id="sticker-bus" className="min-h-screen flex flex-col justify-center px-6 py-16 md:py-24 bg-zinc-950 text-white relative overflow-hidden scroll-mt-20 border-t border-zinc-900">
          
          <div className="max-w-7xl mx-auto w-full relative z-10">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
               <div className="space-y-6 md:space-y-8">
                  <div className="flex items-center gap-2 text-[#FACC15] font-bold uppercase tracking-widest drop-shadow-md">
                    <CustomBusProfileIcon size={20} className="drop-shadow-md" />
                    <span>The Sticker Bus</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter">
                    The Sticker Bus
                  </h2>
                  <ul className="space-y-4 text-zinc-100 text-lg md:text-xl leading-relaxed">
                    <li className="flex items-start gap-3">
                        <span className="text-[#FACC15] mt-2.5 w-2 h-2 rounded-full bg-[#FACC15] shrink-0 drop-shadow-sm"></span>
                        <span><strong className="text-white">200+ Artists:</strong> Plastered head-to-tailpipe in work from Shepard Fairey, RxSkulls, and the global scene.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-[#FACC15] mt-2.5 w-2 h-2 rounded-full bg-[#FACC15] shrink-0 drop-shadow-sm"></span>
                        <span><strong className="text-white">Sealed Forever:</strong> Every slap is coated in automotive clear coat to survive the streets.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-[#FACC15] mt-2.5 w-2 h-2 rounded-full bg-[#FACC15] shrink-0 drop-shadow-sm"></span>
                        <span><strong className="text-white">Built to Drive:</strong> Fully mobile, AC-blasting, and ready to haul art to the people.</span>
                    </li>
                  </ul>
               </div>

               {/* Carousel */}
               <div className="aspect-square w-full rounded-2xl overflow-hidden relative group">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={busImageIndex}
                      src={BUS_IMAGES[busImageIndex]} 
                      alt={`Render view ${busImageIndex + 1}`} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                  </AnimatePresence>
                  
                  {/* Controls Overlay - Gradient for visibility */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

                  {/* Bottom Controls Row */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20">
                    
                    {/* Left: Play/Pause, Nav Buttons & Indicators */}
                    <div className="flex items-center gap-6">
                      
                      {/* Controls Group */}
                      <div className="flex items-center gap-3">
                          <button 
                            onClick={toggleBusPlay}
                            className="text-white hover:text-[#FACC15] transition-colors focus:outline-none focus:text-[#FACC15] focus-visible:ring-2"
                            aria-label={isBusPlaying ? "Pause Slideshow" : "Play Slideshow"}
                          >
                            {isBusPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                          </button>

                          <button 
                            onClick={handleBusPrev}
                            className="text-white hover:text-[#FACC15] transition-colors focus:outline-none focus:text-[#FACC15] focus-visible:ring-2"
                            aria-label="Previous Image"
                          >
                            <ChevronLeft size={22} />
                          </button>

                          <button 
                            onClick={handleBusNext}
                            className="text-white hover:text-[#FACC15] transition-colors focus:outline-none focus:text-[#FACC15] focus-visible:ring-2"
                            aria-label="Next Image"
                          >
                            <ChevronRight size={22} />
                          </button>
                      </div>

                      {/* Divider */}
                      <div className="w-px h-6 bg-white/20"></div>

                      {/* Indicators */}
                      <div className="flex gap-2" role="tablist" aria-label="Slideshow indicators">
                        {BUS_IMAGES.map((_, idx) => (
                          <button
                            key={idx} 
                            onClick={() => setBusImageIndex(idx)}
                            className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-300 ${idx === busImageIndex ? 'w-8 bg-white/40' : 'w-1.5 bg-white/40 hover:bg-white/60'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                            aria-selected={idx === busImageIndex}
                            role="tab"
                          >
                             {/* Animated Progress Bar (Only visible when active) */}
                             {idx === busImageIndex && (
                               <motion.div 
                                 initial={{ width: "0%" }}
                                 animate={{ width: isBusPlaying ? "100%" : "0%" }}
                                 transition={{ duration: 5, ease: "linear" }}
                                 className="absolute top-0 left-0 h-full bg-white"
                               />
                             )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right: Label */}
                    <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                       <span className="font-mono text-xs uppercase tracking-wider text-white">
                         {BUS_LABELS[busImageIndex]}
                       </span>
                    </div>
                  </div>
               </div>
            </div>

            {/* Extended Detailed Copy */}
            <div className="mt-12 md:mt-24 pt-10 md:pt-16 border-t border-zinc-800 w-full">
               <div className="text-base md:text-lg text-zinc-100 leading-relaxed md:columns-2 gap-16">
                  <p className="mb-8 break-inside-avoid">
                    <span className="text-white font-bold">Art takes many forms, but few are as dynamic [or mobile] as Richmond’s new "Sticker Bus."</span> Masterminded by artist Ian Hess and the non-profit Little Giants Society, this project transforms a surplus school bus purchased at auction into a rolling, community-powered installation.
                  </p>
                  <p className="mb-8 break-inside-avoid">
                    The concept was born from the "Hello My Name Is" exhibition, a showcase where over 200 artists [including street art icons like Shepard Fairey and RxSkulls] transformed standard shipping labels into miniature masterpieces which were sold to raise funds for the Little Giants Society's Art Park Prohect.
                  </p>
                  <p className="mb-8 break-inside-avoid">
                    Taking that creative energy to the streets, the bus is now being covered entirely in stickers donated by artists and community members from around the globe. The design acts as a curated collage, anchored by a custom skull piece on the hood by Richmond artist Noah Scalin.
                  </p>
                  <p className="mb-8 break-inside-avoid">
                    Once the sticker application is complete, the bus will be sealed in a professional automotive finish to preserve the work against the elements. However, the Sticker Bus is designed to be used, not just viewed. With a reliable engine and new tires, the vehicle has become a Richmond icon serving as a mobile pop-up for First Fridays that will one day provide transportation to the proposed Manchester Art Park.
                  </p>
               </div>
            </div>
          </div>
        </section>

        {/* 4. ABOUT / TEAM SECTION */}
        <section id="about" className="min-h-screen flex flex-col justify-center px-6 py-16 md:py-24 bg-black text-white border-b border-zinc-800 scroll-mt-20 overflow-hidden relative">
          
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="mb-10 md:mb-16">
               {/* Updated Header: Removed Icon, removed period, changed color to white */}
               <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
                 The Team
               </h2>
            </div>

            {/* TEAM MEMBERS GRID */}
            <div className="grid md:grid-cols-3 gap-8 items-start">
               {TEAM_MEMBERS.map((member, i) => (
                 <div key={i} className="group relative">
                   
                   {/* Card / Pedestal */}
                   <div className="h-[400px] w-full bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden relative flex flex-col items-center justify-center">
                      
                      {/* 3D Element */}
                      <div className="absolute inset-0 flex items-center justify-center">
                         <Model3D src={member.modelSrc} alt={`3D Scan of ${member.name}`} />
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none"></div>
                   </div>

                   {/* Label & Blurb */}
                   <div className="mt-6 text-center">
                      <h3 className="text-2xl font-bold uppercase tracking-tight">{member.name}</h3>
                      {/* Applied specific blue color #77B3F7 to the role */}
                      <p className="text-[#77B3F7] font-medium text-sm uppercase tracking-wider mb-4">{member.role}</p>
                      <p className="text-zinc-400 text-[1rem] leading-relaxed text-left">
                        {member.blurb}
                      </p>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* 5. SPONSORS SECTION */}
        <section id="sponsors" className="min-h-screen flex flex-col items-center justify-center px-6 py-16 md:py-24 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto w-full space-y-16 md:space-y-32">
            
            {/* PARTNERS BLOCK (Top - 5 Logos) */}
            <div>
                <div className="text-center mb-8 md:mb-12">
                   <div className="inline-flex items-center justify-center p-3 bg-zinc-100 rounded-full mb-6">
                     <Handshake className="text-[#105CB3]" size={24} />
                   </div>
                   <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
                     Our Partners
                   </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
                   {PARTNER_LOGOS.map((logo, i) => (
                     <div key={i} className="group aspect-[4/3] bg-[#105CB3] flex items-center justify-center transition-all duration-500 hover:bg-blue-950 hover:shadow-lg border border-transparent hover:border-black/5 rounded-lg p-1">
                        <img src={logo} alt={`Partner Logo ${i + 1}`} className="w-full h-full object-contain transition-all duration-500" />
                     </div>
                   ))}
                </div>
            </div>

            {/* SPONSORS BLOCK (Bottom - 17 Logos) */}
            <div>
                <div className="text-center mb-8 md:mb-12">
                   <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
                     Our Sponsors
                   </h2>
                </div>

                {/* Changed to Flex for centering the last row items */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                   {SPONSOR_LOGOS.map((logo, i) => (
                     <div 
                        key={i} 
                        className="group w-[calc(50%-0.5rem)] md:w-[calc(20%-1.6rem)] aspect-[4/3] bg-zinc-900 flex items-center justify-center transition-all duration-500 hover:bg-black hover:shadow-lg border border-transparent hover:border-zinc-800 rounded-lg p-1"
                     >
                        <img src={logo} alt={`Sponsor Logo ${i + 1}`} className="w-full h-full object-contain transition-all duration-500" />
                     </div>
                   ))}
                </div>
            </div>

            {/* Quote Block */}
            <div className="p-8 md:p-12 bg-black text-white rounded-3xl text-center relative overflow-hidden">
               <div className="relative z-10">
                 <Quote size={48} className="mx-auto mb-6 text-zinc-600" />
                 <h3 className="text-2xl md:text-4xl font-bold mb-8 max-w-3xl mx-auto leading-tight">
                   "Little Giant Society isn't just building a park; they are building the future identity of Richmond."
                 </h3>
                 <cite className="not-italic text-zinc-400 font-medium">
                   — Sarah Jenkins, City Planner
                 </cite>
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </section>

        {/* 6. EVENTS SECTION */}
        <section id="events" className="min-h-screen flex flex-col justify-center px-6 py-16 md:py-24 bg-[#D6E8FC] border-b border-black scroll-mt-20">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-end justify-between mb-10 md:mb-16 border-b-2 border-black/10 pb-8">
               <div>
                 <div className="flex items-center gap-2 text-zinc-600 font-bold uppercase tracking-widest mb-4">
                    <Calendar size={20} />
                    <span>Events</span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black">
                    Upcoming<br/>Events
                  </h2>
               </div>
               <button 
                onClick={() => setIsEventsModalOpen(true)}
                className="hidden md:flex items-center gap-2 font-bold uppercase tracking-wider hover:translate-x-2 transition-transform focus:outline-none focus:underline"
                aria-label={`View full calendar, ${EVENTS_DATA.length} events`}
               >
                 Full Calendar ({EVENTS_DATA.length}) <ArrowRight size={16} />
               </button>
            </div>

            {EVENTS_DATA.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {EVENTS_DATA.slice(0, 3).map((event, i) => (
                     <div key={i} className="group bg-white border border-black/10 p-8 hover:shadow-xl transition-all hover:-translate-y-2">
                        <div className="text-xs font-bold bg-zinc-100 text-zinc-500 px-3 py-1 inline-block rounded-full mb-6">
                          {event.date}
                        </div>
                        <h3 className="text-3xl font-bold mb-4 group-hover:underline decoration-2 underline-offset-4 text-black">
                          {event.title}
                        </h3>
                        <p className="text-zinc-500 mb-6 line-clamp-3">
                          {event.description}
                        </p>
                        <button className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-zinc-400 cursor-not-allowed">
                          Details Coming Soon
                        </button>
                     </div>
                   ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-black/10 rounded-2xl bg-white/50">
                    <Calendar size={48} className="text-zinc-300 mb-4" />
                    <p className="text-xl font-bold text-zinc-400 uppercase tracking-widest">No Upcoming Events</p>
                </div>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer id="footer" className="bg-[#050810] py-12 md:py-20 px-6 text-white">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
               <div className="flex items-center gap-3 mb-6">
                  {/* Footer Logo - Updated to correct Logo */}
                  <div className="relative w-8 h-8 flex items-center justify-center rounded-full overflow-hidden bg-white">
                    <img 
                      src="https://res.cloudinary.com/datad8tms/image/upload/v1766276532/Logo_gezcwn.png" 
                      alt="LGS Logo" 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const fallback = (e.target as HTMLImageElement).nextElementSibling;
                        if (fallback) fallback.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden absolute inset-0 bg-zinc-800 rounded-full flex items-center justify-center">
                       <span className="text-zinc-400 font-bold text-[10px]">LGS</span>
                    </div>
                  </div>
                  <span className="font-bold uppercase tracking-widest text-white">Little Giant Society</span>
               </div>
               <p className="max-w-xs text-zinc-400 mb-8">
                 A 501(c)3 Non-Profit creating Richmond’s 1st Public Art Park & dedicated to essential creative support.
               </p>
               <div className="flex gap-4">
                 <label htmlFor="footer-email" className="sr-only">Email Address</label>
                 <input 
                    id="footer-email"
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-transparent border-b border-white/40 py-2 focus:outline-none w-full max-w-xs placeholder-zinc-500 text-white focus:border-white transition-colors" 
                  />
                 <button className="font-bold uppercase tracking-wider text-sm hover:underline text-white focus:outline-none focus:underline">Subscribe</button>
               </div>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest mb-6 text-white">Sitemap</h4>
              <ul className="space-y-4 text-zinc-400">
                <li><a href="#hero" className="hover:text-white transition-colors focus:text-white">Home</a></li>
                <li><a href="#mission" className="hover:text-white transition-colors focus:text-white">Mission</a></li>
                <li><a href="#about" className="hover:text-white transition-colors focus:text-white">Team</a></li>
                <li><a href="#proposal" className="hover:text-white transition-colors focus:text-white">The Proposal</a></li>
                <li><a href="#events" className="hover:text-white transition-colors focus:text-white">Events</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest mb-6 text-white">Connect</h4>
              <ul className="space-y-4 text-zinc-400">
                <li><a href="https://www.instagram.com/little.giant.society/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors focus:text-white" aria-label="Instagram">Instagram</a></li>
                <li>
                  <button onClick={() => setIsContactModalOpen(true)} className="hover:text-white transition-colors focus:text-white text-left">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-16 md:mt-20 pt-8 border-t border-white/10 flex flex-col items-center text-sm text-zinc-500 gap-4">
             <div className="flex gap-6">
               <button onClick={() => setActivePolicy('privacy')} className="hover:text-zinc-300 transition-colors focus:text-zinc-300">Privacy Policy</button>
               <button onClick={() => setActivePolicy('terms')} className="hover:text-zinc-300 transition-colors focus:text-zinc-300">Terms of Service</button>
               <button onClick={() => setActivePolicy('cookie')} className="hover:text-zinc-300 transition-colors focus:text-zinc-300">Cookie Policy</button>
             </div>
             <span>© 2024 Little Giant Society. All rights reserved.</span>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default Website;