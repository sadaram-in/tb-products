import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller({ path: 'health' })
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private readonly configService: ConfigService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get('/liveness')
  @HealthCheck()
  checkLiveness() {
    const LIVENESS_CHECK_URL = this.configService.get('LIVENESS_CHECK_URL');
    console.log(
      `Health check on port ${this.configService.get('LIVENESS_CHECK_URL')}`,
    );
    return this.health.check([
      () =>
        this.http.pingCheck(
          this.configService.get('APP_NAME'),
          LIVENESS_CHECK_URL,
        ),
    ]);
  }

  @Get('/readiness')
  @HealthCheck()
  checkReadiness() {
    const READINESS_CHECK_URL = this.configService.get('READINESS_CHECK_URL');
    console.log(
      `Health check on port ${this.configService.get('READINESS_CHECK_URL')}`,
    );
    return this.health.check([
      () =>
        this.http.responseCheck(
          this.configService.get('APP_NAME'),
          `${READINESS_CHECK_URL}`,
          (res) => {
            return res.status === 200;
          },
        ),
      // () => this.db.pingCheck('database', { timeout: 2000 }),
    ]);
  }
}
