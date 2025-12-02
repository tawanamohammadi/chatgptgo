import { 
  ShieldCheck, 
  UserCheck, 
  CreditCard, 
  Zap, 
  Globe, 
  Headset,
  MessageCircle,
  Mail,
  Wallet,
  Gift,
  Star,
  ShoppingBag,
  CheckCircle2,
  Cpu,
  Lock,
  Smartphone,
  Percent
} from 'lucide-react';
import { FeatureItem, NavItem, StepItem, FAQItem, Content, Testimonial } from './types';

export const TELEGRAM_ID = "Rahbarusd";
export const TELEGRAM_LINK = `https://t.me/${TELEGRAM_ID}`;
export const CHANNEL_ID = "panbehnet";
export const CHANNEL_LINK = `https://t.me/${CHANNEL_ID}`;
export const TRUST_CHANNEL_LINK = "https://t.me/+Dxp0eP9LH4o5Mjg8";
export const ABOUT_ME_LINK = "https://tawanamohammadi.bio";

// --- PROFILE IMAGE CONFIGURATION ---
// Using the High-Res image from Gravatar as requested
export const CUSTOM_PROFILE_IMAGE = "https://2.gravatar.com/userimage/273761299/47f83f0d63887baf0d6a809341cc8c13?size=1024"; 

export const PROFILE_IMAGE_URL = CUSTOM_PROFILE_IMAGE;

export const NAV_LINKS: NavItem[] = [
  { key: 'features', href: '#product' },
  { key: 'how', href: '#how' },
  { key: 'seller', href: '#seller' },
  { key: 'faq', href: '#faq' },
];

export const FEATURES_CONFIG: FeatureItem[] = [
  { icon: ShieldCheck, titleKey: 'moneyBack', descKey: 'moneyBack' },
  { icon: Cpu, titleKey: 'performance', descKey: 'performance' },
  { icon: Globe, titleKey: 'vpn', descKey: 'vpn' },
  { icon: CreditCard, titleKey: 'payment', descKey: 'payment' },
  { icon: Zap, titleKey: 'fast', descKey: 'fast' },
  { icon: Headset, titleKey: 'support', descKey: 'support' }
];

export const STEPS_CONFIG: StepItem[] = [
  { id: 1, icon: MessageCircle, titleKey: 'step1', descKey: 'step1' },
  { id: 2, icon: Mail, titleKey: 'step2', descKey: 'step2' },
  { id: 3, icon: Wallet, titleKey: 'step3', descKey: 'step3' },
  { id: 4, icon: Zap, titleKey: 'step4', descKey: 'step4' },
];

export const FAQS_CONFIG: FAQItem[] = [
  { questionKey: 'q1', answerKey: 'a1' },
  { questionKey: 'q2', answerKey: 'a2' },
  { questionKey: 'q3', answerKey: 'a3' },
  { questionKey: 'q4', answerKey: 'a4' },
];

// Payment Methods Configuration
export const PAYMENT_METHODS = [
  { name: 'Visa', color: '#1A1F71', label: 'Visa' },
  { name: 'Mastercard', color: '#EB001B', label: 'Master' },
  { name: 'PayPal', color: '#003087', label: 'PayPal' },
  { name: 'Shaparak', color: '#10b981', label: 'شتاب ایران' }, // Local payment network
];

