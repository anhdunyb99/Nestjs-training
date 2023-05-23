import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user';
import { Store } from 'src/models/store';
import { Admin } from 'src/models/admin';
dotenv.config()

@Injectable()
export class UserPermissionGuard implements CanActivate {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    // Lấy thông tin về request
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

    // check user co ton tai khong
    const condition = await this.userModel.findByPk(decoded.userId)
    request['user'] = decoded
   
    
    if(condition){
      return true
    } else {
      return false
    }

  }
}

export class StorePermissionGuard implements CanActivate {
  constructor(
    @InjectModel(Store)
    private readonly storeModel: typeof Store,
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    // Lấy thông tin về request
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
    
    
    // check user co ton tai khong
    const condition = await this.storeModel.findByPk(decoded.storeId)
    request['store'] = decoded
    if(condition){
      return true
    } else {
      return false
    }
    
  }
}

export class AdminPermissionGuard implements CanActivate {
  constructor(
    @InjectModel(Admin)
    private readonly adminModel: typeof Admin,
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    // Lấy thông tin về request
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
    console.log(decoded);
    
    // check user co ton tai khong
    const condition = await this.adminModel.findByPk(decoded.adminId)

    if(condition){
      return true
    } else {
      return false
    }
    
  }
}


