import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetDiscountTypeQuery } from './queries/get-discount-type.query';
import { GetDiscountTypeByIdQuery } from './queries/get-discount-type-by-id.query';
import { CreateDiscountTypeCommand } from './commands/create-discount-type.command';
import { UpdateDiscountTypeCommand } from './commands/update-discount-type.command';
import { DeleteDiscountTypeCommand } from './commands/delete-discount-type.command';
import { ResponseService } from 'src/shared/response/response.service';
import { ApiResponseDto } from 'src/shared/response/dto/api-response.dto';
import {
  responseCodesDiscount,
  responseCodesPR,
  statusCodes,
} from 'src/shared/constants/constants';

@Injectable()
export class DiscountTypeService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseService: ResponseService,
  ) {}

  async create(
    createDiscountTypeCommand: CreateDiscountTypeCommand,
  ): Promise<ApiResponseDto<any>> {
    const result = await this.commandBus.execute(createDiscountTypeCommand);
    return this.responseService.buildErrorResponse(
      'success',
      result,
      statusCodes.CREATED,
      responseCodesPR.SUCCESS,
    );
  }

  async findAll(): Promise<ApiResponseDto<any>> {
    const discounts = await this.queryBus.execute(new GetDiscountTypeQuery());
    return this.responseService.buildErrorResponse(
      'success',
      discounts,
      statusCodes.SUCCESS,
      responseCodesDiscount.SUCCESS,
    );
  }

  async findOne(id: string): Promise<ApiResponseDto<any>> {
    if (!id) {
      return this.responseService.handleNotFound(
        'error',
        {
          message: 'Discount ID is required',
        },
        statusCodes.NOT_FOUND,
        responseCodesDiscount.NOT_FOUND,
      );
    }
    const discount = await this.queryBus.execute(new GetDiscountTypeByIdQuery(id));
    if (discount === null) {
      return this.responseService.handleNotFound(
        'error',
        {
          message: 'Discount not found',
          id,
        },
        statusCodes.NOT_FOUND,
        responseCodesDiscount.NOT_FOUND,
      );
    }
    return this.responseService.buildErrorResponse(
      'success',
      discount,
      statusCodes.SUCCESS,
      responseCodesDiscount.SUCCESS,
    );
  }

  async update(
    id: string,
    updateDiscountTypeCommand: UpdateDiscountTypeCommand,
  ): Promise<ApiResponseDto<any>> {
    const discount = await this.queryBus.execute(new GetDiscountTypeByIdQuery(id));
    if (!discount) {
      return this.responseService.handleNotFound(
        'error',
        {
          message: `Discount with ID ${id} not found`,
        },
        statusCodes.NOT_FOUND,
        responseCodesDiscount.NOT_FOUND,
      );
    }
    const updatedDiscount = await this.commandBus.execute(
      updateDiscountTypeCommand,
    );
    return this.responseService.buildErrorResponse(
      'success',
      updatedDiscount,
      statusCodes.CREATED,
      responseCodesDiscount.SUCCESS,
    );
  }

  async remove(id: string): Promise<ApiResponseDto<any>> {
    const discount = await this.queryBus.execute(new GetDiscountTypeByIdQuery(id));
    if (!discount) {
      return this.responseService.handleNotFound(
        'error',
        {
          message: `Discount with ID ${id} not found`,
        },
        statusCodes.NOT_FOUND,
        responseCodesDiscount.NOT_FOUND,
      );
    }
    await this.commandBus.execute(new DeleteDiscountTypeCommand(id));
    return this.responseService.buildErrorResponse(
      'success',
      {
        message: 'Discount deleted successfully',
      },
      statusCodes.SUCCESS,
      responseCodesDiscount.SUCCESS,
    );
  }
}
