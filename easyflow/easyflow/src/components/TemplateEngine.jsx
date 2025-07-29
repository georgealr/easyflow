import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiStar, FiArrowRight } from 'react-icons/fi';

const templates = [
  { id: '1', name: 'Business', description: 'Perfect for corporate websites.', image: 'https://images.unsplash.com/photo-1556740738-6b4a6b6b6b6b', rating: 4.8 },
  { id: '2', name: 'Portfolio', description: 'Showcase your work elegantly.', image: 'https://images.unsplash.com/photo-1556740739-6b4a6b6b6b6b', rating: 4.9 },
  { id: '3', name: 'E-commerce', description: 'Sell products with style.', image: 'https://images.unsplash.com/photo-1556740740-6b4a6b6b6b6b', rating: 4.7 },
];

const TemplateEngine = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();

  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === 'all' || template.name.toLowerCase().includes(category))
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="relative w-full max-w-md">
            <FiSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div className="flex gap-4">
            {['All', 'Business', 'Portfolio', 'E-commerce'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat.toLowerCase())}
                className={`px-4 py-2 rounded-lg ${category === cat.toLowerCase() ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-6"
        >
          AI-Recommended Templates
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="relative">
                  <img src={template.image} alt={template.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-white rounded-full px-2 py-1">
                    <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-700">{template.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate('/editor', { state: { template } })}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold flex items-center gap-2"
                  >
                    Use Template <FiArrowRight />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TemplateEngine;
