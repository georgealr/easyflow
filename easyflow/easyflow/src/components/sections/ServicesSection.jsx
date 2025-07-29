import { motion } from 'framer-motion';

export default function ServicesSection({
  title = 'Our Services',
  subtitle = 'What we offer',
  backgroundColor = '#ffffff',
  services = [],
  onUpdate,
  isSelected,
  isPreviewMode
}) {
  const handleDoubleClick = (field, value) => {
    if (isPreviewMode) return;
    // Editare inline simplă pentru demo
    const newValue = prompt(`Edit ${field}:`, value);
    if (newValue !== null) {
      onUpdate({ [field]: newValue });
    }
  };

  return (
    <section 
      className="py-20 px-4"
      style={{ backgroundColor }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4 cursor-pointer hover:opacity-80"
            onDoubleClick={() => handleDoubleClick('title', title)}
            title={!isPreviewMode ? "Double-click to edit" : ""}
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 cursor-pointer hover:opacity-80"
            onDoubleClick={() => handleDoubleClick('subtitle', subtitle)}
            title={!isPreviewMode ? "Double-click to edit" : ""}
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}