import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost' | 'neon';
  href?: string;
  showIcon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  href, 
  showIcon = false, 
  className = '',
  ...props 
}) => {
  const { dir } = useLanguage();
  
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold transition-all duration-200 transform active:scale-95 text-sm md:text-base relative overflow-hidden group tracking-wide";
  
  const variants = {
    // Modern Green Primary
    primary: "bg-[#22c55e] hover:bg-[#16a34a] text-black shadow-[0_0_20px_-5px_rgba(34,197,94,0.5)] hover:shadow-[0_0_30px_-5px_rgba(22,163,74,0.6)] hover:-translate-y-0.5 border border-transparent",
    
    // High contrast dark/light
    secondary: "bg-[#0a0a0a] dark:bg-[#fafafa] text-[#fafafa] dark:text-[#0a0a0a] border border-transparent hover:bg-[#141414] dark:hover:bg-[#f5f5f5]",
    
    // Neon Outline (Modern Green)
    neon: "bg-transparent border-2 border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e] hover:text-black shadow-[0_0_15px_-5px_#22c55e]",

    // Subtle Glass
    glass: "backdrop-blur-xl bg-[#141414] border border-[#27272a] text-[#fafafa] shadow-lg hover:bg-[#27272a] hover:border-[#22c55e]/30",
    
    ghost: "bg-transparent text-[#a1a1aa] hover:text-[#fafafa]"
  };

  const content = (
    <>
      {/* Shine effect for primary */}
      {(variant === 'primary') && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent z-0" />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {showIcon && (
            <ArrowUpRight 
                size={18} 
                className={`transition-transform duration-200 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} 
            />
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        target={href.startsWith('http') ? "_blank" : "_self"} 
        rel="noopener noreferrer"
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {content}
    </button>
  );
};