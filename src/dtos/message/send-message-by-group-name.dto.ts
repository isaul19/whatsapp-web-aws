import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class SendMessageByGroupName {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  message: string;
}
