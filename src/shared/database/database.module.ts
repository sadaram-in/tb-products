// src/database/database.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPricing } from 'src/product-pricing/product-pricing.entity';
import { Products } from 'src/product/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      entities: [Products, ProductPricing],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
