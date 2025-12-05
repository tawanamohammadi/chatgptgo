import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ShieldCheck, Play, Pause, Volume2, Users, Timer, Award, Truck, Headphones, Quote, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/Button';
import { TELEGRAM_LINK } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

// Optimized Countdown Timer
const CountdownTimer: React.FC<{ title: string }> = ({ title }) => {
  // Static time for better performance, or could be real but less frequent updates if needed
  // For this demo, we'll keep it simple to avoid heavy re-renders
  return (
    <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl px-4 py-2">
      <Timer className="text-amber-400" size={18} />
      <span className="text-amber-300 font-bold text-sm">{title}</span>
      <div className="flex gap-1 font-mono text-white font-bold">
        <span className="bg-[#141414] px-2 py-0.5 rounded">04</span>:
        <span className="bg-[#141414] px-2 py-0.5 rounded">59</span>:
        <span className="bg-[#141414] px-2 py-0.5 rounded">12</span>
      </div>
    </div>
  );
};

// Simplified Spots Badge
const SpotsLeftBadge: React.FC<{ spotsLeft: string; spotsNumber: string }> = ({ spotsLeft, spotsNumber }) => (
  <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-2">
    <Users className="text-red-400" size={18} />
    <span className="text-red-300 font-bold text-sm">{spotsLeft} <span className="text-white">{spotsNumber}</span></span>
  </div>
);

// Testimonial Card
const TestimonialCard: React.FC<{ name: string; role: string; text: string; rating: number }> = ({ name, role, text, rating }) => (
  <div className="bg-[#141414] border border-[#27272a] rounded-2xl p-5 hover:border-[#22c55e]/30 transition-all duration-300">
    <Quote className="text-[#22c55e]/30 mb-3" size={24} />
    <p className="text-[#d4d4d8] text-sm mb-4 leading-relaxed">{text}</p>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center text-black font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{name}</p>
          <p className="text-[#71717a] text-xs">{role}</p>
        </div>
      </div>
      <div className="flex gap-0.5">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={14} fill="#22c55e" className="text-[#22c55e]" />
        ))}
      </div>
    </div>
  </div>
);

// Trust Badges Bar
const TrustBadgesBar: React.FC = () => {
  const badges = [
    { icon: Headphones, title: 'پشتیبانی ۲۴/۷', titleEn: '24/7 Support' },
    { icon: ShieldCheck, title: 'پرداخت امن', titleEn: 'Secure Payment' },
    { icon: Award, title: 'گارانتی بازگشت وجه', titleEn: 'Money-back Guarantee' },
    { icon: Truck, title: 'تحویل فوری', titleEn: 'Instant Delivery' },
  ];

  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl mx-auto my-12">
      {badges.map((badge, i) => (
        <div
          key={i}
          className="flex items-center gap-3 bg-[#141414]/50 border border-[#27272a] rounded-xl p-4 hover:border-[#22c55e]/30 transition-all duration-200"
        >
          <div className="w-10 h-10 rounded-lg bg-[#22c55e]/10 flex items-center justify-center shrink-0">
            <badge.icon className="text-[#22c55e]" size={20} />
          </div>
          <span className="text-[#e4e4e7] font-semibold text-xs md:text-sm">{language === 'fa' ? badge.title : badge.titleEn}</span>
        </div>
      ))}
    </div>
  );
};

