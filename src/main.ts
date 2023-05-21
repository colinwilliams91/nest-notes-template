import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // <-- to access underlying platform API
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

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
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // <-- transforms DTOs properties datatypes to intended types (defaults transfer as Strings if not)
      whitelist: true, // <-- disallow users entering invalid properties to DTOs (invalid will be stripped/removed)
      forbidNonWhitelisted: true, // <-- disallows users by _stopping_ Payload process (throws error)
      transformOptions: {
        enableImplicitConversion: true, // <-- converts DTO datatypes from string to implied types globally (risk performance)
      },
    }),
  ); // <-- enforces validation rules for all incoming client Payloads automatically (body shapes)

  // app.useStaticAssets(join(__dirname, '..', 'public')); // <-- for shared image/static assets
  // app.setBaseViewsDir(join(__dirname, '..', 'views')); // <-- for `index.html` / views (components?)
  // app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
