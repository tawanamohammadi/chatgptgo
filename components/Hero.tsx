import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ShieldCheck } from 'lucide-react';
import { Button } from './ui/Button';
import { TELEGRAM_LINK, PAYMENT_METHODS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const { content } = useLanguage();
  const productImage = "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:0,cw:3996,ch:2247,q:80,w:2560/JFpeVzCqWC5ZbYTbyWu5m8.jpg";

  return (
    <section id="product" className="relative pt-36 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          
          {/* Left: Product Visual (3D Glass Box) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-5/12 w-full max-w-md lg:max-w-none mx-auto perspective-1000 order-1 lg:order-none"
          >
            <div className="relative group">
                {/* Ambient Light - Updated to Indigo/Pink */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-brand-accent/30 via-brand-secondary/30 to-brand-tertiary/30 blur-[80px] rounded-full pointer-events-none opacity-60"></div>

                {/* Glass Container */}
                <div className="relative bg-white/5 dark:bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/40 dark:border-white/10 p-4 shadow-2xl transition-all duration-700 group-hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.3)] group-hover:border-brand-accent/30">
                    
                    <div className="relative rounded-[2rem] overflow-hidden shadow-inner aspect-[4/5] bg-black">
                        <img 
                            src={productImage} 
                            alt="ChatGPT Go" 
                            className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/30 to-transparent"></div>
                        
                        {/* On-Card Content - LTR for English branding */}
                        <div className="absolute bottom-0 inset-x-0 p-8 text-white text-start">
                             <div className="flex items-center gap-2 mb-3">
                                <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">Official</span>
                                <div className="flex text-[#FFD700]">
                                    {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                                </div>
                             </div>
                             <h3 className="text-4xl font-black mb-2 tracking-tight" dir="ltr">ChatGPT Go</h3>
                             <p className="opacity-80 text-sm font-medium tracking-wide text-brand-tertiary">PanbeNet Exclusive Edition</p>
                        </div>
                    </div>

                    {/* Verified Badge Floating - Logical End */}
                    <div className="absolute -top-6 end-6 bg-white/90 dark:bg-[#1e1b4b]/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-white/20 dark:border-white/10 animate-float z-20">
                        <div className="bg-gradient-to-br from-brand-accent to-brand-secondary p-2.5 rounded-full text-white shadow-lg">
                            <ShieldCheck size={24} />
                        </div>
                        <div className="text-start">
                            <div className="text-[10px] font-bold text-brand-mutedLight uppercase tracking-wider">Seller Verified</div>
                            <div className="text-sm font-black text-foreground">PanbeNet</div>
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3, duration: 0.8 }}
             className="lg:w-7/12 flex flex-col items-center lg:items-start text-center lg:text-start order-2 lg:order-none"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-bold mb-8 uppercase tracking-widest shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></div>
                {content.hero.badge}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground leading-[1.15] mb-6 tracking-tighter">
                {content.hero.pricing.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-brand-mutedLight leading-relaxed mb-8 max-w-2xl font-light">
                {content.hero.subtitle}
            </p>

            {/* Price Tag - Modern Gradient */}
            <div className="flex items-end gap-3 mb-10 relative">
                <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-tertiary via-brand-accent to-brand-secondary tracking-tighter drop-shadow-sm">
                    {content.hero.pricing.price}
                </span>
                <span className="text-lg md:text-xl text-brand-mutedLight font-medium mb-2">{content.hero.pricing.unit}</span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 mb-12">
                <Button href={TELEGRAM_LINK} variant="primary" className="px-8 md:px-10 py-4 text-base md:text-lg rounded-2xl w-full sm:w-auto">
                    <ShoppingCart size={20} className="me-2" />
                    {content.hero.ctaPrimary}
                </Button>
                <Button href="#how" variant="glass" className="px-8 md:px-10 py-4 text-base md:text-lg rounded-2xl w-full sm:w-auto">
                    {content.hero.ctaSecondary}
                </Button>
            </div>

            {/* Payment Methods */}
            <div className="pt-8 border-t border-black/5 dark:border-white/5 w-full">
                <p className="text-[10px] font-bold text-brand-mutedLight uppercase tracking-[0.2em] mb-5 text-center lg:text-start">
                    Accepted Payment Networks
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    {PAYMENT_METHODS.map((method, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/40 dark:bg-white/5 border border-white/50 dark:border-white/5 shadow-sm hover:bg-white/60 transition-colors cursor-default backdrop-blur-sm">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: method.color }}></div>
                            <span className="text-xs font-bold text-foreground opacity-80">{method.label}</span>
                        </div>
                    ))}
                </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};