import React, { useEffect, useState } from 'react';
import { deleteCachorroById, updateCachorro, saveCachorro,  } from '../services/apiServiceCachorro';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { CachorroResponseDTO } from '../types/CachorroResponseDTO'; 
import axios from 'axios';


const CadastroCachorro: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cachorroData, setCachorroData] = useState<CachorroResponseDTO>({
    id: '',
    nome: '',
    categoria: 'CACHORRO',
    idade: '0',
    dataNascimento: '',
    status: 'DISPONIVEL',
    descricao: '',
    urlImagem: '',
    adotante: '',
    docAdotante: '',
    emailAdotante: '',
    raca: 'OUTRA',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    console.log('ID da URL:', id); 
  
    if (id) {
      const fetchCachorro = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get<CachorroResponseDTO>(`http://localhost:8080/adocao/cachorros/${id}`);
          console.log('Dados recebidos:', response.data); 
          setCachorroData(response.data);
        } catch (error) {
          console.error('Erro ao buscar dados do cachorro:', error);
          setError('Erro ao buscar dados do cachorro.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchCachorro();
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

    setCachorroData(prevData => ({
      ...prevData,
      idade: calculateAge(prevData.dataNascimento),
    }));
  }, [cachorroData.dataNascimento]);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCachorroData(prevData => ({
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
        if (cachorroData.id) {
            await updateCachorro(Number(cachorroData.id), cachorroData);
            setSuccess('Cachorro atualizado com sucesso!');
        } else {
            const response: CachorroResponseDTO = await saveCachorro(cachorroData);
            setCachorroData(prevData => ({
                ...prevData,
                id: response.id,
            }));
            setSuccess('Cachorro cadastrado com sucesso!');
        }
    } catch (error) {
        console.error('Erro ao salvar cachorro:', error);
        setError('Erro ao salvar cachorro.');
    } finally {
        setLoading(false);
    }
    
  };

  const handleNewCadastro = () => {
    setCachorroData({
      id: '',
      nome: '',
      categoria: 'CACHORRO',
      idade: '0',
      dataNascimento: '',
      status: 'DISPONIVEL',
      descricao: '',
      urlImagem: '',
      adotante: '',
      docAdotante: '',
      emailAdotante: '',
      raca: 'OUTRA',
    });
    setSuccess(null); 
    setError(null); 
  };

  const handleDelete = async () => {
    if (!cachorroData.id) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await deleteCachorroById(Number(cachorroData.id));
      setCachorroData({
        id: '',
        nome: '',
        categoria: 'CACHORRO',
        idade: '0',
        dataNascimento: '',
        status: 'DISPONIVEL',
        descricao: '',
        urlImagem: '',
        adotante: '',
        docAdotante: '',
        emailAdotante: '',
        raca: 'OUTRA',
      });
      setSuccess('Cachorro deletado com sucesso!');
    } catch (error) {
      setError('Erro ao deletar cachorro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={titleContainerStyle}> 
        <h1>Cadastro de Cachorros</h1>
      </div>
      <form onSubmit={handleSubmit}>
        
      <div>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={cachorroData.id}
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
            value={cachorroData.nome}
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
            value={cachorroData.categoria}
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
            value={cachorroData.raca}
            onChange={handleChange}
            required
          >
            <option value="LABRADOR">LABRADOR</option>
            <option value="PUG">PUG</option>
            <option value="BULLDOG">BULLDOG</option>
            <option value="GOLDEN_RETRIEVER">GOLDEN_RETRIEVER</option>
            <option value="VIRA_LATA">VIRA_LATA</option>
            <option value="DALMATA">DALMATA</option>
            <option value="BULL_TERRIER">BULL_TERRIER</option>
            <option value="BULDOG_FRANCES">BULDOG_FRANCES</option>
            <option value="OUTRA">OUTRA</option>
          </select>
        </div>
        <div>
          <label htmlFor="idade">Idade:</label>
          <input
            type="number"
            id="idade"
            name="idade"
            value={cachorroData.idade}
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
            value={cachorroData.dataNascimento}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={cachorroData.status}
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
            value={cachorroData.descricao}
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
            value={cachorroData.urlImagem}
            onChange={handleChange}
            required
          />
        </div>

        {cachorroData.urlImagem && (
          <div style={imageContainerStyle}>
            <img 
              src={cachorroData.urlImagem} 
              alt="Imagem do Cachorro" 
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
            value={cachorroData.adotante}
            onChange={handleChange}
            required={cachorroData.status === 'ADOTADO'}
          />
        </div>
        <div>
          <label htmlFor="docAdotante">Documento do Adotante:</label>
          <input
            type="text"
            id="docAdotante"
            name="docAdotante"
            value={cachorroData.docAdotante}
            onChange={handleChange}
            required={cachorroData.status === 'ADOTADO'}
          />
        </div>
        <div>
          <label htmlFor="emailAdotante">E-mail do Adotante:</label>
          <input
            type="email"
            id="emailAdotante"
            name="emailAdotante"
            value={cachorroData.emailAdotante}
            onChange={handleChange}
            required={cachorroData.status === 'ADOTADO'}
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
              {loading ? 'Deletando...' : 'Deletar Cachorro'}
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

export default CadastroCachorro;
