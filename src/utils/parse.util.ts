import { AMERICAN_PHONE } from "@constants";

export class Parse {
  public static phone(phone: string): string {
    return phone + AMERICAN_PHONE;
  }
}
