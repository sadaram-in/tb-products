import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetProductsQuery } from './queries/get-products.query';
import { GetProductsByIdQuery } from './queries/get-products-by-id.query';
import { CreateProductCommand } from './commands/create-product.command';
import { UpdateProductCommand } from './commands/update-product.command';
import { DeleteProductCommand } from './commands/delete-product.command';
import { ResponseService } from 'src/shared/response/response.service';
import { ApiResponseDto } from 'src/shared/response/dto/api-response.dto';
import { responseCodesPR, statusCodes } from 'src/shared/constants/constants';

@Injectable()
export class ProductsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseService: ResponseService,
  ) {}

  async create(
    createProductCommand: CreateProductCommand,
  ): Promise<ApiResponseDto<any>> {
    try {
      const result = await this.commandBus.execute(createProductCommand);
      return this.responseService.buildResponse(
        'success',
        result,
        statusCodes.CREATED,
        responseCodesPR.SUCCESS,
      );
    } catch (error) {
      return this.responseService.buildErrorResponse(
        'error',
        {
          message: error.message,
        },
        statusCodes.INTERNAL_SERVER_ERROR,
        responseCodesPR.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<ApiResponseDto<any>> {
    try {
      const products = await this.queryBus.execute(new GetProductsQuery());
      return this.responseService.buildResponse(
        'success',
        products,
        statusCodes.SUCCESS,
        responseCodesPR.SUCCESS,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        this.responseService.buildErrorResponse(
          'error',
          {
            message: error.message,
          },
          statusCodes.INTERNAL_SERVER_ERROR,
          responseCodesPR.INTERNAL_SERVER_ERROR,
        ),
      );
    }
  }

  async findOne(id: string): Promise<ApiResponseDto<any>> {
    try {
      if (!id) {
        new NotFoundException();
        return this.responseService.handleNotFound(
          'error',
          {
            message: 'Product ID is required',
          },
          statusCodes.NOT_FOUND,
          responseCodesPR.NOT_FOUND,
        );
      }
      const product = await this.queryBus.execute(new GetProductsByIdQuery(id));
      if (product === null) {
        return this.responseService.handleNotFound(
          'error',
          {
            message: 'Product not found',
            id,
          },
          statusCodes.NOT_FOUND,
          responseCodesPR.NOT_FOUND,
        );
      }
      return this.responseService.buildResponse(
        'success',
        product,
        statusCodes.SUCCESS,
        responseCodesPR.SUCCESS,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        this.responseService.buildErrorResponse(
          'error',
          {
            message: error.message,
          },
          statusCodes.INTERNAL_SERVER_ERROR,
          responseCodesPR.INTERNAL_SERVER_ERROR,
        ),
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
          statusCodes.NOT_FOUND,
          responseCodesPR.NOT_FOUND,
        );
      }
      const updatedProduct =
        await this.commandBus.execute(updateProductCommand);
      return this.responseService.buildResponse(
        'success',
        updatedProduct,
        statusCodes.CREATED,
        responseCodesPR.SUCCESS,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        this.responseService.buildErrorResponse(
          'error',
          {
            message: error.message,
          },
          statusCodes.INTERNAL_SERVER_ERROR,
          responseCodesPR.INTERNAL_SERVER_ERROR,
        ),
      );
    }
  }

  async remove(id: string): Promise<ApiResponseDto<any>> {
    try {
      const product = await this.queryBus.execute(new GetProductsByIdQuery(id));
      if (!product) {
        throw new NotFoundException(
          this.responseService.handleNotFound(
            'error',
            {
              message: `Product with ID ${id} not found`,
            },
            statusCodes.NOT_FOUND,
            responseCodesPR.NOT_FOUND,
          ),
        );
      }
      await this.commandBus.execute(new DeleteProductCommand(id));
      return this.responseService.buildResponse(
        'success',
        {
          message: 'Product deleted successfully',
        },
        statusCodes.SUCCESS,
        responseCodesPR.SUCCESS,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        this.responseService.buildErrorResponse(
          'error',
          {
            message: error.message,
          },
          statusCodes.INTERNAL_SERVER_ERROR,
          responseCodesPR.INTERNAL_SERVER_ERROR,
        ),
      );
    }
  }
}
