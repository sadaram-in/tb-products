import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductPricingEntity } from './product-pricing.entity';
import { SubscriptionTermsEntity } from './subscription-terms.entity';

@Entity('products', { schema: 'pm' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'business_id' })
  businessId: string;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('jsonb', { nullable: true })
  metadata: Record<string, any>;

  @Column({
    type: 'enum',
    enum: ['SUBSCRIPTION'],
  })
  type: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @Column({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  @OneToMany(() => ProductPricingEntity, (pricing) => pricing.product, {
    cascade: true,
  })
  pricing: ProductPricingEntity[];

  @OneToMany(() => SubscriptionTermsEntity, (terms) => terms.product, {
    cascade: true,
  })
  subscriptionTerms: SubscriptionTermsEntity[];
}
