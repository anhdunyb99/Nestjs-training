import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Lấy thông tin về request
    const request = context.switchToHttp().getRequest();
    /* console.log('request',request); */
    
    // Kiểm tra quyền của người dùng

    // neu hop le thi return true

    return true
  }
}
