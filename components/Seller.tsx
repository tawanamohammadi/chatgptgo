import React from 'react';
import { ABOUT_ME_LINK, CHANNEL_LINK, PROFILE_IMAGE_URL } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { Send, ExternalLink, CheckCircle2, BadgeCheck, MapPin } from 'lucide-react';
import { Button } from './ui/Button';

export const Seller: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="seller" className="py-32 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute right-0 top-1/2 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-center">
            
            {/* Luxury ID Card */}
            <div className="relative group perspective-1000 order-1">
                {/* Glow behind card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent via-brand-secondary to-brand-tertiary rounded-[2.5rem] blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                
                <div className="relative h-full bg-white dark:bg-[#0B0F19] border border-white/20 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col text-start">
                    
                    {/* Header Image / Pattern */}
                    <div className="h-32 w-full bg-[#020617] relative overflow-hidden">
                         <div className="absolute inset-0 opacity-50" 
                              style={{ 
                                  backgroundImage: `url(${PROFILE_IMAGE_URL})`, 
                                  backgroundSize: 'cover', 
                                  backgroundPosition: 'center',
                                  filter: 'blur(30px) saturate(1.5)'
                              }}>
                         </div>
                         <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/20 to-white dark:to-[#0B0F19]"></div>
                    </div>

                    <div className="px-10 pb-10 flex-1 flex flex-col relative">
                        {/* Avatar */}
                        <div className="relative -mt-16 mb-6 inline-block self-start">
                            <div className="w-32 h-32 rounded-full p-1.5 bg-white dark:bg-[#0B0F19]">
                                <img 
                                    src={PROFILE_IMAGE_URL} 
                                    alt={content.seller.name} 
                                    className="w-full h-full rounded-full object-cover border-4 border-gray-100 dark:border-white/5"
                                />
                            </div>
                            {/* Verification Badge */}
                            <div className="absolute bottom-2 end-2 bg-brand-accent text-white p-1.5 rounded-full ring-4 ring-white dark:ring-[#0B0F19] shadow-lg">
                                <BadgeCheck size={18} fill="currentColor" className="text-white" />
                            </div>
                        </div>

                        {/* Name & Role */}
                        <div className="mb-6">
                            <h3 className="text-3xl font-black text-foreground mb-1">{content.seller.name}</h3>
                            <p className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-secondary uppercase tracking-wider mb-1" dir="ltr">{content.seller.role}</p>
                            <div className="flex items-center gap-1.5 text-xs text-brand-mutedLight">
                                <MapPin size={12} className="text-brand-accent" />
                                <span dir="ltr">Kurdistan, Iran (Remote / Global)</span>
                            </div>
                        </div>

                        {/* Bio */}
                        <p className="text-brand-mutedLight leading-relaxed text-sm mb-8 flex-1">
                            {content.seller.bio}
                        </p>

                        {/* Actions */}
                        <div className="mt-auto pt-8 border-t border-gray-100 dark:border-white/5 flex gap-4">
                            <Button href={ABOUT_ME_LINK} variant="primary" className="flex-1 rounded-xl text-sm py-3 shadow-brand-accent/20">
                                {content.seller.cta}
                                <ExternalLink size={14} className="ms-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust & Community Text */}
            <div className="flex flex-col gap-6 justify-center text-start order-2">
                <div className="inline-flex self-start items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent text-sm font-bold uppercase tracking-wider border border-brand-accent/10">
                    <CheckCircle2 size={16} />
                    {content.seller.title}
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-black text-foreground tracking-tight">
                    Connecting Humans & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-secondary">AI Technology</span>.
                </h2>
                
                <p className="text-xl text-brand-mutedLight font-light">
                    Join the PanbeNet community for the latest updates on AI transparency, ethical guidelines, and premium service access.
                </p>

                {/* Telegram Card Small */}
                <div className="mt-8 bg-gradient-to-r from-brand-accent to-brand-secondary rounded-3xl p-[1px] shadow-2xl shadow-brand-accent/20">
                    <div className="bg-white/10 dark:bg-[#0B0F19]/90 backdrop-blur-md rounded-[1.4rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="bg-brand-accent/10 p-3 rounded-full text-brand-accent border border-brand-accent/20">
                                <Send size={24} className="mt-[2px] ms-[-2px]" />
                            </div>
                            <div className="text-foreground text-start">
                                <div className="font-bold text-lg">{content.seller.channelTitle}</div>
                                <div className="opacity-70 font-mono text-sm text-brand-mutedLight" dir="ltr">{content.seller.channelId}</div>
                            </div>
                        </div>
                        <Button href={CHANNEL_LINK} variant="secondary" className="text-sm w-full sm:w-auto border-brand-accent/20 dark:bg-white/5 dark:hover:bg-white/10">
                            Join Now
                        </Button>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};