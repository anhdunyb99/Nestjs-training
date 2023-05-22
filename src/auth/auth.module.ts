import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user';
import { Store } from 'src/models/store';
import { SmsService } from '../custom-service/twilio.service';
import { Admin } from 'src/models/admin';
@Module({
  imports: [SequelizeModule.forFeature([User,Store,Admin])],
  controllers: [AuthController],
  providers: [AuthService , SmsService],
  
})
export class AuthModule {}
