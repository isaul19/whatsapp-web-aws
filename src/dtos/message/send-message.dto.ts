import { Matches } from "class-validator";
import { Type } from "class-transformer";

import { Regexp } from "@utils/regexp.util";
import { SendMessageFromMeDto } from "./send-message-from-me.dto";

export class SendMessageDto extends SendMessageFromMeDto {
  @Matches(Regexp.phone, { message: "The phone number must have at least 11 numeric digits" })
  @Type(() => Number)
  phone: number;
}
