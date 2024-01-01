import dayjs from "dayjs";
import Decimal from "decimal.js";
import {
  MoneyIO,
  MoneyIOPer,
  MoneyIORecord,
  MoneyIOType,
  PartialOf,
} from "./enums";

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

type Form = ReturnType<typeof createForm>;

export function calcRecords(form: Form) {
  const startDate = dayjs(form.startDate);
  const endDate = dayjs(startDate).add(1, "year");

  const dateRecordMap: any = {};

  function addRecord(record: PartialOf<MoneyIORecord, "total">) {
    (dateRecordMap[record.date] ??= []).push(record);
  }

  form.inouts.forEach((io) => {
    if (io.per === MoneyIOPer.PER_DATE) {
      addRecord({
        date: io.perDate!,
        type: io.type,
        value: io.value,
      });
    } else if (io.per === MoneyIOPer.PER_DAY) {
      let start = startDate;
      while (start.isBefore(endDate)) {
        addRecord({
          date: start.format("YYYY-MM-DD"),
          type: io.type,
          value: io.value,
        });
        start = start.add(1, "day");
      }
    } else if (io.per === MoneyIOPer.PER_MONTH) {
      let start = startDate;
      while (start.isBefore(endDate)) {
        addRecord({
          date: start.format("YYYY-MM-DD"),
          type: io.type,
          value: io.value,
        });
        start = start.add(1, "month");
      }
    }
  });

  const records: MoneyIORecord[] = Object.keys(dateRecordMap)
    .sort()
    .map((key) => dateRecordMap[key])
    .flat();

  let total = new Decimal(form.startValue);
  records.forEach((e) => {
    const deta = e.type === MoneyIOType.IN ? `+${e.value}` : `-${e.value}`;
    total = total.add(new Decimal(deta));
    e.total = total.toFixed(2);
  });

  return records;
}
