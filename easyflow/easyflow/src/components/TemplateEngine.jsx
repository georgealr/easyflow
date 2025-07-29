import React, { useState } from 'react';

const TemplateEngine = () => {
  const [query, setQuery] = useState('');
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateTemplate = async () => {
    setLoading(true);
    try {
      // Mock API call (simulează generarea AI)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulare delay
      const mockResponse = {
        components: [
          { id: '1', type: 'hero', content: `Welcome to ${query || 'Your Site'}` },
          { id: '2', type: 'text', content: 'This is a dynamically generated section.' },
          { id: '3', type: 'image', content: 'Placeholder image' },
        ],
      };
      setTemplates(mockResponse.components);
    } catch (error) {
      console.error('Error generating template:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-4">AI Template Generator</h2>
      <div className="flex gap-4 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your site (e.g., 'modern restaurant website')"
          className="w-full p-2 border rounded-lg"
        />
        <button
          onClick={generateTemplate}
          disabled={loading}
          className={`px-4 py-2 rounded-lg ${loading ? 'bg-gray-400' : 'bg-purple-600 text-white'} hover:bg-purple-700`}
        >
          {loading ? 'Generating...' : 'Generate Template'}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="font-semibold">{template.type.charAt(0).toUpperCase() + template.type.slice(1)}</h3>
            <p>{template.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateEngine;
