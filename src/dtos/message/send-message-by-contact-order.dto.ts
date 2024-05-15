import { IsInt, IsPositive, IsString } from "class-validator";

export class SendMessageByContactOrderDto {
  @IsInt()
  @IsPositive()
  order: number;

  @IsString()
  message: string;
}
