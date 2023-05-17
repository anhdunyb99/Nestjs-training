import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { where } from "sequelize";
import { RewardDto } from "src/dto/reward.dto";
import { Reward } from "src/models/reward";

@Injectable()
export class RewardService {
    constructor(
        @InjectModel(Reward)
        private readonly rewardModel: typeof Reward,
    ) { }

    async getAllReward(){
        return await this.rewardModel.findAll({})
    }

    async getRewardByStoreId(storeId : string){
        return await this.rewardModel.findAll({where : {
            storeId : storeId
        }})
    }

    async createReward(rewardDto : any , storeId : string){
        rewardDto.storeId = storeId
        const data = await this.rewardModel.create(rewardDto)
    }

    async updateReward(updateDto : any , storeId : string , rewardId : string){
        await this.rewardModel.update(updateDto,{where : {
            id : rewardId,
            storeId : storeId
        }})
    }

    async deleteReward(rewardId : string , storeId : string){
        await this.rewardModel.destroy({where : {
            id : rewardId,
            storeId : storeId
        }})
    }
}