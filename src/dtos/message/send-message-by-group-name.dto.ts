import { IsString, MinLength } from "class-validator";

export class SendMessageByGroupName {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(2)
  message: string;
}
