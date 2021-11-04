import {Remainder} from '../../api.types';
import axiosInstance from '../axiosInstance';

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

export default remainders;
