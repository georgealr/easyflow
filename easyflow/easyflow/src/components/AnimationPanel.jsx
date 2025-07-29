import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaPlay, FaPause, FaRedo, FaClock, FaEye,
  FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight,
  FaExpand, FaCompress, FaSync, FaBolt // Înlocuit FaRotateRight cu FaSync
} from 'react-icons/fa';

const ENTRANCE_ANIMATIONS = [
  { name: 'Fade In', value: 'fadeIn', icon: <FaEye /> },
  { name: 'Slide Up', value: 'fadeInUp', icon: <FaArrowUp /> },
  { name: 'Slide Down', value: 'fadeInDown', icon: <FaArrowDown /> },
  { name: 'Slide Left', value: 'fadeInLeft', icon: <FaArrowLeft /> },
  { name: 'Slide Right', value: 'fadeInRight', icon: <FaArrowRight /> },
  { name: 'Zoom In', value: 'zoomIn', icon: <FaExpand /> },
  { name: 'Zoom Out', value: 'zoomOut', icon: <FaCompress /> },
  { name: 'Bounce In', value: 'bounceIn', icon: <FaBolt /> },
  { name: 'Rotate In', value: 'rotateIn', icon: <FaSync /> } // Folosim FaSync în loc de FaRotateRight
];

const TRIGGER_OPTIONS = [
  { value: 'viewport', label: 'On Scroll Into View' },
  { value: 'click', label: 'On Click' },
  { value: 'hover', label: 'On Hover' },
  { value: 'load', label: 'On Page Load' }
];

const EASING_OPTIONS = [
  { value: 'ease', label: 'Ease' },
  { value: 'ease-in', label: 'Ease In' },
  { value: 'ease-out', label: 'Ease Out' },
  { value: 'ease-in-out', label: 'Ease In Out' },
  { value: 'linear', label: 'Linear' },
  { value: 'bounce', label: 'Bounce' }
];

const HOVER_EFFECTS = [
  { name: 'Scale Up', value: 'scale(1.1)' },
  { name: 'Scale Down', value: 'scale(0.9)' },
  { name: 'Rotate', value: 'rotate(5deg)' },
  { name: 'Lift Up', value: 'translateY(-10px)' },
  { name: 'Slide Right', value: 'translateX(10px)' },
  { name: 'Skew', value: 'skew(2deg)' }
];

export default function AnimationPanel({ selectedElement, onUpdate, onClose }) {
  const [activeTab, setActiveTab] = useState('entrance');
  const [previewAnimation, setPreviewAnimation] = useState(null);

  const tabs = [
    { id: 'entrance', label: 'Entrance', icon: <FaArrowRight /> },
    { id: 'scroll', label: 'Scroll', icon: <FaEye /> },
    { id: 'hover', label: 'Hover', icon: <FaPlay /> },
    { id: 'timeline', label: 'Timeline', icon: <FaClock /> }
  ];

  const playPreview = (animationType) => {
    setPreviewAnimation(animationType);
    setTimeout(() => setPreviewAnimation(null), 1000);
  };

  if (!selectedElement) {
    return (
      <div className="h-full flex flex-col bg-gray-800">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Animation Panel</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition">
            <FaTimes />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <FaBolt className="text-4xl mb-4 mx-auto opacity-50" />
            <p>Select an element to add animations</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">Animation Panel</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition">
          <FaTimes />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 text-xs font-medium transition ${
              activeTab === tab.id
                ? 'text-purple-400 border-b-2 border-purple-400 bg-gray-700'
                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'entrance' && (
          <div className="p-4 bg-gray-800">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-white">Entrance Animations</h3>
              <div className="grid grid-cols-2 gap-3">
                {ENTRANCE_ANIMATIONS.map((animation) => (
                  <motion.button
                    key={animation.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onUpdate({ entranceAnimation: animation.value });
                      playPreview(animation.value);
                    }}
                    className="relative p-4 border border-gray-600 bg-gray-700 rounded-lg hover:border-purple-500 hover:bg-purple-900 hover:bg-opacity-30 transition-all group"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-2xl text-purple-400 group-hover:text-purple-300">
                        {animation.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-300">{animation.name}</span>
                    </div>
                    
                    {/* Preview indicator */}
                    {previewAnimation === animation.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 bg-purple-500 bg-opacity-20 rounded-lg flex items-center justify-center"
                      >
                        <FaPlay className="text-purple-400" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Animation Settings */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Trigger
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onChange={(e) => onUpdate({ animationTrigger: e.target.value })}
                >
                  {TRIGGER_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Duration (seconds)
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  defaultValue="0.8"
                  className="w-full mb-2 accent-purple-500"
                  onChange={(e) => onUpdate({ animationDuration: parseFloat(e.target.value) })}
                />
                <div className="text-center text-sm text-gray-400">0.1s - 3s</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Delay (seconds)
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  defaultValue="0"
                  className="w-full mb-2 accent-purple-500"
                  onChange={(e) => onUpdate({ animationDelay: parseFloat(e.target.value) })}
                />
                <div className="text-center text-sm text-gray-400">0s - 2s</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Easing
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onChange={(e) => onUpdate({ animationEasing: e.target.value })}
                >
                  {EASING_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scroll' && (
          <div className="p-4 bg-gray-800">
            <h3 className="text-lg font-semibold mb-4 text-white">Scroll Animations</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Parallax Speed
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  defaultValue="0.5"
                  className="w-full mb-2 accent-purple-500"
                  onChange={(e) => onUpdate({ parallaxSpeed: parseFloat(e.target.value) })}
                />
                <div className="text-center text-sm text-gray-400">Slow - Fast</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-white">Sticky Element</h4>
                  <p className="text-sm text-gray-400">Element sticks during scroll</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={(e) => onUpdate({ isSticky: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-white">Fade on Scroll</h4>
                  <p className="text-sm text-gray-400">Fade in/out based on scroll position</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={(e) => onUpdate({ fadeOnScroll: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hover' && (
          <div className="p-4 bg-gray-800">
            <h3 className="text-lg font-semibold mb-4 text-white">Hover Effects</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {HOVER_EFFECTS.map((effect) => (
                <motion.button
                  key={effect.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onUpdate({ hoverTransform: effect.value })}
                  className="p-3 border border-gray-600 bg-gray-700 rounded-lg hover:border-purple-500 hover:bg-purple-900 hover:bg-opacity-30 transition text-sm font-medium text-gray-300"
                >
                  {effect.name}
                </motion.button>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Hover Duration
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  defaultValue="0.3"
                  className="w-full accent-purple-500"
                  onChange={(e) => onUpdate({ hoverDuration: `${e.target.value}s` })}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-white">Shadow on Hover</h4>
                  <p className="text-sm text-gray-400">Add shadow effect on hover</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={(e) => onUpdate({ 
                      hoverShadow: e.target.checked ? '0 20px 40px rgba(0,0,0,0.1)' : 'none' 
                    })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="p-4 bg-gray-800">
            <h3 className="text-lg font-semibold mb-4 text-white">Animation Timeline</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-900 bg-opacity-30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FaPlay className="text-blue-400" />
                  <span className="font-medium text-white">Timeline Controls</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition">
                    Play All
                  </button>
                  <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition">
                    Reset
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sequence Order
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  defaultValue="1"
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onChange={(e) => onUpdate({ sequenceOrder: parseInt(e.target.value) })}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-white">Repeat Animation</h4>
                  <p className="text-sm text-gray-400">Loop animation continuously</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={(e) => onUpdate({ repeatAnimation: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}