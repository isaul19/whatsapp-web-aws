import { IsString, MinLength } from "class-validator";

export class SendMessageFromMeDto {
  @IsString()
  @MinLength(2)
  message: string;
}
