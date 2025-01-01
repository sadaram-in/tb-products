// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import { ExternalJwtGuard } from '../common/guards/external-jwt.guard';
import { TokenValidationService } from '../common/services/token-validation.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      // We only need the JWT module for decoding, not signing
      // No secret needed as we're only decoding tokens
    }),
  ],
  providers: [TokenValidationService, ApiKeyGuard, ExternalJwtGuard],
  exports: [TokenValidationService, ApiKeyGuard, ExternalJwtGuard, JwtModule],
})
export class AuthModule {}
