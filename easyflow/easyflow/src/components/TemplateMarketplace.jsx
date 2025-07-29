import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiShoppingCart, FiHeart, FiEye, FiStar, FiDownload, 
  FiSearch, FiFilter, FiGrid, FiList, FiTrendingUp,
  FiZap, FiAward, FiUsers, FiPlay, FiChevronLeft,
  FiCpu, FiCopy
} from 'react-icons/fi';

const TemplateMarketplace = ({ onBack, onSelectTemplate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // 🎨 Premium Template Categories
  const categories = [
    { id: 'all', name: 'Toate', icon: FiGrid, count: 247 },
    { id: 'business', name: 'Business', icon: FiTrendingUp, count: 84 },
    { id: 'ecommerce', name: 'E-commerce', icon: FiShoppingCart, count: 52 },
    { id: 'portfolio', name: 'Portfolio', icon: FiAward, count: 63 },
    { id: 'landing', name: 'Landing Pages', icon: FiZap, count: 48 },
    { id: 'creative', name: 'Creative', icon: FiHeart, count: 39 },
    { id: 'premium', name: 'Premium', icon: FiAward, count: 28 }
  ];

  // 🏆 Featured Premium Templates
  const templates = [
    {
      id: 1,
      title: 'NeuralBiz Pro',
      category: 'business',
      price: 49.99,
      originalPrice: 79.99,
      rating: 4.9,
      reviews: 234,
      sales: 1247,
      author: 'EasyFlow Studio',
      tags: ['AI', 'Modern', 'Responsive'],
      preview: 'https://picsum.photos/400/300?random=1',
      description: 'Template premium pentru afaceri cu inteligență artificială integrată',
      features: ['AI Content Generator', 'Dark/Light Mode', '20+ Components', 'Mobile First'],
      isHot: true,
      isFeatured: true,
      category_name: 'Business'
    },
    {
      id: 2,
      title: 'Quantum Store',
      category: 'ecommerce',
      price: 69.99,
      originalPrice: 99.99,
      rating: 4.8,
      reviews: 189,
      sales: 892,
      author: 'Digital Masters',
      tags: ['E-commerce', 'Advanced', 'Premium'],
      preview: 'https://picsum.photos/400/300?random=2',
      description: 'Magazin online cu funcții avansate și design futuristic',
      features: ['Payment Integration', 'Inventory System', 'Analytics', 'Multi-language'],
      isNew: true,
      category_name: 'E-commerce'
    },
    {
      id: 3,
      title: 'Creative Vision',
      category: 'portfolio',
      price: 39.99,
      originalPrice: 59.99,
      rating: 4.7,
      reviews: 156,
      sales: 743,
      author: 'Art Collective',
      tags: ['Portfolio', 'Creative', 'Elegant'],
      preview: 'https://picsum.photos/400/300?random=3',
      description: 'Portfolio creativ pentru artiști și designeri',
      features: ['Gallery System', 'Animation Effects', 'Contact Forms', 'SEO Optimized'],
      category_name: 'Portfolio'
    },
    {
      id: 4,
      title: 'StartupLaunch Pro',
      category: 'landing',
      price: 34.99,
      originalPrice: 49.99,
      rating: 4.9,
      reviews: 298,
      sales: 1534,
      author: 'Launch Labs',
      tags: ['Startup', 'Conversion', 'A/B Testing'],
      preview: 'https://picsum.photos/400/300?random=4',
      description: 'Landing page optimizată pentru conversii maxime',
      features: ['A/B Testing', 'Analytics', 'Lead Capture', 'Social Proof'],
      isBestseller: true,
      category_name: 'Landing Pages'
    },
    {
      id: 5,
      title: 'Holographic Agency',
      category: 'creative',
      price: 89.99,
      originalPrice: 129.99,
      rating: 5.0,
      reviews: 87,
      sales: 423,
      author: 'Future Agency',
      tags: ['3D', 'Holographic', 'Cutting-edge'],
      preview: 'https://picsum.photos/400/300?random=5',
      description: 'Template cu efecte holografice și animații 3D',
      features: ['3D Effects', 'Holographic UI', 'WebGL', 'Immersive Experience'],
      isPremium: true,
      category_name: 'Creative'
    },
    {
      id: 6,
      title: 'Neural Dashboard',
      category: 'business',
      price: 79.99,
      originalPrice: 119.99,
      rating: 4.8,
      reviews: 167,
      sales: 654,
      author: 'Data Vizards',
      tags: ['Dashboard', 'Analytics', 'AI'],
      preview: 'https://picsum.photos/400/300?random=6',
      description: 'Dashboard inteligent cu analiză predictivă',
      features: ['Real-time Data', 'AI Insights', 'Custom Charts', 'Export Tools'],
      category_name: 'Business'
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case 'popular': return b.sales - a.sales;
      case 'rating': return b.rating - a.rating;
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'newest': return b.id - a.id;
      default: return 0;
    }
  });

  const addToCart = (template) => {
    if (!cart.find(item => item.id === template.id)) {
      setCart([...cart, template]);
    }
  };

  const toggleFavorite = (templateId) => {
    setFavorites(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
      {/* 🌌 Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_70%)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* 🎛️ Header */}
      <div className="relative z-10 border-b border-purple-300/10 backdrop-blur-xl bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="flex items-center space-x-2 px-4 py-2 text-purple-300 hover:text-purple-200 bg-purple-500/5 hover:bg-purple-500/10 rounded-lg transition-all border border-purple-400/20 font-['Poppins']"
              >
                <FiChevronLeft className="w-4 h-4" />
                <span>Înapoi</span>
              </motion.button>
              
              <div>
                <h1 className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">Template Marketplace</h1>
                <p className="text-purple-300 text-sm font-['Poppins']">Descoperă template-uri premium pentru 2025</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-3 text-purple-300 hover:text-purple-200 bg-purple-500/5 hover:bg-purple-500/10 rounded-lg transition-all border border-purple-400/20"
              >
                <FiShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </motion.button>

              {/* Favorites */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-3 text-purple-300 hover:text-purple-200 bg-purple-500/5 hover:bg-purple-500/10 rounded-lg transition-all border border-purple-400/20"
              >
                <FiHeart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* 📂 Sidebar */}
          <div className="w-80 space-y-6">
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Caută template-uri..."
                className="w-full pl-12 pr-4 py-3 bg-purple-500/5 border border-purple-400/20 rounded-xl text-purple-200 placeholder-purple-400 focus:border-purple-400 focus:outline-none transition-colors font-['Poppins']"
              />
            </div>

            {/* Categories */}
            <div className="backdrop-blur-xl bg-black/20 border border-purple-300/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 font-['Plus_Jakarta_Sans']">Categorii</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all font-['Poppins'] ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                        : 'text-purple-300 hover:text-purple-200 hover:bg-purple-500/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <category.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <span className="text-xs opacity-70">{category.count}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="backdrop-blur-xl bg-black/20 border border-purple-300/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 font-['Plus_Jakarta_Sans']">Sortează după</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 bg-purple-500/5 border border-purple-400/20 rounded-lg text-purple-200 focus:border-purple-400 focus:outline-none font-['Poppins']"
              >
                <option value="popular">Cel mai popular</option>
                <option value="rating">Rating</option>
                <option value="price-low">Preț crescător</option>
                <option value="price-high">Preț descrescător</option>
                <option value="newest">Cele mai noi</option>
              </select>
            </div>
          </div>

          {/* 🎨 Main Content */}
          <div className="flex-1">
            {/* View Controls */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <span className="text-purple-300 font-['Poppins']">
                  {sortedTemplates.length} template-uri găsite
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-purple-500 text-white'
                      : 'text-purple-300 hover:text-purple-200 hover:bg-purple-500/10'
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-purple-500 text-white'
                      : 'text-purple-300 hover:text-purple-200 hover:bg-purple-500/10'
                  }`}
                >
                  <FiList className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Templates Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              {sortedTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative backdrop-blur-xl bg-black/20 border border-purple-300/10 rounded-xl overflow-hidden hover:border-purple-400/30 transition-all duration-300"
                >
                  {/* Preview Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={template.preview}
                      alt={template.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedTemplate(template)}
                        className="p-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all"
                      >
                        <FiEye className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFavorite(template.id)}
                        className={`p-3 backdrop-blur-sm rounded-full transition-all ${
                          favorites.includes(template.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <FiHeart className="w-5 h-5" />
                      </motion.button>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      {template.isHot && (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                          🔥 HOT
                        </span>
                      )}
                      {template.isNew && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                          ✨ NOU
                        </span>
                      )}
                      {template.isBestseller && (
                        <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-semibold rounded-full">
                          👑 BESTSELLER
                        </span>
                      )}
                      {template.isPremium && (
                        <span className="px-2 py-1 bg-purple-500 text-white text-xs font-semibold rounded-full">
                          💎 PREMIUM
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-bold font-['Poppins']">${template.price}</span>
                          {template.originalPrice && (
                            <span className="text-gray-400 line-through text-sm">${template.originalPrice}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-white mb-1 font-['Plus_Jakarta_Sans']">{template.title}</h3>
                        <p className="text-purple-300 text-sm font-['Poppins']">{template.category_name}</p>
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <FiStar className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{template.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 font-['Poppins']">{template.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full font-['Poppins']"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4 font-['Poppins']">
                      <span className="flex items-center space-x-1">
                        <FiUsers className="w-4 h-4" />
                        <span>{template.sales} vânzări</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <FiStar className="w-4 h-4" />
                        <span>{template.reviews} review-uri</span>
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => addToCart(template)}
                        className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-purple-500/25 font-['Poppins']"
                      >
                        Adaugă în coș
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedTemplate(template)}
                        className="px-4 py-3 border border-purple-400/20 text-purple-300 rounded-lg hover:bg-purple-500/10 transition-all"
                      >
                        <FiPlay className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🎭 Template Preview Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTemplate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl w-full bg-gray-900 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex">
                {/* Preview */}
                <div className="flex-1 aspect-video bg-gray-800">
                  <img
                    src={selectedTemplate.preview}
                    alt={selectedTemplate.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="w-96 p-8 border-l border-gray-700">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2 font-['Plus_Jakarta_Sans']">
                        {selectedTemplate.title}
                      </h2>
                      <p className="text-purple-300 font-['Poppins']">de {selectedTemplate.author}</p>
                    </div>
                    <button
                      onClick={() => setSelectedTemplate(null)}
                      className="text-gray-400 hover:text-white p-2"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-3xl font-bold text-white font-['Poppins']">
                            ${selectedTemplate.price}
                          </span>
                          {selectedTemplate.originalPrice && (
                            <span className="text-gray-400 line-through">
                              ${selectedTemplate.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1 text-yellow-400">
                          <FiStar className="w-4 h-4 fill-current" />
                          <span>{selectedTemplate.rating}</span>
                          <span className="text-gray-400">({selectedTemplate.reviews})</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-white mb-3 font-['Plus_Jakarta_Sans']">
                        Caracteristici
                      </h3>
                      <ul className="space-y-2">
                        {selectedTemplate.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-purple-300 font-['Poppins']">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          addToCart(selectedTemplate);
                          setSelectedTemplate(null);
                        }}
                        className="w-full py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/25 font-['Poppins']"
                      >
                        <FiShoppingCart className="w-5 h-5 inline mr-2" />
                        Adaugă în coș
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          onSelectTemplate(selectedTemplate);
                          setSelectedTemplate(null);
                        }}
                        className="w-full py-4 border border-purple-400/20 text-purple-300 rounded-xl font-semibold hover:bg-purple-500/10 transition-all font-['Poppins']"
                      >
                        <FiDownload className="w-5 h-5 inline mr-2" />
                        Previzualizează în Editor
                      </motion.button>
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

export default TemplateMarketplace;
