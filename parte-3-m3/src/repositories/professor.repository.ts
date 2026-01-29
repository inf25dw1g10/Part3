import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Professor, ProfessorRelations, Horario, Aula} from '../models';
import {HorarioRepository} from './horario.repository';
import {AulaRepository} from './aula.repository';

export class ProfessorRepository extends DefaultCrudRepository<
  Professor,
  typeof Professor.prototype.id_professor,
  ProfessorRelations
> {

  public readonly horarios: HasManyRepositoryFactory<Horario, typeof Professor.prototype.id_professor>;

  public readonly aulas: HasManyRepositoryFactory<Aula, typeof Professor.prototype.id_professor>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('HorarioRepository') protected horarioRepositoryGetter: Getter<HorarioRepository>, @repository.getter('AulaRepository') protected aulaRepositoryGetter: Getter<AulaRepository>,
  ) {
    super(Professor, dataSource);
    this.aulas = this.createHasManyRepositoryFactoryFor('aulas', aulaRepositoryGetter,);
    this.registerInclusionResolver('aulas', this.aulas.inclusionResolver);
    this.horarios = this.createHasManyRepositoryFactoryFor('horarios', horarioRepositoryGetter,);
    this.registerInclusionResolver('horarios', this.horarios.inclusionResolver);
  }
}
