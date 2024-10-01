import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule,
    TerminusModule.forRoot({
      logger: false,
    }),
    HttpModule,
  ],
  controllers: [HealthController],
})
export class HealthModule {}
