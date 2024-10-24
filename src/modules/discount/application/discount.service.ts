import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetDiscountsQuery } from './queries/get-discount.query';
import { GetDiscountByIdQuery } from './queries/get-discount-by-id.query';
import { CreateDiscountCommand } from './commands/create-discount.command';
import { UpdateDiscountCommand } from './commands/update-discount.command';
import { DeleteDiscountCommand } from './commands/delete-discount.command';
import { ResponseService } from 'src/shared/response/response.service';
import { ApiResponseDto } from 'src/shared/response/dto/api-response.dto';
import {
  responseCodesDiscount,
  responseCodesPR,
  statusCodes,
} from 'src/shared/constants/constants';

@Injectable()
export class DiscountService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseService: ResponseService,
  ) {}

  async create(
    createDiscountCommand: CreateDiscountCommand,
  ): Promise<ApiResponseDto<any>> {
    const result = await this.commandBus.execute(createDiscountCommand);
    return this.responseService.buildErrorResponse(
      'success',
      result,
      statusCodes.CREATED,
      responseCodesPR.SUCCESS,
    );
  }

  async findAll(): Promise<ApiResponseDto<any>> {
    const discounts = await this.queryBus.execute(new GetDiscountsQuery());
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
    const discount = await this.queryBus.execute(new GetDiscountByIdQuery(id));
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
    updateDiscountCommand: UpdateDiscountCommand,
  ): Promise<ApiResponseDto<any>> {
    const discount = await this.queryBus.execute(new GetDiscountByIdQuery(id));
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
      updateDiscountCommand,
    );
    return this.responseService.buildErrorResponse(
      'success',
      updatedDiscount,
      statusCodes.CREATED,
      responseCodesDiscount.SUCCESS,
    );
  }

  async remove(id: string): Promise<ApiResponseDto<any>> {
    const discount = await this.queryBus.execute(new GetDiscountByIdQuery(id));
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
    await this.commandBus.execute(new DeleteDiscountCommand(id));
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
