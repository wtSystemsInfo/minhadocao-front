import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastroCachorro from './components/CadastroCachorro';
import { render, screen } from '@testing-library/react';
import Home from './components/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrar-cachorro" element={<CadastroCachorro />} />
      </Routes>
    </Router>
  );
};

export default App;