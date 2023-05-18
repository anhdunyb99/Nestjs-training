
import { Column, DataType, Model, Table , HasMany , BelongsToMany } from 'sequelize-typescript';
import { Order } from './order';
import { Reward } from './reward';
import { UserReward } from './userreward';
import { Store } from './store';
@Table({
  paranoid: true
})
export class User extends Model<User> {
  @Column
  username : string;

  @Column
  password : string;
  
  @Column
  email : string

  @Column
  firstName : string;

  @Column
  lastName : string;

  @Column
  phoneNumber : string

  @Column 
  point : number

  
  @Column 
  isActive : boolean

  @Column({
    type : DataType.ENUM('Gold', 'Silver', 'Bronze')
  })
  loyal_type: string;
  @Column 
  otp : string

  @Column 
  exprise_date : Date

  @Column
  point_used1 : number


  @BelongsToMany(() => Reward, () => UserReward)
  rewards: Reward[];

  @BelongsToMany(() => Store, () => Order)
  stores: Store[];
}