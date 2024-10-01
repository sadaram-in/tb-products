import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './shared/health/health.module';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HealthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
