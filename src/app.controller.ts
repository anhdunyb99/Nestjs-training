import { Controller, Get , Param , Request , Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('admin')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users/:id')
  getHello(@Param() params : any,@Response() res : any) {
    let data = this.appService.getHello()
    if(params)
    res.json({
      success : true,
      message : 'hello',
      data : data
    })
    
  }
}


