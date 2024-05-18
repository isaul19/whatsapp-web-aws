import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class MessageDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  message: string;
}
