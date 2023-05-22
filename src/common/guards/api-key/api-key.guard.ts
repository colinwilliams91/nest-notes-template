import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * This Guard will validate an API_KEY present withi each request,
 * but only on routes that are not specified as PUBLIC
 */

@Injectable() // <-- similar to Providers, Guard is just a class with @Injectable Decorator
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return false;
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
