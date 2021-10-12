import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeSwaggerJson } from './utils/swagger';

declare const module: any;

async function bootstrap() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
  console.log(process.env.MONGODB_URL);
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('CTinyURL API')
    .setDescription('demo tiny url.')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('tinyurl')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  writeSwaggerJson('./', document);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
