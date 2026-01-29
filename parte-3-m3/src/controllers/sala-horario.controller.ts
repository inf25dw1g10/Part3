import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Sala,
  Horario,
} from '../models';
import {SalaRepository} from '../repositories';

export class SalaHorarioController {
  constructor(
    @repository(SalaRepository) protected salaRepository: SalaRepository,
  ) { }

  @get('/salas/{id}/horarios', {
    responses: {
      '200': {
        description: 'Array of Sala has many Horario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Horario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Horario>,
  ): Promise<Horario[]> {
    return this.salaRepository.horarios(id).find(filter);
  }

  @post('/salas/{id}/horarios', {
    responses: {
      '200': {
        description: 'Sala model instance',
        content: {'application/json': {schema: getModelSchemaRef(Horario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Sala.prototype.id_sala,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Horario, {
            title: 'NewHorarioInSala',
            exclude: ['id_horario'],
            optional: ['id_sala']
          }),
        },
      },
    }) horario: Omit<Horario, 'id_horario'>,
  ): Promise<Horario> {
    return this.salaRepository.horarios(id).create(horario);
  }

  @patch('/salas/{id}/horarios', {
    responses: {
      '200': {
        description: 'Sala.Horario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Horario, {partial: true}),
        },
      },
    })
    horario: Partial<Horario>,
    @param.query.object('where', getWhereSchemaFor(Horario)) where?: Where<Horario>,
  ): Promise<Count> {
    return this.salaRepository.horarios(id).patch(horario, where);
  }

  @del('/salas/{id}/horarios', {
    responses: {
      '200': {
        description: 'Sala.Horario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Horario)) where?: Where<Horario>,
  ): Promise<Count> {
    return this.salaRepository.horarios(id).delete(where);
  }
}
