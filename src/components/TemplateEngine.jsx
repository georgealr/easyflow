import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSave, FaEye, FaCog } from 'react-icons/fa';
import TemplateRenderer from './TemplateRenderer';
import ComponentLibrary from './ComponentLibrary';
import PropertyPanel from './PropertyPanel';

const MODERN_AGENCY_TEMPLATE = {
  id: 'modern-agency',
  name: 'Modern Agency',
  sections: [
    {
      id: 'hero',
      type: 'hero',
      props: {
        title: 'We Create Amazing Digital Experiences',
        subtitle: 'Professional web solutions that drive results for your business',
        buttonText: 'Get Started',
        backgroundImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=1080&fit=crop',
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textColor: '#ffffff'
      }
    },
    {
      id: 'services',
      type: 'services',
      props: {
        title: 'Our Services',
        subtitle: 'What we offer to help your business grow',
        services: [
          {
            icon: '🎨',
            title: 'Web Design',
            description: 'Beautiful, responsive designs that convert visitors into customers'
          },
          {
            icon: '💻',
            title: 'Development',
            description: 'Custom web applications built with modern technologies'
          },
          {
            icon: '📱',
            title: 'Mobile Apps',
            description: 'Native and cross-platform mobile applications'
          }
        ]
      }
    },
    {
      id: 'about',
      type: 'about',
      props: {
        title: 'About Our Agency',
        description: 'We are a team of passionate designers and developers creating exceptional digital experiences for businesses worldwide.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
        stats: [
          { number: '100+', label: 'Projects Completed' },
          { number: '50+', label: 'Happy Clients' },
          { number: '5+', label: 'Years Experience' }
        ]
      }
    }
  ]
};

export default function TemplateEngine({ templateData = MODERN_AGENCY_TEMPLATE, onSave }) {
  const [template, setTemplate] = useState(templateData);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showComponentLibrary, setShowComponentLibrary] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const canvasRef = useRef(null);

  const updateSection = (sectionId, updates) => {
    setTemplate(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId
          ? { ...section, props: { ...section.props, ...updates } }
          : section
      )
    }));
  };

  const addSection = (newSection) => {
    const sectionId = `section-${Date.now()}`;
    setTemplate(prev => ({
      ...prev,
      sections: [...prev.sections, { ...newSection, id: sectionId }]
    }));
    setShowComponentLibrary(false);
  };

  const deleteSection = (sectionId) => {
    setTemplate(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
    setSelectedSection(null);
  };

  const duplicateSection = (sectionId) => {
    const sectionToDuplicate = template.sections.find(s => s.id === sectionId);
    if (sectionToDuplicate) {
      const newSection = {
        ...sectionToDuplicate,
        id: `${sectionId}-copy-${Date.now()}`
      };
      setTemplate(prev => ({
        ...prev,
        sections: [...prev.sections, newSection]
      }));
    }
  };

  const moveSection = (sectionId, direction) => {
    const sections = [...template.sections];
    const index = sections.findIndex(s => s.id === sectionId);
    
    if (direction === 'up' && index > 0) {
      [sections[index], sections[index - 1]] = [sections[index - 1], sections[index]];
    } else if (direction === 'down' && index < sections.length - 1) {
      [sections[index], sections[index + 1]] = [sections[index + 1], sections[index]];
    }
    
    setTemplate(prev => ({ ...prev, sections }));
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Left Sidebar - Component Library */}
      <AnimatePresence>
        {showComponentLibrary && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-80 bg-white shadow-lg border-r border-gray-200 z-20"
          >
            <ComponentLibrary
              onAddSection={addSection}
              onClose={() => setShowComponentLibrary(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">{template.name}</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowComponentLibrary(!showComponentLibrary)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <FaPlus />
                Add Section
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                isPreviewMode
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaEye />
              {isPreviewMode ? 'Exit Preview' : 'Preview'}
            </button>
            <button
              onClick={() => onSave?.(template)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <FaSave />
              Save
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto">
          <div ref={canvasRef} className={isPreviewMode ? '' : 'p-4'}>
            <TemplateRenderer
              template={template}
              selectedSection={selectedSection}
              onSelectSection={setSelectedSection}
              onUpdateSection={updateSection}
              onDeleteSection={deleteSection}
              onDuplicateSection={duplicateSection}
              onMoveSection={moveSection}
              isPreviewMode={isPreviewMode}
            />
          </div>
        </div>
      </div>

      {/* Right Sidebar - Properties Panel */}
      <AnimatePresence>
        {selectedSection && !isPreviewMode && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="w-80 bg-white shadow-lg border-l border-gray-200"
          >
            <PropertyPanel
              section={template.sections.find(s => s.id === selectedSection)}
              onUpdate={(updates) => updateSection(selectedSection, updates)}
              onClose={() => setSelectedSection(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}