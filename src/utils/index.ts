export const even = (n: number) => !(n % 2);

export const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export function convertDate(
  inputFormat: Date | string,
  fetch: boolean = true,
): string {
  function pad(s: number) {
    return s < 10 ? '0' + s : s;
  }
  var d = new Date(inputFormat);
  if (!fetch)
    return (
      d.getDate() +
      ' ' +
      monthNames[d.getMonth()].toLowerCase().slice(0, 3) +
      '.'
    );
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('.');
}
export type SetDateAction = {
  type: string;
  index: number;
  date: DateRange;
};

export type SetDate = (index: number, date: DateRange) => SetDateAction;

export type DateRange = {
  datebegin: Date;
  dateend: Date;
};

export const getDayRange = (): DateRange => {
  const date = new Date();
  return {datebegin: date, dateend: date};
};

export const getWeekRange = (): DateRange => {
  const datebegin = new Date();
  const dateend = new Date();
  datebegin.setTime(dateend.getTime() - 7 * 24 * 3600000);
  return {datebegin, dateend};
};

export const getMonthRange = (): DateRange => {
  const datebegin = new Date();
  const dateend = new Date();
  datebegin.setTime(dateend.getTime() - 30 * 24 * 3600000);
  return {datebegin, dateend};
};

export const getDateRangeByIndex = (index: number): DateRange => {
  switch (index) {
    case 0:
      return getDayRange();
    case 1:
      return getWeekRange();
    case 2:
      return getMonthRange();
    default:
      return getDayRange();
  }
};
