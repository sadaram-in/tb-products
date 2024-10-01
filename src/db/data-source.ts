import { DataSource } from 'typeorm';
import { Product } from '../products/products.entity';
import { ProductPricing } from '../product-pricing/product-pricing.entity'; 
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Product, ProductPricing],
  synchronize: false,
  migrations: ['src/migrations/*.ts'],
});
