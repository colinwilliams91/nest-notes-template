import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional() // <-- will no longer through errors if missing or undefined
  @IsPositive() // <-- ensures number is > 0
  // @Type(() => Number) // <-- makes queryParams transfer through network as Number instead of default String (risk perofmrnace...)
  limit: number;

  @IsOptional()
  @IsPositive()
  // @Type(() => Number) // <-- replaced by Global Validation Pipe `transformOptions: { enableImplicitConversion: true }`
  offset: number;
}
