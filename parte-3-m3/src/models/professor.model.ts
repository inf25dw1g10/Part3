import {Entity, model, property, hasMany} from '@loopback/repository';
import {Horario} from './horario.model';

@model({
  settings: {
    strict: true,
    mysql: {table: 'Professores'}
  }
})
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

  @hasMany(() => Horario, {keyTo: 'id_professor'})
  horarios: Horario[];

  constructor(data?: Partial<Professor>) {
    super(data);
  }
}

export interface ProfessorRelations {
  // describe navigational properties here
}

export type ProfessorWithRelations = Professor & ProfessorRelations;
