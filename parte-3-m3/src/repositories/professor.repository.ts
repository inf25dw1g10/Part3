import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Professor, ProfessorRelations, Horario} from '../models';
import {HorarioRepository} from './horario.repository';

export class ProfessorRepository extends DefaultCrudRepository<
  Professor,
  typeof Professor.prototype.id_professor,
  ProfessorRelations
> {

  public readonly horarios: HasManyRepositoryFactory<Horario, typeof Professor.prototype.id_professor>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('HorarioRepository') protected horarioRepositoryGetter: Getter<HorarioRepository>,
  ) {
    super(Professor, dataSource);
    this.horarios = this.createHasManyRepositoryFactoryFor('horarios', horarioRepositoryGetter,);
    this.registerInclusionResolver('horarios', this.horarios.inclusionResolver);
  }
}
