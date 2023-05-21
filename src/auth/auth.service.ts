import { Injectable, Inject, Res, Request, UseFilters, BadRequestException, UseInterceptors, UsePipes, ValidationPipe , NotFoundException } from '@nestjs/common';
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
import { Store } from 'src/models/store';
import { User } from '../models/user'
import { StoreDto } from 'src/dto/store.dto';
import { AdminDto } from 'src/dto/admin.dto';
import { Admin } from 'src/models/admin';
@Injectable()
@UseFilters(HttpExceptionFilter)
@UsePipes(new ValidationPipe())

export class AuthService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
        @InjectModel(Store)
        private readonly storeModel: typeof Store,
        @InjectModel(Admin)
        private readonly adminModel: typeof Admin,
    ) { }
    async loginAdmin (login : AdminDto) {
        if(!login.username || !login.password){
            throw new BadRequestException(`Invalid username or password`)
        }
        const condition = await this.adminModel.findOne({where : {username : login.username,password : login.password}})

        if(condition){
            const accessToken = jwt.sign(
                { adminId: condition.id }, // ve sau thay = id cua user vua tao
                process.env.ACCESS_TOKEN,
                { expiresIn: '10h' }
            )
    
            const refreshToken = jwt.sign(
                { adminId: condition.id },
                process.env.REFRESH_TOKEN, { expiresIn: '7d' }
            );

            await this.adminModel.update({refresh_token : refreshToken},{where : {id : condition.id}})
            return accessToken
        }
    }



    async createUser(data: RegisterDto) {
        const condition = await this.userModel.findOne({where : {
            username : data.username
        }})
        if(condition){
            throw new BadRequestException(`Username exist`)
        }
        await this.userModel.create(data)
    }

    async updateUser(data: any, userId: string) {
        await this.userModel.update(data, {
            where: { id: userId }
        })
    }

    async getUser() {
        return await this.userModel.findAll({})
    }

    async deleteUser(userId: string) {
        await this.userModel.destroy({ where: { id: userId } })
    }

    async verifyStore(storeId : string){
        const condition = await this.storeModel.findOne({where : {
            id : storeId,
            isVerify : true
        }})

        if(condition){
            await this.storeModel.update({ isActive : true},{where : {id : storeId}})
        } else {
            throw new NotFoundException(`Store not exist or didnt verify yet`)
        }
    }

    async getListStore(){
        const list = await this.storeModel.findAll({})
        return list
    }

    async updateStore(updateStore : StoreDto,storeId : string){
        await this.storeModel.update(updateStore,{where : {
            id : storeId
        }})
    }

    async registerAdmin(registerDto : AdminDto){
        await this.adminModel.create(registerDto)
    }

    async createStore(storeDto : StoreDto){
        const condition = await this.storeModel.findOne({where : {
            username : storeDto.username
        }})

        if(condition){
            throw new BadRequestException(`Username exist`)
        }
        await this.storeModel.create(storeDto)
    }

    async deleteStore(storeId : string){
        await this.storeModel.destroy({where : {id : storeId}})
    }
}
