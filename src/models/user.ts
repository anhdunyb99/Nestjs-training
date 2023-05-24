
import { Column, DataType, Model, Table, HasMany, BelongsToMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Order } from './order';
import { Reward } from './reward';
import { UserReward } from './userreward';
import { Store } from './store';
import { Rank } from './rank';
@Table({
  paranoid: true
})
export class User extends Model<User> {
  @Column
  username: string;

  @Column
  password: string;

  @Column
  email: string

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  phoneNumber: string

  @Column
  point: number


  @Column
  isActive: boolean

  @Column({
    type: DataType.ENUM('Gold', 'Silver', 'Bronze'),
    field: 'loyal_type'
  })
  loyalType: string;
  @Column
  otp: string

  @Column({ field: 'exprise_date' })
  expriseDate: Date

  @Column({ field: 'point_used1' })
  pointUsed1: number

  @Column({ field: 'refresh_token' })
  refreshToken: string

  @ForeignKey(() => Rank)
  @Column({ field: 'rank_id' })
  rankId: string;

  @BelongsToMany(() => Reward, () => UserReward)
  rewards: Reward[];

  @BelongsToMany(() => Store, () => Order)
  stores: Store[];

  @BelongsTo(() => Rank)
  rank: Rank;
}