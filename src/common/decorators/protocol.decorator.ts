import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * We can use Decorators on Parameters in our Http route handler function signatures.
 * These decorators are just functions that handle logic.
 *
 * This example below is a way we can extract the `request.protocol` in the route handler we Inject it into.
 * See below for example use case** (defaultValue is optional parameter we can use if needed in Decorator fn body)
 */

export const Protocol = createParamDecorator(
  (defaultValue: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.protocol;
  },
);

/**
 * **
 * @Get()
   @Public()
   findAll(@Protocol() protocol: string, @Query() paginationQuery: PaginationQueryDto) {
     console.log(protocol);
     return this.coffeesService.findAll(paginationQuery);
   }
 */
