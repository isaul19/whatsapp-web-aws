import { IsInt, IsPositive } from "class-validator";

export class GetContactByOrderDto {
  @IsInt()
  @IsPositive()
  order: number;
}
