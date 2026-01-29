import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Sala, SalaRelations} from '../models';

export class SalaRepository extends DefaultCrudRepository<
  Sala,
  typeof Sala.prototype.id_sala,
  SalaRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Sala, dataSource);
  }
}
