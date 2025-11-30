import React from 'react';
import { FEATURES_CONFIG } from '../constants';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export const Features: React.FC = () => {
  const { content } = useLanguage();

  // Helper to determine span classes for Bento Grid effect
  const getBentoClass = (index: number) => {
    switch(index) {
        case 0: return "md:col-span-2 md:row-span-2"; // Large feature
        case 3: return "md:col-span-2"; // Wide feature
        default: return "md:col-span-1"; // Standard feature
    }
  };

  return (
    <section id="features" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-start">
            <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground tracking-tighter leading-tight">{content.features.title}</h2>
                <p className="text-brand-mutedLight text-xl md:text-2xl font-light">{content.features.subtitle}</p>
            </div>
            {/* Decoration Line */}
            <div className="hidden md:block h-[2px] flex-1 bg-gradient-to-r from-brand-accent/30 to-transparent mb-10 ms-10 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {FEATURES_CONFIG.map((feature, idx) => {
             const itemContent = content.features.items[feature.titleKey];
             const bentoClass = getBentoClass(idx);
             const isLarge = idx === 0;
             
             return (
                <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`
                    group relative bg-white/60 dark:bg-[#0B0F19]/60 backdrop-blur-2xl 
                    border border-white/80 dark:border-white/5 rounded-[2rem] 
                    hover:-translate-y-1 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-brand-accent/10 overflow-hidden
                    flex flex-col text-start
                    ${bentoClass}
                    ${isLarge ? 'p-8 md:p-10' : 'p-6 md:p-8'}
                `}
                >
                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/0 via-transparent to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="relative z-10 h-full flex flex-col">
                        <div className={`
                            rounded-2xl bg-gradient-to-br from-brand-accent/10 to-brand-secondary/5 border border-brand-accent/20 
                            flex items-center justify-center text-brand-accent mb-auto group-hover:scale-110 transition-transform duration-500
                            ${isLarge ? 'w-20 h-20 mb-8' : 'w-14 h-14 mb-6'}
                        `}>
                            <feature.icon size={isLarge ? 40 : 24} />
                        </div>
                        
                        <div className="mt-auto">
                            <h3 className={`font-bold text-foreground mb-3 ${isLarge ? 'text-3xl' : 'text-xl'}`}>
                                {itemContent.title}
                            </h3>
                            <p className={`text-brand-mutedLight leading-relaxed ${isLarge ? 'text-lg' : 'text-sm'}`}>
                                {itemContent.desc}
                            </p>
                        </div>
                    </div>
                </motion.div>
             );
          })}
        </div>
      </div>
    </section>
  );
};