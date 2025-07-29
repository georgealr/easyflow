import React, { useRef } from 'react';
import { const ModernLandingPage = ({ onGetStarted }) => {
  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { once: true });iew } from 'framer-motion';
import { FaRocket, FaPlay, FaCheck, FaStar, FaArrowRight, FaCode, FaPalette, FaMobile, FaChartLine, FaLock, FaHeadset } from 'react-icons/fa';

// Romanian pricing plans
const PLANS = [
  {
    name: 'Începător',
    price: 'GRATUIT',
    period: '/lună',
    popular: false,
    features: [
      '3 site-uri web',
      '10 template-uri',
      'Hosting gratuit',
      'SSL inclus',
      'Suport email'
    ]
  },
  {
    name: 'Profesional',
    price: '49 LEI',
    period: '/lună',
    popular: true,
    features: [
      'Site-uri nelimitate',
      '500+ template-uri premium',
      'Domeniu gratuit',
      'Analytics avansat',
      'Suport prioritar',
      'E-commerce integrat'
    ]
  },
  {
    name: 'Enterprise',
    price: '99 LEI', 
    period: '/lună',
    popular: false,
    features: [
      'Tot din Profesional',
      'White-label soluții',
      'API personalizat',
      'Manager dedicat',
      'Backup automat',
      'CDN global'
    ]
  }
];

const ModernLandingPage = ({ onGetStarted }) => {
  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { once: true });

  const showTemplates = () => {
    // Show the features and pricing sections
    const features = document.getElementById('features');
    const pricing = document.getElementById('pricing');
    if (features) features.classList.remove('hidden');
    if (pricing) pricing.classList.remove('hidden');
    
    // Scroll to features section
    if (features) features.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-600 text-white font-inter">
      {/* Minimalist Hero Section - Exact Copy of Reference */}
      <section className="min-h-screen bg-gray-600 flex flex-col items-center justify-center px-6 relative">
        {/* Logo/Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="w-20 h-20 bg-gray-400/30 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-gray-400/20">
            <FaRocket className="text-white text-2xl" />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight">
            Construiește
            <br />
            Viitorul
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 font-normal max-w-4xl mx-auto leading-relaxed">
            Creează site-uri web uimitoare și profesionale cu modele avansate de design,
            <br />
            estetică modernă și funcționalitate de vârf
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <button
            onClick={showTemplates}
            className="px-8 py-4 bg-gray-500/40 hover:bg-gray-500/50 text-white font-medium rounded-lg transition-all border border-gray-400/30 backdrop-blur-sm flex items-center gap-3"
          >
            Începe să Creezi
            <FaArrowRight className="text-lg" />
          </button>
          
          <button className="px-8 py-4 bg-transparent hover:bg-gray-500/20 text-white font-medium rounded-lg transition-all border border-gray-400/30 backdrop-blur-sm flex items-center gap-3">
            <FaPlay className="text-lg" />
            Urmărește Demo
          </button>
        </motion.div>

        {/* Browser Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="bg-gray-500/20 rounded-2xl p-4 backdrop-blur-sm border border-gray-400/20">
            {/* Browser Header */}
            <div className="flex items-center gap-3 mb-4 px-4 py-3 bg-gray-500/30 rounded-lg">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 bg-gray-600/50 rounded px-4 py-1 text-sm text-gray-300">
                https://site-ul-tau-uimitor.com
              </div>
            </div>
            
            {/* Browser Content */}
            <div className="aspect-video bg-gray-600/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-400/30 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <FaRocket className="text-white text-xl" />
                </div>
                <div className="text-gray-400 text-sm">Site-ul tău aici...</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section - Hidden initially, shown after click */}
      <section ref={featuresRef} className="py-32 px-6 bg-gray-700 hidden" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              De ce EasyFlow?
            </h2>
            <p className="text-lg text-gray-300 font-normal">
              Platformă completă pentru crearea site-urilor profesionale
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaCode className="text-4xl text-blue-400" />,
                title: 'Fără Cod',
                description: 'Creează site-uri complexe fără cunoștințe de programare'
              },
              {
                icon: <FaPalette className="text-4xl text-purple-400" />,
                title: 'Design Modern',
                description: 'Template-uri profesionale și personalizabile'
              },
              {
                icon: <FaMobile className="text-4xl text-green-400" />,
                title: 'Responsive',
                description: 'Perfect pe toate dispozitivele automat'
              },
              {
                icon: <FaChartLine className="text-4xl text-orange-400" />,
                title: 'Analytics',
                description: 'Urmărește performanța site-ului tău'
              },
              {
                icon: <FaLock className="text-4xl text-red-400" />,
                title: 'Securitate',
                description: 'SSL gratuit și backup automat'
              },
              {
                icon: <FaHeadset className="text-4xl text-pink-400" />,
                title: 'Suport 24/7',
                description: 'Echipă dedicată pentru ajutor permanent'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-600/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-500/30 hover:border-gray-400/50 transition-all text-center"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 font-normal">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Hidden initially */}
      <section className="py-32 px-6 bg-gray-800 hidden" id="pricing">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Alege planul potrivit
            </h2>
            <p className="text-lg text-gray-300 font-normal">
              Începe gratuit, upgrade când ai nevoie de mai multe funcții
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PLANS.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-gray-600/50 backdrop-blur-sm p-8 rounded-2xl border-2 transition-all hover:scale-105 ${
                  plan.popular 
                    ? 'border-blue-500 shadow-2xl shadow-blue-500/20' 
                    : 'border-gray-500/30 hover:border-gray-400/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-xl">
                      ⭐ Cel Mai Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-white mb-3">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-2 text-base">{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <FaCheck className="text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 font-normal">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={onGetStarted}
                  className={`w-full py-3.5 px-6 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25'
                      : 'bg-gray-500/40 text-white hover:bg-gray-500/50 border border-gray-400/30'
                  }`}
                >
                  Începe Acum
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernLandingPage;