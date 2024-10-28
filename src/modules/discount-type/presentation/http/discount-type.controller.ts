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
import { DiscountTypeService } from '../../application/discount-type.service';
import { CreateDiscountTypeCommand } from '../../application/commands/create-discount-type.command';
import { UpdateDiscountTypeCommand } from '../../application/commands/update-discount-type.command';
import { CreateDiscountTypeDto } from './dto/create-discount-type.dto';
import { UpdateDiscountTypeDto } from './dto/update-discount-type.dto';
import { LoggingInterceptor } from 'src/shared/interceptors/logging/logging.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller({
  path: 'discount-type',
  version: '1',
})
export class DiscountTypeController {
  constructor(private readonly discountTypeService: DiscountTypeService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log("hi")
    return this.discountTypeService.findOne(id);
  }

  @Get()
  findAll() {
    return this.discountTypeService.findAll();
  }

  @Post()
  create(@Body() createDiscountTypeDto: CreateDiscountTypeDto) {
    return this.discountTypeService.create(
      new CreateDiscountTypeCommand(createDiscountTypeDto.type),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDiscountTypeDto: UpdateDiscountTypeDto,
  ) {
    const updateDiscountTypeCommand = new UpdateDiscountTypeCommand(
      id,
      updateDiscountTypeDto.type,
    );

    return this.discountTypeService.update(id, updateDiscountTypeCommand);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountTypeService.remove(id);
  }
}
