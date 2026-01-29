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
  Aula,
} from '../models';
import {HorarioRepository} from '../repositories';

export class HorarioAulaController {
  constructor(
    @repository(HorarioRepository)
    public horarioRepository: HorarioRepository,
  ) { }

  @get('/horarios/{id}/aula', {
    responses: {
      '200': {
        description: 'Aula belonging to Horario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Aula),
          },
        },
      },
    },
  })
  async getAula(
    @param.path.number('id') id: typeof Horario.prototype.id_horario,
  ): Promise<Aula> {
    return this.horarioRepository.aula(id);
  }
}
