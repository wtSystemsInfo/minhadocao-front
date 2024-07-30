import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastroCachorro from './components/CadastroCachorro';
import CadastroGato from './components/CadastroGato';
import { render, screen } from '@testing-library/react';
import Home from './components/Home';
import BuscaAnimais from './components/BuscaAnimais';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrar-cachorro" element={<CadastroCachorro />} />
        <Route path="/cadastrar-gato" element={<CadastroGato />} />
        <Route path="/listagem-animais" element={<BuscaAnimais />} />
        <Route path="/editar-cachorro/:id" element={<CadastroCachorro />} />
        <Route path="/editar-gato/:id" element={<CadastroGato />} />
      </Routes>
    </Router>
  );
};

export default App;