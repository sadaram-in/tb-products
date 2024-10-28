import { DiscountType } from '../discount-type';

export abstract class IDiscountTypeRepository {
  abstract findAll(): Promise<DiscountType[]>;
  abstract findOne(id: string): Promise<DiscountType>;
  abstract save(discountType: DiscountType): Promise<DiscountType>;
  abstract delete(id: string): Promise<void>;
}