// Custom Audio Player
const AudioPlayer: React.FC<{ src: string }> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setProgress((audio.currentTime / audio.duration) * 100);
    const handleEnded = () => { setIsPlaying(false); setProgress(0); };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full bg-[#0a0a0a] rounded-2xl p-4 border border-[#27272a] mt-4">
      <audio ref={audioRef} preload="metadata" src={src} />
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-[#22c55e] text-black hover:bg-[#16a34a] transition-all shadow-lg shadow-[#22c55e]/20 hover:scale-105 shrink-0"
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ms-1" />}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 size={14} className="text-[#22c55e]" />
            <span className="text-xs font-semibold text-white">توضیحات صوتی محصول</span>
          </div>
          <div className="h-1.5 bg-[#27272a] rounded-full overflow-hidden">
            <div className="h-full bg-[#22c55e] transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Hero: React.FC = () => {
  const { content } = useLanguage();
  const productImage = "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:0,cw:3996,ch:2247,q:80,w:2560/JFpeVzCqWC5ZbYTbyWu5m8.jpg";

  return (
    <section id="product" className="relative min-h-screen pt-28 pb-12 lg:pt-32 lg:pb-20 overflow-hidden z-20">
      {/* Simplified Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-[#22c55e]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* Left: Product Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[420px] lg:w-5/12 order-1 lg:order-none"
          >
            <div className="bg-[#141414]/80 backdrop-blur-xl rounded-[2.5rem] border border-[#27272a] overflow-hidden shadow-2xl hover:border-[#22c55e]/30 transition-all duration-300">
              <div className="relative h-56 bg-black">
                <img src={productImage} alt="ChatGPT Go" className="w-full h-full object-cover opacity-80" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div>
                <div className="absolute top-5 start-5 flex gap-2">
                  <span className="bg-[#22c55e] text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Official</span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-1">{content.hero.pricing.title}</h3>
                    <p className="text-[#a1a1aa] text-sm font-medium">{content.hero.pricing.period}</p>
                  </div>
                  <div className="text-end">
                    <div className="text-3xl font-black text-[#22c55e]">{content.hero.pricing.price}</div>
                    <div className="text-xs text-[#71717a] line-through">{content.hero.pricing.originalPrice}</div>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {content.hero.pricing.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#e4e4e7]">
                      <CheckCircle2 size={18} className="text-[#22c55e] mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <AudioPlayer src="https://raw.githubusercontent.com/tawanamohammadi/chatgptgo/main/audio/gotgo.mp3" />

                <Button href={TELEGRAM_LINK} variant="primary" className="w-full mt-6 py-4 text-lg rounded-2xl shadow-xl shadow-[#22c55e]/20">
                  <ShoppingCart size={20} className="me-2" />
                  {content.hero.pricing.button}
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-full lg:w-7/12 flex flex-col items-center lg:items-start text-center lg:text-start order-2 lg:order-none"
          >
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
              <CountdownTimer title={content.hero.urgency.countdownTitle} />
              <SpotsLeftBadge spotsLeft={content.hero.urgency.spotsLeft} spotsNumber={content.hero.urgency.spotsNumber} />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-bold mb-6 uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
              </span>
              {content.hero.badge}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
              {content.hero.title}
            </h1>

            <p className="text-lg text-[#a1a1aa] leading-relaxed mb-8 max-w-xl font-medium">
              {content.hero.subtitle}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 w-full mb-10">
              <div className="bg-[#141414] border border-[#27272a] rounded-2xl p-4 min-w-[100px] text-center">
                <div className="text-2xl font-black text-[#22c55e]">1250+</div>
                <div className="text-xs text-[#a1a1aa] font-bold mt-1">مشتری راضی</div>
              </div>
              <div className="bg-[#141414] border border-[#27272a] rounded-2xl p-4 min-w-[100px] text-center">
                <div className="text-2xl font-black text-[#22c55e] flex items-center justify-center gap-1">4.9 <Star size={14} fill="#22c55e" /></div>
                <div className="text-xs text-[#a1a1aa] font-bold mt-1">امتیاز</div>
              </div>
              <div className="bg-[#141414] border border-[#27272a] rounded-2xl p-4 min-w-[100px] text-center">
                <div className="text-2xl font-black text-[#22c55e]">24/7</div>
                <div className="text-xs text-[#a1a1aa] font-bold mt-1">پشتیبانی</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
              <Button href={TELEGRAM_LINK} variant="primary" className="px-10 py-4 text-lg rounded-2xl w-full sm:w-auto shadow-xl shadow-[#22c55e]/20">
                <ShoppingCart size={20} className="me-2" />
                {content.hero.ctaPrimary}
              </Button>
              <Button href="#how" variant="glass" className="px-10 py-4 text-lg rounded-2xl w-full sm:w-auto">
                {content.hero.ctaSecondary}
              </Button>
            </div>
          </motion.div>
        </div>

        <TrustBadgesBar />

        <div className="mt-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">{content.hero.testimonialsTitle}</h3>
            <p className="text-[#71717a] text-sm">{content.hero.testimonialsSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {content.hero.testimonials.map((testimonial, i) => (
              <TestimonialCard key={i} {...testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};