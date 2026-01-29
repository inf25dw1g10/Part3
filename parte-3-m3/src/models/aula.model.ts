import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Professor} from './professor.model';
import {Horario} from './horario.model';

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

  @belongsTo(() => Professor, {name: 'professor'})
  id_professor: number;

  @hasMany(() => Horario, {keyTo: 'id_aula'})
  horarios: Horario[];

  constructor(data?: Partial<Aula>) {
    super(data);
  }
}

export interface AulaRelations {
  // describe navigational properties here
}

export type AulaWithRelations = Aula & AulaRelations;
