import { Regexp } from "@utils/regexp.util";
import { IsNotEmpty, Matches } from "class-validator";

export class GetMessageDto {
  @IsNotEmpty()
  @Matches(Regexp.phone, { message: "The phone number must have at least 11 numeric digits" })
  phone: string;
}
