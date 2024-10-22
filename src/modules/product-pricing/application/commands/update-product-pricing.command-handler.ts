import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductPricingCommand } from './update-product-pricing.command';
import { IProductPricingRepository } from '../../domain/ports/product-pricing.repository';
import { ProductPricing } from '../../domain/product-pricing';
import { ProductPricingFactory } from '../../domain/factories/product-pricing.factory';

@CommandHandler(UpdateProductPricingCommand)
export class UpdateProductPricingCommandHandler
  implements ICommandHandler<UpdateProductPricingCommand>
{
  constructor(
    private readonly productPricingRepository: IProductPricingRepository,
    private readonly productPricingFactory: ProductPricingFactory,
  ) {}

  async execute(command: UpdateProductPricingCommand): Promise<ProductPricing> {
    const {
      product_id,
      price,
      currency,
      start_date,
      end_date,
      eol_date,
      term,
    } = command;

    const getPreviousDay = (date: Date): Date => {
      const previousDay = new Date(date);
      previousDay.setDate(previousDay.getDate() - 1);
      return previousDay;
    };

    const getNextDay = (date: Date): Date => {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
    };

    const MIN_DATE = new Date('1000-01-01');
    const MAX_DATE = new Date('9999-12-31');

    // Find affected pricings for overlap scenarios
    const affectedPricings = await this.productPricingRepository.findByCommand(
      product_id,
      MIN_DATE,
      MAX_DATE,
      true,
    );

    if (!affectedPricings) {
      throw new Error('Unable to retrieve affected pricings.');
    }
    // console.log('affectedPricings', affectedPricings);
    // Case 1: Fully overlap
    for (const pricing of affectedPricings) {
      if (start_date >= pricing.start_date && end_date <= pricing.end_date) {
        const leftPricing = this.productPricingFactory.create({
          product_id: pricing.product_id,
          price: pricing.price,
          currency: pricing.currency,
          start_date: pricing.start_date,
          end_date: getPreviousDay(start_date),
          is_active: true,
          eol_date: pricing.eol_date,
          term: pricing.term,
        });
        console.log('leftPricing', leftPricing);
        await this.productPricingRepository.save(leftPricing);

        const rightPricing = this.productPricingFactory.create({
          product_id: pricing.product_id,
          price: pricing.price,
          currency: pricing.currency,
          start_date: getNextDay(end_date),
          end_date: pricing.end_date,
          is_active: true,
          eol_date: pricing.eol_date,
          term: pricing.term,
        });
        console.log('rightPricing', rightPricing);
        await this.productPricingRepository.save(rightPricing);

        await this.productPricingRepository.delete(pricing.id);

        const newPricing = this.productPricingFactory.create({
          product_id,
          price,
          currency,
          start_date,
          end_date,
          is_active: true,
          eol_date,
          term,
        });
        return await this.productPricingRepository.save(newPricing);
      }
    }
    if (!affectedPricings || affectedPricings.length === 0) {
      throw new Error('Unable to retrieve pricings for this product.');
    }

    // Case 2: No affected pricings or all affected

    if (start_date < affectedPricings[0]?.start_date) {
      const newPricing = this.productPricingFactory.create({
        product_id,
        price,
        currency,
        start_date,
        end_date: getPreviousDay(affectedPricings[0].start_date),
        is_active: true,
        eol_date,
        term,
      });
      return await this.productPricingRepository.save(newPricing);
    }
    if (end_date > affectedPricings[affectedPricings.length - 1]?.end_date) {
      const lastPricing = affectedPricings[affectedPricings.length - 1];
      if (lastPricing) {
        lastPricing.end_date = getPreviousDay(start_date);
        await this.productPricingRepository.save(lastPricing);
      }

      const newPricing = this.productPricingFactory.create({
        product_id,
        price,
        currency,
        start_date,
        end_date,
        is_active: true,
        eol_date,
        term,
      });
      return await this.productPricingRepository.save(newPricing);
    }

    // Case 3: Partial overlap (left and right adjustments)
    const leftPricings = await this.productPricingRepository.findByCommand(
      product_id,
      MIN_DATE,
      start_date,
      true,
    );

    if (leftPricings.length > 0) {
      const leftmostPricing = leftPricings[leftPricings.length - 1];
      leftmostPricing.end_date = getPreviousDay(start_date);
      await this.productPricingRepository.save(leftmostPricing);
    }

    const rightPricings = await this.productPricingRepository.findByCommand(
      product_id,
      start_date,
      MAX_DATE,
      true,
    );

    if (rightPricings.length > 0) {
      const rightmostPricing = rightPricings[0];
      rightmostPricing.start_date = getNextDay(end_date);
      await this.productPricingRepository.save(rightmostPricing);
    }

    // Create new pricing for the specified range
    const newPricing = this.productPricingFactory.create({
      product_id,
      price,
      currency,
      start_date,
      end_date,
      is_active: true,
      eol_date,
      term,
    });
    return await this.productPricingRepository.save(newPricing);
  }
}
