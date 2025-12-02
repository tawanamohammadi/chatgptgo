import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ShieldCheck, Zap, CheckCircle2, Gift, Play, Pause, Volume2, Users, Timer, Award, Truck, Headphones, Quote } from 'lucide-react';
import { Button } from './ui/Button';
import { TELEGRAM_LINK, PAYMENT_METHODS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

// Countdown Timer Component
const CountdownTimer: React.FC<{ title: string }> = ({ title }) => {
  const [time, setTime] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 }; // Reset
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 rounded-2xl px-4 py-3 animate-pulse">
      <Timer className="text-amber-400 animate-bounce" size={20} />
      <span className="text-amber-300 font-bold text-sm">{title}</span>
      <div className="flex gap-1.5 font-mono">
        <span className="bg-black/40 px-2 py-1 rounded-lg text-white font-bold text-lg">{formatNumber(time.hours)}</span>
        <span className="text-amber-400 font-bold">:</span>
        <span className="bg-black/40 px-2 py-1 rounded-lg text-white font-bold text-lg">{formatNumber(time.minutes)}</span>
        <span className="text-amber-400 font-bold">:</span>
        <span className="bg-black/40 px-2 py-1 rounded-lg text-white font-bold text-lg">{formatNumber(time.seconds)}</span>
      </div>
    </div>
  );
};

// Spots Left Badge Component
const SpotsLeftBadge: React.FC<{ spotsLeft: string; spotsNumber: string }> = ({ spotsLeft, spotsNumber }) => (
  <motion.div 
    initial={{ scale: 0.9 }}
    animate={{ scale: [0.9, 1.05, 0.95, 1] }}
    transition={{ repeat: Infinity, duration: 2 }}
    className="flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/40 rounded-2xl px-4 py-2"
  >
    <Users className="text-red-400" size={18} />
    <span className="text-red-300 font-bold text-sm">{spotsLeft} <span className="text-white">{spotsNumber}</span></span>
  </motion.div>
);

