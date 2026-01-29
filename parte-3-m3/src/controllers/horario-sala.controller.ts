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
  Sala,
} from '../models';
import {HorarioRepository} from '../repositories';

export class HorarioSalaController {
  constructor(
    @repository(HorarioRepository)
    public horarioRepository: HorarioRepository,
  ) { }

  @get('/horarios/{id}/sala', {
    responses: {
      '200': {
        description: 'Sala belonging to Horario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Sala),
          },
        },
      },
    },
  })
  async getSala(
    @param.path.number('id') id: typeof Horario.prototype.id_horario,
  ): Promise<Sala> {
    return this.horarioRepository.sala(id);
  }
}
