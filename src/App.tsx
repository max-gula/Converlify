/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, animate } from 'motion/react';
import { 
  BarChart3, 
  Target, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Phone, 
  Mail, 
  User,
  TrendingUp,
  ChevronDown
} from 'lucide-react';

const COUNTRY_CODES = [
  { code: '+1', country: 'US/CA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+61', country: 'AU', flag: '🇦🇺' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
  { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+55', country: 'BR', flag: '🇧🇷' },
  { code: '+27', country: 'ZA', flag: '🇿🇦' },
  { code: '+971', country: 'AE', flag: '🇦🇪' },
  { code: '+65', country: 'SG', flag: '🇸🇬' },
  { code: '+34', country: 'ES', flag: '🇪🇸' },
  { code: '+39', country: 'IT', flag: '🇮🇹' },
  { code: '+7', country: 'RU', flag: '🇷🇺' },
  { code: '+52', country: 'MX', flag: '🇲🇽' },
];

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
            <img 
              src="https://iili.io/qja1Zuf.md.png" 
              alt="Converlify Logo" 
              className="w-full h-full object-contain" 
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
            Converlify
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <a href="#what-you-get" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            What You'll Get
          </a>
          <a 
            href="#top" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Request Free Analysis
          </a>
        </div>
      </div>
    </div>
  </nav>
);

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyjFdHRtI4065ExW8jGFyQU1qezyiPvfoK3nrlreUUtsIiKQFmaJN4SYuKzydF1cOCm/exec';

const LeadForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    websiteUrl: '',
    countryCode: '+1',
    phone: '',
    email: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setErrorMessage('');
    
    const { fullName, websiteUrl: rawWebsiteUrl, countryCode, phone: phoneNumber, email } = formData;
    const websiteUrl = `https://${rawWebsiteUrl.replace(/^https?:\/\//, '')}`;
    
    const payload = {
      fullName,
      websiteUrl,
      phoneNumber: `'${countryCode} ${phoneNumber}`,
      email
    };

    console.log("Final payload being sent:", payload);
    console.log("Submitting payload:", payload);
    console.log("Payload JSON:", JSON.stringify(payload));

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      // Because mode:no-cors does not allow reading the response, assume success if fetch does not throw
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        websiteUrl: '',
        countryCode: '+1',
        phone: '',
        email: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center"
      >
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2 font-display">Request Received</h3>
        <p className="text-slate-600 mb-6">
          Thanks, your request has been received. We will be in touch shortly.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
        >
          Submit another request
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-2xl border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
      
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-1 font-display">Request Free Analysis</h3>
        <p className="text-sm text-slate-500">Limited free analyses available before launch</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm text-center">
            {errorMessage}
          </div>
        )}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <User className="w-4 h-4 text-slate-400" /> Full Name
          </label>
          <input
            required
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-400" /> Business Website URL
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-slate-400 text-sm font-medium pointer-events-none">
              https://
            </span>
            <input
              required
              type="text"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              placeholder="example.com"
              className="w-full pl-[68px] pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400" /> Phone Number
            </label>
            <div className="flex gap-2">
              <div className="relative shrink-0 w-[72px]">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-4 py-3 outline-none transition-all cursor-pointer"
                >
                  {COUNTRY_CODES.map((item) => (
                    <option key={`${item.country}-${item.code}`} value={item.code}>
                      {item.flag} {item.code}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none text-slate-400">
                  <ChevronDown className="w-3 h-3" />
                </div>
              </div>
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 000-0000"
                className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" /> Email Address
            </label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@company.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              Request Free Analysis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
        
        <p className="text-center text-xs text-slate-400 pt-2">
          No commitment. Early access opportunity.
        </p>
      </form>
    </div>
  );
};

const ValueCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div 
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer hover:bg-slate-900 group"
  >
    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 transition-colors duration-500 group-hover:bg-slate-800 group-hover:text-indigo-400">
      <Icon className="w-6 h-6" />
    </div>
    <h4 className="text-lg font-bold text-slate-900 mb-2 font-display transition-colors duration-500 group-hover:text-white">{title}</h4>
    <p className="text-slate-600 text-sm leading-relaxed transition-colors duration-500 group-hover:text-slate-400">{description}</p>
  </div>
);

