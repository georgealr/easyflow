import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Editor from './components/Editor';
import TemplateEngine from './components/TemplateEngine';
import ScaledCanvasEditor from './components/ScaledCanvasEditor';
import Home from './components/Home';
import Analytics from './components/Analytics'; // Adaugă această linie

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/templates" element={<TemplateEngine />} />
      <Route path="/canvas" element={<ScaledCanvasEditor />} />
      <Route path="/analytics" element={<Analytics />} /> {/* Adaugă această linie */}
    </Routes>
  </Router>,
  document.getElementById('root')
);
