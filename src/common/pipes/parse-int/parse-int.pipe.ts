import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

/**
 * All Pipes will implement the `PipeTransform` interface --> requires `transform()` method inside Class.
 * Pipes will sit between the **client request** and the **request handler**
 * `transform()` receives TWO arguments:
 * `value`: the input of the currently processed argument before it is received by our route handling method.
 *
 * `metaData`: The metadata of the currently processed argument (where it sits in the Nest IoC Scope)
 *
 * --> whatever occurs inside `transform` will override the previous value of the argument
 * --> EX. USECASE: we can use default values to fill in our DTO if it is missing props/values before hitting route handler
 */

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed "${val}" is not an integer.`,
      );
    }
    return val;
  }
}
