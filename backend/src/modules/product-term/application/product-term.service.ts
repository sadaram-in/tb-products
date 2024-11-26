import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetProductTermQuery } from './queries/get-product-term.query';
import { GetProductTermByIdQuery } from './queries/get-product-term-by-id.query';
import { CreateProductTermCommand } from './commands/create-product-term.command';
import { UpdateProductTermCommand } from './commands/update-product-term.command';
import { DeleteProductTermCommand } from './commands/delete-product-term.command';
import { ResponseService } from 'src/shared/response/response.service';
import { ApiResponseDto } from 'src/shared/response/dto/api-response.dto';
import {
  responseCodesProductTerm,
  statusCodes,
} from 'src/shared/constants/constants';

@Injectable()
export class ProductTermService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseService: ResponseService,
  ) {}

  async create(
    createProductTermCommand: CreateProductTermCommand,
  ): Promise<ApiResponseDto<any>> {
    const result = await this.commandBus.execute(createProductTermCommand);
    return this.responseService.buildErrorResponse(
      'success',
      result,
      statusCodes.CREATED,
      responseCodesProductTerm.SUCCESS,
    );
  }

  async findAll(): Promise<ApiResponseDto<any>> {
    const discounts = await this.queryBus.execute(new GetProductTermQuery());
    return this.responseService.buildErrorResponse(
      'success',
      discounts,
      statusCodes.SUCCESS,
      responseCodesProductTerm.SUCCESS,
    );
  }

  async findOne(id: string): Promise<ApiResponseDto<any>> {
    if (!id) {
      return this.responseService.handleNotFound(
        'error',
        {
          message: 'Product Term ID is required',
        },
        statusCodes.NOT_FOUND,
        responseCodesProductTerm.NOT_FOUND,
      );
    }
    const discount = await this.queryBus.execute(
      new GetProductTermByIdQuery(id),
    );
    if (discount === null) {
      return this.responseService.handleNotFound(
        'error',
        {
          message: 'Product Term not found',
          id,
        },
        statusCodes.NOT_FOUND,
        responseCodesProductTerm.NOT_FOUND,
      );
    }
    return this.responseService.buildErrorResponse(
      'success',
      discount,
      statusCodes.SUCCESS,
      responseCodesProductTerm.SUCCESS,
    );
  }

  async update(
    id: string,
    updateProductTermCommand: UpdateProductTermCommand,
  ): Promise<ApiResponseDto<any>> {
    const discount = await this.queryBus.execute(
      new GetProductTermByIdQuery(id),
    );
    if (!discount) {
      return this.responseService.handleNotFound(
        'error',
        {
          message: `Product Term with ID ${id} not found`,
        },
        statusCodes.NOT_FOUND,
        responseCodesProductTerm.NOT_FOUND,
      );
    }
    const updatedDiscount = await this.commandBus.execute(
      updateProductTermCommand,
    );
    return this.responseService.buildErrorResponse(
      'success',
      updatedDiscount,
      statusCodes.CREATED,
      responseCodesProductTerm.SUCCESS,
    );
  }

  async remove(id: string): Promise<ApiResponseDto<any>> {
    const discount = await this.queryBus.execute(
      new GetProductTermByIdQuery(id),
    );
    if (!discount) {
      return this.responseService.handleNotFound(
        'error',
        {
          message: `Product Term with ID ${id} not found`,
        },
        statusCodes.NOT_FOUND,
        responseCodesProductTerm.NOT_FOUND,
      );
    }
    await this.commandBus.execute(new DeleteProductTermCommand(id));
    return this.responseService.buildErrorResponse(
      'success',
      {
        message: 'Discount deleted successfully',
      },
      statusCodes.SUCCESS,
      responseCodesProductTerm.SUCCESS,
    );
  }
}
