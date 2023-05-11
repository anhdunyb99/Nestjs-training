import { Controller, Post, Response, Body, UseGuards, UseFilters, UseInterceptors , UsePipes , ValidationPipe  , HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthMiddleware } from 'src/middleware/middleware';
import { HttpExceptionFilter } from 'src/https/execption.filter';
import { PermissionGuard } from './guard/guard';
import { AdditionalInfoInterceptor } from './additional-info/additional-info.interceptor';
import { RegisterDto } from 'src/dto/register.dto';


@Controller('auth')
@UsePipes(new ValidationPipe())

@UseInterceptors(AdditionalInfoInterceptor)
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

}