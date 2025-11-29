import React from 'react';
import { ABOUT_ME_LINK, CHANNEL_LINK, PROFILE_IMAGE_URL } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { Send, ExternalLink, ShieldCheck, BadgeCheck } from 'lucide-react';
import { Button } from './ui/Button';

export const Seller: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="seller" className="py-24 bg-background border-t border-border dark:border-white/5">
      <div className="container mx-auto px-6">
        
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-stretch">
                
                {/* Profile Card */}
                <div className="flex-1 bg-white dark:bg-brand-card border border-border dark:border-white/10 rounded-3xl p-1 overflow-hidden shadow-xl">
                    <div className="h-full bg-gradient-to-b from-transparent to-brand-muted/5 rounded-[20px] p-8 flex flex-col items-center text-center relative">
                        <div className="absolute top-4 right-4 text-brand-accent/20">
                            <ShieldCheck size={100} strokeWidth={0.5} />
                        </div>

                        {/* Avatar */}
                        <div className="relative mb-6">
                            <div className="w-32 h-32 rounded-full border-4 border-white dark:border-brand-dark shadow-2xl overflow-hidden relative z-10 bg-gray-200">
                                <img 
                                    src={PROFILE_IMAGE_URL} 
                                    alt={content.seller.name} 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Fallback if image fails
                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${content.seller.name}&background=10b981&color=fff&size=128`;
                                    }}
                                />
                            </div>
                            <div className="absolute bottom-1 right-1 z-20 bg-brand-accent text-white p-1.5 rounded-full ring-4 ring-white dark:ring-brand-card" title="Verified Seller">
                                <BadgeCheck size={16} fill="currentColor" className="text-white" />
                            </div>
                        </div>

                        <h3 className="text-2xl font-black text-foreground mb-1">{content.seller.name}</h3>
                        <p className="text-brand-accent font-bold text-sm uppercase tracking-wider mb-6">{content.seller.role}</p>

                        <p className="text-brand-mutedLight leading-relaxed mb-8 flex-grow">
                            {content.seller.bio}
                        </p>

                        <Button href={ABOUT_ME_LINK} variant="secondary" className="w-full">
                            {content.seller.cta} <ExternalLink size={16} className="ml-2" />
                        </Button>
                    </div>
                </div>

                {/* Telegram Card */}
                <div className="flex-1 relative group rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-[#229ED9] transition-transform duration-500 group-hover:scale-105"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                    
                    {/* Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                    <div className="relative h-full flex flex-col items-center justify-center p-10 text-center text-white">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-white/30 transform group-hover:-translate-y-2 transition-transform duration-300">
                            <Send size={40} className="ml-[-2px] mt-[2px]" />
                        </div>

                        <h3 className="text-2xl font-bold mb-2">{content.seller.channelTitle}</h3>
                        <p className="font-mono text-lg opacity-90 mb-8 dir-ltr">{content.seller.channelId}</p>

                        <div className="space-y-4 w-full max-w-xs">
                             <Button href={CHANNEL_LINK} className="w-full bg-white text-[#229ED9] hover:bg-white/90 font-bold border-none shadow-xl">
                                Join Channel
                             </Button>
                             <div className="text-xs opacity-70">
                                * برای اطلاع از تخفیف‌ها و آپدیت‌ها عضو شوید
                             </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};