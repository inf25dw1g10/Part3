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
  Professor,
  Horario,
} from '../models';
import {ProfessorRepository} from '../repositories';

export class ProfessorHorarioController {
  constructor(
    @repository(ProfessorRepository) protected professorRepository: ProfessorRepository,
  ) { }

  @get('/professors/{id}/horarios', {
    responses: {
      '200': {
        description: 'Array of Professor has many Horario',
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
    return this.professorRepository.horarios(id).find(filter);
  }

  @post('/professors/{id}/horarios', {
    responses: {
      '200': {
        description: 'Professor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Horario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Professor.prototype.id_professor,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Horario, {
            title: 'NewHorarioInProfessor',
            exclude: ['id_horario'],
            optional: ['id_professor']
          }),
        },
      },
    }) horario: Omit<Horario, 'id_horario'>,
  ): Promise<Horario> {
    return this.professorRepository.horarios(id).create(horario);
  }

  @patch('/professors/{id}/horarios', {
    responses: {
      '200': {
        description: 'Professor.Horario PATCH success count',
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
    return this.professorRepository.horarios(id).patch(horario, where);
  }

  @del('/professors/{id}/horarios', {
    responses: {
      '200': {
        description: 'Professor.Horario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Horario)) where?: Where<Horario>,
  ): Promise<Count> {
    return this.professorRepository.horarios(id).delete(where);
  }
}
