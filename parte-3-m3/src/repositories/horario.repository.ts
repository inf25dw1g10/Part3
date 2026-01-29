import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Horario, HorarioRelations, Professor} from '../models';
import {ProfessorRepository} from './professor.repository';

export class HorarioRepository extends DefaultCrudRepository<
  Horario,
  typeof Horario.prototype.id_horario,
  HorarioRelations
> {

  public readonly professor: BelongsToAccessor<Professor, typeof Horario.prototype.id_horario>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProfessorRepository') protected professorRepositoryGetter: Getter<ProfessorRepository>,
  ) {
    super(Horario, dataSource);
    this.professor = this.createBelongsToAccessorFor('professor', professorRepositoryGetter,);
    this.registerInclusionResolver('professor', this.professor.inclusionResolver);
  }
}
