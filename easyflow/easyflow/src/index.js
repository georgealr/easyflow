import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './components/Home';
import Editor from './components/Editor';
import TemplateEngine from './components/TemplateEngine';
import ScaledCanvasEditor from './components/ScaledCanvasEditor';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/templates" element={<TemplateEngine />} />
      <Route path="/canvas" element={<ScaledCanvasEditor />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
