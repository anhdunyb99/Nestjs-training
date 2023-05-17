
import { Column, DataType, Model, Table , HasMany , ForeignKey } from 'sequelize-typescript';
@Table({
})
export class Admin extends Model<Admin> {
  @Column
  username : string;

  @Column
  password : string;


}