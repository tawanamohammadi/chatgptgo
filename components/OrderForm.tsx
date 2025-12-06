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

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  invoiceLink?: string;
  phone?: string;
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

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

const validateURL = (url: string): boolean => {
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
};

const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

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
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
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
      paymentSuccessMessage: 'پرداخت تایید شد. سفارش در حال انجام است.',
      errors: {
        firstNameRequired: 'نام الزامی است',
        firstNameMin: 'نام باید حداقل ۲ حرف باشد',
        lastNameRequired: 'نام خانوادگی الزامی است',
        lastNameMin: 'نام خانوادگی باید حداقل ۲ حرف باشد',
        emailRequired: 'ایمیل الزامی است',
        emailInvalid: 'فرمت ایمیل صحیح نیست',
        invoiceLinkRequired: 'لینک پرداخت الزامی است',
        invoiceLinkInvalid: 'لینک وارد شده معتبر نیست',
        phoneRequired: 'شماره موبایل الزامی است',
        phoneInvalid: 'فرمت شماره موبایل صحیح نیست'
      }
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
      paymentSuccessMessage: 'Payment confirmed. Order is processing.',
      errors: {
        firstNameRequired: 'First name is required',
        firstNameMin: 'First name must be at least 2 characters',
        lastNameRequired: 'Last name is required',
        lastNameMin: 'Last name must be at least 2 characters',
        emailRequired: 'Email is required',
        emailInvalid: 'Invalid email format',
        invoiceLinkRequired: 'Payment link is required',
        invoiceLinkInvalid: 'Invalid URL format',
        phoneRequired: 'Phone number is required',
        phoneInvalid: 'Invalid phone number format'
      }
    }
  };

  const t = content[language];

  // Real-time validation
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) return t.errors.firstNameRequired;
        if (!validateName(value)) return t.errors.firstNameMin;
        break;
      case 'lastName':
        if (!value.trim()) return t.errors.lastNameRequired;
        if (!validateName(value)) return t.errors.lastNameMin;
        break;
      case 'email':
        if (!value.trim()) return t.errors.emailRequired;
        if (!validateEmail(value)) return t.errors.emailInvalid;
        break;
      case 'invoiceLink':
        if (orderType === 'personal') {
          if (!value.trim()) return t.errors.invoiceLinkRequired;
          if (!validateURL(value)) return t.errors.invoiceLinkInvalid;
        }
        break;
      case 'phone':
        if (orderType === 'premade') {
          if (!value.trim()) return t.errors.phoneRequired;
          if (!validatePhone(value)) return t.errors.phoneInvalid;
        }
        break;
    }
    return undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Validate on change if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setFormErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    errors.firstName = validateField('firstName', formData.firstName);
    errors.lastName = validateField('lastName', formData.lastName);
    errors.email = validateField('email', formData.email);

    if (orderType === 'personal') {
      errors.invoiceLink = validateField('invoiceLink', formData.invoiceLink);
    } else {
      errors.phone = validateField('phone', formData.phone);
    }

    setFormErrors(errors);
    return !Object.values(errors).some(error => error !== undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      invoiceLink: true,
      phone: true
    });

    if (!validateForm()) {
      return;
    }

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
    setFormErrors({});
    setTouched({});
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
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Order Type */}
            <div className="grid grid-cols-2 gap-3 p-1 bg-[#141414] rounded-2xl border border-[#27272a]">
              <button
                type="button"
                onClick={() => setOrderType('personal')}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${orderType === 'personal' ? 'bg-[#27272a] text-white shadow-sm' : 'text-[#71717a] hover:text-[#a1a1aa]'
                  }`}
                aria-pressed={orderType === 'personal'}
              >
                <Mail size={18} />
                {t.personalEmail}
              </button>
              <button
                type="button"
                onClick={() => setOrderType('premade')}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${orderType === 'premade' ? 'bg-[#27272a] text-white shadow-sm' : 'text-[#71717a] hover:text-[#a1a1aa]'
                  }`}
                aria-pressed={orderType === 'premade'}
              >
                <User size={18} />
                {t.premadeAccount}
              </button>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider ms-1">
                  {t.firstName} <span className="text-red-400">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  aria-required="true"
                  aria-invalid={!!formErrors.firstName}
                  aria-describedby={formErrors.firstName ? "firstName-error" : undefined}
                  className={`w-full px-5 py-4 rounded-2xl bg-[#141414] border text-white placeholder-[#52525b] focus:outline-none focus:ring-2 transition-all ${formErrors.firstName ? 'border-red-500 focus:ring-red-500/50' : 'border-[#27272a] focus:border-[#22c55e] focus:ring-[#22c55e]/50'
                    }`}
                  placeholder="..."
                />
                {formErrors.firstName && (
                  <p id="firstName-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {formErrors.firstName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider ms-1">
                  {t.lastName} <span className="text-red-400">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  aria-required="true"
                  aria-invalid={!!formErrors.lastName}
                  aria-describedby={formErrors.lastName ? "lastName-error" : undefined}
                  className={`w-full px-5 py-4 rounded-2xl bg-[#141414] border text-white placeholder-[#52525b] focus:outline-none focus:ring-2 transition-all ${formErrors.lastName ? 'border-red-500 focus:ring-red-500/50' : 'border-[#27272a] focus:border-[#22c55e] focus:ring-[#22c55e]/50'
                    }`}
                  placeholder="..."
                />
                {formErrors.lastName && (
                  <p id="lastName-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {formErrors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider ms-1">
                {t.email} <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                required
                aria-required="true"
                aria-invalid={!!formErrors.email}
                aria-describedby={formErrors.email ? "email-error" : undefined}
                className={`w-full px-5 py-4 rounded-2xl bg-[#141414] border text-white placeholder-[#52525b] focus:outline-none focus:ring-2 transition-all ${formErrors.email ? 'border-red-500 focus:ring-red-500/50' : 'border-[#27272a] focus:border-[#22c55e] focus:ring-[#22c55e]/50'
                  }`}
                placeholder="example@gmail.com"
                dir="ltr"
              />
              {formErrors.email && (
                <p id="email-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle size={12} /> {formErrors.email}
                </p>
              )}
            </div>

            {/* Conditional Fields */}
            {orderType === 'personal' ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label htmlFor="invoiceLink" className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider">
                    {t.invoiceLink} <span className="text-red-400">*</span>
                  </label>
                  <a href="tutorial.html" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-[#22c55e] flex items-center gap-1 hover:underline">
                    <BookOpen size={12} /> {t.invoiceLinkHelp}
                  </a>
                </div>
                <div className="relative">
                  <Link2 size={20} className="absolute start-5 top-1/2 -translate-y-1/2 text-[#52525b]" />
                  <input
                    id="invoiceLink"
                    type="url"
                    name="invoiceLink"
                    value={formData.invoiceLink}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required={orderType === 'personal'}
                    aria-required={orderType === 'personal'}
                    aria-invalid={!!formErrors.invoiceLink}
                    aria-describedby={formErrors.invoiceLink ? "invoiceLink-error" : undefined}
                    className={`w-full ps-14 pe-5 py-4 rounded-2xl bg-[#141414] border text-white placeholder-[#52525b] focus:outline-none focus:ring-2 transition-all ${formErrors.invoiceLink ? 'border-red-500 focus:ring-red-500/50' : 'border-[#27272a] focus:border-[#22c55e] focus:ring-[#22c55e]/50'
                      }`}
                    placeholder="https://pay.openai.com/..."
                    dir="ltr"
                  />
                </div>
                {formErrors.invoiceLink && (
                  <p id="invoiceLink-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle size={12} /> {formErrors.invoiceLink}
                  </p>
                )}
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-bold text-[#a1a1aa] uppercase tracking-wider ms-1">
                    {t.phone} <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone size={20} className="absolute start-5 top-1/2 -translate-y-1/2 text-[#52525b]" />
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required={orderType === 'premade'}
                      aria-required={orderType === 'premade'}
                      aria-invalid={!!formErrors.phone}
                      aria-describedby={formErrors.phone ? "phone-error" : undefined}
                      className={`w-full ps-14 pe-5 py-4 rounded-2xl bg-[#141414] border text-white placeholder-[#52525b] focus:outline-none focus:ring-2 transition-all ${formErrors.phone ? 'border-red-500 focus:ring-red-500/50' : 'border-[#27272a] focus:border-[#22c55e] focus:ring-[#22c55e]/50'
                        }`}
                      placeholder="+98..."
                      dir="ltr"
                    />
                  </div>
                  {formErrors.phone && (
                    <p id="phone-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle size={12} /> {formErrors.phone}
                    </p>
                  )}
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
              className="w-full py-5 rounded-2xl bg-[#22c55e] text-black font-black text-lg hover:bg-[#16a34a] transition-all shadow-xl shadow-[#22c55e]/20 hover:shadow-[#22c55e]/40 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-busy={submitStatus === 'loading'}
            >
              {submitStatus === 'loading' ? <Loader2 size={24} className="animate-spin" /> : <CheckCircle2 size={24} />}
              {submitStatus === 'loading' ? t.submitting : t.submit}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
