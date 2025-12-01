import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Mail, User, Phone, Link2, Send, BookOpen, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { TELEGRAM_LINK } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

type OrderType = 'personal' | 'premade';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  invoiceLink: string;
  phone: string;
}

export const OrderForm: React.FC = () => {
  const { language } = useLanguage();
  const [orderType, setOrderType] = useState<OrderType>('personal');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    invoiceLink: '',
    phone: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const content = {
    fa: {
      title: 'ثبت سفارش',
      subtitle: 'فرم زیر را پر کنید تا سفارش شما ثبت شود',
      orderTypeLabel: 'نوع سفارش:',
      personalEmail: 'فعال‌سازی روی ایمیل شخصی',
      premadeAccount: 'اکانت پیش‌ساخته',
      firstName: 'نام',
      lastName: 'نام خانوادگی',
      email: 'ایمیل',
      invoiceLink: 'لینک پرداخت فاکتور OpenAI',
      invoiceLinkHelp: 'نمی‌دانید چگونه لینک را بگیرید؟',
      viewTutorial: 'مشاهده آموزش کامل',
      phone: 'شماره تلفن',
      premadeNote: 'برای دریافت شماره کارت و پرداخت، لطفاً به ادمین پیام دهید',
      contactAdmin: 'پیام به ادمین در تلگرام',
      submit: 'ثبت سفارش',
      successTitle: 'سفارش شما ثبت شد!',
      successMessage: 'لطفاً برای ادامه فرآیند، به تلگرام مراجعه کنید.',
      goToTelegram: 'رفتن به تلگرام',
      required: 'الزامی'
    },
    en: {
      title: 'Place Order',
      subtitle: 'Fill out the form below to place your order',
      orderTypeLabel: 'Order Type:',
      personalEmail: 'Activate on Personal Email',
      premadeAccount: 'Pre-made Account',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      invoiceLink: 'OpenAI Invoice Payment Link',
      invoiceLinkHelp: "Don't know how to get the link?",
      viewTutorial: 'View Full Tutorial',
      phone: 'Phone Number',
      premadeNote: 'To receive card number and make payment, please message the admin',
      contactAdmin: 'Message Admin on Telegram',
      submit: 'Submit Order',
      successTitle: 'Order Submitted!',
      successMessage: 'Please proceed to Telegram to continue the process.',
      goToTelegram: 'Go to Telegram',
      required: 'Required'
    }
  };

  const t = content[language];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const buildOrderMessage = (type: OrderType, data: FormData): string => {
    const baseInfo = `سفارش جدید:\nنام: ${data.firstName} ${data.lastName}\nایمیل: ${data.email}`;
    
    if (type === 'personal') {
      return `${baseInfo}\nنوع: فعال‌سازی ایمیل شخصی\nلینک فاکتور: ${data.invoiceLink}`;
    }
    return `${baseInfo}\nنوع: اکانت پیش‌ساخته\nتلفن: ${data.phone}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build the order message (can be used for analytics or clipboard copy)
    const message = buildOrderMessage(orderType, formData);
    
    // Show success state - user will be prompted to go to Telegram
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="order" className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4 md:px-6 max-w-xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-[#27272a] rounded-3xl p-8 text-center shadow-2xl"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#22c55e]/20 flex items-center justify-center">
              <CheckCircle2 size={40} className="text-[#22c55e]" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">{t.successTitle}</h3>
            <p className="text-[#a1a1aa] mb-6">{t.successMessage}</p>
            <Button href={TELEGRAM_LINK} variant="primary" className="px-8 py-4 rounded-xl">
              <Send size={18} className="me-2" />
              {t.goToTelegram}
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="py-16 md:py-24 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#22c55e]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 max-w-xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-[#27272a] rounded-3xl overflow-hidden shadow-2xl hover:border-[#22c55e]/30 transition-colors duration-300"
        >
          {/* Header */}
          <div className="bg-[#0a0a0a] border-b border-[#27272a] p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#22c55e]/20 flex items-center justify-center">
                <ShoppingCart size={24} className="text-[#22c55e]" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">{t.title}</h2>
                <p className="text-sm text-[#a1a1aa]">{t.subtitle}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Order Type Selection */}
            <div>
              <label className="text-sm font-bold text-white block mb-3">{t.orderTypeLabel}</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOrderType('personal')}
                  className={`p-4 rounded-xl border-2 text-start transition-all duration-200 ${
                    orderType === 'personal'
                      ? 'border-[#22c55e] bg-[#22c55e]/10 text-[#22c55e]'
                      : 'border-[#27272a] text-[#a1a1aa] hover:border-[#3f3f46]'
                  }`}
                >
                  <Mail size={20} className="mb-2" />
                  <span className="text-sm font-bold block">{t.personalEmail}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('premade')}
                  className={`p-4 rounded-xl border-2 text-start transition-all duration-200 ${
                    orderType === 'premade'
                      ? 'border-[#22c55e] bg-[#22c55e]/10 text-[#22c55e]'
                      : 'border-[#27272a] text-[#a1a1aa] hover:border-[#3f3f46]'
                  }`}
                >
                  <User size={20} className="mb-2" />
                  <span className="text-sm font-bold block">{t.premadeAccount}</span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#27272a]"></div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-white block mb-2">
                  {t.firstName} <span className="text-[#22c55e]">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#27272a] text-white placeholder-[#71717a] focus:border-[#22c55e] focus:outline-none focus:ring-1 focus:ring-[#22c55e]/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-white block mb-2">
                  {t.lastName} <span className="text-[#22c55e]">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#27272a] text-white placeholder-[#71717a] focus:border-[#22c55e] focus:outline-none focus:ring-1 focus:ring-[#22c55e]/50 transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-bold text-white block mb-2">
                {t.email} <span className="text-[#22c55e]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#27272a] text-white placeholder-[#71717a] focus:border-[#22c55e] focus:outline-none focus:ring-1 focus:ring-[#22c55e]/50 transition-colors"
                dir="ltr"
              />
            </div>

            {/* Conditional Fields based on Order Type */}
            {orderType === 'personal' ? (
              <>
                {/* Invoice Link */}
                <div>
                  <label className="text-sm font-bold text-white block mb-2">
                    {t.invoiceLink} <span className="text-[#22c55e]">*</span>
                  </label>
                  <div className="relative">
                    <Link2 size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-[#71717a]" />
                    <input
                      type="url"
                      name="invoiceLink"
                      value={formData.invoiceLink}
                      onChange={handleInputChange}
                      required={orderType === 'personal'}
                      className="w-full ps-12 pe-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#27272a] text-white placeholder-[#71717a] focus:border-[#22c55e] focus:outline-none focus:ring-1 focus:ring-[#22c55e]/50 transition-colors"
                      dir="ltr"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Tutorial Link */}
                <div className="flex items-center gap-2 p-4 rounded-xl bg-[#22c55e]/5 border border-[#22c55e]/20">
                  <BookOpen size={18} className="text-[#22c55e]" />
                  <span className="text-sm text-[#a1a1aa]">{t.invoiceLinkHelp}</span>
                  <a 
                    href="tutorial.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-[#22c55e] hover:underline ms-auto"
                  >
                    {t.viewTutorial}
                  </a>
                </div>
              </>
            ) : (
              <>
                {/* Phone Number */}
                <div>
                  <label className="text-sm font-bold text-white block mb-2">
                    {t.phone} <span className="text-[#22c55e]">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-[#71717a]" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required={orderType === 'premade'}
                      className="w-full ps-12 pe-4 py-3 rounded-xl bg-[#0a0a0a] border border-[#27272a] text-white placeholder-[#71717a] focus:border-[#22c55e] focus:outline-none focus:ring-1 focus:ring-[#22c55e]/50 transition-colors"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Admin Contact Note */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[#22c55e]/5 border border-[#22c55e]/20">
                  <AlertCircle size={20} className="text-[#22c55e] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-[#d4d4d8] mb-3">{t.premadeNote}</p>
                    <a 
                      href={TELEGRAM_LINK}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#22c55e] text-black font-bold text-sm hover:bg-[#16a34a] transition-colors"
                    >
                      <Send size={14} />
                      {t.contactAdmin}
                    </a>
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#22c55e] text-black font-bold text-base hover:bg-[#16a34a] transition-all duration-200 shadow-lg shadow-[#22c55e]/30 hover:shadow-[#22c55e]/50 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={20} />
              {t.submit}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
