import { Injectable , BadRequestException , UseFilters } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import { StoreDto } from "src/dto/store.dto";
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

    async getStore(){
        return '123'
    }

    async registerStore(storeRegisterDto : StoreDto){
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

    async updateStore(data : StoreDto,storeId : string){
        await this.storeModel.update(data,{where : {id : storeId}})
    }

    async verifyEmail(otp : string ,storeId : string){
        const now = new Date()
        const condition = await this.storeModel.findOne({where : {
            id : storeId,
            otp : otp,
            otp_exprise : {
                [Op.gt] : now
            }
        }})
        console.log(condition);
        
        if (condition) {
           await this.storeModel.update({isVerify : true},{where : {id : storeId}})
        } else {
            throw new BadRequestException(`Otp has expired`)
        }


    }
}