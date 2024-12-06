import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity('product_audit_log', { schema: 'pm' })
export class ProductAuditEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'product_id' })
  productId: string;

  @Column('jsonb', { name: 'old_value' })
  oldValue: Record<string, any>;

  @Column('jsonb', { name: 'new_value' })
  newValue: Record<string, any>;

  @Column('varchar')
  action: string;

  @Column({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @Column('varchar', { name: 'created_by' })
  createdBy: string;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
