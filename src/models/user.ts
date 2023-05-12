import { first } from 'rxjs';
import { Column, Model, Table } from 'sequelize-typescript';

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
  roleId : number;

  @Column
  inviteCode : string

  @Column 
  isUsed : boolean
}