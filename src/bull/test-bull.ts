// src/jobs/send-email.job.ts
import { Job } from 'bull';

export default async (job: Job) => {
  console.log('Job data:', job.data);
  console.log('Sending email...');
}
