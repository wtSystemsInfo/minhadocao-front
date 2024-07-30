import React, { useEffect, useState } from 'react';
import { deleteGatoById, updateGato, saveGato,  } from '../services/apiServiceGato';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { GatoResponseDTO } from '../types/GatoResponseDTO'; 
import axios from 'axios';


const CadastroGato: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [gatoData, setGatoData] = useState<GatoResponseDTO>({
    id: '',
    nome: '',
    categoria: 'GATO',
    idade: '0',
    dataNascimento: '',
    status: 'DISPONIVEL',
    descricao: '',
    urlImagem: '',
    adotante: '',
    docAdotante: '',
    emailAdotante: '',
    raca: 'PERSA',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    console.log('ID da URL:', id); 
  
    if (id) {
      const fetchGato = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get<GatoResponseDTO>(`http://localhost:8080/adocao/gatos/${id}`);
          console.log('Dados recebidos:', response.data); 
          setGatoData(response.data);
        } catch (error) {
          console.error('Erro ao buscar dados do gato:', error);
          setError('Erro ao buscar dados do gato.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchGato();
    }
  }, [id]);

  useEffect(() => {
    const calculateAge = (birthDate: string) => {
      if (!birthDate) return '0';

      const today = new Date();
      const birthDateObj = new Date(birthDate);
      let age = today.getFullYear() - birthDateObj.getFullYear();
      const monthDifference = today.getMonth() - birthDateObj.getMonth();

      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
      }

      return age.toString();
    };

    setGatoData(prevData => ({
      ...prevData,
      idade: calculateAge(prevData.dataNascimento),
    }));
  }, [gatoData.dataNascimento]);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGatoData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
  
      try {
        if (gatoData.id) {
            await updateGato(Number(gatoData.id), gatoData);
            setSuccess('Gato atualizado com sucesso!');
        } else {
            const response: GatoResponseDTO = await saveGato(gatoData);
            setGatoData(prevData => ({
                ...prevData,
                id: response.id,
            }));
            setSuccess('Gato cadastrado com sucesso!');
        }
    } catch (error) {
        console.error('Erro ao salvar gato:', error);
        setError('Erro ao salvar gato.');
    } finally {
        setLoading(false);
    }
    
  };

  const handleNewCadastro = () => {
    setGatoData({
      id: '',
      nome: '',
      categoria: 'GATO',
      idade: '0',
      dataNascimento: '',
      status: 'DISPONIVEL',
      descricao: '',
      urlImagem: '',
      adotante: '',
      docAdotante: '',
      emailAdotante: '',
      raca: 'PERSA',
    });
    setSuccess(null); 
    setError(null); 
  };

  const handleDelete = async () => {
    if (!gatoData.id) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await deleteGatoById(Number(gatoData.id));
      setGatoData({
        id: '',
        nome: '',
        categoria: 'GATO',
        idade: '0',
        dataNascimento: '',
        status: 'DISPONIVEL',
        descricao: '',
        urlImagem: '',
        adotante: '',
        docAdotante: '',
        emailAdotante: '',
        raca: 'PERSA',
      });
      setSuccess('Gato deletado com sucesso!');
    } catch (error) {
      setError('Erro ao deletar gato.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={titleContainerStyle}> 
        <h1>Cadastro de Gatos</h1>
      </div>
      <form onSubmit={handleSubmit}>
        
      <div>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={gatoData.id}
          onChange={handleChange}
          readOnly 
          style={{ backgroundColor: '#f0f0f0' }}
        />
      </div>
        
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={gatoData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="categoria">Categoria:</label>
          <input
            type="text"
            id="categoria"
            name="categoria"
            value={gatoData.categoria}
            onChange={handleChange}
            readOnly 
            style={{ backgroundColor: '#f0f0f0' }}
          />
        </div>
        <div>
          <label htmlFor="raca">Raça:</label>
          <select
            id="raca"
            name="raca"
            value={gatoData.raca}
            onChange={handleChange}
            required
          >
            <option value="PERSA">PERSA</option>
            <option value="SIAMES">SIAMES</option>S
            <option value="BENGAL">BENGAL</option>
            <option value="MAINE_COON">MAINE_COON</option>
            <option value="SEM_RAÇA_DEFINIDA">SEM_RAÇA_DEFINIDA</option>
          </select>
        </div>
        <div>
          <label htmlFor="idade">Idade:</label>
          <input
            type="number"
            id="idade"
            name="idade"
            value={gatoData.idade}
            onChange={handleChange}
            readOnly 
            style={{ backgroundColor: '#f0f0f0' }}
          />
        </div>
        <div>
          <label htmlFor="dataNascimento">Data de Nascimento:</label>
          <input
            type="date"
            id="dataNascimento"
            name="dataNascimento"
            value={gatoData.dataNascimento}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={gatoData.status}
            onChange={handleChange}
            required
          >
            <option value="DISPONIVEL">DISPONIVEL</option>
            <option value="ADOTADO">ADOTADO</option>
          </select>
        </div>
        <div>
          <label htmlFor="descricao">Descrição:</label>
          <input
            id="descricao"
            name="descricao"
            value={gatoData.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="urlImagem">URL da Imagem:</label>
          <input
            type="text"
            id="urlImagem"
            name="urlImagem"
            value={gatoData.urlImagem}
            onChange={handleChange}
            required
          />
        </div>

        {gatoData.urlImagem && (
          <div style={imageContainerStyle}>
            <img 
              src={gatoData.urlImagem} 
              alt="Imagem do Gato" 
              style={imageStyle}
            />
          </div>
        )}

        <div>
          <label htmlFor="adotante">Adotante:</label>
          <input
            type="text"
            id="adotante"
            name="adotante"
            value={gatoData.adotante}
            onChange={handleChange}
            required={gatoData.status === 'ADOTADO'}
          />
        </div>
        <div>
          <label htmlFor="docAdotante">Documento do Adotante:</label>
          <input
            type="text"
            id="docAdotante"
            name="docAdotante"
            value={gatoData.docAdotante}
            onChange={handleChange}
            required={gatoData.status === 'ADOTADO'}
          />
        </div>
        <div>
          <label htmlFor="emailAdotante">E-mail do Adotante:</label>
          <input
            type="email"
            id="emailAdotante"
            name="emailAdotante"
            value={gatoData.emailAdotante}
            onChange={handleChange}
            required={gatoData.status === 'ADOTADO'}
          />
        </div>
        
       
        <div style={buttonContainerStyle}>
          <button 
              type="submit" 
              disabled={loading}
              style={buttonStyle}
            >
              {loading ? 'Salvando...' : 'Salvar Cadastro'}
            </button>

            <button 
              type="button" 
              onClick={handleDelete}
              disabled={loading}
              style={buttonStyle}
            >
              {loading ? 'Deletando...' : 'Deletar Gato'}
          </button>

            <button 
              type="button" 
              onClick={handleNewCadastro}
              style={buttonStyle}
            >
              Novo Cadastro
          </button>
          <Link to="/">
            <button style={buttonStyle}>Voltar</button>
          </Link>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: '#007BFF', 
  display: 'inline-block',
  border: 'none',
  color: 'white',
  padding: '10px 20px',
  textAlign: 'center',
  textDecoration: 'none',
  fontSize: '16px',
  margin: '20px',
  cursor: 'pointer',
  borderRadius: '4px',
  justifyContent: 'center',
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '15px', 
  textAlign: 'center',
  color: '#007BFF',
  justifyContent: 'center',
  margin: '20px'
};

const titleContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '15px', 
  textAlign: 'center',
  color: '#007BFF',
  justifyContent: 'center',
  margin: '20px'
};

const imageContainerStyle: React.CSSProperties = {
  justifyContent: 'flex-start',
  margin: '20px 0',
};

const imageStyle: React.CSSProperties = {
  maxWidth: '300px', 
  maxHeight: '200px', 
  objectFit: 'cover',
  border: '8px solid #007BFF',
  borderRadius: '8px',
}; 

export default CadastroGato;
