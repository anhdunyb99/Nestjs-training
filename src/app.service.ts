import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return [{
      name: 'du', age: 12
    },
    { name: 'hai', age: 14 }
    ]
  }
}
