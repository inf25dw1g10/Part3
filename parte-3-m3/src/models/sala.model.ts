import {Entity, model, property, hasMany} from '@loopback/repository';
import {Horario} from './horario.model';

@model({
  settings: {
    strict: true,
    mysql: {table: 'Salas'}
  }
})
export class Sala extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_sala?: number;

  @property({
    type: 'string',
    required: true,
  })
  nome: string;

  @property({
    type: 'number',
    required: true,
  })
  capacidade: number;

  @hasMany(() => Horario, {keyTo: 'id_sala'})
  horarios: Horario[];

  constructor(data?: Partial<Sala>) {
    super(data);
  }
}

export interface SalaRelations {
  // describe navigational properties here
}

export type SalaWithRelations = Sala & SalaRelations;
