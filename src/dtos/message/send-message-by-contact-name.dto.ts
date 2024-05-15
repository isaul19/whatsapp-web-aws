import { IsString, MinLength } from "class-validator";

export class SendMessageByContactNameDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(2)
  message: string;
}
