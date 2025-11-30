import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { TELEGRAM_LINK } from '../constants';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const { content } = useLanguage();

  return (
    <footer className="relative border-t border-border dark:border-white/5 pt-16 pb-8 bg-white/30 dark:bg-black/20 backdrop-blur-lg">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12 text-center md:text-start">
          <div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent to-brand-secondary text-white flex items-center justify-center font-black text-xl shadow-lg shadow-brand-accent/30 mb-4 mx-auto md:mx-0">
                G
            </div>
            <p className="text-brand-mutedLight font-medium max-w-xs">{content.features.subtitle}</p>
          </div>
          
          <div className="flex gap-8 text-sm text-foreground font-semibold">
            <a href="#" className="hover:text-brand-accent transition-colors opacity-70 hover:opacity-100">{content.footer.links.terms}</a>
            <a href="#" className="hover:text-brand-accent transition-colors opacity-70 hover:opacity-100">{content.footer.links.privacy}</a>
            <a href={TELEGRAM_LINK} className="hover:text-brand-accent transition-colors opacity-70 hover:opacity-100">{content.footer.links.contact}</a>
          </div>
        </div>

        <div className="border-t border-black/5 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-mutedLight">
          <p>© {year} PanbeNet. All rights reserved.</p>
          <p className="opacity-50">Designed for Premium Users</p>
        </div>
      </div>
    </footer>
  );
};