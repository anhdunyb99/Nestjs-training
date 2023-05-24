import { Injectable, UseFilters } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { HttpExceptionFilter } from "src/https/execption.filter";
import { Order } from "src/models/order";
import { Promotion } from "src/models/promotion";
import { Rank } from "src/models/rank";
import { Store } from "src/models/store";
import { User } from "src/models/user";

@Injectable()
@UseFilters(HttpExceptionFilter)
export class OrderService {
    constructor(
        @InjectModel(Store)
        private readonly storeModel: typeof Store,
        @InjectModel(User)
        private readonly userModel: typeof User,
        @InjectModel(Order)
        private readonly orderModel: typeof Order,
        @InjectModel(Rank)
        private readonly rankModel: typeof Rank,
        @InjectModel(Promotion)
        private readonly promotionModel: typeof Promotion,
    ) { }

    async getOrder() {
        console.log('123');
    }

    async createOrder(userId: string, storeId: string, totalMoney: number) {
        //check rank va update rank user
        const user = await this.userModel.findOne({ where: { id: userId } })
        const bronzeRank = await this.rankModel.findOne({ where : {rank : 'Bronze'}})
        const silverRank = await this.rankModel.findOne({ where : {rank : 'Silver'}})
        const goldRank = await this.rankModel.findOne({ where : {rank : 'Gold'}})
        const userTotalPoint = user.pointUsed1 + user.point
        console.log('user_total_point',userTotalPoint);
        
        if(userTotalPoint < silverRank.point){
            await this.userModel.update({rankId : bronzeRank.id},{where : {id : userId}})
        } else if (userTotalPoint >= silverRank.point && userTotalPoint < goldRank.point){         
            await this.userModel.update({rankId : silverRank.id},{where : {id : userId}})
        } else {
            await this.userModel.update({rankId : goldRank.id},{where : {id : userId}})
        }

        // get new rank
        const newUser = await this.userModel.findOne({ where: { id: userId } })
        const userRank = newUser.rankId
        console.log('bronzeRank',typeof(bronzeRank.id));
        
        //Check xem store ap dung loai tinh diem nao
        const store = await this.storeModel.findOne({ where: { id: storeId } })

        //get promotion
        const bronzePromotion = await this.promotionModel.findOne({ where : { rankId : bronzeRank.id, storeId : storeId}})
        const silverPromotion = await this.promotionModel.findOne({ where : { rankId : silverRank.id, storeId : storeId}})
        const goldPromotion = await this.promotionModel.findOne({ where : { rankId : goldRank.id, storeId : storeId}})
        
        switch (store.calculatePointType) {
            case 'Default':
                switch (userRank) {
                    case bronzeRank.id.toString():
                        if (totalMoney > store.miniumMoney) {
                            // tong diem                         
                            const totalPoint = newUser.point + bronzePromotion.pointBonus
                            await this.userModel.update({
                                point: totalPoint
                            }, { where: { id: userId } })

                            await this.orderModel.create({
                                storeId : storeId,
                                userId : userId,
                                totalMoney : totalMoney,
                                totalPoint : bronzePromotion.pointBonus
                            })
                        }
                        break;
                    case silverRank.id.toString():
                        if (totalMoney > store.miniumMoney) {
                            // tong diem
                            const totalpoint = newUser.point + silverPromotion.pointBonus
                            await this.userModel.update({
                                point: totalpoint
                            }, { where: { id: userId } })

                            await this.orderModel.create({
                                storeId : storeId,
                                userId : userId,
                                totalMoney : totalMoney,
                                totalPoint : silverPromotion.pointBonus
                            })
                        }
                        break;
                    case goldRank.id.toString():
                        if (totalMoney > store.miniumMoney) {
                            // tong diem
                            const totalpoint = newUser.point + goldPromotion.pointBonus
                            await this.userModel.update({
                                point: totalpoint
                            }, { where: { id: userId } })

                            await this.orderModel.create({
                                storeId : storeId,
                                userId : userId,
                                totalMoney : totalMoney,
                                totalPoint : goldPromotion.pointBonus
                            })
                        }
                        break;
                }
            break;
            case 'Discount':
                switch(userRank){
                    case bronzeRank.id.toString():
                        if(totalMoney > store.miniumMoney){
                            //tinh so diem nhan duoc
                            const expectedPoint = (totalMoney * bronzePromotion.discountRate)/100
                            let actualPoint = 0
                            if(expectedPoint > bronzePromotion.maxPoint){
                                actualPoint = bronzePromotion.maxPoint
                            } else {
                                actualPoint = expectedPoint
                            }
                            const totalPoint = newUser.point + actualPoint
                            // luu vao db
                            await this.userModel.update({
                                point : totalPoint
                            },{where : {id : userId}})

                            await this.orderModel.create({
                                storeId : storeId,
                                userId : userId,
                                totalMoney : totalMoney,
                                totalPoint : actualPoint
                            })

                        }
                    break;
                    case silverRank.id.toString():
                        if(totalMoney > store.miniumMoney){
                            //tinh so diem nhan duoc
                            const expectedPoint = (totalMoney * silverPromotion.discountRate)/100
                            let actualPoint = 0
                            if(expectedPoint > silverPromotion.maxPoint){
                                actualPoint = silverPromotion.maxPoint
                            } else {
                                actualPoint = expectedPoint
                            }
                            let totalPoint = newUser.point + actualPoint
                            // luu vao db
                            await this.userModel.update({
                                point : totalPoint
                            },{where : {id : userId}})

                            await this.orderModel.create({
                                storeId : storeId,
                                userId : userId,
                                totalMoney : totalMoney,
                                totalPoint : actualPoint
                            })
                        }    
                    break;
                    case goldRank.id.toString():
                        if(totalMoney > store.miniumMoney){
                            //tinh so diem nhan duoc
                            let expectedPoint = (totalMoney * goldPromotion.discountRate)/100
                            let actualPoint = 0
                            if(expectedPoint > goldPromotion.maxPoint){
                                actualPoint = goldPromotion.maxPoint
                            } else {
                                actualPoint = expectedPoint
                            }
                            let totalPoint = newUser.point + actualPoint
                            // luu vao db
                            await this.userModel.update({
                                point : totalPoint
                            },{where : {id : userId}})

                            await this.orderModel.create({
                                storeId : storeId,
                                userId : userId,
                                totalMoney : totalMoney,
                                totalPoint : actualPoint
                            })
                        }
                    break;   
                }
            break;
        }
    }

    
}