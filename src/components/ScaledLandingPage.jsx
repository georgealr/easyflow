import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUsers, FiTrendingUp, FiDollarSign, FiGlobe, 
  FiStar, FiAward, FiZap, FiShield, FiHeart,
  FiCode, FiSmartphone, FiMonitor, FiTablet,
  FiCloud, FiDatabase, FiLock, FiSearch,
  FiTarget, FiBarChart, FiSettings, FiMail
} from 'react-icons/fi';

const ScaledLandingPage = ({ onStartBuilding, onStartFromScratch }) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [stats, setStats] = useState({ 
    users: 0, 
    websites: 0, 
    countries: 0, 
    revenue: 0,
    templates: 0,
    satisfaction: 0
  });

  // Real-time stats animation
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        users: Math.min(prev.users + Math.floor(Math.random() * 50) + 10, 287650),
        websites: Math.min(prev.websites + Math.floor(Math.random() * 20) + 5, 45230),
        countries: Math.min(prev.countries + Math.floor(Math.random() * 2), 127),
        revenue: Math.min(prev.revenue + Math.floor(Math.random() * 1000) + 200, 2840000),
        templates: Math.min(prev.templates + Math.floor(Math.random() * 5), 1247),
        satisfaction: Math.min(prev.satisfaction + 0.1, 98.7)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      id: 'ai-powered',
      title: 'AI-Powered Design',
      description: 'Inteligența artificială creează design-uri personalizate în secunde',
      icon: FiZap,
      color: 'from-purple-500 to-indigo-600',
      benefits: ['Design automat', 'Content generation', 'Smart layouts', 'A/B testing'],
      demo: 'Generează 10 variante de design în 30 secunde'
    },
    {
      id: 'enterprise',
      title: 'Enterprise Ready',
      description: 'Soluții complete pentru corporații și agenții digitale',
      icon: FiShield,
      color: 'from-blue-500 to-cyan-600',
      benefits: ['White-label', 'API access', 'Custom integrations', 'Dedicated support'],
      demo: 'Peste 500 companii folosesc EasyFlow pentru clienții lor'
    },
    {
      id: 'global-cdn',
      title: 'Global Performance',
      description: 'CDN global cu 99.9% uptime și încărcare sub 2 secunde',
      icon: FiGlobe,
      color: 'from-green-500 to-emerald-600',
      benefits: ['50+ servere globale', 'Auto-scaling', 'SSL gratuit', 'Backup automat'],
      demo: '1.2s timp mediu de încărcare la nivel global'
    },
    {
      id: 'analytics',
      title: 'Advanced Analytics',
      description: 'Analiză în timp real cu predicții AI pentru optimizare',
      icon: FiBarChart,
      color: 'from-orange-500 to-red-600',
      benefits: ['Real-time tracking', 'Conversion optimization', 'Heatmaps', 'User journey'],
      demo: 'Creștere medie de 34% în conversii cu AI insights'
    }
  ];

  const plans = [
    {
      name: 'Starter',
      price: 'GRATUIT',
      period: '',
      description: 'Perfect pentru începători și proiecte personale',
      features: [
        '5 site-uri web',
        '50 template-uri premium',
        'Subdomain EasyFlow',
        'SSL inclus',
        'Suport comunitate',
        '1GB storage',
        'Analytics de bază'
      ],
      popular: false,
      cta: 'Începe Gratuit',
      color: 'from-gray-500 to-gray-600'
    },
    {
      name: 'Professional',
      price: '49 LEI',
      period: '/lună',
      description: 'Pentru freelanceri și small business',
      features: [
        'Site-uri nelimitate',
        '500+ template-uri premium',
        'Domeniu personalizat gratuit',
        'E-commerce complet',
        'Analytics avansat',
        'AI Design Assistant',
        '50GB storage',
        'Suport prioritar',
        'Remove EasyFlow branding',
        'A/B testing'
      ],
      popular: true,
      cta: 'Începe Perioada de Probă',
      color: 'from-purple-500 to-purple-600',
      badge: 'Cel mai popular'
    },
    {
      name: 'Enterprise',
      price: '199 LEI',
      period: '/lună',
      description: 'Pentru agenții și corporații',
      features: [
        'Tot din Professional',
        'White-label complet',
        'API personalizat',
        'Integrări custom',
        'Manager dedicat',
        'Training pentru echipă',
        '500GB storage',
        'Backup zilnic',
        'SLA 99.9%',
        'Multi-brand management',
        'Advanced permissions',
        'Custom reports'
      ],
      popular: false,
      cta: 'Contactează Vânzări',
      color: 'from-indigo-500 to-blue-600'
    }
  ];

  const testimonials = [
    {
      name: 'Maria Popescu',
      role: 'CEO, Digital Solutions SRL',
      company: 'București',
      avatar: 'https://i.pravatar.cc/150?img=1',
      content: 'EasyFlow a revoluționat modul în care livrăm proiecte clienților. Timpul de dezvoltare s-a redus cu 75%.',
      rating: 5,
      projects: 47,
      revenue: '€125,000'
    },
    {
      name: 'Alexandru Ionescu',
      role: 'Freelancer',
      company: 'Cluj-Napoca',
      avatar: 'https://i.pravatar.cc/150?img=2',
      content: 'Fac 10x mai multe site-uri cu EasyFlow. Clienții sunt impresionați de viteza și calitatea.',
      rating: 5,
      projects: 28,
      revenue: '€45,000'
    },
    {
      name: 'Diana Georgescu',
      role: 'Marketing Director',
      company: 'Timișoara',
      avatar: 'https://i.pravatar.cc/150?img=3',
      content: 'Analytics-ul AI ne-a ajutat să creștem conversiile cu 40%. Incredible!',
      rating: 5,
      projects: 15,
      revenue: '€78,000'
    }
  ];

  const integrations = [
    { name: 'Stripe', logo: '💳', category: 'Payment' },
    { name: 'PayPal', logo: '💰', category: 'Payment' },
    { name: 'Google Analytics', logo: '📊', category: 'Analytics' },
    { name: 'Facebook Pixel', logo: '📱', category: 'Marketing' },
    { name: 'Mailchimp', logo: '📧', category: 'Email' },
    { name: 'Zapier', logo: '⚡', category: 'Automation' },
    { name: 'Shopify', logo: '🛒', category: 'E-commerce' },
    { name: 'WordPress', logo: '📝', category: 'CMS' }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Clean Modern Background */}
      <div className="absolute inset-0">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />
        
        {/* Minimal geometric shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-100 rounded-full opacity-30" />
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-blue-100 rounded-lg opacity-20" />
        
        {/* Clean grid pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='m 60,0 L 0,0 0,60' fill='none' stroke='%23d1d5db' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)' /%3e%3c/svg%3e")`
          }} />
        </div>
      </div>

      {/* Clean Modern Hero Section */}
      <section className="relative z-10 pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            {/* Status Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-purple-50 border border-purple-200 rounded-full text-purple-700 font-medium text-sm mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
              🏆 #1 Website Builder în România • 287,000+ utilizatori
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 font-['Plus_Jakarta_Sans'] leading-tight">
              Construiește site-uri
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                ca un profesionist
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto font-['Poppins'] leading-relaxed">
              Platforma premium folosită de <span className="font-semibold text-purple-600">500+ agenții</span> și 
              <span className="font-semibold text-blue-600"> freelanceri</span> pentru proiecte profesionale
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <button
                onClick={onStartBuilding}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 font-['Poppins'] flex items-center"
              >
                <FiZap className="w-5 h-5 mr-2" />
                Începe să Construiești
              </button>
              
              <button
                onClick={onStartFromScratch}
                className="px-8 py-4 border-2 border-gray-300 bg-white text-gray-700 rounded-lg font-semibold text-lg hover:border-purple-400 hover:text-purple-600 transition-all duration-300 font-['Poppins'] flex items-center"
              >
                <FiStar className="w-5 h-5 mr-2" />
                Neural Studio Pro
                <span className="ml-2 px-2 py-1 bg-orange-500 text-white rounded-full text-xs font-bold">
                  NEW
                </span>
              </button>
            </div>
          </div>

          {/* Clean Stats Dashboard */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                {[
                  { 
                    label: 'Utilizatori Activi', 
                    value: stats.users.toLocaleString(), 
                    icon: FiUsers, 
                    color: 'text-purple-600'
                  },
                  { 
                    label: 'Site-uri Create', 
                    value: stats.websites.toLocaleString(), 
                    icon: FiGlobe, 
                    color: 'text-blue-600'
                  },
                  { 
                    label: 'Țări Active', 
                    value: stats.countries, 
                    icon: FiTarget, 
                    color: 'text-green-600'
                  },
                  { 
                    label: 'Venituri Generate', 
                    value: `€${(stats.revenue / 1000).toFixed(0)}K`, 
                    icon: FiDollarSign, 
                    color: 'text-yellow-600'
                  },
                  { 
                    label: 'Template-uri', 
                    value: stats.templates.toLocaleString(), 
                    icon: FiCode, 
                    color: 'text-indigo-600'
                  },
                  { 
                    label: 'Satisfacție', 
                    value: `${stats.satisfaction.toFixed(1)}%`, 
                    icon: FiHeart, 
                    color: 'text-red-600'
                  }
                ].map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-lg ${stat.color} bg-gray-50 flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1 font-['Plus_Jakarta_Sans']">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 font-['Poppins']">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Features Section */}
      <section className="relative z-10 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 font-medium text-sm mb-8">
              <FiZap className="w-4 h-4 mr-2 text-purple-600" />
              Funcții Avansate
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-['Plus_Jakarta_Sans']">
              Totul de care ai nevoie pentru
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                un site profesionist
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Poppins']">
              Instrumente avansate și automatizare inteligentă pentru rezultate extraordinare
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Features Grid */}
            <div className="grid gap-8">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 font-['Plus_Jakarta_Sans']">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4 font-['Poppins']">
                        {feature.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {feature.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Simple Preview */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <div className="w-full aspect-video bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-gray-400">
                    <FiMonitor className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-semibold">Preview Demo</p>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2 font-['Plus_Jakarta_Sans']">
                  {features[activeFeature]?.title}
                </h4>
                <p className="text-gray-600 font-['Poppins']">
                  {features[activeFeature]?.demo}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
                        {feature.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center text-purple-300 font-medium">
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mr-3" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                      
                      <AnimatePresence>
                        {activeFeature === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 p-6 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl border border-white/20 backdrop-blur-xl"
                          >
                            <div className="flex items-center text-white font-bold text-lg">
                              <FiZap className="w-5 h-5 mr-3 text-purple-400" />
                              {feature.demo}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Premium Preview Display */}
            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                {/* Animated background */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 animate-pulse" />
                
                <div className="relative aspect-video bg-gradient-to-br from-slate-800 via-purple-900 to-slate-800 rounded-2xl flex items-center justify-center overflow-hidden">
                  {/* Dynamic content based on active feature */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center"
                    >
                      <div className={`w-32 h-32 bg-gradient-to-r ${features[activeFeature]?.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl`}>
                        {React.createElement(features[activeFeature]?.icon, { className: "w-16 h-16 text-white" })}
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-3 font-['Plus_Jakarta_Sans']">
                        {features[activeFeature]?.title}
                      </h4>
                      <p className="text-purple-300 font-['Poppins'] text-lg">
                        {features[activeFeature]?.demo}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Floating elements for visual appeal */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${20 + (i % 3) * 20}%`,
                          animationDelay: `${i * 0.8}s`,
                          animationDuration: `${4 + Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Premium feature indicators */}
                <div className="mt-6 flex justify-center space-x-3">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveFeature(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeFeature === index
                          ? 'bg-gradient-to-r from-purple-400 to-blue-400 shadow-lg'
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 💰 Enhanced Pricing */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-6 font-['Plus_Jakarta_Sans']">
              Planuri Pentru Fiecare Nevoie
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Poppins']">
              De la proiecte personale la enterprise solutions. Alege planul perfect pentru tine.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -8 }}
                className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 ${
                  plan.popular 
                    ? 'border-purple-300 shadow-2xl shadow-purple-500/20 scale-105' 
                    : 'border-purple-200/30 shadow-lg hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 font-['Plus_Jakarta_Sans']">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6 font-['Poppins']">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-black text-gray-900 font-['Plus_Jakarta_Sans']">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-1 font-['Poppins']">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700 font-['Poppins']">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-bold transition-all font-['Poppins'] ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl'
                      : 'border-2 border-purple-300 text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  {plan.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🎯 Success Stories */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-6 font-['Plus_Jakarta_Sans']">
              Povești de Succes din România
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Poppins']">
              Peste 500 agenții și freelanceri își dezvoltă businessul cu EasyFlow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -4 }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-purple-200/30 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 font-['Plus_Jakarta_Sans']">
                      {testimonial.name}
                    </h4>
                    <p className="text-purple-600 text-sm font-['Poppins']">
                      {testimonial.role}
                    </p>
                    <p className="text-gray-600 text-sm font-['Poppins']">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 font-['Poppins'] italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-purple-600 font-['Poppins']">
                      {testimonial.projects} proiecte
                    </div>
                    <div className="text-sm text-gray-600 font-['Poppins']">
                      {testimonial.revenue} generat
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔗 Integrations */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-6 font-['Plus_Jakarta_Sans']">
              Integrări cu Tot Ce Ai Nevoie
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Poppins']">
              Conectează-te cu toate toolurile tale favorite într-un singur click
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-purple-200/30 shadow-lg hover:shadow-xl transition-all text-center"
              >
                <div className="text-4xl mb-4">{integration.logo}</div>
                <h4 className="font-bold text-gray-900 mb-2 font-['Plus_Jakarta_Sans']">
                  {integration.name}
                </h4>
                <p className="text-purple-600 text-sm font-['Poppins']">
                  {integration.category}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 Final CTA */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-12 text-white shadow-2xl"
          >
            <h2 className="text-4xl font-black mb-6 font-['Plus_Jakarta_Sans']">
              Gata să Revoluționezi Web Development-ul?
            </h2>
            <p className="text-xl mb-8 opacity-90 font-['Poppins']">
              Alătură-te celor peste 287,000 utilizatori care construiesc viitorul web-ului cu EasyFlow
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                onClick={onStartBuilding}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all font-['Poppins']"
              >
                🚀 Începe Acum - GRATUIT
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all font-['Poppins']"
              >
                📞 Vorbește cu Experții
              </motion.button>
            </div>

            <div className="mt-8 text-sm opacity-75 font-['Poppins']">
              ✅ Nu necesită card de credit • ✅ Setup în 2 minute • ✅ Suport 24/7 în română
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ScaledLandingPage;
