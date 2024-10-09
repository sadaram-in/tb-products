
export class ApiResponseDto<T> {
  status: String
  payload: T;
  statusCode: number;
}
