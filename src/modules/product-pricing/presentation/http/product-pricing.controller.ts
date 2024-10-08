import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductPricingCommand } from '../../application/commands/create-product-pricing.command';
import { UpdateProductPricingCommand } from '../../application/commands/update-product-pricing.command';
import { DeleteProductPricingCommand } from '../../application/commands/delete-product-pricing.command';
import { GetProductPricingByIdQuery } from '../../application/queries/get-product-pricing-by-id.query';
import { CreateProductPricingDto } from './dto/create-product-pricing.dto';
import { UpdateProductPricingDto } from './dto/update-product-pricing.dto';
import { GetProductPricingQuery } from '../../application/queries/get-product-pricing.query';

@Controller({
  path: 'product-pricing',
  version: '1',
})
export class ProductPricingController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createProductPricingDto: CreateProductPricingDto) {
    const {
      productId,
      price,
      currency,
      is_active,
      effective_from,
      effective_to,
    } = createProductPricingDto;

    const command = new CreateProductPricingCommand(
      productId,
      price,
      currency,
      is_active,
      effective_from,
      effective_to,
    );

    return this.commandBus.execute(command);
  }

  // GET all ProductPricings
  @Get()
  async findAll() {
    return this.queryBus.execute(new GetProductPricingQuery());
  }

  // GET a single ProductPricing by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const productPricing = await this.queryBus.execute(
      new GetProductPricingByIdQuery(id),
    );

    if (!productPricing) {
      throw new NotFoundException(`ProductPricing with ID ${id} not found`);
    }

    return productPricing;
  }

  // UPDATE an existing ProductPricing by ID
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductPricingDto: UpdateProductPricingDto,
  ) {
    const command = new UpdateProductPricingCommand(
      id,
      updateProductPricingDto.price,
      updateProductPricingDto.currency,
      updateProductPricingDto.is_active,
      updateProductPricingDto.effective_from,
      updateProductPricingDto.effective_to || null,
    );

    return this.commandBus.execute(command);
  }

  // DELETE a ProductPricing by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const productPricing = await this.queryBus.execute(
      new GetProductPricingByIdQuery(id),
    );

    if (!productPricing) {
      throw new NotFoundException(`ProductPricing with ID ${id} not found`);
    }
    const command = new DeleteProductPricingCommand(id);
    return this.commandBus.execute(command);
  }
}
