import { IsInt, IsPositive, IsString } from "class-validator";

export class SendMessageDto {
  @IsInt()
  @IsPositive()
  phone: number;

  @IsString()
  message: string;
}
