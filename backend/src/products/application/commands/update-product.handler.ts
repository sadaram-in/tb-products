import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  ProductPricing,
  PricingTier,
} from 'src/products/domain/entities/product-pricing.entity';
import {
  Product,
  ProductType,
} from 'src/products/domain/entities/product.entity';
import {
  SubscriptionTerms,
  TermUnit,
  BillingFrequency,
} from 'src/products/domain/entities/subscription-terms.entity';
import { ProductRepositoryPort } from '../ports/product.repository.port';
import { UpdateProductCommand } from './update-product.command';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    @Inject('ProductRepositoryPort')
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  async execute(command: UpdateProductCommand): Promise<Product> {
    const pricing = command.pricing.map(
      (p) =>
        new ProductPricing(
          p.id,
          undefined,
          p.price,
          p.currency,
          p.tierType as PricingTier,
          true,
          p.validFrom,
          p.validTo,
        ),
    );

    const terms = command.terms.map(
      (t) =>
        new SubscriptionTerms(
          t.id,
          undefined,
          t.termPeriod,
          t.termUom as TermUnit,
          t.trialPeriodDays || null,
          t.billingFrequency as BillingFrequency,
          null,
        ),
    );

    const product = new Product(
      command.id,
      command.businessId,
      command.name,
      command.description,
      {},
      command.type as ProductType,
      command.startDate,
      command.endDate,
      pricing,
      terms,
    );

    return this.productRepository.update(command.id, product);
  }
}
