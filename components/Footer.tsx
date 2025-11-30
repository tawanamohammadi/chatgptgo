import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { TELEGRAM_LINK } from '../constants';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const { content } = useLanguage();

  return (
    <footer className="relative border-t border-[#27272a] pt-12 pb-8 bg-[#0d0d0d]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 text-center md:text-start">
          <div>
            <div className="w-9 h-9 rounded-lg bg-[#22c55e] text-black flex items-center justify-center font-black text-lg shadow-lg shadow-[#22c55e]/30 mb-3 mx-auto md:mx-0 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-shadow duration-200">
                G
            </div>
            <p className="text-[#71717a] font-medium text-sm max-w-xs">{content.features.subtitle}</p>
          </div>
          
          <div className="flex gap-6 text-xs text-[#a1a1aa] font-semibold">
            <a href="#" className="hover:text-[#fafafa] transition-colors duration-200">{content.footer.links.terms}</a>
            <a href="#" className="hover:text-[#fafafa] transition-colors duration-200">{content.footer.links.privacy}</a>
            <a href={TELEGRAM_LINK} className="hover:text-[#fafafa] transition-colors duration-200">{content.footer.links.contact}</a>
          </div>
        </div>

        <div className="border-t border-[#27272a] pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] text-[#71717a] uppercase tracking-wider font-bold">
          <p>© {year} ChatGPT Go. All rights reserved.</p>
          <p className="opacity-60">Designed for Premium Users</p>
        </div>
      </div>
    </footer>
  );
};