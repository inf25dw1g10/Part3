import {Entity, model, property} from '@loopback/repository';

@model()
export class Professor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_professor?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;


  constructor(data?: Partial<Professor>) {
    super(data);
  }
}

export interface ProfessorRelations {
  // describe navigational properties here
}

export type ProfessorWithRelations = Professor & ProfessorRelations;
