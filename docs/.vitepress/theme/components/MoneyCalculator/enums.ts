export enum MoneyIOType {
  IN = "IN",
  OUT = "OUT",
}

export enum MoneyIOPer {
  DATE = "DATE",
  EVERY_DAY = "DAY",
  EVERY_MONTH = "MONTH",
}

export type MoneyIO = {
  type: MoneyIOType;
  per: MoneyIOPer;
  perMonthDate?: string;
  amount: string;
};
