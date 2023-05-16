
import { Column, DataType, Model, Table , HasMany } from 'sequelize-typescript';
import { Order } from './order';
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

  @HasMany(() => Order)
  orders: Order[];
}