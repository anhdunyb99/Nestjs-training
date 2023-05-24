import { Module } from "@nestjs/common";
import { StoreService } from "./store.service";
import { StoreController } from "./store.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Store } from "src/models/store";
import { EmailService } from "src/custom-service/email.service";
import { Promotion } from "src/models/promotion";
@Module({
    imports: [SequelizeModule.forFeature([Store,Promotion])],
    controllers : [StoreController],
    providers : [StoreService , EmailService]
})

export class StoreModule {}