import { motion } from "framer-motion";
export default function Testimonials() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Ce spun utilizatorii</h2>
        <p className="text-gray-500">Feedback real de la clienți mulțumiți</p>
      </div>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {[1,2].map((t, idx) => (
          <motion.div
            key={idx}
            className="bg-gradient-to-br from-blue-50 to-yellow-50 rounded-2xl shadow-lg p-8 border border-gray-100"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 0.7, type: "spring" }}
          >
            <div className="flex items-center gap-4 mb-4">
              <img src={`https://randomuser.me/api/portraits/men/${30+idx}.jpg`} alt="" className="w-12 h-12 rounded-full border-2 border-blue-200" />
              <div>
                <div className="font-bold">Utilizator {t}</div>
                <div className="text-xs text-gray-400">Web Designer</div>
              </div>
            </div>
            <div className="text-gray-700 italic">
              “EasyFlow m-a ajutat să lansez rapid site-uri moderne pentru clienții mei. Drag & drop-ul e genial!”
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}