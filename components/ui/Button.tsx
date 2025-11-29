import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass';
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
  const baseStyles = "inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold transition-all duration-300 transform active:scale-95 text-sm md:text-base";
  
  const variants = {
    primary: "bg-brand-dark dark:bg-brand-accent text-white dark:text-brand-dark shadow-xl shadow-brand-dark/20 dark:shadow-brand-accent/20 hover:-translate-y-1 hover:shadow-2xl",
    secondary: "bg-white dark:bg-white/5 border border-border dark:border-white/10 text-foreground hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20",
    glass: "backdrop-blur-md bg-white/20 border border-white/30 text-foreground dark:text-white hover:bg-white/30"
  };

  const content = (
    <>
      {children}
      {showIcon && <ArrowUpRight size={18} className={dir === 'rtl' ? 'rotate-180' : ''} />}
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