import { DiscountType } from '../../../../domain/discount-type';
import { DiscountTypeEntity } from '../entities/discount-type.entities';
export class DiscountTypeMapper {
  static toDomain(discountEntity: DiscountTypeEntity): DiscountType {
    const discountModel = new DiscountType(
      discountEntity.id,
      discountEntity.type,
      discountEntity.created_at,
      discountEntity.updated_at,
    );
    return discountModel;
  }

  static toPersistence(discount: DiscountType) {
    const entity = new DiscountTypeEntity();
    entity.id = discount.id;
    entity.type = discount.type;
    entity.created_at = discount.created_at;
    entity.updated_at = discount.updated_at;
    return entity;
  }
}
