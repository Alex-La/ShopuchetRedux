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
