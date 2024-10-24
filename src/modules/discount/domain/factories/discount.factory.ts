import { DiscountEntity } from '../../infrastructure/persistance/orm/entities/discount.entities';
import { CreateDiscountDto } from '../../presentation/http/dto/create-discount.dto';

export class DiscountFactory {
  create(createDiscountDto: CreateDiscountDto): DiscountEntity {
    const { discount_type, percentage, start_date, end_date } =
      createDiscountDto;

    const discount = new DiscountEntity();
    discount.discount_type = discount_type;
    discount.percentage = percentage;
    discount.start_date = start_date;
    discount.end_date = end_date;

    return discount;
  }
}
