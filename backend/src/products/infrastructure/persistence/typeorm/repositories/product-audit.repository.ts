import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAuditEntity } from '../entities/product-audit.entity';
import { ProductRepositoryPort } from 'src/products/application/ports/product.repository.port';
import { Product } from 'src/products/domain/entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductAuditRepository {
  constructor(
    @InjectRepository(ProductAuditEntity)
    private readonly auditRepo: Repository<ProductAuditEntity>,
  ) {}

  async logChange(
    productId: string,
    action: string,
    oldValue: any,
    newValue: any,
    createdBy: string,
  ): Promise<void> {
    await this.auditRepo.save({
      productId,
      action,
      oldValue,
      newValue,
      createdAt: new Date(),
      createdBy,
    });
  }

  async getAuditLog(productId: string): Promise<ProductAuditEntity[]> {
    return this.auditRepo.find({
      where: { productId },
      order: { createdAt: 'DESC' },
    });
  }
}
