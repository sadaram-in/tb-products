import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_pricing')
export class ProductPricingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @Column('decimal')
  price: number;

  @Column()
  currency: string;

  @Column()
  isActive: boolean;

  @Column()
  effectiveFrom: Date;

  @Column({ nullable: true })
  effectiveTo: Date;
}
