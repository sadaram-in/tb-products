import { Injectable } from '@nestjs/common';
import { ResponseService } from './shared/response/response.service';
import { ApiResponseDto } from './shared/response/dto/api-response.dto';
import { statusCodes } from './shared/constants/constants';

@Injectable()
export class AppService {
  constructor(private readonly responseService: ResponseService) {}

  getHello(): ApiResponseDto<any> {
    return this.responseService.buildResponse(
      'Success',
      { message: 'Products API' },
      statusCodes.SUCCESS,
      'Test-OK',
    );
  }
}
