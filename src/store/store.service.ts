import { Injectable, BadRequestException, UseFilters , UnauthorizedException } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import { PromotionDto, StoreDto, StoreLoginDto } from "src/dto/store.dto";
import { HttpExceptionFilter } from "src/https/execption.filter";
import { Store } from "src/models/store";
import { Op } from "sequelize";
import { User } from "src/models/user";
import { Reward } from "src/models/reward";
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { Promotion } from "src/models/promotion";
dotenv.config()
@Injectable()
@UseFilters(HttpExceptionFilter)
export class StoreService {
    constructor(
        @InjectModel(Store)
        private readonly storeModel: typeof Store,

        @InjectModel(Promotion)
        private readonly promotionModel: typeof Promotion,
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


    async createPromotion(promotion : PromotionDto,storeId: string,rankId : string) {
        const condition = await this.promotionModel.findOne({ where : {
            storeId : storeId,
            rankId : rankId
        }})
        if(condition){
            throw new BadRequestException(`Promotion exist`)
        }
        await this.promotionModel.create({
            storeId : storeId,
            rankId : rankId,
            discountRate : promotion.discountRate,
            pointBonus : promotion.pointBonus
        })

    }

    
}