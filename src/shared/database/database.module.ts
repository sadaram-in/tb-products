import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPricingEntity } from 'src/modules/product-pricing/infrastructure/persistance/orm/entities/product-pricing.entities';
import { ProductEntity } from 'src/modules/products/infrastructure/persistance/orm/entities/product.entities';
import { ProductTermEntity } from 'src/modules/product-term/infrastructure/persistance/orm/entities/product-term.entities';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DATABASE_TYPE') as 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        url: configService.get<string>('DATABASE_URL'),
        entities: [ProductEntity, ProductPricingEntity, ProductTermEntity],
        synchronize: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
