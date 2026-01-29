import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Professor} from '../models';
import {ProfessorRepository} from '../repositories';

export class ProfessorController {
  constructor(
    @repository(ProfessorRepository)
    public professorRepository : ProfessorRepository,
  ) {}

  @post('/professores')
  @response(200, {
    description: 'Professor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Professor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Professor, {
            title: 'NewProfessor',
            exclude: ['id_professor'],
          }),
        },
      },
    })
    professor: Omit<Professor, 'id_professor'>,
  ): Promise<Professor> {
    return this.professorRepository.create(professor);
  }

  @get('/professores/count')
  @response(200, {
    description: 'Professor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Professor) where?: Where<Professor>,
  ): Promise<Count> {
    return this.professorRepository.count(where);
  }

  @get('/professores')
  @response(200, {
    description: 'Array of Professor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Professor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Professor) filter?: Filter<Professor>,
  ): Promise<Professor[]> {
    return this.professorRepository.find(filter);
  }

  @patch('/professores')
  @response(200, {
    description: 'Professor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Professor, {partial: true}),
        },
      },
    })
    professor: Professor,
    @param.where(Professor) where?: Where<Professor>,
  ): Promise<Count> {
    return this.professorRepository.updateAll(professor, where);
  }

  @get('/professores/{id}')
  @response(200, {
    description: 'Professor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Professor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Professor, {exclude: 'where'}) filter?: FilterExcludingWhere<Professor>
  ): Promise<Professor> {
    return this.professorRepository.findById(id, filter);
  }

  @patch('/professores/{id}')
  @response(204, {
    description: 'Professor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Professor, {partial: true}),
        },
      },
    })
    professor: Professor,
  ): Promise<void> {
    await this.professorRepository.updateById(id, professor);
  }

  @put('/professores/{id}')
  @response(204, {
    description: 'Professor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() professor: Professor,
  ): Promise<void> {
    await this.professorRepository.replaceById(id, professor);
  }

  @del('/professores/{id}')
  @response(204, {
    description: 'Professor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.professorRepository.deleteById(id);
  }
}
