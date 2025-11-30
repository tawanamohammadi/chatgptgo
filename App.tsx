import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Steps } from './components/Steps';
import { Seller } from './components/Seller';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Button } from './components/ui/Button';
import { TELEGRAM_LINK } from './constants';
import { MessageCircle } from 'lucide-react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const BackgroundWrapper: React.FC = () => {
    const { theme } = useTheme();
    return (
        <div className={`fixed inset-0 z-[-1] transition-colors duration-1000 ${theme === 'dark' ? 'mesh-bg' : 'light-mesh'}`}></div>
    );
};

const MainContent: React.FC = () => {
    const { content } = useLanguage();
    
    return (
        <div className="min-h-screen text-foreground font-sans selection:bg-brand-accent selection:text-white overflow-x-hidden relative">
            <BackgroundWrapper />
            
            <Header />
            
            <main>
                <Hero />
                <Features />
                <Steps />
                <Seller />
                <FAQ />

                {/* Final CTA */}
                <section className="py-32 container mx-auto px-6 text-center">
                    <div className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden max-w-5xl mx-auto">
                        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-brand-accent/20 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground tracking-tight">{content.cta.title}</h2>
                            <p className="text-brand-mutedLight mb-10 max-w-lg mx-auto text-xl font-light">
                                {content.cta.subtitle}
                            </p>
                            <Button href={TELEGRAM_LINK} variant="primary" className="px-12 py-4 text-lg rounded-full">
                                {content.cta.button}
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            {/* Mobile Floating CTA */}
            <div className="fixed bottom-6 left-4 right-4 z-40 md:hidden">
                <a 
                    href={TELEGRAM_LINK} 
                    className="flex items-center justify-center gap-3 w-full bg-brand-dark dark:bg-brand-accent text-white dark:text-brand-dark font-bold py-4 rounded-2xl shadow-2xl shadow-black/20 backdrop-blur-md"
                >
                    <MessageCircle size={20} />
                    {content.cta.button}
                </a>
            </div>
        </div>
    );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
        <LanguageProvider>
             <MainContent />
        </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;