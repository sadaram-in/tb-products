import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function CommonApiResponses() {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Bad Request - Invalid input data.',
    }),
    ApiResponse({
      status: 401,
      description:
        'Unauthorized - API key or Bearer token is missing or invalid.',
    }),
    ApiResponse({
      status: 404,
      description: 'Not Found - Resource not found.',
    }),
    ApiResponse({ status: 500, description: 'Internal Server Error.' }),
  );
}
