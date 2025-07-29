import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  FaGripVertical, FaCog, FaTrash, FaCopy, FaEyeSlash
} from "react-icons/fa";

export default function AdvancedSectionRenderer({ 
  section, 
  isSelected, 
  onSelect, 
  onUpdate,
  onElementSelect 
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isEditing, setIsEditing] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Animation variants based on section animation settings
  const getAnimationVariants = () => {
    const animation = section.animation || {};
    const variants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration: animation.duration || 0.8,
          delay: animation.delay || 0,
          ease: animation.easing || "easeOut"
        }
      }
    };

    // Add entrance animation effects
    switch(animation.entrance) {
      case 'fadeInUp':
        variants.hidden.y = 50;
        variants.visible.y = 0;
        break;
      case 'fadeInDown':
        variants.hidden.y = -50;
        variants.visible.y = 0;
        break;
      case 'fadeInLeft':
        variants.hidden.x = -50;
        variants.visible.x = 0;
        break;
      case 'fadeInRight':
        variants.hidden.x = 50;
        variants.visible.x = 0;
        break;
      case 'zoomIn':
        variants.hidden.scale = 0.8;
        variants.visible.scale = 1;
        break;
      case 'bounceIn':
        variants.visible.transition.type = "spring";
        variants.visible.transition.bounce = 0.4;
        break;
    }

    return variants;
  };

  const renderSectionContent = () => {
    const { props } = section;
    
    switch(section.type) {
      case 'hero':
        return (
          <div 
            className="relative min-h-96 flex items-center justify-center text-white"
            style={{
              background: props.backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundImage: props.backgroundImage ? `url(${props.backgroundImage})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {props.backgroundImage && (
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            )}
            <div className="relative text-center max-w-4xl mx-auto px-6">
              <motion.h1 
                className="text-5xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onElementSelect && onElementSelect({
                    type: 'element',
                    elementType: 'title',
                    elementId: 'hero-title',
                    sectionId: section.id,
                    content: props.title,
                    animation: section.elementAnimations?.['hero-title'] || {}
                  });
                }}
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => onUpdate({ props: { ...props, title: e.target.textContent }})}
              >
                {props.title || 'Your Amazing Title'}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 opacity-90"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onElementSelect && onElementSelect({
                    type: 'element',
                    elementType: 'subtitle',
                    elementId: 'hero-subtitle',
                    sectionId: section.id,
                    content: props.subtitle,
                    animation: section.elementAnimations?.['hero-subtitle'] || {}
                  });
                }}
                contentEditable={isEditing}
                suppressContentEditableWarning={true}
                onBlur={(e) => onUpdate({ props: { ...props, subtitle: e.target.textContent }})}
              >
                {props.subtitle || 'Your compelling subtitle goes here'}
              </motion.p>
              <motion.button
                className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onElementSelect && onElementSelect({
                    type: 'element',
                    elementType: 'button',
                    elementId: 'hero-button',
                    sectionId: section.id,
                    content: props.buttonText,
                    animation: section.elementAnimations?.['hero-button'] || {}
                  });
                }}
              >
                {props.buttonText || 'Get Started'}
              </motion.button>
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="py-20 px-6" style={{ backgroundColor: props.backgroundColor || '#ffffff' }}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 
                  className="text-4xl font-bold mb-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    onElementSelect && onElementSelect({
                      type: 'element',
                      elementType: 'title',
                      elementId: 'services-title',
                      sectionId: section.id,
                      content: props.title,
                      animation: section.elementAnimations?.['services-title'] || {}
                    });
                  }}
                >
                  {props.title || 'Our Services'}
                </h2>
                <p 
                  className="text-xl text-gray-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    onElementSelect && onElementSelect({
                      type: 'element',
                      elementType: 'subtitle',
                      elementId: 'services-subtitle',
                      sectionId: section.id,
                      content: props.subtitle,
                      animation: section.elementAnimations?.['services-subtitle'] || {}
                    });
                  }}
                >
                  {props.subtitle || 'What we offer'}
                </p>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                {(props.services || []).map((service, idx) => (
                  <motion.div
                    key={idx}
                    className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onElementSelect && onElementSelect({
                        type: 'element',
                        elementType: 'service-card',
                        elementId: `service-card-${idx}`,
                        sectionId: section.id,
                        content: service.title,
                        animation: section.elementAnimations?.[`service-card-${idx}`] || {}
                      });
                    }}
                  >
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="py-20 px-6" style={{ backgroundColor: props.backgroundColor || '#f8fafc' }}>
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-6">{props.title || 'About Us'}</h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {props.description || 'Tell your story here...'}
                  </p>
                  {props.stats && (
                    <div className="grid grid-cols-3 gap-6">
                      {props.stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-3xl font-bold text-blue-600">{stat.number}</div>
                          <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  {props.image && (
                    <img 
                      src={props.image} 
                      alt="About" 
                      className="rounded-xl shadow-lg w-full h-auto"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="py-20 px-6" style={{ backgroundColor: props.backgroundColor || '#ffffff' }}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">{props.title || 'Gallery'}</h2>
                <p className="text-xl text-gray-600">{props.subtitle || 'Our work'}</p>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                {(props.images || []).map((image, idx) => (
                  <motion.div
                    key={idx}
                    className="relative overflow-hidden rounded-xl shadow-lg group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img 
                      src={image} 
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div 
            className="py-20 px-6 text-white"
            style={{ background: props.backgroundColor || 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
          >
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">{props.title || 'Get In Touch'}</h2>
              <p className="text-xl mb-8 opacity-90">{props.subtitle || 'Contact us today'}</p>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition">
                Contact Us
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="py-20 px-6 bg-gray-100">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Unknown Section Type</h2>
              <p className="text-gray-600">Section type: {section.type}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`relative group ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      variants={getAnimationVariants()}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
        // Also make the section selectable for animations
        onElementSelect && onElementSelect({
          type: 'section',
          elementType: 'section',
          elementId: section.id,
          sectionId: section.id,
          content: section.props?.title || `Section ${section.type}`,
          animation: section.animation || {}
        });
      }}
    >
      {/* Section Controls */}
      {isSelected && (
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button
            {...listeners}
            className="p-2 bg-white shadow-lg rounded-lg hover:bg-gray-50 transition"
          >
            <FaGripVertical />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(!isEditing);
            }}
            className="p-2 bg-white shadow-lg rounded-lg hover:bg-gray-50 transition"
          >
            <FaCog />
          </button>
          <button className="p-2 bg-white shadow-lg rounded-lg hover:bg-gray-50 transition">
            <FaCopy />
          </button>
          <button className="p-2 bg-white shadow-lg rounded-lg hover:bg-gray-50 transition text-red-600">
            <FaTrash />
          </button>
        </div>
      )}

      <div ref={ref}>
        {renderSectionContent()}
      </div>
    </motion.div>
  );
}