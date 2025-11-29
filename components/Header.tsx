import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Languages, ShoppingBag } from 'lucide-react';
import { NAV_LINKS, TELEGRAM_LINK } from '../constants';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { content, toggleLanguage, language } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-background/80 dark:bg-brand-dark/80 backdrop-blur-xl border-border dark:border-white/10 shadow-sm py-3' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer select-none">
          <div className="w-10 h-10 rounded-xl bg-foreground text-background flex items-center justify-center font-black text-xl shadow-lg">
            G
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight tracking-wide text-foreground">PanbeNet</span>
            <span className="text-[10px] uppercase tracking-wider text-brand-mutedLight font-semibold">Premium Store</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
                <a
                key={link.key}
                href={link.href}
                className="text-sm font-medium text-brand-mutedLight hover:text-foreground transition-colors relative group"
                >
                {content.nav[link.key]}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all group-hover:w-full"></span>
                </a>
            ))}
            </nav>
            
            <div className="w-px h-6 bg-border dark:bg-white/10 mx-2"></div>

            {/* Actions */}
            <div className="flex items-center gap-3">
                <button 
                    onClick={toggleLanguage}
                    className="p-2 rounded-full hover:bg-brand-muted/10 transition-colors text-brand-mutedLight"
                >
                    <span className="font-bold text-xs">{language === 'fa' ? 'EN' : 'فا'}</span>
                </button>
                <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-brand-muted/10 transition-colors text-brand-mutedLight"
                >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                
                <a 
                  href={TELEGRAM_LINK}
                  className="ml-2 flex items-center gap-2 bg-brand-accent text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-brand-accentHover transition-colors shadow-lg shadow-brand-accent/20"
                >
                  <ShoppingBag size={16} />
                  <span className="hidden lg:inline">{content.hero.ctaPrimary.split(' ')[0]}</span>
                </a>
            </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
            <a href={TELEGRAM_LINK} className="p-2 text-foreground">
                <ShoppingBag size={20} />
            </a>
            <button 
            className="p-2 text-foreground/80 hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
            {mobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border dark:border-white/10 shadow-xl"
          >
            <nav className="flex flex-col p-6 gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-foreground text-lg font-medium border-b border-border/50 dark:border-white/5 pb-2"
                >
                  {content.nav[link.key]}
                </a>
              ))}
              
              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-4">
                    <button onClick={toggleTheme} className="flex items-center gap-2 text-brand-mutedLight">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>
                <button onClick={toggleLanguage} className="font-bold text-brand-mutedLight">
                    {language === 'fa' ? 'English' : 'فارسی'}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};