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
  CheckCircle2
} from 'lucide-react';
import { FeatureItem, NavItem, StepItem, FAQItem, Content } from './types';

export const TELEGRAM_ID = "Rahbarusd";
export const TELEGRAM_LINK = `https://t.me/${TELEGRAM_ID}`;
export const CHANNEL_ID = "panbehnet";
export const CHANNEL_LINK = `https://t.me/${CHANNEL_ID}`;
export const ABOUT_ME_LINK = "https://about.me/tawanamohammadi";

// NOTE: Replace this URL with the DIRECT link to your image (must end in .jpg or .png)
// Since about.me does not provide a direct image link easily, upload your photo to a host or use a direct link.
export const PROFILE_IMAGE_URL = "https://ui-avatars.com/api/?name=Tawana+Mohammadi&background=0D8ABC&color=fff&size=256"; 

export const NAV_LINKS: NavItem[] = [
  { key: 'features', href: '#product' },
  { key: 'how', href: '#how' },
  { key: 'seller', href: '#seller' },
  { key: 'faq', href: '#faq' },
];

export const FEATURES_CONFIG: FeatureItem[] = [
  { icon: ShieldCheck, titleKey: 'moneyBack', descKey: 'moneyBack' },
  { icon: UserCheck, titleKey: 'warranty', descKey: 'warranty' },
  { icon: Gift, titleKey: 'vpn', descKey: 'vpn' },
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

export const TRANSLATIONS: Record<'fa' | 'en', Content> = {
  fa: {
    nav: {
      features: 'محصول',
      how: 'خرید',
      seller: 'فروشنده',
      faq: 'سوالات',
    },
    hero: {
      badge: 'موجود در انبار - تحویل فوری',
      title: <>اشتراک <span className="text-brand-accent">ChatGPT Go</span> اورجینال</>,
      subtitle: <>لایسنس قانونی ۱۲ ماهه (یک‌ساله) بر روی ایمیل شخصی شما. بدون قطعی، بدون محدودیت تغییر IP، همراه با ضمانت طلایی بازگشت وجه.</>,
      ctaPrimary: 'افزودن به سبد خرید (تلگرام)',
      ctaSecondary: 'مشخصات فنی',
      trust: ['گارانتی تعویض', 'تضمین اصالت', 'پشتیبانی ۲۴/۷'],
      pricing: {
        title: 'ChatGPT Go - 1 Year',
        period: 'لایسنس قانونی ۱ ساله',
        special: 'تخفیف ویژه',
        price: '۲٫۵۰۰٫۰۰۰',
        unit: 'تومان',
        note: 'آخرین بروزرسانی قیمت: همین الان',
        features: [
          "فعال‌سازی روی ایمیل شخصی خریدار",
          "دسترسی کامل به مدل‌های ۳.۵ و ۴ (محدود)",
          "بدون نیاز به تغییر IP مداوم",
          "هدیه: ۹۰ گیگابایت VPN (ماهیانه)",
          "گارانتی بازگشت وجه در صورت عدم کارکرد"
        ],
        button: 'خرید و فعال‌سازی فوری'
      }
    },
    seller: {
      title: 'فروشنده تایید شده',
      name: 'Tawana Mohammadi',
      role: 'مدیر و موسس PanbeNet',
      bio: 'تضمین بالاترین کیفیت خدمات در ایران. هویت تایید شده با سال‌ها سابقه درخشان در ارائه سرویس‌های بین‌المللی.',
      channelTitle: 'کانال رسمی اطلاع‌رسانی',
      channelId: '@panbehnet',
      cta: 'مشاهده پروفایل کامل'
    },
    features: {
      title: 'ویژگی‌های محصول',
      subtitle: 'چرا این اشتراک بهترین انتخاب برای شماست؟',
      items: {
        moneyBack: { title: 'ضمانت بازگشت وجه', desc: 'در صورت عدم فعال‌سازی، ۱۰۰٪ مبلغ عودت داده می‌شود.' },
        warranty: { title: 'گارانتی ۱ ماهه اکانت', desc: 'تضمین پایداری و سلامت اکانت تا ۳۰ روز.' },
        vpn: { title: 'پکیج هدیه VPN', desc: '۱۰ گیگابایت اینترنت آزاد ماهانه + سرورهای اختصاصی.' },
        payment: { title: 'درگاه پرداخت امن', desc: 'پرداخت از طریق کلیه کارت‌های عضو شتاب.' },
        fast: { title: 'تحویل آنی (۱-۲۴ ساعت)', desc: 'شروع پردازش سفارش بلافاصله پس از پرداخت.' },
        support: { title: 'پشتیبانی اختصاصی', desc: 'پاسخگویی مستقیم توسط مدیر در تلگرام.' }
      }
    },
    steps: {
      title: 'راهنمای خرید',
      subtitle: 'سفارش شما در ۴ مرحله ساده تکمیل می‌شود.',
      supportStatus: 'اپراتور آنلاین است',
      items: {
        step1: { title: 'ارسال سفارش', desc: 'در تلگرام به @Rahbarusd پیام دهید.' },
        step2: { title: 'دریافت فاکتور', desc: 'ایمیل خود را جهت صدور لایسنس ارسال کنید.' },
        step3: { title: 'پرداخت امن', desc: 'مبلغ را از طریق درگاه یا کارت واریز کنید.' },
        step4: { title: 'تحویل محصول', desc: 'اکانت آماده شده و اطلاعات ارسال می‌شود.' }
      },
      securityTitle: 'تضمین امنیت خرید',
      securityDesc: 'تمامی تراکنش‌ها و اطلاعات کاربری شما نزد ما محفوظ است. ما نماینده رسمی فروش سرویس‌های دیجیتال هستیم.'
    },
    faq: {
      title: 'پرسش‌های متداول',
      items: {
        q1: { q: 'آیا این اشتراک قانونی است؟', a: 'بله، تمام اشتراک‌ها روی ایمیل شخصی شما و به صورت کاملاً قانونی پرداخت و فعال می‌شوند (هک شده یا کرکی نیستند).' },
        q2: { q: 'هدیه VPN چگونه فعال می‌شود؟', a: 'پس از خرید اشتراک، کانفیگ اختصاصی VPN مولتی‌لوکیشن برای شما در تلگرام ارسال می‌شود.' },
        q3: { q: 'تفاوت پلن Go با Plus چیست؟', a: 'پلن Go نسخه اقتصادی و سبک‌تر OpenAI برای دسترسی پایدار و سریع با هزینه کمتر است.' },
        q4: { q: 'اگر اکانت مشکل پیدا کرد چه کنم؟', a: 'پشتیبانی ما در تمام طول دوره گارانتی پاسخگوی شماست و در صورت نیاز اکانت جایگزین می‌شود.' }
      }
    },
    trust: {
      title: 'چرا به ما اعتماد کنید؟',
      items: [
        'احراز هویت کامل فروشنده',
        'سابقه فعالیت درخشان در تلگرام',
        'رضایت صدها مشتری فعال'
      ],
      cta: 'عضویت در کانال اعتماد'
    },
    cta: {
      title: 'هنوز سوالی دارید؟',
      subtitle: 'مشاوره رایگان قبل از خرید در تلگرام.',
      button: 'تماس با پشتیبانی'
    },
    footer: {
      rights: 'تمامی حقوق محفوظ است.',
      slogan: 'PanbeNet — دروازه دسترسی آزاد.',
      links: {
        terms: 'قوانین و مقررات',
        privacy: 'حریم خصوصی',
        contact: 'تماس با ما'
      }
    }
  },
  en: {
    nav: {
      features: 'Product',
      how: 'Buy',
      seller: 'Seller',
      faq: 'FAQ',
    },
    hero: {
      badge: 'In Stock - Instant Delivery',
      title: <>Original <span className="text-brand-accent">ChatGPT Go</span> Subscription</>,
      subtitle: <>12-Month legal license on your personal email. No interruptions, VPN included, Money-back guarantee.</>,
      ctaPrimary: 'Add to Cart (Telegram)',
      ctaSecondary: 'Specs',
      trust: ['Exchange Warranty', 'Authenticity Guaranteed', '24/7 Support'],
      pricing: {
        title: 'ChatGPT Go - 1 Year',
        period: '1 Year Legal License',
        special: 'Special Discount',
        price: '2,500,000',
        unit: 'Tomans',
        note: 'Price updated just now',
        features: [
          "Activated on your personal email",
          "Access to 3.5 & 4 models (Limited)",
          "No frequent IP changes needed",
          "Gift: 90GB Monthly VPN",
          "Money-back guarantee"
        ],
        button: 'Buy & Activate Now'
      }
    },
    seller: {
      title: 'Verified Seller',
      name: 'Tawana Mohammadi',
      role: 'Founder of PanbeNet',
      bio: 'Guaranteed quality services in Iran. Verified identity with years of experience in international digital services.',
      channelTitle: 'Official Channel',
      channelId: '@panbehnet',
      cta: 'View Full Profile'
    },
    features: {
      title: 'Product Features',
      subtitle: 'Why is this the best choice for you?',
      items: {
        moneyBack: { title: 'Money-Back Guarantee', desc: '100% refund if activation fails.' },
        warranty: { title: '1-Month Warranty', desc: 'Account stability guaranteed for 30 days.' },
        vpn: { title: 'VPN Gift Package', desc: '10GB free monthly data + dedicated servers.' },
        payment: { title: 'Secure Payment', desc: 'Payment via all major debit cards.' },
        fast: { title: 'Instant Delivery', desc: 'Order processing starts immediately after payment.' },
        support: { title: 'Dedicated Support', desc: 'Direct response from the manager on Telegram.' }
      }
    },
    steps: {
      title: 'How to Buy',
      subtitle: 'Complete your order in 4 simple steps.',
      supportStatus: 'Agent Online',
      items: {
        step1: { title: 'Order', desc: 'Message @Rahbarusd on Telegram.' },
        step2: { title: 'Invoice', desc: 'Send your email for license issuance.' },
        step3: { title: 'Payment', desc: 'Pay via secure gateway or card.' },
        step4: { title: 'Delivery', desc: 'Receive account credentials instantly.' }
      },
      securityTitle: 'Secure Purchase',
      securityDesc: 'All transactions and user data are secure. We are an official reseller of digital services.'
    },
    faq: {
      title: 'FAQ',
      items: {
        q1: { q: 'Is this legal?', a: 'Yes, all subscriptions are paid for and activated legally on your email.' },
        q2: { q: 'How is the VPN activated?', a: 'Config is sent to you on Telegram after purchase.' },
        q3: { q: 'Difference between Go & Plus?', a: 'Go is the economical version for stable access at a lower cost.' },
        q4: { q: 'What if it stops working?', a: 'Our support covers you throughout the warranty period.' }
      }
    },
    trust: {
      title: 'Why Trust Us?',
      items: [
        'Verified Seller Identity',
        'Excellent Track Record',
        'Hundreds of Happy Customers'
      ],
      cta: 'Join Trust Channel'
    },
    cta: {
      title: 'Any Questions?',
      subtitle: 'Free consultation before purchase on Telegram.',
      button: 'Contact Support'
    },
    footer: {
      rights: 'All rights reserved.',
      slogan: 'PanbeNet — Gateway to Freedom.',
      links: {
        terms: 'Terms',
        privacy: 'Privacy',
        contact: 'Contact'
      }
    }
  }
};