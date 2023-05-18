import { Injectable, UsePipes, Controller, ValidationPipe, Get, Inject, Param, Body, Post, UseGuards } from "@nestjs/common";
import { ValidationTypes } from "class-validator";
import { UserService } from "./users.service";
import { LoginDto } from "src/dto/user.dto";
import { UserPermissionGuard } from "src/auth/guard/guard";
import { RegisterDto } from "src/dto/register.dto";
import { SmsService } from "src/auth/twilio.service";
@Controller('user')
@UsePipes(new ValidationPipe())

export class UsersController {
    constructor(private readonly userService: UserService, @Inject(SmsService) private smsService: SmsService) { }
    @Post('/login')
    /* @UseGuards(UserPermissionGuard) */
    async login(@Body() body: LoginDto) {
        const data = this.userService.login(body)
        return data
    }

    @Post('register')
    /* @HttpCode(200) */
    async Register(@Body() body: RegisterDto) {
        const data = await this.userService.Register(body)
        return data
    }

    @Post('send-otp/:id')
    async sendOtp(@Body() body: any, @Param() param: any) {
        await this.smsService.sendOtp(body.phoneNumber, param.id)
    }
    @Get('verify-otp/:id')
    async verifyOtp(@Body() body: any, @Param() param: any) {
        console.log(body, param);

        await this.smsService.verifyOtp(body.otp, param.id)
    }
}