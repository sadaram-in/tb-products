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
import { LoggingInterceptor } from 'src/shared/interceptors/logging.interceptor';
import { GetProductPricingDto } from './dto/get-product-pricing.dto';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
@UseInterceptors(LoggingInterceptor)
@Controller({
  path: 'product-pricing',
  version: configService.get('API_VERSION'),
})
export class ProductPricingController {
  constructor(private readonly productPricingService: ProductPricingService) {}

  // GET a single ProductPricing by ID
  @Get('/product_id/:product_id/start_date/:start_date')
  async findOne(
    @Param('product_id') product_id: string,
    @Param('start_date') start_date: Date,
  ) {
    // console.log(product_id, getProductPricingDto.start_date);
    return this.productPricingService.findOne(product_id, start_date);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.productPricingService.findById(id);
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
        createProductPricingDto.term_id,
      ),
    );
  }

  @Patch(':product_id')
  async update(
    @Param('product_id') product_id: string,
    @Body() updateProductPricingDto: UpdateProductPricingDto,
  ) {
    const updateProductPricingCommand = new UpdateProductPricingCommand(
      product_id,
      updateProductPricingDto.price,
      updateProductPricingDto.currency,
      updateProductPricingDto.start_date,
      updateProductPricingDto.end_date || new Date(9999, 11, 31),
      updateProductPricingDto.eol_date || new Date(9999, 11, 31),
      updateProductPricingDto.term_id,
    );
    return this.productPricingService.update(updateProductPricingCommand);
  }

  // DELETE a ProductPricing by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productPricingService.remove(id);
  }
}
