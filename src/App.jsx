import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CleanLandingPage from './components/CleanLandingPage';
import WixStyleTemplateLibrary from './components/WixStyleTemplateLibrary';
import AdvancedTemplateEngine from './components/AdvancedTemplateEngine';
import ScaledCanvasEditor from './components/ScaledCanvasEditor';
import ScaledTemplateMarketplace from './components/ScaledTemplateMarketplace';
import './App.css';

// EasyFlow App v2 - Template-uri românești inline pentru moment
const ROMANIAN_TEMPLATES = [
  {
    id: 'restaurant-bucuresti',
    name: 'Restaurant București',
    category: 'Restaurant',
    thumbnail: 'https://via.placeholder.com/800x600/8B4513/ffffff?text=Restaurant+București',
    preview: 'https://via.placeholder.com/1200x900/8B4513/ffffff?text=Restaurant+București',
    tags: ['Restaurant', 'București', 'Mâncare Românească', 'Rezervări'],
    description: 'Template elegant pentru restaurante din București cu meniu online și sistem de rezervări',
    isPremium: false,
    isPopular: true
  },
  {
    id: 'cabinet-medical',
    name: 'Cabinet Medical',
    category: 'Medical',
    thumbnail: 'https://via.placeholder.com/800x600/006bb3/ffffff?text=Cabinet+Medical',
    preview: 'https://via.placeholder.com/1200x900/006bb3/ffffff?text=Cabinet+Medical',
    tags: ['Medical', 'Sănătate', 'Doctori', 'Programări'],
    description: 'Template profesional pentru cabinete medicale cu sistem de programări online',
    isPremium: true,
    isPopular: true
  }
];

