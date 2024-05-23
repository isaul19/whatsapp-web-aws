import { IsArray, IsString, MinLength } from "class-validator";

export class AddParticipantGroupDto {
  @IsString()
  @MinLength(3)
  groupName!: string;

  @IsArray()
  @IsString({ each: true })
  @MinLength(2, { each: true })
  contactNames!: string[];
}
