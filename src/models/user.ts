import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  paranoid: true
})
export class User extends Model<User> {
  @Column
  name: string;

  @Column
  age: number;

}