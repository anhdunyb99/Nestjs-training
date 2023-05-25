import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SmsService } from "src/custom-service/twilio.service";
import { Rank } from "src/models/rank";
import { RankController } from "./rank.controller";
import { RankService } from "./rank.service";
import { Admin } from "src/models/admin";

@Module({
    imports : [SequelizeModule.forFeature([Rank,Admin])],
    controllers : [RankController],
    providers : [RankService]
})

export class RankModule {}