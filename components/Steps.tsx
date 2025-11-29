import React from 'react';
import { STEPS_CONFIG } from '../constants';
import { Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Steps: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="how" className="py-24 relative overflow-hidden bg-background">
      {/* Subtle background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-brand-accent/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="w-full md:w-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground text-center md:text-start">{content.steps.title}</h2>
                <p className="text-brand-mutedLight max-w-xl text-center md:text-start">{content.steps.subtitle}</p>
            </div>
            
            <div className="hidden md:flex items-center gap-2 text-brand-mutedLight text-sm border border-border dark:border-white/10 px-4 py-2 rounded-lg bg-white dark:bg-brand-card shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                {content.steps.supportStatus}
            </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS_CONFIG.map((step, idx) => {
            const item = content.steps.items[step.titleKey];
            return (
                <div key={step.id} className="relative group bg-white dark:bg-brand-card border border-border dark:border-white/5 p-6 rounded-2xl hover:border-brand-accent/50 transition-all duration-300 hover:shadow-lg">
                    <div className="absolute top-4 right-4 text-6xl font-black text-brand-muted/5 select-none pointer-events-none">
                        {step.id}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-brand-accent/10 text-brand-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <step.icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-brand-mutedLight text-sm leading-relaxed">
                        {item.desc}
                    </p>
                </div>
            );
          })}
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-50 to-white dark:from-brand-card dark:to-brand-card/50 border border-blue-100 dark:border-white/10 rounded-2xl p-6 flex items-start gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400 hidden md:block">
                <Shield size={24} />
            </div>
            <div>
                <h4 className="font-bold text-foreground mb-2">{content.steps.securityTitle}</h4>
                <p className="text-brand-mutedLight text-sm leading-relaxed">
                    {content.steps.securityDesc}
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};