import { Injectable } from '@nestjs/common';
import { ApiResponseDto } from './dto/api-response.dto';

@Injectable()
export class ResponseService {
  buildResponse<T>(
    
    status: string,
    payload: T,
  ): ApiResponseDto<T> {
  

    const response = new ApiResponseDto<T>();
    response.status = status;
    response.payload = payload;

    return response;
  }
}
