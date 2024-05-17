import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class SendMessageFromMeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  message: string;
}
