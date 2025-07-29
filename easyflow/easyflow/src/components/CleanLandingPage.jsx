import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FiArrowRight, FiStar, FiCheck, FiShield, FiHeart, FiUsers, FiAward,
  FiZap, FiEdit, FiMonitor, FiBarChart
} from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

// Custom SVG Icons pentru metode de plată
const VisaIcon = () => (
  <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
    <rect width="60" height="20" rx="4" fill="#1A1F71"/>
    <path d="M22.7 14h-2.3l1.4-8h2.3l-1.4 8zm10.1-8c-.7 0-1.7.3-2.2.8l-.4-2.3h-2l1.5 9.2h2.1l-.5-2.8c.5-.3 1.2-.5 1.8-.5.8 0 1.4.3 1.4 1.1 0 .2 0 .4-.1.6l-.7 3.6h2.1l.8-4c.1-.5.2-1 .2-1.4 0-1.6-1.1-2.3-2.5-2.3l-.5.1zm-8.4 4.2c0-1.8-2.5-1.9-2.5-2.7 0-.2.2-.5.7-.5.4 0 .9.1 1.3.3l.2-1.9c-.4-.1-.9-.2-1.5-.2-1.6 0-2.7 1-2.7 2.2 0 1 .8 1.5 1.4 1.8.6.3.8.5.8.8 0 .5-.5.7-1 .7-.8 0-1.3-.2-1.6-.4l-.3 1.9c.4.2 1 .3 1.7.3 1.8 0 2.9-.9 2.9-2.3l-.4 0z" fill="white"/>
  </svg>
);

const MastercardIcon = () => (
  <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
    <rect width="60" height="20" rx="4" fill="#EB001B"/>
    <circle cx="22" cy="10" r="8" fill="#FF5F00"/>
    <circle cx="38" cy="10" r="8" fill="#F79E1B"/>
    <path d="M30 4.5c1.5 1.2 2.5 3.1 2.5 5.5s-1 4.3-2.5 5.5c-1.5-1.2-2.5-3.1-2.5-5.5s1-4.3 2.5-5.5z" fill="#FF5F00"/>
  </svg>
);

const ApplePayIcon = () => (
  <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
    <rect width="60" height="20" rx="4" fill="#000"/>
    <path d="M17.5 8.2c0-1.8 1.5-2.7 1.6-2.8-0.9-1.2-2.2-1.4-2.7-1.4-1.1-0.1-2.2 0.7-2.8 0.7-0.6 0-1.5-0.7-2.4-0.7-1.3 0-2.4 0.7-3.1 1.8-1.3 2.3-0.3 5.7 0.9 7.6 0.6 0.9 1.3 2 2.2 1.9 0.9 0 1.2-0.6 2.3-0.6s1.4 0.6 2.3 0.6c1 0 1.5-0.9 2.1-1.8 0.7-1.1 0.9-2.1 0.9-2.2-0.0-0.0-1.8-0.7-1.8-2.8l0.5-0.3z" fill="white"/>
    <text x="25" y="14" fill="white" fontSize="8" fontFamily="Arial">Pay</text>
  </svg>
);

const GooglePayIcon = () => (
  <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
    <rect width="60" height="20" rx="4" fill="#4285F4"/>
    <path d="M15 6h2v8h-2V6zm4 0h2v8h-2V6zm-8 4c0-1.1 0.9-2 2-2s2 0.9 2 2-0.9 2-2 2-2-0.9-2-2zm0 0" fill="white"/>
    <text x="25" y="14" fill="white" fontSize="8" fontFamily="Arial">Pay</text>
  </svg>
);

const SEPAIcon = () => (
  <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
    <rect width="60" height="20" rx="4" fill="#003399"/>
    <text x="30" y="12" fill="white" fontSize="9" fontFamily="Arial" textAnchor="middle">SEPA</text>
    <circle cx="15" cy="10" r="3" fill="none" stroke="white" strokeWidth="1"/>
    <circle cx="45" cy="10" r="3" fill="none" stroke="white" strokeWidth="1"/>
  </svg>
);

