import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles);
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // console.log('----------------------------');
    // console.log(request.body);
    // console.log(request.headers);
    // console.log(request.params);
    // console.log('----------------------------');
    const header = request.headers;
    if (!header || !header.role) {
      return false;
    }

    return roles.some((role) => header.role.includes(role));
  }
}
