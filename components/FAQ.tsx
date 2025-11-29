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
    <section id="faq" className="py-24 bg-background dark:bg-brand-card/30">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">{content.faq.title}</h2>

        <div className="space-y-4">
          {FAQS_CONFIG.map((faq, idx) => {
            const item = content.faq.items[faq.questionKey];
            return (
                <div 
                key={idx} 
                className={`border transition-all duration-300 rounded-2xl overflow-hidden ${
                    activeIndex === idx 
                    ? 'bg-white dark:bg-brand-card border-brand-accent/50 shadow-lg' 
                    : 'bg-white/50 dark:bg-white/5 border-border dark:border-white/5 hover:border-brand-muted/30'
                }`}
                >
                <button
                    onClick={() => toggleIndex(idx)}
                    className="w-full flex items-center justify-between p-6 text-start focus:outline-none"
                >
                    <span className={`font-bold text-lg ${activeIndex === idx ? 'text-brand-accent' : 'text-foreground'}`}>
                    {item.q}
                    </span>
                    <span className={`p-2 rounded-full transition-colors ${activeIndex === idx ? 'bg-brand-accent text-white' : 'bg-brand-muted/10 text-brand-mutedLight'}`}>
                    {activeIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                </button>
                
                <AnimatePresence>
                    {activeIndex === idx && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 pb-6 pt-0 text-brand-mutedLight leading-relaxed border-t border-dashed border-border dark:border-white/10 mt-2 pt-4">
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