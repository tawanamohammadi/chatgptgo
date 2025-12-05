import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Mail, User, Phone, Link2, Send, BookOpen, CheckCircle2, AlertCircle, Loader2, ExternalLink, XCircle, RefreshCw, CreditCard } from 'lucide-react';
import { Button } from './ui/Button';
import { TELEGRAM_LINK, API_URL } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

type OrderType = 'personal' | 'premade';
type SubmitStatus = 'idle' | 'loading' | 'success' | 'error' | 'payment';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  invoiceLink: string;
  phone: string;
}

interface OrderResponse {
  success: boolean;
  order?: {
    id: string;
    status: string;
  };
  error?: string;
}

interface PaymentResponse {
  success: boolean;
  paymentUrl?: string;
  paymentId?: string;
  amount?: number;
  currency?: string;
  error?: string;
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
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);

  const content = {
    fa: {
      title: 'ثبت سفارش',
      subtitle: 'اطلاعات خود را وارد کنید',
      orderTypeLabel: 'نوع اکانت را انتخاب کنید',
      personalEmail: 'ایمیل شخصی',
      premadeAccount: 'اکانت آماده',
      firstName: 'نام',
      lastName: 'نام خانوادگی',
      email: 'ایمیل',
      invoiceLink: 'لینک پرداخت OpenAI',
      invoiceLinkHelp: 'آموزش دریافت لینک',
      viewTutorial: 'مشاهده',
      phone: 'شماره موبایل',
      premadeNote: 'برای دریافت اطلاعات پرداخت کارت به کارت، به پشتیبانی پیام دهید.',
      contactAdmin: 'پیام به پشتیبانی',
      submit: 'تایید و پرداخت',
      successTitle: 'سفارش موفق!',
      successMessage: 'سفارش شما ثبت شد. برای تکمیل فرآیند به تلگرام مراجعه کنید.',
      goToTelegram: 'پیگیری در تلگرام',
      required: 'الزامی',
      submitting: 'در حال پردازش...',
      errorTitle: 'خطا',
      tryAgain: 'تلاش مجدد',
      paymentTitle: 'پرداخت آنلاین',
      paymentMessage: 'برای تکمیل خرید، پرداخت را انجام دهید.',
      payButton: 'پرداخت با کریپتو',
      checkPayment: 'بررسی وضعیت',
      paymentPending: 'در انتظار...',
      paymentSuccess: 'پرداخت موفق',
      paymentSuccessMessage: 'پرداخت تایید شد. سفارش در حال انجام است.'
    },
    en: {
      title: 'Place Order',
      subtitle: 'Enter your details below',
      orderTypeLabel: 'Select Account Type',
      personalEmail: 'Personal Email',
      premadeAccount: 'Pre-made Account',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      invoiceLink: 'OpenAI Payment Link',
      invoiceLinkHelp: 'How to get link?',
      viewTutorial: 'View',
      phone: 'Phone Number',
      premadeNote: 'For card payment details, please contact support.',
      contactAdmin: 'Contact Support',
      submit: 'Confirm & Pay',
      successTitle: 'Order Placed!',
      successMessage: 'Order received. Please proceed to Telegram.',
      goToTelegram: 'Open Telegram',
      required: 'Required',
      submitting: 'Processing...',
      errorTitle: 'Error',
      tryAgain: 'Try Again',
      paymentTitle: 'Online Payment',
      paymentMessage: 'Complete payment to finalize order.',
      payButton: 'Pay with Crypto',
      checkPayment: 'Check Status',
      paymentPending: 'Waiting...',
      paymentSuccess: 'Payment Successful',
      paymentSuccessMessage: 'Payment confirmed. Order is processing.'
    }
  };

  const t = content[language];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      const orderResponse = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          orderType,
          invoiceLink: orderType === 'personal' ? formData.invoiceLink : undefined,
          phone: orderType === 'premade' ? formData.phone : undefined,
        }),
      });

      const orderData: OrderResponse = await orderResponse.json();

      if (!orderResponse.ok || !orderData.success || !orderData.order) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      setOrderId(orderData.order.id);

      if (orderType === 'premade') {
        setSubmitStatus('success');
        return;
      }

      try {
        const paymentResponse = await fetch(`${API_URL}/api/payment/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: orderData.order.id }),
        });

        const paymentData: PaymentResponse = await paymentResponse.json();

        if (!paymentResponse.ok || !paymentData.success) {
          setSubmitStatus('success');
          return;
        }

        if (paymentData.paymentUrl) {
          setPaymentUrl(paymentData.paymentUrl);
          setSubmitStatus('payment');
        } else {
          setSubmitStatus('success');
        }
      } catch {
        setSubmitStatus('success');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
      setSubmitStatus('error');
    }
  };

  const checkPaymentStatus = async () => {
    if (!orderId) return;
    setIsCheckingPayment(true);
    try {
      const response = await fetch(`${API_URL}/api/payment/status/${orderId}`);
      const data = await response.json();
      if (data.success && (data.paymentStatus === 'finished' || data.orderStatus === 'paid')) {
        setSubmitStatus('success');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    } finally {
      setIsCheckingPayment(false);
    }
  };

  useEffect(() => {
    if (submitStatus === 'payment' && orderId) {
      const interval = setInterval(checkPaymentStatus, 10000);
      return () => clearInterval(interval);
    }
  }, [submitStatus, orderId]);

  const resetForm = () => {
    setFormData({ firstName: '', lastName: '', email: '', invoiceLink: '', phone: '' });
    setSubmitStatus('idle');
    setOrderId(null);
    setPaymentUrl(null);
    setErrorMessage('');
  };

  if (submitStatus === 'error') {
    return (
      <section id="order" className="py-20 relative">
        <div className="container mx-auto px-4 max-w-lg">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0a0a0a] border border-red-500/20 rounded-3xl p-8 text-center shadow-2xl"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
              <XCircle size={32} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.errorTitle}</h3>
            <p className="text-[#a1a1aa] mb-8 text-sm">{errorMessage}</p>
            <button
              onClick={resetForm}
              className="w-full py-4 rounded-2xl bg-[#27272a] text-white font-bold hover:bg-[#3f3f46] transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} />
              {t.tryAgain}
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  if (submitStatus === 'payment' && paymentUrl) {
    return (
      <section id="order" className="py-20 relative">
        <div className="container mx-auto px-4 max-w-lg">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0a0a0a] border border-[#22c55e]/20 rounded-3xl p-8 text-center shadow-2xl"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#22c55e]/10 flex items-center justify-center animate-pulse">
              <CreditCard size={32} className="text-[#22c55e]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.paymentTitle}</h3>
            <p className="text-[#a1a1aa] mb-8 text-sm">{t.paymentMessage}</p>
            
            <div className="space-y-3">
              <a
                href={paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-[#22c55e] text-black font-bold hover:bg-[#16a34a] transition-all shadow-lg shadow-[#22c55e]/20 flex items-center justify-center gap-2"
              >
                <ExternalLink size={20} />
                {t.payButton}
              </a>
              
              <button
                onClick={checkPaymentStatus}
                disabled={isCheckingPayment}
                className="w-full py-4 rounded-2xl border border-[#27272a] text-[#a1a1aa] font-medium hover:bg-[#141414] transition-colors flex items-center justify-center gap-2"
              >
                {isCheckingPayment ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />}
                {t.checkPayment}
              </button>
            </div>
            <a href={TELEGRAM_LINK} className="inline-flex items-center gap-2 mt-6 text-[#22c55e] text-sm hover:underline opacity-80 hover:opacity-100">
              <Send size={14} /> {t.goToTelegram}
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  if (submitStatus === 'success') {
    return (
      <section id="order" className="py-20 relative">
        <div className="container mx-auto px-4 max-w-lg">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0a0a0a] border border-[#22c55e]/20 rounded-3xl p-8 text-center shadow-2xl"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#22c55e]/10 flex items-center justify-center">
              <CheckCircle2 size={32} className="text-[#22c55e]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.successTitle}</h3>
            <p className="text-[#a1a1aa] mb-8 text-sm">{t.successMessage}</p>
            <Button href={TELEGRAM_LINK} variant="primary" className="w-full py-4 rounded-2xl shadow-lg shadow-[#22c55e]/20">
              <Send size={18} className="me-2" />
              {t.goToTelegram}
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">{t.title}</h2>
          <p className="text-[#a1a1aa] text-lg">{t.subtitle}</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-[#27272a] rounded-[2rem] p-6 md:p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Order Type */}
            <div className="grid grid-cols-2 gap-3 p-1 bg-[#141414] rounded-2xl border border-[#27272a]">
              <button
                type="button"
                onClick={() => setOrderType('personal')}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                  orderType === 'personal' ? 'bg-[#27272a] text-white shadow-sm' : 'text-[#71717a] hover:text-[#a1a1aa]'
                }`}
              >
                <Mail size={18} />
                {t.personalEmail}
              </button>
              <button
                type="button"
                onClick={() => setOrderType('premade')}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                  orderType === 'premade' ? 'bg-[#27272a] text-white shadow-sm' : 'text-[#71717a] hover:text-[#a1a1aa]'
                }`}
              >
                <User size={18} />
                {t.premadeAccount}
              </button>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider ms-1">{t.firstName}</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-[#141414] border border-[#27272a] text-white placeholder-[#52525b] focus:border-[#22c55e] focus:outline-none focus:ring-1 focus:ring-[#22c55e]/50 transition-all"
                  placeholder="..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider ms-1">{t.lastName}</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 rounded-2xl bg-[#141414] border border-[#27272a] text-white placeholder-[#52525b] focus:border-[#22c55e] focus:outline-none focus:ring-1 focus:ring-[#22c55e]/50 transition-all"
                  placeholder="..."
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider ms-1">{t.email}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-5 py-4 rounded-2xl bg-[#141414] border border-[#27272a] text-white placeholder-[#52525b] focus:border-[#22c55e] focus:outline-none focus:ring-1 focus:ring-[#22c55e]/50 transition-all"
                placeholder="example@gmail.com"
                dir="ltr"
              />
            </div>

            {/* Conditional Fields */}
            {orderType === 'personal' ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">{t.invoiceLink}</label>
                  <a href="tutorial.html" target="_blank" className="text-[10px] font-bold text-[#22c55e] flex items-center gap-1 hover:underline">
                    <BookOpen size={12} /> {t.invoiceLinkHelp}
                  </a>
                </div>
                <div className="relative">
                  <Link2 size={20} className="absolute start-5 top-1/2 -translate-y-1/2 text-[#52525b]" />
                  <input
                    type="url"
                    name="invoiceLink"
                    value={formData.invoiceLink}
                    onChange={handleInputChange}
                    required={orderType === 'personal'}
                    className="w-full ps-14 pe-5 py-4 rounded-2xl bg-[#141414] border border-[#27272a] text-white placeholder-[#52525b] focus:border-[#22c55e] focus:outline-none focus:ring-1 focus:ring-[#22c55e]/50 transition-all"
                    placeholder="https://pay.openai.com/..."
                    dir="ltr"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider ms-1">{t.phone}</label>
                  <div className="relative">
                    <Phone size={20} className="absolute start-5 top-1/2 -translate-y-1/2 text-[#52525b]" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required={orderType === 'premade'}
                      className="w-full ps-14 pe-5 py-4 rounded-2xl bg-[#141414] border border-[#27272a] text-white placeholder-[#52525b] focus:border-[#22c55e] focus:outline-none focus:ring-1 focus:ring-[#22c55e]/50 transition-all"
                      placeholder="+98..."
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[#22c55e]/5 border border-[#22c55e]/10 flex gap-3">
                  <AlertCircle size={20} className="text-[#22c55e] shrink-0" />
                  <p className="text-xs text-[#d4d4d8] leading-relaxed">{t.premadeNote}</p>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={submitStatus === 'loading'}
              className="w-full py-5 rounded-2xl bg-[#22c55e] text-black font-black text-lg hover:bg-[#16a34a] transition-all shadow-xl shadow-[#22c55e]/20 hover:shadow-[#22c55e]/40 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitStatus === 'loading' ? <Loader2 size={24} className="animate-spin" /> : <CheckCircle2 size={24} />}
              {t.submit}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
