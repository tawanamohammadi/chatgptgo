import React, { useState } from 'react';
import { FAQS_CONFIG } from '../constants';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const { content } = useLanguage();

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-4xl font-black text-center mb-12 text-foreground tracking-tight">{content.faq.title}</h2>

        <div className="space-y-4">
          {FAQS_CONFIG.map((faq, idx) => {
            const item = content.faq.items[faq.questionKey];
            const isActive = activeIndex === idx;
            return (
                <div 
                key={idx} 
                className={`transition-all duration-300 rounded-2xl overflow-hidden border ${
                    isActive 
                    ? 'bg-white/80 dark:bg-white/10 border-brand-accent/30 shadow-lg scale-[1.02]' 
                    : 'bg-white/40 dark:bg-white/5 border-white/50 dark:border-white/5 hover:bg-white/60'
                } backdrop-blur-md`}
                >
                <button
                    onClick={() => toggleIndex(idx)}
                    className="w-full flex items-center justify-between p-6 text-start focus:outline-none"
                >
                    <span className={`font-bold text-lg ${isActive ? 'text-brand-accent' : 'text-foreground'}`}>
                    {item.q}
                    </span>
                    <span className={`p-2 rounded-full transition-colors ${isActive ? 'bg-brand-accent text-white' : 'text-brand-mutedLight'}`}>
                    {isActive ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                </button>
                
                <AnimatePresence>
                    {isActive && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                    >
                        <div className="px-6 pb-6 pt-0 text-brand-mutedLight leading-relaxed text-start">
                        {item.a}
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>
                </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};