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
        <div className="flex items-end justify-between mb-8 border-b border-[#27272a] pb-6">
             <div>
                <h2 className="text-sm font-bold text-[#22c55e] uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Sparkles size={14} /> Official Representative
                </h2>
                <h3 className="text-3xl md:text-5xl font-black text-[#fafafa] tracking-tight">Community & Profile</h3>
             </div>
             <div className="hidden md:block text-end">
                <div className="text-2xl font-black text-[#22c55e]">10K+</div>
                <div className="text-xs text-[#71717a] uppercase tracking-wider">Active Members</div>
             </div>
        </div>

        {/* Blog / Artist Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 1. Large Banner (Community) - Spans full width on mobile, 8 cols on desktop */}
            <div className="lg:col-span-8 relative group rounded-[2.5rem] overflow-hidden min-h-[400px] md:min-h-[500px] flex items-end">
                {/* Background Image */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#22c55e]/20 to-[#0d0d0d]">
                     <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/10 via-[#0d0d0d] to-[#16a34a]/10"></div>
                     {/* Abstract shapes */}
                     <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22c55e]/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
                </div>

                <div className="relative z-10 p-8 md:p-12 w-full">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414]/80 backdrop-blur-md border border-[#27272a] text-xs font-bold text-[#fafafa] mb-6 uppercase tracking-wider">
                        <Users size={12} /> The Network
                     </div>
                     <h2 className="text-4xl md:text-6xl font-black text-[#fafafa] mb-4 leading-none tracking-tight">
                        Join the <br/>
                        <span className="text-[#22c55e]">Future of AI.</span>
                     </h2>
                     <p className="text-[#a1a1aa] text-lg max-w-xl mb-8 leading-relaxed">
                        Get exclusive access to AI news, discounts, and 24/7 support. Join thousands of happy users in our verified community.
                     </p>
                     
                     <div className="flex flex-wrap gap-4">
                        <a href={CHANNEL_LINK} className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#22c55e] text-black font-bold text-lg hover:bg-[#16a34a] transition-all duration-200 shadow-lg shadow-[#22c55e]/20 hover:scale-105">
                            <Send size={20} /> Telegram Channel
                        </a>
                        <a href={TRUST_CHANNEL_LINK} className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#141414] backdrop-blur-md text-[#fafafa] font-bold text-lg border border-[#27272a] hover:bg-[#27272a] hover:border-[#22c55e]/50 transition-all duration-200">
                            <Users size={20} /> Trust & Reviews
                        </a>
                     </div>
                </div>
            </div>

            {/* 2. Profile Card (Artist Style) - Moved to side/bottom, 4 cols */}
            <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="h-full bg-[#141414] rounded-[2.5rem] p-2 border border-[#27272a] relative overflow-hidden group hover:border-[#22c55e]/30 transition-colors duration-200">
                     {/* Image Container */}
                     <div className="h-64 w-full rounded-[2rem] overflow-hidden relative mb-4">
                        <img 
                            src={PROFILE_IMAGE_URL} 
                            alt={content.seller.name}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
                        
                        {/* Verify Badge on Image */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#22c55e] backdrop-blur-md border border-[#16a34a]/50">
                            <BadgeCheck size={14} className="text-black" fill="currentColor" color="#000" />
                            <span className="text-xs font-bold text-black uppercase tracking-wider">Verified</span>
                        </div>
                     </div>

                     <div className="px-6 pb-6 text-center lg:text-start">
                        <h3 className="text-2xl font-black text-[#fafafa] mb-1">{content.seller.name}</h3>
                        <p className="text-sm font-bold text-[#22c55e] mb-4">{content.seller.role}</p>
                        
                        <div className="bg-[#27272a] rounded-2xl p-4 mb-6 border border-[#3f3f46] text-xs text-[#a1a1aa] leading-relaxed font-medium">
                            {content.seller.bio}
                        </div>

                        <Button href={ABOUT_ME_LINK} variant="secondary" className="w-full rounded-2xl py-4 text-sm bg-[#22c55e] text-black hover:bg-[#16a34a] border-none font-bold">
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