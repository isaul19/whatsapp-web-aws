import { IsString, MinLength } from "class-validator";

export class SearchContactDto {
  @IsString()
  @MinLength(2)
  name: string;
}
