import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Store } from "src/models/store";
import { User } from "src/models/user";
import { Order } from "src/models/order";


@Module({
    imports : [SequelizeModule.forFeature([Store]),SequelizeModule.forFeature([User]),SequelizeModule.forFeature([Order])],
    controllers : [OrderController],
    providers : [OrderService]
})

export class OrderModule {}