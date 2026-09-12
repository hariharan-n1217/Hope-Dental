import React, { useState, useRef, useEffect } from 'react';

// --- IMAGE IMPORTS ---
import clinicLogo from './assets/logo.jpeg';
import imgGapClosure from './assets/hopedental-results1.png';
import imgMakeover from './assets/hopedental-results2.png';
import imgVeneers from './assets/hopedental-results3.png';

// 5 Real Clinic Photos for Background Carousel
import heroImg1 from './assets/home-hopedental001.jpg';
import heroImg2 from './assets/home-hopedental002.jpg';
import heroImg3 from './assets/home-hopedental003.jpg';
import heroImg4 from './assets/home-hopedental004.jpg';
import heroImg5 from './assets/home-hopedental005.jpg';

// General Treatments Dedicated Images
import imgCheckup from './assets/treatment-checkup-hopedental.jpg';
import imgPainRelief from './assets/treatment-pain-hopedental.jpg';
import imgRootCanal from './assets/treatment-rct-hopedental.jpg';
import imgOrtho from './assets/treatment-ortho-hopedental.jpg';
import imgImplants from './assets/treatment-implants-hopedental.jpg';
import imgWhitening from './assets/treatment-whitening-hopedental.webp';

// Kids Zone Top Showcase Images
import kidSmile1 from './assets/kid-smile-hopedental.jpg';
import kidSmile2 from './assets/kid2-smile-hopedental.jpg';

// Kids Treatments Individual Images
import kidTreatmentCavities from './assets/kids-cavities-hopedental.jpg';
import kidTreatmentSealants from './assets/Pit-Fissure-Sealants-hopedental.jpg';
import kidTreatmentRootCanal from './assets/root-canel-hopedental.jpg';
import kidTreatmentSpaceMaintainer from './assets/smile-hopedental.jpg';
import kidTreatmentHabit from './assets/kid2-habit-hopedental.jpg';
import kidTreatmentPolishing from './assets/polishing-hopedental.jpg';

const API_BASE_URL = "";
const CLINIC_WHATSAPP_NUMBER = "9043871809";

