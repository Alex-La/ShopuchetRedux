import {convertDate} from '../..';
import {Sales, Sklad, ZakazInfo} from '../../api.types';
import axiosInstance from '../axiosInstance';

const trade = {
  getSales: (gtochkaid: number, datebegin: Date, dateend: Date) =>
    axiosInstance.get<Sales>(
      `/api/readsales?gtochkaid=${gtochkaid}&datebegin=${convertDate(
        datebegin,
      )}&dateend=${convertDate(dateend)}`,
    ),
  getSklad: (gtochkaid: number, datebegin: Date, dateend: Date, page: number) =>
    axiosInstance.get<Sklad>(
      `/api/readsklad?gtochkaid=${gtochkaid}&datebegin=${convertDate(
        datebegin,
      )}&dateend=${convertDate(dateend)}&page=${page}&rows=10`,
    ),
  getZakazInfo: (zakazid: number) =>
    axiosInstance.get<ZakazInfo>(`/api/readzakazdetails?zakazid=${zakazid}`),
  deleteSale: (zakazIds: number[]) =>
    axiosInstance.post<object, any, number[]>('/api/deletesales', zakazIds),
  deleteReceipt: (skladIds: number[]) =>
    axiosInstance.post<object, any, number[]>('/api/deletereceipt', skladIds),
};

export default trade;
