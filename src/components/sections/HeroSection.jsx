import { motion } from 'framer-motion';
import { useState } from 'react';

export default function HeroSection({
  title = 'Your Amazing Title',
  subtitle = 'Your compelling subtitle goes here',
  buttonText = 'Get Started',
  backgroundImage,
  backgroundColor = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  textColor = '#ffffff',
  onUpdate,
  isSelected,
  isPreviewMode
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState(null);

  const handleDoubleClick = (field) => {
    if (isPreviewMode) return;
    setIsEditing(true);
    setEditingField(field);
  };

  const handleUpdate = (field, value) => {
    onUpdate({ [field]: value });
    setIsEditing(false);
    setEditingField(null);
  };

  const handleKeyDown = (e, field, value) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUpdate(field, value);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditingField(null);
    }
  };

  const sectionStyle = {
    background: backgroundImage 
      ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${backgroundImage})`
      : backgroundColor,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: textColor
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-4"
      style={sectionStyle}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          {isEditing && editingField === 'title' ? (
            <textarea
              className="w-full text-5xl md:text-7xl font-bold mb-6 bg-transparent border-2 border-white/50 rounded-lg p-4 resize-none"
              style={{ color: textColor }}
              defaultValue={title}
              autoFocus
              onBlur={(e) => handleUpdate('title', e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'title', e.target.value)}
            />
          ) : (
            <h1
              className="text-5xl md:text-7xl font-bold mb-6 cursor-pointer hover:opacity-80 transition"
              onDoubleClick={() => handleDoubleClick('title')}
              title={!isPreviewMode ? "Double-click to edit" : ""}
            >
              {title}
            </h1>
          )}

          {/* Subtitle */}
          {isEditing && editingField === 'subtitle' ? (
            <textarea
              className="w-full text-xl md:text-2xl mb-8 bg-transparent border-2 border-white/50 rounded-lg p-4 resize-none"
              style={{ color: textColor }}
              defaultValue={subtitle}
              autoFocus
              onBlur={(e) => handleUpdate('subtitle', e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'subtitle', e.target.value)}
            />
          ) : (
            <p
              className="text-xl md:text-2xl mb-8 opacity-90 cursor-pointer hover:opacity-80 transition max-w-3xl mx-auto"
              onDoubleClick={() => handleDoubleClick('subtitle')}
              title={!isPreviewMode ? "Double-click to edit" : ""}
            >
              {subtitle}
            </p>
          )}

          {/* CTA Button */}
          {isEditing && editingField === 'buttonText' ? (
            <input
              type="text"
              className="px-8 py-4 text-lg font-semibold bg-transparent border-2 border-white rounded-full"
              style={{ color: textColor }}
              defaultValue={buttonText}
              autoFocus
              onBlur={(e) => handleUpdate('buttonText', e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'buttonText', e.target.value)}
            />
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-gray-900 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition cursor-pointer"
              onDoubleClick={() => handleDoubleClick('buttonText')}
              title={!isPreviewMode ? "Double-click to edit" : ""}
            >
              {buttonText}
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
}