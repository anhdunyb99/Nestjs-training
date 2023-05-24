import { Injectable, Controller, Get, Param, Body, Response, Post, Put , UsePipes , ValidationPipe,  UseFilters, UseGuards , Request , ForbiddenException} from "@nestjs/common";
import { StoreService } from "./store.service";
import { PromotionDto, StoreDto, StoreLoginDto, VerifyOtpDto, sendEmailDto } from "src/dto/store.dto";
import { EmailService } from "src/custom-service/email.service";
import { StorePermissionGuard } from "src/guard/guard";
import { HttpExceptionFilter } from "src/https/execption.filter";
@Controller('store')
@UsePipes(new ValidationPipe())
@UseFilters(HttpExceptionFilter)
export class StoreController {
    constructor(private readonly storeService: StoreService, private readonly mailService: EmailService) { }
    
    @Get('/:id')
    @UseGuards(StorePermissionGuard)
    async GetStore(@Param() param : any , @Request() req) {
        if(req.store.storeId != param.id){
            return 'You do not have permission'
        }
        const data = this.storeService.getStoreById(param.id)
        return data
    }

    @Get('/list-customer/:id')
    @UseGuards(StorePermissionGuard)
    async getListCustomer(@Param() param : any, @Request() req){
        if(req.store.storeId != param.id){
            return 'You do not have permission'
        }
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
    async updateStore(@Body() body: StoreDto, @Param() param: any, @Request() req) {
        if(req.store.storeId != param.id){
            return 'You do not have permission'
        }
        await this.storeService.updateStore(body, param.id)

    }

    @Put('/verify-email/:id')
    async verifyEmail(@Body() body : VerifyOtpDto ,@Param() param: any) {
        await this.storeService.verifyEmail(body.otp,param.id)
        return 'Verify successfully'
    }

    @Post('/promotion/:rankId/:storeId')
    @UseGuards(StorePermissionGuard)
    async CreatePromotion(@Body() body : PromotionDto,@Param() param : any, @Request() req){
        if(req.store.storeId != param.storeId){
            throw new ForbiddenException(`You do not have permission`)
        }
        await this.storeService.createPromotion(body,param.storeId,param.rankId)
        return 'Create promotion  successfully'
    }

    @Post('/login')
    async login(@Body() body : StoreLoginDto){
        const token = await this.storeService.Login(body)
        return token
    }
}   