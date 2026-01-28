import {Entity, model, property} from '@loopback/repository';

@model()
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

  @property({
    type: 'number',
    required: true,
  })
  id_sala: number;

  @property({
    type: 'number',
    required: true,
  })
  id_aula: number;


  constructor(data?: Partial<Horario>) {
    super(data);
  }
}

export interface HorarioRelations {
  // describe navigational properties here
}

export type HorarioWithRelations = Horario & HorarioRelations;
