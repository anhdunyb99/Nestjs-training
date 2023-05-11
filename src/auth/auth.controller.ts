import { Controller, Post, Get , Response, Body, UseGuards, UseFilters, UseInterceptors , UsePipes , ValidationPipe  , HttpCode, Put, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthMiddleware } from 'src/middleware/middleware';
import { HttpExceptionFilter } from 'src/https/execption.filter';
import { PermissionGuard } from './guard/guard';
import { AdditionalInfoInterceptor } from './additional-info/additional-info.interceptor';
import { RegisterDto } from 'src/dto/register.dto';


@Controller('auth')
@UsePipes(new ValidationPipe())
/* @UseInterceptors(AdditionalInfoInterceptor) */

export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('register')
    /* @HttpCode(20) */
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
    async CreateUser(@Body() body : RegisterDto){
        const data = await this.authService.createUser(body)
        return body
    }

    @Put('/:id')
    async UpdateUser(@Body() body : RegisterDto, @Param() params : any){
        const data = await this.authService.updateUser(body,params.id)
        return body
    }

    @Get('/')
    async GetUser(){
        const data = await this.authService.getUser()
        return data
    }

    @Delete('/:id')
    async DeleteUser(@Param() params : any){
        await this.authService.deleteUser(params.id)
    }
}