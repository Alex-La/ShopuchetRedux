import {MainData, TradePoints, User} from '../../api.types';
import axiosInstance from '../axiosInstance';

const main = {
  getTradePoints: () => axiosInstance.get<TradePoints>(`/api/readgtochka`),
  getUser: () => axiosInstance.get<User>('/api/getuser'),
  getMain: (gtochkaid: number) =>
    axiosInstance.get<MainData>(`/api/readmain?gtochkaid=${gtochkaid}`),
};

export default main;
