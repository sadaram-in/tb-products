import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DiscountType } from '../../domain/discount-type';
import { GetDiscountTypeByIdQuery } from './get-discount-type-by-id.query';
import { IDiscountTypeRepository } from '../../domain/ports/discount-type.repository';

@QueryHandler(GetDiscountTypeByIdQuery)
export class GetDiscountTypeByIdQueryHandler
  implements IQueryHandler<GetDiscountTypeByIdQuery, DiscountType>
{ 
  constructor(private readonly discountTypeRepository: IDiscountTypeRepository) {}

  async execute(query: GetDiscountTypeByIdQuery): Promise<DiscountType> {
    try {
      const discountType = await this.discountTypeRepository.findOne(query.id);
      console.log(discountType);
      if (!discountType) {
        return null;
      }
      return discountType;
    } catch (error) {
      return null;
    }
  }
}
