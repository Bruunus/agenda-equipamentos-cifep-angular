/**
 * Os dados que são mapeados desta interface são representação dos dados que vem da requisição da camada de serviço
 * da classe ServiceApiReadEquipament do método de requisição getListEquipaments(): Promise<EstoqueInterface[]>
 */
export interface EstoqueInterface {
  id: number;
  descricao: string;
  valor: string;
  quantidade: number;
}
