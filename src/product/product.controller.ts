import { Controller, Get } from '@nestjs/common';
import { ProductsService } from "./product.service"

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }
}
