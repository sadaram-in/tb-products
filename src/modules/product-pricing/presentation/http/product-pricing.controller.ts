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

@UseInterceptors(LoggingInterceptor)
@Controller({
  path: 'product-pricing',
  version: '1',
})
export class ProductPricingController {
  constructor(private readonly productPricingService: ProductPricingService) {}

  // GET a single ProductPricing by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productPricingService.findOne(id);
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
        createProductPricingDto.effective_from,
        createProductPricingDto.effective_to || null,
        createProductPricingDto.eol_date || null,
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
      updateProductPricingDto.price,
      updateProductPricingDto.currency,
      updateProductPricingDto.is_active,
      updateProductPricingDto.effective_from,
      updateProductPricingDto.effective_to || null,
      updateProductPricingDto.eol_date || null,
      updateProductPricingDto.term || null,
    );
    return this.productPricingService.update(id, updateProductPricingCommand);
  }

  // DELETE a ProductPricing by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productPricingService.remove(id);
  }
}
