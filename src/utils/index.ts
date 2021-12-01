export const colors = ['#69DFAE', '#6395FA', '#6D7FA0', '#F7C122'];

export function getColor(index: number) {
  return colors[index];
}

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

function pad(s: number) {
  return s < 10 ? '0' + s : s;
}

export function convertDate(
  inputFormat: Date | string,
  fetch: boolean = true,
): string {
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

export function convertDateTime(inputFormat: Date | string): string {
  var d = new Date(inputFormat);
  const date = [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(
    '.',
  );
  const time = [
    pad(d.getHours()),
    pad(d.getMinutes()),
    pad(d.getSeconds()),
  ].join(':');
  return date + ' ' + time;
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

export const incrementDecrementDate = (date: Date, mode: 'inc' | 'dec') => {
  const d = new Date(date);
  d.setDate(mode === 'inc' ? d.getDate() + 1 : d.getDate() - 1);
  return d;
};

const reverseString = (str?: string): string =>
  str ? str.split('').reverse().join('') : '';

export const addSpaces = (value?: number): string => {
  const stringValues = value ? value.toFixed(2).split('.') : '';
  const reversedResult = reverseString(stringValues[0])
    .match(/.{1,3}/g)
    ?.join(' ');
  return (
    reverseString(reversedResult || '') +
    (stringValues[1] ? '.' + stringValues[1] : '0')
  );
};

export const graphPrice = (price?: string): string => {
  const reversePrice = reverseString(price ? price?.split('.')[0] : '');
  const reverseArray = reversePrice.match(/.{1,3}/g);
  switch (reverseArray?.length) {
    case 1:
      return reverseString(reverseArray[0]);
    case 2:
      return (
        reverseString(reverseArray[1]) + '.' + reverseArray[0].charAt(2) + 'К'
      );
    case 3:
      return (
        reverseString(reverseArray[2]) + '.' + reverseArray[1].charAt(2) + 'М'
      );
    default:
      return '';
  }
};
