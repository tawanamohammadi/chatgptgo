import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost';
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
  
  // Base styles with logical padding
  const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 transform active:scale-95 text-sm md:text-base relative overflow-hidden group";
  
  const variants = {
    // New Gradient: Indigo -> Violet
    primary: "bg-gradient-to-r from-brand-accent to-brand-secondary text-white shadow-lg shadow-brand-accent/25 hover:shadow-xl hover:shadow-brand-accent/40 hover:-translate-y-0.5 border border-transparent",
    
    secondary: "bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-foreground hover:bg-gray-50 dark:hover:bg-white/10",
    
    // Glass with Blue Tint
    glass: "backdrop-blur-md bg-white/40 dark:bg-brand-accent/10 border border-white/50 dark:border-white/10 text-foreground dark:text-white shadow-lg hover:bg-white/50 dark:hover:bg-brand-accent/20",
    
    ghost: "bg-transparent text-brand-mutedLight hover:text-brand-accent"
  };

  const content = (
    <>
      {/* Shine effect for primary/glass */}
      {(variant === 'primary' || variant === 'glass') && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {/* Logical icon rotation based on direction */}
        {showIcon && (
            <ArrowUpRight 
                size={18} 
                className={`transition-transform duration-300 ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} 
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