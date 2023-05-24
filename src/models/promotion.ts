
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Store } from './store';
import { Rank } from './rank';
@Table({
})
export class Promotion extends Model<Promotion> {
@ForeignKey(() => Rank)  
  @Column({field : 'rank_id'})
  rankId : string;

  @ForeignKey(() => Store) 
  @Column({field : 'store_id'})
  storeId : string;

  @Column({field : 'discount_rate'})
  discountRate : number;

  @Column({field : 'point_bonus'})
  pointBonus : number;

  @Column({field : 'max_point'})
  maxPoint : number

  @BelongsTo(() => Rank)
  rank: Rank;

  @BelongsTo(() => Store)
  store: Store;
}