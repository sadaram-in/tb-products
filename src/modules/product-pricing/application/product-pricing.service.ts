import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ResponseService } from 'src/shared/response/response.service'; // Adjust the path as needed
import { GetProductPricingQuery } from './queries/get-product-pricing.query';
import { GetProductPricingByIdQuery } from './queries/get-product-pricing-by-id.query';
import { CreateProductPricingCommand } from './commands/create-product-pricing.command';
import { UpdateProductPricingCommand } from './commands/update-product-pricing.command';
import { DeleteProductPricingCommand } from './commands/delete-product-pricing.command';
import { ApiResponseDto } from 'src/shared/response/dto/api-response.dto'; // Adjust the path as needed

@Injectable()
export class ProductPricingService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly responseService: ResponseService, // Injecting ResponseService
  ) {}

  async create(
    createProductPricingCommand: CreateProductPricingCommand,
  ): Promise<ApiResponseDto<any>> {
    try {
      const result = await this.commandBus.execute(createProductPricingCommand);
      return this.responseService.buildResponse('success', result); // Return success response
    } catch (error) {
      return this.responseService.handleInternalServerError('error', {
        message: error.message,
      });
    }
  }

  async findAll(): Promise<ApiResponseDto<any>> {
    try {
      const result = await this.queryBus.execute(new GetProductPricingQuery());
      return this.responseService.buildResponse('success', result); // Return success response
    } catch (error) {
      return this.responseService.handleInternalServerError('error', {
        message: error.message,
      });
    }
  }

  async findOne(id: string): Promise<ApiResponseDto<any>> {
    try {
      const result = await this.queryBus.execute(
        new GetProductPricingByIdQuery(id),
      );
      if (!result) {
        return this.responseService.handleNotFound('error', {
          message: 'Product pricing not found',
          id,
        });
      }
      return this.responseService.buildResponse('success', result); // Return success response
    } catch (error) {
      return this.responseService.handleInternalServerError('error', {
        message: error.message,
      });
    }
  }

  async update(
    id: string,
    updateProductPricingCommand: UpdateProductPricingCommand,
  ): Promise<ApiResponseDto<any>> {
    try {
      const pricing = await this.queryBus.execute(
        new GetProductPricingByIdQuery(id),
      );
      if (!pricing) {
        return this.responseService.handleNotFound('error', {
          message: `Pricing with ID ${id} not found`,
        });
      }

      const result = await this.commandBus.execute(updateProductPricingCommand);
      return this.responseService.buildResponse('success', result); // Return success response
    } catch (error) {
      return this.responseService.handleInternalServerError('error', {
        message: error.message,
      });
    }
  }

  async remove(id: string): Promise<ApiResponseDto<any>> {
    try {
      const pricing = await this.queryBus.execute(
        new GetProductPricingByIdQuery(id),
      );
      if (!pricing) {
        return this.responseService.handleNotFound('error', {
          message: `Pricing with ID ${id} not found`,
        });
      }

      await this.commandBus.execute(new DeleteProductPricingCommand(id));
      return this.responseService.buildResponse('success', {
        message: `Pricing with ID ${id} deleted successfully`,
      }); // Return success response
    } catch (error) {
      return this.responseService.handleInternalServerError('error', {
        message: error.message,
      });
    }
  }
}
