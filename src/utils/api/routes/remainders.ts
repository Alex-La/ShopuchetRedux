import {Remainders} from '../../api.types';
import axiosInstance from '../axiosInstance';

const remainders = {
  getRemainders: (
    gtochkaid: number,
    page: number,
    descending: boolean = true,
    cnt: string = '',
    filter: string = '',
  ) =>
    axiosInstance.get<Remainders>(
      `/api/remainders?gtochkaid=${gtochkaid}&page=${page}&cnt=${cnt}&filter=${filter}&rows=10&sortField=amount&descending=${descending}`,
    ),
};

export default remainders;
