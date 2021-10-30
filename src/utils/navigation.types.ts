import {User} from './api.types';

export type PublicStackNavigator = {
  Login: undefined;
  Registration: undefined;
  Forgot: undefined;
};

export type PrivateStackNavigator = {
  Home: undefined;
  TradePoint: undefined;
};

export type DrawerNavigator = {
  Main: undefined;
  ConReport: undefined;
  Trade: undefined;
  Reports: undefined;
  Remainders: undefined;
  Friends: undefined;
  Profile: undefined;
};

export type TradeTopTabNavigator = {
  Sales: undefined;
  Incomes: undefined;
  Returns: undefined;
};

export type ReportsTopTabNavigator = {
  SalesByProducts: undefined;
  SalesByGroups: undefined;
  SalesByMonthes: undefined;
  ReturnsByProducts: undefined;
  TopSellingProducts: undefined;
  AvgReceipt: undefined;
};

export type ProfileStackNavigator = {
  Display: undefined;
  Edit: User;
};
