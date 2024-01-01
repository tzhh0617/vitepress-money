export enum MoneyIOType {
  IN = "IN",
  OUT = "OUT",
}

export enum MoneyIOPer {
  PER_DATE = "DATE",
  PER_DAY = "DAY",
  PER_MONTH = "MONTH",
}

export type MoneyIO = {
  type: MoneyIOType;
  per: MoneyIOPer;
  perMonthDate?: string;
  perDate?: string;
  amount: string;
};
