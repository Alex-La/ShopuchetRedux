import {Tokens} from '../../api.types';
import axiosInstance from '../axiosInstance';

const auth = {
  login: (username: string, password: string) =>
    axiosInstance.get<Tokens>(
      `/logon-oauth2?username=${username}&password=${password}`,
    ),
};

export default auth;
