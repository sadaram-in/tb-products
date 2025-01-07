import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ProductRepositoryPort } from '../ports/product.repository.port';
import { Product, ProductType } from '../../domain/entities/product.entity';
import {
  ProductPricing,
  PricingTier,
} from '../../domain/entities/product-pricing.entity';
import {
  SubscriptionTerms,
  TermUnit,
  BillingFrequency,
} from '../../domain/entities/subscription-terms.entity';
import { CreateProductCommand } from './create-product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @Inject('ProductRepositoryPort')
    private readonly productRepository: ProductRepositoryPort,
  ) {}

  async execute(command: CreateProductCommand): Promise<Product> {
    const pricing = command.pricing.map(
      (p) =>
        new ProductPricing(
          undefined,
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
          undefined,
          undefined,
          t.termPeriod,
          t.termUom as TermUnit,
          t.trialPeriodDays || null,
          t.billingFrequency as BillingFrequency,
          null,
        ),
    );

    const product = new Product(
      undefined,
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

    return this.productRepository.save(product);
  }
}
