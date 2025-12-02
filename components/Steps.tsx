import React from 'react';
import { STEPS_CONFIG } from '../constants';
import { Shield, ArrowRight, ArrowDown, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

export const Steps: React.FC = () => {
  const { content, dir } = useLanguage();

  return (
    <section id="how" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#22c55e]/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-bold mb-4 uppercase tracking-wider">
                <Clock size={14} />
                فرآیند ساده
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-white tracking-tight">{content.steps.title}</h2>
            <p className="text-[#d4d4d8] text-base md:text-lg max-w-xl">{content.steps.subtitle}</p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
            {/* Desktop Connecting Line */}
            <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-[#22c55e]/20 via-[#22c55e]/60 to-[#22c55e]/20 rounded-full z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#22c55e] to-transparent animate-pulse opacity-50"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS_CONFIG.map((step, idx) => {
                const item = content.steps.items[step.titleKey];
                return (
                    <motion.div 
                        key={step.id} 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15, duration: 0.5 }}
                        className="relative flex flex-col items-center text-center group"
                    >
                        {/* Step Number & Icon */}
                        <div className="relative z-10 mb-6">
                            {/* Outer Glow Ring */}
                            <div className="absolute inset-0 -m-2 rounded-3xl bg-[#22c55e]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                            
                            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#141414] to-[#0a0a0a] backdrop-blur-xl border border-[#27272a] shadow-xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 group-hover:border-[#22c55e]/50 group-hover:shadow-[0_0_30px_rgba(34,197,94,0.2)] relative overflow-hidden">
                                {/* Background Pattern */}
                                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_45%,rgba(34,197,94,0.03)_45%,rgba(34,197,94,0.03)_55%,transparent_55%)] bg-[length:10px_10px]"></div>
                                
                                <step.icon size={36} className="text-[#71717a] group-hover:text-[#22c55e] transition-colors duration-300 relative z-10" strokeWidth={1.5} />
                                
                                {/* Step Number Badge */}
                                <div className="absolute -top-3 -start-3 w-10 h-10 rounded-xl bg-gradient-to-br from-[#22c55e] to-[#16a34a] text-black flex items-center justify-center font-black text-lg shadow-lg shadow-[#22c55e]/30 rotate-12 group-hover:rotate-0 transition-transform duration-300">
                                    {step.id}
                                </div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="px-2 max-w-[220px]">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#22c55e] transition-colors duration-300">
                                {item.title}
                            </h3>
                            <p className="text-[#a1a1aa] text-sm leading-relaxed font-medium">
                                {item.desc}
                            </p>
                        </div>

                        {/* Mobile/Tablet Connector */}
                        {idx !== STEPS_CONFIG.length - 1 && (
                            <div className="lg:hidden mt-6 text-[#22c55e]/40">
                                <ArrowDown size={24} className="animate-bounce" />
                            </div>
                        )}
                    </motion.div>
                );
            })}
            </div>
        </div>

        {/* Security Box */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 mx-auto max-w-2xl"
        >
            <div className="bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-[#27272a] rounded-2xl p-6 flex items-center gap-5 backdrop-blur-sm shadow-xl hover:border-[#22c55e]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                <div className="p-4 bg-[#22c55e]/10 rounded-xl text-[#22c55e] shadow-lg border border-[#22c55e]/20">
                    <Shield size={28} />
                </div>
                <div className="text-start flex-1">
                    <h4 className="font-bold text-lg text-white mb-1">{content.steps.securityTitle}</h4>
                    <p className="text-sm text-[#a1a1aa] leading-relaxed">{content.steps.securityDesc}</p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-xs font-bold text-[#22c55e] bg-[#22c55e]/10 px-4 py-2 rounded-full border border-[#22c55e]/20">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
                    </span>
                    {content.steps.supportStatus}
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
};