import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { TELEGRAM_LINK } from '../constants';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const { content } = useLanguage();

  return (
    <footer className="bg-background dark:bg-brand-dark border-t border-border dark:border-white/5 pt-16 pb-8 text-center md:text-start">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div>
            <div className="text-2xl font-black text-foreground mb-2">PanbeNet</div>
            <p className="text-brand-mutedLight text-sm">{content.features.subtitle}</p>
          </div>
          
          <div className="flex gap-6 text-sm text-brand-mutedLight font-medium">
            <a href="#" className="hover:text-brand-accent transition-colors">{content.footer.links.terms}</a>
            <a href="#" className="hover:text-brand-accent transition-colors">{content.footer.links.privacy}</a>
            <a href={TELEGRAM_LINK} className="hover:text-brand-accent transition-colors">{content.footer.links.contact}</a>
          </div>
        </div>

        <div className="border-t border-border dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-mutedLight/60">
          <p>© {year} PanbeNet — Tawana Network | TavanaProxy. {content.footer.rights}</p>
          <p className="font-mono opacity-50">{content.footer.slogan}</p>
        </div>
      </div>
    </footer>
  );
};