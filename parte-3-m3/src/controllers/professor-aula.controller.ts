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
  Aula,
} from '../models';
import {ProfessorRepository} from '../repositories';

export class ProfessorAulaController {
  constructor(
    @repository(ProfessorRepository) protected professorRepository: ProfessorRepository,
  ) { }

  @get('/professors/{id}/aulas', {
    responses: {
      '200': {
        description: 'Array of Professor has many Aula',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Aula)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Aula>,
  ): Promise<Aula[]> {
    return this.professorRepository.aulas(id).find(filter);
  }

  @post('/professors/{id}/aulas', {
    responses: {
      '200': {
        description: 'Professor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Aula)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Professor.prototype.id_professor,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aula, {
            title: 'NewAulaInProfessor',
            exclude: ['id_aula'],
            optional: ['id_professor']
          }),
        },
      },
    }) aula: Omit<Aula, 'id_aula'>,
  ): Promise<Aula> {
    return this.professorRepository.aulas(id).create(aula);
  }

  @patch('/professors/{id}/aulas', {
    responses: {
      '200': {
        description: 'Professor.Aula PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aula, {partial: true}),
        },
      },
    })
    aula: Partial<Aula>,
    @param.query.object('where', getWhereSchemaFor(Aula)) where?: Where<Aula>,
  ): Promise<Count> {
    return this.professorRepository.aulas(id).patch(aula, where);
  }

  @del('/professors/{id}/aulas', {
    responses: {
      '200': {
        description: 'Professor.Aula DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Aula)) where?: Where<Aula>,
  ): Promise<Count> {
    return this.professorRepository.aulas(id).delete(where);
  }
}
