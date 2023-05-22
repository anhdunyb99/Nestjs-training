import { Injectable, Controller, Get, Param, Body, Response, Post, Put , UsePipes , ValidationPipe , UseGuards} from "@nestjs/common";
import { StoreService } from "./store.service";
import { DefaultDto, DiscountDto, StoreDto, StoreLoginDto, VerifyOtpDto, sendEmailDto } from "src/dto/store.dto";
import { EmailService } from "src/custom-service/email.service";
import { StorePermissionGuard } from "src/guard/guard";
@Controller('store')
@UsePipes(new ValidationPipe())

export class StoreController {
    constructor(private readonly storeService: StoreService, private readonly mailService: EmailService) { }
    
    @Get('/:id')
    @UseGuards(StorePermissionGuard)
    async GetStore(@Param() param : any) {
        const data = this.storeService.getStoreById(param.id)
        return data
    }

    @Get('/list-customer/:id')
    @UseGuards(StorePermissionGuard)
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
    
    @Post('/send-mail/:id')
    async sendEmail(@Param() param : any,@Body() body : sendEmailDto){
        await this.mailService.sendEmail(body.email,param.id)
    }
    @Put('/:id')
    @UseGuards(StorePermissionGuard)
    async updateStore(@Body() body: StoreDto, @Param() param: any) {
        await this.storeService.updateStore(body, param.id)

    }

    @Put('/verify-email/:id')
    async verifyEmail(@Body() body : VerifyOtpDto ,@Param() param: any) {
        await this.storeService.verifyEmail(body.otp,param.id)
        return 'Verify successfully'
    }

    @Put('/default-rate/:id')
    @UseGuards(StorePermissionGuard)
    async CreateDefaultRate(@Body() body : DefaultDto,@Param() param : any){
        await this.storeService.createDefaultRate(param.id,body)
        return 'Create default rate successfully'
    }

    @Put('/discount-rate/:id')
    @UseGuards(StorePermissionGuard)
    async CreateDiscountRate(@Body() body : DiscountDto,@Param() param : any){
        await this.storeService.createDiscountRate(param.id,body)
        return 'Create discount rate successfully'
    }

    @Post('/login')
    async login(@Body() body : StoreLoginDto){
        const token = await this.storeService.Login(body)
        return token
    }
}   