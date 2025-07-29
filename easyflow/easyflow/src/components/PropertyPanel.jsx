import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaPalette, FaFont, FaImage } from 'react-icons/fa';

export default function PropertyPanel({ section, onUpdate, onClose }) {
  const [activeTab, setActiveTab] = useState('style');

  if (!section) return null;

  const tabs = [
    { id: 'style', label: 'Style', icon: <FaPalette /> },
    { id: 'content', label: 'Content', icon: <FaFont /> }
  ];

  const handleColorChange = (property, value) => {
    onUpdate({ [property]: value });
  };

  const handleTextChange = (property, value) => {
    onUpdate({ [property]: value });
  };

  return (
    <div className="h-full flex flex-col bg-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">Properties</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition"
        >
          <FaTimes />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-medium transition ${
              activeTab === tab.id
                ? 'text-blue-400 border-b-2 border-blue-400 bg-gray-700'
                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 space-y-6 bg-gray-800">
        {activeTab === 'style' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Background Color */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Background
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  '#ffffff',
                  '#f8fafc'
                ].map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleColorChange('backgroundColor', color)}
                    className="w-full h-12 rounded-lg border-2 border-gray-600 hover:border-blue-500 transition"
                    style={{ background: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Text Color */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Text Color
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['#ffffff', '#000000', '#374151', '#6b7280'].map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleColorChange('textColor', color)}
                    className="w-full h-10 rounded-lg border-2 border-gray-600 hover:border-blue-500 transition"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Background Image */}
            {section.type === 'hero' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Background Image URL
                </label>
                <input
                  type="url"
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                  value={section.props.backgroundImage || ''}
                  onChange={(e) => handleTextChange('backgroundImage', e.target.value)}
                />
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'content' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Title */}
            {section.props.title !== undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="2"
                  value={section.props.title}
                  onChange={(e) => handleTextChange('title', e.target.value)}
                />
              </div>
            )}

            {/* Subtitle */}
            {section.props.subtitle !== undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subtitle
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="3"
                  value={section.props.subtitle}
                  onChange={(e) => handleTextChange('subtitle', e.target.value)}
                />
              </div>
            )}

            {/* Button Text */}
            {section.props.buttonText !== undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={section.props.buttonText}
                  onChange={(e) => handleTextChange('buttonText', e.target.value)}
                />
              </div>
            )}

            {/* Description */}
            {section.props.description !== undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="4"
                  value={section.props.description}
                  onChange={(e) => handleTextChange('description', e.target.value)}
                />
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}