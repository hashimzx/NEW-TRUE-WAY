import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  BookOpen, 
  Sparkles, 
  Feather, 
  ShieldCheck, 
  Scroll, 
  Compass, 
  Play, 
  Pause,
  Award
} from 'lucide-react';

export interface HistorySlide {
  id: number;
  period: string;
  year: string;
  title: string;
  arabicTitle: string;
  badge: string;
  summary: string;
  details: string[];
  keyFigures: string[];
  quranAyahRef?: {
    arabic: string;
    translation: string;
    reference: string;
  };
  visualTheme: {
    accentBg: string;
    border: string;
    iconBg: string;
  };
}

export const QURAN_HISTORY_SLIDES: HistorySlide[] = [
  {
    id: 1,
    period: 'The First Revelation',
    year: '610 CE (Ramadan, Cave of Hira)',
    title: 'The Divine Descent: "Iqra" (Read)',
    arabicTitle: 'بَدْءُ الْوَحْيِ فِي غَارِ حِرَاء',
    badge: 'Beginning of Revelation',
    summary: 'In the solitary sanctuary of Mount Jabal al-Nour near Makkah, Archangel Jibril (Gabriel) appeared to Prophet Muhammad ﷺ with the first divine command that transformed human history forever.',
    details: [
      'The initial five verses of Surah Al-\'Alaq were revealed: "Read in the name of your Lord who created..."',
      'The Prophet ﷺ was instructed to recite and memorize directly from Archangel Jibril.',
      'Marked the night of Laylat al-Qadr (The Night of Decree), better than a thousand months.'
    ],
    keyFigures: ['Prophet Muhammad ﷺ', 'Archangel Jibril (Gabriel)', 'Khadijah bint Khuwaylid (RA)'],
    quranAyahRef: {
      arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ',
      translation: 'Read in the name of your Lord who created — Created man from an adhering clot.',
      reference: 'Surah Al-\'Alaq (96:1-2)'
    },
    visualTheme: {
      accentBg: 'from-[#6B1B7E]/20 via-[#5B2A9A]/15 to-[#E0107F]/10',
      border: 'border-[#6B1B7E]/30',
      iconBg: 'bg-[#6B1B7E]'
    }
  },
  {
    id: 2,
    period: 'Prophetic Era Compilation',
    year: '610 – 632 CE (Makkah & Madinah)',
    title: 'The Scribes of Revelation (Katiban-e-Wahi)',
    arabicTitle: 'كَتَبَةُ الْوَحْيِ الشَّرِيف',
    badge: 'Oral & Written Recording',
    summary: 'As each ayah was revealed over 23 years, the Prophet ﷺ immediately recited it to his companions, placed it into its designated Surah sequence by divine instruction, and commanded designated scribes to write it down.',
    details: [
      'Written down on tanned parchment (Raqq), date-palm stalks (\'Usb), smooth white stones (Likhaf), and shoulder-blade bones (Aktaf).',
      'Hundreds of Sahabah memorized the entire Quran by heart (Huffadh) and recited it daily in Salah.',
      'Every Ramadan, Archangel Jibril reviewed the entire Quran with the Prophet ﷺ once, and twice in his final year (Al-\'Ardah al-Akhirah).'
    ],
    keyFigures: ['Zayd ibn Thabit (RA)', 'Ali ibn Abi Talib (RA)', 'Ubayy ibn Ka\'b (RA)', 'Abdullah ibn Mas\'ud (RA)'],
    quranAyahRef: {
      arabic: 'بَلْ هُوَ قُرْآنٌ مَّجِيدٌ ۝ فِي لَوْحٍ مَّحْفُوظٍ',
      translation: 'Rather, it is an honored Quran — [Inscribed] in a Preserved Slate.',
      reference: 'Surah Al-Buruj (85:21-22)'
    },
    visualTheme: {
      accentBg: 'from-[#5B2A9A]/20 via-[#6B1B7E]/15 to-[#E0107F]/10',
      border: 'border-[#5B2A9A]/30',
      iconBg: 'bg-[#5B2A9A]'
    }
  },
  {
    id: 3,
    period: 'First Caliphate Compilation',
    year: '632 – 634 CE (Battle of Yamama)',
    title: 'The First Bound Manuscript (Suhuf Abu Bakr)',
    arabicTitle: 'جَمْعُ الصِّدِّيقِ رَضِيَ اللَّهُ عَنْهُ',
    badge: 'Imperial Preservation',
    summary: 'Following the martyrdom of over 70 Huffadh at the Battle of Yamama, Umar ibn Al-Khattab (RA) urged Caliph Abu Bakr (RA) to collect all written fragments into one unified, authenticated compilation.',
    details: [
      'Zayd ibn Thabit (RA), chief scribe of the Prophet ﷺ, was appointed to lead the rigorous collection committee.',
      'Strict two-witness verification rule: every written verse required two eyewitnesses who heard the Prophet ﷺ recite it directly.',
      'The master manuscript (Al-Suhuf) remained with Abu Bakr (RA), then Umar (RA), and subsequently Hafsah bint Umar (RA).'
    ],
    keyFigures: ['Abu Bakr As-Siddiq (RA)', 'Umar ibn Al-Khattab (RA)', 'Zayd ibn Thabit (RA)', 'Hafsah bint Umar (RA)'],
    quranAyahRef: {
      arabic: 'إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ',
      translation: 'Indeed, it is We who sent down the Quran and indeed, We will be its guardian.',
      reference: 'Surah Al-Hijr (15:9)'
    },
    visualTheme: {
      accentBg: 'from-[#6B1B7E]/20 via-[#E0107F]/15 to-[#5B2A9A]/10',
      border: 'border-[#E0107F]/30',
      iconBg: 'bg-[#E0107F]'
    }
  },
  {
    id: 4,
    period: 'The Uthmanic Canon',
    year: '650 CE (Madinah Munawwarah)',
    title: 'The Universal Codex (Mushaf Al-Imam)',
    arabicTitle: 'مُصْحَفُ عُثْمَانَ ذِي النُّورَيْن',
    badge: 'Standardized Archetype',
    summary: 'As the Islamic realm expanded across Persia, the Levant, and North Africa, regional recitation pronunciation discrepancies arose. Hudhayfah ibn al-Yaman (RA) warned Caliph Uthman (RA) to unite the Ummah on one standard script.',
    details: [
      'Uthman (RA) borrowed the pristine Suhuf of Hafsah (RA) and commissioned a 4-man elite scholarly council led by Zayd ibn Thabit.',
      'Copied meticulously in the pure dialect of Quraysh to preserve all seven canonical Ahruf.',
      'Identical official copies were dispatched to Makkah, Kufa, Basra, Damascus, and Yemen, with one retained in Madinah (Mushaf Al-Imam).'
    ],
    keyFigures: ['Uthman ibn Affan (RA)', 'Hudhayfah ibn al-Yaman (RA)', 'Abdullah ibn al-Zubayr (RA)', 'Sa\'id ibn al-\'As (RA)'],
    quranAyahRef: {
      arabic: 'وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا',
      translation: 'And hold firmly to the rope of Allah all together and do not become divided.',
      reference: 'Surah Ali \'Imran (3:103)'
    },
    visualTheme: {
      accentBg: 'from-[#5B2A9A]/20 via-[#6B1B7E]/15 to-purple-100',
      border: 'border-[#6B1B7E]/30',
      iconBg: 'bg-[#6B1B7E]'
    }
  },
  {
    id: 5,
    period: 'Invention of Diacritics & Vocalization',
    year: '688 – 786 CE (Basra, Iraq)',
    title: 'Tashkeel, Dots & Tajweed Vowels',
    arabicTitle: 'إِعْجَامُ وَضَبْطُ الْمُصْحَفِ الشَّرِيف',
    badge: 'Script Modernization',
    summary: 'Early Arabic lacked dots (I\'jam) and vowel marks (Tashkeel). To enable non-Arab converts around the world to recite accurately without grammatical distortion (Lahn), master philologists pioneered the vocalization system.',
    details: [
      'Abu al-Aswad al-Du\'ali (688 CE) introduced red dots above, below, or in front of letters to denote Fathah, Kasrah, and Dammah.',
      'Al-Hajjaj ibn Yusuf commissioned Nasr ibn Asim and Yahya ibn Ya\'mur to add permanent distinguishing dots for similar letters (ب, ت, ث, ن, ي).',
      'Al-Khalil ibn Ahmad al-Farahidi (786 CE) developed the elegant current Harakat system used worldwide today.'
    ],
    keyFigures: ['Abu al-Aswad al-Du\'ali', 'Al-Khalil ibn Ahmad al-Farahidi', 'Nasr ibn Asim al-Laythi'],
    quranAyahRef: {
      arabic: 'قُرْآنًا عَرَبِيًّا غَيْرَ ذِي عِوَجٍ لَّعَلَّهُمْ يَتَّقُونَ',
      translation: 'An Arabic Quran, without any crookedness, that they might become conscious of Allah.',
      reference: 'Surah Az-Zumar (39:28)'
    },
    visualTheme: {
      accentBg: 'from-[#E0107F]/15 via-[#6B1B7E]/15 to-[#5B2A9A]/10',
      border: 'border-[#E0107F]/30',
      iconBg: 'bg-[#E0107F]'
    }
  },
  {
    id: 6,
    period: 'The Golden Age of Islamic Art',
    year: '800 – 1500 CE (Baghdad, Cairo, Cordoba)',
    title: 'Master Calligraphy, Illumination & Qira\'at',
    arabicTitle: 'عَصْرُ التَّذْهِيبِ وَالْخُطُوطِ وَالْقِرَاءَات',
    badge: 'Artistic & Scholarly Zenith',
    summary: 'Scribes elevated Quranic transcription into a sublime architectural and calligraphic sacred art. Gold leaf illumination (Tadhhib), floral borders, and the codified 10 Mutawatir Qira\'at flourished across major empires.',
    details: [
      'Ibn Mujahid (d. 936 CE) formally codified the Seven Canonical Reciters (Qira\'at) with unbroken chains back to the Sahabah.',
      'Master calligraphers Ibn Muqlah, Ibn al-Bawwab, and Yaqut al-Musta\'simi standardized the classical scripts: Naskh, Thuluth, and Muhaqqaq.',
      'Manuscripts featured genuine lapis lazuli, crushed gold pigments, and geometric Juz rosettes preserved in world museums today.'
    ],
    keyFigures: ['Ibn Mujahid (Codifier of Qira\'at)', 'Ibn Muqlah (Proportional Script Master)', 'Yaqut al-Musta\'simi'],
    quranAyahRef: {
      arabic: 'ن ۚ وَالْقَلَمِ وَمَا يَسْطُرُونَ',
      translation: 'Nun. By the pen and what they inscribe.',
      reference: 'Surah Al-Qalam (68:1)'
    },
    visualTheme: {
      accentBg: 'from-[#6B1B7E]/20 via-[#5B2A9A]/20 to-[#E0107F]/15',
      border: 'border-[#5B2A9A]/30',
      iconBg: 'bg-[#5B2A9A]'
    }
  },
  {
    id: 7,
    period: 'Modern Digital & Living Tradition',
    year: '1924 CE – Present (Global)',
    title: 'The Amiri Printing Press to AI Audio Precision',
    arabicTitle: 'الْمُصْحَفُ الْإِلِكْتَرُونِيُّ وَالْإِسْنَادُ الْمُتَّصِل',
    badge: 'Living Miraculous Isnad',
    summary: 'The Cairo Amiri Mushaf of 1924 CE established the global gold standard for typography. Today, with over 10 million living Huffadh and cutting-edge audio evaluation, the Holy Quran remains word-for-word, letter-for-letter identical to the day it was revealed.',
    details: [
      'The 1924 Cairo Edition supervised by Al-Azhar University became the universal print model followed across all Islamic presses.',
      'The King Fahd Glorious Quran Printing Complex in Madinah has printed and distributed over 300 million copies in 70+ languages.',
      'True Way Quran carries forward this unbroken oral tradition through live teacher mentorship and real-time pronunciation verification.'
    ],
    keyFigures: ['Scholars of Al-Azhar (1924 Committee)', 'King Fahd Complex Scholars', 'Global Sanad Holders & Huffadh'],
    quranAyahRef: {
      arabic: 'لَا يَأْتِيهِ الْبَاطِلُ مِن بَيْنِ يَدَيْهِ وَلَا مِنْ خَلْفِهِ ۖ تَنزِيلٌ مِّنْ حَكِيمٍ حَمِيدٍ',
      translation: 'Falsehood cannot approach it from before it or from behind it; [it is] a revelation from a [Lord who is] Wise and Praiseworthy.',
      reference: 'Surah Fussilat (41:42)'
    },
    visualTheme: {
      accentBg: 'from-[#6B1B7E]/20 via-[#E0107F]/15 to-[#5B2A9A]/15',
      border: 'border-[#6B1B7E]/40',
      iconBg: 'bg-[#6B1B7E]'
    }
  }
];

