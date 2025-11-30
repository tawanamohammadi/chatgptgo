import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ShieldCheck, Zap } from 'lucide-react';
import { Button } from './ui/Button';
import { TELEGRAM_LINK, PAYMENT_METHODS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const { content } = useLanguage();
  const productImage = "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:0,cw:3996,ch:2247,q:80,w:2560/JFpeVzCqWC5ZbYTbyWu5m8.jpg";

  return (
    <section id="product" className="relative pt-28 pb-12 lg:pt-40 lg:pb-24 overflow-hidden z-20">
      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-[#22c55e]/20 blur-[120px] rounded-full pointer-events-none opacity-50 dark:opacity-30"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
          
          {/* Left: Product Visual (Darker, Glossier) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="lg:w-5/12 w-full max-w-[360px] lg:max-w-none mx-auto perspective-1000 order-1 lg:order-none"
          >
            <div className="relative group">
                {/* Neon Backlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#22c55e] to-[#16a34a] opacity-0 group-hover:opacity-40 blur-[60px] transition-opacity duration-700"></div>

                <div className="relative bg-[#141414] backdrop-blur-3xl rounded-[2.5rem] border border-[#27272a] p-2 shadow-2xl dark:shadow-black transition-all duration-200 group-hover:scale-[1.01] group-hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                    <div className="relative rounded-[2.2rem] overflow-hidden aspect-[4/5] bg-black shadow-inner">
                        <img 
                            src={productImage} 
                            alt="ChatGPT Go" 
                            loading="lazy"
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 scale-105 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                        
                        <div className="absolute bottom-0 inset-x-0 p-8 text-white text-start">
                             <div className="flex items-center gap-2 mb-4">
                                <span className="bg-[#22c55e]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-black shadow-[0_0_15px_-3px_rgba(34,197,94,0.6)]">
                                    Official
                                </span>
                             </div>
                             <h3 className="text-5xl font-black mb-1 tracking-tighter bg-gradient-to-r from-white via-[#22c55e] to-white bg-clip-text text-transparent" dir="ltr">ChatGPT <span className="text-[#22c55e]">Go</span></h3>
                             <p className="text-[#a1a1aa] font-bold text-sm tracking-widest uppercase mt-2">ChatGPT Go Exclusive</p>
                        </div>
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141414] border border-[#27272a] text-[#22c55e] text-[11px] font-bold mb-6 shadow-lg tracking-wide uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
                </span>
                {content.hero.badge}
            </div>

            <h1 className="text-[clamp(2.5rem,5.5vw,5rem)] font-black text-foreground leading-[0.95] mb-6 tracking-tighter drop-shadow-lg bg-gradient-to-r from-[#fafafa] via-[#22c55e] to-[#fafafa] bg-clip-text">
                {content.hero.pricing.title}
            </h1>

            <p className="text-lg md:text-xl text-[#a1a1aa] leading-relaxed mb-10 max-w-xl font-medium">
                {content.hero.subtitle}
            </p>

            {/* Price Block - Minimalist */}
            <div className="flex flex-col gap-1 mb-10">
                <div className="flex items-baseline justify-center lg:justify-start gap-1">
                    <span className="text-[3.5rem] md:text-[4.5rem] font-black text-[#fafafa] tracking-tighter leading-none">
                        {content.hero.pricing.price}
                    </span>
                    <span className="text-xl font-bold text-[#71717a] uppercase translate-y-[-10px]">{content.hero.pricing.unit}</span>
                </div>
                <div className="h-1 w-24 bg-gradient-to-r from-[#22c55e] to-[#16a34a] rounded-full mx-auto lg:mx-0"></div>
            </div>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 mb-12">
                <Button href={TELEGRAM_LINK} variant="primary" className="px-12 py-4 text-lg rounded-full w-full sm:w-auto shadow-[0_10px_40px_-10px_rgba(34,197,94,0.5)] hover:scale-105 transition-transform duration-200">
                    <ShoppingCart size={20} className="me-2" />
                    {content.hero.ctaPrimary}
                </Button>
                <Button href="#how" variant="glass" className="px-10 py-4 text-lg rounded-full w-full sm:w-auto">
                    {content.hero.ctaSecondary}
                </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-4 text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">
                {content.hero.trust.map((item, i) => (
                    <span key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#141414] border border-[#27272a]">
                        <ShieldCheck size={12} className="text-[#22c55e]" /> {item}
                    </span>
                ))}
            </div>

            {/* Audio Guide Section */}
            <div className="w-full mt-8 p-4 bg-[#141414]/80 backdrop-blur-lg rounded-2xl border border-[#27272a]">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-[#22c55e]/20 p-2 rounded-full" aria-hidden="true">
                  <svg className="w-5 h-5 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
                  </svg>
                </span>
                <div>
                  <p className="text-[#fafafa] font-semibold text-sm" aria-hidden="true">🎧 توضیحات صوتی محصول</p>
                  <p className="text-[#a1a1aa] text-xs">برای شنیدن توضیحات کامل، پخش کنید</p>
                </div>
              </div>
              <audio 
                controls 
                preload="none"
                className="w-full h-10 rounded-lg"
                aria-label="توضیحات صوتی محصول ChatGPT Go"
              >
                <source src="https://raw.githubusercontent.com/tawanamohammadi/chatgptgo/main/audio/gotgo.mp3" type="audio/mpeg" />
                مرورگر شما از پخش صوت پشتیبانی نمی‌کند.
              </audio>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};