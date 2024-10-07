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
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductCommand } from '../../application/commands/update-product.command';

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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updateProductCommand = new UpdateProductCommand(
      id,
      updateProductDto.name,
      updateProductDto.description,
      updateProductDto.changeLog,
      updateProductDto.effective_from,
      updateProductDto.effective_to,
      updateProductDto.is_active,
    );

    return await this.productsService.update(id, updateProductCommand);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
