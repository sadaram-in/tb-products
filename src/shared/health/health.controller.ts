import { Controller, Get, Injectable, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Controller({ path: 'health', version: VERSION_NEUTRAL })
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private readonly configService: ConfigService,
  ) {}

  @Get('/liveness')
  @HealthCheck()
  checkLiveness() {
    const port = this.configService.get('PORT');
    return this.health.check([
      () =>
        this.http.pingCheck(
          this.configService.get('APP_NAME'),
          `http://localhost:${port}`,
        ),
    ]);
  }
  @Get('/readiness')
  @HealthCheck()
  checkReadiness() {
    const port = this.configService.get('PORT');
    return this.health.check([
      () =>
        this.http.pingCheck(
          this.configService.get('APP_NAME'),
          `http://localhost:${port}`,
        ),
    ]);
  }
}
