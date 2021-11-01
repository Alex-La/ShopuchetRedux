import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Friend, MainData, Tokens, TradePoints, User} from './api.types';

const baseUrl = 'https://api.shopuchet.kz';

const axiosInstance = axios.create({baseURL: baseUrl});

axiosInstance.interceptors.request.use(async config => {
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

const api = {
  login: (username: string, password: string) =>
    axiosInstance.get<Tokens>(
      `/logon-oauth2?username=${username}&password=${password}`,
    ),
  getTradePoints: () => axiosInstance.get<TradePoints>(`/api/readgtochka`),
  getUser: () => axiosInstance.get<User>('/api/getuser'),
  getMain: (gtochkaid: number) =>
    axiosInstance.get<MainData>(`/api/readmain?gtochkaid=${gtochkaid}`),
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
  getFriends: () => axiosInstance.get<Friend[]>('/api/readusers'),
  linkUser: (login: string, gtochkaids: string) =>
    axiosInstance.post<string>(`/api/linkuser?login=${login}${gtochkaids}`),
};

export default api;
