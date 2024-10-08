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


@Module({
  imports: [
    CqrsModule.forRoot(),
    HealthModule,
    ProductsModule,
    ProductPricingModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot(),
    CoreModule.forRootAsync(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
