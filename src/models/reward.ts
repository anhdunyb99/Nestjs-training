
import { Column, DataType, Model, Table, HasMany, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { Store } from './store';
import { User } from './user';
import { UserReward } from './userreward';
@Table({
})
export class Reward extends Model<Reward> {

    @Column
    name: number;

    @Column
    quantity: number;

    @Column
    point: number;

    @ForeignKey(() => Store)
    @Column
    storeId: string;

    @Column({field : 'from_date'})
    fromDate: Date;

    @Column({field : 'to_date'})
    toDate: Date;

    @Column
    description: string;

    @Column
    url: string;

    @BelongsTo(() => Store)
    store: Store;

    @BelongsToMany(() => User, () => UserReward)
    users: User[];
}