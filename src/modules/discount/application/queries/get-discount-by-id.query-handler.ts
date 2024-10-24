import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Discount } from '../../domain/discount';
import { GetDiscountByIdQuery } from './get-discount-by-id.query';
import { IDiscountRepository } from '../../domain/ports/discount.repository';

@QueryHandler(GetDiscountByIdQuery)
export class GetDiscountByIdQueryHandler
  implements IQueryHandler<GetDiscountByIdQuery, Discount>
{
  constructor(private readonly discountRepository: IDiscountRepository) {}

  async execute(query: GetDiscountByIdQuery): Promise<Discount> {
    try {
      const discount = await this.discountRepository.findOne(query.id);
      console.log(discount);
      if (!discount) {
        return null;
      }
      return discount;
    } catch (error) {
      return null;
    }
  }
}