export default function App() {
  const [activeTab, setActiveTab] = useState('main');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLikOpen, setIsLikOpen] = useState(false);
  const [isThreeDotOpen, setIsThreeDotOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // 5-Image Carousel Background State
  const heroBackgrounds = [
    { img: heroImg5, caption: "Vallalar Medicals & Hope Dental Hub • Main Entrance" },
    { img: heroImg3, caption: "Consultation & Clinical Procedure Suite" },
    { img: heroImg2, caption: "Modern Advanced Motorized Dental Chair & Monitor" },
    { img: heroImg1, caption: "Dr. Sindhu Shanmugavel (B.D.S., General Dentist)" },
    { img: heroImg4, caption: "Sterile & Comfortable Patient Waiting Lounge" },
  ];
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Auto-slide every 4.5 seconds with cross-fade
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroBackgrounds.length]);

  const fullHeroTitle = "Welcome to Hope Dental Hub";
  const [displayedTitle, setDisplayedTitle] = useState("");

  // Headline typewriter effect
  useEffect(() => {
    let index = 0;
    setDisplayedTitle("");
    const timer = setInterval(() => {
      if (index <= fullHeroTitle.length) {
        setDisplayedTitle(fullHeroTitle.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 60);
    return () => clearInterval(timer);
  }, [activeTab]);

  // Observer to reveal elements smoothly as the user scrolls
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px 80px 0px"
      }
    );

    const elements = document.querySelectorAll('.reveal-box');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeTab]);

  // Close three dots dropdown if clicking outside
  const threeDotRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (threeDotRef.current && !threeDotRef.current.contains(event.target)) {
        setIsThreeDotOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: "Vanakkam! I'm <strong>LIK</strong>, your Hope Dental AI Assistant.<br>Enkitta treatment pathi, Dr. Sindhu Shanmugavel pathi English, Tamil, or Tanglish-la kelunga!"
    }
  ]);
  const [queryInput, setQueryInput] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    preferred_date: '',
    session_slot: 'Morning',
    treatment: 'Checkup & Consultation'
  });
  const [submitted, setSubmitted] = useState(false);

  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  // --- GENERAL TREATMENTS DATA ---
  const treatmentsData = [
    {
      id: 1,
      title: 'Checkup & Consultation',
      tamil: 'பல் பரிசோதனை',
      shortDesc: 'Routine oral health evaluation, early diagnosis, digital X-rays, and customized treatment planning.',
      fullDesc: 'Comprehensive oral examination using digital diagnostic equipment. We detect hidden decay, gum issues, and bite anomalies early to preserve your natural smile.',
      badge: 'Preventive Care',
      benefits: ['Digital X-Ray screening', 'Plaque and tartar assessment', 'Personalized oral hygiene roadmap'],
      sampleImage: imgCheckup,
      icon: '🩺'
    },
    {
      id: 2,
      title: 'Pain & Sensitivity Relief',
      tamil: 'பல் வலி & கூச்சம் சிகிச்சை',
      shortDesc: 'Instant relief for acute toothache, nerve irritation, hot/cold sensitivity, and sudden dental trauma.',
      fullDesc: 'Targeted instant relief for sharp toothaches, deep sensitivity to hot/cold foods, broken enamel, and acute pulpitis using advanced desensitizing agents.',
      badge: 'Emergency Care',
      benefits: ['Instant toothache relief', 'Pulp & nerve protection', 'Fluoride enamel seal'],
      sampleImage: imgPainRelief,
      icon: '⚡'
    },
    {
      id: 3,
      title: 'Root Canal Treatment (RCT)',
      tamil: 'வேர் சிகிச்சை',
      shortDesc: 'Painless single or multi-visit root canal procedures to rescue deeply decayed natural teeth.',
      fullDesc: 'Gentle, motorized procedure to save infected teeth. We clean root canals with precision and reinforce teeth with custom zirconia/ceramic crowns.',
      badge: 'Painless Therapy',
      benefits: ['Preserves natural tooth structure', 'Gentle rotary endodontics', 'Custom zirconia crowns'],
      sampleImage: imgRootCanal,
      icon: '🦷'
    },
    {
      id: 4,
      title: 'Orthodontics & Invisalign',
      tamil: 'பல் சீரமைத்தல் / Clear Aligners',
      shortDesc: 'Traditional metal/ceramic braces and clear invisible aligners for crooked or spaced teeth.',
      fullDesc: 'Straighten crooked or spaced teeth using modern invisible clear aligners or ceramic braces suited for kids, teens, and adults.',
      badge: 'Smile Alignment',
      benefits: ['Invisible aligners', 'Digital 3D tooth mapping', 'Corrects bite & gaps seamlessly'],
      sampleImage: imgOrtho,
      icon: '✨'
    },
    {
      id: 5,
      title: 'Implants & Dentures',
      tamil: 'செயற்கை பல் பொருத்துதல்',
      shortDesc: 'Permanent titanium dental implants, bridges, and flexible partial/complete dentures.',
      fullDesc: 'Permanent tooth replacement restoring 100% bite function and facial aesthetics using surgical titanium roots and lightweight dentures.',
      badge: 'Permanent Fix',
      benefits: ['Titanium root stability', 'Natural bite & clear speech', 'Single or full arch replacement'],
      sampleImage: imgImplants,
      icon: '🔩'
    },
    {
      id: 6,
      title: 'Dental Makeover & Whitening',
      tamil: 'Dental Makeover / Veneers',
      shortDesc: 'Smile design, aesthetic composite veneers, and laser teeth whitening for radiant smiles.',
      fullDesc: 'Transform stained or chipped teeth with customized porcelain/composite veneers and fast-acting clinic laser whitening.',
      badge: 'Cosmetic Magic',
      benefits: ['2–4 shades brighter smile', 'Restores chipped enamel', 'Single visit smile lift'],
      sampleImage: imgWhitening,
      icon: '💎'
    }
  ];

  // --- KIDS TREATMENTS ---
  const kidsTreatmentsData = [
    {
      id: 'k1',
      title: 'Cavity Shield & Fluoride Varnish',
      tamil: 'குழந்தைகளுக்கான சொத்தை பல் தடுப்பு',
      badge: '100% Pain-Free',
      image: kidTreatmentCavities,
      desc: 'Topical fluoride gently painted onto young teeth to strengthen soft enamel and shield against sweet-induced cavities.',
      benefits: ['Takes 2 minutes', 'Stops acid attacks from sweets', 'Pleasant fruit flavor']
    },
    {
      id: 'k2',
      title: 'Dental Pit & Fissure Sealants',
      tamil: 'பல் இடுக்கு சீலண்ட் சிகிச்சை',
      badge: 'Preventive Shield',
      image: kidTreatmentSealants,
      desc: 'A thin protective shield smoothed over deep chewing grooves of molars to stop trapped food particles and bacteria.',
      benefits: ['Cuts cavity risk by 80%', 'No drilling or needles', 'Long-lasting guard']
    },
    {
      id: 'k3',
      title: 'Gentle Baby Tooth Root Therapy',
      tamil: 'பால் பல் வேர் பாதுகாப்பு',
      badge: 'Comfort Care',
      image: kidTreatmentRootCanal,
      desc: 'Soothes inflamed nerves inside milk teeth, avoiding early extraction and protecting jaw alignment.',
      benefits: ['Instant night pain relief', 'Preserves natural chewing', 'Cute child crowns']
    },
    {
      id: 'k4',
      title: 'Space Maintainers for Milk Teeth',
      tamil: 'பல் வரிசை இடைவெளி பாதுகாப்பு',
      badge: 'Alignment Guard',
      image: kidTreatmentSpaceMaintainer,
      desc: 'Holds the exact gap open if a baby tooth falls early, ensuring permanent teeth erupt straight.',
      benefits: ['Stops crowded future teeth', 'Custom comfortable fit', 'Avoids heavy braces later']
    },
    {
      id: 'k5',
      title: 'Kids Habit Correction',
      tamil: 'பழக்கவழக்க சீரமைப்பு சிகிச்சை',
      badge: 'Early Guidance',
      image: kidTreatmentHabit,
      desc: 'Gentle oral appliances and counseling helping kids stop thumb-sucking and mouth-breathing safely.',
      benefits: ['Protects jaw formation', 'Non-invasive habit guide', 'Improves night sleep']
    },
    {
      id: 'k6',
      title: 'Fun Polishing & Cleaning',
      tamil: 'குழந்தைகள் பல் சுத்தம்',
      badge: 'Fear-Free Visit',
      image: kidTreatmentPolishing,
      desc: 'A fun polishing visit using soft spinning brushes and tasty pastes that builds lifelong confidence.',
      benefits: ['Removes juice stains', 'Sparkling clean teeth', 'Gifts and positive reinforcement']
    }
  ];

  // --- FAQS DATA ---
  const adultFaqs = [
    {
      q: "How often should I get my dental checkup done?",
      a: "We recommend visiting every 6 months for a routine digital checkup and tartar cleaning. This catches minor enamel decay before it turns into a painful root canal."
    },
    {
      q: "Is Root Canal Treatment (RCT) painful at Hope Dental Hub?",
      a: "Not at all! Dr. Sindhu Shanmugavel uses advanced micro-numbing techniques and gentle motorized rotary files, making the entire procedure completely painless and stress-free."
    },
    {
      q: "What is the difference between traditional braces and Invisalign?",
      a: "Traditional braces use metal or ceramic brackets on teeth, while Invisalign uses removable, transparent custom plastic aligners that are completely invisible when you smile or speak."
    },
    {
      q: "How long do dental implants last?",
      a: "Titanium dental implants integrate permanently with your jawbone. With regular oral hygiene and routine checkups, dental implants can last a lifetime."
    },
    {
      q: "What are the clinic visiting hours in Pollachi?",
      a: "Our clinic is open Monday to Saturday with two convenient sessions: Morning 10:30 AM – 1:30 PM and Evening 5:00 PM – 9:00 PM."
    }
  ];

  const kidsFaqs = [
    {
      q: "When should my child visit the dentist for the first time?",
      a: "Pediatric guidelines recommend a checkup by their 1st birthday or within 6 months after their first baby tooth emerges to monitor healthy jaw and enamel development."
    },
    {
      q: "Why should we protect baby teeth if they naturally fall out?",
      a: "Baby teeth guide speech clarity, proper chewing nutrition, and act as natural placeholders for upcoming permanent teeth to prevent crooked teeth later."
    },
    {
      q: "How do dental pit & fissure sealants protect molars?",
      a: "Sealants act as an invisible raincoat over the deep chewing grooves of back molars, blocking out 80% of sweet-induced bacteria and food debris."
    },
    {
      q: "How do you make children feel comfortable and fear-free?",
      a: "We use a gentle 'tell-show-do' playful approach with kid-friendly fruit flavors and rewards, ensuring zero tears and building joyful dental habits."
    }
  ];

  const currentFaqs = activeTab === 'kids' ? kidsFaqs : adultFaqs;

  const scrollToSection = (id) => {
    setIsThreeDotOpen(false);
    if (activeTab !== 'main') {
      setActiveTab('main');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_BASE_URL}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.error("Backend logging fallback active", err);
    }

    const whatsappMessage = 
