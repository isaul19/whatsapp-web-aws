import { IsString } from "class-validator";

export class GetChatByPhoneDto {
  @IsString()
  phone: string;
}
