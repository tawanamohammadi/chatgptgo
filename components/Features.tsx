import React from 'react';
import { FEATURES_CONFIG } from '../constants';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export const Features: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="features" className="py-24 bg-background dark:bg-brand-dark relative border-t border-border dark:border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{content.features.title}</h2>
          <p className="text-brand-mutedLight text-lg">{content.features.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_CONFIG.map((feature, idx) => {
             const itemContent = content.features.items[feature.titleKey];
             return (
                <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-brand-card border border-border dark:border-white/5 hover:border-brand-accent/50 p-6 rounded-2xl transition-all shadow-sm hover:shadow-xl group"
                >
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-5 text-brand-accent group-hover:scale-110 transition-transform duration-300">
                    <feature.icon size={24} />
                </div>
                <h3 className="text-lg font-bold mb-3 text-foreground">{itemContent.title}</h3>
                <p className="text-brand-mutedLight text-sm leading-relaxed">{itemContent.desc}</p>
                </motion.div>
             );
          })}
        </div>
      </div>
    </section>
  );
};