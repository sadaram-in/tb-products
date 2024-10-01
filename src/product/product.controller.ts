import { Controller, Get } from '@nestjs/common';

@Controller('product')
export class ProductsController {
  @Get()
  getProducts(): string {
    return 'Hello, this is products';
  }
}
