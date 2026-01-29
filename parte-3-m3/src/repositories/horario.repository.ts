import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Horario, HorarioRelations, Professor, Sala, Aula} from '../models';
import {ProfessorRepository} from './professor.repository';
import {SalaRepository} from './sala.repository';
import {AulaRepository} from './aula.repository';

export class HorarioRepository extends DefaultCrudRepository<
  Horario,
  typeof Horario.prototype.id_horario,
  HorarioRelations
> {

  public readonly professor: BelongsToAccessor<Professor, typeof Horario.prototype.id_horario>;

  public readonly sala: BelongsToAccessor<Sala, typeof Horario.prototype.id_horario>;

  public readonly aula: BelongsToAccessor<Aula, typeof Horario.prototype.id_horario>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProfessorRepository') protected professorRepositoryGetter: Getter<ProfessorRepository>, @repository.getter('SalaRepository') protected salaRepositoryGetter: Getter<SalaRepository>, @repository.getter('AulaRepository') protected aulaRepositoryGetter: Getter<AulaRepository>,
  ) {
    super(Horario, dataSource);
    this.aula = this.createBelongsToAccessorFor('aula', aulaRepositoryGetter,);
    this.registerInclusionResolver('aula', this.aula.inclusionResolver);
    this.sala = this.createBelongsToAccessorFor('sala', salaRepositoryGetter,);
    this.registerInclusionResolver('sala', this.sala.inclusionResolver);
    this.professor = this.createBelongsToAccessorFor('professor', professorRepositoryGetter,);
    this.registerInclusionResolver('professor', this.professor.inclusionResolver);
  }
}
