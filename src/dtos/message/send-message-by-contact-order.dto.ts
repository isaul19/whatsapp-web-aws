import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class SendMessageByContactOrderDto {
  @IsInt()
  @IsPositive()
  order: number;

  @IsNotEmpty()
  @IsString()
  message: string;
}
