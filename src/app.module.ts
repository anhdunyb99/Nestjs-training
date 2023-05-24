import { Module , NestModule , MiddlewareConsumer} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { AuthModule } from './admin/admin.module';
import { StoreModule } from './store/store.module';
import { AuthMiddleware } from './middleware/middleware';
import { SequelizeModule } from '@nestjs/sequelize';
import { User} from './models/user'
import { Store } from './models/store';
import { Order } from './models/order';
import { Reward } from './models/reward';
import { UserReward } from './models/userreward';
import { Admin } from './models/admin';
import { RewardModule } from './reward/reward.module';
import { OrderModule } from './order/order.module';
import { Promotion } from './models/promotion';
import { Rank } from './models/rank';
import { RankModule } from './rank/rank.module';
@Module({
  imports: [
      SequelizeModule.forRoot({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: "",
        database: 'db_nestjs',
        models: [User,Store,Order,Reward,UserReward,Admin,Promotion,Rank],
      })   
    ,UserModule , AuthModule,StoreModule,RewardModule,OrderModule,RankModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {
  
}


