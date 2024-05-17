import { AMERICAN_PHONE } from "@config/constants";

export class Parse {
  public static phone(phone: string): string {
    return phone + AMERICAN_PHONE;
  }
}
