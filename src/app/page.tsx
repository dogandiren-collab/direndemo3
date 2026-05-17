'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import RainEffect from '@/components/RainEffect';
import { Sparkles, ChevronDown, Flame, Heart, Zap, Star, Trophy, MapPin } from 'lucide-react';

const titles = [
  { text: 'Holding On', emoji: '🤏' },
  { text: 'Orta Direk', emoji: '⚖️' },
  { text: 'Çay & Dram Uzmanı', emoji: '🍵' },
  { text: 'Mahalle Protagonisti', emoji: '🎬' },
  { text: 'Sefil Bilo', emoji: '👑' },
];

const stats = [
  { value: '847K', label: 'Gariban Test Çözdü' },
  { value: '2.3M', label: 'Çay İçildi' },
  { value: '156K', label: 'Kader Eşleşti' },
  { value: '∞', label: 'Duygusal Hasar' },
];

const quotes = [
  "\"Bazıları zengin. Bazıları güzel. Bazıları sadece gariban.\"",
  "\"Parayla saadet olmaz ama çaysız hiç olmaz.\"",
  "\"Gülümsüyorum ama içeride Müslüm Gürses çalıyor.\"",
  "\"Cüzdan boş, kalp kırık, aura full.\"",
  "\"Zenginliği hayal ederken asgari ücrete şükretmek...\"",
  "\"Bugün de hayattayız, eyvallah.\""
];

