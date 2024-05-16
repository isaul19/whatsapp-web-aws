import { Constants } from "./constants.util";

export class Parse {
  public static phone(phone: number): string {
    return phone + Constants.AMERICAN_PHONE;
  }
}
