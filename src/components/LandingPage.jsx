import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiArrowRight, FiPlayCircle, FiCheck, FiStar, FiUsers, FiTrendingUp, FiTarget, FiZap, FiShield, FiHeart } from 'react-icons/fi';

const LandingPage = ({ onStartBuilding, onStartFromScratch }) => {
  const [activeTab, setActiveTab] = useState('features');
  const [isPlaying, setIsPlaying] = useState(false);
  const [stats, setStats] = useState({ websites: 0, users: 0, satisfaction: 0 });
  
  // Mouse tracking for interactive elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [30, -30]);
  const rotateY = useTransform(mouseX, [-300, 300], [-30, 30]);

  // Animated counters
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({ websites: 25000, users: 150000, satisfaction: 98 });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 text-slate-900 overflow-hidden">
      {/* Dynamic background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.03),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSI0MCIgZmlsbD0icmdiYSg5OSwxMDIsMjQxLDAuMDMpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] opacity-40"></div>

      {/* Header */}
      <header className="relative z-50 bg-white/60 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Purple Premium Logo */}
              <div className="relative group cursor-pointer">
                {/* Elegant purple circle with abstract symbol */}
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 border border-purple-500/30">
                  
                  {/* Abstract flowing symbol */}
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="relative z-10">
                    <defs>
                      <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#f3e8ff" />
                      </linearGradient>
                    </defs>
                    
                    {/* Flowing wave/stream symbol */}
                    <path 
                      d="M3 9 Q6 6 9 9 T15 9" 
                      stroke="url(#flowGradient)" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      fill="none"
                      className="animate-pulse"
                    />
                    
                    {/* Secondary flow line */}
                    <path 
                      d="M4 6 Q7 3 10 6 T16 6" 
                      stroke="url(#flowGradient)" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      fill="none"
                      opacity="0.7"
                      className="animate-pulse"
                      style={{animationDelay: '0.5s'}}
                    />
                    
                    {/* Third flow line */}
                    <path 
                      d="M4 12 Q7 15 10 12 T16 12" 
                      stroke="url(#flowGradient)" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      fill="none"
                      opacity="0.7"
                      className="animate-pulse"
                      style={{animationDelay: '1s'}}
                    />
                  </svg>
                  
                  {/* Subtle sparkle */}
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full opacity-80 animate-ping"></div>
                </div>
                
                {/* Purple glow effect */}
                <div className="absolute inset-0 w-12 h-12 bg-purple-500 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
              </div>
              
              {/* Clean Typography - lowercase */}
              <div className="flex flex-col">
                <div className="relative">
                  <h1 className="text-3xl font-medium tracking-tight text-slate-900">
                    easyflow
                  </h1>
                  
                  {/* Purple underline */}
                  <motion.div 
                    className="absolute -bottom-0.5 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>

            <nav className="hidden md:flex items-center space-x-10">
              {['Produse', 'Servicii', 'Enterprise', 'Suport'].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  className="flow-caption flow-text-secondary hover:text-indigo-600 transition-colors relative group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              ))}
            </nav>

            <motion.button
              className="relative px-8 py-3 bg-slate-900 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group border border-slate-800"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartBuilding}
            >
              {/* Subtle hover background */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Button content - Minimalist */}
              <div className="relative flex items-center space-x-3">
                <span className="text-sm font-medium tracking-wide">Launch EasyFlow</span>
                <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              
              {/* Premium shine - Very subtle */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="text-center lg:text-left relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full flow-caption font-semibold text-indigo-700 mb-8 border border-indigo-100">
                  <FiStar className="w-4 h-4 mr-2 text-indigo-500" />
                  De încredere pentru 500K+ profesioniști români
                </div>
                
                <h1 className="flow-hero flow-text-primary leading-none mb-8">
                  Dezvoltă
                  <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    platforme digitale
                  </span>
                  profesionale
                </h1>
                
                <p className="flow-body flow-text-secondary mb-12 leading-relaxed max-w-lg">
                  Soluția enterprise pentru dezvoltarea aplicațiilor web avansate. 
                  Dezvoltare fără cod cu rezultate de nivel profesional.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                  <motion.button
                    className="flow-button flow-button-primary text-base px-8 py-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onStartBuilding}
                  >
                    Launch EasyFlow
                    <FiArrowRight className="ml-2 w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    className="flow-button flow-button-secondary text-base px-8 py-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onStartFromScratch}
                  >
                    <FiZap className="mr-2 w-5 h-5" />
                    Editor Liber
                  </motion.button>
                  
                  <motion.button
                    className="flow-button flow-button-secondary text-base px-6 py-4"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    <FiPlayCircle className="mr-2 w-5 h-5" />
                    Vezi Demo
                  </motion.button>
                </div>

                {/* Enhanced Social Proof */}
                <div className="flex items-center justify-center lg:justify-start space-x-12">
                  <div className="text-center">
                    <div className="flow-title flow-text-primary mb-1" style={{ fontSize: '32px' }}>{stats.websites.toLocaleString()}+</div>
                    <div className="flow-caption flow-text-muted">Aplicații Active</div>
                  </div>
                  <div className="text-center">
                    <div className="flow-title flow-text-primary mb-1" style={{ fontSize: '32px' }}>{stats.users.toLocaleString()}+</div>
                    <div className="flow-caption flow-text-muted">Clienți Enterprise</div>
                  </div>
                  <div className="text-center">
                    <div className="flow-title flow-text-primary mb-1" style={{ fontSize: '32px' }}>{stats.satisfaction}%</div>
                    <div className="flow-caption flow-text-muted">Disponibilitate</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Interactive Preview */}
            <div className="relative">
              <motion.div
                className="relative mx-auto max-w-lg"
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={handleMouseMove}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <div className="relative flow-bg-surface rounded-3xl shadow-2xl overflow-hidden border border-white/40">
                  {/* Modern Browser Header */}
                  <div className="bg-gradient-to-r from-slate-100 to-slate-50 p-5 border-b border-slate-200/50">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-2">
                        <div className="w-3.5 h-3.5 bg-red-400 rounded-full"></div>
                        <div className="w-3.5 h-3.5 bg-yellow-400 rounded-full"></div>
                        <div className="w-3.5 h-3.5 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-white rounded-lg px-4 py-2 ml-4">
                        <span className="flow-caption text-slate-500">enterprise.flow</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Website Preview */}
                  <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50/30 p-10 min-h-[420px] flex flex-col justify-center items-center text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl mb-6 flex items-center justify-center shadow-lg">
                      <FiTarget className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="flow-subtitle flow-text-primary mb-3" style={{ fontSize: '24px' }}>Arhitectura Avansată</h3>
                    <p className="flow-body flow-text-secondary mb-6" style={{ fontSize: '16px' }}>Infrastructură enterprise, scalabilitate nelimitată</p>
                    <div className="w-full max-w-sm space-y-3">
                      <div className="h-3 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full w-5/6"></div>
                      <div className="h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full w-4/6"></div>
                      <div className="h-3 bg-gradient-to-r from-pink-200 to-indigo-200 rounded-full w-3/4"></div>
                    </div>
                    <div className="mt-8 flex space-x-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg"></div>
                      <div className="w-8 h-8 bg-purple-100 rounded-lg"></div>
                      <div className="w-8 h-8 bg-pink-100 rounded-lg"></div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Floating Elements */}
                <motion.div
                  className="absolute -top-6 -right-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white p-4 rounded-2xl shadow-xl"
                  animate={{ y: [-8, 8, -8], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <FiCheck className="w-6 h-6" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-2xl shadow-xl"
                  animate={{ y: [8, -8, 8], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
                >
                  <FiHeart className="w-6 h-6" />
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -left-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl shadow-lg"
                  animate={{ x: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  <FiZap className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2
              className="flow-title flow-text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Produse și Servicii Complete
            </motion.h2>
            <motion.p
              className="flow-body flow-text-secondary max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Soluții integrate pentru toate nevoile tale digitale. De la design la hosting și securitate.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FiZap,
                title: 'Website Design',
                description: 'Creează site-ul tău cu instrumente intuitive de design și funcții avansate',
                gradient: 'from-yellow-400 to-orange-500'
              },
              {
                icon: FiShield,
                title: 'Website Security',
                description: 'Securitate enterprise pentru site-ul tău cu monitoring și protecție continuă',
                gradient: 'from-green-400 to-emerald-500'
              },
              {
                icon: FiTrendingUp,
                title: 'SEO Tools',
                description: 'Optimizează site-ul pentru motoarele de căutare și crește traficul organic',
                gradient: 'from-blue-400 to-indigo-500'
              },
              {
                icon: FiUsers,
                title: 'Web Hosting',
                description: 'Hosting sigur și fiabil pentru website cu 99.9% uptime garantat',
                gradient: 'from-purple-400 to-pink-500'
              },
              {
                icon: FiTarget,
                title: 'Domain Names',
                description: 'Cumpără și înregistrează domeniul perfect pentru website-ul tău',
                gradient: 'from-indigo-400 to-purple-500'
              },
              {
                icon: FiHeart,
                title: 'Website Analytics',
                description: 'Rapoarte detaliate cu date acționabile și insights pentru business',
                gradient: 'from-pink-400 to-red-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group p-8 flow-bg-surface rounded-3xl hover:shadow-2xl transition-all duration-500 border border-white/50"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="flow-subtitle flow-text-primary mb-4" style={{ fontSize: '22px' }}>{feature.title}</h3>
                <p className="flow-body flow-text-secondary leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2
              className="flow-title flow-text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Găsește planul potrivit pentru tine
            </motion.h2>
            <motion.p
              className="flow-body flow-text-secondary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Toate planurile includ domeniu gratuit, hosting fiabil și suport 24/7
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: 'Light',
                subtitle: 'Începe cu bazele',
                price: '0',
                period: 'LEI/lună',
                features: ['Domeniu gratuit pentru 1 an', '2 GB spațiu de stocare', 'Hosting multi-cloud', 'Instrumente marketing de bază', '2 colaboratori site'],
                popular: false,
                cta: 'Începe Gratuit'
              },
              {
                name: 'Core',
                subtitle: 'Atrage-ți audiența',
                price: '49',
                period: 'LEI/lună',
                features: ['Domeniu gratuit pentru 1 an', '50 GB spațiu de stocare', 'Hosting multi-cloud', 'Suite marketing standard', 'Accept plăți online', '5 colaboratori site'],
                popular: false,
                cta: 'Selectează Core'
              },
              {
                name: 'Business',
                subtitle: 'Dezvoltă-ți brandul',
                price: '99',
                period: 'LEI/lună',
                features: ['Domeniu gratuit pentru 1 an', '100 GB spațiu de stocare', 'Hosting multi-cloud', 'Suite marketing avansate', 'Accept plăți online', 'Programări și servicii', '10 colaboratori site'],
                popular: true,
                cta: 'Selectează Business'
              },
              {
                name: 'Business Elite',
                subtitle: 'Scalează businessul',
                price: '149',
                period: 'LEI/lună',
                features: ['Domeniu gratuit pentru 1 an', 'Spațiu de stocare nelimitat', 'Hosting multi-cloud', 'Suite marketing premium', 'Accept plăți online', 'Programări și servicii', '100 colaboratori site'],
                popular: false,
                cta: 'Selectează Elite'
              }
            ].map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`group relative p-6 rounded-2xl ${plan.popular 
                  ? 'bg-slate-900 text-white scale-105 border-2 border-indigo-500' 
                  : 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-900 hover:text-white hover:border-indigo-500'
                } shadow-xl hover:shadow-2xl transition-all duration-300`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: plan.popular ? 1.05 : 1.02 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-500 text-white px-4 py-1 rounded-full wix-caption font-semibold">
                      RECOMANDAT
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className={`wix-subtitle wix-text-primary mb-2 transition-colors duration-300 ${plan.popular ? 'text-white' : 'text-slate-900 group-hover:text-white'}`} style={{ fontSize: '24px' }}>{plan.name}</h3>
                  <p className={`wix-caption mb-4 transition-colors duration-300 ${plan.popular ? 'text-slate-300' : 'text-slate-600 group-hover:text-slate-300'}`}>
                    {plan.subtitle}
                  </p>
                  <div className="flex items-center justify-center mb-2">
                    <span className={`wix-display transition-colors duration-300 ${plan.popular ? 'text-white' : 'text-slate-900 group-hover:text-white'}`} style={{ fontSize: '36px' }}>{plan.price}</span>
                    <span className={`ml-2 wix-caption transition-colors duration-300 ${plan.popular ? 'text-slate-300' : 'text-slate-600 group-hover:text-slate-300'}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <FiCheck className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 transition-colors duration-300 ${plan.popular ? 'text-indigo-400' : 'text-green-500 group-hover:text-indigo-400'}`} />
                      <span className={`wix-caption transition-colors duration-300 ${plan.popular ? 'text-slate-300' : 'text-slate-600 group-hover:text-slate-300'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full wix-button transition-all duration-300 ${
                    plan.popular
                      ? 'wix-button-secondary bg-white text-slate-900 hover:bg-slate-100'
                      : 'wix-button-primary group-hover:bg-white group-hover:text-slate-900'
                  }`}
                  onClick={onStartBuilding}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FiZap className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          
          <motion.h2
            className="wix-title wix-text-primary mb-6" 
            style={{ fontSize: '36px', fontWeight: '700', color: '#0F0F0F' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Gata să îți creezi site-ul perfect?
          </motion.h2>
          <motion.p
            className="wix-body text-slate-600 mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Alătură-te celor peste 25.000 de români care și-au transformat ideile în site-uri profesionale cu EasyFlow.
          </motion.p>
          <motion.button
            className="wix-button wix-button-primary px-8 py-4 text-lg font-semibold shadow-lg inline-flex items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartBuilding}
          >
            Launch EasyFlow Acum
            <FiArrowRight className="ml-3 w-5 h-5" />
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 rounded-full flex items-center justify-center shadow-md border border-purple-500/30">
                  {/* Same flowing symbol as header */}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <defs>
                      <linearGradient id="flowGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#f3e8ff" />
                      </linearGradient>
                    </defs>
                    
                    <path 
                      d="M3 8 Q5 6 8 8 T13 8" 
                      stroke="url(#flowGradientFooter)" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      fill="none"
                    />
                    
                    <path 
                      d="M3 5 Q6 3 9 5 T15 5" 
                      stroke="url(#flowGradientFooter)" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      fill="none"
                      opacity="0.7"
                    />
                    
                    <path 
                      d="M3 11 Q6 13 9 11 T15 11" 
                      stroke="url(#flowGradientFooter)" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      fill="none"
                      opacity="0.7"
                    />
                  </svg>
                </div>
                <span className="text-2xl font-medium text-slate-900">easyflow</span>
              </div>
              <p className="text-slate-600 mb-4">
                Platforma românească pentru crearea de site-uri web profesionale.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-slate-900">Produs</h4>
              <ul className="space-y-2 text-slate-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Caracteristici</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Template-uri</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Prețuri</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-slate-900">Suport</h4>
              <ul className="space-y-2 text-slate-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Ajutor</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Status</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-slate-900">Companie</h4>
              <ul className="space-y-2 text-slate-600">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Despre noi</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Cariere</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200 mt-8 pt-8 text-center text-slate-500">
            <p>&copy; 2024 EasyFlow. Toate drepturile rezervate.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
