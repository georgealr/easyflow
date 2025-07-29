import { motion } from 'framer-motion';

export default function AboutSection({
  title = 'About Us',
  description = 'Our story and mission',
  image,
  backgroundColor = '#f8fafc',
  stats = [],
  onUpdate,
  isSelected,
  isPreviewMode
}) {
  const handleDoubleClick = (field, value) => {
    if (isPreviewMode) return;
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2
              className="text-4xl font-bold mb-6 cursor-pointer hover:opacity-80"
              onDoubleClick={() => handleDoubleClick('title', title)}
              title={!isPreviewMode ? "Double-click to edit" : ""}
            >
              {title}
            </h2>
            <p
              className="text-xl text-gray-600 mb-8 cursor-pointer hover:opacity-80"
              onDoubleClick={() => handleDoubleClick('description', description)}
              title={!isPreviewMode ? "Double-click to edit" : ""}
            >
              {description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {image && (
              <img
                src={image}
                alt="About"
                className="w-full rounded-2xl shadow-lg"
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}