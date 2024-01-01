import dayjs from "dayjs";
import { MoneyIO, MoneyIOPer, MoneyIOType } from "./enums";

export const createForm = () => {
  return {
    startValue: "0",
    startDate: dayjs().format("YYYY-MM-DD"),
    inouts: [
      {
        type: MoneyIOType.OUT,
        per: MoneyIOPer.PER_MONTH,
        perMonthDate: "1",
        value: "0",
      },
    ] as MoneyIO[],
  };
};
