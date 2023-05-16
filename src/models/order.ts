
import { Column, DataType, Model, Table , HasMany , ForeignKey } from 'sequelize-typescript';
import { Store } from './store';
import { User } from './user';
@Table({
  paranoid: true
})
export class Order extends Model<Order> {

  @ForeignKey(() => User)  
  @Column
  userId : string;

  @ForeignKey(() => Store)
  @Column   
  storeId : string;

  @Column
  total_money : number;


}