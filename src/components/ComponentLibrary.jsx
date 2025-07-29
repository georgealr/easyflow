import { motion } from 'framer-motion';
import { FaTimes, FaHeading, FaImage, FaList, FaUsers, FaEnvelope, FaNewspaper } from 'react-icons/fa';

const AVAILABLE_SECTIONS = [
  {
    type: 'hero',
    name: 'Hero Section',
    icon: <FaHeading className="text-2xl" />,
    description: 'Eye-catching header with title and CTA',
    template: {
      type: 'hero',
      props: {
        title: 'Your Amazing Title',
        subtitle: 'Compelling subtitle that explains your value proposition',
        buttonText: 'Get Started',
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textColor: '#ffffff'
      }
    }
  },
  {
    type: 'services',
    name: 'Services Grid',
    icon: <FaList className="text-2xl" />,
    description: 'Showcase your services in a grid layout',
    template: {
      type: 'services',
      props: {
        title: 'Our Services',
        subtitle: 'What we offer to help you succeed',
        backgroundColor: '#ffffff',
        services: [
          {
            icon: '⚡',
            title: 'Fast Delivery',
            description: 'Quick turnaround times for all projects'
          },
          {
            icon: '🎯',
            title: 'Targeted Solutions',
            description: 'Customized approach for your specific needs'
          },
          {
            icon: '💡',
            title: 'Innovation',
            description: 'Cutting-edge solutions using latest technology'
          }
        ]
      }
    }
  },
  {
    type: 'about',
    name: 'About Section',
    icon: <FaUsers className="text-2xl" />,
    description: 'Tell your story with stats and imagery',
    template: {
      type: 'about',
      props: {
        title: 'About Our Company',
        description: 'We are passionate about creating exceptional experiences that make a difference in peoples lives.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
        backgroundColor: '#f8fafc',
        stats: [
          { number: '1000+', label: 'Happy Customers' },
          { number: '50+', label: 'Team Members' },
          { number: '5+', label: 'Years Experience' }
        ]
      }
    }
  },
  {
    type: 'gallery',
    name: 'Image Gallery',
    icon: <FaImage className="text-2xl" />,
    description: 'Showcase your work with beautiful gallery',
    template: {
      type: 'gallery',
      props: {
        title: 'Our Work',
        subtitle: 'Recent projects and achievements',
        backgroundColor: '#ffffff',
        images: [
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'
        ]
      }
    }
  },
  {
    type: 'contact',
    name: 'Contact Form',
    icon: <FaEnvelope className="text-2xl" />,
    description: 'Contact form with company information',
    template: {
      type: 'contact',
      props: {
        title: 'Get In Touch',
        subtitle: 'Ready to start your project? Contact us today',
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textColor: '#ffffff'
      }
    }
  }
];

export default function ComponentLibrary({ onAddSection, onClose }) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold">Add Section</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <FaTimes />
        </button>
      </div>

      {/* Section List */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {AVAILABLE_SECTIONS.map((section, idx) => (
          <motion.div
            key={section.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => onAddSection(section.template)}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition">
                {section.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{section.name}</h3>
                <p className="text-sm text-gray-600">{section.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Click any section above to add it to your template
        </p>
      </div>
    </div>
  );
}