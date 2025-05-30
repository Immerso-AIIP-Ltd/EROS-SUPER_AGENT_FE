// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GensParkApp from './GensParkApp';
import GensparkDashboard from './GensParkDashboard';
import ImageGenerationDashboard from './ImageGenerationDashboard';
import VideoGenerations from './VideoGeneration';
import HealthAgent from './HealthAgent';
import EternalAgent from './EternalAgent';
import GensparkSuperAgent from './GensparkSuperAgent';
import '@fontsource/poppins';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GensParkApp />} />
        <Route path="/agent" element={<GensparkDashboard />} />
        <Route path="/image-studio" element={<ImageGenerationDashboard />}/>
        <Route path='/video' element={<VideoGenerations />}/>
        <Route path='/eternal' element={<EternalAgent />}/>
        <Route path='/health' element={<HealthAgent />}/>
        <Route path='/home' element={<GensparkSuperAgent />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App; 
