import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  GraduationCap, 
  ArrowRight, 
  ShieldCheck, 
  Globe, 
  CheckCircle2, 
  Users, 
  Star, 
  Phone, 
  MessageCircle, 
  BookOpen,
  Award
} from 'lucide-react';

interface HeroProps {
  onStartQaida: () => void;
  onExploreCourses: () => void;
  onOpenQuranReader: () => void;
  onOpenEnroll: () => void;
  onMeetMentor: () => void;
  onOpenWhatsApp?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartQaida,
  onExploreCourses,
  onOpenQuranReader,
  onOpenEnroll,
  onMeetMentor,
  onOpenWhatsApp
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleWhatsApp = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    } else {
      window.open('https://wa.me/923068959085?text=Assalam-o-Alaikum%20Abdul%20Basit%2C%20I%20want%20to%20enroll%20in%20the%20Online%20Quran%20Teacher%20Course', '_blank');
    }
  };

  const countries = [
    { name: 'United Kingdom', flag: '🇬🇧' },
    { name: 'United States', flag: '🇺🇸' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'Malaysia', flag: '🇲🇾' },
    { name: 'Saudi Arabia', flag: '🇸🇦' },
    { name: 'Pakistan', flag: '🇵🇰' }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f3e8ff]/50 via-white to-[#faf8ff] text-slate-900 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-purple-100">
      
      {/* Background Aurora Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-purple-400/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-10 w-[500px] h-[400px] bg-pink-400/15 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Admissions Open Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-purple-200/90 rounded-full text-xs font-bold text-purple-950 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-pink-500 animate-ping" />
            <span>Batch Admissions Open · 30 Days Masterclass with Mentor Abdul Basit</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-900 shadow-2xs">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Rated 4.9/5 by 1,000+ Students</span>
          </div>
        </div>

        {/* Main Grid: Copy on Left, Video on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subtext, Countries, CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-purple-950 leading-[1.12]">
              Training for <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 via-pink-600 to-purple-700">
                Online Quran Teachers
              </span>{' '}
              & Students.
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
              Learn proven methods to teach Quran online, attract international students worldwide, master Tajweed, and build a sustainable <strong>halal income</strong>. Backed by 5+ years of academy success and personal mentorship from <strong>Abdul Basit Saleem</strong>.
            </p>

            {/* Country Flag Badge from UstadLeads */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="text-xs font-bold text-slate-500">Students from 25+ countries:</span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-purple-100 rounded-full text-xs font-medium text-slate-700 shadow-2xs">
                {countries.map((c, i) => (
                  <span key={i} title={c.name} className="text-sm hover:scale-125 transition inline-block">
                    {c.flag}
                  </span>
                ))}
                <span className="text-[11px] font-bold text-purple-700 ml-1">UK, USA, CA, AU, PK +</span>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onOpenEnroll}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-800 via-purple-700 to-pink-600 hover:from-purple-900 hover:to-pink-700 active:scale-[0.99] text-white font-black text-sm rounded-xl transition shadow-xl shadow-pink-500/25 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Enroll Now — PKR 4,999</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-purple-50 text-purple-950 font-bold text-sm rounded-xl border border-purple-200 transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book 3-Day Free Trial</span>
              </button>

              <button
                onClick={onMeetMentor}
                className="w-full sm:w-auto px-5 py-4 bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-sm rounded-xl border border-purple-200 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-purple-700" />
                <span>Meet Mentor</span>
              </button>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="pt-1 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Instant Support:</span>
              <button 
                onClick={handleWhatsApp}
                className="font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>+92 306 8959085 (WhatsApp)</span>
              </button>
            </div>

            {/* Trust Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-purple-100 text-left">
              <div className="p-3 bg-white/80 rounded-xl border border-purple-100">
                <span className="block text-2xl font-black text-purple-950">500+</span>
                <span className="text-[11px] text-slate-500 font-medium">Teachers Trained</span>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-purple-100">
                <span className="block text-2xl font-black text-purple-950">1,000+</span>
                <span className="text-[11px] text-slate-500 font-medium">Active Students</span>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-purple-100">
                <span className="block text-2xl font-black text-purple-950">5+ Yrs</span>
                <span className="text-[11px] text-slate-500 font-medium">Academy Legacy</span>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-purple-100">
                <span className="block text-2xl font-black text-pink-600">100%</span>
                <span className="text-[11px] text-slate-500 font-medium">Halal Earning</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Video Showcase (Adjusted, prominent, and clean like ustadleads.com) */}
          <div className="lg:col-span-6 relative w-full">
            <div className="relative w-full rounded-3xl overflow-hidden bg-slate-950 shadow-2xl shadow-purple-950/20 border-2 border-purple-200 aspect-video group">
              <video
                ref={videoRef}
                src="https://ustadleads.com/heroin.mp4"
                poster="https://ustadleads.com/heroimg.png"
                playsInline
                loop
                muted={isMuted}
                className="w-full h-full object-cover cursor-pointer"
                onClick={togglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Overlaid Badge */}
              <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs font-bold flex items-center gap-2 z-20 shadow-md">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                <span>Academy Tour · Abdul Basit</span>
              </div>

              {/* Top Controls: Sound & Fullscreen */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="p-2 bg-black/75 backdrop-blur-md text-white rounded-full hover:bg-black/95 transition shadow-md cursor-pointer"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-pink-300" /> : <Volume2 className="w-4 h-4 text-emerald-300" />}
                </button>
              </div>

              {/* Center Play Overlay when paused */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 bg-purple-950/40 backdrop-blur-xs flex flex-col items-center justify-center cursor-pointer z-10 transition group-hover:bg-purple-950/30"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center shadow-2xl shadow-pink-500/60 hover:scale-110 active:scale-95 transition group-hover:ring-4 group-hover:ring-pink-500/40">
                    <Play className="w-9 h-9 translate-x-0.5 fill-white" />
                  </div>
                  <span className="text-white text-sm font-black mt-3 drop-shadow-md tracking-wide">
                    Watch Full Video by Abdul Basit
                  </span>
                  <span className="text-purple-200 text-xs drop-shadow mt-0.5">
                    Click to play with sound
                  </span>
                </div>
              )}

              {/* Bottom Right Floating Play/Pause Indicator like ustadleads.com */}
              {isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute bottom-4 right-4 p-2.5 bg-black/70 hover:bg-black/90 backdrop-blur-md text-white rounded-full transition shadow-lg z-20 cursor-pointer"
                  title="Pause video"
                >
                  <Pause className="w-5 h-5 fill-white" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
