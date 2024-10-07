import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('products')
  export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', length: 255 })
    name: string;
  
    @Column({ type: 'text', nullable: true })
    description: string;
  
    @Column({ type: 'jsonb', nullable: true })
    changeLog: Record<string, any>;
  
    @Column({ type: 'boolean', default: true })
    is_active: boolean;
  
    @Column({ type: 'date', nullable: false })
    effective_from: Date;
  
    @Column({ type: 'date', nullable: true })
    effective_to: Date;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
  }