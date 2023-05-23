
import { Column, DataType, Model, Table , HasMany , ForeignKey , BelongsTo } from 'sequelize-typescript';
import { Store } from './store';
import { User } from './user';
@Table({
})
export class Order extends Model<Order> {

  @ForeignKey(() => User)  
  @Column
  userId : string;

  @ForeignKey(() => Store)
  @Column   
  storeId : string;

  @Column({field : 'total_money'})
  totalMoney: number;

  @Column({field : 'total_point'})
  totalPoint : number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Store)
  store: Store;

}