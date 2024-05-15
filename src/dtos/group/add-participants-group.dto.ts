import { Regexp } from "@utils/regexp.util";
import { IsString, Matches } from "class-validator";

export class AddParticipantGroupDto {
  @IsString()
  idGroup: string;

  @Matches(Regexp.phone, { each: true, message: "The phone number must have at least 11 numeric digits" })
  participantsPhones: number[];
}
