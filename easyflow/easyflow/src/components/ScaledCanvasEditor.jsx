import React, { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMove, FiSmartphone, FiTablet, FiMonitor, FiZoomIn, FiZoomOut } from 'react-icons/fi';

const ScaledCanvasEditor = () => {
  const [components, setComponents] = useState([
    { id: '1', type: 'hero', content: 'Hero Section' },
    { id: '2', type: 'text', content: 'Text Block' },
  ]);
  const [activeDevice, setActiveDevice] = useState('desktop');
  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef(null);

  const previewStyles = {
    desktop: { width: '1200px', transform: 'scale(1)' },
    tablet: { width: '768px', transform: 'scale(0.9) rotateY(5deg)' },
    mobile: { width: '375px', transform: 'scale(0.75) rotateY(5deg)' },
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedComponents = Array.from(components);
    const [moved] = reorderedComponents.splice(result.source.index, 1);
    reorderedComponents.splice(result.destination.index, 0, moved);
    setComponents(reorderedComponents);
  };

  const renderComponent = (component, index) => {
    switch (component.type) {
      case 'hero':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg mb-4"
          >
            <h2 className="text-2xl font-bold">{component.content}</h2>
          </motion.div>
        );
      case 'text':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 p-4 rounded-lg mb-4"
          >
            <p>{component.content}</p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveDevice('desktop')}
            className={`p-2 rounded-lg ${activeDevice === 'desktop' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            <FiMonitor size={24} />
          </button>
          <button
            onClick={() => setActiveDevice('tablet')}
            className={`p-2 rounded-lg ${activeDevice === 'tablet' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            <FiTablet size={24} />
          </button>
          <button
            onClick={() => setActiveDevice('mobile')}
            className={`p-2 rounded-lg ${activeDevice === 'mobile' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            <FiSmartphone size={24} />
          </button>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setZoom(zoom + 0.1)} className="p-2 bg-gray-200 rounded-lg">
            <FiZoomIn size={24} />
          </button>
          <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="p-2 bg-gray-200 rounded-lg">
            <FiZoomOut size={24} />
          </button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: zoom }}
        style={previewStyles[activeDevice]}
        className="bg-white rounded-xl shadow-2xl p-8 border border-gray-100 mx-auto relative"
        ref={canvasRef}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="canvas">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="min-h-[600px] bg-gray-50 rounded-lg p-4 grid grid-cols-12 gap-4"
                style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
              >
                <AnimatePresence>
                  {components.map((component, index) => (
                    <Draggable key={component.id} draggableId={component.id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="col-span-12 relative">
                          <div className="absolute top-2 right-2 p-1 bg-gray-100 rounded-full">
                            <FiMove className="w-4 h-4 text-gray-600" />
                          </div>
                          {renderComponent(component, index)}
                        </div>
                      )}
                    </Draggable>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </motion.div>
    </div>
  );
};

export default ScaledCanvasEditor;
