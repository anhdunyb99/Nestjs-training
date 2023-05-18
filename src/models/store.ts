import { Column, Model, Table, ForeignKey, BelongsTo , DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Order } from './order';
import { User } from './user';

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

  @Column
  otp : string;

  @Column
  isVerify : boolean;

  @Column
  otp_exprise : Date;

  @Column
  brozne_discount : number;

  @Column
  silver_discount : number;

  @Column
  gold_discount : number;

  @Column
  minium_money : number;

  @Column
  bronze_default_point : number;

  @Column
  silver_default_point : number;

  @Column
  gold_default_point : number;

  @Column
  bronze_max_point : number;

  @Column
  silver_max_point : number;

  @Column
  gold_max_point : number;

  @Column
  refresh_token : string


  @BelongsToMany(() => User, () => Order)
  users: User[];
}
