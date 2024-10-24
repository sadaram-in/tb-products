import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { DiscountService } from '../../application/discount.service';
import { CreateDiscountCommand } from '../../application/commands/create-discount.command';
import { UpdateDiscountCommand } from '../../application/commands/update-discount.command';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { LoggingInterceptor } from 'src/shared/interceptors/logging/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller({
  path: 'discounts',
  version: '1',
})
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountService.findOne(id);
  }

  @Get()
  findAll() {
    return this.discountService.findAll();
  }

  @Post()
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.create(
      new CreateDiscountCommand(
        createDiscountDto.discount_type,
        createDiscountDto.percentage,
        createDiscountDto.start_date,
        createDiscountDto.end_date,
      ),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    const updateDiscountCommand = new UpdateDiscountCommand(
      id,
      updateDiscountDto.discount_type,
      updateDiscountDto.percentage,
      updateDiscountDto.start_date,
      updateDiscountDto.end_date,
    );

    return this.discountService.update(id, updateDiscountCommand);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountService.remove(id);
  }
}
