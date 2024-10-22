import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    console.log(`Request: ${method} ${url}`);

    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `Response for ${method} ${url} took ${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
