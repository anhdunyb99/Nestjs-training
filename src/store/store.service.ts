import { Injectable, BadRequestException, UseFilters } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import { DefaultDto, DiscountDto, StoreDto } from "src/dto/store.dto";
import { HttpExceptionFilter } from "src/https/execption.filter";
import { Store } from "src/models/store";
import { Op } from "sequelize";
@Injectable()
@UseFilters(HttpExceptionFilter)
export class StoreService {
    constructor(
        @InjectModel(Store)
        private readonly storeModel: typeof Store,
    ) { }

    async getStore() {
        return '123'
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