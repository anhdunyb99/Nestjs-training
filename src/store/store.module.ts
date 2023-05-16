import { Module } from "@nestjs/common";
import { StoreService } from "./store.service";
import { StoreController } from "./store.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Store } from "src/models/store";
@Module({
    imports: [SequelizeModule.forFeature([Store])],
    controllers : [StoreController],
    providers : [StoreService]
})

export class StoreModule {}