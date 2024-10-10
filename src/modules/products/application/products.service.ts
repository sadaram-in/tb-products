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
      return this.responseService.buildResponse(
        'success',
        result,
        201,
        'PR-001',
      );
    } catch (error) {
      return this.responseService.buildErrorResponse(
        'error',
        {
          message: error.message,
        },
        500,
        'PR-003',
      );
    }
  }

  async findAll(): Promise<ApiResponseDto<any>> {
    try {
      const products = await this.queryBus.execute(new GetProductsQuery());
      return this.responseService.buildResponse(
        'success',
        products,
        200,
        'PR-001',
      );
    } catch (error) {
      return this.responseService.buildErrorResponse(
        'error',
        {
          message: error.message,
        },
        500,
        'PR-003',
      );
    }
  }

  async findOne(id: string): Promise<ApiResponseDto<any>> {
    try {
      const product = await this.queryBus.execute(new GetProductsByIdQuery(id));
      if (!product) {
        return this.responseService.handleNotFound(
          'error',
          {
            message: 'Product not found',
            id,
          },
          404,
          'PR-002',
        );
      }
      return this.responseService.buildResponse(
        'success',
        product,
        200,
        'PR-001',
      );
    } catch (error) {
      return this.responseService.buildErrorResponse(
        'error',
        {
          message: error.message,
        },
        500,
        'PR-003',
      );
    }
  }

  async update(
    id: string,
    updateProductCommand: UpdateProductCommand,
  ): Promise<ApiResponseDto<any>> {
    try {
      const product = await this.queryBus.execute(new GetProductsByIdQuery(id));
      if (!product) {
        return this.responseService.handleNotFound(
          'error',
          {
            message: `Product with ID ${id} not found`,
          },
          404,
          'PR-002',
        );
      }
      const updatedProduct =
        await this.commandBus.execute(updateProductCommand);
      return this.responseService.buildResponse(
        'success',
        updatedProduct,
        200,
        'PR-001',
      );
    } catch (error) {
      return this.responseService.buildErrorResponse(
        'error',
        {
          message: error.message,
        },
        500,
        'PR-003',
      );
    }
  }

  async remove(id: string): Promise<ApiResponseDto<any>> {
    try {
      const product = await this.queryBus.execute(new GetProductsByIdQuery(id));
      if (!product) {
        return this.responseService.handleNotFound(
          'error',
          {
            message: `Product with ID ${id} not found`,
          },
          404,
          'PR-002',
        );
      }
      await this.commandBus.execute(new DeleteProductCommand(id));
      return this.responseService.buildResponse(
        'success',
        {
          message: 'Product deleted successfully',
        },
        200,
        'PR-001',
      );
    } catch (error) {
      return this.responseService.buildErrorResponse(
        'error',
        {
          message: error.message,
        },
        500,
        'PR-003',
      );
    }
  }
}
