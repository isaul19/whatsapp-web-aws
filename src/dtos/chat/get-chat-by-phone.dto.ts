import { Type } from "class-transformer";
import { Matches } from "class-validator";

import { Regexp } from "@utils/regexp.util";

export class GetChatByPhoneDto {
  @Matches(Regexp.phone, { message: "The phone number must have at least 11 numeric digits" })
  @Type(() => Number)
  phone: number;
}
