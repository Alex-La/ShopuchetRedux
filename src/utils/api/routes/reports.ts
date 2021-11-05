import {convertDate} from '../..';
import {SalesGroups, SalesMonth, SalesProducts} from '../../api.types';
import axiosInstance from '../axiosInstance';

const reports = {
  getSalesByProducts: (gtochkaid: number, datebegin: Date, dateend: Date) =>
    axiosInstance.get<SalesProducts>(
      `/api/readsalesproducts?gtochkaid=${gtochkaid}&datebegin=${convertDate(
        datebegin,
      )}&dateend=${convertDate(dateend)}`,
    ),
  getSalesByGroups: (gtochkaid: number, datebegin: Date, dateend: Date) =>
    axiosInstance.get<SalesGroups>(
      `/api/readsalesgroupproducts?gtochkaid=${gtochkaid}&datebegin=${convertDate(
        datebegin,
      )}&dateend=${convertDate(dateend)}`,
    ),
  getSalesByMonth: (gtochkaid: number, datebegin: Date, dateend: Date) =>
    axiosInstance.get<SalesMonth>(
      `/api/readsalesgroupmonth?gtochkaid=${gtochkaid}&datebegin=${convertDate(
        datebegin,
      )}&dateend=${convertDate(dateend)}`,
    ),
};

export default reports;
