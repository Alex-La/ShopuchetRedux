import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  Friend,
  MainData,
  Remainder,
  SalesGroups,
  Tokens,
  TradePoints,
  User,
} from './api.types';

const baseUrl = 'https://api.shopuchet.kz';

const axiosInstance = axios.create({baseURL: baseUrl});

axiosInstance.interceptors.request.use(async config => {
  console.log(config.url);
  const accessToken = await AsyncStorage.getItem('accessToken');
  if (accessToken && config.headers)
    config.headers['X-Auth-Token'] = accessToken;
  return config;
}, Promise.reject);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');

    if (
      refreshToken &&
      error.response.status === 409 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshRequest = await axiosInstance.post<Tokens>(
        `/refresh-tokens?access-token=${accessToken}&refresh-token=${refreshToken}`,
      );
      if (refreshRequest.status === 200) {
        await AsyncStorage.setItem(
          'accessToken',
          refreshRequest.data['X-Auth-Token'],
        );
        await AsyncStorage.setItem(
          'refreshToken',
          refreshRequest.data['Refresh-Token'],
        );
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);

const auth = {
  login: (username: string, password: string) =>
    axiosInstance.get<Tokens>(
      `/logon-oauth2?username=${username}&password=${password}`,
    ),
};

const main = {
  getTradePoints: () => axiosInstance.get<TradePoints>(`/api/readgtochka`),
  getUser: () => axiosInstance.get<User>('/api/getuser'),
  getMain: (gtochkaid: number) =>
    axiosInstance.get<MainData>(`/api/readmain?gtochkaid=${gtochkaid}`),
};

const profile = {
  updateUser: (
    fn: string,
    nm: string,
    ft: string,
    phone: string,
    oldpwd: string,
    newpwd: string,
  ) =>
    axiosInstance.post<string>(
      `/api/edituser?fn=${fn}&nm=${nm}&ft=${ft}&phone=${phone}${
        oldpwd ? `&oldpwd=${oldpwd}` : ''
      }${newpwd ? `&newpwd=${newpwd}` : ''}`,
    ),
};

const friends = {
  getFriends: () => axiosInstance.get<Friend[]>('/api/readusers'),
  linkUser: (login: string, gtochkaids: string) =>
    axiosInstance.post<string>(`/api/linkuser?login=${login}${gtochkaids}`),
};

const remainders = {
  getRemainders: (
    gtochkaid: number,
    page: number,
    cnt?: number,
    filter: string = '',
  ) =>
    axiosInstance.get<Remainder[]>(
      `/api/remainders?gtochkaid=${gtochkaid}&page=${page}&cnt=${
        cnt || ''
      }&filter=${filter}&rows=40&sortField=amount&descending=true`,
    ),
};

const reports = {
  getSalesByGroups: (gtochkaid: number, datebegin: string, dateend: string) =>
    axiosInstance.get<SalesGroups>(
      `/api/readsalesgroupproducts?gtochkaid=${gtochkaid}&datebegin=${datebegin}&dateend=${dateend}`,
    ),
};

const api = {
  auth,
  main,
  profile,
  friends,
  remainders,
  reports,
};

export default api;
