import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSave, FaEye, FaUndo, FaRedo, FaPlus, FaCog, 
  FaMobile, FaTabletAlt, FaDesktop, FaArrowLeft,
  FaPalette, FaLayerGroup, FaExpand
} from 'react-icons/fa';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import AdvancedSectionRenderer from "./AdvancedSectionRenderer";
import AnimationPanel from "./AnimationPanel";

const DEVICE_SIZES = {
  desktop: { width: '100%', icon: <FaDesktop /> },
  tablet: { width: '768px', icon: <FaTabletAlt /> },
  mobile: { width: '375px', icon: <FaMobile /> }
};

export default function AdvancedTemplateEngine({ templateData, onSave, onBack }) {
  const [sections, setSections] = useState(templateData?.sections || []);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeDevice, setActiveDevice] = useState('desktop');
  const [showAnimationPanel, setShowAnimationPanel] = useState(false);
  const [showStylePanel, setShowStylePanel] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  const addNewSection = useCallback(() => {
    const newSection = {
      id: `section-${Date.now()}`,
      type: 'hero',
      props: {
        title: 'New Section',
        subtitle: 'Edit this section',
        backgroundColor: '#ffffff'
      }
    };
    setSections(prev => [...prev, newSection]);
  }, []);

  const updateSection = useCallback((sectionId, updates) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, ...updates }
        : section
    ));
  }, []);

  const updateElement = useCallback((updates) => {
    if (!selectedElement) return;
    
    // If it's a section-level animation, update the section
    if (selectedElement.type === 'section') {
      updateSection(selectedElement.id, {
        animation: { ...selectedElement.animation, ...updates }
      });
      setSelectedElement(prev => ({
        ...prev,
        animation: { ...prev.animation, ...updates }
      }));
    } else {
      // For element-level animations, update the specific element in the section
      setSections(prev => prev.map(section => {
        if (section.id === selectedElement.sectionId) {
          return {
            ...section,
            elementAnimations: {
              ...section.elementAnimations,
              [selectedElement.elementId]: {
                ...section.elementAnimations?.[selectedElement.elementId],
                ...updates
              }
            }
          };
        }
        return section;
      }));
      
      setSelectedElement(prev => ({
        ...prev,
        ...updates
      }));
    }
  }, [selectedElement, updateSection]);

  const saveTemplate = useCallback(() => {
    const updatedTemplate = {
      ...templateData,
      sections,
      lastModified: Date.now()
    };
    onSave(updatedTemplate);
  }, [templateData, sections, onSave]);

  return (
    <div className="h-screen flex bg-gray-900">
      {/* Left Sidebar - Layers */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition"
            >
              <FaArrowLeft />
            </button>
            <h1 className="text-lg font-bold text-white">{templateData?.name || 'Template'}</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setShowStylePanel(!showStylePanel)}
                className="p-2 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition"
              >
                <FaPalette />
              </button>
              <button
                onClick={() => setShowAnimationPanel(!showAnimationPanel)}
                className="p-2 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition"
              >
                <FaLayerGroup />
              </button>
            </div>
          </div>

          {/* Device Selector */}
          <div className="flex gap-1 bg-gray-700 rounded-lg p-1">
            {Object.entries(DEVICE_SIZES).map(([device, config]) => (
              <button
                key={device}
                onClick={() => setActiveDevice(device)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition ${
                  activeDevice === device
                    ? 'bg-gray-600 shadow-sm text-blue-400'
                    : 'text-gray-300 hover:text-white hover:bg-gray-600'
                }`}
              >
                {config.icon}
                <span className="text-sm capitalize">{device}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sections List */}
        <div className="flex-1 overflow-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">Sections</h3>
            <button
              onClick={addNewSection}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <FaPlus />
            </button>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  onClick={() => setSelectedSection(section)}
                  className={`p-3 mb-2 border rounded-lg cursor-pointer transition ${
                    selectedSection?.id === section.id
                      ? 'border-blue-500 bg-blue-600 bg-opacity-20'
                      : 'border-gray-600 hover:border-gray-500 bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm text-white">
                        {section.props?.title || `Section ${index + 1}`}
                      </div>
                      <div className="text-xs text-gray-400 capitalize">
                        {section.type}
                      </div>
                    </div>
                    <FaCog className="text-gray-400" />
                  </div>
                </div>
              ))}
            </SortableContext>
          </DndContext>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex gap-2">
            <button
              onClick={saveTemplate}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <FaSave />
              Save
            </button>
            <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition">
              <FaEye />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition">
                  <FaUndo />
                </button>
                <button className="p-2 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition">
                  <FaRedo />
                </button>
              </div>
              <div className="text-sm text-gray-400">
                Zoom: 100%
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">{DEVICE_SIZES[activeDevice].width}</span>
              <button className="p-2 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition">
                <FaExpand />
              </button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-gray-900 p-8 overflow-auto">
          <div 
            className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300"
            style={{ 
              width: DEVICE_SIZES[activeDevice].width,
              maxWidth: '100%'
            }}
          >
            {sections.map((section) => (
              <AdvancedSectionRenderer
                key={section.id}
                section={section}
                isSelected={selectedSection?.id === section.id}
                onSelect={() => setSelectedSection(section)}
                onUpdate={(updates) => updateSection(section.id, updates)}
                onElementSelect={setSelectedElement}
              />
            ))}
            
            {sections.length === 0 && (
              <div className="h-96 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <FaPlus className="text-4xl mb-4 mx-auto opacity-50" />
                  <p>Click "+" to add your first section</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Animation Panel */}
      {showAnimationPanel && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 350 }}
          exit={{ width: 0 }}
          className="bg-gray-800 border-l border-gray-700 overflow-hidden"
        >
          <AnimationPanel
            selectedElement={selectedElement}
            onUpdate={updateElement}
            onClose={() => setShowAnimationPanel(false)}
          />
        </motion.div>
      )}
    </div>
  );
}