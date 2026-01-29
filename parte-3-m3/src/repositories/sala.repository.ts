import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Sala, SalaRelations, Horario} from '../models';
import {HorarioRepository} from './horario.repository';

export class SalaRepository extends DefaultCrudRepository<
  Sala,
  typeof Sala.prototype.id_sala,
  SalaRelations
> {

  public readonly horarios: HasManyRepositoryFactory<Horario, typeof Sala.prototype.id_sala>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('HorarioRepository') protected horarioRepositoryGetter: Getter<HorarioRepository>,
  ) {
    super(Sala, dataSource);
    this.horarios = this.createHasManyRepositoryFactoryFor('horarios', horarioRepositoryGetter,);
    this.registerInclusionResolver('horarios', this.horarios.inclusionResolver);
  }
}
