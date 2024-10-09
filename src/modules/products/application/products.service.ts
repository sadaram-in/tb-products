import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetProductsQuery } from './queries/get-products.query';
import { GetProductsByIdQuery } from './queries/get-products-by-id.query';
import { CreateProductCommand } from './commands/create-product.command';
import { UpdateProductCommand } from './commands/update-product.command';
import { DeleteProductCommand } from './commands/delete-product.command';
import { ResponseService } from 'src/shared/response/response.service';
import { ApiResponseDto } from 'src/shared/response/dto/api-response.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseService: ResponseService, // Inject ResponseService
  ) {}

  async create(
    createProductCommand: CreateProductCommand,
  ): Promise<ApiResponseDto<any>> {
    try {
      const result = await this.commandBus.execute(createProductCommand);
      return this.responseService.buildResponse('success', result);
    } catch (error) {
      return this.responseService.buildErrorResponse('error', {
        message: error.message,
      });
    }
  }

  async findAll(): Promise<ApiResponseDto<any>> {
    try {
      const products = await this.queryBus.execute(new GetProductsQuery());
      return this.responseService.buildResponse('success', products);
    } catch (error) {
      return this.responseService.buildErrorResponse('error', {
        message: error.message,
      });
    }
  }

  async findOne(id: string): Promise<ApiResponseDto<any>> {
    try {
      const product = await this.queryBus.execute(new GetProductsByIdQuery(id));
      if (!product) {
        return this.responseService.handleNotFound('error', {
          message: 'Product not found',
          id,
        });
      }
      return this.responseService.buildResponse('success', product);
    } catch (error) {
      return this.responseService.buildErrorResponse('error', {
        message: error.message,
      });
    }
  }

  async update(
    id: string,
    updateProductCommand: UpdateProductCommand,
  ): Promise<ApiResponseDto<any>> {
    try {
      const product = await this.queryBus.execute(new GetProductsByIdQuery(id));
      if (!product) {
        return this.responseService.handleNotFound('error', {
          message: `Product with ID ${id} not found`,
        });
      }
      const updatedProduct =
        await this.commandBus.execute(updateProductCommand);
      return this.responseService.buildResponse('success', updatedProduct);
    } catch (error) {
      return this.responseService.buildErrorResponse('error', {
        message: error.message,
      });
    }
  }

  async remove(id: string): Promise<ApiResponseDto<any>> {
    try {
      const product = await this.queryBus.execute(new GetProductsByIdQuery(id));
      if (!product) {
        return this.responseService.handleNotFound('error', {
          message: `Product with ID ${id} not found`,
        });
      }
      await this.commandBus.execute(new DeleteProductCommand(id));
      return this.responseService.buildResponse('success', {
        message: 'Product deleted successfully',
      });
    } catch (error) {
      return this.responseService.buildErrorResponse('error', {
        message: error.message,
      });
    }
  }
}
