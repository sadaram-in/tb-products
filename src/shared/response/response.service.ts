import { Injectable } from '@nestjs/common';
import { ApiResponseDto } from './dto/api-response.dto';

@Injectable()
export class ResponseService {
  // Method to build a 200 standard response
  buildResponse<T>(
    status: string,
    payload: T,
    status_code: number = 200,
    response_code: string,
  ): ApiResponseDto<T> {
    const response = new ApiResponseDto<T>();
    response.status = status;
    response.payload = payload;
    response.status_code = status_code;
    response.response_code = response_code;
    return response;
  }

  // Method to build an 400 error response
  buildErrorResponse<T>(
    status: string,
    payload: T,
    status_code: number = 400,
    response_code: string,
  ): ApiResponseDto<T> {
    const response = new ApiResponseDto<T>();
    response.status = status;
    response.payload = payload;
    response.status_code = status_code;
    response.response_code = response_code;
    return response;
  }

  // 404 Not Found responses
  handleNotFound<T>(
    status: string,
    payload: T,
    status_code: number = 404,
    response_code: string,
  ): ApiResponseDto<T> {
    const response = new ApiResponseDto<T>();
    response.status = status;
    response.payload = payload;
    response.status_code = status_code;
    response.response_code = response_code;
    return response;
  }

  // 500 Internal Server Error responses
  handleInternalServerError<T>(
    status: string,
    payload: T,
    status_code: number = 500,
    response_code: string,
  ): ApiResponseDto<T> {
    const response = new ApiResponseDto<T>();
    response.status = status;
    response.payload = payload;
    response.status_code = status_code;
    response.response_code = response_code;
    return response;
  }
}
