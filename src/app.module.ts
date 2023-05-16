import { Module , NestModule , MiddlewareConsumer} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';
import { AuthMiddleware } from './middleware/middleware';
import { SequelizeModule } from '@nestjs/sequelize';
import { User} from './models/user'
import { Store } from './models/store';
import { Order } from './models/order';
@Module({
  imports: [
      SequelizeModule.forRoot({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: "",
        database: 'db_nestjs',
        models: [User,Store,Order],
      })   
    ,UserModule , AuthModule,StoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware) // neu muon them middleware thi bo sung vao day
    .exclude('/auth/register','/auth/login','/auth/send-otp/:id','/auth/verify-otp/:id')
    .forRoutes('*');


    /* consumer.apply(AuthMiddleware) // neu muon them middleware thi bo sung vao day
    .exclude('/auth/register','/auth/login')
    .forRoutes('*'); */
  }

  
}
