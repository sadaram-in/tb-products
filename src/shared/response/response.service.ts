import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ApiResponseDto } from './dto/api-response.dto';
import { createLogger } from '../loggers/pino.logger';
export class CustomException extends HttpException {
  constructor(response: ApiResponseDto<any>, statusCode: HttpStatus) {
    super(response, statusCode);
  }
}

@Injectable()
export class ResponseService {
  private readonly logger = createLogger(ResponseService.name);

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
    this.logger.info('Request completed', { payload: response });
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
