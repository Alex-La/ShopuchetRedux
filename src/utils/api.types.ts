export type NullableString = string | null;

export type Tokens = {
  'X-Auth-Token': string;
  'Refresh-Token': string;
};

export type TradePoint = {
  gTochkaId: number;
  usersId: number;
  recId: number;
  name: string;
};

export type TradePoints = TradePoint[];

export type User = {
  fn: string;
  nm: string;
  ft: string;
  phone: string;
  login: string;
};

export type MainDataObject = {
  avg: number;
  cnt: number;
  income: number;
  summ: number;
};

export type MainData = {
  day: MainDataObject;
  month: MainDataObject;
  week: MainDataObject;
  summ: number;
};

export type Friend = {
  usersId: number;
  login: string;
  gTochkaId: number;
  nameGTochka: string;
};

export type Remainder = {
  remaindersId: number;
  amount: number;
  name: string;
  groupName: string;
  gProductId: number;
  cost: number;
};

type SalesGroupsHead = {
  cnt: number;
  summ: number;
  income: number;
};

type SalesGroupsDetails = {
  name: string;
  amount: number;
  summ: number;
  income: number;
};

export type SalesGroups = {
  head: SalesGroupsHead;
  details: SalesGroupsDetails[];
};

type SalesProductsHead = {
  cnt: number;
  summ: number;
  income: number;
};

type SalesProductsDetails = {
  name: string;
  amount: number;
  summ: number;
  income: number;
};

export type SalesProducts = {
  head: SalesProductsHead;
  details: SalesProductsDetails[];
};

type SalesMonthHead = {
  cnt: number;
  summ: number;
  income: number;
};

type SalesMonthDetails = {
  month: string;
  amount: number;
  summ: number;
  income: number;
};

export type SalesMonth = {
  head: SalesMonthHead;
  details: SalesMonthDetails[];
};

export type ConReport = {
  sales: {
    cnt: number;
    summ: number;
    products: number;
    avg: number;
    income: number;
  };
  payed: {cntPayed: number; cach: number; nonCach: number; bonus: number};
  ret: {
    cnt: number;
    summ: number;
    products: number;
  };
  kassa: {inSumm: number; outSumm: number};
};
