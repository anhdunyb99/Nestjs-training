import { Module } from "@nestjs/common";
import { RewardController } from "./reward.controller";
import { RewardService } from "./reward.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Reward } from "src/models/reward";


@Module({
    imports : [SequelizeModule.forFeature([Reward])],
    controllers : [RewardController],
    providers : [RewardService]
})

export class RewardModule {}