const StripeIcon = () => (
  <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
    <rect width="60" height="20" rx="4" fill="#635BFF"/>
    <path d="M25 8c0-0.8-0.7-1.2-1.8-1.2-1.3 0-2.2 0.6-2.2 1.5 0 0.7 0.5 1.1 1.6 1.3l0.6 0.1c0.6 0.1 0.9 0.2 0.9 0.5 0 0.4-0.4 0.6-1 0.6-0.8 0-1.3-0.3-1.3-0.8h-1.5c0 1.2 1.1 1.9 2.8 1.9 1.6 0 2.6-0.7 2.6-1.7 0-0.8-0.6-1.2-1.7-1.4l-0.6-0.1c-0.5-0.1-0.8-0.2-0.8-0.5 0-0.3 0.3-0.5 0.8-0.5 0.6 0 1 0.2 1 0.7h1.6v0.1z" fill="white"/>
    <text x="35" y="12" fill="white" fontSize="6" fontFamily="Arial">tripe</text>
  </svg>
);

const CleanLandingPage = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  // Data pentru diferite secțiuni
  const stats = [
    { number: "50K+", label: "Utilizatori Activi", icon: FiUsers, color: "from-blue-500 to-purple-500" },
    { number: "99.9%", label: "Uptime Garantat", icon: FiShield, color: "from-green-500 to-emerald-500" },
    { number: "2.5s", label: "Viteză de Încărcare", icon: FiZap, color: "from-yellow-500 to-orange-500" },
    { number: "24/7", label: "Suport Expert", icon: FiHeart, color: "from-red-500 to-pink-500" }
  ];

  const features = [
    {
      title: "Editor Visual Profesional",
      description: "Interfață intuitivă pentru crearea de conținut web fără cunoștințe tehnice. Drag & drop avansat cu preview în timp real.",
      icon: FiEdit,
      gradient: "from-purple-500 to-blue-500"
    },
    {
      title: "Template-uri Business",
      description: "Colecție curată de design-uri profesionale pentru toate sectoarele de activitate, optimizate pentru conversii.",
      icon: FiStar,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Optimizare SEO Automată",
      description: "Toate site-urile sunt optimizate pentru motoarele de căutare cu meta tags, sitemap și structură semantică.",
      icon: FiBarChart,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Design Responsiv",
      description: "Adaptare automată pentru toate dispozitivele. Experiență optimă pe desktop, tablet și mobil.",
      icon: FiMonitor,
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Analytics Integrate",
      description: "Monitorizare completă a performanței cu rapoarte detaliate despre trafic, conversii și comportamentul utilizatorilor.",
      icon: FiZap,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Suport Tehnic Dedicat",
      description: "Echipă de specialiști disponibilă pentru consultanță tehnică, training și implementare personalizată.",
      icon: FiShield,
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  const testimonials = [
    {
      name: "Maria Popescu",
      role: "Antreprenor",
      company: "Beauty Studio Cluj",
      content: "EasyFlow mi-a transformat complet businessul! În doar 2 săptămâni am avut un site superb și vânzările au crescut cu 300%.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      rating: 5,
      results: "+300% Vânzări"
    },
    {
      name: "Alexandru Ionescu",
      role: "Marketing Manager",
      company: "TechStart România",
      content: "Cel mai bun website builder din România! Echipa noastră a creat 5 site-uri profesionale în timp record.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      rating: 5,
      results: "+150% Leads"
    },
    {
      name: "Elena Radu",
      role: "Consultant",
      company: "Digital Agency Pro",
      content: "Recomand cu încredere! Clienții mei sunt încântați de rezultate. Support-ul este excepțional, răspund în minute!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      rating: 5,
      results: "+200% ROI"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect pentru începători",
      price: "29 RON",
      period: "/lună",
      popular: false,
      features: [
        "1 Site Web",
        "10GB Spațiu",
        "Template-uri Basic",
        "SSL Gratuit",
        "Suport Email"
      ]
    },
    {
      name: "Pro",
      description: "Ideal pentru profesioniști",
      price: "99 RON",
      period: "/lună",
      popular: true,
      features: [
        "5 Site-uri Web",
        "100GB Spațiu",
        "Template-uri Premium",
        "AI Design Assistant",
        "Analytics Avansate",
        "Suport Prioritar 24/7",
        "Integrări Unlimited"
      ]
    },
    {
      name: "Business",
      description: "Pentru agenții și echipe",
      price: "199 RON",
      period: "/lună",
      popular: false,
      features: [
        "Site-uri Unlimited",
        "500GB Spațiu",
        "White-label Solution",
        "API Access",
        "Manager Dedicat",
        "Training Personalizat"
      ]
    }
  ];

  const integrations = [
    { name: "Google Analytics", icon: "📊" },
    { name: "Facebook Pixel", icon: "📘" },
    { name: "MailChimp", icon: "📧" },
    { name: "Stripe", icon: "💳" },
    { name: "PayPal", icon: "💰" },
    { name: "WordPress", icon: "📝" },
    { name: "Shopify", icon: "🛍️" },
    { name: "WooCommerce", icon: "🛒" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section - Enhanced */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <motion.div style={{ opacity }} className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Logo și Brand */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">E</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                EasyFlow România
              </h1>
            </motion.div>

            {/* Main Headline */}
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Platforma Profesională pentru{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Website-uri de Business
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Soluția completă pentru companii care doresc o prezență online profesională. 
              <span className="text-purple-400 font-semibold"> Editor avançat</span>, 
              <span className="text-blue-400 font-semibold"> template-uri premium</span> și 
              <span className="text-green-400 font-semibold"> suport dedicat</span>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="flex items-center">
                  Începe Gratuit
                  <FiArrowRight className="ml-2" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Vezi Demo
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-wrap justify-center items-center gap-8 text-slate-400 text-sm"
            >
              <div className="flex items-center">
                <FiShield className="w-4 h-4 mr-2 text-green-400" />
                Certificat SSL
              </div>
              <div className="flex items-center">
                <FiCheck className="w-4 h-4 mr-2 text-green-400" />
                Test gratuit 14 zile
              </div>
              <div className="flex items-center">
                <FiUsers className="w-4 h-4 mr-2 text-blue-400" />
                Support dedicat
              </div>
              <div className="flex items-center">
                <FiHeart className="w-4 h-4 mr-2 text-purple-400" />
                Made in Romania
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Dashboard */}
      <section className="py-32 px-4 relative">
        <motion.div style={{ y: y1 }} className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Performanțe <span className="text-purple-400">Demonstrate</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Rezultate măsurabile pentru companiile care ne-au ales ca partener tehnologic
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300 text-center overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} mb-6`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Number */}
                <motion.h3
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="text-5xl font-black mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
                >
                  {stat.number}
                </motion.h3>

                {/* Label */}
                <p className="text-slate-400 font-medium text-lg group-hover:text-slate-300 transition-colors">
                  {stat.label}
                </p>

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-32 px-4 relative">
        <motion.div style={{ y: y1 }} className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Soluții <span className="text-purple-400">Profesionale</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Tehnologie avansată și funcționalități enterprise pentru businessul tău
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -15, rotateY: 5 }}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-300 transition-colors" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed text-lg group-hover:text-slate-200 transition-colors">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section - Enhanced */}
      <section className="py-32 px-4 relative">
        <motion.div style={{ y: y2 }} className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Clienți <span className="text-purple-400">Mulțumiți</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Companii care ne-au ales pentru transformarea digitală și au obținut rezultate concrete
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300 overflow-hidden"
              >
                {/* Success Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-xs font-bold">
                  {testimonial.results}
                </div>

                {/* Stars */}
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-300 leading-relaxed text-lg mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Profile */}
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full mr-4 border-2 border-purple-500/30"
                  />
                  <div>
                    <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                    <p className="text-slate-400">{testimonial.role}</p>
                    <p className="text-purple-400 text-sm font-semibold">{testimonial.company}</p>
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Pricing Section - Enhanced */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Planuri de <span className="text-purple-400">Abonament</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Soluții scalabile pentru orice tip de business. <span className="text-green-400 font-semibold">Support inclus</span> în toate planurile.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: plan.popular ? 1.05 : 1.02 }}
                className={`relative p-8 rounded-3xl backdrop-blur-sm border transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/50 shadow-2xl shadow-purple-500/20 scale-105' 
                    : 'bg-gradient-to-br from-white/10 to-white/5 border-white/10 hover:border-purple-500/30'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold text-sm">
                      🔥 Cel mai popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-slate-400 mb-6">{plan.description}</p>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-black">{plan.price}</span>
                    <span className="text-slate-400 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-sm text-slate-500">+ TVA</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-slate-300">
                      <FiCheck className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {plan.popular ? '🚀 Începe Acum' : 'Selectează Planul'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              <span className="text-purple-400">Integrări</span> Enterprise
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Conectivitate cu toate sistemele și serviciile pe care le folosești în companie
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{integration.icon}</div>
                <p className="text-sm text-center font-medium">{integration.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Payment Methods Section */}
      <section className="py-32 px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Plăți <span className="text-purple-400">Securizate</span>
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Procesare sigură prin parteneri de încredere cu certificare bancară
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-8 mb-12"
          >
            {/* Visa */}
            <motion.div
              whileHover={{ scale: 1.15, y: -5 }}
              className="flex items-center justify-center w-24 h-16 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <VisaIcon />
            </motion.div>

            {/* Mastercard */}
            <motion.div
              whileHover={{ scale: 1.15, y: -5 }}
              className="flex items-center justify-center w-24 h-16 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
            >
              <MastercardIcon />
            </motion.div>

            {/* Apple Pay */}
            <motion.div
              whileHover={{ scale: 1.15, y: -5 }}
              className="flex items-center justify-center w-24 h-16 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:border-gray-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/20"
            >
              <ApplePayIcon />
            </motion.div>

            {/* Google Pay */}
            <motion.div
              whileHover={{ scale: 1.15, y: -5 }}
              className="flex items-center justify-center w-24 h-16 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <GooglePayIcon />
            </motion.div>

            {/* SEPA */}
            <motion.div
              whileHover={{ scale: 1.15, y: -5 }}
              className="flex items-center justify-center w-24 h-16 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:border-blue-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20"
            >
              <SEPAIcon />
            </motion.div>

            {/* Stripe */}
            <motion.div
              whileHover={{ scale: 1.15, y: -5 }}
              className="flex items-center justify-center w-24 h-16 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <StripeIcon />
            </motion.div>
          </motion.div>

          {/* Security Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-6 text-sm text-slate-400"
          >
            <div className="flex items-center">
              <FiShield className="w-5 h-5 text-green-400 mr-2" />
              SSL 256-bit Encryption
            </div>
            <div className="flex items-center">
              <FiCheck className="w-5 h-5 text-green-400 mr-2" />
              PCI DSS Compliant
            </div>
            <div className="flex items-center">
              <FiHeart className="w-5 h-5 text-red-400 mr-2" />
              30 Zile Garanție
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section - Enhanced */}
      <section className="py-32 px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
            
            <div className="relative p-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Începe Colaborarea cu <span className="text-purple-400">EasyFlow</span>
              </h2>
              <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Alătură-te companiilor care au ales soluția noastră profesională pentru 
                prezența online și dezvoltarea businessului digital.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span className="flex items-center">
                    Începe Gratuit
                    <FiArrowRight className="ml-2" />
                  </span>
                </motion.button>

                <div className="text-slate-400 text-sm">
                  Fără obligații contractuale • Suport inclus • Implementare rapidă
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-slate-400 text-sm">
                <div className="flex items-center">
                  <FiUsers className="w-4 h-4 mr-2 text-purple-400" />
                  Peste 10,000 clienți
                </div>
                <div className="flex items-center">
                  <FiStar className="w-4 h-4 mr-2 text-yellow-400" />
                  Rating 4.8/5
                </div>
                <div className="flex items-center">
                  <FiAward className="w-4 h-4 mr-2 text-green-400" />
                  Certificat ISO
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-16 px-4 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                EasyFlow România
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                Soluții profesionale pentru prezența online a companiilor din România. 
                Platformă dezvoltată cu tehnologii moderne și support local dedicat.
              </p>
              <div className="flex space-x-4">
                <motion.a whileHover={{ scale: 1.1 }} className="text-slate-400 hover:text-purple-400 transition-colors">
                  <FaFacebook className="w-6 h-6" />
                </motion.a>
                <motion.a whileHover={{ scale: 1.1 }} className="text-slate-400 hover:text-purple-400 transition-colors">
                  <FaTwitter className="w-6 h-6" />
                </motion.a>
                <motion.a whileHover={{ scale: 1.1 }} className="text-slate-400 hover:text-purple-400 transition-colors">
                  <FaLinkedin className="w-6 h-6" />
                </motion.a>
                <motion.a whileHover={{ scale: 1.1 }} className="text-slate-400 hover:text-purple-400 transition-colors">
                  <FaInstagram className="w-6 h-6" />
                </motion.a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-bold mb-4">Produs</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Template-uri</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Editor AI</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Integrări</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Suport</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Documentație</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Tutorial Video</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-center md:text-left">
              &copy; 2025 EasyFlow România. Toate drepturile rezervate. 
              <span className="text-purple-400"> Dezvoltat în România</span>
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-slate-400 text-sm">
              <a href="#" className="hover:text-purple-400 transition-colors">Termeni</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Confidențialitate</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CleanLandingPage;
