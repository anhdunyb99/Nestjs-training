import { Controller, Post, Get, Inject, Body, UseGuards, UseFilters, UseInterceptors, UsePipes, ValidationPipe, HttpCode, Put, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PermissionGuard } from './guard/guard';
import { RegisterDto } from 'src/dto/register.dto';
import { CustomDecorator } from 'src/custom-decorator/custom.decorator';
import { SmsService } from './twilio.service';
import { StoreDto } from 'src/dto/store.dto';
import { AdminDto } from 'src/dto/admin.dto';

@Controller('admin')
@UsePipes(new ValidationPipe())
/* @UseInterceptors(AdditionalInfoInterceptor) */

export class AuthController {
    constructor(private readonly authService: AuthService,
        @Inject(SmsService) private smsService: SmsService
    ) { }
    @Post('register')
    /* @HttpCode(200) */
    @UseGuards(PermissionGuard)
    async Register(@Body() body: RegisterDto) {
        const data = await this.authService.Register(body)
        /* res.json({
            success: true,
            message: 'Create user successfully',
            data: data
        }) */
        return data
    }


    @Post('/')
    async CreateUser(@Body() body: RegisterDto) {
        const data = await this.authService.createUser(body)
        return body
    }

    @Get('/')
    async GetUser(){
        const data = await this.authService.getUser()
        return data
    }

    @Put('/:id')
    async UpdateUser(@Body() body: RegisterDto, @Param() params: any) {
        const data = await this.authService.updateUser(body, params.id)
        return body
    }

    @Post('send-otp/:id')
    async sendOtp(@Body() body: any, @Param() param : any) {
        await this.smsService.sendOtp(body.phoneNumber,param.id)
    }
    @Get('verify-otp/:id')
    async verifyOtp(@Body() body : any,@Param() param : any){
        console.log(body,param);
        
        await this.smsService.verifyOtp(body.otp,param.id)
    }
    @Delete('/:id')
    async DeleteUser(@Param() params: any) {
        await this.authService.deleteUser(params.id)
    }

    @Put('/verify-store/:id')
    async VerifyStore(@Param() param : any){
        await this.authService.verifyStore(param.id)
        return 'Đã phê duyệt cửa hàng'
    }

    @Get('/list-store')
    async GetListStore(){
        return await this.authService.getListStore()
    }

    @Put('/store')
    async updateStore(@Body() body : StoreDto,@Param() param : any){
        await this.authService.updateStore(body,param.id)
    }

    @Post('/register-admin')
    async RegisterAdmin(@Body() body : AdminDto){
        await this.authService.registerAdmin(body)
    }
}