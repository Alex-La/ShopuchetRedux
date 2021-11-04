import {convertDate} from '../..';
import {SalesGroups} from '../../api.types';
import axiosInstance from '../axiosInstance';

const reports = {
  getSalesByGroups: (gtochkaid: number, datebegin: Date, dateend: Date) =>
    axiosInstance.get<SalesGroups>(
      `/api/readsalesgroupproducts?gtochkaid=${gtochkaid}&datebegin=${convertDate(
        datebegin,
      )}&dateend=${convertDate(dateend)}`,
    ),
};

export default reports;
