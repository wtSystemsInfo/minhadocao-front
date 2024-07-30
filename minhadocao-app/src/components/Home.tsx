import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Bem-vindo ao Sistema de Adoção de Animais</h1>
      <p>Este é um sistema para cadastrar e gerenciar animais disponíveis para adoção.</p>
      <div style={buttonContainerStyle}>
        <div style={{ margin: '20px 0' }}>
          <Link to="/cadastrar-cachorro">
            <button style={buttonStyle}>Cadastro de Cachorros</button>
          </Link>
        </div>
        <div style={{ margin: '20px 0' }}>
          <Link to="/cadastrar-gato">
            <button style={buttonStyle}>Cadastro de Gatos</button>
          </Link>
        </div>
        <div style={{ margin: '20px 0' }}>
          <Link to="/listagem-animais">
            <button style={buttonStyle}>Pesquisar Animais</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#007BFF', 
  border: 'none',
  color: 'white',
  padding: '10px 20px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
  borderRadius: '4px',
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px', 
  justifyContent: 'center',
};


export default Home;