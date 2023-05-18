import { Module } from "@nestjs/common";
import { RewardController } from "./reward.controller";
import { RewardService } from "./reward.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Reward } from "src/models/reward";
import { User } from "src/models/user";
import { UserReward } from "src/models/userreward";


@Module({
    imports : [SequelizeModule.forFeature([Reward,User,UserReward])],
    controllers : [RewardController],
    providers : [RewardService]
})

export class RewardModule {}