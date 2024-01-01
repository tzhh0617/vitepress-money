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
  value: string;
};

export type MoneyIORecord = {
  date: string;
  type: MoneyIOType;
  value: string;
  total: string;
};

export const selectRuquiredRule = [
  { required: true, message: "请选择", trigger: "blur" },
];

export const decimalRules = [
  { required: true, message: "请输入金额", trigger: "blur" },
  {
    pattern: /^([1-9]\d*|0)(\.\d{0,2})?$/,
    message: "请输入正确的金额",
    trigger: "blur",
  },
];
