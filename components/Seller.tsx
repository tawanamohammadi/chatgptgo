import React from 'react';
import { ABOUT_ME_LINK, CHANNEL_LINK, PROFILE_IMAGE_URL, TRUST_CHANNEL_LINK } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { Send, ExternalLink, BadgeCheck, MapPin, Sparkles, Users } from 'lucide-react';
import { Button } from './ui/Button';

export const Seller: React.FC = () => {
  const { content } = useLanguage();

  return (
    <section id="seller" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Section Header - Editorial Style */}
        <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-6">
             <div>
                <h2 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Sparkles size={14} /> Official Representative
                </h2>
                <h3 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">Community & Profile</h3>
             </div>
             <div className="hidden md:block text-end">
                <div className="text-2xl font-black text-white">10K+</div>
                <div className="text-xs text-brand-muted uppercase tracking-wider">Active Members</div>
             </div>
        </div>

        {/* Blog / Artist Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 1. Large Banner (Community) - Spans full width on mobile, 8 cols on desktop */}
            <div className="lg:col-span-8 relative group rounded-[2.5rem] overflow-hidden min-h-[400px] md:min-h-[500px] flex items-end">
                {/* Background Image */}
                <div className="absolute inset-0 bg-[#121212]">
                     <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 via-[#121212] to-brand-secondary/20"></div>
                     {/* Abstract shapes */}
                     <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
                </div>

                <div className="relative z-10 p-8 md:p-12 w-full">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold text-white mb-6 uppercase tracking-wider">
                        <Users size={12} /> The Network
                     </div>
                     <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-none tracking-tight">
                        Join the <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-secondary">Future of AI.</span>
                     </h2>
                     <p className="text-brand-muted text-lg max-w-xl mb-8 leading-relaxed">
                        Get exclusive access to AI news, discounts, and 24/7 support. Join thousands of happy users in our verified community.
                     </p>
                     
                     <div className="flex flex-wrap gap-4">
                        <a href={CHANNEL_LINK} className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#229ED9] text-white font-bold text-lg hover:bg-[#1e8dbf] transition-colors shadow-lg shadow-[#229ED9]/20">
                            <Send size={20} /> Telegram Channel
                        </a>
                        <a href={TRUST_CHANNEL_LINK} className="flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-white font-bold text-lg border border-white/10 hover:bg-white/20 transition-all">
                            <Users size={20} /> Trust & Reviews
                        </a>
                     </div>
                </div>
            </div>

            {/* 2. Profile Card (Artist Style) - Moved to side/bottom, 4 cols */}
            <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="h-full bg-[#18181b] rounded-[2.5rem] p-2 border border-white/5 relative overflow-hidden group">
                     {/* Image Container */}
                     <div className="h-64 w-full rounded-[2rem] overflow-hidden relative mb-4">
                        <img 
                            src={PROFILE_IMAGE_URL} 
                            alt={content.seller.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#18181b] via-transparent to-transparent"></div>
                        
                        {/* Verify Badge on Image */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                            <BadgeCheck size={14} className="text-[#1db954]" fill="currentColor" color="#000" />
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Verified</span>
                        </div>
                     </div>

                     <div className="px-6 pb-6 text-center lg:text-start">
                        <h3 className="text-2xl font-black text-white mb-1">{content.seller.name}</h3>
                        <p className="text-sm font-bold text-brand-muted mb-4">{content.seller.role}</p>
                        
                        <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/5 text-xs text-brand-muted leading-relaxed font-medium">
                            {content.seller.bio}
                        </div>

                        <Button href={ABOUT_ME_LINK} variant="secondary" className="w-full rounded-2xl py-4 text-sm bg-white text-black hover:bg-gray-200 border-none">
                            {content.seller.cta} <ExternalLink size={16} className="ms-2" />
                        </Button>
                     </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};