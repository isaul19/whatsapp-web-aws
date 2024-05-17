import { IsInt, IsNotEmpty, IsPositive, IsString, MinLength } from "class-validator";

export class SendMessageByGroupOrder {
  @IsInt()
  @IsPositive()
  order: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  message: string;
}
