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
  UseGuards,
} from '@nestjs/common';
import { ProductPricingService } from './product-pricing.service';
import {
  CreateProductPricingDto,
  UpdateProductPricingDto,
} from './product-pricing.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('product-pricing')
@UseGuards(RolesGuard)
export class ProductPricingController {
  constructor(private readonly productPricingService: ProductPricingService) {}

  @Post()
  @Roles('admin')
  async createProductPricing(
    @Body() createProductPricingDto: CreateProductPricingDto,
  ) {
    return this.productPricingService.createProductPricing(
      createProductPricingDto,
    );
  }

  @Get()
  @Roles('user', 'admin')
  async getProductPricing() {
    return this.productPricingService.getAllProductPricing();
  }

  @Get(':id')
  @Roles('user', 'admin')
  async getProductPricingById(@Param('id') id: string) {
    const pricing = await this.productPricingService.getProductPricingById(id);
    if (!pricing) {
      throw new HttpException(
        'Product pricing not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return pricing;
  }

  @Put(':id')
  @Roles('admin')
  async updateProductPricing(
    @Param('id') id: string,
    @Body() updateProductPricingDto: UpdateProductPricingDto,
  ) {
    return this.productPricingService.updateProductPricing(
      id,
      updateProductPricingDto,
    );
  }

  @Delete(':id')
  @Roles('admin')
  async softDeleteProductPricing(@Param('id') id: string) {
    return this.productPricingService.softDeleteProductPricing(id);
  }
}
