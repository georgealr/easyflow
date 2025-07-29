import { motion } from "framer-motion";

export default function TemplatesGrid() {
  return (
    <>
      <div className="max-w-5xl mx-auto flex gap-8 border-b border-gray-200 mb-8 px-4">
        <button className="pb-3 border-b-2 border-blue-600 text-blue-600 font-semibold">All</button>
        <button className="pb-3 text-gray-500 hover:text-blue-600 transition">Landing</button>
        <button className="pb-3 text-gray-500 hover:text-blue-600 transition">Business</button>
        <button className="pb-3 text-gray-500 hover:text-blue-600 transition">Portfolio</button>
        <button className="pb-3 text-gray-500 hover:text-blue-600 transition">Shop</button>
      </div>
      <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pb-16">
        {[1,2,3,4,5,6].map((t, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition group cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(59,130,246,0.18)" }}
          >
            <div className="h-48 bg-gradient-to-br from-blue-100 to-yellow-100 flex items-center justify-center">
              <span className="text-5xl text-blue-400 opacity-30">+</span>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition">Template {t}</h3>
              <p className="text-gray-500 text-sm mb-4">Un template modern, responsive, ușor de personalizat.</p>
              <button className="w-full py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition">Importă</button>
            </div>
          </motion.div>
        ))}
      </main>
    </>
  );
}