import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

/**
 * This Guard will validate an API_KEY present withi each request,
 * but only on routes that are not specified as PUBLIC
 */

@Injectable() // <-- similar to Providers, Guard is just a class with @Injectable Decorator
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler()); // ** SEE BELOW
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>(); // Request from Fetch API (might need to be from express...)
    const authHeader = request.header('Authorization');
    return authHeader === this.configService.get('API_KEY');
    // return authHeader === process.env.API_KEY; // <-- same as above, but raw .env syntax w/o `configService.get()` (less safe)
  }
}

/**
 * Guards must `implement` `CanActivate` Interface
 * which requires us to provide the `canActivate()` Method
 * within our Class. This method must return a boolean that indicating
 * whether the current request can proceed or is denied access
 * (Can return async or sync, return Pomise for async, Nest will use return
 * to control the next action, true === process, false === deny)
 */

/**
 * ** SEE ABOVE
 * this.reflector.get(key, target object context) <-- looks up and retrieve metadata of handler
 * target object context === `context.getHandler()` in the example, however we could use `context.getClass()` for a different case
 *
 */
