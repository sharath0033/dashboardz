import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { urlencoded, json } from 'express';
import * as compression from 'compression';

import { AppModule } from './app.module';
import { AppLogger, RequestIdMiddleware } from './common';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const URL = `http://localhost:${PORT}/api`;
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');
  app.use(compression());
  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({
    extended: false,
    limit: '5mb',
    parameterLimit: 50000
  }));
  app.useLogger(new AppLogger());
  app.use(RequestIdMiddleware);

  /**
   * Swagger API documentation setup
   */
  const config = new DocumentBuilder()
    .setTitle('Highlevel Services')
    .setDescription('The Highlevel Services API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT);
  console.log(`App listening on: ${URL}`);
  console.log(`Swagger Docs: ${URL}/docs`);
}
bootstrap();