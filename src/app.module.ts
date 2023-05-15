import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/middleware';
import { UsersController } from './users/users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user'
import { BullModule } from '@nestjs/bull';
import { SendEmailWorker } from './bull/test-worker';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: "",
      database: 'db_nestjs',
      models: [User],
    }), BullModule.registerQueue({
      name: 'send-email',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    })
    , UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService , SendEmailWorker],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware) // neu muon them middleware thi bo sung vao day
      .exclude('/auth/register', '/auth/login')
      .forRoutes('*');


    /* consumer.apply(AuthMiddleware) // neu muon them middleware thi bo sung vao day
    .exclude('/auth/register','/auth/login')
    .forRoutes('*'); */
  }


}
