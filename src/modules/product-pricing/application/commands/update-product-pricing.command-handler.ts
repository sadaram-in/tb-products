import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductPricingCommand } from './update-product-pricing.command';
import { IProductPricingRepository } from '../../domain/ports/product-pricing.repository';
import { ProductPricing } from '../../domain/product-pricing';
import { ProductPricingFactory } from '../../domain/factories/product-pricing.factory';
import { ProductPricingEntity } from '../../infrastructure/persistance/orm/entities/product-pricing.entities';

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

    const affectedPricings = await this.productPricingRepository.findByCommand(
      product_id,
      start_date,
      end_date,
      true,
    );
    console.log('affectedPricings', affectedPricings);

    const numberOfRecords = (
      await this.productPricingRepository.findByCommand(
        product_id,
        MIN_DATE,
        MAX_DATE,
        true,
      )
    ).length;

    console.log(
      'numberOfRecords',
      numberOfRecords,
      'number of affected',
      affectedPricings.length,
    );

    if (
      affectedPricings.length === 0 ||
      affectedPricings.length === numberOfRecords
    ) {
      const allPricingsOfSameProduct =
        await this.productPricingRepository.findByCommand(
          product_id,
          MIN_DATE,
          MAX_DATE,
          true,
        );
      console.log('allPricingsOfSameProduct', allPricingsOfSameProduct);
      if (start_date < allPricingsOfSameProduct[0].start_date) {
        const productPricing = this.productPricingFactory.create({
          product_id,
          price,
          currency,
          start_date,
          end_date: new Date(
            getPreviousDay(allPricingsOfSameProduct[0].start_date),
          ),
          is_active: true,
          eol_date,
          term,
        });
        return await this.productPricingRepository.save(productPricing);
      } else {
        const changeRecord =
          allPricingsOfSameProduct[allPricingsOfSameProduct.length - 1];
        changeRecord.end_date = getPreviousDay(start_date);
        await this.productPricingRepository.save(changeRecord);

        const productPricing = this.productPricingFactory.create({
          product_id,
          price,
          currency,
          start_date,
          end_date,
          is_active: true,
          eol_date,
          term,
        });
        return await this.productPricingRepository.save(productPricing);
      }
    }

    const leftPricings = await this.productPricingRepository.findByCommand(
      product_id,
      new Date('1000-01-01'),
      start_date,
      true,
    );

    console.log('leftPricings', leftPricings);
    if (leftPricings.length > 0) {
      const leftmostPricing = leftPricings[leftPricings.length - 1];
      leftmostPricing.end_date = getPreviousDay(start_date);
      await this.productPricingRepository.save(leftmostPricing);
    }

    const rightPricings = await this.productPricingRepository.findByCommand(
      product_id,
      start_date,
      new Date('9999-12-31'),
      true,
    );
    console.log('rightPricings', rightPricings);

    if (rightPricings.length > 0) {
      const rightmostPricing = rightPricings[0];
      rightmostPricing.start_date = getNextDay(end_date);
      await this.productPricingRepository.save(rightmostPricing);
    }

    const productPricing = this.productPricingFactory.create({
      product_id,
      price,
      currency,
      start_date,
      end_date,
      is_active: true,
      eol_date,
      term,
    });
    return await this.productPricingRepository.save(productPricing);
  }
}
