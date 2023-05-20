import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // <-- to access underlying platform API
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

  app.useStaticAssets(join(__dirname, '..', 'public')); // <-- for shared image/static assets
  app.setBaseViewsDir(join(__dirname, '..', 'views')); // <-- for `index.html` / views (components?)
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
