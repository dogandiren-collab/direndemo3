'use client';

import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { vibes } from '@/data/questions';
import { saveUser } from '@/utils/storage';
import { ArrowRight, Sparkles, Flame, RotateCw, Trophy, Check, X, User, Zap, ShieldAlert, Star } from 'lucide-react';
import RainEffect from '@/components/RainEffect';

type Step = 'oracle' | 'swipe' | 'streak' | 'name' | 'vibe';

const ORACLE_PRIZES = [
  { id: 1, label: '%100 Saf Melankoli', emoji: '⚡', desc: 'Damarlarına işleyen yoğun hüzün', color: 'from-warm-neon-red via-faded-orange to-dirty-gold' },
  { id: 2, label: 'Sefil Bilo Aurası', emoji: '👑', desc: 'Mahallenin en saygıdeğer sefili', color: 'from-dirty-gold via-ironic-gold to-faded-orange' },
  { id: 3, label: 'Sınırsız Çay Puanı', emoji: '🍵', desc: 'Ömür boyu demli kaçak çay', color: 'from-tea-brown via-dirty-gold to-ironic-gold' },
  { id: 4, label: 'Gece 3 Efkarı', emoji: '🚬', desc: 'Gece yarısı gelen felsefi aydınlanma', color: 'from-muted-blue via-charcoal to-warm-neon-red' },
  { id: 5, label: 'Asgari Ücret Bereketi', emoji: '💸', desc: 'Ay sonunu getiren gizemli matematik', color: 'from-tv-green via-dirty-gold to-tea-brown' },
  { id: 6, label: 'Kırık Kalp Kalkanı', emoji: '💔', desc: 'Görüldü yediğinde acı hissetmeme yeteneği', color: 'from-warm-neon-red via-muted-blue to-bg-dark' },
];

