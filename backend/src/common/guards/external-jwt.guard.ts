import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { TokenValidationService } from '../services/token-validation.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ExternalJwtGuard implements CanActivate {
  constructor(
    private tokenValidationService: TokenValidationService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Bearer token is required');
    }

    try {
      const userContext =
        await this.tokenValidationService.validateToken(token);
      console.log('ExternalJwtGuard - User Context:', userContext); // Debug log 1

      // Explicitly set both user and userId on the request
      request.user = userContext;
      request.userId = userContext.userId;

      console.log(
        'ExternalJwtGuard - Request user after setting:',
        request.userId,
      ); // Debug log 2

      return true;
    } catch (error) {
      console.error('ExternalJwtGuard - Error:', error); // Debug log 3
      throw new UnauthorizedException(
        'Invalid token or token validation failed',
      );
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
