import { DiscountTypeEntity } from '../../infrastructure/persistance/orm/entities/discount-type.entities';
import { CreateDiscountTypeDto } from '../../presentation/http/dto/create-discount-type.dto';

export class DiscountTypeFactory {
  create(createDiscountTypeDto: CreateDiscountTypeDto): DiscountTypeEntity {
    const { type } = createDiscountTypeDto;

    const discountType = new DiscountTypeEntity();
    discountType.type = type;
    return discountType;
  }
}
