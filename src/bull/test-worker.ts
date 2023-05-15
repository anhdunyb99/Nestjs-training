// src/workers/send-email.worker.ts
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import sendEmail from './test-bull'

@Processor('send-email')
export class SendEmailWorker {
  @Process()
  async sendEmailJob(job: Job) {
    await sendEmail(job);
  }
}
