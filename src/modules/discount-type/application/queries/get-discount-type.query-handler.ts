import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DiscountType } from '../../domain/discount-type';
import { GetDiscountTypeQuery } from './get-discount-type.query';
import { IDiscountTypeRepository } from '../../domain/ports/discount-type.repository';

@QueryHandler(GetDiscountTypeQuery)
export class GetDiscountTypeQueryHandler
  implements IQueryHandler<GetDiscountTypeQuery, DiscountType[]>
{
  constructor(private readonly discountTypeRepository: IDiscountTypeRepository) {}
  async execute(query: GetDiscountTypeQuery): Promise<DiscountType[]> {
    return this.discountTypeRepository.findAll();
  }
}
