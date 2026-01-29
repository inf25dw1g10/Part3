import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Professor} from './professor.model';
import {Sala} from './sala.model';
import {Aula} from './aula.model';

@model({
  settings: {
    strict: true,
    mysql: {table: 'Horarios'}
  }
})
export class Horario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_horario?: number;

  @property({
    type: 'string',
    required: true,
  })
  dia_semana: string;

  @property({
    type: 'string',
    required: true,
  })
  hora_inicio: string;

  @property({
    type: 'string',
    required: true,
  })
  hora_fim: string;
  @belongsTo(() => Professor, {name: 'professor'})
  id_professor: number;

  @belongsTo(() => Sala, {name: 'sala'})
  id_sala: number;

  @belongsTo(() => Aula, {name: 'aula'})
  id_aula: number;

  constructor(data?: Partial<Horario>) {
    super(data);
  }
}

export interface HorarioRelations {
  // describe navigational properties here
}

export type HorarioWithRelations = Horario & HorarioRelations;
