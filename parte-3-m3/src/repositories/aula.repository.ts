import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Aula, AulaRelations} from '../models';

export class AulaRepository extends DefaultCrudRepository<
  Aula,
  typeof Aula.prototype.id_aula,
  AulaRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Aula, dataSource);
  }
}
