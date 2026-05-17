'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { vibes } from '@/data/questions';
import { saveUser } from '@/utils/storage';
import { ArrowRight, Sparkles, Flame, Gift, Trophy, Check, X, User } from 'lucide-react';
import RainEffect from '@/components/RainEffect';

type Step = 'mystery-box' | 'swipe-quiz' | 'mission-streak' | 'character-name' | 'vibe-select';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    emoji: '☕',
    text: 'Sabah uyanınca ilk iş telefona bakıp hayata lanet eder misin?',
    yesBtn: '🫠 Kesinlikle',
    noBtn: '🛑 Asla',
  },
  {
    id: 2,
    emoji: '💸',
    text: 'Cüzdanındaki parayı hesaplarken matematik profesörüne dönüşür müsün?',
    yesBtn: '📊 Tabi ki',
    noBtn: '💰 Zenginim ben',
  },
  {
    id: 3,
    emoji: '🎧',
    text: 'Gece 3\'te durduk yere geçmiş hatalarına dertlenir misin?',
    yesBtn: '🚬 Her gece',
    noBtn: '😴 Mışıl mışıl uyurum',
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>('mystery-box');
  const [boxOpened, setBoxOpened] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizDirection, setQuizDirection] = useState<number>(0); // 1 for right, -1 for left
  const [name, setName] = useState('');
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const router = useRouter();

  // Mystery Box Handler
  const handleOpenBox = () => {
    setBoxOpened(true);
    setTimeout(() => {
      setStep('swipe-quiz');
    }, 3000);
  };

  // Swipe Quiz Handler
  const handleAnswer = (isYes: boolean) => {
    setQuizDirection(isYes ? 1 : -1);
    setTimeout(() => {
      if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuizIndex(prev => prev + 1);
        setQuizDirection(0);
      } else {
        setStep('mission-streak');
      }
    }, 400);
  };

  // Login / Name Handler
  const handleLogin = () => {
    if (name.trim().length < 2) return;
    saveUser({ name: name.trim() });
    setStep('vibe-select');
  };

  // Vibe Selection Handler
  const handleVibeSelect = (vibeId: string) => {
    setSelectedVibe(vibeId);
    setTimeout(() => {
      saveUser({ vibe: vibeId, completedOnboarding: true });
      router.push('/test');
    }, 800);
  };

  return (
    <main className="relative min-h-[100dvh] bg-bg-dark overflow-hidden select-none">
      <RainEffect />

      {/* Ambient Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-dirty-gold/10 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-warm-neon-red/5 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-muted-blue/5 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
      </div>

      {/* Top Gamified Header Status */}
      <header className="absolute top-0 left-0 right-0 p-6 z-20 flex items-center justify-between pointer-events-none">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full glass">
          <Flame className="text-faded-orange animate-bounce" size={18} />
          <span className="text-xs font-bold text-text-primary">Seri: <span className="text-dirty-gold">1. Gün</span></span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full glass">
          <Sparkles className="text-dirty-gold animate-spin" style={{ animationDuration: '4s' }} size={18} />
          <span className="text-xs font-bold text-text-primary">Çay Puanı: <span className="text-dirty-gold">{boxOpened ? '+500' : '0'}</span></span>
        </motion.div>
      </header>

      <AnimatePresence mode="wait">
        {/* ===== STEP 1: MYSTERY BOX (TEMU VIBE) ===== */}
        {step === 'mystery-box' && (
          <motion.div
            key="mystery-box"
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4 sm:px-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
              className="mb-8"
            >
              <div className="text-xs tracking-[0.4em] uppercase text-dirty-gold font-bold mb-3 bg-dirty-gold/10 border border-dirty-gold/20 px-4 py-1.5 rounded-full inline-block animate-pulse">
                🎁 GÜNLÜK GARİBAN ŞANSIN!
              </div>
              <h1 className="text-4xl sm:text-6xl font-[var(--font-heading)] font-bold text-text-primary mb-2">
                Gizemli <span className="text-gradient-gold">Kutuyu Aç</span>
              </h1>
              <p className="text-text-secondary text-sm">Başlangıç auranı ve sürpriz çay puanını keşfetmek için dokun!</p>
            </motion.div>

            {/* Interactive Box */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center my-6">
              {/* Pulsing Aura */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-dirty-gold via-faded-orange to-warm-neon-red blur-2xl opacity-40"
              />

              {!boxOpened ? (
                <motion.button
                  whileHover={{ scale: 1.08, rotate: [0, -5, 5, -5, 0] }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleOpenBox}
                  className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-tr from-dirty-gold via-ironic-gold to-faded-orange rounded-3xl flex flex-col items-center justify-center shadow-[0_0_50px_rgba(196,163,90,0.4)] border-4 border-white/20 group cursor-pointer focus:outline-none"
                >
                  <Gift size={80} className="text-bg-dark mb-2 group-hover:scale-110 transition-transform animate-bounce" />
                  <span className="text-bg-dark font-[var(--font-heading)] font-extrabold text-xl tracking-wider uppercase">Dokun & Aç</span>
                </motion.button>
              ) : (
                <motion.div
                  initial={{ scale: 0.5, rotate: -180, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="relative z-10 w-full glass-strong border-2 border-dirty-gold p-8 rounded-3xl flex flex-col items-center shadow-[0_0_80px_rgba(196,163,90,0.6)] glow-gold"
                >
                  <div className="text-7xl mb-4 animate-bounce">✨☕</div>
                  <div className="text-2xl font-bold font-[var(--font-heading)] text-gradient-gold mb-1">DESTANSI ÖDÜL!</div>
                  <div className="text-4xl font-extrabold text-white mb-3">+500 Çay Puanı</div>
                  <div className="text-xs text-dirty-gold bg-dirty-gold/10 border border-dirty-gold/20 px-4 py-2 rounded-full font-mono">
                    %100 Doğal Melankoli Aurası Eklendi
                  </div>
                </motion.div>
              )}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-text-muted text-xs mt-6"
            >
              ⚡ TikTok ve Temu algoritmaları kadar bağımlılık yapıcıdır.
            </motion.p>
          </motion.div>
        )}

        {/* ===== STEP 2: SWIPE QUIZ (TIKTOK / TINDER VIBE) ===== */}
        {step === 'swipe-quiz' && (
          <motion.div
            key="swipe-quiz"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4 sm:px-6 overflow-hidden"
          >
            <div className="w-full max-w-md text-center mb-6">
              <div className="text-xs font-mono text-dirty-gold/60 mb-2 uppercase tracking-widest">MİNİ GÖREV: ALGORİTMAYI EĞİT</div>
              <div className="flex justify-center gap-1.5 mb-6">
                {QUIZ_QUESTIONS.map((q, i) => (
                  <div key={q.id} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= currentQuizIndex ? 'bg-dirty-gold shadow-[0_0_10px_rgba(196,163,90,0.5)]' : 'bg-white/10'}`} />
                ))}
              </div>
            </div>

            {/* Quiz Card */}
            <div className="relative w-full max-w-sm h-96 flex items-center justify-center my-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuizIndex}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: quizDirection * 200, rotate: quizDirection * 15, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 glass-card border-2 border-dirty-gold/30 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden group"
                >
                  <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-dirty-gold via-faded-orange to-warm-neon-red" />
                  <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">{QUIZ_QUESTIONS[currentQuizIndex].emoji}</div>
                  <h2 className="text-xl sm:text-2xl font-[var(--font-heading)] font-bold text-text-primary leading-relaxed mb-6">
                    {QUIZ_QUESTIONS[currentQuizIndex].text}
                  </h2>
                  <div className="text-xs text-text-muted italic">Kaderini belirlemek için butonlara dokun</div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Swipe Buttons */}
            <div className="w-full max-w-sm flex items-center justify-between gap-4 mt-8 z-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(false)}
                className="flex-1 py-5 glass border border-warm-neon-red/30 rounded-2xl flex items-center justify-center gap-2 text-warm-neon-red font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(255,75,75,0.15)] hover:bg-warm-neon-red/10 transition-all"
              >
                <X size={20} /> {QUIZ_QUESTIONS[currentQuizIndex].noBtn}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAnswer(true)}
                className="flex-1 py-5 bg-gradient-to-r from-dirty-gold to-faded-orange rounded-2xl flex items-center justify-center gap-2 text-bg-dark font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(196,163,90,0.3)] glow-gold transition-all"
              >
                <Check size={20} /> {QUIZ_QUESTIONS[currentQuizIndex].yesBtn}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ===== STEP 3: MISSION STREAK (DUOLINGO VIBE) ===== */}
        {step === 'mission-streak' && (
          <motion.div
            key="mission-streak"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 150 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4 sm:px-6 text-center"
          >
            {/* Pulsing Sunburst */}
            <div className="absolute w-96 h-96 bg-dirty-gold/20 rounded-full blur-3xl animate-pulse" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, -10, 10, -10, 0] }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-32 h-32 rounded-full bg-gradient-to-tr from-dirty-gold via-ironic-gold to-faded-orange flex items-center justify-center text-bg-dark shadow-[0_0_80px_rgba(196,163,90,0.6)] mb-8 border-4 border-white/20 glow-gold animate-bounce"
            >
              <Trophy size={64} />
            </motion.div>

            <div className="text-xs font-mono text-dirty-gold tracking-[0.4em] uppercase mb-2">🔥 MİNİ GÖREV TAMAMLANDI!</div>
            <h1 className="text-4xl sm:text-5xl font-[var(--font-heading)] font-extrabold text-white mb-4">
              Gizli Başarı <span className="text-gradient-gold">Kilidi Açıldı!</span>
            </h1>

            <div className="glass-strong border border-dirty-gold/30 p-6 rounded-2xl max-w-sm w-full mb-8 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <div className="text-xl font-bold text-dirty-gold mb-1">&ldquo;Mahallenin En Dertlisi&rdquo;</div>
              <p className="text-xs text-text-secondary leading-relaxed mb-4">
                Algoritmamız senin %100 saf ve samimi bir gariban olduğunu doğruladı. İlk gün serin (streak) resmen başladı!
              </p>
              <div className="flex items-center justify-center gap-2 bg-dirty-gold/10 py-2 rounded-xl border border-dirty-gold/20 text-dirty-gold font-mono text-xs font-bold">
                <Flame size={16} className="text-faded-orange animate-pulse" /> +1 GÜN SERİ (STREAK) AKTİF
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep('character-name')}
              className="px-12 py-5 bg-gradient-to-r from-dirty-gold via-ironic-gold to-faded-orange rounded-2xl text-bg-dark font-bold text-lg shadow-[0_0_40px_rgba(196,163,90,0.4)] glow-gold flex items-center gap-2"
            >
              Karakterini İsimlendir <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        )}

        {/* ===== STEP 4: CHARACTER NAME (GAMIFIED INPUT) ===== */}
        {step === 'character-name' && (
          <motion.div
            key="character-name"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4 sm:px-6 text-center"
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
              <div className="text-6xl mb-6 animate-bounce">🎬</div>
              <h1 className="text-3xl sm:text-4xl font-[var(--font-heading)] font-bold text-text-primary mb-3">
                Gariban <span className="text-gradient-gold">Savaşçı Adın</span>
              </h1>
              <p className="text-text-secondary text-sm mb-8">Bu destansı hikayede mahalle seni hangi isimle tanıyacak?</p>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-strong rounded-3xl p-2 border-2 border-dirty-gold/20 focus-within:border-dirty-gold transition-colors shadow-[0_0_40px_rgba(196,163,90,0.1)]"
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
                  className="w-full py-5 bg-gradient-to-r from-dirty-gold via-ironic-gold to-faded-orange rounded-2xl text-bg-dark font-extrabold text-lg flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all glow-gold"
                >
                  Sınıfını Seçmeye Git <ArrowRight size={20} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* ===== STEP 5: VIBE SELECTION (GAMIFIED CLASS PICKING) ===== */}
        {step === 'vibe-select' && (
          <motion.div
            key="vibe-select"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center min-h-[100dvh] px-4 sm:px-6 py-12"
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
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
