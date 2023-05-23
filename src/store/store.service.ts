import { Injectable, BadRequestException, UseFilters , UnauthorizedException } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import { DefaultDto, DiscountDto, StoreDto, StoreLoginDto } from "src/dto/store.dto";
import { HttpExceptionFilter } from "src/https/execption.filter";
import { Store } from "src/models/store";
import { Op } from "sequelize";
import { User } from "src/models/user";
import { Reward } from "src/models/reward";
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()
@Injectable()
@UseFilters(HttpExceptionFilter)
export class StoreService {
    constructor(
        @InjectModel(Store)
        private readonly storeModel: typeof Store,
    ) { }

    async getStoreById(storeId : string) {
        return await this.storeModel.findByPk(storeId)
    }

    async getListCustomer(storeId : string){
        const result = await this.storeModel.findByPk(storeId,{include: [{
            model: User,
            attributes: ['firstName','lastName','email','phoneNumber','loyal_type'],
          }]})
        return result
    }

    async Login(loginDto : StoreLoginDto){
        if (!loginDto.username || !loginDto.password) {
            throw new BadRequestException(`Invalid username or password`)
        }

        const condition = await this.storeModel.findOne({where :{username:loginDto.username,password:loginDto.password}})
        if(condition.isActive == true && condition.isVerify == true){
            const accessToken = jwt.sign(
                { storeId: condition.id }, // ve sau thay = id cua user vua tao
                process.env.ACCESS_TOKEN,
                { expiresIn: '10h' }
            )
    
            const refreshToken = jwt.sign(
                { storeId: condition.id },
                process.env.REFRESH_TOKEN, { expiresIn: '7d' }
            );
            await this.storeModel.update({refreshToken : refreshToken},{where : {id : condition.id}})
            return accessToken
        } else {
            throw new UnauthorizedException(`Your account is not active yet`)
        }
    }

    async registerStore(storeRegisterDto: StoreDto) {
        if (!storeRegisterDto.username || !storeRegisterDto.password) {
            throw new BadRequestException(`Invalid username or password`)
        }

        // check trung ten
        const condition = await this.storeModel.findOne({
            where: {
                username: storeRegisterDto.username
            }
        })

        if (condition) {
            throw new BadRequestException(`Username exist`)
        }

        // check 
        //all good 
        // hash password

        const data = await this.storeModel.create(storeRegisterDto)

        return data
    }

    async updateStore(data: StoreDto, storeId: string) {
        await this.storeModel.update(data, { where: { id: storeId } })
    }

    async verifyEmail(otp: string, storeId: string) {
        const now = new Date()
        const condition = await this.storeModel.findOne({
            where: {
                id: storeId,
                otp: otp,
                otp_exprise: {
                    [Op.gt]: now
                }
            }
        })
        console.log(condition);

        if (condition) {
            await this.storeModel.update({ isVerify: true }, { where: { id: storeId } })
        } else {
            throw new BadRequestException(`Otp ahas expired`)
        }
    }

    async createDefaultRate(storeId: string, defaultDto: DefaultDto) {
        await this.storeModel.update({
            bronze_default_point: defaultDto.bronze_default_point,
            silver_default_point: defaultDto.silver_default_point,
            gold_default_point: defaultDto.gold_default_point,
            minium_money: defaultDto.minium_money
        }, { where: { id: storeId } })
    }

    async createDiscountRate(storeId: string, discountDto: DiscountDto) {
        await this.storeModel.update({
            brozne_discount: discountDto.brozne_discount,
            silver_discount: discountDto.silver_discount,
            gold_discount: discountDto.gold_discount,
            bronze_max_point: discountDto.bronze_max_point,
            silver_max_point: discountDto.silver_max_point,
            gold_max_point: discountDto.gold_discount,
            minium_money: discountDto.minium_money
        }, { where: { id: storeId } })
    }
}