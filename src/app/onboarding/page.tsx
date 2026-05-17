'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { vibes } from '@/data/questions';
import { saveUser } from '@/utils/storage';
import { ArrowRight, Sparkles, Flame, RotateCw, Trophy, Check, X, User, Zap, ShieldAlert } from 'lucide-react';
import RainEffect from '@/components/RainEffect';

type Step = 'wheel' | 'swipe' | 'streak' | 'name' | 'vibe';

const WHEEL_PRIZES = [
  { id: 1, label: '%100 Saf Melankoli', emoji: '⚡', color: 'from-warm-neon-red via-faded-orange to-dirty-gold' },
  { id: 2, label: 'Sefil Bilo Aurası', emoji: '👑', color: 'from-dirty-gold via-ironic-gold to-faded-orange' },
  { id: 3, label: 'Sınırsız Çay Puanı', emoji: '🍵', color: 'from-tea-brown via-dirty-gold to-ironic-gold' },
  { id: 4, label: 'Gece 3 Efkarı', emoji: '🚬', color: 'from-muted-blue via-charcoal to-warm-neon-red' },
  { id: 5, label: 'Asgari Ücret Bereketi', emoji: '💸', color: 'from-tv-green via-dirty-gold to-tea-brown' },
  { id: 6, label: 'Kırık Kalp Kalkanı', emoji: '💔', color: 'from-warm-neon-red via-muted-blue to-bg-dark' },
];

