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
import {Aluno} from '../models';
import {AlunoRepository} from '../repositories';

export class AlunoController {
  constructor(
    @repository(AlunoRepository)
    public alunoRepository : AlunoRepository,
  ) {}

  @post('/alunos')
  @response(200, {
    description: 'Aluno model instance',
    content: {'application/json': {schema: getModelSchemaRef(Aluno)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aluno, {
            title: 'NewAluno',
            exclude: ['id_aluno'],
          }),
        },
      },
    })
    aluno: Omit<Aluno, 'id_aluno'>,
  ): Promise<Aluno> {
    return this.alunoRepository.create(aluno);
  }

  @get('/alunos/count')
  @response(200, {
    description: 'Aluno model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Aluno) where?: Where<Aluno>,
  ): Promise<Count> {
    return this.alunoRepository.count(where);
  }

  @get('/alunos')
  @response(200, {
    description: 'Array of Aluno model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Aluno, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Aluno) filter?: Filter<Aluno>,
  ): Promise<Aluno[]> {
    return this.alunoRepository.find(filter);
  }

  @patch('/alunos')
  @response(200, {
    description: 'Aluno PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aluno, {partial: true}),
        },
      },
    })
    aluno: Aluno,
    @param.where(Aluno) where?: Where<Aluno>,
  ): Promise<Count> {
    return this.alunoRepository.updateAll(aluno, where);
  }

  @get('/alunos/{id}')
  @response(200, {
    description: 'Aluno model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Aluno, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Aluno, {exclude: 'where'}) filter?: FilterExcludingWhere<Aluno>
  ): Promise<Aluno> {
    return this.alunoRepository.findById(id, filter);
  }

  @patch('/alunos/{id}')
  @response(204, {
    description: 'Aluno PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aluno, {partial: true}),
        },
      },
    })
    aluno: Aluno,
  ): Promise<void> {
    await this.alunoRepository.updateById(id, aluno);
  }

  @put('/alunos/{id}')
  @response(204, {
    description: 'Aluno PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() aluno: Aluno,
  ): Promise<void> {
    await this.alunoRepository.replaceById(id, aluno);
  }

  @del('/alunos/{id}')
  @response(204, {
    description: 'Aluno DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.alunoRepository.deleteById(id);
  }
}
