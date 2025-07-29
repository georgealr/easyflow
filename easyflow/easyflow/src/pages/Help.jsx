import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

const faqs = [
  {
    question: "Cum încep să folosesc EasyFlow?",
    answer: "Înregistrează-te gratuit, alege un template sau începe de la zero, apoi folosește editorul drag & drop pentru a crea site-ul tău."
  },
  {
    question: "Pot folosi domeniul meu propriu?",
    answer: "Da! Cu planul Pro poți conecta domeniul tău propriu și poți elimina branding-ul EasyFlow."
  },
  {
    question: "Site-urile create sunt responsive?",
    answer: "Absolut! Toate template-urile și elementele sunt optimizate pentru mobile, tablet și desktop."
  },
  {
    question: "Pot exporta codul HTML/CSS?",
    answer: "Da, poți exporta codul clean HTML/CSS pentru a-l folosi oriunde. Această funcție e disponibilă în toate planurile."
  },
  {
    question: "Există limită la numărul de pagini?",
    answer: "Planul Free permite până la 5 pagini per proiect. Planurile plătite nu au limită."
  }
];

export default function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Centrul de Ajutor
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Găsește răspunsuri la întrebările tale sau contactează echipa noastră de suport.
            </p>
          </motion.div>

          {/* Search */}
          <div className="relative mb-12">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Caută în întrebări frecvente..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-8">Întrebări Frecvente</h2>
            
            <div className="space-y-4">
              {filteredFaqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    {openFaq === idx ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Nu găsești răspunsul?</h3>
            <p className="text-blue-100 mb-6">
              Echipa noastră de suport este gata să te ajute 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition">
                Trimite mesaj
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition">
                Chat live
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}