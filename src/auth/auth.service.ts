import { Injectable , Inject , Res , Request, UseFilters, BadRequestException, UseInterceptors , UsePipes , ValidationPipe } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import { Response } from 'express';
import { InjectModel } from '@nestjs/sequelize';
import { HttpExceptionFilter } from 'src/https/execption.filter';
import { AdditionalInfoInterceptor } from './additional-info/additional-info.interceptor';
import { RegisterDto } from 'src/dto/register.dto';
import { Sequelize } from 'sequelize-typescript';
/* import { User } from '../models/user'
import { Test } from '../models/test' */
/* const db = require('../models/index') */
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user'
@Injectable()
@UseFilters(HttpExceptionFilter)
@UsePipes(new ValidationPipe())

export class AuthService {
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

    async createUser(data : RegisterDto) {
        console.log('data',data)
        await User.create(data)
        /* await User.update(data, {
            where : {id : 1}
        }) */
        
    }

    async updateUser(data : any ,userId : string){
        await User.update(data , {
            where : { id : userId}
        })
    }

    async getUser(){
        return await User.findAll({})
    }

    async deleteUser(userId : string){
        await User.destroy({where : {id : userId }})
    }
}
