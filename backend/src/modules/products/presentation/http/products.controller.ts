import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from '../../application/products.service';
import { CreateProductCommand } from '../../application/commands/create-product.command';
import { UpdateProductCommand } from '../../application/commands/update-product.command';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { LoggingInterceptor } from 'src/shared/interceptors/logging/logging.interceptor';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

const configService = new ConfigService();
@UseInterceptors(LoggingInterceptor)
@ApiTags('Products')
@Controller({
  path: 'products',
  version: configService.get('API_VERSION'),
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
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
        createProductDto.golden_id,
        createProductDto.name,
        createProductDto.description,
        createProductDto.change_log,
        createProductDto.start_date,
        createProductDto.end_date,
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
      updateProductDto.golden_id,
      updateProductDto.name,
      updateProductDto.description,
      updateProductDto.change_log,
      updateProductDto.start_date,
      updateProductDto.end_date,
      updateProductDto.is_active,
    );

    return this.productsService.update(id, updateProductCommand);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
