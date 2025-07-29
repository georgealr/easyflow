import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation, useDragControls } from 'framer-motion';
import { 
  FiLayers, FiMove, FiRotateCw, FiCopy, FiTrash2, FiEye, FiEyeOff,
  FiArrowLeft, FiArrowRight, FiSave, FiDownload, FiUpload, FiGrid, FiPlus, FiMinus,
  FiSmartphone, FiTablet, FiMonitor, FiPlay, FiPause, FiSettings,
  FiType, FiImage, FiSquare, FiCircle, FiVideo, FiMusic, FiCode,
  FiStar, FiCpu, FiZap, FiGlobe, FiCloud, FiDatabase, FiShield
} from 'react-icons/fi';

const ScaledCanvasEditor = () => {
  // 🎯 Advanced State Management
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [canvasMode, setCanvasMode] = useState('design'); // design, preview, code, ai, quantum, holographic
  const [deviceView, setDeviceView] = useState('desktop');
  const [zoom, setZoom] = useState(100);
  const [gridEnabled, setGridEnabled] = useState(true);
  const [snapEnabled, setSnapEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [quantumState, setQuantumState] = useState('idle');
  const [holographicMode, setHolographicMode] = useState(false);

  // 🧠 AI-Powered Features
  const aiFeatures = [
    { id: 'auto-layout', name: 'Auto Layout', icon: FiStar, active: true },
    { id: 'smart-spacing', name: 'Smart Spacing', icon: FiCpu, active: true },
    { id: 'color-harmony', name: 'Color Harmony', icon: FiZap, active: false },
    { id: 'content-generation', name: 'Content Gen', icon: FiGlobe, active: false }
  ];

  // 🔮 Quantum Computing Simulation
  const quantumFeatures = [
    { id: 'superposition', name: 'Design Superposition', probability: 0.73 },
    { id: 'entanglement', name: 'Element Entanglement', probability: 0.89 },
    { id: 'tunneling', name: 'Style Tunneling', probability: 0.56 },
    { id: 'interference', name: 'Layout Interference', probability: 0.92 }
  ];

  // 🌌 Holographic Display
  const holographicLayers = [
    { id: 'base', name: 'Base Reality', depth: 0, opacity: 1.0 },
    { id: 'augmented', name: 'Augmented Layer', depth: 10, opacity: 0.8 },
    { id: 'virtual', name: 'Virtual Overlay', depth: 20, opacity: 0.6 },
    { id: 'meta', name: 'Meta Dimension', depth: 30, opacity: 0.4 }
  ];

  // 🎨 Component Library - Enhanced
  const componentLibrary = useMemo(() => [
    {
      category: 'Text',
      icon: FiType,
      items: [
        { id: 'heading', name: 'Heading', icon: 'H1', gradient: 'from-blue-500 to-blue-600' },
        { id: 'paragraph', name: 'Paragraph', icon: 'P', gradient: 'from-gray-500 to-gray-600' },
        { id: 'quote', name: 'Quote', icon: '"', gradient: 'from-purple-500 to-purple-600' },
        { id: 'list', name: 'List', icon: '•', gradient: 'from-green-500 to-green-600' }
      ]
    },
    {
      category: 'Media',
      icon: FiImage,
      items: [
        { id: 'image', name: 'Image', icon: '🖼️', gradient: 'from-orange-500 to-orange-600' },
        { id: 'video', name: 'Video', icon: '🎥', gradient: 'from-red-500 to-red-600' },
        { id: 'audio', name: 'Audio', icon: '🎵', gradient: 'from-pink-500 to-pink-600' },
        { id: 'gallery', name: 'Gallery', icon: '🖼️', gradient: 'from-indigo-500 to-indigo-600' }
      ]
    },
    {
      category: 'Layout',
      icon: FiSquare,
      items: [
        { id: 'container', name: 'Container', icon: '📦', gradient: 'from-teal-500 to-teal-600' },
        { id: 'grid', name: 'Grid', icon: '⚏', gradient: 'from-cyan-500 to-cyan-600' },
        { id: 'flex', name: 'Flexbox', icon: '⚞', gradient: 'from-yellow-500 to-yellow-600' },
        { id: 'card', name: 'Card', icon: '🃏', gradient: 'from-emerald-500 to-emerald-600' }
      ]
    },
    {
      category: 'Interactive',
      icon: FiZap,
      items: [
        { id: 'button', name: 'Button', icon: '🔘', gradient: 'from-violet-500 to-violet-600' },
        { id: 'form', name: 'Form', icon: '📝', gradient: 'from-rose-500 to-rose-600' },
        { id: 'slider', name: 'Slider', icon: '🎚️', gradient: 'from-amber-500 to-amber-600' },
        { id: 'toggle', name: 'Toggle', icon: '🔀', gradient: 'from-lime-500 to-lime-600' }
      ]
    }
  ], []);

  // 🎭 Animation System
  const animationPresets = [
    { id: 'fadeIn', name: 'Fade In', duration: 0.5, easing: 'easeOut' },
    { id: 'slideUp', name: 'Slide Up', duration: 0.7, easing: 'easeInOut' },
    { id: 'scaleIn', name: 'Scale In', duration: 0.3, easing: 'easeBack' },
    { id: 'rotateIn', name: 'Rotate In', duration: 0.8, easing: 'easeElastic' },
    { id: 'bounce', name: 'Bounce', duration: 1.0, easing: 'easeBounce' },
    { id: 'morphic', name: 'Morphic Transform', duration: 1.2, easing: 'easeQuantum' }
  ];

  // 🔄 Real-time Collaboration
  const [collaborators, setCollaborators] = useState([
    { id: 1, name: 'Ana M.', avatar: '👩‍💼', color: 'purple', cursor: { x: 150, y: 200 } },
    { id: 2, name: 'Radu P.', avatar: '👨‍💻', color: 'blue', cursor: { x: 300, y: 100 } },
    { id: 3, name: 'Maria S.', avatar: '👩‍🎨', color: 'green', cursor: { x: 450, y: 350 } }
  ]);

  // 📊 Performance Analytics
  const [analytics, setAnalytics] = useState({
    renderTime: 0,
    elementsCount: 0,
    interactions: 0,
    aiProcessing: 0,
    quantumOperations: 0,
    holographicLayers: 0
  });

  // 🎯 Advanced Drag & Drop
  const dragControls = useDragControls();
  const canvasRef = useRef(null);

  // 🧠 AI Processing
  const processAISuggestions = useCallback(() => {
    setAiSuggestions([
      { id: 1, type: 'layout', suggestion: 'Improve spacing by 20%', confidence: 0.89 },
      { id: 2, type: 'color', suggestion: 'Use complementary colors', confidence: 0.76 },
      { id: 3, type: 'typography', suggestion: 'Increase heading hierarchy', confidence: 0.93 },
      { id: 4, type: 'accessibility', suggestion: 'Add alt text to images', confidence: 0.95 }
    ]);
  }, []);

  // 🔮 Quantum State Management
  const toggleQuantumMode = useCallback(() => {
    setQuantumState(prev => {
      if (prev === 'idle') {
        setCanvasMode('quantum');
        return 'active';
      } else if (prev === 'active') {
        return 'superposition';
      } else {
        setCanvasMode('design');
        return 'idle';
      }
    });
  }, []);

  // 🌌 Holographic Controls
  const toggleHolographicMode = useCallback(() => {
    setHolographicMode(prev => {
      if (!prev) {
        setCanvasMode('holographic');
      } else {
        setCanvasMode('design');
      }
      return !prev;
    });
  }, []);

  // 🎭 Device Responsiveness
  const devicePresets = {
    desktop: { width: '100%', height: '100%', label: 'Desktop' },
    tablet: { width: '768px', height: '1024px', label: 'Tablet' },
    mobile: { width: '375px', height: '667px', label: 'Mobile' }
  };

  // ⚡ Real-time Updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        renderTime: Math.random() * 16 + 8,
        interactions: prev.interactions + Math.floor(Math.random() * 3),
        aiProcessing: quantumState === 'active' ? Math.random() * 100 : 0,
        quantumOperations: quantumState === 'superposition' ? Math.random() * 50 : 0,
        holographicLayers: holographicMode ? holographicLayers.length : 0
      }));

      // Simulate collaborator movements
      setCollaborators(prev => prev.map(collab => ({
        ...collab,
        cursor: {
          x: collab.cursor.x + (Math.random() - 0.5) * 100,
          y: collab.cursor.y + (Math.random() - 0.5) * 100
        }
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, [quantumState, holographicMode, holographicLayers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-gray-50 font-['Plus_Jakarta_Sans']">
      {/* 🎯 Advanced Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-purple-200/30 shadow-lg sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                EF
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-900">Neural Studio Pro</h1>
                <p className="text-xs text-purple-600">AI-Powered Design</p>
              </div>
            </div>

            {/* 🎮 Mode Switcher */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              {[
                { id: 'design', icon: FiLayers, label: 'Design' },
                { id: 'ai', icon: FiStar, label: 'AI' },
                { id: 'quantum', icon: FiCpu, label: 'Quantum' },
                { id: 'holographic', icon: FiZap, label: 'Holo' }
              ].map(mode => (
                <motion.button
                  key={mode.id}
                  onClick={() => {
                    if (mode.id === 'quantum') toggleQuantumMode();
                    else if (mode.id === 'holographic') toggleHolographicMode();
                    else setCanvasMode(mode.id);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    canvasMode === mode.id
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  <mode.icon className="w-4 h-4 inline mr-2" />
                  {mode.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* 📱 Device Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {[
                { id: 'desktop', icon: FiMonitor },
                { id: 'tablet', icon: FiTablet },
                { id: 'mobile', icon: FiSmartphone }
              ].map(device => (
                <button
                  key={device.id}
                  onClick={() => setDeviceView(device.id)}
                  className={`p-2 rounded-lg transition-all ${
                    deviceView === device.id
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  <device.icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            {/* 🔧 Tools */}
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50">
                <FiArrowLeft className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50">
                <FiArrowRight className="w-5 h-5" />
              </button>
              <div className="w-px h-6 bg-gray-300" />
              <button className="p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50">
                <FiSave className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                🚀 Publish
              </button>
            </div>
          </div>
        </div>

        {/* 📊 Analytics Bar */}
        <div className="border-t border-purple-200/30 px-6 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6 text-gray-600">
              <span>Render: {analytics.renderTime.toFixed(1)}ms</span>
              <span>Elements: {elements.length}</span>
              <span>Interactions: {analytics.interactions}</span>
              {quantumState !== 'idle' && (
                <span className="text-purple-600">
                  Quantum: {analytics.quantumOperations.toFixed(0)} ops/s
                </span>
              )}
              {holographicMode && (
                <span className="text-indigo-600">
                  Holo Layers: {analytics.holographicLayers}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {collaborators.map(collab => (
                  <div
                    key={collab.id}
                    className="flex items-center space-x-1 text-xs bg-gray-100 rounded-full px-2 py-1"
                  >
                    <span>{collab.avatar}</span>
                    <span>{collab.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-120px)]">
        {/* 🎨 Component Library */}
        <div className="w-80 bg-white/90 backdrop-blur-xl border-r border-purple-200/30 shadow-lg overflow-y-auto">
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Component Library</h2>
            
            {/* 🧠 AI Features */}
            {canvasMode === 'ai' && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-purple-600 mb-4 uppercase tracking-wide">
                  AI Features
                </h3>
                <div className="space-y-3">
                  {aiFeatures.map(feature => (
                    <div
                      key={feature.id}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                        feature.active 
                          ? 'bg-purple-50 border-purple-200' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <feature.icon className={`w-4 h-4 ${
                          feature.active ? 'text-purple-600' : 'text-gray-400'
                        }`} />
                        <span className="text-sm font-medium text-gray-900">
                          {feature.name}
                        </span>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        feature.active ? 'bg-green-400' : 'bg-gray-300'
                      }`} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 🔮 Quantum Features */}
            {canvasMode === 'quantum' && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-indigo-600 mb-4 uppercase tracking-wide">
                  Quantum Computing
                </h3>
                <div className="space-y-3">
                  {quantumFeatures.map(feature => (
                    <div key={feature.id} className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          {feature.name}
                        </span>
                        <span className="text-xs text-indigo-600 font-bold">
                          {(feature.probability * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-indigo-200 rounded-full h-1">
                        <div 
                          className="bg-indigo-500 h-1 rounded-full transition-all"
                          style={{ width: `${feature.probability * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 🌌 Holographic Layers */}
            {canvasMode === 'holographic' && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-pink-600 mb-4 uppercase tracking-wide">
                  Holographic Layers
                </h3>
                <div className="space-y-3">
                  {holographicLayers.map(layer => (
                    <div key={layer.id} className="p-3 bg-pink-50 border border-pink-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          {layer.name}
                        </span>
                        <span className="text-xs text-pink-600 font-bold">
                          Z: {layer.depth}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-600">Opacity:</span>
                        <div className="flex-1 bg-pink-200 rounded-full h-1">
                          <div 
                            className="bg-pink-500 h-1 rounded-full"
                            style={{ width: `${layer.opacity * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-pink-600">
                          {(layer.opacity * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 🎨 Standard Components */}
            <div className="space-y-6">
              {componentLibrary.map(category => (
                <div key={category.category}>
                  <h3 className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {category.items.map(item => (
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 rounded-xl cursor-pointer transition-all bg-gradient-to-r ${item.gradient} text-white shadow-lg hover:shadow-xl`}
                      >
                        <div className="text-2xl mb-2 text-center">{item.icon}</div>
                        <div className="text-xs font-medium text-center">{item.name}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🎨 Main Canvas */}
        <div className="flex-1 flex flex-col bg-gray-100/50 relative overflow-hidden">
          {/* 🌌 Advanced Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {canvasMode === 'quantum' && (
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/20 via-purple-100/20 to-pink-100/20 animate-pulse" />
            )}
            {canvasMode === 'holographic' && (
              <div className="absolute inset-0">
                {holographicLayers.map((layer, index) => (
                  <div
                    key={layer.id}
                    className="absolute inset-0 bg-gradient-to-r from-pink-200/10 to-cyan-200/10"
                    style={{
                      transform: `translateZ(${layer.depth}px)`,
                      opacity: layer.opacity * 0.3,
                      animationDelay: `${index * 0.5}s`
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 🎯 Canvas Container */}
          <div 
            ref={canvasRef}
            className="flex-1 relative"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'center center'
            }}
          >
            {/* 📏 Grid Overlay */}
            {gridEnabled && (
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" className="pointer-events-none">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#8B5CF6" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
            )}

            {/* 👥 Collaborator Cursors */}
            <AnimatePresence>
              {collaborators.map(collab => (
                <motion.div
                  key={collab.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    x: collab.cursor.x, 
                    y: collab.cursor.y 
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute pointer-events-none z-50"
                >
                  <div className={`bg-${collab.color}-500 text-white px-2 py-1 rounded-lg text-xs font-medium shadow-lg`}>
                    {collab.avatar} {collab.name}
                  </div>
                  <div className={`w-4 h-4 bg-${collab.color}-500 rounded-full mt-1 shadow-lg`} />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* 🎨 Canvas Content */}
            <div className={`w-full h-full transition-all duration-500 ${
              deviceView === 'mobile' ? 'max-w-sm mx-auto' :
              deviceView === 'tablet' ? 'max-w-3xl mx-auto' :
              'w-full'
            }`}>
              <div className="min-h-full bg-white rounded-lg shadow-2xl border border-purple-200/30 overflow-hidden">
                {/* 📱 Device Frame */}
                {deviceView !== 'desktop' && (
                  <div className="bg-gray-900 p-2 flex items-center justify-center">
                    <div className="w-12 h-1 bg-gray-600 rounded-full" />
                  </div>
                )}

                {/* 🎭 Content Area */}
                <div className="p-8 min-h-[600px] relative">
                  {elements.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FiLayers className="w-16 h-16 text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          Start Creating
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Drag components from the library to start building
                        </p>
                        {canvasMode === 'ai' && (
                          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                            🧠 Generate with AI
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {elements.map(element => (
                        <motion.div
                          key={element.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 border-2 border-dashed border-purple-300 rounded-lg bg-purple-50/30"
                        >
                          Element: {element.type}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 🎮 Canvas Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4 bg-white/90 backdrop-blur-xl rounded-2xl px-6 py-3 shadow-lg border border-purple-200/30">
              <button
                onClick={() => setZoom(Math.max(25, zoom - 25))}
                className="p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50"
              >
                <FiMinus className="w-5 h-5" />
              </button>
              
              <div className="text-sm font-medium text-gray-900 min-w-[60px] text-center">
                {zoom}%
              </div>
              
              <button
                onClick={() => setZoom(Math.min(200, zoom + 25))}
                className="p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50"
              >
                <FiPlus className="w-5 h-5" />
              </button>
              
              <div className="w-px h-6 bg-gray-300" />
              
              <button
                onClick={() => setGridEnabled(!gridEnabled)}
                className={`p-2 rounded-lg transition-all ${
                  gridEnabled
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <FiGrid className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50"
              >
                {isPlaying ? <FiPause className="w-5 h-5" /> : <FiPlay className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* 🧠 AI Suggestions Panel */}
          {canvasMode === 'ai' && aiSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-6 right-6 w-80"
            >
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-purple-200/30">
                <h3 className="text-lg font-bold text-gray-900 mb-4">AI Suggestions</h3>
                <div className="space-y-3">
                  {aiSuggestions.map(suggestion => (
                    <div key={suggestion.id} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900 capitalize">
                          {suggestion.type}
                        </span>
                        <span className="text-xs text-purple-600 font-bold">
                          {(suggestion.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {suggestion.suggestion}
                      </p>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-purple-500 text-white rounded-lg text-xs font-medium hover:bg-purple-600">
                          Apply
                        </button>
                        <button className="px-3 py-1 border border-purple-300 text-purple-600 rounded-lg text-xs font-medium hover:bg-purple-50">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* ⚙️ Properties Panel */}
        <div className="w-80 bg-white/90 backdrop-blur-xl border-l border-purple-200/30 shadow-lg overflow-y-auto">
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Properties</h2>
            
            {selectedElement ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Element Type
                  </label>
                  <div className="text-sm text-purple-600 font-medium">
                    {selectedElement.type}
                  </div>
                </div>
                
                {/* More properties would go here */}
              </div>
            ) : (
              <div className="text-center py-12">
                <FiSettings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Select an element to edit its properties
                </p>
              </div>
            )}

            {/* 🎭 Animation Controls */}
            <div className="mt-8">
              <h3 className="text-sm font-bold text-gray-600 mb-4 uppercase tracking-wide">
                Animations
              </h3>
              <div className="space-y-2">
                {animationPresets.map(preset => (
                  <button
                    key={preset.id}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-200 transition-all"
                  >
                    <div className="font-medium text-gray-900">{preset.name}</div>
                    <div className="text-xs text-gray-600">
                      {preset.duration}s • {preset.easing}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScaledCanvasEditor;
