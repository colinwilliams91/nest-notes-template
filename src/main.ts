import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // <-- to access underlying platform API

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // <-- Type allows exclusive Express methods
  await app.listen(3000);
}
bootstrap();
