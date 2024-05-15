import { Type } from "class-transformer";
import { Matches } from "class-validator";

export class GetChatByPhoneDto {
  @Matches(/^[0-9]{11,}$/, { message: "The phone number must have at least 11 numeric digits" })
  @Type(() => Number)
  phone: number;
}
