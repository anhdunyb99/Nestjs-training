import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SmsService } from "src/custom-service/twilio.service";
import { Rank } from "src/models/rank";
import { RankController } from "./rank.controller";
import { RankService } from "./rank.service";

@Module({
    imports : [SequelizeModule.forFeature([Rank])],
    controllers : [RankController],
    providers : [RankService]
})

export class RankModule {}