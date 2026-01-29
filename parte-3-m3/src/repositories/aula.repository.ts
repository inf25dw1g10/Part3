import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Aula, AulaRelations, Professor, Horario} from '../models';
import {ProfessorRepository} from './professor.repository';
import {HorarioRepository} from './horario.repository';

export class AulaRepository extends DefaultCrudRepository<
  Aula,
  typeof Aula.prototype.id_aula,
  AulaRelations
> {

  public readonly professor: BelongsToAccessor<Professor, typeof Aula.prototype.id_aula>;

  public readonly horarios: HasManyRepositoryFactory<Horario, typeof Aula.prototype.id_aula>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProfessorRepository') protected professorRepositoryGetter: Getter<ProfessorRepository>, @repository.getter('HorarioRepository') protected horarioRepositoryGetter: Getter<HorarioRepository>,
  ) {
    super(Aula, dataSource);
    this.horarios = this.createHasManyRepositoryFactoryFor('horarios', horarioRepositoryGetter,);
    this.registerInclusionResolver('horarios', this.horarios.inclusionResolver);
    this.professor = this.createBelongsToAccessorFor('professor', professorRepositoryGetter,);
    this.registerInclusionResolver('professor', this.professor.inclusionResolver);
  }
}
