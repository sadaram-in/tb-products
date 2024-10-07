import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from '../../application/products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductCommand } from '../../application/commands/create-product.command';

@Controller({
  path: 'products',
  version: '1', // Ensure versioning is handled
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    // console.log('---------- bp --------- id endpoint');
    return this.productsService.findOne(id);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(
      new CreateProductCommand(
        createProductDto.name,
        createProductDto.description,
        createProductDto.changeLog,
        createProductDto.effective_from,
        createProductDto.effective_to,
        createProductDto.is_active,
      ),
    );
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
