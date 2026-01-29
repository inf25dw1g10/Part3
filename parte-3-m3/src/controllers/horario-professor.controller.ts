import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Horario,
  Professor,
} from '../models';
import {HorarioRepository} from '../repositories';

export class HorarioProfessorController {
  constructor(
    @repository(HorarioRepository)
    public horarioRepository: HorarioRepository,
  ) { }

  @get('/horarios/{id}/professor', {
    responses: {
      '200': {
        description: 'Professor belonging to Horario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Professor),
          },
        },
      },
    },
  })
  async getProfessor(
    @param.path.number('id') id: typeof Horario.prototype.id_horario,
  ): Promise<Professor> {
    return this.horarioRepository.professor(id);
  }
}
