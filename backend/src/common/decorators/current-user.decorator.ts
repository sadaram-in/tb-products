import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('CurrentUser Decorator - Request:', {
      user: request.user,
      userId: request.userId,
    }); // Debug log 4

    if (!request.user) {
      console.error('CurrentUser Decorator - No user found in request'); // Debug log 5
      throw new UnauthorizedException('User context not found');
    }

    return request.user;
  },
);
