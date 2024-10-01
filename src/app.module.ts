import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './shared/health/health.module';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/database/database.module';
import { ProductPricingController } from './product-pricing/product-pricing.controller';
import { ProductModule } from './product/product.module';
import { ProductPricingModule } from './product-pricing/product-pricing.module';
import { ProductsController } from './product/product.controller';

@Module({
  imports: [
    HealthModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot(),
    ProductPricingModule,
    ProductModule,
  ],
  controllers: [AppController, ProductPricingController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
