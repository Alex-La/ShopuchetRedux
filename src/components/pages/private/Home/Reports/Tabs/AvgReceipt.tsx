import {Layout, List} from '@ui-kitten/components';
import React from 'react';
import {useAppSelector} from '../../../../../../redux';
import DateRangeAndSort from '../DateRangeAndSort';

const AvgReceipt: React.FC = () => {
  const date = useAppSelector(state => state.reports.date);

  const ListHeader = () => (
    <Layout>
      <DateRangeAndSort date={date} reduce={false} setReduce={() => {}} />
    </Layout>
  );

  return <List ListHeaderComponent={ListHeader} />;
};

export default AvgReceipt;
