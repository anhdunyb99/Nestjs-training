import { Column, Model, Table, ForeignKey, BelongsTo , DataType, HasMany } from 'sequelize-typescript';
import { Order } from './order';

@Table
export class Store extends Model<Store> {
  @Column
  name: string;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  isActive : boolean;

  @Column
  email : string;

  @Column({
    type : DataType.ENUM('Default', 'Discount')
  })
  caculate_point_type : string;

  @HasMany(() => Order)
  orders: Order[];
}
