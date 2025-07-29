import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden min-h-[540px] flex items-center justify-center bg-gradient-to-tr from-[#2e51f7] via-[#5b8cff] to-[#aee2ff]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-blue-400 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-cyan-300 opacity-20 rounded-full blur-2xl"></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col md:flex-row items-center gap-12 max-w-6xl w-full px-8 py-20"
      >
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg leading-tight"
          >
            Build Stunning Websites{" "}
            <span className="text-blue-200">Without Code</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-blue-100 mb-8 max-w-2xl leading-relaxed"
          >
            Create professional websites in minutes with our AI-powered drag & drop
            builder. No coding skills required - just your creativity.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 rounded-xl bg-white text-blue-700 font-bold text-lg shadow-lg hover:bg-blue-50 transition"
              onClick={() => navigate("/editor")}
            >
              Start Building Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 rounded-xl border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-blue-700 transition"
            >
              Watch Demo
            </motion.button>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex-1 flex items-center justify-center"
        >
          <img
            src="https://assets-global.website-files.com/5d4b19b6c6a3f0c1e7b7b3b2/63f5e2e0e6c5e0e2e2e2e2e_hero-img.png"
            alt="Preview"
            className="rounded-3xl shadow-2xl w-[420px] border-8 border-white"
            style={{
              background:
                "linear-gradient(135deg,#e0e7ff 0%,#fffbe6 100%)",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}