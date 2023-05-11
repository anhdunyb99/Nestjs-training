import { Injectable , Inject , Res , Request, UseFilters, BadRequestException, UseInterceptors , UsePipes , ValidationPipe } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import { HttpExceptionFilter } from 'src/https/execption.filter';
import { AdditionalInfoInterceptor } from './additional-info/additional-info.interceptor';
import { RegisterDto } from 'src/dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User} from '../models/user'
/* import { User } from '../models/user'
import { Test } from '../models/test' */
/* const db = require('../models/index') */

@Injectable()
@UseFilters(HttpExceptionFilter)
@UsePipes(new ValidationPipe())

export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    /* constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
      ) {} */
    Register(registerDto : any):any {
        /* if(!registerDto.username || !registerDto.password){
            throw new BadRequestException(`Invalid username or password`)
        } */
        /* asd */
        // check trung ten

        //all good 
        // hash password

        // return access token and refresh token
        const accessToken = jwt.sign(
            {userId : registerDto.userId}, // ve sau thay = id cua user vua tao
            process.env.ACCESS_TOKEN,
            {expiresIn : '10h'}
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

    async createUser(data : RegisterDto) {
        await this.userModel.create(data)
        
        
    }

    async updateUser(data : RegisterDto,userId : string){
        await this.userModel.updateOne({_id : userId} , data)
    }

    async getUser(){
        return await this.userModel.find({})
    }

    async deleteUser(userId : string){
        
    }
}
