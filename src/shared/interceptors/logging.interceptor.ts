import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();
    const body = request.body;

    console.log('----------------------------------------');
    console.log(`--request-- ${method} ${url}`);
    console.log('Request Body:', JSON.stringify(body, null, 2));

    return next.handle().pipe(
      tap((responseBody) => {
        const responseTime = Date.now() - now;
        console.log('----------------------------------------');
        console.log(`--response--success-- ${method} ${url} ${responseTime}ms`);
        console.log('Response Body:', JSON.stringify(responseBody, null, 2));
        console.log('----------------------------------------');
      }),
      catchError((error) => {
        const responseTime = Date.now() - now;
        console.log('----------------------------------------');
        console.log(`--response--error-- ${method} ${url} ${responseTime}ms`);
        console.log('Error:', error.message);
        console.log('----------------------------------------');
        throw error;
      }),
    );
  }
}
