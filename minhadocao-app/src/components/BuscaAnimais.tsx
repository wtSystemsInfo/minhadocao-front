import React, { useState } from 'react';
import axios from 'axios';
import { Animal } from '../types/Animal'; 
import { Link } from 'react-router-dom';

const BuscaAnimais: React.FC = () => {
    const [tipoAnimal, setTipoAnimal] = useState<string>('cachorro');
    const [tipoBusca, setTipoBusca] = useState<string>('geral');
    const [valorBusca, setValorBusca] = useState<string>('');
    const [animais, setAnimais] = useState<Animal[]>([]);
    const [dataValida, setDataValida] = useState<boolean>(true);

  const handleBuscar = async () => {

    if (tipoBusca === 'dataAniversario' && !dataValida) {
      alert('Data de aniversário inválida.');
      return;
    } 

    try {
      let url = '';
      const params: { [key: string]: any } = {};

      switch (tipoBusca) {
        case 'geral':
            url = tipoAnimal === 'cachorro'
                ? 'http://localhost:8080/adocao/cachorros'
                : 'http://localhost:8080/adocao/gatos';
            break;
        case 'id':
          url = tipoAnimal === 'cachorro'
              ? `http://localhost:8080/adocao/cachorros/${valorBusca}`
              : `http://localhost:8080/adocao/gatos/${valorBusca}`;
          break;
        case 'raca':
            url = tipoAnimal === 'cachorro'
                ? `http://localhost:8080/adocao/cachorros/raca/${valorBusca}`
                : `http://localhost:8080/adocao/gatos/raca/${valorBusca}`;
            break;
        case 'descricao':
            url = tipoAnimal === 'cachorro'
                ? `http://localhost:8080/adocao/cachorros/descricao/${valorBusca}`
                : `http://localhost:8080/adocao/gatos/descricao/${valorBusca}`;
            break;
        case 'dataAniversario':
            url = tipoAnimal === 'cachorro'
                ? `http://localhost:8080/adocao/cachorros/data-nascimento/${valorBusca}`
                : `http://localhost:8080/adocao/gatos/data-nascimento/${valorBusca}`;
            break;
        default:
            throw new Error('Tipo de busca não reconhecido.');
      }

      //const response = await axios.get<Animal[]>(url, { params });
      const response = tipoBusca === 'id'
                ? await axios.get<Animal>(url)  
                : await axios.get<Animal[]>(url, { params });
      
      if (Array.isArray(response.data)) {
        setAnimais(response.data);
      } else {
          setAnimais([response.data]);
      }

      } catch (error) {
          console.error('Erro ao buscar animais:', error);
      }

      
  };


  const handleStatusChange = async (animalId: number, currentStatus: string) => {
    try {
        const newStatus = currentStatus === 'DISPONIVEL' ? 'ADOTADO' : 'DISPONIVEL';
        await axios.put(`http://localhost:8080/adocao/cachorros/${animalId}/status`, null, {
            params: {
                status: newStatus
            }
        });

        // Atualiza a lista de animais após a alteração
        handleBuscar();
    } catch (error) {
        console.error('Erro ao atualizar status do animal:', error);
    }
  };

  const handleValorBuscaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (tipoBusca === 'id' && !/^\d*$/.test(value)) {
        return;
    }

    setValorBusca(value);
  };

  const handleTipoBuscaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setTipoBusca(value);

    if (value === 'dataAniversario') {
        const data = valorBusca;
        const date = new Date(data);
        setDataValida(date instanceof Date && !isNaN(date.getTime()));
    } else {
        setDataValida(true);
    }
  };


    return (
        <div >
          <div style={titleContainerStyle}>
            <h1>Busca de Animais</h1>
          </div> 
          

            <div style={comboContainerStyle}>

              <div>
                <label>
                  Busca:
                  <input
                    type="text"
                    value={valorBusca}
                    onChange={e => setValorBusca(e.target.value)}
                    disabled={tipoBusca === 'geral'} 
                    style={{ width: '500px', margin: '20px' }}                   
                  />
                </label>
              </div>             

            </div>

            <div style={comboContainerStyle}>

              <div>
                  <label>
                    Tipo de Animal:
                    <select value={tipoAnimal} onChange={e => setTipoAnimal(e.target.value)}>
                      <option value="cachorro">Cachorro</option>
                      <option value="gato">Gato</option>
                    </select>
                  </label>
                </div>
                
                <div>
                  <label>
                    Tipo de Busca:
                    <select value={tipoBusca} onChange={e => setTipoBusca(e.target.value)}>
                      <option value="geral">Geral</option>
                      <option value="raca">Raça</option>
                      <option value="descricao">Descrição</option>
                      <option value="id">ID</option>
                      <option value="dataAniversario">Data de Aniversário</option>
                    </select>
                  </label>
                </div>
              </div>
          

          <div style={buttonContainerStyle}>
            <button onClick={handleBuscar}
                    style={buttonStyle}>BUSCAR</button>            
            <div>
                  <Link to = "/">
                      <button style={buttonStyle}>VOLTAR</button>
                  </Link>
            </div>
          </div>
    
          <div>
          {animais.length > 0 ? (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {animais.map(animal => (
                            <li key={animal.id} style={{ borderBottom: '5px solid #ddd', padding: '15px 0', display: 'flex', alignItems: 'center'}}>
                                <img 
                                    src={animal.urlImagem} 
                                    alt={animal.nome} 
                                    style={{ width: '150px', height: '150px', objectFit: 'cover', marginRight: '10px' }}
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                        (e.target as HTMLImageElement).src = 'path/to/fallback-image.jpg';
                                    }}
                                />
                                <div>
                                    <strong>Nome:</strong> {animal.nome} <br />
                                    <strong>Descrição:</strong> {animal.descricao} <br />
                                    <strong>Categoria:</strong> {animal.categoria} <br />
                                    <strong>Data de Nascimento:</strong> {animal.dataNascimento} <br />
                                    <strong>Idade:</strong> {animal.idade} <br />
                                    <strong>Status:</strong> {animal.status} <br />
                                    <strong>Adotado:</strong> 
                                    <input
                                        type="checkbox"
                                        checked={animal.status === 'ADOTADO'}
                                        onChange={() => handleStatusChange(animal.id, animal.status)}
                                    />
                                    <Link to={`/editar-cachorro/${animal.id}`}>
                                        <button style={buttonStyle}>Editar</button>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum animal encontrado.</p>
                )} 
          </div>
        </div>
      );
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',  
    fontSize: '16px',      
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007BFF', 
    color: 'white',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    margin: '4px',
    cursor: 'pointer',
    width: '150px'
  };


  const titleContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '15px', 
    textAlign: 'center',
    color: '#007BFF',
    justifyContent: 'center',
    margin: '20px'
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '30px', 
    justifyContent: 'center',
    margin: '20px',
  };

  const comboContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '10px', 
    justifyContent: 'center',
    margin: '10px'
  };

export default BuscaAnimais;