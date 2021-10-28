import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Tokens} from './api.types';

const baseUrl = 'https://api.shopuchet.kz/';

axios.interceptors.request.use(async config => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  if (accessToken && config.headers)
    config.headers['X-Auth-Token'] = accessToken;
  return config;
});

axios.interceptors.response.use(
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
      return axios
        .post<Tokens>(
          `${baseUrl}/refresh-tokens?access-token=${accessToken}&refresh-token=${refreshToken}`,
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

    return Promise.reject(error);
  },
);
