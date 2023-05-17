import { Injectable, Controller, Get, Param, Body, Response, Post, Put } from "@nestjs/common";
import { StoreService } from "./store.service";
import { StoreDto } from "src/dto/store.dto";
import { EmailService } from "src/custom-service/email.service";
@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService, private readonly mailService: EmailService) { }

    @Get()
    async GetStore() {
        const data = this.storeService.getStore()
        return data
    }

    @Post()
    async registerStore(@Body() body: StoreDto) {
        const data = await this.storeService.registerStore(body)
        if (data) {
            await this.mailService.sendEmail(body.email,data.id)
            return 'Đã gửi mã xác thực qua email'
        }

    }

    @Put('/:id')
    async updateStore(@Body() body: StoreDto, @Param() param: any) {
        await this.storeService.updateStore(body, param.id)

    }

    @Put('/verify-email/:id')
    async verifyEmail(@Body() body : any ,@Param() param: any) {
        await this.storeService.verifyEmail(body.otp,param.id)

    }

    
}   