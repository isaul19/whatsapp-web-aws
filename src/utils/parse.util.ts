import { ID_AMERICAN_PHONE } from "@config/constants";

export class Parse {
  public static phone(phone: string): string {
    return phone + ID_AMERICAN_PHONE;
  }

  public static date(timestamp: number): string {
    const date = new Date(timestamp * 1000);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`;
    return formattedDate;
  }
}
