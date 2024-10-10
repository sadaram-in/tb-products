import { Injectable } from '@nestjs/common';
import { ResponseService } from './shared/response/response.service';
import { ApiResponseDto } from './shared/response/dto/api-response.dto';

@Injectable()
export class AppService {
  constructor(private readonly responseService: ResponseService) {} // Inject ResponseService

  getHello(): ApiResponseDto<any> {
    return this.responseService.buildResponse(
      'Success',
      { message: 'Products API' },
      200,
      'APP-001',
    );
  }
}