const ConversionScore = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let currentAnimation: { stop: () => void } | undefined;
    let timeoutId: number;
    
    const startRandomAnimation = (from: number) => {
      let to: number;
      do {
        to = 3.5 + Math.random() * 6.5; // Random between 3.5 and 10
      } while (Math.abs(to - from) < 0.7); // Ensure at least 0.7 range

      const distance = Math.abs(to - from);
      // Dynamic duration: longer jumps are faster (lower duration)
      // Max distance is ~6.5. We scale duration between ~0.7s and 2.2s
      const duration = Math.max(0.7, 2.2 - (distance / 6.5) * 1.5);
      
      currentAnimation = animate(from, to, {
        duration,
        ease: "easeInOut",
        onUpdate: (value) => setCount(value),
        onComplete: () => {
          // Wait 1 second before next animation
          timeoutId = window.setTimeout(() => startRandomAnimation(to), 1000);
        }
      });
    };

    // Initial animation from 0 to 7.5 (long jump, should be fast)
    currentAnimation = animate(0, 7.5, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (value) => setCount(value),
      onComplete: () => {
        timeoutId = window.setTimeout(() => startRandomAnimation(7.5), 1000);
      }
    });
    
    return () => {
      if (currentAnimation) currentAnimation.stop();
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  const percentage = (count / 10) * 100;
  const strokeDashoffset = 251.2 - (251.2 * percentage) / 100;

  // Determine color based on score
  const getColorClass = () => {
    if (count >= 7) return "text-emerald-500";
    if (count >= 5) return "text-indigo-600";
    return "text-orange-500";
  };

  return (
    <div 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-xl max-w-4xl mx-auto cursor-pointer transition-all duration-500 hover:bg-slate-900 group"
    >
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-100 transition-colors duration-500 group-hover:text-slate-800"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray="251.2"
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.05, ease: "linear" }}
            className={getColorClass()}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold font-display transition-colors duration-300 ${getColorClass()}`}>
            {count.toFixed(1)}
          </span>
          <span className="text-[8px] font-medium text-slate-400 uppercase tracking-wider transition-colors duration-500 group-hover:text-slate-500 -mt-1">out of 10</span>
        </div>
      </div>
      
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 font-display transition-colors duration-500 group-hover:text-white">
          See How Your Website Actually Performs
        </h3>
        <p className="text-slate-600 mb-4 leading-relaxed transition-colors duration-500 group-hover:text-slate-400">
          Every business we review receives a clear conversion score based on user journey, friction points, and revenue leaks.
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-xs font-medium text-slate-500 transition-all duration-500 group-hover:bg-slate-800 group-hover:border-slate-700 group-hover:text-slate-400">
          <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
          A preview of the scoring system used in our free analysis.
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div id="top" className="min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50 rounded-full blur-3xl opacity-50"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold tracking-wide uppercase mb-6">
                  Free Analysis • No Commitment
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 font-display">
                  Get Your Free <span className="text-indigo-600">Conversion</span> Analysis
                </h1>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-xl">
                  We will review your website and identify where you may be losing sales, leads, and conversions. Stop the leaks and start growing.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center text-slate-500 text-sm">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-indigo-500" />
                    <span>Privacy Guaranteed</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 bg-slate-300 rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-indigo-500" />
                    <span>Early Access Opportunity</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                id="request-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <LeadForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Conversion Score Preview Section */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <ConversionScore />
            </motion.div>
          </div>
        </section>

        {/* Value Section */}
        <section id="what-you-get" className="py-20 bg-slate-50/50 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-display">What You'll Get</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Our team of conversion experts will manually audit your site to provide actionable insights you can implement immediately.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              <ValueCard 
                icon={TrendingUp}
                title="Conversion Score Rating"
                description="Receive a clear score out of 10 based on your website’s current conversion performance and user journey efficiency."
              />
              <ValueCard 
                icon={Target}
                title="Conversion Journey Review"
                description="A deep dive into how users navigate your site and where they encounter friction."
              />
              <ValueCard 
                icon={BarChart3}
                title="Leak Point Identification"
                description="Pinpoint the exact pages and elements where visitors are dropping off the most."
              />
              <ValueCard 
                icon={Zap}
                title="Quick Win Opportunities"
                description="Immediate changes you can make to see an uplift in conversions within days."
              />
              <ValueCard 
                icon={ShieldCheck}
                title="Early Access Consideration"
                description="Priority waitlist status for the Converlify platform launch."
              />
            </div>
          </div>
        </section>

        {/* Urgency Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-indigo-900 rounded-3xl p-10 lg:p-16 text-center text-white relative overflow-hidden shadow-2xl cursor-pointer"
            >
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 font-display">Why Join Now?</h2>
                <p className="text-indigo-100 text-lg mb-10 leading-relaxed">
                  We are currently reviewing a limited number of businesses ahead of launch. 
                  Businesses selected now may also be considered for early access to our full suite of conversion tools.
                </p>
                <a 
                  href="#top"
                  className="inline-flex items-center px-8 py-4 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
                >
                  Secure Your Spot
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://iili.io/qja1Zuf.md.png" 
                  alt="Converlify Logo" 
                  className="w-full h-full object-contain" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-lg font-bold text-slate-900 font-display">
                Converlify
              </span>
            </div>
            
            <div className="text-slate-500 text-sm text-center md:text-left">
              Free conversion analysis for growing brands.
            </div>

            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <a href="mailto:hello@converlify.com" className="hover:text-indigo-600 transition-colors">hello@converlify.com</a>
              <span>© 2026 Converlify. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
