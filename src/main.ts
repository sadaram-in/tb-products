import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle(configService.get('APP_NAME'))
    .setDescription('Product API')
    .setVersion('1.0')
    .addTag('Products API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const port = configService.get('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
