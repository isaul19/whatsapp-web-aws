import { IsString } from "class-validator";

export class SendMessageFromMeDto {
  @IsString()
  message: string;
}
