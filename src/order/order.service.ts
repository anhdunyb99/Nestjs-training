import { Injectable, UseFilters } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { HttpExceptionFilter } from "src/https/execption.filter";
import { Order } from "src/models/order";
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
    ) { }

    async getOrder() {
        console.log('123');
    }

    async createOrder(userId: string, storeId: string, totalMoney: number) {
        //check rank va update rank user
        const user = await this.userModel.findOne({ where: { id: userId } })
        const user_total_point = user.pointUsed1 + user.point
        console.log('user_total_point',user_total_point);
        
        if(user_total_point < 2000){
            await this.userModel.update({loyalType : 'Bronze'},{where : {id : userId}})
        } else if (user_total_point >= 2000 && user_total_point < 5000){         
            await this.userModel.update({loyalType : 'Silver'},{where : {id : userId}})
        } else {
            await this.userModel.update({loyalType : 'Gold'},{where : {id : userId}})
        }

        // get new rank
        const newUser = await this.userModel.findOne({ where: { id: userId } })
        const loyal_type = newUser.loyalType

        //Check xem store ap dung loai tinh diem nao
        const store = await this.storeModel.findOne({ where: { id: storeId } })
        const caculate_point_type = store.caculate_point_type
        
        switch (caculate_point_type) {
            case 'Default':
                switch (loyal_type) {
                    case 'Bronze':
                        if (totalMoney > store.minium_money) {
                            // tong diem
                            const totalpoint = newUser.point + store.bronze_default_point
                            await this.userModel.update({
                                point: totalpoint
                            }, { where: { id: userId } })

                            await this.orderModel.create({
                                storeId : storeId,
                                userId : userId,
                                totalMoney : totalMoney,
                                totalPoint : store.bronze_default_point
                            })
                        }
                        break;
                    case 'Silver':
                        if (totalMoney > store.minium_money) {
                            // tong diem
                            const totalpoint = newUser.point + store.silver_default_point
                            await this.userModel.update({
                                point: totalpoint
                            }, { where: { id: userId } })

                            await this.orderModel.create({
                                storeId : storeId,
                                userId : userId,
                                totalMoney : totalMoney,
                                totalPoint : store.silver_default_point
                            })
                        }
                        break;
                    case 'Gold':
                        if (totalMoney > store.minium_money) {
                            // tong diem
                            const totalpoint = newUser.point + store.gold_default_point
                            await this.userModel.update({
                                point: totalpoint
                            }, { where: { id: userId } })

                            await this.orderModel.create({
                                storeId : storeId,
                                userId : userId,
                                totalMoney : totalMoney,
                                totalPoint : store.gold_default_point
                            })
                        }
                        break;
                }
            break;
            case 'Discount':
                switch(loyal_type){
                    case 'Bronze':
                        if(totalMoney > store.minium_money){
                            //tinh so diem nhan duoc
                            const expectedPoint = (totalMoney * store.brozne_discount)/100
                            let actualPoint = 0
                            if(expectedPoint > store.bronze_max_point){
                                actualPoint = store.bronze_max_point
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
                    case 'Silver':
                        if(totalMoney > store.minium_money){
                            //tinh so diem nhan duoc
                            const expectedPoint = (totalMoney * store.silver_discount)/100
                            let actualPoint = 0
                            if(expectedPoint > store.silver_max_point){
                                actualPoint = store.silver_max_point
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
                    case 'Gold':
                        if(totalMoney > store.minium_money){
                            //tinh so diem nhan duoc
                            let expectedPoint = (totalMoney * store.gold_discount)/100
                            let actualPoint = 0
                            if(expectedPoint > store.gold_max_point){
                                actualPoint = store.gold_max_point
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