const SWIPE_CARDS = [
  {
    id: 1,
    emoji: '👟',
    title: 'Taktiksel Garibanlık',
    text: 'Hesap ödenirken aniden ayakkabı bağcığını bağlama veya tuvalete gitme taktiğini bilir misin?',
    yesBtn: '🫠 En sevdiğim taktik',
    noBtn: '🛑 Ben hep öderim',
  },
  {
    id: 2,
    emoji: '🎟️',
    title: 'Finansal Hayaller',
    text: 'Zengin olma hayallerin genelde Sayısal Loto, iddaa veya kripto para kuponuyla mı sınırlı?',
    yesBtn: '📊 Tek umudum o',
    noBtn: '💼 Alın teriyle kazanırım',
  },
  {
    id: 3,
    emoji: '⏰',
    title: 'Maaş Döngüsü',
    text: 'Maaş veya harçlık yattıktan tam 3 saat sonra kendini tekrar fakir hissediyor musun?',
    yesBtn: '💸 3 saat bile sürmüyor',
    noBtn: '💰 Ay sonunu rahat getiririm',
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>('wheel');
  
  // Wheel State
  const [spinning, setSpinning] = useState(false);
  const [wheelAngle, setWheelAngle] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState<typeof WHEEL_PRIZES[0] | null>(null);

  // Swipe State
  const [currentCard, setCurrentCard] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<number>(0);
  
  // Character & Vibe State
  const [name, setName] = useState('');
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const router = useRouter();

  // Spin Wheel Handler
  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    
    // Pick a random prize (e.g. index 0 to 5)
    const prizeIndex = Math.floor(Math.random() * WHEEL_PRIZES.length);
    const sliceAngle = 360 / WHEEL_PRIZES.length;
    // Calculate angle to land on the prize (multiple full rotations + offset)
    const targetAngle = 360 * 5 + (prizeIndex * sliceAngle);

    setWheelAngle(targetAngle);

    setTimeout(() => {
      setSelectedPrize(WHEEL_PRIZES[prizeIndex]);
      setSpinning(false);
    }, 3200);
  };

  // Next Step from Wheel
  const goToSwipe = () => {
    setStep('swipe');
  };

  // Swipe Handler
  const handleSwipe = (isYes: boolean) => {
    setSwipeDirection(isYes ? 1 : -1);
    setTimeout(() => {
      if (currentCard < SWIPE_CARDS.length - 1) {
        setCurrentCard(prev => prev + 1);
        setSwipeDirection(0);
      } else {
        setStep('streak');
      }
    }, 400);
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

  // Calculate Duolingo progress percentage
  const progressPercent = Math.round(((currentCard) / SWIPE_CARDS.length) * 100);

  return (
    <main className="relative min-h-[100dvh] bg-bg-dark overflow-hidden select-none">
      <RainEffect />

      {/* Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-dirty-gold/15 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-warm-neon-red/10 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-muted-blue/10 rounded-full blur-[180px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
      </div>

      {/* Gamified Header */}
      <header className="absolute top-0 left-0 right-0 p-6 z-20 flex items-center justify-between pointer-events-none">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full glass shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <Flame className="text-faded-orange animate-bounce" size={18} />
          <span className="text-xs font-bold text-text-primary">Seri: <span className="text-dirty-gold">1. Gün</span></span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full glass shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <Sparkles className="text-dirty-gold animate-spin" style={{ animationDuration: '4s' }} size={18} />
          <span className="text-xs font-bold text-text-primary">Kazanım: <span className="text-dirty-gold">{selectedPrize ? selectedPrize.emoji : '⏳'}</span></span>
        </motion.div>
      </header>

      <AnimatePresence mode="wait">
        {/* ===== STEP 1: ÇARK-I GARİBAN (TEMU SPIN WHEEL VIBE) ===== */}
        {step === 'wheel' && (
          <motion.div
            key="wheel"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4 sm:px-6 text-center pt-16"
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 max-w-md">
              <div className="inline-flex items-center gap-2 text-xs tracking-[0.4em] uppercase text-dirty-gold font-bold mb-3 bg-dirty-gold/10 border border-dirty-gold/20 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(196,163,90,0.2)] animate-pulse">
                <RotateCw size={14} className="animate-spin" style={{ animationDuration: '6s' }} /> ÇARK-I GARİBAN
              </div>
              <h1 className="text-3xl sm:text-5xl font-[var(--font-heading)] font-bold text-text-primary mb-2">
                Şansını <span className="text-gradient-gold">Çevir</span>
              </h1>
              <p className="text-text-secondary text-xs sm:text-sm">Bugün kaderine hangi destansı gariban özelliği çıkacak?</p>
            </motion.div>

            {/* Wheel Container */}
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center my-4">
              {/* Glowing Outer Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-dirty-gold/30 shadow-[0_0_60px_rgba(196,163,90,0.3)] pointer-events-none z-10" />
              {/* Wheel Center Pointer */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 w-6 h-8 bg-warm-neon-red clip-path-polygon-[50%_100%,0_0,100%_0] z-20 shadow-lg" />

              <motion.div
                animate={{ rotate: wheelAngle }}
                transition={{ duration: 3.2, ease: [0.1, 0.9, 0.2, 1] }}
                className="w-full h-full rounded-full border-4 border-bg-dark relative overflow-hidden shadow-2xl bg-charcoal"
              >
                {/* Wheel Slices */}
                {WHEEL_PRIZES.map((prize, i) => {
                  const rotation = i * (360 / WHEEL_PRIZES.length);
                  return (
                    <div
                      key={prize.id}
                      className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left flex items-center justify-center p-4 border-l border-white/10"
                      style={{
                        transform: `rotate(${rotation}deg) skewY(${90 - (360 / WHEEL_PRIZES.length)}deg)`,
                        background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.2)',
                      }}
                    >
                      <div className="absolute bottom-8 left-8 -rotate-45 flex flex-col items-center">
                        <span className="text-2xl mb-1">{prize.emoji}</span>
                        <span className="text-[9px] font-bold text-white tracking-tighter max-w-[60px] leading-tight text-center">{prize.label}</span>
                      </div>
                    </div>
                  );
                })}
              </motion.div>

              {/* Center Spin Button / Status */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="w-20 h-20 rounded-full bg-bg-dark border-4 border-dirty-gold flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                  <Sparkles className="text-dirty-gold animate-pulse" size={28} />
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 w-full max-w-xs">
              {!selectedPrize ? (
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(196, 163, 90, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={spinWheel}
                  disabled={spinning}
                  className="w-full py-5 bg-gradient-to-r from-dirty-gold via-ironic-gold to-faded-orange rounded-2xl text-bg-dark font-extrabold text-lg shadow-[0_0_30px_rgba(196,163,90,0.3)] glow-gold disabled:opacity-50 transition-all uppercase tracking-wider"
                >
                  {spinning ? 'Çark Dönüyor...' : '🎡 ÇARK-I GARİBAN\'I ÇEVİR!'}
                </motion.button>
              ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="glass-strong border border-dirty-gold p-4 rounded-2xl shadow-[0_0_30px_rgba(196,163,90,0.3)] glow-gold">
                    <div className="text-xs text-text-secondary uppercase tracking-widest mb-1 font-mono">KAZANILAN ÖDÜL</div>
                    <div className="text-xl font-bold font-[var(--font-heading)] text-gradient-gold flex items-center justify-center gap-2">
                      <span>{selectedPrize.emoji}</span> {selectedPrize.label}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goToSwipe}
                    className="w-full py-5 bg-gradient-to-r from-dirty-gold to-faded-orange rounded-2xl text-bg-dark font-extrabold text-lg shadow-[0_0_30px_rgba(196,163,90,0.3)] glow-gold flex items-center justify-center gap-2 uppercase tracking-wider"
                  >
                    Maceraya Devam Et <ArrowRight size={20} />
                  </motion.button>
                </motion.div>
              )}
            </div>
            
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-text-muted text-[10px] mt-6">
              ✨ Temu ve TikTok akış algoritmalarından esinlenilmiştir.
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
            <div className="w-full max-w-md text-center mb-6">
              <div className="flex items-center justify-between text-xs font-mono text-dirty-gold/80 mb-2 px-1 uppercase tracking-widest">
                <span>MİNİ GÖREV: ALGORİTMA EĞİTİMİ</span>
                <span className="font-bold">%{progressPercent}</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden p-0.5 glass">
                <motion.div
                  className="h-full bg-gradient-to-r from-dirty-gold via-faded-orange to-warm-neon-red rounded-full shadow-[0_0_15px_rgba(196,163,90,0.8)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* 3D Swipe Card Deck Container */}
            <div className="relative w-full max-w-sm h-96 flex items-center justify-center my-4 perspective-[1000px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard}
                  initial={{ opacity: 0, scale: 0.8, rotateX: 20, y: 30 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: swipeDirection * 250, rotate: swipeDirection * 20, scale: 0.9, rotateY: swipeDirection * 30 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 glass-card border-2 border-dirty-gold/30 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden group transform-gpu"
                >
                  <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-dirty-gold via-faded-orange to-warm-neon-red" />
                  <div className="text-7xl mb-4 group-hover:scale-115 transition-transform duration-300 animate-bounce">{SWIPE_CARDS[currentCard].emoji}</div>
                  <div className="text-xs font-mono text-dirty-gold mb-3 uppercase tracking-widest">{SWIPE_CARDS[currentCard].title}</div>
                  <h2 className="text-lg sm:text-xl font-[var(--font-heading)] font-bold text-text-primary leading-relaxed mb-6 px-2">
                    {SWIPE_CARDS[currentCard].text}
                  </h2>
                  <div className="text-[10px] text-text-muted italic bg-white/5 px-4 py-1.5 rounded-full border border-white/10">Kaderini seçmek için butonlara dokun</div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Swipe Buttons */}
            <div className="w-full max-w-sm flex items-center justify-between gap-4 mt-8 z-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSwipe(false)}
                className="flex-1 py-5 glass border border-warm-neon-red/30 rounded-2xl flex items-center justify-center gap-2 text-warm-neon-red font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(255,75,75,0.15)] hover:bg-warm-neon-red/10 transition-all"
              >
                <X size={20} /> {SWIPE_CARDS[currentCard].noBtn}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSwipe(true)}
                className="flex-1 py-5 bg-gradient-to-r from-dirty-gold to-faded-orange rounded-2xl flex items-center justify-center gap-2 text-bg-dark font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(196,163,90,0.3)] glow-gold transition-all"
              >
                <Check size={20} /> {SWIPE_CARDS[currentCard].yesBtn}
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
            {/* Pulsing Sunburst */}
            <div className="absolute w-96 h-96 bg-dirty-gold/20 rounded-full blur-3xl animate-pulse" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, -10, 10, -10, 0] }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-36 h-36 rounded-full bg-gradient-to-tr from-dirty-gold via-ironic-gold to-faded-orange flex items-center justify-center text-bg-dark shadow-[0_0_80px_rgba(196,163,90,0.6)] mb-8 border-4 border-white/20 glow-gold animate-bounce"
            >
              <Trophy size={72} />
            </motion.div>

            <div className="text-xs font-mono text-dirty-gold tracking-[0.4em] uppercase mb-2">🔥 DESTANSI BAŞARI KİLİDİ AÇILDI!</div>
            <h1 className="text-4xl sm:text-5xl font-[var(--font-heading)] font-extrabold text-white mb-4">
              &ldquo;Asgari Ücretin <span className="text-gradient-gold">Efendisi&rdquo;</span>
            </h1>

            <div className="glass-strong border border-dirty-gold/30 p-6 rounded-3xl max-w-sm w-full mb-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <div className="text-lg font-bold text-dirty-gold mb-2 flex items-center justify-center gap-2">
                <Zap size={20} className="text-faded-orange" /> Algoritma Senkronizasyonu %100
              </div>
              <p className="text-xs text-text-secondary leading-relaxed mb-4">
                Verdiğin samimi cevaplar ve çevirdiğin çark sayesinde sistemimiz senin destansı bir gariban aurasına sahip olduğunu tescilledi. İlk gün serin (streak) aktif!
              </p>
              <div className="flex items-center justify-center gap-2 bg-dirty-gold/10 py-2.5 rounded-xl border border-dirty-gold/20 text-dirty-gold font-mono text-xs font-bold shadow-inner">
                <Flame size={16} className="text-faded-orange animate-pulse" /> +1 GÜN SERİ (STREAK) AKTİF
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep('name')}
              className="w-full max-w-xs py-5 bg-gradient-to-r from-dirty-gold via-ironic-gold to-faded-orange rounded-2xl text-bg-dark font-extrabold text-lg shadow-[0_0_40px_rgba(196,163,90,0.4)] glow-gold flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              Karakterini İsimlendir <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        )}

        {/* ===== STEP 4: CHARACTER NAME (GAMIFIED INPUT) ===== */}
        {step === 'name' && (
          <motion.div
            key="name"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4 sm:px-6 text-center pt-16"
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
              <div className="text-7xl mb-6 animate-bounce">🎬</div>
              <h1 className="text-3xl sm:text-4xl font-[var(--font-heading)] font-bold text-text-primary mb-3">
                Gariban <span className="text-gradient-gold">Savaşçı Adın</span>
              </h1>
              <p className="text-text-secondary text-sm mb-8">Bu destansı hayatta kalma mücadelesinde mahalle seni hangi isimle tanıyacak?</p>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-strong rounded-3xl p-2 border-2 border-dirty-gold/30 focus-within:border-dirty-gold transition-colors shadow-[0_0_40px_rgba(196,163,90,0.15)] glow-gold"
                >
                  <div className="flex items-center gap-3 px-4 py-2">
                    <User className="text-dirty-gold" size={24} />
                    <input
                      type="text"
                      placeholder="Ör: Sefil Bilo, Çaycı Rüstem..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                      className="w-full bg-transparent py-3 text-text-primary placeholder-text-muted outline-none text-xl font-bold"
                      maxLength={20}
                      autoFocus
                    />
                  </div>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(196, 163, 90, 0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleLogin}
                  disabled={name.trim().length < 2}
                  className="w-full py-5 bg-gradient-to-r from-dirty-gold via-ironic-gold to-faded-orange rounded-2xl text-bg-dark font-extrabold text-lg flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all glow-gold uppercase tracking-wider"
                >
                  Dert Sınıfını Seç <ArrowRight size={20} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ===== STEP 5: VIBE SELECTION (GAMIFIED CLASS PICKING) ===== */}
        {step === 'vibe' && (
          <motion.div
            key="vibe"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center min-h-[100dvh] px-4 sm:px-6 py-16"
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 max-w-md">
              <div className="text-xs font-mono text-dirty-gold tracking-[0.4em] uppercase mb-2">SON AŞAMA: OYUN SINIFINI SEÇ</div>
              <h1 className="text-3xl sm:text-4xl font-[var(--font-heading)] font-bold text-text-primary mb-2">
                Gariban <span className="text-gradient-gold">Vibrasyonunu Seç</span>
              </h1>
              <p className="text-text-secondary text-sm">Savaşa hangi dert sınıfıyla (class) katılacaksın?</p>
            </motion.div>

            <div className="w-full max-w-lg grid grid-cols-2 gap-3 sm:gap-4 pb-24">
              {vibes.map((vibe, i) => (
                <motion.button
                  key={vibe.id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.06, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleVibeSelect(vibe.id)}
                  className={`relative overflow-hidden p-5 text-left transition-all duration-300 rounded-3xl border ${
                    selectedVibe === vibe.id
                      ? 'border-2 scale-95 opacity-80'
                      : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06] shadow-[0_0_30px_rgba(0,0,0,0.3)]'
                  }`}
                  style={{
                    borderColor: selectedVibe === vibe.id ? vibe.color : undefined,
                    boxShadow: selectedVibe === vibe.id ? `0 0 40px ${vibe.color}44` : undefined,
                  }}
                >
                  <div className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-500" style={{ background: `radial-gradient(circle at center, ${vibe.color}, transparent 70%)` }} />
                  <div className="relative z-10">
                    <div className="text-3xl sm:text-4xl mb-3">{vibe.emoji}</div>
                    <h3 className="font-bold text-text-primary text-sm sm:text-base mb-1">{vibe.title}</h3>
                    <p className="text-text-muted text-xs leading-relaxed">{vibe.description}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            {selectedVibe && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 glass-strong px-8 py-4 flex items-center gap-3 text-dirty-gold rounded-full shadow-[0_0_50px_rgba(196,163,90,0.4)] z-30 border border-dirty-gold/30 glow-gold animate-bounce"
              >
                <Sparkles size={20} />
                <span className="text-base font-bold font-[var(--font-heading)]">Garibanometre Başlatılıyor...</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
