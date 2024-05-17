import { Type } from "class-transformer";
import { IsInt, IsPositive } from "class-validator";

export class LimitDto {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  limit: number;
}
