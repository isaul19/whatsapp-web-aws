import { IsString, Matches, MinLength } from "class-validator";
import { Type } from "class-transformer";

import { Regexp } from "@utils/regexp.util";

export class SendMessageDto {
  @Matches(Regexp.phone, { message: "The phone number must have at least 11 numeric digits" })
  @Type(() => Number)
  phone: number;

  @IsString()
  @MinLength(2)
  message: string;
}
