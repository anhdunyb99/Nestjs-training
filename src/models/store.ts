import { Column, Model, Table, ForeignKey, BelongsTo , DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Order } from './order';
import { User } from './user';
import { Promotion } from './promotion';
import { Rank } from './rank';

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
    type : DataType.ENUM('Default', 'Discount'),
    field : 'caculate_point_type'
  })
  calculatePointType : string;

  @Column
  otp : string;

  @Column
  isVerify : boolean;

  @Column
  otp_exprise : Date;


  @Column({field : 'minium_money'})
  miniumMoney : number;


  @Column({field : 'refresh_token'})
  refreshToken : string


  @BelongsToMany(() => User, () => Order)
  users: User[];

  @BelongsToMany(() => Rank, () => Promotion)
  ranks: Rank[];
}
