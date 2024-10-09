import { Injectable } from '@nestjs/common';
import { ApiResponseDto } from './dto/api-response.dto';

@Injectable()
export class ResponseService {
  // Method to build a standard response
  buildResponse<T>(
    status: string,
    payload: T,
    statusCode: number = 200,
  ): ApiResponseDto<T> {
    const response = new ApiResponseDto<T>();
    response.status = status;
    response.payload = payload;
    response.statusCode = statusCode;

    return response;
  }

  // Method to build an error response
  buildErrorResponse<T>(
    status: string,
    payload: T,
    statusCode: number = 400,
  ): ApiResponseDto<T> {
    const response = new ApiResponseDto<T>();
    response.status = status;
    response.payload = payload;
    response.statusCode = statusCode;
    return response;
  }

  // Method for handling 404 Not Found responses
  handleNotFound<T>(
    status: string,
    payload: T,
    statusCode: number = 404,
  ): ApiResponseDto<T> {
    const response = new ApiResponseDto<T>();
    response.status = status;
    response.payload = payload;
    response.statusCode = statusCode;
    return response;
  }

  // Method for handling 500 Internal Server Error responses
  handleInternalServerError<T>(
    status: string,
    payload: T,
    statusCode: number = 500,
  ): ApiResponseDto<T> {
    const response = new ApiResponseDto<T>();
    response.status = status;
    response.payload = payload;
    response.statusCode = statusCode;
    return response;
  }
}
