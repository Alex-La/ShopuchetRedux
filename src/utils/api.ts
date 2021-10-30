import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Tokens, TradePoints} from './api.types';

const baseUrl = 'https://api.shopuchet.kz';

const axiosInstance = axios.create({baseURL: baseUrl});

axiosInstance.interceptors.request.use(async config => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  if (accessToken && config.headers)
    config.headers['X-Auth-Token'] = accessToken;
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');

    console.log(error);

    if (
      refreshToken &&
      error.response.status === 409 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axiosInstance
        .post<Tokens>(
          `/refresh-tokens?access-token=${accessToken}&refresh-token=${refreshToken}`,
        )
        .then(res => {
          if (res.status === 200) {
            console.log(res);
            AsyncStorage.setItem('accessToken', res.data['X-Auth-Token']);
            AsyncStorage.setItem('refreshToken', res.data['Refresh-Token']);
            return axios(originalRequest);
          }
        });
    }

    if (error.response.status === 401) AsyncStorage.clear();

    return Promise.reject(error);
  },
);

const api = {
  login: (username: string, password: string) =>
    axiosInstance.get<Tokens>(
      `/logon-oauth2?username=${username}&password=${password}`,
    ),
  getTradePoints: () => axiosInstance.get<TradePoints>(`/api/readgtochka`),
};

export default api;
