import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UserServie } from "./users.service";

@Module({
    imports : [],
    controllers : [UsersController],
    providers : [UserServie]
})

export class UserModule {}