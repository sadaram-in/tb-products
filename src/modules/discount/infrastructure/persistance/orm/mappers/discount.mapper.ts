import { Discount } from '../../../../domain/discount';
import { DiscountEntity } from '../entities/discount.entities';
export class DiscountMapper {
  static toDomain(discountEntity: DiscountEntity): Discount {
      const discountModel = new Discount(
      discountEntity.id,
      discountEntity.discount_type,
      discountEntity.percentage,
      discountEntity.start_date,
      discountEntity.end_date,
    );
    return discountModel;
  }

  static toPersistence(discount: Discount) {
    const entity = new DiscountEntity();
    entity.id = discount.id;
    entity.discount_type = discount.discount_type;
    entity.percentage = discount.percentage;
    entity.start_date = discount.start_date;
    entity.end_date = discount.end_date;
    return entity;
  }
}
