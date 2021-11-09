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

export type RemaindersDetail = {
  remaindersId: number;
  amount: number;
  name: string;
  groupName: string;
  gProductId: number;
  cost: number;
};

export type Remainders = {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalPages: number;
  details: RemaindersDetail[];
};

export type SalesGroupsHead = {
  cnt: number;
  summ: number;
  income: number;
};

export type SalesGroupsDetails = {
  name: string;
  amount: number;
  summ: number;
  income: number;
};

export type SalesGroups = {
  head: SalesGroupsHead;
  details: SalesGroupsDetails[];
};

export type SalesProductsHead = {
  cnt: number;
  summ: number;
  income: number;
};

export type SalesProductsDetails = {
  name: string;
  amount: number;
  summ: number;
  income: number;
};

export type SalesProducts = {
  head: SalesProductsHead;
  details: SalesProductsDetails[];
};

export type SalesMonthHead = {
  cnt: number;
  summ: number;
  income: number;
};

export type SalesMonthDetails = {
  month: string;
  amount: number;
  summ: number;
  income: number;
};

export type SalesMonth = {
  head: SalesMonthHead;
  details: SalesMonthDetails[];
};

export type ReturnsProductsHead = {
  cnt: number;
  summ: number;
};

export type ReturnsProductsDetail = {
  amount: number;
  name: string;
  summ: number;
};

export type ReturnsProducts = {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalPages: number;
  head: ReturnsProductsHead;
  details: ReturnsProductsDetail[];
};

export type TopSalesHead = {
  cnt: number;
  summ: number;
};

export type TopSalesDetail = {
  amount: number;
  name: string;
};

export type TopSales = {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalPages: number;
  head: TopSalesHead;
  details: TopSalesDetail[];
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
