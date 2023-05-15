import { Controller, Get, Param, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
@Controller('admin')
export class AppController {
  constructor(private readonly appService: AppService,
    @InjectQueue('send-email') private sendEmailQueue: Queue
  ) { }

  /* @Get('/users/:id')
  getHello(@Param() params: any, @Response() res: any) {
    let data = this.appService.getHello()
    if (params)
      res.json({
        success: true,
        message: 'hello',
        data: data
      })

  } */

  @Get()
  async sendEmail() {
    await this.sendEmailQueue.add({
      to: 'example@gmail.com',
      subject: 'Hello from NestJS and BullJS',
      body: 'This is a test email from NestJS and BullJS',
    });
  }
}


