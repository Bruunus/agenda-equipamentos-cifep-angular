/**
 * Os dados que são mapeados desta interface são representação dos dados que vem da requisição da camada de serviço
 * da classe ServiceApiReadEquipament do método de requisição etListEquipamentsPoll(): Observable<EstoquePollInterface[]>
 */
export interface EstoquePollInterface {
  valor: string;
  quantidade: number;
}
