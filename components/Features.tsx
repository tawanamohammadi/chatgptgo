import React, { useState } from 'react';
import { FEATURES_CONFIG } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Plus, Minus, ArrowUpRight, Sparkles, Info } from 'lucide-react';

export const Features: React.FC = () => {
  const { content } = useLanguage();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const toggleFeature = (idx: number) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  return (
    <section id="features" className="py-16 md:py-24 relative z-10">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#22c55e]/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-bold mb-4 uppercase tracking-wider">
                <Sparkles size={14} />
                ویژگی‌های انحصاری
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-white tracking-tight">
                {content.features.title}
            </h2>
            <p className="text-[#d4d4d8] text-base md:text-lg font-medium max-w-2xl mx-auto">
                {content.features.subtitle}
            </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {FEATURES_CONFIG.map((feature, idx) => {
             const itemContent = content.features.items[feature.titleKey];
             const isActive = activeIdx === idx;
             
             return (
                <motion.div
                    key={idx}
                    layout
                    onClick={() => toggleFeature(idx)}
                    className={`
                        relative overflow-hidden cursor-pointer group rounded-2xl border transition-all duration-300
                        ${isActive 
                            ? 'bg-gradient-to-br from-[#141414] to-[#0a0a0a] border-[#22c55e]/50 shadow-[0_0_40px_rgba(34,197,94,0.2)] ring-1 ring-[#22c55e]/30' 
                            : 'bg-[#141414] border-[#27272a] hover:bg-[#1a1a1a] hover:border-[#22c55e]/40 hover:-translate-y-1 hover:shadow-2xl'
                        }
                        backdrop-blur-xl
                    `}
                >
                    {/* Gradient Glow on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-[#22c55e]/10 via-transparent to-[#16a34a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${isActive ? 'opacity-100' : ''}`} />

                    {/* Click Hint */}
                    {!isActive && (
                        <div className="absolute top-3 end-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="flex items-center gap-1 text-[10px] text-[#71717a] bg-[#0a0a0a]/80 px-2 py-1 rounded-full border border-[#27272a]">
                                <Info size={10} /> کلیک کنید
                            </div>
                        </div>
                    )}

                    <div className="p-6 flex flex-col h-full relative z-10">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                {/* Enhanced Icon Box */}
                                <div className={`
                                    relative p-4 rounded-xl transition-all duration-300
                                    ${isActive 
                                        ? 'bg-[#22c55e] text-black shadow-lg shadow-[#22c55e]/40 scale-110' 
                                        : 'bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 text-[#22c55e] group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#22c55e]/20'
                                    }
                                `}>
                                    {/* Glow Ring */}
                                    <div className={`absolute inset-0 rounded-xl border-2 transition-all duration-300 ${isActive ? 'border-[#22c55e]/50 animate-pulse' : 'border-transparent'}`} />
                                    <feature.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                </div>
                                
                                <div className="flex flex-col">
                                    <h3 className={`font-bold text-lg transition-colors duration-200 ${isActive ? 'text-[#22c55e]' : 'text-white'}`}>
                                        {itemContent.title}
                                    </h3>
                                    {!isActive && (
                                        <p className="text-xs text-[#71717a] mt-0.5 line-clamp-1 max-w-[160px]">
                                            {itemContent.desc}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Toggle Indicator */}
                            <div className={`transition-all duration-300 flex-shrink-0 ${isActive ? 'rotate-180 text-[#22c55e] bg-[#22c55e]/20 rounded-full p-1.5' : 'text-[#71717a] p-1.5'}`}>
                                {isActive ? <Minus size={18} /> : <Plus size={18} />}
                            </div>
                        </div>
                        
                        <AnimatePresence>
                            {isActive && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                    animate={{ height: 'auto', opacity: 1, marginTop: 20 }}
                                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className="text-sm text-[#d4d4d8] leading-relaxed border-t border-[#27272a] pt-4">
                                        {itemContent.desc}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
             );
          })}
        </div>
      </div>
    </section>
  );
};