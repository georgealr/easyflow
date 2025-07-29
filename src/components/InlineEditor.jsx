import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaBold, FaItalic, FaUnderline, FaAlignLeft, FaAlignCenter, FaAlignRight } from 'react-icons/fa';

export default function InlineEditor({ 
  element, 
  isEditing, 
  onSave, 
  onCancel,
  position,
  type = 'text' 
}) {
  const [value, setValue] = useState(element?.textContent || '');
  const [formatting, setFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    align: 'left'
  });
  
  const editorRef = useRef(null);

  useEffect(() => {
    if (isEditing && editorRef.current) {
      editorRef.current.focus();
      // Select all text
      const range = document.createRange();
      range.selectNodeContents(editorRef.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [isEditing]);

  const handleSave = () => {
    onSave({
      content: value,
      formatting
    });
  };

  const toggleFormat = (format) => {
    setFormatting(prev => ({
      ...prev,
      [format]: !prev[format]
    }));
    
    // Apply formatting to selection
    document.execCommand(format, false, null);
  };

  const setAlignment = (align) => {
    setFormatting(prev => ({ ...prev, align }));
    document.execCommand(`justify${align}`, false, null);
  };

  if (!isEditing) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 min-w-96"
      style={{
        top: position.y,
        left: position.x,
        transform: 'translate(-50%, -100%)'
      }}
    >
      {/* Formatting Toolbar */}
      <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
        <button
          onClick={() => toggleFormat('bold')}
          className={`p-2 rounded-md transition ${
            formatting.bold ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
          }`}
        >
          <FaBold />
        </button>
        <button
          onClick={() => toggleFormat('italic')}
          className={`p-2 rounded-md transition ${
            formatting.italic ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
          }`}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => toggleFormat('underline')}
          className={`p-2 rounded-md transition ${
            formatting.underline ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
          }`}
        >
          <FaUnderline />
        </button>
        
        <div className="w-px h-6 bg-gray-300 mx-2" />
        
        <button
          onClick={() => setAlignment('Left')}
          className={`p-2 rounded-md transition ${
            formatting.align === 'left' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
          }`}
        >
          <FaAlignLeft />
        </button>
        <button
          onClick={() => setAlignment('Center')}
          className={`p-2 rounded-md transition ${
            formatting.align === 'center' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
          }`}
        >
          <FaAlignCenter />
        </button>
        <button
          onClick={() => setAlignment('Right')}
          className={`p-2 rounded-md transition ${
            formatting.align === 'right' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
          }`}
        >
          <FaAlignRight />
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-20 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        style={{
          fontWeight: formatting.bold ? 'bold' : 'normal',
          fontStyle: formatting.italic ? 'italic' : 'normal',
          textDecoration: formatting.underline ? 'underline' : 'none',
          textAlign: formatting.align
        }}
        onInput={(e) => setValue(e.target.textContent)}
        dangerouslySetInnerHTML={{ __html: value }}
      />

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 mt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
        >
          <FaTimes className="inline mr-2" />
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <FaCheck className="inline mr-2" />
          Save
        </button>
      </div>
    </motion.div>
  );
}