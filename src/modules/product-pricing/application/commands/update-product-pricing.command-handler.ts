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

    const affectedPricings = await this.productPricingRepository.findByCommand(
      product_id,
      start_date,
      end_date,
      true,
    );
    console.log(affectedPricings);

    if (affectedPricings.length === 0) {
      const affectedPricings =
        await this.productPricingRepository.findByCommand(
          product_id,
          new Date('1000-01-01'),
          new Date('9999-12-31'),
          true,
        );
      const changePrice = affectedPricings[affectedPricings.length - 1];
      changePrice.end_date = getPreviousDay(start_date);
      
      await this.productPricingRepository.save(changePrice);

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
    

    // if (start_date < affectedPricings[0].start_date) {
    //   const earlierPricing = await this.productPricingRepository.findByCommand(
    //     product_id,
    //     start_date,
    //     affectedPricings[0].start_date,
    //     false,
    //   );      

    //   for (let i = 0; i < earlierPricing.length; i++) {
    //     const current = earlierPricing[i];

    //     if (current) {
    //       const productPricing = new ProductPricingEntity();

    //       productPricing.id = current.id;
    //       productPricing.product_id = current.product_id;
    //       productPricing.price = current.price;
    //       productPricing.currency = current.currency;
    //       productPricing.is_active = true;
    //       productPricing.start_date = current.start_date;
    //       productPricing.end_date = getPreviousDay(start_date);
    //       productPricing.eol_date = current.eol_date;
    //       productPricing.term = current.term;
    //       await this.productPricingRepository.save(productPricing);
    //     }
    //   }
    // }

    // for (let i = 0; i < affectedPricings.length; i++) {
    //   const current = affectedPricings[i];

    //   if (i === 0 && start_date > current.start_date) {
    //     // Split the first record if necessary

    //     const productPricing = new ProductPricingEntity();

    //     productPricing.id = current.id;
    //     productPricing.product_id = current.product_id;
    //     productPricing.price = current.price;
    //     productPricing.currency = current.currency;
    //     productPricing.is_active = false;
    //     productPricing.start_date = current.start_date;
    //     productPricing.end_date = getPreviousDay(start_date);
    //     productPricing.eol_date = current.eol_date;
    //     productPricing.term = current.term;
    //     await this.productPricingRepository.save(productPricing);

    //     const newSplit = this.productPricingFactory.create({
    //       ...current,
    //       start_date: start_date,
    //       end_date: current.end_date,
    //     });
    //     await this.productPricingRepository.save(newSplit);
    //   }

    //   if (i === affectedPricings.length - 1 && end_date < current.end_date) {
    //     // Split the last record if necessary
    //     const productPricing = new ProductPricingEntity();

    //     productPricing.id = current.id;
    //     productPricing.start_date = getNextDay(end_date);

    //     const newSplit = this.productPricingFactory.create({
    //       ...current,
    //       start_date: current.start_date,
    //       end_date: end_date,
    //     });
    //     await this.productPricingRepository.save(newSplit);
    //   }

    //   // Update the record with new data
    //   await this.productPricingRepository.save({
    //     ...current,
    //     start_date: start_date,
    //     end_date: end_date,
    //   });
    // }

    // const lastAffected = affectedPricings[affectedPricings.length - 1];
    // if (end_date > lastAffected.end_date) {
    //   const laterPricing = await this.productPricingRepository.findByCommand(
    //     product_id,
    //     lastAffected.end_date,
    //     end_date,
    //     false,
    //   );
    //   if (laterPricing) {
    //     const productPricing = new ProductPricingEntity();

    //     productPricing.id = laterPricing[0].id;
    //     productPricing.start_date = getNextDay(end_date);
    //     await this.productPricingRepository.save(productPricing);
    //   }
    // }
  }
}
