import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseInterceptors,
} from '@nestjs/common';

import { ProductPricingService } from '../../application/product-pricing.service';
import { CreateProductPricingCommand } from '../../application/commands/create-product-pricing.command';
import { UpdateProductPricingCommand } from '../../application/commands/update-product-pricing.command';
import { CreateProductPricingDto } from './dto/create-product-pricing.dto';
import { UpdateProductPricingDto } from './dto/update-product-pricing.dto';
import { LoggingInterceptor } from 'src/shared/interceptors/logging/logging.interceptor';
import { GetProductPricingDto } from './dto/get-product-pricing.dto';

@UseInterceptors(LoggingInterceptor)
@Controller({
  path: 'product-pricing',
  version: '1',
})
export class ProductPricingController {
  constructor(private readonly productPricingService: ProductPricingService) {}

  // GET a single ProductPricing by ID
  @Get(':product_id')
  async findOne(
    @Param('product_id') product_id: string,
    @Body() getProductPricingDto: GetProductPricingDto,
  ) {
    // console.log(product_id, getProductPricingDto.start_date);
    return this.productPricingService.findOne(
      product_id,
      getProductPricingDto.start_date,
    );
  }

  // GET all ProductPricings
  @Get()
  async findAll() {
    return this.productPricingService.findAll();
  }

  @Post()
  async create(@Body() createProductPricingDto: CreateProductPricingDto) {
    return this.productPricingService.create(
      new CreateProductPricingCommand(
        createProductPricingDto.product_id,
        createProductPricingDto.price,
        createProductPricingDto.currency,
        createProductPricingDto.is_active,
        createProductPricingDto.start_date,
        createProductPricingDto.end_date || new Date(9999, 11, 31),
        createProductPricingDto.eol_date || new Date(9999, 11, 31),
        createProductPricingDto.term || null,
      ),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductPricingDto: UpdateProductPricingDto,
  ) {
    const updateProductPricingCommand = new UpdateProductPricingCommand(
      id,
      updateProductPricingDto.product_id,
      updateProductPricingDto.price,
      updateProductPricingDto.currency,
      updateProductPricingDto.is_active,
      updateProductPricingDto.start_date,
      updateProductPricingDto.end_date || new Date(9999, 11, 31),
      updateProductPricingDto.eol_date || new Date(9999, 11, 31),
      updateProductPricingDto.term || null,
    );
    return this.productPricingService.update(
      updateProductPricingDto.product_id,
      new Date(),
      updateProductPricingCommand,
    );
  }

  // DELETE a ProductPricing by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productPricingService.remove(id);
  }
}
