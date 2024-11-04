export class ApiResponseDto<T> {
  status: String;
  payload: T;
  status_code: number;
  response_code: any;
}
