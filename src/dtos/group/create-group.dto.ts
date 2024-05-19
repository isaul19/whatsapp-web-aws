import { IsString, Matches, MinLength } from "class-validator";
import { Regexp } from "@utils/regexp.util";

export class CreateGroupDto {
  @IsString()
  @MinLength(3)
  groupName!: string;

  @Matches(Regexp.phone, { each: true, message: "The phone number must have at least 11 numeric digits" })
  participantsPhones!: string[];
}
