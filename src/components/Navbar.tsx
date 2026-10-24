import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { AnimatedLogo } from './AnimatedLogo';
import { getAutoLocation, computePrayerTimes, getNextPrayer, formatLiveClock } from '../utils/prayerTimes';
import { 
  BookOpen, 
  GraduationCap, 
  Mic, 
  User as UserIcon, 
  ShieldCheck, 
  Globe, 
  LogOut, 
  Sparkles,
  Menu,
  X,
  Phone,
  Video,
  MessageCircle,
  HelpCircle,
  Clock,
  BookMarked,
  UserCheck
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onOpenEnroll: () => void;
  onLogout: () => void;
  currency: 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD';
  setCurrency: (c: 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD') => void;
  timezone: string;
  setTimezone: (tz: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  currentUser,
  onOpenAuth,
  onOpenEnroll,
  onLogout,
  currency,
  setCurrency,
  timezone,
  setTimezone
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [liveClock, setLiveClock] = useState(() => formatLiveClock(new Date()));
  const [autoLoc] = useState(() => getAutoLocation());

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveClock(formatLiveClock(new Date()));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const prayerTimes = computePrayerTimes(new Date(), autoLoc.lat, autoLoc.lng, true);
  const nextPrayer = getNextPrayer(prayerTimes, new Date());

  const currencies: Array<'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD'> = ['USD', 'GBP', 'EUR', 'CAD', 'AUD'];

  const timezones = [
    { label: 'London (GMT)', value: 'Europe/London' },
    { label: 'New York (EST)', value: 'America/New_York' },
    { label: 'Toronto (EST)', value: 'America/Toronto' },
    { label: 'Dubai (GST)', value: 'Asia/Dubai' },
    { label: 'Sydney (AEST)', value: 'Australia/Sydney' },
    { label: 'Islamabad (PKT)', value: 'Asia/Karachi' },
  ];

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'mentor', label: 'Meet Mentor', icon: GraduationCap, badge: 'Lead' },
    { id: 'quran', label: 'Full Quran', icon: BookOpen, badge: '114 Surahs' },
    { id: 'qaida', label: 'Madani Qaida', icon: Mic, badge: 'AI Voice' },
    { id: 'namaz', label: 'Namaz Times', icon: Clock, badge: 'Auto' },
    { id: 'duas', label: 'Daily Duas', icon: BookMarked, badge: 'Sunnah' },
    { id: 'attendance', label: 'Attendance', icon: UserCheck, badge: 'Live' },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/923068959085?text=Assalam-o-Alaikum%2C%20I%20want%20to%20inquire%20about%20the%20Online%20Quran%20Teacher%20Course', '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-purple-100 text-slate-800 shadow-xs">
      
      {/* Top International Announcement & Hotline Bar (with ustadleads.com contact info) */}
      <div className="bg-gradient-to-r from-[#2e0854] via-[#3b0764] to-[#4a044e] text-white px-4 py-1.5 text-xs border-b border-purple-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center gap-2.5 text-purple-200">
            <span className="inline-flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black px-2 py-0.5 rounded text-[10px] uppercase tracking-wider shadow-xs">
              Batch Open
            </span>
            <span>Admissions Open for Online Quran Teacher Masterclass · Limited Seats!</span>
            <span className="hidden sm:inline text-purple-400">·</span>
            <button 
              onClick={handleWhatsApp} 
              className="hidden sm:inline-flex items-center gap-1 text-emerald-300 font-bold hover:text-emerald-200 transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: +92 306 8959085</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs flex-wrap">
            {/* Automatic Namaz & Local Time Widget */}
            <button
              onClick={() => {
                setCurrentView('namaz');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-[11px] font-bold text-white transition cursor-pointer"
              title={`Auto-detected: ${autoLoc.city}, ${autoLoc.country}. Click to view full Namaz schedule.`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <Clock className="w-3 h-3 text-pink-300" />
              <span className="font-mono">{liveClock}</span>
              <span className="text-purple-300">·</span>
              <span className="text-amber-300 font-bold">{nextPrayer.name} in {nextPrayer.remainingFormatted}</span>
            </button>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-purple-200 hover:text-white font-medium py-0.5 px-2 rounded hover:bg-white/10 transition"
              >
                <Globe className="w-3.5 h-3.5 text-pink-300" />
                <span>{currency}</span>
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1 w-28 bg-[#2e0854] border border-purple-800 rounded-lg shadow-2xl py-1 z-50">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-purple-800 transition flex items-center justify-between ${
                        currency === curr ? 'text-pink-300 font-bold bg-purple-900' : 'text-purple-200'
                      }`}
                    >
                      <span>{curr}</span>
                      {currency === curr && <span>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Timezone Selector */}
            <div className="hidden sm:flex items-center gap-1.5 text-purple-300">
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="bg-purple-900/80 text-purple-100 text-xs border border-purple-700/60 rounded px-1.5 py-0.5 focus:outline-none focus:border-pink-400"
              >
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Animated Futuristic Logo (PRESERVED EXACTLY AS USER DEMANDED) */}
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center focus:outline-none text-left py-1 shrink-0"
          >
            <AnimatedLogo size="md" showUrl={true} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`relative px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  currentView === item.id
                    ? 'text-purple-950 bg-gradient-to-r from-purple-100/80 to-pink-50/70 border border-purple-300/80 shadow-xs'
                    : 'text-slate-700 hover:text-purple-900 hover:bg-purple-50/60'
                }`}
              >
                {item.icon && <item.icon className={`w-3.5 h-3.5 ${currentView === item.id ? 'text-pink-600' : 'text-purple-600'}`} />}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] font-black bg-gradient-to-r from-purple-700 to-pink-600 text-white px-1.5 py-0.2 rounded-full shadow-xs">
                    {item.badge}
                  </span>
                )}
                {currentView === item.id && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-purple-700 via-pink-600 to-pink-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons: Login & Enroll Now */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Login Button */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => setCurrentView('admin')}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                      currentView === 'admin'
                        ? 'bg-purple-700 text-white border-purple-700'
                        : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                    <span>Admin</span>
                  </button>
                )}

                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                    currentView === 'dashboard'
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
                  }`}
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span className="max-w-[100px] truncate">{currentUser.name}</span>
                </button>

                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-2 text-slate-400 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="text-xs font-black text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-4 py-2.5 rounded-xl transition cursor-pointer"
              >
                Login
              </button>
            )}

            {/* Enroll Now Button (Like ustadleads.com) */}
            <button
              onClick={onOpenEnroll}
              className="bg-gradient-to-r from-purple-800 via-purple-700 to-pink-600 hover:from-purple-900 hover:to-pink-700 text-white text-xs font-black px-4.5 py-2.5 rounded-xl shadow-md shadow-pink-500/25 hover:shadow-lg transition flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-200" />
              <span>Enroll Now</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenEnroll()}
              className="sm:hidden bg-gradient-to-r from-purple-800 to-pink-600 text-white text-xs font-black px-3 py-1.5 rounded-lg"
            >
              Enroll Now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-purple-900 bg-purple-50 border border-purple-200 rounded-xl cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-purple-100 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between ${
                  currentView === item.id ? 'bg-purple-50 text-purple-900' : 'text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon className="w-4 h-4 text-purple-600" />}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-purple-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenEnroll();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-center text-xs font-black bg-gradient-to-r from-purple-800 to-pink-600 text-white rounded-xl shadow-md"
            >
              Enroll Now (PKR 4,999)
            </button>

            {currentUser ? (
              <button
                onClick={() => {
                  setCurrentView('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-center text-xs font-bold bg-purple-50 border border-purple-200 text-purple-900 rounded-xl"
              >
                Dashboard ({currentUser.name})
              </button>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-center text-xs font-bold bg-purple-50 border border-purple-200 text-purple-900 rounded-xl"
              >
                Login
              </button>
            )}

            <button
              onClick={() => {
                handleWhatsApp();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp: +92 306 8959085</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
