import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-24 end-6 z-40 p-4 rounded-full bg-[#22c55e] text-black shadow-xl shadow-[#22c55e]/30 hover:bg-[#16a34a] hover:scale-110 transition-all duration-300 md:bottom-8"
            aria-label="Scroll to top"
        >
            <ArrowUp size={24} strokeWidth={2.5} />
        </button>
    );
};
