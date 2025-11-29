import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Steps } from './components/Steps';
import { Seller } from './components/Seller';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Button } from './components/ui/Button';
import { TELEGRAM_LINK, CHANNEL_LINK } from './constants';
import { MessageCircle } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const MainContent: React.FC = () => {
    const { content } = useLanguage();
    
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-accent selection:text-white overflow-x-hidden">
            <Header />
            
            <main>
                <Hero />
                <Features />
                <Steps />
                <Seller />
                
                {/* Trust/Transparent section */}
                <section className="py-20 container mx-auto px-6">
                    <div className="bg-gradient-to-br from-brand-card/5 via-brand-card/10 to-transparent dark:from-white/5 dark:via-white/5 dark:to-transparent border border-border dark:border-white/10 rounded-3xl p-8 md:p-12 text-center md:text-start flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-4">{content.trust.title}</h2>
                            <ul className="space-y-3 text-brand-mutedLight text-sm font-medium">
                                {content.trust.items.map((item, i) => (
                                    <li key={i} className="flex items-center justify-center md:justify-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Button href={CHANNEL_LINK} variant="glass" className="bg-background/50 dark:bg-white/10 text-foreground dark:text-white">
                            {content.trust.cta}
                        </Button>
                    </div>
                </section>

                <FAQ />

                {/* Final CTA */}
                <section className="py-24 container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-black mb-6 text-foreground tracking-tight">{content.cta.title}</h2>
                    <p className="text-brand-mutedLight mb-8 max-w-lg mx-auto text-lg">
                        {content.cta.subtitle}
                    </p>
                    <Button href={TELEGRAM_LINK} variant="primary" className="px-12 text-lg">
                        {content.cta.button}
                    </Button>
                </section>
            </main>

            <Footer />

            {/* Mobile Floating CTA */}
            <div className="fixed bottom-6 left-6 right-6 z-40 md:hidden">
                <a 
                    href={TELEGRAM_LINK} 
                    className="flex items-center justify-center gap-3 w-full bg-brand-dark dark:bg-brand-accent text-white dark:text-brand-dark font-bold py-4 rounded-2xl shadow-2xl shadow-black/20"
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