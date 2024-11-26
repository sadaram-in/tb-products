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
import { ProductTermService } from '../../application/product-term.service';
import { CreateProductTermCommand } from '../../application/commands/create-product-term.command';
import { UpdateProductTermCommand } from '../../application/commands/update-product-term.command';
import { CreateProductTermDto } from './dto/create-product-term.dto';
import { UpdateProductTermDto } from './dto/update-product-term.dto';
import { LoggingInterceptor } from 'src/shared/interceptors/logging/logging.interceptor';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';


const configService = new ConfigService();
@UseInterceptors(LoggingInterceptor)
@ApiTags('Product Term')
@Controller({
  path: 'product-term',
  version: configService.get('API_VERSION'),
})
export class ProductTermController {
  constructor(private readonly productTermService: ProductTermService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productTermService.findOne(id);
  }

  @Get()
  findAll() {
    return this.productTermService.findAll();
  }

  @Post()
  create(@Body() createProductTermDto: CreateProductTermDto) {
    return this.productTermService.create(
      new CreateProductTermCommand(createProductTermDto.term_type),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductTermDto: UpdateProductTermDto,
  ) {
    const updateProductTermCommand = new UpdateProductTermCommand(
      id,
      updateProductTermDto.term_type,
    );

    return this.productTermService.update(id, updateProductTermCommand);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productTermService.remove(id);
  }
}
