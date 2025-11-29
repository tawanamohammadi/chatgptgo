import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, ShoppingCart } from 'lucide-react';
import { Button } from './ui/Button';
import { TELEGRAM_LINK } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const { content } = useLanguage();
  // Using the specific image provided by the user
  const productImage = "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:0,cw:3996,ch:2247,q:80,w:2560/JFpeVzCqWC5ZbYTbyWu5m8.jpg";

  return (
    <section id="product" className="relative pt-32 pb-24 overflow-hidden bg-background">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Product Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-5/12 w-full max-w-md lg:max-w-none mx-auto"
          >
            <div className="relative group perspective-1000">
                {/* Decorative Glow */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-brand-accent via-blue-500 to-purple-500 rounded-[2rem] opacity-30 blur-xl group-hover:opacity-50 transition duration-700"></div>
                
                {/* The Image Card */}
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-border dark:border-white/10 aspect-[4/5] bg-gray-900 group">
                    <img 
                        src={productImage} 
                        alt="ChatGPT Go" 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                    />
                    
                    {/* Overlay Gradient for Text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-transparent to-black/20 opacity-80"></div>

                    {/* Badge on Image */}
                    <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-brand-accent/90 text-white text-xs font-bold shadow-lg backdrop-blur-md z-10 border border-white/20">
                        OFFICIAL
                    </div>

                    {/* Bottom Info on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                         <h3 className="text-4xl font-black text-white mb-2 tracking-tight drop-shadow-lg">ChatGPT Go</h3>
                         <div className="flex flex-wrap items-center gap-3 text-white/90 text-sm font-medium">
                            <span className="bg-white/10 px-3 py-1 rounded-lg backdrop-blur-md border border-white/10">Plus Features</span>
                            <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-brand-accent shadow-[0_0_10px_currentColor]"></span>
                            <span className="bg-brand-accent/20 px-3 py-1 rounded-lg backdrop-blur-md border border-brand-accent/20 text-brand-accent">1 Year License</span>
                         </div>
                    </div>
                </div>
            </div>
          </motion.div>

          {/* Right Column: Product Details */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 }}
             className="lg:w-7/12 flex flex-col"
          >
            <div className="mb-2 flex items-center gap-2">
                <span className="text-brand-accent font-bold text-sm tracking-wider uppercase">{content.hero.badge}</span>
                <div className="flex text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                </div>
                <span className="text-xs text-brand-mutedLight">(4.9/5)</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-4">
                {content.hero.pricing.title}
            </h1>

            <div className="flex flex-wrap gap-4 mb-8">
                 {content.hero.trust.map((tag, i) => (
                     <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-muted/5 border border-border dark:border-white/10 text-xs font-medium text-brand-mutedLight">
                         <Check size={12} className="text-brand-accent" />
                         {tag}
                     </span>
                 ))}
            </div>

            <p className="text-lg text-brand-mutedLight leading-relaxed mb-8 border-l-4 border-brand-accent pl-4 dark:border-brand-accent/50">
                {content.hero.subtitle}
            </p>

            {/* Pricing Block */}
            <div className="bg-brand-muted/5 border border-border dark:border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                <div className="flex items-end gap-3 mb-2">
                    <span className="text-4xl font-black text-foreground tracking-tight">{content.hero.pricing.price}</span>
                    <span className="text-lg text-brand-mutedLight font-medium mb-1.5">{content.hero.pricing.unit}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-brand-accent">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-accent"></span>
                    </span>
                    {content.hero.pricing.note}
                </div>
            </div>

            {/* Features List */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {content.hero.pricing.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className="shrink-0 w-5 h-5 rounded-full bg-brand-accent/10 flex items-center justify-center">
                            <Check size={12} className="text-brand-accent" />
                        </div>
                        {feature}
                    </div>
                ))}
            </div>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button href={TELEGRAM_LINK} variant="primary" className="flex-1 text-lg py-4 shadow-brand-accent/25 hover:shadow-brand-accent/40">
                    <ShoppingCart size={20} className="mr-2" />
                    {content.hero.ctaPrimary}
                </Button>
                <Button href="#product-details" variant="secondary" className="px-8">
                    {content.hero.ctaSecondary}
                </Button>
            </div>
            
            <div className="mt-4 text-xs text-center sm:text-start text-brand-mutedLight opacity-70">
                * {content.steps.securityDesc}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};