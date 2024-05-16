import { IsInt, IsPositive } from "class-validator";

export class GetGroupByOrderDto {
  @IsInt()
  @IsPositive()
  order: number;
}
