import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: true,
    mysql: {table: 'Aulas'}
  }
})
export class Aula extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_aula: number;

  @property({
    type: 'string',
    required: true,
  })
  disciplina: string;

  @property({
    type: 'number',
    required: true,
  })
  id_professor: number;


  constructor(data?: Partial<Aula>) {
    super(data);
  }
}

export interface AulaRelations {
  // describe navigational properties here
}

export type AulaWithRelations = Aula & AulaRelations;
