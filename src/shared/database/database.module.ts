// src/database/database.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPricing } from 'src/product-pricing/product-pricing.entity';
import { Products } from 'src/product/product.entity';

import * as dotenv from 'dotenv';
dotenv.config();


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: (process.env.DB_TYPE as any) || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME || 'postgres',
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      entities: [Products, ProductPricing],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
