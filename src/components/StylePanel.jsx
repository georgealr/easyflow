import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaPalette, FaFont, FaImage, FaRuler, FaEye, 
  FaGradientHoriz, FaShadow, FaBorder, FaExpand, FaCompress
} from 'react-icons/fa';

const PRESET_GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
];

const PRESET_COLORS = [
  '#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff',
  '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080',
  '#ffc0cb', '#a52a2a', '#808080', '#000080', '#008000'
];

const FONT_FAMILIES = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Poppins', 
  'Montserrat', 'Source Sans Pro', 'Nunito', 'Playfair Display',
  'Merriweather', 'Dancing Script', 'Righteous'
];

const ANIMATION_PRESETS = [
  { name: 'Fade In', value: 'fadeIn' },
  { name: 'Slide Up', value: 'fadeInUp' },
  { name: 'Slide Down', value: 'fadeInDown' },
  { name: 'Slide Left', value: 'fadeInLeft' },
  { name: 'Slide Right', value: 'fadeInRight' },
  { name: 'Zoom In', value: 'zoomIn' },
  { name: 'Bounce In', value: 'bounceIn' },
  { name: 'Rotate In', value: 'rotateIn' }
];

export default function StylePanel({ selectedElement, onUpdate, onClose }) {
  const [activeTab, setActiveTab] = useState('design');
  const [expandedSection, setExpandedSection] = useState('background');

  const tabs = [
    { id: 'design', label: 'Design', icon: <FaPalette /> },
    { id: 'typography', label: 'Typography', icon: <FaFont /> },
    { id: 'spacing', label: 'Spacing', icon: <FaRuler /> },
    { id: 'effects', label: 'Effects', icon: <FaEye /> }
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (!selectedElement) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">Style Panel</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
            <FaTimes />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <FaPalette className="text-4xl mb-4 mx-auto opacity-50" />
            <p>Select an element to edit its styles</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold">Style Panel</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
          <FaTimes />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 text-xs font-medium transition ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'design' && (
          <div className="p-4 space-y-4">
            {/* Background Section */}
            <StyleSection
              title="Background"
              icon={<FaImage />}
              isExpanded={expandedSection === 'background'}
              onToggle={() => toggleSection('background')}
            >
              <div className="space-y-4">
                {/* Color Picker */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Solid Color
                  </label>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {PRESET_COLORS.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => onUpdate({ backgroundColor: color })}
                        className="w-8 h-8 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    className="w-full h-10 rounded-lg border border-gray-200"
                    onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
                  />
                </div>

                {/* Gradient Picker */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gradients
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESET_GRADIENTS.map((gradient, idx) => (
                      <button
                        key={idx}
                        onClick={() => onUpdate({ backgroundColor: gradient })}
                        className="w-full h-12 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition"
                        style={{ background: gradient }}
                        title="Gradient"
                      />
                    ))}
                  </div>
                </div>

                {/* Background Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Image
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onChange={(e) => onUpdate({ backgroundImage: `url(${e.target.value})` })}
                  />
                </div>
              </div>
            </StyleSection>

            {/* Border Section */}
            <StyleSection
              title="Border"
              icon={<FaBorder />}
              isExpanded={expandedSection === 'border'}
              onToggle={() => toggleSection('border')}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Width
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      className="w-full"
                      onChange={(e) => onUpdate({ borderWidth: `${e.target.value}px` })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Radius
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      className="w-full"
                      onChange={(e) => onUpdate({ borderRadius: `${e.target.value}px` })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <input
                    type="color"
                    className="w-full h-10 rounded-lg border border-gray-200"
                    onChange={(e) => onUpdate({ borderColor: e.target.value })}
                  />
                </div>
              </div>
            </StyleSection>

            {/* Shadow Section */}
            <StyleSection
              title="Shadow"
              icon={<FaShadow />}
              isExpanded={expandedSection === 'shadow'}
              onToggle={() => toggleSection('shadow')}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      X Offset
                    </label>
                    <input
                      type="range"
                      min="-20"
                      max="20"
                      defaultValue="0"
                      className="w-full"
                      onChange={(e) => onUpdate({ 
                        boxShadow: `${e.target.value}px 4px 12px rgba(0,0,0,0.15)` 
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Y Offset
                    </label>
                    <input
                      type="range"
                      min="-20"
                      max="20"
                      defaultValue="4"
                      className="w-full"
                      onChange={(e) => onUpdate({ 
                        boxShadow: `0px ${e.target.value}px 12px rgba(0,0,0,0.15)` 
                      })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blur
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    defaultValue="12"
                    className="w-full"
                    onChange={(e) => onUpdate({ 
                      boxShadow: `0px 4px ${e.target.value}px rgba(0,0,0,0.15)` 
                    })}
                  />
                </div>
              </div>
            </StyleSection>
          </div>
        )}

        {activeTab === 'typography' && (
          <div className="p-4 space-y-6">
            {/* Font Family */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Family
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => onUpdate({ fontFamily: e.target.value })}
              >
                {FONT_FAMILIES.map(font => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Size
              </label>
              <input
                type="range"
                min="12"
                max="72"
                className="w-full mb-2"
                onChange={(e) => onUpdate({ fontSize: `${e.target.value}px` })}
              />
              <div className="text-center text-sm text-gray-500">12px - 72px</div>
            </div>

            {/* Font Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Weight
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => onUpdate({ fontWeight: e.target.value })}
              >
                <option value="300">Light</option>
                <option value="400">Normal</option>
                <option value="500">Medium</option>
                <option value="600">Semi Bold</option>
                <option value="700">Bold</option>
                <option value="800">Extra Bold</option>
              </select>
            </div>

            {/* Text Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Color
              </label>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {PRESET_COLORS.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => onUpdate({ color: color })}
                    className="w-8 h-8 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
              <input
                type="color"
                className="w-full h-10 rounded-lg border border-gray-200"
                onChange={(e) => onUpdate({ color: e.target.value })}
              />
            </div>

            {/* Line Height */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Line Height
              </label>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                defaultValue="1.5"
                className="w-full"
                onChange={(e) => onUpdate({ lineHeight: e.target.value })}
              />
            </div>

            {/* Text Align */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Alignment
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['left', 'center', 'right'].map(align => (
                  <button
                    key={align}
                    onClick={() => onUpdate({ textAlign: align })}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition capitalize"
                  >
                    {align}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'spacing' && (
          <div className="p-4 space-y-6">
            {/* Padding */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Padding
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Top</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                    onChange={(e) => onUpdate({ paddingTop: `${e.target.value}px` })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Right</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                    onChange={(e) => onUpdate({ paddingRight: `${e.target.value}px` })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Bottom</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                    onChange={(e) => onUpdate({ paddingBottom: `${e.target.value}px` })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Left</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                    onChange={(e) => onUpdate({ paddingLeft: `${e.target.value}px` })}
                  />
                </div>
              </div>
            </div>

            {/* Margin */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Margin
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Top</label>
                  <input
                    type="number"
                    className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                    onChange={(e) => onUpdate({ marginTop: `${e.target.value}px` })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Right</label>
                  <input
                    type="number"
                    className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                    onChange={(e) => onUpdate({ marginRight: `${e.target.value}px` })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Bottom</label>
                  <input
                    type="number"
                    className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                    onChange={(e) => onUpdate({ marginBottom: `${e.target.value}px` })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Left</label>
                  <input
                    type="number"
                    className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                    onChange={(e) => onUpdate({ marginLeft: `${e.target.value}px` })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'effects' && (
          <div className="p-4 space-y-6">
            {/* Opacity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opacity
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue="1"
                className="w-full"
                onChange={(e) => onUpdate({ opacity: e.target.value })}
              />
            </div>

            {/* Transform */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Transform
              </label>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Scale</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    defaultValue="1"
                    className="w-full"
                    onChange={(e) => onUpdate({ transform: `scale(${e.target.value})` })}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Rotate (deg)</label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    defaultValue="0"
                    className="w-full"
                    onChange={(e) => onUpdate({ transform: `rotate(${e.target.value}deg)` })}
                  />
                </div>
              </div>
            </div>

            {/* Entrance Animation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entrance Animation
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => onUpdate({ animation: e.target.value })}
              >
                <option value="">No Animation</option>
                {ANIMATION_PRESETS.map(animation => (
                  <option key={animation.value} value={animation.value}>
                    {animation.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper component for collapsible sections
function StyleSection({ title, icon, children, isExpanded, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium">{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isExpanded ? <FaCompress /> : <FaExpand />}
        </motion.div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-3 border-t border-gray-200">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}