// core.module.ts
import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({})
export class CoreModule {
  static forRootAsync(): DynamicModule {
    return {
      module: CoreModule,
      imports: [
        ConfigModule, 
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => {
            const driver = configService.get<'orm' | 'in-memory'>('DRIVER', 'orm');

            if (driver === 'orm') {
              return {
                         
                type: 'postgres',
                host: configService.get<string>('DATABASE_HOST'),
                port: configService.get<number>('DATABASE_PORT', 5432),
                username: configService.get<string>('DATABASE_USER'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                database: configService.get<string>('DATABASE_DB'),
                //Needed for supabase
                // ssl: {
                //   rejectUnauthorized: false, 
                // },
                // extra: {
                //   ssl: true,
                // },
                autoLoadEntities: true,
                synchronize: true, // Be cautious with this in production. TODO need to check what happens in production if its true
              };
            } else {
              // Handle 'in-memory' or other driver configurations
              return {};
            }
          },
          inject: [ConfigService],
        }),
      ],
    };
  }
}