const SWIPE_CARDS = [
  {
    id: 1,
    emoji: '👟',
    title: 'Taktiksel Garibanlık',
    text: 'Hesap ödenirken aniden ayakkabı bağcığını bağlama veya acilen tuvalete gitme taktiğini bilir misin?',
    yesBtn: '🫠 En sevdiğim taktik',
    noBtn: '🛑 Ben hep öderim',
    color: 'from-dirty-gold/20 via-bg-dark to-charcoal',
  },
  {
    id: 2,
    emoji: '🎟️',
    title: 'Finansal Hayaller',
    text: 'Zengin olma hayallerin genelde Sayısal Loto, iddaa, kazı kazan veya kripto para kuponuyla mı sınırlı?',
    yesBtn: '📊 Tek umudum o',
    noBtn: '💼 Alın teriyle kazanırım',
    color: 'from-warm-neon-red/20 via-bg-dark to-charcoal',
  },
  {
    id: 3,
    emoji: '⏰',
    title: 'Maaş Döngüsü',
    text: 'Maaş veya harçlık yattıktan tam 3 saat sonra kendini tekrar fakir hissediyor musun?',
    yesBtn: '💸 3 saat bile sürmüyor',
    noBtn: '💰 Ay sonunu rahat getiririm',
    color: 'from-muted-blue/20 via-bg-dark to-charcoal',
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>('oracle');
  
  // Oracle Wheel State
  const [spinning, setSpinning] = useState(false);
  const [wheelAngle, setWheelAngle] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState<typeof ORACLE_PRIZES[0] | null>(null);

  // Swipe Deck State
  const [currentCard, setCurrentCard] = useState(0);
  const [exitX, setExitX] = useState<number>(0);
  
  // Character & Vibe State
  const [name, setName] = useState('');
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const router = useRouter();

  // Oracle Wheel Spin Handler
  const spinOracle = () => {
    if (spinning) return;
    setSpinning(true);
    
    const prizeIndex = Math.floor(Math.random() * ORACLE_PRIZES.length);
    const sliceAngle = 360 / ORACLE_PRIZES.length;
    // 5 full spins + exact target angle
    const targetAngle = 360 * 5 + (prizeIndex * sliceAngle);

    setWheelAngle(targetAngle);

    setTimeout(() => {
      setSelectedPrize(ORACLE_PRIZES[prizeIndex]);
      setSpinning(false);
    }, 3500);
  };

  // Drag End Handler for Swipe Cards
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      handleSwipeAction(true);
    } else if (info.offset.x < -100) {
      handleSwipeAction(false);
    }
  };

  // Swipe Action Handler (used by buttons and drag)
  const handleSwipeAction = (isYes: boolean) => {
    setExitX(isYes ? 300 : -300);
    setTimeout(() => {
      if (currentCard < SWIPE_CARDS.length - 1) {
        setCurrentCard(prev => prev + 1);
        setExitX(0);
      } else {
        setStep('streak');
      }
    }, 350);
  };

  // Login Handler
  const handleLogin = () => {
    if (name.trim().length < 2) return;
    saveUser({ name: name.trim() });
    setStep('vibe');
  };

  // Vibe Handler
  const handleVibeSelect = (vibeId: string) => {
    setSelectedVibe(vibeId);
    setTimeout(() => {
      saveUser({ vibe: vibeId, completedOnboarding: true });
      router.push('/test');
    }, 800);
  };

  const progressPercent = Math.round(((currentCard) / SWIPE_CARDS.length) * 100);

  return (
    <main className="relative min-h-[100dvh] bg-bg-dark overflow-hidden select-none font-sans">
      <RainEffect />

      {/* Cinematic Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-dirty-gold/15 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-warm-neon-red/10 rounded-full blur-[180px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-muted-blue/10 rounded-full blur-[200px] animate-pulse-glow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Premium Gamified HUD Header */}
      <header className="absolute top-0 left-0 right-0 p-6 z-20 flex items-center justify-between pointer-events-none max-w-7xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl px-5 py-2.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
          <Flame className="text-faded-orange animate-bounce" size={20} />
          <span className="text-xs font-bold text-text-primary tracking-wide">Seri: <span className="text-gradient-gold font-extrabold">1. Gün</span></span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl px-5 py-2.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
          <Sparkles className="text-dirty-gold animate-spin" style={{ animationDuration: '6s' }} size={20} />
          <span className="text-xs font-bold text-text-primary tracking-wide">Aura: <span className="text-gradient-gold font-extrabold">{selectedPrize ? selectedPrize.emoji : '⏳'}</span></span>
        </motion.div>
      </header>

      <AnimatePresence mode="wait">
        {/* ===== STEP 1: KADER ÇARKI (THE MYSTIC ORACLE) ===== */}
        {step === 'oracle' && (
          <motion.div
            key="oracle"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4 sm:px-6 text-center pt-16"
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 max-w-lg">
              <div className="inline-flex items-center gap-2 text-xs tracking-[0.4em] uppercase text-dirty-gold font-bold mb-4 bg-dirty-gold/10 border border-dirty-gold/20 backdrop-blur-xl px-5 py-2 rounded-full shadow-[0_0_30px_rgba(196,163,90,0.25)] animate-pulse">
                <Star size={16} className="animate-spin" style={{ animationDuration: '8s' }} /> KADER ÇARKI
              </div>
              <h1 className="text-4xl sm:text-6xl font-[var(--font-heading)] font-extrabold text-text-primary mb-3 tracking-tight">
                Gariban <span className="text-gradient-gold">Kaderini Çevir</span>
              </h1>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                Temu ve TikTok algoritmalarının sunduğu dopamin akışıyla günlük kutsal garibanlık özelliğini keşfet.
              </p>
            </motion.div>

            {/* Breathtaking Oracle Wheel Container */}
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center my-6">
              {/* Outer Celestial Glow */}
              <div className="absolute inset-[-20px] rounded-full bg-gradient-to-r from-dirty-gold via-faded-orange to-warm-neon-red opacity-30 blur-3xl animate-pulse" />
              {/* Elegant Metallic Ring */}
              <div className="absolute inset-0 rounded-full border-[8px] border-white/10 shadow-[0_0_80px_rgba(196,163,90,0.4)] pointer-events-none z-10 backdrop-blur-sm" />
              {/* Center Diamond Pointer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-8 h-10 bg-gradient-to-b from-warm-neon-red to-faded-orange clip-path-polygon-[50%_100%,0_0,100%_0] z-20 shadow-[0_0_20px_rgba(255,75,75,0.8)] animate-bounce" />

              <motion.div
                animate={{ rotate: wheelAngle }}
                transition={{ duration: 3.5, ease: [0.1, 0.9, 0.2, 1] }}
                className="w-full h-full rounded-full border-4 border-bg-dark relative overflow-hidden shadow-2xl bg-charcoal"
              >
                {/* Wheel Slices */}
                {ORACLE_PRIZES.map((prize, i) => {
                  const rotation = i * (360 / ORACLE_PRIZES.length);
                  return (
                    <div
                      key={prize.id}
                      className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left flex items-center justify-center p-6 border-l border-white/15"
                      style={{
                        transform: `rotate(${rotation}deg) skewY(${90 - (360 / ORACLE_PRIZES.length)}deg)`,
                        background: i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.3)',
                      }}
                    >
                      <div className="absolute bottom-10 left-10 -rotate-45 flex flex-col items-center">
                        <span className="text-3xl sm:text-4xl mb-1.5 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{prize.emoji}</span>
                        <span className="text-[10px] sm:text-xs font-extrabold text-white tracking-tighter max-w-[70px] leading-tight text-center drop-shadow-md">{prize.label}</span>
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              {/* Center Spin Core */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="w-24 h-24 rounded-full bg-bg-dark border-4 border-dirty-gold flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.9)] backdrop-blur-md">
                  <Sparkles className="text-dirty-gold animate-pulse" size={36} />
                </div>
              </div>
            </div>

            {/* Action Buttons & Prize Display */}
            <div className="mt-10 w-full max-w-sm z-20">
              {!selectedPrize ? (
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(196, 163, 90, 0.5)' }}
                  whileTap={{ scale: 0.96 }}
                  onClick={spinOracle}
                  disabled={spinning}
                  className="w-full py-5 bg-gradient-to-r from-dirty-gold via-ironic-gold to-faded-orange rounded-2xl text-bg-dark font-extrabold text-lg shadow-[0_0_40px_rgba(196,163,90,0.4)] glow-gold disabled:opacity-50 transition-all uppercase tracking-widest cursor-pointer"
                >
                  {spinning ? 'Kader Çarkı Dönüyor...' : '🎡 ÇARK-I GARİBAN\'I ÇEVİR!'}
                </motion.button>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 200 }} className="space-y-6">
                  <div className="bg-white/[0.03] border border-dirty-gold/40 backdrop-blur-2xl p-6 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.37)] glow-gold relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-dirty-gold/10 rounded-full blur-2xl" />
                    <div className="text-xs text-text-secondary uppercase tracking-widest mb-2 font-mono font-semibold">KAZANILAN DESTANSI AURA</div>
                    <div className="text-2xl sm:text-3xl font-extrabold font-[var(--font-heading)] text-gradient-gold flex items-center justify-center gap-3 mb-2">
                      <span className="text-4xl animate-bounce">{selectedPrize.emoji}</span> {selectedPrize.label}
                    </div>
                    <p className="text-xs sm:text-sm text-text-muted italic">{selectedPrize.desc}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(196, 163, 90, 0.5)' }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setStep('swipe')}
                    className="w-full py-5 bg-gradient-to-r from-dirty-gold via-ironic-gold to-faded-orange rounded-2xl text-bg-dark font-extrabold text-lg shadow-[0_0_40px_rgba(196,163,90,0.4)] glow-gold flex items-center justify-center gap-2 uppercase tracking-widest cursor-pointer"
                  >
                    Kader Kartlarını Kaydır <ArrowRight size={22} />
                  </motion.button>
                </motion.div>
              )}
            </div>
            
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-text-muted text-xs mt-8 tracking-wide opacity-75">
              ✨ Temu, TikTok ve Duolingo akış algoritmalarının kusursuz birleşimi.
            </motion.p>
          </motion.div>
        )}

        {/* ===== STEP 2: 3D SWIPE CARDS (TIKTOK / TINDER VIBE) ===== */}
        {step === 'swipe' && (
          <motion.div
            key="swipe"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4 sm:px-6 overflow-hidden pt-16"
          >
            {/* Duolingo Style Progress Header */}
            <div className="w-full max-w-md text-center mb-8">
              <div className="flex items-center justify-between text-xs font-mono text-dirty-gold mb-2 px-2 uppercase tracking-widest font-bold">
                <span>MİNİ GÖREV: KADER KARTLARI</span>
                <span className="text-gradient-gold font-extrabold">%{progressPercent}</span>
              </div>
              <div className="h-3 w-full bg-white/[0.05] border border-white/[0.1] rounded-full overflow-hidden p-1 backdrop-blur-xl shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-dirty-gold via-faded-orange to-warm-neon-red rounded-full shadow-[0_0_20px_rgba(196,163,90,0.8)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* 3D Physical Swipe Card Deck Container */}
            <div className="relative w-full max-w-sm h-[420px] flex items-center justify-center my-4 perspective-[1200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  initial={{ opacity: 0, scale: 0.8, rotateX: 25, y: 40 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: exitX, rotate: exitX ? (exitX > 0 ? 25 : -25) : 0, scale: 0.9 }}
                  transition={{ duration: 0.35, type: 'spring', stiffness: 200, damping: 20 }}
                  whileDrag={{ scale: 1.05, rotate: exitX ? (exitX > 0 ? 5 : -5) : 0, boxShadow: '0 30px 60px rgba(0,0,0,0.9)' }}
                  className={`absolute inset-0 bg-gradient-to-b ${SWIPE_CARDS[currentCard].color} border border-white/15 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden group cursor-grab active:cursor-grabbing backdrop-blur-2xl`}
                >
                  <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-dirty-gold via-faded-orange to-warm-neon-red opacity-80" />
                  <div className="text-8xl mb-6 group-hover:scale-110 transition-transform duration-300 animate-bounce drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">{SWIPE_CARDS[currentCard].emoji}</div>
                  <div className="text-xs font-mono text-dirty-gold mb-3 uppercase tracking-widest font-extrabold">{SWIPE_CARDS[currentCard].title}</div>
                  <h2 className="text-xl sm:text-2xl font-[var(--font-heading)] font-extrabold text-text-primary leading-relaxed mb-8 px-2 drop-shadow-md">
                    {SWIPE_CARDS[currentCard].text}
                  </h2>
                  <div className="text-[11px] text-text-muted italic bg-white/5 px-5 py-2 rounded-full border border-white/10 tracking-wide shadow-inner">
                    👉 Sağa veya sola sürükle / butonlara dokun
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Swipe Action Buttons */}
            <div className="w-full max-w-sm flex items-center justify-between gap-5 mt-10 z-10">
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(255,75,75,0.3)' }}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleSwipeAction(false)}
                className="flex-1 py-5 bg-white/[0.03] border border-warm-neon-red/40 backdrop-blur-xl rounded-2xl flex items-center justify-center gap-2 text-warm-neon-red font-extrabold text-base shadow-[0_8px_32px_rgba(255,75,75,0.15)] hover:bg-warm-neon-red/10 transition-all cursor-pointer"
              >
                <X size={22} /> {SWIPE_CARDS[currentCard].noBtn}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(196,163,90,0.4)' }}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleSwipeAction(true)}
                className="flex-1 py-5 bg-gradient-to-r from-dirty-gold to-faded-orange rounded-2xl flex items-center justify-center gap-2 text-bg-dark font-extrabold text-base shadow-[0_8px_32px_rgba(196,163,90,0.3)] glow-gold transition-all cursor-pointer"
              >
                <Check size={22} /> {SWIPE_CARDS[currentCard].yesBtn}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ===== STEP 3: MISSION STREAK (DUOLINGO VIBE) ===== */}
        {step === 'streak' && (
          <motion.div
            key="streak"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 150 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4 sm:px-6 text-center pt-16"
          >
            {/* Majestic Pulsing Sunburst */}
            <div className="absolute w-[500px] h-[500px] bg-dirty-gold/20 rounded-full blur-[150px] animate-pulse" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, -10, 10, -10, 0] }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-40 h-40 rounded-full bg-gradient-to-tr from-dirty-gold via-ironic-gold to-faded-orange flex items-center justify-center text-bg-dark shadow-[0_0_100px_rgba(196,163,90,0.7)] mb-8 border-4 border-white/20 glow-gold animate-bounce"
            >
              <Trophy size={80} />
            </motion.div>

            <div className="text-xs font-mono text-dirty-gold tracking-[0.5em] uppercase mb-3 font-extrabold">🔥 DESTANSI BAŞARI KİLİDİ AÇILDI!</div>
            <h1 className="text-4xl sm:text-6xl font-[var(--font-heading)] font-extrabold text-white mb-5 tracking-tight">
              &ldquo;Asgari Ücretin <span className="text-gradient-gold">Efendisi&rdquo;</span>
            </h1>

            <div className="bg-white/[0.03] border border-dirty-gold/40 backdrop-blur-2xl p-8 rounded-3xl max-w-md w-full mb-10 shadow-[0_8px_32px_rgba(0,0,0,0.37)] glow-gold relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-dirty-gold/10 rounded-full blur-2xl" />
              <div className="text-xl font-extrabold text-dirty-gold mb-3 flex items-center justify-center gap-2">
                <Zap size={24} className="text-faded-orange animate-pulse" /> Algoritma Senkronizasyonu %100
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                Verdiğin samimi cevaplar ve çevirdiğin kader çarkı sayesinde sistemimiz senin destansı bir gariban aurasına sahip olduğunu tescilledi. İlk gün serin (streak) resmen aktif!
              </p>
              <div className="flex items-center justify-center gap-2.5 bg-dirty-gold/15 py-3 rounded-2xl border border-dirty-gold/30 text-dirty-gold font-mono text-xs font-extrabold shadow-inner">
                <Flame size={18} className="text-faded-orange animate-pulse" /> +1 GÜN SERİ (STREAK) AKTİF
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(196, 163, 90, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep('name')}
              className="w-full max-w-xs py-5 bg-gradient-to-r from-dirty-gold via-ironic-gold to-faded-orange rounded-2xl text-bg-dark font-extrabold text-lg shadow-[0_0_40px_rgba(196,163,90,0.4)] glow-gold flex items-center justify-center gap-2 uppercase tracking-widest cursor-pointer"
            >
              Karakterini İsimlendir <ArrowRight size={22} />
            </motion.button>
          </motion.div>
        )}

        {/* ===== STEP 4: CHARACTER NAME (FUTURISTIC GAMIFIED INPUT) ===== */}
        {step === 'name' && (
          <motion.div
            key="name"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4 sm:px-6 text-center pt-16"
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
              <div className="text-8xl mb-6 animate-bounce drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">🎬</div>
              <h1 className="text-3xl sm:text-5xl font-[var(--font-heading)] font-extrabold text-text-primary mb-3 tracking-tight">
                Gariban <span className="text-gradient-gold">Savaşçı Adın</span>
              </h1>
              <p className="text-text-secondary text-sm sm:text-base mb-10 leading-relaxed">Bu destansı hayatta kalma mücadelesinde mahalle seni hangi efsanevi isimle tanıyacak?</p>

              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/[0.03] rounded-3xl p-3 border-2 border-dirty-gold/40 focus-within:border-dirty-gold transition-colors shadow-[0_8px_32px_rgba(196,163,90,0.2)] glow-gold backdrop-blur-2xl"
                >
                  <div className="flex items-center gap-4 px-5 py-3">
                    <User className="text-dirty-gold" size={28} />
                    <input
                      type="text"
                      placeholder="Ör: Sefil Bilo, Çaycı Rüstem..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                      className="w-full bg-transparent py-3 text-text-primary placeholder-text-muted outline-none text-2xl font-extrabold tracking-wide"
                      maxLength={20}
                      autoFocus
                    />
                  </div>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(196, 163, 90, 0.5)' }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleLogin}
                  disabled={name.trim().length < 2}
                  className="w-full py-5 bg-gradient-to-r from-dirty-gold via-ironic-gold to-faded-orange rounded-2xl text-bg-dark font-extrabold text-lg flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all glow-gold uppercase tracking-widest cursor-pointer"
                >
                  Dert Sınıfını Seç <ArrowRight size={22} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ===== STEP 5: VIBE SELECTION (RPG GAMIFIED CLASS PICKING) ===== */}
        {step === 'vibe' && (
          <motion.div
            key="vibe"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center min-h-[100dvh] px-4 sm:px-6 py-20"
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 max-w-lg">
              <div className="text-xs font-mono text-dirty-gold tracking-[0.5em] uppercase mb-3 font-extrabold">SON AŞAMA: RPG SINIF SEÇİMİ</div>
              <h1 className="text-4xl sm:text-5xl font-[var(--font-heading)] font-extrabold text-text-primary mb-3 tracking-tight">
                Gariban <span className="text-gradient-gold">Vibrasyonunu Seç</span>
              </h1>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed">Savaşa hangi dert sınıfıyla (class) katılacaksın? Kendi destansı yeteneğini seç.</p>
            </motion.div>

            <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-5 pb-32">
              {vibes.map((vibe, i) => (
                <motion.button
                  key={vibe.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.06, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.04, y: -6, rotateY: i % 2 === 0 ? 5 : -5 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleVibeSelect(vibe.id)}
                  className={`relative overflow-hidden p-8 text-left transition-all duration-300 rounded-3xl border backdrop-blur-2xl ${
                    selectedVibe === vibe.id
                      ? 'border-4 scale-95 opacity-90'
                      : 'border-white/15 bg-white/[0.04] hover:bg-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.37)]'
                  }`}
                  style={{
                    borderColor: selectedVibe === vibe.id ? vibe.color : undefined,
                    boxShadow: selectedVibe === vibe.id ? `0 0 60px ${vibe.color}66` : undefined,
                  }}
                >
                  <div className="absolute inset-0 opacity-0 hover:opacity-15 transition-opacity duration-500" style={{ background: `radial-gradient(circle at center, ${vibe.color}, transparent 70%)` }} />
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <div className="text-5xl sm:text-6xl mb-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">{vibe.emoji}</div>
                      <h3 className="font-extrabold text-text-primary text-xl sm:text-2xl mb-2 tracking-tight">{vibe.title}</h3>
                      <p className="text-text-muted text-xs sm:text-sm leading-relaxed mb-6">{vibe.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider" style={{ color: vibe.color }}>
                      <Zap size={16} /> Bu sınıfı seç
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {selectedVibe && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/[0.05] border border-dirty-gold/50 backdrop-blur-2xl px-10 py-5 flex items-center gap-4 text-dirty-gold rounded-full shadow-[0_0_80px_rgba(196,163,90,0.5)] z-30 glow-gold animate-bounce"
              >
                <Sparkles size={24} />
                <span className="text-lg font-extrabold font-[var(--font-heading)] tracking-wide">Garibanometre Başlatılıyor...</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
