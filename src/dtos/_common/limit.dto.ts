import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive } from "class-validator";

export class LimitDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  limit?: number;
}
