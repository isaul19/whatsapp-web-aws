import { IsString, MinLength } from "class-validator";

export class GetGroupByNameDto {
  @IsString()
  @MinLength(2)
  name: string;
}
