import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ParseBoolPipe,
  DefaultValuePipe,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'; // Import ApiTags
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from '../../application/commands/create-product.command';
import {
  GetProductsQuery,
  GetValidProductsQuery,
} from '../../application/queries/get-products.query';
import { CreateProductDto } from '../dtos/create-product.dto';
import { DeleteProductCommand } from 'src/products/application/commands/delete-product.command';
import { UpdateProductCommand } from 'src/products/application/commands/update-product.command';
import { UpdateProductDto } from '../dtos/update-product.dto';

@ApiTags('Products') // Grouping the endpoints under the "Products" tag
@Controller('products')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    const command = new CreateProductCommand(
      dto.businessId,
      dto.name,
      dto.description,
      dto.type,
      dto.startDate,
      dto.endDate,
      dto.pricing,
      dto.terms,
    );
    return this.commandBus.execute(command);
  }

  @Get()
  async getProducts(
    @Query('showInactive', new DefaultValuePipe(false), ParseBoolPipe)
    showInactive: boolean = false,
  ) {
    return this.queryBus.execute(new GetProductsQuery(showInactive));
  }

  @Get('valid')
  async getValidProducts(@Query('date') date: string) {
    const queryDate = date ? new Date(date) : new Date();
    return this.queryBus.execute(new GetValidProductsQuery(queryDate));
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteProductCommand(id));
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    const command = new UpdateProductCommand(
      id,
      dto.businessId,
      dto.name,
      dto.description,
      dto.type,
      dto.startDate,
      dto.endDate,
      dto.pricing,
      dto.terms,
    );
    return this.commandBus.execute(command);
  }
}
