import React, { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMove, FiSmartphone, FiTablet, FiMonitor, FiSave, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const Editor = () => {
  const [components, setComponents] = useState([
    { id: '1', type: 'hero', content: 'Welcome to EasyFlow' },
    { id: '2', type: 'text', content: 'Build stunning websites' },
  ]);
  const [activeDevice, setActiveDevice] = useState('desktop');
  const canvasRef = useRef(null);

  const canvasStyles = {
    desktop: 'w-[1200px] min-h-[600px]',
    tablet: 'w-[768px] min-h-[600px] scale-90',
    mobile: 'w-[375px] min-h-[600px] scale-75',
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
          <button className="p-2 bg-gray-200 rounded-lg">
            <FiArrowLeft size={24} />
          </button>
          <button className="p-2 bg-gray-200 rounded-lg">
            <FiArrowRight size={24} />
          </button>
          <button className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg">
            <FiSave size={24} />
          </button>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="w-64 bg-white/30 backdrop-blur-md rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">AI Suggestions</h3>
          {['Hero', 'Text', 'Image'].map((type, index) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg p-3 mb-3 cursor-pointer hover:bg-gray-100"
              onClick={() => setComponents([...components, { id: `${components.length + 1}`, type: type.toLowerCase(), content: `${type} Component` }])}
            >
              {type}
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`flex-1 bg-white rounded-xl shadow-lg p-8 border border-gray-100 mx-auto ${canvasStyles[activeDevice]}`}
          ref={canvasRef}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="canvas">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[600px]">
                  <AnimatePresence>
                    {components.map((component, index) => (
                      <Draggable key={component.id} draggableId={component.id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
    </div>
  );
};

export default Editor;
