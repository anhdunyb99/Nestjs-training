import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Store } from "src/models/store";
import { User } from "src/models/user";
import { Order } from "src/models/order";
import { Promotion } from "src/models/promotion";
import { Rank } from "src/models/rank";


@Module({
    imports : [SequelizeModule.forFeature([Store,User,Order,Promotion,Rank])],
    controllers : [OrderController],
    providers : [OrderService]
})

export class OrderModule {}