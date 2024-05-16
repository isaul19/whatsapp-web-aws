import { IsString, MinLength } from "class-validator";

export class GetContactByNameDto {
  @IsString()
  @MinLength(2)
  name: string;
}
