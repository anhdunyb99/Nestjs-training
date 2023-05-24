import { Controller, Post, Get, Inject, Body, UseGuards, UseFilters, UseInterceptors, UsePipes, ValidationPipe, HttpCode, Put, Param, Delete } from '@nestjs/common';
import { AuthService } from './admin.service';
import { RegisterDto } from 'src/dto/register.dto';
import { SmsService } from '../custom-service/twilio.service';
import { StoreDto } from 'src/dto/store.dto';
import { AdminDto } from 'src/dto/admin.dto';
import { AdminPermissionGuard } from '../guard/guard';

@Controller('admin')
@UsePipes(new ValidationPipe())


export class AuthController {
    constructor(private readonly authService: AuthService,
        @Inject(SmsService) private smsService: SmsService
    ) { }
    
    
    @Post('/users')
    @UseGuards(AdminPermissionGuard)
    async CreateUser(@Body() body: RegisterDto) {
        const data = await this.authService.createUser(body)
        return body
    }

    
    @Get('/list-users')
    @UseGuards(AdminPermissionGuard)
    async GetUser(){
        const data = await this.authService.getUser()
        return data
    }

    
    @Put('/users/:id')
    @UseGuards(AdminPermissionGuard)
    async UpdateUser(@Body() body: RegisterDto, @Param() params: any) {
        const data = await this.authService.updateUser(body, params.id)
        return body
    }

    
    @Delete('/users/:id')
    @UseGuards(AdminPermissionGuard)
    async DeleteUser(@Param() params: any) {
        await this.authService.deleteUser(params.id)
        return 'Delete user successfully'
    }

    
    @Put('/verify-store/:id')
    @UseGuards(AdminPermissionGuard)
    async VerifyStore(@Param() param : any){
        await this.authService.verifyStore(param.id)
        return 'Đã phê duyệt cửa hàng'
    }


    @Get('/list-store')
    @UseGuards(AdminPermissionGuard)
    async GetListStore(){
        return await this.authService.getListStore()
    }

    
    @Put('/store/:id')
    @UseGuards(AdminPermissionGuard)
    async updateStore(@Body() body : StoreDto,@Param() param : any){
        await this.authService.updateStore(body,param.id)
        return('Update store successfully')
    }

    @Post('/store')
    @UseGuards(AdminPermissionGuard)
    async CreateStore(@Body() body : StoreDto,@Param() param : any){
        await this.authService.createStore(body)
        return 'Create store successfully'
    }

    @Delete('/store/:id')
    @UseGuards(AdminPermissionGuard)
    async DeleteStore(@Param() param : any){
        await this.authService.deleteStore(param.id)
        return 'Delete store successfully'
    }

    @Post('/register-admin')
    async RegisterAdmin(@Body() body : AdminDto){
        await this.authService.registerAdmin(body)
    }
    
    @Post('/login')
    async Login(@Body() body : AdminDto){
       const token = await this.authService.loginAdmin(body)
       return token 
    }
    
}   