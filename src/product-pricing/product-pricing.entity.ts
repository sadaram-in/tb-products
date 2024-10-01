import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Products } from 'src/product/product.entity';
  
  @Entity('product_pricing')
  export class ProductPricing {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => Products, (product) => product.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: Products;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;
  
    @Column({ type: 'varchar', length: 3 })
    currency: string;
  
    @Column({ type: 'boolean', default: true })
    is_active: boolean;
  
    @Column({ type: 'date', nullable: true })
    effective_from: Date;
  
    @Column({ type: 'date', nullable: true })
    effective_to: Date;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
  }
  