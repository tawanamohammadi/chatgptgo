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
    <section id="faq" className="py-16 relative">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-8 text-[#fafafa] tracking-tight">{content.faq.title}</h2>

        <div className="space-y-3">
          {FAQS_CONFIG.map((faq, idx) => {
            const item = content.faq.items[faq.questionKey];
            const isActive = activeIndex === idx;
            return (
                <div 
                key={idx} 
                className={`transition-all duration-200 rounded-xl overflow-hidden border ${
                    isActive 
                    ? 'bg-[#141414] border-[#22c55e]/50 shadow-md shadow-[#22c55e]/10' 
                    : 'bg-[#141414] border-[#27272a] hover:bg-[#27272a] hover:border-[#22c55e]/30'
                } backdrop-blur-md`}
                >
                <button
                    onClick={() => toggleIndex(idx)}
                    className="w-full flex items-center justify-between p-5 text-start focus:outline-none"
                >
                    <span className={`font-bold text-base ${isActive ? 'text-[#22c55e]' : 'text-[#fafafa]'}`}>
                    {item.q}
                    </span>
                    <span className={`p-1.5 rounded-full transition-colors duration-200 ${isActive ? 'bg-[#22c55e] text-black' : 'text-[#71717a] bg-[#27272a]'}`}>
                    {isActive ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                </button>
                
                <AnimatePresence>
                    {isActive && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                    >
                        <div className="px-5 pb-5 pt-0 text-[#a1a1aa] text-sm leading-relaxed text-start font-medium">
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