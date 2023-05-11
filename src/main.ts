import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3000
  await app.listen(PORT, () => {
    console.log(`app listening on ${PORT}`);
  });
  dotenv.config()
}
bootstrap();
