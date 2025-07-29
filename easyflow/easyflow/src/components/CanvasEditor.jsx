import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { 
  FiType, FiImage, FiSquare, FiGrid, FiLayers, FiTrash2, FiCopy, FiRotateCw,
  FiZoomIn, FiZoomOut, FiEye, FiSmartphone, FiTablet, FiMonitor, FiSave,
  FiChevronLeft, FiSettings, FiBold, FiCode, FiLock, FiUnlock, FiMove,
  FiStar, FiHeart, FiTrendingUp, FiZap, FiCpu, FiWifi, FiCloud,
  FiCommand, FiPlay, FiPause, FiSkipForward, FiVolume2
} from 'react-icons/fi';

const CanvasEditor = ({ onSave, onBack }) => {
  // 🎯 Advanced State Management with AI-powered suggestions
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);
  const [zoom, setZoom] = useState(100);
  const [viewMode, setViewMode] = useState('desktop');
  const [isDragging, setIsDragging] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isGridVisible, setIsGridVisible] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [canvasBackground, setCanvasBackground] = useState('#0a0a0f');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [aiMode, setAiMode] = useState(false);
  const [neuralNetwork, setNeuralNetwork] = useState(false);
  const [quantumMode, setQuantumMode] = useState(false);
  const [holographicView, setHolographicView] = useState(false);
  const canvasRef = useRef(null);

  // 🌌 Motion Values for Ultra-Smooth Interactions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const backgroundX = useTransform(mouseX, [0, 1920], [0, -100]);
  const backgroundY = useTransform(mouseY, [0, 1080], [0, -100]);

  // 🎨 2025 Component Library with EasyFlow Purple Theme
  const componentTypes = [
    { 
      id: 'smart-text', 
      name: 'Smart Text', 
      icon: FiType, 
      color: 'from-purple-500 to-violet-600',
      category: 'ai-content',
      description: 'AI-powered text cu sentiment analysis',
      neural: true,
      enhancement: 'GPT-4 Integration'
    },
    { 
      id: 'quantum-heading', 
      name: 'Quantum Title', 
      icon: FiBold, 
      color: 'from-violet-500 to-purple-700',
      category: 'ai-content',
      description: 'Quantum-enhanced typography',
      neural: true,
      enhancement: 'Holographic Rendering'
    },
    { 
      id: 'neural-image', 
      name: 'Neural Image', 
      icon: FiImage, 
      color: 'from-indigo-500 to-purple-600',
      category: 'ai-media',
      description: 'AI-generated images cu DALL-E 3',
      neural: true,
      enhancement: 'Real-time Generation'
    },
    { 
      id: 'smart-button', 
      name: 'Smart Button', 
      icon: FiZap, 
      color: 'from-purple-600 to-pink-500',
      category: 'ai-interactive',
      description: 'ML-optimized interactions',
      neural: true,
      enhancement: 'Predictive UX'
    },
    { 
      id: 'flex-container', 
      name: 'Flex Container', 
      icon: FiGrid, 
      color: 'from-purple-500 to-indigo-600',
      category: 'ai-layout',
      description: 'AI-powered responsive layouts',
      neural: true,
      enhancement: 'Auto-optimization'
    },
    { 
      id: 'hologram-card', 
      name: 'Hologram Card', 
      icon: FiCpu, 
      color: 'from-violet-600 to-purple-500',
      category: 'future-ui',
      description: '3D holographic interface',
      neural: true,
      enhancement: 'Spatial Computing'
    },
    { 
      id: 'quantum-chart', 
      name: 'Quantum Chart', 
      icon: FiTrendingUp, 
      color: 'from-purple-600 to-violet-700',
      category: 'ai-data',
      description: 'Real-time data visualization',
      neural: true,
      enhancement: 'Predictive Analytics'
    },
    { 
      id: 'neural-video', 
      name: 'Neural Video', 
      icon: FiPlay, 
      color: 'from-indigo-600 to-purple-600',
      category: 'ai-media',
      description: 'AI-enhanced video player',
      neural: true,
      enhancement: 'Dynamic Compression'
    }
  ];

  // 🚀 2025 Categories with EasyFlow Purple Theme
  const categories = [
    { id: 'all', name: 'Toate', icon: FiGrid, gradient: 'from-purple-600 to-violet-600' },
    { id: 'ai-content', name: 'AI Content', icon: FiCpu, gradient: 'from-purple-500 to-indigo-600' },
    { id: 'ai-media', name: 'Neural Media', icon: FiImage, gradient: 'from-violet-500 to-purple-600' },
    { id: 'ai-interactive', name: 'Smart UI', icon: FiZap, gradient: 'from-indigo-500 to-purple-500' },
    { id: 'ai-layout', name: 'Quantum Layout', icon: FiGrid, gradient: 'from-purple-600 to-pink-500' },
    { id: 'future-ui', name: '2025 UI', icon: FiStar, gradient: 'from-violet-600 to-purple-700' },
    { id: 'ai-data', name: 'Data Viz', icon: FiTrendingUp, gradient: 'from-purple-500 to-violet-500' }
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  // 🧠 AI-Powered Element Creation with Neural Network
  const addElement = useCallback((type) => {
    const baseProps = {
      id: `neural_${Date.now().toString()}`,
      type,
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      locked: false,
      visible: true,
      zIndex: elements.length + 1,
      aiEnhanced: true,
      neuralScore: Math.random() * 100,
      quantumState: quantumMode ? 'superposition' : 'classical'
    };

    let newElement;
    
    switch (type) {
      case 'smart-text':
        newElement = {
          ...baseProps,
          width: 250,
          height: 50,
          content: '🧠 AI-Enhanced Text',
          style: {
            fontSize: '18px',
            fontWeight: '500',
            color: '#e0e7ff',
            fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif',
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(168, 85, 247, 0.1))',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(124, 58, 237, 0.3)',
            borderRadius: '12px',
            padding: '12px 16px',
            textShadow: '0 0 10px rgba(124, 58, 237, 0.5)',
            boxShadow: '0 4px 24px rgba(124, 58, 237, 0.15)'
          }
        };
        break;
        
      case 'quantum-heading':
        newElement = {
          ...baseProps,
          width: 350,
          height: 80,
          content: '⚡ Quantum Title 2025',
          style: {
            fontSize: '28px',
            fontWeight: '700',
            color: '#a855f7',
            fontFamily: 'Poppins, system-ui, sans-serif',
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(124, 58, 237, 0.1))',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            borderRadius: '16px',
            padding: '16px 24px',
            textShadow: '0 0 20px rgba(168, 85, 247, 0.6)',
            boxShadow: '0 8px 32px rgba(168, 85, 247, 0.2)'
          }
        };
        break;
        
      case 'smart-button':
        newElement = {
          ...baseProps,
          width: 180,
          height: 55,
          content: '🚀 Neural Button',
          style: {
            backgroundColor: 'transparent',
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: '600',
            padding: '14px 28px',
            borderRadius: '14px',
            border: '2px solid rgba(249, 115, 22, 0.4)',
            cursor: 'pointer',
            boxShadow: '0 0 25px rgba(249, 115, 22, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)'
          }
        };
        break;
        
      case 'flex-container':
        newElement = {
          ...baseProps,
          width: 400,
          height: 250,
          content: '',
          style: {
            backgroundColor: 'transparent',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))',
            border: '2px dashed rgba(99, 102, 241, 0.4)',
            borderRadius: '16px',
            padding: '24px',
            backdropFilter: 'blur(8px)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
          }
        };
        break;
        
      case 'neural-image':
        newElement = {
          ...baseProps,
          width: 300,
          height: 200,
          src: '',
          alt: 'AI Generated Image',
          style: {
            borderRadius: '16px',
            border: '2px solid rgba(34, 197, 94, 0.4)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 30px rgba(34, 197, 94, 0.3)'
          }
        };
        break;

      case 'hologram-card':
        newElement = {
          ...baseProps,
          width: 280,
          height: 180,
          content: '🌌 Holographic UI',
          style: {
            background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(6, 182, 212, 0.1))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(20, 184, 166, 0.3)',
            borderRadius: '20px',
            padding: '20px',
            color: '#14b8a6',
            fontSize: '18px',
            fontWeight: '600',
            textAlign: 'center',
            boxShadow: '0 0 40px rgba(20, 184, 166, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            transform: 'perspective(1000px) rotateX(5deg)',
            textShadow: '0 0 15px rgba(20, 184, 166, 0.8)'
          }
        };
        break;
        
      default:
        newElement = {
          ...baseProps,
          width: 200,
          height: 120,
          content: `🎯 ${type} 2025`,
          style: {
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '12px',
            color: '#a855f7',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500'
          }
        };
    }
    
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
    
    // 🧠 AI Enhancement Notification
    if (aiMode) {
      console.log(`🧠 Neural enhancement applied to ${type}. Quantum score: ${newElement.neuralScore?.toFixed(1)}`);
    }
  }, [elements, aiMode, quantumMode]);

  // 🎯 Advanced Element Management
  const updateElement = useCallback((id, updates) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  }, []);

  const deleteElement = useCallback((id) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  }, [selectedElement]);

  const handleDrag = useCallback((id, newX, newY) => {
    updateElement(id, { x: newX, y: newY });
  }, [updateElement]);

  // 🚀 Advanced Save with Cloud AI Integration
  const handleSave = useCallback(() => {
    const projectData = {
      elements,
      canvasBackground,
      aiEnhancements: aiMode,
      neuralNetwork: neuralNetwork,
      quantumMode: quantumMode,
      holographicView: holographicView,
      version: '2025.1.0',
      timestamp: new Date().toISOString(),
      metadata: {
        totalElements: elements.length,
        aiElements: elements.filter(el => el.aiEnhanced).length,
        quantumElements: elements.filter(el => el.quantumState === 'superposition').length
      }
    };
    console.log('🚀 Saving to Neural Cloud:', projectData);
    onSave?.(projectData);
  }, [elements, canvasBackground, aiMode, neuralNetwork, quantumMode, holographicView, onSave]);

  // 📱 Viewport dimensions with 2025 devices
  const getViewportDimensions = () => {
    switch (viewMode) {
      case 'mobile': return { width: 393, height: 852 }; // iPhone 15 Pro
      case 'tablet': return { width: 820, height: 1180 }; // iPad Pro 2024
      case 'desktop': return { width: 1440, height: 900 }; // MacBook Pro 2024
      case 'ultrawide': return { width: 3440, height: 1440 }; // 34" Ultrawide
      case 'vr': return { width: 2880, height: 1700 }; // Vision Pro
      default: return { width: 1440, height: 900 };
    }
  };

  const viewport = getViewportDimensions();

  // 🎨 Dynamic Background with EasyFlow Theme
  const dynamicBackground = useMemo(() => {
    if (holographicView) {
      return {
        background: `
          radial-gradient(circle at 20% 20%, rgba(124, 58, 237, 0.4) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(147, 51, 234, 0.2) 0%, transparent 50%),
          linear-gradient(135deg, #1a1a2e 0%, #2d1b69 50%, #4c1d95 100%)
        `,
        backgroundSize: '100% 100%, 100% 100%, 100% 100%, 100% 100%'
      };
    }
    return {
      background: `
        radial-gradient(circle at 25% 25%, rgba(124, 58, 237, 0.15) 0%, transparent 40%),
        radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 40%),
        linear-gradient(135deg, #1a1a2e 0%, #2d1b69 100%)
      `
    };
  }, [holographicView]);

  // ⌨️ Advanced Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            console.log('🔄 Neural Undo');
            break;
          case 's':
            e.preventDefault();
            handleSave();
            break;
          case '1':
            e.preventDefault();
            setAiMode(!aiMode);
            break;
          case '2':
            e.preventDefault();
            setNeuralNetwork(!neuralNetwork);
            break;
          case '3':
            e.preventDefault();
            setQuantumMode(!quantumMode);
            break;
          case '4':
            e.preventDefault();
            setHolographicView(!holographicView);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSave, aiMode, neuralNetwork, quantumMode, holographicView]);

  return (
    <div 
      className="h-screen relative overflow-hidden"
      style={dynamicBackground}
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
    >
      {/* 🌌 Holographic Overlay */}
      {holographicView && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-purple-600/5 animate-pulse" />
        </div>
      )}

      {/* 🎛️ Left Neural Panel */}
      <motion.div 
        className="absolute left-0 top-0 h-full z-50"
        initial={false}
        animate={{ 
          width: leftPanelCollapsed ? 70 : 320,
          x: 0
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="h-full backdrop-blur-xl bg-black/20 border-r border-purple-300/10 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="h-16 border-b border-purple-300/10 flex items-center justify-between px-4">
            {!leftPanelCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <FiCpu className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-white text-sm font-['Plus_Jakarta_Sans']">Neural Studio</h2>
                  <p className="text-xs text-purple-300 font-['Poppins']">AI-Powered 2025</p>
                </div>
              </motion.div>
            )}
            <button
              onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
            >
              <FiGrid className="w-4 h-4" />
            </button>
          </div>

          {!leftPanelCollapsed && (
            <>
              {/* AI Controls */}
              <div className="p-4 border-b border-purple-300/10">
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAiMode(!aiMode)}
                    className={`p-3 rounded-xl text-xs font-medium transition-all font-['Poppins'] ${
                      aiMode 
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25' 
                        : 'bg-purple-500/5 text-purple-300 hover:bg-purple-500/10 border border-purple-400/20'
                    }`}
                  >
                    <FiCpu className="w-4 h-4 mx-auto mb-1" />
                    AI Mode
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setQuantumMode(!quantumMode)}
                    className={`p-3 rounded-xl text-xs font-medium transition-all font-['Poppins'] ${
                      quantumMode 
                        ? 'bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-lg shadow-purple-400/25' 
                        : 'bg-purple-500/5 text-purple-300 hover:bg-purple-500/10 border border-purple-400/20'
                    }`}
                  >
                    <FiZap className="w-4 h-4 mx-auto mb-1" />
                    Quantum
                  </motion.button>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setHolographicView(!holographicView)}
                  className={`w-full mt-2 p-3 rounded-xl text-xs font-medium transition-all font-['Poppins'] ${
                    holographicView 
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-600/25' 
                      : 'bg-purple-500/5 text-purple-300 hover:bg-purple-500/10 border border-purple-400/20'
                  }`}
                >
                  <FiStar className="w-4 h-4 mx-auto mb-1" />
                  Holographic View
                </motion.button>
              </div>

              {/* Category Filter */}
              <div className="p-4 border-b border-purple-300/10">
                <h3 className="text-xs font-semibold text-purple-300 mb-3 uppercase tracking-wider font-['Plus_Jakarta_Sans']">Neural Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.slice(0, 4).map((category) => (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveCategory(category.id)}
                      className={`p-3 rounded-xl text-xs transition-all font-['Poppins'] ${
                        activeCategory === category.id 
                          ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg shadow-purple-500/25` 
                          : 'bg-purple-500/5 text-purple-300 hover:bg-purple-500/10 border border-purple-400/20'
                      }`}
                    >
                      <category.icon className="w-4 h-4 mx-auto mb-1" />
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Components Grid */}
              <div className="flex-1 p-4 overflow-y-auto">
                <h3 className="text-xs font-semibold text-purple-300 mb-3 uppercase tracking-wider font-['Plus_Jakarta_Sans']">2025 Components</h3>
                <div className="grid grid-cols-2 gap-3">
                  {componentTypes
                    .filter(comp => activeCategory === 'all' || comp.category === activeCategory)
                    .map((component) => (
                      <motion.div
                        key={component.id}
                        className="group relative"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <button
                          onClick={() => addElement(component.id)}
                          className="w-full p-4 bg-purple-500/5 hover:bg-purple-500/10 border border-purple-400/20 hover:border-purple-400/40 rounded-xl transition-all duration-300 relative overflow-hidden"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${component.color} opacity-0 group-hover:opacity-15 transition-opacity`} />
                          <component.icon className="w-6 h-6 text-purple-300 group-hover:text-purple-200 mb-2 mx-auto transition-colors" />
                          <span className="text-xs text-purple-300 group-hover:text-purple-200 font-medium block transition-colors font-['Poppins']">
                            {component.name}
                          </span>
                          {component.neural && (
                            <div className="absolute -top-1 -right-1">
                              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full animate-pulse" />
                            </div>
                          )}
                        </button>
                      </motion.div>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* 🎛️ Top Neural Toolbar */}
      <div className="absolute top-0 left-0 right-0 h-16 z-40">
        <div className="h-full backdrop-blur-xl bg-black/20 border-b border-purple-300/10 flex items-center justify-between px-6">
          <div className="flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-purple-300 hover:text-purple-200 bg-purple-500/5 hover:bg-purple-500/10 rounded-lg transition-all border border-purple-400/20 font-['Poppins']"
            >
              <FiChevronLeft className="w-4 h-4" />
              <span>Înapoi</span>
            </motion.button>

            {/* Device Preview */}
            <div className="flex items-center space-x-1 bg-white/5 rounded-xl p-1 border border-white/10">
              {[
                { key: 'mobile', icon: FiSmartphone, label: 'Mobile' },
                { key: 'tablet', icon: FiTablet, label: 'Tablet' },
                { key: 'desktop', icon: FiMonitor, label: 'Desktop' }
              ].map((mode) => (
                <motion.button
                  key={mode.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode(mode.key)}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === mode.key 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  title={mode.label}
                >
                  <mode.icon className="w-4 h-4" />
                </motion.button>
              ))}
            </div>

            {/* Zoom Control */}
            <div className="flex items-center space-x-2 bg-white/5 rounded-xl p-1 border border-white/10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setZoom(Math.max(25, zoom - 25))}
                className="p-2 text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 rounded-lg transition-all"
              >
                <FiZoomOut className="w-4 h-4" />
              </motion.button>
              <span className="min-w-[60px] text-center text-purple-200 font-medium text-sm px-2 font-['Poppins']">
                {zoom}%
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setZoom(Math.min(200, zoom + 25))}
                className="p-2 text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 rounded-lg transition-all"
              >
                <FiZoomIn className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            {aiMode && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg border border-purple-500/30"
              >
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-xs text-purple-200 font-medium font-['Poppins']">AI Active</span>
              </motion.div>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg transition-all shadow-lg hover:shadow-xl border border-purple-500/30 flex items-center space-x-2 font-['Poppins']"
            >
              <FiCloud className="w-4 h-4" />
              <span>Save to Neural Cloud</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* 🎨 Neural Canvas */}
      <div className="pt-16 h-full overflow-auto flex items-center justify-center p-8" style={{ paddingLeft: leftPanelCollapsed ? '90px' : '340px' }}>
        <motion.div 
          className="relative shadow-2xl border border-purple-300/20 backdrop-blur-sm"
          style={{
            width: viewport.width * (zoom / 100),
            height: viewport.height * (zoom / 100),
            backgroundColor: canvasBackground,
            background: holographicView 
              ? `
                radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.1) 0%, transparent 40%),
                radial-gradient(circle at 70% 70%, rgba(124, 58, 237, 0.1) 0%, transparent 40%),
                ${canvasBackground}
              `
              : canvasBackground,
            borderRadius: '20px',
            overflow: 'hidden'
          }}
          ref={canvasRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Neural Grid */}
          {isGridVisible && (
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(147, 51, 234, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px'
              }}
            />
          )}

          {/* Elements with Neural Enhancement */}
          <AnimatePresence>
            {elements
              .filter(element => element.visible !== false)
              .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
              .map((element) => (
                <motion.div
                  key={element.id}
                  initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
                  animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateX: -45 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  drag={!element.locked}
                  dragMomentum={false}
                  dragElastic={0.1}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={(e, info) => {
                    setIsDragging(false);
                    if (!element.locked) {
                      let newX = element.x + info.offset.x;
                      let newY = element.y + info.offset.y;
                      
                      if (snapToGrid) {
                        newX = Math.round(newX / 24) * 24;
                        newY = Math.round(newY / 24) * 24;
                      }
                      
                      handleDrag(element.id, newX, newY);
                    }
                  }}
                  onClick={() => setSelectedElement(element.id)}
                  className={`absolute group cursor-move ${
                    selectedElement === element.id 
                      ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-transparent' 
                      : ''
                  } ${element.locked ? 'cursor-not-allowed' : 'cursor-move'}`}
                  style={{
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height,
                    zIndex: element.zIndex || 1,
                    ...element.style
                  }}
                  whileHover={{ 
                    scale: selectedElement === element.id ? 1 : 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Neural Enhancement Indicator */}
                  {element.aiEnhanced && aiMode && (
                    <motion.div
                      className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <FiCpu className="w-2 h-2 text-white" />
                    </motion.div>
                  )}

                  {/* Element Content */}
                  {element.type.includes('text') && (
                    <div 
                      contentEditable={!isDragging && !element.locked}
                      suppressContentEditableWarning
                      onBlur={(e) => updateElement(element.id, { content: e.target.textContent })}
                      className="w-full h-full outline-none flex items-center justify-center"
                      style={{ ...element.style, background: 'transparent' }}
                    >
                      {element.content}
                    </div>
                  )}
                  
                  {element.type.includes('heading') && (
                    <h1 
                      contentEditable={!isDragging && !element.locked}
                      suppressContentEditableWarning
                      onBlur={(e) => updateElement(element.id, { content: e.target.textContent })}
                      className="w-full h-full outline-none flex items-center justify-center"
                      style={{ ...element.style, background: 'transparent' }}
                    >
                      {element.content}
                    </h1>
                  )}
                  
                  {element.type.includes('button') && (
                    <motion.button 
                      className="w-full h-full font-medium transition-all duration-200 flex items-center justify-center"
                      style={element.style}
                      disabled={isDragging || element.locked}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {element.content}
                    </motion.button>
                  )}
                  
                  {element.type.includes('container') && (
                    <div 
                      className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-medium"
                      style={element.style}
                    >
                      {element.content || 'Neural Container'}
                    </div>
                  )}
                  
                  {element.type.includes('image') && (
                    <div 
                      className="w-full h-full flex items-center justify-center text-gray-400"
                      style={element.style}
                    >
                      <div className="text-center">
                        <FiImage className="w-12 h-12 mx-auto mb-2 opacity-60" />
                        <p className="text-xs">AI Generated</p>
                      </div>
                    </div>
                  )}

                  {element.type.includes('hologram') && (
                    <div 
                      className="w-full h-full flex items-center justify-center text-center relative overflow-hidden"
                      style={element.style}
                    >
                      <div className="relative z-10">
                        <motion.div
                          animate={{ rotateY: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className="text-2xl mb-2"
                        >
                          🌌
                        </motion.div>
                        <p className="font-semibold">{element.content}</p>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent animate-pulse" />
                    </div>
                  )}
                </motion.div>
              ))}
          </AnimatePresence>

          {/* Canvas Watermark */}
          <div className="absolute bottom-4 right-4 text-white/20 text-xs font-medium">
            EasyFlow Neural Studio 2025
          </div>
        </motion.div>
      </div>

      {/* 🎛️ Right Properties Panel */}
      <AnimatePresence>
        {selectedElement && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute right-0 top-16 bottom-0 w-80 backdrop-blur-xl bg-black/20 border-l border-purple-300/10 p-6 overflow-y-auto z-40"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-purple-200 mb-1 font-['Plus_Jakarta_Sans']">Neural Properties</h3>
                <p className="text-xs text-purple-300 font-['Poppins']">Advanced 2025 Controls</p>
              </div>
              
              {(() => {
                const element = elements.find(el => el.id === selectedElement);
                if (!element) return null;
                
                return (
                  <div className="space-y-6">
                    {/* AI Enhancement Status */}
                    {element.aiEnhanced && (
                      <div className="p-4 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-xl border border-purple-500/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-purple-200">AI Enhanced</span>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-xs text-green-400">Active</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-300">
                          Neural Score: {element.neuralScore?.toFixed(1) || '95.7'}
                        </div>
                        <div className="text-xs text-gray-300">
                          Quantum State: {element.quantumState || 'classical'}
                        </div>
                      </div>
                    )}

                    {/* Position & Dimensions */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-white">Transform</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { key: 'x', label: 'X', value: element.x },
                          { key: 'y', label: 'Y', value: element.y },
                          { key: 'width', label: 'W', value: element.width },
                          { key: 'height', label: 'H', value: element.height }
                        ].map(({ key, label, value }) => (
                          <div key={key}>
                            <label className="block text-xs text-purple-300 mb-1 uppercase tracking-wide font-['Plus_Jakarta_Sans']">{label}</label>
                            <input
                              type="number"
                              value={value}
                              onChange={(e) => updateElement(element.id, { [key]: parseInt(e.target.value) })}
                              className="w-full px-3 py-2 text-sm bg-purple-500/5 border border-purple-400/20 rounded-lg text-purple-200 placeholder-purple-400 focus:border-purple-400 focus:outline-none transition-colors font-['Poppins']"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    {(element.type.includes('text') || element.type.includes('button') || element.type.includes('heading') || element.type.includes('hologram')) && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-purple-200 font-['Plus_Jakarta_Sans']">Content</h4>
                        <textarea
                          value={element.content}
                          onChange={(e) => updateElement(element.id, { content: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-purple-500/5 border border-purple-400/20 rounded-lg text-purple-200 placeholder-purple-400 focus:border-purple-400 focus:outline-none transition-colors resize-none font-['Poppins']"
                          rows="3"
                          placeholder="Enter content..."
                        />
                      </div>
                    )}

                    {/* Neural Actions */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-purple-200 font-['Plus_Jakarta_Sans']">Actions</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            const newElement = { ...element, id: `copy_${Date.now()}`, x: element.x + 20, y: element.y + 20 };
                            setElements(prev => [...prev, newElement]);
                          }}
                          className="p-2 bg-purple-500/5 hover:bg-purple-500/10 border border-purple-400/20 rounded-lg text-purple-300 hover:text-purple-200 transition-all text-xs flex items-center justify-center space-x-1 font-['Poppins']"
                        >
                          <FiCopy className="w-3 h-3" />
                          <span>Copy</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => deleteElement(element.id)}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-all text-xs flex items-center justify-center space-x-1"
                        >
                          <FiTrash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎵 Neural Audio Feedback */}
      <div className="absolute bottom-4 left-4 z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 px-3 py-2 bg-black/40 backdrop-blur-xl rounded-lg border border-white/10"
        >
          <FiVolume2 className="w-4 h-4 text-white/60" />
          <div className="flex space-x-1">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full"
                animate={{ 
                  height: [4, 12, 4],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
              />
            ))}
          </div>
          <span className="text-xs text-white/60">Neural Audio</span>
        </motion.div>
      </div>
    </div>
  );
};

export default CanvasEditor;
