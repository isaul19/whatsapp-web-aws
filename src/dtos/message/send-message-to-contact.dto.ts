import { IsInt, IsPositive, IsString } from "class-validator";

export class SendMessageToContactDto {
  @IsInt()
  @IsPositive()
  order: number;

  @IsString()
  message: string;
}
