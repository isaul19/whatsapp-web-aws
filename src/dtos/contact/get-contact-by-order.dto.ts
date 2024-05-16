import { Type } from "class-transformer";
import { IsInt, IsPositive } from "class-validator";

export class GetContactByOrderDto {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  order: number;
}
