import { Matches } from "class-validator";
import { Type } from "class-transformer";

import { SendMessageFromMeDto } from "./send-message-from-me.dto";

export class SendMessageDto extends SendMessageFromMeDto {
  @Matches(/^[0-9]{11,}$/, { message: "The phone number must have at least 11 numeric digits" })
  @Type(() => Number)
  phone: number;
}