export default function LandingPage() {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen bg-bg-dark overflow-hidden">
      <RainEffect />

      {/* ===== AMBIENT LIGHT ORBS ===== */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-dirty-gold/5 rounded-full blur-[80px] md:blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-muted-blue/5 rounded-full blur-[60px] md:blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-2/3 left-1/2 w-32 h-32 md:w-64 md:h-64 bg-warm-neon-red/3 rounded-full blur-[50px] md:blur-[80px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
      </div>

      {/* ===== HERO SECTION ===== */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4 sm:px-6 text-center">
        {/* Floating Icons Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/4 left-[10%] text-4xl">🍵</motion.div>
          <motion.div animate={{ y: [0, 30, 0], rotate: [0, -15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute top-1/3 right-[15%] text-5xl">💔</motion.div>
          <motion.div animate={{ y: [0, -40, 0], rotate: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }} className="absolute bottom-1/3 left-[20%] text-6xl">🫠</motion.div>
          <motion.div animate={{ y: [0, 25, 0], rotate: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} className="absolute bottom-1/4 right-[25%] text-5xl">🚬</motion.div>
        </div>

        {/* Logo / Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-6 relative"
        >
          <div className="absolute -inset-4 bg-dirty-gold/10 blur-xl rounded-full" />
          <span className="relative text-xs sm:text-sm tracking-[0.3em] uppercase text-dirty-gold/80 font-bold border border-dirty-gold/20 px-4 py-1.5 rounded-full glass">
            Türkiye’nin samimi gençlik platformu
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, type: 'spring', stiffness: 100 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-[var(--font-heading)] font-bold tracking-tight mb-6 sm:mb-8 text-glow-gold"
        >
          <span className="text-gradient-gold">garibandan.com</span>
        </motion.h1>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="max-w-2xl mb-10"
        >
          <p className="text-lg sm:text-xl md:text-2xl font-[var(--font-heading)] italic text-text-primary/80 leading-relaxed">
            Mükemmellik yorar. Biz gerçeği arıyoruz.<br/>
            <span className="text-dirty-gold text-glow-gold">Gel beraber dertlenelim.</span>
          </p>
        </motion.div>

        {/* Rotating Title Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="h-16 flex items-center justify-center mb-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTitle}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="glass-strong px-6 py-3 flex items-center gap-3 border-dirty-gold/20 glow-gold"
            >
              <span className="text-2xl">{titles[currentTitle].emoji}</span>
              <span className="text-lg font-bold text-gradient-gold">{titles[currentTitle].text}</span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, type: 'spring', stiffness: 200 }}
          className="relative"
        >
          {/* Pulsing glow ring */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl bg-dirty-gold/20 blur-xl"
          />
          <Link href="/onboarding">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(196, 163, 90, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ['0 0 20px rgba(196,163,90,0.2)', '0 0 40px rgba(196,163,90,0.4)', '0 0 20px rgba(196,163,90,0.2)'] }}
              transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
              className="relative group px-8 sm:px-14 py-5 sm:py-6 bg-gradient-to-r from-dirty-gold via-ironic-gold to-faded-orange rounded-2xl text-bg-dark font-bold text-xl sm:text-2xl tracking-wide overflow-hidden transition-all"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles size={24} />
                Garibanometreyi Başlat
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-faded-orange via-dirty-gold to-ironic-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          </Link>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="text-center text-text-muted text-xs mt-4"
          >
            ✨ 847,000+ gariban teste girdi
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-dirty-gold/60"
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== QUOTE MARQUEE ===== */}
      <section className="relative z-20 py-4 bg-dirty-gold/10 border-y border-dirty-gold/20 overflow-hidden backdrop-blur-md">
        <div className="animate-marquee gap-8 items-center">
          {[...quotes, ...quotes].map((quote, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="text-sm md:text-base font-[var(--font-heading)] italic text-dirty-gold whitespace-nowrap">
                {quote}
              </span>
              <span className="text-dirty-gold/30">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl font-[var(--font-heading)] font-bold text-center mb-10 sm:mb-16"
        >
          <span className="text-text-primary">Nasıl </span>
          <span className="text-gradient-gold">Çalışır?</span>
        </motion.h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: <Flame size={28} />, title: 'Vibrasyonunu Seç', desc: 'Duygusal kimliğini belirle. 8 farklı gariban vibrasyonundan birini seç.', step: '01' },
            { icon: <Zap size={28} />, title: 'Garibanometre\'yi Çöz', desc: 'Finansal, duygusal ve sosyal gariban seviyeni ölç. 0-100 arası puan al.', step: '02' },
            { icon: <Heart size={28} />, title: 'Kaderini Bul', desc: 'Duygusal uyum, mizah senkronizasyonu ve hayatta kalma enerjisiyle eşleş.', step: '03' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass-card p-6 sm:p-8 text-center group hover:border-dirty-gold/40 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-dirty-gold/5 rounded-full blur-[40px] group-hover:bg-dirty-gold/10 transition-colors" />
              <div className="text-sm text-dirty-gold/40 font-mono mb-4">{item.step}</div>
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-dirty-gold/20 to-bg-dark border border-dirty-gold/20 flex items-center justify-center text-dirty-gold group-hover:scale-110 transition-transform duration-300 glow-gold">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-text-primary">{item.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CITY LEAGUES PREVIEW ===== */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-transparent via-charcoal/40 to-transparent border-y border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-dirty-gold/10 border border-dirty-gold/20 text-dirty-gold text-xs font-bold mb-6 uppercase tracking-wider">
              <Trophy size={14} /> Yeni Özellik
            </div>
            <h2 className="text-3xl md:text-5xl font-[var(--font-heading)] font-bold mb-6">
              Şehrinin <br/>
              <span className="text-gradient-gold">Gariban Ligine</span> Katıl
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Sadece bireysel eşleşme değil, bölgesel bir varoluş mücadelesi. İstanbul'un stresli aurası mı, Ankara'nın gri melankolisi mi, İzmir'in rahatsız edici rahatlığı mı? Şehrini temsil et.
            </p>
            <Link href="/leaderboard">
              <button className="glass px-6 py-3 text-text-primary text-sm font-medium hover:text-dirty-gold hover:border-dirty-gold/30 transition-all flex items-center gap-2 mx-auto md:mx-0">
                <MapPin size={18} /> Sıralamaları Gör
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            <div className="glass-strong p-6 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
              <div className="relative z-10 space-y-4">
                {[
                  { city: 'İstanbul', score: '88.5', trend: '↑', color: 'text-warm-neon-red' },
                  { city: 'Ankara', score: '82.1', trend: '−', color: 'text-muted-blue' },
                  { city: 'İzmir', score: '64.3', trend: '↓', color: 'text-tv-green' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/5 hover:bg-white/[0.06] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-charcoal flex items-center justify-center text-xs font-bold text-text-muted">
                        {i + 1}
                      </div>
                      <span className="font-bold text-text-primary">{item.city}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-sm ${item.color}`}>{item.trend}</span>
                      <span className="font-mono font-bold text-dirty-gold">{item.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== GARIBAN TITLES SHOWCASE ===== */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl font-[var(--font-heading)] font-bold text-center mb-4"
        >
          <span className="text-gradient-emotional">Gariban Unvanları</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-text-secondary text-center mb-16 text-lg"
        >
          Hangi seviyedesin?
        </motion.p>

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { range: '0-20', title: 'Holding On', emoji: '🤏', desc: 'Henüz tam gariban değilsin ama yoldasın', color: 'from-muted-blue/20 to-transparent' },
            { range: '20-40', title: 'Orta Direk', emoji: '⚖️', desc: 'Klasik Türk orta sınıfı mücadelesi', color: 'from-tv-green/20 to-transparent' },
            { range: '40-60', title: 'Çay & Dram Uzmanı', emoji: '🍵', desc: 'Çay ve drama hayatının iki direği', color: 'from-tea-brown/20 to-transparent' },
            { range: '60-80', title: 'Mahalle Protagonisti', emoji: '🎬', desc: 'Mahallenin ana karakteri sensin', color: 'from-faded-orange/20 to-transparent' },
            { range: '80-100', title: 'Sefil Bilo', emoji: '👑', desc: 'Garibanların kralı, mücadelenin şampiyonu', color: 'from-dirty-gold/20 to-transparent' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-6 flex items-center gap-5 bg-gradient-to-r ${item.color} hover:border-dirty-gold/20 transition-all duration-500 group`}
            >
              <div className="text-4xl group-hover:scale-125 transition-transform duration-300">
                {item.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-mono text-dirty-gold/50 bg-dirty-gold/10 px-2 py-0.5 rounded">{item.range}</span>
                  <h3 className="text-lg font-bold text-text-primary">{item.title}</h3>
                </div>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== VIRAL STATS ===== */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring' }}
              className="text-center glass-card py-8 px-4"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient-gold mb-2">{stat.value}</div>
              <div className="text-xs text-text-secondary uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative z-10 py-20 sm:py-32 px-4 sm:px-6 text-center bg-cinematic">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-6xl mb-6">🫠</div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-[var(--font-heading)] font-bold mb-6">
            <span className="text-text-primary">Sen de </span>
            <span className="text-gradient-gold">gariban mısın?</span>
          </h2>
          <p className="text-text-secondary text-lg mb-10 max-w-md mx-auto">
            Garibanometre testini çöz, duygusal kimliğini keşfet, kaderini bul.
          </p>
          <Link href="/onboarding">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-dirty-gold to-faded-orange rounded-2xl text-bg-dark font-bold text-lg sm:text-xl tracking-wide glow-gold"
            >
              <span className="flex items-center gap-2">
                <Star size={22} />
                Garibanometreyi Başlat
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/5 bg-bg-dark">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-text-muted">
            © 2026 garibandan.com. Tüm hakları gariban.
          </div>
          <div className="flex gap-6 text-sm text-text-muted">
            <span className="hover:text-dirty-gold transition-colors cursor-pointer">Hakkında</span>
            <span className="hover:text-dirty-gold transition-colors cursor-pointer">Gizlilik</span>
            <span className="hover:text-dirty-gold transition-colors cursor-pointer">İletişim</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
