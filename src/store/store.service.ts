import { Injectable , BadRequestException } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import { StoreDto } from "src/dto/store.dto";
import { HttpExceptionFilter } from "src/https/execption.filter";
import { Store } from "src/models/store";
@Injectable()
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

        await this.storeModel.create(storeRegisterDto)
        return storeRegisterDto
    }

    async updateStore(data : StoreDto,storeId : string){
        await this.storeModel.update(data,{where : {id : storeId}})
    }
}