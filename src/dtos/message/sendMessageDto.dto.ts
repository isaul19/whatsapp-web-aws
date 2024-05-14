import { IsInt, IsPositive, IsString, Matches } from "class-validator";

export class SendMessageDto {
  @IsInt()
  @IsPositive()
  phone: number;

  @IsString()
  message: string;
}
