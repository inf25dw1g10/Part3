import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Aula,
  Professor,
} from '../models';
import {AulaRepository} from '../repositories';

export class AulaProfessorController {
  constructor(
    @repository(AulaRepository)
    public aulaRepository: AulaRepository,
  ) { }

  @get('/aulas/{id}/professor', {
    responses: {
      '200': {
        description: 'Professor belonging to Aula',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Professor),
          },
        },
      },
    },
  })
  async getProfessor(
    @param.path.number('id') id: typeof Aula.prototype.id_aula,
  ): Promise<Professor> {
    return this.aulaRepository.professor(id);
  }
}
