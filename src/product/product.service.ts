import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const newProduct = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(newProduct);
  }

  getAllProducts() {
    return this.productsRepository.find();
  }

  getProductById(id: string) {
    return this.productsRepository.findOne({ where: { id } });
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    await this.productsRepository.update(id, updateProductDto);
    return this.getProductById(id);
  }

  async softDeleteProduct(id: string) {
    const product = await this.getProductById(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    product.is_active = false;
    product.effective_to = new Date();
    return this.productsRepository.save(product);
  }
}
