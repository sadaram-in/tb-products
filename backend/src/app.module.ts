import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './utils/health/health.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductModule } from './products/product.module';
import { LoggingInterceptor } from './utils/logging/logging.interceptor';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/config.service';
import { LoggingModule } from './utils/logging/logging.module';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { AuthModule } from './auth/auth.module';
import { ExternalJwtGuard } from './common/guards/external-jwt.guard';

@Module({
  imports: [
    AppConfigModule,
    LoggingModule,
    AuthModule,
    CqrsModule.forRoot(),
    HealthModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (configService: AppConfigService) => ({
        ...configService.databaseConfig,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
      inject: [AppConfigService],
    }),
    ProductModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ExternalJwtGuard,
    },
    AppService,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
