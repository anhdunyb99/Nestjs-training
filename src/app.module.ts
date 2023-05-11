import { Module , NestModule , MiddlewareConsumer} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/middleware';
import { UsersController } from './users/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://anhdunyb99:dungdeptrai123@cluster0.wmkapkg.mongodb.net/?retryWrites=true&w=majority`),
    
    UserModule , AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware) // neu muon them middleware thi bo sung vao day
    .exclude('/auth/register','/auth/login')
    .forRoutes('*');


    /* consumer.apply(AuthMiddleware) // neu muon them middleware thi bo sung vao day
    .exclude('/auth/register','/auth/login')
    .forRoutes('*'); */
  }

  
}
