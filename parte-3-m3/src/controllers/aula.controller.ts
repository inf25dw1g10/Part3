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
import {Aula} from '../models';
import {AulaRepository} from '../repositories';

export class AulaController {
  constructor(
    @repository(AulaRepository)
    public aulaRepository : AulaRepository,
  ) {}

  @post('/aulas')
  @response(200, {
    description: 'Aula model instance',
    content: {'application/json': {schema: getModelSchemaRef(Aula)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aula, {
            title: 'NewAula',
            exclude: ['id_aula'],
          }),
        },
      },
    })
    aula: Omit<Aula, 'id_aula'>,
  ): Promise<Aula> {
    return this.aulaRepository.create(aula);
  }

  @get('/aulas/count')
  @response(200, {
    description: 'Aula model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Aula) where?: Where<Aula>,
  ): Promise<Count> {
    return this.aulaRepository.count(where);
  }

  @get('/aulas')
  @response(200, {
    description: 'Array of Aula model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Aula, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Aula) filter?: Filter<Aula>,
  ): Promise<Aula[]> {
    return this.aulaRepository.find(filter);
  }

  @patch('/aulas')
  @response(200, {
    description: 'Aula PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aula, {partial: true}),
        },
      },
    })
    aula: Aula,
    @param.where(Aula) where?: Where<Aula>,
  ): Promise<Count> {
    return this.aulaRepository.updateAll(aula, where);
  }

  @get('/aulas/{id}')
  @response(200, {
    description: 'Aula model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Aula, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Aula, {exclude: 'where'}) filter?: FilterExcludingWhere<Aula>
  ): Promise<Aula> {
    return this.aulaRepository.findById(id, filter);
  }

  @patch('/aulas/{id}')
  @response(204, {
    description: 'Aula PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aula, {partial: true}),
        },
      },
    })
    aula: Aula,
  ): Promise<void> {
    await this.aulaRepository.updateById(id, aula);
  }

  @put('/aulas/{id}')
  @response(204, {
    description: 'Aula PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() aula: Aula,
  ): Promise<void> {
    await this.aulaRepository.replaceById(id, aula);
  }

  @del('/aulas/{id}')
  @response(204, {
    description: 'Aula DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.aulaRepository.deleteById(id);
  }
}
