import { Injectable, Controller, Get, Param, Body, Response, Post, Put , UsePipes , ValidationPipe} from "@nestjs/common";
import { StoreService } from "./store.service";
import { DefaultDto, DiscountDto, StoreDto } from "src/dto/store.dto";
import { EmailService } from "src/custom-service/email.service";
@Controller('store')
@UsePipes(new ValidationPipe())
export class StoreController {
    constructor(private readonly storeService: StoreService, private readonly mailService: EmailService) { }

    @Get('/:id')
    async GetStore(@Param() param : any) {
        const data = this.storeService.getStoreById(param.id)
        return data
    }

    @Get('/list-customer/:id')
    async getListCustomer(@Param() param : any){
        const data = this.storeService.getListCustomer(param.id)
        return data
    }

    @Post()
    async registerStore(@Body() body: StoreDto) {
        const data = await this.storeService.registerStore(body)
        if (data) {
            await this.mailService.sendEmail(body.email,data.id)
            return 'Otp has been sent'
        }

    }

    @Put('/:id')
    async updateStore(@Body() body: StoreDto, @Param() param: any) {
        await this.storeService.updateStore(body, param.id)

    }

    @Put('/verify-email/:id')
    async verifyEmail(@Body() body : any ,@Param() param: any) {
        await this.storeService.verifyEmail(body.otp,param.id)
        return 'Verify successfully'
    }

    @Put('/default-rate/:id')
    async CreateDefaultRate(@Body() body : DefaultDto,@Param() param : any){
        await this.storeService.createDefaultRate(param.id,body)
        return 'Create default rate successfully'
    }

    @Put('/discount-rate/:id')
    async CreateDiscountRate(@Body() body : DiscountDto,@Param() param : any){
        await this.storeService.createDiscountRate(param.id,body)
        return 'Create discount rate successfully'
    }
}   