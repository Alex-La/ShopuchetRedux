import {AxiosResponse} from 'axios';
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
  getIncome: (
    gtochkaid: number,
    datebegin: Date,
    dateend: Date,
    page: number,
  ) =>
    axiosInstance
      .get<Sklad>(
        `/api/readsklad?gtochkaid=${gtochkaid}&datebegin=${convertDate(
          datebegin,
        )}&dateend=${convertDate(dateend)}&page=${page}&rows=50`,
      )
      .then(res => ({
        ...res,
        data: {
          ...res.data,
          details: res.data.details.filter(i => i.type === 0),
        },
      })),
  getReturn: (
    gtochkaid: number,
    datebegin: Date,
    dateend: Date,
    page: number,
  ) =>
    axiosInstance
      .get<Sklad>(
        `/api/readsklad?gtochkaid=${gtochkaid}&datebegin=${convertDate(
          datebegin,
        )}&dateend=${convertDate(dateend)}&page=${page}&rows=50`,
      )
      .then(res => ({
        ...res,
        data: {
          ...res.data,
          details: res.data.details.filter(i => i.type === 1),
        },
      })),
  getZakazInfo: (zakazid: number) =>
    axiosInstance.get<ZakazInfo>(`/api/readzakazdetails?zakazid=${zakazid}`),
  deleteSale: (zakazIds: number[]) =>
    axiosInstance.post<object, AxiosResponse<object>, number[]>(
      '/api/deletesales',
      zakazIds,
    ),
  deleteReceipt: (skladIds: number[]) =>
    axiosInstance.post<object, AxiosResponse<object>, number[]>(
      '/api/deletereceipt',
      skladIds,
    ),
};

export default trade;
