import axiosInstance from './axiosInstanceGato';
import { GatoResponseDTO } from '../types/GatoResponseDTO';
import { Animal } from '../types/Animal';

// Save
export const saveGato = async (gatoData: GatoResponseDTO) => {
    try {
        const response = await axiosInstance.post('/adocao/gatos', gatoData);
        return response.data as GatoResponseDTO;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Erro desconhecido');
        }
    }
};



// Update
export const updateGato = async (id: number, gatoData: GatoResponseDTO) => {
    try {
        const response = await axiosInstance.put(`/adocao/gatos/${id}`, gatoData);
        return response.data as GatoResponseDTO;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Erro desconhecido');
        }
    }
};


// Update Status
export const updateGatoStatus = async (id: number, status: 'DISPONIVEL' | 'ADOTADO') => {
    try {
      const response = await axiosInstance.put(`/adocao/gatos/${id}/status`, null, {
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
export const findGatoById = async (id: string): Promise<GatoResponseDTO> => {
    try {
        const response = await axiosInstance.get<GatoResponseDTO>(`/adocao/gatos/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao localizar gato pelo ID:', error);
        // É importante lançar o erro novamente para que o código chamador possa lidar com ele
        throw error;
    }
};

// List all
export const listAllGatos = async (): Promise<GatoResponseDTO[]> => {
    try {
        const response = await axiosInstance.get<GatoResponseDTO[]>('/');
        return response.data;
    } catch (error) {
        console.error('Erro ao localizar todos os gatos:', error);
        throw error;
    }
};

// Delete
export const deleteGatoById = async (id: number) => {
    try {
        await axiosInstance.delete(`/adocao/gatos/${id}`);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Erro desconhecido');
        }
    }
};

// Find by raça
export const findGatosByRaca = async (raca: string): Promise<GatoResponseDTO[]> => {
    try {
        const response = await axiosInstance.get<GatoResponseDTO[]>(`/adocao/gatos/raca/${raca}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao localizar gato pela raça:', error);
        throw error;
    }
};

// Find by data de nascimento
export const findGatosByDataNascimento = async (data: string): Promise<GatoResponseDTO[]> => {
    try {
        const response = await axiosInstance.get<GatoResponseDTO[]>(`/data-nascimento/${data}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao localizar gato pela data de nascimento:', error);
        throw error;
    }
};

// Find by descrição
export const findGatosByDescricao = async (descricao: string): Promise<GatoResponseDTO[]> => {
    try {
        const response = await axiosInstance.get<GatoResponseDTO[]>(`/descricao/${descricao}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao localizar gato pela descrição:', error);
        throw error;
    }
};
