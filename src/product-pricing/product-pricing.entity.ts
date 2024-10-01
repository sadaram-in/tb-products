import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../products/products.entity';

@Entity('product_pricing')
export class ProductPricing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Product, (product) => product.id)
  productId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ length: 3 })
  currency: string;

  @Column({ default: true })
  is_active: boolean;

  @Column('date', { nullable: true })
  effective_from: string;

  @Column('date', { nullable: true })
  effective_to: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
