import { motion } from "framer-motion";
import { FaMagic, FaMobile, FaRocket, FaPalette, FaCode, FaChartLine } from "react-icons/fa";

const features = [
  {
    icon: <FaMagic className="text-3xl text-blue-500" />,
    title: "AI-Powered Design",
    description: "Generate stunning layouts with artificial intelligence"
  },
  {
    icon: <FaMobile className="text-3xl text-green-500" />,
    title: "Mobile-First",
    description: "All designs are responsive and mobile-optimized"
  },
  {
    icon: <FaRocket className="text-3xl text-purple-500" />,
    title: "Lightning Fast",
    description: "Build and deploy websites in minutes, not days"
  },
  {
    icon: <FaPalette className="text-3xl text-pink-500" />,
    title: "Beautiful Templates",
    description: "Choose from hundreds of professionally designed templates"
  },
  {
    icon: <FaCode className="text-3xl text-orange-500" />,
    title: "No Code Required",
    description: "Visual drag & drop interface - no technical skills needed"
  },
  {
    icon: <FaChartLine className="text-3xl text-indigo-500" />,
    title: "SEO Optimized",
    description: "Built-in SEO tools to help your site rank higher"
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Everything You Need to Build Amazing Websites
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines the power of AI with intuitive design tools to help you create professional websites effortlessly.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}