export const QuranHistoryCarousel: React.FC<{ onExploreQuran?: () => void }> = ({ onExploreQuran }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentSlide = QURAN_HISTORY_SLIDES[currentIndex];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % QURAN_HISTORY_SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? QURAN_HISTORY_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % QURAN_HISTORY_SLIDES.length);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white via-[#faf5ff] to-white border-y border-[#6B1B7E]/10 relative overflow-hidden">
      {/* Brand Color Ambient Gradients */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#6B1B7E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#E0107F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6B1B7E]/10 border border-[#6B1B7E]/25 text-[#6B1B7E] text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E0107F]" />
            <span>Interactive Historical Timeline · 7 Milestones</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#6B1B7E] tracking-tight">
            History & Preservation of the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F]">
              Holy Quran
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From the initial divine revelation in the Cave of Hira to the universal codification of Uthman (RA) and modern digital preservation — trace the miraculous 1,400+ year journey of Allah's final testament.
          </p>
        </div>

        {/* Milestone Indicator Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {QURAN_HISTORY_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => {
                setCurrentIndex(idx);
                setIsAutoPlaying(false);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition flex items-center gap-1.5 cursor-pointer ${
                currentIndex === idx
                  ? 'bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white shadow-md shadow-[#E0107F]/25 scale-105'
                  : 'bg-white text-slate-600 border border-[#6B1B7E]/20 hover:border-[#6B1B7E]/40 hover:text-[#6B1B7E]'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                currentIndex === idx ? 'bg-white/20 text-white' : 'bg-[#6B1B7E]/10 text-[#6B1B7E]'
              }`}>
                {slide.id}
              </span>
              <span className="hidden sm:inline">{slide.period}</span>
            </button>
          ))}
        </div>

        {/* Main Carousel Display Card */}
        <div className={`relative bg-gradient-to-br ${currentSlide.visualTheme.accentBg} bg-white rounded-3xl border-2 ${currentSlide.visualTheme.border} p-6 sm:p-10 shadow-2xl transition-all duration-500 overflow-hidden`}>
          
          {/* Subtle Quranic Arch Pattern in Background */}
          <div className="absolute top-0 right-0 w-80 h-80 opacity-5 pointer-events-none">
            <svg viewBox="0 0 200 200" fill="currentColor" className="text-[#6B1B7E] w-full h-full">
              <path d="M100 0 C60 50, 40 100, 40 160 L160 160 C160 100, 140 50, 100 0 Z" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Column: Timeline, Titles, and Narration */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-[#6B1B7E] text-white text-xs font-black tracking-wider uppercase shadow-xs">
                  Slide {currentSlide.id} of {QURAN_HISTORY_SLIDES.length}
                </span>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#6B1B7E]/30 text-xs font-bold text-[#6B1B7E] shadow-2xs">
                  <Clock className="w-3.5 h-3.5 text-[#E0107F]" />
                  <span>{currentSlide.year}</span>
                </span>

                <span className="px-2.5 py-1 rounded-full bg-[#E0107F]/10 border border-[#E0107F]/30 text-[#E0107F] text-xs font-bold">
                  {currentSlide.badge}
                </span>
              </div>

              <div>
                <p className="text-xl sm:text-2xl font-arabic font-quran text-[#6B1B7E] font-bold mb-1" dir="rtl">
                  {currentSlide.arabicTitle}
                </p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                  {currentSlide.title}
                </h3>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-white/70 backdrop-blur-xs p-4 rounded-2xl border border-[#6B1B7E]/10">
                {currentSlide.summary}
              </p>

              {/* Historical Highlights */}
              <div className="space-y-2">
                <p className="text-xs font-black tracking-wider uppercase text-[#6B1B7E] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#E0107F]" />
                  <span>Historical Verification Facts</span>
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  {currentSlide.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white/60 p-2 rounded-xl border border-purple-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E0107F] mt-2 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Personalities */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Key Personalities:</span>
                {currentSlide.keyFigures.map((fig, i) => (
                  <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-[#6B1B7E]/20 text-[#6B1B7E]">
                    {fig}
                  </span>
                ))}
              </div>

            </div>

            {/* Right Column: Quranic Ayah Inscription & Visual Emblem */}
            <div className="lg:col-span-5 space-y-4">
              
              {currentSlide.quranAyahRef && (
                <div className="bg-white rounded-2xl p-6 border-2 border-[#6B1B7E]/25 shadow-xl relative space-y-4">
                  <div className="flex items-center justify-between border-b border-[#6B1B7E]/15 pb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#6B1B7E]">
                      <BookOpen className="w-4 h-4 text-[#E0107F]" />
                      <span>Divine Guarantee</span>
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      {currentSlide.quranAyahRef.reference}
                    </span>
                  </div>

                  <p className="text-xl sm:text-2xl font-arabic font-quran text-[#6B1B7E] leading-loose text-center font-bold" dir="rtl">
                    {currentSlide.quranAyahRef.arabic}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 italic text-center leading-relaxed">
                    "{currentSlide.quranAyahRef.translation}"
                  </p>
                </div>
              )}

              {/* Academy Connection Banner */}
              <div className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] text-white p-5 rounded-2xl shadow-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-300" />
                  <span className="font-bold text-xs uppercase tracking-wide">Live Heritage at True Way Quran</span>
                </div>
                <p className="text-xs text-purple-100 leading-relaxed">
                  Our certified mentors carry authentic chains of transmission (Ijazah with Isnad) tracing directly back through these pivotal generations.
                </p>
                {onExploreQuran && (
                  <button
                    onClick={onExploreQuran}
                    className="w-full py-2 bg-white text-[#6B1B7E] hover:bg-purple-50 text-xs font-black rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open Full 114 Surahs Library</span>
                  </button>
                )}
              </div>

            </div>

          </div>

          {/* Carousel Controls Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-[#6B1B7E]/15 flex flex-wrap items-center justify-between gap-4">
            
            {/* Slide Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  handlePrev();
                  setIsAutoPlaying(false);
                }}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#6B1B7E] hover:text-white text-[#6B1B7E] border border-[#6B1B7E]/30 flex items-center justify-center transition shadow-xs cursor-pointer"
                title="Previous Milestone"
                aria-label="Previous Milestone"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  handleNext();
                  setIsAutoPlaying(false);
                }}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#6B1B7E] hover:text-white text-[#6B1B7E] border border-[#6B1B7E]/30 flex items-center justify-center transition shadow-xs cursor-pointer"
                title="Next Milestone"
                aria-label="Next Milestone"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="px-3 py-2 rounded-xl bg-white hover:bg-purple-50 text-slate-700 border border-[#6B1B7E]/20 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                title={isAutoPlaying ? 'Pause Slideshow' : 'Resume Auto-Play'}
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-[#E0107F]" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
                <span className="hidden sm:inline">{isAutoPlaying ? 'Pause' : 'Auto-Play'}</span>
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {QURAN_HISTORY_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentIndex(i);
                    setIsAutoPlaying(false);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === i ? 'w-8 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F]' : 'w-2 bg-[#6B1B7E]/20 hover:bg-[#6B1B7E]/50'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="text-xs font-mono font-bold text-slate-500">
              {String(currentIndex + 1).padStart(2, '0')} / {String(QURAN_HISTORY_SLIDES.length).padStart(2, '0')}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
