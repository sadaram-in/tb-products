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
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ExternalJwtGuard } from 'src/common/guards/external-jwt.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'; // Import ApiTags
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
import { CommonApiResponses } from 'src/common/decorators/common-api-responses.decorator';

@UseGuards(ExternalJwtGuard, ApiKeyGuard)
@ApiTags('Products')
@ApiBearerAuth('bearer')
@ApiSecurity('x-api-key')
@Controller('products')
@ApiUnauthorizedResponse({
  description: 'API key is missing or invalid',
})
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Unauthorized - API key or Bearer token is missing or invalid',
})
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  @CommonApiResponses()
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
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved products.' })
  @CommonApiResponses()
  async getProducts(
    @Query('showInactive', new DefaultValuePipe(false), ParseBoolPipe)
    showInactive: boolean = false,
  ) {
    return this.queryBus.execute(new GetProductsQuery(showInactive));
  }

  @Get('valid')
  @ApiOperation({ summary: 'Get valid products by date' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved valid products.',
  })
  @CommonApiResponses()
  async getValidProducts(@Query('date') date: string) {
    const queryDate = date ? new Date(date) : new Date();
    return this.queryBus.execute(new GetValidProductsQuery(queryDate));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
  })
  @CommonApiResponses()
  async deleteProduct(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteProductCommand(id));
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
  })
  @CommonApiResponses()
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