export const TRANSLATIONS: Record<'fa' | 'en', Content> = {
  fa: {
    nav: {
      features: 'محصول',
      how: 'خرید',
      seller: 'درباره ما',
      faq: 'سوالات',
    },
    hero: {
      badge: 'موجودی محدود - تحویل فوری',
      title: <>اشتراک <span className="text-brand-accent">ChatGPT Go</span> نسخه اورجینال</>,
      subtitle: <>لایسنس قانونی ۱۲ ماهه بر روی ایمیل شخصی شما. بدون قطعی، بدون نیاز به تغییر IP مداوم. تجربه هوش مصنوعی بدون مرز.</>,
      ctaPrimary: 'سفارش در تلگرام',
      ctaSecondary: 'مشاهده ویژگی‌ها',
      trust: ['گارانتی تعویض', 'تضمین اصالت', 'پشتیبانی ۲۴/۷'],
      pricing: {
        title: 'ChatGPT Go - 1 Year',
        period: 'لایسنس قانونی ۱ ساله',
        special: 'پیشنهاد ویژه',
        price: '۲٫۵۰۰٫۰۰۰',
        originalPrice: '۳٫۵۰۰٫۰۰۰',
        discountPercent: '۳۰٪',
        unit: 'تومان',
        note: 'آخرین بروزرسانی قیمت: همین الان',
        features: [
          "فعال‌سازی روی ایمیل شخصی خریدار",
          "دسترسی پایدار به مدل‌های هوش مصنوعی",
          "بدون نیاز به تغییر IP مداوم",
          "هدیه: ۹۰ گیگابایت VPN (ماهیانه)",
          "گارانتی بازگشت وجه کامل"
        ],
        button: 'خرید و فعال‌سازی فوری'
      },
      urgency: {
        countdownTitle: 'تخفیف ویژه تا',
        spotsLeft: 'فقط',
        spotsNumber: '۵ جا باقی مانده!'
      },
      testimonials: [
        { name: 'علی رضایی', role: 'توسعه‌دهنده', text: 'سرویس عالی و پشتیبانی فوق‌العاده. اکانتم در کمتر از ۱۰ دقیقه فعال شد!', rating: 5 },
        { name: 'سارا احمدی', role: 'طراح گرافیک', text: 'قیمت مناسب و کیفیت بالا. به همه دوستانم پیشنهاد می‌کنم.', rating: 5 },
        { name: 'محمد کریمی', role: 'دانشجو', text: 'VPN هدیه هم واقعاً مفید بود. از خریدم راضی هستم.', rating: 5 }
      ],
      testimonialsTitle: 'نظرات مشتریان',
      testimonialsSubtitle: '+۱۰۰۰ سفارش موفق با ۹۸٪ رضایت'
    },
    seller: {
      title: 'پروفایل تایید شده',
      name: 'توانا محمدی',
      role: 'پژوهشگر هوش مصنوعی و استراتژیست داده',
      bio: 'پژوهشگر مستقل هوش مصنوعی، استراتژیست داده و مدرس با تمرکز بر اخلاق هوش مصنوعی، شفافیت داده و حقوق دیجیتال. موسس شبکه توانا.',
      channelTitle: 'کانال رسمی',
      channelId: '@panbehnet',
      cta: 'مشاهده پروفایل کامل',
      trustChannelTitle: 'کانال اعتماد و تخفیف',
      trustChannelBtn: 'مشاهده رضایت مشتریان'
    },
    features: {
      title: 'امکانات بی‌‌نهایت',
      subtitle: 'طراحی شده برای کسانی که به کیفیت اهمیت می‌دهند.',
      items: {
        moneyBack: { title: 'ضمانت بازگشت وجه', desc: 'عودت کامل وجه در صورت عدم رضایت یا عدم فعال‌سازی موفق.' },
        performance: { title: 'عملکرد پایدار', desc: 'تضمین پایداری و عملکرد اکانت تا آخرین روز اشتراک.' },
        vpn: { title: 'اینترنت آزاد هدیه', desc: '۱۰ گیگابایت VPN اختصاصی ماهانه با لوکیشن‌های متنوع.' },
        payment: { title: 'پرداخت ریالی امن', desc: 'امکان پرداخت با کلیه کارت‌های عضو شبکه شتاب.' },
        fast: { title: 'تحویل فوق سریع', desc: 'شروع فرآیند فعال‌سازی بلافاصله پس از تایید سفارش.' },
        support: { title: 'پشتیبانی مستقیم', desc: 'ارتباط مستقیم با مدیریت جهت رفع هرگونه مشکل احتمالی.' }
      }
    },
    steps: {
      title: 'روند خرید آسان',
      subtitle: 'تنها در ۴ مرحله به هوش مصنوعی نامحدود دسترسی پیدا کنید.',
      supportStatus: 'پشتیبانی آنلاین',
      items: {
        step1: { title: 'ثبت سفارش', desc: 'پیام به آیدی @Rahbarusd در تلگرام.' },
        step2: { title: 'ارسال ایمیل', desc: 'ارسال ایمیل جهت صدور فاکتور و لایسنس.' },
        step3: { title: 'پرداخت وجه', desc: 'واریز مبلغ از طریق کارت به کارت یا درگاه.' },
        step4: { title: 'تحویل اکانت', desc: 'دریافت اطلاعات ورود و کانفیگ VPN هدیه.' }
      },
      securityTitle: 'امنیت و حریم خصوصی',
      securityDesc: 'اطلاعات شما نزد ما کاملاً محفوظ است. ما متعهد به حفظ حریم خصوصی و امنیت دیجیتال شما هستیم.'
    },
    faq: {
      title: 'سوالات متداول',
      items: {
        q1: { q: 'آیا اکانت روی ایمیل خودم فعال می‌شود؟', a: 'بله، صد در صد. ما اشتراک را مستقیماً روی ایمیل شخصی شما خریداری و فعال می‌کنیم.' },
        q2: { q: 'هدیه VPN چه ویژگی‌هایی دارد؟', a: 'VPN اختصاصی با حجم ۱۰ گیگابایت ماهانه و قابلیت انتخاب لوکیشن، مناسب برای ترید و کارهای حساس.' },
        q3: { q: 'تفاوت نسخه Go با Plus چیست؟', a: 'نسخه Go یک پلن اقتصادی و پایدار است که دسترسی به قابلیت‌های اصلی را با هزینه بسیار کمتر فراهم می‌کند.' },
        q4: { q: 'در صورت قطعی اکانت چه اتفاقی می‌افتد؟', a: 'در طول دوره ضمانت، هرگونه مشکل قطعی با جایگزینی اکانت یا رفع مشکل پوشش داده می‌شود.' }
      }
    },
    trust: {
      title: 'اعتماد شما، سرمایه ماست',
      items: [
        'احراز هویت کامل',
        'سابقه طولانی',
        'رضایت مشتریان'
      ],
      cta: 'عضویت در کانال'
    },
    cta: {
      title: 'هنوز مطمئن نیستید؟',
      subtitle: 'همین حالا برای مشاوره رایگان پیام دهید.',
      button: 'ارتباط با پشتیبانی'
    },
    footer: {
      rights: 'تمامی حقوق محفوظ است.',
      slogan: 'ChatGPT Go — پیشرو در خدمات هوش مصنوعی.',
      links: {
        terms: 'قوانین',
        privacy: 'حریم خصوصی',
        contact: 'تماس'
      }
    }
  },
  en: {
    nav: {
      features: 'Product',
      how: 'Process',
      seller: 'About',
      faq: 'FAQ',
    },
    hero: {
      badge: 'Limited Stock - Instant Delivery',
      title: <>Original <span className="text-brand-accent">ChatGPT Go</span> Subscription</>,
      subtitle: <>12-Month legal license on your personal email. Zero interruptions, no constant IP changes needed. Experience AI without borders.</>,
      ctaPrimary: 'Order on Telegram',
      ctaSecondary: 'View Specs',
      trust: ['Exchange Warranty', 'Authenticity Guaranteed', '24/7 Support'],
      pricing: {
        title: 'ChatGPT Go - 1 Year',
        period: '1 Year Legal License',
        special: 'Special Offer',
        price: '2,500,000',
        originalPrice: '3,500,000',
        discountPercent: '30%',
        unit: 'Tomans',
        note: 'Price updated just now',
        features: [
          "Activated on your personal email",
          "Stable access to AI models",
          "No frequent IP changes needed",
          "Gift: 90GB Monthly VPN",
          "Full Money-back guarantee"
        ],
        button: 'Buy & Activate Now'
      },
      urgency: {
        countdownTitle: 'Special Offer Ends In',
        spotsLeft: 'Only',
        spotsNumber: '5 spots left!'
      },
      testimonials: [
        { name: 'Ali Rezaei', role: 'Developer', text: 'Amazing service and outstanding support. My account was activated in less than 10 minutes!', rating: 5 },
        { name: 'Sara Ahmadi', role: 'Graphic Designer', text: 'Great price and high quality. I recommend it to all my friends.', rating: 5 },
        { name: 'Mohammad Karimi', role: 'Student', text: 'The VPN gift was really useful too. Very satisfied with my purchase.', rating: 5 }
      ],
      testimonialsTitle: 'Customer Reviews',
      testimonialsSubtitle: '1000+ successful orders with 98% satisfaction'
    },
    seller: {
      title: 'Verified Profile',
      name: 'Tawana Mohammadi',
      role: 'Web Developer & AI Researcher',
      bio: 'Independent AI researcher, data strategist, and educator focused on Ethical AI, data transparency, and human-centered AI design. Founder of Tawana Network.',
      channelTitle: 'Official Channel',
      channelId: '@panbehnet',
      cta: 'View Full Bio',
      trustChannelTitle: 'Trust & Discounts',
      trustChannelBtn: 'View Reviews'
    },
    features: {
      title: 'Limitless Possibilities',
      subtitle: 'Designed for those who value quality.',
      items: {
        moneyBack: { title: 'Money-Back Guarantee', desc: 'Full refund if not satisfied or activation fails.' },
        performance: { title: 'Stable Performance', desc: 'Guaranteed account stability until the last day.' },
        vpn: { title: 'Free VPN Gift', desc: '10GB dedicated monthly VPN with diverse locations.' },
        payment: { title: 'Secure Payment', desc: 'Payment via all major local debit cards.' },
        fast: { title: 'Super Fast Delivery', desc: 'Activation process starts immediately after confirmation.' },
        support: { title: 'Direct Support', desc: 'Direct contact with management for any issues.' }
      }
    },
    steps: {
      title: 'Easy Purchase Process',
      subtitle: 'Access unlimited AI in just 4 simple steps.',
      supportStatus: 'Online Support',
      items: {
        step1: { title: 'Place Order', desc: 'Message @Rahbarusd on Telegram.' },
        step2: { title: 'Send Email', desc: 'Send email for invoice and license issuance.' },
        step3: { title: 'Payment', desc: 'Transfer amount via card-to-card or gateway.' },
        step4: { title: 'Delivery', desc: 'Receive login info and gift VPN config.' }
      },
      securityTitle: 'Security & Privacy',
      securityDesc: 'Your data is completely safe with us. We are committed to your digital privacy and security.'
    },
    faq: {
      title: 'FAQ',
      items: {
        q1: { q: 'Is it activated on my own email?', a: 'Yes, 100%. We purchase and activate the subscription directly on your personal email.' },
        q2: { q: 'What are the VPN gift features?', a: 'Dedicated VPN with 10GB monthly data and location selection, suitable for trading.' },
        q3: { q: 'Difference between Go and Plus?', a: 'Go is an economical and stable plan providing access to core features at a much lower cost.' },
        q4: { q: 'What happens if the account disconnects?', a: 'During the warranty period, any disconnection issues are covered by replacement or fix.' }
      }
    },
    trust: {
      title: 'Your Trust, Our Asset',
      items: [
        'Full Verification',
        'Long History',
        'Customer Satisfaction'
      ],
      cta: 'Join Channel'
    },
    cta: {
      title: 'Still Not Sure?',
      subtitle: 'Message now for a free consultation.',
      button: 'Contact Support'
    },
    footer: {
      rights: 'All rights reserved.',
      slogan: 'ChatGPT Go — Leading in AI Services.',
      links: {
        terms: 'Terms',
        privacy: 'Privacy',
        contact: 'Contact'
      }
    }
  }
};