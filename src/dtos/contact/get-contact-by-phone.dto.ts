import { Regexp } from "@utils/regexp.util";
import { Matches } from "class-validator";

export class GetContactByPhone {
  @Matches(Regexp.phone, { message: "The phone number must have at least 11 numeric digits" })
  phone: string;
}
