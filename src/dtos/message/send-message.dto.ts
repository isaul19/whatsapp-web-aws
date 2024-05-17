import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

import { Regexp } from "@utils/regexp.util";

export class SendMessageDto {
  @IsNotEmpty()
  @Matches(Regexp.phone, { message: "The phone number must have at least 11 numeric digits" })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  message: string;
}