// Testimonial Card Component
const TestimonialCard: React.FC<{ name: string; role: string; text: string; rating: number }> = ({ name, role, text, rating }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-[#141414] border border-[#27272a] rounded-2xl p-5 hover:border-[#22c55e]/30 transition-all duration-300"
  >
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
  </motion.div>
);

// Trust Badges Bar Component
const TrustBadgesBar: React.FC = () => {
  const badges = [
    { icon: Headphones, title: 'پشتیبانی ۲۴/۷', titleEn: '24/7 Support' },
    { icon: ShieldCheck, title: 'پرداخت امن', titleEn: 'Secure Payment' },
    { icon: Award, title: 'گارانتی بازگشت وجه', titleEn: 'Money-back Guarantee' },
    { icon: Truck, title: 'تحویل فوری', titleEn: 'Instant Delivery' },
  ];

  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl mx-auto my-8">
      {badges.map((badge, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3 bg-[#141414] border border-[#27272a] rounded-xl p-3 hover:border-[#22c55e]/30 hover:bg-[#141414]/80 transition-all duration-200"
        >
          <div className="w-10 h-10 rounded-lg bg-[#22c55e]/10 flex items-center justify-center">
            <badge.icon className="text-[#22c55e]" size={20} />
          </div>
          <span className="text-[#e4e4e7] font-semibold text-xs">{language === 'fa' ? badge.title : badge.titleEn}</span>
        </motion.div>
      ))}
    </div>
  );
};

// Custom Audio Player Component
const AudioPlayer: React.FC<{ src: string }> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audio.currentTime = percentage * audio.duration;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-[#0a0a0a] rounded-2xl p-4 border border-[#27272a]">
      <audio ref={audioRef} preload="metadata" src={src} />
      
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-[#22c55e] text-black hover:bg-[#16a34a] transition-all duration-200 shadow-lg shadow-[#22c55e]/30 hover:scale-105"
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ms-1" />}
        </button>

        {/* Progress Section */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 size={14} className="text-[#22c55e]" />
            <span className="text-xs font-semibold text-white">توضیحات صوتی محصول</span>
          </div>
          
          {/* Progress Bar */}
          <div 
            className="h-1.5 bg-[#27272a] rounded-full cursor-pointer relative overflow-hidden"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md transition-all duration-100"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>
          
          {/* Time Display */}
          <div className="flex justify-between text-[10px] text-[#71717a] mt-1 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
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
    <section id="product" className="relative min-h-screen pt-24 pb-8 lg:pt-28 lg:pb-16 overflow-hidden z-20 flex items-center">
      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[#22c55e]/15 blur-[120px] rounded-full pointer-events-none opacity-50 dark:opacity-30"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          
          {/* Left: Enhanced Product Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="lg:w-5/12 w-full max-w-[400px] lg:max-w-none mx-auto perspective-1000 order-1 lg:order-none"
          >
            <div className="relative group">
                {/* Neon Backlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#22c55e] to-[#16a34a] opacity-0 group-hover:opacity-40 blur-[60px] transition-opacity duration-700"></div>

                <div className="relative bg-[#141414] backdrop-blur-3xl rounded-[2rem] border border-[#27272a] overflow-hidden shadow-2xl dark:shadow-black transition-all duration-200 group-hover:scale-[1.01] group-hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] group-hover:border-[#22c55e]/30">
                    {/* Product Image Section */}
                    <div className="relative h-48 overflow-hidden bg-black">
                        <img 
                            src={productImage} 
                            alt="ChatGPT Go" 
                            loading="lazy"
                            className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-700 scale-110 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
                        
                        {/* Badge */}
                        <div className="absolute top-4 start-4 flex items-center gap-2">
                            <span className="bg-[#22c55e] px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-black shadow-lg shadow-[#22c55e]/40">
                                Official
                            </span>
                            <span className="bg-[#0a0a0a]/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#22c55e] border border-[#22c55e]/30">
                                {content.hero.pricing.special}
                            </span>
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="p-6">
                        {/* Title */}
                        <h3 className="text-2xl font-black text-white mb-1 tracking-tight flex items-center gap-2" dir="ltr">
                            <span className="text-[#22c55e]">●</span>
                            {content.hero.pricing.title}
                        </h3>
                        <p className="text-[#d4d4d8] text-sm font-medium mb-4">{content.hero.pricing.period}</p>

                        {/* Price with Discount */}
                        <div className="bg-[#0a0a0a] rounded-xl p-4 mb-4 border border-[#27272a]">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-lg text-[#71717a] line-through font-medium">{content.hero.pricing.originalPrice}</span>
                                <span className="bg-[#22c55e] text-black text-xs font-bold px-2 py-1 rounded-lg animate-pulse">{content.hero.pricing.discountPercent} OFF</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-[#22c55e]">{content.hero.pricing.price}</span>
                                <span className="text-sm font-bold text-[#a1a1aa]">{content.hero.pricing.unit}</span>
                            </div>
                            <p className="text-[10px] text-[#71717a] mt-1">{content.hero.pricing.note}</p>
                        </div>

                        {/* Features List */}
                        <ul className="space-y-2.5 mb-5">
                            {content.hero.pricing.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm">
                                    <CheckCircle2 size={16} className="text-[#22c55e] mt-0.5 flex-shrink-0" />
                                    <span className="text-[#e4e4e7] font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Guarantee Badge */}
                        <div className="bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-xl p-3 mb-5 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#22c55e]/20 flex items-center justify-center">
                                <ShieldCheck size={20} className="text-[#22c55e]" />
                            </div>
                            <div>
                                <p className="text-[#22c55e] font-bold text-sm">ضمانت بازگشت وجه</p>
                                <p className="text-[#a1a1aa] text-xs">در صورت عدم رضایت، وجه کامل عودت داده می‌شود</p>
                            </div>
                        </div>

                        {/* Audio Player - Audio file is hosted in the same repository */}
                        <AudioPlayer src="https://raw.githubusercontent.com/tawanamohammadi/chatgptgo/main/audio/gotgo.mp3" />

                        {/* Buy Button */}
                        <Button href={TELEGRAM_LINK} variant="primary" className="w-full mt-5 py-4 text-base rounded-xl shadow-[0_10px_40px_-10px_rgba(34,197,94,0.5)] hover:scale-[1.02] transition-transform duration-200">
                            <ShoppingCart size={18} className="me-2" />
                            {content.hero.pricing.button}
                        </Button>
                    </div>
                </div>
            </div>
          </motion.div>

          {/* Right: Content (Editorial Style) */}
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2, duration: 0.8 }}
             className="lg:w-7/12 flex flex-col items-center lg:items-start text-center lg:text-start order-2 lg:order-none"
          >
            {/* Urgency Section - Countdown & Spots */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-5"
            >
              <CountdownTimer title={content.hero.urgency.countdownTitle} />
              <SpotsLeftBadge spotsLeft={content.hero.urgency.spotsLeft} spotsNumber={content.hero.urgency.spotsNumber} />
            </motion.div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141414] border border-[#27272a] text-[#22c55e] text-[11px] font-bold mb-5 shadow-lg tracking-wide uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
                </span>
                {content.hero.badge}
            </div>

            <h1 className="text-[clamp(2rem,5vw,4rem)] font-black text-white leading-[1.1] mb-5 tracking-tight">
                {content.hero.title}
            </h1>

            <p className="text-base md:text-lg text-[#d4d4d8] leading-relaxed mb-8 max-w-xl font-medium">
                {content.hero.subtitle}
            </p>

            {/* Stats/Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 w-full max-w-lg mb-8">
                <div className="bg-[#141414] border border-[#27272a] rounded-xl p-4 text-center hover:border-[#22c55e]/30 transition-colors duration-200">
                    <div className="text-2xl font-black text-[#22c55e] mb-1">1250+</div>
                    <div className="text-xs text-[#a1a1aa] font-medium">مشتری راضی</div>
                </div>
                <div className="bg-[#141414] border border-[#27272a] rounded-xl p-4 text-center hover:border-[#22c55e]/30 transition-colors duration-200">
                    <div className="text-2xl font-black text-[#22c55e] flex items-center justify-center gap-1">
                        4.9 <Star size={16} fill="#22c55e" />
                    </div>
                    <div className="text-xs text-[#a1a1aa] font-medium">امتیاز کاربران</div>
                </div>
                <div className="bg-[#141414] border border-[#27272a] rounded-xl p-4 text-center hover:border-[#22c55e]/30 transition-colors duration-200">
                    <div className="text-2xl font-black text-[#22c55e]">24/7</div>
                    <div className="text-xs text-[#a1a1aa] font-medium">پشتیبانی</div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 mb-8">
                <Button href={TELEGRAM_LINK} variant="primary" className="px-10 py-4 text-base rounded-full w-full sm:w-auto shadow-[0_10px_40px_-10px_rgba(34,197,94,0.5)] hover:scale-105 transition-transform duration-200">
                    <ShoppingCart size={18} className="me-2" />
                    {content.hero.ctaPrimary}
                </Button>
                <Button href="#how" variant="glass" className="px-8 py-4 text-base rounded-full w-full sm:w-auto">
                    {content.hero.ctaSecondary}
                </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider">
                {content.hero.trust.map((item, i) => (
                    <span key={i} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#141414] border border-[#27272a] text-[#d4d4d8] hover:border-[#22c55e]/30 transition-colors duration-200">
                        <ShieldCheck size={14} className="text-[#22c55e]" /> {item}
                    </span>
                ))}
            </div>

          </motion.div>
        </div>

        {/* Trust Badges Bar */}
        <TrustBadgesBar />

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 lg:mt-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">{content.hero.testimonialsTitle}</h3>
            <p className="text-[#71717a] text-sm">{content.hero.testimonialsSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {content.hero.testimonials.map((testimonial, i) => (
              <TestimonialCard key={i} {...testimonial} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};