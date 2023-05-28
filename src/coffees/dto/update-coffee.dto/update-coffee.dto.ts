import { PartialType } from '@nestjs/swagger';
import { CreateCoffeeDto } from '../create-coffee.dto/create-coffee.dto';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}

/* <-- `PartialType(ParentDto)` inhereits all validation rules applied to parent
 * and adds @IsOptional Decorator to each property
 */