// Mock template data cu design 2025 + Template-uri românești
const DEFAULT_TEMPLATES = [
  ...ROMANIAN_TEMPLATES,
  {
    id: 'startup-romania',
    name: 'Startup România',
    category: 'Business',
    thumbnail: 'https://via.placeholder.com/800x600/451187/ffffff?text=Startup+România',
    preview: 'https://via.placeholder.com/1200x900/451187/ffffff?text=Startup+România',
    tags: ['Tech', 'Business', 'Modern', 'România'],
    description: 'Template modern pentru startup-uri și companii românești inovatoare',
    sections: [
      {
        id: 'hero-1',
        type: 'hero',
        props: {
          title: 'Viitorul Începe Acum',
          subtitle: 'Soluții revoluționare pentru provocările de mâine',
          backgroundImage: 'https://via.placeholder.com/1920x1080/451187/ffffff?text=Fundal+Viitor',
          buttonText: 'Descoperă Viitorul',
          style: 'modern'
        }
      }
    ],
    isPremium: true,
    isNew: true
  },
  {
    id: 'portofoliu-creativ',
    name: 'Portofoliu Creativ',
    category: 'Portfolio',
    thumbnail: 'https://via.placeholder.com/800x600/667eea/ffffff?text=Portofoliu+Creativ',
    preview: 'https://via.placeholder.com/1200x900/667eea/ffffff?text=Portofoliu+Creativ',
    tags: ['Creativ', 'Modern', 'Portofoliu', 'Artist'],
    description: 'Design modern cu efecte glassmorphism și elemente interactive',
    sections: [],
    isPremium: true,
    isHot: true
  },
  {
    id: 'agentie-digitala',
    name: 'Agenție Digitală',
    category: 'Agency',
    thumbnail: 'https://via.placeholder.com/800x600/1a1a2e/eee?text=Agenție+Digitală',
    preview: 'https://via.placeholder.com/1200x900/1a1a2e/eee?text=Agenție+Digitală',
    tags: ['Dark', 'Modern', 'Agenție', 'Digital'],
    description: 'Template pentru agenții digitale cu efecte neon și design modern',
    sections: [],
    isPremium: false,
    isNew: true
  },
  {
    id: 'minimalist-elegant',
    name: 'Minimalist Elegant',
    category: 'Luxury',
    thumbnail: 'https://via.placeholder.com/800x600/f5f5f5/333333?text=Minimalist+Elegant',
    preview: 'https://via.placeholder.com/1200x900/f5f5f5/333333?text=Minimalist+Elegant',
    tags: ['Minimal', 'Elegant', 'Curat', 'Premium'],
    description: 'Design ultra-curat minimalist cu animații de lux',
    sections: [],
    isPremium: true
  },
  {
    id: 'gaming-romania',
    name: 'Gaming România',
    category: 'Gaming',
    thumbnail: 'https://via.placeholder.com/800x600/592478/ffffff?text=Gaming+România',
    preview: 'https://via.placeholder.com/1200x900/592478/ffffff?text=Gaming+România',
    tags: ['Gaming', 'eSports', 'România', '3D'],
    description: 'Template pentru comunități gaming și eSports din România',
    sections: [],
    isPremium: true,
    isHot: true
  },
  {
    id: 'saas-romania',
    name: 'SaaS România',
    category: 'SaaS',
    thumbnail: 'https://via.placeholder.com/800x600/677442/ffffff?text=SaaS+România',
    preview: 'https://via.placeholder.com/1200x900/677442/ffffff?text=SaaS+România',
    tags: ['SaaS', 'Business', 'România', 'Modern'],
    description: 'Platform SaaS pentru companii românești cu vizualizări de date avansate',
    sections: [],
    isPremium: false
  }
];

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templates] = useState(DEFAULT_TEMPLATES);
  const [currentView, setCurrentView] = useState('landing'); // Back to landing for normal operation
  const [loading, setLoading] = useState(false); // Set to false for immediate testing

  // Debug log to check if App renders
  console.log('App rendering, currentView:', currentView);

  useEffect(() => {
    // Debug log
    console.log('App useEffect running');
    // Simulate app initialization - reduced time for testing
    setTimeout(() => {
      console.log('Setting loading to false');
      setLoading(false);
    }, 100);
  }, []);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCurrentView('editor');
  };

  const handleStartFromScratch = () => {
    setCurrentView('canvas');
  };

  const handleSaveTemplate = (updatedTemplate) => {
    console.log('Saving template:', updatedTemplate);
    // Here you would save to backend
  };

  const handleBackToLibrary = () => {
    setCurrentView('library');
    setSelectedTemplate(null);
  };

  const handleGoToMarketplace = () => {
    setCurrentView('marketplace');
  };

  const handleSelectFromMarketplace = (template) => {
    setSelectedTemplate(template);
    setCurrentView('canvas');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setSelectedTemplate(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-blue-400 border-b-transparent rounded-full animate-spin animate-reverse mx-auto"></div>
          </div>
          <div className="text-white text-xl font-bold mb-2">EasyFlow</div>
          <div className="text-purple-300">Loading the future...</div>
        </div>
      </div>
    );
  }

  // Simple test render first - useful for debugging
  if (currentView === 'test') {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">EasyFlow Test</h1>
          <p className="mb-4">Aplicația funcționează!</p>
          <button 
            onClick={() => setCurrentView('landing')}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Go to Landing Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <CleanLandingPage 
            key="landing"
            onStartBuilding={() => setCurrentView('library')}
            onStartFromScratch={handleStartFromScratch}
          />
        )}
        
        {currentView === 'library' && (
          <WixStyleTemplateLibrary 
            key="library"
            templates={templates}
            onSelectTemplate={handleTemplateSelect}
            onBack={handleBackToLanding}
          />
        )}
        
        {currentView === 'marketplace' && (
          <ScaledTemplateMarketplace
            key="marketplace"
            onBack={handleBackToLibrary}
            onSelectTemplate={handleSelectFromMarketplace}
          />
        )}
        
        {currentView === 'editor' && selectedTemplate && (
          <AdvancedTemplateEngine 
            key="editor"
            templateData={selectedTemplate}
            onSave={handleSaveTemplate}
            onBack={handleBackToLibrary}
          />
        )}
        
        {currentView === 'canvas' && (
          <ScaledCanvasEditor 
            key="canvas"
            onSave={handleSaveTemplate}
            onBack={handleBackToLanding}
          />
        )}
        
        {/* Fallback for debugging */}
        {!['landing', 'library', 'marketplace', 'editor', 'canvas'].includes(currentView) && (
          <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Debug: Unknown View</h1>
              <p>Current view: {currentView}</p>
              <button 
                onClick={() => setCurrentView('landing')}
                className="mt-4 px-6 py-3 bg-purple-500 text-white rounded-lg"
              >
                Go to Landing
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;