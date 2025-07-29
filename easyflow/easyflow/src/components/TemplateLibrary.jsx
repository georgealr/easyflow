import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, FaStar, FaArrowLeft, FaPlay, FaEye, 
  FaBolt, FaPalette, FaLayerGroup, FaRocket, FaGem,
  FaCode
} from 'react-icons/fa';

const CATEGORIES = [
  { id: 'all', name: 'Toate Template-urile', icon: <FaLayerGroup />, color: 'blue' },
  { id: 'business', name: 'Business', icon: <FaBolt />, color: 'emerald' },
  { id: 'portfolio', name: 'Portofoliu', icon: <FaPalette />, color: 'pink' },
  { id: 'agency', name: 'Agenție', icon: <FaRocket />, color: 'cyan' },
  { id: 'saas', name: 'SaaS', icon: <FaCode />, color: 'amber' },
  { id: 'premium', name: 'Premium', icon: <FaGem />, color: 'purple' }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-sans">
      {/* Header - Matching Landing Page Style */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-700/50 rounded-xl transition-all border border-gray-600/50 backdrop-blur-sm"
              >
                <FaArrowLeft className="text-white" />
              </button>
              <h1 className="text-2xl font-black text-white">Template Library</h1>
              
              {/* Marketplace Button */}
              <motion.button
                onClick={onGoToMarketplace}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-purple-500/25 flex items-center space-x-2"
              >
                <FaGem className="w-4 h-4" />
                <span>Marketplace Premium</span>
              </motion.button>
            </div>
            
            {/* Search */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Caută template-uri..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-700/80 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Categories - Same Style as Landing Page */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-black text-white mb-8">Categorii</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-2xl border transition-all backdrop-blur-sm ${
                  selectedCategory === category.id
                    ? 'bg-gray-700/80 border-gray-500 shadow-lg'
                    : 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-700/60'
                }`}
              >
                <div className={`text-2xl mb-2 text-${category.color}-400`}>
                  {category.icon}
                </div>
                <div className="text-sm font-medium text-white">{category.name}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Templates Grid - Same Style as Landing Page */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-white">
              {selectedCategory === 'all' ? 'Toate Template-urile' : 
               CATEGORIES.find(cat => cat.id === selectedCategory)?.name}
            </h2>
            <div className="text-gray-400 font-medium">
              {filteredTemplates.length} template-uri găsite
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => onSelectTemplate(template)}
              >
                <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm overflow-hidden hover:border-gray-600/50 transition-all shadow-xl">
                  {/* Template Preview */}
                  <div className="aspect-video bg-gray-700/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-600/20 to-gray-800/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-600/50 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                          <FaRocket className="text-white text-xl" />
                        </div>
                        <div className="text-gray-300 font-medium">{template.name}</div>
                      </div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex gap-3">
                        <button className="p-3 bg-gray-700/80 hover:bg-gray-600/80 rounded-xl transition-all border border-gray-600/50 backdrop-blur-sm">
                          <FaEye className="text-white" />
                        </button>
                        <button className="p-3 bg-gray-700/80 hover:bg-gray-600/80 rounded-xl transition-all border border-gray-600/50 backdrop-blur-sm">
                          <FaPlay className="text-white" />
                        </button>
                      </div>
                    </div>

                    {/* Premium Badge */}
                    {template.premium && (
                      <div className="absolute top-3 right-3">
                        <div className="bg-purple-600/90 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                          <FaGem className="inline mr-1" />
                          Premium
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Template Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{template.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={`text-xs ${i < (template.rating || 4) ? 'text-yellow-400' : 'text-gray-600'}`} />
                          ))}
                        </div>
                        <span className="text-gray-400 text-sm">({template.rating || 4}/5)</span>
                      </div>
                      
                      <div className="text-right">
                        {template.premium ? (
                          <div className="text-purple-400 font-bold">Premium</div>
                        ) : (
                          <div className="text-green-400 font-bold">Gratuit</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredTemplates.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-gray-700/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaSearch className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Nu am găsit template-uri</h3>
              <p className="text-gray-400">Încearcă să schimbi categoria sau termenii de căutare.</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Background Elements - Same as Landing Page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}