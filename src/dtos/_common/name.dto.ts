import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class NameDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name!: string;
}
