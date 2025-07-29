import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import TemplateEngine from '../components/TemplateEngine';

// Template-uri predefinite
const TEMPLATE_DEFINITIONS = {
  1: { // Modern Agency
    id: 'modern-agency',
    name: 'Modern Agency',
    sections: [
      {
        id: 'hero',
        type: 'hero',
        props: {
          title: 'We Create Amazing Digital Experiences',
          subtitle: 'Professional web solutions that drive results for your business',
          buttonText: 'Get Started',
          backgroundImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=1080&fit=crop',
          backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          textColor: '#ffffff'
        }
      },
      {
        id: 'services',
        type: 'services',
        props: {
          title: 'Our Services',
          subtitle: 'What we offer to help your business grow',
          backgroundColor: '#ffffff',
          services: [
            {
              icon: '🎨',
              title: 'Web Design',
              description: 'Beautiful, responsive designs that convert visitors into customers'
            },
            {
              icon: '💻',
              title: 'Development',
              description: 'Custom web applications built with modern technologies'
            },
            {
              icon: '📱',
              title: 'Mobile Apps',
              description: 'Native and cross-platform mobile applications'
            }
          ]
        }
      },
      {
        id: 'about',
        type: 'about',
        props: {
          title: 'About Our Agency',
          description: 'We are a team of passionate designers and developers creating exceptional digital experiences for businesses worldwide.',
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop',
          backgroundColor: '#f8fafc',
          stats: [
            { number: '100+', label: 'Projects Completed' },
            { number: '50+', label: 'Happy Clients' },
            { number: '5+', label: 'Years Experience' }
          ]
        }
      }
    ]
  },
  2: { // Creative Portfolio
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    sections: [
      {
        id: 'hero',
        type: 'hero',
        props: {
          title: 'Creative Designer & Developer',
          subtitle: 'Crafting beautiful digital experiences with passion and precision',
          buttonText: 'View My Work',
          backgroundImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1920&h=1080&fit=crop',
          backgroundColor: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
          textColor: '#ffffff'
        }
      }
    ]
  },
  // Adaugă mai multe template-uri aici...
};

// Template gol pentru editare de la zero
const BLANK_TEMPLATE = {
  id: 'blank-template',
  name: 'New Project',
  sections: []
};

export default function Editor() {
  const location = useLocation();
  const [currentTemplate, setCurrentTemplate] = useState(BLANK_TEMPLATE);

  useEffect(() => {
    // Verifică dacă avem un template selectat din Templates
    if (location.state?.template) {
      const selectedTemplate = location.state.template;
      const templateDefinition = TEMPLATE_DEFINITIONS[selectedTemplate.id];
      
      if (templateDefinition) {
        setCurrentTemplate(templateDefinition);
      } else {
        // Dacă nu găsim definiția, creează un template simplu
        setCurrentTemplate({
          id: `template-${selectedTemplate.id}`,
          name: selectedTemplate.name,
          sections: [
            {
              id: 'hero',
              type: 'hero',
              props: {
                title: `Welcome to ${selectedTemplate.name}`,
                subtitle: 'This is a sample template. Double-click to edit any text.',
                buttonText: 'Get Started',
                backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                textColor: '#ffffff'
              }
            }
          ]
        });
      }
    }
  }, [location.state]);

  const handleSaveTemplate = (template) => {
    console.log('Saving template:', template);
    // Aici ai putea salva template-ul într-o bază de date
    // sau în localStorage pentru moment
    localStorage.setItem(`template-${template.id}`, JSON.stringify(template));
    
    // Poți adăuga și o notificare de succes
    alert('Template saved successfully!');
  };

  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <TemplateEngine
        templateData={currentTemplate}
        onSave={handleSaveTemplate}
      />
    </div>
  );
}