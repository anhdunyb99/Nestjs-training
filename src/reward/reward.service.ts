import { Injectable, UseFilters, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { RewardDto } from "src/dto/reward.dto";
import { HttpExceptionFilter } from "src/https/execption.filter";
import { Reward } from "src/models/reward";
import { User } from "src/models/user";
import { UserReward } from "src/models/userreward";

@Injectable()
@UseFilters(HttpExceptionFilter)
export class RewardService {
    constructor(
        @InjectModel(Reward)
        private readonly rewardModel: typeof Reward,
        @InjectModel(User)
        private readonly userModel: typeof User,
        @InjectModel(UserReward)
        private readonly userRewardModel: typeof UserReward,
        private sequelize: Sequelize,
    ) { }

    async getAllReward() {
        return await this.rewardModel.findAll({})
    }

    async getRewardByStoreId(storeId: string) {
        return await this.rewardModel.findAll({
            where: {
                storeId: storeId
            }
        })
    }

    async createReward(rewardDto: any, storeId: string) {
        rewardDto.storeId = storeId
        const data = await this.rewardModel.create(rewardDto)
    }

    async updateReward(updateDto: any, storeId: string, rewardId: string) {
        await this.rewardModel.update(updateDto, {
            where: {
                id: rewardId,
                storeId: storeId
            }
        })
    }

    async deleteReward(rewardId: string, storeId: string) {
        await this.rewardModel.destroy({
            where: {
                id: rewardId,
                storeId: storeId
            }
        })
    }

    async exchangeReward(quantity: number, userId: string, rewardId: string) {
        const t = await this.sequelize.transaction()
        try {
            // check reward va user co ton tai khong
            const user = await this.userModel.findByPk(userId, { transaction: t })
            const reward = await this.rewardModel.findByPk(rewardId, { transaction: t })
            console.log(user.rewards)
            if (!user || !reward) {
                throw new BadRequestException(`User or reward not found`)
            }
            // check quantity
            if (quantity > reward.quantity) {
                throw new BadRequestException(`Quantity not enough`)
            }

            // check thoi gian doi thuong
            const now = new Date()
            if (now < reward.fromDate || now > reward.toDate) {
                throw new BadRequestException(`Reward exchange time has expired`)
            }
            // check user remain point
            if (user.point < quantity * reward.point) {
                throw new BadRequestException(`You do not have enough point`)
            }

            // all good
            const remainPoint = user.point - quantity * reward.point
            // tong so diem user da dung tu truoc den nay
            const pointUsed = user.pointUsed1 + quantity * reward.point

            const remainQuantity = reward.quantity - quantity

            await user.update({ point: remainPoint, pointUsed1: pointUsed }, { transaction: t })
            await user.reload({ transaction: t });
            await reward.update({ quantity: remainQuantity }, { transaction: t })
            await reward.reload({ transaction: t });
            await this.userRewardModel.create({
                userId: userId,
                rewardId: rewardId,
                quantity: quantity,
                totalPoint: quantity * reward.point
            }, { transaction: t })
            // Commit transaction
            await t.commit();
        } catch (error) {
            await t.rollback();
            throw new BadRequestException(`Exchange reward fail`)
        }
    }

    async getRewardExchangeByUserId(userId: string) {
        const result = await this.userRewardModel.findAll({
            where: { userId: userId },
            include: [Reward],
        });
        return result
    }
}