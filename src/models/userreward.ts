
import { Column, DataType, Model, Table , HasMany , ForeignKey , BelongsTo } from 'sequelize-typescript';
import { Reward } from './reward';
import { User } from './user';
@Table({
})
export class UserReward extends Model<UserReward> {

  @ForeignKey(() => User)  
  @Column
  userId : string;

  @ForeignKey(() => Reward)
  @Column   
  rewardId : string;

  @Column
  quantity : number;

  @Column
  total_point : number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Reward)
  reward: Reward;

}