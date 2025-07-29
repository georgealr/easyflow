import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, FiFilter, FiStar, FiHeart, FiEye, FiDownload, 
  FiShoppingCart, FiCreditCard, FiCheck, FiX, FiPlay,
  FiTrendingUp, FiAward, FiZap, FiGlobe, FiUsers,
  FiCode, FiSmartphone, FiMonitor, FiMail, FiShoppingBag
} from 'react-icons/fi';

const ScaledTemplateMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [userCredits, setUserCredits] = useState(150);
  const [filterBy, setFilterBy] = useState('popular');

  // 🎯 Enhanced Template Database
  const templates = useMemo(() => [
    // 🏢 Business Templates
    {
      id: 1,
      name: 'Corporate Pro',
      category: 'business',
      price: 49,
      originalPrice: 79,
      rating: 4.9,
      reviews: 234,
      downloads: 1847,
      preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      author: 'Business Elite',
      features: ['Multi-page', 'Contact Forms', 'CRM Integration', 'Analytics'],
      tags: ['corporate', 'professional', 'modern', 'responsive'],
      trending: true,
      premium: true,
      description: 'Template profesional pentru corporații mari cu integrări CRM și analytics avansate.',
      demoUrl: 'https://demo.corporate-pro.com',
      lastUpdated: '2025-01-15',
      compatibility: ['Desktop', 'Tablet', 'Mobile'],
      techStack: ['React', 'Tailwind', 'Next.js'],
      industry: 'Technology'
    },
    {
      id: 2,
      name: 'Startup Launch',
      category: 'business',
      price: 35,
      originalPrice: 59,
      rating: 4.8,
      reviews: 189,
      downloads: 892,
      preview: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400',
      author: 'Innovation Labs',
      features: ['Landing Page', 'Product Showcase', 'Testimonials', 'Pricing'],
      tags: ['startup', 'innovation', 'tech', 'conversion'],
      trending: false,
      premium: true,
      description: 'Perfect pentru startup-uri tech care vor să-și lanseze produsul cu impact maxim.',
      demoUrl: 'https://demo.startup-launch.com',
      lastUpdated: '2025-01-20',
      compatibility: ['Desktop', 'Tablet', 'Mobile'],
      techStack: ['Vue.js', 'SCSS', 'Firebase'],
      industry: 'Startup'
    },
    
    // 🛒 E-commerce Templates
    {
      id: 3,
      name: 'Fashion Store Pro',
      category: 'ecommerce',
      price: 89,
      originalPrice: 149,
      rating: 4.9,
      reviews: 456,
      downloads: 2341,
      preview: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      author: 'E-commerce Masters',
      features: ['Product Catalog', 'Shopping Cart', 'Payment Gateway', 'Inventory'],
      tags: ['fashion', 'ecommerce', 'shopping', 'responsive'],
      trending: true,
      premium: true,
      description: 'Magazin online complet pentru fashion cu toate funcționalitățile avansate.',
      demoUrl: 'https://demo.fashion-store.com',
      lastUpdated: '2025-01-18',
      compatibility: ['Desktop', 'Tablet', 'Mobile'],
      techStack: ['React', 'Stripe', 'MongoDB'],
      industry: 'Fashion'
    },
    {
      id: 4,
      name: 'Electronics Hub',
      category: 'ecommerce',
      price: 67,
      originalPrice: 99,
      rating: 4.7,
      reviews: 178,
      downloads: 743,
      preview: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
      author: 'Tech Commerce',
      features: ['Product Compare', 'Reviews System', 'Wishlist', 'Multi-vendor'],
      tags: ['electronics', 'tech', 'marketplace', 'b2b'],
      trending: false,
      premium: true,
      description: 'Platformă completă pentru vânzarea de electronice cu sistem de review-uri.',
      demoUrl: 'https://demo.electronics-hub.com',
      lastUpdated: '2025-01-12',
      compatibility: ['Desktop', 'Tablet', 'Mobile'],
      techStack: ['Angular', 'PayPal', 'PostgreSQL'],
      industry: 'Electronics'
    },

    // 🎨 Creative Templates
    {
      id: 5,
      name: 'Artist Portfolio',
      category: 'portfolio',
      price: 29,
      originalPrice: 49,
      rating: 4.8,
      reviews: 145,
      downloads: 567,
      preview: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
      author: 'Creative Studios',
      features: ['Gallery', 'Blog', 'Contact', 'Social Media'],
      tags: ['art', 'creative', 'portfolio', 'gallery'],
      trending: false,
      premium: false,
      description: 'Portofoliu elegant pentru artiști și creativi cu galerie foto impresionantă.',
      demoUrl: 'https://demo.artist-portfolio.com',
      lastUpdated: '2025-01-22',
      compatibility: ['Desktop', 'Tablet', 'Mobile'],
      techStack: ['HTML5', 'CSS3', 'JavaScript'],
      industry: 'Creative'
    },
    {
      id: 6,
      name: 'Photography Pro',
      category: 'portfolio',
      price: 45,
      originalPrice: 75,
      rating: 4.9,
      reviews: 298,
      downloads: 1234,
      preview: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400',
      author: 'Photo Masters',
      features: ['Lightbox Gallery', 'Client Portal', 'Booking System', 'Print Shop'],
      tags: ['photography', 'professional', 'booking', 'ecommerce'],
      trending: true,
      premium: true,
      description: 'Template complet pentru fotografi profesioniști cu sistem de booking.',
      demoUrl: 'https://demo.photography-pro.com',
      lastUpdated: '2025-01-25',
      compatibility: ['Desktop', 'Tablet', 'Mobile'],
      techStack: ['React', 'Node.js', 'Stripe'],
      industry: 'Photography'
    },

    // 🍔 Restaurant Templates
    {
      id: 7,
      name: 'Restaurant Deluxe',
      category: 'restaurant',
      price: 39,
      originalPrice: 69,
      rating: 4.6,
      reviews: 112,
      downloads: 445,
      preview: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
      author: 'Culinary Design',
      features: ['Menu Digital', 'Rezervări Online', 'Food Delivery', 'Reviews'],
      tags: ['restaurant', 'food', 'booking', 'delivery'],
      trending: false,
      premium: true,
      description: 'Template pentru restaurante cu meniu digital și sistem de rezervări online.',
      demoUrl: 'https://demo.restaurant-deluxe.com',
      lastUpdated: '2025-01-16',
      compatibility: ['Desktop', 'Tablet', 'Mobile'],
      techStack: ['Vue.js', 'Laravel', 'MySQL'],
      industry: 'Food & Beverage'
    },
    {
      id: 8,
      name: 'Cafe Modern',
      category: 'restaurant',
      price: 25,
      originalPrice: 45,
      rating: 4.5,
      reviews: 87,
      downloads: 321,
      preview: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
      author: 'Cafe Designs',
      features: ['Menu Showcase', 'Location Map', 'Events Calendar', 'Social Feed'],
      tags: ['cafe', 'coffee', 'modern', 'social'],
      trending: false,
      premium: false,
      description: 'Design modern pentru cafenele cu integrare social media și calendar evenimente.',
      demoUrl: 'https://demo.cafe-modern.com',
      lastUpdated: '2025-01-19',
      compatibility: ['Desktop', 'Tablet', 'Mobile'],
      techStack: ['HTML5', 'Bootstrap', 'jQuery'],
      industry: 'Food & Beverage'
    },

    // 🏥 Healthcare Templates
    {
      id: 9,
      name: 'Medical Practice',
      category: 'healthcare',
      price: 79,
      originalPrice: 129,
      rating: 4.9,
      reviews: 167,
      downloads: 623,
      preview: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400',
      author: 'HealthTech Solutions',
      features: ['Appointment Booking', 'Patient Portal', 'Medical Records', 'Telemedicine'],
      tags: ['medical', 'healthcare', 'appointments', 'telemedicine'],
      trending: true,
      premium: true,
      description: 'Soluție completă pentru cabinete medicale cu portal pacienți și telemedicină.',
      demoUrl: 'https://demo.medical-practice.com',
      lastUpdated: '2025-01-21',
      compatibility: ['Desktop', 'Tablet', 'Mobile'],
      techStack: ['React', 'HIPAA Compliant', 'AWS'],
      industry: 'Healthcare'
    },

    // 🎓 Education Templates
    {
      id: 10,
      name: 'Online Academy',
      category: 'education',
      price: 59,
      originalPrice: 99,
      rating: 4.8,
      reviews: 234,
      downloads: 876,
      preview: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400',
      author: 'EduTech Pro',
      features: ['Course Management', 'Video Streaming', 'Progress Tracking', 'Certificates'],
      tags: ['education', 'courses', 'elearning', 'certificates'],
      trending: true,
      premium: true,
      description: 'Platformă completă de educație online cu management cursuri și certificate.',
      demoUrl: 'https://demo.online-academy.com',
      lastUpdated: '2025-01-23',
      compatibility: ['Desktop', 'Tablet', 'Mobile'],
      techStack: ['React', 'Video.js', 'LMS'],
      industry: 'Education'
    }
  ], []);

  // 📊 Categories with Stats
  const categories = useMemo(() => [
    { id: 'all', name: 'Toate', count: templates.length, icon: FiGlobe },
    { id: 'business', name: 'Business', count: templates.filter(t => t.category === 'business').length, icon: FiAward },
    { id: 'ecommerce', name: 'E-commerce', count: templates.filter(t => t.category === 'ecommerce').length, icon: FiShoppingCart },
    { id: 'portfolio', name: 'Portfolio', count: templates.filter(t => t.category === 'portfolio').length, icon: FiStar },
    { id: 'restaurant', name: 'Restaurant', count: templates.filter(t => t.category === 'restaurant').length, icon: FiShoppingBag },
    { id: 'healthcare', name: 'Healthcare', count: templates.filter(t => t.category === 'healthcare').length, icon: FiHeart },
    { id: 'education', name: 'Education', count: templates.filter(t => t.category === 'education').length, icon: FiCode }
  ], [templates]);

  // 🔍 Filtered Templates
  const filteredTemplates = useMemo(() => {
    let filtered = templates;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        template.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by filter
    switch (filterBy) {
      case 'popular':
        return filtered.sort((a, b) => b.downloads - a.downloads);
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'newest':
        return filtered.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
      default:
        return filtered;
    }
  }, [templates, selectedCategory, searchTerm, filterBy]);

  // 🛒 Cart Management
  const addToCart = (template) => {
    if (!cart.find(item => item.id === template.id)) {
      setCart([...cart, template]);
    }
  };

  const removeFromCart = (templateId) => {
    setCart(cart.filter(item => item.id !== templateId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  // 💳 Purchase Process
  const handlePurchase = async () => {
    setIsPurchasing(true);
    
    // Simulate purchase process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const totalCost = getTotalPrice();
    if (userCredits >= totalCost) {
      setUserCredits(prev => prev - totalCost);
      setCart([]);
      setShowCheckout(false);
      // Show success message
    }
    
    setIsPurchasing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50 font-['Plus_Jakarta_Sans']">
      {/* 🎯 Advanced Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-purple-200/30 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">Template Marketplace</h1>
              <p className="text-purple-600 font-['Poppins']">Peste 1,000+ template-uri premium pentru proiectele tale</p>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* 💰 Credits Display */}
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-xl font-bold">
                💎 {userCredits} Credite
              </div>
              
              {/* 🛒 Cart Button */}
              <motion.button
                onClick={() => setShowCheckout(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-3 bg-purple-100 text-purple-600 rounded-xl hover:bg-purple-200 transition-all"
              >
                <FiShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {cart.length}
                  </div>
                )}
              </motion.button>
            </div>
          </div>

          {/* 🔍 Search & Filters */}
          <div className="mt-6 flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Caută template-uri, categorii, autori..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent font-['Poppins']"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FiFilter className="text-gray-500 w-5 h-5" />
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="border border-purple-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-300 font-['Poppins']"
                >
                  <option value="popular">Populare</option>
                  <option value="rating">Rating</option>
                  <option value="price-low">Preț Mic</option>
                  <option value="price-high">Preț Mare</option>
                  <option value="newest">Cele Mai Noi</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* 📂 Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-purple-200/30 shadow-lg sticky top-32">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Categorii</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    whileHover={{ x: 4 }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                      selectedCategory === category.id
                        ? 'bg-purple-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <category.icon className="w-5 h-5" />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-purple-100 text-purple-600'
                    }`}>
                      {category.count}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* 🔥 Trending Section */}
              <div className="mt-8">
                <h4 className="text-sm font-bold text-gray-600 mb-4 uppercase tracking-wide">
                  🔥 În Tendință
                </h4>
                <div className="space-y-3">
                  {templates.filter(t => t.trending).slice(0, 3).map(template => (
                    <div key={template.id} className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {template.name}
                      </div>
                      <div className="text-xs text-orange-600">
                        {template.downloads.toLocaleString()} descărcări
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 🎨 Templates Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredTemplates.length} Template{filteredTemplates.length !== 1 ? '-uri' : ''} Găsite
              </h2>
              
              {selectedCategory !== 'all' && (
                <motion.button
                  onClick={() => setSelectedCategory('all')}
                  whileHover={{ scale: 1.05 }}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Vezi Toate →
                </motion.button>
              )}
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden border border-purple-200/30 shadow-lg hover:shadow-2xl transition-all group"
                  >
                    {/* 🖼️ Template Preview */}
                    <div className="relative overflow-hidden">
                      <img
                        src={template.preview}
                        alt={template.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      
                      {/* 🏷️ Badges */}
                      <div className="absolute top-4 left-4 flex space-x-2">
                        {template.trending && (
                          <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            🔥 Trending
                          </div>
                        )}
                        {template.premium && (
                          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                            👑 Premium
                          </div>
                        )}
                      </div>

                      {/* 🎮 Action Buttons */}
                      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedTemplate(template)}
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white"
                        >
                          <FiEye className="w-4 h-4 text-gray-700" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white"
                        >
                          <FiHeart className="w-4 h-4 text-red-500" />
                        </motion.button>
                      </div>

                      {/* 💰 Price Tag */}
                      <div className="absolute bottom-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg">
                          <div className="flex items-center space-x-2">
                            {template.originalPrice > template.price && (
                              <span className="text-xs text-gray-500 line-through">
                                {template.originalPrice} LEI
                              </span>
                            )}
                            <span className="text-sm font-bold text-purple-600">
                              {template.price} LEI
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 📝 Template Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {template.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700">
                            {template.rating}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-['Poppins']">
                        {template.description}
                      </p>

                      {/* 🏷️ Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {template.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {template.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                            +{template.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* 📊 Stats */}
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <FiDownload className="w-3 h-3" />
                            <span>{template.downloads.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FiUsers className="w-3 h-3" />
                            <span>{template.reviews}</span>
                          </div>
                        </div>
                        <span className="text-purple-600 font-medium">
                          {template.author}
                        </span>
                      </div>

                      {/* 🛒 Action Buttons */}
                      <div className="flex space-x-3">
                        <motion.button
                          onClick={() => addToCart(template)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={cart.find(item => item.id === template.id)}
                          className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                            cart.find(item => item.id === template.id)
                              ? 'bg-green-100 text-green-700 border-2 border-green-200'
                              : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-lg'
                          }`}
                        >
                          {cart.find(item => item.id === template.id) ? (
                            <>
                              <FiCheck className="w-4 h-4 inline mr-2" />
                              În Coș
                            </>
                          ) : (
                            <>
                              <FiShoppingCart className="w-4 h-4 inline mr-2" />
                              Adaugă
                            </>
                          )}
                        </motion.button>
                        
                        <motion.button
                          onClick={() => setSelectedTemplate(template)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-3 border-2 border-purple-300 text-purple-600 rounded-xl font-bold hover:bg-purple-50 transition-all"
                        >
                          <FiPlay className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-16">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiSearch className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Nu am găsit template-uri
                </h3>
                <p className="text-gray-600 mb-6 font-['Poppins']">
                  Încearcă să cauți cu alți termeni sau explorează categoriile.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Resetează Filtrele
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🛒 Shopping Cart Modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Coșul Tău</h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiX className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <FiShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-['Poppins']">Coșul tău este gol</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <img
                          src={item.preview}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.author}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-purple-600">{item.price} LEI</div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Elimină
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xl font-bold text-gray-900">Total:</span>
                      <span className="text-2xl font-black text-purple-600">
                        {getTotalPrice()} LEI
                      </span>
                    </div>

                    <motion.button
                      onClick={handlePurchase}
                      disabled={isPurchasing || userCredits < getTotalPrice()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                        isPurchasing || userCredits < getTotalPrice()
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-lg'
                      }`}
                    >
                      {isPurchasing ? (
                        'Se procesează...'
                      ) : userCredits < getTotalPrice() ? (
                        'Credite insuficiente'
                      ) : (
                        <>
                          <FiCreditCard className="w-5 h-5 inline mr-2" />
                          Cumpără Acum
                        </>
                      )}
                    </motion.button>

                    {userCredits < getTotalPrice() && (
                      <p className="text-center text-red-600 text-sm mt-3">
                        Ai nevoie de {getTotalPrice() - userCredits} credite în plus
                      </p>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 👁️ Template Preview Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedTemplate.name}</h2>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiX className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedTemplate.preview}
                    alt={selectedTemplate.name}
                    className="w-full rounded-xl shadow-lg mb-6"
                  />
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Caracteristici:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedTemplate.features.map(feature => (
                          <div key={feature} className="flex items-center space-x-2 text-sm text-gray-700">
                            <FiCheck className="w-4 h-4 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Tehnologii:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTemplate.techStack.map(tech => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-3xl font-black text-purple-600">
                          {selectedTemplate.price} LEI
                        </div>
                        {selectedTemplate.originalPrice > selectedTemplate.price && (
                          <div className="text-lg text-gray-500 line-through">
                            {selectedTemplate.originalPrice} LEI
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <FiStar className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="font-bold text-gray-900">
                            {selectedTemplate.rating}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {selectedTemplate.reviews} review-uri
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6 font-['Poppins']">
                      {selectedTemplate.description}
                    </p>

                    <div className="flex space-x-3">
                      <motion.button
                        onClick={() => addToCart(selectedTemplate)}
                        disabled={cart.find(item => item.id === selectedTemplate.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                          cart.find(item => item.id === selectedTemplate.id)
                            ? 'bg-green-100 text-green-700 border-2 border-green-200'
                            : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-lg'
                        }`}
                      >
                        {cart.find(item => item.id === selectedTemplate.id) ? (
                          <>
                            <FiCheck className="w-4 h-4 inline mr-2" />
                            În Coș
                          </>
                        ) : (
                          <>
                            <FiShoppingCart className="w-4 h-4 inline mr-2" />
                            Adaugă în Coș
                          </>
                        )}
                      </motion.button>
                      
                      <motion.a
                        href={selectedTemplate.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 border-2 border-purple-300 text-purple-600 rounded-xl font-bold hover:bg-purple-50 transition-all"
                      >
                        <FiEye className="w-4 h-4 inline mr-2" />
                        Demo Live
                      </motion.a>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Autor:</span>
                      <span className="font-medium text-purple-600">{selectedTemplate.author}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Industrie:</span>
                      <span className="font-medium">{selectedTemplate.industry}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Descărcări:</span>
                      <span className="font-medium">{selectedTemplate.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Ultima actualizare:</span>
                      <span className="font-medium">{new Date(selectedTemplate.lastUpdated).toLocaleDateString('ro-RO')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScaledTemplateMarketplace;
