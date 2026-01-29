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
  Aula,
  Horario,
} from '../models';
import {AulaRepository} from '../repositories';

export class AulaHorarioController {
  constructor(
    @repository(AulaRepository) protected aulaRepository: AulaRepository,
  ) { }

  @get('/aulas/{id}/horarios', {
    responses: {
      '200': {
        description: 'Array of Aula has many Horario',
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
    return this.aulaRepository.horarios(id).find(filter);
  }

  @post('/aulas/{id}/horarios', {
    responses: {
      '200': {
        description: 'Aula model instance',
        content: {'application/json': {schema: getModelSchemaRef(Horario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Aula.prototype.id_aula,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Horario, {
            title: 'NewHorarioInAula',
            exclude: ['id_horario'],
            optional: ['id_aula']
          }),
        },
      },
    }) horario: Omit<Horario, 'id_horario'>,
  ): Promise<Horario> {
    return this.aulaRepository.horarios(id).create(horario);
  }

  @patch('/aulas/{id}/horarios', {
    responses: {
      '200': {
        description: 'Aula.Horario PATCH success count',
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
    return this.aulaRepository.horarios(id).patch(horario, where);
  }

  @del('/aulas/{id}/horarios', {
    responses: {
      '200': {
        description: 'Aula.Horario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Horario)) where?: Where<Horario>,
  ): Promise<Count> {
    return this.aulaRepository.horarios(id).delete(where);
  }
}
