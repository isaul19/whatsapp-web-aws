import { IsInt, IsPositive, IsString, MinLength } from "class-validator";

export class SendMessageByGroupOrder {
  @IsInt()
  @IsPositive()
  order: number;

  @IsString()
  @MinLength(2)
  message: string;
}
