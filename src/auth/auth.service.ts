import { Injectable , Inject , Res , Request, UseFilters, BadRequestException, UseInterceptors , UsePipes , ValidationPipe } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import { Response } from 'express';
import { HttpExceptionFilter } from 'src/https/execption.filter';
import { AdditionalInfoInterceptor } from './additional-info/additional-info.interceptor';
import { RegisterDto } from 'src/dto/register.dto';

@Injectable()
@UseFilters(HttpExceptionFilter)
@UsePipes(new ValidationPipe())

export class AuthService {
    Register(registerDto : any):any {

        if(!registerDto.username || !registerDto.password){
            throw new BadRequestException(`Invalid username or password`)
        }
        /* asd */
        // check trung ten

        //all good 
        // hash password

        // return access token and refresh token
        const accessToken = jwt.sign(
            {userId : registerDto.userId}, // ve sau thay = id cua user vua tao
            process.env.ACCESS_TOKEN,
            {expiresIn : '1h'}
        )

        const refreshToken = jwt.sign(
            { userId: registerDto.userId },
            process.env.REFRESH_TOKEN, { expiresIn: '7d' }
        );
        const token = {
            accessToken : accessToken,
            refreshToken : refreshToken
        }
        return token 
    }
}
