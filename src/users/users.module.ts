import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "src/models/user";
import { SmsService } from "src/auth/twilio.service";

@Module({
    imports : [SequelizeModule.forFeature([User])],
    controllers : [UsersController],
    providers : [UserService,SmsService]
})

export class UserModule {}