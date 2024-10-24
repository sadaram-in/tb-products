import { Discount } from '../discount';

export abstract class IDiscountRepository {
  abstract findAll(): Promise<Discount[]>;
  abstract findOne(id: string): Promise<Discount>;
  abstract save(discount: Discount): Promise<Discount>;
  abstract delete(id: string): Promise<void>;
}
