import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiType, 
  FiImage, 
  FiSquare, 
  FiCircle,
  FiGrid,
  FiLayers,
  FiMove,
  FiTrash2,
  FiCopy,
  FiRotateCw,
  FiZoomIn,
  FiZoomOut,
  FiEye,
  FiSmartphone,
  FiTablet,
  FiMonitor,
  FiSave,
  FiDownload,
  FiUpload,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiBold,
  FiItalic,
  FiUnderline,
  FiLink,
  FiCode,
  FiMagic,
  FiLock,
  FiUnlock,
  FiChevronLeft,
  FiChevronRight,
  FiSettings
} from 'react-icons/fi';

const CanvasEditor = ({ onSave, onBack }) => {
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
  const [canvasBackground, setCanvasBackground] = useState('#ffffff');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const canvasRef = useRef(null);

  // Component types
  const componentTypes = [
    { 
      id: 'text', 
      name: 'Text', 
      icon: FiType, 
      color: 'text-purple-600',
      category: 'content',
      description: 'Adaugă text editabil'
    },
    { 
      id: 'heading', 
      name: 'Titlu', 
      icon: FiBold, 
      color: 'text-purple-800',
      category: 'content',
      description: 'Heading H1-H6'
    },
    { 
      id: 'image', 
      name: 'Imagine', 
      icon: FiImage, 
      color: 'text-blue-600',
      category: 'media',
      description: 'Imagine responsive'
    },
    { 
      id: 'button', 
      name: 'Buton', 
      icon: FiSquare, 
      color: 'text-green-600',
      category: 'interactive',
      description: 'Buton interactiv'
    },
    { 
      id: 'container', 
      name: 'Container', 
      icon: FiGrid, 
      color: 'text-orange-600',
      category: 'layout',
      description: 'Container flex/grid'
    },
  ];

  const categories = [
    { id: 'all', name: 'Toate', icon: FiGrid },
    { id: 'content', name: 'Conținut', icon: FiType },
    { id: 'media', name: 'Media', icon: FiImage },
    { id: 'interactive', name: 'Interactiv', icon: FiSquare },
    { id: 'layout', name: 'Layout', icon: FiGrid },
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  // Save state for undo/redo
  const saveState = useCallback(() => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(elements)));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [elements, history, historyIndex]);

  // Undo/Redo functions
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  // Add element
  const addElement = useCallback((type) => {
    const baseProps = {
      id: Date.now().toString(),
      type,
      x: 100 + Math.random() * 100,
      y: 100 + Math.random() * 100,
      locked: false,
      visible: true,
      zIndex: elements.length + 1
    };

    let newElement;
    
    switch (type) {
      case 'text':
        newElement = {
          ...baseProps,
          width: 200,
          height: 40,
          content: 'Text nou',
          style: {
            fontSize: '16px',
            fontWeight: '400',
            color: '#1f2937',
            fontFamily: 'Plus Jakarta Sans'
          }
        };
        break;
        
      case 'heading':
        newElement = {
          ...baseProps,
          width: 300,
          height: 60,
          content: 'Titlu Nou',
          style: {
            fontSize: '32px',
            fontWeight: '700',
            color: '#111827',
            fontFamily: 'Poppins'
          }
        };
        break;
        
      case 'button':
        newElement = {
          ...baseProps,
          width: 150,
          height: 45,
          content: 'Buton Nou',
          style: {
            backgroundColor: '#7c3aed',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: '600',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer'
          }
        };
        break;
        
      case 'container':
        newElement = {
          ...baseProps,
          width: 300,
          height: 200,
          content: '',
          style: {
            backgroundColor: 'transparent',
            border: '2px dashed #d1d5db',
            borderRadius: '8px',
            padding: '20px'
          }
        };
        break;
        
      case 'image':
        newElement = {
          ...baseProps,
          width: 200,
          height: 150,
          src: '',
          alt: 'Imagine nouă',
          style: {
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }
        };
        break;
        
      default:
        newElement = {
          ...baseProps,
          width: 150,
          height: 100,
          content: `${type} nou`,
          style: {
            backgroundColor: '#f3f4f6',
            border: '1px solid #d1d5db',
            borderRadius: '6px'
          }
        };
    }
    
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
    saveState();
  }, [elements, saveState]);

  // Delete element
  const deleteElement = useCallback((id) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
    saveState();
  }, [selectedElement, saveState]);

  // Duplicate element
  const duplicateElement = useCallback((id) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      const newElement = {
        ...element,
        id: Date.now().toString(),
        x: element.x + 20,
        y: element.y + 20
      };
      setElements(prev => [...prev, newElement]);
      setSelectedElement(newElement.id);
      saveState();
    }
  }, [elements, saveState]);

  // Update element
  const updateElement = useCallback((id, updates) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  }, []);

  // Handle drag
  const handleDrag = useCallback((id, newX, newY) => {
    updateElement(id, { x: newX, y: newY });
  }, [updateElement]);

  // Toggle element lock
  const toggleElementLock = useCallback((id) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      updateElement(id, { locked: !element.locked });
    }
  }, [elements, updateElement]);

  // Toggle element visibility
  const toggleElementVisibility = useCallback((id) => {
    const element = elements.find(el => el.id === id);
    if (element) {
      updateElement(id, { visible: !element.visible });
    }
  }, [elements, updateElement]);

  // Save functionality
  const handleSave = useCallback(() => {
    const projectData = {
      elements,
      canvasBackground,
      viewport: getViewportDimensions(),
      timestamp: new Date().toISOString()
    };
    console.log('Salvând proiectul:', projectData);
    onSave?.(projectData);
  }, [elements, canvasBackground, onSave]);

  // Viewport dimensions
  const getViewportDimensions = () => {
    switch (viewMode) {
      case 'mobile': return { width: 375, height: 667 };
      case 'tablet': return { width: 768, height: 1024 };
      default: return { width: 1200, height: 800 };
    }
  };

  const viewport = getViewportDimensions();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
          case 's':
            e.preventDefault();
            handleSave();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, handleSave]);

  return (
    <div className="h-screen bg-slate-50 flex relative overflow-hidden">
      {/* Left Sidebar */}
      <motion.div 
        className="bg-white border-r border-slate-200 flex flex-col shadow-sm"
        initial={false}
        animate={{ width: leftPanelCollapsed ? 60 : 280 }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-14 border-b border-slate-200 flex items-center justify-between px-4">
          <h2 className={`font-semibold text-slate-900 ${leftPanelCollapsed ? 'hidden' : 'block'}`}>
            Componente
          </h2>
          <button
            onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {leftPanelCollapsed ? <FiChevronRight className="w-4 h-4" /> : <FiChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {!leftPanelCollapsed && (
          <>
            {/* Category Filter */}
            <div className="p-4 border-b border-slate-200">
              <div className="grid grid-cols-3 gap-1 bg-slate-100 rounded-lg p-1">
                {categories.slice(0, 3).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`p-2 rounded-md text-xs transition-colors ${
                      activeCategory === category.id 
                        ? 'bg-white shadow-sm text-purple-600' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <category.icon className="w-4 h-4 mx-auto mb-1" />
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Components Grid */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                {componentTypes
                  .filter(comp => activeCategory === 'all' || comp.category === activeCategory)
                  .map((component) => (
                    <motion.div
                      key={component.id}
                      className="group relative"
                      whileHover={{ scale: 1.02 }}
                    >
                      <button
                        onClick={() => addElement(component.id)}
                        className="w-full p-4 border border-slate-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
                      >
                        <component.icon className={`w-6 h-6 ${component.color} mb-2 mx-auto`} />
                        <span className="text-xs text-slate-600 group-hover:text-purple-600 font-medium">
                          {component.name}
                        </span>
                      </button>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Layers Panel */}
            <div className="border-t border-slate-200 p-4 max-h-64 overflow-y-auto">
              <h3 className="text-sm font-medium text-slate-900 mb-3 flex items-center justify-between">
                <span className="flex items-center">
                  <FiLayers className="w-4 h-4 mr-2" />
                  Straturi ({elements.length})
                </span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setIsGridVisible(!isGridVisible)}
                    className={`p-1 rounded ${isGridVisible ? 'text-purple-600' : 'text-slate-400'}`}
                    title="Toggle Grid"
                  >
                    <FiGrid className="w-3 h-3" />
                  </button>
                </div>
              </h3>
              
              <div className="space-y-1">
                {elements.map((element) => (
                  <motion.div
                    key={element.id}
                    onClick={() => setSelectedElement(element.id)}
                    className={`p-2 rounded-lg cursor-pointer transition-colors group ${
                      selectedElement === element.id 
                        ? 'bg-purple-100 border border-purple-300' 
                        : 'hover:bg-slate-100 border border-transparent'
                    }`}
                    layout
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleElementVisibility(element.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {element.visible !== false ? (
                            <FiEye className="w-3 h-3 text-slate-500" />
                          ) : (
                            <FiEye className="w-3 h-3 text-slate-300" />
                          )}
                        </button>
                        <span className="text-sm text-slate-700 capitalize">
                          {element.type} #{element.id.slice(-4)}
                        </span>
                      </div>
                      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateElement(element.id);
                          }}
                          className="p-1 hover:bg-white rounded"
                          title="Duplicate"
                        >
                          <FiCopy className="w-3 h-3 text-slate-500" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteElement(element.id);
                          }}
                          className="p-1 hover:bg-red-100 hover:text-red-600 rounded"
                          title="Delete"
                        >
                          <FiTrash2 className="w-3 h-3 text-slate-500" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </motion.div>

      {/* Center Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm">
          <div className="flex items-center space-x-6">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <FiChevronLeft className="w-4 h-4" />
              Înapoi
            </button>

            {/* Undo/Redo */}
            <div className="flex items-center space-x-1 bg-slate-100 rounded-lg p-1">
              <button
                onClick={undo}
                disabled={historyIndex <= 0}
                className={`p-2 rounded-md transition-colors ${
                  historyIndex <= 0 
                    ? 'text-slate-300 cursor-not-allowed' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
                title="Undo (Ctrl+Z)"
              >
                <FiRotateCw className="w-4 h-4 transform rotate-180" />
              </button>
              <button
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                className={`p-2 rounded-md transition-colors ${
                  historyIndex >= history.length - 1
                    ? 'text-slate-300 cursor-not-allowed' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
                title="Redo (Ctrl+Shift+Z)"
              >
                <FiRotateCw className="w-4 h-4" />
              </button>
            </div>

            {/* View Mode */}
            <div className="flex items-center space-x-1 bg-slate-100 rounded-lg p-1">
              {[
                { key: 'desktop', icon: FiMonitor, label: 'Desktop' },
                { key: 'tablet', icon: FiTablet, label: 'Tablet' },
                { key: 'mobile', icon: FiSmartphone, label: 'Mobile' }
              ].map((mode) => (
                <button
                  key={mode.key}
                  onClick={() => setViewMode(mode.key)}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === mode.key 
                      ? 'bg-white shadow-sm text-purple-600' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title={mode.label}
                >
                  <mode.icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            {/* Zoom */}
            <div className="flex items-center space-x-2 text-sm bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setZoom(Math.max(25, zoom - 25))}
                className="p-2 hover:bg-white rounded-md transition-colors"
              >
                <FiZoomOut className="w-4 h-4" />
              </button>
              <span className="min-w-[60px] text-center text-slate-600 font-medium px-2">
                {zoom}%
              </span>
              <button
                onClick={() => setZoom(Math.min(200, zoom + 25))}
                className="p-2 hover:bg-white rounded-md transition-colors"
              >
                <FiZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSave}
              className="px-6 py-2 text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 rounded-lg transition-colors flex items-center space-x-2"
            >
              <FiSave className="w-4 h-4" />
              <span>Salvează</span>
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-slate-100 overflow-auto flex items-center justify-center p-8">
          <div 
            className="bg-white shadow-lg border border-slate-200 relative"
            style={{
              width: viewport.width * (zoom / 100),
              height: viewport.height * (zoom / 100),
              backgroundColor: canvasBackground
            }}
            ref={canvasRef}
          >
            {/* Elements */}
            <AnimatePresence>
              {elements
                .filter(element => element.visible !== false)
                .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
                .map((element) => (
                <motion.div
                  key={element.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  drag={!element.locked}
                  dragMomentum={false}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={(e, info) => {
                    setIsDragging(false);
                    if (!element.locked) {
                      let newX = element.x + info.offset.x;
                      let newY = element.y + info.offset.y;
                      
                      if (snapToGrid) {
                        newX = Math.round(newX / 20) * 20;
                        newY = Math.round(newY / 20) * 20;
                      }
                      
                      handleDrag(element.id, newX, newY);
                    }
                  }}
                  onClick={() => setSelectedElement(element.id)}
                  className={`absolute ${
                    selectedElement === element.id 
                      ? 'ring-2 ring-purple-500 ring-offset-2' 
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
                >
                  {element.type === 'text' && (
                    <div 
                      contentEditable={!isDragging && !element.locked}
                      suppressContentEditableWarning
                      onBlur={(e) => updateElement(element.id, { content: e.target.textContent })}
                      className="w-full h-full outline-none"
                      style={element.style}
                    >
                      {element.content}
                    </div>
                  )}
                  
                  {element.type === 'heading' && (
                    <h1 
                      contentEditable={!isDragging && !element.locked}
                      suppressContentEditableWarning
                      onBlur={(e) => updateElement(element.id, { content: e.target.textContent })}
                      className="w-full h-full outline-none"
                      style={element.style}
                    >
                      {element.content}
                    </h1>
                  )}
                  
                  {element.type === 'button' && (
                    <button 
                      className="w-full h-full font-medium transition-all duration-200 hover:opacity-90"
                      style={element.style}
                      disabled={isDragging || element.locked}
                    >
                      {element.content}
                    </button>
                  )}
                  
                  {element.type === 'container' && (
                    <div 
                      className="w-full h-full flex items-center justify-center text-slate-500 text-sm"
                      style={element.style}
                    >
                      Container
                    </div>
                  )}
                  
                  {element.type === 'image' && (
                    <div 
                      className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-500"
                      style={element.style}
                    >
                      <FiImage className="w-8 h-8" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Grid */}
            {isGridVisible && (
              <div 
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                    linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Right Properties Panel */}
      {selectedElement && (
        <div className="w-64 bg-white border-l border-slate-200 p-4">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Proprietăți</h3>
          
          {(() => {
            const element = elements.find(el => el.id === selectedElement);
            if (!element) return null;
            
            return (
              <div className="space-y-4">
                {/* Position & Size */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Poziție & Dimensiuni
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">X</label>
                      <input
                        type="number"
                        value={element.x}
                        onChange={(e) => updateElement(element.id, { x: parseInt(e.target.value) })}
                        className="w-full px-2 py-1 text-sm border border-slate-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">Y</label>
                      <input
                        type="number"
                        value={element.y}
                        onChange={(e) => updateElement(element.id, { y: parseInt(e.target.value) })}
                        className="w-full px-2 py-1 text-sm border border-slate-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">W</label>
                      <input
                        type="number"
                        value={element.width}
                        onChange={(e) => updateElement(element.id, { width: parseInt(e.target.value) })}
                        className="w-full px-2 py-1 text-sm border border-slate-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">H</label>
                      <input
                        type="number"
                        value={element.height}
                        onChange={(e) => updateElement(element.id, { height: parseInt(e.target.value) })}
                        className="w-full px-2 py-1 text-sm border border-slate-300 rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                {(element.type === 'text' || element.type === 'button' || element.type === 'heading') && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Conținut
                    </label>
                    <input
                      type="text"
                      value={element.content}
                      onChange={(e) => updateElement(element.id, { content: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                    />
                  </div>
                )}

                {/* Style Controls */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Culoare fundal
                  </label>
                  <input
                    type="color"
                    value={element.style?.backgroundColor || '#ffffff'}
                    onChange={(e) => updateElement(element.id, { 
                      style: { ...element.style, backgroundColor: e.target.value }
                    })}
                    className="w-full h-10 border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Culoare text
                  </label>
                  <input
                    type="color"
                    value={element.style?.color || '#000000'}
                    onChange={(e) => updateElement(element.id, { 
                      style: { ...element.style, color: e.target.value }
                    })}
                    className="w-full h-10 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default CanvasEditor;
