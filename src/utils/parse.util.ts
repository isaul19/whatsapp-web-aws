import { ID_AMERICAN_PHONE } from "@config/constants";

export class Parse {
  public static phone(phone: string): string {
    return phone + ID_AMERICAN_PHONE;
  }
}
