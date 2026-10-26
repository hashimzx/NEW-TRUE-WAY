import React, { useState } from 'react';
import { soundEngine } from '../utils/audioSynth';
import { 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  Sun, 
  Moon, 
  HeartHandshake, 
  Users, 
  HelpCircle,
  ShieldCheck,
  AlertTriangle,
  Play
} from 'lucide-react';

export type WorshipGuideCategory = 'namaz' | 'eid' | 'janazah' | 'roza';

interface StepItem {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  arabicText?: string;
  transliteration?: string;
  translation?: string;
  postureDescription: string;
  visualType: 'qiyam' | 'ruku' | 'qaumah' | 'sujood' | 'jalsah' | 'tasleem' | 'eid_takbir' | 'janazah_stand' | 'suhoor' | 'iftar';
  doThis: {
    title: string;
    description: string;
    points: string[];
  };
  avoidThis: {
    title: string;
    description: string;
    points: string[];
  };
}

export const WorshipGuideSection: React.FC<{
  onOpenFullQuran?: () => void;
  onOpenDuas?: () => void;
}> = ({ onOpenFullQuran, onOpenDuas }) => {
  const [activeTab, setActiveTab] = useState<WorshipGuideCategory>('namaz');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // Play authentic Arabic voice using audio synth
  const handlePlayArabic = (id: string, arabicText: string) => {
    if (playingAudioId === id) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setPlayingAudioId(null);
      return;
    }
    setPlayingAudioId(id);
    soundEngine.speakArabic(arabicText, 0.82).then(() => {
      setPlayingAudioId(null);
    });
  };

  // 1. DAILY NAMAZ (SALAH) STEPS & RIGHT VS WRONG
  const namazSteps: StepItem[] = [
    {
      id: 'step-qiyam',
      stepNumber: 1,
      title: 'Takbir Tahrimah & Qiyam (Standing)',
      subtitle: 'Starting Salah with presence of heart and focus on the place of Sujood',
      arabicText: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ ، وَتَبَارَكَ اسْمُكَ ، وَتَعَالَى جَدُّكَ ، وَلاَ إِلَهَ غَيْرُكَ',
      transliteration: 'Subhaanaka Allaahumma wa bihamdika, wa tabaarakasmuka, wa ta’aala jadduka, wa laa ilaaha ghayruk.',
      translation: 'Glory be to You, O Allah, and all praise. Blessed is Your Name, exalted is Your Majesty, and there is no deity worthy of worship except You.',
      postureDescription: 'Raise hands level with ears (or shoulders for women), fold right hand over left wrist below chest/navel, keeping eyes fixated on the ground at the spot of Sujood.',
      visualType: 'qiyam',
      doThis: {
        title: 'DO THIS (Sunnah Posture)',
        description: 'Stand with calm humility (Khushu). Keep feet spaced comfortably (shoulder-width), toes pointing towards Qibla, eyes strictly at the place of prostration.',
        points: [
          'Clasp right hand firmly over the back of the left wrist/forearm.',
          'Keep posture upright and steady without swaying or shifting weight.',
          'Focus gaze entirely on the spot where forehead touches in Sujood.'
        ]
      },
      avoidThis: {
        title: 'AVOID THIS (Common Mistakes)',
        description: 'Looking around, looking up at the ceiling, or letting thoughts wander into worldly affairs.',
        points: [
          'Looking up at the sky/ceiling (strictly warned against by Prophet ﷺ).',
          'Shifting feet, fidgeting with clothes, watch, or hair during recitation.',
          'Spreading legs excessively wide or gluing feet tightly together.'
        ]
      }
    },
    {
      id: 'step-ruku',
      stepNumber: 2,
      title: 'Ruku (Bowing with a Level Back)',
      subtitle: 'Magnifying Allah with spine perfectly straight and palms on knees',
      arabicText: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
      transliteration: 'Subhaana Rabbiyal-’Azeem (Recited 3 times)',
      translation: 'Glory be to my Lord, the Most Magnificent.',
      postureDescription: 'Bow until back and head form a level horizontal plane. Clasp kneecaps with fingers spread wide, elbows straight without bending outwards.',
      visualType: 'ruku',
      doThis: {
        title: 'DO THIS (Sunnah Posture)',
        description: 'Back completely horizontal so that if a cup of water were placed on your back, it would not spill.',
        points: [
          'Spread fingers open and grip the kneecaps like holding a bowl.',
          'Keep head in line with the straight back (neither raised high nor drooping).',
          'Attain full tranquility (Tuma’ninah) for at least 3 tasbeehs before rising.'
        ]
      },
      avoidThis: {
        title: 'AVOID THIS (Common Mistakes)',
        description: 'Curving or hunching the spine, bending the knees, or rushing the bow like a quick dip.',
        points: [
          'Hunching the back like an arch or keeping head tilted awkwardly upward.',
          'Bending knees or resting hands on thighs instead of kneecaps.',
          'Racing into Ruku and jumping straight back up before achieving still rest.'
        ]
      }
    },
    {
      id: 'step-sujood',
      stepNumber: 3,
      title: 'Sujood (Prostration on Seven Bones)',
      subtitle: 'The closest a slave comes to their Lord Almighty',
      arabicText: 'سُبْحَانَ رَبِّيَ الأَعْلَى',
      transliteration: 'Subhaana Rabbiyal-A’laa (Recited 3 times)',
      translation: 'Glory be to my Lord, the Most High.',
      postureDescription: 'Prostrate with 7 bones touching ground: forehead and nose together, both palms, both knees, and the toes of both feet turned toward Qibla.',
      visualType: 'sujood',
      doThis: {
        title: 'DO THIS (Sunnah Posture)',
        description: 'Forehead and nose firmly pressed to ground. Keep forearms and elbows raised off the floor and away from ribcage (for men).',
        points: [
          'Ensure the nose touches the ground firmly along with the forehead.',
          'Both feet upright with toes bent forward pointing directly to the Qibla.',
          'Keep elbows lifted like wings, not resting on thighs or the prayer mat.'
        ]
      },
      avoidThis: {
        title: 'AVOID THIS (Common Mistakes)',
        description: 'Resting forearms flat on the ground like a dog, lifting feet into the air, or resting only on the forehead.',
        points: [
          'Laying forearms flat on the floor (explicitly forbidden by Prophet ﷺ).',
          'Lifting feet off the ground or dangling them in the air during Sujood.',
          'Resting forehead while nose remains elevated off the ground.'
        ]
      }
    },
    {
      id: 'step-tashahhud',
      stepNumber: 4,
      title: 'Jalsah & Tashahhud (Sitting & Testimony)',
      subtitle: 'Sitting serenely between prostrations and reciting Attahiyyaat',
      arabicText: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ ، السَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
      transliteration: 'At-tahiyyaatu lillaahi was-salawaatu wat-tayyibaatu, as-salaamu ‘alayka ayyuhan-Nabiyyu wa rahmatullaahi wa barakaatuh...',
      translation: 'All compliments, prayers, and pure things are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings.',
      postureDescription: 'Sit in Iftirash: lay left foot flat and sit on it, keeping right foot upright with toes facing Qibla. Rest hands on thighs with index finger raised upon testifying Tawheed.',
      visualType: 'jalsah',
      doThis: {
        title: 'DO THIS (Sunnah Posture)',
        description: 'Sit in calm stillness. Rest palms on thighs right above knees. Raise right index finger pointing towards Qibla at "Ashhadu alla ilaha illallah".',
        points: [
          'Make sincere Dua between the two prostrations: "Rabbighfir lee".',
          'Raise index finger without wild shaking; direct it towards Qibla with focus.',
          'Keep posture dignified and still, without slouching backward.'
        ]
      },
      avoidThis: {
        title: 'AVOID THIS (Common Mistakes)',
        description: 'Iq’aa (sitting on heels like an animal) or waving the finger erratically.',
        points: [
          'Sitting between heels with toes pointing backward (Iq’aa of the dog).',
          'Rushing from first Sujood to second without a pause in Jalsah.',
          'Leaving fingers dangling over knees or looking at hands instead of lap.'
        ]
      }
    }
  ];

  // 2. EID NAMAZ (SALAT AL-EID) GUIDE
  const eidSteps: StepItem[] = [
    {
      id: 'eid-rakah1',
      stepNumber: 1,
      title: 'First Rak’ah: 3 Extra Takbeerat',
      subtitle: 'Beginning the joyful prayer with extra glorification of Allah',
      arabicText: 'اللهُ أَكْبَرُ ، اللهُ أَكْبَرُ ، لاَ إِلَهَ إِلاَّ اللهُ ، وَاللهُ أَكْبَرُ ، اللهُ أَكْبَرُ ، وَلِلَّهِ الْحَمْدُ',
      transliteration: 'Allaahu Akbar, Allaahu Akbar, Laa ilaaha illallaah, Wallaahu Akbar, Allaahu Akbar, wa lillaahil-hamd.',
      translation: 'Allah is the Greatest, Allah is the Greatest, there is no deity worthy of worship but Allah. Allah is the Greatest, Allah is the Greatest, and all praise belongs to Allah.',
      postureDescription: 'After Takbir Tahrimah and Thana, Imam recites 3 extra Takbeerat. Raise hands to ears on each Takbir and let them drop down by your sides. After the 3rd Takbir, fold hands across chest/navel for Surah Al-Fatihah.',
      visualType: 'eid_takbir',
      doThis: {
        title: 'DO THIS (Sunnah of Eid Salah)',
        description: 'Raise hands up to ears for each extra Takbir and let hands hang down naturally after the first two, folding only after the third.',
        points: [
          'Listen quietly to the Imam’s recitation of Surah Al-A’la or Surah Qaf.',
          'Recite Takbeerat-e-Tashreeq loudly while walking to the Eid prayer Musalla.',
          'Perform Ghusl, wear best clean garments, and apply Itr (perfume) for men.'
        ]
      },
      avoidThis: {
        title: 'AVOID THIS (Common Eid Mistakes)',
        description: 'Praying Nafl prayer immediately before Eid Salah at the open prayer ground, or leaving before the Khutbah.',
        points: [
          'Praying Nafl before or after the Eid prayer at the Musalla (contrary to Sunnah).',
          'Leaving the Musalla while the Imam is delivering the Eid Khutbah.',
          'Fasting on the Day of Eid (explicitly prohibited in Islamic law).'
        ]
      }
    },
    {
      id: 'eid-rakah2',
      stepNumber: 2,
      title: 'Second Rak’ah: 3 Extra Takbeerat Before Ruku',
      subtitle: 'Extra Takbeerat performed after recitation of Surah Al-Fatihah and Surah',
      arabicText: 'سَبِّحِ اسْمَ رَبِّكَ الأَعْلَى ... هَلْ أَتَاكَ حَدِيثُ الْغَاشِيَةِ',
      transliteration: 'Sabbihisma Rabbikal-A’laa ... Hal ataaka hadeethul-Ghaashiyah',
      translation: 'Exalt the name of your Lord, the Most High ... Has there reached you the report of the Overwhelming [event]?',
      postureDescription: 'In 2nd Rak’ah, recite Al-Fatihah + Surah first. Then before bowing into Ruku, the Imam will call 3 extra Takbeerat (raise hands and drop to sides). On the 4th Takbir, bow directly into Ruku without raising hands.',
      visualType: 'eid_takbir',
      doThis: {
        title: 'DO THIS (Sunnah Sequence)',
        description: 'Raise hands on the 3 extra Takbeerat after Surah recitation, and on the 4th Takbir move directly into Ruku.',
        points: [
          'Stay calm if confused; simply follow the Imam’s voice closely.',
          'Take an alternate walking route on your return journey from Eid prayer.',
          'Eat an odd number of dates before leaving home on Eid al-Fitr.'
        ]
      },
      avoidThis: {
        title: 'AVOID THIS (Mistakes in 2nd Rak’ah)',
        description: 'Bowing into Ruku prematurely before the 3 extra Takbeerat are called by the Imam.',
        points: [
          'Going directly into Ruku when the Imam calls the first Takbir of the 2nd Rak’ah.',
          'Folding hands after the extra Takbeerat in the second Rak’ah (they drop to sides).',
          'Engaging in loud chit-chat while the Eid Sermon is being given.'
        ]
      }
    }
  ];

  // 3. NAMAZ-E-JANAZAH (FUNERAL PRAYER) GUIDE
  const janazahSteps: StepItem[] = [
    {
      id: 'janazah-all',
      stepNumber: 1,
      title: 'The 4 Takbeerat of Janazah (No Ruku or Sujood)',
      subtitle: 'A solemn standing supplication of forgiveness for our departed Muslim brother/sister',
      arabicText: 'اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا ، وَشَاهِدِنَا وَغَائِبِنَا ، وَصَغِيرِنَا وَكَبِيرِنَا ، وَذَكَرِنَا وَأُنْثَانَا',
      transliteration: 'Allaahummagh-fir lihayyinaa wa mayyitinaa, wa shaahidinaa wa ghaa’ibinaa, wa sagheerinaa wa kabeerinaa, wa thakarinaa wa unthaanaa...',
      translation: 'O Allah, forgive our living and our deceased, those present and those absent, our young and our old, our males and our females. O Allah, whomever You keep alive among us, keep him alive upon Islam.',
      postureDescription: 'Namaz-e-Janazah consists strictly of 4 Takbeerat performed completely standing upright with hands folded. There is NO Ruku (bowing) and NO Sujood (prostration).',
      visualType: 'janazah_stand',
      doThis: {
        title: 'DO THIS (Proper Janazah Etiquette)',
        description: 'Stand in 3 or an odd number of rows behind the Imam. Supplicate with tears and heartfelt sincerity for the deceased.',
        points: [
          '1st Takbir: Recite Thana (including "wa Jalla Thanaa’uk") or Surah Al-Fatihah.',
          '2nd Takbir: Recite complete Durood Ibrahim upon the Prophet ﷺ.',
          '3rd Takbir: Recite the authentic Janazah Dua for forgiveness.',
          '4th Takbir: Pause briefly, then turn head for Salam to end the prayer.'
        ]
      },
      avoidThis: {
        title: 'AVOID THIS (Grave Errors in Janazah)',
        description: 'Attempting to bow into Ruku or prostrate into Sajdah; screaming or wailing.',
        points: [
          'Bowing or prostrating (Namaz-e-Janazah has zero Ruku and zero Sujood).',
          'Loud screaming, chest-beating, or wailing (Niyaha), which is forbidden in Islam.',
          'Walking directly in front of the Janazah prayer rows.'
        ]
      }
    }
  ];

  // 4. ROZA (FASTING / SAWM) - RULES, DOS & AVOID THIS
  const rozaData = {
    title: 'Rules & Spiritual Etiquettes of Fasting (Roza / Sawm)',
    subtitle: 'From True Dawn (Fajr) to Sunset (Maghrib) for the sake of Allah',
    iftarDuaArabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ',
    iftarDuaTrans: 'Thahaba ath-thama’u wabtallatil-‘urooqu wa thabatal-ajru in shaa Allaah.',
    iftarDuaMeaning: 'The thirst has vanished, the veins have been moistened, and the reward is established, if Allah wills. (Abu Dawud)',
    suhoorDuaArabic: 'وَبِصَوْمِ غَدٍ نَوَيْتُ مِنْ شَهْرِ رَمَضَانَ',
    suhoorDuaTrans: 'Wa bisawmi ghadin nawaytu min shahri Ramadan.',
    suhoorDuaMeaning: 'And I intend to keep the fast tomorrow for the month of Ramadan.',
    doThisList: [
      {
        title: 'Eat the Pre-Dawn Meal (Suhoor / Sehri)',
        desc: 'The Prophet ﷺ said: "Eat Suhoor, for indeed in Suhoor there is divine blessing (Barakah)." Even drinking a sip of water or eating a single date fulfills the Sunnah.',
        hadith: 'Sahih Al-Bukhari 1923'
      },
      {
        title: 'Hasten to Break the Fast (Iftar) at Sunset',
        desc: 'Break your fast immediately upon the arrival of Maghrib adhan with fresh dates, dried dates, or water, followed by making sincere Duas before eating your meal.',
        hadith: 'Sahih Al-Bukhari 1957'
      },
      {
        title: 'Guard the Tongue, Eyes, and Temper',
        desc: 'The Prophet ﷺ said: "If one of you is fasting, he should avoid obscenity and arguing. If someone insults or fights him, let him say: ‘I am fasting (Inni Sa’im)’."',
        hadith: 'Sahih Muslim 1151'
      },
      {
        title: 'Abundant Charity, Quran Recitation & Taraweeh',
        desc: 'The Prophet ﷺ was the most generous of people, and he was at his utmost peak of generosity during Ramadan when Jibreel (AS) reviewed the Quran with him.',
        hadith: 'Sahih Al-Bukhari 6'
      }
    ],
    avoidThisList: [
      {
        title: 'What Completely Invalidates (Breaks) the Fast',
        desc: 'Deliberate eating, drinking, smoking, taking nutritive IV fluids, or intentional vomiting from True Dawn (Fajr) until Sunset (Maghrib). Requires Qada and repentance.',
        severity: 'Invalidates Fast'
      },
      {
        title: 'False Speech, Slander & Foul Arguments',
        desc: 'The Prophet ﷺ said: "Whoever does not leave false speech and acting upon it, Allah has no need in him leaving his food and drink." Sins rob the entire spiritual reward.',
        severity: 'Destroys Reward'
      },
      {
        title: 'Sleeping All Day to Evade the Hunger',
        desc: 'Spending the entire daylight hours asleep and consequently delaying or missing obligatory prayers (Dhuhr and Asr) goes against the primary purpose of Taqwa.',
        severity: 'Gross Negligence'
      },
      {
        title: 'Extravagant Overeating at Iftar',
        desc: 'Consuming heavy, greasy foods to excess at Iftar leads to physical fatigue and laziness during the nightly Taraweeh and Tahajjud prayers.',
        severity: 'Harmful Habit'
      }
    ],
    permissibleList: [
      {
        title: 'Brushing Teeth & Using Miswak',
        desc: 'Using a natural Miswak or toothbrush (without swallowing toothpaste) is entirely permissible and encouraged in Sunnah.'
      },
      {
        title: 'Medical Injections & Blood Tests',
        desc: 'Routine blood samples, insulin shots, and non-nutritional medical injections into muscle or vein do not break the fast.'
      },
      {
        title: 'Rinsing Mouth & Taking a Shower',
        desc: 'Rinsing mouth or nose during Wudu (without excessive inhalation) and bathing to cool down is permissible.'
      },
      {
        title: 'Eating or Drinking by Honest Forgetfulness',
        desc: 'If someone eats or drinks out of genuine forgetfulness, their fast remains 100% valid. The Prophet ﷺ said: "Allah has fed him and given him drink."'
      }
    ]
  };

  // Helper renderer for visual SVG posture cards
  const renderPostureVisual = (type: StepItem['visualType']) => {
    switch (type) {
      case 'qiyam':
        return (
          <div className="w-full h-44 bg-gradient-to-b from-purple-50 to-slate-100 rounded-2xl flex items-center justify-center border border-[#6B1B7E]/15 relative overflow-hidden group">
            {/* Ambient prayer rug pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6B1B7E_1px,transparent_1px)] [background-size:16px_16px]" />
            <svg viewBox="0 0 160 160" className="w-32 h-32 transition-transform group-hover:scale-105 duration-300">
              {/* Prayer Rug */}
              <path d="M 40 145 L 120 145 L 110 155 L 50 155 Z" fill="#6B1B7E" opacity="0.4" />
              {/* Person Standing in Qiyam */}
              <circle cx="80" cy="35" r="12" fill="#6B1B7E" />
              {/* Torso */}
              <path d="M 68 50 L 92 50 L 90 100 L 70 100 Z" fill="#5B2A9A" />
              {/* Folded Arms on chest */}
              <path d="M 66 58 Q 80 72 94 58" stroke="#E0107F" strokeWidth="6" strokeLinecap="round" fill="none" />
              <circle cx="80" cy="65" r="4" fill="#FFFFFF" />
              {/* Legs */}
              <line x1="74" y1="100" x2="74" y2="145" stroke="#6B1B7E" strokeWidth="7" strokeLinecap="round" />
              <line x1="86" y1="100" x2="86" y2="145" stroke="#6B1B7E" strokeWidth="7" strokeLinecap="round" />
              {/* Focus Arrow pointing to ground */}
              <line x1="86" y1="42" x2="98" y2="140" stroke="#E0107F" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
            </svg>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 text-[10px] font-bold text-[#6B1B7E] bg-white/80 backdrop-blur-xs rounded-lg py-0.5 border border-purple-200">
              <span>Gaze: Spot of Sujood</span>
              <span>Hands: Right over Left</span>
            </div>
          </div>
        );

      case 'ruku':
        return (
          <div className="w-full h-44 bg-gradient-to-b from-purple-50 to-slate-100 rounded-2xl flex items-center justify-center border border-[#6B1B7E]/15 relative overflow-hidden group">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6B1B7E_1px,transparent_1px)] [background-size:16px_16px]" />
            <svg viewBox="0 0 160 160" className="w-36 h-36 transition-transform group-hover:scale-105 duration-300">
              {/* Prayer Rug */}
              <rect x="25" y="145" width="110" height="8" rx="2" fill="#6B1B7E" opacity="0.3" />
              {/* Head */}
              <circle cx="48" cy="75" r="11" fill="#6B1B7E" />
              {/* Horizontal Back (Level Plane) */}
              <line x1="58" y1="75" x2="115" y2="75" stroke="#5B2A9A" strokeWidth="12" strokeLinecap="round" />
              {/* Straight Level Guide Line */}
              <line x1="40" y1="68" x2="125" y2="68" stroke="#E0107F" strokeWidth="1.5" strokeDasharray="2 2" />
              {/* Arms extending straight to knees */}
              <line x1="68" y1="75" x2="95" y2="115" stroke="#E0107F" strokeWidth="5" strokeLinecap="round" />
              {/* Legs vertical */}
              <line x1="112" y1="75" x2="112" y2="145" stroke="#6B1B7E" strokeWidth="8" strokeLinecap="round" />
              {/* Kneecap Clasp */}
              <circle cx="97" cy="115" r="5" fill="#E0107F" />
            </svg>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 text-[10px] font-bold text-[#6B1B7E] bg-white/80 backdrop-blur-xs rounded-lg py-0.5 border border-purple-200">
              <span>Back: 180° Level Horizontal</span>
              <span>Hands: Grip Kneecaps</span>
            </div>
          </div>
        );

      case 'sujood':
        return (
          <div className="w-full h-44 bg-gradient-to-b from-purple-50 to-slate-100 rounded-2xl flex items-center justify-center border border-[#6B1B7E]/15 relative overflow-hidden group">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6B1B7E_1px,transparent_1px)] [background-size:16px_16px]" />
            <svg viewBox="0 0 160 160" className="w-36 h-36 transition-transform group-hover:scale-105 duration-300">
              {/* Rug */}
              <rect x="15" y="142" width="130" height="8" rx="2" fill="#6B1B7E" opacity="0.4" />
              {/* Forehead & Nose on floor */}
              <circle cx="38" cy="132" r="10" fill="#6B1B7E" />
              <ellipse cx="32" cy="137" rx="3" ry="2" fill="#E0107F" />
              {/* Palms on floor */}
              <ellipse cx="48" cy="140" rx="4" ry="2" fill="#E0107F" />
              {/* Elevated Forearms & Elbows (Winged) */}
              <path d="M 42 128 L 52 108 L 65 120" stroke="#E0107F" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              {/* Arch of Torso */}
              <path d="M 44 126 Q 75 92 105 110" stroke="#5B2A9A" strokeWidth="11" strokeLinecap="round" fill="none" />
              {/* Thighs & Knees on floor */}
              <line x1="105" y1="110" x2="88" y2="140" stroke="#6B1B7E" strokeWidth="8" strokeLinecap="round" />
              <line x1="88" y1="140" x2="125" y2="140" stroke="#6B1B7E" strokeWidth="7" strokeLinecap="round" />
              {/* Feet with Toes pointing forward */}
              <line x1="125" y1="140" x2="135" y2="125" stroke="#E0107F" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 text-[10px] font-bold text-[#6B1B7E] bg-white/80 backdrop-blur-xs rounded-lg py-0.5 border border-purple-200">
              <span>7 Touch Bones Firmly</span>
              <span>Elbows Lifted Off Ground</span>
            </div>
          </div>
        );

      case 'jalsah':
        return (
          <div className="w-full h-44 bg-gradient-to-b from-purple-50 to-slate-100 rounded-2xl flex items-center justify-center border border-[#6B1B7E]/15 relative overflow-hidden group">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6B1B7E_1px,transparent_1px)] [background-size:16px_16px]" />
            <svg viewBox="0 0 160 160" className="w-32 h-32 transition-transform group-hover:scale-105 duration-300">
              {/* Rug */}
              <rect x="20" y="142" width="120" height="8" rx="2" fill="#6B1B7E" opacity="0.4" />
              {/* Head */}
              <circle cx="80" cy="55" r="11" fill="#6B1B7E" />
              {/* Upright Back */}
              <line x1="80" y1="66" x2="80" y2="115" stroke="#5B2A9A" strokeWidth="12" strokeLinecap="round" />
              {/* Legs in Iftirash (Sitting on left foot) */}
              <path d="M 80 115 L 105 138 L 55 138" stroke="#6B1B7E" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              {/* Arms on thighs */}
              <line x1="76" y1="78" x2="62" y2="118" stroke="#E0107F" strokeWidth="5" strokeLinecap="round" />
              {/* Pointing Index Finger at Shahadah */}
              <line x1="62" y1="118" x2="50" y2="114" stroke="#E0107F" strokeWidth="3" strokeLinecap="round" />
              <circle cx="49" cy="114" r="2" fill="#E0107F" />
            </svg>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 text-[10px] font-bold text-[#6B1B7E] bg-white/80 backdrop-blur-xs rounded-lg py-0.5 border border-purple-200">
              <span>Sit in Iftirash</span>
              <span>Point Finger at Tawheed</span>
            </div>
          </div>
        );

      case 'eid_takbir':
        return (
          <div className="w-full h-44 bg-gradient-to-b from-purple-50 to-slate-100 rounded-2xl flex items-center justify-center border border-[#6B1B7E]/15 relative overflow-hidden group">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6B1B7E_1px,transparent_1px)] [background-size:16px_16px]" />
            <svg viewBox="0 0 160 160" className="w-32 h-32 transition-transform group-hover:scale-105 duration-300">
              <circle cx="80" cy="45" r="12" fill="#6B1B7E" />
              <line x1="80" y1="57" x2="80" y2="115" stroke="#5B2A9A" strokeWidth="12" strokeLinecap="round" />
              {/* Raised hands to ears */}
              <path d="M 65 65 L 50 48" stroke="#E0107F" strokeWidth="5" strokeLinecap="round" />
              <path d="M 95 65 L 110 48" stroke="#E0107F" strokeWidth="5" strokeLinecap="round" />
              <circle cx="48" cy="45" r="4" fill="#E0107F" />
              <circle cx="112" cy="45" r="4" fill="#E0107F" />
              {/* Legs */}
              <line x1="74" y1="115" x2="74" y2="148" stroke="#6B1B7E" strokeWidth="7" strokeLinecap="round" />
              <line x1="86" y1="115" x2="86" y2="148" stroke="#6B1B7E" strokeWidth="7" strokeLinecap="round" />
            </svg>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 text-[10px] font-bold text-[#6B1B7E] bg-white/80 backdrop-blur-xs rounded-lg py-0.5 border border-purple-200">
              <span>Raise Hands to Ears</span>
              <span>3 Extra Takbeerat</span>
            </div>
          </div>
        );

      case 'janazah_stand':
        return (
          <div className="w-full h-44 bg-gradient-to-b from-purple-50 to-slate-100 rounded-2xl flex items-center justify-center border border-[#6B1B7E]/15 relative overflow-hidden group">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6B1B7E_1px,transparent_1px)] [background-size:16px_16px]" />
            <svg viewBox="0 0 160 160" className="w-32 h-32 transition-transform group-hover:scale-105 duration-300">
              {/* Congregation Row */}
              <circle cx="80" cy="38" r="11" fill="#6B1B7E" />
              <line x1="80" y1="49" x2="80" y2="105" stroke="#5B2A9A" strokeWidth="11" strokeLinecap="round" />
              <line x1="74" y1="105" x2="74" y2="145" stroke="#6B1B7E" strokeWidth="6" strokeLinecap="round" />
              <line x1="86" y1="105" x2="86" y2="145" stroke="#6B1B7E" strokeWidth="6" strokeLinecap="round" />
              {/* Hands folded across chest */}
              <path d="M 68 56 Q 80 66 92 56" stroke="#E0107F" strokeWidth="5" strokeLinecap="round" fill="none" />
              {/* Zero Ruku & Zero Sujood Badge */}
              <rect x="25" y="12" width="110" height="18" rx="9" fill="#E0107F" />
              <text x="80" y="24" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">4 Takbeers · No Ruku/Sajdah</text>
            </svg>
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 text-[10px] font-bold text-[#6B1B7E] bg-white/80 backdrop-blur-xs rounded-lg py-0.5 border border-purple-200">
              <span>Standing Only</span>
              <span>Dua of Forgiveness</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section 
      id="worship-guide"
      className="py-16 md:py-24 bg-gradient-to-b from-white via-purple-50/40 to-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/90 border border-[#6B1B7E]/20 text-[#6B1B7E] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#E0107F]" />
            <span>Islamic Worship & Sunnah Mastery</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            True Way of <span className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] bg-clip-text text-transparent">Namaz, Eid, Janazah & Roza</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            Learn authentic prophetic postures with correct Arabic recitations, audio pronunciation, and step-by-step visual comparisons of <strong>what to do</strong> and <strong>what to avoid</strong>.
          </p>
        </div>

        {/* Category Tabs (Namaz, Eid, Janazah, Roza) */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white shadow-md border border-[#6B1B7E]/15 rounded-2xl max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab('namaz')}
            className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'namaz'
                ? 'bg-gradient-to-r from-[#6B1B7E] to-[#5B2A9A] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#6B1B7E] hover:bg-purple-50'
            }`}
          >
            <span>🕌</span>
            <span>Daily Namaz</span>
          </button>

          <button
            onClick={() => setActiveTab('eid')}
            className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'eid'
                ? 'bg-gradient-to-r from-[#6B1B7E] to-[#5B2A9A] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#6B1B7E] hover:bg-purple-50'
            }`}
          >
            <span>🌙</span>
            <span>Eid Namaz</span>
          </button>

          <button
            onClick={() => setActiveTab('janazah')}
            className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'janazah'
                ? 'bg-gradient-to-r from-[#6B1B7E] to-[#5B2A9A] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#6B1B7E] hover:bg-purple-50'
            }`}
          >
            <span>⚰️</span>
            <span>Namaz Janazah</span>
          </button>

          <button
            onClick={() => setActiveTab('roza')}
            className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'roza'
                ? 'bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#6B1B7E] hover:bg-purple-50'
            }`}
          >
            <span>📿</span>
            <span>Roza (Fasting)</span>
          </button>
        </div>

        {/* TAB 1: DAILY NAMAZ POSTURES & RIGHT/WRONG */}
        {activeTab === 'namaz' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {namazSteps.map((step) => {
                const isPlaying = playingAudioId === step.id;
                return (
                  <div 
                    key={step.id}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-[#6B1B7E]/15 shadow-lg shadow-purple-900/5 space-y-6 hover:border-[#6B1B7E]/30 transition duration-300"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#6B1B7E] text-white font-black text-sm flex items-center justify-center shrink-0">
                          {step.stepNumber}
                        </span>
                        <div>
                          <h3 className="text-lg font-black text-slate-900">{step.title}</h3>
                          <p className="text-xs text-slate-500 font-medium">{step.subtitle}</p>
                        </div>
                      </div>

                      {step.arabicText && (
                        <button
                          onClick={() => handlePlayArabic(step.id, step.arabicText!)}
                          className={`p-2.5 rounded-xl border transition flex items-center gap-1.5 cursor-pointer ${
                            isPlaying
                              ? 'bg-[#E0107F] text-white border-[#E0107F] shadow-sm animate-pulse'
                              : 'bg-purple-50 text-[#6B1B7E] border-purple-200 hover:bg-purple-100'
                          }`}
                          title="Listen to Arabic Pronunciation"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span className="text-[11px] font-bold hidden sm:inline">
                            {isPlaying ? 'Playing...' : 'Audio'}
                          </span>
                        </button>
                      )}
                    </div>

                    {/* Visual Posture Diagram */}
                    {renderPostureVisual(step.visualType)}

                    {/* Arabic Text & Translation */}
                    {step.arabicText && (
                      <div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100 space-y-2">
                        <p className="font-arabic font-quran text-xl sm:text-2xl text-right text-slate-900 leading-loose" dir="rtl">
                          {step.arabicText}
                        </p>
                        <p className="text-xs font-semibold text-[#6B1B7E]">
                          {step.transliteration}
                        </p>
                        <p className="text-xs text-slate-600 italic">
                          "{step.translation}"
                        </p>
                      </div>
                    )}

                    {/* Posture Description */}
                    <p className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <strong>Posture Focus:</strong> {step.postureDescription}
                    </p>

                    {/* Side-by-Side Right vs Wrong */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {/* Do This (Right) */}
                      <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-4 space-y-2">
                        <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase tracking-wide">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{step.doThis.title}</span>
                        </div>
                        <p className="text-[11px] text-emerald-950 font-medium">
                          {step.doThis.description}
                        </p>
                        <ul className="space-y-1 text-[11px] text-emerald-900">
                          {step.doThis.points.map((pt, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Avoid This (Wrong) */}
                      <div className="bg-rose-50/70 border border-rose-200/90 rounded-2xl p-4 space-y-2">
                        <div className="flex items-center gap-2 text-rose-800 font-black text-xs uppercase tracking-wide">
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>{step.avoidThis.title}</span>
                        </div>
                        <p className="text-[11px] text-rose-950 font-medium">
                          {step.avoidThis.description}
                        </p>
                        <ul className="space-y-1 text-[11px] text-rose-900">
                          {step.avoidThis.points.map((pt, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-rose-600 font-bold">✗</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: EID NAMAZ STEP-BY-STEP */}
        {activeTab === 'eid' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            {/* Eid Takbeerat-e-Tashreeq Spotlight Card */}
            <div className="bg-gradient-to-r from-[#6B1B7E] via-[#5B2A9A] to-[#E0107F] text-white p-7 sm:p-9 rounded-3xl shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
                  Authentic Eid Takbeerat
                </span>
                <button
                  onClick={() => handlePlayArabic('eid-takbeerat-main', 'اللهُ أَكْبَرُ اللهُ أَكْبَرُ لاَ إِلَهَ إِلاَّ اللهُ وَاللهُ أَكْبَرُ اللهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ')}
                  className="px-4 py-2 bg-white text-[#6B1B7E] hover:bg-pink-50 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Volume2 className="w-4 h-4 text-[#E0107F]" />
                  <span>Listen to Takbeerat Audio</span>
                </button>
              </div>

              <p className="font-arabic font-quran text-2xl sm:text-4xl text-right leading-relaxed" dir="rtl">
                اللهُ أَكْبَرُ ، اللهُ أَكْبَرُ ، لاَ إِلَهَ إِلاَّ اللهُ ، وَاللهُ أَكْبَرُ ، اللهُ أَكْبَرُ ، وَلِلَّهِ الْحَمْدُ
              </p>

              <div className="border-t border-white/20 pt-3 text-xs space-y-1 text-purple-100 font-medium">
                <p><strong>Transliteration:</strong> Allaahu Akbar, Allaahu Akbar, Laa ilaaha illallaah, Wallaahu Akbar, Allaahu Akbar, wa lillaahil-hamd.</p>
                <p><strong>Translation:</strong> Allah is the Greatest, Allah is the Greatest, there is no deity worthy of worship but Allah. Allah is the Greatest, Allah is the Greatest, and all praise belongs to Allah.</p>
              </div>
            </div>

            {/* 2 Rak'at Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {eidSteps.map((step) => {
                const isPlaying = playingAudioId === step.id;
                return (
                  <div 
                    key={step.id}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-[#6B1B7E]/15 shadow-lg shadow-purple-900/5 space-y-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#6B1B7E] text-white font-black text-sm flex items-center justify-center shrink-0">
                          {step.stepNumber}
                        </span>
                        <div>
                          <h3 className="text-lg font-black text-slate-900">{step.title}</h3>
                          <p className="text-xs text-slate-500 font-medium">{step.subtitle}</p>
                        </div>
                      </div>

                      {step.arabicText && (
                        <button
                          onClick={() => handlePlayArabic(step.id, step.arabicText!)}
                          className="p-2.5 rounded-xl border bg-purple-50 text-[#6B1B7E] border-purple-200 hover:bg-purple-100 transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span className="text-[11px] font-bold">Audio</span>
                        </button>
                      )}
                    </div>

                    {renderPostureVisual(step.visualType)}

                    <p className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <strong>Method:</strong> {step.postureDescription}
                    </p>

                    <div className="space-y-3 pt-2">
                      <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 space-y-1.5">
                        <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase tracking-wide">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{step.doThis.title}</span>
                        </div>
                        <ul className="space-y-1 text-[11px] text-emerald-900">
                          {step.doThis.points.map((pt, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-4 space-y-1.5">
                        <div className="flex items-center gap-2 text-rose-800 font-black text-xs uppercase tracking-wide">
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>{step.avoidThis.title}</span>
                        </div>
                        <ul className="space-y-1 text-[11px] text-rose-900">
                          {step.avoidThis.points.map((pt, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-rose-600 font-bold">✗</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: NAMAZ-E-JANAZAH (FUNERAL PRAYER) */}
        {activeTab === 'janazah' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            {janazahSteps.map((step) => {
              const isPlaying = playingAudioId === step.id;
              return (
                <div 
                  key={step.id}
                  className="bg-white rounded-3xl p-6 sm:p-9 border border-[#6B1B7E]/15 shadow-xl space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">{step.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium">{step.subtitle}</p>
                    </div>

                    <button
                      onClick={() => handlePlayArabic(step.id, step.arabicText!)}
                      className="px-4 py-2 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{isPlaying ? 'Playing Audio...' : 'Listen to Janazah Dua'}</span>
                    </button>
                  </div>

                  {/* Janazah Arabic Dua Card */}
                  <div className="bg-purple-50/70 p-6 rounded-3xl border border-purple-200 space-y-3">
                    <p className="font-arabic font-quran text-2xl sm:text-3xl text-right text-slate-900 leading-loose" dir="rtl">
                      {step.arabicText}
                    </p>
                    <p className="text-xs font-bold text-[#6B1B7E]">
                      {step.transliteration}
                    </p>
                    <p className="text-xs text-slate-600 italic">
                      "{step.translation}"
                    </p>
                  </div>

                  {/* Four Takbeerat Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                      <span className="w-6 h-6 rounded-full bg-[#6B1B7E] text-white text-xs font-bold inline-flex items-center justify-center">1</span>
                      <p className="text-xs font-bold text-slate-900">1st Takbir</p>
                      <p className="text-[10px] text-slate-500">Recite Thana / Surah Al-Fatihah</p>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                      <span className="w-6 h-6 rounded-full bg-[#6B1B7E] text-white text-xs font-bold inline-flex items-center justify-center">2</span>
                      <p className="text-xs font-bold text-slate-900">2nd Takbir</p>
                      <p className="text-[10px] text-slate-500">Recite Durood Ibrahim</p>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                      <span className="w-6 h-6 rounded-full bg-[#E0107F] text-white text-xs font-bold inline-flex items-center justify-center">3</span>
                      <p className="text-xs font-bold text-slate-900">3rd Takbir</p>
                      <p className="text-[10px] text-slate-500">Recite Supplication for Deceased</p>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                      <span className="w-6 h-6 rounded-full bg-[#6B1B7E] text-white text-xs font-bold inline-flex items-center justify-center">4</span>
                      <p className="text-xs font-bold text-slate-900">4th Takbir</p>
                      <p className="text-[10px] text-slate-500">Brief pause then Tasleem (Salam)</p>
                    </div>
                  </div>

                  {/* Do This vs Avoid This */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-5 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase tracking-wide">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{step.doThis.title}</span>
                      </div>
                      <p className="text-xs text-emerald-950 font-medium">{step.doThis.description}</p>
                      <ul className="space-y-1 text-xs text-emerald-900">
                        {step.doThis.points.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-5 space-y-2">
                      <div className="flex items-center gap-2 text-rose-800 font-black text-xs uppercase tracking-wide">
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>{step.avoidThis.title}</span>
                      </div>
                      <p className="text-xs text-rose-950 font-medium">{step.avoidThis.description}</p>
                      <ul className="space-y-1 text-xs text-rose-900">
                        {step.avoidThis.points.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-rose-600 font-bold">✗</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* TAB 4: ROZA (FASTING) - DO THIS & AVOID THIS */}
        {activeTab === 'roza' && (
          <div className="space-y-10 max-w-5xl mx-auto">
            {/* Suhoor & Iftar Duas Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Iftar Dua */}
              <div className="bg-gradient-to-br from-[#6B1B7E] to-[#5B2A9A] text-white p-6 rounded-3xl shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-200">
                    Sunnah Dua at Iftar (Sunset)
                  </span>
                  <button
                    onClick={() => handlePlayArabic('roza-iftar', rozaData.iftarDuaArabic)}
                    className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition cursor-pointer"
                    title="Listen to Iftar Dua"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-arabic font-quran text-xl sm:text-2xl text-right leading-relaxed" dir="rtl">
                  {rozaData.iftarDuaArabic}
                </p>
                <div className="text-[11px] text-purple-100 space-y-1 border-t border-white/20 pt-2 font-medium">
                  <p><strong>Pronunciation:</strong> {rozaData.iftarDuaTrans}</p>
                  <p>"{rozaData.iftarDuaMeaning}"</p>
                </div>
              </div>

              {/* Suhoor (Sehri) Intention */}
              <div className="bg-gradient-to-br from-[#5B2A9A] to-[#E0107F] text-white p-6 rounded-3xl shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-200">
                    Niyyah for Fasting (Suhoor)
                  </span>
                  <button
                    onClick={() => handlePlayArabic('roza-suhoor', rozaData.suhoorDuaArabic)}
                    className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition cursor-pointer"
                    title="Listen to Suhoor Dua"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-arabic font-quran text-xl sm:text-2xl text-right leading-relaxed" dir="rtl">
                  {rozaData.suhoorDuaArabic}
                </p>
                <div className="text-[11px] text-purple-100 space-y-1 border-t border-white/20 pt-2 font-medium">
                  <p><strong>Pronunciation:</strong> {rozaData.suhoorDuaTrans}</p>
                  <p>"{rozaData.suhoorDuaMeaning}"</p>
                </div>
              </div>
            </div>

            {/* Do This vs Avoid This Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* DO THIS (Roza Sunnahs & Virtues) */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-200 shadow-md space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <div>
                    <h3 className="text-lg font-black text-slate-900">DO THIS in Roza (Sunnahs)</h3>
                    <p className="text-xs text-emerald-700 font-bold">Actions that multiply reward and embody Taqwa</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {rozaData.doThisList.map((item, idx) => (
                    <div key={idx} className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] inline-flex items-center justify-center font-bold">✓</span>
                          <span>{item.title}</span>
                        </h4>
                        <span className="text-[10px] text-emerald-700 font-bold bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                          {item.hadith}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* AVOID THIS (Nullifiers & Pitfalls) */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-rose-200 shadow-md space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-rose-100 text-rose-800">
                  <XCircle className="w-6 h-6 text-rose-600" />
                  <div>
                    <h3 className="text-lg font-black text-slate-900">AVOID THIS in Roza (Pitfalls)</h3>
                    <p className="text-xs text-rose-700 font-bold">Actions that break the fast or destroy its reward</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {rozaData.avoidThisList.map((item, idx) => (
                    <div key={idx} className="bg-rose-50/70 p-4 rounded-2xl border border-rose-200/80 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-black text-rose-950 flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] inline-flex items-center justify-center font-bold">✗</span>
                          <span>{item.title}</span>
                        </h4>
                        <span className="text-[10px] text-rose-700 font-bold bg-white px-2 py-0.5 rounded-full border border-rose-200">
                          {item.severity}
                        </span>
                      </div>
                      <p className="text-xs text-rose-900 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Common Myths: What Does NOT Break Fast */}
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-black">
                <ShieldCheck className="w-5 h-5 text-[#6B1B7E]" />
                <h3 className="text-base sm:text-lg">Common Clarifications: What DOES NOT Break the Fast</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {rozaData.permissibleList.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-2xs">
                    <p className="text-xs font-bold text-[#6B1B7E]">{item.title}</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Bottom CTA & Resource Links */}
        <div className="text-center pt-4">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 p-4 rounded-3xl bg-white border border-[#6B1B7E]/15 shadow-sm">
            <span className="text-xs text-slate-600 font-bold">
              Looking for more guidance?
            </span>

            {onOpenFullQuran && (
              <button
                onClick={onOpenFullQuran}
                className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-[#6B1B7E] rounded-xl text-xs font-bold border border-[#6B1B7E]/20 transition flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#E0107F]" />
                <span>Read Full Quran (114 Surahs)</span>
              </button>
            )}

            {onOpenDuas && (
              <button
                onClick={onOpenDuas}
                className="px-4 py-2 bg-gradient-to-r from-[#6B1B7E] to-[#E0107F] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Authentic Duas Library</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
