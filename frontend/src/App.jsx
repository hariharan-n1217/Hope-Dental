import React, { useState, useRef, useEffect } from 'react';

// --- IMAGE IMPORTS ---
import imgGapClosure from './assets/hopedental-results1.png';
import imgMakeover from './assets/hopedental-results2.png';
import imgVeneers from './assets/hopedental-results3.png';
import clinicRoom from './assets/clinic-room.png';

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
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');

  // Typewriter effect state for the Hero title
  const fullHeroTitle = "Welcome to Hope Dental Hub";
  const [displayedTitle, setDisplayedTitle] = useState("");

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
    }, 65);
    return () => clearInterval(timer);
  }, [activeTab]);

  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I'm <strong>LIK</strong>, your Hope Dental AI assistant.<br>How can I help you regarding our clinic, pediatric dental care, or Dr. Sindhu Shanmugavel (BDS)?"
    }
  ]);
  const [queryInput, setQueryInput] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    preferred_date: '',
    session_slot: 'Morning',
    treatment: 'Cavity Shield & Fluoride Varnish'
  });
  const [submitted, setSubmitted] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  // --- GENERAL TREATMENTS DATA (Bright Theme with Photos) ---
  const treatmentsData = [
    {
      id: 1,
      title: 'Checkup & Consultation',
      tamil: 'பல் பரிசோதனை',
      shortDesc: 'Routine oral health evaluation, early diagnosis, digital X-rays, and treatment planning.',
      fullDesc: 'Comprehensive oral examination using digital diagnostic equipment. We detect hidden decay, gum diseases, and bite anomalies early to save natural teeth and plan preventive treatments.',
      badge: 'Preventive Care',
      benefits: ['Digital X-Ray screening', 'Plaque and tartar assessment', 'Personalized oral hygiene guide'],
      sampleImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Pain & Sensitivity Relief',
      tamil: 'பல் வலி & கூச்சம் சிகிச்சை',
      shortDesc: 'Instant relief for acute toothache, nerve irritation, hot/cold sensitivity, and trauma.',
      fullDesc: 'Targeted instant relief for sharp toothaches, deep sensitivity to hot/cold foods, broken enamel, and acute pulpitis using modern desensitizing agents and emergency fillings.',
      badge: 'Emergency & Relief',
      benefits: ['Rapid pain relief therapies', 'Tooth nerve protection', 'Fluoride enamel strengthening'],
      sampleImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Root Canal Treatment (RCT)',
      tamil: 'வேர் சிகிச்சை',
      shortDesc: 'Painless single or multi-visit root canal procedures to rescue deeply decayed teeth.',
      fullDesc: 'A painless procedure to save deeply infected or broken natural teeth. We clear infected nerve tissue, disinfect the canal, and seal it with custom bio-compatible crowns.',
      badge: 'Painless Procedure',
      benefits: ['Preserves natural tooth structure', 'Gentle motorized rotary endodontics', 'Natural looking zirconia/ceramic crowns'],
      sampleImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Orthodontics & Invisalign',
      tamil: 'பல் சீரமைத்தல் / Clear Aligners',
      shortDesc: 'Traditional metal/ceramic braces and clear invisible aligners for crooked or spaced teeth.',
      fullDesc: 'Straighten crooked, crowded, or forwardly placed teeth using modern invisible clear aligners or low-friction ceramic and metallic braces for kids, teens, and adults.',
      badge: 'Smile Alignment',
      benefits: ['Invisible removable aligners', 'Customized digital teeth mapping', 'Fixes gaps, crowding, & bite issues'],
      sampleImage: imgGapClosure,
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )
    },
    {
      id: 5,
      title: 'Implants & Dentures',
      tamil: 'செயற்கை பல் பொருத்துதல்',
      shortDesc: 'Permanent titanium dental implants, bridges, and flexible partial/complete dentures.',
      fullDesc: 'Permanent tooth replacement options that restore 100% chewing ability and facial structure. Built with titanium implants or flexible, lightweight dentures.',
      badge: 'Permanent Replacement',
      benefits: ['Titanium root stability', 'Natural aesthetics & full bite force', 'Single tooth or full arch solutions'],
      sampleImage: imgVeneers,
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      id: 6,
      title: 'Dental Makeover & Whitening',
      tamil: 'Dental Makeover / Veneers',
      shortDesc: 'Smile design, aesthetic composite veneers, and laser teeth whitening for radiant smiles.',
      fullDesc: 'Transform discolored, chipped, or uneven teeth with customized porcelain/composite veneers, cosmetic bonding, and fast-acting laser teeth whitening.',
      badge: 'Cosmetic Dentistry',
      benefits: ['Shade brightening up to 2–4 shades', 'Chip & crack restorative veneers', 'Same-day smile enhancements'],
      sampleImage: imgMakeover,
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    }
  ];

  // --- KIDS DEDICATED TREATMENTS ---
  const kidsTreatmentsData = [
    {
      id: 'k1',
      title: 'Cavity Shield & Fluoride Varnish',
      tamil: 'குழந்தைகளுக்கான சொத்தை பல் தடுப்பு',
      badge: '100% Pain-Free',
      image: kidTreatmentCavities,
      desc: 'Topical fluoride varnish is gently painted onto young teeth to strengthen soft enamel and shield against sweet-induced cavities, creating a strong defense for growing smiles.',
      benefits: ['Takes only 2 minutes to apply', 'Stops early acid decay from sugars', 'Pleasant child-friendly fruit flavor']
    },
    {
      id: 'k2',
      title: 'Dental Pit & Fissure Sealants',
      tamil: 'பல் இடுக்கு சீலண்ட் சிகிச்சை',
      badge: 'Preventive Shield',
      image: kidTreatmentSealants,
      desc: 'A thin, protective coating smoothed over the deep chewing grooves of back molars. It acts as an invisible umbrella that stops trapped food debris and bacteria from forming cavities.',
      benefits: ['Reduces molar cavity risk by 80%', 'No drilling or needles required', 'Long-lasting tooth protection']
    },
    {
      id: 'k3',
      title: 'Gentle Baby Tooth Root Therapy',
      tamil: 'பால் பல் வேர் பாதுகாப்பு',
      badge: 'Comfort Care',
      image: kidTreatmentRootCanal,
      desc: 'When decay reaches deep into a milk tooth, this gentle therapy soothes the nerve and saves the tooth from early removal, ensuring healthy chewing and proper jaw spacing.',
      benefits: ['Instant relief from bedtime toothaches', 'Preserves natural chewing and speech', 'Finished with cute child-safe crowns']
    },
    {
      id: 'k4',
      title: 'Space Maintainers for Milk Teeth',
      tamil: 'பல் வரிசை இடைவெளி பாதுகாப்பு',
      badge: 'Alignment Guard',
      image: kidTreatmentSpaceMaintainer,
      desc: 'If a baby tooth is lost early due to decay or injury, a custom space maintainer holds the exact empty gap open so the upcoming adult tooth erupts perfectly straight.',
      benefits: ['Prevents future crooked/crowded teeth', 'Customized and comfortable fit', 'Avoids extensive braces in teenage years']
    },
    {
      id: 'k5',
      title: 'Kids Habit Correction',
      tamil: 'பழக்கவழக்க சீரமைப்பு சிகிச்சை',
      badge: 'Early Guidance',
      image: kidTreatmentHabit,
      desc: 'Friendly counseling and gentle oral appliances that naturally help children overcome thumb sucking, mouth breathing, or tongue thrusting before jaw growth is affected.',
      benefits: ['Protects natural jaw and facial development', 'Non-invasive and gentle guidance', 'Improves night sleep and breathing']
    },
    {
      id: 'k6',
      title: 'Fun Polishing & Cleaning',
      tamil: 'குழந்தைகள் பல் சுத்தம்',
      badge: 'Fear-Free Visit',
      image: kidTreatmentPolishing,
      desc: 'An enjoyable and interactive cleaning session using soft spinning brushes and tasty polishes, teaching children good hygiene while building confidence at the dentist.',
      benefits: ['Removes stubborn food and juice stains', 'Leaves teeth sparkling clean and fresh', 'Rewards and positive reinforcement for kids']
    }
  ];

  const scrollToSection = (id) => {
    if (activeTab !== 'main') {
      setActiveTab('main');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
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
      console.error("Backend offline fallback active", err);
    }

    const whatsappMessage = 
`Hello Hope Dental Hub! 👋
I would like to book an appointment:

👤 *Name:* ${formData.full_name}
📞 *Phone:* ${formData.phone}
📅 *Preferred Date:* ${formData.preferred_date}
🩺 *Treatment:* ${formData.treatment}
⏰ *Session Slot:* ${formData.session_slot}`;

    const encodedText = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!queryInput.trim()) return;

    const userText = queryInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
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
      setChatMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      console.error("Chat error:", err);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: "Hope Dental Hub provides gentle pediatric & family dental care under Dr. Sindhu Shanmugavel (BDS). <br><br><em>Would you like me to assist you with booking an appointment on WhatsApp?</em>"
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-[#0c1d2d] font-sans antialiased selection:bg-[#0d8a7b] selection:text-white flex flex-col justify-between">
      
      <div>
        {/* TOP ANNOUNCEMENT BAR */}
        <div className="bg-[#0c1d2d] text-slate-200 text-xs py-2 px-3 sm:px-6 border-b border-[#112538]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-[11px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-[#0d8a7b] animate-pulse"></span>
              <span className="font-semibold text-white">
                Hope Dental Hub
              </span>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <span className="text-slate-300">Dr. Sindhu Shanmugavel (BDS)</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-300 font-medium">
              <span>10:30 AM – 1:30 PM</span>
              <span>|</span>
              <span>5:00 PM – 9:00 PM</span>
            </div>
          </div>
        </div>

        {/* NAVIGATION NAVBAR */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-1.5 sm:gap-2">
            
            {/* Brand Logo & Name */}
            <div 
              className="flex items-center gap-2 cursor-pointer shrink-0" 
              onClick={() => { setActiveTab('main'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <img 
                src={`${import.meta.env.BASE_URL}logo.jpeg`} 
                alt="Hope Dental Hub Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl object-cover shadow-md shrink-0 border border-slate-200"
              />
              <div>
                <span className="hover-glitch-text text-xs sm:text-lg font-black tracking-tight text-[#0c1d2d] hover:text-[#0d8a7b] block leading-none font-mono">
                  HOPE DENTAL HUB
                </span>
                <span className="text-[7px] sm:text-[9px] font-extrabold tracking-widest text-[#0d8a7b] uppercase block mt-0.5">
                  ADULTS & KIDS
                </span>
              </div>
            </div>

            {/* Interactive Mode Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
              <button
                onClick={() => setActiveTab('main')}
                className={`px-2 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === 'main' 
                    ? 'bg-white text-[#0c1d2d] shadow-xs' 
                    : 'text-slate-500 hover:text-[#0c1d2d]'
                }`}
              >
                Main Clinic
              </button>
              <button
                onClick={() => setActiveTab('kids')}
                className={`px-2 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
                  activeTab === 'kids' 
                    ? 'bg-gradient-to-r from-amber-400 to-pink-500 text-white shadow-sm' 
                    : 'text-amber-600 hover:text-amber-700'
                }`}
              >
                <span>🎈</span> <span>Kids Zone</span>
              </button>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600">
              <button onClick={() => scrollToSection('treatments')} className="hover:text-[#0d8a7b] transition-colors">Treatments</button>
              <button onClick={() => scrollToSection('transformations')} className="hover:text-[#0d8a7b] transition-colors">Results</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-[#0d8a7b] transition-colors">About Us</button>
              <button onClick={() => scrollToSection('hours')} className="hover:text-[#0d8a7b] transition-colors">Hours & Contact</button>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button 
                onClick={() => setIsLikOpen(true)} 
                className="bg-[#e6f7f5] text-[#0d8a7b] border border-[#0d8a7b]/30 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold hover:bg-[#d4eee9] transition-all flex items-center gap-1 shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d8a7b]"></span> Ask AI
              </button>
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="hidden sm:inline-block bg-[#0d8a7b] hover:bg-[#0a7265] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-[#0d8a7b]/20 transition-all shrink-0"
              >
                Book Visit
              </button>
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
                    <div className="inline-flex items-center gap-1.5 border border-amber-300 bg-amber-100/70 text-amber-800 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                      <span>🎈</span>
                      <span>100% Fear-Free • Friendly Pediatric Dental Care</span>
                    </div>

                    <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black text-[#0c1d2d] tracking-tight leading-tight">
                      Happy Smiles for <br className="hidden sm:inline" />
                      <span className="bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                        Your Little Champions!
                      </span>
                    </h1>

                    <p className="text-slate-600 text-xs sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                      We understand how deeply you care for your child's wellbeing. At Hope Dental Hub, we make dental visits an exciting, gentle, and completely pain-free journey.
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center justify-center lg:justify-start">
                      <button 
                        onClick={() => {
                          setFormData(prev => ({ ...prev, treatment: 'Cavity Shield & Fluoride Varnish' }));
                          setIsModalOpen(true);
                        }} 
                        className="bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white font-black px-5 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl shadow-pink-500/20 transition-all text-xs flex items-center justify-center gap-2"
                      >
                        <span>🧸</span> Schedule Kid's Checkup
                      </button>
                      <button 
                        onClick={() => {
                          setQueryInput("What pediatric treatments do you offer for young children and cavities?");
                          setIsLikOpen(true);
                        }} 
                        className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all text-xs flex items-center justify-center gap-2 shadow-xs"
                      >
                        💬 Ask LIK AI About Kids Care
                      </button>
                    </div>

                    <div className="pt-4 sm:pt-6 border-t border-amber-100 grid grid-cols-3 gap-1.5 sm:gap-4 max-w-md mx-auto lg:mx-0">
                      <div className="bg-white p-2 rounded-xl border border-amber-100 shadow-xs text-center">
                        <p className="text-xs sm:text-xl font-black text-amber-600">Zero Tears</p>
                        <p className="text-[8px] sm:text-[10px] text-slate-500 font-semibold mt-0.5">Gentle Care</p>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-pink-100 shadow-xs text-center">
                        <p className="text-xs sm:text-xl font-black text-pink-600">Fluoride</p>
                        <p className="text-[8px] sm:text-[10px] text-slate-500 font-semibold mt-0.5">Cavity Seal</p>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-purple-100 shadow-xs text-center">
                        <p className="text-xs sm:text-xl font-black text-purple-600">Playful</p>
                        <p className="text-[8px] sm:text-[10px] text-slate-500 font-semibold mt-0.5">Warm Team</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative mt-4 lg:mt-0">
                    <div className="grid grid-cols-2 gap-2 sm:gap-4 max-w-sm mx-auto">
                      <div className="group relative rounded-2xl overflow-hidden shadow-md border-2 border-white bg-amber-100">
                        <img 
                          src={kidSmile1} 
                          alt="Happy child smiling" 
                          className="w-full h-36 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1d2d]/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-2 left-2 right-2 text-white">
                          <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-wider bg-amber-500 text-white px-1.5 py-0.5 rounded">
                            Cavity-Free
                          </span>
                          <p className="text-[10px] sm:text-xs font-black mt-0.5 leading-tight">Confident Smiles</p>
                        </div>
                      </div>

                      <div className="group relative rounded-2xl overflow-hidden shadow-md border-2 border-white bg-pink-100 mt-2 sm:mt-6">
                        <img 
                          src={kidSmile2} 
                          alt="Joyful girl laughing" 
                          className="w-full h-36 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1d2d]/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-2 left-2 right-2 text-white">
                          <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-wider bg-pink-500 text-white px-1.5 py-0.5 rounded">
                            Pain-Free
                          </span>
                          <p className="text-[10px] sm:text-xs font-black mt-0.5 leading-tight">Zero Tears</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Kids Specialized Treatments Grid */}
            <section className="py-12 sm:py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-amber-600 tracking-widest uppercase bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    CHILDREN'S SPECIALIZED DENTAL CARE
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-[#0c1d2d] mt-2 tracking-tight">
                    Tailored Treatments for Young Teeth
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1.5">
                    Gentle procedures designed to protect baby teeth and guide the healthy growth of permanent smiles.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                  {kidsTreatmentsData.map((k, idx) => (
                    <div 
                      key={k.id}
                      style={{ animationDelay: `${idx * 0.15}s` }}
                      className="group bg-[#fcfdfa] rounded-2xl sm:rounded-3xl overflow-hidden border border-amber-200/80 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-40 sm:h-48 w-full bg-slate-100 overflow-hidden">
                          <img 
                            src={k.image} 
                            alt={k.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          <span className="absolute top-2.5 left-2.5 bg-white/95 text-[#0c1d2d] text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
                            {k.badge}
                          </span>
                        </div>

                        <div className="p-4 sm:p-6 space-y-2">
                          <h3 className="font-bold text-[#0c1d2d] text-base sm:text-lg leading-snug">
                            {k.title}
                          </h3>
                          <p className="text-xs font-bold text-amber-700">{k.tamil}</p>
                          
                          <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            {k.desc}
                          </p>

                          <div className="pt-2 space-y-1.5">
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

            {/* Parental Dental Guide & FAQ */}
            <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200/60">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-5 sm:space-y-8">
                <div className="text-center">
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-[#0d8a7b] tracking-widest uppercase">
                    PARENT'S GUIDE & FAQ
                  </span>
                  <h3 className="text-xl sm:text-3xl font-black text-[#0c1d2d] mt-2">
                    Frequently Asked by Caring Parents
                  </h3>
                </div>

                <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <h4 className="font-bold text-[#0c1d2d] text-sm sm:text-base">When should my child visit the dentist for the first time?</h4>
                    <p className="text-slate-600 mt-1.5 leading-relaxed text-xs sm:text-sm">
                      Pediatric dental guidelines recommend a child's first checkup by their <strong>1st birthday</strong> or within six months after their first baby tooth emerges.
                    </p>
                  </div>

                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <h4 className="font-bold text-[#0c1d2d] text-sm sm:text-base">Why are baby teeth important if they fall out anyway?</h4>
                    <p className="text-slate-600 mt-1.5 leading-relaxed text-xs sm:text-sm">
                      Baby teeth guide proper jaw growth, speech clarity, and healthy nutrition. They act as placeholders for permanent teeth to avoid future crowding.
                    </p>
                  </div>

                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                    <h4 className="font-bold text-[#0c1d2d] text-sm sm:text-base">How do sealants prevent cavities in school-going children?</h4>
                    <p className="text-slate-600 mt-1.5 leading-relaxed text-xs sm:text-sm">
                      Sealants act as a smooth protective shield over the deep grooves of molars where 80% of childhood cavities occur, blocking out bacteria and food particles.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        ) : (
          /* ==================================================== */
          /* MAIN CLINIC VIEW                                     */
          /* ==================================================== */
          <main className="w-full">
            {/* 1. HERO SECTION WITH TYPEWRITER LETTER FONT */}
            <section className="relative py-12 sm:py-20 lg:py-28 overflow-hidden bg-[#0a1520]">
              <div className="absolute inset-0 z-0 opacity-40">
                <img 
                  src={clinicRoom} 
                  alt="Hope Dental Hub Consultation Room" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0c1d2d] via-[#0c1d2d]/90 to-[#07131e]"></div>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  
                  <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 border border-[#0d8a7b]/60 bg-[#0c1d2d]/90 text-[#90dcd0] text-[10px] sm:text-xs font-mono font-bold px-3 py-1.5 rounded-full backdrop-blur-md shadow-inner shadow-[#0d8a7b]/30">
                      <span className="w-2 h-2 rounded-full bg-[#0d8a7b] animate-ping"></span>
                      <span>● CLINICAL EXCELLENCE • YEAR 4</span>
                    </div>

                    {/* Styled Typewriter Headline */}
                    <div className="min-h-[75px] sm:min-h-[140px] flex flex-col justify-center">
                      <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.2] font-mono">
                        <span className="text-slate-200 block text-lg sm:text-3xl lg:text-4xl font-sans tracking-normal font-light mb-1">
                          Welcome to
                        </span>
                        <span className="hover-glitch-text bg-gradient-to-r from-[#5eead4] via-[#2dd4bf] to-[#0d8a7b] bg-clip-text text-transparent drop-shadow-sm">
                          {displayedTitle.replace("Welcome to ", "")}
                        </span>
                        <span className="inline-block w-2 sm:w-3.5 h-6 sm:h-11 ml-1 bg-[#5eead4] align-middle animate-cursor"></span>
                      </h1>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                      Providing compassionate, gentle dental care for your whole family. Advanced, state-of-the-art treatments for beautiful, healthy smiles.
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch sm:items-center justify-center lg:justify-start">
                      <a 
                        href={`tel:+91${CLINIC_WHATSAPP_NUMBER}`} 
                        className="bg-[#0d8a7b] hover:bg-[#0a7265] text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-lg shadow-[#0d8a7b]/30 hover:shadow-[#0d8a7b]/50 transition-all text-xs flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.03 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                        </svg>
                        Call Clinic
                      </a>
                      <button 
                        onClick={() => setIsLikOpen(true)} 
                        className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl shadow-sm backdrop-blur-md transition-all text-xs flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <svg className="w-4 h-4 fill-[#5eead4]" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
                        Ask LIK AI Assistant
                      </button>
                    </div>

                    <div className="pt-6 border-t border-slate-700/60 grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto lg:mx-0 text-white">
                      <div>
                        <p className="text-lg sm:text-3xl font-black font-mono text-[#5eead4]">3+ Yrs</p>
                        <p className="text-[9px] sm:text-xs text-slate-400 font-semibold mt-0.5">Trusted Care</p>
                      </div>
                      <div>
                        <p className="text-lg sm:text-3xl font-black font-mono text-[#5eead4]">12+</p>
                        <p className="text-[9px] sm:text-xs text-slate-400 font-semibold mt-0.5">Treatments</p>
                      </div>
                      <div>
                        <p className="text-lg sm:text-3xl font-black font-mono text-[#5eead4]">100%</p>
                        <p className="text-[9px] sm:text-xs text-slate-400 font-semibold mt-0.5">Painless Care</p>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Info Card */}
                  <div className="lg:col-span-5 relative mt-4 lg:mt-0">
                    <div className="bg-[#112538]/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#0d8a7b]/40 shadow-2xl text-white">
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-[#0c1d2d] text-[#5eead4] border border-[#0d8a7b]/50 flex items-center justify-center font-bold text-lg sm:text-xl shrink-0">
                          <svg className="w-5 h-5 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                        </div>
                        <div>
                          <h3 className="text-base sm:text-xl font-black text-white">Dr. Sindhu Shanmugavel</h3>
                          <p className="text-[10px] sm:text-xs font-bold font-mono text-[#5eead4]">BDS • GENERAL DENTIST</p>
                          <p className="text-[9px] sm:text-xs text-slate-400 font-medium">Lead Practitioner @ Hope Dental Hub</p>
                        </div>
                      </div>

                      <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-2.5 pt-4 sm:pt-5 border-t border-slate-700/60 text-xs font-semibold text-slate-300">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5eead4] shrink-0"></span>
                          <span>Root Canal Treatment & Pain Relief</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5eead4] shrink-0"></span>
                          <span>Invisalign & Orthodontic Braces</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5eead4] shrink-0"></span>
                          <span>Dental Implants & Dentures</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5eead4] shrink-0"></span>
                          <span>Cosmetic Makeovers & Veneers</span>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 sm:pt-4 border-t border-slate-700/60 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-slate-400">
                        <span>Morning & Evening Slots</span>
                        <span className="text-[#5eead4] bg-[#0d8a7b]/20 px-2 py-0.5 rounded-full border border-[#0d8a7b]/40">Open Mon - Sat</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* 2. BRIGHT & MODERN CLINICAL SERVICES CATALOG (White & Green Theme) */}
            <section id="treatments" className="py-14 sm:py-24 bg-slate-50/70 border-t border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-[#0d8a7b] tracking-widest uppercase bg-[#e6f7f5] border border-[#0d8a7b]/30 px-3.5 py-1 rounded-full">
                    CLINICAL SERVICES CATALOG
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-[#0c1d2d] mt-2.5 tracking-tight">
                    Comprehensive Dental Treatments
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1.5">
                    Gentle, pain-free procedures designed for lasting oral wellness. Click any treatment to explore details and photos.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
                  {treatmentsData.map((item, index) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedTreatment(item)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 hover:border-[#0d8a7b] hover:shadow-xl hover:shadow-[#0d8a7b]/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        {/* Treatment Header Image */}
                        <div className="relative h-40 sm:h-48 w-full bg-slate-100 overflow-hidden">
                          <img 
                            src={item.sampleImage} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1d2d]/60 via-transparent to-transparent"></div>
                          <span className="absolute top-2.5 left-2.5 bg-white/95 text-[#0c1d2d] text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
                            {item.badge}
                          </span>
                        </div>

                        {/* Treatment Body Content */}
                        <div className="p-4 sm:p-6 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#e6f7f5] text-[#0d8a7b] flex items-center justify-center font-bold shrink-0">
                              {item.icon}
                            </span>
                            <h3 className="font-bold text-[#0c1d2d] text-sm sm:text-lg leading-snug group-hover:text-[#0d8a7b] transition-colors">
                              {item.title}
                            </h3>
                          </div>
                          
                          <p className="text-xs font-bold text-[#0d8a7b]">{item.tamil}</p>
                          
                          <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            {item.shortDesc}
                          </p>

                          <div className="pt-2 space-y-1.5">
                            {item.benefits.map((b, i) => (
                              <div key={i} className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0d8a7b] shrink-0"></span>
                                <span>{b}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Button */}
                      <div className="p-4 sm:p-6 pt-0">
                        <div className="w-full bg-[#e6f7f5] group-hover:bg-[#0d8a7b] group-hover:text-white text-[#0d8a7b] text-xs font-bold py-2.5 rounded-xl transition-all shadow-xs text-center flex items-center justify-center gap-1.5">
                          <span>Explore Procedure</span>
                          <span className="text-sm group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 3. SMILE TRANSFORMATIONS */}
            <section id="transformations" className="py-12 sm:py-20 bg-white border-t border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-[#0d8a7b] tracking-widest uppercase">
                    PROVEN RESULTS
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-[#0c1d2d] mt-2 tracking-tight">
                    Smile Transformations: Before & After
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1.5">
                    Real patient case results delivered at Hope Dental Hub.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  
                  {/* Card 1: Gap Closure */}
                  <div className="group bg-[#fbfdfc] rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-3.5 hover:shadow-xl hover:border-[#0d8a7b]/40 hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100">
                      <img 
                        src={imgGapClosure} 
                        alt="Gap Closure Before & After" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <span className="absolute top-2 left-2 bg-[#0c1d2d]/80 text-white text-[8px] sm:text-[9px] font-black px-2 py-0.5 rounded backdrop-blur-sm uppercase">
                        BEFORE
                      </span>
                      <span className="absolute top-2 right-2 bg-[#0d8a7b]/90 text-white text-[8px] sm:text-[9px] font-black px-2 py-0.5 rounded backdrop-blur-sm uppercase">
                        AFTER
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center text-[10px] sm:text-[11px] font-bold">
                      <div className="bg-slate-100 p-2 rounded-xl text-slate-600">
                        <p className="font-extrabold text-[#0c1d2d]">Gap Closure</p>
                        <p className="text-[8px] sm:text-[9px] text-slate-400 font-normal mt-0.5">Irregular spacing</p>
                      </div>
                      <div className="bg-[#e6f7f5] p-2 rounded-xl text-[#085a50]">
                        <p className="font-extrabold">Orthodontic</p>
                        <p className="text-[8px] sm:text-[9px] text-[#0a7265] font-normal mt-0.5">Aligned & seamless</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0c1d2d] text-sm">Patient A. Gap Closure</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Closed gaps between front teeth using orthodontic alignment and composite bonding for a natural smile.
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Advanced Restoration */}
                  <div className="group bg-[#fbfdfc] rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-3.5 hover:shadow-xl hover:border-[#0d8a7b]/40 hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100">
                      <img 
                        src={imgVeneers} 
                        alt="Restoration Before & After" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <span className="absolute top-2 left-2 bg-[#0c1d2d]/80 text-white text-[8px] sm:text-[9px] font-black px-2 py-0.5 rounded backdrop-blur-sm uppercase">
                        BEFORE
                      </span>
                      <span className="absolute top-2 right-2 bg-[#0d8a7b]/90 text-white text-[8px] sm:text-[9px] font-black px-2 py-0.5 rounded backdrop-blur-sm uppercase">
                        AFTER
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center text-[10px] sm:text-[11px] font-bold">
                      <div className="bg-slate-100 p-2 rounded-xl text-slate-600">
                        <p className="font-extrabold text-[#0c1d2d]">Discolored</p>
                        <p className="text-[8px] sm:text-[9px] text-slate-400 font-normal mt-0.5">Enamel decay</p>
                      </div>
                      <div className="bg-[#e6f7f5] p-2 rounded-xl text-[#085a50]">
                        <p className="font-extrabold">Crowns</p>
                        <p className="text-[8px] sm:text-[9px] text-[#0a7265] font-normal mt-0.5">Bright & restored</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0c1d2d] text-sm">Patient B. Advanced Restoration</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Extensive decay completely restored using custom crowns for long-lasting aesthetics and bite force.
                      </p>
                    </div>
                  </div>

                  {/* Card 3: Smile Makeover */}
                  <div className="group bg-[#fbfdfc] rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-3.5 hover:shadow-xl hover:border-[#0d8a7b]/40 hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100">
                      <img 
                        src={imgMakeover} 
                        alt="Smile Makeover Before & After" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <span className="absolute top-2 left-2 bg-[#0c1d2d]/80 text-white text-[8px] sm:text-[9px] font-black px-2 py-0.5 rounded backdrop-blur-sm uppercase">
                        BEFORE
                      </span>
                      <span className="absolute top-2 right-2 bg-[#0d8a7b]/90 text-white text-[8px] sm:text-[9px] font-black px-2 py-0.5 rounded backdrop-blur-sm uppercase">
                        AFTER
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center text-[10px] sm:text-[11px] font-bold">
                      <div className="bg-slate-100 p-2 rounded-xl text-slate-600">
                        <p className="font-extrabold text-[#0c1d2d]">Misaligned</p>
                        <p className="text-[8px] sm:text-[9px] text-slate-400 font-normal mt-0.5">Crowding</p>
                      </div>
                      <div className="bg-[#e6f7f5] p-2 rounded-xl text-[#085a50]">
                        <p className="font-extrabold">Makeover</p>
                        <p className="text-[8px] sm:text-[9px] text-[#0a7265] font-normal mt-0.5">Aligned & bright</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0c1d2d] text-sm">Patient C. Complete Makeover</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Comprehensive alignment and cosmetic restoration for a natural, radiant smile.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* 4. ABOUT OUR CLINIC */}
            <section id="about" className="py-12 sm:py-20 bg-slate-50/50 border-t border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-[#0d8a7b] tracking-widest uppercase">
                    ABOUT OUR CLINIC
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-[#0c1d2d] mt-2 tracking-tight">
                    Meet Dr. Sindhu Shanmugavel
                  </h2>
                  <div className="w-12 h-1 bg-[#0d8a7b] mx-auto mt-2.5 rounded-full"></div>
                </div>

                <div className="grid lg:grid-cols-12 gap-5 sm:gap-8 items-stretch">
                  <div className="lg:col-span-5 bg-[#0c1d2d] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between shadow-xl border border-[#0d8a7b]/30">
                    <div>
                      <span className="bg-[#0d8a7b] text-white text-[9px] sm:text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                        Chief Dental Surgeon
                      </span>
                      <h3 className="text-lg sm:text-2xl font-black mt-3 sm:mt-6">Dr. Sindhu Shanmugavel</h3>
                      <p className="text-xs text-[#90dcd0] font-bold mt-1 font-mono">BDS — General Dentist</p>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-3">
                        Experienced dentist dedicated to long-term community dental health. Dr. Sindhu Shanmugavel leads Hope Dental Hub with a focus on comfortable, transparent, and completely pain-free care.
                      </p>
                    </div>
                    <div className="mt-5 pt-3.5 border-t border-slate-800 text-xs italic text-[#90dcd0]">
                      "Providing compassionate, gentle care for your whole family with state-of-the-art treatments."
                    </div>
                  </div>

                  <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 hover:border-[#0d8a7b]/40 shadow-xs transition-all">
                      <span className="text-xs font-black text-[#0d8a7b] bg-[#d4eee9] px-2.5 py-1 rounded-lg font-mono">01</span>
                      <h4 className="font-bold text-[#0c1d2d] mt-2 sm:mt-3 text-sm sm:text-base">3+ Years of Trust</h4>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1">
                        Completing 3 full years of successful dental care, stepping into Year 4 with modernized equipment.
                      </p>
                    </div>
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 hover:border-[#0d8a7b]/40 shadow-xs transition-all">
                      <span className="text-xs font-black text-[#0d8a7b] bg-[#d4eee9] px-2.5 py-1 rounded-lg font-mono">02</span>
                      <h4 className="font-bold text-[#0c1d2d] mt-2 sm:mt-3 text-sm sm:text-base">All-in-One Treatments</h4>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1">
                        From simple cleanings and fillings to complex implants, smile makeovers, and orthodontic braces.
                      </p>
                    </div>
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 hover:border-[#0d8a7b]/40 shadow-xs transition-all">
                      <span className="text-xs font-black text-[#0d8a7b] bg-[#d4eee9] px-2.5 py-1 rounded-lg font-mono">03</span>
                      <h4 className="font-bold text-[#0c1d2d] mt-2 sm:mt-3 text-sm sm:text-base">Strict Hygiene & Safety</h4>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1">
                        Class-B autoclave sterilization standards for every instrument to guarantee total clinical safety.
                      </p>
                    </div>
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 hover:border-[#0d8a7b]/40 shadow-xs transition-all">
                      <span className="text-xs font-black text-[#0d8a7b] bg-[#d4eee9] px-2.5 py-1 rounded-lg font-mono">04</span>
                      <h4 className="font-bold text-[#0c1d2d] mt-2 sm:mt-3 text-sm sm:text-base">Painless Techniques</h4>
                      <p className="text-xs text-slate-500 leading-relaxed mt-1">
                        Modern numbing and gentle procedures designed to minimize discomfort for both kids and adults.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </section>
          </main>
        )}
      </div>

      {/* 5. OPERATING HOURS & CONTACT */}
      <section id="hours" className="py-12 sm:py-20 bg-[#0c1d2d] text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono font-extrabold text-[#90dcd0] tracking-widest uppercase">
                  பார்வை நேரம் • OPERATING HOURS
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 tracking-tight">
                  Visit Us During Clinic Hours
                </h2>
              </div>

              <div className="space-y-2.5 sm:space-y-4">
                <div className="bg-[#112538] border border-slate-700/60 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 flex justify-between items-center">
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-extrabold text-[#90dcd0] uppercase">காலை • MORNING</p>
                    <p className="text-base sm:text-2xl font-black text-white mt-0.5">10:30 AM – 1:30 PM</p>
                  </div>
                  <span className="bg-[#0d8a7b]/20 text-[#90dcd0] border border-[#0d8a7b]/40 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold font-mono">
                    Session 1
                  </span>
                </div>

                <div className="bg-[#112538] border border-slate-700/60 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 flex justify-between items-center">
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-extrabold text-[#90dcd0] uppercase">மாலை • EVENING</p>
                    <p className="text-base sm:text-2xl font-black text-white mt-0.5">5:00 PM – 9:00 PM</p>
                  </div>
                  <span className="bg-[#0d8a7b]/20 text-[#90dcd0] border border-[#0d8a7b]/40 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold font-mono">
                    Session 2
                  </span>
                </div>
              </div>
            </div>

            <div id="contact" className="lg:col-span-5 bg-white text-[#0c1d2d] rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl">
              <div>
                <span className="text-[10px] font-black text-[#0d8a7b] uppercase tracking-widest">
                  GET IN TOUCH
                </span>
                <h3 className="text-lg sm:text-2xl font-black mt-1">Hope Dental Hub</h3>
                <p className="text-xs text-slate-400 font-medium">
                  Lead Specialist: Dr. Sindhu Shanmugavel (BDS)
                </p>

                <div className="mt-4 space-y-2.5">
                  <div className="bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#d4eee9] text-[#0d8a7b] flex items-center justify-center font-bold shrink-0">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.03 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase block">Appointments Line</span>
                      <p className="text-sm sm:text-base font-black text-[#0c1d2d]">+91 {CLINIC_WHATSAPP_NUMBER}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-xl sm:rounded-2xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold shrink-0">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[9px] text-slate-400 font-bold uppercase block">Official Email</span>
                      <a href="mailto:hopedentalhub@gmail.com" className="text-xs font-black text-[#0c1d2d] hover:text-[#0d8a7b] truncate block">
                        hopedentalhub@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <a 
                  href={`tel:+91${CLINIC_WHATSAPP_NUMBER}`} 
                  className="bg-[#0d8a7b] hover:bg-[#0a7265] text-white font-bold py-2.5 px-2 rounded-xl text-xs text-center flex items-center justify-center gap-1.5"
                >
                  Call Clinic
                </a>
                <button 
                  onClick={() => setIsLikOpen(true)} 
                  className="bg-[#0c1d2d] hover:bg-black text-[#90dcd0] font-bold py-2.5 px-2 rounded-xl text-xs text-center flex items-center justify-center gap-1.5"
                >
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
            <img 
              src={`${import.meta.env.BASE_URL}logo.jpeg`} 
              alt="Hope Dental Hub Logo" 
              className="w-8 h-8 rounded-xl object-cover border border-slate-700/60"
            />
            <div>
              <span className="text-sm font-black text-white block">HOPE DENTAL HUB</span>
              <span className="text-[10px] text-slate-400">Dr. Sindhu Shanmugavel (BDS)</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2">
            <a 
              href="mailto:hopedentalhub@gmail.com" 
              className="bg-[#112538] hover:bg-amber-600 text-slate-200 hover:text-white px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-700/60"
            >
              ✉️ Email
            </a>
            <a 
              href="https://maps.app.goo.gl/28PCTifroYasJ2p16" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-[#112538] hover:bg-[#0d8a7b] text-slate-200 hover:text-white px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-700/60"
            >
              📍 Maps
            </a>
            <a 
              href="https://www.instagram.com/hopedentalhub?igsh=eThpaHZtZTgwMzZ2" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-[#112538] hover:bg-pink-600 text-slate-200 hover:text-white px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-700/60"
            >
              📸 Instagram
            </a>
          </div>

          <p className="text-[11px] text-slate-500 font-medium font-mono">
            © 2026 Hope Dental Hub.
          </p>

        </div>
      </footer>

      {/* FLOATING LIK CHATBOT BUTTON */}
      <button 
        onClick={() => setIsLikOpen(!isLikOpen)} 
        className="fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 bg-[#0c1d2d] text-white p-2 sm:px-4 sm:py-3 rounded-full sm:rounded-2xl shadow-2xl border border-[#0d8a7b]/40 flex items-center gap-2 font-bold text-xs hover:scale-105 active:scale-95 transition-all"
      >
        <span className="w-7 h-7 rounded-full sm:rounded-lg bg-[#0d8a7b] text-white flex items-center justify-center font-black text-[10px]">
          LIK
        </span>
        <div className="hidden sm:block text-left leading-tight">
          <p className="text-xs font-black">Ask LIK (AI)</p>
          <p className="text-[9px] text-[#90dcd0] font-normal">Assistant</p>
        </div>
      </button>

      {/* LIK AI CHAT DRAWER - RESPONSIVE MOBILE VIEWPORT ADAPTIVE */}
      {isLikOpen && (
        <div className="fixed inset-x-2 bottom-2 top-14 sm:top-auto sm:inset-x-auto sm:bottom-20 sm:right-6 z-50 sm:w-88 md:w-96 sm:h-[500px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col transition-all">
          {/* Header & Language Selector */}
          <div className="bg-[#0c1d2d] text-white p-3 sm:p-4 flex flex-col gap-2 shrink-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 bg-[#0d8a7b] text-white rounded-lg flex items-center justify-center font-black text-xs font-mono shadow-sm">
                  LIK
                </span>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm leading-tight">LIK AI Assistant</h4>
                  <p className="text-[10px] text-[#5eead4] font-mono">Live Gemini AI • 4 Languages</p>
                </div>
              </div>
              <button 
                onClick={() => setIsLikOpen(false)} 
                className="text-slate-400 hover:text-white transition-colors p-1.5 text-base font-bold"
              >
                ✕
              </button>
            </div>

            {/* 4-Language Quick Selector */}
            <div className="grid grid-cols-4 gap-1 bg-[#112538] p-1 rounded-xl border border-slate-700/60 text-[10px] sm:text-[11px] font-medium">
              {[
                { label: 'English', code: 'English' },
                { label: 'தமிழ்', code: 'Tamil' },
                { label: 'മലയാളം', code: 'Malayalam' },
                { label: 'తెలుగు', code: 'Telugu' },
              ].map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setSelectedLang(lang.code)}
                  className={`py-1 rounded-lg text-center transition-all ${
                    selectedLang === lang.code
                      ? 'bg-[#0d8a7b] text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-2.5 bg-slate-50 text-xs min-h-0" id="lik-chat-log">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`p-3 rounded-2xl max-w-[88%] sm:max-w-[85%] leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-[#0d8a7b] text-white rounded-br-none' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 text-xs italic flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 bg-[#0d8a7b] rounded-full animate-ping"></span>
                  LIK is answering in {selectedLang}...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-2 bg-white border-t border-slate-200 flex gap-2 shrink-0">
            <input 
              type="text" 
              value={queryInput} 
              onChange={(e) => setQueryInput(e.target.value)} 
              placeholder={`Ask anything in ${selectedLang}...`} 
              className="flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#0d8a7b] bg-slate-50"
            />
            <button type="submit" className="bg-[#0d8a7b] hover:bg-[#0a7265] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0">
              Send
            </button>
          </form>
        </div>
      )}

      {/* TREATMENT DETAIL MODAL */}
      {selectedTreatment && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-100 relative max-h-[85vh] flex flex-col">
            
            <div className="relative h-40 sm:h-52 w-full bg-slate-900 shrink-0">
              <img 
                src={selectedTreatment.sampleImage} 
                alt={selectedTreatment.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1d2d]/90 via-[#0c1d2d]/30 to-transparent"></div>
              
              <button 
                onClick={() => setSelectedTreatment(null)} 
                className="absolute top-3 right-3 bg-black/40 hover:bg-black text-white w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all text-xs font-bold"
              >
                ✕
              </button>

              <div className="absolute bottom-3 left-4 right-4">
                <span className="bg-[#0d8a7b] text-white text-[9px] sm:text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                  {selectedTreatment.badge}
                </span>
                <h3 className="text-base sm:text-2xl font-black text-white mt-1 leading-tight">
                  {selectedTreatment.title}
                </h3>
                <p className="text-[10px] sm:text-xs font-bold text-[#90dcd0] font-mono">{selectedTreatment.tamil}</p>
              </div>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 text-slate-600 text-xs sm:text-sm">
              <div>
                <h4 className="text-[11px] font-bold text-[#0c1d2d] uppercase tracking-wider mb-1 font-mono">
                  About This Procedure
                </h4>
                <p className="leading-relaxed text-slate-600">
                  {selectedTreatment.fullDesc}
                </p>
              </div>

              <div className="bg-[#f3f9f8] p-3 rounded-xl sm:rounded-2xl border border-[#0d8a7b]/20">
                <h4 className="text-[11px] font-bold text-[#0c1d2d] uppercase tracking-wider mb-1.5 font-mono">
                  Key Highlights & Benefits:
                </h4>
                <ul className="space-y-1">
                  {selectedTreatment.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0d8a7b] shrink-0"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, treatment: selectedTreatment.title }));
                    setSelectedTreatment(null);
                    setIsModalOpen(true);
                  }}
                  className="bg-[#0d8a7b] hover:bg-[#0a7265] text-white py-2.5 rounded-xl text-xs font-bold transition-all text-center"
                >
                  Book This Treatment
                </button>
                <button
                  onClick={() => {
                    const treatmentName = selectedTreatment.title;
                    setSelectedTreatment(null);
                    setQueryInput(`Can you tell me more details about ${treatmentName}?`);
                    setIsLikOpen(true);
                  }}
                  className="bg-[#0c1d2d] hover:bg-black text-[#90dcd0] py-2.5 rounded-xl text-xs font-bold transition-all text-center font-mono"
                >
                  💬 Ask AI About This
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* CONSULTATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white max-w-md w-full rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"
            >
              ✕
            </button>
            
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
                    placeholder={activeTab === 'kids' ? "Child / Parent Name" : "Full Name"}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-1 focus:ring-[#0d8a7b] outline-none" 
                    onChange={e => setFormData({...formData, full_name: e.target.value})} 
                  />
                  <input 
                    required 
                    type="tel" 
                    placeholder="Phone Number" 
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
                    <option value="Cavity Shield & Fluoride Varnish">🧸 Cavity Shield & Fluoride Varnish</option>
                    <option value="Dental Pit & Fissure Sealants">🦷 Dental Pit & Fissure Sealants</option>
                    <option value="Gentle Baby Tooth Root Therapy">✨ Gentle Baby Tooth Root Therapy</option>
                    <option value="Space Maintainers for Milk Teeth">🦷 Space Maintainers for Milk Teeth</option>
                    <option value="Kids Habit Correction">🎈 Kids Habit Correction</option>
                    <option value="Fun Polishing & Cleaning">✨ Fun Polishing & Cleaning</option>
                    <option value="Checkup & Consultation">Routine Checkup & Consultation</option>
                    <option value="Root Canal Treatment (RCT)">Root Canal Treatment (RCT)</option>
                    <option value="Orthodontics & Invisalign">Invisalign & Braces</option>
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
                  className={`w-full py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all mt-1 text-white ${
                    activeTab === 'kids' 
                      ? 'bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 shadow-pink-500/25' 
                      : 'bg-[#0d8a7b] hover:bg-[#0a7265] shadow-[#0d8a7b]/20'
                  }`}
                >
                  Confirm Appointment Request
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-10 h-10 bg-[#e6f7f5] text-[#0d8a7b] rounded-full flex items-center justify-center text-lg mx-auto font-bold">
                  ✓
                </div>
                <h4 className="text-lg font-black text-[#0c1d2d]">Appointment Scheduled!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Thank you! Our clinic receptionist will contact you shortly to finalize your slot time.
                </p>
                <button 
                  onClick={() => { setIsModalOpen(false); setSubmitted(false); }} 
                  className="bg-[#0c1d2d] text-white px-5 py-2 rounded-xl text-xs font-bold transition-all"
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