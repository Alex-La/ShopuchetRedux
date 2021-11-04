import {SalesGroups} from '../../api.types';
import axiosInstance from '../axiosInstance';

const reports = {
  getSalesByGroups: (gtochkaid: number, datebegin: string, dateend: string) =>
    axiosInstance.get<SalesGroups>(
      `/api/readsalesgroupproducts?gtochkaid=${gtochkaid}&datebegin=${datebegin}&dateend=${dateend}`,
    ),
};

export default reports;
