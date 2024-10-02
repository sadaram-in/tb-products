import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductPricingService } from './product-pricing.service';
import { CreateProductPricingDto, UpdateProductPricingDto } from './product-pricing.dto';

@Controller('product-pricing')
export class ProductPricingController {
  constructor(private readonly productPricingService: ProductPricingService) {}

  @Post()
  async createProductPricing(@Body() createProductPricingDto: CreateProductPricingDto) {
    return this.productPricingService.createProductPricing(createProductPricingDto);
  }

  @Get()
  async getProductPricing() {
    return this.productPricingService.getAllProductPricing();
  }

  @Get(':id')
  async getProductPricingById(@Param('id') id: string) {
    const pricing = await this.productPricingService.getProductPricingById(id);
    if (!pricing) {
      throw new HttpException('Product pricing not found', HttpStatus.NOT_FOUND);
    }
    return pricing;
  }

  @Put(':id')
  async updateProductPricing(
    @Param('id') id: string,
    @Body() updateProductPricingDto: UpdateProductPricingDto,
  ) {
    return this.productPricingService.updateProductPricing(id, updateProductPricingDto);
  }

  @Delete(':id')
  async softDeleteProductPricing(@Param('id') id: string) {
    return this.productPricingService.softDeleteProductPricing(id);
  }
}
