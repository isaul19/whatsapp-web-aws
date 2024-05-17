import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class SendMessageByContactNameDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  message: string;
}
