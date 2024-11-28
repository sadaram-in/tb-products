import { Injectable } from '@nestjs/common';
import { ResponseService } from './shared/response/response.service';
import { ApiResponseDto } from './shared/response/dto/api-response.dto';
import { statusCodes } from './shared/constants/constants';
import { CreateDummyDto } from './create-dummy.dto';

@Injectable()
export class AppService {
  constructor(private readonly responseService: ResponseService) {}

  getHello(): string {
    return 'Hello World!';
  }

  postHello(createDummyDto: CreateDummyDto): ApiResponseDto<any> {
    return this.responseService.buildErrorResponse(
      'Success',
      { message: 'Products API' },
      statusCodes.SUCCESS,
      'Test-OK',
    );
  }
}
