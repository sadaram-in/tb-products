import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IProductPricingRepository } from 'src/modules/product-pricing/domain/ports/product-pricing.repository';

@Injectable()
export class UpdateIsActiveCron {
  constructor(
    private readonly productPricingRepository: IProductPricingRepository,
  ) {}

  @Cron(CronExpression.EVERY_SECOND)
  async handleCron() {
    const currentDate = new Date();
    await this.productPricingRepository.updateIsActive(currentDate);
  }
}
