import axiosInstance from './axiosInstanceCachorro';
import { CachorroResponseDTO } from '../types/CachorroResponseDTO';
import { Animal } from '../types/Animal';

// Save
export const saveCachorro = async (cachorroData: CachorroResponseDTO) => {
    try {
        const response = await axiosInstance.post('/adocao/cachorros', cachorroData);
        return response.data as CachorroResponseDTO;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Erro desconhecido');
        }
    }
};



// Update
export const updateCachorro = async (id: number, cachorroData: CachorroResponseDTO) => {
    try {
        const response = await axiosInstance.put(`/adocao/cachorros/${id}`, cachorroData);
        return response.data as CachorroResponseDTO;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Erro desconhecido');
        }
    }
};


// Update Status
export const updateCachorroStatus = async (id: number, status: 'DISPONIVEL' | 'ADOTADO') => {
    try {
      const response = await axiosInstance.put(`/adocao/cachorros/${id}/status`, null, {
        params: {
          status: status
        }
      });
      return response.data as Animal;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('Erro desconhecido');
      }
    }
  };

// Find by ID
export const findCachorroById = async (id: string): Promise<CachorroResponseDTO> => {
    try {
        const response = await axiosInstance.get<CachorroResponseDTO>(`/adocao/cachorros/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao localizar cachorro pelo ID:', error);
        // É importante lançar o erro novamente para que o código chamador possa lidar com ele
        throw error;
    }
};

// List all
export const listAllCachorros = async (): Promise<CachorroResponseDTO[]> => {
    try {
        const response = await axiosInstance.get<CachorroResponseDTO[]>('/');
        return response.data;
    } catch (error) {
        console.error('Erro ao localizar todos os cachorros:', error);
        throw error;
    }
};

// Delete
export const deleteCachorroById = async (id: number) => {
    try {
        await axiosInstance.delete(`/adocao/cachorros/${id}`);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Erro desconhecido');
        }
    }
};

// Find by raça
export const findCachorrosByRaca = async (raca: string): Promise<CachorroResponseDTO[]> => {
    try {
        const response = await axiosInstance.get<CachorroResponseDTO[]>(`/adocao/cachorros/raca/${raca}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao localizar cachorro pela raça:', error);
        throw error;
    }
};

// Find by data de nascimento
export const findCachorrosByDataNascimento = async (data: string): Promise<CachorroResponseDTO[]> => {
    try {
        const response = await axiosInstance.get<CachorroResponseDTO[]>(`/data-nascimento/${data}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao localizar cachorro pela data de nascimento:', error);
        throw error;
    }
};

// Find by descrição
export const findCachorrosByDescricao = async (descricao: string): Promise<CachorroResponseDTO[]> => {
    try {
        const response = await axiosInstance.get<CachorroResponseDTO[]>(`/descricao/${descricao}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao localizar cachorro pela descrição:', error);
        throw error;
    }
};
