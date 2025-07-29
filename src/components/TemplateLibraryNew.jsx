import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSearch, FiStar, FiArrowLeft, FiPlay, FiEye, 
  FiZap, FiTrendingUp, FiHeart, FiLayers, FiAward,
  FiCode, FiShoppingBag
} from 'react-icons/fi';

const CATEGORIES = [
  { id: 'all', name: 'Toate Template-urile', icon: FiLayers, color: 'from-purple-500 to-purple-600', count: 25 },
  { id: 'business', name: 'Business', icon: FiTrendingUp, color: 'from-blue-500 to-blue-600', count: 8 },
  { id: 'portfolio', name: 'Portofoliu', icon: FiHeart, color: 'from-pink-500 to-pink-600', count: 6 },
  { id: 'agency', name: 'Agenție', icon: FiZap, color: 'from-cyan-500 to-cyan-600', count: 5 },
  { id: 'saas', name: 'SaaS', icon: FiCode, color: 'from-green-500 to-green-600', count: 4 },
  { id: 'premium', name: 'Premium', icon: FiAward, color: 'from-yellow-500 to-yellow-600', count: 12 }
];

export default function TemplateLibrary({ templates, onSelectTemplate, onGoToMarketplace, onBack }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50 relative overflow-hidden">
      {/* 🌌 Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-100/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* 🎛️ Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 backdrop-blur-xl bg-white/80 border-b border-purple-200/30 sticky top-0"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="p-3 hover:bg-purple-100/50 rounded-xl transition-all border border-purple-200/30 backdrop-blur-sm group"
              >
                <FiArrowLeft className="text-purple-600 group-hover:text-purple-700 w-5 h-5" />
              </motion.button>
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-['Plus_Jakarta_Sans']">
                  Template Library
                </h1>
                <p className="text-purple-600 font-['Poppins'] font-medium">
                  Descoperă template-uri premium pentru România
                </p>
              </div>
              
              {/* Marketplace Button */}
              <motion.button
                onClick={onGoToMarketplace}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="ml-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/25 flex items-center space-x-2 font-['Poppins']"
              >
                <FiShoppingBag className="w-5 h-5" />
                <span>Marketplace Premium</span>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              </motion.button>
            </div>

            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Caută template-uri..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 pl-12 pr-4 py-3 bg-white/70 border border-purple-200/50 rounded-xl text-gray-700 placeholder-purple-400 focus:outline-none focus:border-purple-400 transition-colors backdrop-blur-sm font-['Poppins']"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-['Plus_Jakarta_Sans']">
            Categorii Premium
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative p-6 rounded-2xl transition-all duration-300 overflow-hidden ${
                  selectedCategory === category.id
                    ? 'bg-white shadow-xl shadow-purple-500/20 border-2 border-purple-300'
                    : 'bg-white/60 hover:bg-white/80 border border-purple-200/30 hover:shadow-lg'
                }`}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-all ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-br ${category.color} text-white shadow-lg`
                      : 'bg-purple-100 text-purple-600 group-hover:bg-purple-200'
                  }`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className={`font-semibold text-sm mb-1 font-['Plus_Jakarta_Sans'] ${
                    selectedCategory === category.id ? 'text-purple-700' : 'text-gray-700'
                  }`}>
                    {category.name}
                  </h3>
                  
                  <p className="text-xs text-purple-500 font-['Poppins'] font-medium">
                    {category.count} template-uri
                  </p>
                </div>

                {/* Selection indicator */}
                {selectedCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 border-2 border-purple-400 rounded-2xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 font-['Plus_Jakarta_Sans']">
              {filteredTemplates.length} Template-uri Găsite
            </h3>
            <p className="text-purple-600 font-['Poppins']">
              {selectedCategory === 'all' ? 'Toate categoriile' : CATEGORIES.find(c => c.id === selectedCategory)?.name}
            </p>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 border border-purple-200/30"
            >
              {/* Preview Image */}
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-purple-100 to-purple-50">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all"
                    title="Previzualizare"
                  >
                    <FiEye className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onSelectTemplate(template)}
                    className="p-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-all shadow-lg"
                    title="Folosește Template-ul"
                  >
                    <FiPlay className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Status Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {template.isPremium && (
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs font-bold rounded-full shadow-lg">
                      💎 PREMIUM
                    </span>
                  )}
                  {template.isNew && (
                    <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-green-500 text-green-900 text-xs font-bold rounded-full shadow-lg">
                      ✨ NOU
                    </span>
                  )}
                  {template.isPopular && (
                    <span className="px-3 py-1 bg-gradient-to-r from-red-400 to-red-500 text-red-900 text-xs font-bold rounded-full shadow-lg">
                      🔥 POPULAR
                    </span>
                  )}
                  {template.isHot && (
                    <span className="px-3 py-1 bg-gradient-to-r from-orange-400 to-orange-500 text-orange-900 text-xs font-bold rounded-full shadow-lg">
                      🚀 HOT
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 font-['Plus_Jakarta_Sans'] group-hover:text-purple-700 transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-purple-600 text-sm font-medium font-['Poppins'] mb-3">
                      {template.category}
                    </p>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <FiStar className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-yellow-700">4.9</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 font-['Poppins'] line-clamp-2">
                  {template.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags?.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-lg font-medium font-['Poppins']"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectTemplate(template)}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/25 font-['Poppins']"
                >
                  Începe cu acest Template
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiSearch className="w-12 h-12 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2 font-['Plus_Jakarta_Sans']">
              Nu am găsit template-uri
            </h3>
            <p className="text-purple-600 font-['Poppins']">
              Încearcă să modifici căutarea sau categoria selectată
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
