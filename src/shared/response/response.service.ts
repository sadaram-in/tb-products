import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponseDto } from './dto/api-response.dto';

export class CustomException extends HttpException {
  constructor(response: ApiResponseDto<any>, statusCode: HttpStatus) {
    super(response, statusCode);
  }
}

@Injectable()
export class ResponseService {

  buildErrorResponse<T>(
    status: string,
    payload: T,
    statusCode: number = HttpStatus.BAD_REQUEST,
    responseCode: string,
  ): ApiResponseDto<T> {
    const response = new ApiResponseDto<T>();
    response.status = status;
    response.payload = payload;
    response.status_code = statusCode;
    response.response_code = responseCode;
    throw new CustomException(response, statusCode);
  }

  handleNotFound<T>(
    status: string,
    payload: T,
    statusCode: number = HttpStatus.NOT_FOUND,
    responseCode: string,
  ): ApiResponseDto<T> {
    const response = new ApiResponseDto<T>();
    response.status = status;
    response.payload = payload;
    response.status_code = statusCode;
    response.response_code = responseCode;
    throw new CustomException(response, statusCode);
  }

  handleInternalServerError<T>(
    status: string,
    payload: T,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    responseCode: string,
  ): ApiResponseDto<T> {
    const response = new ApiResponseDto<T>();
    response.status = status;
    response.payload = payload;
    response.status_code = statusCode;
    response.response_code = responseCode;
    throw new CustomException(response, statusCode);
  }
}