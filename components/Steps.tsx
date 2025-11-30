import React from 'react';
import { STEPS_CONFIG } from '../constants';
import { Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

export const Steps: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="how" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground">{content.steps.title}</h2>
            <p className="text-brand-mutedLight text-xl">{content.steps.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent"></div>

          {STEPS_CONFIG.map((step, idx) => {
            const item = content.steps.items[step.titleKey];
            return (
                <motion.div 
                    key={step.id} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                    className="relative flex flex-col items-center text-center"
                >
                    {/* Icon Circle */}
                    <div className="w-24 h-24 rounded-full bg-white dark:bg-[#0B0F19] border-4 border-white/50 dark:border-white/10 shadow-xl flex items-center justify-center mb-6 relative z-10 group transition-transform hover:scale-105">
                        <div className="absolute inset-0 rounded-full bg-brand-accent/5 animate-pulse"></div>
                        <step.icon size={32} className="text-brand-accent" />
                        
                        {/* Number Badge */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-brand-accent to-brand-secondary text-white flex items-center justify-center font-bold text-sm border-2 border-background shadow-lg">
                            {step.id}
                        </div>
                    </div>
                    
                    {/* Content Card */}
                    <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/50 dark:border-white/5 rounded-2xl p-6 w-full hover:bg-white/80 dark:hover:bg-white/10 transition-colors shadow-sm hover:shadow-lg">
                        <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                        <p className="text-brand-mutedLight text-sm leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                </motion.div>
            );
          })}
        </div>

        {/* Security Badge */}
        <div className="mt-16 max-w-2xl mx-auto bg-brand-accent/5 border border-brand-accent/10 rounded-2xl p-6 flex items-center gap-4 text-start backdrop-blur-md shadow-lg shadow-brand-accent/5">
            <div className="p-3 bg-brand-accent/10 rounded-full text-brand-accent shrink-0 ring-1 ring-brand-accent/20">
                <Shield size={24} />
            </div>
            <div>
                <h4 className="font-bold text-foreground">{content.steps.securityTitle}</h4>
                <p className="text-brand-mutedLight text-sm mt-1">
                    {content.steps.securityDesc}
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};