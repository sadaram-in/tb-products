import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseService } from 'src/shared/response/response.service';
import { GetProductPricingQuery } from './queries/get-product-pricing.query';
import { GetProductPricingByIdQuery } from './queries/get-product-pricing-by-id.query';
import { CreateProductPricingCommand } from './commands/create-product-pricing.command';
import { UpdateProductPricingCommand } from './commands/update-product-pricing.command';
import { DeleteProductPricingCommand } from './commands/delete-product-pricing.command';
import { ApiResponseDto } from 'src/shared/response/dto/api-response.dto';
import { statusCodes, responseCodesPRP } from 'src/shared/constants/constants';

@Injectable()
export class ProductPricingService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseService: ResponseService,
  ) {}

  async create(
    createProductPricingCommand: CreateProductPricingCommand,
  ): Promise<ApiResponseDto<any>> {

    const result = await this.commandBus.execute(createProductPricingCommand);
    return this.responseService.buildErrorResponse(
      'success',
      result,
      statusCodes.CREATED,
      responseCodesPRP.SUCCESS,
    );
  }

  async findAll(): Promise<ApiResponseDto<any>> {
    const result = await this.queryBus.execute(new GetProductPricingQuery());
    return this.responseService.buildErrorResponse(
      'success',
      result,
      statusCodes.SUCCESS,
      responseCodesPRP.SUCCESS,
    );
  }

  async findOne(id: string): Promise<ApiResponseDto<any>> {
    const result = await this.queryBus.execute(
      new GetProductPricingByIdQuery(id),
    );
    if (!result) {
      return this.responseService.handleNotFound(
        'error',
        {
          message: 'Product pricing not found',
          id,
        },
        statusCodes.NOT_FOUND,
        responseCodesPRP.NOT_FOUND,
      );
    }
    return this.responseService.buildErrorResponse(
      'success',
      result,
      statusCodes.SUCCESS,
      responseCodesPRP.SUCCESS,
    );
  }

  async update(
    id: string,
    updateProductPricingCommand: UpdateProductPricingCommand,
  ): Promise<ApiResponseDto<any>> {
    const pricing = await this.queryBus.execute(
      new GetProductPricingByIdQuery(id),
    );
    if (!pricing) {
      return this.responseService.handleNotFound(
        'error',
        {
          message: `Pricing with ID ${id} not found`,
        },
        statusCodes.NOT_FOUND,
        responseCodesPRP.NOT_FOUND,
      );
    }

    const result = await this.commandBus.execute(updateProductPricingCommand);
    return this.responseService.buildErrorResponse(
      'success',
      result,
      statusCodes.SUCCESS,
      responseCodesPRP.SUCCESS,
    );
  }

  async remove(id: string): Promise<ApiResponseDto<any>> {
    const pricing = await this.queryBus.execute(
      new GetProductPricingByIdQuery(id),
    );
    if (!pricing) {
      return this.responseService.handleNotFound(
        'error',
        {
          message: `Pricing with ID ${id} not found`,
        },
        statusCodes.NOT_FOUND,
        responseCodesPRP.NOT_FOUND,
      );
    }

    await this.commandBus.execute(new DeleteProductPricingCommand(id));
    return this.responseService.buildErrorResponse(
      'success',
      {
        message: `Pricing with ID ${id} deleted successfully`,
      },
      statusCodes.SUCCESS,
      responseCodesPRP.SUCCESS,
    );
  }
}