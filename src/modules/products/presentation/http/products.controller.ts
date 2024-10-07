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

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productsService.create(new CreateProductCommand(CreateProductDto.name));

  // }

  // @Get()
  // findAll() {
  //   //implement query command
  //   return this.productsService.findAll();
  // }

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

  //TODO add GET by id , PUT update and DELETE

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   //implement query command
  //   return this.productsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
