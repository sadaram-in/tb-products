import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const swaggerProtection = {
    route: configService.get('SWAGGER_ROUTE'),
    password: configService.get('SWAGGER_PASSWORD'),
  };
  app.use(
    [swaggerProtection.route],
    basicAuth({
      challenge: true,
      users: {
        admin: swaggerProtection.password,
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
    .addTag('App', 'App endpoints')
    .addTag('Products', 'Product management')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'bearer',
    )
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
        description: 'API key for authentication',
      },
      'x-api-key',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  //const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerProtection.route, app, document);
  const port = configService.get('PORT') || 3000;
  console.log(`Products api is running on port ${port}`);
  await app.listen(port);
}

bootstrap();
