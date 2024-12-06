import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(
    ['/api'],
    basicAuth({
      challenge: true,
      users: {
        admin: 'tbtextbuztb',
      },
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: configService.get('API_VERSION'),
    prefix: 'v',
  });

  const config = new DocumentBuilder()
    .setTitle(configService.get('APP_NAME'))
    .setDescription(configService.get('APP_DESCRIPTION'))
    .setVersion(configService.get('API_VERSION'))
    .addTag('App', 'App management endpoints')
    .addTag('Products', 'Product management')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1.0/api', app, document);
  const port = configService.get('PORT') || 3000;
  console.log(`Products api is running on port ${port}`);
  await app.listen(port);
}

bootstrap();
