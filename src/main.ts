import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // <-- to access underlying platform API

/*
 * the entry file of the application which uses the core function NestFactory to create a Nest application instance
 * below function exposes a few static methods allowing creation of application instance
 * the `create()` method returns an application object (fulfills the `INestApplication` interface)
 * starts up HTTP listener, application now awaiting inbound HTTP requests
 *
 * use --> `NestFactory.create(AppModule, { abortOnError: false })` <-- to throw error isntead of exiting
 *
 */

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // <-- Type allows exclusive Express methods
  await app.listen(3000);
}
bootstrap();
