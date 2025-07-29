import { motion } from "framer-motion";
import { FaSearch, FaTags } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const categories = ["Toate", "Business", "Portfolio", "E-commerce", "Blog", "Landing Page"];

const templates = [
  { id: 1, name: "Agenție Modernă", category: "Business", image: "https://via.placeholder.com/400x300/667eea/white?text=Agenție", premium: false },
  { id: 2, name: "Portofoliu Creativ", category: "Portfolio", image: "https://via.placeholder.com/400x300/764ba2/white?text=Portofoliu", premium: true },
  { id: 3, name: "Magazin Online Pro", category: "E-commerce", image: "https://via.placeholder.com/400x300/f093fb/white?text=E-shop", premium: true },
  { id: 4, name: "Blog Tehnologic", category: "Blog", image: "https://via.placeholder.com/400x300/4facfe/white?text=Blog", premium: false },
  { id: 5, name: "Landing Startup", category: "Landing Page", image: "https://via.placeholder.com/400x300/43e97b/white?text=Landing", premium: false },
  { id: 6, name: "Meniu Restaurant", category: "Business", image: "https://via.placeholder.com/400x300/fbbf24/white?text=Restaurant", premium: true },
];

export default function Templates() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Toate");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === "Toate" || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = (template) => {
    // Navighează la editor cu template-ul selectat
    navigate('/editor', { state: { template } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Template-uri Profesionale
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Peste 100 de template-uri moderne, responsive și ușor de personalizat pentru orice tip de business.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Caută template-uri..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template, idx) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {template.premium && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Premium
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
                      Previzualizare
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <FaTags className="text-blue-500" />
                    <span className="text-sm text-gray-500">{template.category}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{template.name}</h3>
                  <button 
                    onClick={() => handleUseTemplate(template)}
                    className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    Folosește Template-ul
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Nu am găsit template-uri</h3>
              <p className="text-gray-600">Încearcă să modifici termenii de căutare sau categoria.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}