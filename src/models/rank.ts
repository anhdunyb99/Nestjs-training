
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Store } from './store';
import { Promotion } from './promotion';

@Table({
})
export class Rank extends Model<Rank> {
  @Column
  rank : string;

  @Column
  point : number;

  @BelongsToMany(() => Store, () => Promotion)
    stores: Store[];
}