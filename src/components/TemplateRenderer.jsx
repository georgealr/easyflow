import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaCopy, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import AboutSection from './sections/AboutSection';

const SECTION_COMPONENTS = {
  hero: HeroSection,
  services: ServicesSection,
  about: AboutSection,
};

export default function TemplateRenderer({
  template,
  selectedSection,
  onSelectSection,
  onUpdateSection,
  onDeleteSection,
  onDuplicateSection,
  onMoveSection,
  isPreviewMode
}) {
  const renderSection = (section, index) => {
    const SectionComponent = SECTION_COMPONENTS[section.type];
    const isSelected = selectedSection === section.id;

    if (!SectionComponent) {
      return (
        <div key={section.id} className="p-8 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">Unknown section type: {section.type}</p>
        </div>
      );
    }

    return (
      <div
        key={section.id}
        className={`relative group ${!isPreviewMode ? 'mb-4' : ''}`}
        onClick={() => !isPreviewMode && onSelectSection(section.id)}
      >
        {/* Selection Overlay */}
        {!isPreviewMode && (
          <>
            <div
              className={`absolute inset-0 pointer-events-none transition-all z-10 ${
                isSelected
                  ? 'ring-2 ring-blue-500 ring-offset-2'
                  : 'group-hover:ring-1 group-hover:ring-gray-300'
              }`}
            />
            
            {/* Section Controls */}
            <div
              className={`absolute top-2 right-2 flex items-center gap-1 z-20 transition-opacity ${
                isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveSection(section.id, 'up');
                }}
                disabled={index === 0}
                className="p-2 bg-white shadow-lg rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Move Up"
              >
                <FaArrowUp className="w-3 h-3 text-gray-600" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMoveSection(section.id, 'down');
                }}
                disabled={index === template.sections.length - 1}
                className="p-2 bg-white shadow-lg rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Move Down"
              >
                <FaArrowDown className="w-3 h-3 text-gray-600" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicateSection(section.id);
                }}
                className="p-2 bg-white shadow-lg rounded-lg hover:bg-gray-50"
                title="Duplicate"
              >
                <FaCopy className="w-3 h-3 text-gray-600" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSection(section.id);
                }}
                className="p-2 bg-white shadow-lg rounded-lg hover:bg-red-50"
                title="Delete"
              >
                <FaTrash className="w-3 h-3 text-red-600" />
              </button>
            </div>

            {/* Section Label */}
            <div
              className={`absolute top-2 left-2 z-20 transition-opacity ${
                isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
              </span>
            </div>
          </>
        )}

        {/* Section Content */}
        <SectionComponent
          {...section.props}
          onUpdate={(updates) => onUpdateSection(section.id, updates)}
          isSelected={isSelected}
          isPreviewMode={isPreviewMode}
        />
      </div>
    );
  };

  return (
    <div className={`${!isPreviewMode ? 'bg-white rounded-lg shadow-sm overflow-hidden' : ''}`}>
      {template.sections.map((section, index) => renderSection(section, index))}
      
      {template.sections.length === 0 && (
        <div className="flex items-center justify-center py-20 text-gray-500">
          <div className="text-center">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Start Building</h3>
            <p>Add your first section to begin creating your template</p>
          </div>
        </div>
      )}
    </div>
  );
}