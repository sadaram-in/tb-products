import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './shared/health/health.module';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductsModule } from './modules/products/application/products.module';
import { ProductPricingModule } from './modules/product-pricing/application/product-pricing.module';
import { DatabaseModule } from './shared/database/database.module';
import { ResponseService } from './shared/response/response.service';
import { ProductTermModule } from './modules/product-term/application/product-term.module';

@Module({
  imports: [
    CqrsModule.forRoot(),
    HealthModule,
    DatabaseModule,
    ProductsModule,
    ProductPricingModule,
    ProductTermModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot(),
    CoreModule.forRootAsync(),
  ],
  controllers: [AppController],
  providers: [AppService, ResponseService],
})
export class AppModule {}
