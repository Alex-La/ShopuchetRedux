import {Layout} from '@ui-kitten/components';
import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../../../../redux';
import {setReduce} from '../../../../../../redux/actions/private/reportsActions';
import {TAB_TYPES} from '../../../../../../redux/types/private/reports.types';
import SalesHeader from '../SalesHeader';

const SalesByMonthes: React.FC = () => {
  const dispatch = useAppDispatch();
  const date = useAppSelector(state => state.reports.date);
  const reduce = useAppSelector(state => state.reports.tabs.salesMonth.reduce);

  const handleReduce = () => dispatch(setReduce(reduce, TAB_TYPES.SALES_MONTH));

  return (
    <Layout style={{flex: 1}}>
      <SalesHeader date={date} reduce={reduce} setReduce={handleReduce} />
    </Layout>
  );
};

export default SalesByMonthes;
