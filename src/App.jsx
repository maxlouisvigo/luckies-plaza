import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EditorialHome } from './pages/EditorialHome';
import { PortfolioPage } from './pages/PortfolioPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EditorialHome />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
