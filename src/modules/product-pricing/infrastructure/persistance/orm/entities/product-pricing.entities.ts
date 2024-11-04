import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { ProductEntity } from 'src/modules/products/infrastructure/persistance/orm/entities/product.entities';
import { ProductTermEntity } from 'src/modules/product-term/infrastructure/persistance/orm/entities/product-term.entities';
import { ProductTermType } from 'src/shared/constants/product-term-types';

@Entity('product_pricing')
export class ProductPricingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProductEntity, (product) => product.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  @Column({ type: 'uuid', nullable: false })
  product_id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 3 })
  currency: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'date', nullable: false })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @Column({ type: 'date', nullable: true })
  eol_date: Date;

  @ManyToOne(() => ProductTermEntity, (productTerm) => productTerm.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'term_id' })
  @Column({ type: 'uuid', nullable: true })
  term_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
