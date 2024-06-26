import { Matches } from "class-validator";

import { Regexp } from "@utils/regexp.util";

export class PhoneDto {
  @Matches(Regexp.phone, { message: "The phone number must have at least 11 numeric digits" })
  phone!: string;
}
