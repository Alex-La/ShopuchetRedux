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
