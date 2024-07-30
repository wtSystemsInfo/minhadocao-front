export interface Animal {
  id: number;
  urlImagem: string;
  nome: string;
  descricao: string;
  categoria: string;
  dataNascimento: string;
  idade: number;
  status: 'DISPONIVEL' | 'ADOTADO';
}