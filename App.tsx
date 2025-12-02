import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Steps } from './components/Steps';
import { OrderForm } from './components/OrderForm';
import { Seller } from './components/Seller';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Button } from './components/ui/Button';
import { TELEGRAM_LINK } from './constants';
import { MessageCircle, ShoppingCart, Send } from 'lucide-react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const BackgroundWrapper: React.FC = () => {
    const { theme } = useTheme();
    return (
        <div className={`fixed inset-0 z-[-1] transition-colors duration-1000 ${theme === 'dark' ? 'mesh-bg' : 'light-mesh'}`} style={{ willChange: 'background-color' }}></div>
    );
};

const MainContent: React.FC = () => {
    const { content, language } = useLanguage();
    
    return (
        <div className="min-h-screen text-foreground font-sans selection:bg-[#22c55e] selection:text-black overflow-x-hidden relative">
            <BackgroundWrapper />
            
            <Header />
            
            <main>
                <Hero />
                <Features />
                <Steps />
                <OrderForm />
                <Seller />
                <FAQ />

                {/* Final CTA */}
                <section className="py-32 container mx-auto px-6 text-center">
                    <div className="bg-[#141414] backdrop-blur-2xl border border-[#27272a] rounded-[3rem] p-12 md:p-20 shadow-2xl relative overflow-hidden max-w-5xl mx-auto hover:border-[#22c55e]/30 transition-colors duration-200">
                        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-[#22c55e]/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black mb-6 text-[#fafafa] tracking-tight">{content.cta.title}</h2>
                            <p className="text-[#a1a1aa] mb-10 max-w-lg mx-auto text-xl font-light">
                                {content.cta.subtitle}
                            </p>
                            <Button href={TELEGRAM_LINK} variant="primary" className="px-12 py-4 text-lg rounded-full hover:scale-105 transition-transform duration-200">
                                {content.cta.button}
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            {/* Desktop Floating CTAs */}
            <div className="hidden md:block">
                {/* Order Button - Bottom Right */}
                <a 
                    href={TELEGRAM_LINK}
                    className="fixed bottom-8 end-8 z-50 flex items-center gap-2 bg-[#22c55e] text-black font-bold px-6 py-4 rounded-2xl shadow-2xl shadow-[#22c55e]/30 hover:bg-[#16a34a] transition-all duration-300 hover:scale-105 animate-bounce"
                    style={{ animationDuration: '2s' }}
                    aria-label="سفارش فوری"
                >
                    <ShoppingCart size={20} />
                    <span>{language === 'fa' ? 'سفارش فوری' : 'Order Now'}</span>
                </a>

                {/* Telegram Button - Bottom Left */}
                <a 
                    href={TELEGRAM_LINK}
                    className="fixed bottom-8 start-8 z-50 flex items-center gap-2 bg-[#0088cc] text-white font-bold px-5 py-4 rounded-2xl shadow-2xl shadow-[#0088cc]/30 hover:bg-[#0077b5] transition-all duration-300 hover:scale-105"
                    style={{ animation: 'bounce 3s ease-in-out infinite' }}
                    aria-label="تماس تلگرام"
                >
                    <Send size={20} />
                    <span>{language === 'fa' ? 'تلگرام' : 'Telegram'}</span>
                </a>
            </div>

            {/* Mobile Floating CTA */}
            <div className="fixed bottom-6 left-4 right-4 z-40 md:hidden">
                <a 
                    href={TELEGRAM_LINK} 
                    className="flex items-center justify-center gap-3 w-full bg-[#22c55e] text-black font-bold py-4 rounded-2xl shadow-2xl shadow-[#22c55e]/20 backdrop-blur-md hover:bg-[#16a34a] transition-colors duration-200 animate-pulse"
                    style={{ animationDuration: '2s' }}
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