`Hello Hope Dental Hub! 👋
I would like to book an appointment:

👤 *Name:* ${formData.full_name}
📞 *Phone:* ${formData.phone}
📅 *Preferred Date:* ${formData.preferred_date}
🩺 *Treatment:* ${formData.treatment}
⏰ *Session Slot:* ${formData.session_slot}`;

    window.open(`https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    setSubmitted(true);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!queryInput.trim()) return;

    const userText = queryInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setQueryInput('');
    setIsTyping(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat/lik`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query: userText,
          language: selectedLang 
        })
      });
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      setChatMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: "Hope Dental Hub-la Dr. Sindhu Shanmugavel (BDS) leading dental care tharanga.<br><br>Direct-ah call/WhatsApp panna click: <strong>+91 9043871809</strong>!"
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    // Fixed mobile top padding (pt-16 for mobile, md:pt-4 for laptop) so top header is never hidden
    <div className="pt-16 md:pt-4 min-h-screen w-full overflow-x-hidden bg-slate-50 text-[#0c1d2d] font-sans antialiased selection:bg-[#0d8a7b] selection:text-white flex flex-col justify-between">
      
      <div>
        {/* TOP CONTACT & TIMINGS BAR */}
        <div className="bg-[#0c1d2d] text-slate-200 text-xs py-2 px-3 sm:px-6 border-b border-[#112538] fixed top-0 left-0 w-full z-40">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-[11px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-[#0d8a7b] animate-ping"></span>
              <span className="font-semibold text-white">Hope Dental Hub</span>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <span className="text-slate-300">Dr. Sindhu Shanmugavel (BDS) • Pollachi</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-300 font-medium">
              <span>🕒 10:30 AM – 1:30 PM</span>
              <span>|</span>
              <span>5:00 PM – 9:00 PM</span>
            </div>
          </div>
        </div>

        {/* ALWAYS STICKY NAVBAR */}
        <header className="sticky top-8 sm:top-9 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
            
            {/* Logo & Brand Name */}
            <div 
              className="flex items-center gap-2.5 cursor-pointer shrink-0" 
              onClick={() => { setActiveTab('main'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <img 
                src={clinicLogo} 
                alt="Hope Dental Hub Logo" 
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl object-cover shadow-md shrink-0 border border-teal-100 ring-2 ring-teal-500/20"
              />
              <div>
                <span className="text-sm sm:text-lg font-black tracking-tight text-[#0c1d2d] hover:text-[#0d8a7b] block leading-none font-mono">
                  HOPE DENTAL HUB
                </span>
                <span className="text-[7px] sm:text-[9px] font-extrabold tracking-widest text-[#0d8a7b] uppercase block mt-0.5">
                  ADULTS & KIDS
                </span>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200 shrink-0">
              <button
                onClick={() => setActiveTab('main')}
                className={`px-2.5 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all ${
                  activeTab === 'main' ? 'bg-white text-[#0c1d2d] shadow-sm' : 'text-slate-500 hover:text-[#0c1d2d]'
                }`}
              >
                Main Clinic
              </button>
              <button
                onClick={() => setActiveTab('kids')}
                className={`px-2.5 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all flex items-center gap-1 ${
                  activeTab === 'kids' ? 'bg-gradient-to-r from-amber-400 to-pink-500 text-white shadow-sm' : 'text-amber-600 hover:text-amber-700'
                }`}
              >
                <span>🎈</span> <span>Kids Zone</span>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600">
              <button onClick={() => scrollToSection('treatments')} className="hover:text-[#0d8a7b] transition-colors">Treatments</button>
              <button onClick={() => scrollToSection('transformations')} className="hover:text-[#0d8a7b] transition-colors">Results</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-[#0d8a7b] transition-colors">About Doctor</button>
              <button onClick={() => scrollToSection('faq')} className="hover:text-[#0d8a7b] transition-colors">FAQ</button>
              <button onClick={() => scrollToSection('hours')} className="hover:text-[#0d8a7b] transition-colors">Contact</button>
            </nav>

            {/* Actions & Three-Dot Dropdown Trigger */}
            <div className="flex items-center gap-2" ref={threeDotRef}>
              <button 
                onClick={() => setIsLikOpen(true)} 
                className="bg-[#e6f7f5] text-[#0d8a7b] border border-[#0d8a7b]/30 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold hover:bg-[#d4eee9] transition-all flex items-center gap-1.5 shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d8a7b] animate-ping"></span> Ask AI
              </button>
              
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="hidden sm:inline-block bg-[#0d8a7b] hover:bg-[#0a7265] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-[#0d8a7b]/20 transition-all shrink-0"
              >
                Book Visit
              </button>

              {/* THREE DOTS (⋮) BUTTON */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsThreeDotOpen(!isThreeDotOpen)}
                  className="p-2 rounded-xl bg-slate-100 text-[#0c1d2d] hover:bg-slate-200 transition-colors flex items-center justify-center font-black text-base"
                  aria-label="Toggle menu"
                >
                  ⋮
                </button>

                {/* THREE DOTS EXPANDABLE DROPDOWN */}
                {isThreeDotOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-200 text-xs font-bold text-slate-700">
                    <div className="px-3.5 py-1.5 border-b border-slate-100 text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                      Quick Clinic Links
                    </div>
                    <button 
                      onClick={() => scrollToSection('treatments')} 
                      className="w-full text-left px-3.5 py-2 hover:bg-teal-50 hover:text-[#0d8a7b] flex items-center gap-2"
                    >
                      <span>🦷</span> All Dental Treatments
                    </button>
                    <button 
                      onClick={() => scrollToSection('transformations')} 
                      className="w-full text-left px-3.5 py-2 hover:bg-teal-50 hover:text-[#0d8a7b] flex items-center gap-2"
                    >
                      <span>📸</span> Before & After Results
                    </button>
                    <button 
                      onClick={() => scrollToSection('about')} 
                      className="w-full text-left px-3.5 py-2 hover:bg-teal-50 hover:text-[#0d8a7b] flex items-center gap-2"
                    >
                      <span>👩‍⚕️</span> About Dr. Sindhu
                    </button>
                    <button 
                      onClick={() => scrollToSection('faq')} 
                      className="w-full text-left px-3.5 py-2 hover:bg-teal-50 hover:text-[#0d8a7b] flex items-center gap-2"
                    >
                      <span>❓</span> Patient FAQ Guide
                    </button>
                    <button 
                      onClick={() => scrollToSection('hours')} 
                      className="w-full text-left px-3.5 py-2 hover:bg-teal-50 hover:text-[#0d8a7b] flex items-center gap-2"
                    >
                      <span>📍</span> Operating Hours & Address
                    </button>
                    <div className="p-2 pt-1 border-t border-slate-100 mt-1 flex flex-col gap-1.5">
                      <button
                        onClick={() => { setIsThreeDotOpen(false); setIsModalOpen(true); }}
                        className="w-full bg-[#0d8a7b] text-white py-2 rounded-xl text-center font-bold"
                      >
                        Book Appointment
                      </button>
                      <a
                        href={`tel:+91${CLINIC_WHATSAPP_NUMBER}`}
                        className="w-full bg-slate-100 text-slate-800 hover:bg-slate-200 py-1.5 rounded-xl text-center font-bold flex items-center justify-center gap-1"
                      >
                        📞 Call Clinic
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ==================================================== */}
        {/* KIDS DENTAL PAGE VIEW                                */}
        {/* ==================================================== */}
        {activeTab === 'kids' ? (
          <main className="w-full">
            <section className="relative py-8 sm:py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-amber-50/70 via-pink-50/40 to-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                  <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
                    <div className="reveal-box inline-flex items-center gap-1.5 border border-amber-300 bg-amber-100/70 text-amber-800 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-xs" style={{ transitionDelay: '0.1s' }}>
                      <span>🎈</span>
                      <span>100% Fear-Free • Friendly Pediatric Dental Care</span>
                    </div>

                    <h1 className="reveal-box text-2xl sm:text-5xl lg:text-6xl font-black text-[#0c1d2d] tracking-tight leading-tight" style={{ transitionDelay: '0.2s' }}>
                      Happy Smiles for <br className="hidden sm:inline" />
                      <span className="bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                        Your Little Champions!
                      </span>
                    </h1>

                    <p className="reveal-box text-slate-600 text-xs sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium" style={{ transitionDelay: '0.3s' }}>
                      At Hope Dental Hub, dental visits are an exciting, joyful, and completely pain-free journey under Dr. Sindhu Shanmugavel (BDS).
                    </p>

                    <div className="reveal-box pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center justify-center lg:justify-start" style={{ transitionDelay: '0.4s' }}>
                      <button 
                        onClick={() => {
                          setFormData(prev => ({ ...prev, treatment: 'Cavity Shield & Fluoride Varnish' }));
                          setIsModalOpen(true);
                        }} 
                        className="bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white font-black px-5 sm:px-8 py-3.5 rounded-2xl shadow-xl shadow-pink-500/20 transition-all text-xs flex items-center justify-center gap-2 hover:scale-[1.02]"
                      >
                        <span>🧸</span> Schedule Kid's Checkup
                      </button>
                      <button 
                        onClick={() => {
                          setQueryInput("What pediatric treatments do you offer for milk teeth?");
                          setIsLikOpen(true);
                        }} 
                        className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold px-4 sm:px-6 py-3.5 rounded-2xl transition-all text-xs flex items-center justify-center gap-2 shadow-xs"
                      >
                        💬 Ask LIK AI About Kids Care
                      </button>
                    </div>

                    <div className="reveal-box pt-4 sm:pt-6 border-t border-amber-100 grid grid-cols-3 gap-1.5 sm:gap-4 max-w-md mx-auto lg:mx-0" style={{ transitionDelay: '0.5s' }}>
                      <div className="bg-white p-2.5 rounded-2xl border border-amber-100 shadow-sm text-center">
                        <p className="text-xs sm:text-xl font-black text-amber-600">Zero Tears</p>
                        <p className="text-[8px] sm:text-[10px] text-slate-500 font-semibold mt-0.5">Gentle Care</p>
                      </div>
                      <div className="bg-white p-2.5 rounded-2xl border border-pink-100 shadow-sm text-center">
                        <p className="text-xs sm:text-xl font-black text-pink-600">Fluoride</p>
                        <p className="text-[8px] sm:text-[10px] text-slate-500 font-semibold mt-0.5">Anti-Cavity</p>
                      </div>
                      <div className="bg-white p-2.5 rounded-2xl border border-purple-100 shadow-sm text-center">
                        <p className="text-xs sm:text-xl font-black text-purple-600">Playful</p>
                        <p className="text-[8px] sm:text-[10px] text-slate-500 font-semibold mt-0.5">Warm Team</p>
                      </div>
                    </div>
                  </div>

                  <div className="reveal-box lg:col-span-5 relative mt-4 lg:mt-0" style={{ transitionDelay: '0.3s' }}>
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-4 max-w-sm mx-auto">
                      <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 border-white bg-amber-100 hover:scale-105 transition-all duration-300">
                        <img 
                          src={kidSmile1} 
                          alt="Happy child smiling" 
                          className="w-full h-36 sm:h-64 object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1d2d]/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-2 left-2 right-2 text-white">
                          <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-wider bg-amber-500 text-white px-1.5 py-0.5 rounded">
                            Cavity-Free
                          </span>
                          <p className="text-[10px] sm:text-xs font-black mt-0.5">Confident Smiles</p>
                        </div>
                      </div>

                      <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-2 border-white bg-pink-100 mt-3 sm:mt-6 hover:scale-105 transition-all duration-300">
                        <img 
                          src={kidSmile2} 
                          alt="Joyful girl laughing" 
                          className="w-full h-36 sm:h-64 object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1d2d]/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-2 left-2 right-2 text-white">
                          <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-wider bg-pink-500 text-white px-1.5 py-0.5 rounded">
                            Pain-Free
                          </span>
                          <p className="text-[10px] sm:text-xs font-black mt-0.5">Zero Tears</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Kids Treatments Grid */}
            <section className="py-12 sm:py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="reveal-box text-center max-w-2xl mx-auto mb-8 sm:mb-14" style={{ transitionDelay: '0.1s' }}>
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-amber-600 tracking-widest uppercase bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    CHILDREN'S SPECIALIZED DENTAL CARE
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-[#0c1d2d] mt-2 tracking-tight">
                    Tailored Treatments for Young Teeth
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                  {kidsTreatmentsData.map((k, idx) => (
                    <div 
                      key={k.id}
                      className="reveal-box group bg-[#fcfdfa] rounded-2xl sm:rounded-3xl overflow-hidden border border-amber-200/80 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/15 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                      style={{ transitionDelay: `${idx * 0.15}s` }}
                    >
                      <div>
                        <div className="relative h-44 sm:h-48 w-full bg-slate-100 overflow-hidden">
                          <img 
                            src={k.image} 
                            alt={k.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          <span className="absolute top-2.5 left-2.5 bg-white/95 text-[#0c1d2d] text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md">
                            {k.badge}
                          </span>
                        </div>

                        <div className="p-4 sm:p-6 space-y-2">
                          <h3 className="font-bold text-[#0c1d2d] text-base sm:text-lg leading-snug">
                            {k.title}
                          </h3>
                          <p className="text-xs font-bold text-amber-700">{k.tamil}</p>
                          <p className="text-xs text-slate-600 leading-relaxed font-normal">{k.desc}</p>
                          <div className="pt-2 space-y-1">
                            {k.benefits.map((b, i) => (
                              <div key={i} className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                                <span>{b}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6 pt-0">
                        <button
                          onClick={() => {
                            setFormData(prev => ({ ...prev, treatment: k.title }));
                            setIsModalOpen(true);
                          }}
                          className="w-full bg-slate-100 hover:bg-gradient-to-r hover:from-amber-500 hover:to-pink-500 hover:text-white text-[#0c1d2d] text-xs font-bold py-2.5 rounded-xl transition-all shadow-xs text-center"
                        >
                          Book for Child →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        ) : (
          /* ==================================================== */
          /* MAIN CLINIC                                          */
          /* ==================================================== */
          <main className="w-full">
            
            <section className="relative min-h-[620px] sm:min-h-[680px] lg:min-h-[720px] flex items-center overflow-hidden border-b border-slate-200">
              
              {/* HIGH-RES REAL CLINIC BACKGROUND CAROUSEL */}
              <div className="absolute inset-0 z-0 bg-slate-950">
                {heroBackgrounds.map((slide, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 hero-fade-image transition-opacity duration-1000 ease-in-out ${
                      idx === currentBgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                  >
                    <img 
                      src={slide.img} 
                      alt={slide.caption}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35"></div>
              </div>

              {/* FOREGROUND HERO */}
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full flex flex-col justify-between min-h-[580px] sm:min-h-[620px]">
                
                <div className="grid lg:grid-cols-12 items-center">
                  
                  <div className="lg:col-span-8 ios-glass-bubble p-6 sm:p-9 rounded-[32px] sm:rounded-[38px] space-y-4 sm:space-y-5 text-center lg:text-left transition-all duration-300">
                    
                    <div className="inline-flex items-center gap-2 border border-white/80 bg-white/40 text-[#09594f] text-[10px] sm:text-xs font-mono font-black px-3.5 py-1.5 rounded-full shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[#0d8a7b] animate-ping"></span>
                      <span>● CLINICAL EXCELLENCE • YEAR 4 • POLLACHI</span>
                    </div>

                    <div className="min-h-[65px] sm:min-h-[100px] flex flex-col justify-center">
                      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0c1d2d] tracking-tight leading-[1.2] font-mono">
                        <span className="text-slate-600 block text-base sm:text-xl lg:text-2xl font-sans tracking-normal font-semibold mb-1">
                          Welcome to
                        </span>
                        <span className="bg-gradient-to-r from-[#0d8a7b] via-teal-700 to-emerald-800 bg-clip-text text-transparent drop-shadow-xs">
                          {displayedTitle.replace("Welcome to ", "")}
                        </span>
                        <span className="inline-block w-2 sm:w-2.5 h-5 sm:h-9 ml-1 bg-[#0d8a7b] align-middle animate-pulse"></span>
                      </h1>
                    </div>

                    <p className="text-slate-800 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                      Pollachi’s modern multi-specialty dental destination under <strong>Dr. Sindhu Shanmugavel (BDS)</strong>. Advanced, painless, state-of-the-art care for the whole family.
                    </p>

                    <div className="pt-1 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-center lg:justify-start">
                      <a 
                        href={`tel:+91${CLINIC_WHATSAPP_NUMBER}`}
                        className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-xs font-black tracking-wide overflow-hidden transition-all duration-300 bg-gradient-to-r from-[#0d8a7b] to-emerald-600 text-white shadow-xl shadow-[#0d8a7b]/30 hover:shadow-2xl hover:scale-[1.02] border border-white/60"
                      >
                        <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                        <svg className="w-4 h-4 fill-current transition-transform group-hover:rotate-12" viewBox="0 0 24 24">
                          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.03 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                        </svg>
                        <span>Call Clinic Directly</span>
                      </a>

                      <button 
                        onClick={() => setIsLikOpen(true)} 
                        className="ios-sub-bubble hover:bg-white/60 text-[#0c1d2d] font-bold px-6 py-3.5 rounded-2xl shadow-xs transition-all text-xs flex items-center justify-center gap-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#0d8a7b]"></span>
                        Ask Our LIK AI Assistant 
                      </button>
                    </div>

                    <div className="pt-3 border-t border-white/60 grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto lg:mx-0 text-[#0c1d2d]">
                      <div className="ios-sub-bubble p-2.5 rounded-2xl text-center">
                        <p className="text-base sm:text-xl font-black font-mono text-[#0d8a7b]">3+ Yrs</p>
                        <p className="text-[9px] sm:text-xs text-slate-700 font-bold mt-0.5">Trusted Clinic</p>
                      </div>
                      <div className="ios-sub-bubble p-2.5 rounded-2xl text-center">
                        <p className="text-base sm:text-xl font-black font-mono text-[#0d8a7b]">1000+</p>
                        <p className="text-[9px] sm:text-xs text-slate-700 font-bold mt-0.5">Treatments</p>
                      </div>
                      <div className="ios-sub-bubble p-2.5 rounded-2xl text-center">
                        <p className="text-base sm:text-xl font-black font-mono text-[#0d8a7b]">100%</p>
                        <p className="text-[9px] sm:text-xs text-slate-700 font-bold mt-0.5">Painless Care</p>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:block lg:col-span-4"></div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 ios-glass-bubble py-2.5 px-5 rounded-2xl max-w-lg">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="truncate">{heroBackgrounds[currentBgIndex].caption}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {heroBackgrounds.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setCurrentBgIndex(dotIdx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          dotIdx === currentBgIndex ? 'w-6 bg-[#0d8a7b]' : 'w-2 bg-white/80 hover:bg-white'
                        }`}
                        aria-label={`Slide to photo ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </section>

            {/* TREATMENTS CATALOG */}
            <section id="treatments" className="py-14 sm:py-20 bg-slate-50/70">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="reveal-box text-center max-w-2xl mx-auto mb-10 sm:mb-14" style={{ transitionDelay: '0.1s' }}>
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-[#0d8a7b] tracking-widest uppercase bg-teal-50 border border-[#0d8a7b]/30 px-3.5 py-1 rounded-full">
                    OUR CLINICAL PROCEDURES
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-[#0c1d2d] mt-2.5 tracking-tight">
                    Comprehensive Dental Treatments
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1.5">
                    Click any card to see clear treatment photos and procedure highlights.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {treatmentsData.map((item, index) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedTreatment(item)}
                      style={{ transitionDelay: `${index * 0.12}s` }}
                      className="reveal-box group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#0d8a7b] hover:shadow-2xl hover:shadow-[#0d8a7b]/15 transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-44 sm:h-52 w-full bg-slate-100 overflow-hidden">
                          <img 
                            src={item.sampleImage} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1d2d]/60 via-transparent to-transparent"></div>
                          <span className="absolute top-3 left-3 bg-white/95 text-[#0c1d2d] text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md">
                            {item.badge}
                          </span>
                        </div>

                        <div className="p-5 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{item.icon}</span>
                            <h3 className="font-bold text-[#0c1d2d] text-base sm:text-lg group-hover:text-[#0d8a7b] transition-colors">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-xs font-bold text-[#0d8a7b]">{item.tamil}</p>
                          <p className="text-xs text-slate-600 leading-relaxed">{item.shortDesc}</p>
                        </div>
                      </div>

                      <div className="p-5 pt-0">
                        <div className="w-full bg-teal-50 group-hover:bg-[#0d8a7b] group-hover:text-white text-[#0d8a7b] text-xs font-bold py-2.5 rounded-xl transition-all shadow-xs text-center flex items-center justify-center gap-1.5">
                          <span>View Details & Photo</span>
                          <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SMILE RESULTS */}
            <section id="transformations" className="py-14 sm:py-20 bg-white border-t border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="reveal-box text-center max-w-2xl mx-auto mb-10 sm:mb-14" style={{ transitionDelay: '0.1s' }}>
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-[#0d8a7b] tracking-widest uppercase">
                    CLINICAL SMILE RESULTS
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-[#0c1d2d] mt-2 tracking-tight">
                    Before & After Transformations
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="reveal-box group bg-slate-50/60 rounded-3xl p-5 border border-slate-200 hover:border-[#0d8a7b]/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5" style={{ transitionDelay: '0.15s' }}>
                    <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden bg-slate-100">
                      <img src={imgGapClosure} alt="Gap Closure Results" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-2.5 left-2.5 bg-[#0c1d2d]/80 text-white text-[9px] font-black px-2 py-0.5 rounded">BEFORE</span>
                      <span className="absolute top-2.5 right-2.5 bg-[#0d8a7b]/90 text-white text-[9px] font-black px-2 py-0.5 rounded">AFTER</span>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-bold text-[#0c1d2d] text-sm">Patient A. Gap Closure</h4>
                      <p className="text-xs text-slate-500 mt-1">Closed front gaps through clear aligners and gentle aesthetic bonding.</p>
                    </div>
                  </div>

                  <div className="reveal-box group bg-slate-50/60 rounded-3xl p-5 border border-slate-200 hover:border-[#0d8a7b]/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5" style={{ transitionDelay: '0.3s' }}>
                    <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden bg-slate-100">
                      <img src={imgVeneers} alt="Restoration Results" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-2.5 left-2.5 bg-[#0c1d2d]/80 text-white text-[9px] font-black px-2 py-0.5 rounded">BEFORE</span>
                      <span className="absolute top-2.5 right-2.5 bg-[#0d8a7b]/90 text-white text-[9px] font-black px-2 py-0.5 rounded">AFTER</span>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-bold text-[#0c1d2d] text-sm">Patient B. Full Restoration</h4>
                      <p className="text-xs text-slate-500 mt-1">Deep decay restored with root therapy and natural zirconia crowns.</p>
                    </div>
                  </div>

                  <div className="reveal-box group bg-slate-50/60 rounded-3xl p-5 border border-slate-200 hover:border-[#0d8a7b]/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5" style={{ transitionDelay: '0.45s' }}>
                    <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden bg-slate-100">
                      <img src={imgMakeover} alt="Smile Makeover Results" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-2.5 left-2.5 bg-[#0c1d2d]/80 text-white text-[9px] font-black px-2 py-0.5 rounded">BEFORE</span>
                      <span className="absolute top-2.5 right-2.5 bg-[#0d8a7b]/90 text-white text-[9px] font-black px-2 py-0.5 rounded">AFTER</span>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-bold text-[#0c1d2d] text-sm">Patient C. Smile Makeover</h4>
                      <p className="text-xs text-slate-500 mt-1">Staining and crowding corrected for a clean, natural smile.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ABOUT DOCTOR */}
            <section id="about" className="py-14 sm:py-20 bg-slate-50/70 border-t border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="reveal-box text-center max-w-2xl mx-auto mb-10 sm:mb-14" style={{ transitionDelay: '0.1s' }}>
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-[#0d8a7b] tracking-widest uppercase">
                    ABOUT OUR CLINIC
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-[#0c1d2d] mt-2 tracking-tight">
                    Meet Dr. Sindhu Shanmugavel
                  </h2>
                </div>

                <div className="grid lg:grid-cols-12 gap-6 items-stretch">
                  <div className="reveal-box lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-teal-200 shadow-xl shadow-teal-500/10 flex flex-col justify-between text-[#0c1d2d]" style={{ transitionDelay: '0.2s' }}>
                    <div>
                      <div className="flex items-center gap-3.5">
                        <img 
                          src={clinicLogo} 
                          alt="Hope Dental Clinic Logo" 
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-100 shadow-md shrink-0"
                        />
                        <div>
                          <h3 className="text-lg sm:text-xl font-black text-[#0c1d2d]">Dr. Sindhu Shanmugavel</h3>
                          <p className="text-[10px] sm:text-xs font-bold font-mono text-[#0d8a7b]">BDS • GENERAL DENTIST</p>
                          <p className="text-[9px] sm:text-xs text-slate-500 font-medium">Lead Practitioner @ Hope Dental Hub, Pollachi</p>
                        </div>
                      </div>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-4">
                        Experienced dental surgeon dedicated to transparent, compassionate, and 100% pain-free community oral healthcare in Pollachi.
                      </p>

                      <div className="mt-4 space-y-2 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-700">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0d8a7b] shrink-0"></span>
                          <span>Painless Root Canal & Zirconia Crowns</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0d8a7b] shrink-0"></span>
                          <span>Invisalign Clear Aligners & Braces</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0d8a7b] shrink-0"></span>
                          <span>Permanent Titanium Implants & Dentures</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0d8a7b] shrink-0"></span>
                          <span>Teeth Whitening & Smile Makeovers</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-slate-500">
                      <span>Morning & Evening Slots</span>
                      <span className="text-[#0d8a7b] bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">Open Mon - Sat</span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                    <div className="reveal-box bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:border-[#0d8a7b]/40 transition-all" style={{ transitionDelay: '0.15s' }}>
                      <span className="text-xs font-black text-[#0d8a7b] bg-teal-50 px-2.5 py-1 rounded-lg">01</span>
                      <h4 className="font-bold text-[#0c1d2d] mt-2 text-sm sm:text-base">3+ Years of Trust</h4>
                      <p className="text-xs text-slate-500 mt-1">Providing reliable and transparent dental solutions in Pollachi.</p>
                    </div>
                    <div className="reveal-box bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:border-[#0d8a7b]/40 transition-all" style={{ transitionDelay: '0.25s' }}>
                      <span className="text-xs font-black text-[#0d8a7b] bg-teal-50 px-2.5 py-1 rounded-lg">02</span>
                      <h4 className="font-bold text-[#0c1d2d] mt-2 text-sm sm:text-base">All-In-One Treatments</h4>
                      <p className="text-xs text-slate-500 mt-1">From cleanings to surgical implants and aesthetic makeovers.</p>
                    </div>
                    <div className="reveal-box bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:border-[#0d8a7b]/40 transition-all" style={{ transitionDelay: '0.35s' }}>
                      <span className="text-xs font-black text-[#0d8a7b] bg-teal-50 px-2.5 py-1 rounded-lg">03</span>
                      <h4 className="font-bold text-[#0c1d2d] mt-2 text-sm sm:text-base">Strict Sterilization</h4>
                      <p className="text-xs text-slate-500 mt-1">Class-B autoclave protocols for every clinical instrument.</p>
                    </div>
                    <div className="reveal-box bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:border-[#0d8a7b]/40 transition-all" style={{ transitionDelay: '0.45s' }}>
                      <span className="text-xs font-black text-[#0d8a7b] bg-teal-50 px-2.5 py-1 rounded-lg">04</span>
                      <h4 className="font-bold text-[#0c1d2d] mt-2 text-sm sm:text-base">Pain-Free Approach</h4>
                      <p className="text-xs text-slate-500 mt-1">Gentle numbing and friendly clinical reassurance for every patient.</p>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </main>
        )}
      </div>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="py-14 sm:py-20 bg-[#eef8f6] border-t border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[10px] sm:text-[11px] font-extrabold text-[#0d8a7b] tracking-widest uppercase bg-white px-3 py-1 rounded-full border border-teal-200 shadow-xs">
                PATIENT ASSISTANCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0c1d2d] tracking-tight leading-tight">
                Frequently <br />
                <span className="text-[#0d8a7b]">Asked Questions</span>
              </h2>
              <div className="w-16 h-1 bg-[#0d8a7b] rounded-full"></div>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                {activeTab === 'kids' 
                  ? "Everything caring parents need to know about pediatric dentistry, cavity prevention, and habit guidance for kids."
                  : "Find answers to the most common queries about procedures, recovery times, smile makeovers, and appointments."
                }
              </p>

              <div className="bg-white p-4 rounded-2xl border border-teal-200/80 shadow-xs space-y-2 mt-4">
                <p className="text-xs font-bold text-[#0c1d2d]">Have a specific query?</p>
                <p className="text-[11px] text-slate-500">Ask our 24/7 AI Dental Assistant LIK or talk directly to our clinic desk.</p>
                <div className="pt-2 flex gap-2">
                  <button 
                    onClick={() => setIsLikOpen(true)}
                    className="flex-1 bg-teal-50 text-[#0d8a7b] border border-teal-200 py-2 rounded-xl text-xs font-bold hover:bg-teal-100 transition-all text-center"
                  >
                    Ask AI LIK
                  </button>
                  <a 
                    href={`tel:+91${CLINIC_WHATSAPP_NUMBER}`}
                    className="flex-1 bg-[#0d8a7b] text-white py-2 rounded-xl text-xs font-bold hover:bg-[#0a7265] transition-all text-center"
                  >
                    Call Doctor
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-3">
              {currentFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div 
                    key={index}
                    className="reveal-box bg-white rounded-2xl border border-teal-100/80 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md"
                    style={{ transitionDelay: `${index * 0.08}s` }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      className="w-full text-left p-4 sm:p-5 flex justify-between items-center gap-4 transition-colors"
                    >
                      <span className="font-bold text-xs sm:text-sm text-[#0c1d2d] leading-snug">
                        {faq.q}
                      </span>
                      <span className={`text-lg sm:text-xl font-bold transition-transform duration-200 shrink-0 text-[#0d8a7b] ${isOpen ? 'rotate-45' : ''}`}>
                        +
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:p-5 pb-4 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                        <p className="pt-2.5">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* OPERATING HOURS & CONTACT */}
      <section id="hours" className="py-12 sm:py-20 bg-[#0c1d2d] text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            <div className="reveal-box lg:col-span-7 space-y-4" style={{ transitionDelay: '0.15s' }}>
              <div>
                <span className="text-[10px] font-mono font-extrabold text-[#90dcd0] uppercase tracking-widest">
                  பார்வை நேரம் • OPERATING HOURS
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
                  Visit Us During Clinic Hours
                </h2>
              </div>

              <div className="space-y-3">
                <div className="bg-[#112538] border border-slate-700/60 rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-bold text-[#90dcd0] uppercase">காலை • MORNING</p>
                    <p className="text-base sm:text-2xl font-black text-white">10:30 AM – 1:30 PM</p>
                  </div>
                  <span className="bg-[#0d8a7b]/20 text-[#90dcd0] border border-[#0d8a7b]/40 px-3 py-1 rounded-full text-xs font-bold">Session 1</span>
                </div>

                <div className="bg-[#112538] border border-slate-700/60 rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-bold text-[#90dcd0] uppercase">மாலை • EVENING</p>
                    <p className="text-base sm:text-2xl font-black text-white">5:00 PM – 9:00 PM</p>
                  </div>
                  <span className="bg-[#0d8a7b]/20 text-[#90dcd0] border border-[#0d8a7b]/40 px-3 py-1 rounded-full text-xs font-bold">Session 2</span>
                </div>
              </div>
            </div>

            <div id="contact" className="reveal-box lg:col-span-5 bg-white text-[#0c1d2d] rounded-3xl p-6 sm:p-8 shadow-2xl" style={{ transitionDelay: '0.3s' }}>
              <span className="text-[10px] font-black text-[#0d8a7b] uppercase tracking-widest">GET IN TOUCH</span>
              <h3 className="text-xl sm:text-2xl font-black mt-1">Hope Dental Hub</h3>
              <p className="text-xs text-slate-500">Lead Specialist: Dr. Sindhu Shanmugavel (BDS)</p>

              <div className="mt-4 space-y-3">
                <div className="bg-slate-50 rounded-2xl p-3.5 flex items-center gap-3 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0d8a7b] flex items-center justify-center font-bold text-lg">📞</div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">Appointments Phone / WhatsApp</span>
                    <p className="text-base font-black text-[#0c1d2d]">+91 {CLINIC_WHATSAPP_NUMBER}</p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-3.5 flex items-center gap-3 border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">✉️</div>
                  <div className="overflow-hidden">
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">Official Email</span>
                    <a href="mailto:hopedentalhub@gmail.com" className="text-xs font-black text-[#0c1d2d] hover:text-[#0d8a7b] truncate block">hopedentalhub@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <a href={`tel:+91${CLINIC_WHATSAPP_NUMBER}`} className="bg-[#0d8a7b] hover:bg-[#0a7265] text-white font-bold py-3 rounded-xl text-xs text-center">
                  Call Clinic
                </a>
                <button onClick={() => setIsLikOpen(true)} className="bg-[#0c1d2d] text-[#90dcd0] font-bold py-3 rounded-xl text-xs text-center">
                  Ask AI
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#06101a] text-slate-400 text-xs py-8 border-t border-[#0c1d2d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-5 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <img src={clinicLogo} alt="Hope Dental Hub Logo" className="w-8 h-8 rounded-xl object-cover border border-slate-700/60" />
            <div>
              <span className="text-sm font-black text-white block">HOPE DENTAL HUB</span>
              <span className="text-[10px] text-slate-400">Dr. Sindhu Shanmugavel (BDS) • Pollachi</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2">
            <a href="mailto:hopedentalhub@gmail.com" className="bg-[#112538] text-slate-200 hover:text-white px-3 py-1.5 rounded-xl text-xs font-semibold">✉️ Email</a>
            <a href="https://maps.app.goo.gl/28PCTifroYasJ2p16" target="_blank" rel="noreferrer" className="bg-[#112538] text-slate-200 hover:text-white px-3 py-1.5 rounded-xl text-xs font-semibold">📍 Google Maps</a>
            <a href="https://www.instagram.com/hopedentalhub?igsh=eThpaHZtZTgwMzZ2" target="_blank" rel="noreferrer" className="bg-[#112538] text-slate-200 hover:text-white px-3 py-1.5 rounded-xl text-xs font-semibold">📸 Instagram</a>
          </div>

          <p className="text-[11px] text-slate-500 font-mono">© 2026 Hope Dental Hub Pollachi.</p>
        </div>
      </footer>

      {/* FLOATING LIK CHATBOT BUTTON */}
      <button 
        onClick={() => setIsLikOpen(!isLikOpen)} 
        className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 bg-[#0c1d2d] text-white p-2.5 sm:px-4 sm:py-3 rounded-full sm:rounded-2xl shadow-2xl border border-[#0d8a7b]/40 flex items-center gap-2 font-bold text-xs hover:scale-105 active:scale-95 transition-all"
      >
        <span className="w-7 h-7 rounded-full sm:rounded-lg bg-[#0d8a7b] text-white flex items-center justify-center font-black text-[10px]">
          LIK
        </span>
        <div className="hidden sm:block text-left leading-tight">
          <p className="text-xs font-black">Ask LIK (AI)</p>
          <p className="text-[9px] text-[#90dcd0]">Tanglish • Tamil • Eng</p>
        </div>
      </button>

      {/* TREATMENT MODAL */}
      {selectedTreatment && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-300">
          <div className="bg-white max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100 relative max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-300">
            
            <div className="relative h-64 sm:h-80 w-full bg-slate-900 shrink-0 overflow-hidden">
              <img 
                src={selectedTreatment.sampleImage} 
                alt={selectedTreatment.title} 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <button 
                onClick={() => setSelectedTreatment(null)} 
                className="absolute top-3 right-3 bg-black/50 hover:bg-black text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-xs transition-all text-sm font-bold"
              >
                ✕
              </button>

              <div className="absolute bottom-3.5 left-4 right-4 text-white">
                <span className="bg-[#0d8a7b] text-white text-[9px] sm:text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                  {selectedTreatment.badge}
                </span>
                <h3 className="text-lg sm:text-2xl font-black mt-1.5 leading-tight">
                  {selectedTreatment.title}
                </h3>
                <p className="text-xs font-bold text-teal-300 font-mono mt-0.5">{selectedTreatment.tamil}</p>
              </div>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto space-y-3 bg-white text-xs sm:text-sm">
              <p className="text-slate-600 leading-relaxed">
                {selectedTreatment.fullDesc}
              </p>

              <div className="bg-teal-50/60 p-3 rounded-2xl border border-teal-200/60">
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedTreatment.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-xs font-semibold text-teal-900">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0d8a7b] shrink-0"></span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-1 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, treatment: selectedTreatment.title }));
                    setSelectedTreatment(null);
                    setIsModalOpen(true);
                  }}
                  className="bg-[#0d8a7b] hover:bg-[#0a7265] text-white py-3 rounded-xl text-xs font-bold transition-all text-center shadow-md shadow-teal-700/20"
                >
                  Book This Treatment
                </button>
                <button
                  onClick={() => {
                    const treatmentName = selectedTreatment.title;
                    setSelectedTreatment(null);
                    setQueryInput(`Tell me about ${treatmentName} in simple Tanglish`);
                    setIsLikOpen(true);
                  }}
                  className="bg-[#0c1d2d] hover:bg-black text-[#90dcd0] py-3 rounded-xl text-xs font-bold transition-all text-center"
                >
                  💬 Ask AI About This
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* LIK AI CHAT DRAWER / KEYBOARD OVERFLOW & DVH FIXED */}
      {isLikOpen && (
        <div className="fixed inset-x-2 bottom-2 top-14 sm:top-auto sm:inset-x-auto sm:bottom-20 sm:right-6 z-50 sm:w-88 md:w-96 h-[85dvh] sm:h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-[#0c1d2d] text-white p-3.5 flex flex-col gap-2 shrink-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 bg-[#0d8a7b] text-white rounded-lg flex items-center justify-center font-black text-xs font-mono">
                  LIK
                </span>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm leading-tight">LIK AI Dental Assistant</h4>
                  <p className="text-[10px] text-[#5eead4]">Understands English & Tanglish</p>
                </div>
              </div>
              <button onClick={() => setIsLikOpen(false)} className="text-slate-400 hover:text-white p-1 text-sm font-bold">✕</button>
            </div>

            {/* Language Quick Toggle */}
            <div className="grid grid-cols-4 gap-1 bg-[#112538] p-1 rounded-xl text-[10px] font-medium">
              {['English', 'Tamil', 'Malayalam', 'Telugu'].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLang(lang)}
                  className={`py-1 rounded-lg text-center transition-all ${
                    selectedLang === lang ? 'bg-[#0d8a7b] text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lang === 'Tamil' ? 'தமிழ்/Tanglish' : lang}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5 bg-slate-50 text-xs min-h-0" id="lik-chat-log">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`p-3 rounded-2xl max-w-[88%] leading-relaxed ${
                    msg.sender === 'user' ? 'bg-[#0d8a7b] text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 text-xs italic flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 bg-[#0d8a7b] rounded-full animate-ping"></span>
                  LIK is thinking in {selectedLang}...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-2 bg-white border-t border-slate-200 flex gap-2 shrink-0">
            <input 
              type="text" 
              value={queryInput} 
              onChange={(e) => setQueryInput(e.target.value)} 
              placeholder={`Ask in English or Tanglish (e.g. Tooth pain)...`} 
              className="flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#0d8a7b] bg-slate-50"
            />
            <button type="submit" className="bg-[#0d8a7b] hover:bg-[#0a7265] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0">
              Send
            </button>
          </form>
        </div>
      )}

      {/* APPOINTMENT BOOKING MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-5 sm:p-7 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800">✕</button>
            
            {!submitted ? (
              <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#0c1d2d]">
                    {activeTab === 'kids' ? "Book Kid's Checkup 🎈" : "Book Your Consultation"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Dr. Sindhu Shanmugavel (BDS) • Hope Dental Hub</p>
                </div>

                <div className="space-y-2.5 pt-1">
                  <input 
                    required 
                    type="text" 
                    placeholder="Full Name / Patient Name"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#0d8a7b] outline-none" 
                    onChange={e => setFormData({...formData, full_name: e.target.value})} 
                  />
                  <input 
                    required 
                    type="tel" 
                    placeholder="Phone Number (WhatsApp preferred)" 
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#0d8a7b] outline-none" 
                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                  />
                  <input 
                    required 
                    type="date" 
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#0d8a7b] outline-none" 
                    onChange={e => setFormData({...formData, preferred_date: e.target.value})} 
                  />
                  
                  <select 
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#0d8a7b] outline-none bg-white" 
                    value={formData.treatment} 
                    onChange={e => setFormData({...formData, treatment: e.target.value})}
                  >
                    <option value="Checkup & Consultation">Checkup & Consultation</option>
                    <option value="Pain & Sensitivity Relief">Pain & Sensitivity Relief</option>
                    <option value="Root Canal Treatment (RCT)">Root Canal Treatment (RCT)</option>
                    <option value="Orthodontics & Invisalign">Invisalign & Braces</option>
                    <option value="Implants & Dentures">Implants & Dentures</option>
                    <option value="Dental Makeover & Whitening">Dental Makeover & Laser Whitening</option>
                    <option value="Cavity Shield & Fluoride Varnish">🧸 Kids Fluoride Varnish</option>
                    <option value="Dental Pit & Fissure Sealants">🦷 Kids Dental Sealants</option>
                  </select>

                  <select 
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#0d8a7b] outline-none bg-white" 
                    value={formData.session_slot} 
                    onChange={e => setFormData({...formData, session_slot: e.target.value})}
                  >
                    <option value="Morning">Morning Slot (10:30 AM - 1:30 PM)</option>
                    <option value="Evening">Evening Slot (5:00 PM - 9:00 PM)</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3.5 rounded-2xl text-xs sm:text-sm font-bold shadow-lg shadow-teal-700/20 transition-all mt-1 text-white bg-[#0d8a7b] hover:bg-[#0a7265]"
                >
                  Confirm & Open WhatsApp Booking
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-teal-50 text-[#0d8a7b] rounded-full flex items-center justify-center text-xl mx-auto font-bold">
                  ✓
                </div>
                <h4 className="text-lg font-black text-[#0c1d2d]">Appointment Scheduled!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Thank you! Our clinic receptionist will contact you shortly to confirm your slot time.
                </p>
                <button 
                  onClick={() => { setIsModalOpen(false); setSubmitted(false); }} 
                  className="bg-[#0c1d2d] text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}