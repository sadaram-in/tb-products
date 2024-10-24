import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Discount } from '../../domain/discount';
import { GetDiscountsQuery } from './get-discount.query';
import { IDiscountRepository } from '../../domain/ports/discount.repository';

@QueryHandler(GetDiscountsQuery)
export class GetDiscountsQueryHandler
  implements IQueryHandler<GetDiscountsQuery, Discount[]>
{
  constructor(private readonly discountRepository: IDiscountRepository) {}
  async execute(query: GetDiscountsQuery): Promise<Discount[]> {
    return this.discountRepository.findAll();
  }
}
